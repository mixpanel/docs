---
title: "Google Cloud Storage"
slug: "gcs-import"
hidden: false
metadata: 
  title: "Cloud Ingestion: GCS | Mixpanel Developer Docs"
  description: "This guide demonstrates how to set up a serverless ingest pipeline from a Google Cloud Storage bucket into Mixpanel. The complete setup should take ~10 minutes."
createdAt: "2021-08-09T04:46:37.553Z"
updatedAt: "2022-04-19T05:28:52.398Z"
---
This guide demonstrates how to set up a serverless ingest pipeline from a Google Cloud Storage bucket into Mixpanel. Once this is set up, you can simply upload files containing events into the designated GCS bucket and the events will be ingested into Mixpanel, both one-time and on a recurring basis. Setup should take ~10 minutes.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2611f66-Screen_Shot_2021-08-16_at_3.04.19_PM.png",
        "Screen Shot 2021-08-16 at 3.04.19 PM.png",
        2464,
        1264,
        "#eaedf8"
      ]
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Prerequisites",
  "body": "This guide assumes you are running in Google Cloud Platform, and have the necessary IAM Access to have Cloud Functions read from GCS."
}
[/block]

[block:api-header]
{
  "title": "Step 1: Create a GCS Bucket"
}
[/block]
[Create a dedicated Cloud Storage bucket](https://console.cloud.google.com/storage/create-bucket) for this integration. We recommend including `mixpanel-import` in the name to make it explicit and avoid any accidental data sharing.

You can create the bucket in any region, though we recommend `us-central` for highest throughput.
[block:api-header]
{
  "title": "Step 2a: Setup the Cloud Function"
}
[/block]
Create a [new Cloud Function](https://console.cloud.google.com/functions/add). 
* Set the trigger to `Cloud Storage`, the Event Type to `Finalize/Create` and the bucket name to the bucket created in step 2. This means that any object uploaded to this bucket will trigger an invocation of this Cloud Function.
* Set Memory to 1GiB, Timeout to 300, and Instances to 20
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/daaf571-Screen_Shot_2021-08-09_at_11.34.19_AM.png",
        "Screen Shot 2021-08-09 at 11.34.19 AM.png",
        1252,
        658,
        "#f9f9fa"
      ],
      "caption": "Cloud Function configuration"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 2b: Write the Cloud Function"
}
[/block]
Switch the runtime to `Python3.9` and change the entrypoint from `hello_gcs` to `main`. Paste the code below for `main.py` and `requirements.txt`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/09495a4-Screen_Shot_2021-08-08_at_11.54.48_PM.png",
        "Screen Shot 2021-08-08 at 11.54.48 PM.png",
        1718,
        726,
        "#f7f8fa"
      ]
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "from datetime import date\nimport gzip\nimport json\nimport random\nimport time\n\nfrom google.cloud import storage\nimport requests\n\nPROJECT_ID = \"\"  # mixpanel.com/project/<YOUR_PROJECT_ID>\nUSER = \"\"  # Service Account user\nPASS = \"\"  # Service Account password\n\n# Flush a batch once these limits are hit\nEVENTS_PER_BATCH = 2000\nBYTES_PER_BATCH = 2 * 1024 * 1024\n\n\n# Adjust event timestamps of test data so that it appears recent in Mixpanel.\n# NOTE: THIS IS JUST FOR DEMO PURPOSES.\n# REPLACE THIS WITH YOUR OWN TRANSFORMS IN PRODUCTION.\ndef transform_to_event(line):\n    \"\"\"Convert a line of the file to a json string in Mixpanel's format.\"\"\"\n    event = json.loads(line)\n    event[\"properties\"][\"time\"] = int(date.today().strftime(\"%s\"))\n    return json.dumps(event)\n\n\ndef flush(batch):\n    payload = gzip.compress(\"\\n\".join(batch).encode(\"utf-8\"))\n    tries = 0\n    while True:\n        resp = requests.post(\n            \"https://api.mixpanel.com/import\",\n            params={\"strict\": \"1\", \"project_id\": PROJECT_ID},\n            headers={\n                \"Content-Type\": \"application/x-ndjson\",\n                \"Content-Encoding\": \"gzip\",\n                \"User-Agent\": \"mixpanel-gcs\"\n            },\n            auth=(USER, PASS),\n            data=payload,\n        )\n        if resp.status_code == 429 or resp.status_code >= 500:\n            time.sleep(min(2 ** tries, 60) + random.randint(1, 5))\n            tries += 1\n            continue\n        return resp\n\n\ndef main(request, context):\n    gcs = storage.Client()\n    bucket = gcs.get_bucket(request[\"bucket\"])\n    blob = bucket.get_blob(request[\"name\"])\n    \n    compressed = request[\"name\"].endswith(\".gz\")\n\n    error = None\n    batch, batch_bytes = [], 0\n    \n    # As a convenience, check for files ending with .gz\n    f = blob.open(\"rb\")\n    if request[\"name\"].endswith(\".gz\") and request.get(\"contentEncoding\") != \"gzip\":\n        f = gzip.open(f)\n    \n    for line in f:\n        # Here we assume each line is valid JSON representing a single Mixpanel event\n        # If lines are not in Mixpanel's format, apply any transformations here.\n        line = transform_to_event(line)\n\n        batch.append(line)\n        batch_bytes += len(line)\n\n        if len(batch) == EVENTS_PER_BATCH or batch_bytes >= BYTES_PER_BATCH:\n            resp = flush(batch)\n            batch, batch_bytes = [], 0\n\n            if resp.status_code != 200:\n                error = resp.json()\n                break\n\n    # Flush final batch\n    if batch and not error:\n        resp = flush(batch)\n        if resp.status_code != 200:\n            error = resp.json()\n\n    f.close()\n    print(\n        json.dumps(\n            {\n                \"message\": \"Import complete\",\n                \"request\": request,\n                \"success\": error is None,\n                \"first_error\": error,\n                \"severity\": \"INFO\",\n            }\n        )\n    )",
      "language": "python",
      "name": "main.py"
    },
    {
      "code": "google-cloud-storage\nrequests",
      "language": "text",
      "name": "requirements.txt"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Authentication",
  "body": "Don't forget to fill out the `PROJECT_ID`, `USER`, `PASS` variables with your project_id and service account credentials."
}
[/block]
This code will be triggered whenever a new object is added to your bucket. It streams over the newly added object, assuming each line is newline delimited JSON in Mixpanel's event format. It then forms batches and hits our /import API, retrying any retryable errors. It logs a single message on completion. If it fails due to a validation error, this log includes the first non-retryable error encountered.

Click `Deploy` to deploy the function. At this point, any file you upload to the bucket will trigger an invocation of the function and an import into Mixpanel. Let's test it out!
[block:api-header]
{
  "title": "Step 3: Test with sample data and watch the logs"
}
[/block]
Let's test the connection with some [sample events](https://storage.googleapis.com/mixpanel-sample-data/10-events.json). Run the following to copy them to your bucket, which will trigger the import:

`gsutil cp gs://mixpanel-sample-data/10-events.json gs://<YOUR-BUCKET>/`

Monitor the logs of your Cloud Function; you should see an `Import Complete` log line within a minute. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2ad050c-Screen_Shot_2021-08-08_at_11.20.17_PM.png",
        "Screen Shot 2021-08-08 at 11.20.17 PM.png",
        1816,
        398,
        "#f1f2f5"
      ],
      "caption": "Cloud Function logs"
    }
  ]
}
[/block]
If you navigate to Stackdriver logs, you will see a more detailed log that includes the filename being imported and the first error encountered (if any).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/53cfd51-Screen_Shot_2021-08-08_at_11.33.53_PM.png",
        "Screen Shot 2021-08-08 at 11.33.53 PM.png",
        1530,
        690,
        "#f8f9fb"
      ],
      "caption": "Stackdriver logs. The jsonPayload also contains the request field, which contains metadata about the object that was ingested."
    }
  ]
}
[/block]
Finally, let's confirm that the events made it into Mixpanel. Head to [Live View](https://mixpanel.com/report/live), pick `test_event` in the event picker, and you should see the events you just imported.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0ea981a-Screen_Shot_2021-08-08_at_10.44.40_PM.png",
        "Screen Shot 2021-08-08 at 10.44.40 PM.png",
        2696,
        1538,
        "#fcfcfc"
      ],
      "caption": "You can expand any event in Liveview to see all its properties."
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 4: Import more data"
}
[/block]
We're now ready for an import of your own data. If your data is not already in the Mixpanel format, this is a good time to write a transformation step to run as part of the Cloud Function. We recommend testing locally as you iterate on your data transformation logic, as it's much quicker than redeploying the Cloud Function. The [Overview](doc:cloud-ingestion) page has sample code and data to test locally.

Once you're ready and have tested with a few small files, you can upload all the files for your import to your GCS bucket, and the import will kick off. This pipeline can be made recurring by uploading files to the GCS bucket periodically.

We recommend partitioning files in GCS to ~200MB of JSON for optimal performance.
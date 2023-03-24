---
title: "Amazon S3"
slug: "s3-import"
hidden: false
metadata: 
  title: "Cloud Ingestion: Amazon S3 | Mixpanel Developer Docs"
  description: "This guide demonstrates how to set up a serverless ingest pipeline from an AWS S3 bucket into Mixpanel. The complete setup should take ~10 minutes."
createdAt: "2021-08-13T15:49:03.541Z"
updatedAt: "2022-04-19T05:29:26.723Z"
---
This guide demonstrates how to set up a serverless ingest pipeline from an AWS S3 bucket into Mixpanel. Once this is set up, you can simply upload files containing events into the designated S3 bucket and the events will be ingested into Mixpanel, both one-time and on a recurring basis. Setup should take ~5-10 minutes.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/395c916-Screen_Shot_2021-08-13_at_1.47.46_PM.png",
        "Screen Shot 2021-08-13 at 1.47.46 PM.png",
        1658,
        842,
        "#eeedf1"
      ]
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "This guide assumes you are running in Amazon Web Services, and have the necessary IAM Access to have AWS Lambda read from S3.",
  "title": "Prerequisites"
}
[/block]

[block:api-header]
{
  "title": "Step 1: Create an S3 Bucket"
}
[/block]
[Create a dedicated S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) for this integration. We recommend including `mixpanel-import` in the name to make it explicit and avoid any accidental data sharing.

You can create the bucket in any region, though it will need to be in the same region as your AWS Lambda function.
[block:api-header]
{
  "title": "Step 2a: Setup the Lambda Function"
}
[/block]
Create a [new Lambda Function](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html). 
* Select `Author From Scratch`.
* Set the runtime to `python 3.7`.
* Select  `Create Function`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2041d12-Screen_Shot_2021-08-13_at_10.37.43_AM.png",
        "Screen Shot 2021-08-13 at 10.37.43 AM.png",
        2276,
        1238,
        "#f5f6f6"
      ],
      "caption": "Lambda Function configuration"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 2b: Write the Lambda Function"
}
[/block]
Change the filename from `lambda_function.py` to `main.py` and edit the `runtime settings` handler to `main.Handler`. Paste the code below for `main.py`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b866d6d-Screen_Shot_2021-09-16_at_4.13.14_PM.png",
        "Screen Shot 2021-09-16 at 4.13.14 PM.png",
        1610,
        590,
        "#f5f6f6"
      ]
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "from datetime import date\nfrom io import TextIOWrapper\nimport gzip\nimport json\nimport random\nimport time\nimport urllib.parse\nimport os\n\nimport boto3\nimport requests\n\n\nPROJECT_ID = \"\"  # mixpanel.com/project/<YOUR_PROJECT_ID>\nUSER = \"\"  # Service Account user\nPASS = \"\"  # Service Account password\n\n# Flush a batch once these limits are hit\nEVENTS_PER_BATCH = 2000\nBYTES_PER_BATCH = 2 * 1024 * 1024\n\n\n# Adjust event timestamps of test data so that it appears recent in Mixpanel.\n# NOTE: THIS IS JUST FOR DEMO PURPOSES.\n# REPLACE THIS WITH YOUR OWN TRANSFORMS IN PRODUCTION.\ndef transform_to_event(line):\n    \"\"\"Convert a line of the file to a json string in Mixpanel's format.\"\"\"\n    event = json.loads(line)\n    event[\"properties\"][\"time\"] = int(date.today().strftime(\"%s\"))\n    return json.dumps(event)\n  \n\ndef flush(batch):\n    payload = gzip.compress(\"\\n\".join(batch).encode(\"utf-8\"))\n    tries = 0\n    while True:\n        resp = requests.post(\n            \"https://api.mixpanel.com/import\",\n            params={\"strict\": \"1\", \"project_id\": PROJECT_ID},\n            headers={\n                \"Content-Type\": \"application/x-ndjson\",\n                \"Content-Encoding\": \"gzip\",\n                \"User-Agent\": \"mixpanel-s3\"\n            },\n            auth=(USER, PASS),\n            data=payload,\n        )\n        if resp.status_code == 429 or resp.status_code >= 500:\n            time.sleep(min(2 ** tries, 60) + random.randint(1, 5))\n            tries += 1\n            continue\n        return resp\n\n\ndef Handler(event, context):\n    s3 = boto3.client('s3')\n\n    bucket =  event['Records'][0]['s3']['bucket']['name']\n    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')\n\n    blob = s3.get_object(Bucket=bucket, Key=key)\n    if blob['ResponseMetadata']['HTTPHeaders']['content-type'] == 'application/x-gzip':\n        gzipped = gzip.GzipFile(None, 'rb', fileobj=blob['Body'])\n        data = TextIOWrapper(gzipped).read()\n    else:\n        data = blob['Body'].read().decode('utf-8').splitlines()\n\n    error = None\n    batch, batch_bytes = [], 0\n    \n    for line in data:\n        # Here we assume each line is valid JSON representing a single Mixpanel event\n        # If lines are not in Mixpanel's format, apply any transformations here.\n        line = transform_to_event(line)\n  \n        batch.append(line)\n        batch_bytes += len(line)\n    \n    \n        if len(batch) == EVENTS_PER_BATCH or batch_bytes >= BYTES_PER_BATCH:\n            resp = flush(batch)\n            batch, batch_bytes = [], 0\n    \n            if resp.status_code != 200:\n                error = resp.json()\n                break\n\n    # Flush final batch\n    if batch and not error:\n        resp = flush(batch)\n        if resp.status_code != 200:\n            error = resp.json()\n    \n\n    print(\n        json.dumps(\n            {\n                \"message\": \"Import complete\",\n                \"request\": event,\n                \"success\": error is None,\n                \"first_error\": error,\n                \"severity\": \"INFO\",\n            }\n        )\n    )",
      "language": "python",
      "name": "main.py"
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

[block:api-header]
{
  "title": "Step 2c: Add Trigger"
}
[/block]
Add a trigger so that your Lambda function runs whenever a new object is added to your bucket by selecting `Add trigger` under `Function Overview`. You will want to use the bucket created in Step 2 and select `All object create events`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5b68029-Screen_Shot_2021-08-13_at_10.53.41_AM.png",
        "Screen Shot 2021-08-13 at 10.53.41 AM.png",
        1608,
        1346,
        "#f6f6f6"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 2d: Update Configurations and Deploy"
}
[/block]
Select `Configuration` > `General Configuration` > `Edit`.
* Change `Memory` to `1024 MB`.
* Change `Timeout` to `5 minutes`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5bbcc0b-Screen_Shot_2021-08-13_at_11.07.40_AM.png",
        "Screen Shot 2021-08-13 at 11.07.40 AM.png",
        1606,
        1236,
        "#f7f8f8"
      ]
    }
  ]
}
[/block]
Click `Versions` > `Publish New Version` to deploy the function. At this point, any file you upload to the bucket will trigger an invocation of the function and an import into Mixpanel. Let's test it out!
[block:api-header]
{
  "title": "Step 3: Test with sample data and watch the logs"
}
[/block]
Let's test the connection with some [sample events](https://storage.googleapis.com/mixpanel-sample-data/10-events.json). Run the following to copy them to your bucket, which will trigger the import:

`gsutil cp cp gs://mixpanel-sample-data/10-events.json s3://your-s3-bucket/example.json`

Monitor the logs of your Lambda Function; you should see an `Import Complete` log line within a minute. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/cbe3321-Screen_Shot_2021-08-13_at_11.12.57_AM.png",
        "Screen Shot 2021-08-13 at 11.12.57 AM.png",
        2680,
        694,
        "#f2f2f3"
      ],
      "caption": "Cloud Function logs"
    }
  ]
}
[/block]
If you navigate to CloudWatch logs, you will see a more detailed log that includes the filename being imported and the first error encountered (if any).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d74173e-Screen_Shot_2021-08-13_at_11.14.46_AM.png",
        "Screen Shot 2021-08-13 at 11.14.46 AM.png",
        1512,
        1520,
        "#fafbfa"
      ],
      "caption": ""
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
We're now ready for an import of your own data. If your data is not already in the Mixpanel format, this is a good time to write a transformation step to run as part of the Lambda. We recommend testing locally as you iterate on your data transformation logic, as it's much quicker than redeploying the Lambda. The [Overview](doc:cloud-ingestion) page has sample code and data to test locally.

Once you're ready and have tested with a few small files, you can upload all the files for your import to your S3 bucket, and the import will kick off. This pipeline can be made recurring by uploading files to the S3 bucket periodically.

We recommend partitioning files in S3 to ~200MB of JSON for optimal performance.
---
title: "Google Pub/Sub"
slug: "google-pubsub"
hidden: false
metadata: 
  title: "Cloud Ingestion: Google Pub/Sub | Mixpanel Developer Docs"
  description: "This guide demonstrates how to plug Mixpanel into an event collection pipeline hosted in Google Cloud. Route your events to Mixpanel in real-time for analytics."
createdAt: "2021-08-11T07:03:55.976Z"
updatedAt: "2022-04-19T05:28:21.929Z"
---
This guide demonstrates how to plug Mixpanel into an event collection pipeline hosted in Google Cloud. Once set up, your events will route to Mixpanel and be available in real-time for analytics. This approach is serverless and open-source, and takes ~5 minutes to set up.

Note: if you are on AWS, this approach is very similar using Kinesis and AWS Lambda.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/205120e-Screen_Shot_2021-08-13_at_1.35.04_PM.png",
        "Screen Shot 2021-08-13 at 1.35.04 PM.png",
        2146,
        844,
        "#eef1fa"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 1: Create a Cloud Pub/Sub Topic"
}
[/block]
(You can skip this step if you already have a Pub/Sub topic with events flowing through it.)

Create a [new Pub/Sub Topic](https://console.cloud.google.com/cloudpubsub/topic). All events that will ultimately route to Mixpanel will flow through this Pub/Sub topic.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0e29343-Screen_Shot_2021-08-11_at_3.08.50_PM.png",
        "Screen Shot 2021-08-11 at 3.08.50 PM.png",
        486,
        345,
        "#f3f4f6"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 2a: Add a Cloud Function Trigger to your Pub/Sub Topic"
}
[/block]
In this step, we set up a Cloud Function to trigger whenever events are pushed to your Pub/Sub topic. [Google's documentation](https://cloud.google.com/functions/docs/calling/pubsub) goes into full detail on how this trigger works.

From your newly created topic, click `+Trigger Cloud Function`. Give the Cloud Function a name and Save.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/da1b9c2-Screen_Shot_2021-08-11_at_11.51.52_PM.png",
        "Screen Shot 2021-08-11 at 11.51.52 PM.png",
        1854,
        84,
        "#e8ecf4"
      ]
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/67dc55e-Screen_Shot_2021-08-11_at_3.13.32_PM.png",
        "Screen Shot 2021-08-11 at 3.13.32 PM.png",
        578,
        662,
        "#f6f7f7"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 2b: Write the Cloud Function"
}
[/block]
Switch the runtime to `Python3.9` and change the entrypoint from `hello_pubsub` to `main`. Paste the code below for main.py and requirements.txt.
[block:code]
{
  "codes": [
    {
      "code": "import base64\nfrom datetime import date\nimport gzip\nimport json\nimport random\nimport time\n\nimport requests\n\n\nPROJECT_ID = \"\"  # mixpanel.com/project/<YOUR_PROJECT_ID>\nUSER = \"\"  # Service Account user\nPASS = \"\"  # Service Account password\n\n\ndef main(event, context):\n    # Assumes the message consists of lines of JSON, each in Mixpanel's format\n    msg = base64.b64decode(event[\"data\"]).decode(\"utf-8\")\n    events = [json.loads(line) for line in msg.split(\"\\n\") if len(line) > 0]\n\n    # Adjust the timestammps of each of the sample events so that\n    # they appear recent. Note: this is just for this demo, do not\n    # do this in production.\n    for e in events:\n        e[\"properties\"][\"time\"] = int(date.today().strftime(\"%s\"))\n\n    # Send to Mixpanel\n    tries = 0\n    payload = gzip.compress(json.dumps(events).encode(\"utf-8\"))\n    while True:\n        resp = requests.post(\n            \"https://api.mixpanel.com/import\",\n            params={\"strict\": \"1\", \"project_id\": PROJECT_ID},\n            auth=(USER, PASS),\n            headers={\"Content-Type\": \"application/json\", \"Content-Encoding\": \"gzip\", \"User-Agent\": \"mixpanel-pubsub\"},\n            data=payload,\n        )\n        if resp.status_code == 429 or resp.status_code >= 500:\n            # Retryable errors, use exponential backoff\n            tries += 1\n            time.sleep(min(2 ** tries, 60) + random.randint(1, 5))\n            continue\n        else:\n            break\n\n    if resp.status_code != 200:\n        # Log failures. In production, write to a dead-letter queue\n        print({\"message\": \"Import failed\", \"error\": resp.json(), \"severity\": \"WARN\"})\n    else:\n        # Log success for debugging. Remove in production.\n        print(\n            {\n                \"message\": \"Import succeeded\",\n                \"count\": resp.json()[\"num_records_imported\"],\n                \"severity\": \"INFO\",\n            }\n        )",
      "language": "python",
      "name": "main.py"
    },
    {
      "code": "requests",
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
This code does a very simple passthrough of events from the incoming Pubsub message into Mixpanel's [Import API](ref:import-events). You can use this function to transform events from your Pub/Sub topic into Mixpanel's format before sending them to our Import API.
[block:api-header]
{
  "title": "Step 3: Test with sample events"
}
[/block]
Now messages published to our Pubsub topic will trigger an invocation of the function and route events to Mixpanel. Let's give it a try by manually sending a message via the PubSub UI.

On the topic page, navigate to `Messages -> Publish message`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/10bd844-Screen_Shot_2021-08-11_at_11.01.43_PM.png",
        "Screen Shot 2021-08-11 at 11.01.43 PM.png",
        1056,
        306,
        "#f7f7f8"
      ]
    }
  ]
}
[/block]
Then paste in the following events as the message body.
[block:code]
{
  "codes": [
    {
      "code": "{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"Sunrostern\", \"$insert_id\": \"28096095\", \"title\": \"Creator Giveaway for Publishing Notes\", \"url\": \"https://www.viewert.com\", \"score\": \"1\", \"time\": 1628315585}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"feross\", \"$insert_id\": \"28059483\", \"title\": \"`at` Method for Relative Indexing\", \"url\": \"https://v8.dev/features/at-method\", \"score\": \"1\", \"time\": 1628074042}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"prostoalex\", \"$insert_id\": \"28069645\", \"title\": \"Home Classrooms Became a Necessity During Covid. Now They\\u2019re a Selling Point\", \"url\": \"https://www.wsj.com/articles/home-classrooms-covid-real-estate-11628100036\", \"score\": \"1\", \"time\": 1628135271}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"bingewave\", \"$insert_id\": \"28063639\", \"title\": \"Building a Live Streaming Movie App and Live TV Website \\u2013 ReactJS\", \"url\": \"https://medium.com/bingewave/building-a-live-streaming-movie-app-live-tv-website-part-1-d0857aaac8ea\", \"score\": \"1\", \"time\": 1628097439}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"jashkenas\", \"$insert_id\": \"28063632\", \"title\": \"Classic Research in Data Visualization\", \"url\": \"https://observablehq.com/@tophtucker/classic-research-in-data-visualization\", \"score\": \"1\", \"time\": 1628097398}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"ivandiblasi68\", \"$insert_id\": \"28091778\", \"title\": \"Il sistema sanitario irlandese colpito da un ransomware\", \"url\": \"https://www.kaspersky.it/blog/irish-health-service-ransomware/24680/\", \"score\": \"1\", \"time\": 1628278340}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"akdav\", \"$insert_id\": \"28091776\", \"title\": \"DeFi and KYC\", \"url\": \"https://link.medium.com/bsn7z9Jmvib\", \"score\": \"1\", \"time\": 1628278312}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"webscraping99\", \"$insert_id\": \"28085411\", \"title\": \"LinkedIn Profile Detail Scrapers \\u2013 Ahmad Software Technologies\", \"url\": \"https://ahmadsoftwaretechnologies3.mypixieset.com/linkedin-profile-detail-scrapers/\", \"score\": \"1\", \"time\": 1628246831}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"Dorimoody\", \"$insert_id\": \"28064346\", \"title\": \"Our Children and Our Citations: Each One, Both Together\", \"url\": \"https://www.plough.com/en/topics/life/work/our-children-and-our-citations-each-one-both-together\", \"score\": \"1\", \"time\": 1628101041}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"feross\", \"$insert_id\": \"28064342\", \"title\": \"The SEC Has Its Eye on Crypto\", \"url\": \"https://www.bloomberg.com/opinion/articles/2021-08-04/the-sec-has-its-eye-on-crypto\", \"score\": \"1\", \"time\": 1628101019}}",
      "language": "json",
      "name": "events"
    }
  ]
}
[/block]
Once you `Publish`, the function will trigger and pass the above payload to the Cloud Function. Within a minute, you should see an `Import succeeded` log line in the Cloud Function logs.

You can then navigate to [Live View](http://mixpanel.com/report/live) to see the events in Mixpanel.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e793a46-Screen_Shot_2021-08-11_at_11.25.59_PM.png",
        "Screen Shot 2021-08-11 at 11.25.59 PM.png",
        2752,
        1652,
        "#fcfcfd"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 4: Connecting your production pipeline"
}
[/block]
At this point, you can route events from your production Pub/Sub topic through a Cloud Function in a similar manner as described above. Simplify modify the Cloud Function to transform events from your internal event format into the format expected by Mixpanel. This is also a good point to strip any PII.

Once connected, this will result in a steady stream of events being sent to Mixpanel. Happy streaming!
[block:api-header]
{
  "title": "Error Handling"
}
[/block]
In rare instances, Mixpanel's /import API may return a 429 or 5XX error. These can be safely retried. We recommend an exponential backoff with jitter strategy, as written in the sample code above. PubSub can be configured to perform exponential backoff if the function itself times out.

If the payload is malformed, our API might return a 400 error. In this case, the item cannot be ingested and this error should not be retried. Enqueue these messages onto a dead-letter-queue for inspection later on. This might happen while initially testing the connector, but should be rare in production, assuming the shape of data flowing through the pipeline remains consistent.

Google has a [great reference](https://cloud.google.com/pubsub/docs/handling-failures) on best practices for handling both retryable and non-retryable errors.
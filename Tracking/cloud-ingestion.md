---
title: "Cloud"
slug: "cloud-ingestion"
hidden: false
metadata: 
  title: "Cloud Ingestion Overview | Mixpanel Developer Docs"
  description: "Cloud Import is currently in closed beta and not adding new projects. If you would like to learn more, you can read about the feature here."
createdAt: "2021-08-13T18:30:14.748Z"
updatedAt: "2023-03-20T23:41:07.902Z"
---
If you already collect event data, these guides offer a few approaches to quickly integrate Mixpanel. The goal is to get Mixpanel plugged into your existing data pipelines in minutes. 

We provide reference guides for:
* [Snowplow](doc:snowplow)
* [Amazon S3](doc:s3-import)
* [Google Cloud Storage](doc:gcs-import)
* [Google Pub/Sub](doc:google-pubsub)

The approaches in these guides require writing a little bit of code, but give you full control and configurability of the data you send to Mixpanel.

Note: It's easy to integrate Mixpanel even if you use tools that we don't explicitly list here, like Spark, Airflow, Prefect, Dagster, or Kafka. Ultimately, all of these ingestion methods boil down to hitting our simple, scalable [HTTP APIs](ref:import-events) using the tools that you're most familiar with.
[block:api-header]
{
  "title": "Best practices"
}
[/block]
* Events are immutable, so we recommend testing in a test project and then only routing to your production project when confident.
*  We recommend being explicit about what is tracked to Mixpanel rather than implicitly tracking everything, both for performance and security reasons. Avoid sending user generated content, high-cardinality IDs, or large semi-structured objects.
* Import a more recent time window first (last 7 days or last 30 days) before backfilling historical data. Mixpanel's autocomplete menus populate events and properties based on the last 30 days of data, so this is the best way to test that data looks as expected.
* Leverage batching and compression. Each request to /import can send 2000 events to Mixpanel and can be sent compressed using gzip. The sample code in this guide does both.
* When using Cloud Storage, partition files into ~200MB of JSON (or ~200K records) each. Each file is processed in parallel by Cloud Functions/Lambda and must be ingested by the function within the configured timeout.
* Log any 400 errors returned by the API. These are non-retryable and indicate something malformed with the data. This should be extremely unlikely once the API is up and running. If a batch contains a mix of valid and invalid data, we will ingest the valid data.
[block:api-header]
{
  "title": "Limits"
}
[/block]
Our Import API is built to ingest billions of events per day across our customers. That said, we do rate limit at very high scale to ensure quality of service and real-time ingestion. Please refer to our [Import API docs](ref:import-events) for details.

All of our sample code transparently retries and backoff from rate limit exceptions. If you require a higher-limit for a 1-time backfill, please reach out to us at apis@mixpanel.com.
[block:api-header]
{
  "title": "Testing locally"
}
[/block]
We recommend testing locally to quickly iterate and become familiar with our API.

Here is a sample script you can run and a sample of events in Mixpanel's format for reference. Just fill out your credentials at the top to try it out.
[block:code]
{
  "codes": [
    {
      "code": "\"\"\"Sample script to get used to the Mixpanel event format.\"\"\"\nimport gzip\nimport json\nimport time\n\nimport requests\n\nPROJECT_ID = \"\"  # mixpanel.com/project/<YOUR_PROJECT_ID>\nUSER = \"\"  # Service Account user\nPASS = \"\"  # Service Account password\n\n\nsample_events = [\n    {\n        \"event\": \"my_test_event\",\n        \"properties\": {\n            # These properties are required\n            \"time\": int(time.time()),\n            \"distinct_id\": \"test_user\",\n            \"$insert_id\": \"04ce0cf4-a633-4371-b665-9b45317b4976\",\n            # Any other properties are optional\n            \"city\": \"San Francisco\",\n        },\n    },\n    {\n        \"event\": \"another_event\",\n        \"properties\": {\n            \"time\": int(time.time()),\n            \"distinct_id\": \"test_user_2\",\n            \"$insert_id\": \"3b033b9a-6bc9-4b70-90c3-a53e11f6896e\",\n            \"city\": \"Seattle\",\n        },\n    },\n]\n\n\nprint(\"Ingesting \", sample_events)\n\n# Convert to ndJSON\npayload = \"\\n\".join([json.dumps(e) for e in sample_events])\n\nresp = requests.post(\n    \"https://api.mixpanel.com/import\",\n    params={\"strict\": \"1\", \"project_id\": PROJECT_ID},\n    auth=(USER, PASS),\n    headers={\"Content-Type\": \"application/x-ndjson\", \"Content-Encoding\": \"gzip\"},\n    data=gzip.compress(payload.encode(\"utf-8\")),\n)\n\nprint(resp.json())\n",
      "language": "python",
      "name": "test.py"
    },
    {
      "code": "{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"Sunrostern\", \"$insert_id\": \"28096095\", \"title\": \"Creator Giveaway for Publishing Notes\", \"url\": \"https://www.viewert.com\", \"score\": \"1\", \"time\": 1628315585}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"feross\", \"$insert_id\": \"28059483\", \"title\": \"`at` Method for Relative Indexing\", \"url\": \"https://v8.dev/features/at-method\", \"score\": \"1\", \"time\": 1628074042}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"prostoalex\", \"$insert_id\": \"28069645\", \"title\": \"Home Classrooms Became a Necessity During Covid. Now They\\u2019re a Selling Point\", \"url\": \"https://www.wsj.com/articles/home-classrooms-covid-real-estate-11628100036\", \"score\": \"1\", \"time\": 1628135271}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"bingewave\", \"$insert_id\": \"28063639\", \"title\": \"Building a Live Streaming Movie App and Live TV Website \\u2013 ReactJS\", \"url\": \"https://medium.com/bingewave/building-a-live-streaming-movie-app-live-tv-website-part-1-d0857aaac8ea\", \"score\": \"1\", \"time\": 1628097439}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"jashkenas\", \"$insert_id\": \"28063632\", \"title\": \"Classic Research in Data Visualization\", \"url\": \"https://observablehq.com/@tophtucker/classic-research-in-data-visualization\", \"score\": \"1\", \"time\": 1628097398}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"ivandiblasi68\", \"$insert_id\": \"28091778\", \"title\": \"Il sistema sanitario irlandese colpito da un ransomware\", \"url\": \"https://www.kaspersky.it/blog/irish-health-service-ransomware/24680/\", \"score\": \"1\", \"time\": 1628278340}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"akdav\", \"$insert_id\": \"28091776\", \"title\": \"DeFi and KYC\", \"url\": \"https://link.medium.com/bsn7z9Jmvib\", \"score\": \"1\", \"time\": 1628278312}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"webscraping99\", \"$insert_id\": \"28085411\", \"title\": \"LinkedIn Profile Detail Scrapers \\u2013 Ahmad Software Technologies\", \"url\": \"https://ahmadsoftwaretechnologies3.mypixieset.com/linkedin-profile-detail-scrapers/\", \"score\": \"1\", \"time\": 1628246831}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"Dorimoody\", \"$insert_id\": \"28064346\", \"title\": \"Our Children and Our Citations: Each One, Both Together\", \"url\": \"https://www.plough.com/en/topics/life/work/our-children-and-our-citations-each-one-both-together\", \"score\": \"1\", \"time\": 1628101041}}\n{\"event\": \"test_event\", \"properties\": {\"distinct_id\": \"feross\", \"$insert_id\": \"28064342\", \"title\": \"The SEC Has Its Eye on Crypto\", \"url\": \"https://www.bloomberg.com/opinion/articles/2021-08-04/the-sec-has-its-eye-on-crypto\", \"score\": \"1\", \"time\": 1628101019}}",
      "language": "json",
      "name": "events.json"
    }
  ]
}
[/block]
After running this script you can see the events appear in [Live View](http://mixpanel.com/report/live).
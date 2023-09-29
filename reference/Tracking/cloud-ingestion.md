---
title: "HTTP API"
slug: "cloud-ingestion"
hidden: false
metadata: 
  title: "Cloud Ingestion Overview | Mixpanel Developer Docs"
  description: "Cloud Import is currently in closed beta and not adding new projects. If you would like to learn more, you can read about the feature here."
createdAt: "2021-08-13T18:30:14.748Z"
updatedAt: "2023-03-26T20:20:44.895Z"
---
If you don't see an SDK or an integration in your language, you can send events to our API directly.

Here's a sample script. Just plug in your API Secret at the top, run the script, and visit our [Events page](https://mixpanel.com/report/events) to see the events in our UI.
[block:code]
{
  "codes": [
    {
      "code": "# Fill this out. Note: this API requires the API Secret, not the Project Token\nAPI_SECRET = \"\"  # Get this from mixpanel.com/settings/project\n\nimport json\nimport time\nimport requests\n\n\nevents = [\n    {\"event\": \"my_test_event\", \"properties\": {\"time\": int(time.time()), \"distinct_id\": \"test_user_1\", \"$insert_id\": \"04ce0cf4-a633-4371-b665-9b45317b4976\", \"city\": \"San Francisco\"}},\n    {\"event\": \"another_event\", \"properties\": {\"time\": int(time.time()), \"distinct_id\": \"test_user_2\", \"$insert_id\": \"3b033b9a-6bc9-4b70-90c3-a53e11f6896e\", \"city\": \"Seattle\"}}\n]\nresp = requests.post(\n    \"https://api.mixpanel.com/import\",\n    params={\"strict\": \"1\"},\n    auth=(API_SECRET, \"\"),\n    headers={\"Content-Type\": \"application/json\"},\n    data=json.dumps(events)\n)\n\nprint(resp.json())\n",
      "language": "python",
      "name": "test.py"
    }
  ]
}
[/block]
See our [API reference](ref:events) for more details.
[block:callout]
{
  "type": "info",
  "title": "Looking for a more in-depth walkthrough?",
  "body": "See our [Amazon S3](doc:s3-import) or [Google Cloud Storage](doc:gcs-import) guides for a more production-grade example of how to use this API."
}
[/block]

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
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

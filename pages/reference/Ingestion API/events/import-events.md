---
title: "Import Events"
slug: "import-events"
excerpt: "Send batches of events from your servers to Mixpanel.\n***\n[block:api-header]\n{\n  \"title\": \"Request Format\"\n}\n[/block]\nEach request ingests a batch of events into Mixpanel. We accept up to 2000 events and 2MB uncompressed per request. Events are part of the request body. We support Content-Type `application/json` or `application/x-ndjson`:\n[block:code]\n{\n  \"codes\": [\n    {\n      \"code\": \"[\\n  {\\\"event\\\": \\\"Signup\\\", \\\"properties\\\": {\\\"time\\\": 1618716477000,\\\"distinct_id\\\": \\\"91304156-cafc-4673-a237-623d1129c801\\\",\\\"$insert_id\\\": \\\"29fc2962-6d9c-455d-95ad-95b84f09b9e4\\\",\\\"Referred by\\\": \\\"Friend\\\",\\\"URL\\\": \\\"mixpanel.com/signup\\\"}},\\n  {\\\"event\\\": \\\"Purchase\\\", \\\"properties\\\": {\\\"time\\\": 1618716477000,\\\"distinct_id\\\": \\\"91304156-cafc-4673-a237-623d1129c801\\\",\\\"$insert_id\\\": \\\"935d87b1-00cd-41b7-be34-b9d98dd08b42\\\",\\\"Item\\\": \\\"Coffee\\\", \\\"Amount\\\": 5.0}}\\n]\",\n      \"language\": \"json\",\n      \"name\": \"JSON\"\n    },\n    {\n      \"code\": \"{\\\"event\\\": \\\"Signup\\\", \\\"properties\\\": {\\\"time\\\": 1618716477000,\\\"distinct_id\\\": \\\"91304156-cafc-4673-a237-623d1129c801\\\",\\\"$insert_id\\\": \\\"29fc2962-6d9c-455d-95ad-95b84f09b9e4\\\",\\\"Referred by\\\": \\\"Friend\\\",\\\"URL\\\": \\\"mixpanel.com/signup\\\"}}\\n{\\\"event\\\": \\\"Purchase\\\", \\\"properties\\\": {\\\"time\\\": 1618716477000,\\\"distinct_id\\\": \\\"91304156-cafc-4673-a237-623d1129c801\\\",\\\"$insert_id\\\": \\\"935d87b1-00cd-41b7-be34-b9d98dd08b42\\\",\\\"Item\\\": \\\"Coffee\\\", \\\"Amount\\\": 5.0}}\\n\",\n      \"language\": \"json\",\n      \"name\": \"ndJSON\"\n    }\n  ]\n}\n[/block]\nWe also support `Content-Encoding: gzip` to reduce network egress.\n[block:api-header]\n{\n  \"title\": \"Authentication\"\n}\n[/block]\n/import requires an Owner or Admin [Service Account](ref:service-accounts). project_id, service account username and service account password are required to authenticate a request.\n\nNote: /import also supports [Project Secret](ref:project-secret) for legacy reasons. If you do not specify project_id, we will use secret auth.\n[block:api-header]\n{\n  \"title\": \"Validation\"\n}\n[/block]\n/import validates the supplied events and returns a 400 status code if _any_ of the events fail validation with details of the error. If some events pass validation and others fail, we will ingest the events that pass validation. When you encounter a 400 error in production, simply log the JSON response, as it will contain the `$insert_id`s of the invalid events, which can be used to debug.\n\n### High-level requirements\n\n- Each event must be properly formatted JSON.\n- Each event must contain an event name, time, distinct_id, and $insert_id. These are used to deduplicate events, so that this endpoint can be safely retried.\n- Each event must be smaller than 1MB of uncompressed JSON.\n- Each event must have fewer than 255 properties.\n- All nested object properties must have fewer than 255 keys and max nesting depth is 3.\n- All array properties must have fewer than 255 elements.\n\n### Example of an event\n[block:code]\n{\n  \"codes\": [\n    {\n      \"code\": \"{\\n  \\\"event\\\": \\\"Signed up\\\",\\n  \\\"properties\\\": {\\n    \\\"time\\\": 1618716477000,\\n    \\\"distinct_id\\\": \\\"91304156-cafc-4673-a237-623d1129c801\\\",\\n    \\\"$insert_id\\\": \\\"29fc2962-6d9c-455d-95ad-95b84f09b9e4\\\",\\n    \\\"ip\\\": \\\"136.24.0.114\\\",\\n    \\\"Referred by\\\": \\\"Friend\\\",\\n    \\\"URL\\\": \\\"mixpanel.com/signup\\\",\\n  }\\n}\",\n      \"language\": \"json\"\n    }\n  ]\n}\n[/block]\n\n### event\n\nThis is the name of the event. If you're loading data from a data warehouse, we recommend using the name of the table as the name of the event.\n\nWe recommend keeping the number of unique event names relatively small and using properties for any variable context attached to the event. For example, instead of tracking events with names \"Paid Signup\" and \"Free Signup\", we would recommend tracking an event called \"Signup\" and having a property \"Account Type\" with value \"paid\" or \"free\".\n\n### **properties**\n\nThis is a JSON object representing all the properties about the event. If you're loading data from a data warehouse, we recommend using column names as the names of properties.\n\n### properties.time\n\nThe time at which the event occurred, in seconds or milliseconds since epoch. We require a value for time. We will reject events with time values that are before 1971-01-01 or more than 1 hour in the future as measured on our servers.\n\n### properties.distinct_id\n\ndistinct_id identifies the user who performed the event. distinct_id must be specified on every event, as it is crucial for Mixpanel to perform behavioral analysis (unique users, funnels, retention, cohorts) correctly and efficiently.\n\nIf the event is not associated with any user, set distinct_id to the empty string. Events with an empty distinct_id will be excluded from all behavioral analysis.\n\nTo prevent accidental implementation mistakes, we disallow the following values for distinct_id:\n[block:code]\n{\n  \"codes\": [\n    {\n      \"code\": \"- 00000000-0000-0000-0000-000000000000\\n- anon\\n- anonymous\\n- nil\\n- none\\n- null\\n- n/a\\n- na\\n- undefined\\n- unknown\\n- <nil>\\n- 0\\n- -1\\n- true\\n- false\\n- []\\n- {}\\n\",\n      \"language\": \"text\"\n    }\n  ]\n}\n[/block]\n\n### properties.$insert_id\n\nWe require that $insert_id be specified on every event. $insert_id provides a unique identifier for the event, which we use for deduplication. Events with identical values for (event, time, distinct_id, $insert_id) are considered duplicates and only one of them will be surfaced in queries.\n\n$insert_ids must be ≤ 36 bytes and contain only alphanumeric characters or \"-\". We also disallow any value for $insert_id from the list of invalid IDs provided for distinct_id above.\n\n### Example of a validation error\n[block:code]\n{\n  \"codes\": [\n    {\n      \"code\": \"{\\n  \\\"code\\\": 400,\\n  \\\"error\\\": \\\"some data points in the request failed validation\\\",\\n  \\\"failed_records\\\": [\\n    {\\n      \\\"index\\\": 0,\\n      \\\"$insert_id\\\": \\\"8a66058c-a56d-4ef6-8123-28b7c9f7e82f\\\",\\n      \\\"field\\\": \\\"properties.time\\\",\\n      \\\"message\\\": \\\"properties.time' is invalid: must be specified as seconds since epoch\\\"\\n    },\\n    {\\n      \\\"index\\\": 3,\\n      \\\"$insert_id\\\": \\\"29fc2962-6d9c-455d-95ad-95b84f09b9e4\\\",\\n      \\\"field\\\": \\\"properties.utm_source\\\",\\n      \\\"message\\\": \\\"properties.utm_source is invalid: string should be valid utf8\\\"\\n    },\\n  ],\\n  \\\"num_records_imported\\\": 23,\\n  \\\"status\\\": \\\"Bad Request\\\"\\n}\",\n      \"language\": \"json\"\n    }\n  ]\n}\n[/block]\nWhen any single event in the batch does not pass validation, we return a 400 status code and a response that looks like the above.\n\n`failed_records` includes one row for each of the failed events, with details about the error we found. If some of the rows passed validation, we will ingest them and return their count in `num_records_imported`.\n[block:api-header]\n{\n  \"title\": \"GeoIP Enrichment\"\n}\n[/block]\nIf you supply a property `ip` with an IP address, Mixpanel will automatically do a GeoIP lookup and replace the `ip` property with geographic properties (City, Country, Region). These properties can be used in our UI to segment events geographically.\n\nThis is an example of an event before and after enrichment:\n[block:code]\n{\n  \"codes\": [\n    {\n      \"code\": \"{\\n  \\\"event\\\": \\\"Signed up\\\",\\n  \\\"properties\\\": {\\n    \\\"time\\\": 1618716477000,\\n    \\\"distinct_id\\\": \\\"91304156-cafc-4673-a237-623d1129c801\\\",\\n    \\\"$insert_id\\\": \\\"29fc2962-6d9c-455d-95ad-95b84f09b9e4\\\",\\n    \\\"ip\\\": \\\"136.24.0.114\\\",\\n    \\\"Referred by\\\": \\\"Friend\\\",\\n    \\\"URL\\\": \\\"mixpanel.com/signup\\\",\\n  }\\n}\",\n      \"language\": \"json\",\n      \"name\": \"Pre-Enrichment\"\n    },\n    {\n      \"code\": \"{\\n  \\\"event\\\": \\\"Signed up\\\",\\n  \\\"properties\\\": {\\n    \\\"time\\\": 1618716477000,\\n    \\\"distinct_id\\\": \\\"91304156-cafc-4673-a237-623d1129c801\\\",\\n    \\\"$insert_id\\\": \\\"29fc2962-6d9c-455d-95ad-95b84f09b9e4\\\",\\n    \\\"Referred by\\\": \\\"Friend\\\",\\n    \\\"URL\\\": \\\"mixpanel.com/signup\\\",\\n    \\\"$city\\\": \\\"San Francisco\\\",\\n    \\\"$region\\\": \\\"California\\\",\\n    \\\"mp_country_code\\\": \\\"US\\\"\\n  }\\n}\",\n      \"language\": \"json\",\n      \"name\": \"Post-Enrichment\"\n    }\n  ]\n}\n[/block]\n\n[block:api-header]\n{\n  \"title\": \"Rate Limits\"\n}\n[/block]\nTo ensure real-time ingestion and quality-of-service, we have a rate limit of 2GB of uncompressed JSON/minute or ~30k events per second, measured on a rolling 1 minute basis. \n\nWe recommend the following when it comes to sending data to our API at scale:\n\n* Send data as quickly as possible with concurrent clients until the server returns 429. We see the best results with 10-20 concurrent clients sending 2K events per batch.\n* When you see 429s, employ an [exponential backoff with jitter](https://docs.aws.amazon.com/general/latest/gr/api-retries.html) strategy. We recommend starting with a backoff of 2s and doubling backoff until 60s, with 1-5s of jitter.\n* We recommend gzip compression and using `Content-Encoding: gzip` to reduce network egress and transfer time.\n* In the rare event that our API returns a 502 or 503 status code, we recommend employing the same exponential backoff strategy as with 429s.\n* Please do not retry validation errors (400 status code), as they will consistently fail and count toward the rate limit.\n\n*If you are an enterprise customer and require a higher limit for a 1-time backfill, please reach out to your sales representative with your project_id and use-case.*\n[block:api-header]\n{\n  \"title\": \"Common Issues\"\n}\n[/block]\n$insert_id is required on all events. This makes it safe to retry /import requests. If your events don't already have a unique ID (eg: a UUID/GUID), we recommend computing a hash of some set of properties that make the event semantically unique (eg: distinct_id + timestamp + some other property) and using the first 36 characters of that hash as the $insert_id.\n\nWe truncate all strings down to 255 characters. Here's what we recommend for the various cases in which this typically happens:\n\n- URLs: We recommend parsing the URL and tracking its individual components (host, path, url params) as properties. This is more useful in analysis, as you can segment events by hostname or a particular URL parameter.\n- JSON encoded strings: Sometimes a long string may be a JSON object encoded as a string. We recommend parsing the JSON and flattening it into properties to send with the event. This is similarly much more useful in analysis, as you can filter or breakdown by any key within the JSON.\n- Free text / user generated content: Some long fields may include full-text (eg: a search term or a comment). If this property isn't useful for analysis, we recommend excluding it from tracking to Mixpanel to avoid accidentally sending over any PII.\n[block:api-header]\n{\n  \"title\": \"Guides\"\n}\n[/block]\nSee our Cloud Ingestion guides for example usage of this API to integrate with  [Google Pub/Sub](doc:google-pubsub), [Amazon S3](doc:amazon-s3), or [Google Cloud Storage](doc:gcs-import)."
hidden: false
createdAt: "2020-10-20T00:41:26.243Z"
updatedAt: "2022-02-08T19:57:16.456Z"
---
Send batches of events from your servers to Mixpanel.
***
[block:api-header]
{
  "title": "Request Format"
}
[/block]
Each request ingests a batch of events into Mixpanel. We accept up to 2000 events and 2MB uncompressed per request. Events are part of the request body. We support Content-Type `application/json` or `application/x-ndjson`:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\"event\": \"Signup\", \"properties\": {\"time\": 1618716477000,\"distinct_id\": \"91304156-cafc-4673-a237-623d1129c801\",\"$insert_id\": \"29fc2962-6d9c-455d-95ad-95b84f09b9e4\",\"Referred by\": \"Friend\",\"URL\": \"mixpanel.com/signup\"}},\n  {\"event\": \"Purchase\", \"properties\": {\"time\": 1618716477000,\"distinct_id\": \"91304156-cafc-4673-a237-623d1129c801\",\"$insert_id\": \"935d87b1-00cd-41b7-be34-b9d98dd08b42\",\"Item\": \"Coffee\", \"Amount\": 5.0}}\n]",
      "language": "json",
      "name": "JSON"
    },
    {
      "code": "{\"event\": \"Signup\", \"properties\": {\"time\": 1618716477000,\"distinct_id\": \"91304156-cafc-4673-a237-623d1129c801\",\"$insert_id\": \"29fc2962-6d9c-455d-95ad-95b84f09b9e4\",\"Referred by\": \"Friend\",\"URL\": \"mixpanel.com/signup\"}}\n{\"event\": \"Purchase\", \"properties\": {\"time\": 1618716477000,\"distinct_id\": \"91304156-cafc-4673-a237-623d1129c801\",\"$insert_id\": \"935d87b1-00cd-41b7-be34-b9d98dd08b42\",\"Item\": \"Coffee\", \"Amount\": 5.0}}\n",
      "language": "json",
      "name": "ndJSON"
    }
  ]
}
[/block]
We also support `Content-Encoding: gzip` to reduce network egress.
[block:api-header]
{
  "title": "Authentication"
}
[/block]
/import requires an Owner or Admin [Service Account](ref:service-accounts). project_id, service account username and service account password are required to authenticate a request.

Note: /import also supports [Project Secret](ref:project-secret) for legacy reasons. If you do not specify project_id, we will use secret auth.
[block:api-header]
{
  "title": "Validation"
}
[/block]
/import validates the supplied events and returns a 400 status code if _any_ of the events fail validation with details of the error. If some events pass validation and others fail, we will ingest the events that pass validation. When you encounter a 400 error in production, simply log the JSON response, as it will contain the `$insert_id`s of the invalid events, which can be used to debug.

### High-level requirements

- Each event must be properly formatted JSON.
- Each event must contain an event name, time, distinct_id, and $insert_id. These are used to deduplicate events, so that this endpoint can be safely retried.
- Each event must be smaller than 1MB of uncompressed JSON.
- Each event must have fewer than 255 properties.
- All nested object properties must have fewer than 255 keys and max nesting depth is 3.
- All array properties must have fewer than 255 elements.

### Example of an event
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"event\": \"Signed up\",\n  \"properties\": {\n    \"time\": 1618716477000,\n    \"distinct_id\": \"91304156-cafc-4673-a237-623d1129c801\",\n    \"$insert_id\": \"29fc2962-6d9c-455d-95ad-95b84f09b9e4\",\n    \"ip\": \"136.24.0.114\",\n    \"Referred by\": \"Friend\",\n    \"URL\": \"mixpanel.com/signup\",\n  }\n}",
      "language": "json"
    }
  ]
}
[/block]

### event

This is the name of the event. If you're loading data from a data warehouse, we recommend using the name of the table as the name of the event.

We recommend keeping the number of unique event names relatively small and using properties for any variable context attached to the event. For example, instead of tracking events with names "Paid Signup" and "Free Signup", we would recommend tracking an event called "Signup" and having a property "Account Type" with value "paid" or "free".

### **properties**

This is a JSON object representing all the properties about the event. If you're loading data from a data warehouse, we recommend using column names as the names of properties.

### properties.time

The time at which the event occurred, in seconds or milliseconds since epoch. We require a value for time. We will reject events with time values that are before 1971-01-01 or more than 1 hour in the future as measured on our servers.

### properties.distinct_id

distinct_id identifies the user who performed the event. distinct_id must be specified on every event, as it is crucial for Mixpanel to perform behavioral analysis (unique users, funnels, retention, cohorts) correctly and efficiently.

If the event is not associated with any user, set distinct_id to the empty string. Events with an empty distinct_id will be excluded from all behavioral analysis.

To prevent accidental implementation mistakes, we disallow the following values for distinct_id:
[block:code]
{
  "codes": [
    {
      "code": "- 00000000-0000-0000-0000-000000000000\n- anon\n- anonymous\n- nil\n- none\n- null\n- n/a\n- na\n- undefined\n- unknown\n- <nil>\n- 0\n- -1\n- true\n- false\n- []\n- {}\n",
      "language": "text"
    }
  ]
}
[/block]

### properties.$insert_id

We require that $insert_id be specified on every event. $insert_id provides a unique identifier for the event, which we use for deduplication. Events with identical values for (event, time, distinct_id, $insert_id) are considered duplicates and only one of them will be surfaced in queries.

$insert_ids must be ≤ 36 bytes and contain only alphanumeric characters or "-". We also disallow any value for $insert_id from the list of invalid IDs provided for distinct_id above.

### Example of a validation error
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"code\": 400,\n  \"error\": \"some data points in the request failed validation\",\n  \"failed_records\": [\n    {\n      \"index\": 0,\n      \"$insert_id\": \"8a66058c-a56d-4ef6-8123-28b7c9f7e82f\",\n      \"field\": \"properties.time\",\n      \"message\": \"properties.time' is invalid: must be specified as seconds since epoch\"\n    },\n    {\n      \"index\": 3,\n      \"$insert_id\": \"29fc2962-6d9c-455d-95ad-95b84f09b9e4\",\n      \"field\": \"properties.utm_source\",\n      \"message\": \"properties.utm_source is invalid: string should be valid utf8\"\n    },\n  ],\n  \"num_records_imported\": 23,\n  \"status\": \"Bad Request\"\n}",
      "language": "json"
    }
  ]
}
[/block]
When any single event in the batch does not pass validation, we return a 400 status code and a response that looks like the above.

`failed_records` includes one row for each of the failed events, with details about the error we found. If some of the rows passed validation, we will ingest them and return their count in `num_records_imported`.
[block:api-header]
{
  "title": "GeoIP Enrichment"
}
[/block]
If you supply a property `ip` with an IP address, Mixpanel will automatically do a GeoIP lookup and replace the `ip` property with geographic properties (City, Country, Region). These properties can be used in our UI to segment events geographically.

This is an example of an event before and after enrichment:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"event\": \"Signed up\",\n  \"properties\": {\n    \"time\": 1618716477000,\n    \"distinct_id\": \"91304156-cafc-4673-a237-623d1129c801\",\n    \"$insert_id\": \"29fc2962-6d9c-455d-95ad-95b84f09b9e4\",\n    \"ip\": \"136.24.0.114\",\n    \"Referred by\": \"Friend\",\n    \"URL\": \"mixpanel.com/signup\",\n  }\n}",
      "language": "json",
      "name": "Pre-Enrichment"
    },
    {
      "code": "{\n  \"event\": \"Signed up\",\n  \"properties\": {\n    \"time\": 1618716477000,\n    \"distinct_id\": \"91304156-cafc-4673-a237-623d1129c801\",\n    \"$insert_id\": \"29fc2962-6d9c-455d-95ad-95b84f09b9e4\",\n    \"Referred by\": \"Friend\",\n    \"URL\": \"mixpanel.com/signup\",\n    \"$city\": \"San Francisco\",\n    \"$region\": \"California\",\n    \"mp_country_code\": \"US\"\n  }\n}",
      "language": "json",
      "name": "Post-Enrichment"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Rate Limits"
}
[/block]
To ensure real-time ingestion and quality-of-service, we have a rate limit of 2GB of uncompressed JSON/minute or ~30k events per second, measured on a rolling 1 minute basis. 

We recommend the following when it comes to sending data to our API at scale:

* Send data as quickly as possible with concurrent clients until the server returns 429. We see the best results with 10-20 concurrent clients sending 2K events per batch.
* When you see 429s, employ an [exponential backoff with jitter](https://docs.aws.amazon.com/general/latest/gr/api-retries.html) strategy. We recommend starting with a backoff of 2s and doubling backoff until 60s, with 1-5s of jitter.
* We recommend gzip compression and using `Content-Encoding: gzip` to reduce network egress and transfer time.
* In the rare event that our API returns a 502 or 503 status code, we recommend employing the same exponential backoff strategy as with 429s.
* Please do not retry validation errors (400 status code), as they will consistently fail and count toward the rate limit.

*If you are an enterprise customer and require a higher limit for a 1-time backfill, please reach out to your sales representative with your project_id and use-case.*
[block:api-header]
{
  "title": "Common Issues"
}
[/block]
$insert_id is required on all events. This makes it safe to retry /import requests. If your events don't already have a unique ID (eg: a UUID/GUID), we recommend computing a hash of some set of properties that make the event semantically unique (eg: distinct_id + timestamp + some other property) and using the first 36 characters of that hash as the $insert_id.

We truncate all strings down to 255 characters. Here's what we recommend for the various cases in which this typically happens:

- URLs: We recommend parsing the URL and tracking its individual components (host, path, url params) as properties. This is more useful in analysis, as you can segment events by hostname or a particular URL parameter.
- JSON encoded strings: Sometimes a long string may be a JSON object encoded as a string. We recommend parsing the JSON and flattening it into properties to send with the event. This is similarly much more useful in analysis, as you can filter or breakdown by any key within the JSON.
- Free text / user generated content: Some long fields may include full-text (eg: a search term or a comment). If this property isn't useful for analysis, we recommend excluding it from tracking to Mixpanel to avoid accidentally sending over any PII.
[block:api-header]
{
  "title": "Guides"
}
[/block]
See our Cloud Ingestion guides for example usage of this API to integrate with  [Google Pub/Sub](doc:google-pubsub), [Amazon S3](doc:amazon-s3), or [Google Cloud Storage](doc:gcs-import).
## Import Events
Use this API to send events from your servers to Mixpanel. This endpoint uses Basic Auth with your Project Secret as the username.

```sh
curl https://api.mixpanel.com/import?strict=1
    -u "YOUR_API_SECRET:" \
    -H "Content-Type: application/json"
    -d "..."
```

### Validation
/import validates the supplied events and returns a 400 status code if _any_ of the events fail validation with details of the error. If some events pass validation and others fail, we will ingest the events that pass validation. When you encounter a 400 error in production, log the JSON response, as it will contain the `$insert_id`s of the invalid events, which can be used to debug.
- Each event must be properly formatted JSON.
- Each event must contain an event name, time, distinct_id, and $insert_id. These are used to deduplicate events, so that this endpoint can be safely retried.
- Each event must be smaller than 1MB of uncompressed JSON.
- Each event must have fewer than 255 properties.
- All nested object properties must have fewer than 255 keys and max nesting depth is 3.
- All array properties must have fewer than 255 elements.

#### Sample Event

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

#### event

This is the name of the event. If you're loading data from a data warehouse, we recommend using the name of the table as the name of the event.

We recommend keeping the number of unique event names relatively small and using properties for any variable context attached to the event. For example, instead of tracking events with names "Paid Signup" and "Free Signup", we would recommend tracking an event called "Signup" and having a property "Account Type" with value "paid" or "free".

#### properties

This is a JSON object representing all the properties about the event. If you're loading data from a data warehouse, we recommend using column names as the names of properties.

#### properties.time

The time at which the event occurred, in seconds or milliseconds since epoch. We require a value for time. We will reject events with time values that are before 1971-01-01 or more than 1 hour in the future as measured on our servers.

#### properties.distinct_id

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

#### properties.$insert_id

We require that $insert_id be specified on every event. $insert_id provides a unique identifier for the event, which we use for deduplication. Events with identical values for (event, time, distinct_id, $insert_id) are considered duplicates and only one of them will be surfaced in queries.

$insert_ids must be ≤ 36 bytes and contain only alphanumeric characters or "-". We also disallow any value for $insert_id from the list of invalid IDs provided for distinct_id above.

#### Example of a validation error
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
When any single event in the batch does not pass validation, we return a 400 status code and a response that looks like the above. `failed_records` includes one row for each of the failed events, with details about the error we found. If some of the rows passed validation, we will ingest them and return their count in `num_records_imported`.

### Rate Limits
To ensure real-time ingestion and quality-of-service, we have a rate limit of 2GB of uncompressed JSON/minute or ~30k events per second, measured on a rolling 1 minute basis. 

We recommend the following when it comes to sending data to our API at scale:

* Send data as quickly as possible with concurrent clients until the server returns 429. We see the best results with 10-20 concurrent clients sending 2K events per batch.
* When you see 429s, employ an [exponential backoff with jitter](https://docs.aws.amazon.com/general/latest/gr/api-retries.html) strategy. We recommend starting with a backoff of 2s and doubling backoff until 60s, with 1-5s of jitter.
* We recommend gzip compression and using `Content-Encoding: gzip` to reduce network egress and transfer time.
* In the rare event that our API returns a 502 or 503 status code, we recommend employing the same exponential backoff strategy as with 429s.
* Please do not retry validation errors (400 status code), as they will consistently fail and count toward the rate limit.

If you are an Enterprise customer that requires a higher rate limit, please reach out to your CSM with your project_id and use case.

### Troubleshooting
`$insert_id` is required on all events. This makes it safe to retry /import requests. If your events don't already have a unique ID (eg: a UUID/GUID), we recommend computing a hash of some set of properties that make the event semantically unique (eg: distinct_id + timestamp + some other property) and using the first 36 characters of that hash as the `$insert_id`.

We truncate all strings down to 255 characters. Here's what we recommend for the various cases in which this typically happens:
- URLs: We recommend parsing the URL and tracking its individual components (host, path, url params) as properties. This is more useful in analysis, as you can segment events by hostname or a particular URL parameter.
- JSON encoded strings: Sometimes a long string may be a JSON object encoded as a string. We recommend parsing the JSON and flattening it into properties to send with the event. This is similarly much more useful in analysis, as you can filter or breakdown by any key within the JSON.
- Free text / user generated content: Some long fields may include full-text (eg: a search term or a comment). If this property isn't useful for analysis, we recommend excluding it from tracking to Mixpanel to avoid accidentally sending over any PII.

### Advanced Options
* You can set the header `Content-Type: application/x-ndjson` to use ndjson instead of json.
* You can set the header `Content-Encoding: gzip` to send gzipped events.
* You can disable validation by removing the `strict=1` query parameter. We don't recommend this, since it makes it harder to debug errors.
* You can use Service Account authentication, by passing `project_id=<YOUR_PROJECT_ID>` as a query parameter and using your service account username and password in the Basic Auth fields.


## Track Events
Track events to Mixpanel from client devices. We recommend using one of our client-side SDKs instead of using /track directly, as our SDKs provide queueing, retrying, batching, and more.

```sh
curl https://api.mixpanel.com/track
    -u "YOUR_API_SECRET:" \
    -H "Content-Type: application/json"
    -d "..."
```

### Track vs Import
Typically, we recommend using /import for server-side integrations as it is more scalable and supports ingesting historical data. We only recommend /track for client-side tracking in an environment for which we don't have SDK support or if you're sending data via some other untrusted environment (eg: third-party webhooks that send data to Mixpanel).
[block:parameters]
{
  "data": {
    "h-0": "",
    "h-1": "/track",
    "h-2": "/import",
    "0-0": "Events per request",
    "0-1": "50",
    "0-2": "2000",
    "1-0": "Authentication",
    "1-1": "Project Token, intended for untrusted clients.",
    "1-2": "Project Secret, intended for server-side integration.",
    "2-0": "Compression",
    "2-1": "None",
    "2-2": "Gzip allowed",
    "3-0": "Content-Type",
    "3-1": "application/x-www-form-urlencoded",
    "3-2": "application/json or application/x-ndjson",
    "4-0": "Ingesting historical events",
    "4-1": "Last 5 days only.",
    "4-2": "Any time after 1971-01-01."
  },
  "cols": 3,
  "rows": 5
}
[/block]

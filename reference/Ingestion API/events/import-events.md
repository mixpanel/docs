---
title: "Import Events"
slug: "import-events"
hidden: false
createdAt: "2020-10-20T00:41:26.243Z"
updatedAt: "2023-09-26T21:06:38.671Z"
---

See our [data model guide](/docs/tracking/reference/data-model#anatomy-of-an-event) to learn about each of the fields in the event.

## Advanced
* You can batch up to 2000 events per request to /import.
* You can set the header `Content-Type: application/x-ndjson` to use ndjson instead of json.
* You can set the header `Content-Encoding: gzip` to send gzipped events.
* You can disable validation by removing the `strict=1` query parameter. We don't recommend this, since it makes it harder to debug errors.
* You can use Service Account authentication, by passing `project_id=<YOUR_PROJECT_ID>` as a query parameter and using your service account username and password in the Basic Auth fields.

## Validation
If you provide the strict=1 parameter (recommended), /import will validate the supplied events and returns a 400 status code if _any_ of the events fail validation with details of the error. If some events pass validation and others fail, Mixpanel will ingest the events that pass validation.

### Common Issues

`$insert_id` is required on all events. This makes it safe to retry /import requests. If your events don't already have a unique ID (eg: a UUID/GUID), we recommend computing a hash of some set of properties that make the event semantically unique (eg: distinct_id + timestamp + some other property) and using the first 36 characters of that hash as the `$insert_id`.

We truncate all strings down to 255 characters. Here's what we recommend for the various cases in which this typically happens:
- URLs: We recommend parsing the URL and tracking its individual components (host, path, url params) as properties. This is more useful in analysis, as you can segment events by hostname or a particular URL parameter.
- JSON encoded strings: Sometimes a long string may be a JSON object encoded as a string. We recommend parsing the JSON and flattening it into properties to send with the event. This is similarly much more useful in analysis, as you can filter or breakdown by any key within the JSON.
- Free text / user generated content: Some long fields may include full-text (eg: a search term or a comment). If this property isn't useful for analysis, we recommend excluding it from tracking to Mixpanel to avoid accidentally sending over any PII.

We disallow values for `distinct_id` and `$insert_id` that are from this list, to avoid implementation mistakes:
```text
- 00000000-0000-0000-0000-000000000000
- anon
- anonymous
- nil
- none
- null
- n/a
- na
- undefined
- unknown
- <nil>
- 0
- -1
- true
- false
- []
- {}
```

## Track Events
```sh
curl https://api.mixpanel.com/track
    -u "YOUR_API_SECRET:" \
    -H "Content-Type: application/json"
    -d '[{"event": "Signed Up", "properties": {"time": 1618716477000, "distinct_id": "91304156-cafc-4673-a237-623d1129c801", "$insert_id": "29fc2962-6d9c-455d-95ad-95b84f09b9e4", "Referred By": "Friend"}]'
```

Prefer to use /import over /track where you can. We only recommend /track for client-side tracking in an environment for which we don't have SDK support or if you're sending data via some other untrusted environment (eg: third-party webhooks that send data to Mixpanel).

|  | /track | /import |
|---|---|---|
| Events per request | 50 | 2000 |
| Authentication | Project Token, intended for untrusted clients. | Project Secret, intended for server-side integration. |
| Compression | None | Gzip allowed |
| Content-Type | application/x-www-form-urlencoded | application/json or application/x-ndjson |
| Ingesting historical events | Last 5 days only. | Any time after 1971-01-01. |


## Limits
Each event has the following size limits:
- Must be smaller than 1MB of uncompressed JSON.
- Must have fewer than 255 properties.
- All nested object properties must have fewer than 255 keys and max nesting depth is 3.
- All array properties must have fewer than 255 elements.

To ensure real-time ingestion and quality-of-service, we have a rate limit of 2GB of uncompressed JSON/minute or ~30k events per second, measured on a rolling 1 minute basis.

We recommend the following when it comes to sending data to our API at scale:

* Send data as quickly as possible with concurrent clients until the server returns 429. We see the best results with 10-20 concurrent clients sending 2K events per batch.
* When you see 429s, employ an [exponential backoff with jitter](https://docs.aws.amazon.com/general/latest/gr/api-retries.html) strategy. We recommend starting with a backoff of 2s and doubling backoff until 60s, with 1-5s of jitter.
* We recommend gzip compression and using `Content-Encoding: gzip` to reduce network egress and transfer time.
* In the rare event that our API returns a 502 or 503 status code, we recommend employing the same exponential backoff strategy as with 429s.
* Please do not retry validation errors (400 status code), as they will consistently fail and count toward the rate limit.


If you are an Enterprise customer that requires a higher rate limit, please reach out to your CSM with your project_id and use case.

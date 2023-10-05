---
title: "Import Events"
slug: "import-events"
hidden: false
createdAt: "2020-10-20T00:41:26.243Z"
updatedAt: "2023-09-26T21:06:38.671Z"
---

Use this API to send events from your servers to Mixpanel.

## Usage
```sh
curl https://api.mixpanel.com/import?strict=1 \
    -u 'YOUR_API_SECRET:'                     \
    -H 'Content-Type: application/json'       \
    -d '[{"event": "Signed Up", "properties": {"time": 1618716477000, "distinct_id": "91304156-cafc-4673-a237-623d1129c801", "$insert_id": "29fc2962-6d9c-455d-95ad-95b84f09b9e4", "Referred By": "Friend"}]'
```
```python
# Run `pip install requests` if you don't already have it
import requests

import json
import time

API_SECRET = ""
resp = requests.post(
    "https://api.mixpanel.com/import?strict=1",
    auth=(API_SECRET, ""),
    headers={"Content-Type": "application/json"},
    data=json.dumps([
        {"event": "vijay_test_5", "properties": {"time": int(time.time()), "distinct_id": "91304156-cafc-4673-a237-623d1129c801", "$insert_id": "29fc2962-6d9c-455d-95ad-95b84f09b9e4", "ip": "136.24.0.114", "Referred by": "Friend"}}
    ])
)

print(resp.json())
```

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

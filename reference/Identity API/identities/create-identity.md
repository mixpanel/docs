---
title: "Create Identity"
slug: "create-identity"
hidden: false
createdAt: "2021-08-04T20:56:14.330Z"
updatedAt: "2023-09-26T21:06:37.368Z"
---

[block:callout]
{
  "type": "info",
  "body": "You can also use the import endpoint: https://api.mixpanel.com/import/"
}
[/block]

```sh
curl --request POST \
     --url 'https://api.mixpanel.com/track#create-identity' \
     --header 'accept: text/plain' \
     --header 'content-type: application/x-www-form-urlencoded' \
     --data 'data={
      "event": "$identify",
      "properties": {
          "$identified_id": "ORIGINAL_ID",
          "$anon_id": "NEW_ID",
          "token": "YOUR_PROJECT_TOKEN"
      }
}
'
```

**Identify Criteria:**
![Identity Management - Identify](https://files.readme.io/d0066f0-ID_management_identify_3-HTTP.png)


**Required [Event Object](https://docs.mixpanel.com/docs/tracking/reference/data-model#anatomy-of-an-event) attributes**

| Event Object property         | Type                    | Description                                                         |
| ----------------------------- | ----------------------- | ------------------------------------------------------------------- |
| **event**                     | `<span style="font-family: courier">String</span></br><span style="color: red">required</span>`| value must be: `$identify`                                         |
| **properties**                | `<span style="font-family: courier">Object</span></br><span style="color: red">required</span>`|                                                                   |
| **properties.distinct_id**    | `<span style="font-family: courier">String</span></br><span style="color: green">optional</span>`| The distinct ID post-identification (same as $identified_id - it will be inferred from $identified_id if not included)|
| **properties.$identified_id** | `<span style="font-family: courier">String</span></br><span style="color: red">required</span>`| A distinct_id to merge with the $anon_id.                           |
| **properties.$anon_id**       | `<span style="font-family: courier">String</span></br><span style="color: red">required</span>`| A distinct_id to merge with the $identified_id. The $anon_id must be [UUID v4](https://en.wikipedia.org/wiki/Universally_unique_identifier) format and not already merged to an $identified_id.|
| **properties.token**          | `<span style="font-family: courier">String</span></br><span style="color: red">required</span>`| The project token.                                                 |

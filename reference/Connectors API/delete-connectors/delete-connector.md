---
title: "Delete a Project's Connector by Connector Id"
slug: "delete-connector"
hidden: false
createdAt: "2021-11-23T19:28:56.440Z"
updatedAt: "2023-09-26T21:06:38.068Z"
---

```sh
curl -X DELETE https://mixpanel.com/api/app/projects/{PROJECT_ID}/connectors/{CONNECTOR_ID} \
     --user "{SVC_ACCOUNT}:{SECRET}"

```

Sample Response

```json
{
  "status": "ok",
  "results": "Successfully deleted Connector with ID:32f40cc-7ccc-4da3-b9c3-d8c1d14142c6"
}
```


For more information, visit the [Raw Export API](reference/export/events)

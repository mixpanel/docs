---
title: "List Connectors"
slug: "get-connectors"
excerpt: ""
hidden: false
createdAt: "2021-11-23T19:28:56.439Z"
updatedAt: "2023-09-26T21:06:38.041Z"
---

Sample cURL Command
```sh
curl --request GET \
     --url https://mixpanel.com/api/app/projects/{projectId}/connectors \
     --header 'accept: application/json'
```

Sample Response
```json
{
  "status": "ok",
  "results": {
    "url": null,
    "has_more": false,
    "data": [
      {
        "connector_id": "232f40cc-7ccc-4da3-b9c3-d8c1d14142c6",
        "label": "",
        "connector_type": "gcsImport",
        "connector_properties": {
          "gcs_bucket": "sample-dataset",
          "gcs_prefix": "cloudimport/event",
          "gcs_region": "us"
        },
        "category_properties": {
          "data_format": "mixpanel_event",
          "compression": "none"
        },
        "status": null,
        "created_at": "2020-09-17T02:10:33.799738Z",
        "created_by": "Samoyed.mp-service-account@mixpanel.org"
      },
      {
        "connector_id": "2c1ca81a-695d-4412-8161-75feec489016",
        "label": "",
        "connector_type": "gcsImport",
        "connector_properties": {
          "gcs_bucket": "sample-dataset",
          "gcs_prefix": "cloudimport/event",
          "gcs_region": "us"
        },
        "category_properties": {
          "data_format": "mixpanel_event",
          "compression": "gzip"
        },
        "status": null,
        "created_at": "2020-09-17T02:30:56.883983Z",
        "created_by": "Samoyed.mp-service-account@mixpanel.org"
      }
    ]
  }
}
```

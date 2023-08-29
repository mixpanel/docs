[block:code]
{
  "codes": [
    {
      "code": "curl -X GET https://mixpanel.com/api/app/projects/{PROJECT_ID}/connectors/ --user \"{SVC_ACCT}:{SECRET}\"",
      "language": "curl",
      "name": "Sample cURL command"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"status\": \"ok\",\n  \"results\": {\n    \"url\": null,\n    \"has_more\": false,\n    \"data\": [\n      {\n        \"connector_id\": \"232f40cc-7ccc-4da3-b9c3-d8c1d14142c6\",\n        \"label\": \"\",\n        \"connector_type\": \"gcsImport\",\n        \"connector_properties\": {\n          \"gcs_bucket\": \"sample-dataset\",\n          \"gcs_prefix\": \"cloudimport/event\",\n          \"gcs_region\": \"us\"\n        },\n        \"category_properties\": {\n          \"data_format\": \"mixpanel_event\",\n          \"compression\": \"none\"\n        },\n        \"status\": null,\n        \"created_at\": \"2020-09-17T02:10:33.799738Z\",\n        \"created_by\": \"Samoyed.mp-service-account@mixpanel.org\"\n      },\n      {\n        \"connector_id\": \"2c1ca81a-695d-4412-8161-75feec489016\",\n        \"label\": \"\",\n        \"connector_type\": \"gcsImport\",\n        \"connector_properties\": {\n          \"gcs_bucket\": \"sample-dataset\",\n          \"gcs_prefix\": \"cloudimport/event\",\n          \"gcs_region\": \"us\"\n        },\n        \"category_properties\": {\n          \"data_format\": \"mixpanel_event\",\n          \"compression\": \"gzip\"\n        },\n        \"status\": null,\n        \"created_at\": \"2020-09-17T02:30:56.883983Z\",\n        \"created_by\": \"Samoyed.mp-service-account@mixpanel.org\"\n      }\n    ]\n  }\n}\n",
      "language": "json",
      "name": "Sample Response"
    }
  ]
}
[/block]

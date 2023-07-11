---
title: "Delete a Project's Connector by Connector Id"
slug: "delete-connector"
excerpt: "[block:code]\n{\n  \"codes\": [\n    {\n      \"code\": \"curl -X DELETE https://mixpanel.com/api/app/projects/{PROJECT_ID}/connectors/{CONNECTOR_ID} --user \\\"{SVC_ACCOUNT}:{SECRET}\\\"\",\n      \"language\": \"curl\",\n      \"name\": \"Sample cURL command\"\n    }\n  ]\n}\n[/block]\n\n[block:code]\n{\n  \"codes\": [\n    {\n      \"code\": \"{\\n  \\\"status\\\": \\\"ok\\\",\\n  \\\"results\\\": \\\"Successfully deleted Connector with ID:32f40cc-7ccc-4da3-b9c3-d8c1d14142c6\\\"\\n}\",\n      \"language\": \"json\",\n      \"name\": \"Sample Response\"\n    }\n  ]\n}\n[/block]"
hidden: false
createdAt: "2021-11-23T19:28:56.440Z"
updatedAt: "2021-11-23T19:28:56.440Z"
---
[block:code]
{
  "codes": [
    {
      "code": "curl -X DELETE https://mixpanel.com/api/app/projects/{PROJECT_ID}/connectors/{CONNECTOR_ID} --user \"{SVC_ACCOUNT}:{SECRET}\"",
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
      "code": "{\n  \"status\": \"ok\",\n  \"results\": \"Successfully deleted Connector with ID:32f40cc-7ccc-4da3-b9c3-d8c1d14142c6\"\n}",
      "language": "json",
      "name": "Sample Response"
    }
  ]
}
[/block]
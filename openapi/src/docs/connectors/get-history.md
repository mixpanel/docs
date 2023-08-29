<h4>Possible Statuses</h4>


* `success` : all items have been imported and available for viewing in the project. Report on import statistics provided
* `queued` : request has been scheduled and is waiting to be run
* `running` : data is currently being imported
* `failed` : import could not be processed due to some non-retryable error. Please refer to the error message in response for more details

`progress` is a float, with range `[0,1]`
[block:code]
{
  "codes": [
    {
      "code": "curl -X GET https://mixpanel.com/api/app/projects/{PROJECT_ID}/connectors/{CONNECTOR_ID}/history --user \"{SVC_ACCOUNT}:{SECRET}\"",
      "language": "curl"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Queued Job",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n\t\"status\": \"ok\",\n\t\"results\": {\n\t\t\"url\": null,\n\t\t\"has_more\": false,\n\t\t\"data\": [{\n\t\t\t\"id\": \"\",\n\t\t\t\"start_time\": \"0001-01-01 00:00:00 +0000 UTC\",\n\t\t\t\"end_time\": \"\",\n\t\t\t\"status\": \"queued\",\n\t\t\t\"progress\": 0,\n\t\t\t\"error\": {\n\t\t\t\t\"message\": \"\",\n\t\t\t\t\"code\": \"\"\n\t\t\t},\n\t\t\t\"connector_properties\": {\n\t\t\t\t\"num_events_imported\": 0,\n\t\t\t\t\"num_events_processed\": 0,\n\t\t\t\t\"num_events_dropped\": 0,\n\t\t\t\t\"num_files_imported\": 0,\n\t\t\t\t\"size_imported\": 0\n\t\t\t}\n\t\t}]\n\t}\n}",
      "language": "json",
      "name": "Sample Response - Queued Job"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Running Job",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n\t\"status\": \"ok\",\n\t\"results\": {\n\t\t\"url\": null,\n\t\t\"has_more\": false,\n\t\t\"data\": [{\n\t\t\t\"id\": \"\",\n\t\t\t\"start_time\": \"2020-09-16 07:00:00 +0000 UTC\",\n\t\t\t\"end_time\": \"\",\n\t\t\t\"status\": \"running\",\n\t\t\t\"progress\": 0.25,\n\t\t\t\"error\": {\n\t\t\t\t\"message\": \"\",\n\t\t\t\t\"code\": \"\"\n\t\t\t},\n\t\t\t\"connector_properties\": {\n\t\t\t\t\"num_events_imported\": 0,\n\t\t\t\t\"num_events_processed\": 0,\n\t\t\t\t\"num_events_dropped\": 0,\n\t\t\t\t\"num_files_imported\": 0,\n\t\t\t\t\"size_imported\": 0\n\t\t\t}\n\t\t}]\n\t}\n}\n",
      "language": "json",
      "name": "Sample Response - Running Job"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Completed Job (Success)",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n\t\"status\": \"ok\",\n\t\"results\": {\n\t\t\"url\": null,\n\t\t\"has_more\": false,\n\t\t\"data\": [{\n\t\t\t\"id\": \"\",\n\t\t\t\"start_time\": \"2020-09-16 07:00:00 +0000 UTC\",\n\t\t\t\"end_time\": \"2020-09-17 02:17:49.831793 +0000 UTC\",\n\t\t\t\"status\": \"success\",\n\t\t\t\"progress\": 1,\n\t\t\t\"error\": {\n\t\t\t\t\"message\": \"\",\n\t\t\t\t\"code\": \"\"\n\t\t\t},\n\t\t\t\"connector_properties\": {\n\t\t\t\t\"num_events_imported\": 13,\n\t\t\t\t\"num_events_processed\": 13,\n\t\t\t\t\"num_events_dropped\": 0,\n\t\t\t\t\"num_files_imported\": 4,\n\t\t\t\t\"size_imported\": 1610\n\t\t\t}\n\t\t}]\n\t}\n}",
      "language": "json",
      "name": "Sample Response - Successfully Completed Job"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Failed Job",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"status\": \"ok\",\n  \"results\": {\n    \"url\": null,\n    \"has_more\": false,\n    \"data\": [\n      {\n        \"run_id\": \"\",\n        \"start_time\": \"2020-09-16 07:00:00 +0000 UTC\",\n        \"end_time\": \"\",\n        \"status\": \"failed\",\n\t\t\t  \"progress\": 0,\n        \"error\": {\n          \"message\": \"No compression specified but Gzip detected. Please submit a new request with correct compression as param\",\n          \"code\": \"\"\n        },\n        \"connector_properties\": {\n          \"num_events_imported\": 0,\n          \"num_events_processed\": 0,\n          \"num_events_dropped\": 0,\n          \"num_files_imported\": 0,\n          \"size_imported\": 0\n        }\n      }\n    ]\n  }\n}",
      "language": "json",
      "name": "Sample Response - Failed Job"
    }
  ]
}
[/block]

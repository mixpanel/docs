---
title: "List Connector Logs"
slug: "get-connector-logs"
hidden: false
createdAt: "2021-11-23T19:28:56.441Z"
updatedAt: "2023-09-26T21:06:38.075Z"
---

#### Possible Statuses
- `success` : all items have been imported and available for viewing in the project. Report on import statistics provided
- `queued` : request has been scheduled and is waiting to be run
- `running` : data is currently being imported
- `failed` : import could not be processed due to some non-retryable error. Please refer to the error message in response for more details

`progress` is a float, with range `[0,1]`

```sh
curl --request GET \
     --url https://mixpanel.com/api/app/projects/{projectId}/connectors/{connectorId}/history \
     --header 'accept: application/json'
```

Sample Queued Job
```json
{
	"status": "ok",
	"results": {
		"url": null,
		"has_more": false,
		"data": [{
			"id": "",
			"start_time": "0001-01-01 00:00:00 +0000 UTC",
			"end_time": "",
			"status": "queued",
			"progress": 0,
			"error": {
				"message": "",
				"code": ""
			},
			"connector_properties": {
				"num_events_imported": 0,
				"num_events_processed": 0,
				"num_events_dropped": 0,
				"num_files_imported": 0,
				"size_imported": 0
			}
		}]
	}
}
```

Sample Running Job
```json
{
	"status": "ok",
	"results": {
		"url": null,
		"has_more": false,
		"data": [{
			"id": "",
			"start_time": "2020-09-16 07:00:00 +0000 UTC",
			"end_time": "",
			"status": "running",
			"progress": 0.25,
			"error": {
				"message": "",
				"code": ""
			},
			"connector_properties": {
				"num_events_imported": 0,
				"num_events_processed": 0,
				"num_events_dropped": 0,
				"num_files_imported": 0,
				"size_imported": 0
			}
		}]
	}
}
```

Sample Completed Job (Success)
```json
{
	"status": "ok",
	"results": {
		"url": null,
		"has_more": false,
		"data": [{
			"id": "",
			"start_time": "2020-09-16 07:00:00 +0000 UTC",
			"end_time": "2020-09-17 02:17:49.831793 +0000 UTC",
			"status": "success",
			"progress": 1,
			"error": {
				"message": "",
				"code": ""
			},
			"connector_properties": {
				"num_events_imported": 13,
				"num_events_processed": 13,
				"num_events_dropped": 0,
				"num_files_imported": 4,
				"size_imported": 1610
			}
		}]
	}
}
```

Sample Failed Job
```json
{
  "status": "ok",
  "results": {
    "url": null,
    "has_more": false,
    "data": [
      {
        "run_id": "",
        "start_time": "2020-09-16 07:00:00 +0000 UTC",
        "end_time": "",
        "status": "failed",
			  "progress": 0,
        "error": {
          "message": "No compression specified but Gzip detected. Please submit a new request with correct compression as param",
          "code": ""
        },
        "connector_properties": {
          "num_events_imported": 0,
          "num_events_processed": 0,
          "num_events_dropped": 0,
          "num_files_imported": 0,
          "size_imported": 0
        }
      }
    ]
  }
}
```

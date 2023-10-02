---
title: "Create Connector"
slug: "create-connector"
hidden: false
createdAt: "2021-11-23T19:28:56.439Z"
updatedAt: "2023-09-26T21:06:38.049Z"
---

### Cloud provider-independent params

* `connector_type` (string enum) : `“s3Import”`, `“gcsImport”`
* `compression` (string enum) : `“none”`, `“gzip”`
* `data_format` (string enum) : `“mixpanel_event”`, `“mixpanel_group”`, `“mixpanel_people”`, `"remap_event"`, `"remap_people"`, `"remap_group"`
    this is how we know which type of data to process.

### Cloud provider-specific params

* `s3/gcs_bucket` (string) : name of bucket
* `s3/gcs_prefix` (string) : prefix or directory path of files to be imported. Use `“”` (empty string) to import all contents of the bucket.
* `s3_role` (string) : s3 IAM
* `s3_region` (string) : region of the bucket. Please refer to [S3 Endpoint](https://docs.aws.amazon.com/general/latest/gr/s3.html) and refer to column Region for accepted values

Sample request

```sh
curl --request POST \
     --url https://mixpanel.com/api/app/projects/{projectId}/connectors \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "connector_type": "s3Import",
  "connector_properties": {
    "s3_region": "us-east-2"
  }
}
'
```

Template for GCS
```json
{
	"connector_type": "gcsImport",
	"connector_properties": {
		"gcs_bucket": "sample-data",
		"gcs_prefix": "cloudimport/event",
	},
	"category_properties": {
		"data_format": "mixpanel_event",
		"compression": "none"
	}
}
```

Template for S3
```json
{
	"connector_type": "s3Import",
	"connector_properties": {
		"s3_bucket": "sample-data",
		"s3_prefix": "cloudimport/event",
		"s3_region": "us",
		"s3_role": "arn:aws:iam::485438090326:role/test-mixpanel",
	},
	"category_properties": {
		"data_format": "mixpanel_event",
		"compression": "none"
	}
}
```

Sample Response
```json
{
	"status": "ok",
	"results": {
		"connector_id": "232f40cc-7ccc-4da3-b9c3-d8c1d14142c6",
		"label": "",
		"connector_type": "gcsImport",
		"connector_properties": {
			"gcs_bucket": "sample-data",
			"gcs_prefix": "cloudimport/event",
		},
		"category_properties": {
			"data_format": "mixpanel_event",
			"compression": "none"
		},
		"status": "active",
		"created_at": "2020-09-17T02:10:33.799738Z",
		"created_by": "Samoyed.mp-service-account@mixpanel.org"
	}
}
```

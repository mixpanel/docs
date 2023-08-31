<h3> Cloud provider-independent params</h3>

* `connector_type` (string enum) : `“s3Import”`, `“gcsImport”`
* `compression` (string enum) : `“none”`, `“gzip”`
* `data_format` (string enum) : `“mixpanel_event”`, `“mixpanel_group”`, `“mixpanel_people”`, `"remap_event"`, `"remap_people"`, `"remap_group"`
    this is how we know which type of data to process. Please check [Sample Data](https://developer.mixpanel.com/docs/cloud-import-data-preparation-guide#section-sample-data) for examples for each `data_format`

<h3>Cloud provider-specific params</h3>

* `s3/gcs_bucket` (string) : name of bucket
* `s3/gcs_prefix` (string) : prefix or directory path of files to be imported. Use `“”` (empty string) to import all contents of the bucket. For more details on prefix, please check [Cloud Import FAQ](doc:cloud-import-faq)
* `s3_role` (string) : s3 IAM (Please refer to [Configuring Access And Permissions](doc:configuring-access-and-permissions)
* `s3_region` (string) : region of the bucket. Please refer to [S3 Endpoint](https://docs.aws.amazon.com/general/latest/gr/s3.html) and refer to column Region for accepted values


<h5>Template for each bucket type</h5>
[block:code]
{
  "codes": [
    {
      "code": "{\n\t\"connector_type\": “gcsImport”,\n\t\"connector_properties\": {\n\t\t\"gcs_bucket\": \"sample-data\",\n\t\t\"gcs_prefix\": \"cloudimport/event\",\n\t},\n\t\"category_properties\": {\n\t\t\"data_format\": \"mixpanel_event\",\n\t\t\"compression\": \"none\"\n\t}\n}",
      "language": "json",
      "name": "Template for GCS"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n\t\"connector_type\": “s3Import”,\n\t\"connector_properties\": {\n\t\t\"s3_bucket\": \"sample-data\",\n\t\t\"s3_prefix\": \"cloudimport/event\",\n\t\t\"s3_region\": \"us\",\n\t\t“s3_role”: “arn:aws:iam::485438090326:role/test-mixpanel”,\n\t},\n\t\"category_properties\": {\n\t\t\"data_format\": \"mixpanel_event\",\n\t\t\"compression\": \"none\"\n\t}\n}",
      "language": "json",
      "name": "Template for S3"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "curl -X POST https://mixpanel.com/api/app/projects/{PROJECT_ID}/connectors/ --user \"{SVC_ACCOUNT}:{SECRET}\" --data '{\"connector_type\":\"gcsImport\",  \"connector_properties\": { \"gcs_bucket\": \"sample-dataset\", \"gcs_prefix\": \"cloudimport/event\",\"gcs_region\": \"us\"}, \"category_properties\": { \"data_format\": \"mixpanel_event\", \"compression\": \"none\"}}'",
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
      "code": "{\n\t\"status\": \"ok\",\n\t\"results\": {\n\t\t\"connector_id\": \"232f40cc-7ccc-4da3-b9c3-d8c1d14142c6\",\n\t\t\"label\": \"\",\n\t\t\"connector_type\": \"gcsImport\",\n\t\t\"connector_properties\": {\n\t\t\t\"gcs_bucket\": \"sample-data\",\n\t\t\t\"gcs_prefix\": \"cloudimport/event\",\n\t\t},\n\t\t\"category_properties\": {\n\t\t\t\"data_format\": \"mixpanel_event\",\n\t\t\t\"compression\": \"none\"\n\t\t},\n\t\t\"status\": \"active\",\n\t\t\"created_at\": \"2020-09-17T02:10:33.799738Z\",\n\t\t\"created_by\": \"Samoyed.mp-service-account@mixpanel.org\"\n\t}\n}",
      "language": "json",
      "name": "Sample Response"
    }
  ]
}
[/block]

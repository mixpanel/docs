---
title: "HTTP API"
slug: "data-warehouse-export-api"
hidden: false
createdAt: "2019-02-04T21:12:40.610Z"
updatedAt: "2020-10-20T20:45:43.336Z"
type: "link"
link_url: "https://developer.mixpanel.com/reference/data-warehouse-api"
---
The Data Pipelines API contains a list of endpoints that are supported by Mixpanel that help you create and manage your data pipelines.

A pipeline is an end to end unit that is created to export Mixpanel data and move it into a data warehouse.
[block:callout]
{
  "type": "info",
  "title": "Trial Version",
  "body": "The Data Warehouse Export API offers a one-time trial. You can call and schedule a trial export by passing `trial = true` when creating a pipeline. The trial export will automatically stop after 30 calendar days."
}
[/block]

[block:api-header]
{
  "title": "Data Pipeline Types"
}
[/block]
Mixpanel currently supports a [data warehouse export pipeline](https://developer.mixpanel.com/docs/data-warehouse-export) and a [raw data pipeline](https://developer.mixpanel.com/docs/s3-raw-export). When you create a pipeline,  the `type` parameter determines whether a data warehouse export pipeline or a raw data pipeline is created. 

## Export to Data Warehouse
The data warehouse export pipeline is a fully managed pipeline that includes transformations and scheduling. [Visit the data warehouse export documentation for more information](https://developer.mixpanel.com/docs/data-warehouse-export). 

## Raw Export Pipeline
The raw export pipeline is a scheduled export that moves your unaltered Mixpanel data to a blob storage destination. [Visit the raw export pipeline documentation for more information](https://developer.mixpanel.com/docs/s3-raw-export).
[block:api-header]
{
  "title": "Configure the Destination to Receive Mixpanel Data"
}
[/block]
Before exporting data from Mixpanel you must configure your data warehouse to accept the data.

For additional information on configuring the Mixpanel export for each type of data warehouse, see:
  * [Exporting to Amazon](https://developer.mixpanel.com/v1.0/docs/mixpanel-amazon-s3-export)
  * [Exporting to BigQuery](https://developer.mixpanel.com/v1.0/docs/mixpanel-bigquery-export-design)
  * [Exporting to Snowflake](https://developer.mixpanel.com/v1.0/docs/mixpanel-snowflake-export)
  * [Exporting to Azure Blob Storage](https://developer.mixpanel.com/docs/azure-blob-storage)
[block:api-header]
{
  "title": "Authentication"
}
[/block]
To ensure the security of your data, the Mixpanel API requires a basic system of authentication. 

## Required Parameter
`api_secret` -  This can be found by clicking on the **settings gear** in the upper righthand corner and selecting **Project Settings**.

## Authorization Steps
The Data Export API accepts basic access authentication over HTTPS as an authorization method. To make an authorized request, put your project's API Secret in the "username" field of the basic access authentication header. Make sure you use HTTPS and not HTTP - our API rejects requests made over HTTP, since this sends your API Secret over the internet in plain text.
[block:api-header]
{
  "title": "Create a Pipeline"
}
[/block]
<hr><p>**Request Type: **<span style="font-family: courier; font-size: 21px;  color:#6f7377">POST</span>

This request creates the export pipeline. The `type` parameter defines the kind of pipeline that is initiated. The following data warehouse types are supported:

1. `bigquery`  Mixpanel exports events and/or user data into Google BigQuery. 

2. `aws` This options creates the S3 data export and glue schema pipeline. Mixpanel exports events and/or user data as JSON packets. Mixpanel also creates schema for the exported data in AWS Glue. Customers can use AWS Glue to query the exported data using AWS Athena or AWS Redshift Spectrum.

3. `snowflake`  This option creates the Snowflake export pipeline. Mixpanel exports events and/or user data into Snowflake.

**URI:** `https://data.mixpanel.com/api/2.0/nessie/pipeline/create`

**Headers:** 
[block:parameters]
{
  "data": {
    "h-0": "Content Type",
    "0-0": "application/x-www-form-urlencoded"
  },
  "cols": 1,
  "rows": 1
}
[/block]
**Parameters:**
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**type**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "0-2": "**Data Warehouse Export:** \n Type parameters include `bigquery`, `snowflake`, `azure-blob` and `aws`.\n\n**Raw Export Pipeline:** Type parameters include `s3-raw`, `gcs-raw` and `azure-raw`. Initializes `s3-raw`, `gcs-raw`, or `azure-raw` pipelines accordingly.",
    "1-0": "**trial**",
    "1-1": "<span style=\"font-family: courier\">boolean</span></br><span style=\"color: green\">optional</span>",
    "1-2": "Default: `false`. A trial pipeline will be created if value is `true`.  \n\nThe trial exports all of your events and user data for thirty calendar days, starting from one day before the API call was made. A trial pipeline has default values for the following parameters:\n\n`data_source: events and people` \n`sync: false`\n`from_date: <defaults to previous day>`\n`to_date: <no value>`\n`frequency: daily`\n`events: <no value>`",
    "2-0": "**schema_type**",
    "2-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "2-2": "Default: `monoschema`. Allowed options are `monoschema` and `multischema`. `monoschema` loads all events into a single table. `multischema` loads every event into its own dedicated table. All user data is exported as `monoschema`.",
    "3-0": "**data_source**",
    "3-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "3-2": "Default: `events`. `data_source` can be either `events` or `people`. `events` exports Mixpanel event data. `people` exports Mixpanel user data.",
    "4-0": "**sync**",
    "4-1": "<span style=\"font-family: courier\">boolean</span></br><span style=\"color: green\">optional</span>",
    "4-2": "Default: `false`. A value of `true` updates exported data with any changes that occur in your Mixpanel dataset. These changes include deletions, late data, and imports that fall into your export window.",
    "5-0": "**from_date**",
    "5-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "5-2": "The starting date of the export window. It is formatted as `YYYY-MM-DD`.",
    "6-0": "**to_date**",
    "6-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "6-2": "The ending date of the export window. It is formatted as `YYYY-MM-DD`. The export will continue indefinitely if `to_date` is empty.",
    "7-0": "**frequency**",
    "7-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "7-2": "Default: `daily`. `frequency` can be either `hourly` or `daily`. `hourly` exports the data every hour. `daily` exports the data at midnight (based on the projects timezone). `frequency` should only be passed if your export window is indefinite.",
    "8-0": "**events**",
    "8-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "8-2": "A whitelist for the event you intend to export.  It is okay to pass this multiple times to whitelist multiple events. \n\nAll events in the project will be exported if no events are specified.",
    "9-0": "**where**",
    "9-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "9-2": "A selector expression used to filter by `events` data, such as event properties. Learn more about how to construct event selector expressions [here](https://help.mixpanel.com/hc/en-us/articles/115005061286-Building-Segmentation-Expressions). This parameter is only valid when `data_source` is events.",
    "10-0": "**data_format**",
    "10-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "10-2": "Default: `json`. The file format of the exported data. `data_format` can be either `json` or `parquet`."
  },
  "cols": 3,
  "rows": 11
}
[/block]
**Return:** Create API returns the name of the pipeline created. Use the name of the pipeline to check the status of or cancel the pipeline. 

For BigQuery pipelines, the request returns the BigQuery dataset name and URL. Use this URL to access the BigQuery dataset.  

Mixpanel creates the dataset within its own Google Cloud Platform project. The service shares a read only view of the dataset created with the user/group provided to the API endpoint.
[block:code]
{
  "codes": [
    {
      "code": "{  \n   \"pipeline_names\":[  \n      \"trial-events-daily-bigquery-monoschema\",\n      \"trial-people-daily-bigquery-monoschema\"\n   ],\n   \"bigquery_dataset_name\":\"https://bigquery.cloud.google.com/dataset/mixpanel-prod-1:sample_dataset_name\"\n}",
      "language": "json",
      "name": "Example Return"
    }
  ]
}
[/block]
## Additional BigQuery Parameters
[block:callout]
{
  "type": "info",
  "body": "Mixpanel creates a dataset in its own BigQuery instance and gives \"View\" access to the account(s) provided at the time of creating the pipeline."
}
[/block]
The following parameters are specific to BigQuery exports.
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**bq_region**",
    "0-2": "Default: `US`. \n\nThe following regions are supported for BigQuery:\n`US`\n`US_EAST_1`\n`US_WEST_2`\n `US_EAST_4`\n`NORTH_AMERICA_NORTHEAST_1`\n`SOUTH_AMERICA_EAST_1`\n`EU`\n`EUROPE_NORTH_1`\n`EUROPE_WEST_2`\n`EUROPE_WEST_3`\n`EUROPE_WEST_6`\n`ASIA_SOUTH_1`\n`ASIA_EAST_1`\n`ASIA_EAST_2`\n`ASIA_NORTHEAST_1`\n`ASIA_NORTHEAST_2`\n`ASIA_NORTHEAST_3`\n`ASIA_SOUTHEAST_1`\n`ASIA_SOUTHEAST_2`\n`AUSTRALIA_SOUTHEAST_1`",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "1-0": "**bq_share_with_group** ",
    "1-2": "Group account email address to share the data-set with.",
    "1-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\"> required</span>"
  },
  "cols": 3,
  "rows": 2
}
[/block]
**Example Request** 
[block:code]
{
  "codes": [
    {
      "code": "#Replace API_SECRET with your project's API secret\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \\\n-u API_SECRET: \\\n-d type=\"bigquery\" \\\n-d bq_region=\"US_EAST_4\" \\\n-d trial=true \\\n-d bq_share_with_group=\"bq-access-alias@somecompany.com\" \\\n#Whitelist a \"Page View\" and \"Item Purchase\" event\n-d events=\"Page View\" \\\n-d events=\"Item Purchase\" ",
      "language": "shell",
      "name": null
    }
  ]
}
[/block]
**Example Response** 

Use the URL that returns as the `bigquery_dataset_name` to access the BigQuery dataset.
[block:code]
{
  "codes": [
    {
      "code": "{  \n   \"pipeline_names\":[  \n      \"trial-events-daily-bigquery-monoschema\",\n      \"trial-people-daily-bigquery-monoschema\"\n   ],\n   \"bigquery_dataset_name\":\"https://bigquery.cloud.google.com/dataset/mixpanel-prod-1:sample_dataset_name\"\n}",
      "language": "json"
    }
  ]
}
[/block]
## Additional Snowflake Parameters
The following parameters are specific to Snowflake exports. 
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**snowflake_share_with**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "0-2": "Name of the account with which the data-set should be shared",
    "1-0": "**region**",
    "1-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "1-2": "The valid region for the Snowflake instance:\n`us-west-aws`\n`us-east-aws`"
  },
  "cols": 3,
  "rows": 2
}
[/block]
**Example Request** 
[block:code]
{
  "codes": [
    {
      "code": "#Replace API_SECRET with your projects API secret\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \\\n-u API_SECRET: \\\n-d type=\"snowflake\" \\\n-d region=\"us-west-aws\" \\\n-d trial=true \\\n-d snowflake_share_with=\"mysnowflakeaccountname\" \\\n#Whitelist a \"Page View\" and \"Item Purchase\" event\n-d events=\"Page View\" \\\n-d events=\"Item Purchase\" ",
      "language": "shell",
      "name": "Shell"
    }
  ]
}
[/block]
## Additional AWS S3 and Glue Parameters
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**s3_bucket**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "0-2": "s3 bucket to which the data needs to be exported.",
    "1-0": "**s3_region**",
    "1-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "1-2": "The valid s3 region for the bucket.\n\nThe following regions are supported for AWS S3:\n`us-east-2`\n`us-east-1`\n`us-west-1`\n`us-west-2`\n`ap-south-1`\n`ap-northeast-3`\n`ap-northeast-2`\n`ap-southeast-1`\n`ap-southeast-2`\n`ap-northeast-1`\n`ca-central-1`\n`cn-north-1`\n`cn-northwest-1`\n`eu-central-1`\n`eu-west-1`\n`eu-west-2`\n`eu-west-3`\n`eu-north-1`\n`sa-east-1`",
    "3-0": "**s3_prefix** ",
    "3-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "3-2": "There is no default value. The path prefix for the export.",
    "4-0": "**s3_encryption**",
    "4-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "4-2": "Default: `none`. Options are `none`, `aes` and `kms`. At rest encryption used by the s3 bucket.",
    "6-0": "**use_glue**",
    "6-1": "<span style=\"font-family: courier\">boolean</span></br><span style=\"color: green\">optional</span>",
    "6-2": "Default: `false`, Use glue schema export.",
    "7-0": "**glue_database**",
    "7-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\"> conditionally required</span>",
    "7-2": "The glue database to which the schema needs to be exported. Required if `use_glue` is `true`.",
    "8-0": "**glue_role**",
    "8-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\"> conditionally required</span>",
    "8-2": "There is no default value. The role that needs to be assumed for updating glue. Required if `use_glue` is `true`.",
    "9-0": "**glue_table_prefix**",
    "9-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "9-2": "There is no default value. Prefix to add to table names when creating them.",
    "5-0": "**s3_kms_key_id**",
    "5-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "5-2": "There is no default value. If s3_encryption is set to kms, this can specify the custom key id you desire to use.",
    "2-0": "**s3_role**",
    "2-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "2-2": "There is no default value. AWS Role the writer should assume when writing to s3."
  },
  "cols": 3,
  "rows": 10
}
[/block]
**Example Request** 
[block:code]
{
  "codes": [
    {
      "code": "#Replace API_SECRET with your projects API secret\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \\\n-u API_SECRET: \\\n-d type=\"aws\" \\\n-d trial=true \\\n-d s3_bucket=\"example-s3-bucket\" \\\n-d s3_region=\"us-east-1\" \\\n-d s3_prefix=\"example_custom_prefix\" \\\n-d s3_role=\"arn:aws:iam::<account-id>:role/example-s3-role\" \\\n-d use_glue=true \\\n-d glue_database=\"example-glue-db\" \\\n-d glue_role=\"arn:aws:iam::<account-id>:role/example-glue-role\" \\\n-d glue_table_prefix=\"example_table_prefix\" \\\n#Whitelist a \"Page View\" and \"Item Purchase\" event\n-d events=\"Page View\" \\\n-d events=\"Item Purchase\" ",
      "language": "shell"
    }
  ]
}
[/block]
## Additional Azure Parameters
The following parameters are specific to Azure Blob Storage, Azure Data Lake, and Azure Raw exports. 
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**storage_account**",
    "1-0": "**container_name**",
    "2-0": "**prefix**",
    "3-0": "**client_id**",
    "4-0": "**client_secret**",
    "5-0": "**tenant_id**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "1-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "2-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "3-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "4-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "5-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "0-2": "Blob Storage Account where the data will be exported.",
    "1-2": "The Blob Container within the account where data will be exported.",
    "2-2": "A custom prefix for all the data being exported to the container.",
    "3-2": "`clientId` from the Service Principal credentials.",
    "4-2": "`clientSecret` from the Service Principal credentials.",
    "5-2": "`tenantId` from the Service Principal credentials. This is specific to the Active Directory instance where the Service Principal resides."
  },
  "cols": 3,
  "rows": 6
}
[/block]
**Example Request** 
[block:code]
{
  "codes": [
    {
      "code": "curl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \\\n-u API_SECRET: \\\n-d type=\"azure-blob\" \\\n-d trial=\"true\" \\\n-d data_format=\"parquet\" \\\n-d storage_account=\"mystorageaccount\" \\\n-d container_name=\"mixpanel-export\" \\\n-d prefix=\"custom_prefix/for/data\" \\\n-d schema_type=\"multischema\" \\\n-d client_id=\"REDACTED\" \\\n-d client_secret=\"REDACTED\" \\\n-d tenant_id=\"REDACTED\"\n#Whitelist a \"Page View\" and \"Item Purchase\" event\n-d events=\"Page View\" \\\n-d events=\"Item Purchase",
      "language": "shell"
    }
  ]
}
[/block]
## Additional GCS Raw Scheduled Export Parameters
The following parameters are specific to [raw scheduled exports](https://developer.mixpanel.com/docs/gcs-raw-pipeline) to GCS blob storage.
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "gcs_bucket",
    "1-0": "gcs_prefix",
    "2-0": "gcs_region",
    "0-1": "String required",
    "1-1": "String required",
    "2-1": "String required",
    "0-2": "The GCS bucket to export the Mixpanel data to.",
    "1-2": "The GCS path prefix of the bucket.",
    "2-2": "The GCS region for the bucket.\nThe following regions are supported for GCS:\n\n\"northamerica-northeast1\" \n\t\"us-central1\"            \n\t\"us-east1\"            \n\t\"us-east4\"             \"us-west1”\n\t\"us-west2\"             \n\t\"southamerica-east1\"      \n\t\"europe-north1\"    \n\t\"europe-west1\"           \n\t\"europe-west2\"           \n\t\"europe-west3\"           \n\t\"europe-west4\"           \n\t\"europe-west6\"        \n\t\"asia-east1\"             \n\t\"asia-east2\"              \n\t\"asia-northeast1”         \n\t\"asia-northeast2\"       \n\t\"asia-northeast3\"        \n\t\"asia-south1\"             \n\t\"asia-southeast1\"          \"australia-southeast1\""
  },
  "cols": 3,
  "rows": 3
}
[/block]

[block:api-header]
{
  "title": "Cancel a Pipeline"
}
[/block]
<hr><p>**Request Type: **<span style="font-family: courier; font-size: 21px;  color:#6f7377">POST</span>

For a given pipeline name, this request cancels the pipeline and stops any future jobs to be scheduled for the pipeline.

**URI:** `https://data.mixpanel.com/api/2.0/nessie/pipeline/cancel`

**Headers:**
[block:parameters]
{
  "data": {
    "h-0": "Content Type",
    "0-0": "application/x-www-form-urlencoded"
  },
  "cols": 1,
  "rows": 1
}
[/block]
**Parameters:** 
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**name**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "0-2": "The name that uniquely identifies the pipeline."
  },
  "cols": 3,
  "rows": 1
}
[/block]
**Example Request:** 
[block:code]
{
  "codes": [
    {
      "code": "#Replace API_SECRET with your projects API secret\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/cancel \\\n-u API_SECRET: \\\n-d name=\"sample_job_name\"",
      "language": "shell"
    }
  ]
}
[/block]
**Return:** `200 OK` indicates a successful cancellation. Any other message indicates failure of the cancellation. 
[block:api-header]
{
  "title": "Check the Status of a Pipeline"
}
[/block]
<hr><p>**Request Type: **<span style="font-family: courier; font-size: 21px;  color:#6f7377">POST</span>

Given the name of the pipeline this API returns the status of the pipeline. It returns the summary and status of all the recent run export jobs for the pipeline.

**URI:** `https://data.mixpanel.com/api/2.0/nessie/pipeline/status`

**Headers:** 
[block:parameters]
{
  "data": {
    "h-0": "Content Type",
    "0-0": "application/x-www-form-urlencoded"
  },
  "cols": 1,
  "rows": 1
}
[/block]
**Parameters:** 
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**name**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "0-2": "The name that uniquely identifies the pipeline.",
    "1-0": "**summary**",
    "1-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "1-2": "Default: `false`. Only lists task count by status and no details.",
    "2-0": "**status**",
    "2-2": "Filters the tasks by the given status. Valid options for status are pending, running, retried, failed, canceled, and timed_out.",
    "2-1": "<span style=\"font-family: courier\">array of strings</span></br><span style=\"color: green\">optional</span>"
  },
  "cols": 3,
  "rows": 3
}
[/block]
**Example Request:** Status with Summary
[block:code]
{
  "codes": [
    {
      "code": "#Replace API_SECRET with your projects API secret\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/status \\\n-u API_SECRET: \\\n-d name=\"YOUR_PIPELINE_NAME\" \\\n-d summary=\"true\"",
      "language": "shell",
      "name": null
    }
  ]
}
[/block]
**Example Return:** Status With Summary
[block:code]
{
  "codes": [
    {
      "code": "// with summary\n{\n\"canceled\": 933,\n\"retried\": 80,\n\"succeeded\": 1\n}",
      "language": "json"
    }
  ]
}
[/block]
**Example Request:** Status with no Summary and a Filter
[block:code]
{
  "codes": [
    {
      "code": "#Replace API_SECRET with your projects API secret\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/status \\\n-u API_SECRET: \\\n-d name=\"YOUR_PIPELINE_NAME\" \\\n-d status=\"running",
      "language": "shell"
    }
  ]
}
[/block]
**Example Return:** Status with no Summary and a Filter
[block:code]
{
  "codes": [
    {
      "code": "//no summary.\n{\n\"canceled\": [\n{\n\"name\": \"company-july-2016-backfill-hourly-monoschema\",\n\"state\": \"canceled\",\n\"last_finish\": \"0000-12-31T16:00:00-08:00\",\n\"run_at\": \"2016-07-26T00:00:00-07:00\",\n\"from_date\": \"2016-07-26T00:00:00-07:00\",\n\"to_date\": \"2016-07-26T00:00:00-07:00\"\n},\n{\n\"name\": \"company-july-2016-backfill-hourly-monoschema\",\n.\n.",
      "language": "json"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Get a List of Scheduled Pipelines"
}
[/block]
<hr><p>**Request Type: **<span style="font-family: courier; font-size: 21px;  color:#6f7377">GET</span>

This API endpoint returns the list of all the pipelines scheduled for a project.

**URI:** `https://data.mixpanel.com/api/2.0/nessie/pipeline/jobs`




**Example Request:** 
[block:code]
{
  "codes": [
    {
      "code": "#Replace API_SECRET with your projects API secret\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/jobs \\\n-u API_SECRET:",
      "language": "shell"
    }
  ]
}
[/block]
**Example Result** 
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"9876543210\": [\n    {\n      \"name\": \"events-daily-bigquery-monoschema\",\n      \"Dispatcher\": \"backfill\",\n      \"last_dispatched\": \"2019-02-01 12:00:00 US/Pacific\",\n      \"frequency\": \"hourly\",\n      \"sync_enabled\": \"true\"\n    }\n  ]\n}\n",
      "language": "json"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Get a Timeline of All Previous Syncs"
}
[/block]
<hr><p>**Request Type: **<span style="font-family: courier; font-size: 21px;  color:#6f7377">GET</span>

This endpoint returns the timestamps of all syncs grouped by date. 

**URI:** `https://data.mixpanel.com/api/2.0/nessie/pipeline/timeline`

**Parameters:** 
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**name**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "0-2": "The name that uniquely identifies the pipeline."
  },
  "cols": 3,
  "rows": 1
}
[/block]
**Example Request:** 
[block:code]
{
  "codes": [
    {
      "code": "#Replace API_SECRET with your projects API secret\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/timeline \\\n-u API_SECRET: \\\n-d name=”YOUR_PIPELINE_NAME”\n",
      "language": "shell"
    }
  ]
}
[/block]
**Example Return:** 
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"day_syncs\": [\n    \"date\": \"2019-08-19\",\n    \"sync_times\": [\n      \"2019-08-19 14:27:46.044605 -0700 PDT\"\n    ],\n    \"status\": \"synced\"\n  },\n  {\n    \"date\": \"2019-08-20\",\n    \"sync_times\": [\n      \"2019-08-20 14:33:09.315098 -0700 PDT\"\n    ],\n    \"status\": \"synced\"\n  },\n ]\n}",
      "language": "json"
    }
  ]
}
[/block]
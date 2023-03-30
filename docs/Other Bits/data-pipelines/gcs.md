---
title: "Schematized: Google Cloud Storage"
slug: "gcs"
hidden: false
metadata: 
  title: "Schematized Export Pipeline: GCS | Mixpanel Developer Docs"
  description: "Set up a schematized export pipeline to GCS from Mixpanel. Learn to configure GCS to receive exported data and create a pipeline to export the data."
createdAt: "2021-02-03T21:37:31.454Z"
updatedAt: "2023-03-26T19:16:54.984Z"
---
The GCS schema pipeline exports [transformed data](doc:schematized-export-pipeline#transformation-rules) to a GCS bucket. This can be useful in case you want to export Mixpanel data into your own BigQuery instance.

To set up a schematized export pipeline to Google Cloud Storage (GCS) from Mixpanel, you must configure GCS to receive the exported data, then [create a pipeline](ref:create-warehouse-pipeline) to export the data.

The following document summarizes the steps to edit GCS permissions so that it accepts the Mixpanel export, and provides an example request to create the pipeline. 
[block:api-header]
{
  "title": "Configure GCS to Accept Mixpanel Data"
}
[/block]
Create a destination bucket, or use an existing one.

"export-upload@mixpanel-prod-1.iam.gserviceaccount.com" needs to be given a "Storage Object Admin" role on the bucket you are creating or intending to reuse for this purpose.
[block:api-header]
{
  "title": "Use the Data Pipelines API"
}
[/block]
After permissions have been granted, use the [Data Pipelines API](ref:create-warehouse-pipeline) to create the pipeline. Here is an example request:
[block:code]
{
  "codes": [
    {
      "code": "curl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \\\n-u API_SECRET: \\\n-d type=\"gcs-schema\" \\\n-d from_date=\"2019-08-10\" \\\n-d gcs_bucket=\"example-gcs-export\" \\\n-d gcs_prefix=\"dwe\" \\\n-d schema_type=\"multischema\" \\\n-d gcs_region=\"us-east-2\"",
      "language": "curl",
      "name": "cURL Example with Values"
    }
  ]
}
[/block]
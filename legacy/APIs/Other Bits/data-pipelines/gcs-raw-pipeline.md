---
title: "Raw: Google Cloud Storage"
slug: "gcs-raw-pipeline"
hidden: false
metadata: 
  title: "Raw Export Pipeline: GCS | Mixpanel Developer Docs"
  description: "Learn how to set up a raw export pipeline to GCS from Mixpanel by configuring GCS to receive the exported data then creating a pipeline to export the data."
createdAt: "2019-08-13T16:34:44.429Z"
updatedAt: "2023-03-26T19:17:38.247Z"
---
To set up a raw export pipeline to Google Cloud Storage (GCS) from Mixpanel, you must configure GCS to receive the exported data, then [create a pipeline](ref:create-warehouse-pipeline) to export the data.

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
      "code": "curl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \\\n-u API_SECRET: \\\n-d type=\"gcs-raw\" \\\n-d from_date=\"2019-08-10\" \\\n-d gcs_bucket=\"example-gcs-export\" \\\n-d gcs_prefix=\"dwe\" \\\n-d gcs_region=\"us-east-2\"",
      "language": "curl",
      "name": "cURL"
    }
  ]
}
[/block]
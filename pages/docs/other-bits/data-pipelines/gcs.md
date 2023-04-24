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
The GCS schema pipeline exports [transformed data](/docs/other-bits/data-pipelines/schematized-export-pipeline#transformation-rules) to a GCS bucket. This can be useful in case you want to export Mixpanel data into your own BigQuery instance.

To set up a schematized export pipeline to Google Cloud Storage (GCS) from Mixpanel, you must configure GCS to receive the exported data, then [create a pipeline](https://developer.mixpanel.com/reference/create-warehouse-pipeline) to export the data.

The following document summarizes the steps to edit GCS permissions so that it accepts the Mixpanel export, and provides an example request to create the pipeline. 

## Configure GCS to Accept Mixpanel Data

Create a destination bucket, or use an existing one.

"export-upload@mixpanel-prod-1.iam.gserviceaccount.com" needs to be given a "Storage Object Admin" role on the bucket you are creating or intending to reuse for this purpose.

## Use the Data Pipelines API

After permissions have been granted, use the [Data Pipelines API](https://developer.mixpanel.com/reference/create-warehouse-pipeline) to create the pipeline. Here is an example request:

```curl cURL Example with Values
curl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \
-u API_SECRET: \
-d type="gcs-schema" \
-d from_date="2019-08-10" \
-d gcs_bucket="example-gcs-export" \
-d gcs_prefix="dwe" \
-d schema_type="multischema" \
-d gcs_region="us-east-2"
```

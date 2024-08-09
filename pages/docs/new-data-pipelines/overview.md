# Overview

Data Pipelines is a [paid add-on](https://mixpanel.com/pricing) that continuously exports data from your Mixpanel project to a Cloud Storage bucket or Data Warehouse of your choice. This feature is ideal for those who wish to perform SQL analysis on Mixpanel data within their own environment.

Setting up Data Pipelines involves two main steps:

1. Configuring your destination to accept data writes from Mixpanel.
2. Creating data pipelines through the **Integrations** page in the UI.

We offer a 30-day free trial of the Data Pipelines add-on. For details on activation, refer to the [FAQ](#how-does-the-free-trial-work).

## Step 1: Configuring Your Destination

The configuration process varies depending on the type of destination you choose: Cloud Storage or Data Warehouse.

### Cloud Storage

JSON pipelines export data as JSON files to a cloud storage bucket, providing a straightforward method for data handling.

For specific configuration instructions, see our guides for each storage destination:

- [AWS S3](/docs/new-data-pipelines/integrations/aws-s3)
- [Google Cloud Storage](/docs/new-data-pipelines/integrations/gcp-gcs)
- [Azure Blob Storage](/docs/new-data-pipelines/integrations/azure-blob-storage)

Data is exported to the following structured paths in your bucket:

- Hourly events: `<BUCKET_NAME>/<MIXPANEL_PROJECT_ID>/mp_master_event/<YEAR>/<MONTH>/<DAY>/<HOUR>/`
- Daily events: `<BUCKET_NAME>/<MIXPANEL_PROJECT_ID>/mp_master_event/<YEAR>/<MONTH>/<DAY>/`
- User profiles: `<BUCKET_NAME>/<MIXPANEL_PROJECT_ID>/mp_people_data/`
- Identity mappings: `<BUCKET_NAME>/<MIXPANEL_PROJECT_ID>/mp_identity_mappings_data/`

### Data Warehouse

JSON Pipelines also facilitate data export into tables, creating schemas that are inferred from your event data.

For detailed setup guides per destination, see:

- [BigQuery](/docs/new-data-pipelines/integrations/bigquery)
- [Redshift Spectrum](/docs/new-data-pipelines/integrations/redshift-spectrum)
- [Snowflake](/docs/new-data-pipelines/integrations/snowflake)

## Step 2: Creating the Pipeline

After configuring your destination, initiate data export by setting up a pipeline through the **Integrations** page on your Mixpanel project. This step will activate data flow to your selected storage or warehouse destination.

## FAQ

### Why does the number of events in Mixpanel not match the number of exported events to my destination?

Discrepancies between the event counts in Mixpanel and those exported to your destination can occur for several reasons:

- **Data Sync**: If [Data Sync](/docs/new-data-pipelines/json-pipelines#data-sync) is not enabled or is unsupported for your pipeline, this could prevent some data from being exported.
- **Data Delay**: Late-arriving data may take up to one day to sync from Mixpanel to your destination, leading to temporary discrepancies.
- **Hidden Events**: Mixpanel exports all events, including those hidden in the Mixpanel UI via Lexicon. To reconcile differences in counts, check if the events in your destination include those hidden in the Mixpanel UI.

### How can I count events exported by Mixpanel in the warehouse?

Counting events can be slightly different for each warehouse, since we use different partitioning methods. Here are examples for [BigQuery](/docs/new-data-pipelines/integrations/bigquery#get-the-number-of-events-each-day) and [Snowflake](/docs/new-data-pipelines/integrations/snowflake#get-the-number-of-events-each-day).

### How does the free trial work?

Mixpanel offers a 30-day free trial of the Data Pipelines, allowing you to create one pipeline per data source for each project.

**Trial limitations**:

- Exports are scheduled on a daily basis only.
- Data synchronization feature is not available.
- Only one pipeline can be created per data source per project.
- Backfilled data is limited to one day prior to the creation date of the pipeline.

### What is Active Pipeline Limit

To maintain optimal performance across our services, we limit the number of concurrently running pipeline steps to one per project. This approach ensures that each job, including those involving substantial backfills, waits its turn, preventing any single project from monopolizing resources and thus promoting fair scheduling among all customers.

Additionally, a maximum of **_two_** events pipelines are permitted per project.

### What is the Service Level Agreement?

Our Service Level Agreement (SLA) stipulates a latency policy for exported events of up to 24 hours end-to-end, with an additional 24-hour allowance for late-arriving data.

**Note**: Mixpanel classifies late data as any data point or user profile update that reaches Mixpanel servers more than two hours after the end of the export window. Late-arriving event data is exported only for pipelines that with **sync** enabled.

For hourly pipelines, data that arrives on time is expected to be exported within 24 hours from the moment it is ingested by Mixpanel. For daily pipelines, this 24-hour period begins at the start of the next calendar day based on project time (e.g., data ingested on January 1st is scheduled to be exported from the start of January 2nd midnight to the end of the day on January 3rd).

Data arriving late is handled during a daily sync process the following day after ingestion, provided sync is enabled. For instance, if data for January 1st arrives on January 3rd, it would be exported in the sync run on January 4th.

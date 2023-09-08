---
title: "Data Pipelines"
slug: "data-pipelines"
hidden: false
metadata: 
  title: "Raw Export Pipeline Overview | Mixpanel Developer Docs"
  description: "Our Data Pipeline API docs show how to use Mixpanel's Raw Export Pipeline to export your unaltered Mixpanel event data into supported destination buckets."
createdAt: "2019-08-11T22:40:11.880Z"
updatedAt: "2023-03-26T23:55:03.958Z"
---
Data Pipelines is a [paid add-on](https://mixpanel.com/pricing) which continuously exports the events in your Mixpanel project to a cloud storage bucket or data warehouse of your choice. It's useful if you want to analyze Mixpanel events using SQL in your own environment.

Using Data Pipelines requires 2 steps:
1. Configuring your destination to allow Mixpanel to write to it.
2. Telling Mixpanel to start exporting your data to that destination using the Pipelines API.

We offer a 30-day free trial of the Data Pipelines add-on. See the [FAQ](#faq) for how to enable it.


# Step 1: Configuring your destination

Configuration depends on the type of Pipeline you want to set up.

## Raw

Raw Pipelines export events as JSON to a cloud storage bucket. This is the simplest approach.

See our configuration guides for each raw destination:
- [Amazon S3](doc:aws-raw-pipeline) 
- [Google Cloud Storage](doc:gcs-raw-pipeline)
- [Azure Blob Storage](doc:azure-raw-pipeline) 

Upon successful creation of a pipeline, events will be exported to the following locations:
- Hourly: `<BUCKET_NAME>/<PATH_PREFIX>/<MIXPANEL_PROJECT_ID>/<YEAR>/<MONTH>/<DAY>/<HOUR>`
- Daily:  `<BUCKET_NAME>/<PATH_PREFIX>/<MIXPANEL_PROJECT_ID>/<YEAR>/<MONTH>/<DAY>/full_day`

An empty `complete` file will be written in the finished hour or day prefix to indicate that the export is complete. The absence of this file means there is an ongoing export for that hour or day.


## Schematized

Schematized Pipelines export events into a schematized table that Mixpanel infers and generates based on your events. Roughly, each event is a table and each property is a column in that table. This is more complex to configure than Raw, but supports additional functionality, like exporting user profile data and exporting to data warehouses.

See our configuration guides for each schematized destination:
- [BigQuery](doc:mixpanel-bigquery-export-design) 
- [Snowflake](doc:mixpanel-snowflake-export) 
- [Amazon Web Services](doc:mixpanel-amazon-s3-export) 
- [Google Cloud Storage](doc:gcs) 
- [Azure Blob Storage](doc:azure-blob-storage) 

The [Schematized Pipeline reference](doc:schematized-export-pipeline) goes the details of schematization and the output format.

# Step 2: Creating the Pipeline

Once you’ve configured your destination, you need to tell Mixpanel to start exporting to that destination.

You can do this by with our [Create Pipeline API](ref:create-warehouse-pipeline). You can create the Pipeline directly from our developer docs UI.

# FAQ

**Why are some events or properties not exported to the destination?**
This normally happens when you have a thousands of unique event names or property names, which is usually an implementation mistake (eg: including a UUID in the event or property name). This causes the export process to exceed table or column limits in the destination. In these cases, we try to identify the bad patterns and exclude them from the export process. We always try to communicate this to the customers through their Customer Success Managers.

**Why does the number of events in Mixpanel not match the number of exported events to my destination?**
This can happen for a couple of reasons:
- [Data Sync](doc:schematized-export-pipeline#data-sync) is not enabled or not supported for your pipeline.
- Data Delay: it can take up to 1 day for late arriving data to be synced from Mixpanel to your destination.
- Hidden Events: Mixpanel exports all events to your destination, even ones that are hidden in the UI via Lexicon. We recommend checking whether the count in your destination is mostly due to events that have been hidden in the Mixpanel UI.

**How can I count events exported by Mixpanel in the warehouse?**
Counting events can be slightly different for each warehouse, since we use different partitioning methods. Here are examples for [BigQuery](doc:mixpanel-bigquery-export-design#getting-the-number-of-events-in-each-day) and [Snowflake](doc:mixpanel-snowflake-export#getting-the-number-of-events-in-each-day).

**How does the free trial work?**
Mixpanel offers a 30-day trial version of the Data Pipelines. The trial allows for one data export pipeline per project to be created.  Simply pass `trial=true` to our API to create a trial pipeline.

Trial limitations:
* Export scheduling is daily only.
* Data sync is unavailable.
* You can only create one pipeline per project. 
* Backfilled data will only include one day prior to the creation date.
* Pipelines will, by default, include both event and user data (not available for raw pipelines).
* The pipeline cannot filter by event name.
* The “Create Pipeline” parameters will default to the values highlighted to list in the [parameters table](ref:create-pipelines#create-warehouse-pipeline).
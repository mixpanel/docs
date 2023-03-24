---
title: "Data Pipelines"
slug: "raw-export-pipeline"
hidden: false
metadata: 
  title: "Raw Export Pipeline Overview | Mixpanel Developer Docs"
  description: "Our Data Pipeline API docs show how to use Mixpanel's Raw Export Pipeline to export your unaltered Mixpanel event data into supported destination buckets."
createdAt: "2019-08-11T22:40:11.880Z"
updatedAt: "2023-01-29T00:44:10.040Z"
---
TODO: Simplify

Use Mixpanel's Data Pipelines to export your unaltered Mixpanel event data directly into supported destination buckets. The exported data includes all event properties and timestamps in JSON format.

Mixpanel offers a 30-day trial version of the Data Pipelines. The trial allows for one data export pipeline per project to be created. The pipeline will close and no more data will be exported from Mixpanel after the trial period has expired.

Pass `trial=true` when [creating a pipeline](ref:create-warehouse-pipeline) to create a trial export pipeline. As is the case with the non-trial version, you must first configure your [raw](doc:raw-export-pipeline) or [schematized](doc:schematized-export-pipeline) export destination.

Deleting the one pipeline for a project will not allow you to make a second pipeline for that same project.

### Trial Limitations
A trial pipeline has several limitations when compared to the full feature. In the trial:
* Export scheduling is daily only.
* Data sync is unavailable.
* You can only create one pipeline per project. 
* Backfilled data will only include one day prior to the creation date.
* Pipelines will, by default, include both event and user data (not available for raw pipelines).
* The pipeline cannot filter by event name.
* The “Create Pipeline” parameters will default to the values highlighted to list in the [parameters table](ref:create-pipelines#create-warehouse-pipeline).

You must configure your destination bucket before creating the raw export pipeline. This ensures that the data is not rejected after Mixpanel exports it. 
[block:callout]
{
  "type": "info",
  "body": "Each pipeline is tied to a specific Mixpanel project and not the organization. So you will need to create a separate pipeline for each of your projects, if needed."
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Raw export pipelines currently supports exporting only to [Google Cloud Storage](doc:gcs-raw-pipeline), [Amazon S3](doc:aws-raw-pipeline) or [Azure Blob Storage](doc:azure-raw-pipeline). Please note that exporting user profile data and PARQUET format is not currently supported. Please consider using [Schematized Export Pipeline](doc:schematized-export-pipeline) if these features are desired."
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Raw Export Pipeline is available as an [add-on](https://mixpanel.com/pricing/) for Growth and Enterprise plans. Additionally, a free [30 day trial](#section-trial-version) is available to customers looking to try this add-on. You may create one trial pipeline, which will close when the 30 day trial period ends. For more information see [Trial Pipeline](doc:trial-pipeline)."
}
[/block]

[block:api-header]
{
  "title": "Raw Data Pipeline Details"
}
[/block]
The raw data pipeline creates a scheduled raw export from Mixpanel to a data storage solution.

This is different from the [raw export API](ref:raw-data-export-api) as the raw export pipeline is scheduled and ongoing. The raw export pipeline also requires a destination. 

Upon successful creation of a pipeline, the data will be exported to ``<BUCKET_NAME>/<PATH_PREFIX>/<MIXPANEL_PROJECT_ID>/<YEAR>/<MONTH>/<DAY>/full_day`` for daily exports and ``<BUCKET_NAME>/<PATH_PREFIX>/<MIXPANEL_PROJECT_ID>/<YEAR>/<MONTH>/<DAY>/<HOUR>`` for hourly exports. An example path for hourly export would be ``my-mixpanel-export/my_prefix/1234567/2021/03/10/16``.

Upon the completion of each export, an empty `complete` file will be written in the finished hour or day prefix. The absence of this file means there is an ongoing export for that hour or day.
[block:callout]
{
  "type": "info",
  "body": "The date used in the path prefix is not in UTC but in the project timezone from the project settings page"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Exporting the events that come into Mixpanel a few days late to the configured pipeline is not currently supported by raw export pipeline. Please consider using [Schematized Export Pipeline](doc:schematized-export-pipeline) if this feature is desired."
}
[/block]

[block:api-header]
{
  "title": "Raw Export Pipeline Format"
}
[/block]
The raw export pipeline exports your event data in its unaltered JSON format. 

An example exported event could look like:
[block:code]
{
  "codes": [
    {
      "code": "// Expected Return\n{\n  \"event\": \"Viewed report\",\n    \"properties\": {\n        \"distinct_id\": \"foo\",\n        \"time\": 1518314400,\n        \"$os\": \"Linux\",\n        \"$browser\": \"Chrome\",\n        \"Project ID\": \"3\",\n        \"mp_country_code\": \"US\"\n    }\n}",
      "language": "json"
    }
  ]
}
[/block]
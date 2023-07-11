---
title: "Overview"
slug: "data-warehouse-api"
hidden: false
createdAt: "2020-10-20T01:12:37.550Z"
updatedAt: "2021-11-23T00:34:19.237Z"
---
The Data Pipelines API contains a list of endpoints that are supported by Mixpanel that help you create and manage your data pipelines. Check out our guide on [Raw Export Pipeline](doc:raw-export-pipeline) and [Schematized Export Pipeline](doc:schematized-export-pipeline) to learn more.

A pipeline is an end-to-end unit that is created to export Mixpanel data and move it into a data warehouse.
[block:api-header]
{
  "title": "Data Pipeline Types"
}
[/block]
Mixpanel currently supports [Raw Export Pipeline](doc:raw-export-pipeline) and [Schematized Export Pipeline](doc:schematized-export-pipeline). When you create a pipeline,  the `type` parameter determines whether a schematized or a raw data pipeline is created. 

## Schematized Export Pipeline
The schematized export pipeline is a fully managed pipeline that includes transformations and scheduling. Visit [Schematized Export Pipeline](doc:schematized-export-pipeline) for more information. 

## Raw Export Pipeline
The raw export pipeline is a scheduled export that moves your unaltered Mixpanel data to an object storage destination. Visit [Raw Export Pipeline](doc:raw-export-pipeline) for more information.
[block:api-header]
{
  "title": "Configure the Destination to Receive Mixpanel Data"
}
[/block]
Before exporting data from Mixpanel you must configure your data warehouse to accept the data.

For additional information on configuring the Mixpanel export for each type of object storage and data warehouse, see the available options in [Raw Export Pipeline](doc:raw-export-pipeline) and [Schematized Export Pipeline](doc:schematized-export-pipeline).

[block:api-header]
{
  "title": "Create a Data Pipeline"
}
[/block]
Once you have configured your destination, you can use the API to [create your pipeline](ref:create-warehouse-pipeline).
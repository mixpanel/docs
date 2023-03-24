---
title: "Trial Pipeline"
slug: "trial-pipeline"
hidden: false
metadata: 
  title: "Data Pipelines: Trial Period | Mixpanel Developer Docs"
  description: "Mixpanel offers a 30-day trial version of the Data Pipelines. The trial allows for one data export pipeline per project to be created. Learn more here."
createdAt: "2021-11-16T19:14:07.750Z"
updatedAt: "2021-11-16T19:28:00.822Z"
---
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
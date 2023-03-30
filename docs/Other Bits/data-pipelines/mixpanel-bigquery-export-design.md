---
title: "Schematized: BigQuery"
slug: "mixpanel-bigquery-export-design"
hidden: false
createdAt: "2019-01-25T19:05:42.218Z"
updatedAt: "2023-03-26T19:16:35.229Z"
---
This guide describes how Mixpanel exports your data to a [Google BigQuery](https://cloud.google.com/bigquery/) dataset.  
[block:api-header]
{
  "title": "Design"
}
[/block]
There are currently two ways to export mixpanel data into big.
1. Exporting into Customer managed BigQuery (recommended)
2. Exporting into Mixpanel managed BigQuery  
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/eaacadf-bq-design.png",
        "bq-design.png",
        624,
        163,
        "#dfdfdf"
      ]
    }
  ]
}
[/block]
As part of the export pipeline, a new dataset `mixpanel_nessie_day_partitioned_<PROJECT_ID>` will be created if the customer chose to export into Mixpanel managed BigQuery or a dataset should be created with appropriate permissions on customer-managed BigQuery and provide us with a name. We also apply [transformation rules](doc:schematized-export-pipeline#transformation-rules) to make the data compatible with data warehouses. 

For user profile and identity mappings tables, we create a new table with a random suffix every time and then will update the `mp_people` and `mp_identity_mappings` views accordingly to use the latest table. You should always use the views and should refrain from using the actual tables as we don't delete the old tables immediately and you may be using an old table.
[block:api-header]
{
  "title": "Partitioning"
}
[/block]
The data in the tables is partitioned based on [`_PARTITIONTIME` pseudo column](https://cloud.google.com/bigquery/docs/querying-partitioned-tables#ingestion-time_partitioned_table_pseudo_columns) and in project timezone.
[block:api-header]
{
  "title": "Queries"
}
[/block]
You can query data with a single table schema or with a multiple table schema in BigQuery. To get more information about the table schemas, please see [Schema](doc:schematized-export-pipeline#schema).

To query a single table schema, use this snippet.
[block:code]
{
  "codes": [
    {
      "code": "SELECT count(*)\nFROM mixpanel_nessie_day_partitioned_<PROJECT_ID>.mp_master_event\nWHERE mp_event_name = “<CLEANED_EVENT_NAME>”",
      "language": "sql"
    }
  ]
}
[/block]
To query a multiple table schema, use this snippet.
[block:code]
{
  "codes": [
    {
      "code": "SELECT count(*)\nFROM mixpanel_nessie_day_partitioned_<PROJECT_ID>.<CLEANED_EVENT_NAME>",
      "language": "sql"
    }
  ]
}
[/block]
`CLEANED_EVENT_NAME` is the transformed event name based on [transformation rules](doc:schematized-export-pipeline#transformation-rules).

### Getting the number of events in each day
You will need this if you suspect the export process is not exporting all the events you want. As the tables are partitions using  [`_PARTITIONTIME` pseudo column](https://cloud.google.com/bigquery/docs/querying-partitioned-tables#ingestion-time_partitioned_table_pseudo_columns) and in project timezone, you can use to following query to get the number of events per day in an easy and fast way:
[block:code]
{
  "codes": [
    {
      "code": "SELECT\n  _PARTITIONTIME AS pt,\n  COUNT(*)\nFROM\n  `mixpanel_nessie_day_partitioned_<PROJECT_ID>.mp_master_event`\nWHERE\n  DATE(_PARTITIONTIME) <= \"2021-12-03\"\n  AND DATE(_PARTITIONTIME) >= \"2021-12-01\"\nGROUP BY\n  pt",
      "language": "sql"
    }
  ]
}
[/block]
This example returns the number of events in each day in project timezone for a monoschema export pipeline and an example daterange. You can adjust the query for multischema by putting the right table name in the query.

### Querying the identity mapping table

When using the ID mappings table, you should use the **resolved** `distinct_id` in place of the non-resolved `distinct_id` whenever present. If there is no resolved `distinct_id`, you can then use the `distinct_id` from the existing people or events table.

Below is an example SQL query that references the ID mapping table to count number of events in a specific date range for each unique user in San Francisco :
[block:code]
{
  "codes": [
    {
      "code": "SELECT\n CASE\n     WHEN m.resolved_distinct_id IS NOT NULL THEN m.resolved_distinct_id\n     WHEN m.resolved_distinct_id IS NULL THEN e.distinct_id\n END as resolved_distinct_id,\nCOUNT(*) AS count\nFROM mixpanel_nessie_day_partitioned_<PROJECT_ID>.mp_master_event e FULL OUTER JOIN mixpanel_nessie_day_partitioned_<PROJECT_ID>.mp_identity_mappings_data_view m\nON e.distinct_id = m.distinct_id\nAND mp_city=\"San Francisco\"\nAND DATE(e._PARTITIONTIME) <= \"2021-12-03\"\nAND DATE(e._PARTITIONTIME) >= \"2021-12-01\"\nGROUP BY resolved_distinct_id\nLIMIT 100",
      "language": "sql"
    }
  ]
}
[/block]
Counting number of times a user has done a specific behavior is also possible by adding more filters on event properties. You can adjust the query for multischema by putting the right table name in the query.
[block:api-header]
{
  "title": "Exporting into Customer managed BigQuery (Recommended)"
}
[/block]
We recommend exporting Mixpanel data into customer-managed BigQuery, for this the customer needs to follow these steps.
1. Create a dataset in their BigQuery
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c9f3137-Screen_Shot_2021-12-09_at_6.10.26_AM.png",
        "Screen Shot 2021-12-09 at 6.10.26 AM.png",
        789,
        543,
        "#e0e8f4"
      ],
      "sizing": "smart",
      "border": false
    }
  ]
}
[/block]
2. Give Mixpanel the necessary permissions to export into this dataset.

We need two permissions to manage the dataset. 
**BigQuery Job User**
  * Go to **IAM &Admin** in your Google Cloud Console.
  * Click **+ ADD** to add principals
  * Add new principle "export-upload@mixpanel-prod-1.iam.gserviceaccount.com" and set role as "BigQuery Job User", and save.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f96fb08-Screen_Shot_2021-12-09_at_6.33.45_AM.png",
        "Screen Shot 2021-12-09 at 6.33.45 AM.png",
        1482,
        453,
        "#b8bcc2"
      ]
    }
  ]
}
[/block]
**BigQuery Data Owner **
  * Go to **BigQuery** in your Google cloud Console.
  * Open the dataset you want mixpanel to export to.
  * Click on **sharing** and **permissions** in the drop down. 
  * In the Data Permissions window click on **Add Principal** 
  * Add new principle "export-upload@mixpanel-prod-1.iam.gserviceaccount.com" and set role as "BigQuery Data Owner", and save.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d7de1d8-Screen_Shot_2021-12-09_at_6.25.27_AM.png",
        "Screen Shot 2021-12-09 at 6.25.27 AM.png",
        1517,
        856,
        "#a3a5a7"
      ]
    }
  ]
}
[/block]
3. You need to pass this dataset and gcp project id as params when you [create your pipeline](ref:create-warehouse-pipeline)
[block:api-header]
{
  "title": "Exporting into Mixpanel managed BigQuery"
}
[/block]
This is not a recommended approach anymore. But if you choose to export into Mixpanel manged BigQuery then you must provide a Google group email address to use the BigQuery export when you [create your pipeline](ref:create-warehouse-pipeline). Mixpanel exports transformed data into BigQuery at a specified interval. 
[block:callout]
{
  "type": "info",
  "body": "Mixpanel creates a dataset in its own BigQuery instance and gives \"View\" access to the account(s) provided at the time of creating the pipeline. As a result, there is no storage cost associated with exporting data to BigQuery, but standard compute costs will occur when querying on this data.\n\nIf you choose to copy the dataset into your own BigQuery instance, you will additionally start accruing storage costs from BigQuery"
}
[/block]
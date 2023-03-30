---
title: "Schematized: Snowflake"
slug: "mixpanel-snowflake-export"
hidden: false
createdAt: "2019-01-25T19:14:54.958Z"
updatedAt: "2023-03-26T19:16:50.414Z"
---
This guide describes how Mixpanel data is exported into a [Snowflake](https://docs.snowflake.net/manuals/user-guide-getting-started.html) dataset. [Create a pipeline](ref:create-warehouse-pipeline) to export your Mixpanel data into Snowflake. Once an export job is scheduled, Mixpanel exports data to Snowflake on a recurring basis. 

[block:api-header]
{
  "title": "Design"
}
[/block]
Mixpanel exports data to its own Snowflake account and gives your Snowflake account access to read the data. As a result, you will need a Snowflake account to be able to use the exported data. For more information on how to use your shared data, see [Sharing Data in Snowflake](https://docs.snowflake.net/manuals/user-guide-data-share.html). 

For Snowflake export, we first load the data into a single-column raw (VARIANT type) data table. This data will be a [transformed version](doc:schematized-export-pipeline#section-transformation-rules) of the raw data stored in Mixpanel. Then, we create a view to expose all properties as columns. The view name is the cleaned version of the event name and the raw table name is always the view name suffixed with `_raw`. For example, for `signup` event, you will have a `signup_raw` table and a `signup` view. Please see [Schema](doc:schematized-export-pipeline#schema) for general information about the schemas in Schematized Export Pipelines. 
[block:api-header]
{
  "title": "Partitioning"
}
[/block]
The data in the raw tables is clustered based on `time` column but in project's timezone. To be exact, we use `CLUSTER BY (TO_DATE(CONVERT_TIMEZONE('UTC','<TIMEZONE>', TO_TIMESTAMP(DATA:time::NUMBER)))` where `TIMEZONE` is the Mixpanel project's timezone.
[block:api-header]
{
  "title": "Queries"
}
[/block]
Mixpanel recommends you place all events into a single table to make querying easier. To get more information about the table schemas, please see [Schema](doc:schematized-export-pipeline#schema). 

A query is a request for data results. You can perform actions on the data, such as combine data from different tables; add, change, or delete table data; and perform calculations.

Snowflake supports a VARIANT type that can store JSON objects and arrays. Mixpanel exposes array and object top-level properties as VARIANT columns in the view.

Here is an example of how you can query the raw table when using one table for all the events:
[block:code]
{
  "codes": [
    {
      "code": "SELECT count(*)\nFROM mixpanel.mp_master_event_raw\nWHERE data:mp_event_name::string = “Signup”;",
      "language": "sql"
    }
  ]
}
[/block]
Here is an example of how you can query the view when using one table for all the events:
[block:code]
{
  "codes": [
    {
      "code": "SELECT count(*)\nFROM mixpanel.mp_master_event\nWHERE mp_event_name = “Signup”;",
      "language": "sql"
    }
  ]
}
[/block]
Here is an example of how you can query the raw table when using multiple tables for the events:
[block:code]
{
  "codes": [
    {
      "code": "SELECT count(*)\nFROM mixpanel.signup_raw\nWHERE data:distinct_id::string = “1”;",
      "language": "sql"
    }
  ]
}
[/block]
Here is an example of how you can query the view when using multiple tables for the events:
[block:code]
{
  "codes": [
    {
      "code": "SELECT count(*)\nFROM mixpanel.signup\nWHERE distinct_id = “1”;",
      "language": "sql"
    }
  ]
}
[/block]
### Getting the number of events in each day
You will need this if you suspect the export process is not exporting all the events you want. As time column in the tables is in UTC timezone, you first need to convert that to your Mixpanel project timezone, and then, get the number of events for each day. The following query will do that for you.
[block:code]
{
  "codes": [
    {
      "code": "SELECT TO_DATE(CONVERT_TIMEZONE('UTC','<PROJECT_TIMEZONE>', time)) as ttime, count(*) \nFROM \"<DB_NAME>\".\"PUBLIC\".\"MP_MASTER_EVENT\"\nWHERE ttime>=TO_DATE('2021-12-03') AND ttime<=TO_DATE('2021-12-07')\nGROUP BY ttime",
      "language": "sql"
    }
  ]
}
[/block]
This example returns the number of events in each day in project timezone for a monoschema export pipeline and an example daterange. `PROJECT_TIMEZONE` and `DB_NAME` should be replaced by your Mixpnael project timezone and your snowflake database name. You can adjust the query for multischema by putting the right table name in the query.

### Querying the identity mapping table

When using the ID mappings table, you should use the **resolved** `distinct_id` in place of the non-resolved `distinct_id` whenever present. If there is no resolved `distinct_id`, you can then use the `distinct_id` from the existing people or events table.

Below is an example SQL query that references the ID mapping table to count number of events in a specific date range for each unique user in San Francisco
[block:code]
{
  "codes": [
    {
      "code": "SELECT\n CASE\n     WHEN m.resolved_distinct_id IS NOT NULL THEN m.resolved_distinct_id\n     WHEN m.resolved_distinct_id IS NULL THEN e.distinct_id\n END as resolved_distinct_id,\nCOUNT(*) AS count\nFROM \"<DB_NAME>\".\"PUBLIC\".\"MP_MASTER_EVENT\" e FULL OUTER JOIN \"<DB_NAME>\".\"PUBLIC\".\"MP_IDENTITY_MAPPINGS_DATA\" m\nON e.distinct_id = m.distinct_id\nAND mp_city=\"San Francisco\"\nAND TO_DATE(CONVERT_TIMEZONE('UTC','<PROJECT_TIMEZONE>', e.time)) >= TO_DATE(\"2020-04-01\")\nAND TO_DATE(CONVERT_TIMEZONE('UTC','<PROJECT_TIMEZONE>', e.time)) <= TO_DATE(\"2020-04-03\")\nGROUP BY resolved_distinct_id\nLIMIT 100",
      "language": "sql"
    }
  ]
}
[/block]
Counting number of times a user has done a specific behavior is also possible by adding more filters on event properties. You can adjust the query for multischema by putting the right table name in the query.
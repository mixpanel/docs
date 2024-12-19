# Schematized Export Pipeline

Schematized Export Pipeline is designed to export your Mixpanel data into supported data warehouses or object storage solutions. We first transform the events and user profile data in Mixpanel to be ready to be loaded into the supported data warehouses using [transformation rules](#transformation-rules). For object storage solutions, we only add the mapping of original property names to the column names to the bucket. For data warehouses, we add the schema and time-based partitions to the tables to make the queries easier to write and more efficient.

This documentation targets users with intermediate or advanced knowledge of databases and knowledge of Amazon Web Services, Google Cloud Platform, or Snowflake technology.

## Mixpanel Schematized Export Pipeline Overview

You must first configure your destination to accept the data before you can export data from Mixpanel to that destination.

For additional information on configuring the Mixpanel export for different destinations, see:

- [BigQuery](/docs/data-pipelines/old-pipelines/integrations/schematized-bigquery-pipeline)
- [Snowflake](/docs/data-pipelines/old-pipelines/integrations/schematized-snowflake-pipeline)
- [Amazon Web Services](/docs/data-pipelines/old-pipelines/integrations/schematized-aws-pipeline)
- [Google Cloud Storage](/docs/data-pipelines/old-pipelines/integrations/schematized-gcs-pipeline)
- [Azure Blob Storage](/docs/data-pipelines/old-pipelines/integrations/schematized-azure-pipeline)

After configuring the destination, you can [create a pipeline](https://developer.mixpanel.com/reference/create-warehouse-pipeline) to export the data.

After configuring the destination and creating a pipeline with the API, you can begin to query Mixpanel data from the destination warehouse or storage bucket. This opens up the use of SQL use from within Google Bigquery, Snowflake, and Amazon Redshift Spectrum.

## Data Sources

Mixpanel can export both events and user data. Mixpanel supports hourly and daily exports (daily is the default).

The event data that is exported using the schematized export pipeline is the same data exported from the [Raw Data Export API](https://developer.mixpanel.com/reference/export#raw-event-export).

The user data that is exported using the schematized export pipeline is the same data exported from the [Query API Engage Endpoint](https://developer.mixpanel.com/reference/engage#engage-query).

In order to ensure a performant service for all customers, certain steps of the pipelines are limited to 1 pipeline per project running at a time. For example, a project with multiple jobs would have one wait for the other to complete certain steps before proceeding. In this way, something like a large backfill for one customer does not take priority over other customers, and keeps scheduling more fair.

In addition, customers are limited to 1 date-range based pipeline creation per 24 hours. A date-range based pipeline is one that has a `from_date` and `to_date` that are both in the past, and uses `events` as the data type.

#### Backfilling Historical Data

You can schedule an initial backfill when creating a pipeline. This ensures that historical data is also exported to the data warehouse.

Use the `from_date` parameter to specify the date you want to use to export historical data. Note that the `from_date` must be no more than 6 months in the past.

The completion time for a backfill depends on the number of days and the amount of data in the project. Larger backfills can take up to multiple weeks.

## User Data Support

User data is exported to a single table named `mp_people_data` (user data is accessible as a view of `mp_people_data` in BigQuery).

Since user profiles are mutable, the data in the table is replaced every time an export happens based on the schedule (daily or hourly) with the latest user profiles.

## User Identity Resolution

Exports from projects with [ID merge enabled](/docs/tracking-methods/id-management#identity-merge-apis) will need to use the identity mapping table to replicate the user counts seen in UI reporting. When ID merge is enabled, Mixpanel assigns multiple identifiers to an individual. Mixpanel resolves these into one identifier, and uses that for reporting unique user counts. Read more about how Mixpanel resolves IDs [here](/docs/tracking-methods/id-management/identifying-users-simplified#example-user-flows).

Pipelines export event data as they appear when Mixpanel ingests them. This means exported event data before sending alias event has the original user identifier, **not** the resolved identifier. Use the identity mappings table to accurately count unique users. This will allow you to recreate the identity cluster that Mixpanel creates.

Mixpanel automatically exports the ID mapping table when you create a people export pipeline from a project with ID merge enabled.

Note: When using the ID mappings table, you should use the **resolved** `distinct_id` in place of the non-resolved `distinct_id` whenever present. If there is no resolved `distinct_id`, you can then use the `distinct_id` from the existing people or events table.
}

Examples of how to do this are available for [BigQuery](/docs/data-pipelines/old-pipelines/integrations/schematized-bigquery-pipeline#querying-the-identity-mapping-table) and [Snowflake](/docs/data-pipelines/old-pipelines/integrations/schematized-snowflake-pipeline#querying-the-identity-mapping-table).

## Service Level Agreement

The policy for latency on exported events is 24 hours end to end, plus an additional 24 hours for late-arriving data.

**Note**: Mixpanel defines late data as any data point or user profile update that reaches Mixpanel servers later than two hours after the end of the export window. Late-arriving event data is only exported for pipelines with sync enabled.

For hourly pipelines, data that arrived on time would be exported in up to 24 hours from the time that Mixpanel ingests the data. For daily pipelines, the 24 hours would be counted from the start of the next calendar day in project time (ex: data ingested on Jan 1st is scheduled to be imported starting Jan 2nd at midnight and before midnight on Jan 3rd).

Data that arrived late is exported during a sync process daily (if sync is enabled), the next day after the data is ingested. As an example, data for Jan 1st that arrived on Jan 3rd (a couple of days late) would be exported/synced in the sync run from Jan 4th.

## Data Sync

Event data stored in Mixpanel’s datastore and event data in the data warehouse can fall out of sync.

The discrepancy can be attributed to several different causes:

- Late data can arrive multiple days later due to a mobile client being offline.
- The import API can add data to previous days.
- Delete requests related to GDPR can cause deletion of events and event properties.

Mixpanel is able to detect any changes in your data with the granularity of a day and replaces the old data with the latest version both in object storage and data warehouse, if applicable.

Data sync helps keep the data fresh and minimizes missing data points.

Do Note: Data sync does not fully guarantee syncing GDPR Data Deletions. It is recommended to implement a strategy to remove all records of GDPR Deleted Users in your data warehouse. Additionally, we start checking for late arriving data 24 hours after the data for a day is exported. It may take more than 2 days for the data in the destination to be in sync with the data in Mixpanel.

## Transformation Rules

Some characters are not legal for table or column names, or when collisions can occur in the dataset. Mixpanel cleans, or transforms, the data to account for this. This section provides the rules on how Mixpanel cleans data.

#### Table and Column Names

Mixpanel applies these rules for table and column names:

- Special characters and whitespaces are replaced with `_`(underscore).
- Letters are converted to lowercase.
- Maximum name length is 128 characters (The name is truncated after 128 characters.)
- Properties that start with a `$` (dollar sign) have a prefix of `mp_`.
- Properties that conflict with reserved keywords are prefixed with `res_`.

#### Naming Conflicts

There are several naming transformations that happen as a result of character conflicts.

Capitalized letters are converted to lower case. Any duplicate strings has a numeric value appended to them to differentiate.

For example if values “XY” and “Xy” are sent in:

- Both are transformed to “xy”.
- If “Xy” is sent in after "XY", it becomes “xy_1”.
- Any subsequent “xy” values inherit incremental numeric values (i.e. xy_2, xy_3, etc.).

#### Type Conflicts

Mixpanel transforms values to resolve type conflicts.

If a property value is passed with a particular data type and is passed subsequently with a different data type, then the new data type appends to the property name.

For example, if “X” appears with type INT first, then subsequently appears as type STRING (or VARCHAR), then the property name will be transformed to "x_string" with a data type of string.

#### New Properties

New properties that were not present in previous imports will append to the old rows with a `NULL` value.

## Property Mappings

Because of the transformation rules, sometimes it can be hard to know the mappings between original and transformed event and property names. In case you are exporting the schematized data to an object storage or you are exporting to a data warehouse but providing your own intermediate object storage, we export these mappings to `<BUCKET_NAME>/<PATH_PREFIX>/<MIXPANEL_PROJECT_ID>/schema/` under `events.json`, `people.json` and `identities.json`.

## Schema

This section describes how Schematized Export Pipeline creates the schema for the exported data. Event data and user data are loaded into separate tables. User profile data is loaded into one table, whereas events can be loaded into either a single table for each event or one table for all events.

#### Common Properties

Regardless of whether you're using a single table or multiple tables, the following properties will be always present in the schema:
| name | type | description |
| :---------- | :----- | :-------------------------------------------------- |
| time | int | The timestamp representing when the event occurred. |
| distinct_id | string | The unique ID of the user who triggered the event. |

For a single table schema, you will also have an extra property for event name:

| name          | type   | description           |
| :------------ | :----- | :-------------------- |
| mp_event_name | string | the name of the event |

Please note that the types in the above tables are generic. The exact type can be different based on your export destination.

#### Limits

The schema for each table cannot exceed 9500 unique properties. If a tables schema reaches this limit all new properties added to the schema will be included in a JSON like property called `mp_properties`.
| name | type | pipeline destination |
| :------------ | :--------------- | :-------------------- |
| mp_properties | json | BigQuery |
| mp_properties | object | Snowflake |
| mp_properties | json-like string | AWS Glue |
| mp_properties | json-like string | GCS |
| mp_properties | json-like string | Azure |

#### Using One Table for All Events

In this schema, all your Mixpanel data exists in a single table. Mixpanel recommends a single table schema because it makes querying simpler.

If you select the single table schema, the export pipeline creates a *mp_master_event *table. The table has one column per unique property name across all events in the history of the dataset.

Suppose you have an event with a `purchase_amount` property and one with a `referrer` property, the table will have a _purchase_amount_ column and a _referrer_ column. Events that don’t have a property contain a NULL value in that column.

For examples of one table for all events, see [One Table for All Events](#one-table-for-all-events).

#### Using One Table for Each Event

Each Mixpanel event exists in a single table. This schema is a useful workaround for limitations in the number of columns that are allowed in a S3 table.

If you select the multi-table option, Mixpanel creates one table per unique event name. Each table is named for the event. For example, if you have an event called `signup` there will be a table named _signup_.

Each table for each event has one column per unique property name across all events in the history of the dataset.

For an example of one table for each event, see [One Table for Each Event](#one-table-for-each-event).

> 📘
>
> One table for each event is not available during the trial period.

#### Table Example

Here is an example dataset to view different schema options in either one table for all events or one table for each event.

```json
{
       “event”: “Signup”,
       “properties”: {
       “plan”: “free”,
       “browser”: “chrome”,
       “distinct_id”: 1,
       “time”: 123
       }
}
{
       “event”: “Purchase”,
       “properties”: {
       “product_id”: “123”,
       “browser”: “chrome”,
       “distinct_id”: 1,
       “time”: 124
       }
}
{
       “event”: “Signup”,
       “properties”: {
       “plan”: “paid”,
       “browser”: “firefox”,
       “ab_test”: 1,
       “distinct_id”: 2,
       “time”: 125
}
```

##### One Table for All Events

Single table: _mixpanel_events_

| mp_event_name | time | distinct_id | plan   | browser   | product_id | ab_test |
| :------------ | :--- | :---------- | :----- | :-------- | :--------- | :------ |
| “Signup”      | 123  | 1           | "free" | "chrome"  | NULL       | NULL    |
| “Purchase”    | 124  | 1           | NULL   | "chrome"  | 123        | NULL    |
| “Signup”      | 125  | 2           | "paid" | "firefox" | NULL       | 1       |

##### One Table for Each Event

Two tables: _signup \_and \_purchase_

Table: _signup_

| time | distinct_id | plan   | browser   | ab_test |
| :--- | :---------- | :----- | :-------- | :------ |
| 123  | 1           | "free" | "chrome"  | NULL    |
| 125  | 2           | "paid" | "firefox" | 1       |

Table: _purchase_

| time | distinct_id | browser  | product_id |
| :--- | :---------- | :------- | :--------- |
| 124  | 1           | "chrome" | 123        |

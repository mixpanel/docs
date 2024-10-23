# Snowflake

This guide describes how Mixpanel data is exported into a Snowflake dataset. Create a pipeline to export your Mixpanel data into Snowflake. Once an export job is scheduled, Mixpanel exports data to Snowflake on a recurring basis.

## Design

Mixpanel exports data to customer's database. We first load the data into a single-column raw (VARIANT type) data table. Then, we create a view to expose all properties as columns.

## Set Export Permissions

### Step 1: Create a Role and Grant Permissions

Create a role (`MIXPANEL_EXPORT_ROLE` as example) and grant aceess on your database, schema, warehouse to the role. Replace `<database name>`, `<schema name>`, `<warehouse name>` with actual names.

```sql
CREATE ROLE MIXPANEL_EXPORT_ROLE;
GRANT ALL ON DATABASE <database name> TO ROLE MIXPANEL_EXPORT_ROLE;
GRANT ALL ON SCHEMA <database name>.<schema name> TO ROLE MIXPANEL_EXPORT_ROLE;
GRANT USAGE ON WAREHOUSE <warehouse name> TO ROLE MIXPANEL_EXPORT_ROLE;
GRANT OPERATE ON WAREHOUSE <warehouse name> TO ROLE MIXPANEL_EXPORT_ROLE;
GRANT MONITOR ON WAREHOUSE <warehouse name> TO ROLE MIXPANEL_EXPORT_ROLE;
```

### Step 2: Create storage integration

To enable Mixpanel to load from gcs owned by mixpanel to your warehouse, you need you create a gcs storage integration with gcs bucket `"gcs://mixpanel-export-pipelines-<project-id>` owned by Mixpanel and then grant this integration to the role. Replace `<project-id>` to your Mixpanel project ID.

```sql
CREATE STORAGE INTEGRATION MIXPANEL_EXPORT_STORAGE_INTEGRATION
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'GCS'
  ENABLED = TRUE
  STORAGE_ALLOWED_LOCATIONS = ("gcs://mixpanel-export-pipelines-<project-id>");
GRANT USAGE ON INTEGRATION MIXPANEL_EXPORT_STORAGE_INTEGRATION TO MIXPANEL_EXPORT_ROLE;
```

### Step 3: Authentication to user

Refer to [Step 2: Creating the Pipeline](/docs/data-pipelines/#step-2-creating-the-pipeline)
to create data pipeline via UI.

We provide two different authenitcations: password and key-pair. In the example, create a user with either password or public key and then grant the role to user. You can fine the public key in the UI of creating Snowflake pipelines.
If you already have a user, change fields and grant the role.

password authentication

```sql
CREATE USER MIXPANEL_EXPORT_USER PASSWORD='<password you provided>' DEFAULT_ROLE=MIXPANEL_EXPORT_ROLE;

ALTER USER MIXPANEL_EXPORT_USER SET PASSWORD='<password you provided>'
GRANT ROLE MIXPANEL_EXPORT_ROLE TO USER MIXPANEL_EXPORT_USER;
```

key-pair based authentication

```sql
CREATE USER MIXPANEL_EXPORT_USER RSA_PUBLIC_KEY='<mixpanle generated key>' DEFAULT_ROLE=MIXPANEL_EXPORT_ROLE;

ALTER USER MIXPANEL_EXPORT_USER SET RSA_PUBLIC_KEY='<mixpanle generated key>'
GRANT ROLE MIXPANEL_EXPORT_ROLE TO USER MIXPANEL_EXPORT_USER;
```

## Partitioning

The data in the raw tables is clustered based on `time` column but in project's timezone. To be exact, we use `CLUSTER BY (TO_DATE(CONVERT_TIMEZONE('UTC','<TIMEZONE>', TO_TIMESTAMP(DATA:time::NUMBER)))` where `TIMEZONE` is the Mixpanel project's timezone.

## Queries

A query is a request for data results. You can perform actions on the data, such as combine data from different tables; add, change, or delete table data; and perform calculations.

Snowflake supports a Object type that can store JSON objects and arrays. Mixpanel exposes array and object top-level properties as Object columns in the view.

Here is an example of how you can query the raw table when using one table for all the events. `DB_NAME` and `SCHEMA_NAME` should be replaced by your snowflake database and schema name.

```sql
SELECT count(*)
FROM <DB_NAME>.<DB_NAME>.MP_MASTER_EVENT_RAW
WHERE DATA:event_name::string = 'sign up';
```

Here is an example of how you can query the view when using one table for all the events:

```sql
SELECT count(*)
FROM <DB_NAME>.<DB_NAME>.MP_MASTER_EVENT
WHERE event_name = 'sign up';
```

### Getting the number of events in each day

You will need this if you suspect the export process is not exporting all the events you want. As time column in the tables is in UTC timezone, you first need to convert that to your Mixpanel project timezone, and then, get the number of events for each day. The following query will do that for you.

```sql
SELECT
  TO_DATE(CONVERT_TIMEZONE('UTC','<PROJECT_TIMEZONE>', time)) as ttime,
  count(*)
FROM <DB_NAME>.<DB_NAME>.MP_MASTER_EVENT
WHERE ttime>=TO_DATE('2021-12-03') AND ttime<=TO_DATE('2024-09-01')
GROUP BY ttime
ORDER BY ttime;
```

This example returns the number of events in each day in your project timezone. `PROJECT_TIMEZONE`, `DB_NAME` and `SCHEMA_NAME` should be replaced by your Mixpanel project timezone and your snowflake database and schema name.

### Querying the identity mapping table

When using the ID mappings table, you should use the **resolved** `distinct_id` in place of the non-resolved `distinct_id` whenever present. If there is no **resolved** `distinct_id`, you can then use the `distinct_id` from the existing people or events table.

Below is an example SQL query that references the ID mapping table to count number of events in a specific date range for each unique user in San Francisco

```sql
SELECT
  COALESCE(mappings.resolved_distinct_id, events.distinct_id) AS resolved_distinct_id,
  COUNT(*) AS count
FROM
  <DB_NAME>.<SCHEMA_NAME>.MP_MASTER_EVENT events
FULL OUTER JOIN
  <DB_NAME>.<SCHEMA_NAME>.MP_IDENTITY_MAPPINGS_DATA mappings
ON
  events.distinct_id = mappings.distinct_id
  AND events.properties:"$city"::STRING = 'San Francisco'
  AND TO_DATE(CONVERT_TIMEZONE('UTC','<PROJECT_TIMEZONE>', events.time)) >= TO_DATE('2020-04-01')
  AND TO_DATE(CONVERT_TIMEZONE('UTC','<PROJECT_TIMEZONE>', events.time)) <= TO_DATE('2024-09-01')
GROUP BY
  COALESCE(mappings.resolved_distinct_id, events.distinct_id)
LIMIT
  100;
```

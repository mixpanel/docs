# Json Pipelines

Json Pipeline is designed to export your Mixpanel data to supported data warehouses or object storage solutions. We maintain all properties in a high-level JSON format under the `properties` key for both events and user profile data.

This documentation is intended for users with intermediate or advanced knowledge of databases and familiarity with Amazon Web Services, Google Cloud Platform, or Snowflake technology.

## Create Json Pipelines

Before exporting data from Mixpanel to a destination, you must configure the destination to accept the data.

After configuring the destination, you can create a pipeline via the **Create Pipeline** button on the **Data Management** -> **Integrations** page in your project. Once the destination and pipeline are configured, you can begin querying Mixpanel data from your warehouse or storage bucket, allowing for SQL use within Google BigQuery, Snowflake, and Amazon Redshift Spectrum.

## Data Sources

Json pipelines support three different data sources: events, people, and identity.

## Export Frequency

Mixpanel supports hourly and daily exports, with daily being the default.

## Backfilling Historical Data

You can schedule an initial backfill when creating a pipeline to ensure that historical data is also exported to the destination.

Use the `from_date` parameter to specify the date from which you want to export historical data. Note that the `from_date` must be no more than 6 months in the past.

The completion time for a backfill depends on the number of days and the volume of data in the project. Larger backfills can take several weeks.

## People Data Support

User profiles are exported to a single table or directory named `mp_people_data`. Since user profiles are mutable, the data in the table is replaced with the latest user profiles each time an export occurs, based on the chosen schedule (daily or hourly).

## User Identity Resolution

Exports from projects with [ID merge enabled](/docs/tracking-methods/id-management/identifying-users#how-do-i-switch-between-the-simplified-and-original-api) will need to use the identity mapping table to replicate the user counts seen in UI reporting. Mixpanel resolves multiple identifiers for an individual into one identifier for reporting unique user counts. Learn more about how Mixpanel resolves IDs [here](/docs/tracking-methods/id-management/identifying-users#example-user-flows).

Pipelines export event data as they appear when Mixpanel ingests them. Data sent before an alias event carries the original user identifier, not the resolved one. Use the identity mappings table to accurately count unique users. This will allow you to recreate the identity cluster that Mixpanel creates.

Note: Use the `resolved_distinct_id` from the identity mappings table instead of the non-resolved `distinct_id` when available. If there is no resolved `distinct_id`, use the `distinct_id` from the existing people or events table.

Examples of querying the identity mapping table are available for [BigQuery](/docs/new-data-pipelines/integrations/bigquery#query-identity-mappings) and [Snowflake](/docs/new-data-pipelines/integrations/snowflake#query-identity-mappings).

## Data Sync

Event data stored in Mixpanel’s datastore and in the export destination can fall out of sync.

The discrepancy can be attributed to several different causes:

- Late data can arrive multiple days later due to a mobile client being offline.
- The import API can add data to previous days.
- Delete requests related to GDPR can cause deletion of events and event properties.

Mixpanel is able to detect any changes in your data with the granularity of a day and replaces the old data with the latest version both in object storage and data warehouse, if applicable.

Data sync helps keep the data fresh and minimizes missing data points.

Do Note: Data sync does not fully guarantee syncing GDPR Data Deletions. It is recommended to implement a strategy to remove all records of GDPR Deleted Users in your data warehouse. Additionally, we start checking for late arriving data 24 hours after the data for a day is exported. It may take more than 2 days for the data in the destination to be in sync with the data in Mixpanel.

## Output

We aggregate all events and user profiles properties under the `properties` key to facilitate easier querying of every row with conditions. Here are examples of the output in **BigQuery** for each data source pipeline. Note that different warehouses may have different corresponding types, but the names will be the same.

In addition to consolidating all event and user profiles properties under the `properties` key, we export several common properties across all records. This standardization facilitates simpler and more consistent querying conditions. Below are examples of the output structure in **BigQuery**

### Events

| name        | Type      | description                                                             |
| :---------- | :-------- | :---------------------------------------------------------------------- |
| device_id   | STRING    | Unique ID used to track a device while the user remains anonymous       |
| distinct_id | STRING    | Unique ID for the user who triggered the event                          |
| event_name  | STRING    | Name of the event                                                       |
| insert_id   | STRING    | Unique ID used to deduplicate events that are sent multiple times       |
| properties  | JSON      | JSON object containing all the properties associated with the event     |
| time        | TIMESTAMP | Timestamp marking when the event occurred                               |
| user_id     | STRING    | Unique ID used to track a user across different devices when identified |

### User Profiles

| name        | Type   | description                                |
| :---------- | :----- | :----------------------------------------- |
| distinct_id | STRING | Unique ID for the user                     |
| properties  | JSON   | JSON object containing all user properties |

### Identity Mappings

| name                 | Type   | description                                    |
| :------------------- | :----- | :--------------------------------------------- |
| distinct_id          | STRING | Unique ID for the user who triggered the event |
| resolved_distinct_id | STRING | Unique ID of the user after merging            |

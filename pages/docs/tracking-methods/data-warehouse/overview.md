# Overview

Mixpanel Warehouse Connectors allows you to natively import data from Snowflake, BigQuery or Redshift into Mixpanel. With this feature, you can set up recurring syncs from your data warehouse and ensure that Mixpanel is always in sync with your trusted data.

Example data you can bring into Mixpanel:

- **Application database tables**: Signups, Reports Created, Dashboards Created
- **Salesforce data**: Opportunity Created, Account Created, Account Upsell
- **Support data**: Ticket Created, Ticket Resolved
- **Billing/Consumption data:** Invoice paid, subscription renewed
- **Ad spend data:** Click-through rate, cost per click, Google Ads spend
- **Clickstream data from Snowplow:** Views, clicks, etc.
  

Navigate to Project Settings > Warehouse Sources to get started today.


## Supported Warehouses
The following data warehouses are currently supported with Mixpanel Warehouse Connectors. For more details on how to connect your warehouse, navigate below:
- [BigQuery](/docs/tracking-methods/data-warehouse/bigquery) 
- [Snowflake](/docs/tracking-methods/data-warehouse/snowflake)
- [Redshift](/docs/tracking-methods/data-warehouse/redshift)
- [Databricks](/docs/tracking-methods/data-warehouse/databricks)


## FAQ

### What are the connector event ingestion rate limits?
~30k events per second.

### What if a table doesn’t have an Insert Time field?
You can use event time or you can add an UpdatedAt timestamp to your table, which should be the time at which a row was modified. We’ll use this as a watermark to import new events for subsequent syncs.

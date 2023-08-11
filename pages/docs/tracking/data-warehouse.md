# Data Warehouse

Mixpanel Warehouse Connectors allows you to natively import data from Snowflake or BigQuery into Mixpanel. With this feature, you can set up recurring syncs from your data warehouse and ensure that Mixpanel is always in sync with your trusted data.

This native connection not only simplifies event implementation by eliminating the need for engineering resources to manually track events, but it also makes analyzing all types of company data in Mixpanel easier, providing a holistic view of your customers.

For example, you can bring into Mixpanel:

- **Appplication database tables**: Signups, Reports Created, Dashboards Created
- **Salesforce data**: Opportunity Created, Account Created, Account Upsell
- **Support data**: Ticket Created, Ticket Resolved
- **Billing/Consumption data:** Invoice paid, subscription renewed
- **Ad spend data:** Click-through rate, cost per click, Google Ads spend
- **Clickstream data from Snowplow:** Views, clicks, etc.

This lets you answer questions like:

- What is the % of sales opportunities that we win? What is the average deal size in North America?
- Which campaigns account for the most revenue? What is the breakdown of the ARR of customers that use this feature?
- What is our average time to resolve a ticket?

Navigate to Project Settings > Warehouse Sources to get started today.

## Supported Warehouses
For more information on how to get started with your warehouse, navigate below:
- [BigQuery](https://docs.mixpanel.com/docs/tracking/integrations/bigquery) 
- [Snowflake](https://docs.mixpanel.com/docs/tracking/integrations/snowflake)


## FAQ

### What are the connector event ingestion rate limits?
~30k events per second.

### What if a table doesn’t have an Insert Time field?
You can use event time or you can add an UpdatedAt timestamp to your table, which should be the time at which a row was modified. We’ll use this as a watermark to import new events for subsequent syncs.

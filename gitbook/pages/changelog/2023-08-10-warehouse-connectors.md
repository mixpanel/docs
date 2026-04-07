---
title: "Introducing Warehouse Connectors: Sync event data from Snowflake & BigQuery"
slug: "changelog-2023-08-10-warehouse-connectors"
hidden: false
createdAt: "2023-08-10T17:39:02.165Z"
updatedAt: "2023-08-10T17:39:02.165Z"
date: "2023-08-10"
---

[Link to Demo](https://www.loom.com/share/04f4ea75310744cdab477e1b47684db3?sid=ae77291d-d61a-4f91-9be0-887206896b18)

Today, all customers have access to Warehouse Connectors, which allows you to natively import data from Snowflake or BigQuery into Mixpanel. With this feature, you can set up recurring syncs from your data warehouse and ensure that Mixpanel is always in sync with your trusted data.

This native connection not only simplifies event implementation by eliminating the need for engineering resources to manually track events, but it also makes analyzing all types of company data in Mixpanel easier, providing a holistic view of your customers.

For example, you can bring into Mixpanel:

- **Application database tables**: Signups, Reports Created, Dashboards Created
- **Salesforce data**: Opportunity Created, Account Created, Account Upsell
- **Support data**: Ticket Created, Ticket Resolved
- **Billing/Consumption data:** Invoice paid, subscription renewed
- **Ad spend data:** Click-through rate, cost per click, Google Ads spend
- **Clickstream data from Snowplow:** Views, clicks, etc.

This lets you answer questions like:

- What is the % of sales opportunities do we win? What is the average deal size in North America?
- Which campaigns account for the most revenue? What is the breakdown of the ARR of customers that use this feature?
- What is our average time to resolve a ticket?

Navigate to Project Settings > Warehouse Sources to get started today. For more information, check out our docs on [Warehouse Connectors](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tracking-methods/warehouse-connectors).

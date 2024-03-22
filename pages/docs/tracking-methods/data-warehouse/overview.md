## Overview

Warehouse Connectors allow you to import tables from data warehouses (DWHs) into Mixpanel. This lets you use Mixpanel to analyze all the backend and business data in your DWH without writing any code to integrate. Warehouse Connectors supports Snowflake, BigQuery, Databricks, and Redshift.

Here are a few examples of tables you can load from your DWH to analyze in Mixpanel:

- **Backend**: Signups, Reports Created, Dashboards Created
- **CRM**: Opportunity Created, Account Created, Account Upsell
- **Support**: Ticket Created, Ticket Resolved
- **Billing:** Invoice paid, subscription renewed
- **Ad Spend:** Click-through rate, cost per click, Google Ads spend
- **Clickstream Logs:** Views, clicks, errors, etc.

## Getting Started

### Step 1: Connect a warehouse

Navigate to [Project Settings → Warehouse Sources](https://mixpanel.com/report/settings). Select your warehouse and follow the instructions to connect it. Note: you only need to do this once.

### Step 2: Load a warehouse table

Once you’ve established a warehouse connection, it’s time to load a table from that warehouse to Mixpanel. Navigate to [Project Settings → Warehouse Data](https://mixpanel.com/report/settings) and click +Event Table.

Select a table (or view) representing an event from your warehouse and tell Mixpanel about the table. Once satisfied with the preview, click run and we’ll establish the sync. The initial load may take a few minutes depending on the size of the table, we show you progress as it’s happening.

🎉 Congrats, you’ve loaded your first warehouse table into Mixpanel! From this point onward, the table will be kept in sync with Mixpanel. You can now use this event throughout Mixpanel’s interface.

### Warehouse-Specific Setup

Below are some instructions specific to each warehouse, along with a video that walks through the setup.

## Table Types

Mixpanel’s [Data Model](/docs/how-it-works/concepts) consists of 4 types: Events, User Profiles, Group Profiles, and Lookup Tables. Each have properties, which are arbitrary JSON. Warehouse Connectors lets you turn any table or view in your warehouse into one of these 4 types of tables, provided they match the required schema.

### Events

An event is something that happens at a point in time. It’s akin to a “fact” in dimensional modeling or a log in a database. Events have properties, which describe the event. Learn more about Events [here](/docs/data-structure/events-and-properties).

Here’s an example table that illustrates what can be loaded as events in Mixpanel. The most important fields are the timestamp (when) and the user id (who) — everything else is optional.

| Timestamp | User ID | Item | Brand | Amount | Type |
| --- | --- | --- | --- | --- | --- |
| 2024-01-04 11:12:00 | alice@example.com | shoes | nike | 99.23 | in-store |
| 2024-01-12 11:12:00 | bob@example.com | socks | adidas | 4.56 | online |

Here are more details about the schema we expect for events:

| Column | Required | Type | Description |
| --- | --- | --- | --- |
| Event Name | Yes | String | The name of the event. Eg: Purchase Completed or Support Ticket Filed. Note: you can specify this value statically, it doesn’t need to be a column in the table. |
| Time | Yes | Timestamp | The time at which the event occurred. |
| User ID | No | String or Integer | The unique identifier of the user who performed the event. Eg: 12345 or grace@example.com. |
| Device ID | No | String or Integer | An identifier for anonymous users, useful for tracking pre-login data. Learn more [here] |
| JSON Properties | No | JSON or Variant | A field that contains key-value properties in JSON format. If provided, Mixpanel will flatten this field out into properties. |
| All other columns | No | Any | These can be anything. Mixpanel will auto-detect these columns and attach them to the event as properties. |

### User Profiles

A User Profile is a table that describes your users. It’s akin to a “dimension” in dimensional modeling or a relational table in a database. Learn more about User Profiles [here](/docs/data-structure/user-profiles).

Here’s an example table that illustrates what can be loaded as user profiles in Mixpanel. The only important column is the User ID, which is the primary key of the table.

| User ID | Email | Name | Subscription Tier |
| --- | --- | --- | --- |
| 12345 | grace@example.com | Grace Hopper | Pro |
| 45678 | bob@example.com | Bob Noyce | Free |

🆕 Profile History is in beta. While Profiles typically only store the state of a user *as of now*, Profile History enables storing the state of a user *over time*. When creating a User Profile sync, set the Table Type to “History Table” — this will require you to supply a Start Time column in the sync configuration. Request beta access [here](https://forms.gle/x8mbU6FVe5uHiVXF6).

### Group Profiles

A Group Profile is a table that describes an entity (most often an Account, if you’re a B2B company). They are functionally identical to User Profiles, just used for other non-User entities. Group Profiles are only available if you have the Group Analytics add-on. Learn more about Group Analytics [here](/docs/data-structure/advanced/group-analytics).

Here’s an example table that illustrates what can be loaded as group profiles in Mixpanel. The only important column is the Group Key, which is the primary key of the table.

| Group Key | Name | Domain | ARR | Subscription Tier |
| --- | --- | --- | --- | --- |
| 12345 | Notion | notion.so | 45000 | Enterprise |
| 45678 | Linear | linear.so | 2000 | Pro |

### Lookup Tables

A Lookup Table is a table that describes an entity. It’s useful for enriching events with metadata about other concepts in your product, like content or skus. Learn more about Lookup Tables [here](https://docs.mixpanel.com/docs/data-structure/lookup-tables).

Here’s an example table that illustrates what can be loaded as group profiles in Mixpanel. The only important column is the ID, which is the primary key of the table.

| ID | Song Name | Artist | Genre |
| --- | --- | --- | --- |
| 12345 | One Dance | Drake | Pop |
| 45678 | Voyager | Daft Punk | Electronic |

## Sync Types

Warehouse Connectors continuously detect new data from your warehouse tables to load into Mixpanel. The Sync Type determines the method of detecting new rows:

- **Time-Based**: This mode requires there to be an Insert Time column in your table. Mixpanel remembers the maximum Insert Time it saw in the previous run of the sync and looks for only rows that have an Insert Time greater than that. This is useful and efficient for append-only tables (usually events) that have a column indicating when the data was appended.
- **Full Sync:** This mode takes a snapshot of the source table and syncs it entirely to Mixpanel periodically. It has upsert semantics in Mixpanel — that is, if a row has new properties in your warehouse, the corresponding profile in Mixpanel will be overridden with those new properties. This mode is only available for non-event tables.
- **Mirror:** This mode leverages warehouse CDC capabilities to mirror insert, updates, and deletes from your warehouse to Mixpanel. It provides the efficiency of time-based syncs with the simplicity of full syncs and works for all table types.
    - Mirror is in beta for Snowflake, with support for other warehouses coming soon. Request access [here](https://forms.gle/x8mbU6FVe5uHiVXF6).

## FAQ

### **How fast do syncs run?**

Syncs have a throughput of ~30K events/second or ~100M events/hour.

### **I already track data to Mixpanel via SDK or CDP, can I still use Warehouse Connectors?**

Yes! You can send some events (eg: web and app data) directly via our SDKs and send other data (eg: user profiles from CRM or logs from your backend) from your warehouse and analyze them together in Mixpanel. There are no downsides to this approach.

### How much does Warehouse Connectors cost?

There is no additional cost specifically for using Warehouse Connectors. The events generated by Warehouse Connectors are billed identically to all other events you track to Mixpanel. Learn more about Mixpanel’s event-based billing [here](link to billing docs).

### Will this increase my DWH bill?

Very little. We’ve designed Warehouse Connectors to make highly efficient queries to extract new data from your warehouse. In general, the continuous cost savings of using Mixpanel to analyze the data will dwarf the cost of extracting data by 10-100x.

### How can I get help setting up a warehouse sync?

[Reach out](https://mixpanel.com/contact-us/sales/) to our team — we’re happy to walk you through the set up. If you bring a data engineer who has credentials to access your warehouse, it takes < 10 minutes to get up and running.

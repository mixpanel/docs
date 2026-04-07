# Sync with Mirror

When your warehouse is the source of truth, you need Mixpanel to stay in sync with it — not just ingest a snapshot and drift. [Mirror sync mode](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/warehouse-connectors#mirror) does that by tracking every change in your warehouse (new rows, updates, and deletions) and reflecting them in Mixpanel automatically. The result is a Mixpanel project that always matches your warehouse, without manual reconciliation.

Getting there takes more than pointing a connector at a table. How you model your data, which sync mode you choose, and how you map identifiers all determine whether your analytics hold up under real-world conditions.

## Before You Start

Mirror is one of several sync modes in [Warehouse Connectors](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/warehouse-connectors). It uses Change Data Capture (CDC) to detect and replicate changes, which means every row update or deletion in your source counts as a billable event in Mixpanel. That makes data modeling decisions consequential — not just for accuracy, but for cost.

You'll need:

* Access to a [supported warehouse](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/warehouse-connectors#step-1-connect-a-warehouse), such as Snowflake, BigQuery, Databricks, or Redshift
* Read-only credentials (SELECT access) scoped to the tables you intend to sync
* A clear picture of what each warehouse table represents — event log, current profile state, or historical state changes

## Phase 1: Choose the Right Sync Mode for Each Table

Not every table belongs on Mirror. The sync mode you choose determines how Mixpanel processes incoming data and what it costs. Use the table below to match each source table to the right mode based on **how that data changes over time** — whether it's ever corrected, deleted, or only appended to.

| Sync Mode | What it does                                      | Best for                                           |
| --------- | ------------------------------------------------- | -------------------------------------------------- |
| Mirror    | Reflects new rows, updates, and deletions via CDC | Transactional events, profile history (SCD Type 2) |
| Append    | Loads new rows only; ignores changes and deletes  | Immutable event logs (e.g. raw page views)         |
| Full Sync | Overwrites with a fresh snapshot each run         | Lookup tables, current-state profiles              |
| One-Time  | Single load, no recurring updates                 | Historical backfills from a static source          |

Mirror is the right choice when your source data changes after the fact — refunds, subscription updates, compliance deletions. For high-volume event data that will never be corrected, Append is more efficient and cheaper.

{% hint style="info" %}
**Pro tip**: Start your connector configuration in a staging project. This lets you validate permissions, test sync behavior, and catch mapping issues before they affect production data or existing reports.
{% endhint %}

## Phase 2: Model Your Event Tables for Mirror

Mirror works by detecting row-level changes, so your event tables need to be structured to support both initial ingestion and downstream updates.

### Naming conventions

Use `snake_case` for event and property names (e.g. `purchase_completed`). Follow an object-action pattern — `order_shipped`, `user_signed_up` — so event names are self-explanatory across teams and in downstream exports.

There's a soft limit of 5,000 distinct event names in Mixpanel. Exceeding it makes data discovery and autocomplete harder to work with.

### Core column mapping

| Mixpanel field    | Required | Type              | Notes                                        |
| ----------------- | -------- | ----------------- | -------------------------------------------- |
| Event Name        | Yes      | String            | The action performed                         |
| Time              | Yes      | Timestamp         | When the event occurred                      |
| User ID           | No\*     | String or Integer | Maps to `distinct_id` for identified users   |
| Device ID         | No\*     | String or Integer | Maps to `distinct_id` for anonymous tracking |
| JSON Properties   | No       | JSON or Object    | Flattened automatically by Mixpanel          |
| Group Key(s)      | No       | String or Integer | Required for group-level analysis            |
| All other columns | No       | Any               | Auto-detected as event properties            |

\* _User ID or Device ID is technically optional in connector setup, but without one, events can't be linked to a user profile or attributed to a consistent identity._

Each event supports a maximum of 255 properties. Property names longer than 255 characters are truncated. For [data type](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/data-structure/property-reference/data-type) details and a full list of [events and properties limits](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/data-structure/events-and-properties#what-are-the-limits-of-events-and-properties), refer to the Mixpanel docs.

{% hint style="warning" %}
**Pitfall**: Adding a new column to a source table triggers a full resync of every row in that table. For large datasets, that's a significant spike in billable event volume. Plan schema changes intentionally and time them to avoid unexpected cost.
{% endhint %}

## Phase 3: Set Up Profiles and Profile History

[User Profiles](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/data-structure/user-profiles) and [Group Profiles](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/data-structure/group-analytics#group-profiles) capture the current state of a person or group. They're mutable by design — you can update them any time, and they join retroactively with all past events sharing the same identifier. That means you don't need to track events and profiles in lockstep; Mixpanel applies the current state at query time.

For most current-state profile tables, Full Sync is the right mode. Use Mirror when you need to track how profile properties changed over time.

### Modeling Profile History (SCD Type 2)

[Profile History](https://mixpanel.com/blog/slowly-changing-dimension-tables-in-product-analytics/) lets you analyze how attributes like subscription status or MRR evolved, and associate each event with the user's state at the moment it occurred — not their current state. This is critical for accurate revenue reporting and churn analysis.

Your source table needs to follow SCD Type 2 structure: each state change is a new row, not an overwrite. Mixpanel infers the end time of each record from the start time of the next one.

**Required columns:**

| Mixpanel field            | Required | Type                      | Notes                                            |
| ------------------------- | -------- | ------------------------- | ------------------------------------------------ |
| Distinct ID or Group ID   | Yes      | String or Integer         | Unique user or group identifier                  |
| Start Time                | Yes      | Timestamp or Date         | When this version of the attribute became active |
| At least one other column | Yes      | Any (no Lists or Objects) | The attribute(s) whose history you're tracking   |

{% hint style="warning" %}
**Pitfall**: Profile History columns don't support List/Array or Object (JSON) types. Flatten those fields in your warehouse before syncing, or they won't ingest correctly.
{% endhint %}

{% hint style="info" %}
**Pro tip**: When modeling churn, you need to explicitly sync a row where `subscription_status` is `inactive` or `mrr_value` is `0`. Mixpanel assumes a user stays in their last known state until a new row arrives — so without that explicit record, historical reports will overstate active users and revenue.
{% endhint %}

Only track properties that change at a manageable frequency and matter for analysis. Tracking high-velocity fields like `last_active_at` in a history table creates row volume that can hurt query performance and inflate costs. Focus on core business drivers: `status`, `tier`, `plan`, `geography`.

## Phase 4: Map Identities Consistently

The [`distinct_id`](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/id-management) is the primary join key in Mixpanel. It connects events to user profiles and drives all core analyses — Funnels, Retention, and unique user counts.

In a warehouse-native setup, you define this mapping. The column you map to `distinct_id` in your Events table must contain the exact same values as the primary key in your User Profiles table. If they don't match, events and profiles won't join, and your analyses will fragment.

For group-level analysis using [Group Analytics](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/data-structure/group-analytics), the Group Key (e.g. `account_id`) plays the same role — make sure it's consistent across event and group profile tables.

{% hint style="info" %}
**Pro tip**: Unlike client-side SDK tracking, Mirror doesn't handle ID bridging automatically. [Validate your identity mapping](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/id-management) before your first sync, not after. A mismatch across millions of rows is expensive to fix.
{% endhint %}

## Phase 5: Configure Sync Frequency and Monitor Health

Sync frequency is a tradeoff between data freshness and warehouse compute cost. Options are Manual (Sync Now), Daily, or Hourly (on select plans).

For slower-changing data like profiles, daily is usually sufficient. For transactional events where corrections happen quickly, hourly or API-triggered syncs give you tighter parity.

If your data pipeline runs on a schedule, the Advanced Sync API lets you trigger a sync programmatically after a transformation job completes — so Mixpanel always reflects your most recent warehouse run.

Once live, monitor regularly:

* **Sync status**: Check for failures, delays, or mapping errors. Sync success is your primary signal for data parity.
* **Event volume alerts**: Set automated alerts in [Data Volume Monitoring](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/data-governance/data-volume-monitoring) to catch unexpected spikes. These often signal an upstream warehouse issue or an unplanned schema change triggering a resync.

## Key Takeaways

* Mirror uses CDC to reflect every warehouse change — new rows, updates, and deletions — but every change counts as a billable event, so modeling decisions directly affect cost.
* Match sync mode to how your data changes: Mirror for transactional events and profile history, Full Sync for current-state profiles and lookup tables, Append for immutable high-volume logs.
* Profile History (SCD Type 2) enables as-of analysis — associating each event with the user's state at the moment it occurred — but requires flat column structures and explicit churn rows to work correctly.
* `distinct_id` must match exactly between your event and profile tables; mismatches fragment the user view and can't be easily fixed after the fact.
* Schema changes to source tables trigger full resyncs. Plan them intentionally.
* Daily sync frequency is sufficient for most profile data; use hourly or API-triggered syncs for transactional data where corrections are time-sensitive.

👉 **Next step**: For guidance on naming conventions, metadata, and access controls once your sync is live, see [Govern Your Mixpanel Data for Long-Term Success](../guides-by-topic/govern-data.md).

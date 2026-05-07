# Standard Group Analytics

> **Looking for Hierarchical Groups?** If your product has a B2B company → user relationship, see [Hierarchical Groups](/docs/data-structure/group-analytics/hierarchical-groups) instead.

Standard Group Analytics lets you establish event properties other than `distinct_id` as identifiers by which to analyze your data. By defining **group keys** — such as `company_id`, `account_id`, `project_id`, or `billing_id` — you can count uniques, build funnels, and measure retention at the group level rather than (or alongside) the individual user level.

## Overview

By default, Mixpanel counts unique users by `distinct_id`. Group Analytics lets you count uniques by an alternative identifier — one shared by a set of individuals with different `distinct_id` values. For example, if five users share the same `company_id`, a "unique companies" count for an event those five users all performed would return 1, not 5.

Each group key you define is **independent**. Mixpanel does not assume any relationship between group keys or between groups and users. You can define up to 5 group keys per project, and events can carry values for multiple group keys simultaneously.

### Group Profiles

Just as User Profiles store metadata about individual users, **Group Profiles** store metadata about groups. A group profile is identified by a `group_key` and `group_id` pair — for example, the group key `company` with the group ID `acme_corp`. Group profile properties (like company name, plan tier, or industry) can be used as filters and breakdowns in reports.

### Company Analytics (B2B Key)

Company Analytics is a feature within Standard Group Analytics tailored for B2B SaaS. It introduces the concept of a **B2B Company Key** — a designated group key that represents "company" in your data model. With a B2B Company Key, you get access to the **"Number of users who did…"** computed property, which lets you segment companies by the count and quality of their active users. For example: "How many trial accounts have more than two users who completed onboarding?"

> **Note:** Company Analytics and Hierarchical Groups solve similar B2B problems but work very differently. Company Analytics sits on top of Standard Group Analytics and does not enforce a company → user identity relationship. Hierarchical Groups does. See the [comparison table](/docs/data-structure/group-analytics#choosing-between-the-two) for help deciding.

## Data Model

### Events

For an event to be attributed to a group, the event must include the **group key as an event property** with the group ID as its value. Without the group key property on the event, Mixpanel cannot attribute that event to a group.

```json
{
  "event": "Purchase",
  "properties": {
    "distinct_id": "user_123",
    "time": 1690000000,
    "company_id": "acme_corp",
    "team_id": "engineering",
    "amount": 99.99
  }
}
```

In this example, if `company_id` and `team_id` are both registered as group keys, this event will be attributed to the `acme_corp` company group and the `engineering` team group.

### Group Profiles

Group profiles are key-value stores of metadata about a specific group. They are identified by the combination of `group_key` and `group_id`.

```json
{
  "$group_key": "company_id",
  "$group_id": "acme_corp",
  "$set": {
    "$name": "Acme Corporation",
    "plan": "enterprise",
    "industry": "Technology",
    "employee_count": 500
  }
}
```

### Identity

Standard Group Analytics does **not** change how `distinct_id` or user identity works. Users are still identified by `distinct_id` as normal. Group keys provide an additional, independent axis for counting uniques — they do not replace or modify user identity.

## Implementation

### Step 1: Define Group Keys in Project Settings

Before sending group data, register your group keys in **Project Settings → Group Keys**. You can register up to 5 group keys per project. Each group key corresponds to an event property name (e.g., `company_id`).

### Step 2: Send Events with Group Key Properties

Ensure that every event you want attributed to a group includes the group key as an event property. You can do this in two ways:

**Option A: Set the group on the user (SDK)**

Calling `set_group()` registers the group key as a super property on the user, so it is automatically attached to all subsequent events.

**JavaScript:**
```javascript
// Register the current user to the "acme_corp" company group.
// All future events from this user will include company_id = "acme_corp".
mixpanel.set_group("company_id", "acme_corp");
```

**Python:**
```python
# No SDK-level super property for server-side.
# Include the group key directly in event properties (see Option B).
```

**Option B: Include the group key directly on events**

For server-side tracking or when you want selective attribution, include the group key property on individual events.

```json
{
  "event": "Invoice Paid",
  "properties": {
    "distinct_id": "user_456",
    "time": 1690000000,
    "company_id": "acme_corp",
    "amount": 2500
  }
}
```

### Step 3: Create Group Profiles

Group profiles are optional but recommended — they let you filter and break down reports by group-level metadata (e.g., company plan, industry).

**JavaScript:**
```javascript
// Set properties on the "acme_corp" company group profile
mixpanel.get_group("company_id", "acme_corp").set({
  "$name": "Acme Corporation",
  "plan": "enterprise",
  "industry": "Technology"
});
```

**Python:**
```python
from mixpanel import Mixpanel

mp = Mixpanel("YOUR_PROJECT_TOKEN")

mp.group_set("company_id", "acme_corp", {
    "$name": "Acme Corporation",
    "plan": "enterprise",
    "industry": "Technology"
})
```

**HTTP API:**
```bash
curl https://api.mixpanel.com/groups \
  --header 'Content-Type: application/json' \
  --data '[
    {
      "$token": "YOUR_PROJECT_TOKEN",
      "$group_key": "company_id",
      "$group_id": "acme_corp",
      "$set": {
        "$name": "Acme Corporation",
        "plan": "enterprise"
      }
    }
  ]'
```

### Step 4: Set Up a B2B Company Key (optional)

If one of your group keys represents "company" and you want access to the **"Number of users who did…"** computed property, designate that group key as your B2B Company Key in **Project Settings → Group Keys**.

### Warehouse Connector Implementation

When importing data through a Warehouse Connector:

**Events:** Map your group key columns in the "Map Columns" step. Ensure the column names match the group keys registered in Project Settings.

**Group Profiles:** Select "Group Table" as the source type. Set the "Group Key" to the group key you want to populate (e.g., `company_id`), and set the "Group ID" to the column that contains the unique identifier for each group.

## Analysis

Once group keys are configured and events are flowing with group key properties:

- In **Insights**, **Funnels**, **Retention**, and **Flows**, use the metric selector to switch from counting by "Unique Users" to counting by your group (e.g., "Unique Companies").
- You can mix metrics in a single Insights report — for example, one metric counting unique users and another counting unique companies.
- **Group profile properties** are available as filters and breakdowns when analyzing by the corresponding group.
- **User profile properties** are available when analyzing by users, but **not** when analyzing by groups.

## FAQ

**Does Mixpanel backfill historical events to groups?**
No. Mixpanel attributes events to groups only from the date the group key was registered in Project Settings. Historical events that contain the group key as a property but were sent before the group key was configured will not be retroactively attributed.

**Can I use group profile properties when analyzing by users?**
Yes. Group properties are available as filters and breakdowns when analyzing by users. The reverse is not true — user properties are not available when analyzing by groups.

**How do I export group profiles?**
Use the Engage API endpoint with the `data_group_id` parameter.

**What's the difference between Group Analytics and Lookup Tables?**
Both augment events with metadata, but Group Analytics also **indexes** your events by the group key. This means you can do funnels, retention, and unique counts by the group key. Lookup Tables only support filtering and breakdowns — they do not support unique counting or sequential analysis by the join key.

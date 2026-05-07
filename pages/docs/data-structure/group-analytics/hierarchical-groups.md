# Hierarchical Groups

> **Looking for Standard Group Analytics?** If you need flexible, independent group keys without an enforced hierarchy, see [Standard Group Analytics](/docs/data-structure/group-analytics/standard-group-analytics) instead.

Hierarchical Groups is a purpose-built data model for B2B products where **users belong to companies**. Mixpanel enforces a two-level hierarchy — Company (top level) and User (bottom level) — using the reserved properties `$company_id` and `$user_id`. This structure gives you native account-level analytics: count unique companies, measure per-account activation, and understand which accounts are healthy based on the behavior of their users.

## Overview

### The Hierarchy

Hierarchical Groups uses a two-level structure:

- **Company level** (top): Identified by `$company_id`. Represents an account, organization, workspace, or any top-level entity.
- **User level** (bottom): Identified by `$user_id`. Represents an individual user within a company.

The relationship is **many-to-one**: each user belongs to exactly one company, but a company can have many users.

### Composite Identity

In a Hierarchical Groups project, Mixpanel constructs the `$distinct_id` from the composite key:

```
$distinct_id = $company:<company_id>|$user:<user_id>
```

This has a critical implication: **`$user_id` is not globally unique.** A user with `$user_id: alice` in `$company_id: acme` is a completely different user from `$user_id: alice` in `$company_id: globex`. They will have separate profiles and their events will be counted independently.

### How Analysis Works

When you analyze by **Company**, Mixpanel implicitly filters to events where `$company_id` is set and counts uniques by `$company_id`. When you analyze by **User**, it counts uniques by the composite `$distinct_id`. Additional group keys you define (beyond `$company_id` and `$user_id`) also implicitly filter by `$company_id` when used in analysis.

The **"Number of users who did…"** computed property is available for Company-level analysis, letting you segment companies by the count and quality of their active users.

## Prerequisites

Before enabling Hierarchical Groups, make sure you meet these requirements:

**You must have a stable `$company_id` value.** Every event and every profile requires a `$company_id`. If you don't yet know what value to use for this property, do not enable Hierarchical Groups — you cannot use a placeholder or null value and fix it later (see [Constraints](#constraints) below).

**You must use ID Management V3.** Hierarchical Groups is not supported on projects using ID Management V2.

**This is a project-creation-time decision.** You cannot convert an existing standard project to Hierarchical Groups, and you cannot remove Hierarchical Groups from a project once enabled. Choose your model before sending any data.

## Constraints

Understanding these constraints upfront will save you from data quality problems down the road.

**No null or placeholder `$company_id` values.** If you send events with `$company_id` set to null (or omit it entirely), the `$distinct_id` for that event will not include a company prefix. For example, an event with only `$user_id: alice` and no `$company_id` will get `$distinct_id = alice` rather than `$company:acme|$user:alice`. If you later send events for the same user *with* a `$company_id`, Mixpanel treats them as two different users — resulting in split profiles and inaccurate counts. There is no way to merge these after the fact.

**`$company_id` and `$user_id` must be different values.** If you map the same column to both `$company_id` and `$user_id` (or they happen to share the same value), the generated `$distinct_id` will be malformed. This causes events and profile properties to be tied to incorrect users. Always use distinct columns or values for each level of the hierarchy.

**`$user_id` is required on events.** In standard Warehouse Connector imports, `User ID` mapping is optional. In Hierarchical Groups projects, it is **required**. Events without a `$user_id` will still be ingested, but they will only be attributable at the Company level — they will not appear in User-level analysis.

**No migration path.** You cannot start with a standard Mixpanel project and later migrate to Hierarchical Groups. If you are unsure whether you need the hierarchy, it is better to start with a standard project and migrate to a *new* Hierarchical project later (which requires re-importing your data with correct `$company_id` values on every event).

## Implementation: Events

### Import API

When sending events via the Import API, include `$company_id` and `$user_id` as event properties. The `distinct_id` property should also be present but Mixpanel will override it with the composite identity.

```bash
curl --request POST \
  --url 'https://api.mixpanel.com/import?strict=1&project_id=YOUR_PROJECT_ID' \
  --header 'Content-Type: application/json' \
  --header 'accept: application/json' \
  --header 'authorization: Basic YOUR_API_SECRET_BASE64' \
  --data '[
    {
      "event": "Feature Used",
      "properties": {
        "time": 1690000000,
        "$insert_id": "unique_event_id",
        "$company_id": "acme_corp",
        "$user_id": "alice",
        "distinct_id": "placeholder",
        "feature_name": "dashboard"
      }
    }
  ]'
```

After ingestion, this event will have:
- `$company_id`: `acme_corp`
- `$user_id`: `alice`
- `$distinct_id`: `$company:acme_corp|$user:alice`

### Warehouse Connector

When creating a Warehouse Connector for events:

1. Create a new WHC as you normally would, but stop at the **Map Columns** step.
2. Map the column containing your top-level identifier to **Company ID**.
3. Map the column containing your user-level identifier to **User ID**. This mapping is **required** for Hierarchical Groups projects (it is optional in standard projects).
4. Complete the sync.

After the sync runs, verify that your events carry all three properties: `$company_id`, `$user_id`, and the auto-generated `$distinct_id` in the format `$company:<company_id>|$user:<user_id>`.

## Implementation: Company Profiles

Company profiles store metadata about companies (account name, plan tier, industry, ARR, etc.). They appear in the **Users** tab under the **Company** section.

### Warehouse Connector

1. Create a new Warehouse Connector and select **Group Table** as the source type.
2. At the **Map Columns** step:
   - Set **Group Key** to `$company_id`.
   - Set **Group ID** to the column containing your company identifier.
   - Set **Company ID** to the **same column** as Group ID — this ensures the profile is correctly associated with the hierarchy.
3. Map any additional columns to company profile properties.
4. Create the sync.

After import, company profiles will have a Distinct ID in the format `$company:<company_id>`.

### Groups API

To create or update company profiles via the HTTP API, use the `/groups` endpoint. You **must** include `$company_id` at the outer level of the payload (outside of `$set`):

```bash
curl --request POST \
  --url 'https://api.mixpanel.com/groups?strict=1' \
  --header 'Content-Type: application/json' \
  --data '[
    {
      "$token": "YOUR_PROJECT_TOKEN",
      "$group_key": "$company_id",
      "$group_id": "acme_corp",
      "$company_id": "acme_corp",
      "$set": {
        "$name": "Acme Corporation",
        "plan": "enterprise",
        "industry": "Technology",
        "arr": 120000
      }
    }
  ]'
```

> **Important:** The `$group_id` value should be the bare company ID (e.g., `acme_corp`), not the prefixed form (`$company:acme_corp`). Using the prefixed form will cause the request to fail silently or produce stuck items.

## Implementation: User Profiles

User profiles store metadata about individual users within companies (role, signup date, last active, etc.). They appear in the **Users** tab under the **User** section.

### Warehouse Connector

> **Important:** User profiles in Hierarchical Groups projects use the **Group Table** source type, not "User Table." Using "User Table" will produce incorrect results.

1. Create a new Warehouse Connector and select **Group Table** as the source type.
2. At the **Map Columns** step:
   - Set **Group Key** to `$user_id`.
   - Set **Group ID** to the column containing your user-level identifier.
   - Set **Company ID** to the column containing your company-level identifier (the same value used in your events and company profiles).
3. Map any additional columns to user profile properties.
4. Create the sync.

### Groups API

To create or update user profiles via the HTTP API:

```bash
curl --request POST \
  --url 'https://api.mixpanel.com/groups?strict=1' \
  --header 'Content-Type: application/json' \
  --data '[
    {
      "$token": "YOUR_PROJECT_TOKEN",
      "$group_key": "$user_id",
      "$group_id": "alice",
      "$company_id": "acme_corp",
      "$set": {
        "$name": "Alice Smith",
        "role": "admin",
        "signup_date": "2024-01-15"
      }
    }
  ]'
```

As with company profiles, use the bare `$group_id` value (e.g., `alice`), not the composite form.

## Implementation: Additional Group Keys

You can define additional group keys beyond `$company_id` and `$user_id` (e.g., `team_id`, `workspace_id`). These function similarly to standard group keys but inherit the hierarchical context — when used in analysis, they implicitly filter to events where `$company_id` is set.

To create profiles for additional group keys via the API, include `$company_id` at the outer level:

```bash
curl --request POST \
  --url 'https://api.mixpanel.com/groups?strict=1' \
  --header 'Content-Type: application/json' \
  --data '[
    {
      "$token": "YOUR_PROJECT_TOKEN",
      "$group_key": "team_id",
      "$group_id": "engineering",
      "$company_id": "acme_corp",
      "$set": {
        "$name": "Engineering Team",
        "headcount": 25
      }
    }
  ]'
```

## FAQ

**Can I start with a standard project and switch to Hierarchical Groups later?**
No. Hierarchical Groups must be enabled at project creation. If you later decide you need it, you would create a new project with Hierarchical Groups enabled and re-import your data with correct `$company_id` values on every historical event.

**What happens if I send events without `$company_id`?**
The event will still be ingested, but the `$distinct_id` will not include the company prefix. The event will not appear in Company-level analysis. If you later send events for the same `$user_id` with a `$company_id`, Mixpanel will treat them as different users, resulting in split profiles.

**What happens if `$company_id` and `$user_id` have the same value?**
The `$distinct_id` will be `$company:<value>|$user:<value>`, which is technically valid but can cause confusion. More critically, if you map the same source column to both Company ID and User ID in a Warehouse Connector, it can cause SCD events and profile properties to be tied to incorrect users. Always use distinct values.

**Can a user belong to multiple companies?**
No. The model enforces a many-to-one relationship: each user belongs to exactly one company. If you have users who genuinely operate across multiple companies, they will appear as separate users in Mixpanel (one per company).

**Is the same `$user_id` in two different companies treated as two different users?**
Yes. User identity is the composite key (`$company_id`, `$user_id`). An event with `$company_id: acme` and `$user_id: alice` is a completely different user from `$company_id: globex` and `$user_id: alice`. They will have separate profiles and separate event histories.

**Why do my user profiles not appear after a Warehouse Connector sync?**
The most common causes are:
1. You used a "User Table" source type instead of "Group Table." User profiles in Hierarchical Groups must use the Group Table type.
2. You mapped the same column to both Group ID and Company ID. The Group ID should be the user-level identifier; the Company ID should be the company-level identifier.
3. The `$user_id` and `$company_id` values in the profile sync don't match the values on your events, so they're creating profiles that don't correspond to any event data.

**Can I use the `/engage` endpoint for user profiles?**
For Hierarchical Groups projects, use the `/groups` endpoint for both company and user profiles. The behavior of `/engage` in Hierarchical Groups projects may produce unexpected results — use `/groups` with the appropriate `$group_key` instead.

**Does Hierarchical Groups work with ID Management V2?**
No. Hierarchical Groups requires ID Management V3. If your project uses V2, it is not compatible.

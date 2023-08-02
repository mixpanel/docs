# Data Model

## Overview

Mixpanel data is stored and isolated within a [project](/docs/admin/organizations-projects/manage-projects). At this time, you cannot query data across multiple projects. Mixpanel supports a few different categories of data that can be used for analysis: events, user profiles, group profiles, and lookup tables. In data warehouse parlance, events make up the fact table while user profiles, group profiles, and lookup tables are dimension tables.

![Data Model Overview](/Data%20Model%20Overview.png)

| Types | Description |
|----------|-------------------|
| **Events** | Events describe actions that take place within your product. An event contains properties that describe the action. Events can also be joined with user profiles, group profiles, and lookup tables to enrich the data. <br><br> [Learn more about event properties](/docs/tracking/how-tos/events-and-properties) |
| **User Profiles** | A user profile is a key/value store that holds state about a user. User profiles are joined to events on `event.distinct_id = user_profile.distinct_id` <br><br> [Learn more about profile properties](/docs/tracking/how-tos/events-and-properties) |
| **Group Profiles** | A group profile is a key/value store that holds state about member of your group. Group profiles are joined to Events on your chosen _group key_. For example, if you create a new group key for `company_id` your events will be joined on `event.company_id = group_profile.company_id` <br><br> [Learn more about profile properties](/docs/tracking/how-tos/events-and-properties) <br> [Learn more about group analytics](/docs/analysis/advanced/group-analytics) |
| **Lookup Tables** | A lookup table is a key/value store that holds state about an entity. Lookup tables are joined to events (and other profiles) on your chosen join key. For example, if you create a lookup table for "Songs" and specify the join key as `song_id`, your events will be joined on `event.song_id = lookup_table.song_id`.<br><br>[Learn more about lookup tables](/docs/tracking/how-tos/lookup-tables) |


## User Profiles, Group Profiles & Lookup Tables
All three are key/value stores that augment your event data with additional metadata about entities. The differences are whether the join key is customizable and whether events are copied and indexed by the join key.

**[User profiles](/docs/tracking/how-tos/user-profiles)** are joined to events via `distinct_id` which is the default indexing for Events. 

**[Group profiles](/docs/analysis/advanced/group-analytics)** are joined to events via an event property you specify as a group key. Once you create a new group key, we will add an additional index for your events on that property. This allows you to do funnels or retention by that property instead of by `distinct_id`.

**[Lookup tables](/docs/tracking/how-tos/lookup-tables)** are joined to events and user profiles using the join key that you specify. Unlike group profiles, your events are *not* indexed by the join key. You can use lookup table properties to do filtering, breakdowns, etc but you can't do things like funnels analysis using the join key for uniques. Note: Currently, group profile properties cannot be lookup table keys.

| Profile Type | Can Specify Join Key | Can Use Join Key For Uniques Analysis | Can Be Referenced From Other Profiles |
|---|---|---|---|
| User Profiles | ❌ |  ✅  | ❌ |
| Group Profiles |  ✅  |  ✅  | ❌ |
| Lookup Tables |  ✅  | ❌ |  ✅  |


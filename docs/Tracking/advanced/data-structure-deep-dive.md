---
title: "Data Structure Deep Dive"
slug: "data-structure-deep-dive"
hidden: false
metadata: 
  title: "Data Structure Deep Dive | Mixpanel Documentation"
  description: "Data is stored and isolated within a project. Our documentation provides a deep dive into data structure including breaking down the different types."
createdAt: "2021-05-05T18:33:02.642Z"
updatedAt: "2021-10-22T22:44:52.797Z"
---
# Overview

Mixpanel data is stored and isolated within a [project](https://help.mixpanel.com/hc/en-us/articles/360000857366-Guide-to-Mixpanel-Basics#your-account). At this time, you cannot query data across multiple projects. Mixpanel supports a few different categories of data that can be used for analysis: events, user profiles, group profiles, and lookup tables. In data warehouse parlance, events make up the fact table while user profiles, group profiles, and lookup tables are dimension tables.

![Data Model Overview](https://storage.googleapis.com/cdn-mxpnl-com/static/readme/Data%20Model%20Overview.png)

| Types | Description |
|----------|-------------------|
| **Events** | Events describe actions that take place within your product. An event contains properties that describe the action. Events can also be joined with user profiles, group profiles, and lookup tables to enrich the data. <br><br> [Learn more about event properties](https://help.mixpanel.com/hc/en-us/articles/360001355266) |
| **User Profiles** | A user profile is a key/value store that holds state about a user. User profiles are joined to events on `event.distinct_id = user_profile.distinct_id` <br><br> [Learn more about profile properties](https://help.mixpanel.com/hc/en-us/articles/115004708186) |
| **Group Profiles** | A group profile is a key/value store that holds state about member of your group. Group profiles are joined to Events on your chosen _group key_. For example, if you create a new group key for `company_id` your events will be joined on `event.company_id = group_profile.company_id` <br><br> [Learn more about profile properties](https://help.mixpanel.com/hc/en-us/articles/115004708186) <br> [Learn more about group analytics](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics) |
| **Lookup Tables** | A lookup table is a key/value store that holds state about an entity. Lookup tables are joined to events (and other profiles) on your chosen join key. For example, if you create a lookup table for "Songs" and specify the join key as `song_id`, your events will be joined on `event.song_id = lookup_table.song_id`.<br><br>[Learn more about lookup tables](https://help.mixpanel.com/hc/en-us/articles/360044139291-Lookup-tables) |

---

# Example

Imagine you work on a music streaming product and you want to answer questions like: 

- What are the most popular songs and artists this week?
- What is the distribution of number of songs player per week by user?
- Which experiment performed better in an A/B test to drive a higher conversion rate from Free to Premium accounts?

You want to analyze uniques by both users *and* accounts so you create a group key for `account_id`. You also want to augment your events with details about songs being played so you create a "Songs" lookup table and specify the join key as `song_id`. Your data model will look like this:

![Data Model Example](https://storage.googleapis.com/cdn-mxpnl-com/static/readme/datamodel.png)

Your Mixpanel data is made up of **events** and **profiles**, each of which is comprised of **properties**.  Events are data points in a time-series database. Profiles are key-value stores.


# Anatomy of an Event
The following event represents the fact that user "john.doe@gmail.com" played the song_id of `0wwPcA6wtMf6HUMpIRdeP7` on Tuesday, September 29, at 2020 8:42:11 PM GMT on a machine with IP 203.0.113.9.

```json
{
  // The name of your event
  "event": "Played Song", 

   // A dictionary of properties to hold metadata about your event
  "properties": { 
  
    // The Mixpanel token associated with your project. You can find your Mixpanel token
    // in the project settings dialog in the Mixpanel app. Events without a valid token
    // will be ignored.
    "token": "6972694d809c7390676a138834f8c890",

    // The time an event occurred. If present, the value should be a Unix timestamp
    // (milliseconds since UTC epoch). If this property is not included in your request,
    // Mixpanel will use the time the event arrives at the server. If you're using our mobile SDKs,
    // it will be set automatically for you.
    "time": 1601412131000,

    // An IP address string (e.g. "127.0.0.1") associated with the event. This is
    // used for adding geolocation data to events, and should only be required if
    // you are making requests from your backend. If IP is absent (and ip=1 is not
    // provided as a URL parameter), Mixpanel will ignore the IP address of the request.
    "ip": "203.0.113.9",

    // A unique identifier for the event. Mixpanel uses this to deduplicate events in the case
    // of retries or network failures. Events with the same (event, time, distinct_id, $insert_id)
    // are considered duplicates. 
    // We recommend generating UUIDs for $insert_ids. Our SDKs do this automatically.
    "$insert_id": "5d958f87-542d-4c10-9422-0ed75893dc81",

    // The value of distinct_id will be treated as a string, and used to uniquely 
    // identify a user associated with your event. If you provide a distinct_id property
    // with your events, you can track a given user through funnels and distinguish 
    // unique users for retention analyses. You should always send the same distinct_id
    // when an event is triggered by the same user.
    "distinct_id": "john.doe@gmail.com",

    // You can also specify any arbitrary properties you want to track as metadata
    // about the event
    "app_version": "1.1.34.694.gac68a2b3",
    "song_id": "0wwPcA6wtMf6HUMpIRdeP7"
}
```
---

# User Profiles, Group Profiles & Lookup Tables
All three are key/value stores that augment your event data with additional metadata about entities. The differences are whether the join key is customizable and whether events are copied and indexed by the join key.

**User profiles** are joined to events via `distinct_id` which is the default indexing for Events. If you don't wish for your events to be associated to any User, you can set `distinct_id: ""`.

**Group profiles** are joined to events via an event property you specify. Once you create a new group key, we will add an additional index for your events on that property. This allows you to do funnels or retention by that property instead of by `distinct_id`.

**Lookup tables** are joined to events and user profiles using the join key that you specify. Unlike group profiles, your events are *not* indexed by the join key. You can use lookup table properties to do filtering, breakdowns, etc but you can't do things like funnels analysis using the join key for uniques. Note: Currently, group profile properties cannot be lookup table keys.

| Profile Type | Can Specify Join Key | Can Use Join Key For Uniques Analysis | Can Be Referenced From Other Profiles |
|---|---|---|---|
| User Profiles | :x: | :white-check-mark: | :x: |
| Group Profiles | :white-check-mark: | :white-check-mark: | :x: |
| Lookup Tables | :white-check-mark: | :x: | :white-check-mark: |
[block:embed]
{
  "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F7055268fd5c3438e97e65f9e038cf355&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F7055268fd5c3438e97e65f9e038cf355&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F7055268fd5c3438e97e65f9e038cf355-1591669608604.gif&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=loom\" width=\"1152\" height=\"864\" scrolling=\"no\" title=\"Loom embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
  "url": "https://www.loom.com/share/7055268fd5c3438e97e65f9e038cf355",
  "title": "Lookup tables v/s User profiles v/s Group profiles",
  "favicon": null,
  "image": "https://cdn.loom.com/sessions/thumbnails/7055268fd5c3438e97e65f9e038cf355-1591669608604.gif"
}
[/block]
Event deduplication allows a project to send the same exact event while only recording that event once.
Deduplication only occurs when a subset of the event data is exactly identical.

**Required [Event Object](doc:data-model#anatomy-of-an-event) attributes**
[block:parameters]
{
  "data": {
    "h-0": "Event Object property",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**event**",
    "0-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
    "0-2": "A name for the event. For example, \"Signed up\", or \"Uploaded Photo\".",
    "1-0": "**properties**",
    "1-1": "<span style=\"font-family: courier\">Object</span></br><span style=\"color: red\">required</span>",
    "2-0": "**properties.distinct_id**",
    "2-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
    "2-2": "The value of `distinct_id` will be treated as a string, and used to uniquely identify a user associated with your event. If you provide a distinct_id property with your events, you can track a given user through funnels and distinguish unique users for retention analyses. You should always send the same distinct_id when an event is triggered by the same user.",
    "3-0": "**properties.token**",
    "3-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
    "3-2": "The Mixpanel token associated with your project. You can find your Mixpanel token in the project settings dialog in the Mixpanel app. Events without a valid token will be ignored.",
    "4-0": "**properties.time**",
    "4-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
    "4-2": "The time an event occurred. If present, the value should be a unix timestamp (seconds since midnight, January 1st, 1970 - UTC). If this property is not included in your request, Mixpanel will use the time the event arrives at the server.",
    "5-0": "**properties.$insert_id**",
    "5-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
    "5-2": "A unique UUID tied to exactly one occurance of an event."
  },
  "cols": 3,
  "rows": 6
}
[/block]

In other words, each event containing an $insert_id is checked for duplication after being minimized to the following shape:

```json
{
  "event": "Back to Back",
  "properties": {
    "token": "project_token",
    "distinct_id": "aubrey@thesix.views",
    "time": 1601412131000,
    "$insert_id": "dsad09sad8sa0"
  },
}
```

If this simplified object is an exact match to any other simplfied event it is marked as a duplicate. Ingested events that have been marked as a duplicate will be deleted within 24 hours.

If an event is sent to the Ingestion API without an `$insert_id` one will be generated for it. However, it will not qualify for the deduplication process.

[block:callout]
{
  "type": "warning",
  "title": "Deduplication does not rewrite data",
  "body": "Using $insert_id is only used to prevent duplicate event data. It cannot be used to update, replace, or delete existing events."
}
[/block]

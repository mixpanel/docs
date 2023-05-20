---
title: "Overview"
slug: "lexicon-schemas-api"
hidden: false
createdAt: "2020-10-20T01:10:14.742Z"
updatedAt: "2021-04-09T15:23:27.964Z"
---
Sync your internal data dictionary or tracking plan with Mixpanel using Schemas. A Schema is used to describe the data you are sending to Mixpanel and represents an individual entry into your data dictionary. Schemas that you upload will be used to populate Lexicon and provide additional context for your data across the query UI. A Schema represents a single entity (usually an event) and is defined with json-schema.
[block:callout]
{
  "type": "info",
  "title": "Lexicon UI vs Lexicon Schemas API",
  "body": "The data returned from the Lexicon Schemas API is most likely *not* 1:1 with the data you see in Lexicon. This because **schemas are a subset of the data that appears in Lexicon**. The Lexicon UI shows you events & properties that either:\n1. have an associated schema **or**\n2. have been sent to your project in the last 30 days (sometimes the look-back period is shorter depending on your data volume).\n\nThe Lexicon Schemas API only returns events with associated schemas. If an event that you see in Lexicon has no associated schema, it will not be returned by the Lexicon Schemas API. If a property on an event is not specified in the event schema, it will not be returned by the Lexicon Schemas API."
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "When is a Lexicon Schema created?",
  "body": "A schema is created and associated to an event in a few different ways:\n1) By uploading a schema through this API\n2) By importing Lexicon entries via CSV\n3) By adding metadata in the UI (such as adding a description, hiding/showing, adding tags, etc.)"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "How can I export all of my data from Lexicon?",
  "body": "As mentioned above, the Lexicon Schemas API is unlikely to return all of the data you see in Lexicon. If you want all of the data, you can do a CSV export from the Lexicon UI. The resulting CSV will contain events and properties that have associated schemas and events and properties that were sent in the last 30 days even if they do not have associated schemas."
}
[/block]

[block:api-header]
{
  "title": "Example"
}
[/block]
The following is an example of how an event can be described by a schema:

Event
```json
{
      "event": "Added to Cart",
      "properties": {
          "item_name": "Blue Widget",
          "item_id": 12345,
          "item_price": 25.35
    }
}
```

Schema
```json
{
    "$schema": "http://json-schema.org/draft-07/schema",
    "description": "Tracked when a user adds an item to their cart.",
    "required": [
        "item_name",
        "item_id",
        "item_price"
    ],
    "additionalProperties": true,
    "properties": {
        "item_name": {
            "type": "string",
            "description": "The name of the item",
            "examples": [
                "Blue Widget"
            ]
        },
        "item_id": {
            "type": "integer",
            "description": "The internal id of the item",
            "examples": [
                12345
            ]
        },
        "item_price": {
            "type": "number",
            "description": "The current price of the item",
            "examples": [
                25.35
            ]
        }
    }
}
```
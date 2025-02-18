---
title: "Create Alias"
slug: "identity-create-alias"
excerpt: ""
hidden: false
createdAt: "2021-08-04T20:46:15.948Z"
updatedAt: "2023-09-26T21:06:37.385Z"
---

[block:callout]
{
  "type": "info",
  "body": "The $create_alias event payload is only useful for projects using the Original ID Merge system and the Legacy ID Management System; it has no functionality in the Simplified ID Merge system. Please review [this section of our documentation](https://docs.mixpanel.com/docs/tracking-methods/id-management#identity-merge-apis) for more information."
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "You can also use the import endpoint: https://api.mixpanel.com/import/"
}
[/block]

Mixpanel supports adding an alias to a distinct id. An alias is a new value that will be interpreted by Mixpanel as an existing value. That means that you can send messages to Mixpanel using the new value, and Mixpanel will continue to use the old value for calculating funnels and retention reports, or applying updates to user profiles.

**Alias Criteria:**
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d16f1d3-ID_management_alias_3-HTTP.png",
        "Identity Management - Alias",
        960,
        697,
        "#cad5da"
      ]
    }
  ]
}
[/block]

**Required [Event Object](https://docs.mixpanel.com/docs/tracking/reference/data-model#anatomy-of-an-event) attributes**

| Event Object property     | Type                    | Description                                             |
| ------------------------- | ----------------------- | ------------------------------------------------------- |
| **event**                 | <span style="font-family: courier">String</span></br><span style="color: red">required</span>| value must be: `$create_alias`                         |
| **properties**            | <span style="font-family: courier">Object</span></br><span style="color: red">required</span>|                                                         |
| **properties.distinct_id**| <span style="font-family: courier">String</span></br><span style="color: red">required</span>| A distinct_id to be merged with the alias.             |
| **properties.alias**      | <span style="font-family: courier">String</span></br><span style="color: red">required</span>| A new distinct_id to be merged with the original distinct_id. Each alias can only map to one distinct_id.|
| **properties.token**      | <span style="font-family: courier">String</span></br><span style="color: red">required</span>| The project token.                                       |


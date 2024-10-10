---
title: "Merge Identities"
slug: "identity-merge"
excerpt: ""
hidden: false
createdAt: "2021-08-04T20:46:15.950Z"
updatedAt: "2023-09-26T21:06:37.416Z"
---
[block:callout]
{
  "type": "info",
  "body": "The $merge event payload is only useful for projects using the Original ID Merge system; it has no functionality in other ID management systems. Please review [this section of our documentation](https://docs.mixpanel.com/docs/tracking-methods/id-management#identity-merge-apis) for more information."
}
[/block]

[block:callout]
{
  "type": "danger",
  "title": "Merging identities is irreversible",
  "body": "`$merge` is a very powerful tool, so we will only accept `$merge` events that are sent via `https://api.mixpanel.com/import`, which is protected by the project api secret. You **cannot** unmerge `distinct_id`."
}
[/block]

**Merge Criteria:**
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/be66940-merge_.png",
        "Identity Management - Merge",
        960,
        446,
        "#d0d7d3"
      ]
    }
  ]
}
[/block]

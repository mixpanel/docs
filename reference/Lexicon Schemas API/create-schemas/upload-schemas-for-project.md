---
title: "Create/Replace Multiple"
slug: "upload-schemas-for-project"
excerpt: ""
hidden: false
createdAt: "2020-11-20T21:23:20.196Z"
updatedAt: "2023-09-26T21:06:38.963Z"
---

Upload schemas in bulk to the specified project. If a schema already exists for a specified entity, it will be replaced by the one you upload.

[block:callout] {
 "type": "warning",
 "title": "Metadata merging behavior",
 "body": "If the new schema is missing `metadata` properties that are currently set in the existing schema for that entity, those properties will be merged into the new schema. For example, if your current schema has `{\"metadata\": {\"com.mixpanel\": {\"hidden\": true}}}` and you upload a new schema without \"hidden\", we will merge `\"hidden\": true` to your uploaded schema's metadata. If you want to remove that property, set the value to `null`."
} [/block]

[block:callout] {
 "type": "info",
 "title": "Adding a schema for User Profiles",
 "body": "To add a schema for your [User Profiles](https://help.mixpanel.com/hc/en-us/articles/115004501966-User-Profiles), specify the `entityType` as `profile` and the `name` as `$user`."
} [/block]

### Example POST Body
```json
{
  "entries": [
    {
      "entityType": "event",
      "name": "Added To Cart",
      "schemaJson": {
        "$schema": "http://json-schema.org/draft-07/schema",
        "description": "Tracked when a user adds an item to their cart.",
        "required": [
          "item_name",
          "item_id",
          "item_price"
        ],
        "additionalProperties": true,
        "metadata": {
          "com.mixpanel": {
            "tags": [
              "Shopping",
              "KPIs"
            ],
            "displayName": "Item Purchased",
            "hidden": false,
            "dropped": false,
            "owners": [
              {
                "name": "Pat Davis",
                "email": "pat.davis@mixpanel.com"
              }
            ]
          }
        },
        "properties": {
          "item_name": {
            "type": "string",
            "description": "The name of the item",
            "examples": [
              "Blue Widget"
            ],
            "metadata": {
              "com.mixpanel": {
                "displayName": "Item Name"
              }
            }
          },
          "item_id": {
            "type": "integer",
            "description": "The internal id of the item",
            "examples": [
              12345
            ],
            "metadata": {
              "com.mixpanel": {
                "displayName": "Item ID"
              }
            }
          },
          "item_price": {
            "type": "number",
            "description": "The current price of the item",
            "examples": [
              25.35
            ],
            "metadata": {
              "com.mixpanel": {
                "displayName": "Price"
              }
            }
          },
          "promo_id": {
            "type": "integer",
            "description": "The id of any promo in progress for this item",
            "examples": [
              82523,
              18382
            ],
            "metadata": {
              "com.mixpanel": {
                "displayName": "Promo ID"
              }
            }
          },
          "date_added_to_catalog": {
            "type": "string",
            "format": "date-time",
            "description": "The date this item was added to the store catalog",
            "examples": [
              "2015-03-05T15:25:23"
            ],
            "metadata": {
              "com.mixpanel": {
                "displayName": "Date Added"
              }
            }
          }
        }
      }
    }
  ],
  "truncate": false
}
```

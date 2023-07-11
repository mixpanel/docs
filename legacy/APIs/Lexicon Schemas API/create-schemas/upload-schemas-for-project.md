---
title: "Create/Replace Multiple"
slug: "upload-schemas-for-project"
excerpt: "Upload schemas in bulk to the specified project. If a schema already exists for a specified entity, it will be replaced by the one you upload.\n[block:callout] {\n  \"type\": \"warning\",\n  \"title\": \"Metadata merging behavior\",\n  \"body\": \"If the new schema is missing `metadata` properties that are currently set in the existing schema for that entity, those properties will be merged into the new schema. For example, if your current schema has `{\\\"metadata\\\": {\\\"com.mixpanel\\\": {\\\"hidden\\\": true}}}` and you upload a new schema without \\\"hidden\\\", we will merge `\\\"hidden\\\": true` to your uploaded schema's metadata. If you want to remove that property, set the value to `null`.\"\n} [/block]\n[block:callout] {\n  \"type\": \"info\",\n  \"title\": \"Adding a schema for User Profiles\",\n  \"body\": \"To add a schema for your [User Profiles](https://help.mixpanel.com/hc/en-us/articles/115004501966-User-Profiles), specify the `entityType` as `profile` and the `name` as `$user`.\"\n} [/block]\n### Example POST Body\n```json\n{\n    \"entries\": [\n        {\n            \"entityType\": \"event\",\n            \"name\": \"Added To Cart\",\n            \"schemaJson\": {\n                \"$schema\": \"http://json-schema.org/draft-07/schema\",\n                \"description\": \"Tracked when a user adds an item to their cart.\",\n                \"required\": [\n                    \"item_name\",\n                    \"item_id\",\n                    \"item_price\"\n                ],\n                \"additionalProperties\": true,\n                \"metadata\": {\n                    \"com.mixpanel\": {\n                        \"tags\": [\n                            \"Shopping\",\n                            \"KPIs\"\n                        ],\n                        \"displayName\": \"Item Purchased\",\n                        \"hidden\": false,\n                        \"dropped\": false,\n                        \"owners\": [\n                            {\n                                \"name\": \"Pat Davis\",\n                                \"email\": \"pat.david@mixpanel.com\"\n                            }\n                        ]\n                    }\n                },\n                \"properties\": {\n                    \"item_name\": {\n                        \"type\": \"string\",\n                        \"description\": \"The name of the item\",\n                        \"examples\": [\n                            \"Blue Widget\"\n                        ],\n                        \"metadata\": {\n                          \"com.mixpanel\": {\n                            \"displayName\": \"Item Name\"\n                          }\n                        }\n                    },\n                    \"item_id\": {\n                        \"type\": \"integer\",\n                        \"description\": \"The internal id of the item\",\n                        \"examples\": [\n                            12345\n                        ],\n                        \"metadata\": {\n                          \"com.mixpanel\": {\n                              \"displayName\": \"Item ID\"\n                          }\n                        }\n                    },\n                    \"item_price\": {\n                        \"type\": \"number\",\n                        \"description\": \"The current price of the item\",\n                        \"examples\": [\n                            25.35\n                        ],\n                        \"metadata\": {\n                          \"com.mixpanel\": {\n                            \"displayName\": \"Price\"\n                          }\n                        }\n                    },\n                    \"promo_id\": {\n                        \"type\": \"integer\",\n                        \"description\": \"The id of any promo in progress for this item\",\n                        \"examples\": [\n                            82523,\n                            18382\n                        ],\n                        \"metadata\": {\n                          \"com.mixpanel\": {\n                            \"displayName\": \"Promo ID\"\n                          }\n                        }\n                    },\n                    \"date_added_to_catalog\": {\n                        \"type\": \"string\",\n                        \"format\": \"date-time\",\n                        \"description\": \"The date this item was added to the store catalog\",\n                        \"examples\": [\n                            \"2015-03-05T15:25:23\"\n                        ],\n                        \"metadata\": {\n                          \"com.mixpanel\": {\n                            \"displayName\": \"Date Added\"\n                          }\n                        }\n                    }\n                }\n            }\n        }\n    ],\n    \"truncate\": false\n} ```"
hidden: false
createdAt: "2020-11-20T21:23:20.196Z"
updatedAt: "2020-11-30T22:53:18.406Z"
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
                                "email": "pat.david@mixpanel.com"
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
} ```
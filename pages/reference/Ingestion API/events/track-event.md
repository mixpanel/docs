---
title: "Track Events"
slug: "track-event"
excerpt: "Track events to Mixpanel from client devices. We recommend using one of our client-side SDKs instead of using /track directly, as our SDKs provide queueing, retrying, batching, and more.\n***\n[block:api-header]\n{\n  \"title\": \"When to use /track vs /import\"\n}\n[/block]\nTypically, we recommend using /import for server-side integrations as it is more scalable and supports ingesting historical data. We only recommend /track for client-side tracking in an environment for which we don't have SDK support or if you're sending data via some other untrusted environment (eg: third-party webhooks that send data to Mixpanel).\n[block:parameters]\n{\n  \"data\": {\n    \"h-0\": \"\",\n    \"h-1\": \"/track\",\n    \"h-2\": \"/import\",\n    \"0-0\": \"Events per request\",\n    \"0-1\": \"50\",\n    \"0-2\": \"2000\",\n    \"1-0\": \"Authentication\",\n    \"1-1\": \"Project Token, intended for untrusted clients.\",\n    \"1-2\": \"Project Secret, intended for server-side integration.\",\n    \"2-0\": \"Compression\",\n    \"2-1\": \"None\",\n    \"2-2\": \"Gzip allowed\",\n    \"3-0\": \"Content-Type\",\n    \"3-1\": \"application/x-www-form-urlencoded\",\n    \"3-2\": \"application/json or application/x-ndjson\",\n    \"4-0\": \"Ingesting historical events\",\n    \"4-1\": \"Last 5 days only.\",\n    \"4-2\": \"Any time after 1971-01-01.\"\n  },\n  \"cols\": 3,\n  \"rows\": 5\n}\n[/block]\n\n[block:api-header]\n{\n  \"title\": \"Limits\"\n}\n[/block]\nThe limits for track are the same as /import, [see here](https://developer.mixpanel.com/reference/import-events#rate-limits)."
hidden: false
createdAt: "2021-07-27T00:06:02.814Z"
updatedAt: "2022-02-03T22:13:32.115Z"
---
Track events to Mixpanel from client devices. We recommend using one of our client-side SDKs instead of using /track directly, as our SDKs provide queueing, retrying, batching, and more.
***
[block:api-header]
{
  "title": "When to use /track vs /import"
}
[/block]
Typically, we recommend using /import for server-side integrations as it is more scalable and supports ingesting historical data. We only recommend /track for client-side tracking in an environment for which we don't have SDK support or if you're sending data via some other untrusted environment (eg: third-party webhooks that send data to Mixpanel).
[block:parameters]
{
  "data": {
    "h-0": "",
    "h-1": "/track",
    "h-2": "/import",
    "0-0": "Events per request",
    "0-1": "50",
    "0-2": "2000",
    "1-0": "Authentication",
    "1-1": "Project Token, intended for untrusted clients.",
    "1-2": "Project Secret, intended for server-side integration.",
    "2-0": "Compression",
    "2-1": "None",
    "2-2": "Gzip allowed",
    "3-0": "Content-Type",
    "3-1": "application/x-www-form-urlencoded",
    "3-2": "application/json or application/x-ndjson",
    "4-0": "Ingesting historical events",
    "4-1": "Last 5 days only.",
    "4-2": "Any time after 1971-01-01."
  },
  "cols": 3,
  "rows": 5
}
[/block]

[block:api-header]
{
  "title": "Limits"
}
[/block]
The limits for track are the same as /import, [see here](https://developer.mixpanel.com/reference/import-events#rate-limits).
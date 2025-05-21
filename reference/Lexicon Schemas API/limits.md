---
title: "Limits"
slug: "limits"
hidden: false
createdAt: "2021-03-22T20:05:44.327Z"
updatedAt: "2025-05-21T16:27:48.437Z"
---
The Schemas API has the following limit:

• requests per organization per minute: 5
• events and properties updated per organization per minute: 4000
• total truncations/deletions per request: 3000

If you are running up against these limits, we suggest breaking your request into smaller batches. Usually these limits are only hit if you are attempting to do a bulk create/update.

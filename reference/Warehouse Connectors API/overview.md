---
title: "Overview"
slug: "warehouse-connectors-api"
hidden: false
createdAt: "2024-08-05T19:31:43.295Z"
updatedAt: "2024-10-23T13:31:43.295Z"
categorySlug: "warehouse-connectors-api"
---

Warehouse Connectors allow you to connect a warehouse of your choice to import events, users, groups, and lookup tables.

Use Warehouse Connectors API to run a specific import manually. The API endpoint is rate limited to 5 calls per hour. If you are using Mirror mode, please make sure to run the sync at least once every 14 days to ensure the snapshots do not get deleted before we ingest new data.

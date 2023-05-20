---
title: "Export"
slug: "export"
hidden: false
createdAt: "2022-01-29T02:58:19.233Z"
updatedAt: "2023-03-28T07:01:17.269Z"
---
The Export API lets you export raw events from Mixpanel. If you're looking for an automated offering that exports events to cloud storage or a data warehouse, see [Data Pipelines](doc:data-pipelines).

# Limits
This API will return a 429 error after 100 concurrent queries or 60 queries per hour.
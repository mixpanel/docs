---
title: "Lookup Tables"
slug: "lookup-tables"
hidden: false
createdAt: "2020-10-20T00:41:25.537Z"
updatedAt: "2021-10-21T00:07:32.887Z"
---
Lookup Tables are mutable tables that describe non-user entities like accounts, product SKUs, or geographies. These tables can be used to enrich events at query-time. In star schema terms: events are like facts and Lookup Tables are like dimensions.

Lookup Tables are [created via the Mixpanel UI](https://help.mixpanel.com/hc/en-us/articles/360044139291-Lookup-tables#stepbystep-guide). This API supports replacing the contents of an existing Lookup Table, which can be used to keep Mixpanel in sync with a source-of-truth system.

These APIs use [Service Accounts](ref:service-accounts) for authentication.
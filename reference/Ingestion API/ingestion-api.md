---
title: "Overview"
slug: "ingestion-api"
hidden: false
createdAt: "2020-10-20T01:00:32.287Z"
updatedAt: "2021-10-05T03:17:58.919Z"
---
Mixpanel's Ingestion APIs allow you to send event or profile data to Mixpanel, which can be analyzed in our reporting interface. 

If you're implementing client-side, we recommend using one of our SDKs. If you're implementing server-side, as part of a batch or streaming data pipeline, these APIs can be used as a low-level foundation to send data to Mixpanel.

See our [Client-Side vs Server-Side Tracking](doc:client-side-vs-server-side-tracking) guide for tradeoffs between the different integration approaches.
[block:api-header]
{
  "title": "Ingestion HTTP APIs"
}
[/block]
- [Events](ref:events) 
- [Identities](ref:identities) 
- [User Profiles](ref:user-profiles) 
- [Group Profiles](ref:group-profiles) 
- [Lookup Tables](ref:lookup-tables)
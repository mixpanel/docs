---
title: "Authentication Methods"
slug: "authentication"
hidden: false
createdAt: "2020-08-13T17:14:54.607Z"
updatedAt: "2023-06-21T19:31:29.821Z"
---
Most of our APIs require authentication for which we recommend using [Service Accounts](ref:service-accounts) to authenticate. However, most of our [Ingestion API](ref:ingestion-api) calls such as [Import Events](ref:import-events), [Track Events](ref:track-event), [User Profiles](ref:user-profiles), and [Group Profiles](ref:group-profiles) only require a [Project Token](ref:project-token). Because these APIs are often called from our client-side SDKs, we do not want to expose credentials, but we do need to know which project to send data to so we use the Project Token for that purpose.

> 🚧 HTTPS Only
> 
> Our APIs will reject calls made over HTTP to protect request and response information.
---
title: "Authentication"
slug: "query-api-authentication"
hidden: false
createdAt: "2020-10-20T01:08:17.902Z"
updatedAt: "2020-10-20T22:16:31.458Z"
---
[block:api-header]
{
  "title": "Service Account"
}
[/block]
[Service Account Authentication Details](ref:authentication#service-account)
[block:callout]
{
  "type": "success",
  "body": "This is the preferred authentication method for Query API."
}
[/block]
- Requests parameters must include a `project_id`. 

**Projects with [Data Views](https://help.mixpanel.com/hc/en-us/articles/360043782572-Data-Views)**
- In addition to `project_id`, you should include the global data view's `workspace_id` as a request parameter.

**Projects with [Classified Data](https://help.mixpanel.com/hc/en-us/articles/360044295131-Data-Classification)**
- Your results may be filtered based on the Service Account's sensitivity settings.
[block:api-header]
{
  "title": "Project Secret"
}
[/block]
[Project Secret Authentication Details](ref:authentication#project-secret)
[block:callout]
{
  "type": "danger",
  "body": "Project Secret authentication is in the process of being deprecated. This authentication method does not currently have an EOL date.",
  "title": "Please migrate existing integrations to use Service Account authentication"
}
[/block]
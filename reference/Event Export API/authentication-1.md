---
title: "Authentication (when workspaces ship)"
slug: "authentication-1"
hidden: true
createdAt: "2020-10-22T21:16:01.442Z"
updatedAt: "2020-10-22T21:17:34.725Z"
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
  "body": "This is the preferred authentication method for Raw Data Export API."
}
[/block]
- Requests parameters must include a `project_id`.

**Projects with [Data Views](https://help.mixpanel.com/hc/en-us/articles/360043782572-Data-Views)**
- You can only export data through the global workspace.
- The Service Account must have permission to the global workspace.
- In addition to `project_id`, you should include the global data view's `workspace_id` as a request parameter.

**Projects with [Classified Data](https://help.mixpanel.com/hc/en-us/articles/360044295131-Data-Classification)**
- The Service Account must have permission to access classified data.
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
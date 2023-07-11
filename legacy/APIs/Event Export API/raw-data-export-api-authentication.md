---
title: "Authentication"
slug: "raw-data-export-api-authentication"
hidden: false
createdAt: "2020-10-20T01:09:46.014Z"
updatedAt: "2021-05-27T17:34:47.861Z"
---
[block:api-header]
{
  "title": "Service Account"
}
[/block]
[Project Secret Authentication Details](ref:authentication#service-accounts)

Note that when you use Service Account authentication, you must specify the project_id as a query parameter. E.g. `https://data.mixpanel.com/api/2.0/export?project_id=12345`

**Projects with [Classified Data](https://help.mixpanel.com/hc/en-us/articles/360044295131-Data-Classification)**
- The Service Account must have permission to access classified data.
[block:api-header]
{
  "title": "Project Secret"
}
[/block]
[Project Secret Authentication Details](ref:authentication#project-secret)
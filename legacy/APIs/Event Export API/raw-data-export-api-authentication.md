---
title: "Authentication"
slug: "raw-data-export-api-authentication"
hidden: false
createdAt: "2020-10-20T01:09:46.014Z"
updatedAt: "2023-05-22T22:09:07.345Z"
---
## Service Account

[Project Secret Authentication Details](ref:authentication#service-accounts)

Note that when you use Service Account authentication, you must specify the project_id as a query parameter. E.g. `https://data.mixpanel.com/api/2.0/export?project_id=12345`

**Projects with [Classified Data](https://docs.mixpanel.com/docs/admin/data-governance/data-views-data-classification#data-classification)**

- The Service Account must have permission to access classified data.

## Project Secret

[Project Secret Authentication Details](ref:authentication#project-secret)
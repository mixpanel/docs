---
title: "Authentication"
slug: "data-warehouse-api-authentication"
hidden: false
createdAt: "2020-10-20T01:12:49.625Z"
updatedAt: "2021-08-18T17:03:34.593Z"
---
[block:api-header]
{
  "title": "Project Secret"
}
[/block]
[Project Secret Authentication Details](ref:authentication#project-secret)

[block:api-header]
{
  "title": "Service Account"
}
[/block]
[Service Account Authentication Details](ref:authentication#service-account)

Note that when you use Service Account authentication, you must specify the project_id as a  parameter.

E.g. `curl  https://data.mixpanel.com/api/2.0/nessie/pipeline/status -u "<serviceaccount_user>:<serviceaccount_secret>"    -d name="<job_name>"  -d project_id="<mixpanel_project_id>"  -d summary="true"`
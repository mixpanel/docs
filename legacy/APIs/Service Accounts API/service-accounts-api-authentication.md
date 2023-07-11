---
title: "Authentication"
slug: "service-accounts-api-authentication"
hidden: false
createdAt: "2021-09-16T19:14:35.980Z"
updatedAt: "2021-09-16T19:25:23.569Z"
---
[block:api-header]
{
  "title": "Service Account"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "To modify (create, delete) a service account, the service account used for authentication must have the role of admin or owner.",
  "title": "Roles & Permissions"
}
[/block]
[Service Account Authentication Details](ref:authentication#service-accounts)
[block:code]
{
  "codes": [
    {
      "code": "curl --request GET \\\n     --url https://mixpanel.com/api/app/organizations/12345/service-accounts \\\n     --header 'Accept: application/json' \\\n     --header 'Authorization: Basic dGVzdDp0ZXN0'",
      "language": "curl"
    }
  ]
}
[/block]
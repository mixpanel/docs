---
title: "Project Secret [Deprecating]"
slug: "project-secret"
hidden: false
createdAt: "2020-08-13T17:23:22.954Z"
updatedAt: "2021-10-07T15:15:08.278Z"
---
[block:callout]
{
  "type": "danger",
  "title": "Deprecation Warning",
  "body": "This authentication method is in the process of being deprecated. Please use Service Accounts instead. We will continue to support Project Secret authentication for legacy customers indefinitely so you aren't at risk of your existing scripts breaking, but we highly recommend migrating to Service Accounts for any subsequent usage."
}
[/block]
Before we introduced Service Accounts, Project Secret was the standard authentication mechanism for importing and exporting data in your project.

Your Project Secret is very powerful so be sure to keep it secure. Do not share your secret in publicly accessible or insecure places such as source code or plain-text configs.
[block:api-header]
{
  "title": "Authenticating with a Project Secret"
}
[/block]

Project secret authentication is performed via [HTTP Basic Auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme). Provide your secret as the basic auth username value with an empty password. Make sure you use HTTPS and not HTTP - our API rejects requests made over HTTP since this sends your API Secret over the internet in plain text.
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.mixpanel.com/import \\\n    -u <api_secret>: \\ # trailing colon prevents a password prompt\n    -d data=<encoded_event_data>",
      "language": "curl"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Managing a Project's Secret"
}
[/block]
A project's secret can be found in the Access Keys section of a project's settings overview page: https://mixpanel.com/settings/project/.

 To learn more, view our [project settings guide](https://help.mixpanel.com/hc/en-us/articles/115004490503-Project-Settings).
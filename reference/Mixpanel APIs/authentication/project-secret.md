---
title: 'Project Secret [Deprecated]'
category:
  uri: Mixpanel APIs
content:
  excerpt: ''
privacy:
  view: public
---
<Callout icon="❗️" theme="error">
  Deprecation Warning

  This authentication method has been deprecated and will be fully retired on **March 3, 2027**. Please migrate to [Service Accounts](../../Service%20Accounts%20API/service-accounts-api.md) instead, as they are the recommended authentication mechanism going forward.
</Callout>

Before we introduced Service Accounts, Project Secret was the standard authentication mechanism for importing and exporting data in your project.

Your Project Secret is very powerful so be sure to keep it secure. Do not share your secret in publicly accessible or insecure places such as source code or plain-text configs.

## Authenticating with a Project Secret

Project secret authentication is performed via [HTTP Basic Auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme). Provide your secret as the basic auth username value with an empty password. Make sure you use HTTPS and not HTTP - our API rejects requests made over HTTP since this sends your API Secret over the internet in plain text.

```curl
    curl https://api.mixpanel.com/import
        -u <api_secret>: \\ # trailing colon prevents a password prompt
        -d data=<encoded_event_data>
```

## Managing a Project's Secret

A project's secret can be found in the Access Keys section of a project's settings overview page: [https://mixpanel.com/settings/project/](https://mixpanel.com/settings/project/).

To learn more, view our [project settings guide](https://help.mixpanel.com/hc/en-us/articles/115004490503-Project-Settings).

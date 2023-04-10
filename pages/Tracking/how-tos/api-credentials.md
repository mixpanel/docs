---
title: "Find your API Credentials"
slug: "api-credentials"
hidden: false
---

# Project Token
You need your Project Token to track events to Mixpanel. Mixpanel uses Project Token to ensure that events that you send are routed to your project.

You can find it in the [Project Settings](https://mixpanel.com/settings/project) page under "Access Keys"

![image](https://user-images.githubusercontent.com/2077899/229924656-95f4e4e5-441f-49d7-95ea-32b0979a11f8.png)

You can then use your token to track events to Mixpanel. See our guides for [Javascript](doc:javascript-quickstart), [Server](doc:server), and [Mobile](doc:mobile).

Note: Project Token does not let you _read_ any data from your Mixpanel project. It only lets you track. This is intentional because your Project Token is public and shipped to client devices as part of your website's Javascript code.


# API Secret
The API Secret is used to backfill historical events into your project via our Import API and to export data out of your project via our Export APIs.

You should not share your API Secret, since it can be used to export data from your Mixpanel project.


You can find it in the [Project Settings](https://mixpanel.com/settings/project) page under "Access Keys", right below Project Token.


# Service Accounts

[Service Accounts](ref:service-accounts) are a more advanced form of authentication that is used to grant temporary access to a subset of Mixpanel projects within your organization for certain APIs.

Service Accounts are not necessary to send data to Mixpanel or export data out of Mixpanel.

---
title: "User & Group Profiles"
slug: "users-groups"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---

Profiles let you enrich events with properties about the users, or groups of users, that performed those events. Tracking Profiles is optional; we recommend starting with events and only adding Profiles if you need it.


## What is a User Profile?
A User Profile is a set of properties associated with a given user, that you send to Mixpanel via our SDKs or Engage API. Mixpanel stores user profiles for your project in a table:

| Distinct ID | Name | Email
| --- | --- | --- |
| 40bf7661-0aad-41d2-82a0-e3f9ae927812 | Alice | alice@linear.app |
| deae3e00-68c0-4f45-b71f-ea53a2c9a8ca | Bob | bob@notion.so |
| af3ee4ba-2c13-4b18-891f-6f49f1e3eb28 | Carol | carol@figma.com |

Like [Event Properties](doc:events-properties), you can use User Profile Properties to filter or breakdown your reports.

The main use case for User Profile Properties is to track demographic attributes of the user, like their name, email, and domain.

## Tracking User Profiles
You can track User Profiles to Mixpanel in a similar manner to tracking events

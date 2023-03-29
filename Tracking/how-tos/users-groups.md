---
title: "User & Group Profiles"
slug: "users-groups"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---

Profiles let you enrich events with properties about the users, or groups of users, that performed those events. Tracking Profiles is optional; we recommend starting with events and only adding Profiles if you need it.


## What is a User Profile?
A User Profile is a set of properties associated with a given user, that you send to Mixpanel via our SDKs or Engage API. Under the hood, Mixpanel stores this profile information as a table that links the user's ID to their profile properties. When queries are run, events are joined against this table to pull the properties of associated users.

| Distinct ID | Name | Email
| --- | --- | --- |
| 40bf7661-0aad-41d2-82a0-e3f9ae927812 | Alice | alice@linear.app |
| deae3e00-68c0-4f45-b71f-ea53a2c9a8ca | Bob | bob@notion.so |
| deae3e00-68c0-4f45-b71f-ea53a2c9a8ca | Bob | bob@notion.so |

The main use case for User Profile Properties is to track demographic attributes of the user, like their name, email, and domain that seldom changes over time. This helps you quickly tie your analysis to the specific users that are affected and potentially reach out to them with a follow-up email. 

In most cases, we don't recommend tracking more than this on your User Profiles. Most other properties should be [Event Properties](doc:events-properties), rather than User Profile Properties.

## Tracking User Profiles
We recommend using 


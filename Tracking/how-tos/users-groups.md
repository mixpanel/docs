---
title: "User Profiles"
slug: "users-groups"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---

User Profiles let you enrich events with properties about the users that performed those events. Tracking Profiles is optional; we recommend starting with events and only adding Profiles if you need it.


## What is a User Profile?
A User Profile is a set of properties associated with a given user. Under the hood, Mixpanel stores user profiles for your project in a table:

| Distinct ID | Name | Email
| --- | --- | --- |
| 40bf7661-0aad-41d2-82a0-e3f9ae927812 | Alice | alice@linear.app |
| deae3e00-68c0-4f45-b71f-ea53a2c9a8ca | Bob | bob@notion.so |
| af3ee4ba-2c13-4b18-891f-6f49f1e3eb28 | Carol | carol@figma.com |

User Profiles are joined onto your Events based on their Distinct ID, which is the ID of the user. This lets you join the events performed by a user with properties about who that user is.

We recommend primarily using User Profile Properties to track demographic attributes of the user, like their name, email, and domain. Most other properties are better tracked as [Event Properties](doc:events-properties). That said, User Profile Properties are as flexible as any other properties in Mixpanel, so you can send arbitrary JSON.


## Tracking User Profiles
You can track User Profiles to Mixpanel in all the same ways you track events: from our SDKs, via our HTTP API, or via our Integrations.

We recommend tracking user profiles from as close as possible to the source of truth for those profiles, which is usually your application database or your CRM. One common approach is to run an hourly or daily script on your servers that pulls the list of profiles from your database and pushes them to Mixpanel. Here's an example of that script:

// TODO(vijay): Write this script






## FAQ

### How do User Profiles work if I'm sending data from Segment?
Mixpanel is 100% compatible with Segment. If you call the [`analytics.identify()`](https://segment.com/docs/connections/spec/identify/) method, Segment will create a User Profile in Mixpanel. You can learn more about our integration in Segment's [docs](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/#identify-user).

### What does the Updated At property mean?
User Profiles are mutable, which means new ones can be added and existing ones can be updated or deleted. Mixpanel automatically maintains an Updated At property, which contains the last timestamp that a user profile was updated. Updated At does not change if the user does a new event; it only changes when the profile is updated.

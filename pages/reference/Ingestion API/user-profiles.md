---
title: "User Profiles"
slug: "user-profiles"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2023-03-30T17:23:53.624Z"
---
User Profiles let you enrich events with properties about the users that performed those events. Tracking Profiles is optional; we recommend starting with events and only adding Profiles if you need it.


## What is a User Profile?
A User Profile is a set of properties associated with a given user. Under the hood, Mixpanel stores user profiles for your project in a table:

| Distinct ID | Name | Email | Department
| --- | --- | --- | --- |
| 123 | Alice | alice@linear.app | Engineering
| 456 | Bob | bob@notion.so | Product
| 789 | Carol | carol@figma.com | Design

User Profiles are joined onto your Events based on their Distinct ID, which is the ID of the user. This lets you join the events performed by a user with properties about who that user is. It's very important that you use the same Distinct ID for both your events and your users.



## Tracking User Profiles
You can track User Profiles to Mixpanel in all the same ways you track events: from our SDKs, via our HTTP API, or via our Integrations.

We recommend tracking user profiles from as close as possible to the source of truth for those profiles, which is usually your application database or your CRM. One common approach is to run an hourly or daily script on your servers that pulls the list of profiles from your database and pushes them to Mixpanel.


Here's some sample code to get you started:

```python
# Fill this out. You can get it from https://mixpanel.com/settings/project
PROJECT_TOKEN = ""

import json
import requests


def get_users_from_database():
    # Replace this with code that reads users from your database or CRM.
    # Note: $name and $email are optional, but useful properties that automatically populate certain parts of our UI when Mixpanel detects them.
    return [
        {"user_id": "123", "$name": "Alice", "$email": "alice@linear.app", "department": "engineering"},
        {"user_id": "456", "$name": "Bob", "$email": "bob@notion.so", "department": "product"},
        {"user_id": "789", "$name": "Carol", "$email": "carol@figma.com", "department": "design"}
    ]

def transform_to_mp_format(user):
    """Transform the above into Mixpanel's format"""
    # It's important to set this to the same distinct_id that you use when tracking events.
    # We recommend using the primary key of your users table for this.
    distinct_id = user.pop("user_id")

    # Note: we set "$ip" to 0 here to tell Mixpanel not to look up the IP of this user.
    return {"$distinct_id": distinct_id, "$token": PROJECT_TOKEN, "$ip": "0", "$set": user}


users = get_users_from_database()
profiles = [transform_to_mp_format(u) for u in users]

# We recommend calling this API with batches of 200 user profiles to do this at scale.
resp = requests.post(
    "https://api.mixpanel.com/engage",
    params={"verbose": "2"},
    headers={"Content-Type": "application/json"},
    data=json.dumps(profiles)
)

print(resp.json())
```



## FAQ

### What should I send as a User Profile Property vs an Event Property?
We recommend primarily using User Profile Properties to track demographic attributes of the user, like their name, email, and domain. Most other properties are better tracked as [Event Properties](doc:events-properties).

That said, User Profile Properties are as flexible as any other properties in Mixpanel, so you can send arbitrary JSON.

### How can I update User Profile Properties?
User Profiles are mutable; Mixpanel only stores the latest value of each profile property. We have methods to update profile properties via our [HTTP API](ref:profile-set).

### How can I send User Profiles if I use Segment?
Mixpanel is 100% compatible with Segment; just follow Segment's best practices. If you call the [`analytics.identify()`](https://segment.com/docs/connections/spec/identify/) method, Segment will create a User Profile in Mixpanel. You can learn more about our integration in Segment's [docs](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/#identify-user).

### What does the Updated At property mean?
User Profiles are mutable, which means new ones can be added and existing ones can be updated or deleted. Mixpanel automatically maintains an Updated At property, which contains the last timestamp that a user profile was updated. Updated At does not change if the user does a new event; it only changes when the profile is updated.
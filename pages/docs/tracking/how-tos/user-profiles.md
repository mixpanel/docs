---
title: "User Profiles"
slug: "user-profiles"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---

User Profiles let you enrich events with properties about the users that performed those events. Profiles are optional; we recommend starting with events and only adding Profiles if you need it.


## Overview
A User Profile is a set of properties associated with a given user. Under the hood, Mixpanel stores user profiles for your project in a table:

| Distinct ID | Name | Email | Department
| --- | --- | --- | --- |
| 123 | Alice | alice@linear.app | Engineering
| 456 | Bob | bob@notion.so | Product
| 789 | Carol | carol@figma.com | Design

User Profiles are joined onto your Events based on their Distinct ID, which is the ID of the user. This lets you join the events performed by a user with properties about who that user is. It's very important that you use the same Distinct ID for both your events and your users.



## Importing User Profiles via our API
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

## Importing User Profiles via our UI

To get started, click on **Add/Edit Profile** from the [Users](https://mixpanel.com/report/users) page and follow the workflow:

![/Screen_Shot_2021-12-01_at_11.44.03_AM.png](/Screen_Shot_2021-12-01_at_11.44.03_AM.png)

## Importing Individual User Profiles

### Set an Identifier Column

The most important column is **$distinct_id**. This ID needs to match the distinct_id property that you're sending on your events.

### Add Additional Properties

After **$distinct_id**, you can add additional properties to the profile by pressing the "Add Property" button. Mixpanel will help autocomplete profile properties that you may want to set.

![/Screen_Shot_2021-12-01_at_12.20.27_PM.png](/Screen_Shot_2021-12-01_at_12.20.27_PM.png)

We recommend using the `$name` and `$email` properties if you're uploading a user's name or email. Mixpanel shows these properties by default in various parts of our UI.

## Importing a CSV

When editing the CSV that you want to upload as profiles, you should **not** include column headers (e.g., Email, Name, etc.). Instead, you’ll identify column headers during the CSV upload wizard in the Mixpanel UI.

**Note**:
- If you upload a CSV with new information for existing users, any existing information will be overwritten by new values you've imported.
- The maximum size for your CSV is 1M rows.

### Upload Your CSV

Go the the Import from CSV mode and select your prepared csv to begin the process.

### Choose an Identifier Column

The most important column in your spreadsheet is the **"$distinct_id"** column for user profiles or **"$group_id"**, the group identifier, for group profiles, as these are the canonical identifiers in Mixpanel.

If you do not assign an identifier column, Mixpanel will use your "$email" column as the "$distinct_id" value; if you don’t have an $email column either, then the "$distinct_id" value will be assigned randomly by default as described above.

### Choose Desired CSV Columns
![/Screen_Shot_2021-12-01_at_12.24.00_PM.png](/Screen_Shot_2021-12-01_at_12.24.00_PM.png)

You'll have the opportunity to look through all columns in the CSV to preview the values. In this step you must uncheck all of the columns you wish to NOT import. You must also choose the associated Mixpanel profile property that each CSV column will be associated with. When you done selecting the columns you wish to import along with their associated properties, press the Import profiles button.

## Deleting User Profiles
User Profiles can be deleted either via the [Users](https://mixpanel.com/report/users) page or programmatically via our API. We provide a `people_delete` method in the mixpanel-utils library [here](https://github.com/mixpanel/mixpanel-utils#people-delete).

## Reserved Properties
Mixpanel reserves certain property names; these properties receive special treatment in our UI.

| Name          | Display   | Description                                                                                                                                                                                                                                                                                                                                                             |
|---------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $email        | Email     | The user's email address. You must set this property if you want to send users email from Mixpanel.                                                                                                                                                                                                                                                                    |
| $phone        | Phone     | The user's phone number. You must set this property if you want to send users SMS from Mixpanel. Note that a '+' needs to precede phone numbers. This is especially useful for international numbers. If the user does not import a phone number with the '+' sign in front of the number, the country code will be prefixed to the front of the number based on the $country_code property, resulting in a phone number with two country codes. |
| $first_name, $last_name, $name | Name      | User's first and last names, as well as a general name. These are primarily useful because we will use them, if available, in a few spots in our reports.                                                                                                                                                                                                                    |
| $avatar       | Avatar    | Set this property to a url resource of a gif, jpg, jpeg, or png to update the profile picture in a profile. This property will override a profile picture pulled from Gravatar.                                                                                                                                                                                           |
| $created      | Created   | The time that the profile was created.                                                                                                                                                                                                                                                                                                                                  |
| $city         | City      | The city of the event sender, parsed from IP.                                                                                                                                                                                                                                                                                                                           |
| $region       | Region    | The region (state or province) of the event sender, parsed from IP.                                                                                                                                                                                                                                                                                                     |
| $country_code | Country   | The country of the event sender, parsed from IP.                                                                                                                                                                                                                                                                                                                        |
| $timezone     | Timezone  | The timezone of the event sender, parsed from IP. If set, messages can be scheduled to be sent based on a user's timezone.                                                                                                                                                                                                                                              |
| $bucket       | Bucket    | A reserved property that is hidden from the Mixpanel interface, and will cause other events to not appear in the interface. Do not name any property bucket or $bucket.                                                                                                                                                                                                   |



## FAQ

### What should I send as a User Profile Property vs an Event Property?
We recommend primarily using User Profile Properties to track demographic attributes of the user, like their name, email, and domain. Most other properties are better tracked as [Event Properties](/docs/tracking/how-tos/events-and-properties).

That said, User Profile Properties are as flexible as any other properties in Mixpanel, so you can send arbitrary JSON.

### How does Mixpanel join Events and User Profiles?
Mixpanel stores Events and User Profiles in two separate tables under the hood. These two tables are joined at query-time, rather than ingestion-time. This means that when you make a report in our UI that uses User Profiles, we run a query that joins the Events table with the User Profiles table.  This has two implications:

* If you track User Profiles after you track events, they'll still join retroactively with all past events. This means that you don't need to worry about tracking Events and User Profiles in lockstep with each other. As long as they have the same values for Distinct ID, they'll join with each other.
* All Events join with the latest state of a User Profile, rather than its state at a point in time. If there are aspects of a user's state that change over time (for example, their plan type), we recommend tracking that as a property on their events, so that you can analyze that change over time.

### How can I update User Profile Properties?
User Profiles are mutable; Mixpanel only stores the latest value of each profile property. We have methods to update profile properties via our [HTTP API](https://developer.mixpanel.com/reference/profile-set).

### How can I send User Profiles if I use Segment?
Mixpanel is 100% compatible with Segment; just follow Segment's best practices. If you call the [`analytics.identify()`](https://segment.com/docs/connections/spec/identify/) method, Segment will create a User Profile in Mixpanel. You can learn more about our integration in Segment's [docs](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/#identify-user).

### What does the Updated At property mean?
User Profiles are mutable, which means new ones can be added and existing ones can be updated or deleted. Mixpanel automatically maintains an Updated At property, which contains the last timestamp that a user profile was updated. Updated At does not change if the user does a new event; it only changes when the profile is updated.

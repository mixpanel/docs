# User Profiles

> <b>Note:</b> The following terms are used in this section:
> - "User Profile Properties" and "User Properties" are used interchangeableaby to refer to properties under a User Profile
> - "Group Profile Properties" and "Group Properties" are used interchangeableaby to refer to properties under a Group Profile
> - "Profiles" is used to refer to both "User Profiles" and "Group Profiles"
> - "Profile Properties" is used to refer to both "User Profile Properties" and "Group Profile Properties"

## Overview

User Profiles let you enrich events with demographic attributes (i.e. user properties) about the users that performed those events. User profiles are optional and we recommend starting with events and only adding user profiles if you need them.

A user profile has a set of properties associated with a given user. Under the hood, Mixpanel stores user profiles for your project in a table wherein each user's profile is 1 row with user properties (e.g. Name, Email, Department) that can be updated:

| **Distinct ID** | **Name** | **Email** | **Department** |
| --------------- | -------- | --------- | -------------- |
| 123 | Alice | `alice@linear.app` | Engineering |
| 456 | Bob | `bob@notion.so` | Product |
| 789 | Carol | `carol@figma.com` | Design |

User profiles are joined onto your events based on their <b>[Distinct ID](/docs/tracking-methods/id-management/identifying-users#what-is-distinct-id)</b> (Mixpanel's identifier for a user). This lets you join the events performed by a user with properties about who that user is. Thus, it's very important that you use the same Distinct ID for both the events and user profile for the same user.

For more information about user profiles refer to the documentation on [The Mixpanel Data Model](/docs/tutorials/plan/tracking-strategy#the-mixpanel-data-model). 

> <b>Note:</b> If you have [Group Analytics](/docs/data-structure/advanced/group-analytics) as an add-on, this section also applies to [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles).

## Importing User Profiles via our API

You can create or update User Profiles in similar ways you track events: from our [SDKs](/docs/tracking-methods/sdks/javascript#storing-user-profiles), via our [HTTP Engage API](https://developer.mixpanel.com/reference/profile-set), [Warehous Connectors](/docs/tracking-methods/data-warehouse/sending-user-profiles), or via our integrations partners.

We recommend tracking user profiles from as close as possible to the source of truth, which is usually your application database or your CRM. One typical approach (especially for [Server-Side Tracking](/docs/tracking-methods/choosing-the-right-method#server-side-tracking)) is to run an hourly or daily script on your servers that pulls the list of user profiles from your database and pushes them to Mixpanel.

Similiarly for [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles), they can be created or updated using our [SDKs](/docs/tracking-methods/sdks/javascript#creating-group-profiles), via our [HTTP Groups API](https://developer.mixpanel.com/reference/group-set-property), [Warehous Connectors](/docs/tracking-methods/data-warehouse/sending-group-profiles), or via our integration partners.

### Operators

<b>Setting profile property</b>

- `$set` - Sets a profile property or updates a profile property value (if it already exists).
- `$set_once` - Sets a profile property only if they do not yet exist on Mixpanel. This ensures that the previous profile property value is not overwritten.

<b>Updating numeric user profile property</b>

- `$add` - Increments or decrements a numeric user profile property <i>(not supported in group profiles)</i>. To increment, pass in a positive numeric value, and to decrement pass in a negative numeric value. If the property does not yet exist, it will set the value passed in as the initial value.

<b>Updating list profile property</b>

- `$union` - Merges a given value or list into a [List](/docs/data-structure/property-reference#list) data type profile property and ensures there are no duplicate values.
- `$append` - Appends a value to the end of a [List](/docs/data-structure/property-reference#list) data type user profile property <i>(not supported in group profiles)</i>. Does not check for duplicate values.
- `$remove` - Removes a value from a [List](/docs/data-structure/property-reference#list) data type profile property.

<b>Removing profile properties</b>
- `$unset` - Removes a profile property from the profile.
- `$delete` - Removes all profile properties from the profile.

Here's some sample code to get you started, utilizing the `$set` operator to update user profiles:

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

    # Note: we set `$ip` to 0 here to tell Mixpanel not to look up the IP of this user.
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

To get started, click on <b>Add/Edit Profile</b> from the [Users](https://mixpanel.com/report/users) page and follow the workflow below:

![/Screen_Shot_2021-12-01_at_11.44.03_AM.png](/Screen_Shot_2021-12-01_at_11.44.03_AM.png)

### Importing (Create or Modify) a Single User Profile

#### Set an Identifier Column

The most important column is `$distinct_id` for user profiles (or `$group_id` for [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles)). The value needs to match the `distinct_id` property's value (or the value for the [Group Key](/docs/data-structure/advanced/group-analytics#implementation)'s Group ID) that you're sending on your events.

#### Add Additional Properties

After `$distinct_id`, you can add additional properties to the profile by pressing the <b>"+ Add Property"</b> button. Mixpanel will help autocomplete profile properties that you may want to set.

![/Screen_Shot_2021-12-01_at_12.20.27_PM.png](/Screen_Shot_2021-12-01_at_12.20.27_PM.png)

We recommend using the `$name` (or `$first_name`, `$last_name`), `$email`, and `$phone` [Reserved Profile Properties](/docs/data-structure/user-profiles#reserved-profile-properties)) if you're uploading a user's name, email, or phone. Mixpanel shows these properties by default in various parts of our UI and are used for [Cohort Syncs](/docs/cohort-sync/overview) as well.

### Importing from CSV

When preparing the CSV that you want to upload as profiles, you should <b>not</b> include column headers (e.g., \$name, \$email,  etc.). Instead, you’ll identify column headers through the CSV upload wizard in the Mixpanel UI.

<b>Note</b>:
- If you import profiles using `$distinct_id` (or `$group_id`) values that already exist, those profiles will be updated with the additional profile properties. On the other hand, if you upload a profile that has the same email address or the same name as another existing profile, but a different `$distinct_id` (or `$group_id`), you will be uploading duplicates - they will not be combined.
- If you upload a CSV with new information for existing properties on existing profiles, the existing property values will be overwritten. If the new information is for new properties on existing profiles, it will be added as additional properties for the profiles. 
- The maximum size for your CSV should be 1M rows.

#### Upload Your CSV

Go the the <b>Import from CSV</b> tab and select your prepared CSV to begin the process.

#### Choose an Identifier Column

The most important column in your CSV is the `$distinct_id` for user profiles (or `$group_id` for [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles)). The value needs to match the `distinct_id` property's value (or the value for the [Group Key](/docs/data-structure/advanced/group-analytics#implementation)'s Group ID) that you're sending on your events.

If you do not assign an identifier column, Mixpanel will use your `$email` column as the `$distinct_id` (or `$group_id`) value; if you don’t have an `$email` column either, then the `$distinct_id` (or `$group_id`) value will be assigned randomly by default. Thus, it is highly recommended that you assign an identifier column to avoid unexpected results.

#### Choose Desired CSV Columns

![/Screen_Shot_2021-12-01_at_12.24.00_PM.png](/Screen_Shot_2021-12-01_at_12.24.00_PM.png)

You'll have the opportunity to look through all columns in the CSV to preview their values. In this step, you must <b>uncheck all columns that you DO NOT wish to import</b>. You must also choose the associated Mixpanel profile property that each CSV column will be associated with. When you're done selecting the columns, and mapping their associated properties, press the <b>Import profiles</b> button to proceed.

## Deleting User Profiles

User Profiles can be deleted either via the [Users](https://mixpanel.com/report/users) page or programmatically via our [Engage API](https://developer.mixpanel.com/reference/delete-profile). We also provide a `people_delete` method in the mixpanel-utils library [here](https://github.com/mixpanel/mixpanel-utils#people-delete).

Similiarly, [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles) can also be deleted either via the [Users](https://mixpanel.com/report/users) page or programmatically via our [Groups API](https://developer.mixpanel.com/reference/delete-group).

## Reserved Profile Properties

Mixpanel reserves certain profile property names for special processing or for specific system features. These properties, when populated, will affect the way Mixpanel processes your data.

> <b>Note:</b> Also refer to the list of Mixpanel [Default Properties](/docs/data-structure/property-reference#default-properties) indicated in our documentation.

| **Raw Name** | **Display Name** | **Description** |
| ------------ | ---------------- | --------------- |
| $distinct_id | Distinct ID | Mixpanel's internal unique identifier for a user / group profile. See [Identifying Users](/docs/tracking-methods/id-management/identifying-users) and [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles) | 
| $name, <br /> $first_name, <br /> $last_name | Name, <br /> First Name, <br /> Last Name | The user's / group's general name, as well as, first and last names. These are primarily useful because they are used, if available, in various Mixpanel UI / reports. For user [Cohort Syncs](/docs/cohort-sync/overview) only `$first_name` and `$last_name` is exported. |
| $email | Email | The user's / group's email address. You must set this property if you want to send users email via partners receiving our user [Cohort Syncs](/docs/cohort-sync/overview). | $phone | Phone | The user's / group's phone number. You must set this property if you want to send users SMS via partners receiving our user [Cohort Syncs](/docs/cohort-sync/overview). Note that a '+' needs to precede international phone numbers. If the user does not import a phone number with the '+' sign in front, the country code will be prefixed to the front of the number based on the $country_code default property, resulting in a phone number with two country codes. |
| $avatar | Avatar URL | Set this property to a url resource of a gif, jpg, jpeg, or png to update the profile picture in a user / group profile. This property will override a profile picture pulled from [Gravatar](https://gravatar.com/). |
| $created | Created | The time that the profile was created. Note that this is not auto-populated. |
| $mp_first_event_time | First Seen | Mixpanel calculated property that represents the time of the user's very first event in Mixpanel. This can be used to filter/segment reports by users who were "new" in a particular timeframe. |

## FAQ

### What should I send as a User Profile Property vs an Event Property?
We recommend primarily using User Profile Properties to track demographic attributes of the user, like their name, email, and domain. Most other properties are better tracked as [Event Properties](/docs/data-structure/events-and-properties).

That said, User Profile Properties are as flexible as any other properties in Mixpanel, so you can send arbitrary JSON.

### How does Mixpanel join Events and User Profiles?
Mixpanel stores Events and User Profiles in two separate tables under the hood. These two tables are joined at query-time, rather than ingestion-time. This means that when you make a report in our UI that uses User Profiles, we run a query that joins the Events table with the User Profiles table.  This has two implications:

* If you track User Profiles after you track events, they'll still join retroactively with all past events. This means that you don't need to worry about tracking Events and User Profiles in lockstep with each other. As long as they have the same values for Distinct ID, they'll join with each other.
* All Events join with the latest state of a User Profile, rather than its state at a point in time. If there are aspects of a user's state that change over time (for example, their plan type), we recommend tracking that as a property on their events, so that you can analyze that change over time.

### How can I update User Profile Properties?
User Profiles are mutable; Mixpanel only stores the latest value of each profile property. We have methods to update profile properties via our [HTTP API](https://developer.mixpanel.com/reference/profile-set).

### What are the limits of User Profile Properties?
Each User Profile can contain up to 2000 properties. User property names can be at most 255 characters in length (longer names are truncated). User property values are limited based on data type, refer to these limits under [Supported Data Types](/docs/data-structure/property-reference#supported-data-types).

Attempts to add more than 2000 user properties for a user profile will fail. You can remove user profile properties using the [$unset](https://developer.mixpanel.com/reference/profile-delete-property) engage operation if you find yourself close to the 2000 per profile limit.

### How can I send User Profiles if I use Segment?
Mixpanel is 100% compatible with Segment; just follow Segment's best practices. If you call the [`analytics.identify()`](https://segment.com/docs/connections/spec/identify/) method, Segment will create a User Profile in Mixpanel. You can learn more about our integration in Segment's [docs](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/#identify-user).

### What does the "Updated at" ($last_seen) property mean?
User Profiles are mutable, which means new ones can be added and existing ones can be updated or deleted. Mixpanel automatically maintains an "Updated at" (`$last_seen`) property, which contains the last timestamp that a user profile was updated. "Updated at" does not change if the user does a new event; it only changes when the profile is updated. "Updated at" also does not change for profile updates made via the UI or if `$ignore_time` paramater is set to `true` (see example from [PHP SDK](/docs/tracking-methods/sdks/php#setting-profile-properties)).

### Where can I learn more about Group Profiles?
You can get an overview of how Group Profiles relate to Mixpanel's Data Model under the section [Group Level Behaviours and Demographics](/docs/tutorials/plan/tracking-strategy#group-level-behaviours-and-demographics) in our tutorials. A more detailed explanation of [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles) is documented under our [Group Analytics](/docs/data-structure/advanced/group-analytics) page.

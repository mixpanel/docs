# User Profiles

## Overview

User Profiles let you enrich events with demographic attributes (i.e. user properties) about the users that performed those events. User profiles are optional and we recommend starting with events and only adding user profiles if you need them.

A user profile has a set of properties associated with a given user. Under the hood, Mixpanel stores user profiles for your project in a table wherein each user's profile is 1 row with profile / user properties (e.g. Name, Email, Department) that can be updated:

| **Distinct ID** | **Name** | **Email** | **Department** |
| --------------- | -------- | --------- | -------------- |
| 123 | Alice | `alice@linear.app` | Engineering |
| 456 | Bob | `bob@notion.so` | Product |
| 789 | Carol | `carol@figma.com` | Design |

User profiles are joined onto your events based on their <b>[Distinct ID](/docs/tracking-methods/id-management/identifying-users#what-is-distinct-id)</b> (Mixpanel's identifier for a user). This lets you join the events performed by a user with properties about who that user is. Thus, it's very important that you use the same Distinct ID for both the events and user profile for the same user.

For more information about user profiles refer to the documentation on [The Mixpanel Data Model](/docs/tutorials/plan/tracking-strategy#the-mixpanel-data-model).

## Importing User Profiles via our API

You can track User Profiles to Mixpanel in similar ways you track events: from our [SDKs](/docs/tracking-methods/sdks/javascript), via our [HTTP API](https://developer.mixpanel.com/reference/profile-set), [Warehous Connectors](/docs/tracking-methods/data-warehouse/sending-user-profiles), or via our [Integrations](/docs/tracking-methods/integrations/amazon-s3).

We recommend tracking user profiles from as close as possible to the source of truth, which is usually your application database or your CRM. One typical approach (especially for [Server-Side Tracking(/docs/tracking-methods/choosing-the-right-method#server-side-tracking)) is to run an hourly or daily script on your servers that pulls the list of profiles from your database and pushes them to Mixpanel.

### Operators

<b>Setting profile property</b>

- `$set` - Sets a profile property or updates a profile property value (if it already exists).
- `$set_once` - Sets a profile property only if they do not yet exist on Mixpanel. This ensures that the previous profile property value is not overwritten.

<b>Updating numeric profile property</b>

- `$add` - Increments or decrements a numeric profile property. To increment, pass in a positive numeric value, and to decrement pass in a negative numeric value. If the property does not yet exist, it will set the value passed in as the initial value.

<b>Updating list profile property</b>

- `$union` - Merges a given value or list into a [List](/docs/data-structure/property-reference#list) data type profile property and ensures there are no duplicate values.
- `$append` - Appends a value to the end of a [List](/docs/data-structure/property-reference#list) data type profile property. Does not check for duplicate values.
- `$remove` - Removes a value from a [List](/docs/data-structure/property-reference#list) data type profile property.

<b>Removing profile properties</b>
- `$unset` - Removes a profile property from the user profile.
- `$delete` - Removes all profile properties from the user profile.

Here's some sample code to get you started, utilizing the `$set` operator:

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

The most important column is `$distinct_id` for user profiles (or `$group_id` for [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles)). The value needs to match the `distinct_id` property's value (or the value for the [Group Key](/docs/data-structure/advanced/group-analytics#implementation)) that you're sending on your events.

#### Add Additional Properties

After `$distinct_id`, you can add additional properties to the profile by pressing the <b>"+ Add Property"</b> button. Mixpanel will help autocomplete profile properties that you may want to set.

![/Screen_Shot_2021-12-01_at_12.20.27_PM.png](/Screen_Shot_2021-12-01_at_12.20.27_PM.png)

We recommend using the `$name` (or `$first_name`, `$last_name`), `$email`, and `$phone` [Reserved User Properties](#reserved-user-properties) if you're uploading a user's name, email, or phone. Mixpanel shows these properties by default in various parts of our UI and are used for [Cohort Syncs](/docs/cohort-sync/overview) as well.

### Importing from CSV

When preparing the CSV that you want to upload as profiles, you should <b>not</b> include column headers (e.g., $name, $email,  etc.). Instead, you’ll identify column headers through the CSV upload wizard in the Mixpanel UI.

<b>Note</b>:
- If you import user profiles using \$distinct_id values that already exist, those profiles will be updated with the additional user profile properties. On the other hand, if you upload user profiles that have the same email address or the same name as existing user profiles but a different \$distinct_id, you will be uploading duplicates - they will not be combined.
- If you upload a CSV with new information for existing properties on existing users, the existing property values will be overwritten. If the new information is for new properties on existing users, it will be added as an additional property for the user. 
- The maximum size for your CSV should be 1M rows.

#### Upload Your CSV

Go the the <b>Import from CSV</b> tab and select your prepared CSV to begin the process.

#### Choose an Identifier Column

The most important column in your CSV is the `$distinct_id` for user profiles (or `$group_id` for [Group Profiles](/docs/data-structure/advanced/group-analytics#group-profiles)). The value needs to match the `distinct_id` property's value (or the value for the [Group Key](/docs/data-structure/advanced/group-analytics#implementation)) that you're sending on your events.

If you do not assign an identifier column, Mixpanel will use your `$email` column as the `$distinct_id` value; if you don’t have an `$email` column either, then the `$distinct_id` value will be assigned randomly by default as described above.

#### Choose Desired CSV Columns

![/Screen_Shot_2021-12-01_at_12.24.00_PM.png](/Screen_Shot_2021-12-01_at_12.24.00_PM.png)

You'll have the opportunity to look through all columns in the CSV to preview their values. In this step, you must <b>uncheck all columns that you DO NOT wish to import</b>. You must also choose the associated Mixpanel profile property that each CSV column will be associated with. When you're done selecting the columns, and mapping their associated properties, press the <b>Import profiles</b> button to proceed.

## Deleting User Profiles

User Profiles can be deleted either via the [Users](https://mixpanel.com/report/users) page or programmatically via our [API](https://developer.mixpanel.com/reference/delete-profile). We also provide a `people_delete` method in the mixpanel-utils library [here](https://github.com/mixpanel/mixpanel-utils#people-delete).

## Reserved User Properties

Mixpanel reserves certain user property names; these properties receive special treatment in our UI or are used for special processing.

| Name          | Display   | Description                                                                                                                                                                                                                                                                                                                                                             |
|---------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $email        | Email     | The user's email address. You must set this property if you want to send users email from Mixpanel.                                                                                                                                                                                                                                                                    |
| $phone        | Phone     | The user's phone number. You must set this property if you want to send users SMS from Mixpanel. Note that a '+' needs to precede phone numbers. This is especially useful for international numbers. If the user does not import a phone number with the '+' sign in front of the number, the country code will be prefixed to the front of the number based on the $country_code property, resulting in a phone number with two country codes. |
| \$first_name, \$last_name, $name | Name      | User's first and last names, as well as a general name. These are primarily useful because we will use them, if available, in a few spots in our reports.                                                                                                                                                                                                                    |
| $avatar       | Avatar    | Set this property to a url resource of a gif, jpg, jpeg, or png to update the profile picture in a profile. This property will override a profile picture pulled from Gravatar.                                                                                                                                                                                           |
| $created      | Created   | The time that the profile was created.                                                                                                                                                                                                                                                                                                                                  |
| $city         | City      | The city of the event sender, parsed from IP.                                                                                                                                                                                                                                                                                                                           |
| $region       | Region    | The region (state or province) of the event sender, parsed from IP.                                                                                                                                                                                                                                                                                                     |
| $country_code | Country Code  | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI.                                                                                                                                                                                                                                                                                                                      |
| $timezone     | Timezone  | The timezone of the event sender, parsed from IP. If set, messages can be scheduled to be sent based on a user's timezone.                                                                                                                                                                                                                                              |
| $bucket       | Bucket    | A reserved property that is hidden from the Mixpanel interface, and will cause other events to not appear in the interface. Do not name any property bucket or $bucket.                                                                                                                                                                                                   |



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

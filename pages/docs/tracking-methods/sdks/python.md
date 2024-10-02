# Mixpanel SDKs: Python

The Mixpanel Python library is designed to be used for scripting, or in circumstances when a user isn't directly interacting with your application on the web or a mobile device.

The [Full API Reference](http://mixpanel.github.io/mixpanel-python), [Library Source Code](https://github.com/mixpanel/mixpanel-python), and an [Example Script](https://github.com/mixpanel/mixpanel-python/tree/master/demo) is documented in our GitHub repo.

## Installing the Library

You can get the library using pip.
```shell
pip install mixpanel
```

Once the library is installed, use the Mixpanel library in your applications with:

```py
from mixpanel import Mixpanel
mp = Mixpanel("YOUR_TOKEN")
```

## EU Data Residency

Route data to Mixpanel's EU servers by using a custom `Consumer`
```py
import mixpanel
mp_eu = mixpanel.Mixpanel(
  "YOUR_TOKEN",
  consumer=mixpanel.Consumer(api_host="api-eu.mixpanel.com"),
)
```

## Sending Events

Mixpanel events are sent using an instance of the Mixpanel class.

You can instantiate an instance of Mixpanel with a String containing your Mixpanel project token. You can find your project token in the settings dialog of the Mixpanel web application.

Once you have an instance of the tracker, you can track events by providing the event name and properties to [`Mixpanel.track()`](http://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.track).
```python
from mixpanel import Mixpanel

mp = Mixpanel(PROJECT_TOKEN)

## Tracks an event, 'Sent Message',
## with distinct_id user_id
mp.track(user_id, 'Sent Message')

## You can also include properties to describe
## the circumstances of the event
mp.track(user_id, 'Plan Upgraded', {
    'Old Plan': 'Business',
    'New Plan': 'Premium'
})
```

Mixpanel can determine default geolocation data (\$city, \$region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your data center. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).


## Storing User Profiles

In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

Mixpanel determines default geolocation data (\$city, \$region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your data center. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

### Setting Profile Properties
Instances of Mixpanel have a method to send profile updates.

```python
## create or update a profile with First Name, Last Name,
## E-Mail Address, Phone Number, and Favorite Color
## without updating geolocation data or $last_seen
mp.people_set('12345', {
    '$first_name'    : 'John',
    '$last_name'     : 'Doe',
    '$email'         : 'john.doe@example.com',
    '$phone'         : '5555555555',
    'Favorite Color' : 'red'
}, meta = {'$ignore_time' : True, '$ip' : 0})
```

This call to [`people_set()`](http://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.people_set) will change the value of properties on user 12345's profile. If there isn't a profile with distinct_id 12345 in Mixpanel already, a new profile will be created. If user 12345 already has has any of these properties set on their profile, the old values will be overwritten with the new ones.

### Other Types of Profile Updates
There are a few other types of profile updates. You can get more information about them from the [Mixpanel Library API Reference](https://mixpanel.github.io/mixpanel-python).

## Group Analytics

Mixpanel Group Analytics is a paid add-on that allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` allows analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/data-structure/advanced/group-analytics) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “Company” is chosen for Group Analytics, “Company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values.

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

### Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.

### Sending Group Identifiers With Events
To send group identifiers with events, send the `group_key` as a property key and the `group_id` as the property value. The data type of the `group_key` property is a list, therefore you can add multiple values for a single user. It is also possible to pass only one value.

Mixpanel can group events by the `group_id`, similar to how events are grouped with the `distinct_id`. A `group_id`, however, is a group level identifier and not a user level identifier like the `distinct_id`.

Note that sending in a `group_key` and `group_id` as event properties does not add users to the group profile or assign group membership to the user's profile. Only **events** with your chosen `group_key` property set will be available for behavioral analysis at the group level. See the sections following the code example to learn how to add users to a group profile or add a group to the user's profile.

```python
## Tracks an event named 'Plan Purchase',
## with the distinct_id as user_id and a
## group_key = Company with a group_id = Mixpanel
mp.track(user_id, 'Plan Purchase', {'Plan Type' : 'Premium', 'Company' : 'mixpanel'})
```

### Adding Group Identifiers to Individual Users
To connect group information to a user profile, include the `group_key` and `group_id` by sending the property as part of the [`people_set()`](https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.people_set) call.
```python
## Create or update a user profile with 'first name', 'last name',
## 'favorite color' properties, and a group_id = company
## with a group_key = Mixpanel
mp.people_set('12345', {
    '$first_name'    : 'John',
    '$last_name'     : 'Doe',
    'Favorite Color' : 'red',
    'Company'        : 'Mixpanel',
}, meta = {'$ignore_time' : True, '$ip' : 0})
```
### Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call a property-setting method like [`group_set()`](https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_set) to create a group profile. It is important to include the `group_key`, `group_id`, and at least one property so that the profile is not empty.

```py Python
## Create a group profile with group_key = Company,
## group_id = mixpanel,
## and assign the property "company type" with value "Analytics"
## to the profile
mp.group_set('Company', 'mixpanel', {'Company Type': 'Analytics', '$name': 'Mixpanel'})
```

### Setting Group Properties
You can add details to Group Profiles by adding properties to them. These operations are similar to the corresponding operations for user profile property updates.

You can set the property `$name` to populate the name field at the top of the group profile.

#### set
[`group_set()`](https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_set) updates or adds properties to a group profile. The profile is created if it does not exist.

```py Python
## Create a group profile with group_key = Company,
## group_id = mixpanel,
## and assign the property "company type" with value "Analytics"
## to the profile
mp.group_set('Company', 'mixpanel', {'Company Type': 'Analytics', '$name': 'Mixpanel'})
```

See all Group methods in our [reference](https://mixpanel.github.io/mixpanel-python/).

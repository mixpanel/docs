---
title: "Python - Advanced"
slug: "python"
hidden: false
metadata: 
  title: "SDK Integration: Python library | Mixpanel Developer Docs"
  description: "Mixpanel's Python library is designed to be used for scripting, or in circumstances when a user isn't directly interacting with your application. Learn more here."
createdAt: "2018-04-12T18:57:57.678Z"
updatedAt: "2023-03-26T20:07:00.387Z"
---
The Mixpanel Python library is designed to be used for scripting, or in circumstances when a user isn't directly interacting with your application on the web or a mobile device.

# Installing the Library

You can get the library using pip.
[block:code]
{
  "codes": [
    {
      "code": "pip install mixpanel",
      "language": "shell"
    }
  ]
}
[/block]
Once the library is installed, use the Mixpanel library in your applications with:

```py
from mixpanel import Mixpanel
mp = Mixpanel("YOUR_TOKEN")
```

# EU Data Residency

Route data to Mixpanel's EU servers by using a custom `Consumer`
```py
import mixpanel
mp_eu = mixpanel.Mixpanel(
  "YOUR_TOKEN",
  consumer=mixpanel.Consumer(api_host="api-eu.mixpanel.com"),
)
```

# Sending Events

Mixpanel events are sent using an instance of the Mixpanel class.

You can instantiate an instance of Mixpanel with a String containing your Mixpanel project token. You can find your project token in the settings dialog of the Mixpanel web application.

Once you have an instance of the tracker, you can track events by providing the event name and properties to <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.track">Mixpanel.track()</a>.
[block:code]
{
  "codes": [
    {
      "code": "from mixpanel import Mixpanel\n\nmp = Mixpanel(PROJECT_TOKEN)\n\n# Tracks an event, 'Sent Message',\n# with distinct_id user_id\nmp.track(user_id, 'Sent Message')\n\n# You can also include properties to describe\n# the circumstances of the event\nmp.track(user_id, 'Plan Upgraded', {\n    'Old Plan': 'Business',\n    'New Plan': 'Premium'\n})",
      "language": "python"
    }
  ]
}
[/block]
Mixpanel can determine default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

# Managing User Identity

Mixpanel groups events sent with different distinct_ids, presenting them in reports as different user event streams. You can connect events with different distinct_ids using [alias, identify, or merge](doc:events#track-event), ultimately attributing them to one user.
[block:callout]
{
  "type": "info",
  "body": "If a project has [ID merge enabled](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge), the `$identify` event can connect pre- and post-authentication events. If ID merge is not enabled, identify events will not link identities however alias can be used to connect pre and post registration events.",
  "title": "ID Merge"
}
[/block]
###Alias
The `alias` method creates an alias which Mixpanel will use to remap one distinct_id to another. Multiple aliases can point to the same identifier.

[block:callout]
{
  "type": "info",
  "title": "ID Merge",
  "body": "If a project has [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) enabled,  just call identify with your chosen identifier as soon as you know who the user is to merge anonymous and identified distinct_ids. Calling alias is no longer required."
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**alias**",
    "0-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
    "0-2": "A unique identifier that you want to use as an identifier for this user.",
    "1-0": "**distinct_id**",
    "1-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: green\">optional</span>",
    "1-2": "The current user identifier."
  },
  "cols": 3,
  "rows": 2
}
[/block]
The following is a valid use of `alias`:
[block:code]
{
  "codes": [
    {
      "code": "\nmp.alias(new_id, original_anonymous_id)\n#Create a second alias\nmp.alias(new_second_id, original_anonymous_id)",
      "language": "python"
    }
  ]
}
[/block]
Aliases can also be chained. You **cannot** point to multiple identifiers.
[block:callout]
{
  "type": "danger",
  "title": "ID Merge",
  "body": "If a project does not have [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) enabled, the best practice is to call `alias` once when a unique ID is first created for a user (e.g., when a user first registers for an account)."
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Aliases don't take effect until the alias request hits the Mixpanel server. Because of this, you'll need to take special care if you're using Mixpanel.alias() with a custom consumer, so you can be sure that your alias message arrives before any events or updates associated with the new alias.",
  "title": "NOTE"
}
[/block]
# Storing User Profiles

In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

Mixpanel determines default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

## Setting Profile Properties
Instances of Mixpanel have a method to send profile updates.
[block:code]
{
  "codes": [
    {
      "code": "# create or update a profile with First Name, Last Name,\n# E-Mail Address, Phone Number, and Favorite Color\n# without updating geolocation data or $last_seen\nmp.people_set('12345', {\n    '$first_name'    : 'John',\n    '$last_name'     : 'Doe',\n    '$email'         : 'john.doe@example.com',\n    '$phone'         : '5555555555',\n    'Favorite Color' : 'red'\n}, meta = {'$ignore_time' : True, '$ip' : 0})",
      "language": "python"
    }
  ]
}
[/block]
This call to <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.people_set">people_set()</a> will change the value of properties on user 12345's profile. If there isn't a profile with distinct_id 12345 in Mixpanel already, a new profile will be created. If user 12345 already has has any of these properties set on their profile, the old values will be overwritten with the new ones.
[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Pick your property names wisely. Once you've sent them to Mixpanel, there is no way to change them. Feel free to use capitalization and spaces in between words. \nThere are a few limitations:\n\n* Your property names should not begin with `$` or `mp_`. These properties are reserved for special properties sent by Mixpanel.\n* Your property names cannot begin or end with a space as they will automatically be trimmed.\n* Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.\n\nClick [here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties."
}
[/block]
## Appending to List Properties
Use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.people_append">people_append()</a> to add an item to an existing list-valued property. The values you send with the append will be added to the end of the list for each named property. If the property doesn't exist, it will be created with a one element list as its value.
[block:code]
{
  "codes": [
    {
      "code": "mp.people_append('12345', {\n    'Favorite Fruits' : 'Apples'\n})",
      "language": "python"
    }
  ]
}
[/block]
##Other Types of Profile Updates
There are a few other types of profile updates. You can get more information about them from the [Mixpanel Library API Reference](https://mixpanel.github.io/mixpanel-python).

# Group Analytics

Mixpanel Group Analytics allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` allows analysis at a company or group level when using Mixpanel analytics. Read [this article](https://help.mixpanel.com/hc/en-us/articles/360025333632) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “Company” is chosen for Group Analytics, “Company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.
[block:callout]
{
  "type": "info",
  "body": "To start tracking groups data, [add group keys in project settings](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics#implementation). If you don't see group keys in your Project Settings, reach out to the [Mixpanel Sales Team](https://mixpanel.com/group-analytics/) to purchase Group Analytics.",
  "title": "Add Group Keys"
}
[/block]
## Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f358337-Screen_Shot_2019-12-10_at_11.23.26_AM.png",
        "Screen Shot 2019-12-10 at 11.23.26 AM.png",
        1846,
        322,
        "#f8f9fb"
      ]
    }
  ]
}
[/block]
Enter an event property to attribute the group key to. You can also enter a display name for the group key. Click **Save**.

## Sending Group Identifiers With Events
To send group identifiers with events, send the `group_key` as a property key and the `group_id` as the property value. The data type of the `group_key` property is a list, therefore you can add multiple values for a single user. It is also possible to pass only one value.

Mixpanel can group events by the `group_id`, similar to how events are grouped with the `distinct_id`. A `group_id`, however, is a group level identifier and not a user level identifier like the `distinct_id`. 

Note that sending in a `group_key` and `group_id` as event properties does not add users to the group profile or assign group membership to the user's profile. Only **events** with your chosen `group_key` property set will be available for behavioral analysis at the group level. See the sections following the code example to learn how to add users to a group profile or add a group to the user's profile.
[block:code]
{
  "codes": [
    {
      "code": "# Tracks an event named 'Plan Purchase',\n# with the distinct_id as user_id and a \n# group_key = Company with a group_id = Mixpanel\nmp.track(user_id, 'Plan Purchase', {'Plan Type' : 'Premium', 'Company' : 'mixpanel'})",
      "language": "python"
    }
  ]
}
[/block]
## Adding Group Identifiers to Individual Users
To connect group information to a user profile, include the `group_key` and `group_id` by sending the property as part of the <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.people_set">people_set()</a> call. 
[block:code]
{
  "codes": [
    {
      "code": "# Create or update a user profile with 'first name', 'last name',\n# 'favorite color' properties, and a group_id = company\n# with a group_key = Mixpanel\nmp.people_set('12345', {\n    '$first_name'    : 'John',\n    '$last_name'     : 'Doe',\n    'Favorite Color' : 'red',\n    'Company'        : 'Mixpanel',\n}, meta = {'$ignore_time' : True, '$ip' : 0})",
      "language": "python"
    }
  ]
}
[/block]
## Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call a property-setting method like <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_set">group_set()</a> to create a group profile. It is important to include the `group_key`, `group_id`, and at least one property so that the profile is not empty.

```py Python
# Create a group profile with group_key = Company,
# group_id = mixpanel,
# and assign the property "company type" with value "Analytics"
# to the profile
mp.group_set('Company', 'mixpanel', {'Company Type': 'Analytics', '$name': 'Mixpanel'})
```
```
```

## Setting Group Properties
You can add details to Group Profiles by adding properties to them. These operations are similar to the corresponding operations for user profile property updates.

You can set the property `$name` to populate the name field at the top of the group profile.

### set
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_set">group_set()</a> updates or adds properties to a group profile. The profile is created if it does not exist.

```py Python
# Create a group profile with group_key = Company,
# group_id = mixpanel,
# and assign the property "company type" with value "Analytics"
# to the profile
mp.group_set('Company', 'mixpanel', {'Company Type': 'Analytics', '$name': 'Mixpanel'})
```
```
```

### set once
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_set_once">group_set_once()</a> adds properties to a group only if the property is not already set. The profile is created if it does not exist.

```py Python
# Create a group profile with group_key = Company,
# group_id = mixpanel
# and assign the property "company type" with value "Analytics"
# to the profile only if it is not already set
mp.group_set_once('Company', 'mixpanel', {'Company Type': 'Analytics'})
```
```
```

### unset
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_unset">group_unset()</a> unsets a property on the group profile.

```py Python
# Permanently removes the group profile property "Company Type" 
mp.group_unset('Company', 'mixpanel', ['Company Type'])
```
```
```

### union
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_union">group_union()</a> adds the specified values to a list property and ensures that those values only appear once. The profile is created if it does not exist.

```py Python
# Merge "Funnels" and "Messages" values into existing "Features" list
mp.group_union('Company', 'mixpanel', {'Features': ['Insights', 'Funnels']})
```
```
```

### remove
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_remove">group_remove()</a> removes a specific value in a list property.

```py Python
# Add two values in a list to "Company Type" property
mp.group_set('Company', 'mixpanel', {'Company Type': ['Hardware', 'Analytics'], '$name': 'Mixpanel'})

# Remove "Hardware" from the list of values for "Company Type" 
mp.group_remove('Company', 'mixpanel', {'Company Type': 'Hardware'})
```
```
```

### delete
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_delete">group_delete()</a> permanently deletes a group profile.

```py Python
# Delete the Mixpanel group profile
mp.group_delete('Company', 'mixpanel')
```
```
```

### update
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Mixpanel.group_update">group_update()</a> sends a generic group profile update.

Callers are responsible for formatting the update message as documented in the [Mixpanel HTTP specification](ref:group-profiles#group-set-property). This method may be useful if you want to use very new or experimental features, but please use the other `group_*` methods where possible.

# Scaling your Server-Side Tracking

By default, the Mixpanel class sends a request to Mixpanel immediately for every tracking message or profile update. This is convenient for getting started quickly, but almost all server-side use of the Mixpanel library will eventually want to do the IO associated with tracking in a separate thread or process from the events being tracked.

The Mixpanel library provides the <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-python/#mixpanel.Consumer">Consumer</a> class for finer control of your tracking IO.

In addition to your token, the Mixpanel constructor takes an optional `consumer` argument. This argument, if provided, should be an object with a method named `send()`, that takes three arguments:
[block:parameters]
{
  "data": {
    "0-0": "**endpoint** ",
    "h-1": "Type",
    "h-2": "Description",
    "h-0": "Argument",
    "0-1": "<span style=\"font-family: courier\">string</span>",
    "0-2": "Either the string 'events' for messages intended to go to the Mixpanel /track endpoint, the string 'people' for messages intended for the Mixpanel /people endpoint, or `imports` for event data sent to the /import endpoint.",
    "1-0": "**json_message** ",
    "1-1": "<span style=\"font-family: courier\">string</span>",
    "1-2": "A JSON message, encoded in a string, that can be used by the service at the named endpoint. The structure of meaningful JSON messages is described in [the Mixpanel HTTP API reference](ref:events#track-event).",
    "2-2": "Defaults to `None`. Include the project API key if the endpoint requires a key, such as “imports”, or the consumer is buffered.",
    "2-1": "<span style=\"font-family: courier\">string</span>",
    "2-0": "**api_key**"
  },
  "cols": 3,
  "rows": 3
}
[/block]
You can use the `send()` method of your Consumer to send your messages to a separate process, add them to a queue, or write them to a log.
[block:code]
{
  "codes": [
    {
      "code": "class LoggingConsumer(object):\n    def __init__(self):\n        self.mp_log = open(\"MIXPANEL_LOG.txt\", \"w+\")\n\n    def send(self, endpoint, json_message, api_key=None):\n        self.mp_log.write(\"{0}::{1}\\n\".format(endpoint, json_message))\n\n# Whenever you track with logging_mp, your messages will\n# be written to MIXPANEL_LOG.txt rather than being sent\n# to the Mixpanel servers\nlogging_mp = Mixpanel(YOUR_TOKEN, LoggingConsumer())",
      "language": "python"
    }
  ]
}
[/block]
Using a custom consumer is most powerful when you combine it with the existing consumers in the mixpanel module.
[block:code]
{
  "codes": [
    {
      "code": "import mixpanel\n\n# The default Mixpanel consumer will take\n# endpoints and messages and send them to Mixpanel\nconsumer = mixpanel.Consumer()\nwith open(\"MIXPANEL_LOG.txt\", \"r+\") as read_log:\n    for line in read_log:\n        (endpoint, message) = line.split('::', 1)\n        consumer.send(endpoint, message)",
      "language": "python"
    }
  ]
}
[/block]
The combination of package-provided consumers and your own custom consumer makes it simple to use the Mixpanel library with a queueing system. For example:
[block:code]
{
  "codes": [
    {
      "code": "# In your time-sensitive process\nclass EnqueueingConsumer(object):\n    def send(self, endpoint, json_message, api_key=None):\n        YOUR_QUEUE.set('mixpanel_queue', JSON.dumps([ endpoint, json_message ]))\n\nmp = mixpanel.Mixpanel(YOUR_TOKEN, EnqueueingConsumer())\n\n# Track just like you would in any other situation\nmp.track(user_id, 'Sent Message')\nmp.people_increment(user_id, {\n    'Messages Sent': 1\n})\n\n# In a worker process on another machine\nconsumer = mixpanel.Consumer()\nwhile True:\n    job = YOUR_QUEUE.get('mixpanel_queue')\n    consumer.send(*JSON.loads(job))",
      "language": "python"
    }
  ]
}
[/block]
For applications where overall load is light, but the latency of a particular process is an issue, you can also use [mixpanel-python-async](https://github.com/jessepollak/mixpanel-python-async), a third party consumer that processes tracking requests efficiently in a separate thread.
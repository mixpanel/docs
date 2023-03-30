---
title: "Node.js - Advanced"
slug: "nodejs"
hidden: false
metadata: 
  title: "SDK Integration: Node.js library | Mixpanel Developer Docs"
  description: "The Mixpanel Node.js library provides Mixpanel tracking functionality in server-side applications built using Node.js. Read our docs to learn more."
createdAt: "2018-12-06T23:05:14.379Z"
updatedAt: "2023-03-26T20:07:11.147Z"
---
The [Mixpanel Node.js library](https://github.com/mixpanel/mixpanel-node) will be most useful to you if you need to send data from a Node.js server, or for interacting with Mixpanel APIs in JavaScript outside of the browser (such as importing past events with a script).

# Installing the Library

Install the Mixpanel Node.js library and create a Mixpanel instance in order to begin Mixpanel tracking.

Use [npm](https://www.npmjs.com/) to install Mixpanel in your project by calling `npm install mixpanel`. The Mixpanel module will be available in the Node project after installing the library. 

Next, create a Mixpanel instance and initialize a Mixpanel client to communicate with Mixpanel servers. To do this, grab the Mixpanel factory and create an instance of the Mixpanel client by calling `mixpanel.init(YOUR_PROJECT_TOKEN)`.

The project token is unique to your Mixpanel project. [Instructions for finding your project token can be found here](https://help.mixpanel.com/hc/en-us/articles/115004502806).
[block:code]
{
  "codes": [
    {
      "code": "// grab the Mixpanel factory\nvar Mixpanel = require('mixpanel');\n\n// create an instance of the mixpanel client\nvar mixpanel = Mixpanel.init('<YOUR_TOKEN>');",
      "language": "javascript",
      "name": null
    }
  ]
}
[/block]
# EU Data Residency

Route data to Mixpanel's EU servers by setting the `host` config property.
```javascript
mixpanel.init(
  "YOUR_TOKEN",
  {
    host: "api-eu.mixpanel.com",
  },
);
```

# Sending Events

You can track events with `mixpanel.track()` after initializing a Mixpanel instance.

The `mixpanel.track()` method takes two arguments, an event name and a properties object which must include the [distinct_id](https://help.mixpanel.com/hc/en-us/articles/115004509406-Distinct-IDs-). 

You have the option to add additional event properties to the call to add detail to that event. [Read more about events and properties here](https://help.mixpanel.com/hc/en-us/articles/115004499343-Tracking-Geolocation-with-Server-Side-Implementation).
[block:code]
{
  "codes": [
    {
      "code": "var Mixpanel = require('mixpanel');\nvar mixpanel = Mixpanel.init('<YOUR_TOKEN>');\n\n// track an event with optional properties\nmixpanel.track('event name', {\n    distinct_id: 'unique client id',\n    property_1: 'value 1',\n    property_2: 'value 2',\n    property_3: 'value 3'\n});",
      "language": "javascript"
    }
  ]
}
[/block]
Mixpanel determines default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. This can have the unintended effect of setting the location of all of your users to the location of your datacenter in server-side implementations.

It is therefore important to pass IP as a property in server-side implementations. [Read about best practices for geolocation with server-side implementations](https://help.mixpanel.com/hc/en-us/articles/360000857366-Plan-Your-Implementation#events-and-properties).
[block:code]
{
  "codes": [
    {
      "code": "var Mixpanel = require('mixpanel');\nvar mixpanel = Mixpanel.init('<YOUR_TOKEN>');\n\n// track an event with optional properties\nmixpanel.track('event name', {\n    distinct_id: 'unique client id',\n    ip: '127.0.0.1'\n});",
      "language": "javascript"
    }
  ]
}
[/block]
# Managing User Identity

Mixpanel groups events sent with different distinct_ids, presenting them in reports as different user event streams. You can connect events with different distinct_ids using [alias, identify, or merge](ref:events#track-event), ultimately attributing them to one user.
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
      "code": "mixpanel.alias('new_id', 'existing_id');\n//You can add multiple id aliases to the existing id\nmixpanel.alias('newer_id', 'existing_id')",
      "language": "javascript"
    }
  ]
}
[/block]
Aliases can also be chained. You **cannot** point to multiple identifiers.. 
[block:callout]
{
  "type": "danger",
  "body": "If a project does not have [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) enabled, the best practice is to call `alias` once when a unique ID is first created for a user (e.g., when a user first registers for an account).",
  "title": "ID Merge"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Aliases don't take effect until the alias request hits the Mixpanel server. Because of this, you'll need to take special care if you're using `mixpanel.alias()` with a custom consumer, so you can be sure that your alias message arrives before any events or updates associated with the new alias."
}
[/block]
# Storing User Profiles

You can send user profile updates to Mixpanel in addition to sending events. 

Mixpanel can maintain a [profile of each of your users](https://help.mixpanel.com/hc/en-us/articles/115004501966-People-Profiles), storing information you know about them. 

A profile update changes the properties of a user profile, essentially changing the details tied to that profile or creating it if it does not exist.

You can use profiles and user profile properties to explore and segment users by who they are, in addition to what they did with event tracking. You can also use profiles to send messages, such as emails, SMS, or push notifications.

## Setting Profile Properties
You can update or create a [user profile](https://help.mixpanel.com/hc/en-us/articles/115004501966-People-Profiles) with `mixpanel.people.set()`. The first argument is distinct_id, and the second argument is a JSON list of the properties to add to or update the profile with. 

The following example sets a "Plan" property with a value "Premium", a first name, a last name, and a created date on the user's profile that has a distinct id of `13793`. 

Mixpanel automatically creates a new profile if there isn't already a profile with a distinct_id of `13793` in the project already.

If the user with a distinct_id of `13793` already has a property named "Plan" in their profile, the new value "Premium" overwrites the old value of "Free".
[block:code]
{
  "codes": [
    {
      "code": "// grab the Mixpanel factory\nvar Mixpanel = require('mixpanel');\nvar mixpanel = Mixpanel.init('<YOUR_TOKEN>');\n\n// create or update a user in Mixpanel\nmixpanel.people.set('13793', {\n    $first_name: 'Billy',\n    $last_name: 'Bob',\n    $created: (new Date('jan 1 2013')).toISOString(),\n    plan: 'premium',\n});",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Pick your property names wisely. Feel free to use capitalization and spaces in between words. \nThere are a few limitations:\n\n* Your property names should not begin with `$` or `mp_`. These properties are reserved for special properties sent by Mixpanel.\n* Your property names cannot begin or end with a space as they will automatically be trimmed.\n* Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.\n\nClick [here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties."
}
[/block]
## Incrementing Numeric Properties
You can use `mixpanel.people.increment()` to increment the current value of numeric properties. This is useful when tracking a running count of properties, such as games played, emails sent, or points earned.
[block:code]
{
  "codes": [
    {
      "code": "// increment a numeric property\nmixpanel.people.increment('13793', 'games_played');\n// increment a numeric property by a different amount\nmixpanel.people.increment('13793', 'points', 15);\n// increment multiple properties\nmixpanel.people.increment('13793', {'points': 10, 'games_played': 1});",
      "language": "javascript"
    }
  ]
}
[/block]
## Appending to List Properties
Use `mixpanel.people.append()` to add an item to an existing list-valued property.  

`mixpanel.people.append()` adds the values passed to it at the end of the list for each named property. Mixpanel creates a list containing one element as its value if the property does not already exist. 
[block:code]
{
  "codes": [
    {
      "code": "// append value to a list\nmixpanel.people.append('13793', 'awards', 'Great Player');\n// append multiple values to a list\nmixpanel.people.append('13793', {'awards': 'Great Player', 'levels_finished': 'Level 4'});",
      "language": "javascript"
    }
  ]
}
[/block]
## Other Types of Profile Updates
There are a few other types of profile updates. You can get more information about them from the "Quick Start" section of [the repository Readme](https://github.com/mixpanel/mixpanel-node) and [examples in the library code](https://github.com/mixpanel/mixpanel-node/blob/master/lib/people.js).

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
  "title": "Add Group Keys",
  "body": "To start tracking groups data, [add group keys in project settings](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics#implementation). If you don't see group keys in your Project Settings, reach out to the [Mixpanel Sales Team](https://mixpanel.com/group-analytics/) to purchase Group Analytics."
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
        "https://files.readme.io/6414306-Screen_Shot_2019-12-10_at_11.23.26_AM-1.png",
        "Screen_Shot_2019-12-10_at_11.23.26_AM-1.png",
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
      "code": "// Tracks an event named 'Plan Purchase',\n// with group_id = 'Company' and group_key = 'Mixpanel'\nmixpanel.track('Plan Purchase', {\n    distinct_id: 'unique client id',\n    'Plan Type': 'Premium',\n    Company: 'Mixpanel',\n});",
      "language": "javascript"
    }
  ]
}
[/block]
## Adding Group Identifiers to Individual Users
To connect group information to a user profile, include the `group_key` and `group_id` by sending the property as part of the <a style="font-family: courier" href="#setting-profile-properties">people.set()</a> call.
[block:code]
{
  "codes": [
    {
      "code": "// Create or update a user profile with group_id = Company,\n// group_key = Mixpanel along with name properties.\nmixpanel.people.set('13793', {\n    $first_name: 'Billy',\n    $last_name: 'Bob',\n    Company: 'Mixpanel',\n});",
      "language": "javascript"
    }
  ]
}
[/block]
## Creating Group Profiles
You can create a Group profile that is similar to a user profile. You must call `groups.set()`, `groups.set_once()` or `groups.union()` to create a group profile. It is important to include the group_key, group_id, and at least one property so that the profile is not empty.

```js JavaScript
// Create or update a group profile with group_key = Company,
// group_id = Mixpanel
mixpanel.groups.set('Company', 'Mixpanel', {
  $name: 'Mixpanel',
  Type: 'Analytics',
})
```
```
```

## Setting Group Properties
You can add details to Group Profiles by adding properties to them. These operations are similar to the corresponding operations for user profile property updates.

You can set the property `$name` to populate the name field at the top of the group profile.

### set
`groups.set()` updates or adds properties to a group profile. The profile is created if it does not exist.

```js JavaScript
// Create or update a group profile with group_key = Company,
// group_id = Mixpanel
mixpanel.groups.set('Company', 'Mixpanel', {
  $name: 'Mixpanel',
  Type: 'Analytics',
  tags: ['high ROI', ':)'],
})
```
```
```

### set_once
`groups.set_once()` adds properties to a group profile only if the property is not already set. The profile is created if it does not exist.

```js JavaScript
// Create or update a group profile with group_key = Company,
// group_id = Mixpanel, only setting the properties that are not
// already set.
mixpanel.groups.set_once('Company', 'Mixpanel', {
  Type: 'Analytics',
  HQ: 'San Francisco',
})
```
```
```

### unset
`groups.unset()` unsets a property or properties on the group profile.

```js JavaScript
// Permanently removes the group profile property "Type"
mixpanel.groups.unset('Company', 'Mixpanel', 'Type')

// Permanently removes the "Type" and "tags" properties
mixpanel.groups.unset('Company', 'Mixpanel', ['Type', 'tags'])
```
```
```

### union
`groups.union()` adds the specified values to a list property and ensures that those values only appear once. The profile is created if it does not exist.

```js JavaScript
// Add the "Features" list property or merge "Insights"
// and "Funnels" into the existing property.
mixpanel.groups.union('Company', 'Mixpanel', {
  Features: ['Insights', 'Funnels'],
})
```
```
```

### remove
`groups.remove()` removes a specific value in a list property.

```js JavaScript
// Remove "Hardware Repair" from the "Additional Services" list property
mixpanel.groups.remove('Company', 'Mixpanel', {
  'Additional Services': 'Hardware Repair'
})
```
```
```

### delete_group
`groups.delete_group()` permanently deletes a group profile.

```js JavaScript
// Delete the Mixpanel group profile
mixpanel.groups.delete_group('Company', 'Mixpanel')
```
```
```


# Additional Resources

Visit the Mixpanel-Node repository on GitHub for additional information, such as:
* [The project's ReadMe](https://github.com/mixpanel/mixpanel-node/blob/master/readme.md)
* [An example application](https://github.com/mixpanel/mixpanel-node/blob/master/example.js)
* [Additional information about ID management](https://github.com/mixpanel/mixpanel-node/issues/13)
---
title: "React Native - Advanced"
slug: "react-native"
hidden: false
createdAt: "2020-12-04T03:36:42.560Z"
updatedAt: "2023-02-04T01:13:34.479Z"
---
# Getting Started

Please refer to our [Quickstart Guide](react-native-quickstart).



# Sending Events

We recommend tracking only five to seven events in your application instead of tracking too many things to start. Ideally, you track users going through your initial user experience and one key metric that matters for your application (e.g. YouTube might choose "Watched Video" as a key metric).

Once you've initialized the library, you can track an event using <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#track">track</a> with the event name and properties.
[block:code]
{
  "codes": [
    {
      "code": "//Track an event with a property\nmixpanel.track('Plan Selected', {'Plan': 'Premium'});",
      "language": "javascript"
    }
  ]
}
[/block]
# Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#timeEvent">timeEvent</a>. This will mark the "start" of your action, which will be timed until you finish with a track call. The time duration is then recorded in the "Duration" property.
[block:code]
{
  "codes": [
    {
      "code": "// start the timer for the event \"Image Upload\"\nmixpanel.timeEvent(\"Image Upload\");\n//...some time later\nmixpanel.track(\"Image Upload\");",
      "language": "javascript"
    }
  ]
}
[/block]
# Super Properties

It's common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event - for example, the user's age, gender, source, or initial referrer.

To make things easier, you can register these properties as super properties. If you tell us just once that these properties are important, we will automatically include them with all events sent. Super properties are saved to local storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](https://help.mixpanel.com/hc/en-us/articles/115004613766).

To set super properties, call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#registerSuperProperties">registerSuperProperties</a>
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.registerSuperProperties({'Plan': 'Mega', 'Cost': '2000'});",
      "language": "javascript"
    }
  ]
}
[/block]
The next time you track an event, the super properties you just set will be included as properties.

Super properties are saved to local storage, and will persist between executions of your app.

# Setting Super Properties Once and Only Once

If you want to store a super property only once (for example, a date of first login), you can use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#registerSuperPropertiesOnce">registerSuperPropertiesOnce</a>. <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#registerSuperPropertiesOnce">registerSuperPropertiesOnce</a> behaves like <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#registerSuperProperties">registerSuperProperties</a> and has the same interface, but it doesn't override super properties you've already saved.

This means it's safe to call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#registerSuperPropertiesOnce">registerSuperPropertiesOnce</a> with the same property multiple times, and it will only set properties if the super property doesn't exist.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.registerSuperPropertiesOnce({'Role': 'Admin'});",
      "language": "javascript"
    }
  ]
}
[/block]
# More for Super Properties

Remove a previously registered super property. <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#unregisterSuperProperty">unregisterSuperProperty</a> is an alternative to clear all properties, unregistering specific super properties prevents them from being recorded on future events. This operation does not affect the value of other super properties. Any property name that is not registered is ignored.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.unregisterSuperProperty('propertyName');",
      "language": "javascript"
    }
  ]
}
[/block]
Get user's super properties. <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#getSuperProperties">getSuperProperties</a>
[block:code]
{
  "codes": [
    {
      "code": "const superProperties = await mixpanel.getSuperProperties();",
      "language": "javascript"
    }
  ]
}
[/block]
Clear all registered properties of user. <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#clearSuperProperties">clearSuperProperties</a>
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.clearSuperProperties();",
      "language": "javascript"
    }
  ]
}
[/block]
# Super Properties Live in Local Storage

Our mobile libraries store your super properties in local storage. They will persist so long as the app is installed (between launches and updates). Uninstalling the app will remove that customers super properties.

# Managing User Identity

You can handle the identity of a user using the [identify](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#identify) and [alias](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#alias) methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

###Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they use the app.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**distinctId**",
    "0-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
    "0-2": "A string that uniquely identifies a user - we recommend a user id. Events sent to Mixpanel using the same distinctId will be considered associated with the same visitor/customer for retention and funnel reporting, so be sure that the given value is globally unique for each individual user you intend to track."
  },
  "cols": 3,
  "rows": 1
}
[/block]
Call [identify](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#identify) when you know the identity of the current user, typically after log-in or sign-up. We recommend against using [identify](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#identify) for anonymous visitors to your site. 
[block:code]
{
  "codes": [
    {
      "code": "// Ensure all future events sent from\n// the device will have the distinct_id 13791\nmixpanel.identify(\"13791\");",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "ID Merge",
  "body": "If a project has [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) enabled, the identify method will connect pre- and post-authentication events when appropriate. \n\nIf a project does not have ID Merge enabled, identify will change the user's local distinct_id to the unique ID you pass. Events tracked prior to authentication will not be connected to the same user identity. If ID Merge is disabled, alias can be used to connect pre and post registration events."
}
[/block]
###Alias 
The [alias](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#alias) method creates an alias which Mixpanel will use to remap one id to another. Multiple aliases can point to the same identifier.


[block:callout]
{
  "type": "info",
  "title": "ID Merge",
  "body": "If a project has [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) enabled,  just call identify with your chosen identifier as soon as you know who the user is to merge anonymous and identified distinct_ids. Calling alias is no longer required."
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
    "1-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
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
      "code": "// This makes the current ID (by default an auto-generated GUID)\n// and '13793' interchangeable distinct ids (but not retroactively).\nconst distinctId = await mixpanel.getDistinctId(); \n// To create a user profile, you must call identify()\nmixpanel.alias(\"New ID\", distinctId: distinctId);\nmixpanel.alias(\"Newer ID\", distinctId: distinctId);",
      "language": "javascript"
    }
  ]
}
[/block]
Aliases can also be chained - the following is a valid example:
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.alias('new_id', 'existing_id');\n// You can chain aliases\nmixpanel.alias('newer_id', 'new_id');",
      "language": "javascript"
    }
  ]
}
[/block]
Aliases **cannot** point to multiple identifiers - the following example will not work:
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.alias('new_id', 'existing_id');\n//this is invalid as 'new_id' already points to 'existing_id'\nmixpanel.alias('new_id', 'newer_id');",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "danger",
  "title": "ID Merge",
  "body": "If a project does not have [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) enabled, the best practice is to call `alias` once when a unique ID is first created for a user (e.g., when a user first registers for an account). Do not use `alias` multiple times for a single user without ID Merge enabled."
}
[/block]
##Call Reset at Logout
[block:callout]
{
  "type": "warning",
  "body": "Reset should only be used if multiple users share a device.  \n\nCalling reset frequently can lead to users quickly exceeding the 500 distinct_id per identity cluster limit. Once the 500 limit is reached you will no longer be able to add additional distinct_ids to the users identity cluster.",
  "title": "Reset can fill identity cluster if used frequently"
}
[/block]
[reset](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#reset)  generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identity Management: Best Practices](https://help.mixpanel.com/hc/en-us/articles/115004497803) article. 
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.reset();",
      "language": "javascript"
    }
  ]
}
[/block]
# Storing User Profiles

In addition to events, you can store user profiles in Mixpanel's [Behavioral Analytics](https://mixpanel.com/people/) product. Profiles are persistent sets of properties that describe a user - things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did. 
[block:callout]
{
  "type": "info",
  "body": "Before you send profile updates, you must call mixpanel.identify(). This ensures that you only have actual registered users saved in the system."
}
[/block]
## Setting Profile Properties
You can set properties on a user profile with <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/People.html#set">mixpanel.getPeople().set</a>.
[block:code]
{
  "codes": [
    {
      "code": "// identify must be called before\n// user profile properties can be set\nmixpanel.identify(\"13793\");\n\n// Sets user 13793's \"Plan\" attribute to \"Premium\"\nmixpanel.getPeople().set(\"Plan\", \"Premium\");",
      "language": "javascript"
    }
  ]
}
[/block]
This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".
[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Pick your property names wisely. Once you've sent them to Mixpanel, there is no way to change them. Feel free to use capitalization and spaces in between words. \nThere are a few limitations:\n* Your property names should not begin with `$` or `mp_`. These properties are reserved for special properties sent by Mixpanel.\n* Your property names cannot begin or end with a space as they will automatically be trimmed.\n* Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.\n\nClick [here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties."
}
[/block]
## Incrementing Numeric Properties
You can use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/People.html#increment">mixpanel.getPeople().increment</a> to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.
[block:code]
{
  "codes": [
    {
      "code": "// Add 500 to the current value of\n// \"points earned\" in Mixpanel\nmixpanel.getPeople().increment(\"points earned\", 500);\nlet properties = {\"dollars spent\": 17, \"credits remaining\", -34};\nmixpanel.getPeople().increment(properties);",
      "language": "javascript"
    }
  ]
}
[/block]
## Appending to List Properties
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/People.html#append">mixpanel.getPeople().append</a> creates an update that adds an item to a list-valued property. The value you send with the append is added to the end of the list. If the property doesn't exist, it will be created with one element list as its value.
[block:code]
{
  "codes": [
    {
      "code": "//Identify the user profile that is going to be updated\nmixpanel.identify(\"13793\");\n\n//Add the color green to the list property \"Favorite Colors\"\n//A new list property is created if it doesn't already exist\nmixpanel.getPeople().append(\"Favorite Colors\", \"Green\");",
      "language": "javascript"
    }
  ]
}
[/block]
## Other Types of Profile Updates
There are a few other types of profile updates. They can be accessed through the <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/People.html">People</a>  class, which is accessible via <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#getPeople">mixpanel.getPeople()</a>.

# Tracking Revenue

Mixpanel makes it easy to analyze the revenue you make from individual customers. By associating charges with User Analytics profiles, you can compare revenue across different customer segments and calculate customer lifetime value.

You can track a single transaction with <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/People.html#trackCharge">mixpanel.getPeople().trackCharge</a>. This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.
[block:code]
{
  "codes": [
    {
      "code": "\n// Make identify has been\n// called before making revenue updates\nmixpanel.identify(\"13793\");\n\n// Tracks $100 in revenue for user 13793\nmixpanel.getPeople().trackCharge(100);\n\n// Refund this user 50 dollars\nmixpanel.getPeople().trackCharge(-50);\n\n// Tracks $25 in revenue for user 13793\n// on the 2nd of january\nmixpanel.getPeople().trackCharge(25, {\"$time\": \"2012-01-02T00:00:00\"});",
      "language": "javascript"
    }
  ]
}
[/block]
# Group Analytics


[block:callout]
{
  "type": "info",
  "title": "Add Group Keys",
  "body": "To start tracking groups data, [add group keys in project settings](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics#implementation). If you don't see group keys in your Project Settings, reach out to the [Mixpanel Sales Team](https://mixpanel.com/group-analytics/) to purchase Group Analytics."
}
[/block]
Mixpanel Group Analytics allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` will allow analysis at a company or group level when using Mixpanel analytics. Read [this article](https://help.mixpanel.com/hc/en-us/articles/360025333632) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “company” is chosen for Group Analytics, “company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

## Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f685e62-bb3b834-Screen_Shot_2019-12-10_at_11.23.26_AM.png",
        "bb3b834-Screen_Shot_2019-12-10_at_11.23.26_AM.png",
        1846,
        322,
        "#f8f9fb"
      ]
    }
  ]
}
[/block]
Enter an event property to attribute the group key to. You can also enter a display name for the group key. Click **Save**.

## Adding Users to a Group
Adding users to groups causes the `group_key` and `group_id` to send as a property key and value for all events triggered by that user on the device. You can add multiple values for a single user to the `group_key` list property.

Similar to a `distinct_id`, the `group_key` allows Mixpanel to group events by an identifier for analysis. A `group_key`, however, is a group level identifier and not a user level identifier like the `distinct_id`.

You can add users to groups by calling the <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#setGroup">setGroup</a> method. 
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.setGroup(\"group key\", \"group id\");",
      "language": "javascript"
    }
  ]
}
[/block]
You can call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#addGroup">addGroup</a> to add any additional groups to an existing list.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.addGroup(\"group key\", \"group id\");",
      "language": "javascript"
    }
  ]
}
[/block]
You can call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#removeGroup">removeGroup</a> to remove any additional groups from an existing list.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.removeGroup(\"group key\", \"group id\");",
      "language": "javascript"
    }
  ]
}
[/block]
## Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#set">getGroup().set()</a>to build a group profile. It is important to the group_key, group_id, and one property so that the profile is not empty.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.getGroup(MixpanelToken, \"company_id\", 12345).set(\"SET NAME\", \"SET VALUE\");",
      "language": "javascript"
    }
  ]
}
[/block]
## Setting Group Profile Properties
You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#set">getGroup().set()</a>.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.getGroup(\"group key\", \"group id\").set(\"SET NAME\", \"SET VALUE\");",
      "language": "javascript"
    }
  ]
}
[/block]
The getGroup() method can be chained with other commands that edit properties specific to the group.

You can set the property $name to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

### set
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#set">getGroup().set()</a> updates or adds a property to a group.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.getGroup(\"group key\", \"group id\").set(\"SET NAME\", \"SET VALUE\");",
      "language": "javascript"
    }
  ]
}
[/block]
### set once
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#setOnce">getGroup().setOnce()</a> adds a property value to a group only if it has not been set before.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.getGroup(\"group key\", \"group id\").setOnce(\"SET ONCE NAME\", \"SET ONCE VALUE\");",
      "language": "javascript"
    }
  ]
}
[/block]
### unset
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#unset">getGroup().unset()</a> unsets a specific property in the group.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.getGroup(\"group key\", \"group id\").unset(\"UNSET NAME\");",
      "language": "javascript"
    }
  ]
}
[/block]
### remove
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#remove">getGroup().remove()</a> removes a specific value in a list property.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.getGroup(\"group key\", \"group id\").remove(\"property name\", \"value to remove\");",
      "language": "javascript"
    }
  ]
}
[/block]
### union
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#union">getGroup().union()</a> adds the specified values to a list property and ensures that those values only appear once.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.getGroup(\"group key\", \"group id\").union(\"UNION NAME\", [\"prop_value_a\", \"prop_value_b\"]);",
      "language": "javascript"
    }
  ]
}
[/block]
### delete
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#deleteGroup">getGroup().deleteGroup()</a> deletes a group.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.getGroup(\"group key\", \"group id\").deleteGroup();",
      "language": "javascript"
    }
  ]
}
[/block]

# EU Data Residency

Route data to Mixpanel's EU servers by setting the `serverURL` property after initializing the client. 
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.setServerURL(\"https://api-eu.mixpanel.com\");",
      "language": "javascript"
    }
  ]
}
[/block]
# Opting Users Out of Tracking

Client-side tracking of individual user data can be stopped or resumed by controlling a user’s opt-out/opt-in state. Opt-out methods and library configuration settings only affect data sent from a single library instance. Data sent from other sources to Mixpanel’s APIs will still be ingested regardless of whether the user is opted out locally.

The opt-out/opt-in state of a user is controlled by an opt-out flag that is stored in the local storage of the user’s device. If the value of the flag is true, then the user is opted-out and will not be tracked. If the opt-out flag is false, then the user is tracked. The flag is not set when the SDK is initialized, so the initial state is neither opted in nor opted out. Without the flag set, the user will be tracked by default.

To opt a user out of tracking locally, use the <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#optOutTracking">optOutTracking</a> method. To resume tracking for an individual user, use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#optInTracking">optInTracking</a> Call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#hasOptedOutTracking">hasOptedOutTracking</a>  to check user’s opt-out status locally. By default, an "$opt_in" event is sent every time that a user opts in.
[block:code]
{
  "codes": [
    {
      "code": "// Check user’s opt-out status locally\nlet hasOptedOut = await mixpanel.hasOptedOutTracking();\nmixpanel.optOutTracking();\n\n// To opt a user out of tracking locally, use the optOutTracking method. Before calling this method call flush() if you want to send all the events or updates to mixpanel otherwise it will be deleted\nmixpanel.optOutTracking();\n\n// To opt-in an already opted-out user from tracking. After using this method people updates and track calls will be sent to Mixpanel.\n// Opt-in without any parameters\nmixpanel.optInTracking();\n",
      "language": "javascript"
    }
  ]
}
[/block]
# Opting Users Out of Tracking by Default

Mixpanel’s tracking libraries will send user data by default. Explicitly setting a default opt-out state of true will opt-out all users by default, preventing data from sending unless a user’s opt-out state is set to false.
[block:code]
{
  "codes": [
    {
      "code": "const mixpanel = await Mixpanel.init('Your mixpanel token', true, true /* DEFAULT_OPT_OUT */);",
      "language": "javascript"
    }
  ]
}
[/block]
# Deleting Existing Data

Opting users out of tracking will stop any future tracking. This does not automatically delete data that has already been collected. Mixpanel's deletion API can be used to delete existing data.

## Debugging and Logging

Enabling Mixpanel debugging and logging allows you to see the debug output from the Mixpanel library. This may be useful in determining when track calls go out. To enable Mixpanel debugging and logging, you can call [setLoggingEnabled(true)](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#setLoggingEnabled) with `true`, then run your iOS project with Xcode or android project with Android Studio. The logs should be available in the console.

# Flushing Events

To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers every 60 seconds while your application is running, as well as when the application transitions to the background. You can call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#flush">flush</a> manually if you want to force a flush at a particular moment.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.flush();",
      "language": "javascript"
    }
  ]
}
[/block]
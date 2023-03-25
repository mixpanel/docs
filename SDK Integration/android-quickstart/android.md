---
title: "Android - Advanced"
slug: "android"
hidden: false
metadata: 
  title: "SDK Integration: Android Advanced | Mixpanel Developer Docs"
  description: "Read our advanced documentation on Mixpanel's Android SDK integration. You'll dive deeper into additional configurations and use cases including group analytics."
createdAt: "2018-04-12T18:57:33.400Z"
updatedAt: "2023-02-04T01:12:42.453Z"
---
## Getting Started

Please refer to our [Quickstart Guide](android-quickstart).

## Sending Events

Once you've initialized the library, you can track an event using <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#track-java.lang.String-org.json.JSONObject-">MixpanelAPI.track</a> with the event name and properties.
[block:code]
{
  "codes": [
    {
      "code": "MixpanelAPI mixpanel =\n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);\n\nJSONObject props = new JSONObject();\nprops.put(\"Gender\", \"Female\");\nprops.put(\"Plan\", \"Premium\");\n\nmixpanel.track(\"Plan Selected\", props);",
      "language": "java"
    }
  ]
}
[/block]



## Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#timeEvent-java.lang.String-">timeEvent</a>. This will mark the "start" of your action, which will be timed until you finish with a track call. The time duration is then recorded in the "Duration" property.
[block:code]
{
  "codes": [
    {
      "code": "MixpanelAPI mixpanel =\n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);\n\n// start the timer for the event \"Image Upload\"\nmixpanel.timeEvent(\"Image Upload\");\n\n// stop the timer if the imageUpload() method returns true\nif(imageUpload()){\n    mixpanel.track(\"Image Upload\");\n}",
      "language": "java"
    }
  ]
}
[/block]



## Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event - for example, the user's age, gender, source, or initial referrer.

To make things easier, you can register these properties as super properties. If you tell us just once that these properties are important, we will automatically include them with all events sent. Super properties are saved to device storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](https://mixpanel.com/help/questions/articles/what-properties-do-mixpanels-libraries-store-by-default).

To set super properties, call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#registerSuperProperties-org.json.JSONObject-">MixpanelAPI.registerSuperProperties</a>.
[block:code]
{
  "codes": [
    {
      "code": "MixpanelAPI mixpanel =\n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);\n\n// Send a \"User Type: Paid\" property will be sent\n// with all future track calls.\nJSONObject props = new JSONObject();\nprops.put(\"User Type\", \"Paid\");\nmixpanel.registerSuperProperties(props);",
      "language": "java"
    }
  ]
}
[/block]
The next time you track an event, the super properties you just set will be included as properties.

Super properties are saved to device storage, and will persist between executions of your app.

## Setting Super Properties Once and Only Once

If you want to store a super property only once (for example, a date of first login), you can use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#registerSuperPropertiesOnce-org.json.JSONObject-">MixpanelAPI.registerSuperPropertiesOnce</a>. <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#registerSuperPropertiesOnce-org.json.JSONObject-">registerSuperPropertiesOnce</a> behaves like <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#registerSuperProperties-org.json.JSONObject-">registerSuperProperties</a> and has the same interface, but it doesn't override super properties you've already saved.

This means it's safe to call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#registerSuperPropertiesOnce-org.json.JSONObject-">registerSuperPropertiesOnce</a> with the same property multiple times, and it will only set properties if the super property doesn't exist.

## Super Properties Live in Local Storage

Our mobile libraries store your super properties in local storage. They will persist so long as the app is installed (between launches and updates). Uninstalling the app will remove that customers super properties.

## Managing User Identity

You can handle the identity of a user using the [identify](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify-java.lang.String-) and [alias](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify-java.lang.String-) methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

###Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they use the app.

Call `identify` when you know the identity of the current user, typically after log-in or sign-up. We recommend against using `identify` for anonymous visitors to your site.  To assign your own distinct_ids, you can use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify-java.lang.String-">MixpanelAPI.identify</a> 

[block:code]
{
  "codes": [
    {
      "code": "MixpanelAPI mixpanel =\n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);\n\n// Ensure all future events sent from\n// the device will have the distinct_id 13793\nmixpanel.identify(\"13793\");",
      "language": "java"
    }
  ]
}
[/block]

In general, if you use [identify](https://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify(java.lang.String)), you should call it as soon as the user logs in to your application. This will track all of their authenticated application usage to the correct user ID.
[block:callout]
{
  "type": "info",
  "body": "If a project has [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) enabled, the identify method will connect pre- and post-authentication events when appropriate. \n\nIf a project does not have ID Merge enabled, identify will change the user's local distinct_id to the unique ID you pass. Events tracked prior to authentication will not be connected to the same user identity. If ID Merge is disabled, alias can be used to connect pre and post registration events.",
  "title": "ID Merge"
}
[/block]
###Alias 

The [alias](https://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#alias(java.lang.String,java.lang.String)) method creates an alias which Mixpanel will use to remap one id to another. Multiple aliases can point to the same identifier.

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
    "1-0": "**distinctId**",
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
      "code": "mixpanel.alias(\"new_id\", \"existing_id\");\n//You can add multiple id aliases to the existing id\nmixpanel.alias(\"newer_id\", \"existing_id\");",
      "language": "java"
    }
  ]
}
[/block]
Aliases can also be chained - the following is a valid example:

[block:code]
{
  "codes": [
    {
      "code": "mixpanel.alias(\"new_id\", \"existing_id\");\n// You can chain aliases\nmixpanel.alias(\"newer_id\", \"new_id\");",
      "language": "java"
    }
  ]
}
[/block]
Aliases cannot point to multiple identifiers - the following example will not work:

[block:code]
{
  "codes": [
    {
      "code": "mixpanel.alias(\"new_id\", \"existing_id\");\n//this is invalid as 'new_id' already points to 'existing_id'\nmixpanel.alias(\"new_id\", \"newer_id\");",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "danger",
  "body": "If a project does not have [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) enabled, the best practice is to call `alias` once when a unique ID is first created for a user (e.g., when a user first registers for an account). Do not use `alias` multiple times for a single user without ID Merge enabled.",
  "title": "ID Merge"
}
[/block]
##Call Reset at Logout
[block:callout]
{
  "type": "warning",
  "body": "Reset should only be used if multiple users share a device.  \n\nCalling reset frequently can lead to users quickly exceeding the 500 distinct_id per identity cluster limit. Once the 500 limit is reached you will no longer be able to add additional distinct_ids to the users identity cluster.",
  "title": "Reset can fill an identity cluster if used frequently"
}
[/block]
[Reset](https://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#reset()) generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identity Management: Best Practices](https://help.mixpanel.com/hc/en-us/articles/115004497803) article. 


## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel's [Behavioral Analytics](https://mixpanel.com/people/) product. Profiles are persistent sets of properties that describe a user - things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.
[block:callout]
{
  "type": "info",
  "body": "Before you send profile updates, you must call [identify](https://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify(java.lang.String)). The library uses a separate ID for User records, and you must set this value to send updates."
}
[/block]
## Setting Profile Properties

You can set properties on a user profile with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#set-java.lang.String-java.lang.Object-">MixpanelAPI.getPeople().set</a>.
[block:code]
{
  "codes": [
    {
      "code": "MixpanelAPI mixpanel =\n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);\n\n// identify must be called before\n// user profile properties can be set\nmixpanel.identify(\"13793\");\n\n// Sets user 13793's \"Plan\" attribute to \"Premium\"\nmixpanel.getPeople().set(\"Plan\", \"Premium\");",
      "language": "java"
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

You can use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#set-java.lang.String-java.lang.Object-">MixpanelAPI.getPeople().increment</a> to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.
[block:code]
{
  "codes": [
    {
      "code": "// Add 500 to the current value of\n// \"points earned\" in Mixpanel\nmixpanel.getPeople().increment(\"points earned\", 500);\n\n// Pass a Map to increment multiple properties\nMap<String, Integer> properties =\n    new HashMap<String, Integer>();\nproperties.put(\"dollars spent\", 17);\n// Subtract by passing a negative value\nproperties.put(\"credits remaining\", -34);\n\nmixpanel.getPeople().increment(properties);",
      "language": "java"
    }
  ]
}
[/block]
## Appending to List Properties

<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#append-java.lang.String-java.lang.Object-">getPeople.append()</a> creates an update that adds an item to a list-valued property. The value you send with the append is added to the end of the list. If the property doesn't exist, it will be created with one element list as its value.
[block:code]
{
  "codes": [
    {
      "code": "MixpanelAPI mixpanel =\n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);\n\n//Identify the user profile that is going to be updated\nmixpanel.identify(\"13793\");\n\n//Add the color green to the list property \"Favorite Colors\"\n//A new list property is created if it doesn't already exist\nmixpanel.getPeople().append(\"Favorite Colors\", \"Green\")",
      "language": "java"
    }
  ]
}
[/block]
## Other Types of Profile Updates

There are a few other types of profile updates. They can be accessed through the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html">MixpanelPeople class</a>, which is accessible via <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html">MixpanelAPI.getPeople()</a>.


## Tracking Revenue

Mixpanel makes it easy to analyze the revenue you make from individual customers. By associating charges with User Analytics profiles, you can compare revenue across different customer segments and calculate customer lifetime value.

You can track a single transaction with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#trackCharge-double-org.json.JSONObject-">MixpanelAPI.getPeople().trackCharge</a>. This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.
[block:code]
{
  "codes": [
    {
      "code": "MixpanelAPI mixpanel =\n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);\n\n// Make getPeople() identify has been\n// called before making revenue updates\nmixpanel.identify(\"13793\");\n\n// Tracks $100 in revenue for user 13793\nmixpanel.getPeople().trackCharge(100, null);\n\n// Refund this user 50 dollars\nmixpanel.getPeople().trackCharge(-50, null);\n\n// Tracks $25 in revenue for user 13793\n// on the 2nd of january\nJSONObject properties = new JSONObject()\nproperties.put(\"$time\", \"2012-01-02T00:00:00\");\nmixpanel.getPeople().trackCharge(25, properties);",
      "language": "java"
    }
  ]
}
[/block]
## Group Analytics
[block:callout]
{
  "type": "info",
  "body": "To start tracking groups data, [add group keys in project settings](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics#implementation). If you don't see group keys in your Project Settings, reach out to the [Mixpanel Sales Team](https://mixpanel.com/group-analytics/) to purchase Group Analytics.",
  "title": "Add Group Keys"
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
        "https://files.readme.io/bb3b834-Screen_Shot_2019-12-10_at_11.23.26_AM.png",
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

## Adding Users to a Group
Adding users to groups causes the `group_key` and `group_id` to send as a property key and value for all events triggered by that user on the device. You can add multiple values for a single user to the `group_key` list property.

Similar to a `distinct_id`, the `group_key` allows Mixpanel to group events by an identifier for analysis. A `group_key`, however, is a group level identifier and not a user level identifier like the `distinct_id`.

You can add users to groups by calling the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">setGroup()</a> method. 
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.setGroup(\"group key\", \"group id\");",
      "language": "java"
    }
  ]
}
[/block]
You can call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">addGroup()</a> to add any additional groups to an existing list.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.addGroup(\"group key\", \"group id\");\n",
      "language": "java"
    }
  ]
}
[/block]
You can call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">removeGroup()</a> to remove any additional groups from an existing list.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.removeGroup(\"group key\", \"group id\");",
      "language": "java"
    }
  ]
}
[/block]
## Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">getGroup().set()</a> to build a group profile. It is important to the `group_key`, `group_id`, and one property so that the profile is not empty. 
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.getGroup(\"group key\", \"group id\").set(\"SET NAME\", \"SET VALUE\");",
      "language": "java"
    }
  ]
}
[/block]
## Setting Group Profile Properties
You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">getGroup().set()</a>.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.getGroup(\"group key\", \"group id\").set(\"SET NAME\", \"SET VALUE\");\n\nmMixpanel.getGroup(\"group key\", \"group id\").setMap((new HashMap<>()).put(\"SET MAP INT\", 1));\n",
      "language": "java"
    }
  ]
}
[/block]
The <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">getGroup()</a> method can be chained with other commands that edit properties specific to the group.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.
### set
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">mixpanel.getGroup().set()</a> updates or adds a property to a group.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.getGroup(\"group key\", \"group id\").set(\"SET NAME\", \"SET VALUE\");\n\nmMixpanel.getGroup(\"group key\", \"group id\").setMap((new HashMap<>()).put(\"SET MAP INT\", 1));\n",
      "language": "java"
    }
  ]
}
[/block]
### set once
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">mixpanel.getGroup().set_once()</a> adds a property value to a group only if it has not been set before.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.getGroup(\"group key\", \"group id\").setOnce(\"SET ONCE NAME\", \"SET ONCE VALUE\");\n\nmMixpanel.getGroup(\"group key\", \"group id\").setOnceMap((new HashMap<>()).put(\"SET ONCE MAP STR\", \"SET ONCE MAP VALUE\"));\n",
      "language": "java"
    }
  ]
}
[/block]
### unset
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">mixpanel.getGroup().unset()</a> unsets a specific property in the group.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.getGroup(\"group key\", \"group id\").unset(\"UNSET NAME\");",
      "language": "java"
    }
  ]
}
[/block]
### remove
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">mixpanel.getGroup().remove()</a> removes a specific value in a list property.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.getGroup(\"group key\", \"group id\").remove(\"property name\", \"value to remove\");\n",
      "language": "java"
    }
  ]
}
[/block]
### union
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">mixpanel.getGroup().union()</a> adds the specified values to a list property and ensures that those values only appear once.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.getGroup(\"group key\", \"group id\").union(\"UNION NAME\", new JSONArray(\"[100]\"));\n",
      "language": "java"
    }
  ]
}
[/block]
### delete
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">mixpanel.getGroup().deleteGroup()</a> deletes a group.
[block:code]
{
  "codes": [
    {
      "code": "mMixpanel.getGroup(\"group key\", \"group id\").deleteGroup();\n",
      "language": "java"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "App Links Tracking"
}
[/block]
The Mixpanel library has built in support for tracking in-bound and out-bound [App Links](http://applinks.org/). App Links is a specification to help standardize deep-linking between apps as well as give you additional information about how users are getting to and from your own mobile app.

## Requirements

In order for Mixpanel to track App Links, your app must statisfy the following dependencies:

* [Bolts Framework](https://github.com/BoltsFramework/Bolts-Android) >= v1.1.2
* [Android Support Library v4](https://developer.android.com/tools/support-library/features.html#v4).
[block:callout]
{
  "type": "info",
  "body": "If your application does not meet these requirements, the Mixpanel library will log debug messages about App Links tracking not being enabled. This is NOT an error and can be safely ignored.",
  "title": "NOTE"
}
[/block]
## Tracking In-bound App Links

If a user comes to your app via an App Link, Mixpanel will automatically track a "$al_nav_in" event with meta information about where they came from.

## Tracking Out-bound App lLnks

If you're linking to other applications using the Bolts framework, Mixpanel will track a `$al_nav_out` event with additional meta information about where the user is being linked to.
[block:code]
{
  "codes": [
    {
      "code": "bolts.AppLinkNavigation.navigateInBackground(this,\n\"http://anotherapp.com/app/link\");",
      "language": "java"
    }
  ]
}
[/block]

## Opting Users Out of Tracking

Client-side tracking of individual user data can be stopped or resumed by controlling a user’s opt-out/opt-in state. Opt-out methods and library configuration settings only affect data sent from a single library instance. Data sent from other sources to Mixpanel’s APIs will still be ingested regardless of whether the user is opted out locally.

The opt-out/opt-in state of a user is controlled by an opt-out flag that is stored in the local storage of the user’s device. If the value of the flag is true, then the user is opted-out and will not be tracked. If the opt-out flag is false, then the user is tracked. The flag is not set when the SDK is initialized, so the initial state is neither opted in nor opted out. Without the flag set, the user will be tracked by default.

To opt a user out of tracking locally, use the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#optOutTracking--">optOutTracking</a> method. To resume tracking for an individual user, use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#optInTracking--">optInTracking</a>. Call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#hasOptedOutTracking--">hasOptedOutTracking</a> to check user’s opt-out status locally. By default, an "$opt_in" event is sent every time that a user opts in. 
[block:code]
{
  "codes": [
    {
      "code": "MixpanelAPI mixpanel =\n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);\n\n// Opt a user out of data collection\n    mixpanel.optOutTracking();\n\n// Check a user's opt-out status\n// Returns true of user is opted out of tracking locally\n    Boolean hasOptedOutTracking = mixpanel.hasOptedOutTracking();",
      "language": "java"
    }
  ]
}
[/block]
## Opting Users Out of Tracking by Default

Mixpanel’s tracking libraries will send user data by default. Explicitly setting a default opt-out state of true will opt-out all users by default, preventing data from sending unless a user’s opt-out state is set to false.
[block:code]
{
  "codes": [
    {
      "code": "// Initializing a default opt-out state of true \n// will prevent data from being collected by default\n\nMixpanelAPI mixpanelOptOutDefault = \n    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true, true /* opt out by default */);",
      "language": "java"
    }
  ]
}
[/block]

## Delete Existing Data

Opting users out of tracking will stop any future tracking. This does not automatically delete data that has already been collected. Mixpanel's deletion API can be used to delete existing data.

## Debugging and Logging

Enabling Mixpanel debugging and logging allows you to see the debug output from the Mixpanel Android library. This may be useful in determining when track calls go out or in-app messages are fetched. To enable Mixpanel debugging and logging, you will want to add the following permission within your `AndroidManifest.xml` inside the `<application>` tag:
[block:code]
{
  "codes": [
    {
      "code": "...\n<application>\n    <meta-data\n      android:name=\"com.mixpanel.android.MPConfig.EnableDebugLogging\"\n      android:value=\"true\" />\n    ...\n</application>\n...",
      "language": "java"
    }
  ]
}
[/block]

## EU Data Residency

Route data to Mixpanel's EU servers by adding meta-data entries under the `<application>` tag of your app's `AndroidManifest.xml`.

```xml
<meta-data android:name="com.mixpanel.android.MPConfig.EventsEndpoint"
           android:value="https://api-eu.mixpanel.com/track?ip=1" />
<meta-data android:name="com.mixpanel.android.MPConfig.PeopleEndpoint"
           android:value="https://api-eu.mixpanel.com/engage?ip=1" />
<meta-data android:name="com.mixpanel.android.MPConfig.GroupsEndpoint"
           android:value="https://api-eu.mixpanel.com/groups" />
<meta-data android:name="com.mixpanel.android.MPConfig.DecideEndpoint" 
           android:value="https://api-eu.mixpanel.com/decide" />
```

## Release History
[See All Releases](https://github.com/mixpanel/mixpanel-android/releases).
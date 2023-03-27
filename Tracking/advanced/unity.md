---
title: "Unity - Advanced"
slug: "unity"
hidden: false
metadata: 
  title: "SDK Integration: Unity Advanced | Mixpanel Developer Docs"
  description: "Read our advanced documentation on Mixpanel's Unity SDK integration. You'll dive deeper into additional configurations and use cases including super properties."
createdAt: "2018-04-12T18:58:41.198Z"
updatedAt: "2022-07-06T22:05:49.187Z"
---
## Getting Started

Please refer to our [Quickstart Guide](unity-quickstart).

# Installing the Library

This library can be installed using the unity package manager system with git. We support Unity 2018.3 and above. For older versions of Unity, you need to have .NET 4.x Equivalent selected as the scripting runtime version in your editor settings.

* In your unity project root open ./Packages/manifest.json
* Add the following line to the dependencies section "com.mixpanel.unity": "https://github.com/mixpanel/mixpanel-unity.git#master",
* Open Unity and the package should download automatically
Alternatively you can go to the [releases page](https://github.com/mixpanel/mixpanel-unity/releases) and download the .unitypackage file and have unity install that.

# Initializing the Library

To start tracking with the Mixpanel Unity library, you must first initialize it with your project token. You can find your token by clicking your name in the upper righthand corner of your Mixpanel project and selecting Settings from the dropdown.

###Configuring Mixpanel
To initialize the library, first open the unity project settings menu for Mixpanel. (Edit -> Project Settings -> Mixpanel) Then, enter your project token into the Token and Debug Token input fields within the inspector.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8414904-MixpanelSettings.png",
        "MixpanelSettings.png",
        611,
        300,
        "#b4b4b5"
      ]
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "You have the option to provide different tokens for debug and production builds of your project. Keeping data sets separate is important to maintain the integrity of the metrics you’re tracking with Mixpanel. It’s very easy to prevent these data sets from commingling, but hard to disentangle, so taking time up front is well worth it. First, create two separate Mixpanel projects – a \"Production\" project and a \"Debug\" project (Mixpanel doesn’t limit the number of projects you can use). Then, you can enter your \"Production\" and \"Debug\" project tokens into the Token and Debug Token input fields respectively."
}
[/block]
### 
Once you've initialized the library with your project token, you can import Mixpanel into your code using the mixpanel namespace.
[block:code]
{
  "codes": [
    {
      "code": "using mixpanel;\n\n// Then, you can track events with\nMixpanel.Track(\"Plan Selected\");",
      "language": "csharp"
    }
  ]
}
[/block]
### Sending your First Event
Once you've initialized the library, you can track an event using <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#a6a0f4b79670d7bbd50c849af2b12a8e1">Mixpanel.Track()</a> with the event name and properties.
[block:code]
{
  "codes": [
    {
      "code": "var props = new Value();\nprops[\"Gender\"] = \"Female\";\nprops[\"Plan\"] = \"Premium\";\n\nMixpanel.Track(\"Plan Selected\", props);",
      "language": "csharp"
    }
  ]
}
[/block]
### Flushing Events
To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers periodically while your application is running. On Unity, you can configure the interval at which data is flushed to Mixpanel. The default time is that data gets flushed every 60 seconds. 

# Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#ab1a62f4c9b0e28915dfdc57e7810bc78">Mixpanel.StartTimedEvent</a> This will mark the "start" of your action, which you can then finish with a track call. The time duration is then recorded in the "Duration" property.
[block:code]
{
  "codes": [
    {
      "code": "Mixpanel.StartTimedEvent(\"Image Upload\");\n\nMixpanel.Track(\"Image Upload\");",
      "language": "csharp"
    }
  ]
}
[/block]
# Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the **user** rather than about a specific event—for example, the user's age, gender, or source.

To make things easier, you can register these properties as **super properties**. If you do, we will automatically include them with all tracked events. Super properties are saved to device storage, and will persist across invocations of your app.

To set super properties, call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#acf2fccd7625dfb2a15ef54fcaf8ddfe4">Mixpanel.Register.</a> 
[block:code]
{
  "codes": [
    {
      "code": "// Send a \"User Type: Paid\" property will be sent\n// with all future track calls.\nMixpanel.Register(\"User Type\", \"Paid\");",
      "language": "csharp"
    }
  ]
}
[/block]
Going forward, whenever you track an event, super properties will be included as properties. For instance, if you call
[block:code]
{
  "codes": [
    {
      "code": "var props = new Value();\nprops[\"signup_button\"] = \"test12\";\n\nMixpanel.Track(\"signup\", props);",
      "language": "csharp"
    }
  ]
}
[/block]
after making the above call to Mixpanel.Register, it is just like adding the properties directly:
[block:code]
{
  "codes": [
    {
      "code": "var props = new Value();\nprops[\"signup_button\"] = \"test12\";\nprops[\"User Type\"] = \"Paid\";\n\nMixpanel.Track(\"signup\", props);",
      "language": "csharp"
    }
  ]
}
[/block]
### Setting Super Properties Only Once
If you want to store a super property only once (often for things like ad campaign or source), you can use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#a148783e1cfca22df973a6a6b0eba1641">Mixpanel.RegisterOnce</a>. This function behaves like <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#acf2fccd7625dfb2a15ef54fcaf8ddfe4">Mixpanel.Register</a> and has the same interface, but it doesn't override super properties you've already saved.
[block:code]
{
  "codes": [
    {
      "code": "Mixpanel.RegisterOnce(\"source\", \"ad-01\");",
      "language": "csharp"
    }
  ]
}
[/block]
This means that it's safe to call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#a148783e1cfca22df973a6a6b0eba1641">Mixpanel.RegisterOnce</a> with the same property on every app load, and it will only set it if the super property doesn't exist.

### Super Properties Live in Local Storage

Mixpanel's server-side libraries do not automatically append "super properties" to their events. You are more than welcome to roll your own system to append whatever properties you'd like to events for a given user. The most important thing to note when dealing with appending properties server side is that you must include a value for the (traditionally super) property "distinct_id" in order to use the events in most Mixpanel reports. The distinct_id property ties an event to a specific user.


# Managing User Identity

You can handle the identity of a user using the `identify` and `alias` methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

###Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they visit the site.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**unique_id**",
    "0-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: green\">optional</span>",
    "0-2": "A string that uniquely identifies a user - we recommend a user id. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) is used."
  },
  "cols": 3,
  "rows": 1
}
[/block]
Call `identify` when you know the identity of the current user, typically after log-in or sign-up. We recommend against using `identify` for anonymous visitors to your site. 
[block:code]
{
  "codes": [
    {
      "code": "// Associate all future events sent from\n// the library with the distinct_id 13793\nMixpanel.Identify('13793');\n",
      "language": "csharp"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "ID Merge",
  "body": "If a project has [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) enabled, the identify method will connect pre- and post-authentication events when appropriate. \n\nIf a project does not have ID Merge enabled, identify will change the user's local distinct_id to the unique ID you pass. Events tracked prior to authentication will not be connected to the same user identity. If ID Merge is disabled, alias can be used to connect pre and post registration events."
}
[/block]
###Alias 
The `alias` method creates an alias which Mixpanel will use to remap one id to another. Multiple aliases can point to the same identifier.


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
      "code": "Mixpanel.Alias(\"13793\");",
      "language": "csharp"
    }
  ]
}
[/block]
Aliases can also be chained. You **cannot** point to multiple identifiers.
[block:callout]
{
  "type": "danger",
  "body": "If a project does not have [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) enabled, the best practice is to call `alias` once when a unique ID is first created for a user (e.g., when a user first registers for an account). Do not use `alias` multiple times for a single user without ID Merge enabled.",
  "title": "ID Merge"
}
[/block]
###Call Reset at Logout
[block:callout]
{
  "type": "warning",
  "body": "Reset should only be used if multiple users share a device.  \n\nCalling reset frequently can lead to users quickly exceeding the 500 distinct_id per identity cluster limit. Once the 500 limit is reached you will no longer be able to add additional distinct_ids to the users identity cluster.",
  "title": "Reset can fill identity cluster if used frequently"
}
[/block]
[Reset](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#af80b55f985b94780ec983dc6c1210d6b) generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identity Management: Best Practices](https://help.mixpanel.com/hc/en-us/articles/115004497803) article. 

# Storing User Profiles

In addition to events, you can store user profiles in Mixpanel's <a style="font-family: courier" href="https://mixpanel.com/people/">User Analytics</a> product. Profiles are persistent sets of properties that describe a user—things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.
[block:callout]
{
  "type": "info",
  "body": "Before you send profile updates, you must call <a style=\"font-family: courier\" href=\"http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#a4636a50f2f4e36895f56a6101e527720\">Mixpanel.Identify</a>. This ensures that you only have registered users saved in the system.",
  "title": "NOTE"
}
[/block]
### Setting Profile Properties

You can set properties on a user profile with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel_1_1_people.html#aa8eaa02cc76fc8ad1076b00ca1772dc6">Mixpanel.people.Set</a>.
[block:code]
{
  "codes": [
    {
      "code": "// mixpanel identify: must be called before\n// user profile properties can be set\nMixpanel.Identify(\"13793\");\n\n// Sets user 13793's \"Plan\" attribute to \"Premium\"\nMixpanel.People.Set(\"Plan\", \"Premium\");",
      "language": "csharp"
    }
  ]
}
[/block]
This will set a "Plan" property, with a value "Premium," on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium."
[block:callout]
{
  "type": "info",
  "body": "Pick your property names wisely. Once you've sent them to Mixpanel, there is no way to change them. Feel free to use capitalization and spaces in between words. \nThere are a few limitations:\n\n* Your property names should not begin with `$` or `mp_`. These properties are reserved for special properties sent by Mixpanel.\n* Your property names cannot begin or end with a space as they will automatically be trimmed.\n* Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.\n\nClick [here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties.",
  "title": "NOTE"
}
[/block]
### Incrementing Numeric Properties

You can use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel_1_1_people.html#a3f019d6f12504f7b4c565cfc747041fd">Mixpanel.people.Increment</a> to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.
[block:code]
{
  "codes": [
    {
      "code": "// Here we increment the user's point count by 500.\nMixpanel.People.Increment(\"point count\", 500);",
      "language": "csharp"
    }
  ]
}
[/block]
### Other Types of Profile Updates

There are a few other types of profile updates. To learn more, please see the [full API reference](http://mixpanel.github.io/mixpanel-unity/api-reference/annotated.html).

# Tracking Revenue

Mixpanel makes it easy to analyze the revenue you earn from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel_1_1_people.html#ae0f80a6831618f591542f230f821e665">Mixpanel.people.TrackCharge</a>. This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.
[block:code]
{
  "codes": [
    {
      "code": "// Make sure identify has been called before making revenue\n// updates\nMixpanel.Identify(\"13793\");\n\n// Tracks $100 in revenue for user 13793\nMixpanel.People.TrackCharge(100);\n\n// Refund this user 50 dollars\nMixpanel.People.TrackCharge(-50);\n\n// Tracks $25 in revenue for user 13793 on the 2nd of\n// January\nvar props = new Value();\nprops[\"time\"] = \"2012-01-02T00:00:00\";\n\nMixpanel.People.TrackCharge(25, props);",
      "language": "csharp"
    }
  ]
}
[/block]
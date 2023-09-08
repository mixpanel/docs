---
title: "iOS - Objective-C - Advanced"
slug: "ios"
hidden: false
createdAt: "2018-04-12T18:56:23.972Z"
updatedAt: "2022-10-11T21:15:03.702Z"
---
# Getting Started

Please refer to our [Quickstart Guide](ios-objective-c-quickstart).

# Sending Events

We recommend tracking only five to seven events in your application instead of tracking too many things to start. Ideally, you track users going through your initial user experience and one key metric that matters for your application (e.g. a video streaming service might choose "Watched Video" as a key metric).

Once you've initialized the library, you can track an event by calling <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/track:properties:">track:properties:</a> with the event name and properties.
[block:code]
{
  "codes": [
    {
      "code": "Mixpanel *mixpanel = [Mixpanel sharedInstance];\n[mixpanel track:@\"Plan selected\"\n     properties:@{ @\"Plan\": @\"Premium\" }];\n",
      "language": "objectivec"
    }
  ]
}
[/block]

# Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/timeEvent:">timeEvent:</a>. This will mark the "start" of your action, which you can then finish with a track call. The time duration is then recorded in the "Duration" property.
[block:code]
{
  "codes": [
    {
      "code": "Mixpanel *mixpanel = [Mixpanel sharedInstance];\n[mixpanel timeEvent:@\"Image Upload\"];\n[self uploadImageWithSuccessHandler:^{\n    [mixpanel track:@\"Image Upload\"];\n}];",
      "language": "objectivec"
    }
  ]
}
[/block]

# Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event—for example, the user's age, gender, or source.

To make things easier, you can register these properties as super properties. If you do, we will automatically include them with all tracked events. Super properties are saved to device storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](https://help.mixpanel.com/hc/en-us/articles/115004613766).

To set super properties, call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperProperties:">registerSuperProperties:</a>
[block:code]
{
  "codes": [
    {
      "code": "// Send a \"Plan: Mega\" property will be sent\n// with all future track calls.\n[mixpanel registerSuperProperties:@{@\"Plan\": @\"Mega\"}];",
      "language": "objectivec"
    }
  ]
}
[/block]
Going forward, whenever you track an event, super properties will be included as properties. For instance, if you call:
[block:code]
{
  "codes": [
    {
      "code": "[mixpanel track:@\"Signup\" properties:@{\n    @\"Source\": @\"Twitter\"\n}];",
      "language": "objectivec"
    }
  ]
}
[/block]
after making the above call to <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperProperties:">registerSuperProperties:</a>, it is just like adding the properties directly:
[block:code]
{
  "codes": [
    {
      "code": "[mixpanel track:@\"Signup\" properties:@{\n    @\"Source\": @\"Twitter\",\n    @\"Plan\": @\"Mega\"\n}];",
      "language": "objectivec"
    }
  ]
}
[/block]
## Setting Super Properties Only Once
If you want to store a super property only once (often for things like ad campaign or source), you can use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperPropertiesOnce:">registerSuperPropertiesOnce:</a>. This function behaves like <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperProperties:">registerSuperProperties:</a> and has the same interface, but it doesn't override super properties you've already saved.
[block:code]
{
  "codes": [
    {
      "code": "[mixpanel registerSuperPropertiesOnce:@{@\"Source\": @\"ad-01\"}];",
      "language": "objectivec"
    }
  ]
}
[/block]
This means that it's safe to call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperPropertiesOnce:">registerSuperPropertiesOnce:</a> with the same property on every app load, and it will only set it if the super property doesn't exist.

## Super Properties Live in Local Storage
Our mobile libraries store your super properties in local storage. They will persist so long as the app is installed (between launches and updates). Uninstalling the app will remove that customers super properties.


# Managing User Identity

You can handle the identity of a user using the [identify](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/identify:) and [alias](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/alias) methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

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
    "0-2": "A string that uniquely identifies a user - we recommend a user id. If not provided, the distinctId currently in the localStorage is used."
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
      "code": "// Ensure all future events sent from\n// the device will have the distinctId 13793\n[mixpanel identify:@\"13793\"];",
      "language": "objectivec"
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
The [alias](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/alias) method creates an alias which Mixpanel will use to remap one id to another. Multiple aliases can point to the same identifier.

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
    "1-0": "**distinctId**",
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
      "code": "[mixpanel createAlias:@\"New ID\" forDistinctID:mixpanel.distinctId];\n[mixpanel createAlias:@\"Newer ID\" forDistinctID:mixpanel.distinctId];",
      "language": "objectivec"
    }
  ]
}
[/block]
Aliases can also be chained - the following is a valid example:
[block:code]
{
  "codes": [
    {
      "code": "[mixpanel createAlias:@\"new_id\" forDistinctID:@\"existing_id\"];\n// You can chain aliases\n[mixpanel createAlias:@\"newer_id\" forDistinctID:@\"new_id\"];",
      "language": "objectivec"
    }
  ]
}
[/block]
Aliases cannot point to multiple identifiers - the following example will not work:
[block:code]
{
  "codes": [
    {
      "code": "[mixpanel createAlias:@\"new_id\" forDistinctID:@\"existing_id\"];\n//this is invalid as 'new_id' already points to 'existing_id'\n[mixpanel createAlias:@\"new_id\" forDistinctID:@\"newer_id\"];",
      "language": "objectivec"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "danger",
  "title": "ID Merge",
  "body": "If a project does not have [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) enabled, the best practice is to call `alias` once when a unique ID is first created for a user (e.g., when a user first registers for an account). Do not use `alias` multiple times for a single user without ID Merge enabled."
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
Reset generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identity Management: Best Practices](https://help.mixpanel.com/hc/en-us/articles/115004497803) article.

Beginning with version v3.6.2, Mixpanel no longer uses the IFA(ID for Advertisers) but uses a randomly generated UUID as the default distinct ID instead. After you call reset, Mixpanel generates a new distinct_id.

If you want to use IFV(identifierForVendor) as the distinct_id, you can set
`MIXPANEL_UNIQUE_DISTINCT_ID=1` in build settings `Preprocessor Macros` on the Mixpanel framework target. After you call reset, the IFV will not change. However, when a user removes and then re-installs the app, the IFV will change with each installation.
# Storing User Profiles

In addition to events, you can store user profiles in Mixpanel. Profiles are persistent sets of properties that describe a user—things like name, email address, and signup date.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.
[block:callout]
{
  "type": "info",
  "body": "Before you send profile updates, you must call <a style=\"font-family: courier\" href=\"https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/identify:\">identify:</a>. This ensures that you only have actual registered users saved in the system.",
  "title": "NOTE"
}
[/block]
##Setting Profile Properties
You can set properties on a user profile with <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelPeople.html#//api/name/set:">people.set:</a>.

Updates to user profiles are queued on the device until <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/identify:">identify</a> is called.
[block:code]
{
  "codes": [
    {
      "code": "// Sets user 13793's \"Plan\" attribute to \"Premium\"\n[mixpanel.people set:@{@\"Plan\": @\"Premium\"}];",
      "language": "objectivec"
    }
  ]
}
[/block]
This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".
[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Pick your property names wisely. Feel free to use capitalization and spaces in between words. \nThere are a few limitations:\n1. Your property names should not begin with `$` or `mp_`. These properties are reserved for special properties sent by Mixpanel.\n2. Your property names cannot begin or end with a space as they will automatically be trimmed.\n3. Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.\n\nClick [here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties."
}
[/block]
##Incrementing Numeric Properties
You can use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelPeople.html#//api/name/increment:">people increment:</a> to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.
[block:code]
{
  "codes": [
    {
      "code": "// Here we increment the user's point count by 500.\n[mixpanel.people increment:@\"point count\" by:@500];\n\n// Pass an NSDictionary to increment multiple properties\n[mixpanel.people increment:@{\n    @\"dollars spent\": @17,\n    @\"credits remaining\": @-34\n}];",
      "language": "objectivec"
    }
  ]
}
[/block]
##Other Types of Profile Updates
There are a few other types of profile updates. To learn more, please review the full [MixpanelPeople API documentation](https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelPeople.html).
# Tracking Revenue

Mixpanel makes it easy to analyze the revenue you earn from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelPeople.html#//api/name/trackCharge:">people trackCharge:</a>. This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.
[block:code]
{
  "codes": [
    {
      "code": "// Tracks $100.77 in revenue for user 13793\n[mixpanel.people trackCharge:@(100.77)];\n\n// Refund this user $50\n[mixpanel.people trackCharge:@-50];\n\n// Tracks $25 in revenue for user 13793 on the 2nd of\n// January\n[mixpanel.people trackCharge:@25 withProperties:@{\n    @\"$time\": \"2016-01-02T00:00:00\"\n}];",
      "language": "objectivec"
    }
  ]
}
[/block]

# Group Analytics


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
        "https://files.readme.io/dc9c5a7-Screen_Shot_2019-12-10_at_11.23.26_AM.png",
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

## Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/getGroup:groupID:">getGroup().set()</a> to build a group profile. It is important to the `group_key`, `group_id`, and one property so that the profile is not empty. 
[block:code]
{
  "codes": [
    {
      "code": "[[self.mixpanel getGroup:@\"Company\", groupID:@“Mixpanel”] set:@{@\"h\": @\"yo”}]；",
      "language": "objectivec"
    }
  ]
}
[/block]
## Setting Group Profile Properties
You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/Group.html#/s:8Mixpanel5GroupC3set10propertiesySDySSAA0A4Type_pG_tF">getGroup():groupID()</a>.

The <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/Group.html#/s:8Mixpanel5GroupC3set10propertiesySDySSAA0A4Type_pG_tF">getGroup():groupID()</a> method can be chained with other commands that edit properties specific to the group.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.
### set
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/Group.html">mixpanel.getGroup().set()</a> updates or adds a property to a group.
[block:code]
{
  "codes": [
    {
      "code": "[[self.mixpanel getGroup:@\"Company\", groupID:@“Mixpanel”] set:@{@\"h\": @\"yo”}]；",
      "language": "objectivec"
    }
  ]
}
[/block]
### set once
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelGroup.html">mixpanel.getGroup().setOnce()</a> adds a property value to a group only if it has not been set before.
[block:code]
{
  "codes": [
    {
      "code": "[[self.mixpanel getGroup:@\"Company\", groupID:@“Mixpanel”] setOnce:@{@\"h\": @\"just once”}]；",
      "language": "objectivec"
    }
  ]
}
[/block]
### unset
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelGroup.html">mixpanel.getGroup().unset()</a> unsets a specific property in the group.
[block:code]
{
  "codes": [
    {
      "code": "[[self.mixpanel getGroup:@\"Company\", groupID:@“Mixpanel”] unset:@\"c\"]；\n",
      "language": "objectivec"
    }
  ]
}
[/block]
### remove
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelGroup.html">mixpanel.getGroup().remove()</a> removes a specific value in a list property.
[block:code]
{
  "codes": [
    {
      "code": "[[self.mixpanel getGroup:@\"Company\", groupID:@“Mixpanel”] remove:@\"c\" value:@5]；\n",
      "language": "objectivec"
    }
  ]
}
[/block]
### union
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelGroup.html">mixpanel.getGroup().union()</a> adds the specified values to a list property and ensures that those values only appear once.
[block:code]
{
  "codes": [
    {
      "code": "[[self.mixpanel getGroup:@\"Company\", groupID:@“Mixpanel”] union:@\"c\" values:@[ @5, @4 ]]；\n",
      "language": "objectivec"
    }
  ]
}
[/block]
### delete
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelGroup.html#//api/name/deleteGroup">mixpanel.getGroup().deleteGroup()</a> deletes a group.
[block:code]
{
  "codes": [
    {
      "code": "[[self.mixpanel getGroup:@\"Company\", groupID:@“Mixpanel”] delete]；\n",
      "language": "objectivec"
    }
  ]
}
[/block]

# Opting Users Out of Tracking

Client-side tracking of individual user data can be stopped or resumed by controlling a user’s opt-out/opt-in state. Opt-out methods and library configuration settings only affect data sent from a single library instance. Data sent from other sources to Mixpanel’s APIs will still be ingested regardless of whether the user is opted out locally.

The opt-out/opt-in state of a user is controlled by an opt-out flag that is stored in the local storage of the user’s device. If the value of the flag is true, then the user is opted-out and will not be tracked. If the opt-out flag is false, then the user is tracked. The flag is not set when the SDK is initialized, so the initial state is neither opted in nor opted out. Without the flag set, the user will be tracked by default.

To opt a user out of tracking locally, use the <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/optOutTracking">optOutTracking</a> method. To resume tracking for an individual user, use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/optInTracking">optInTracking</a>. Call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/hasOptedOutTracking">hasOptedOutTracking</a> to check user’s opt-out status locally. By default, an "$opt_in" event is sent every time that a user opts in. 
[block:code]
{
  "codes": [
    {
      "code": "// Opt a user out of data collection\nMixpanel *mixpanel = [Mixpanel sharedInstance];\n[mixpanel optOutTracking];\n\n// Check a user's opt-out status \n// Returns true if user is opted out of tracking locally\nBOOL hasOptedOutTracking = [mixpanel hasOptedOutTracking];\n",
      "language": "objectivec"
    }
  ]
}
[/block]
## Opting Users Out of Tracking by Default
Mixpanel’s tracking libraries will send user data by default. Explicitly initializing a default opt-out state of YES will opt-out all users by default, preventing data from sending unless a user’s opt-out state is set to NO.
[block:code]
{
  "codes": [
    {
      "code": "// Initializing a default opt-out state of YES \n// will prevent data from being collected by default\n\nMixpanel *mixpanel = \n    [Mixpanel sharedInstanceWithToken:@\"YOUR_API_TOKEN\" trackAutomaticEvents:YES\n        optOutTrackingByDefault:YES];",
      "language": "objectivec"
    }
  ]
}
[/block]
## Delete Existing Data
Opting users out of tracking will stop any future tracking. This does not automatically delete data that has already been collected. Mixpanel's [deletion API](doc:managing-personal-data) can be used to delete existing data.
# Automatically Track Events

After installing the library into your iOS app, Mixpanel will [automatically collect common mobile events](https://help.mixpanel.com/hc/en-us/articles/115004596186-Which-common-mobile-events-can-Mixpanel-collect-on-my-behalf-automatically-). You can enable/disable automatic collection in the Mixpanel settings menu. In addition, Mixpanel allows you to use our in-browser editor to add tracking on the fly. 

Navigate to our editor by clicking the gear in the upper righthand corner of your Mixpanel project and selecting **Codeless Tracking** from the dropdown.

# Debugging and Logging

You can turn on Mixpanel logging by setting the `enableLogging` flag
[block:code]
{
  "codes": [
    {
      "code": "[Mixpanel sharedInstance].enableLogging = YES;",
      "language": "objectivec"
    }
  ]
}
[/block]
Alternatively, you can add the following Preprocessor Macros in Build Settings:

* `MIXPANEL_DEBUG=1` - logs queueing and flushing of events to Mixpanel
* `MIXPANEL_ERROR=1` - logs any errors related to connections or malformed events

If you're using CocoaPods, you'll need to add this to the Pod target instead of your main app project's target:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5bf3fa7-ios-cocoapod-debug.png",
        "ios-cocoapod-debug.png",
        1247,
        325,
        "#e8ecf1"
      ]
    }
  ]
}
[/block]
You can also add this to your Podfile to ensure everyone on your team will always have logging enabled:
[block:code]
{
  "codes": [
    {
      "code": "post_install do |installer|\n  installer.pods_project.targets.each do |target|\n    target.build_configurations.each do |config|\n      settings = config.build_settings['GCC_PREPROCESSOR_DEFINITIONS']\n      settings = ['$(inherited)'] if settings.nil?\n\n      if target.name == 'Pods-MyProject-Mixpanel'\n        settings << 'MIXPANEL_DEBUG=1'\n        settings << 'MIXPANEL_ERROR=1'\n      end\n\n      config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] = settings\n    end\n  end\nend",
      "language": "ruby"
    }
  ]
}
[/block]

# About ARC

As of version 2.2.0 the Mixpanel iOS library uses ARC.

If you are using Mixpanel in a project that does not have ARC enabled, you need to enable ARC for just the Mixpanel source files in your Xcode project settings. This is done by adding the `-fobj-arc` compiler flag to each Mixpanel file under `Build Phases -> Compile Sources`.

# EU Data Residency

Route data to Mixpanel's EU servers by setting the `serverURL` property after initializing the client. 

```objc
self.mixpanel = [Mixpanel sharedInstanceWithToken:@"MIXPANEL_TOKEN" launchOptions:launchOptions];
self.mixpanel.serverURL = @"https://api-eu.mixpanel.com";
```

# Release History
[See All Releases](https://github.com/mixpanel/mixpanel-iphone/releases).
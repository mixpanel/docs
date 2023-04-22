---
title: "iOS - Swift - Advanced"
slug: "swift"
hidden: false
metadata: 
  title: "SDK Integration: iOS Swift Advanced | Mixpanel Developer Docs"
  description: "Read our advanced documentation on Mixpanel's iOS Swift SDK integration. You'll dive deeper into additional configurations, use cases, and more."
createdAt: "2018-09-25T20:58:03.357Z"
updatedAt: "2023-02-04T01:11:56.138Z"
---
## Getting Started

Please refer to our [Quickstart Guide](ios-swift-quickstart).

The [Full API Reference](https://mixpanel.github.io/mixpanel-swift/), [Library Source Code](https://github.com/mixpanel/mixpanel-swift), and an [Example Application](https://github.com/mixpanel/mixpanel-swift/tree/master/MixpanelDemo/MixpanelDemo) is documented in our GitHub repo.

## Sending Events

We recommend tracking only five to seven events in your application instead of tracking too many things to start. Ideally, you track users going through your initial user experience and one key metric that matters for your application (e.g. YouTube might choose "Watched Video" as a key metric).

Once you've initialized the library, you can track an event by calling <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance5trackFT5eventGSqSS_10propertiesGSqGVs10DictionarySSPs9AnyObject____T_"> track(event:properties:) </a> with the event name and properties.
```swift Swift
Mixpanel.mainInstance().track(event: "Plan Selected",
```

## Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance4timeFT5eventSS_T_"> time(event:)</a>. This will mark the "start" of your action, which you can then finish with a track call. The time duration is then recorded in the "Duration" property.
```swift Swift
Mixpanel.mainInstance().time(event: "Image Upload")
//...some time later
Mixpanel.mainInstance().track(event: "Image Upload")
```


## Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event—for example, the user's age, gender, or source.

To make things easier, you can register these properties as super properties. If you do, we will automatically include them with all tracked events. Super properties are saved to device storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](https://help.mixpanel.com/hc/en-us/articles/115004613766).

To set super properties, call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance23registerSuperPropertiesFGVs10DictionarySSPs9AnyObject__T_"> registerSuperProperties(_:) </a>

```swift Swift
// Send a "Plan: Mega" property will be sent
// with all future track calls.
Mixpanel.mainInstance().track(event: "Signup",
    properties:["Source": "Twitter"])
```

Going forward, whenever you track an event, super properties will be included as properties. For instance, if you call:
```swift Swift
// Send a "Plan: Mega" property will be sent
// with all future track calls.
Mixpanel.mainInstance().registerSuperProperties(["Plan": "Mega"])
```

after making the above call to registerSuperProperties, it is just like adding the properties directly:
```swift Swift
Mixpanel.mainInstance().track(event: "Signup",
    properties:[ "Plan" : "Mega", "Source": "Twitter"])
```

### Setting Super Properties Only Once
If you want to store a super property only once (often for things like ad campaign or source), you can use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance27registerSuperPropertiesOnceFTGVs10DictionarySSPs9AnyObject__12defaultValueGSqPS2____T_"> registerSuperPropertiesOnce(_:defaultValue:)</a>. This function behaves like <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC23registerSuperPropertiesyySDySSAA0A4Type_pGF"> registerSuperProperties(_:)</a> and has the same interface, but it doesn't override super properties you've already saved.

```swift Swift
Mixpanel.mainInstance().registerSuperPropertiesOnce(["Source": "ad-01"])
```

This means that it's safe to call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance27registerSuperPropertiesOnceFTGVs10DictionarySSPs9AnyObject__12defaultValueGSqPS2____T_"> registerSuperPropertiesOnce(_:defaultValue:)</a> with the same property on every app load, and it will only set it if the super property doesn't exist.

### Super Properties Live in Local Storage
Our mobile libraries store your super properties in local storage. They will persist so long as the app is installed (between launches and updates). Uninstalling the app will remove that customers super properties.


## Managing User Identity

You can handle the identity of a user using the `identify` and `alias` methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

### Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they visit the site.

Call `identify` when you know the identity of the current user, typically after log-in or sign-up. We recommend against using `identify` for anonymous visitors to your site. 


### Call Reset on Logout
Reset generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identifying Users](/tracking/how-tos/identifying-users) article.

Note: Calling reset frequently can lead to users quickly exceeding the 500 distinct_id per identity cluster limit. Once the 500 limit is reached you will no longer be able to add additional distinct_ids to the users identity cluster.

Beginning with version v2.7.7, Mixpanel no longer uses the IFA(ID for Advertisers) but uses a randomly generated UUID as the default distinct ID instead. After you call reset, Mixpanel generates a new distinct_id.

If you want to use IFV(identifierForVendor) as the distinct_id, you can set
`MIXPANEL_UNIQUE_DISTINCT_ID` in build settings `Active Compilation Conditions` on the Mixpanel framework target. After you call reset, the IFV will not change. However, when a user removes and then re-installs the app, the IFV will change with each installation.


## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel. User profiles are persistent sets of properties that describe a user—things like name, email address, and signup date.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

### Setting Profile Properties
You can set properties on a user profile with <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/People.html#/s:FC8Mixpanel6People3setFT8propertySS2toPs9AnyObject__T_"> people.set(property:to:)</a>.

```swift Swift
// Sets user 13793's "Plan" attribute to "Premium"
Mixpanel.mainInstance().people.set(properties: [ "plan":"Premium", "$email":"joe.doe@example.com"])
```

This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".

### Incrementing Numeric Properties
You can use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/People.html#/s:FC8Mixpanel6People9incrementFT8propertySS2bySd_T_">people.increment(property:by:)</a> to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.
```swift Swift
// Here we increment the user's point count by 500.
Mixpanel.mainInstance().people.increment(property: "point count",
    by: 500)

// Pass an NSDictionary to increment multiple properties
Mixpanel.mainInstance().people.increment(properties:
    ["dollars spent": 17, "credits remaining": -34])
```

### Other Types of Profile Updates
There are a few other types of profile updates. To learn more, please review the [full MixpanelPeople API documentation](https://mixpanel.github.io/mixpanel-swift/Classes/People.html).

## Tracking Revenue

Mixpanel makes it easy to analyze the revenue you earn from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/People.html#/s:FC8Mixpanel6People11trackChargeFT6amountSd10propertiesGSqGVs10DictionarySSPs9AnyObject____T_"> people.trackCharge(amount:)</a>. This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.

```swift Swift
// Tracks $100.77 in revenue for user 13793
Mixpanel.mainInstance().people.trackCharge(amount: 100.77)

// Refund this user 50 dollars
Mixpanel.mainInstance().people.trackCharge(amount: -50)
```

## Group Analytics
Mixpanel Group Analytics is a paid add-on that allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` will allow analysis at a company or group level when using Mixpanel analytics. Read [this article](/analysis/advanced/group-analytics) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “company” is chosen for Group Analytics, “company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

### Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.

### Adding Users to a Group
Adding users to groups causes the `group_key` and `group_id` to send as a property key and value for all events triggered by that user on the device. You can add multiple values for a single user to the `group_key` list property.

Similar to a `distinct_id`, the `group_key` allows Mixpanel to group events by an identifier for analysis. A `group_key`, however, is a group level identifier and not a user level identifier like the `distinct_id`.

You can add users to groups by calling the <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC8setGroup8groupKey0E3IDsySS_SayAA0A4Type_pGtF">setGroup()</a> method. 
```swift Swift
Mixpanel.mainInstance().setGroup(groupKey: "Company", groupID: “Mixpanel”)
```

You can call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC8addGroup8groupKey0E2IDySS_AA0A4Type_ptF">addGroup()</a> to add any additional groups to an existing list.

```swift Swift
Mixpanel.mainInstance().addGroup(groupKey: "Company", groupID: “Mixpanel”)
```

You can call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC11removeGroup8groupKey0E2IDySS_AA0A4Type_ptF">removeGroup()</a> to remove any additional groups from an existing list.

```swift Swift
Mixpanel.mainInstance().removeGroup(groupKey: "Company", groupID: “Mixpanel”)
```

### Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/Group.html">getGroup().set()</a> to build a group profile. It is important to the `group_key`, `group_id`, and one property so that the profile is not empty. 

```swift Swift
Mixpanel.mainInstance().getGroup(groupKey: "Company", groupID: “Mixpanel”).set(property: "g", to: "yo")
```

### Setting Group Profile Properties
You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC8getGroup8groupKey0E2IDAA0D0CSS_AA0A4Type_ptF">getGroup().set()</a>.

```swift Swift
Mixpanel.mainInstance().getGroup(groupKey: "Company", groupID: “Mixpanel”)
```

The <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">getGroup()</a> method can be chained with other commands that edit properties specific to the group.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

#### set
<a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/Group.html">mixpanel.getGroup().set()</a> updates or adds a property to a group.

```swift Swift
Mixpanel.mainInstance().getGroup(groupKey: "Company", groupID: “Mixpanel”).set(property: "g", to: "yo")
```

For all Group functions, see the [reference](https://mixpanel.github.io/mixpanel-swift/Classes/Group.html)

## Debugging and Logging

You can turn on Mixpanel logging by enabling the following flag:
```swift Swift
Mixpanel.mainInstance().loggingEnabled = true
```


## EU Data Residency

Route data to Mixpanel's EU servers by setting the `serverURL` property after initializing the client. 

```swift
mixpanel = Mixpanel.initialize(token: "MIXPANEL_TOKEN")
mixpanel.serverURL = "https://api-eu.mixpanel.com"
```

### [Legacy] Automatically Tracked Events

Mixpanel's SDKs have a legacy feature to automatically collect common mobile events. We don't recommend enabling this, as these events rely on client-side state and can be unreliable.

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $ae_first_open | First App Open | Tracks the first time the user has opened the app. This event is retriggered if the user reinstalls the app or clears local storage. |
| $ae_updated | App Updated | Executes when a user updates the app from the previous version. |
| $ae_session | App Session | Executes when a user spends more than 10 seconds in the app. |
| $ae_iap | In App Purchase (IAP) | Executes when a user conducts an in-app purchase through your app. |


### Default Properties Collected by Mixpanel

#### Event Properties

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $device_id | Device ID | Autogenerated ID that is local to the device. Calling reset() changes this. |
| $user_id | User ID | The identified ID of the user. Calling identify() sets this. |
| mp_lib | Mixpanel Library | The Mixpanel library that sent the event. |
| $app_build_number | App Build Number | General build of this app. |
| $app_version_string | App Version | Current app version. |
| $carrier | Carrier | Wireless carrier of the device owner. |
| $ios_version | iOS Version | Current version of iOS on the device. |
| $lib_version | Lib Version | Mixpanel library version. |
| mp_lib | Mixpanel Library | Mixpanel Library that sent the event. |
| $model | Model | Device model ID, in format “iPad 3,4”.  |
| $os | Operating System | OS of the event sender. |
| $radio | Radio | Current https://www.objc.io/issues/5-ios7/iOS7-hidden-gems-and-workarounds/#know-your-radio (3G, 4G, LTE, etc). |
| $screen_height | Screen Height | Height, in points, of the device screen. |
| $screen_width | Screen Width | Width, in points, of the device screen. |
| $wifi | Wifi | Set to true if user’s device has an active, available Wifi connection, false if not. |
| mp_processing_time_ms | Processing Time | UTC timestamp of when the event was processed by our servers. |
| $mp_api_timestamp_ms | API Timestamp | Time at which the event was received by our API. |
| $insert_id | Insert ID | A unique identifier for the event, used to deduplicate events that are accidentally sent multiple times. |

#### User Properties

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $timezone | BrowserTimezone | Timezone of the event sender, parsed from IP. |
| $os | Operating System | OS of the event sender. |
| $mp_api_timestamp_ms | API Timestamp | Time at which the event was received by our API. |
| $ios_app_release | iOS App Release | General build of this app |
| $ios_app_version | iOS App Version | Full detail of this app build. |
| $ios_device_model | iOS Device Model | Device model ID, in format “iPad 3,4” |
| $last_seen | Updated At | The last time a user profile property was set or updated (cannot be set manually). |
| Total App Sessions | Total App Sessions | The total number of “App Session” events that the user has sent. |
| Total App Session Length | Total App Session Length | The total number of seconds that a user has spent using the app. This is calculated by adding the “Duration” property attached to the “App Session” event. |
| First App Open Date | First App Open Date | The date the app was first opened on a user’s device. |


## Release History
[See All Releases](https://github.com/mixpanel/mixpanel-swift/releases).

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

Please refer to our [Quickstart Guide](../mobile).

The [Full API Reference](http://mixpanel.github.io/mixpanel-android/index.html), [Library Source Code](https://github.com/mixpanel/mixpanel-android), and an [Example Application](https://github.com/mixpanel/sample-android-mixpanel-integration) is documented in our GitHub repo.

## Sending Events

Once you've initialized the library, you can track an event using `.track()` with the event name and properties.

```java Java
MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

JSONObject props = new JSONObject();
props.put("Gender", "Female");
props.put("Plan", "Premium");

mixpanel.track("Plan Selected", props);
```


## Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using `.timeEvent()`. This will mark the "start" of your action, which will be timed until you finish with a track call. The time duration is then recorded in the "Duration" property.
```java Java
MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

// start the timer for the event "Image Upload"
mixpanel.timeEvent("Image Upload");

// stop the timer if the imageUpload() method returns true
if(imageUpload()){
    mixpanel.track("Image Upload");
}
```


## Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event - for example, the user's age, gender, source, or initial referrer.

To make things easier, you can register these properties as super properties. If you tell us just once that these properties are important, we will automatically include them with all events sent. Super properties are saved to device storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](https://mixpanel.com/help/questions/articles/what-properties-do-mixpanels-libraries-store-by-default).

To set super properties, call `.registerSuperProperties()`
```
MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

// Send a "User Type: Paid" property will be sent
// with all future track calls.
JSONObject props = new JSONObject();
props.put("User Type", "Paid");
mixpanel.registerSuperProperties(props);
```
The next time you track an event, the super properties you just set will be included as properties.

Super properties are saved to device storage, and will persist between executions of your app.

## Setting Super Properties Once and Only Once

If you want to store a super property only once (for example, a date of first login), you can use `.registerSuperPropertiesOnce()`.

## Super Properties Live in Local Storage

Our mobile libraries store your super properties in local storage. They will persist so long as the app is installed (between launches and updates). Uninstalling the app will remove that customers super properties.

## Managing User Identity

You can handle the identity of a user using the [identify](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify-java.lang.String-)
method. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms.

### Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they use the app.

Call `identify` when you know the identity of the current user, typically after log-in or sign-up. We recommend against using `identify` for anonymous visitors to your site.

```java Java
MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

// Ensure all future events sent from
// the device will have the distinct_id 13793
mixpanel.identify("13793");
```

In general, if you use [identify](https://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify(java.lang.String)), you should call it as soon as the user logs in to your application. This will track all of their authenticated application usage to the correct user ID.


## Call Reset at Logout
[Reset](https://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#reset()) generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identifying Users](/docs/tracking/how-tos/identifying-users) article.

Note: Reset should only be used if multiple users share a device. Calling reset frequently can lead to users quickly exceeding the 500 distinct_id per identity cluster limit. Once the 500 limit is reached you will no longer be able to add additional distinct_ids to the users identity cluster.


## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel's [Behavioral Analytics](https://mixpanel.com/people/) product. Profiles are persistent sets of properties that describe a user - things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did.

You must call `.identify()` before sending user profiles.

## Setting Profile Properties

You can set properties on a user profile with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#set-java.lang.String-java.lang.Object-">MixpanelAPI.getPeople().set</a>.

```java Java
MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

// identify must be called before
// user profile properties can be set
mixpanel.identify("13793");

// Sets user 13793's "Plan" attribute to "Premium"
mixpanel.getPeople().set("Plan", "Premium");
```

This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".

## Incrementing Numeric Properties

You can use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#set-java.lang.String-java.lang.Object-">MixpanelAPI.getPeople().increment</a> to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.

```java Java
// Add 500 to the current value of
// "points earned" in Mixpanel
mixpanel.getPeople().increment("points earned", 500);

// Pass a Map to increment multiple properties
Map<String, Integer> properties =
    new HashMap<String, Integer>();
properties.put("dollars spent", 17);
// Subtract by passing a negative value
properties.put("credits remaining", -34);

mixpanel.getPeople().increment(properties);
```

## Appending to List Properties

`.getPeople.append()` creates an update that adds an item to a list-valued property. The value you send with the append is added to the end of the list. If the property doesn't exist, it will be created with one element list as its value.

```java Java
MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

//Identify the user profile that is going to be updated
mixpanel.identify("13793");

//Add the color green to the list property "Favorite Colors"
//A new list property is created if it doesn't already exist
mixpanel.getPeople().append("Favorite Colors", "Green")
```

## Other Types of Profile Updates

There are a few other types of profile updates. They can be accessed through the [MixpanelPeople class](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html).


## Tracking Revenue

Mixpanel makes it easy to analyze the revenue you make from individual customers. By associating charges with User Analytics profiles, you can compare revenue across different customer segments and calculate customer lifetime value.

You can track a single transaction with `MixpanelAPI.getPeople().trackCharge()`. This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.

```java Java
MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

// Make getPeople() identify has been
// called before making revenue updates
mixpanel.identify("13793");

// Tracks $100 in revenue for user 13793
mixpanel.getPeople().trackCharge(100, null);

// Refund this user 50 dollars
mixpanel.getPeople().trackCharge(-50, null);

// Tracks $25 in revenue for user 13793
// on the 2nd of january
JSONObject properties = new JSONObject()
properties.put("$time", "2012-01-02T00:00:00");
mixpanel.getPeople().trackCharge(25, properties);
```

## Group Analytics
Mixpanel Group Analytics is a paid add-on that allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` will allow analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/analysis/advanced/group-analytics) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “company” is chosen for Group Analytics, “company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values.

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

## Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.

![image](/230695638-ffcc010d-e07f-474f-81dd-3c3eab33cefa.png)

Enter an event property to attribute the group key to. You can also enter a display name for the group key. Click **Save**.

## Adding Users to a Group
Adding users to groups causes the `group_key` and `group_id` to send as a property key and value for all events triggered by that user on the device. You can add multiple values for a single user to the `group_key` list property.

Similar to a `distinct_id`, the `group_key` allows Mixpanel to group events by an identifier for analysis. A `group_key`, however, is a group level identifier and not a user level identifier like the `distinct_id`.

You can add users to groups by calling the `.setGroup()` method:
```java Java
mMixpanel.setGroup("group key", "group id");
```

You can call `.addGroup()` to add any additional groups to an existing list.
```java Java
mMixpanel.addGroup("group key", "group id");
```

You can call `.removeGroup()` to remove any additional groups from an existing list.
```java Java
mMixpanel.removeGroup("group key", "group id");
```


## Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call `getGroup.set()` to build a group profile. It is important to the `group_key`, `group_id`, and one property so that the profile is not empty.
```java Java
mMixpanel.getGroup("group key", "group id").set("SET NAME", "SET VALUE");
```

## Setting Group Profile Properties
You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">getGroup().set()</a>.

```java Java
mMixpanel.getGroup("group key", "group id").set("SET NAME", "SET VALUE");

mMixpanel.getGroup("group key", "group id").setMap((new HashMap<>()).put("SET MAP INT", 1));
```

The <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">getGroup()</a> method can be chained with other commands that edit properties specific to the group.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

### set
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-android/index.html">mixpanel.getGroup().set()</a> updates or adds a property to a group.

```java Java
mMixpanel.getGroup("group key", "group id").set("SET NAME", "SET VALUE");

mMixpanel.getGroup("group key", "group id").setMap((new HashMap<>()).put("SET MAP INT", 1));
```

Mixpanel provides other functions for working with Group Profiles, you can see the full reference [here](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.Group.html).

## Debugging and Logging

Enabling Mixpanel debugging and logging allows you to see the debug output from the Mixpanel Android library. This may be useful in determining when track calls go out or in-app messages are fetched. To enable Mixpanel debugging and logging, you will want to add the following permission within your `AndroidManifest.xml` inside the `<application>` tag:
```xml Java
...
<application>
    <meta-data
      android:name="com.mixpanel.android.MPConfig.EnableDebugLogging"
      android:value="true" />
    ...
</application>
...
```


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

## [Legacy] Automatically Tracked Events

Mixpanel's SDKs have a legacy feature to automatically collect common mobile events. We don't recommend enabling this, as these events rely on client-side state and can be unreliable.

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $ae_first_open | First App Open | Tracks the first time the user has opened the app. This event is retriggered if the user reinstalls the app or clears local storage. |
| $ae_updated | App Updated | Executes when a user updates the app from the previous version. |
| $ae_crashed | App Crashed | Executes when Mixpanel receives either an exception or a signal that indicated the app has crashed. |
| $ae_session | App Session | Executes when a user spends more than 10 seconds in the app. |
| $ae_iap | In App Purchase (IAP) | Executes when a user conducts an in-app purchase through your app. |


## Default Properties Collected by Mixpanel

### Event Properties

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $device_id | Device ID | Autogenerated ID that is local to the device. Calling reset() changes this. |
| $user_id | User ID | The identified ID of the user. Calling identify() sets this. |
| mp_lib | Mixpanel Library | The Mixpanel library that sent the event. |
| $app_build_number | App Build Number | General build of this app. |
| $app_version_string | App Version | Current app version. |
| $bluetooth_enabled | Bluetooth | True if bluetooth is enabled. |
| $bluetooth_version | Bluetooth Version | "none”, “ble”, or “classic” |
| $brand | Brand | Device brand. |
| $carrier | Carrier | Wireless carrier of the device owner. |
| $google_play_services | Google Play Services | True if Google Play Services is installed and enabled on the device. |
| $has_nfc | Has NFC | True if device has NFC functionality. |
| $has_telephone | Has Telephone | True if device has telephone functionality. |
| $ios_version | iOS Version | Current version of iOS on the device. |
| $lib_version | Lib Version | Mixpanel library version. |
| mp_lib | Mixpanel Library | Mixpanel Library that sent the event. |
| $manufacturer | Manufacturer | Device manufacturer. |
| $model | Model | Device model ID, in format “iPad 3,4”.  |
| $os | Operating System | OS of the event sender. |
| $radio | Radio | Current https://www.objc.io/issues/5-ios7/iOS7-hidden-gems-and-workarounds/#know-your-radio (3G, 4G, LTE, etc). |
| $screen_dpi | Screen DPI | Pixel density of the screen. |
| $screen_height | Screen Height | Height, in pixels, of the device screen. |
| $screen_width | Screen Width | Width, in pixels, of the device screen. |
| $wifi | Wifi | Set to true if user’s device has an active, available Wifi connection, false if not. |
| mp_processing_time_ms | Processing Time | UTC timestamp of when the event was processed by our servers. |
| $mp_api_timestamp_ms | API Timestamp | Time at which the event was received by our API. |
| $insert_id | Insert ID | A unique identifier for the event, used to deduplicate events that are accidentally sent multiple times. |

### User Properties

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $timezone | BrowserTimezone | Timezone of the event sender, parsed from IP. |
| $android_app_version_code | Android App Version Code | Current app version. |
| $android_app_version | Android App Version | Current app version. |
| $android_lib_version | Android Lib Version | Version of Mixpanel library. |
| $android_os_version | iOS Device Model | Device model ID, in format “iPad 3,4” |
| $android_brand | Android Brand | Device brand |
| $android_model | Android Model | Device model |
| $android_manufacturer | Android Manufacturer | Device model |
| $last_seen | Updated At | The last time a user profile property was set or updated (cannot be set manually). |

## Release History
[See All Releases](https://github.com/mixpanel/mixpanel-android/releases).

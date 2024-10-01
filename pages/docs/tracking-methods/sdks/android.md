# Mixpanel SDKs: Android

## Getting Started

Please refer to our [Quickstart Guide](/docs/quickstart/connect-your-data?sdk=android).

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

To make things easier, you can register these properties as super properties. If you tell us just once that these properties are important, we will automatically include them with all events sent. Super properties are saved to device storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](/docs/data-structure/property-reference#default-properties).

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
[Reset](https://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#reset()) generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identifying Users](/docs/tracking-methods/id-management/identifying-users) article.

## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel's [Behavioral Analytics](/docs/data-structure/user-profiles) product. Profiles are persistent sets of properties that describe a user - things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did.

We generally recommend creating user profiles for only authenticated users; with this in mind, to create user profiles, 2 requirements need to be met:

- You must call `.identify()` at least once for each user. Normally this is done after they authenticate.
- At least one property should be sent for a profile to be created.

Note: when sending set or set_once operations, the library will also populate automatic properties like `$android_app_version`, `$android_os_version`, geo-location properties and others.

## Setting Profile Properties

You can set properties on a user profile with [`MixpanelAPI.getPeople().set`](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#set-java.lang.String-java.lang.Object-).

```java Java
MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

// identify must be called before
// user profile properties can be set
// the first param is the user's ID
// the second param is a flag for allowing profile updates
mixpanel.identify("13793", true);


// Sets user's "Plan" attribute to "Premium"
mixpanel.getPeople().set("Plan", "Premium");
```

This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".

## Incrementing Numeric Properties

You can use [`MixpanelAPI.getPeople().increment`](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#set-java.lang.String-java.lang.Object-) to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.

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

Grouping by identifiers other than the `distinct_id` will allow analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/data-structure/advanced/group-analytics) to learn more about Group Analytics.

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

In order to update Group profile properties, you must specify the group that needs to be updated by calling [`getGroup().set()`](http://mixpanel.github.io/mixpanel-android/index.html).

```java Java
mMixpanel.getGroup("group key", "group id").set("SET NAME", "SET VALUE");

mMixpanel.getGroup("group key", "group id").setMap((new HashMap<>()).put("SET MAP INT", 1));
```

The [`getGroup()`](http://mixpanel.github.io/mixpanel-android/index.html) method can be chained with other commands that edit properties specific to the group.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

### set
[`mixpanel.getGroup().set()`](http://mixpanel.github.io/mixpanel-android/index.html) updates or adds a property to a group.

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

## App Links Tracking
The Mixpanel library has built in support for tracking in-bound and out-bound [App Links](https://developers.facebook.com/docs/applinks). App Links is a specification to help standardize deep-linking between apps as well as give you additional information about how users are getting to and from your own mobile app.

### Requirements
In order for Mixpanel to track App Links, your app must satisfy the following dependencies:
- [Bolts Framework](https://github.com/BoltsFramework/Bolts-Android) >= v1.1.2
- [Android Support Library v4](https://developer.android.com/topic/libraries/support-library/features#v4)+.

> Note: If your application does not meet these requirements, the Mixpanel library will log debug messages about App Links tracking not being enabled. This is NOT an error and can be safely ignored.

### Tracking In-bound App Links
If a user comes to your app via an App Link, Mixpanel will automatically track a `$al_nav_in` event with meta information about where they came from.

### Tracking Out-bound App Links
If you're linking to other applications using the Bolts framework, Mixpanel will track a `$al_nav_out` event with additional meta information about where the user is being linked to.
```java Java
...
bolts.AppLinkNavigation.navigateInBackground(this, "http://anotherapp.com/app/link");
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
| $ae_updated | App Updated | Executes when a user updates the app from the previous version. A Version Updated (`$ae_updated_version`) property is tracked to store the new app version. |
| $ae_crashed | App Crashed | Executes when Mixpanel receives either an exception or a signal that indicated the app has crashed. A Crash Reason (`$ae_crashed_reason`) property is tracked to help identify the type of crash. |
| $ae_session | App Session | Executes when a user spends more than 10 seconds in the app. A Session Length (`$ae_session_length`) property is tracked to reflect the number of seconds user spent in the session. In addition, there are two user properties tracked: Total App Sessions (`$ae_total_app_sessions`) and Total App Session Length (`$ae_total_app_session_length`). |

## Release History
[See All Releases](https://github.com/mixpanel/mixpanel-android/releases).

# Mixpanel SDKs: iOS (Swift)

## Getting Started

Please refer to our [Quickstart Guide](/docs/quickstart/connect-your-data?sdk=swift).

The [Full API Reference](https://mixpanel.github.io/mixpanel-swift/), [Library Source Code](https://github.com/mixpanel/mixpanel-swift), and an [Example Application](https://github.com/mixpanel/mixpanel-swift/tree/master/MixpanelDemo/MixpanelDemo) is documented in our GitHub repo.

## Sending Events

We recommend tracking only five to seven events in your application instead of tracking too many things to start. Ideally, you track users going through your initial user experience and one key metric that matters for your application (e.g. YouTube might choose "Watched Video" as a key metric).

Once you've initialized the library, you can track an event by calling [`track(event:properties:) `](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance5trackFT5eventGSqSS_10propertiesGSqGVs10DictionarySSPs9AnyObject____T_) with the event name and properties.
```swift Swift
Mixpanel.mainInstance().track(event: "Plan Selected",
    properties:["Plan": "Premium"])
```

## Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using [`time(event:)`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance4timeFT5eventSS_T_). This will mark the "start" of your action, which you can then finish with a track call. The time duration is then recorded in the "Duration" property.
```swift Swift
Mixpanel.mainInstance().time(event: "Image Upload")
//...some time later
Mixpanel.mainInstance().track(event: "Image Upload")
```


## Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event—for example, the user's age, gender, or source.

To make things easier, you can register these properties as super properties. If you do, we will automatically include them with all tracked events. Super properties are saved to device storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](/docs/data-structure/property-reference#default-properties).

To set super properties, call [`registerSuperProperties(_:)`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance23registerSuperPropertiesFGVs10DictionarySSPs9AnyObject__T_)

```swift Swift
// Send a "Plan: Mega" property will be sent
// with all future track calls.
Mixpanel.mainInstance().registerSuperProperties(["Plan": "Mega"])
```

Going forward, whenever you track an event, super properties will be included as properties. For instance, if you call:
```swift Swift
Mixpanel.mainInstance().track(event: "Signup",
    properties:["Source": "Twitter"])
```

after making the above call to registerSuperProperties, it is just like adding the properties directly:
```swift Swift
Mixpanel.mainInstance().track(event: "Signup",
    properties:[ "Plan" : "Mega", "Source": "Twitter"])
```

### Setting Super Properties Only Once
If you want to store a super property only once (often for things like ad campaign or source), you can use [`registerSuperPropertiesOnce(_:defaultValue:)`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance27registerSuperPropertiesOnceFTGVs10DictionarySSPs9AnyObject__12defaultValueGSqPS2____T_). This function behaves like [`registerSuperProperties(_:)`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC23registerSuperPropertiesyySDySSAA0A4Type_pGF) and has the same interface, but it doesn't override super properties you've already saved.

```swift Swift
Mixpanel.mainInstance().registerSuperPropertiesOnce(["Source": "ad-01"])
```

This means that it's safe to call [`registerSuperPropertiesOnce(_:defaultValue:)`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:FC8Mixpanel16MixpanelInstance27registerSuperPropertiesOnceFTGVs10DictionarySSPs9AnyObject__12defaultValueGSqPS2____T_) with the same property on every app load, and it will only set it if the super property doesn't exist.

### Super Properties Live in Local Storage
Our mobile libraries store your super properties in local storage. They will persist so long as the app is installed (between launches and updates). Uninstalling the app will remove that customers super properties.


## Managing User Identity

You can handle the identity of a user using the `identify` and `alias` methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

### Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they visit the site.

Call `identify` when you know the identity of the current user, typically after log-in or sign-up. We recommend against using `identify` for anonymous visitors to your site. 

```swift Swift
// This example would set the identify the user with the new ID 13793
Mixpanel.mainInstance().identify(distinctId: "13793");
```


### Call Reset on Logout
Reset generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identifying Users](/docs/tracking-methods/id-management/identifying-users) article.

Beginning with version v2.7.7, Mixpanel no longer uses the IFA(ID for Advertisers) but uses a randomly generated UUID as the default distinct ID instead. After you call reset, Mixpanel generates a new distinct_id.

If you want to use IFV(identifierForVendor) as the distinct_id, you can set
`MIXPANEL_UNIQUE_DISTINCT_ID` in build settings `Active Compilation Conditions` on the Mixpanel framework target. After you call reset, the IFV will not change. However, when a user removes and then re-installs the app, the IFV will change with each installation.


## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel's [Behavioral Analytics](/docs/data-structure/user-profiles) product. Profiles are persistent sets of properties that describe a user - things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did.

We generally recommend creating user profiles for only authenticated users; with this in mind, to create user profiles, 2 requirements need to be met:

- You must call `.identify()` at least once for each user. Normally this is done after they authenticate.
- At least one property should be sent for a profile to be created.

Note: when sending set or set_once operations, the library will also populate automatic properties like `$ios_app_version`, `$ios_device_model`, geo-location properties and others.

### Setting Profile Properties
You can set properties on a user profile with [`people.set(property:to:)`](https://mixpanel.github.io/mixpanel-swift/Classes/People.html#/s:FC8Mixpanel6People3setFT8propertySS2toPs9AnyObject__T_).

```swift Swift
// Identify the authenticated user with the ID 13793
// You can skip this if it was already called during authentication
Mixpanel.mainInstance().identify(distinctId: "13793");
// Sets user 13793's "Plan" attribute to "Premium"
Mixpanel.mainInstance().people.set(properties: [ "plan":"Premium", "$email":"joe.doe@example.com"])
```

This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".

### Incrementing Numeric Properties
You can use [`people.increment(property:by:)`](https://mixpanel.github.io/mixpanel-swift/Classes/People.html#/s:FC8Mixpanel6People9incrementFT8propertySS2bySd_T_) to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.
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

You can track a single transaction with [`people.trackCharge(amount:)`](https://mixpanel.github.io/mixpanel-swift/Classes/People.html#/s:FC8Mixpanel6People11trackChargeFT6amountSd10propertiesGSqGVs10DictionarySSPs9AnyObject____T_). This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.

```swift Swift
// Tracks $100.77 in revenue for user 13793
Mixpanel.mainInstance().people.trackCharge(amount: 100.77)

// Refund this user 50 dollars
Mixpanel.mainInstance().people.trackCharge(amount: -50)
```

## Group Analytics
Mixpanel Group Analytics is a paid add-on that allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` will allow analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/data-structure/advanced/group-analytics) to learn more about Group Analytics.

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

You can add users to groups by calling the [`setGroup()`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC8setGroup8groupKey0E3IDsySS_SayAA0A4Type_pGtF) method. 
```swift Swift
Mixpanel.mainInstance().setGroup(groupKey: "Company", groupID: “Mixpanel”)
```

You can call [`addGroup()`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC8addGroup8groupKey0E2IDySS_AA0A4Type_ptF) to add any additional groups to an existing list.

```swift Swift
Mixpanel.mainInstance().addGroup(groupKey: "Company", groupID: “Mixpanel”)
```

You can call [`removeGroup()`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC11removeGroup8groupKey0E2IDySS_AA0A4Type_ptF) to remove any additional groups from an existing list.

```swift Swift
Mixpanel.mainInstance().removeGroup(groupKey: "Company", groupID: “Mixpanel”)
```

### Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call [`getGroup().set()`](https://mixpanel.github.io/mixpanel-swift/Classes/Group.html) to build a group profile. It is important to the `group_key`, `group_id`, and one property so that the profile is not empty. 

```swift Swift
Mixpanel.mainInstance().getGroup(groupKey: "Company", groupID: “Mixpanel”).set(property: "g", to: "yo")
```

### Setting Group Profile Properties
You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling [`getGroup().set()`](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC8getGroup8groupKey0E2IDAA0D0CSS_AA0A4Type_ptF).

```swift Swift
Mixpanel.mainInstance().getGroup(groupKey: "Company", groupID: “Mixpanel”)
```

The [`getGroup()`](http://mixpanel.github.io/mixpanel-android/index.html) method can be chained with other commands that edit properties specific to the group.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

#### set
[`mixpanel.getGroup().set()`](https://mixpanel.github.io/mixpanel-swift/Classes/Group.html) updates or adds a property to a group.

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
let mixpanel = Mixpanel.initialize(token: "MIXPANEL_TOKEN")
mixpanel.serverURL = "https://api-eu.mixpanel.com"
```

## [Legacy] Automatically Tracked Events

Mixpanel's SDKs have a legacy feature to automatically collect common mobile events. We don't recommend enabling this, as these events rely on client-side state and can be unreliable.

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $ae_first_open | First App Open | Tracks the first time the user has opened the app. This event is retriggered if the user reinstalls the app or clears local storage. A user property First App Open Date (`$ae_first_app_open_date`) is tracked to indicate the date when app was first opened. |
| $ae_updated | App Updated | Executes when a user updates the app from the previous version. A Version Updated (`$ae_updated_version`) property is tracked to store the new app version. |
| $ae_session | App Session | Executes when a user spends more than 10 seconds in the app. A Session Length (`$ae_session_length`) property is tracked to reflect the number of seconds user spent in the session. In addition, there are two user properties tracked: Total App Sessions (`$ae_total_app_sessions`) and Total App Session Length (`$ae_total_app_session_length`). |
| $ae_iap | In App Purchase (IAP) | Executes when a user conducts an in-app purchase through your app. Mixpanel provides three properties for this event: Product Name (`$ae_iap_name`), Product Quantity (`$ae_iap_quantity`), and Product Price (`$ae_iap_price`). |

## Release History
[See All Releases](https://github.com/mixpanel/mixpanel-swift/releases).

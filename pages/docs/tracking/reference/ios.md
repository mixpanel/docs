# Ios

## Getting Started

Please refer to our [Quickstart Guide](../mobile).

The [Full API Reference](https://mixpanel.github.io/mixpanel-iphone/index.html), [Library Source Code](https://github.com/mixpanel/mixpanel-iphone/), and an [Example Application](https://github.com/mixpanel/mixpanel-iphone/tree/master/HelloMixpanel) is documented in our GitHub repo.

## Sending Events

We recommend tracking only five to seven events in your application instead of tracking too many things to start. Ideally, you track users going through your initial user experience and one key metric that matters for your application (e.g. a video streaming service might choose "Watched Video" as a key metric).

Once you've initialized the library, you can track an event by calling <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/track:properties:">track:properties:</a> with the event name and properties.

```objc Objective-C
Mixpanel *mixpanel = [Mixpanel sharedInstance];
[mixpanel track:@"Plan selected"
     properties:@{ @"Plan": @"Premium" }];
```


## Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/timeEvent:">timeEvent:</a>. This will mark the "start" of your action, which you can then finish with a track call. The time duration is then recorded in the "Duration" property.
```objc Objective-C
Mixpanel *mixpanel = [Mixpanel sharedInstance];
[mixpanel timeEvent:@"Image Upload"];
[self uploadImageWithSuccessHandler:^{
    [mixpanel track:@"Image Upload"];
}];
```

## Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event—for example, the user's age, gender, or source.

To make things easier, you can register these properties as super properties. If you do, we will automatically include them with all tracked events. Super properties are saved to device storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](https://help.mixpanel.com/hc/en-us/articles/115004613766).

To set super properties, call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperProperties:">registerSuperProperties:</a>

```objc Objective-C
// Send a "Plan: Mega" property will be sent
// with all future track calls.
[mixpanel registerSuperProperties:@{@"Plan": @"Mega"}];
```

Going forward, whenever you track an event, super properties will be included as properties. For instance, if you call:

```objc Objective-C
[mixpanel track:@"Signup" properties:@{
    @"Source": @"Twitter"
}];
```

after making the above call to <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperProperties:">registerSuperProperties:</a>, it is just like adding the properties directly:

```objc Objective-C
[mixpanel track:@"Signup" properties:@{
    @"Source": @"Twitter",
    @"Plan": @"Mega"
}];
```

### Setting Super Properties Only Once
If you want to store a super property only once (often for things like ad campaign or source), you can use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperPropertiesOnce:">registerSuperPropertiesOnce:</a>. This function behaves like <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperProperties:">registerSuperProperties:</a> and has the same interface, but it doesn't override super properties you've already saved.
```objc Objective-C
[mixpanel registerSuperPropertiesOnce:@{@"Source": @"ad-01"}];
```

This means that it's safe to call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/registerSuperPropertiesOnce:">registerSuperPropertiesOnce:</a> with the same property on every app load, and it will only set it if the super property doesn't exist.

### Super Properties Live in Local Storage
Our mobile libraries store your super properties in local storage. They will persist so long as the app is installed (between launches and updates). Uninstalling the app will remove that customers super properties.


## Managing User Identity

You can handle the identity of a user using the [identify](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/identify:) and [alias](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/alias) methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

####Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they use the app.

Call `identify` when you know the identity of the current user, typically after log-in or sign-up. We recommend against using `identify` for anonymous visitors to your site. 
```objc Objective-C
// Ensure all future events sent from
// the device will have the distinctId 13793
[mixpanel identify:@"13793"];
```



### Call Reset at Logout

Reset generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identifying Users](/docs/tracking/how-tos/identifying-users) article.

Note: If you're using our [original ID Merge](/docs/tracking/how-tos/identifying-users#simplified-vs-original-id-merge), calling reset frequently can lead to users quickly exceeding the 500 distinct_id per identity cluster limit. Once the 500 limit is reached you will no longer be able to add additional distinct_ids to the users identity cluster. In that case, reset should only be used if multiple users share a device. 

Beginning with version v3.6.2, Mixpanel no longer uses the IFA(ID for Advertisers) but uses a randomly generated UUID as the default distinct ID instead. After you call reset, Mixpanel generates a new distinct_id.

If you want to use IFV(identifierForVendor) as the distinct_id, you can set
`MIXPANEL_UNIQUE_DISTINCT_ID=1` in build settings `Preprocessor Macros` on the Mixpanel framework target. After you call reset, the IFV will not change. However, when a user removes and then re-installs the app, the IFV will change with each installation.


## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel. Profiles are persistent sets of properties that describe a user—things like name, email address, and signup date.

You can use profiles to explore and segment users by who they are, rather than what they did. 

### Setting Profile Properties
You can set properties on a user profile with <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelPeople.html#//api/name/set:">people.set:</a>.

Updates to user profiles are queued on the device until <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/identify:">identify</a> is called.

```objc Objective-C
// Sets user 13793's "Plan" attribute to "Premium"
[mixpanel.people set:@{@"Plan": @"Premium"}];
```

This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".

### Incrementing Numeric Properties
You can use <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelPeople.html#//api/name/increment:">people increment:</a> to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.

```objc Objective-C
// Here we increment the user's point count by 500.
[mixpanel.people increment:@"point count" by:@500];

// Pass an NSDictionary to increment multiple properties
[mixpanel.people increment:@{
    @"dollars spent": @17,
    @"credits remaining": @-34
}];
```

###Other Types of Profile Updates
There are a few other types of profile updates. To learn more, please review the full [MixpanelPeople API documentation](https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelPeople.html).

## Tracking Revenue

Mixpanel makes it easy to analyze the revenue you earn from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/MixpanelPeople.html#//api/name/trackCharge:">people trackCharge:</a>. This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.
```objc Objective-C
// Tracks $100.77 in revenue for user 13793
[mixpanel.people trackCharge:@(100.77)];

// Refund this user $50
[mixpanel.people trackCharge:@-50];

// Tracks $25 in revenue for user 13793 on the 2nd of
// January
[mixpanel.people trackCharge:@25 withProperties:@{
    @"$time": "2016-01-02T00:00:00"
}];
```

## Group Analytics
Mixpanel Group Analytics is a paid add-on that allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` will allow analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/analysis/advanced/group-analytics) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “company” is chosen for Group Analytics, “company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

### Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.

### Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/getGroup:groupID:">getGroup().set()</a> to build a group profile. It is important to the `group_key`, `group_id`, and one property so that the profile is not empty. 

```objc Objective-C
[[self.mixpanel getGroup:@"Company", groupID:@“Mixpanel”] set:@{@"h": @"yo”}]；
```

### Setting Group Profile Properties
You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/Group.html#/s:8Mixpanel5GroupC3set10propertiesySDySSAA0A4Type_pG_tF">getGroup():groupID()</a>.

The <a style="font-family: courier" href="https://mixpanel.github.io/mixpanel-swift/Classes/Group.html#/s:8Mixpanel5GroupC3set10propertiesySDySSAA0A4Type_pG_tF">getGroup():groupID()</a> method can be chained with other commands that edit properties specific to the group.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.
```objc Objective-C
[[self.mixpanel getGroup:@"Company", groupID:@“Mixpanel”] set:@{@"h": @"yo”}]；
```

You can see other Group methods in the [reference](https://mixpanel.github.io/mixpanel-swift/Classes/Group.html).

## Debugging and Logging

You can turn on Mixpanel logging by setting the `enableLogging` flag
```objc Objective-C
[Mixpanel sharedInstance].enableLogging = YES;
```

Alternatively, you can add the following Preprocessor Macros in Build Settings:

* `MIXPANEL_DEBUG=1` - logs queueing and flushing of events to Mixpanel
* `MIXPANEL_ERROR=1` - logs any errors related to connections or malformed events

If you're using CocoaPods, you'll need to add this to the Pod target instead of your main app project's target:

![image](/230696566-ee7da1ce-0f45-4da1-9083-e5d05f0b2603.png)


You can also add this to your Podfile to ensure everyone on your team will always have logging enabled:

```ruby Ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      settings = config.build_settings['GCC_PREPROCESSOR_DEFINITIONS']
      settings = ['$(inherited)'] if settings.nil?

      if target.name == 'Pods-MyProject-Mixpanel'
        settings << 'MIXPANEL_DEBUG=1'
        settings << 'MIXPANEL_ERROR=1'
      end

      config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] = settings
    end
  end
end
```

## EU Data Residency

Route data to Mixpanel's EU servers by setting the `serverURL` property after initializing the client. 

```objc
self.mixpanel = [Mixpanel sharedInstanceWithToken:@"MIXPANEL_TOKEN" launchOptions:launchOptions];
self.mixpanel.serverURL = @"https://api-eu.mixpanel.com";
```

## Types
Avoid Objective-C primitives for property values because these non-object types cannot be placed in the NSDictionary for event and user profile properties.

Use `NSString` for strings, `NSDate` for dates, `NSBool` for booleans, `NSArray` for arrays, and `NSNumber` for numbers.

For dates, we recommend formatting as ISO8601 UTC dates: "YYYY-MM-DDThh:mm:ss".

## [Legacy] Automatically Tracked Events

Mixpanel's SDKs have a legacy feature to automatically collect common mobile events. We don't recommend enabling this, as these events rely on client-side state and can be unreliable.

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $ae_first_open | First App Open | Tracks the first time the user has opened the app. This event is retriggered if the user reinstalls the app or clears local storage. |
| $ae_updated | App Updated | Executes when a user updates the app from the previous version. |
| $ae_crashed | App Crashed | Executes when Mixpanel receives either an exception or a signal that indicated the app has crashed. |
| $ae_session | App Session | Executes when a user spends more than 10 seconds in the app. |
| $ae_iap | In App Purchase (IAP) | Executes when a user conducts an in-app purchase through your app. |



## Release History
[See All Releases](https://github.com/mixpanel/mixpanel-iphone/releases).

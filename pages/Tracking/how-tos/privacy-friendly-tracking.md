---
title: "Privacy-Friendly Tracking"
slug: "privacy-friendly-tracking"
---

# Overview
You have full control over the data you send to Mixpanel. Here we share best practices for tracking in a privacy-friendly way.


# Opting Users Out of Tracking
You can use the opt_out method in Mixpanel's SDKs to opt users out of tracking. This state is controlled by a flag that is set as a browser cookie or localStorage. Note: because this setting is stateful, it only exists on our Web/Mobile SDKs -- if you're tracking from your servers, you will need to store this opt-out setting in a database and check it before sending any track calls.

```javascript Javascript
mixpanel.opt_out_tracking();
```
```objectivec Objective-C
Mixpanel *mixpanel = [Mixpanel sharedInstance];\n[mixpanel optOutTracking];
```
```swift Swift
let mixpanel = Mixpanel.initialize(token: YOUR API TOKEN, trackAutomaticEvents: true, optOutTrackingByDefault: true)
```
```java Android
mixpanel.optOutTracking();
```

You can also configure our SDKs to opt users out of tracking by default:

```javascript Javascript
mixpanel.init(YOUR TOKEN, {opt_out_tracking_by_default: true});
```
```objectivec Objective-C
Mixpanel *mixpanel = [Mixpanel sharedInstanceWithToken:@ YOUR_API_TOKEN trackAutomaticEvents:YES optOutTrackingByDefault:YES];
```
```swift Swift
Mixpanel.mainInstance().optOutTracking();
```
```java Android
MixpanelAPI mixpanelOptOutDefault = MixpanelAPI.getInstance(context, YOUR API TOKEN, true, true /* opt out by default */);
```


# Disabling Geolocation
Mixpanel's Web and Mobile libraries use IP address to enrich events with geographic information like city, country, and region. You can disable this using the following configuration options in each of our SDKs:

```javascript Javascript
mixpanel.init(\"YOUR_TOKEN\", {'ip': false})
```
```objectivec Objective-C
useIPAddressForGeoLocation = NO
```
```xml Android
<meta-data android:name="com.mixpanel.android.MPConfig.UseIpAddressForGeolocation" android:value="false" />
```

# Anonymizing Users
Mixpanel does not know, or need to know, any identifying information about users (like email or phone number). Mixanel only needs to know that a set of events were performed by a particular user ID. You choose the ID and you choose how you want to send that ID to Mixpanel.

If you want to analyze aggregate user behavior without being able to drill down into any particular user, we recommend generating a hash of some unique ID of the user and using that hash as the user's ID when you call the `.identify()` method in our SDKs.









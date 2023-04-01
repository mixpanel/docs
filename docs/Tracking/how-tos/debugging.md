---
title: "Debugging"
slug: "debugging"
hidden: false
---

Topics to add:

- Following your own events in Events ✅
- Find your profile to follow your events ✅
- Flush interval on mobile ✅
- Data discrepancies: https://help.mixpanel.com/hc/en-us/articles/115004499403
- Missing event names / property names / prop values after 30 days

This document gives best practices for QA and debugging your Mixpanel implementation. The tips below assume that you are already tracking events and creating profiles for your users.

If you haven't set up Mixpanel yet, check out our quickstart guides for [JavaScript](https://developer.mixpanel.com/v3.19/docs/javascript-quickstart), [Server](https://developer.mixpanel.com/v3.19/docs/server), and [Mobile](https://developer.mixpanel.com/v3.19/docs/react-native-quickstart).

Theres are two primary places to inspect your raw events as they flow into your Mixpanel project: Events and User Profiles. 

# Using Events to Debug

Events is a real-time tool that helps you confirm that your events and properties are arriving to your Mixpanel project correctly, so you can troubleshoot your Mixpanel setup quickly. With Events, you can see a feed of events along with all of their properties coming into Mixpanel to validate that they are being sent in the expected format.

To validate that events are being triggered correctly, we recommend that you search/filter Events for your own activity. Depending on how you send data to Mixpanel, you can:

1. Filter Events for All Events for a property that will help you identify your own events, such as:
- All Events where Name = Alice (assuming you are sending a $name property with the value Alice)
- All Events where City = `[Your Current Location]` (assuming you are using Mixpanel's Web and Mobile SDKs or supplying the `$ip` property  on an event)
2. If you're setting up Mixpanel on a web application, you can use [`mixpanel.get_distinct_id`](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelget_distinct_id) to return your own distinct_id in your browser console.

Once you have identified one of your own events in Events, click the User icon on the left to view your User Profile (if you have created one).

![View User Profile in Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Tracking/view-profile.png)

# Using User Profiles to Debug

User Profiles allow you to see the events feed and all user properties for a specific user. By reviewing User Profiles, you can validate:

1. User Properties set on the profile are correct 
2. Whether the expected events are appearing in the Activities feed in the expected order

![User Profile](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Tracking/user-profile.png)

# Missing or Incomplete Events

## Enable Debug Mode

If you are using one of Mixpanel's client-side SDKs, you can enable debug mode to confirm that requests are sending to Mixpanel: 

- [JavaScript Debug Mode](https://developer.mixpanel.com/docs/javascript#debug-mode)
- [iOS - Objective-C Debugging and Logging](https://developer.mixpanel.com/docs/ios#debugging-and-logging)
- [iOS - Swift Debugging and Logging](https://developer.mixpanel.com/docs/swift#debugging-and-logging)
- [Android - Debugging and Logging](https://developer.mixpanel.com/docs/android#debugging-and-logging)
- [React Native - Debugging and Logging](https://developer.mixpanel.com/docs/react-native#debugging-and-logging)

## Customize Flush Interval (Mobile)

Both the Mixpanel iOS and Android libraries employ queueing to optimize battery and data use on the end user’s device. Calling track does not send the event immediately, Events and User data sent to Mixpanel gets queued and flushed at certain intervals by default. This interval can be adjusted to flush more or less frequently.

### iOS

On iOS, data gets flushed every time the user backgrounds the app or every 60 seconds.

Shorten or lengthen the flush interval to send data to Mixpanel on a more or less frequent basis by changing the value of `self.mixpanel.flushInterval`. You can also explicitly call flush() to send the phone's queue immediately after having collected key events (such as sign up).

### Android

On Android, both Event and People calls are put into a queue that gets flushed to Mixpanel according to either time or size. If the bulk upload limit of 40 records is not reached, the default flush interval is 60 seconds.

You can also flush manually with public `void flush()`. One common use case is to call flush before the application is completely shut down to ensure that all of Events are sent to Mixpanel.

### Unity

On Unity, you can configure the interval at which data is flushed to Mixpanel. The default time is that data gets flushed every 60 seconds. 

You can also flush manually with public `void flush()`. 

## Check for Hidden Events and Properties

### Hidden in Lexicon

All users can hide events, event properties, and user profile properties in your [Mixpanel project through Lexicon](https://developer.mixpanel.com/v3.19/docs/lexicon#hide-events-and-properties).

### Inactive Events and Properties

Mixpanel’s report dropdown menus hide events that have not been fired within the last 30 days. The events will still be available in the project's raw data, but will not be visible in the UI (we assume it's no longer relevant and hide it to declutter the dropdown menus and improve their performance). Event properties and property values that have not been sent to your project in the last 28 days will also be hidden from dropdowns.

To have an imported event, event property, or property value that’s older than 30 days show in the dropdowns, you can fire a single instance of that event, property, or property value and the data will refurface it in the UI. If you know the name of the event, you can also search for it by typing the name in the dropdown menu.

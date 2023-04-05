---
title: "Debugging"
slug: "debugging"
hidden: false
---

This document walks through best practices for debugging your Mixpanel implementation and data discrepancies. The tips below assume that you are already tracking events and creating profiles for your users.

If you haven't set up Mixpanel yet, check out our quickstart guides for [JavaScript](https://developer.mixpanel.com/v3.19/docs/javascript-quickstart), [Server](https://developer.mixpanel.com/v3.19/docs/server), and [Mobile](https://developer.mixpanel.com/v3.19/docs/react-native-quickstart). We have a simple [HTTP API](https://developer.mixpanel.com/v3.19/docs/cloud-ingestion) for any languages we don't support.

# Tools for Debugging

Theres are two primary places to inspect your raw events as they flow into your Mixpanel project: Events and User Profiles. 

## Debugging with Events

Events is a real-time tool that helps you confirm that your events are arriving to your Mixpanel project, so you can troubleshoot your Mixpanel setup quickly. With Events, you can see a feed of events along with all of their properties coming into Mixpanel to validate that they are being sent in the expected format.

To validate that events are being triggered correctly, we recommend that you search/filter Events for your own activity. You can search or filter Events to find a specific event using any information you know is available in the event's raw payload.

![Events Filter](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Tracking/events-filter.png)

A few tips to help you identify your own activity in Events:

1. Filter Events for All Events for a property that will help you identify your own events, such as:
- All Events where Name = Alice (assuming you are sending a $name property with the value Alice)
- All Events where City = `[Your Current Location]` (assuming you are using Mixpanel's Web and Mobile SDKs or tracking geolocation by supplying the `$ip` property  on an event)
2. If you are using Mixpanel's JavaScript SDK, you can use [`mixpanel.get_distinct_id`](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelget_distinct_id) to return your own distinct_id in your browser console and copy the distinct_id value into the Events search bar.

Once you have identified one of your own events in Events, you can inspect all of the properties that were sent with your event. Toggle between the Your Properties and Mixpanel Properties tabs to determine which properties are custom to your Mixpanel implementation and which are send by default by Mixpanel. Toggle JSON mode to view the complete JSON object Mixpanel received from the calls you sent.

To locate the User Profile associated with your events, click the User icon on the left to view your User Profile.

![View User Profile in Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Tracking/view-profile.png)

## Debugging with User Profiles

User Profiles allow you to see the events feed and all user properties for a specific user. By reviewing User Profiles, you can validate:

1. User Properties set on the profile correctly
2. Whether the expected events are appearing in the Activity Feed correctly and in order

![User Profile](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Tracking/user-profile.png)

# Missing or Incomplete Events

### Enable Debug Mode

If you are using one of Mixpanel's client-side SDKs, you can enable debug mode to confirm that requests are sending to Mixpanel: 

- [JavaScript Debug Mode](https://developer.mixpanel.com/docs/javascript#debug-mode)
- [iOS - Objective-C Debugging and Logging](https://developer.mixpanel.com/docs/ios#debugging-and-logging)
- [iOS - Swift Debugging and Logging](https://developer.mixpanel.com/docs/swift#debugging-and-logging)
- [Android - Debugging and Logging](https://developer.mixpanel.com/docs/android#debugging-and-logging)
- [React Native - Debugging and Logging](https://developer.mixpanel.com/docs/react-native#debugging-and-logging)

### Debugging with the Browser Console (Web)

In web, you can view the Mixpanel API calls being made from the browser developer console.  When opening up the console, you can look at the XHR requests in the network tab and find the Mixpanel API call when firing an event you have Mixpanel instrumented on.  For instance, here is an example /track call being made:

The data attached to the track call is base64 encoded:

Base64 decoding the parameters show the events and properties:

From here, you can then validate that the event was directed to the right project token and using Events, and confirm that the property values were properly sent to Mixpanel.

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

# Data Discrepancies

## Discrepancies in Mixpanel Reports

Mixpanel reports calculate data in different ways. While the Insights report defaults to the total event count ('totals'), the funnel report defaults to unique user count ('uniques'). So if you are seeing discrepancies between a Funnel and an Insights report, take a step back and look at the filtering for the events. It's important to note that the 'totals' in Funnels show total conversions, not total event count.

With discrepancies within the Mixpanel interface, it's important to look out for:

- Comparisons between unique user count vs. total event count? In funnels; Are you using unique, total conversions or session conversions?
- Differences in properties - E.g. event property vs. user property vs. custom property

If you took a screenshot of a report a while ago and the data has changed since then, you can check if any user properties have been used in the report as they change over time, while event properties hold constant. You can also check if you have imported data or if data was ingested later by breaking down a report by the property mp_processing_time_ms. 

A good way to start is to remove all filtering from the reports to check if the underlying data is the same, then re-add them and see when the discrepancy occurs. Likely the culprit will be a filter or a breakdown. 

## Discrepancies between Mixpanel and other sources

Two systems will always track data differently due to their nature. It might very likely be that the systems will never track exactly the same data. However, it is important to get to the bottom of what's causing the discrepancy so you can establish trust in your data.

## Ad Blockers and Do Not Track Settings

Client-Side Tracking can be unreliable, you may lose events for 30-50% of your users. You can resolve this by [sending events through a proxy](https://developer.mixpanel.com/docs/collection-via-a-proxy), but it requires a bit more effort. We [recommend](https://developer.mixpanel.com/docs/client-side-vs-server-side-tracking) server-side tracking, since it is more reliable and easier to maintain than web/mobile tracking.

## Different Timezones

Mixpanel records all events in Coordinated Universal Time (UTC) at intake. By default, Mixpanel displays events times in US Pacific Time but this is adjustable in [Project Settings](https://developer.mixpanel.com/v3.19/docs/manage-projects#manage-timezones-for-projects). Navigate to your Project Settings to determine what timezone your Mixpanel events are displayed in.

- Are event timezones tracked in the same way?

## Different Queries

- Are both systems looking at the same event and the same timeframe?
- Are any filters applied to the query? Does the discrepancy persist if you remove them?
- Are you looking at event or user properties?

## Different Calculations

- Some of our reports have calculations applied, such as Funnels or Retention. Does the same calculation apply to the data in your other source?

## Client-Side vs. Server-Side Tracking

- Client-side integrations are more vulnerable to data tracking issues due to ad blockers and DNT settings
- Mixpanel's SDKs can need loading times to trigger the first event

## Different Triggers to Track Data

- Are both systems using the same triggers to track events? For example, the First App Open event in Mixpanel will trigger when our SDK has loaded, other systems might trigger a comparable event earlier.
- The event definitions might be different - Think of a button click on the client-side triggering the event in one system vs. an API call triggering the event in the other system.

## Delayed Ingestion

- Mixpanel accepts data that has been triggered a while ago, either via mobile SDKs or event import. You can check the $import property and the mp_processing_time_ms to confirm when data has been ingested.
- Mixpanel events older than 5 days sent to our /track endpoint will not be ingested, but other systems might accept these events (e.g. Firebase). Check how old an event was at point of ingestion in the other system to confirm. 

## Cohort Export

A cohort might show more in Mixpanel than what is actually being exported to the partner. You can find out more about troubleshooting this here.


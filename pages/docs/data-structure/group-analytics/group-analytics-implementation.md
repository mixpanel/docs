# Group Analtics Implementation Guide

## Implementation

Establish the group identifier with an event property as the Group Key, where the property value is the Group ID. As **event property:value** is **group key:group id**.

### Group Keys in Project Settings

Group keys are project specific, and the group key must be set up before group data is sent.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *Group Keys* section.

![image](/add-group-key.png "Add Group Key")

Enter an event property to attribute the group key to. You can also enter a display name for the group key. Click **Save**.

![/Screen_Shot_2022-06-22_at_6.18.38_PM.png](/Screen_Shot_2022-06-22_at_6.18.38_PM.png)

### Setup B2B Company Key

1. Choose which group key will be used as the B2B Company Key. This is the key for which Company Profiles (B2B Company Analytics) will be generated.
2. Specify the property that should be referenced as the Company name (identifier) throughout the Mixpanel interface.

<Callout type="info">
  You can change which group key should be used as the Company Key. To change, first unset the current group key set as Company Key in the project settings, and then set a new group key as the Company Key.
</Callout>

![image](/B2B_Company_Key.webp)

### Group Keys Tracked as Event Properties

**Group keys must be event properties.** All events need to have a defined group key on them in order to be attributed to a group. Property names and values are case-sensitive so be sure to track the group key on your events exactly as you've established them in Project Settings. 

**Note:** Mixpanel does not backfill historical data to groups before the group key was implemented. This means that Mixpanel is only able to attribute group data from the date that the group key was set up in your Project Settings. Historical events that contain the group key as an event property sent prior to the implementation of the group key in Project Settings will not be attributed to a group.

### Attribute Events to Multiple Groups

An event can be attributed to multiple groups. To attribute to multiple groups, track the group event property's value as a list of string-valued group ids.

```javascript
mixpanel.track("Some Event", { company_id: ["01234", "56789", "55555"] });
```

Not all of a user's events will be attributed to a group. Only the events with a defined group key will be attributed to the group and appear in the group's profile's activity feed.

### Implement Using the Groups API

Mixpanel's SDKs have methods to help you implement Groups Analytics.

Because the client has persistence, only client-side SDKs have methods for adding and removing a user's events to a group (registering and de-registering the `<group_key>: <group_id>` as a super property to be tracked on all events).

Without persistence on the server, you will need to track `<group_key>: <group_id>` on all events that should be attributed to a group (or multiple groups).

Both client- and server-side SDKs have methods for creating and updating Group Profiles.

To view the setup guides for implementing Groups using the Groups API, follow the instructions connected to the SDK you are using found in [Mixpanel's Developer Documentation](https://developer.mixpanel.com/docs).

- [HTTP](https://developer.mixpanel.com/docs/http#section-group-analytics)
- [Javascript SDK](https://developer.mixpanel.com/docs/javascript#section-group-analytics)
- [iOS-Swift SDK](https://developer.mixpanel.com/docs/swift#section-group-analytics)
- [iOS-Objective-C SDK](https://developer.mixpanel.com/docs/ios#section-group-analytics)
- [Android SDK](https://developer.mixpanel.com/docs/android#section-group-analytics)
- [Java SDK](https://developer.mixpanel.com/docs/java#section-group-analytics)
- [Python SDK](https://developer.mixpanel.com/docs/python#section-group-analytics)
- [React Native SDK](https://developer.mixpanel.com/docs/react-native#group-analytics)
- [Ruby SDK](https://developer.mixpanel.com/docs/ruby#section-group-analytics)

### Upload Group Profiles Using the Users Report

It is possible to create Group Profiles by CSV upload as an alternative to the Groups API. [Follow the instructions here to learn how to upload Group Profiles using the Users report](/docs/data-structure/user-profiles#importing-from-csv).

### Add Group Key to User's Profile

Adding `<group_key>: <group_id>` to user profiles connects user profiles to group profiles. This allows you to view user group profile properties when analyzing by Users in reports; for example, when creating user cohorts based on group profile properties.

This relationship is one-way, meaning that you cannot use user profile properties when analyzing by a Group in reports.

Because a user can be part of multiple groups within a group key, set the value of the user property as a list of string values, i.e., `"company_id": ["1", "2"]`
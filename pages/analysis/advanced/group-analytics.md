---
title: "Group Analytics"
slug: "group-analytics"
hidden: false
metadata:
  title: "Group Analytics"
  description: "Learn how to use different groups in Mixpanel."
---

# Overview

Mixpanel Group Analytics allows behavioral data analysis at a customized group level (such as account, device—or any other way you want to assess your business).

Historically, Mixpanel grouped events by a single identifier called the distinct_id. This ultimately grouped events by the individual user. Group Analytics allows you to establish an event property other than the distinct_id, such as company ID, account ID, project ID, or billing ID, as an identifier by which to analyze your data.

Group Analytics is available as an add-on package to customers on [Growth](https://mixpanel.com/pricing/) and [Enterprise plans](https://mixpanel.com/pricing/).

Customers on the Growth plan can buy this add-on [online](https://mixpanel.com/pricing/), while customers on the Enterprise plans can reach out to their Customer Success Manager or the [Mixpanel Sales Team](https://mixpanel.com/contact-us/sales/). Online plans allow up to 6 group keys. Enterprise customers can choose between 3 or 6 group keys. Each group can have a total 1M profiles.

# Group By a Custom Identifier

Mixpanel Group Analysis allows you to select alternative unique identifiers in reports.

By default, Mixpanel counts unique users by distinct_id. Group Analytics allows you to uniquely count events by an alternative identifier, such as company ID, invite ID, or another value shared by a group of individuals with different distinct_ids.

This allows behavioral analysis from a business or group level, as opposed to an individual level. You can answer questions such as:

- What companies are engaging the most with a product?
- In instances where there are more than one user per account, such as a video streaming service, how are events triggered at an account level?
- What groups convert through a funnel to a goal event (as opposed to what individual users convert)?

# Group Profiles

Much like a [user profile](https://help.mixpanel.com/hc/en-us/articles/115004501966-People-Profiles), Group Profiles are a collection of properties and event history specific to a group.

Group Profiles have an activity feed that shows the events performed by users in a group. Only the events attributed to the group with a defined group key will appear in the group's activity feed.

The Group Profile also displays the properties unique to that group - here's an [example](https://mixpanel.com/report/2195193/view/139237/profile#distinct_id=company_id_199&data_group_id=3983652220450539808&) of it:

![https://help.mixpanel.com/hc/article_attachments/7247358107540/Screen_Shot_2022-06-22_at_5.41.07_PM.png](https://help.mixpanel.com/hc/article_attachments/7247358107540/Screen_Shot_2022-06-22_at_5.41.07_PM.png)

To access a group profile:

1. Go to Users.

2. Click the **Analyze Uniques by** dropdown above the query builder.

![https://help.mixpanel.com/hc/article_attachments/7247342946708/Screen_Shot_2022-06-22_at_5.40.43_PM.png](https://help.mixpanel.com/hc/article_attachments/7247342946708/Screen_Shot_2022-06-22_at_5.40.43_PM.png)

3. Select the group identifier.

![https://help.mixpanel.com/hc/article_attachments/7247254725268/Screen_Shot_2022-06-22_at_5.39.06_PM.png](https://help.mixpanel.com/hc/article_attachments/7247254725268/Screen_Shot_2022-06-22_at_5.39.06_PM.png)

4. Groups profiles will populate the Users report.

# Change the Group Identifier in a Report

To change the identifier in a report:

1. Go to a report.

2. Click the **Analyze Uniques by** dropdown above the query builder.

![https://help.mixpanel.com/hc/article_attachments/7247558061204/Screen_Shot_2022-06-22_at_5.45.29_PM.png](https://help.mixpanel.com/hc/article_attachments/7247558061204/Screen_Shot_2022-06-22_at_5.45.29_PM.png)

3. Select the group identifier.

![https://help.mixpanel.com/hc/article_attachments/7247558052372/Screen_Shot_2022-06-22_at_5.46.39_PM.png](https://help.mixpanel.com/hc/article_attachments/7247558052372/Screen_Shot_2022-06-22_at_5.46.39_PM.png)

4. The report will now display results grouped by the newly selected group identifier.

# Implementation

Establish the group identifier with an event property as the Group Key, where the property value is the Group ID. As **event property:value** is **group key:group id**.

## Group Keys in Project Settings

Group keys are project specific, and the group key must be set up before group data is sent.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.

![https://help.mixpanel.com/hc/article_attachments/7246600608532/Screen_Shot_2022-06-22_at_5.21.06_PM.png](https://help.mixpanel.com/hc/article_attachments/7246600608532/Screen_Shot_2022-06-22_at_5.21.06_PM.png)

Enter an event property to attribute the group key to. You can also enter a display name for the group key. Click **Save**.

![https://help.mixpanel.com/hc/article_attachments/7248270683412/Screen_Shot_2022-06-22_at_6.18.38_PM.png](https://help.mixpanel.com/hc/article_attachments/7248270683412/Screen_Shot_2022-06-22_at_6.18.38_PM.png)

## Group Keys Tracked as Event Properties

**Group keys must be event properties.** All events need to have a defined group key on them in order to be attributed to a group.

**Note:** Mixpanel does not backfill historical data to groups before the group key was implemented. This means that Mixpanel is only able to attribute group data from the date that the group key was set up in your Project Settings. Historical events that contain the group key as an event property sent prior to the implementation of the group key in Project Settings will not be attributed to a group.

## Attribute Events to Multiple Groups

An event can be attributed to multiple groups. To attribute to multiple groups, track the group event property's value as a list of string-valued group ids.

**mixpanel.track('Some Event', {'company_id': ['01234', '56789', '55555']});

Not all of a user's events will be attributed to a group. Only the events with a defined group key will be attributed to the group and appear in the group's profile's activity feed.

## Implement Using the Groups API

Mixpanel's SDKs have methods to help you implement Groups Analytics.

Because the client has persistence, only client-side SDKs have methods for adding and removing a user's events to a group (registering and deregistering the **group_key:group_id** as a super property to be tracked on all events).

Without persistence on the server, you will need to track the **group_key:group_id** on all events that should be attributed to a group (or multiple groups).

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

## Upload Group Profiles Using the Users Report

It is possible to create Group Profiles by CSV upload as an alternative to the Groups API. [Follow the instructions here to learn how to upload Group Profiles using the Users report](https://help.mixpanel.com/hc/en-us/articles/115004695323).

## Add Group Key to User's Profile

Adding the **group_key:group_id** to user profiles connects user profiles to group profiles. This allows you to user group profile properties when analyzing by Users in reports, for example, when creating user cohorts based on group profile properties.

This relationship is one-way, meaning that you cannot use user profile properties when analyzing by a Group in reports.

Because a user can be part of multiple groups within a group key, set the value of the user property as a list of string values, i.e., **"company_id": ["1", "2"]

# Limits and Caveats

Maximum number of group profiles that may be tracked: 1M profiles. When exceeding this limit, queries that use group properties may fail due to size of the group table.

No single group identifier (e.g. company_id), can have more than 1M events/day. When a particular group identifier has more events than this limit, query performance will suffer and sometimes fail.

---
title: "Sessions"
slug: "sessions"
hidden: false
metadata:
  title: "Sessions"
  description: "Learn about sessions in Mixpanel."
---

# Overview

Use Sessions in Mixpanel to track which events users perform within a session, or how many sessions it takes for a user to convert in a funnel.

Sessions consist of two virtual events (Session Start and Session End) that Mixpanel computes for you in one of 3 ways:
* **Timeout Based (Default)**: The session starts when a user performs any event, and ends when the user is inactive for some period of time (default: 30 minutes).
* **Event Based**: Provide a starting event and ending event. The session starts when the user performs the starting event and ends when the user performs the ending event.
* **Property Based**: Provide a `session_id` property. All events that a user performs which have the same value for `session_id` are considered part of the same session.

Project Admins or Owners can change a project's session definition in Project Settings. Since Mixpanel computes sessions on the fly, you can change this definition at any time and it will apply historically.

![https://help.mixpanel.com/hc/article_attachments/9392326926228/CleanShot_2022-09-16_at_13.30.32.gif](https://help.mixpanel.com/hc/article_attachments/9392326926228/CleanShot_2022-09-16_at_13.30.32.gif)


# Using Sessions

## Funnels

In [Funnels](doc:funnels-report), once you have set up sessions, a “Session Start” and “Session End” event will be generated in the report based on the funnel criteria.

![https://help.mixpanel.com/hc/article_attachments/6693686907156/mceclip7.png](https://help.mixpanel.com/hc/article_attachments/6693686907156/mceclip7.png)

The event properties "Session Duration (Seconds)", "Session Event Count", "Session End Event Name", and "Session Start Event Name" can be used to breakdown or filter these results.

![https://help.mixpanel.com/hc/article_attachments/6693720386068/mceclip8.png](https://help.mixpanel.com/hc/article_attachments/6693720386068/mceclip8.png)

You can also choose to count Sessions instead of Uniques or Totals in the Conversion Details section. If you choose to count Sessions, the conversion window will be limited to one session.

Whenever you make a change to session settings, you can then review the impact of this change in the Funnels Time to Convert Chart. If you see a large group of users doing 4+ hour sessions or just having sessions of <1 minute, you can create cohorts from these user segments and then evaluate their behavior in Flows to confirm Sessions is set up correctly.

![https://help.mixpanel.com/hc/article_attachments/6693775917588/mceclip9.png](https://help.mixpanel.com/hc/article_attachments/6693775917588/mceclip9.png)

If you choose to count Uniques or Totals, you will be able to select a conversion window as usual, including Sessions.

![https://help.mixpanel.com/hc/article_attachments/6693981758228/mceclip15.png](https://help.mixpanel.com/hc/article_attachments/6693981758228/mceclip15.png)

## Flows

In [Flows](doc:flows-report), you can use the “Session Start” and “Session End” events to view the top Flows events within a session. 

When you select sessions in Flows, the flow will be weighted by number of sessions, rather than unique users.

## Insights

In [Insights](doc:insights-report), you can use the “Session Start” and “Session End” events to explore a variety of metrics:

- The total number of sessions over time
- The average session length per user
- Session duration broken down across all users
- The average number of sessions per user
- Sessions calculated in formulas

![https://help.mixpanel.com/hc/article_attachments/6693868461460/mceclip12.png](https://help.mixpanel.com/hc/article_attachments/6693868461460/mceclip12.png)

When you select sessions in Insights, you will be viewing total sessions counts, rather than uniques or totals.

The event properties "Session Duration (Seconds)", "Session Event Count", "Session End Event Name", and "Session Start Event Name" can be used to breakdown or filter these results.

### Aggregation by Sessions

In Insights, you can also count the number of sessions that contained a particular event. Select the **Total** drop down beside an event in your Insights query to select **Sessions**.

![https://help.mixpanel.com/hc/article_attachments/6693976195092/mceclip14.png](https://help.mixpanel.com/hc/article_attachments/6693976195092/mceclip14.png)

For example, select an event which determines success for your company, such as "Product Purchase". Using this aggregation you can track how many sessions contained a purchase.



# How Sessions Work

## Timeout Based Sessions

A Timeout Based Session in Mixpanel is defined as a group of events one user performs within a given time frame on your website or app. A session starts when a user performs an event that is not excluded from your Sessions Settings.

The set session length is a period of activity at which a session is ended. The end time of the session is the time that the last event was performed before this period of inactivity.

A session starts when a user performs an event. A session ends when a user stops performing events for long enough that the set session length expires. The time of "Session End" is the time that the last event was performed by the timeout.

A single user can start multiple sessions. Those sessions can occur on the same day, or over several days, weeks, or months. As soon as one session ends, another session can begin with the occurrence of a new event.

### Session Timeout

This is the length of time that defines a session timeout after a period of inactivity in Mixpanel. You can set the session timeout period in minutes, hours, or days. The default length is 30 minutes.

Any non-excluded event performed within the timeout range of the session will restart the session timeout period on the session.

For example, say you set a session timeout length of 15 minutes. A user begins a session when they log into your app and perform the event “Log In.”

- The “Log In” event marks the beginning of the session, because that user has not performed other events before.
- The user then performs the “Start Game” event on your app after 14 minutes. This will restart the clock on the session timeout.
- If they then perform no events for 16 minutes, however, the session will end. The session ends at the moment that the “Start Game” event was performed, because it was the last event before a complete session timeout period elapsed.

Sessions are reset every 24 hours at midnight (according to your project timezone), so the maximum session timeout length is 24 hours. The minimum session timeout length is one minute.

### Estimating Ideal Session Length

Use your [Time to Convert Chart in Funnels](https://help.mixpanel.com/hc/en-us/articles/360029190092-Advanced-Funnels-Functionality#time-to-convert) to help determine an appropriate session timeout period that aligns with your users’ behavior.

![https://help.mixpanel.com/hc/article_attachments/6693646572948/mceclip6.png](https://help.mixpanel.com/hc/article_attachments/6693646572948/mceclip6.png)

![https://help.mixpanel.com/hc/article_attachments/6693622578708/mceclip5.png](https://help.mixpanel.com/hc/article_attachments/6693622578708/mceclip5.png)

In your Funnel you can select the event that denotes a "Session Start" in your app (such as “Log In”), and the "Session End" event (such as “Log Out”). Check the time it takes users to convert from the start event to the end event in the Time to Convert Chart, and this will give you an indicator of the average amount of time a session lasts in your app.

Be sure to exclude API-related events in your funnel to ensure that your conversion time is accurate. For example, if a user is receiving notifications from you every 25 minutes, and session timeout is every 30 minutes, then session length will be 24 hours.

Exclude events that don’t denote an action made by the user from your funnel to ensure that your conversion time is accurate. For example, if a user is receiving notifications from you every 25 minutes, and session timeout is every 30 minutes, then session length will be 24 hours.

### Excluded Events

Exclude events from being tracked as part of a session (such as backend API events that don’t denote an action made by the user on the site), to ensure the validity of session metrics. Mixpanel API events will be excluded by default, but external API events, such as a message sent through another program, would not be excluded.

For example, you should exclude events triggered when a message is sent to a user or when a user is added to an A/B test, as the user did not cause those events.

Recommended events to exclude which are not triggered by user activity:

- Events triggered when messages are sent to a user (including push notifications)
- Events triggered when a message is received
- Events tracked server-side, such as monthly membership payments not associated with a specific user action
- Events related to API activity

Custom events are not supported for exclusions. If you want to exclude a custom event, you can instead exclude the events that make up that custom event.

### Examples

#### Example 1

![https://help.mixpanel.com/hc/article_attachments/360037412492/sessions6.png](https://help.mixpanel.com/hc/article_attachments/360037412492/sessions6.png)

Session timeout length is set for 30 minutes.

1. A user performs “Event A” at 1:00pm, starting the session and triggering the "Session Start" event.
2. They then wait 10 minutes and perform “Event B” at 1:10pm.
3. They do not perform any other events for 30 minutes, and the session ends and the "Session End" event is triggered. The time of Session End is the time of the last event performed at 1:10pm. Therefore the session length for “Session 1” is 10 minutes.
4. The same user then returns after 40 minutes and performs “Event C” at 1:50pm. As the previous session has already timed out, this triggers a new "Session Start" event and starts a new session.
5. The user then performs “Event D” 20 minutes later at 2:10pm.
6. They perform “Event E” 15 minutes later at 2:25pm.
7. When they do not perform any more events in the next 30 minutes, "Session End" is triggered. The time of the "Session End" is the last event performed at 2:25pm. Therefore the session length for “Session 2” is 35 minutes.

#### Example 2

![https://help.mixpanel.com/hc/article_attachments/360037410791/sessions7.png](https://help.mixpanel.com/hc/article_attachments/360037410791/sessions7.png)

Session timeout length is set for 30 minutes.

1. A user performs “Event A” at 11:30pm, starting the session and triggering the "Session Start" event.
2. They then wait 20 minutes and perform “Event B” at 11:50pm.
3. While this session is not timed to expire until 30 minutes after this event, all sessions are reset at midnight. Therefore, when the user performs “Event C” at 12:05am, it triggers a new "Session Start". The "Session End" time is the time that “Event B” was performed. Therefore the length of “Session 1” is 20 minutes.
4. “Event C” performed at 12:05am starts the session and triggers the "Session Start" event.
5. The user then waits 5 minutes and performs “Event D” at 12:10am.
6. They do not perform any other events for 30 minutes, and the session ends. The time of "Session End" is the time of the last event performed at 12:10am. Therefore the session length for “Session 2” is 5 minutes.

## Event Based Sessions

An Event Based Session in Mixpanel is defined by an event you choose as the "Session Start" (such as "Login"), and an event you choose as the "Session End" (such as "Log Out").

A single user can start multiple sessions. Those sessions can occur on the same day, or over several days, weeks, or months. As soon as a "Session End" event is performed, another session can begin with the occurrence of a new "Session Start" event.

If you do not have clearly defined events that denote the beginning and end of a session, then a Timeout Based Session may be a better option for your project.

Sessions are reset every 24 hours at midnight (according to your project timezone), so the maximum session length is 24 hours

### Examples

#### Example 1

![https://help.mixpanel.com/hc/article_attachments/9447968065300/Untitled__3_.png](https://help.mixpanel.com/hc/article_attachments/9447968065300/Untitled__3_.png)

Session Start Event is set to `Login` and Session End Event is set to `Logout`.

1. A user performs “Login” at 11:15 pm triggering the “Session Start” event.
2. They then wait 30 minutes and perform “Event B” at 11:45 pm.
3. When the user performs “Logout” at 12:15 am, it triggers new “Session End”. The "Session End" time is the time that “Logout” was performed. However, since all sessions are reset at midnight, the previous “Session Start” event is no longer associated with the “Session End Event”, and the session duration is not calculated for “Session 1”. Similarly, the “Session End Event” does not have an associated “Session Start Event” and session duration is not calculated for “Session 2”.

#### Example 2

![https://help.mixpanel.com/hc/article_attachments/9447970960916/Untitled__4_.png](https://help.mixpanel.com/hc/article_attachments/9447970960916/Untitled__4_.png)

Session Start Event is set to `Login` and Session End Event is set to `Logout`.

1. A user performs “Login” at 11:00 am triggering the “Session Start” event.
2. They then wait 15 minutes and perform a second “Login” at 11:15 am. Since the user is already in a session, a new “Session Start” event is not triggered.
3. They then wait 30 minutes and perform a “Logout” at 11:45 am, ending “Session 1” and triggering a new “Session End” event. The duration for “Session 1” will be 45 minutes.
4. Finally, after 30 minutes, another “Logout” event is received at 12:15. Since there is no previous “Session Start” event, a “Session End” event is not created.

## Property Based Sessions

A Property Based Session in Mixpanel is defined by a property you choose as the "Session Id" (such as "session_id") and the session persists as long as the value of the “Session Id” property remains constant. As soon as the value for “Session Id" changes, another session is started.

Events that do not contain a “Session Id” value are not used in calculating Session Start and End events. Events that contain an empty “Session Id” value (i.e. “session_id”: “”) will be tracked and session events created upon transition.

Like Event Based Sessions, Sessions are reset every 24 hours at midnight (according to your project timezone), so the maximum session length is 24 hours.

### Examples

#### Example 1

![https://help.mixpanel.com/hc/article_attachments/10260746661780](https://help.mixpanel.com/hc/article_attachments/10260746661780)

Session ID Property is set to `session_id`

1. A user performs “Event A” at 11:15 pm with the `session_id` property set to value `456` and triggering the “Session Start” event.
2. They then wait 30 minutes and perform “Event B” at 11:45 pm.
3. Since all sessions are reset at midnight, when the user performs “Event C” at 12:15 am, it triggers new “Session End” and "Session Start" events despite the `session_id` value remaining constant. The "Session End" time is the time that “Event B” was performed resulting in a session length of 30 minutes for “Session 1”.
4. The user then waits 15 minutes and performs “Event D” at 12:30am.
5. Assuming the next event has a different `session_id` or no other events occur before the second day ends, then another "Session End" event will be triggered. The time of the "Session End" is the last event performed at 12:30 am. Therefore the session length for “Session 2” is 15 minutes.

#### Example 2

![https://help.mixpanel.com/hc/article_attachments/9448356131476/Untitled__6_.png](https://help.mixpanel.com/hc/article_attachments/9448356131476/Untitled__6_.png)

Session ID Property is set to `session_id`

1. A user performs “Event A” at 11:00 am with the `session_id` property set to value `123` and triggering the “Session Start” event.
2. They then wait 15 minutes and perform “Event B” at 11:15 am with the `session_id` property set to value `456`. Since the `session_id` property has changed, “Session End” and “Session Start” events are triggered. The "Session End" time is the time that “Event A” was performed resulting in a session length of 0 minutes for “Session 1”.
3. The user then waits 15 minutes and performs “Event C” at 12:45 am.
4. The user then waits 15 minutes and performs “Event D” at 12:15 pm.
5. Assuming the next event has a different `session_id` or no other events occur for the remainder of the day, another "Session End" event will be triggered. The time of the "Session End" is the last event performed at 12:15 pm. Therefore the session length for “Session 2” is 60 minutes.

# Session Properties

Mixpanel will associate properties with a user's session. For Timeout based sessions, the properties available on the "Session Start" and "Session End" events will be attributed to the first event which the property is defined of the qualifying sessions. For event and property based sessions, the properties will be associated from the event that triggers the session starting.

By default, the list of associated properties is as follows:

- $app_build_number
- $app_version_string
- $browser
- $city
- $country_code
- $current_url
- $device
- $manufacturer
- $os
- $region
- mp_country_code
- mp_lib
- mp_platform
- utm_campaign
- utm_content
- utm_source

You can add additional properties to be associated with the session by going under Project Settings to Session Settings, and selecting the list of properties you wish to be associated. They will then be accessible for analysis in Mixpanel reports. Note that there is a limit of 4 additional properties that can be associated with session analysis.

![https://help.mixpanel.com/hc/article_attachments/10494738316692](https://help.mixpanel.com/hc/article_attachments/10494738316692)

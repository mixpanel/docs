---
title: "Custom Events"
slug: "custom-events"
hidden: false
metadata:
  title: "Custom Events"
  description: "Learn about Custom Events in Mixpanel."
---

## Overview

A custom event is a virtual event that was created from one or more events, optionally filtered down by a particular set of properties, and given a name. Useful to:

- Merge two events into a single event ("User Signup" + "Account Created" -> "Signup")
- Create an event based on a filter on another event ("Purchase" where Country = "US" -> "US Purchases")

Imagine your business has two ways for users to track ads: they can convert from ad, or simply view it. You represent each of these actions with Mixpanel events named "Ad Conversion" and "Ad Impression," respectively. Later, you decide that you want to setup a funnel to track how many users are seeing any ads at all. So what do you do?

You can create a custom event containing "Ad Conversion" and "Ad Impression," and then save it as "Watch Ads.” Now you can use the "Watch Ads" custom event as a funnel step just like a regular event. Then, any time a user performs an "Ad Conversion" or "Ad Impression" action, they'll be included in that step. You can also use this new custom event in your other reports, such as Retention.

![/mceclip3.png](/mceclip3.png)

## Create a Custom Event

1. Expand the Event dropdown in either an Insights, Funnels, Retention, or Formulas report.

    ![/mceclip0.png](/mceclip0.png)

2. Select **Create Custom**.
3. Select the events and properties you’d like to include.
4. Name your custom event, and click **Save**.

![/mceclip1.png](/mceclip1.png)

When naming your custom event, note that the UI will break when the URL passes 2,083 characters. Each event and selector adds to the URL length (selectors more so than events). The easiest way to break a custom event is with an "equals" operation that selects a lot of values.

## Edit and Delete Custom Events

To view your complete list of custom events to manage, edit, or delete them, you must navigate to the [Lexicon](/admin/data-governance/lexicon).

![/mceclip0.png](/mceclip0.png)

In Lexicon, click on the **Custom Events** tab.

![/mceclip1.png](/mceclip1.png)

Here you can see a list of all the custom events in the project. Click on the **name** of the event to edit its details.

To delete a custom event, check the **box** beside the title of all the custom events you want to delete, then click the **delete** button at the top of the list.

![/mceclip2.png](/mceclip2.png)

## Limits by Plan Type

Free: 1 Custom Event

Startup: 15 Custom Events

Enterprise: Unlimited Custom Events

MTU Growth: Unlimited Custom Events

Visit our [pricing page](https://mixpanel.com/pricing/) to learn more about differences between plan types.

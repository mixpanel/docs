# Custom Events: Combine multiple events for analyses

## Overview

A custom event is a virtual event that was created from one or more events, optionally filtered down by a particular set of properties, and given a name. You can use custom events to:

- Merge two events into a single event ("User Signup" + "Account Created" -> "Signup")
- Create an event based on a filter on another event ("Purchase" where Country = "US" -> "US Purchases")

Imagine your business has two ways for users to track ads: they can convert from ad, or simply view it. You represent each of these actions with Mixpanel events named "Ad Conversion" and "Ad Impression," respectively. Later, you decide that you want to setup a funnel to track how many users are seeing any ads at all. So what do you do?

You can create a custom event containing "Ad Conversion" and "Ad Impression," and then save it as "Watch Ads.” Now you can use the "Watch Ads" custom event as a funnel step just like a regular event. Then, any time a user performs an "Ad Conversion" or "Ad Impression" action, they'll be included in that step. You can also use this new custom event in your other reports, such as Retention.

## Create a Custom Event

![image](/custom_event_qb.png)

1. Open the Metrics menu by clicking "Select Metrics" in an Insights report, or clicking "Select Step/Events" in the Funnels/Retention/Flows report.
2. Select "Create New", then choose "Custom Event" in the right column.
3. Select the events and properties you’d like to include.
4. Name your custom event, and click **Save**.

## Edit and Delete Custom Events

To view, edit, or delete any custom event, navigate to [Lexicon](/docs/data-governance/lexicon).

![image](https://github.com/mixpanel/docs/assets/2077899/efc4b36e-d8d9-4699-8a48-98b793532b20)

In Lexicon, click on the **Custom Events** tab.

![image](https://github.com/mixpanel/docs/assets/2077899/fb4e1680-3b20-4f24-90de-0101cb097c54)

Here you can see a list of all the custom events in the project. Click on the **name** of the event to edit its details.

To delete a custom event, check the **box** beside the title of all the custom events you want to delete, then click the **delete** button at the top of the list.

![image](https://github.com/mixpanel/docs/assets/2077899/8004da2b-db3c-48c0-a494-e500e1cc5bf7)

## Sharing Custom Events

A custom event will be private to the user who created it until it is shared with others. To share this custom event with another user in the project, you can click on "Save and Share" while creating the custom event.  

![image](https://github.com/user-attachments/assets/277ac882-4ef0-4251-bb1e-107ed38f4f27)

![image](https://github.com/user-attachments/assets/6d84dbf7-7bba-45fd-ba25-44e0772752d8)

## Custom Events versus Simple Behaviors

Custom Events and [Simple Behaviors](/docs/features/saved-metrics-and-behaviors#simple-behaviors) are similar in that both allow you to combine multiple events for analysis. However, they serve different purposes. Simple Behaviors are designed for quick editing and reuse within the query builder in the Insights report. In contrast, Custom Events offer greater flexibility, which can be used across various parts of Mixpanel, including cohort definitions, Funnels, and can also be included as events within a Simple Behavior.


As a best practice, follow the guidelines below to determine whether to use Simple Behaviors or Custom Events:

- Use **Simple Behaviors** if you want to create a definition that can be easily viewed and modified from the query builder in Insights reports
- Use **Custom Events** if you need to need to create a virtual event that can be used everywhere in Mixpanel (e.g. inside a cohort definition, Funnels, Flows, or Retention)

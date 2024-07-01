# Flows Conversion Criteria

## Overview
You can configure your Flows report conversion criteria to determine how your users will enter your flows.

## Counting Method

Your selected counting method determines how many times Mixpanel will count a particular user's activity. Mixpanel Flows can be calculated by uniques, totals, or sessions, the same as the Funnels report.

By default, Flows calculations are based on **uniques**. To change to a different counting method, click on the word **Uniques** in the conversion criteria, and select between **totals or sessions** from the drop-down list.

![/Screen_Shot_2021-12-15_at_10.16.00_AM.png](/Screen_Shot_2021-12-15_at_10.16.00_AM.png)

**Uniques**
Unique flows count a single entry per user (determined by distinct_id). Each can do the first step only once, and this is on the first time they perform the Step A event in the date range. Even if a particular user completes the funnel multiple times in the date range, they will only be counted towards conversion once, and on the first time they entered in the span of the funnel.

**Totals**
Totals flows count multiple entries per user.  Users can re-start the flow and every time a user starts the flow they are counted. Users may re-enter a totals flows only after they have exited their previous attempt. Users exit a flow in 3 ways:

1. They complete the last required step in the flow
2. They fail to get to the last required step in the conversion window and time out,
3. They are excluded from the current flow by an exclusion step.

**Sessions**
Sessions ensure every step in the flow is performed in the same session. Like totals flows, users will be allowed to re-start the flow in subsequent sessions. Learn more about Sessions [here](/docs/features/sessions).

## Conversion Window

The Conversion Window determines how much time a user has to finish the last required step in the flow. By default, all customers have 30 days to complete a flow from the timestamp they perform the Step A event. To adjust this conversion window, click on the words **30 days** in the conversion criteria. You will be able to adjust both the unit of time and the amount.

![/Screen_Shot_2021-12-15_at_11.12.25_AM.png](/Screen_Shot_2021-12-15_at_11.12.25_AM.png)

The maximum amount of time you can choose for the conversion window is 366 days, or otherwise equivalent (12 months, 52 weeks, etc).

## Hold Property Constant

Holding a property constant in flows requires that a user retain the same value of a given event property for an event to be considered part of the flow.

For example, let's say your product is an e-commerce retail site, and you want to see flows between Add to Cart > Purchase as long as they purchased the same item - meaning they must be interacting with the same item in every step of the flow - you would hold the Item Name property constant.

The way this is calculated depends on whether you have selected a counting method that does not allow users to re-enter the flow ("Uniques") or allows re-entry ("Totals" or "Sessions).

- **Uniques:** When you select "Uniques" and hold a property constant, because users of this counting method only enter the flow once and on the first time they do the Step A event, Mixpanel will hold constant the property value from the first Step A event.
- **Totals or Sessions:** When you select "Totals" or "Sessions" and hold a property constant, since these counting methods allow users to re-enter the flow, Mixpanel will hold the property constant that is set with each new re-entry at the Step A event.

To add a property constant to your flows, select the **Holding property constant** button in the conversion criteria section.

![/Screen_Shot_2021-12-15_at_11.10.42_AM.png](/Screen_Shot_2021-12-15_at_11.10.42_AM.png)

Some things to keep in mind are that you are only able to select event properties that apply to all of the required steps. Also, you can select multiple properties, but when you do ALL must be kept constant.

## Exclusion Steps

You can add exclusion steps, which exclude users who did a particular step. This is useful digging into a particular view, for example to explore the 2nd most popular path taken.

# Appcues


## Overview

Export Mixpanel cohorts to Appcues to create custom segments that you can apply in your Appcues flows, surveys, and walkthroughs. Manage the Appcues integration from the Mixpanel integrations page.

Appcues also supports an integration to send messaging interactions to Mixpanel - for more details, see [the Appcues Mixpanel integration](https://docs.appcues.com/article/447-integrations-list#Mixpanel).

## Permissions

You must be a Mixpanel project admin to enable the Appcues integration.

## Enable the Integration

Follow these steps to enable the integration with Appcues:

1. Select **Integrations** under the **Data Management** tab in the top navigation bar of Mixpanel.

![Appcues 1 Image](/appcues1.png)

2. From the Integrations page, select the Appcues dropdown, and select **Connect**.

![Appcues 2 Image](/appcues2.png)

3. The connection uses one credential to authorize, API Key. Supply an **API token** generated from your **Appcues settings page** to establish the connection.

3. The Appcues integration will show a **Connected** tag in the UI once the connection establishes.

## Matching Users between Appcues and Mixpanel

Mixpanel only exports identified user profiles (users with at least 1 set profile properties) to match to Appcues - users without user profiles (i.e. anonymous users) will not export.

The integration requires that you use the same system of identifiers for both tools, meaning the value you pass to `mixpanel.identify("internal_user_id")` will have the same value as you pass to `appcues.identify("internal_user_id")`. Appcues will attempt to match users from inbound cohorts based on their Mixpanel distinct_id.

## Export a Cohort

To export a cohort to Appcues, navigate to Cohorts by clicking in the **Data Management** tab and select **Cohorts**.

Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

Click Export to > Appcues. Select either one-time sync or dynamic sync. Click **Start Sync**.

![Appcues 3 Image](/appcues3.png)

## Sync Types

This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export

In a one-time export, Mixpanel sends Appcues a static export of users who currently qualify for the cohort. The cohort data will not be updated in Appcues after a one-time export.

### Dynamic Sync

In dynamic sync, Mixpanel initiates sync between a cohort and Appcues every two hours. The exported cohort will be updated every day to reflect the most recent list of users in a cohort.

## Ideal vs. Non-Recommended Use Cases

Because Dynamic syncs send cohorts at two-hour intervals, it is recommended to **avoid** using this integration for any tours requiring immediate identification and display (for example, onboarding guides that require user detection as soon as someone signs up). Appcues native targeting is still the preferred method in scenarios such as these.

More ideal use cases are instead around tours and surveys where the tour isn't tied to a real-time lifecycle moment (for example, getting easy in-product feedback after engaging with a particular feature, or directing a power user to a new product improvement for a feature they have a history of using).

## Select the Segment in Appcues

Once the export completes, you will see a Segment reflecting the set of users from your Mixpanel cohort in the Appcues Segment tab, under Custom Properties in the dropdown (e.g. "Volume Buyers"):

![Appcues 4 Image](/appcues4.png)

## Appcues events into Mixpanel

Appcues offers the ability to forward tour interaction events to Mixpanel. For more detail, [please refer to the Appcues integration guide](https://docs.appcues.com/article/447-integrations-list#Mixpanel).






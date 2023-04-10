---
title: "Leanplum"
slug: "leanplum-integration"
hidden: false
metadata: 
  title: "Leanplum"
  description: "Integrate Leanplum with Mixpanel."
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---

# Overview

Export Mixpanel cohorts to Leanplum to create custom audiences that you can apply in your Leanplum campaigns. Manage the Leanplum integration from the Mixpanel integrations page.

Leanplum also supports an integration to send messaging interactions to Mixpanel - for more details, see [Leanplum's Mixpanel integration](https://docs.leanplum.com/docs/mixpanel-feed).

## Permissions

You must be a Mixpanel project admin to enable the Leanplum integration.

## Enable the Integration

To enable the integration, select **Integrations** under the **Data Management** tab in the top navigation bar.

![Leanplum 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Leanplum/leanplum1.png)

From the Integrations page, select the Leanplum dropdown, and select **Connect**.

![Leanplum 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Leanplum/leanplum2.png)

The connection uses a Basic Authorization Username/Password system. You will need to provide two credentials to authorize the connection:

- Username: Leanplum App ID
- Password: Leanplum API Secret

You can find these values in your Leanplum settings page, and under the Mixpanel section in "Partner Integrations".

The Leanplum integration will show a **Connected** tag in the UI once the connection succeeds.

## Matching Users Between Leanplum and Mixpanel

Mixpanel only exports identified user profiles to match to Leanplum - users without user profile properties (i.e. anonymous users) will not export.

If you use a different system of user identifiers for Mixpanel's distinct_id as compared to Leanplum's user ID, the user's Mixpanel profile must contain a user property, `$leanplum_user_id`, whose value is a string representing that person's user ID in Leanplum. Use this joining key if your user identifiers in Mixpanel are different from the identifiers used in Leanplum (for example, if you identify Mixpanel users on internal user ID, but identify Leanplum users on device ID).

In addition, when its ingestion service detects calls setting this user property, Mixpanel will also alias the value of `$leanplum_user_id` to the user's distinct_id when setting that user property. This ensures that messaging data passed from Leanplum to Mixpanel still attributes to the correct user.

If you use the same system of user identifiers in both tools, meaning a user has the same ID string in both products, you do **not** have to declare `$leanplum_user_id`. The users' Mixpanel distinct_id will still be sent in the cohort export, and Leanplum will attempt to match users on this value instead.

Note that exports are used solely for matching user identities between products - the integration will not send the full set of a user's profile properties to Leanplum.

## Export a Cohort

To export a cohort to Leanplum, navigate to Cohorts by clicking in the Data Management tab and select Cohorts.

Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

Click Export to > Insider. Select either one-time sync or dynamic sync. Click Start Sync.

![Leanplum 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Leanplum/leanplum3.png)

## Sync Types

This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export. In case of dynamic sync we compute a diff of users added and removed from the cohort's current state compared to the cohort state present on Leanplum and send the diff over to Leanplum to apply these changes.

### One-Time Export
In a one-time export, Mixpanel sends Leanplum a static export of users who currently qualify for the cohort. The cohort data will not be updated in Leanplum after a one-time export.

### Dynamic Sync
In dynamic sync, Mixpanel exports the cohort to Leanplum every 15 minutes. The exported cohort will be updated every 15 minutes to reflect the most recent list of users in a cohort.

## Select the Audience in Leanplum

Once the export completes, you will see an Audience reflecting the set of users from your Mixpanel cohort. (e.g. "Recent Signups who haven't hit a Value Moment")

![Leanplum 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Leanplum/leanplum4.png)

## Leanplum events into Mixpanel & MTU exemptions

Leanplum offers the ability to forward campaign interaction events to Mixpanel. For more detail, [please refer to Leanplum's integration guide](https://docs.leanplum.com/docs/mixpanel-feed).

Events coming from Leanplum are marked with the property `$source` to denote the source product.

Mixpanel will exempt certain messaging outreach events from MTU calculations, meaning you're free to send campaigns to dormant users without them counting towards MTU billing (only once a user engages with a message will they then be counted towards that tally).

The following events are exempt from MTU calculations:

- (Leanplum) Campaign Enter
- (Leanplum) Push Notification Send
- (Leanplum) Push Notification Bounce
- (Leanplum) Email Send
- (Leanplum) Email Delivered
- (Leanplum) Email Bounce
- (Leanplum) Email Marked as spam
- (Leanplum) Email Unsubscribed
- (Leanplum) A/B test

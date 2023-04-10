---
title: "OneSignal"
slug: "onesignal-integration"
hidden: false
metadata: 
  title: "OneSignal"
  description: "Integrate OneSignal with Mixpanel."
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---

# Overview

Export Mixpanel cohorts to OneSignal to create custom segments that you can apply in your OneSignal campaigns. Manage the OneSignal integration from the Mixpanel integrations page.

OneSignal also supports an integration to send messaging interactions to Mixpanel - for more details, see [OneSignal's Mixpanel integration](https://documentation.onesignal.com/docs/mixpanel).

## Permissions

You must be a Mixpanel project admin to enable the OneSignal integration.

Additionally, you must have a paid OneSignal plan to use the integration. If you attempt to sync cohorts while on a free OneSignal plan, you will receive the following error: "App may not submit cohort updates from Mixpanel".

## Enable the Integration

Follow these steps to enable the integration with OneSignal:

1. Select **Integrations** under the **Data Management** tab in the top navigation bar of Mixpanel.

![OneSignal 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/OneSignal/onesignal1.png)

2. From the Integrations page, select the OneSignal dropdown, and select **Connect**.

![OneSignal 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/OneSignal/onesignal6.png)

3. You will need to provide two credentials to authorize the connection: **API Key and App ID**. You can find these values in your **OneSignal settings** page. The OneSignal integration will show a **Connected** tag in the UI once the connection succeeds. 

## Matching Users between OneSignal and Mixpanel

Mixpanel only exports identified user profiles to match to OneSignal - users without user profile properties (i.e. anonymous users) will not export.

In order to match an exported Mixpanel user to OneSignal, the user's Mixpanel profile must contain a user property, `$onesignal_user_id`. The value of this property is a string representing either that person's Player ID or External User ID in OneSignal. OneSignal recommends using External User ID, as it's a cross-platform user identifier and allows for OneSignal's email capabilities. In your implementation, reference the Player ID from OneSignal's SDK or reference your External User ID and set the user property `$onesignal_user_id` on the user's Mixpanel profile.

User profiles without this user property will **not** export to OneSignal - it is a requirement for user matching.

In addition, when its ingestion service detects calls setting this user property, Mixpanel will also alias the value of `$onesignal_user_id` to the user's distinct_id when setting the `$onesignal_user_id` user property. This ensures that messaging events passed from OneSignal campaigns to Mixpanel still attribute to the correct user.

## Export a Cohort
To export a cohort to OneSignal: 

1. Navigate to Cohorts by clicking in the **Data Management** tab and select **Cohorts**.

![OneSignal 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/OneSignal/onesignal3.png)

2. Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort and click **Export to OneSignal**.

![OneSignal 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/OneSignal/onesignal4.png)

## Sync Types
This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends OneSignal a static export of users who currently qualify for the cohort. The cohort data will not be updated in OneSignal after a one-time export.

### Dynamic Sync
In dynamic sync, Mixpanel initiates sync between a cohort and OneSignal every fifteen minutes. The exported cohort will be updated every fifteen minutes to reflect the most recent list of users in a cohort.

## Select the Segment in OneSignal

Once the export completes, you will see a Segment reflecting the set of users from your Mixpanel cohort:

![OneSignal 5 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/OneSignal/onesignal5.png)

## OneSignal events into Mixpanel & MTU exemptions

OneSignal offers the ability to forward campaign interaction events to Mixpanel. For more detail, [please refer to OneSignal's integration guide](https://documentation.onesignal.com/docs/mixpanel).

Because OneSignal's event structure follows Mixpanel's naming convention for messaging events, it will have the same exemptions outlined in the MTU calculation guide for which events do not count towards MTU tallies. Message delivery events will not count towards a user being in MTU counts, while message engagement events will.

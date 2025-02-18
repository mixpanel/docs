# CleverTap


## Overview

Export Mixpanel cohorts to CleverTap to create custom segments that you can apply in your CleverTap campaigns and journeys. Manage the CleverTap integration from the Mixpanel integrations page.

CleverTap also supports an integration to send events data to Mixpanel - for more details, [see the CleverTap Mixpanel integration](https://docs.clevertap.com/docs/mixpanel-export).

## Permissions
You must be a Mixpanel project admin to enable the CleverTap integration.

## Enable the Integration

To enable the integration with CleverTap: 

1. Select **Integrations** under the **Data Management** tab in the top navigation bar.

![CleverTap 1 Image](/clevertap1.png)

2. From the Integrations page, select the CleverTap dropdown, and select **Connect**.

![CleverTap 2 Image](/clevertap2.png)

3. Specify a **Connector Name** and enter the CleverTap **Project ID**, **Passcode**, and **Data center** details to authorize the connection.

4. You can optionally select the user properties to export by clicking on the ***Edit Columns*** and selecting the user properties you wish to be included in the export. The default user properties that are exported can be found [here](/docs/cohort-sync#limits).
   
5. The CleverTap integration will show a **Connected** tag in the UI once the connection establishes.

## Matching Users between CleverTap and Mixpanel
Mixpanel only exports identified user profiles to match to CleverTap - users without user profile properties (i.e. anonymous users) will not be exported.

It is recommended to set a `$CleverTap_user_id` user property with the ID that you use to identify users in Mixpanel. CleverTap will use this property as the first option to match user profiles in CleverTap and include them in the segments. For more information on how CleverTap matches exported cohorts from Mixpanel, refer to [CleverTap's User Identity Management](https://docs.clevertap.com/docs/mixpanel-integration#user-identity-management).

In addition, when our ingestion service detects calls setting this user property, Mixpanel will also auto-alias the value of `$CleverTap_user_id` to the user's distinct_id. This ensures that messaging and experiment data passed from CleverTap to Mixpanel still attributes to the correct user.

## Export a Cohort

To export a Cohort to CleverTap:

1. Navigate to Cohorts by clicking **Cohorts** under **Data Management** in the navigation bar.

2. Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

Click **Export to > CleverTap**. Select either one-time sync or dynamic sync. Click **Start Sync**.

![CleverTap 3 Image](/clevertap3.png)

## Sync Types
This integration supports two types of exports: one-time export and recurring sync. When you generate a one-time export or recurring sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.


## Select the Segment in CleverTap

Once the export completes, you will see a segment reflecting the set of users from your Mixpanel cohort in the CleverTap's Segments dashboard. The Type column under the Segments list page for the exported cohort is displayed as `Partner - Mixpanel`:

![CleverTap 4 Image](/clevertap4.png)

You can also refer to CleverTap's [Mixpanel Import (Cohort)](https://docs.clevertap.com/docs/mixpanel-integration) documentation.

## CleverTap Events into Mixpanel & MTU exemptions

You can use events from your CleverTap integration to perform deeper analysis in Mixpanel.

Events coming from CleverTap are marked with the property `$source`.

Mixpanel will exempt certain messaging outreach events from MTU calculations, meaning you're free to send campaigns to dormant users without them counting towards MTU billing (only once a user engages with a message will they then be counted towards that tally).

The following CleverTap events are exempt from MTU calculations:
- Notification Sent
- Notification Viewed
- Notification Clicked
- Push Impressions
- Notification Replied
- Push Unregistered
- Control Group
- Channel Unsubscribed
- Reachable By
- Notification Delivered
- AB Experiment Rendered
- AB Experiment Stopped
- AB Experiment Rolled Out
- Geocluster Entered
- Geocluster Exited
- Reply Sent
- App Uninstalled
- Webhook Delivered
- State Transitioned
- UTM Visited

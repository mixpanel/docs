---
title: "Xtremepush"
slug: "xtremepush-integration"
hidden: false
metadata: 
  title: "Xtremepush"
  description: "Integrate Xtremepush with Mixpanel."
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---

# Overview

The Xtremepush integration allows you to combine behavioral analytics with attribution and engagement data for targeted and relevant customer communication.

Export Mixpanel cohorts to Xtremepush, as a one-off or via automated, scheduled imports, to use as part of your segmented campaign sends. All cohorts are synced into Xtremepush as a matching list so they are simple to find afterwards.

Import Xtremepush Campaign engagement data to Mixpanel dashboards for richer understanding of your customers behavior across all channels.

## Permissions

You must be a Mixpanel project admin to enable the Xtremepush integration.

## Enable the Integration
To enable the integration:

1. Select **Integrations** under the **Data Management** tab in the top navigation bar.

![Xtremepush 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Xtremepush/extremepush1.png)

2. From the Integrations page, select Xtremepush, and select **Connect**.

![Xtremepush 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Xtremepush/extremepush2.png)

3. The Xtremepush integration will show a **Connected** tag in the UI once the connection succeeds.

## Matching Users between Xtremepush and Mixpanel
Mixpanel only exports identified user profiles to match to Xtremepush - users without user profile properties (i.e. anonymous users) will not export.

Xtremepush use a given user's distinct_id to match the Mixpanel user profile to Xtremepush. As a result, not all exported profiles may match if these values are missing or differ from the emails and phone numbers stored on Insider.

Note that exports are used solely for matching user identities between products - the integration will not send the full set of a user's profile properties to Xtremepush, nor will it generate new users.

## Export a Cohort

You can export a cohort to Xtremepush from the Cohorts report. 

1. Navigate to Cohorts by clicking **Cohorts** under **Data Management** in the navigation bar.

2. Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

3. Click **Export to Xtremepush**. Select either one-time sync or dynamic sync. Click **Start Sync**.

![Xtremepush 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Xtremepush/extremepush3.png)

## Sync Types
This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends Xtremepush a static export of users who currently qualify for the cohort. The cohort data will not be updated in Xtremepush after a one-time export.

### Dynamic Sync
In dynamic sync, Mixpanel initiates sync between a cohort and Xtremepush every two hours. The exported cohort will be updated every two hours to reflect the most recent list of users in a cohort.

## Select the Custom Segment in Xtremepush
Once the export completes, you will see a custom segment reflecting the set of users from your Mixpanel cohort (e.g. "7days-cart-abandoners"):

![Xtremepush 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Xtremepush/extremepush4.png)




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

3. Specify a **Connector Name** and enter the CleverTap **Project ID**, **Passcode**, and **Datacenter** details to authorize the connection.

4. You can optionally select the user properties to export by clicking on the ***Edit Columns*** and selecting the user properties you wish to be included in the export. The default user properties that are exported can be found [here](/docs/cohort-sync/overview#limits).
   
5. The CleverTap integration will show a **Connected** tag in the UI once the connection establishes.

## Matching Users between CleverTap and Mixpanel
Mixpanel only exports identified user profiles to match to CleverTap - users without user profile properties (i.e. anonymous users) will not be exported.

It is recommended to set a `$CleverTap_user_id` user property with the ID that you use to identify users in Mixpanel. CleverTap will use this property as the first option to match user profiles in CleverTap and include them in the segments. For more information on how CleverTap matches exported cohorts from Mixpanel, refer to [CleverTap's User Identity Management](https://docs.clevertap.com/docs/mixpanel-integration#user-identity-management).

## Export a Cohort

To export a Cohort to CleverTap:

1. Navigate to Cohorts by clicking **Cohorts** under **Data Management** in the navigation bar.

2. Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

Click **Export to > CleverTap**. Select either one-time sync or dynamic sync. Click **Start Sync**.

![CleverTap 3 Image](/clevertap3.png)

## Sync Types
This integration supports two types of exports: one-time export and recurring sync. When you generate a one-time export or recurring sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends CleverTap a static export of users who currently qualify for the cohort. The cohort data will not be updated in CleverTap after a one-time export.

### Recurring Sync
In recurring sync, Mixpanel initiates sync between a cohort and CleverTap every 15 minutes. The exported cohort will be updated every 15 minutes to reflect the most recent list of users in a cohort.

## Select the Segment in CleverTap

Once the export completes, you will see a segment reflecting the set of users from your Mixpanel cohort in the CleverTap's Segments dashboard. The Type column under the Segments list page for the exported cohort is displayed as `Partner - Mixpanel`:

![CleverTap 4 Image](/clevertap4.png)

You can also refer to CleverTap's [Mixpanel Import (Cohort)](https://docs.clevertap.com/docs/mixpanel-integration) documentation.

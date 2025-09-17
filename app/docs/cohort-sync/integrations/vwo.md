# VWO

## Overview

Export Mixpanel cohorts to VWO to create custom segments that you can apply in your VWO experiments. Manage the VWO integration from the Mixpanel integrations page.

VWO also supports an integration to send experiment data to Mixpanel - for more details, see [the VWO Mixpanel integration](https://help.vwo.com/hc/en-us/articles/900004226426).

## Permissions

You must be a Mixpanel project admin to enable the VWO integration.

## Enable the Integration

To enable the integration: 

1. Select **Integrations** under the **Data Management** tab in the top navigation bar.

![VWO 1 Image](/vwo1.png)

2. From the Integrations page, select the VWO dropdown, and select **Connect**.

![VWO 2 Image](/vwo2.png)

3. The connection uses one credential to authorize, **API Key**. Supply an API token generated from your **VWO settings page** to establish the connection.

4. The VWO integration will show a **Connected** tag in the UI once the connection establishes.

## Matching Users between VWO and Mixpanel
> **Warning:** Projects using the [simplified ID merge system](/docs/tracking-methods/id-management#identity-merge-apis) must have the `$user_id` in Mixpanel match the user identifier in the partner service. Using any alternative partner properties to match users between tools may result in partner events not being attributed to the correct user in Mixpanel. Any partner properties mentioned in the below section are primarily applicable to projects on the original ID merge system.

Mixpanel only exports identified user profiles with the user property `$vwo_user_id` to match to VWO - users without user profile properties (i.e. anonymous users) will not export. The value of this property should equal a matching User ID in VWO.

If you have the VWO SDK present in your application, it will automatically declare the `$vwo_user_id` property on users' Mixpanel profiles. If the VWO SDK is not on your application, you can declare the user properties either through Mixpanel's own SDKs or HTTP API. VWO will attempt to match users from inbound cohorts based on the value seen on `$vwo_user_id`.

In addition, when our ingestion service detects calls setting this user property, Mixpanel will also auto-alias the value of `$vwo_user_id` to the user's distinct_id. This ensures that experiment data passed from VWO to Mixpanel still attributes to the correct user.

## Export a Cohort

To export a Cohort to VWO: 

1. Navigate to Cohorts by clicking **Cohorts** under **Data Management** in the navigation bar.

2. Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

3. Click **Export to > VWO**. Select either one-time sync or dynamic sync. Click **Start Sync**.
Do note: VWO has a 15MB export limit for profiles in the cohort.

![VWO 3 Image](/vwo3.png)

## Sync Types
This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends VWO a static export of users who currently qualify for the cohort. The cohort data will not be updated in VWO after a one-time export.

### Dynamic Sync
In dynamic sync, Mixpanel initiates sync between a cohort and VWO every two hours. The exported cohort will be updated every day to reflect the most recent list of users in a cohort.






Click Export to > VWO. Select either one-time sync or dynamic sync. Click Start Sync.




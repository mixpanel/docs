---
title: "MoEngage"
slug: "moengage-integration"
hidden: false
metadata: 
  title: "MoEngage"
  description: "Integrate MoEngage with Mixpanel"
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-30T05:52:10.102Z"
---

# Overview

Export Mixpanel cohorts to MoEngage to create custom segments that you can apply in your MoEngage campaigns. Manage the MoEngage integration from the Mixpanel integrations page.

# Permissions

You must be a Mixpanel project admin to enable the MoEngage integration.

## Enable the Integration

1. To enable the integration, select **Integrations** under the **Data Management** tab in the top navigation bar.

![Moengage 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/MoEngage/moengage1.png)

2. From the Integrations page, select the MoEngage dropdown, and select **Connect**.

![Moengage 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/MoEngage/moengage2.png)

3. The connection uses a Basic Authorization Username/Password system. You will need to provide two credentials to authorize the connection:

- Username: MoEngage APP ID
- Password: MoEngage API Key

You will additionally provide one credential to authorize the cohort exports:

- MOE-APPKEY: MoEngage APP ID

You can find these values in your MoEngage settings page - note that MoEngage App ID is used in both the Username and MOE-APPKEY fields.

![Moengage 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/MoEngage/moengage3.png)

4. The MoEngage integration will show a **Connected** tag in the UI once the connection succeeds.

## Matching Users between MoEngage and Mixpanel
Mixpanel only exports identified user profiles to match to MoEngage - users without user profile properties (i.e. anonymous users) will not export.

If the values you provide for users' distinct_id differ from the values used for MoEngage's Unique ID, the user's Mixpanel profile must contain a user property, `$moengage_user_id`, whose value is a string representing that user's Unique ID in MoEngage. Exports will include this joining key to match to corresponding the Unique ID in MoEngage.

In addition, when its ingestion service detects calls setting this user property, Mixpanel will also [alias](https://developer.mixpanel.com/reference/import-events#create_alias) the value of `$moengage_user_id` to the user's distinct_id when setting that user property. This ensures that messaging events passed from MoEngage to Mixpanel still attribute to the correct user.

Note that exports are used solely for matching user identities between products - the integration will not send the full set of a user's profile properties to MoEngage, nor will it generate new user profiles in MoEngage.

## Export a Cohort

To export a cohort to MoEngage:

1. Navigate to Cohorts by clicking **Cohorts** under the **Data Management** tab in the top navigation bar.

![Moengage 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/MoEngage/moengage4.png)

2. Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort and click **Export to MoEngage**.

![Moengage 5 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/MoEngage/moengage5.png)

3. Click **Start Sync**.

## Sync Types
This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends MoEngage a static export of users who currently qualify for the cohort. The cohort data will not be updated in MoEngage after a one-time export.

### Dynamic Sync
In dynamic sync, Mixpanel initiates sync between a cohort and MoEngage every 15 minutes. The exported cohort will be updated every 15 minutes to reflect the most recent list of users in a cohort.

## Select the Custom Segment in MoEngage
Once the export completes, you will see a custom segment reflecting the set of users from your Mixpanel cohort (e.g. "Power Users"):

![Moengage 6 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/MoEngage/moengage6.png)

## MoEngage Events into Mixpanel & MTU exemptions
You can use events from your MoEngage integration to perform deeper analysis in Mixpanel. 

Events coming from MoEngage are marked with the property `$partner_id`.

Mixpanel will exempt certain messaging outreach events from MTU calculations, meaning you're free to send campaigns to dormant users without them counting towards MTU billing (only once a user engages with a message will they then be counted towards that tally).

The following MoEngage events are exempt from MTU calculations:

- Card Sent
- Card Delivered
- Connector Sent
- Email Sent
- Email Deferred
- Email Delivered
- Email Dropped
- Email Bounced
- Email Soft Bounced
- Notification Received Android
- Notification Sent iOS
- NOTIFICATION_RECEIVED_IOS_MOE
- Notification Received Web
- SMS Sent
- SMS Delivered
- User Entered Flow
- User Exited Flow

---
title: "Mailchimp"
slug: "mailchimp-integration"
hidden: false
metadata: 
  title: "Mailchimp"
  description: "Integrate Mailchimp with Mixpanel"
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---

# Overview

Export Mixpanel cohorts to Mailchimp to create custom audiences that you can apply in your Mailchimp campaigns. Manage the Mailchimp integration from the Mixpanel integrations page.

## Permissions

You must be a Mixpanel project admin to enable the Mailchimp integration.

## Enable the Integration

The Mailchimp integration requires initial configuration through your Mailchimp account. Refer to [Mailchimp's documentation for information on authorizing the connection](https://mailchimp.com/help/connect-disconnect-mixpanel/).

Follow these steps to enable the integration with Mailchimp:

1. Select **Integrations** under the **Data Management** tab in the top navigation bar of Mixpanel.

![mailchimp 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Mailchimp/mailchimp1.png)

2. From the Integrations page, select the Appcues dropdown, and select **Connect**.

![mailchimp 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Mailchimp/mailchimp2.png)

You will need to provide an API key (referred to as an Authorization token in Mailchimp) to authorize the connection. Mailchimp will provide this token during the integration initialization flow.

3. The Mailchimp integration will show a **Connected** tag in the UI once the connection succeeds.

## Matching Users between Mailchimp and Mixpanel

Mixpanel only exports identified user profiles to match to Mailchimp - users without user profile properties (i.e. anonymous users) will not export.

In order to match an exported Mixpanel user to Mailchimp, the user's Mixpanel profile must contain a user property, `$email`, whose value is a string representing that user's email address.

## Export a Cohort

To export a cohort to mailchimp, navigate to Cohorts by clicking in the **Data Management** tab and select **Cohorts**.

Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

Click **Export to > Mailchimp**. Select either one-time sync or dynamic sync. Click **Start Sync**.

![mailchimp 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Mailchimp/mailchimp3.png)

## Sync Types

This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends Mailchimp a static export of users who currently qualify for the cohort. The cohort data will not be updated in Mailchimp after a one-time export.

### Dynamic Sync
In dynamic sync, Mixpanel initiates sync between a cohort and Mailchimp every 2 hours. The exported cohort will be updated every two hours to reflect the most recent list of users in a cohort.

## Observe the Audience in Mailchimp

Once the export completes, you will see updates in your Mailchimp dashboard reflecting your synced audience:

![mailchimp 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Mailchimp/mailchimp4.png)

## MTU exemptions

Events coming from Mailchimp are marked with the property "$source" equal to "mailchimp".

Mixpanel will exempt certain messaging outreach events from MTU calculations, meaning you're free to send campaigns to dormant users without them counting towards MTU billing (only once a user engages with a message will they then be counted towards that tally).

The following events are exempt from MTU calculations:

- Mailchimp - Opened Campaign
- Mailchimp - Clicked Campaign Url
- Mailchimp - Sent To
- Mailchimp - Unsubscribed
- Mailchimp - Bounced




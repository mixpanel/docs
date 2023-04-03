---
title: "Apptimize"
slug: "apptimize-integration"
hidden: false
metadata: 
  title: "Apptimize"
  description: "Integrate Apptimize with Mixpanel."
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---

# Overview

The Apptimize integration allows users to export Mixpanel cohorts into Apptimize groups, allowing you to target specific users using Apptimize. 

Mixpanel cohorts can be exported to Apptimize one time, or sync and update every 15 minutes.

## Permissions

You must be a Mixpanel project admin to enable the Apptimize integration.

## Enable the Integration

Follow these steps to enable the integration with Apptimize:

1. Select **Integrations** under the **Data Management** tab in the top navigation bar of Mixpanel.

![Apptimize 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Apptimize/apptimize1.png)

2. From the Integrations page, select the Apptimize dropdown, and select **Connect**.

![Apptimize 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Apptimize/apptimize2.png)

3. You will need to provide an Apptimize Token (generated from the Apptimize dashboard) to authorize the connection. To generate an Apptimize token, go to the Tokens page on Apptimize Dashboard and click “New Token”. Give the token a memorable name and click Generate.

![Apptimize 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Apptimize/apptimize3.png)

4. Use the Apptimize token to authorize the Mixpanel integration.

## Matching Users between Apptimize and Mixpanel

Mixpanel only exports identified user profiles (users with at least 1 set profile properties) to match to Apptimize - users without user profiles (i.e. anonymous users) will not export.

The exported users are properly mapped in Apptimize automatically by the integration through the setting of `$apptimize_user_id`. This property is set automatically when both the Apptimize and Mixpanel SDKs are installed on the client.

## Export a Cohort

To export a cohort to Apptimize, navigate to Cohorts by clicking in the **Data Management** tab and select **Cohorts**.

Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

Click Export to > Apptimize. Select either one-time sync or dynamic sync. Click Start Sync.

## Sync Types

This integration supports two types of exports: one-time export and recurring syncs. When you generate a one-time export or recurring sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends Apptimize a static export of users who currently qualify for the cohort. The cohort data will not be updated in Apptimize after a one-time export.

### Recurring Sync
In recurring sync, Mixpanel initiates sync between a cohort and Apptimize every 15 minutes. The exported cohort will be updated every fifteen minutes to reflect the most recent list of users in a cohort.

## Observe the Audience in Apptimize

Once the export completes, you will see your cohorts appear in your Apptimize Groups page.

![Apptimize 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Apptimize/apptimize4.png)

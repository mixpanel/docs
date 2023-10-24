# Webengage


## Overview

Export Mixpanel cohorts to WebEngage to create custom segments that you can apply in your WebEngage campaigns. Manage the WebEngage integration from the Mixpanel integrations page.

## Permissions

You must be a Mixpanel project admin to enable the WebEngage integration.

## Enable the Integration

To enable the integration: 

1. Select Integrations under the Data Management tab in the top navigation bar.

![Webengage 1 Image](/webengage1.png)

2. From the Integrations page, select the WebEngage dropdown, and select **Connect**.

3. Enter the [WebEngage API Key](https://docs.webengage.com/docs/rest-api-getting-started#getting-your-credentials) from your WebEngage dashboard.

![Webengage 2 Image](/webengage2.png)

4. The WebEngage integration will show a **Connected** tag in the UI once the connection succeeds.

## Matching Users between WebEngage and Mixpanel

Mixpanel only exports identified user profiles to match to WebEngage - users without user profile properties (i.e. anonymous users) will not export.

The exported users are properly mapped in WebEngage's system only if the resolved distinct_id in Mixpanel and the User ID in WebEngage have the same value. If no match is found, WebEngage will create new user profiles for the users exported from Mixpanel.

## Export a Cohort
To export a Mixpanel Cohort to WebEngage:

1. Navigate to Cohorts by clicking **Cohorts** under **Data Management** in the navigation bar.

2. Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

3. Click **Export to WebEngage**. Select either one-time sync or dynamic sync. Click **Start Sync**.

![Webengage 3 Image](/webengage3.png)

## Sync Types
This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends WebEngage a static export of users who currently qualify for the cohort. The cohort data will not be updated in WebEngage after the one-time export is complete.

### Dynamic Sync
In dynamic sync, Mixpanel initiates sync between a cohort and WebEngage every two hours. The exported cohort will be updated every two hours to reflect the most recent list of users in a cohort.

![Webengage 4 Image](/webengage4.png)


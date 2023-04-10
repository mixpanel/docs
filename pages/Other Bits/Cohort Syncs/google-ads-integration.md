---
title: "Google Ads"
slug: "google-ads-integration"
hidden: false
metadata: 
  title: "Google Ads"
  description: "Integrate Google Ads with Mixpanel."
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---

# Overview

Export Mixpanel cohorts to Google Ads to use targeted advertisements in Google Search. Manage the Google Ads integration from the Mixpanel integrations page. The integration currently supports data from Mixpanel into a Google Ads account.

## Permissions

You must be a Mixpanel project admin to use the Google Ads data integration.

## Enable the Integration

Follow these steps to enable the integration with Google Ads:

1. Select **Integrations** under the **Data Management** tab in the top navigation bar of Mixpanel.

![GoogleAds 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Google-Ads/googleads1.png)

2. From the Integrations page, select the Google Ads dropdown, and select **Sign In with Google**.

![GoogleAds 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Google-Ads/googleads2.png)

3. The Google Ads integration page shows a green export icon and details about the integration after it is connected.

## Export a Cohort

To export a cohort to Google Ads, navigate to Cohorts by clicking in the **Data Management** tab and select **Cohorts**.

![GoogleAds 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Google-Ads/googleads3.png)

Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

Click **Export to Google Ads**. Select either one-time sync or dynamic sync. Click **Start Sync**.

![GoogleAds 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Google-Ads/googleads4.png)

## Sync Types

This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends Appcues a static export of users who currently qualify for the cohort. The cohort data will not be updated in Appcues after a one-time export.

### Dynamic Sync
In dynamic sync, Mixpanel initiates sync between a cohort and Appcues every two hours. The exported cohort will be updated every day to reflect the most recent list of users in a cohort.

## Select the Cohort in Google Ads

You must log in to Google Business Manager to use the Mixpanel Cohort in Google Ads. Select the **Menu** in Google Business Manager’s top navigation. 

Click on **Tools & Settings** and launch Audience Manager.

![GoogleAds 5 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Google-Ads/googleads5.png)

The Mixpanel Cohort is available under Audience Manager. Cohorts are exported to Google Ads as mixpanel_<Cohort Name>_<Cohort ID>.

![GoogleAds 6 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Google-Ads/googleads6.png)

## Data Requirements
  
Google Ads uses email addresses to match users from the cohort with users from their system. If they do not have the email address, they will instead use a combination of phone number or first and last name.

In order to use this integration, **you must set an email as a user profile property**. In addition to an email address, Mixpanel sends the first name user profile property, the last name user profile property, a phone number user property, and a distinct_id. All other user properties are not exported.

Google Ads excludes cohort members from the audience if they are unable to match them with a user in their system. Inequality between the number of users in Google Audiences and the Mixpanel cohort indicates that Google was unable to find the user.
  
## Troubleshooting Errors

Below are some common blocking errors that may occur when authorizing or using this connection:

**Advertiser needs to be on the allow-list to use remarketing lists created from advertiser uploaded data (e.g., Customer Match lists).**
  
Google has to whitelist customers to use this feature. [This Google support article](https://support.google.com/adspolicy/answer/6299717?hl=en) contains more information. Cohort exports will remain paused until it is enabled.


**No customer found for the provided customer id.**
  
Please [use a valid customer id](https://support.google.com/google-ads/answer/1704344?hl=en).
 

**The customer can't be used because it isn't enabled.**
  
Please make sure the user setting the integrations has standard or admin access in the Google Ads account.


**The user does not have permission to perform this action on the resource or call a method.**

Please make sure the user setting the integrations has standard or admin access in the Google Ads account.


**User doesn't have permission to access customer. Note: If you're accessing a client customer, the manager's customer id must be set in the 'login-customer-id' header. See https://developers.google.com/google-ads/api/docs/concepts/call-structure#login-cust**

Please make sure the user setting the integrations has standard or admin access in the Google Ads account.


**User in the cookie is not a valid Ads user.**

Please make sure the user setting the integrations has standard or admin access in the Google Ads account.


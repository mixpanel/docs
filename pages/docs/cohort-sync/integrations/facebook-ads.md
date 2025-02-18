# Facebook Ads


## Overview

Export Mixpanel cohorts to Facebook Ads to use targeted advertisements in Facebook. Manage the Facebook Ads integration from the Mixpanel integrations page. The integration currently supports data from Mixpanel into Facebook Business.

>You must have a Facebook Business account connected to [Business Manager](https://audience.42matters.com/blog/how-to-connect-your-facebook-ad-account-to-business-manager-to-use-custom-audiences) to use this integration.

## Permissions

You must be a Mixpanel project admin to use the Facebook Ads data integration.

## Enable the Integration

Follow these steps to enable the integration with Facebook Ads:

1. Select **Integrations** under the **Data Management** tab in the top navigation bar of Mixpanel.

![Facebook 1 Image](/facebook1.png)

2. From the Integrations page, click the **Facebook Ads** dropdown.

![Facebook 2 Image](/facebook2.png)

3. Select your Facebook Ad Account ID and your connector name and also choose user property where you're storing device advertising ID (optional)

![Facebook Connector Image](/facebook_connector.png)

4. The Facebook Ads integration page will show a green export icon and details about the integration after it is connected. To disable the connector, select the **Facebook Ads** dropdown and click **Disconnect**.

## Export a Cohort

To export a cohort to Facebook Ads: 

1. Navigate to Cohorts by clicking in the **Data Management** tab and select **Cohorts**.

2. Select the cohort that you want to export. Click on the three dot icon on the right side of the cohort. 

3. Click **Export to Facebook**. Select either a one-time sync or a dynamic sync. Click **Start Sync**.

![Facebook 3 Image](/facebook3.png)

## Sync Types

This integration supports two types of exports: one-time export and dynamic sync. When you generate a one-time export or a dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time Export
In a one-time export, Mixpanel sends Facebook a static export of users who currently qualify for the cohort. The cohort data will not be updated in Facebook after a one-time export.

### Dynamic Sync
In a dynamic sync, Mixpanel initiates a sync between a cohort and Facebook every two hours. The exported cohort will be updated every two hours to reflect the most recent list of users in a cohort.

## Select the Cohort in Facebook Ads

You must log in to Facebook Business Manager to use the Mixpanel Cohort in Facebook Ads. Select the **Menu** in Facebook Business Manager top navigation. 

Click on **Audiences**.

![Facebook 4 Image](/facebook4.png)

The Mixpanel Cohort is available in the Audience list. Cohorts are exported to Facebook Ads as `mixpanel_<Cohort Name>_<Cohort ID>`.

## Data Requirement

Facebook uses email addresses to match users from the cohort with users from their system. If they do not have an email address, they will instead use either a combination of phone number or first and last name or the device advertising ID that you choose when setting up the connection.

In order to use this integration, you must set $email as a user profile property or have the advertising ID. In addition to email address, Mixpanel will send a first name user profile property, a last name user profile property, a phone number user property, an advertising id user property and the distinct id. 

Facebook excludes cohort members from the audience if they are unable to match them with a user in their system. An inequality between the number of users in the Facebook audience and Mixpanel cohort indicates that Facebook was unable to find the user.

## Troubleshooting Errors

Below are some common blocking errors (e.g. Error Message: Invalid OAuth 2.0 Access Token) that may occur when authorizing or using this connection:

#### Login Token Expired. Please disconnect and reconnect from Integrations Page.

[Facebook tokens expire after 60 days of inactivity](https://developers.facebook.com/docs/facebook-login/auth-vs-data/). Users will have to log in again to resume the cohort exports.

 

#### (#200) The current user can not update audience XXXXXXXXXXX

Verify the permissions for the user who created the sync, and then disconnect and reconnect from the Integrations page. Disconnecting and Reconnecting will resume your existing exports.

#### Error validating access token: The session has been invalidated because the user changed their password or Facebook has changed the session for security reasons.

Facebook sometimes invalidates the access token if they detect suspicious activity. Disconnect and reconnect the Facebook connection with a new token from the Integrations page to resume syncs.

#### Error validating access token: The user has not authorized application XXXXXXXXXX.

The user setting up the integration should be using a Facebook business account and have an admin role - verify these two pieces and then attempt reconnecting the integration to resume your existing exports.

#### To create or edit a Custom Audience made from a customer list, your admin needs to add this ad account to a business.

Please follow the directions here - https://www.facebook.com/business/help/910137316041095?id=420299598837059

#### To create or edit a saved audience with an uploaded customer list, please agree to the Custom Audience terms at https://business.facebook.com/ads/manage/customaudiences/tos/?act=XXXXXXXXXXX.

We generally force a window to accept the terms and conditions for the users. In rare instances where that doesn't work you can go to the above URL by replacing **XXXXXXXXXXX with your FB account ID**. Accept the terms there and then disconnect + reconnect the integration.

#### Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac.

Please disable two factor authentication and re-establish the connection from the Integrations page.

#### (#2654) Customer List Audiences Are Not Available: Ad accounts owned by businesses new to Facebook Products can create customer file Custom Audiences after several weeks of following our policies.

Please contact Facebook support to get this feature enabled for you.



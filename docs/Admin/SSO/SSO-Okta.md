---
title: "Configure Single Sign-On (SSO) with Okta"
slug: "configure-single-sign-on-sso-with-okta"
hidden: false
metadata: 
  title: "Configure Single Sign-On (SSO) with Okta"
  description: "Configure SSO with Okta."
---

# Overview

Before using this document, read the general Mixpanel SSO set-up instructions.

You have two setup options in order to use Single Sign-On (SSO) for Mixpanel through Okta:

A.  For most use cases, you can use the "Mixpanel" app within the OIN (Okta's app store). 

B.  If you have a more custom setup, follow Okta’s documentation on setting up a new application to create the Mixpanel App.

## Configure SSO in Mixpanel

Follow the general SSO set-up instructions.

Make sure to collect your postback URL and successfully claim your domain.

## Configure the Mixpanel App in Okta

A.  Use the ["Mixpanel" app within the OIN (Okta's app store)](https://www.okta.com/integrations/mixpanel/), or

B.  Follow [Okta’s documentation on setting up a new application](https://help.okta.com/en-us/Content/Topics/Apps/Apps_Apps_Page.htm) to create the Mixpanel App.

### Configure SAML

You must fill the form found in the “Configure SAML” menu in Okta. The following highlights what you should place in the fields.

![Okta Configure SAML 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_configure_saml1.png)

Make sure that the following is adjusted to match the following:

- Requestable SSO URLs: https://sso.mixpanel.com/sso/saml2
- Recipient URL: https://sso.mixpanel.com/sso/saml2
- Destination URL: https://sso.mixpanel.com/sso/saml2
- Audience URI: https://mixpanel.com/security/sso/v2/authorize/

Additionally, it is required that you use email as an attribute statement.

## Obtain Information From Okta

You must first obtain your Public Certificate, Authentication URL, and Issuer URL in order to configure Mixpanel use with Okta.

To access this information, first select the select the Mixpanel app under the "Applications" tab in Okta. Click on the **Sign On** tab.

Under the "SAML 2.0" section, click **View Setup Instructions** and scroll down to "Configuration Data".

![Okta Info 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_info1.png)

### Public Certificate

Your X.509 certificate is what allows users signing in through a third-party identity provider to be authenticated by Mixpanel without supplying a username and password. Each identity provider account has a unique X.509 certificate that will need to be uploaded to Mixpanel during the single sign-on setup process.

Click **Download Certificate** in the second entry to download your certificate.

![Okta Info 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_info2.png)

### Authentication URL

Your Authentication URL is in the third entry labeled "Redirect Login URL".

![Okta Info 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_info3.png)

### Issuer URL

You will find your Issuer URL in the third entry labeled "Identity Provider Issuer".

![Okta Info 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_info4.png)

## Enable SSO

From Mixpanel, navigate to your **Organization Settings**. From the SSO menu, insert your Public Certificate, Authentication URL, and Issuer URL.

Optionally toggle “Require Users to Log In using SSO” to prevent your users from using a username and password to log in. Click **Enable**. Organization owners and admins will still be able to log in using username and password if SSO is not set up correctly.

## Configuring SCIM Provisioning

SCIM provisioning uses [the "Mixpanel" app within the OIN (Okta's app store)](https://www.okta.com/integrations/mixpanel/).

The following prerequisites must be met to set up SCIM provisioning:

- You must have an active Enterprise plan subscription with Mixpanel. 
- You must have Okta SSO set up with Mixpanel.
- The “Username” value in Okta must be an email address with a domain that you’ve claimed.
- You need to have generated a SCIM OAuth token to use with the app. This token is located in the “Access Security” tab of your organization settings. You will need to be an organization admin to access this.

![Okta SCIM 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_scim1.png)

The following provisioning features are supported:

- **Push New Users:** New users created through Okta and assigned to the application will be created in Mixpanel.
- **Push Profile Updates:** Updates made to the assigned user's supported profile attributes (First Name, Last Name, Email) through Okta will be pushed to Mixpanel.
- **Push User Deactivation:** Deactivating the user or removing the user from the application through Okta will deactivate the user in Mixpanel (or delete the account if specified).
- **Reactivate Users:** Reassigning a previously unassigned user to the application will reactivate the user’s account in Mixpanel.

### Configuration Setup

Click the **Configure API Integration** button in Okta to begin.

![Okta SCIM 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_scim2.png)

Check the **Enable API Integration** box, then enter your SCIM token.

Select the supported features (Create/Update/Deactivate) you wish to enable:

![Okta SCIM 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_scim3.png)

The following profile attributes are required to be sent from Okta to Mixpanel:

- Username
- Given name
- Family name
- Primary email

![Okta SCIM 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_scim4.png)

Select and assign the users you wish to provision:

![Okta SCIM 5 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Okta/okta_scim5.png)

### Troubleshooting

In Mixpanel, upon account creation, a SCIM-provisioned user will be added to the organization with the organization member role. The organization role for provisioned users can be changed by an organization admin within Mixpanel.

If a Mixpanel account has already been created with the Okta user’s email (their Okta Username) and that account is **not a member** of your Mixpanel organization, provisioning setup for that Okta user will fail. It will also fail if the domain of the user’s email has not been claimed by your organization.

To resolve this, manually invite the existing user to your organization.


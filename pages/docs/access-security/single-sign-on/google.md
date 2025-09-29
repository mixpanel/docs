# Setup Google Workspace SSO


## Overview

Before using this document, read the [general Mixpanel SSO set-up instructions](/docs/access-security/single-sign-on).

You have two setup options in order to use Single Sign-On (SSO) for Mixpanel through Google Workspace IDP:

A.  For most use cases, you can use the **Mixpanel app** within Google Workspace app store

B.  If you have a more custom setup, follow Google Workspace's documentation on setting up a new application to create a custom Mixpanel app.

### Configure SSO in Mixpanel

Follow the [general SSO set-up instructions](/docs/access-security/single-sign-on).

Make sure to collect your postback URL and successfully claim your domain.

### Configure the Mixpanel App in Google Workspace

A.  Use the [Mixpanel app within Google Workspace's app store](https://admin.google.com/ac/apps/unified), or

B.  Follow [Google Workspace's documentation on setting up a new application](https://support.google.com/a/answer/6087519?hl=en) to create a custom Mixpanel app.

#### Configure SAML

A. If you use the Mixpanel app from the store, the following SAML configuration is already built into the app.
![CleanShot 2025-09-16 at 11.08.34](/Users/leonardo.fratini/Library/Application Support/CleanShot/media/media_MQGkDvuFTS/CleanShot 2025-09-16 at 11.08.34.jpg)

B. If you create a custom app, you must fill the form found in the **Configure SAML** menu in Google Workspace. Make sure that the following fields are adjusted to exactly match the corresponding values:

- **ACS URL:** https://sso.mixpanel.com/sso/saml2
- **Entity ID:** https://mixpanel.com/security/sso/v2/authorize/
- **Start URL:** https://mixpanel.com/security/sso/v2/authorize/?org_id=YOUR_ORG_ID

The following screenshot highlights what you should place in the fields:

![CleanShot 2025-09-29 at 16.30.49](/Users/leonardo.fratini/Library/Application Support/CleanShot/media/media_V4Fjk2TRhv/CleanShot 2025-09-29 at 16.30.49.jpg)

Additionally, it is required that you use `email` as an attribute statement, other attributes we recommend include `firstName` and `lastName`.

![CleanShot 2025-09-16 at 11.13.30](/Users/leonardo.fratini/Pictures/screenshots/CleanShot 2025-09-16 at 11.13.30.jpg)

### Obtain Information From Google Workspace

In order to configure Mixpanel use with Google Workspace, you must first obtain your **Public Certificate**, **SSO URL**, and **Entity ID**.

To access this information, access the Mixpanel app in Google Workspace (or create a custom app) first select **DOWNLOAD METADATA**. Then, grab the **SSO URL** and **Entity ID** as well as the certificate to upload in Mixpanel (we recommend adding the expiration date to the file name to make it easier to manage in Mixpanel).
![CleanShot X 2025-09-29 16.41.42](/Users/leonardo.fratini/Library/Application Support/CleanShot/media/media_D1Qaajbj83/CleanShot X 2025-09-29 16.41.42.png)

### Enable SSO

From Mixpanel, navigate to your **Organization Settings** and then the **Access Security** tab. From the **2FA & SSO** menu, upload your **Public Certificate** and add your **SSO URL** and **Entity ID** to the **Identity Provider Sign-In URL** and **Issuer URL**, respectively.
![CleanShot 2025-09-29 at 16.45.33](/Users/leonardo.fratini/Library/Application Support/CleanShot/media/media_1YIbDnb7hQ/CleanShot 2025-09-29 at 16.45.33.jpg)

Optionally toggle **Require Single Sign-On** to prevent your users from logging in with a username and password. Organization Owners and Admins will still be able to log in using username and password in case SSO is not set up correctly.

#### Troubleshooting

1. If a Mixpanel account has already been created with the Google Workspace user's email (their Google Workspace Username) and that account is **not a member** of your Mixpanel organization, provisioning setup for that Google Workspace user will fail. To resolve this, manually invite the existing user to your organization.

2. Provisioning will also fail if the domain of the user's email has not been claimed by your organization. To resolve this, manually invite the existing user to your organization.

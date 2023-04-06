---
title: "Manage Organization"
slug: "manage-organization"
hidden: false
metadata: 
  title: "Manage Organization"
  description: "Manage your organization"
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-30T05:52:10.102Z"
---

# Overview

As an Organization Admin, you may create and manage security processes that dictates the requirements needed for your users to access your organization.

# Two-Factor Authentication (2FA)

Two-factor authentication (2FA) is a security process that requires users to provide two different authentication factors, such as passwords or tokens, to verify their identity.

## Enable Two-Factor Authentication for your Organization

If you are an organization admin, you can enable two-factor authentication by doing the following:

1. In your "Organization Settings", select **Access Security**.

![2FA Access Security Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_access_security.png)

2. In “Two Factor Authentication”, if the icon is gray, click it to enable. If the icon is purple, click it to disable.

**Note: If your organization has SSO enabled, your organization will not have access to 2FA.**

![2FA Enable Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_enable_2fa.png)

3. The “Verify Mixpanel password” box will appear.

**Note: If you do not have a password because you use Magic Link or Google Sign In, please go to your personal settings to set up your password.**

![2FA Verify Password Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_verify_password.png)

4. Enter your password and click **Confirm** to finalize changes.

## Setting up your Two-Factor Authentication Method

Once two-factor authentication has been enabled for your organization, an individual member of your organization can set up two-factor authentication via the methods below.

### Setup via second login

On their second login, Mixpanel Users will be prompted to set up two-factor authentication via an authentication app or SMS.

#### Authentication App

1. In order to set up two-factor authentication via an authentication app, select the authentication app option and ensure you have your preferred authentication app downloaded. We recommend using apps such as Google Authenticator, Authy and Microsoft Authenticator.

![2FA Authentication App 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_authentication_app1.png)

2. Scan the QR code via your Authentication App in order to complete the setup.

![2FA Authentication App 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_authentication_app2.png)

If you are unable to scan the QR code, click on “Can’t scan QR code?” This will provide you a two-factor secret to set up your authentication app manually.

![2FA Authentication App 2b Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_authentication_app2b.png)

3. Before you log in into Mixpanel, download or copy your recovery codes. These are essential for you to log in if you happen to lose your phone.

**Note: This is the only location you can save your recovery codes, please ensure you save them in a safe place.**

![2FA Authentication App 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_authentication_app3.png)

#### SMS Authentication

1. In order to set up two-factor authentication via SMS, select the SMS option.

![2FA SMS 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_sms1.png)

2. Enter your mobile phone number and click Continue.

![2FA SMS 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_sms2.png)

3. You will receive a text message with your Mixpanel security code.

![2FA SMS 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_sms3.png)

4. On the "Two-factor verification screen", enter your Mixpanel security code, and click Log In.

![2FA SMS 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_sms4.png)

### Setup via personal settings page

An individual user can also set up their two-factor authentication via their personal settings. In order to setup two-factor authentication, follow these steps:

1. Go to the settings icon > personal settings> your profile, then click on Set Up Method.

![2FA Personal 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_personal1.png)

2. You will be asked to log out in order to set up two-factor authentication. Log in to Mixpanel and follow the setup process.

![2FA Personal 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_personal2.png)

## Changing your Two-Factor Authentication Method

An individual user can change their two-factor authentication method via their personal settings page. Users can switch their authentication method from SMS to authentication app and vice versa. Additionally, users can also change their current authentication app to another authentication app (i.e. Authy to Google Authenticator)

**Note: Changing your two-factor method will reset it**

Users can switch their method via the following steps:

1. Go to settings cog > personal settings> your profile, then click **Change Method**.

![2FA Change 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_change1.png)

2. To change your method, log out and log back in to Mixpanel to start the setup process for your new authentication method.

![2FA Change 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_change2.png)

## Login via backup methods

If you are unable to log in due to two-factor authentication because you have either lost your phone or don’t have access to your number, we have a couple backup methods you can use to log in depending on your authentication method.

**Note: Contact support if none of these backup methods work for you.**

### Login via recovery codes (authentication app)

If an authentication app is your preferred method of authentication, you can login via your saved recovery codes if you don’t have access to your phone. A user can login via a recovery code by doing the following:

1. Click on “Need help? Use a recovery code to sign in”

![2FA Backup 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_backup1.png)

2. Enter your recovery code and click Login

![2FA Backup 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/2FA/2fa_backup2.png)

**Note: If you use all your recovery codes, you will be asked to reset your two-factor authentication method on your next login.**

### Login via Authy (SMS)

Mixpanel is integrated with Authy (a Twilio service), so if you download the Authy app, you can add your email address and phone number. Then, you can add your Mixpanel account to the app. You can learn more about Authy at https://www.authy.com/.

# Single Sign-On

You can use Single Sign-On (SSO) to access Mixpanel. You must be on a Mixpanel Enterprise account and use an identity provider or a custom SAML implementation in order to use SSO with Mixpanel. 

## Access SSO Settings

To access SSO settings in Mixpanel, navigate to your **Organization Settings** located under your name in the top navigation.

![SSO Org Setting Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_org_setting.png)

**Require Users to Log In Using SSO**
Optionally toggle “Require Users to Log In using SSO” to prevent your users from using a username and password to log in. Click Enable. Organization owners and admins will still be able to log in using username and password if SSO is not set up correctly.

## Claim a Domain

Claiming a domain will add security to an SSO implementation by only allowing members with a claimed domain in their email address to access Mixpanel. SSO only works on domains that are claimed. 

To claim a domain, add a TXT record to your domain’s DNS records with a verification key provided by Mixpanel. The verification key is available after you claim a domain from your Organization Settings.

**Generate Verification Key by Claiming Domain**
To claim a domain, click Access Security in your Organization Settings.

![SSO Access Security Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_access_security.png)

Click Domain Claiming in the Access Security menu.

![SSO Domain Claiming Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_domain_claiming.png)

Click Add Domain found in Domain Claiming menu. You will be prompted to enter your Mixpanel password.

![SSO Add Domain Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_add_domain.png)

Enter the domain you wish to claim in the pop-up modal. Click Submit Claim.

![SSO Submit Claim Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_submit_claim.png)

**Check Verification Status**

-It may take up to 24 hours for Mixpanel to verify ownership after you claim a domain.

The claimed domain appears in the Domain Claiming menu. It will list as pending until it is successfully verified.

![SSO Check Verification Status Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_check_verification_status.png)

It will be indicated as verified after Mixpanel verifies the domain.

**Add Verification Token to your DNS**

The verification token is available in the Domain Claiming menu after you claim a domain. Use the token as part of the TXT record that you add to your domain’s DNS record.

Add `mixpanel-domain-verify=<your-token>` as the TXT record.

Note that you will need to leave the token in your DNS records permanently or the domain will unverify after a week. Only remove the token for domains you no longer wish to use SSO with.

## Set Up Your IDP
  
You must configure your Identity Provider (IDP) to connect to Mixpanel in order to use SSO if you are not using custom built SSO. This requires that you directly configure your SSO settings.

**Okta**
  
Setting up SSO with Okta requires that you configure a custom app in Okta. Follow these instructions to configure a custom application.

**One Login**

One Login only requires that you get the Postback URL. The application is in the Onelogin application store as "Mixpanel" and supports autoprovisioning. You will just need to copy a SCIM token from Mixpanel into the provisioning token box in the Onelogin app. You can learn how to generate a token [here](manage-projects#access-keys).
  
**G-Suite**
  
Google has an official integration with Mixpanel with instructions here. Unfortunately we do not have an autoprovisioning integration with G-Suite so you will need to rely on Just In Time Provisioning.

**Azure**

There are instructions here to set up SSO with Azure. Azure also has an auto-provisioning integration with Mixpanel which you can find more info for here.

**Other IDPs**

It is possible to set up Mixpanel with IDPs not listed above. Email sso-support@mixpanel.com to get the required information to set up SSO with an IDP not listed.

**Postback URL**
 
You likely will need to provide your IDP with a postback URL. The postback URL is accessible from the Access Security tab. To obtain your postback URL, navigate to Access Security in your Organization Settings and toggle the Single Sign-On button.
  
![SSO Postback URL Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_postback_url.png)

**SAML Certificate**

This needs to be a .cert or .pem file for a valid X509 certificate. Note that .xml files are not valid, if you have downloaded one from your IDP it will not work. Also it's important to note that this certificate will expire after some number of years. At the moment we do not send any notifications when it is about to expire, so make sure you have a system set up to cycle them every so often if you wish to avoid disruption.

## Just in Time Privisioning

Just in Time (JIT) provisioning using SAML will let users sign in automatically upon the initial login event. This removes the need for organization admin to invite individual users to an Organization. This is part of what IDP Managed Access provides.

You must complete the steps above to enable JIT provisioning. 

To turn on JIT provisioning, go to Access Security, and click on the “IDP Managed Access” toggle. The toggle will be blue if it is enabled.

Users added in this way will have first names and last names populated by the firstName and lastName profile attributes provided via SAML at login time. They will also have no roles to start off except those given to all users in your organization. To give these provisioned users default access to projects, invite All Users in the Organization to the project.
  
## IDP Managed Access
  
This toggle is to determine whether you are using your IDP to manage who should be allowed in the organization or whether you are using it purely as an authentication method and want to leave the management within Mixpanel. If it is enabled all users of your verified claimed domains who log into Mixpanel (whether they are in your org or not) will be prompted to use SSO. If they successfully log in through your SSO set up they will be automatically added to the organization with no permissions except those granted to all users. It will also redirect anyone trying to sign up for a Mixpanel account with your claimed domain or anyone requesting access to a project in your organization to sign in via SSO first. This helps ensure all users in your organization who try to use Mixpanel get routed to your IDP, where you can them assign them access to the Mixpanel app. This also prevents needing to manually invite users to Mixpanel from within the product. We recommend this to be toggled on for most customers.

This can be enabled in the Access Security tab of your Organization Settings. It is the toggle at the bottom called "IDP Managed Access" and is blue when enabled.
  
![SSO IDP Managed Access Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_idp_managed_access.png)

## SCIM

The SCIM tab in the Access Security tab of the Organization Settings lets you generate a token used to hit the SCIM endpoints. Remember to save this token, as you will only see it once. Note that only accounts with enterprise plans have access to SCIM at the moment.

You can find the official SCIM spec that Mixpanel implements a subset of here. The base endpoint is https://mixpanel.com/api/app/scim/v2 which you can hit using the SCIM token as an Authentication Bearer token. For instance a GET call on https://mixpanel.com/api/app/scim/v2/Users using the SCIM token will get you a list of all users in your organization. Note that the SCIM endpoint only affects users who's email has a domain in the list of your verified claimed domains.
  
![SSO SCIM Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/SSO/sso_scim.png)
  
While you can hit the SCIM endpoints directly, the most common use case would to be use it for autoprovisioning within an IDP that has an integration with Mixpanel provisioning. This will let your IDP and Mixpanel stay in sync - when you assign users to Mixpanel in your IDP they will be provisioned in Mixpanel, and optionally you can deprovision users within Mixpanel who lose access in your IDP. IDPs that currently have an autoprovisioning integration with Mixpanel are Okta, Onelogin, and Azure.

If you wish to revoke your SCIM Provisioning token, you can generate a new one which will kill the previous token.

# SSO via Microsoft Azure

You can set up Microsoft Azure Single Sign-On to use with your Mixpanel account. 

## Add Mixpanel as a New Application

For more information, read [this Microsoft Azure article](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/mixpanel-provisioning-tutorial) about configuring Mixpanel for automatic user provisioning. 

1. Navigate to **Enterprise Applications** on the Microsoft Azure home page under **Default Directory**.
2. Click **New Application**.
3. Search and select Mixpanel to add as an application.

## Edit SAML Config in Microsoft Azure

1. Click **Single sign-on** under **Manage**.
2. Enter the following information in the SAML Configuration:
- Entity ID: https://mixpanel.com/security/sso/v2/authorize/
- Reply URL: https://sso.mixpanel.com/sso/saml2
- Sign on URL: Postback URL from Mixpanel (should look like https://mixpanel.com/security/sso/v2/authorize/?org_id=<your org id>)
  
![Azure Config 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Azure/azure_config1.png)

  
3. Click **Edit** under **User Attributes & Claims** to add the required email claim (firstName and lastName are used for provisioning and optional).
  
![Azure Config 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Azure/azure_config2.png)
  
4. Download the SAML certificate under **SAML Signing Certificate** by clicking **Download** next to the **Certificate (Base64)** field. If you downloaded an .xml file then you have clicked the wrong button, make sure it is a .cer or .pem file. This will be uploaded to Mixpanel in the next step.

## Copy Certificate into Mixpanel

1. Navigate to the **Access Security** section in your Mixpanel **Organization Settings**.
2. Upload the certificate in the SAML Certificate field. 
3. Input the Azure AD Identifier into the Issuer URL field.
4. Input the Azure Login URL in the Identity Provider Sign-in URL field. 
5. Assign your team members this new application.
    
## SCIM Provisioning
  
Azure has an autoprovisioning integration with Mixpanel that lets you automatically add users to Mixpanel upon giving them access in Azure, and likewise removing access within Mixpanel when you remove access in Azure. You can find more information [here](https://learn.microsoft.com/en-us/azure/active-directory/saas-apps/mixpanel-provisioning-tutorial). Note that it is advised you turn on IDP Managed Access if you are using SCIM Provisioning.

# SSO via Okta
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

# Organization Discoverability
Organization Discoverability makes it seamless for new users with a shared work email domain to connect with teammates in an existing organization in Mixpanel, allowing them to access their team’s projects, data, and reports, instead of joining a new, empty org.

This feature is accessible to new users who have verified their email as well as existing organizations that are not an Enterprise plan and do not have SSO enabled.

![Organization Discoverability 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Organization-Project/discoverability1.png)

## Setting Discoverability

Only **organization owners** and **billing admins** can access Organization Discoverability by going to Organization Settings > Users & Teams > Organization Discoverability.

![Organization Discoverability 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Organization-Project/discoverability2.png)


They can enable Organization Discoverability by first specifying the private (i.e., work) email domain(s) that should be granted access when a new user signs up for Mixpanel. Please note that public email domains, such as Gmail or Yahoo, cannot be used.

The org owner or admin can then designate the level of discoverability of their organization; **open to join**, **subject to admin approval**, or **invite only**.

**Open Organization:** An organization designated “open to join” is discoverable and joinable to any new users with an admin-specified email domain(s).

**Admin Approval:** An organization designated as requiring “admin approval” is discoverable to any new user signing up with a specified email domain, but can only be joined upon request. Admins will receive an email notification to authorize access.

**Invite Only:** An organization designated “invite only” is undiscoverable regardless of email domain. New users must be invited by the admin.

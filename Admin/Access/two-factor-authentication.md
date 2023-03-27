---
title: "Two Factor Authentication (2FA)"
slug: "two-factor-authentication"
hidden: false
metadata: 
  title: "Two Factor Authentication (2FA)"
  description: "Learn about Two Factor Authentication."
---

# Overview

Two-factor authentication (2FA) is a security process that requires users to provide two different authentication factors, such as passwords or tokens, to verify their identity.


## Enable Two-Factor Authentication for your Organization

If you are an organization admin, you can enable two-factor authentication by doing the following:

1. In your "Organization Settings", select Access Security.

image

2. In “Two Factor Authentication”, if the icon is gray, click it to enable. If the icon is purple, click it to disable.

**Note: If your organization has SSO enabled, your organization will not have access to 2FA.**

image

3. The “Verify Mixpanel password” box will appear.

**Note: If you do not have a password because you use Magic Link or Google Sign In, please go to your personal settings to set up your password.**

image

4. Enter your password and click Confirm to finalize changes.

## Setting up your Two-Factor Authentication Method

Once two-factor authentication has been enabled for your organization, an individual member of your organization can set up two-factor authentication via the methods below.

### Setup via second login

On their second login, Mixpanel Users will be prompted to set up two-factor authentication via an authentication app or SMS.

#### Authentication App

1. In order to set up two-factor authentication via an authentication app, select the authentication app option and ensure you have your preferred authentication app downloaded. We recommend using apps such as Google Authenticator, Authy and Microsoft Authenticator.

image

2. Scan the QR code via your Authentication App in order to complete the setup.

image

If you are unable to scan the QR code, click on “Can’t scan QR code?” This will provide you a two-factor secret to set up your authentication app manually.

3. Before you log in into Mixpanel, download or copy your recovery codes. These are essential for you to log in if you happen to lose your phone.

**Note: This is the only location you can save your recovery codes, please ensure you save them in a safe place.**

image

#### SMS Authentication

1. In order to set up two-factor authentication via SMS, select the SMS option.

image

2. Enter your mobile phone number and click Continue.

Image

3. You will receive a text message with your Mixpanel security code.

image

4. On the "Two-factor verification screen", enter your Mixpanel security code, and click Log In.

### Setup via personal settings page

An individual user can also set up their two-factor authentication via their personal settings. In order to setup two-factor authentication, follow these steps:

1. Go to the settings icon > personal settings> your profile, then click on Set Up Method.

image

2. You will be asked to log out in order to set up two-factor authentication. Log in to Mixpanel and follow the setup process.

image

## Changing your Two-Factor Authentication Method

An individual user can change their two-factor authentication method via their personal settings page. Users can switch their authentication method from SMS to authentication app and vice versa. Additionally, users can also change their current authentication app to another authentication app (i.e. Authy to Google Authenticator)

**Note: Changing your two-factor method will reset it**

Users can switch their method via the following steps:

1. Go to settings cog > personal settings> your profile, then click **Change Method**.

image

2. To change your method, log out and log back in to Mixpanel to start the setup process for your new authentication method.

image

## Login via backup methods

If you are unable to log in due to two-factor authentication because you have either lost your phone or don’t have access to your number, we have a couple backup methods you can use to log in depending on your authentication method.

**Note: Contact support if none of these backup methods work for you.**

### Login via recovery codes (authentication app)

If an authentication app is your preferred method of authentication, you can login via your saved recovery codes if you don’t have access to your phone. A user can login via a recovery code by doing the following:

1. Click on “Need help? Use a recovery code to sign in”

image

2. Enter your recovery code and click Login

image

**Note: If you use all your recovery codes, you will be asked to reset your two-factor authentication method on your next login.**

### Login via Authy (SMS)

Mixpanel is integrated with Authy (a Twilio service), so if you download the Authy app, you can add your email address and phone number. Then, you can add your Mixpanel account to the app. You can learn more about Authy at https://www.authy.com/. Please feel free to contact support if you need additional assistance here.

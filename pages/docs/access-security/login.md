# Login

## Overview

Mixpanel users access Mixpanel's UI by authenticating through a login process. Mixpanel supports a few different methods for login.

## Magic Link
- is the default for all users when they sign up for a new account
- Unless domain is claimed or other access security settings (see 2FA and SSO)
- When you click sign in, an email is sent to the email associated with your account. Click the link in the email to login.

## Password login
- Can override default magic link login by navigating to Personal Settings and defining a password.
- After defining a password, login defaults to password moving forward and magic link option will no longer be used.
- Change password in the same personal settings page

## Organization Access Security
- org owners/admins can enforce requirements for access security to safeguard data.
- 2FA: Whenever users sign in with a username and password, they also need to enter a security code generated on their mobile device. Users do not need a security code when signing in through the organization's identity provider (SSO).
- SSO: Enable users of your organization to log in with single sign-on. Can also require users to login using SSO and assign roles/permissions via IdP.

## FAQ

#### Why am I not receiving the magic login link after I click in?
Check the junk/spam inbox for the email or click the resend the email from the login page. 

If you are not seeing the email even after checking spam and resending the email, it is possible that your account may be associated with a different email. In this case, try signing up for a new account using your provided email. If your account already exists, this is another way to send the magic login link to your email. If your account does not exist, it will create one for you.

#### Why don't I see my team's data and reports?
If you signed up via an invitation from a teammate, it is possible that the invitation was sent with the incorrect access permission. Reach out to your teammate and have them follow [these instructions to grant you access](/docs/orgs-and-projects/roles-and-permissions#invite-users).

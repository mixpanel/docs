# Shared SSO

## Overview

If you have multiple Mixpanel [Organizations](/docs/orgs-and-projects/organizations) with separate billing accounts, but need to share SSO settings and email domains for login, you can share those settings with an "Admin" Organization.

With a shared SSO setup, Single Sign-On settings and Claimed Domains are administered via this "Admin" Organization, and Organizations can be linked to the "Admin" Organization in order to utilize those settings. Administrators need administrative privileges in the Admin Organization to make changes to the shared SSO and Domain settings.

This feature is available to customers on an Enterprise Plan.

An "Admin" Organization is a special type of Organization that contains Single Sign-On settings and Claimed Domains. It can have Organization Members, but you should only add administrative users to the Admin Organization to manage security. The [SCIM](/docs/access-security/single-sign-on/overview#scim) process will add Users as Organization Members.

An "Admin" Organization is different from a regular Organization in that it will not have Projects, Teams, a Plan or Billing, or Service Accounts. Other than administrators (those with Admin or Owner roles), any Organization Members will not see the Admin Organization or interact with it directly.

> ❗ If you use Azure for SSO, you must [open a Mixpanel support ticket](https://mixpanel.com/get-support) before migrating, due to constraints with “Issuer URL” and “Identifier (Entity ID)”

## How It Works

Any Organization linked to an Admin Organization will use the Single Sign-On settings from that Admin Organization - any Single Sign-On settings or Claimed Domains the Linked Organization may have had are now ignored.

SSO settings and Claimed Domains are managed in the Admin Organization. Administrative users who manage SSO settings in the Admin Organization do not need to be members of the Linked Organization(s), and vice-versa.

This configuration supports [SCIM](/docs/access-security/single-sign-on/overview#scim).

## Differences From Single-Organization SSO

| _Feature_     | Single-Organization SSO | Shared SSO  |
| ----------- | -----------             | ----------- |
| SSO configuration    | Organization| Admin Organization|
| Claimed Domains   | Organization| Admin Organization|
| SCIM Group | Team in Organization | Linked Organization |


## Setting Up Shared SSO

1. Create an Admin Organization

2. [Set up SSO](/docs/access-security/single-sign-on/overview#scim) for the Admin Organization as if it were a regular Organization

3. Link any Organizations to the Admin Organization

4. (Optional) Set up SCIM

### 1. Create an Admin Organization
For an existing Organization, go to Organization Settings > Access Security > Shared SSO.

![SSO Create Admin Organization Image](/sso_create_admin_org1.png)

![SSO Create Admin Organization Image](/sso_create_admin_org2.png)

The new Admin Organization will be listed in the left nav in Organization Settings.

### 2. [Set up SSO](/docs/access-security/single-sign-on/overview#scim) for the Admin Organization

This is the same as if it were a regular Organization

### 3. Link any Organizations to the Admin Organization

> ❗ Any existing SSO settings in the "Linked" Organization will be ignored after this step.

Start by generating a linking code in the new Admin Organization

![SSO Generate Linking Code Image](/sso_generate_linking_code.png)

Then complete the linking by entering the linking code in the Organization to be linked.

![SSO Enter Linking Code Image](/sso_enter_linking_code.png)

The Organizations are now linked. The Linked Organization will now follow the SSO settings and claimed domains from the Admin Org.

### 4. (Optional) Set up [SCIM](/docs/access-security/single-sign-on/overview#scim)

The configurable "SCIM Name" for the Linked Organization must match a group in your IDP. Members of the matching group will be added to the Linked Organization.

![SSO Linked Organizations Image](/sso_linked_orgs.png)

## SCIM With Shared SSO

Mixpanel supports using SCIM to administer users while using Shared SSO. With single-Organization SSO, the SCIM process would push users into the Mixpanel Organization, it would create Mixpanel Teams with the names of Groups in the IDP, and it would assign Mixpanel Users to those Teams.

With Shared SSO, the SCIM process works a little differently. Users are pushed to the Admin Organization. Groups in the IDP are pushed to Organizations Linked to the Admin Organization. Groups are mapped by matching an editable “SCIM Name” field in an Organization to the name of the Group in the IDP. Users that are members of the IDP Group are assigned to the linked Organization whos SCIM Name matches the name of the Group.

> ℹ️ With Shared SSO, the SCIM process cannot create, delete or alter the linked Organizations in Mixpanel like it would with a Mixpanel Team. The SCIM process can only add and remove Users, and assign those users to the Organization.

## Migrating To Shared SSO

If you have Single Sign-On configured for an Organization, and want to use the same email domains with Shared SSO, you will need to migrate.

Following these steps in this order will minimize the time Single Sign-On is unavailable for your users.

1. Create an Admin Organization
2. Set up SSO for the Admin Organization and configure an application in your IDP to match
3. Assign users in to the app in your IDP who will use Mixpanel in any Organization
4. (optional) Set up SCIM in your IDP, but do not start pushing groups
5. Link the original Organization to the Admin Organization
    1. This will cause the existing SSO set up to stop working
6. Transfer claimed Domains from the original Organization to the Admin Organization
7. Users should be able to log in via SSO again, as before
8. (optional) Finish setting up SCIM
    1. Establish a Group in your IDP for the users who have access to the original Organization
    2. Edit the SCIM name of the original Organization to match the name of this group
    3. Configure your IDP to push this group to Mixpanel

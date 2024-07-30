# Shared SSO

## Overview

If you have multiple Mixpanel [Organizations](/docs/orgs-and-projects/organizations) with separate billing accounts, but need to share SSO settings and email domains for login, you can share those settings with an "Admin" Organization.

With a shared SSO setup, Single Sign-On settings and Claimed Domains are administered via this "Admin" Organization, and Organizations can be linked to the "Admin" Organization in order to utilize those settings. Administrators need administrative privileges in the Admin Organization to make changes to the shared SSO and Domain settings.

This feature is available to customers on an Enterprise Plan.

An "Admin" Organization is a special type of Organization that contains Single Sign-On settings and Claimed Domains. It can have Organization Members, but you should only add administrative users to the Admin Organization to manage security. The [SCIM](/docs/access-security/single-sign-on/overview#scim) process will add Users as Organization Members.

An "Admin" Organization is different from a regular Organization in that it will not have Projects, Teams, a Plan or Billing, or Service Accounts. Other than administrators (those with Admin or Owner roles), any Organization Members will not see the Admin Organization or interact with it directly.

> ❗ If you already use Azure for SSO with Mixpanel, you must [open a Mixpanel support ticket](https://mixpanel.com/get-support) before migrating, due to constraints with “Issuer URL” and “Identifier (Entity ID)”

## How It Works

Any Organization linked to an Admin Organization will use the Single Sign-On settings from that Admin Organization - any Single Sign-On settings or Claimed Domains the Linked Organization may have had are now ignored.

SSO settings and Claimed Domains are managed in the Admin Organization. Administrative users who manage SSO settings in the Admin Organization do not need to be members of the Linked Organization(s), and vice-versa.

This configuration supports [SCIM](/docs/access-security/single-sign-on/overview#scim).

## Differences From Single-Organization SSO

In single-Organization SSO, SSO is configured in each Organization. In Shared SSO, SSO is configured in the "Admin" Organization, and shared by any Linked Organizations.

In single-Organization SSO, claimed domains belong to each Organization. In Shared SSO, claimed domains belong to the Admin Organization and are shared by any Linked Organizations.

In single-Organization SSO, SCIM groups in the IDP map to a Team in Mixpanel, with the IDP group name matching the Mixpanel Team **name**. In Shared SSO, SCIM groups in the IDP map to Linked Organizations, with the IDP group name matching the Linked Organization's **SCIM Name**.

## Setting Up Shared SSO

### Set up Overview

1. Create an Admin Organization

2. [Set up SSO](/docs/access-security/single-sign-on/overview) for the Admin Organization as if it were a regular Organization

3. Link any Organizations to the Admin Organization

4. (Optional) Set up SCIM

### 1. Create an Admin Organization in Mixpanel

For an existing Organization in Mixpanel, go to Organization Settings > Access Security > Shared SSO.

![SSO Create Admin Organization Image](/sso_create_admin_org1.png)

![SSO Create Admin Organization Image](/sso_create_admin_org2.png)

The new Admin Organization will be listed in the left nav in Organization Settings.

### 2. [Set up SSO](/docs/access-security/single-sign-on/overview) for the Admin Organization

You do this in Mixpanel and your IDP. This is the same as if it were a regular Organization. [SSO documentation](/docs/access-security/single-sign-on/overview).

### 3. Link any Organizations to the Admin Organization in Mixpanel

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

> ℹ️ With Shared SSO, the SCIM process cannot create, delete or alter the linked Organizations in Mixpanel like it would with a Mixpanel Team. The SCIM process can only add and remove Users, and assign those users to the linked Organization.

## Migrating To Shared SSO

If you have Single Sign-On configured for an Organization, and want to use the same email domains with a Shared SSO; you will need to follow these steps to migrate and minimize the time Single Sign-On is unavailable for your users.

Be sure to follow these steps in this order, or there will be more downtime for Single Sign-On.

1. In Mixpanel, [Create an Admin Organization](#1-create-an-admin-organization-in-mixpanel)
2. In Mixpanel, Set up SSO for the Admin Organization and configure an application in your IDP with the corresponding settings. You can refer to the [Single Sign-on Overview section](/docs/access-security/single-sign-on/overview) in our docs or to the respective IDP docs for [Azure](/docs/access-security/single-sign-on/azure) or [Okta](/docs/access-security/single-sign-on/okta)
3. In your IDP, assign all users (who will be using Mixpanel in any Linked Organization) into the newly configured app
4. (optional) In your IDP, set up SCIM for the newly configured app, but do not start pushing groups
5. In Mixpanel, [link the original Organization to the Admin Organization](#3-link-any-organizations-to-the-admin-organization-in-mixpanel)

> This will cause the existing SSO set up to stop working

6. In Mixpanel, transfer claimed Domains from the original Organization to the Admin Organization. Any claimed Domains in a Linked Organization will be hidden.
7. Users should be able to log in via SSO again, as before
8. (optional) Finish setting up SCIM
    1. In your IDP, establish a Group for the users who have access to the original Organization
    2. In Mixpanel, edit the SCIM name of the original Organization to match the name of this group
    3. Configure your IDP to push this group to Mixpanel

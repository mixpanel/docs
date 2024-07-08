# Shared SSO

## Overview

If you have multiple Mixpanel Organizations with separate billing accounts, but need to share SSO settings and email domains for login, you can share those settings with an "Admin" Organization.

With a shared SSO setup, Single Sign-On settings and Claimed Domains are administered via this "Admin" Organization, and Organizations can be linked to the "Admin" Organization in order to utilize those settings. Administrators need administrative privileges in the Admin Organization to make changes to the shared SSO and Domain settings.

This feature is available to customers on an Enterprise Plan.

An "Admin" Organization is a special type of Organization that contains Single Sign-On settings and Claimed Domains. It can have users, but these will typically be administrative users.

An "Admin" Organization is different from a regular Organization in that it will not have Projects, Teams, a Plan or Billing, or Service Accounts. Other than administrators, Users will not see the Admin Organization or interact with it directly.

## How It Works

Any Organization linked to an Admin Organization will use the Single Sign-On settings from that Admin Organization - and Single Sign-On settings or Claimed Domains the first Organization may have had are now ignored.

SSO settings and Claimed Domains are managed in the Admin Organization. Administrative users who manage SSO settings in the Admin Organization do not need to be members of the Linked Organization(s), and vice-versa.

This configuration supports SCIM.

## Differences From Single-Organization SSO

| _Feature_     | Single-Organization SSO | Shared SSO  |
| ----------- | -----------             | ----------- |
| SSO configuration    | Organization| Admin Organization|
| Claimed Domains   | Organization| Admin Organization|
| SCIM Group | Team in Organization | Linked Organization |

> If you use Azure for SSO, contact Mixpanel before migrating, due to constraints with “Issuer URL” and “Identifier (Entity ID)”

## Setting Up Shared SSO

Overview:

1. Create an Admin Organization
2. Set up SSO for the Admin Organization as if it were a regular Organization
3. Link any Organizations to the Admin Organization
4. (Optional) Set up SCIM

## SCIM With Shared SSO

Mixpanel supports using SCIM to administer users while using Shared SSO. With single-Organization SSO, the SCIM process would push users into the Mixpanel Organization, it would create Mixpanel Teams with the names of Groups in the IDP, and it would assign Mixpanel Users to those Teams.

With Shared SSO, the SCIM process works a little differently. Users are pushed to the Admin Organization. Groups in the IDP are pushed to Organizations Linked to the Admin Organization. Groups are mapped by matching an editable “SCIM Name” field in an Organization to the name of the Group in the IDP. Users that are members of the IDP Group are assigned to the linked Organization whos SCIM Name matches the name of the Group.

> With Shared SSO, the SCIM process cannot create, delete or alter the linked Organizations in Mixpanel like it would with a Mixpanel Team. The SCIM process can only add and remove Users, and assign those users to the Organization.

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

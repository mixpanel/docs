## Setting Up Mixpanel

### Mixpanel Organization
Each Mixpanel customer is assigned an [Organization](https://help.mixpanel.com/hc/en-us/articles/360020461952#organizations-introduction) which serves as the controlling entity for managing all your Mixpanel analytics needs.

- [Pricing / Billing Plan](https://help.mixpanel.com/hc/en-us/categories/115000963103#billing-and-plans) - determines data volume limits and features available across all projects in the organization
- [Mixpanel Project(s)](https://help.mixpanel.com/hc/en-us/categories/115000963103#project-configuration) - container for product's analytics data (events, properties, user profiles, reports, etc.)
- [User Account(s)](https://help.mixpanel.com/hc/en-us/categories/115000963103#account-and-organization) - used to sign into Mixpanel given the appropriate role for organization and project level access
- Other organization settings - [teams](https://help.mixpanel.com/hc/en-us/articles/360020731831-Create-and-Manage-Teams), [service accounts](https://developer.mixpanel.com/reference/service-accounts), [access security (SSO/ 2FA)](https://help.mixpanel.com/hc/en-us/categories/115000963103#access-and-security), [data & privacy](https://help.mixpanel.com/hc/en-us/sections/115001299023-Data-Security-and-Privacy), etc.

### Mixpanel Projects
Each Mixpanel organization contains one or more [Projects](https://help.mixpanel.com/hc/en-us/articles/115004505106-Create-and-Manage-Projects) that house events, properties, user profiles, and other reporting metadata that can be created with EU data residency if applicable.

- [Timezone](https://help.mixpanel.com/hc/en-us/articles/115004547203-Manage-Timezones-for-Projects-in-Mixpanel) - [dates](https://help.mixpanel.com/hc/en-us/articles/115004547063#date) (including timestamps) are ingested in UTC and converted to the project’s configured timezone for reporting. 
- Access Keys
  - [Project Token](https://help.mixpanel.com/hc/en-us/articles/115004502806) - used solely for ingestion to identify (not authenticate) a project when collecting data in front-end implementations (client-side SDKs or Ingestion API)
  - [API/Project Secret](https://help.mixpanel.com/hc/en-us/articles/115004490503#api-secret) - legacy authentication for importing and exporting data, Service Accounts are the preferred and should be used where possible as API SDecret will be deprecated over time
- Other project settings - [group keys](https://help.mixpanel.com/hc/en-us/articles/360025333632#implementation), [data views](https://help.mixpanel.com/hc/en-us/articles/360043782572), [service accounts](https://developer.mixpanel.com/reference/service-accounts), [public dashboard](https://help.mixpanel.com/hc/en-us/articles/4402022733844), [sessions](https://help.mixpanel.com/hc/en-us/articles/115004695223), etc.

#### Create at least 2 Mixpanel Projects (Production and Development)
Mixpanel recommends tracking 1 product with multiple platforms (mobile, web, etc.) into one project, but [separate projects for development and production](https://help.mixpanel.com/hc/en-us/articles/360001354886-Automatically-Separate-Development-Data). There may be [factors](https://help.mixpanel.com/hc/en-us/articles/115004491683-When-To-Use-Multiple-Projects#factors-to-consider) where implementing separate projects is required, please refer to the Mixpanel Help.

[![create-project-steps](/create-project-steps.png)](/create-project-steps.png)

### Mixpanel User Accounts
Each Mixpanel user account belongs to an organization and may be assigned with multiple projects with varying permissions / roles.

- [Organization Role](https://help.mixpanel.com/hc/en-us/articles/360025387911-Organization-Roles-and-Permissions) - each user will have a single organization role per organization
  - Owner (at least one) - super user for the organization and all projects underneath
  - Admin - manage projects, members, and roles in the organization (with [certain exceptions](https://help.mixpanel.com/hc/en-us/articles/360025387911-Organization-Roles-and-Permissions#admin))
  - Billing Admin - primarily for managing Billing Plans 
  - Member - *basic membership* for a user to have access to Project(s) and or Team(s)

- [Project Role](https://help.mixpanel.com/hc/en-us/articles/360024613412-Project-Roles-and-Permissions-) - each user can have multiple project roles, where it conflicts [permissions are additive](https://help.mixpanel.com/hc/en-us/articles/360024613412-Project-Roles-and-Permissions-#having-multiple-roles-at-once)
  - Owner - super user for the project, default for organization owners
  - Admin - manage project (except delete, reset, and security) and members within, default for organization admins
  - Analyst - create, save, edit reports + share and make public dashboards (*most common role for users*)
  - Consumer - create, save, edit reports but unable to share or create public dashboards

#### User Access Management Approach
There are two general approaches to user management in Mixpanel

![user-access-approach](/user-access-approach.png)

#### Using Mixpanel Teams
Mixpanel enables assignment of projects and project roles to groups of users called [Teams](https://help.mixpanel.com/hc/en-us/articles/360020731831-Create-and-Manage-Teams) with the flexibility to also assign such projects and project roles to individual user accounts if required.

![using-teams](/using-teams.png)

#### Basic User Account Setup
Organization Owners and Admins can assign projects or teams directly to user accounts at the organization level by minimally provisioning them with an organization Membership.

![org-level-user-setup](/org-level-user-setup.png)

Project Owners and Admins can be created to delegate access provisioning privileges at the project level. A [default project role](https://help.mixpanel.com/hc/en-us/articles/360020731811-Invite-and-Manage-Users#setting-a-default-role-on-a-project) can also be set for All Users in the Organization as a baseline access. Teams are not available at the project level.

![project-level-user-steup](/project-level-user-steup.png)

#### Single Sign-On (SSO) and 2FA
Mixpanel provides [Single Sign-On (SSO)](https://help.mixpanel.com/hc/en-us/articles/360036428871-Single-Sign-On) access to enterprise accounts using either an [Identity Provider (IDP)](https://help.mixpanel.com/hc/en-us/articles/360036428871-Single-Sign-On#set-up-your-idp) or a custom SAML implementation such as [Okta](https://help.mixpanel.com/hc/en-us/articles/115004474143) or [Microsoft Azure](https://help.mixpanel.com/hc/en-us/articles/360040323292).
- Enabling [Just in Time (JIT)](https://help.mixpanel.com/hc/en-us/articles/360036428871-Single-Sign-On#just-in-time-provisioning) provisioning using SAML removes the need for organization admins to invite individual users to an organization. 
- IDPs (Okta, Onelogin, and Azure) that have auto-provisioning integrations with Mixpanel enables syncing of access provisioning and deprovisioning for users.
- To give provisioned users default access to projects, invite all users in the organization by [Setting a Default Role on a Project](https://help.mixpanel.com/hc/en-us/articles/360020731811-Invite-and-Manage-Users#setting-a-default-role-on-a-project).

Mixpanel also provides [Two Factor Authentication (2FA)](https://help.mixpanel.com/hc/en-us/articles/115004485966-Two-Factor-Authentication-2FA-) feature requiring users to provide a security code sent via SMS to their configure mobile number to verify their identity.

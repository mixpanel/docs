# Plan

## Overview

Before you start sending data into your Mixpanel project, it's important to take some time to setup your Mixpanel instance and plan out what actions or behaviors you want to track, in order to achieve your product or business goals.

* [x] [Setup](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tutorials/plan/setup#setting-up-mixpanel) _(for Organization Owners and Admins)_ - takes you through how you should go about setting up your Mixpanel Organization and the underlying Projects.
* [x] [Framework](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tutorials/plan/framework) - if you need guidance on defining your metrics and KPIs to help you achieve your business and product objectives, this tutorial should help you.
* [x] [Tracking Strategy](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tutorials/plan/tracking-strategy) - this tutorial helps you understand Mixpanel's data model so you're equipped with building out your tracking plan to measure your metrics and KPIs.

## Setting Up Mixpanel

> Note: this section is for Organization Owners and Organization Admins who are responsible for setting up your Organization and Projects.

You should have a Mixpanel [Organization](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/organizations) already assigned to your login if you had signed up as the main Mixpanel [Owner](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/roles-and-permissions#owner). If not, please contact our [Mixpanel Support](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/support/response-times#contacting-mixpanel-support) team for assistance.

Here's an outline of what we'll be covering in this section:

1. Configuring your Mixpanel **Organization's Discoverability** _(Enterprise Plan non-SSO accounts only)_
2. Creating separate **Development and Production Mixpanel Projects**
3. Planning your users' **Data Access and Visibility** using Mixpanel's [Data Views & Classification](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/data-governance/data-views-and-classification) _(Enterprise Plan Only)_
4. Setting up **Teams** structure and/or **Adding Users** to Mixpanel Projects

### Organization Discoverability

By default, an organization is setup as **Invite Only**, which means new users must be explicitly invited by an owner or admin to be part of the organization. If you are on an [Enterprise Plan](https://mixpanel.com/settings/org/plan) and do not plan to setup [SSO](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/access-security/single-sign-on), Mixpanel recommends setting one of the following organization discoverability, by specifying the email domain(s) that should be granted access when a new user signs up for Mixpanel:

1. **Open Organization** - any new user with matching email domain(s) can join (without approval)
2. **Admin Approval** - admins will receive an email notification (and approve) for users who made a request to join

Click [here](https://mixpanel.com/settings/org/users-and-teams/find-your-org) to setup your organization, or for more information, refer to our documentation on [Organization Discoverability](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/organizations#organization-discoverability).

### Simplified Identity Management

Since April 2024, Mixpanel has made the [Simplified API](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tracking-methods/id-management/identifying-users#how-does-the-simplified-api-differ-from-the-original-api) as the default identity management setting for newly created organizations. If your Mixpanel organization was created prior to this, it might not have this enabled.

Click [here](https://mixpanel.com/settings/org/id-management) to check and configure your organization to default to **Simplified API**. Also make sure that any new Mixpanel projects, that does not have data tracked yet, choose to use **Simplified API**.

We recommend using the **Simplified API** option as it is a straightforward simpler way of managing your users' identity in Mixpanel. More details about how Simplified API handles identity management can be found in our documentation under [Identifying Users](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tracking-methods/id-management/identifying-users#how-does-the-simplified-api-differ-from-the-original-api). We will also cover a tutorial around this under the [Identity Management Best Practice](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tutorials/implement/send-your-data#identity-management-best-practices) section.

### Development and Production Project Setup

We recommend that you minimally setup two Mixpanel projects, one for **Development** data and another for **Production** data. This is to ensure that you keep development test data separate from actual live user behavioral data. Read more details about [Developer Environments](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/best-practices/developer-environments).

1. Go to the **Projects** under your **Organization Settings**, click [here](https://mixpanel.com/settings/org/projects)
2. Click **Create Project** to create each project
   * We recommend choosing **United States** as _Where To Store Your Data_ (unless you have [EU Residency](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/privacy/eu-residency) requirements)
   * Select the **Timezone** with which you want to analyze your data (more information on [Project Timezones](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/managing-projects#manage-timezones-for-projects))

Refer to docs on [Project Setup](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/best-practices/project-setup) for more detailed steps and best practices.

### Plan Data Access and Visibility

By default, all data in a Mixpanel project is accessible to all your users in the Mixpanel organization. However, you may have requirements to segregate data visibility or restrict access to certain data that might be considered more sensitive and should not viewable by the entire organization. In these instances, you might be able to use Data Views and Classified Data within your Mixpanel project to restrict access.

> Note: Data Views and Classified Data settings are at project level. You would need to have data in your Mixpanel project to be able to configure these settings.

#### Data Views

If for instance, you want to provide the web team only with access to web events, and the iOS and Android teams access to their specific events, but still want the business teams to have a single customer view of the customer's behavior across the different platforms. [Data Views](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/data-governance/data-views-and-classification) can help with this. It enables Project Owners and Admins to manage data access for a group of users within a single Mixpanel project for privacy and productivity purposes.

You can add data views within your project settings. A combination of filters can be applied depending upon the data access required:

1. Events - include or exclude specific events names
2. Event Properties - filter explicit property values across events _(example: Mixpanel Library = web)_
3. User Profile Properties - filter explicit users based on their user property value _(example: Staff User = true)_

> Note: Filtering by User Profile Properties removes the ability to analyze by [Groups](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-structure/advanced/group-analytics#group-by-a-custom-identifier)

{% embed url="https://www.youtube.com/watch?v=E4C-eQgj2Zs" %}

Refer to docs for a more detailed guide on setting up [Data Views](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/data-governance/data-views-and-classification#data-views-overview).

#### Classified Data

In general, you should _**not be sending**_ data that are considered sensitive (ie: Personal Identifiable Information, Secured Data, etc.) to your Mixpanel projects. Do consult your company's legal, security, or compliance teams before you send any potential sensitive data. Also refer to Mixpanel's [Legal Hub](https://mixpanel.com/legal/privacy-policy) for our Privacy Program.

In scenarios where you want to send non-PII data but want to limit only certain users within the project access, you can do so using [Classified Data](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/data-governance/data-views-and-classification#mark-properties-as-classified-data). This allows you to mark those specific event and user properties as classified, and only users who have been granted access to classified data can view them.

{% embed url="https://www.youtube.com/watch?v=E4GHQ9v0POo" %}

Once data is in your project, ensure that you have marked all relevant event and user properties as classified before you start granting access to users.

Refer to docs for a detailed guide on setting up [Classified Data](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/data-governance/data-views-and-classification#data-classification).

### Setup Teams or Add Users to Mixpanel Projects

There are two general approaches to user management in Mixpanel.

* [Teams](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/roles-and-permissions#teams) - organization owners and admins create teams at the organization level, grant projects and permissions, and assign users to teams.
* [Project based](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/roles-and-permissions#invite-users-to-a-project) - organization admins appoint project level admins who grant permissions to users.

Users are required to be part of your Mixpanel Organization (either through [self-joining](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/organizations#organization-discoverability) or via an [invitation from the admin](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/roles-and-permissions#invite-users-to-an-organization)), before they can be granted access to any Mixpanel Project.

1. Go to the **Users & Teams** under **Organization Settings** to setup your **Teams**, click [here](https://mixpanel.com/settings/org/users-and-teams/teams) _(Optional)_
2. Invite users to your [organization](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/roles-and-permissions#invite-users-to-an-organization), either add them to teams or directly add them into your [projects](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/roles-and-permissions#invite-users-to-a-project)
3. Assign the appropriate [Organization](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/roles-and-permissions#organization-roles) and [Project](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/orgs-and-projects/roles-and-permissions#project-roles) roles; a default project role can also be set for All Users in the Organization as a baseline access.

Refer to docs for a detailed guide on [Project Setup](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/best-practices/project-setup).

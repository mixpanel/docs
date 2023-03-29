---
title: "Organizations & Projects"
slug: "organizations-projects"
hidden: false
createdAt: "2023-03-27T17:39:02.165Z"
updatedAt: "2023-03-27T17:39:02.165Z"
metadata:
  title: "Organizations & Projects"
  description: "TODO Fill in"
---

# Overview

The Mixpanel administrative system includes organizations and projects. 

An **Organization** is the controlling entity that links projects, users, and a plan together. Each organization has a single Mixpanel plan associated with it and that plan is what determines the data volume limits and features available across all projects in the organization.

A **Project** is a container for your product's analytics data, including saved entities like custom events, or saved reports. Projects house the events, properties and user profiles sent to them which can then be queried with Mixpanel’s web interface and APIs. A single organization can contain multiple projects and each project’s data tallies are summed together to give the organization-level usage.

![Organization Overview 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Organization-Project/organization_overview.png)

# Manage Team Members

## Invite Users

You can invite users users to an organization or to a project with specific role permissions.

>See Permissions to learn more about organizaton roles and project roles.

### Invite Users to an Organization

To invite a user to an organization:

1. Under "Organization Settings", click **Users & Teams** and you will land on the Users tab.
2. Click **Invite Users**. The “Invite New Users” box appears.
3. Enter the email address of the user and select their **Organization Role**, **Projects** to add them to, and **Project Role**.
4. Click **Add another user** to invite additional users.
5. Click **Invite** to complete the process.

Need new invite box image

You may bulk invite users via CSV by selecting **Bulk invite** and following the provided **CSV template**.

### Invite Users to a Project

To invite a user to a project:

1. Under "Project Settings", click **Project Users**.
2. Click **Invite Users**.
3. Click the **User** dropdown menu to select existing users in your organization or type an email to invite a new user.
4. Assign a role in the **Role** dropdown menu.
5. Click **Add another user** to invite additional users.
6. Click **Invite** to complete the process.

Need new invite box image

## Remove Users

You can remove users from a project or organization.

### Remove User from a Project

>Note: Only users with Organization Owners and Organization Admins can remove users that have access to a project granted through a Team.

To remove a user from a project:

1. Under "Project Settings", click **Project Users**.
2. Find user(s) to remove and click the checkbox next to their name.
3. Click the **Delete** button that appears at the top of the table.

image showing delete button

>Note: An organization user may be a member of multiple projects. Deleting a user from one project does not affect their access to other projects within the organization.

### Remove User from an Organization

1. Under "Organization Settings", click **Users & Teams**.
2. Find user(s) to remove and click the checkbox next to their name.
3. Click the **Delete** button that appears at the top of the table.

>Note: Deleting a user from an organization will remove them from all projects and teams within the organization and is non-reversible.

image showing warning?

# Permissions

In Mixpanel, users have roles in an organization and in a project.

The types of organization and project roles a user has should be based on the required permissions users need for specific levels.

## Organization Roles

The table below visually breaks down all the permissions per role on an organization level.

| **Organization Role**                                              | **Owner**          | **Admin**          | **Billing Admin**  | **Member** |
|--------------------------------------------------------------------|--------------------|--------------------|--------------------|------------|
| Manage Billing Plans                                               | :heavy_check_mark: | :x:                | :white_check_mark: | :x:        |
| Create Projects                                                    | :white_check_mark: | :white_check_mark: | :x:                | :x:        |
| Delete Projects                                                    | :white_check_mark: | :x:                | :x:                | :x:        |
| Create/Delete Teams                                                | :white_check_mark: | :white_check_mark: | :x:                | :x:        |
| Transfer Projects Between Organizations                            | :white_check_mark: | :x:                | :x:                | :x:        |
| Add/Invite/Remove users to an Organization and or Projects         | :white_check_mark: | :white_check_mark: | :x:                | :x:        |
| Add/Modify/Remove Service Accounts to Organization and or Projects | :white_check_mark: | :white_check_mark: | :x:                | :x:        |
| Modify Roles - Organization Level                                  | :white_check_mark: | :white_check_mark: | :x:                | :x:        |
| Modify Roles - Make themselves an Owner                            | :white_check_mark: | :x:                | :x:                | :x:        |
| Modify Roles - Project/Team Level                                  | :white_check_mark: | :white_check_mark: | :x:                | :x:        |
| Modify 2-FA and SSO                                                | :white_check_mark: | :white_check_mark: | :x:                | :x:        |
| Request Organization Deletion                                      | :white_check_mark: | :x:                | :x:                | :x:        |

### Owner

Organization Owners have administrative permissions for the organization and all the projects in the organization. Multiple users can be Owners. However, each organization must have at least one Owner.

### Admin

Organization Admins have permissions to manage projects, members and roles in the organization. Organization Admins have the same permissions as Organization Owners EXCEPT for the following:

- Request Organization deletions
- Delete Projects
- Transfer Projects between Organizations
- Manage Billing Plans

### Billing Admin

Organization Billing Admins can only manage billing plans for your company. The Billing Admin does not have to belong to a team or project. A user can be a Billing Admin and also a member of a Project or a Team simultaneously.

Billing admins can view organization settings solely to:

- Manage Billing Plans
- Update Billing Information
- View Receipts
- Submit a Downgrade Request

### Member

Organization Members have no permissions to control or manage organization settings.

In order for a user to have access to project(s) and/or team(s), they must first be added to the organization as a Member.



## Project Roles


## Multiple Roles at Once


## Setting a Default Role on a Project

# Organization Discoverability

Organization Discoverability makes it seamless for new users with a shared work email domain to connect with teammates in an existing organization in Mixpanel, allowing them to access their team’s projects, data, and reports, instead of joining a new, empty org.

This feature is accessible to new users who have verified their email as well as existing organizations that are not an Enterprise plan and do not have SSO enabled.

![Organization Discoverability 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Organization-Project/discoverability1.png)

### Setting Discoverability

Only **organization owners** and **billing admins** can access Organization Discoverability by going to Organization Settings > Users & Teams > Organization Discoverability.

![Organization Discoverability 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Organization-Project/discoverability2.png)


They can enable Organization Discoverability by first specifying the private (i.e., work) email domain(s) that should be granted access when a new user signs up for Mixpanel. Please note that public email domains, such as Gmail or Yahoo, cannot be used.

The org owner or admin can then designate the level of discoverability of their organization; **open to join**, **subject to admin approval**, or **invite only**.

**Open Organization:** An organization designated “open to join” is discoverable and joinable to any new users with an admin-specified email domain(s).

**Admin Approval:** An organization designated as requiring “admin approval” is discoverable to any new user signing up with a specified email domain, but can only be joined upon request. Admins will receive an email notification to authorize access.

**Invite Only:** An organization designated “invite only” is undiscoverable regardless of email domain. New users must be invited by the admin.






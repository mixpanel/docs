---
title: "Manage Team Members"
slug: "manage-team-members"
hidden: false
metadata: 
  title: "Manage Team Members"
  description: "Manage Team Members in Mixpanel"
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-30T05:52:10.102Z"
---

# Overview
Your team members access your organization and its projects using individual user accounts which is what you use to sign into Mixpanel. An account must be part of an organization but it does not need to be part of all projects in the organization.  Each account will have a single organization role per organization and one project role for each project it is a part of. These roles can further limit what an account will have access to in Mixpanel.


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

>If there are projects that you wish everyone in your organization have some baseline access to as a certain role, you may set default roles by choose All Users in the Organization and select a role in the **Invite Users module** to provide all current and future users in your organization with access.


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

An Organization has 4 roles: Owner, Admin, Billing Admin, and Member. The table below visually breaks down all the permissions per role on an organization level.

| **Organization Role**                                              | **Owner**          | **Admin**          | **Billing Admin**  | **Member** |
|--------------------------------------------------------------------|--------------------|--------------------|--------------------|------------|
| Manage Billing Plans                                               | :white_check_mark: | :x:                | :white_check_mark: | :x:        |
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

A Project has 4 roles: Owner, Admin, Analyst, and Consumer. The table below is an overview of the permissions per role on an project level.

| **Project Roles**              | **Owner**          | **Admin**          | **Analyst** | **Consumer** |
|--------------------------------|--------------------|--------------------|-------------|-------------|
| Transfer/Reset/Delete Projects | :white_check_mark: | :x:                | :x:         | :x:         |
| Edit Project Timezones         | :white_check_mark: | :white_check_mark: | :x:         | :x:         |
| Edit Project Name              | :white_check_mark: | :white_check_mark: | :x:         | :x:         |
| View Access Keys               | :white_check_mark: | :white_check_mark: | :x:         | :x:         |
| View Usage Statistics          | :white_check_mark: | :white_check_mark: | :x:         | :x:         |
| Access Time Period Settings    | Edit               | Edit               | View Only   | View Only   |
| Invite Project Users           | :white_check_mark: | :white_check_mark: | :x:         | :x:         |
| Change Project Users Role      | :white_check_mark: | :white_check_mark: | :x:         | :x:         |
| Approve Access Requests        | :white_check_mark: | :white_check_mark: | :x:         | :x:         |
| Create Service Accounts        | :white_check_mark: | :white_check_mark: | :x:         | :x:         |

### Owner

When a user creates a project, they own and have complete control over it. They have all permissions at the project level.

They can provision project ownership to other project users.

Organization owners have administrative permissions to assume an owner role in a project.

### Admin

Project admins have the same set of permissions as project owners. However, they cannot delete or reset the project or manage its security.

Organization admins have administrative permissions to assume an admin role in a project.

### Analyst

Project analysts can create and save Mixpanel reports and Boards. They can also share their saved reports and Boards, along with reports and Boards in which they have editor permissions.

Project analysts cannot manage team member roles.

### Consumer

Project consumers can view and save their own reports and Boards. Consumers cannot share their saved reports and Boards with their team members as they will be marked as private.

Consumers can add saved reports to their own Boards. Consumers can also duplicate another user's Board and view it as a private Board.

Consumers can edit reports and Boards on which they have been added as an editor. However, consumers cannot share these reports and Boards.

Consumers cannot create public Boards.

Project consumers cannot manage team member roles.


### Multiple Roles at Once

It is possible to have multiple or conflicting roles on a project via teams or organization roles. Within Mixpanel all roles are additive and strictly give permissions to an action. They do not remove any abilities.

For example:

1. A project Owner who is an organization Admin will have both project Owner and project Admin permissions in the project. For all intents and purposes, this is the same as having just the project Owner role.

2. If a user is assigned both the Consumer role individually and the Analyst role via a team. The user would be able to do both anything a Consumer can do and anything an Analyst can do.

# Teams

Mixpanel enables you to create and delete Teams within an organization. Teams make it easier to manage roles and permissions for a group of users. Users who are a member of a Team will be provisioned with the same role and permission that is assigned to the team. 

## Creating Teams

To create teams in Mixpanel:

1. Under "Organization Settings", click **Users & Teams** and you will land on the Users tab.
2. Click **Teams** to see a list of current teams in your organization.
3. Click **Create Team** and provide a team name.
4. Click **Done** to complete the process and see the team's permission and membership.

## Adding Users to Teams

All users added to a team will receive the same role and permissions that is assigned to the team. To add users to a team:

1. Under "Organization Settings", click **Users & Teams** and you will land on the Users tab.
2. Select the **Teams** tab and select the team to add users to.
3. Click **Add Users** to select users to add to the team.
4. Click **Done** to complete the process.

## Managing Team Permission

### Adding Projects to Teams

Adding projects to a team gives all individuals in the team access to that project with the specified role. To add projects to a team:

1. Under "Organization Settings", click **Users & Teams** and you will land on the Users tab.
2. Select the **Teams** tab and select the team to manage.
3. Click **Add Project** and select the project(s) and permission role.
4. Click **Add** to complete the process.

### Other Team Permissions

Adding Data Views and Service Accounts to a team will give all individuals in the team access to the Data View and Service Accounts.

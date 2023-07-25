# Setting Up Mixpanel

Status: Added to Docs
Category: Implementation
Comments: Though we have this already?
Create Date: June 15, 2023 11:03 AM
Details: Cleaning up Setting Up Mixpanel to make it more tutorial centric
Ideator: Peishan Tan
Owner: Peishan Tan
Who is this for?: Project Owner

## Setting Up Mixpanel

This tutorial walks you through the best practices of how to set up Mixpanel, and the considerations to take into account for how and when to create projects, data views, and classified data.

### Creating Your Mixpanel Projects

Within your Mixpanel organization, we recommend at the minimum having [separate development and production projects](notion://www.notion.so/docs/tracking/how-tos/set-up-projects). Keeping your development data separate is important to maintain the integrity of your Mixpanel data. It's easy to prevent development data from cluttering your production project, but hard to detangle in later stages of a project.

[https://github.com/mixpanel/docs/assets/50901466/8d6d81cf-0e55-4bef-a743-b38d316e0db4](https://github.com/mixpanel/docs/assets/50901466/8d6d81cf-0e55-4bef-a743-b38d316e0db4)

In certain instances, it may make sense to [create separate production projects](https://docs.mixpanel.com/docs/tracking/how-tos/set-up-projects#:~:text=Do%20your%20app%20and%20website%20offer%20fundamentally%20different%20functionality%3F) as well. For example, if your app or web offer fundamentally different functionality, it may make sense to use separate projects so as not to clutter your analytics. 

In general though, if you want to track and study cross-platform user behaviour, we recommend using a single production project. Example scenarios:

- Your platform teams - web, android, iOS - are separate and just need access to their own data. You can use event properties, e.g. platform = ‘web’, to create [data views](https://docs.mixpanel.com/docs/admin/data-governance/data-views-data-classification) and give relevant teams access to the views they need. The bonus in this scenario is that you for boards / reports is automatically shared with the different platform teams, and automatically filtered to their specific platform.
    
    <div style="position: relative; padding-bottom: 60.810810810810814%; height: 0;"><iframe src="[https://www.loom.com/embed/4ff06748cc5f4a84a4fb6f581f2b7395?sid=4408aac7-a54f-48b8-9c72-c0edf9a3babe](https://www.loom.com/embed/4ff06748cc5f4a84a4fb6f581f2b7395?sid=4408aac7-a54f-48b8-9c72-c0edf9a3babe)" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
    
- You have a B2B and a B2C platform and want to be able to analyze the certain users’ behaviour across both platforms. For instance, you’re a restaurant with a B2B app to manage multiple restaurants and reservations. You also have a B2C app for customers to make reservations. You want to analyze metrics across different entities: customers, restaurants, and reservations of which certain actions can be done either on the B2B or B2C platform. Being able to analyze conversions across these entities where actions can be done on either platform requires data to be in 1 project and having [Group Analytics](https://docs.mixpanel.com/docs/analysis/advanced/group-analytics) as an add-on.
- You have sensitive data that you do want to send into Mixpanel, but want to prevent some users from getting access. In this case, you can still use a single project, but leverage [classified data](https://docs.mixpanel.com/docs/admin/data-governance/data-views-data-classification#mark-properties-as-classified-data) to mark those event or user properties as classified so that only users with access can query and see results on them.
    
    <div style="position: relative; padding-bottom: 60.810810810810814%; height: 0;"><iframe src="[https://www.loom.com/embed/1182410226984fc58cdc7b26d7dcdd76?sid=d23949f6-36a8-43a7-9d58-2d834c0edc75](https://www.loom.com/embed/1182410226984fc58cdc7b26d7dcdd76?sid=d23949f6-36a8-43a7-9d58-2d834c0edc75)" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
    
- You want to share your Mixpanel metrics perhaps with users outside your organization, who only access to consume reports but not need to be query underlying data - e.g. exec stakeholders who want to see summery metrics, or external vendors that need specific reports. For this, you could turn on and provide [public boards](https://docs.mixpanel.com/docs/analysis/boards#public-boards).

### Adding End Users to Your Mixpanel Organization and Projects

Each Mixpanel customer is assigned an [Organization](notion://www.notion.so/docs/admin/organizations-projects/manage-organization) which serves as the controlling entity for managing all your Mixpanel analytics needs. Within this, organization owners and admins will have access to [monitor your pricing and billing plan and usage to date](notion://www.notion.so/docs/admin/organizations-projects#billing-and-plans). They will also be able to [invite end users to the organization](notion://www.notion.so/docs/admin/organizations-projects/manage-team-members#invite-users), a step they need to take before end users can be added to a project.

There are two general approaches to user management in Mixpanel. 

- Organization owners and admins can create [teams](https://docs.mixpanel.com/docs/admin/organizations-projects/manage-team-members#teams) at the organization level and then add teams to the different projects. Typically, larger enterprise customers prefer to use this, along with [Single Sign-On](https://docs.mixpanel.com/docs/admin/sso), for better management of users.
- Organization owners and admins can also add individual users to specific projects.

[https://github.com/mixpanel/docs/assets/50901466/9b42d818-cc77-4f02-9025-90456a557c6a](https://github.com/mixpanel/docs/assets/50901466/9b42d818-cc77-4f02-9025-90456a557c6a)

**Using Mixpanel Teams to Add End Users to Projects**

[https://github.com/mixpanel/docs/assets/50901466/de43d48b-4fef-4292-b835-f1d5682345b1](https://github.com/mixpanel/docs/assets/50901466/de43d48b-4fef-4292-b835-f1d5682345b1)

**Adding Individual End Users to Projects**

Organization owners and admins can assign projects or teams directly to user accounts at the organization level by minimally provisioning them with an organization membership.

[https://github.com/mixpanel/docs/assets/50901466/8ec08b83-d0e2-47b3-92a4-5f5e98d70b52](https://github.com/mixpanel/docs/assets/50901466/8ec08b83-d0e2-47b3-92a4-5f5e98d70b52)

Once [project owners and admins](https://docs.mixpanel.com/docs/admin/organizations-projects/manage-team-members#setting-a-default-role-on-a-project:~:text=as%20a%20Member.-,Project%20Roles,-A%20Project%20has) are assigned, they can then add end users to projects and provision their roles. 

[https://github.com/mixpanel/docs/assets/50901466/61a9099b-f07e-4bcf-9110-bf5418e7000b](https://github.com/mixpanel/docs/assets/50901466/61a9099b-f07e-4bcf-9110-bf5418e7000b)

### Project Data Configurations

- [Data Governance: Event Approval](https://docs.mixpanel.com/docs/admin/data-governance/event-approval)
- [Group Analytics](https://docs.mixpanel.com/docs/analysis/advanced/group-analytics)
- [Session Settings](https://docs.mixpanel.com/docs/analysis/advanced/sessions)
- [Identity Merge](https://docs.mixpanel.com/docs/tracking/how-tos/identifying-users)
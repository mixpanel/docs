# Data Views & Classification: Filter team access to your data within a project

## Data Views Overview

Data Views allow you to manage data access for a group of users within a single Mixpanel project. [Project Owners and Admins](/docs/orgs-and-projects/roles-and-permissions#permissions) can create and edit Data Views and determine access for privacy and productivity purposes. You must have an active **Enterprise** plan with Mixpanel to access this feature.

### Use Cases

**Teams or Functional Areas**

You have a Mixpanel project that contains all of your data. Engineering, Marketing, Support, and various product teams all use Mixpanel on a regular basis. Each team can have a Data View filtering for relevant data.

**Separate Customer Data from Internal User Data**

Create a Data View for customer data by excluding data tracked by your internal users/employees. Create another Data View for just your internal users. By doing this, you no longer have to remember to add cohorts or filters each time you create a Board, Report, or Cohort.

**Regions or Geo-Based Teams**

For a global organization with multiple offices, regional teams might need access to data from only their region. E.g. The marketing team in the Asia region would like to target only Asian customers and should not have access to US customers' data. 

**Verified Data Only**

Teams that want to closely manage events that are included in all their analysis can either include or exclude the specific events in the Data View definition. 

**Specific Platform/App Version**

Engineering or Product teams working on a specific version can use Data Views to target specific versions of the app or platform version(s) to be included in the analysis.

### Create Data View

To create a new Data View, navigate to **Project Settings** then click on **+ Create Data View** in the top right of the Data Views settings. Add a name and description to your Data View and click **Save**. The name of the Data View cannot be longer than 255 characters.

![Create Data View](/create-data-view.png)

Click on your new Data View to see an overview of Data View details, review or update filters, and manage access at the individual or team level.

### Manage Data View

Navigate to Project Settings, and select at the left-hand menu  Data Views.

![Project Settings](/manage-data-view.png)

![Manage Data View Project Settings](/manage-data-view-project-settings.png)

#### Default Data View
All projects have a global Data View called “All Project Data.” This Data View has no data filters and gives users access to all the data in a project. The global Data View in a project is equivalent to a Mixpanel project without Data Views.

The “All Project Data” Data View starts as the default Data View of a project for any new users added to the project. You can decide which Data View you want to set as default by checking the box next to the Workspace name and selecting **Set Default**.

![Manage Data View Project Settings](/set-default-data-view.png)

### Manage Visibility and Editing Controls

The **Overview** tab displays details about the Data View including the name, description, editing controls, visibility, creator name, date created, and URL to access the Data View. The Overview is accessible to all Admins and Owners in the project.

Select **Restricted** under Editing Controls to prevent other Admins from editing the Data View settings and filters. Select **Unrestricted** to allow Admins to edit the Data View settings and filters.

Select **Public** under Visibility to allow project members to discover your Data View in the Data View Library. All project members can also self join a Data View that is public. Select **Private** to prevent project members from seeing your Data View in the Library and self joining. Project members who are added to a private Data View will be able to see it.

After the Editing Controls and Visibility are set upon Data View creation, they can be changed by only the Data View creator or a Project Owner.

![Data Views Overview](/data-view-overview.png)

#### Manage Data View Filters

Filters determine what data is accessible within a Data View.

![Data Views Filters](/manage-data-view-filters.png)
You can apply multiple event, event property, and user profile property filters to a Data View.

#### Add Users or Teams

Click **+ Add User** to add individual project members to your Data View. The modal shows only users that are part of your project. 

You can remove users from your Data View by selecting the box next to their name and clicking Remove to the left above the user list.

Click on the **Teams** tab to add or remove teams from a Data View. Add a team to a Data View to indicate that any project member in the team should have access to a Data View.

If you set up your Identity Provider to connect to Mixpanel with Single Sign-On, you can define which project members are assigned to which teams. If you set up certain teams with access to specific projects and Data Views, you can streamline your member onboarding to a Mixpanel project. This helps control who has access to what data at scale.

### Data View Library

Click on the name of your project in the upper-right corner, and then on "Data View Library". The Data View Library allows you to see the Data Views you have joined, to create new Data Views, and to join other public Data Views. Private Data Views that you have not been invited to will not show up here.

![Data View Library Nav](/data-view-library.png)

![Data View Library](/data-view-library2.png)

### Experience Data Views as a User

You can see the name of the Data View that you are currently in on the upper-left corner next to the project name. A message banner will also notify you when you enter a Data View if the Data View has a filter.

### Saved Content in Data Views

The saved content you create in Mixpanel is not contained to the Data View in which it was created. For example, you can view a Report you made in one Data View in any of the other Data Views you have access to. The results of a report or Board will change depending on the Data View you have selected.

### Data Views Limits

The following are limitations to be aware of when using Data Views:

- JQL features are only available in ‘All Project Data’ Data View.
- Any Mixpanel APIs that use Project Token or Secret (e.g. Export API), work at a project level and are not the Data View level. That said, any APIs that use OAuth (e.g. Query API) work at the Data View level.
- Lexicon shows events and properties filtered based upon the Data View you have selected. However if you edit an event or property in Lexicon in one Data View, the changes will persist across the project. All Data Views will be impacted.
- Applying any User Profile Property filter will remove the ability to analyze by all Group Identifiers except User

## Data Classification

**Mark Properties as Classified Data** 

Marking properties as classified limits which users can view them. Navigate to the event properties and user profile properties tabs in Lexicon to mark a property as classified. 

>You must have an active **Enterprise** plan with Mixpanel to access this feature.

When you mark a property as classified, users or teams with the checked Can View checkbox checked can see the classified property in reports. You can see the Can View checkbox in Project Settings for individual users and in Organization Settings for teams. Only Project Owners and Admins can mark a property as classified.

Select a property or group of properties and click **Mark Classified**.

![Mark Classified](/mark-classified.png)

A pop-up will confirm that you want to mark the selected property or properties as classified.

![Mark Classified Warning](/mark-classified-warning.png)

When you mark a property as classified, the Status column will indicate that the property is classified alongside its visibility state (visible or hidden). If the Status column shows only the visibility state, then the property is not marked as classified.

**Manage Classified Data Viewing Permissions for Individual Users**

Go to your Project Settings, and then to the tab "Project Users" in order to manage which users can access the events and properties marked as classified.

In the **Current Users** table, the Classified Data column indicates which users have permission to view classified data. Click the Can View check box in a user’s row to update their classified data viewing permission.

![Mark Classified Viewing Perms](/manage-classified-data-viewing-perms.png)

Click on **All Data Permissions** to filter the current users table to display only users that can view classified data or only users that cannot view classified data.

![All Data Permissions](/all-data-permissions.png)
### Manage Classified Data Viewing Permissions for Teams

Navigate to Organization Settings from the gear icon at the top-right corner of the navigation bar. Go to the Users & Teams tab and click on the team for which you wish to manage permissions. You can manage the team’s access to Classified Data for each of the projects to which they have access.

![Manage Classified Data Viewing for Teams](/manage-classified-data-viewing-teams.png)
### Analysis Experience for Users that Cannot View Properties Marked as Classified Data

Users that cannot view properties marked as Classified Data can see which specific properties are marked as classified in Lexicon. Users that cannot view properties marked as Classified Data cannot use such properties as filters or breakdowns.

**Boards**

If a report contains any event or property marked as classified when a user without the "Can View" option tries to open it, will see the next warning
![Sensitive Data Warning](/sensitive-data.png)
Users that cannot view classified data can click on a Board card to access the full report and determine what properties are preventing them from viewing a report.

**Analysis Reports (Insights, Funnels, Flows, and Retention)**

Classified properties won't be visibly different when building a report, but if used by a user without the "Can View" option enabled, the next warning will be displayed:

![Analysis Reports Warning](/analysis-reports.png)

---
title: "Data Views & Data Classification"
slug: "data-views-data-classification"
hidden: false
metadata:
  title: "Data Views & Data Classification"
  description: "Manage data access in your project."
---

# Data Views Overview

Data Views allow you to manage data access for a group of users within a single Mixpanel project. Project Owners and Admins can create and edit Data Views and determine access for privacy and productivity purposes. You must have an active **Enterprise** plan with Mixpanel to access this feature.

# Data Views Use Cases

### Teams or Functional Areas

You have a Mixpanel project that contains all of your data. Engineering, Marketing, Support, and various product teams all use Mixpanel on a regular basis. Each team can have a Data View filtering for relevant data.

Example:

The Community team at Mixpanel uses Data Views. Rather than trudging through thousands of events in the "All Project Data" Data View, we made our own Data View called "QBQ | The Mixpanel Community". In our case, we have 10 events in the global "All Project Data" Data View that pertain to user events in the community. On top of it, there are 5 company-wide engagement indicating events that we try to impact. We added the 15 events to our Data View. It’s made it much easier to go into Mixpanel and access the data we care about.

### Separate Customer Data from Internal User Data

Create a Data View for customer data by excluding data tracked by your internal users/employees. Create another Data View for just your internal users. By doing this, you no longer have to remember to add cohorts or filters each time you create a Board, Report, or Cohort.

Example:

You can create a “Customer” Data View by excluding your internal email addresses with the user property filter. Alternatively, you can also create an “Employees” Data View by including only internal email addresses with the user property filter (e.g. "Email" event and user property contain “@mixpanel.com”).

### Regions or Geo-Based Teams

For a global organization with multiple offices, regional teams might need access to data from only their region. E.g. The marketing team in the Asia region would like to target only Asian customers and should not have access to US customers' data. 

Example:

For each region, you can create a Data View specific to that region. E.g. EMEA, APAC, America or US, UK, FR, etc. After you have created the Data Views, you can configure data for the regional team that was previously filtered by using an event/user property such as ‘Region’ to include or exclude data.

### Verified Data Only

Teams that want to closely manage events that are included in all their analysis can either include or exclude the specific events in the Data View definition. 

Example:

You can either include or exclude specific events by name (e.g. Include events "Doc.Signed", "Doc.Sent", "Log.In", etc.).

### Specific Platform/App Version

Engineering or Product teams working on a specific version can use Data Views to target specific versions of the app or platform version(s) to be included in the analysis.

Example:

Create a Data View that filters based on an event property including only specific versions as part of the analysis (e.g. "App Version" event property equals "2.0.1" or "3.1.0").


## Manage Data View

Navigate to PROJECT SETTINGS, and select at the left-hand menu  Data Views.

All projects have a global Data View called “All Project Data.” This Data View has no data filters and gives users access to all the data in a project. The global Data View in a project is equivalent to a Mixpanel project without Data Views.

The “All Project Data” Data View starts as the default Data View of a project for any new users added to the project. You can decide which Data View you want to set as default by checking the box next to the Workspace name and selecting Set Default.

## Create Data View

To create a new Data View click on + Create Data View in the top right of the Data Views settings. Add a name and description to your Data View and click Save.

Click on your new Data View to see an overview of Data View details, review or update filters, and manage access at the individual or team level.

## Data View Overview

The OVERVIEW tab displays details about the Data View including the name, description, editing controls, visibility, creator name, date created, and URL to access the Data View. The Overview is accessible to all Admins and Owners in the project.

The name of the Data View cannot be longer than 255 characters.

Select Restricted under Editing Controls to prevent other Admins from editing the Data View settings and filters. Select Unrestricted to allow Admins to edit the Data View settings and filters.

Select Public under Visibility to allow project members to discover your Data View in the Data View Library. All project members can also self join a Data View that is public. Select Private to prevent project members from seeing your Data View in the Library and self joining. Project members who are added to a private Data View will be able to see it.

After the Editing Controls and Visibility are set upon Data View creation, they can be changed by only the Data View creator or a Project Owner.

## Manage Data View Filters

Filters determine what data is accessible within a Data View.

You can apply multiple event, event property, and user profile property filters to a Data View.

## Manage Data View for Users

Click + Add User to add individual project members to your Data View. The modal shows only users that are part of your project. 

You can remove users from your Data View by selecting the box next to their name and clicking Remove to the left above the user list.

## Teams

Click on the TEAMS tab to add or remove teams from a Data View. Add a team to a Data View to indicate that any project member in the team should have access to a Data View.

If you set up your Identity Provider to connect to Mixpanel with Single Sign-On, you can define which project members are assigned to which teams. If you set up certain teams with access to specific projects and Data Views, you can streamline your member onboarding to a Mixpanel project. This helps control who has access to what data at scale.

## Data View Library

Click on the name of your project in the upper-right corner, and then on "Data View Library". The Data View Library allows you to see the Data Views you have joined, to create new Data Views, and to join other public Data Views. Private Data Views that you have not been invited to will not show up here.

## Experience Data Views as a User

You can see the name of the Data View that you are currently in on the upper-left corner next to the project name. A message banner will also notify you when you enter a Data View if the Data View has a filter.

## Saved Content in Data Views

The saved content you create in Mixpanel is not contained to the Data View in which it was created. For example, you can view a Report you made in one Data View in any of the other Data Views you have access to. The results of a report or Board will change depending on the Data View you have selected.

## Data Views Limits/Caveats

The following are limitations to be aware of when using Data Views:

- JQL features are only available in ‘All Project Data’ Data View.
- Any Mixpanel APIs that use Project Token or Secret (e.g. Export API), work at a project level and are not the Data View level. That said, any APIs that use OAuth (e.g. Query API) work at the Data View level.
- Lexicon shows events and properties filtered based upon the Data View you have selected. However if you edit an event or property in Lexicon in one Data View, the changes will persist across the project. All Data Views will be impacted.
- Applying any User Profile Property filter will remove the ability to analyze by all Group Identifiers except User

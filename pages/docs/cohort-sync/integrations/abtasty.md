# AB Tasty


## Overview

The Mixpanel and AB Tasty integration provides a bidirectional data sync, allowing you to export Mixpanel cohorts to AB Tasty for precise experiment targeting and import AB Tasty experiment data into Mixpanel for comprehensive behavior analysis. This seamless exchange enhances your ability to analyze, segment, and personalize user experiences.

## Permissions

To set up this integration, the following permissions are required:

### Mixpanel Permissions:

- Service Account Access: You will need a Mixpanel Service Account with permissions to read and manage cohorts.
- Project Token: Ensure you have access to the Mixpanel Project Token for the relevant project.

### AB Tasty Permissions:

Admin Access: You need admin-level permissions in AB Tasty to configure and enable integrations.

## Enable the Integration

### Mixpanel Setup

1. Access Integration under the Data Management tab in the top navigation bar.
2. In the Integrations list, select AB Tasty, and click Connect.
3. To set up the AB Tasty integration, you need to enter your account’s API Key. Copy and paste the API Key of your AB Tasty account. Click Continue.



### In AB Tasty

1. Access Integrations > Integration Hub.
2. Search for and select Mixpanel.
3. Click Setup connector.
4. Give a name to your connector so you can easily retrieve it.
5. Click Save and create connector.

## Export Cohorts from Mixpanel to AB Tasty

To export the cohorts to AB Tasty, follow the steps below:

1. Click Cohorts under Users in the navigation bar.
2. Select the cohort that you want to export. Click the three-dot icon on the right side of the cohort.
3. Click Export to > AB Tasty. Select either one-time sync or dynamic sync. Click Start Sync.

AB Tasty Documentation on cohorts exports from Mixpanel is [here](https://support.abtasty.com/hc/en-us/articles/7305491216924-Mixpanel)

- Mixpanel sends the cohorts every 15 minutes in case of recurring exports
- AB tasty pushes the abtasty_visitor_id to Mixpanel, and Mixpanel includes it in the cohort export. The abtasty_visitor_id is used to match the user.
- For the cohorts to be used in AB Tasty’s segment builder (once exported from Mixpanel), we need to match at least one user i.e. empty cohorts will not be displayed in the segment builder.


## AB Tasty Events in Mixpanel
This integration relies on using the Mixpanel SDK. Assuming the integration has been set up, you'll see events that contain an **AB Tasty** property on events that fire from pages where an AB Tasty campaign is running. This property’s value contains the AB Tasty campaign and variation’s ID.

Once you have data flowing from AB Tasty to Mixpanel, you can filter your Mixpanel reports on AB Tasty campaigns and variations by using the **AB Tasty** event property breakdown.



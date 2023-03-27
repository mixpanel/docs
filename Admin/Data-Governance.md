---
title: "Data Governance"
slug: "data-governance"
hidden: false
createdAt: "2023-03-27T17:39:02.165Z"
updatedAt: "2023-03-27T17:39:02.165Z"
metadata:
  title: "Data Governance"
  description: "Lexicon, Data Views, Data Classification"
---

# Overview

Lexicon is a data dictionary that stores descriptions of events and their properties. Project owners and admins can add and manage descriptions for all events and properties, and organize data for clarity and discoverability.

To open Lexicon, select the Data Management icon on the right side of the top navigation menu and then select Lexicon.

When you open Lexicon, you see four views:

1. Events
2. Custom Events
3. Event Properties
4. Profile Properties

## Events

Events are actions a user performs in your application or website.

This table contains descriptions for each field in the “Events” view. 

| Field | Description |
| --- | --- |
| Name | The database name of the event. |
| Display Name | The event name that displays in the Mixpanel interface. |
| Description | The information that describes the event, such as what triggers it or what properties are sent with it. |
| Status | The event is either hidden or visible in the Mixpanel project. |
| Volume | The total number of events that users fired in the last 30 days. |
| Queries | The total number of API and UI queries that project members executed in the last 30 days. |

## Custom Events

Custom events are events and properties you combine into one event to use in Mixpanel reports. The fields for custom events are “Name”, “Display Name”, “Description”, and “Queries” (defined above).

## Event Properties

Event properties describe details about events, such as distinct_id or browser. This table contains descriptions for each field in the “Event Properties” view. 

Lexicon contains property definitions for the default properties that Mixpanel’s client-side libraries automatically send with each event across web and mobile platforms.

| Field | Description |
| --- | --- |
| Name | The database name of the property. |
| Display Name | The property name that displays in the Mixpanel interface. |
| Description | The information that describes the property, such as what events it is sent with. |
| Status | Indicates whether the property is visible or hidden from the Mixpanel interface. Also indicates if the property is dropped, merged, or marked as sensitive. |
| Events With Property | The total number of events that contain this property in the last 30 days. |
| Queries | The total number of API and UI queries that project members executed in the last 30 days. |

## Profile Properties

Profile properties describe details about your users, such as username or email address. This table contains descriptions for each field in the “Profile Properties” view.

| Field | Description |
| --- | --- |
| Name | The database name of the property. |
| Display Name | The property name that displays in the Mixpanel interface. |
| Description | The information that describes the property, such as when it is added or updated in a user profile. |
| Status | Indicates whether the property is visible or hidden from the Mixpanel interface. Also indicates if the property is dropped, merged, or marked as sensitive. |
| Users With Property | The total number of profiles that contain this property. |
| Queries | The total number of API and UI queries that project members executed in the last 30 days. |

If you have Group Analytics enabled, you will see a dropdown on the Profile Properties tab that will let you select any Group Types that you may have configured. The default selection will be "User Profiles" which correspond to User properties.

## Export and Import Lexicon Data

Mixpanel supports exporting and importing Lexicon data dictionaries. Project owners, admins, analysts, and consumers can click Export in Lexicon to receive a CSV file via email that contains the events and properties, and/or user profile properties data from a project.

In the Export panel, you can select:

- Events & Properties and/or
- User Profile Properties

The requester will receive an email with a link to download a single CSV file. This link remains active for 14 days. Each CSV file can contain up to 5,000 events, and 2,000 properties per event. Each CSV file can contain up to 2,000 user profile properties.

The exported CSV file will contain the following columns:

- Event
- Entity Name
- Event Display Name
- Event Description
- Event Volume (30 Days)
- Event Query Volume (30 Days)
- Event Tags 
- Event Hidden
- Event Dropped
- Property Name
- Property Display Name
- Property Description
- Property Volume (30 Days)
- Property Query Volume (30 Days)
- Property Type
- Property Example Values
- Property Hidden
- Property Dropped
- Property Required
- Property Sensitive

## Import Lexicon Data

Mixpanel supports multiple integrations (Avo.app, mParticle Data Plans, Segment Protocols) and methods (CSV import, Lexicon Schemas API) to import data dictionaries into Lexicon. Project Owner and Admin roles are required to import into Lexicon.

Event and property descriptions and metadata (hidden, dropped, sensitive, etc) that are already in Lexicon will be overwritten by descriptions and metadata for matching event and property names. By default, any event and property descriptions for events that are not imported will remain unchanged unless you check the option to overwrite your entire data dictionary during import.

### Avo.app

In order to import your data dictionary from Avo.app, you will need to enable an integration with Mixpanel. The following information would be necessary in order to complete this integration from Avo.app:

Mixpanel Project ID `(https://mixpanel.com/report/<Mixpanel Project ID>/...)`
[Mixpanel Service Account Username & Secret](https://developer.mixpanel.com/reference/authentication#service-accounts) (Owner or Admin role required)
To publish your Avo data dictionary to Lexicon, click the "Publish to Lexicon" button in the integration interface.

[Click here](https://www.avo.app/docs/workspace/integrations) for more information on integrating Avo.app with Lexicon.

### mParticle

When importing a data dictionary from [mParticle](https://www.mparticle.com/), navigate to your Data Plan and select Download Plan Version from the upper right menu.

1. Click Import on the top right hand side of Lexicon
2. Select mParticle
3. Select the downloaded JSON file from mParticle Data Plans
4. Review Events, Event Properties, and User Profile Properties to be imported.
5. Import data into Lexicon

### Segment

When importing a data dictionary from Segment Protocols using the Segment Config API, you will be asked for your Segment Token and Segment Workspace. You can find your Segment Token by going to your Segment dashboard: Settings > Access Management > Tokens

You can use an existing Token, or creating a new token with a Token Role of Workspace Owner.

For the Segment Workplace value, we recommend using the Slug name located in the Segment dashboard: Settings > General Settings.

Once you have your Segment Token & Workspace, head over to Lexicon and Select Import from Segment.

- Enter your Token & Workspace
- Select the Plan you want to import from Segment
- Review the Events and Profile Properties that will be imported
- Import your Segment Plan into Lexicon

### CSV Import

Project owners and admins can export a CSV of their Lexicon changes, make changes, and import that CSV back into Lexicon.

When you export your Lexicon Data into a CSV file, you can make modifications, add events and/or properties, and import them into Lexicon.

To import CSV files, they must be in the exported CSV format, otherwise the file will be rejected: 

Once you've made your modifications, you can directly import the CSV file into Lexicon:

- Select your CSV file
- Review Events, Event Properties, and/or User Profile Properties
- Import into Lexicon

## Replacing Lexicon Entries

For mParticle, Segment, and CSV imports into Lexicon, you'll have an option to Replace Lexicon Entries.

If this option is enabled, all of your existing Lexicon entries would be removed and replaced by the uploaded entries. This feature is useful if you want Lexicon to contain only these new entries.

## Lexicon Schemas API

Mixpanel provides a suite of API endpoints for you to Retrieve, Create, and Delete your data dictionary in Lexicon. To use these APIs, check out our [API reference docs](https://developer.mixpanel.com/reference/lexicon-schemas-api).



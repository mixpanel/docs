---
title: "Lexicon"
slug: "lexicon"
hidden: false
createdAt: "2023-03-27T17:39:02.165Z"
updatedAt: "2023-03-27T17:39:02.165Z"
metadata:
  title: "Lexicon"
  description: "Learn how to use Lexicon"
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

## Filtering Events, Custom Events, and Properties

Lexicon provides several options for you to filter your events, custom events, event properties, and profile properties.

You can filter by visible or hidden events, dropped events, merged events, tags, your defined events, autotracked events, and default Mixpanel events. These filtering options help you arrive at the most useful data to analyze your performance.

## Viewing Query Volumes for Events and Properties

In each view, you can see the total UI and API queries in the last 30 days for any of these data types and sort by it. 

This data lets you easily discover the parts of your implementation that are most valuable and the parts that are not being used. You can use this information to determine which events and properties you should drop.

## Adding Tags to Events

Mixpanel provides tags to help you organize and find your data. If you’re new to the project, it could be time-consuming to search hundreds of events to find them. Using Lexicon, you can assign a tag to events that relate to a specific category.

For example, we’ll use a purchases tag for all events and properties that relate to purchasing, such as In-App Purchase or Booster Pack Purchased. The purchases tag makes the search much easier, because the purchase related events are listed under the purchase tag.

In addition to the previous example, tags are useful to identify specific events of interest for certain teams, distinguish events that are relevant to a specific product or service, or indicate events that are associated with certain key performance indicators.

A tag is a label you assign to an event to help you organize and find it. Tags enable you to categorize events and make them easier to find–especially in large Mixpanel implementations with multiple teams.

Event and property definitions that are clear, accurate, and findable reduce the learning curve and help teams get up to speed faster. This feature is particularly useful when a new member joins the team.

Before new members join your project, you can review your event and property definitions for accuracy and add tags to better organize them.

You can add tags to one or more events in the “Events” or “Custom Events” view.

To add tags to an event:

1. In the “Events” or “Custom Events” view, select one or more events. The “Tag” icon appears.
2. Click Tag to display the “Tag Selector” box.
3. Add or change tags to one or more events:
- To add tags, enter the name of one or more tags in the “Tag Selector” box and click Save. As you add tags, they appear in a searchable list in the “Tag Selector” box.
- To change tags assigned to an event, select one or more tags in the “Tag Selector” box, add or remove tags, and then click Save.

Tags will show up as filtering options in the event dropdown menu. When you select a tag, a list of events that share the same tag appears.

## Dropping Events and Properties

In Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any new data for the event or property you select to drop. **Warning: You cannot recover event data after you drop it.**

When an event is dropped, all events of that type that have previously been ingested (before dropping it) will still show in the interface. Only project owners can drop events and properties. 

### Dropping Events

To drop an event in Lexicon:

1. Select an event to drop. The Drop icon appears.
2. Click Drop. A “Confirm dropping your event(s)” warning indicates you cannot recover the data associated with the event.
3. Click Drop. The status of the event indicates Dropped.

### Dropping Properties

To drop a property in Lexicon:

1. Select a property to drop. The Drop icon appears.
2. Click Drop. A warning indicates that you cannot recover the data that you choose to drop. Click Drop to confirm. The status of the property will indicate Dropped.

### Undropping Events

You can undrop events and properties when you decide you need them again.

To undrop an event:

1. Select a dropped event. The “Status” column indicates if an event is dropped.
2. Click Undrop. The “Status” column no longer contains “Dropped”.

### Use Cases

Here are some standard use cases for dropping events and properties.

Sensitive data

If you accidentally send sensitive data, such as passwords or credit card information, you can drop the event or property with that data and prevent it from being stored in Mixpanel servers.

Cost and Time Efficiency

Being able to drop events and properties that are no longer useful directly from Lexicon is easier and more efficient than having to implement changes to your code base.

If your app is mobile, it's easier to drop events and properties in Lexicon to submitting your app again and waiting for users to update to the new version.

Better Organization

Events and properties that are no longer useful can cause a cluttered Mixpanel project. Dropping unnecessary events and properties optimizes your code for a clean and streamlined project implementation.

Note: It takes a few hours for Mixpanel to process the dropped event.

## Hide Events and Properties

To hide an event or property:

1. Select one or more visible events, event properties, or profile properties. The “Hide” icon appears. You can check the “Status” field to determine whether an event or property is visible or hidden.
2. Select Hide. A message appears to allow you to confirm hiding the event(s). After you select Hide, the event or property status changes to “Hidden”.

## Show Events and Properties

To show an event or property:

1. Select one or more hidden events, event properties, or profile properties. The “Unhide” icon appears. You can check the “Status” field to determine whether an event or property is visible or hidden.
2. Select Unhide. After you select Unhide, the event or property status changes to “Visible”.

## Merging Events and Event Properties

In Lexicon, project owners can merge events and event properties.

Let's suppose your iOS app sends an event named “Purchase”, and your Android app sends an event named “purchase item”. Even though both events have the same function, you have to individually select them every time you build a report.

By merging “Purchase” and “purchase item” into a single event named “Purchase”, you would no longer need to query each event separately since Mixpanel would recognize both “Purchase” and “purchase item” as a unique event.

Being able to merge events can help streamline your implementation, reduce your costs by eliminating redundant events being sent to Mixpanel, and simplify report analysis because you’re only using optimal events and properties.
Do note however that user profile properties cannot be merged at this time.

### Merging Events

To merge events:

1. Select the events to merge. The “Merge” icon appears.
2. Click Merge. The “Merge Events” window appears. It shows the events you selected and explains that merging the selected events combines them into a single event, which does not affect the raw data.
3. In the “MERGE SELECTED EVENTS INTO…” section, specify which event Mixpanel should consider as the new unique event.
4. Click Merge. The merged event appears and the “Status” column indicates “Merged”.

### Unmerging Events
 
To unmerge events:

1. Select the merged event to unmerge. The “Unmerge” icon appears.
2. Click Unmerge. The merged event appears as the original two distinct events.

### Merging Properties

To merge properties:

1. Select the properties to merge. The “Merge” icon appears.
2. Click Merge. The “Merge Properties” window appears. It shows the properties you selected and explains that merging the selected properties combines them into a single property, which does not affect the raw data.
3. In the “MERGE SELECTED PROPERTIES INTO…” section, specify which property Mixpanel should recognize as the newly merged property name.
4. Click Merge. The merged property appears and the “Status” column indicates “Merged”.

### Unmerging Properties

To unmerge properties:

1. Select the merged property to unmerge. The “Unmerge” icon appears.
2. Click Unmerge. The merged property appears as the original two distinct properties.

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



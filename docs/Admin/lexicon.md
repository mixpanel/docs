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

Lexicon is a data dictionary that stores descriptions of events and their properties. Project owners and admins can add and manage descriptions for all events and properties, and organize data for clarity and discoverability. Event and property definitions help your entire team understand what your data means, so everyone stays on the same page.

To open Lexicon, select the Data Management icon on the right side of the top navigation menu and then select Lexicon.

When you open Lexicon, you see four views:

1. Events
2. Custom Events
3. Event Properties
4. Profile Properties

## Event Definitions

Events are actions a user performs in your application or website.

![Lexicon Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-events.png)

This table contains descriptions for each field in the “Events” view. 

| Field | Description |
| --- | --- |
| Name | The database name of the event. |
| Display Name | The event name that displays in the Mixpanel interface. |
| Description | The information that describes the event, such as what triggers it or what properties are sent with it. |
| Status | The event is either hidden or visible in the Mixpanel project. |
| Volume | The total number of events that users fired in the last 30 days. |
| Queries | The total number of API and UI queries that project members executed in the last 30 days. |

## Custom Event Definitions

Custom events are events and properties you combine into one event to use in Mixpanel reports. The fields for custom events are “Name”, “Display Name”, “Description”, and “Queries” (defined above).

![Lexicon Custom Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-custom-events.png)

## Event Property Definitions

Event properties describe details about events, such as distinct_id or browser.

![Lexicon Event Properties](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-event-properties.png)

This table contains descriptions for each field in the “Event Properties” view. 

| Field | Description |
| --- | --- |
| Name | The database name of the property. |
| Display Name | The property name that displays in the Mixpanel interface. |
| Description | The information that describes the property, such as what events it is sent with. |
| Status | Indicates whether the property is visible or hidden from the Mixpanel interface. Also indicates if the property is dropped, merged, or marked as sensitive. |
| Events With Property | The total number of events that contain this property in the last 30 days. |
| Queries | The total number of API and UI queries that project members executed in the last 30 days. |

Lexicon contains property definitions for the default properties that Mixpanel’s client-side libraries automatically send with each event across web and mobile platforms.

![Lexicon Event Properties](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-default-properties.png)

## Profile Property Definitions

Profile properties describe details about your users, such as username or email address. 

![Lexicon Profile Properties](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-profile-properties.png)

This table contains descriptions for each field in the “Profile Properties” view.

| Field | Description |
| --- | --- |
| Name | The database name of the property. |
| Display Name | The property name that displays in the Mixpanel interface. |
| Description | The information that describes the property, such as when it is added or updated in a user profile. |
| Status | Indicates whether the property is visible or hidden from the Mixpanel interface. Also indicates if the property is dropped, merged, or marked as sensitive. |
| Users With Property | The total number of profiles that contain this property. |
| Queries | The total number of API and UI queries that project members executed in the last 30 days. |

If you have Group Analytics enabled, you will see a dropdown on the Profile Properties tab that will let you select any Group Types that you may have configured. The default selection will be "User Profiles" which correspond to User properties.

![Lexicon Profile Properties](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-group-analytics-GIF.gif)

# Filtering Events, Custom Events, and Properties

Lexicon provides several options for you to filter your events, custom events, event properties, and profile properties.

You can filter by visible or hidden events, dropped events, merged events, tags, your defined events, autotracked events, and default Mixpanel events. These filtering options help you arrive at the most useful data to analyze your performance.

![Lexicon Filtering](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-filtering.gif)

# Viewing Query Volumes for Events and Properties

In each view, you can see the total UI and API queries in the last 30 days for any of these data types and sort by it. 

This data lets you easily discover the parts of your implementation that are most valuable and the parts that are not being used. You can use this information to determine which events and properties you should drop.

![Lexicon Query Volumes](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-query-volumes.png)

# Dropping and Hiding Data

In Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any **new data** for the event or property you select to drop. **Warning: You cannot recover event data after you drop it.**

When an event is dropped, all events of that type that have previously been ingested (before dropping it) will still show in the interface. Only project owners can drop events and properties. Note: It takes a few hours for Mixpanel to process the dropped event.

Sample use cases for dropping events and properties are:

**Sensitive data:** If you accidentally send sensitive data, such as passwords or credit card information, you can drop the event or property with that data and prevent it from being stored in Mixpanel servers.

**Cost and Time Efficiency:** Being able to drop events and properties that are no longer useful directly from Lexicon is easier and more efficient than having to implement changes to your code base.

**Better Organization:** Events and properties that are no longer useful can cause a cluttered Mixpanel project. Dropping unnecessary events and properties optimizes your code for a clean and streamlined project implementation.

## Dropping Events

By dropping an event, you can intercept and drop incoming events. Mixpanel won’t store any new data for the event you select to drop. 

To drop an event in Lexicon:

1. Select an event to drop. The Drop icon appears.
![Lexicon Drop Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-drop-events.png)
2. Click Drop. A “Confirm dropping your event(s)” warning indicates you cannot recover the data associated with the event.
![Lexicon Drop Events Warning](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-drop-events-warning.png)
3. Click Drop. The status of the event indicates Dropped.

## Dropping Properties

By dropping a property, you can intercept and drop incoming property. Mixpanel won’t store any new data for the property you select to drop. 

To drop a property in Lexicon:

1. Select a property to drop. The Drop icon appears.
![Lexicon Drop Properties](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-drop-properties.png)
2. Click Drop. A warning indicates that you cannot recover the data that you choose to drop. Click Drop to confirm. The status of the property will indicate Dropped.

## Undropping Events

You can undrop events and properties when you decide you need them again.

To undrop an event:

1. Select a dropped event. The “Status” column indicates if an event is dropped.
![Lexicon Undrop Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-undrop-events.png)
2. Click Undrop. The “Status” column no longer contains “Dropped”.

## Undropping Properties

1. Select a dropped property. The “Status” column indicates if a property is dropped.
![Lexicon Undrop Properties](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-undrop-properties.png)
2. Click Undrop. The “Status” column no longer contains “Dropped”.

## Hide Events and Properties

To hide an event or property:

1. Select one or more visible events, event properties, or profile properties. The “Hide” icon appears. You can check the “Status” field to determine whether an event or property is visible or hidden.
![Lexicon Hide Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/hide-events.png)
2. Select Hide. A message appears to allow you to confirm hiding the event(s). After you select Hide, the event or property status changes to “Hidden”.
![Lexicon Hide Events Warning](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-hide-events2.png)

Another option for hiding an event, property, or property value is to let it inactivate until it is hidden in report dropdown menus. Mixpanel’s report dropdown menus hide events that have not been fired within the last 30 days. Event properties and property values that have not been sent to your project in 28 days be hidden from dropdown menus.

## Show Events and Properties

To show an event or property:

1. Select one or more hidden events, event properties, or profile properties. The “Unhide” icon appears. You can check the “Status” field to determine whether an event or property is visible or hidden.
2. Select Unhide. After you select Unhide, the event or property status changes to “Visible”.
![Lexicon Show Events and Properties](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/show-events-and-properties.png)

# Merging Events and Properties

In Lexicon, project owners can merge events and event properties.

Let's suppose your iOS app sends an event named “Purchase”, and your Android app sends an event named “purchase item”. Even though both events have the same function, you have to individually select them every time you build a report.

By merging “Purchase” and “purchase item” into a single event named “Purchase”, you would no longer need to query each event separately since Mixpanel would recognize both “Purchase” and “purchase item” as a unique event.

Being able to merge events can help streamline your implementation, reduce your costs by eliminating redundant events being sent to Mixpanel, and simplify report analysis because you’re only using optimal events and properties.
Do note however that user profile properties cannot be merged at this time.

## Merging Events

To merge events:

1. Select the events to merge. The “Merge” icon appears.
2. Click Merge. The “Merge Events” window appears. It shows the events you selected and explains that merging the selected events combines them into a single event, which does not affect the raw data.
![Lexicon Merge Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-merge-events.png)
3. In the “MERGE SELECTED EVENTS INTO…” section, specify which event Mixpanel should consider as the new unique event.
4. Click Merge. The merged event appears and the “Status” column indicates “Merged”.

## Unmerging Events
 
To unmerge events:

1. Select the merged event to unmerge. The “Unmerge” icon appears.
![Lexicon Unmerge Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/unmerge-events.png)
2. Click Unmerge. The merged event appears as the original two distinct events.

## Merging Properties

To merge properties:

1. Select the properties to merge. The “Merge” icon appears.
2. Click Merge. The “Merge Properties” window appears. It shows the properties you selected and explains that merging the selected properties combines them into a single property, which does not affect the raw data.
![Lexicon Merge Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/merge-properties.png)
3. In the “MERGE SELECTED PROPERTIES INTO…” section, specify which property Mixpanel should recognize as the newly merged property name.
4. Click Merge. The merged property appears and the “Status” column indicates “Merged”.

## Unmerging Properties

To unmerge properties:

1. Select the merged property to unmerge. The “Unmerge” icon appears.
![Lexicon Unmerge Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/unmerge-properties.png)
2. Click Unmerge. The merged property appears as the original two distinct properties.

# Export and Import Lexicon Data

Mixpanel supports exporting and importing Lexicon data dictionaries. Project owners, admins, analysts, and consumers can click Export in Lexicon to receive a CSV file via email that contains the events and properties, and/or user profile properties data from a project.

![Lexicon Export](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-export.gif)

In the Export panel, you can select:

- Events & Properties and/or
- User Profile Properties

The requester will receive an email with a link to download a single CSV file. This link remains active for 14 days. Each CSV file can contain up to 5,000 events, and 2,000 properties per event. Each CSV file can contain up to 2,000 user profile properties.

## CSV Import

Project owners and admins can export a CSV of their Lexicon changes, make changes, and import that CSV back into Lexicon.

When you export your Lexicon Data into a CSV file, you can make modifications, add events and/or properties, and import them into Lexicon.

To import CSV files, they must be in the exported CSV format, otherwise the file will be rejected: 

![Lexicon CSV Import Format](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Lexicon/lexicon-csv-import-format.png)

Once you've made your modifications, you can directly import the CSV file into Lexicon:

- Select your CSV file
- Review Events, Event Properties, and/or User Profile Properties
- Import into Lexicon

Event and property descriptions and metadata (hidden, dropped, sensitive, etc) that are already in Lexicon will be overwritten by descriptions and metadata for matching event and property names. By default, any event and property descriptions for events that are not imported will remain unchanged unless you check the option to overwrite your entire data dictionary during import.

# Lexicon Schemas API

Mixpanel provides a suite of API endpoints for you to Retrieve, Create, and Delete your data dictionary in Lexicon. To use these APIs, check out our [API reference docs](https://developer.mixpanel.com/reference/lexicon-schemas-api).


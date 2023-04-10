---
title: "Data Audit"
slug: "data-audit"
hidden: false
metadata:
  title: "Data Audit"
  description: "Data Audit is currently in open BETA and is subject to change."
---

# Data Audit Overview

Mixpanel Data Audit surfaces new event, property, and property type data that does not match your current Mixpanel implementation. This could be due to someone on your team making changes to your tracking without the appropriate approval, or due to errors in your implementation. Only Project Owners can enable Data Audit.

# Enable Data Audit

Select Data Audit under Data Management to access this feature. The first time you go to the Data Audit tab, you have the option to enable Data Audit.

![Enable Data Audit](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Data%20Audit/enable-data-audit.png)

Select Enable Data Audit, and the Enable Data Audit modal will appear.

![Enable Data Audit Modal](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Data%20Audit/enable-data-audit-settings.png)

When you click Enable, Mixpanel takes a snapshot of your data. The snapshot records the event names, property names, and property data types of the data in your project for the last 30 days. The snapshot time period is fixed, and you can see it below the Data Audit title in the Data Audit tab, where it says: "Comparing new data against the snapshot of data sent between..."

The snapshot will remain fixed until you disable and re-enable Data Audit. Mixpanel considers that snapshot your implementation.

Every time you go into Data Audit, Mixpanel compares newly received data with your implementation, and surfaces data that does not match.

![Unexpected Properties](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Data%20Audit/unexpected-properties.png)

# Decide How Mixpanel Handles Unexpected Data

When you first enable Data Audit in the Data Audit Settings, you can determine how Mixpanel handles unexpected data.

![Data Audit Settings](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Data%20Audit/data-audit-settings.png)

By default, Mixpanel accepts and shows unexpected events and properties in your reports. The data marked as unexpected is visible in Mixpanel until you set is as hidden. This behavior is identical to how Mixpanel handles new data when Data Audit is not enabled.

Alternatively, you can choose to hide unexpected events and properties from your reports until you mark them as expected.

# Types of Unexpected Data

There are three categories of unexpected data:

**Unexpected event:** An event whose name does not match the name of any of the events in your current implementation.
**Unexpected property:** An event property whose name does not match the name of any of the event properties in your current implementation.
**Unexpected property type:** A property where the data type does not match the expected data type for a property in your current implementation. Mixpanel defines the expected data type for a property when you enable Data Audit. A property’s data type is set as the type of data first seen for a property value in the snapshot of your data.

# Manage Unexpected Data

When data comes into your project that does not match your implementation, it shows up in the Data Audit table under UNEXPECTED EVENTS, UNEXPECTED PROPERTIES, or UNEXPECTED DATA TYPES.

Click Mark as Expected option to mark unexpected events and unexpected properties as expected. When you mark data as expected, Mixpanel stops surfacing that data in Data Audit.

Click View in Insights to access an Insights report filtered to show that specific event, or property.

Click View Event Details to view the event or event property in Lexicon. 

If you'd like to [Hide](https://developer.mixpanel.com/v3.19/docs/lexicon#hide-events-and-properties), [Drop](https://developer.mixpanel.com/v3.19/docs/lexicon#dropping-events) or otherwise edit unexpected events or properties that is possible within Lexicon (unexpected events will already be hidden if you selected that option when enabling Data Audit).

# Disable Data Audit

Click Disable Data Audit, then click Disable in the Disable data audit modal to stop Mixpanel from surfacing data that does not match your implementation.

![Disable Data Audit](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Data%20Governance/Data%20Audit/disable-data-audit.png)

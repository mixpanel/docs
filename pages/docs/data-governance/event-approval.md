# Event Approval: Review unexpected events before they are visible

## Overview

Event Approval is a Data Governance feature for organizations that want visibility and control over all new events being sent to their Mixpanel project. The feature is a project-level setting for Enterprise accounts that hides new events by default and notifies admins when those new events come in so they can then mark it as visible for everyone to see. 


### Enabling Event Approval

To enable Event Approval, navigate to the Project Settings page, scroll down to the Data Governance section under Overview and click the Event Approval toggle.

When enabling this setting, input email addresses or aliases to be notified when a new event is ingested. This will be gated to project admin and owner email addresses. Admins can also set up a Slack channel to be notified when a new event is ingested.

You can also enable new property detection, which will notify the same email addresses or slack channels about new properties that have been detected on new or existing events.

Notifications are sent once per day. If multiple events are implemented in a project within one day, the notification will batch all these events. 

Only Project Admins or Owners can enable this setting, and it's only available on Enterprise plans. 

![event-approval-settings](/event-approval-settings.png)


### Lexicon Workflow

When an admin receives a notification that new events have been ingested, they can click the "View New Events" button, which will take them to a Lexicon view of hidden events. New events will have a "New" tag and be sorted to the top of the list. 

From there, an admin can take any number of actions such as marking the event as visible, adding a description or a tag. 

Events will be marked as "New" as long as the following criteria are met:
- It hasn’t been modified
- It is hidden
- It was created within the last 30 days

![lexicon-event-approval](/Lexicon-Event-Approval.png)

If new property detection is enabled, notifications will also include a "View New Properties" button, which will take them to a Lexicon view of new properties.  Properties will be marked as "New" as long as the following criteria are met:
- It was created within the last 30 days

### Additional Notes
- Please note that all [custom properties](/docs/features/custom-properties) will **not** be marked as "New"
- Event Approval is not available for projects with > 3000 hidden events and will be auto-disable if projects exceed this limit

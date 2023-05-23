---
title: "Event Approval"
slug: "event-approval"
hidden: false
metadata:
  title: "Event Approval"
  description: "Event Approval Data Governance Setting"
---

## Overview

Event Approval is a Data Governance feature for organizations that wan't visibility and control over all new events being sent to their Mixpanel project. The feature is a project-level setting for Enterprise accounts that hides new events by default and notifies admins when those new events come in so they can then mark it as visible for everyone to see. 


### Enabling Event Approval

To enable Event Approval, navigate to the Project Settings page, scroll down to the Data Governance section under Overview and click the Event Approval toggle.

When enabling this setting, input email addresses or aliases to be notified when a new event is ingested. This will be gated to project admin and owner email addresses.

Admins can also set up a Slack channel to be notified when a new event is ingested. The notification will be sent at most once per day.

Only Project Admins or Owners can enable this setting, and it's only available on Enterprise plans. 

![data-governance](/Event-Approval.png)


### Lexicon Worfklow

When an admin receives a notification that new events have been ingested, they can click the "View New Events" button, which will take them to a Lexicon view of hidden events. New events will have a "New" tag and be sorted to the top of the list. 

From there, an admin can take any number of actions such as marking the event as visible, adding a description or a tag. 

Events will be marked as "New" as long as the following criteria are met:
- It hasn’t been modified
- It is hidden
- It was created within the last 30 days

![data-governance](/Lexicon-Event-Approval.png)


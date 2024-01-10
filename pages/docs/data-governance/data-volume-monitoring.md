# Data Volume Monitoring


## Overview

Data Volume Monitoring is a Data Governance feature for organizations that want to monitor for implementation issues with events being sent to their Mixpanel project. The feature is a project-level setting for Enterprise accounts that watches for sudden, drastic changes in event volume and notifies admins so they can take corrective action.


### Enabling Data Volume Monitoring

To enable Data Volume Monitoring, navigate to the Project Settings page, scroll down to the Data Governance section under Overview and click the Data Volume Monitoring toggle.

When enabling this setting, input email addresses or aliases to be notified when a new event is ingested. This will be gated to project admin and owner email addresses. Admins can also set up a Slack channel to be notified when a new event is ingested.

Notifications are sent once per day. If multiple spikes or drops are found for a project within one day, the notification will batch the notifications, so you will get at most 2 per day per project. 

Only Project Admins or Owners can enable this setting, and it's only available on Enterprise plans. 


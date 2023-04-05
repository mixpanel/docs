---
title: "Export or Delete End User Data"
slug: "export-or-delete-end-user-data"
hidden: false
---

Mixpanel supports account holders’ ability to request the deletion or export of end user data.

Requests can be submitted through either a form found in a Mixpanel project or through a personal data export and deletion API that is available here.

Only organization owners and admin can access or submit end user export or deletion requests. 

These tools can be used to exercise Right to Access, Right to Portability, and Right to be Forgotten for end users or “data subjects” as part of the General Data Protection Regulation (GDPR). [Learn more about GDPR here](https://mixpanel.com/legal/mixpanel-gdpr/). These tools also can help satisfy requirements stated in the California Consumer Privacy Act (CCPA). [Learn more about CCPA here](https://mixpanel.com/legal/mixpanel-ccpa/).

Requests to export or delete end user data can take multiple weeks to process. 

# Generate OAuth Token

In order to submit a request, you must first generate a GDPR OAuth token from your Personal Settings. This token is required for requests submitted both through the Mixpanel interface and through Mixpanel's APIs. To generate an OAuth Token for GDPR APIs:

1. In the Mixpanel header bar, click the icon with your initials.
2. Under  “PERSONAL SETTINGS”, click Profile & Preferences.
3. Click Data & Privacy in the left navigation bar.
4. In the "GDPR API" field, click Reset.
![image](https://user-images.githubusercontent.com/13734965/230127034-c54d135d-b477-4f24-9fb0-ab87ef4bd518.png)
The "Reset GDPR API token" message asks if you're sure you want to reset the value and invalidate any application using it.
![image](https://user-images.githubusercontent.com/13734965/230127075-a1db0435-08c2-46b7-9c70-f6db335c379e.png)
Click Reset. Mixpanel resets the value of the GDPR API token. 

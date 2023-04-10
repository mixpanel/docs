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

In order to submit a request, you must first generate a GDPR OAuth token from your Personal Settings. This token is required for requests submitted both through the Mixpanel interface and through Mixpanel's APIs. Users can retrieve this token from their [Account Settings](https://mixpanel.com/settings/account#data-privacy) by selecting their initials in the top right of Mixpanel and selecting **Profile & Preferences**, and then the Data & Privacy tab. The OAuth token has a one year expiry. For requests submitted via API, the token should be passed in the Authentication header. Users are eligible to generate an OAuth token if they are the Project Owner, or if they are a Project Owner or Admin of a project that supports team member roles.

<p align="center">
    <img src=https://storage.googleapis.com/cdn-mxpnl-com/static/readme/Personal%20Data%20%26%20Privacy%20Settings.png>
</p>

# Gather the Project Information and Distinct_ids

Mixpanel exports or deletes end user data according to the user's distinct_id. To export or delete end user data, first select a project that you own and collect the distinct_id of the user(s). Like all data in Mixpanel, the distinct_id can be custom specified in a tracking implementation. As this is the case, it is necessary to ensure that any provided distinct_id is accurate and stored in a project. Any incorrect identifiers submitted as part of export or deletion requests will result in inability to process the request.

It is possible to submit a request from Mixpanel once you gather the distinct_ids of end users requesting exports or deletions. If you implemented Mixpanel before 2020 and are using the alias method to manage user identity, it is possible to submit either the end user’s alias or their distinct_id as part of a deletion request. All data associated with a submitted alias will be deleted. In addition, all data associated with the distinct_id(s) that the alias maps to will be deleted.

# Submit Requests via Request Form in Mixpanel

To access the "Data & Privacy" modal containing the end user data request form:

1. Navigate to "Data & Privacy" by clicking on the settings gear in the upper-right corner and navigating to Organization Settings.
2. Select Data & Privacy on the left hand side.

![Data & Privacy](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Privacy%20%26%20Security/export-deletion-request-form.png)

## Exporting User Data

You must submit an export request to export end user data. This is done to satisfy a GDPR right to access request from your users.

1. In the “Data and Privacy” section, click Request Export.
2. In the “Export User Data” box:
- Select the either CCPA or GDPR under type of export.  
- Select a project in the "Project" dropdown.
- Under “User Data To Export”, select to export data for a single user or multiple users.
   - For a single user, provide the distinct_id of the user.
   - For multiple users, upload a list of distinct_ids as a .csv file. There is a limit of 2000 Users.
3. Click Submit Request. Note that requests can take multiple weeks to process.

![Data & Privacy](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Privacy%20%26%20Security/export-user-data-form.png)

## Deleting User Data

You must submit a deletion request to delete end user data. This is done to satisfy a GDPR right to erasure request from your users. 

1. In the “Data and Privacy” section, click Request Deletion.
2. In the “Request User Data Deletion” box:
- Select the either CCPA or GDPR under type of export.  
- Select a project in the "Project" dropdown.
- Select to delete data for a single user or multiple users.
   - For a single user, provide the distinct_id of the user.
   - For multiple users, upload a list of distinct_ids as a CSV file. There is a limit of 2000 users per request.
 3. Click Submit Request. Note that requests can take up to several weeks to process.

![Data & Privacy](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Privacy%20%26%20Security/delete-user-data-form.png)

## GDPR Requests

GDPR requests are specifically designed to satisfy requirements as outlined in the General Data Protection Regulation.

**Export**
A GDPR export contains all data connected to the requested distinct_id. 

**Deletion**
A GDPR deletion includes all data connected to the requested distinct_id.

## CCPA Requests

CCPA requests are specifically designed to satisfy requirements as outlined in the California Consumer Privacy Act.

**Export**
A CCPA export contains all data from the previous year connected to the requested distinct_id. 

**Deletion**
A CCPA deletion includes all data connected to the requested distinct_id. 

**Disclosure types**
There are three different disclosure types as outlined in the CCPA. To export or delete everything, you can select “Data” as the disclosure type. Select “Categories” to export or delete the data table headers. Select “Sources” to export or delete data connected to the means of data collection.

# Opt Out Users
While the following API can be used to delete or retrieve personal data as outlined by the GPDR, it is important to also opt users out of subsequent tracking. Deleting data from Mixpanel will remove it permanently, but it will not prevent the data from being collected moving forward. If tracking using a client-side Mixpanel library, you can opt users out of tracking using Mixpanel's opt-out methods. These are available in the following client-side libraries:
* [JavaScript](doc:javascript#section-opting-users-out-of-tracking) 
* [iOS - Objective-C](doc:ios#section-opting-users-out-of-tracking)
* [iOS - Swift](doc:swift#section-opting-users-out-of-tracking)
* [Android](doc:android#section-opting-users-out-of-tracking)

See Mixpanel’s [Privacy-Friendly Tracking](https://developer.mixpanel.com/docs/privacy-friendly-tracking) guide for more information on best practices when handling personal information in Mixpanel.

# Submit Requests via API
Mixpanel deletion and retrieval APIs are in place to help Mixpanel implementations meet the requirements outlined by the General Data Protection Regulation (GDPR) legislation.

> 📘GDPR Request Rate Limits
> You can batch up to 2000 distinct IDs per deletion request and up to 100 for a retrieval request. Request rates are limited for GDPR API requests. 

## GDPR and CCPA API (v3)
The following retrieval and deletion API calls are updated for version 3 and are made for GDPR and CCPA compliance. 

### Create Retrieval
Request Type: **POST**
Description: Creates a data retrieval job.
Endpoint: `https://mixpanel.com/api/app/data-retrievals/v3.0/?token=<your_project_token>`
Parameters:

| Parameter | Parameter Type | Data Type | Description |
|-----------------|-------------------------|----------------|-------------------|
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](https://help.mixpanel.com/hc/en-us/articles/115004502806-Find-Project-Token-). |
| distinct_ids | Body. Passed in JSON blob format. | Array of strings | A list of distinct IDs associated with the users whose data you would like to export. You can add up to 1999 distinct IDs. |
| compliance_type | Body. Passed in JSON blob format. | String | Select CCPA or GDPR. Default is GDPR. |
| disclosure_type | Body. Passed in JSON blob format. | String | Only required if compliance_type = CCPA. Can be [Data, Categories, or Sources. Default is Data](https://help.mixpanel.com/hc/en-us/articles/360000881023#ccpa-requests). |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|-------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](https://help.mixpanel.com/hc/en-us/articles/360000953003#generatingoauth-token-for-gdpr-apis) for GDPR APIs. |

Example Request:
`curl "https://mixpanel.com/api/app/data-retrievals/v3.0/?token=591b3354bb2bdd96f72f23bf56911673"
-H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc"

Example Return: 
`{"status":"ok","results":[{"status":"PENDING", "disclosure_type":"DATA", "date_requested":"2020-03-09T22:28:55.078315", "tracking_id":"1583792934719392965",  "project_id":1978118, "compliance_type":"ccpa", "destination_url":null, "requesting_user":"pat.davis@mixpanel.com", "distinct_id_count":1}]}`

### Check Status of Retrieval 
Request Type: GET

Description: Checks the status of a data retrieval job.

Endpoint: `https://mixpanel.com/api/app/data-retrievals/v3.0/<tracking_id>?token=<your_project_token>`

Return Format: 
`200 OK
{    
    "results": {
         "status":  oneOf [
                         "PENDING",
                         "STAGING",
                         "STARTED",
                         "SUCCESS",
                         "FAILURE",
                         "REVOKED",
                         "NOT_FOUND",
                         "UNKNOWN",
          ],
     }
}`

Return Key:

| Name | Type | Description |
|----------|---------|-------------------|
| PENDING | String | Task ID returned from POST. |
| STAGING | String | The staging process of the retrieval task has started. The task can still be canceled during staging. |
| STARTED | String | The retrieval task has started, and cannot be canceled. |
| SUCCESS | String | The retrieval task is complete. |
| FAILURE | String | The retrieval task has failed. Check the original task input parameters and create a new task. |
| REVOKED | String | The retrieval task has been canceled through a DELETE operation. |
| NOT_FOUND | String | The retrieval task cannot be found. |
| UNKNOWN | String | An error occurred while locating the retrieval task. |

Parameters:

| Parameter | Parameter Type | Type | Description |
|-----------------|-------------------------|---------|------------------|
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](https://help.mixpanel.com/hc/en-us/articles/115004502806-Find-Project-Token-). |
| Task ID | URL. Passed in request URL. | Query String Parameter | The tracking ID shown in the response. |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](https://help.mixpanel.com/hc/en-us/articles/360000953003#generatingoauth-token-for-gdpr-apis) for GDPR APIs. |

Example Request: 
`curl "https://mixpanel.com/api/app/data-retrievals/v3.0/1583958896131033662/?token=591b3354bb2bdd96f72f23bf56911673"
-H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc"`

Example Return:
`{"status": "ok", "results": {"status": "PENDING", "result": "", "distinct_ids": ["1"]}}`

### Create a Deletion Task
Request Type: POST

Description: Creates a task that specifies a list of users in a particular project to delete. This will schedule a deletion job that will delete all data, including events and user profile data, for the users specified by distinct_ids. This deletion job may be canceled until it reaches the STARTED stage. A task can take up to 60 days to complete.

Endpoint: `https://mixpanel.com/api/app/data-deletions/v3.0/?token=<your_project_token>`

Parameters:

| Parameter | Parameter Type | Type | Description |
|-----------------|-------------------------|---------|------------------|
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](https://help.mixpanel.com/hc/en-us/articles/115004502806-Find-Project-Token-). |
| distinct_ids | Body. Passed in JSON blob format. | Array of strings | A list of distinct IDs associated with the users whose data you would like to export. You can add up to 1999 distinct IDs. |
| compliance_type | Body. Passed in JSON blob format. | String | Select CCPA or GDPR. Default is GDPR. |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](https://help.mixpanel.com/hc/en-us/articles/360000953003#generatingoauth-token-for-gdpr-apis) for GDPR APIs. |

Example Request: 
`curl "https://mixpanel.com/api/app/data-deletions/v3.0/?token=591b3354bb2bdd96f72f23bf56911673"
-H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc" -d '{"compliance_type":"CCPA", "distinct_ids":["1"]}'`

Example Return:
`{"status":"ok","results":[{"status":"PENDING", "disclosure_type":"DATA", "date_requested":"2020-03-09T22:28:55.078315", "tracking_id":"1583792934719392965",  "project_id":1978118, "compliance_type":"ccpa", "destination_url":null, "requesting_user":"pat.davis@mixpanel.com", "distinct_id_count":1}]}`

### Check Status of a Deletion Task
Request Type: **GET**

Description: Checks the status of an existing deletion task.

Endpoint: `https://mixpanel.com/api/app/data-deletions/v3.0/<tracking_id>?token=<your_project_token>`

Return Format:
` "results": {
         "status":  
//You will get one of the following returns
oneOf [
                         "PENDING",
                         "STAGING",
                         "STARTED",
                         "SUCCESS",
                         "FAILURE",
                         "REVOKED",
                         "NOT_FOUND",
                         "UNKNOWN",
          ],
     }
}`

Return Key:

| Name | Type | Description |
|----------|---------|-------------------|
| PENDING | String | Task ID returned from POST. |
| STAGING | String | The staging process of the deletion task has started. The task can still be canceled during staging. |
| STARTED | String | The deletion task has started, and cannot be canceled. |
| SUCCESS | String | The deletion task is complete. |
| FAILURE | String | The deletion task has failed. Check the original task input parameters and create a new task. |
| REVOKED | String | The deletion task has been canceled through a DELETE operation. |
| NOT_FOUND | String | The deletion task cannot be found. |
| UNKNOWN | String | An error occurred while locating the deletion task. |

Parameters:

| Parameter | Parameter Type | Type | Description |
|-----------------|-------------------------|---------|------------------|
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](https://help.mixpanel.com/hc/en-us/articles/115004502806-Find-Project-Token-). |
| Task ID | URL. Passed in request URL. | Query String Parameter | The tracking ID shown in the response. |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](https://help.mixpanel.com/hc/en-us/articles/360000953003#generatingoauth-token-for-gdpr-apis) for GDPR APIs. |

Example Request:
`curl "https://mixpanel.com/api/app/data-deletions/v3.0/35bd8477-f71f-4088-af55-c88a6fb4ad4b/?token=591b3354bb2bdd96f72f23bf56911674" -H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc"

Example Return:
`{"status": "ok", "results": {"status": "PENDING", "result": "", "distinct_ids": ["1"]}}`

### Cancel Deletion
Request Type: **DELETE**

Description: Cancels an existing deletion task. Deletion jobs can be canceled until the STARTED stage initiates.

Endpoint: `https://mixpanel.com/api/app/data-deletions/v3.0/?token=<your_project_token>`

Return Format: `204 NoContent` or `405 MethodNotAllowed`

Return Key:

| Name | Type | Description | 
|----------|----------|------------------|
| 204 NoContent | Query String Parameter `required` | Your Mixpanel [project token](https://help.mixpanel.com/hc/en-us/articles/115004502806-Find-Project-Token-). |
| 405 MethodNotAllowed | Query String Parameter `required` | Task ID returned from POST. |

Parameters:

| Parameter | Parameter Type | Type | Description |
|-----------------|-------------------------|---------|------------------|
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](https://help.mixpanel.com/hc/en-us/articles/115004502806-Find-Project-Token-). |
| distinct_ids | Body. Passed in JSON blob format. | Array of strings | A list of distinct IDs associated with the users whose data you would like to export. You can add up to 1999 distinct IDs. |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](https://help.mixpanel.com/hc/en-us/articles/360000953003#generatingoauth-token-for-gdpr-apis) for GDPR APIs. |

Example Request:
`curl "https://mixpanel.com/api/app/data-deletions/v3.0/?token=591b3354bb2bdd96f72f23bf56911673"
-H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc" -d '{"distinct_ids":["1"]}'`

Example Return:
`{"status": "ok", "results": {"task_id": "35bd8477-f71f-4088-af55-c88a6fb4ad4a"}}`

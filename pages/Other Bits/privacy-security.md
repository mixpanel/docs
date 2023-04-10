---
title: "Privacy & Security"
slug: "privacy-security"
hidden: false
metadata: 
  title: "Privacy & Security | Mixpanel Developer Docs"
  description: "Mixpanel believes in respecting and protecting people’s fundamental online privacy and data rights. Read how we store, manage data, and more."
createdAt: "2021-04-28T19:22:30.616Z"
updatedAt: "2023-02-08T20:07:20.513Z"
---
# Overview
Mixpanel believes in respecting and protecting people’s fundamental online privacy and data rights. Which is why we've built Mixpanel's analysis tools in compliance with industry best-practices and global data regulations like the GDPR and the CCPA.

Visit our [Privacy Hub](https://mixpanel.com/legal/privacy-hub/) to see how we comply with various privacy guidelines.

# Storing Your Data in the European Union
By default Mixpanel stores user data on it's US Servers via the Google Cloud Platform.
However, Mixpanel also provides you with the option to process and store your customers' personal data in Europe via our [EU Data Residency Program](https://mixpanel.com/topics/data-residency-for-mixpanel/).
You can enable this by selecting the "EU Data Residency" option when creating a new project, and using our EU subdomain during all API calls.

| API | Standard Server | EU Residency Server |
|-------|-------------------------|--------------------------------|
| [Ingestion API](ref:ingestion-api) | `api.mixpanel.com` | `api-eu.mixpanel.com` |
| [Query API](ref:query-api) | `mixpanel.com/api` | `eu.mixpanel.com/api` |
| [Raw Data Export API](ref:raw-data-export-api) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Data Pipelines API](ref:data-warehouse-api) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Lexicon Schemas API](ref:lexicon-schemas-api) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects` |
| [Connectors API](ref:connectors-api) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects`|

# Using Our SDKs
Next you'll need to set the server location to EU when initializing the Mixpanel library. You can find instructions for the required config settings for each SDK below:
- [JavaScript](doc:javascript#eu-data-residency)
- [Objective-C](doc:ios#eu-data-residency)
- [Swift](doc:swift#eu-data-residency)
- [Android](doc:android#eu-data-residency)
- [Python](doc:python#eu-data-residency)
- [Java](doc:java#eu-data-residency)
- [PHP](doc:php#eu-data-residency)
- [Ruby](doc:ruby#eu-data-residency)
- [Node.js](doc:nodejs#eu-data-residency)
- [React Native](doc:react-native#eu-data-residency)
- [Flutter](doc:flutter#eu-data-residency)

# Querying Mixpanel Data in the EU
Once you've set the server location to EU, please notify Mixpanel so we can set your project's cluster to `mixpanel-prod-eu`.

To do so, reach out to your Relationship Manager, Customer Success Manager, or Account Executive and they can help coordinate this change. Once the setup is complete, you can log into your account at `eu.mixpanel.com` and query data in any Mixpanel report.

# Log in via SSO
If you want the IdP initiated flow to direct to [eu.mixpanel.com](https://eu.mixpanel.com/), prepend "eu." to your postback URL. For example, [mixpanel.com/security/login/1](https://mixpanel.com/security/login/1) would need to be changed to [eu.mixpanel.com/security/login/1](https://eu-mixpanel.com/security/login/1). 

# Manage Personal Data
Mixpanel deletion and retrieval APIs are in place to help Mixpanel implementations meet the requirements outlined by the General Data Protection Regulation (GDPR) legislation.


> 📘GDPR Request Rate Limits
> You can batch up to 2000 distinct IDs per deletion request and up to 100 for a retrieval request. Request rates are limited for GDPR API requests. 

## User Opt-Out
While the following API can be used to delete or retrieve personal data as outlined by the GPDR, it is important to also opt users out of subsequent tracking. If tracking using a client-side Mixpanel library, you can opt users out of tracking using Mixpanel's opt-out methods. These are available in the following client-side libraries:
* [JavaScript](doc:javascript#section-opting-users-out-of-tracking) 
* [iOS - Objective-C](doc:ios#section-opting-users-out-of-tracking)
* [iOS - Swift](doc:swift#section-opting-users-out-of-tracking)
* [Android](doc:android#section-opting-users-out-of-tracking)

See Mixpanel’s [Managing Personal Information](https://help.mixpanel.com/hc/en-us/articles/360000679006-Managing-Personal-Information) guide for more information on best practices when handling personal information in Mixpanel.

## Authentication
Authentication occurs via a user-specific OAuth token with a scope that only includes the following deletion and retrieval APIs. Users can retrieve this token from their [Account Settings](https://mixpanel.com/settings/account#data-privacy) by selecting their initials in the top right of Mixpanel and selecting **Profile & Preferences**, and then the Data & Privacy tab. The OAuth token has a one year expiry. It should be passed in the Authentication header. Users are eligible to generate an OAuth token if they are the [project owner](https://help.mixpanel.com/hc/en-us/articles/115004505106-Project-Ownership), or if they are a project owner or admin of a project that supports [team member roles](https://help.mixpanel.com/hc/en-us/articles/360024613412--Project-Roles-and-Permissions-).

<p align="center">
    <img src=https://storage.googleapis.com/cdn-mxpnl-com/static/readme/Personal%20Data%20%26%20Privacy%20Settings.png>
</p>

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
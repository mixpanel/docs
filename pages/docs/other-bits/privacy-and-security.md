# Privacy And Security

## Overview
Mixpanel believes in respecting and protecting people’s fundamental online privacy and data rights. Which is why we've built Mixpanel's analysis tools in compliance with industry best-practices and global data regulations like the GDPR and the CCPA.

Visit our [Privacy Hub](https://mixpanel.com/legal/privacy-hub/) to see how we comply with various privacy guidelines.

## Storing Your Data in the European Union
By default Mixpanel stores user data on its US Servers via the Google Cloud Platform.
However, Mixpanel also provides you with the option to process and store your customers' personal data in Europe via our [EU Data Residency Program](https://mixpanel.com/topics/data-residency-for-mixpanel/).
You can enable this by selecting the "EU Data Residency" option when creating a new project, and using our EU subdomain during all API calls.

| API | Standard Server | EU Residency Server |
|-------|-------------------------|--------------------------------|
| [Ingestion API](/reference/ingestion/events) | `api.mixpanel.com` | `api-eu.mixpanel.com` |
| [Query API](/reference/other-bits/query-api) | `mixpanel.com/api` | `eu.mixpanel.com/api` |
| [Raw Data Export API](/reference/export/events) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Data Pipelines API](/reference/export/data-pipelines#create-pipeline) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Lexicon Schemas API](/reference/other-bits/lexicon) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects` |
| [Connectors API](/reference/other-bits/connectors) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects`|

## Using Our SDKs
Next you'll need to set the server location to EU when initializing the Mixpanel library. You can find instructions for the required config settings for each SDK below:

- [JavaScript](/docs/tracking/reference/javascript#eu-data-residency)
- [Objective-C](/docs/tracking/reference/ios#eu-data-residency)
- [Swift](/docs/tracking/reference/ios#eu-data-residency)
- [Android](/docs/tracking/reference/android#eu-data-residency)
- [Python](/docs/tracking/reference/python#eu-data-residency)
- [Java](/docs/tracking/reference/java#eu-data-residencyy)
- [PHP](/docs/tracking/reference/php#eu-data-residency)
- [Ruby](/docs//tracking/reference/ruby#eu-data-residency)
- [Node.js](/docs/tracking/reference/nodejs#eu-data-residency)
- [React Native](/docs/tracking/reference/react-native)
- [Flutter](/docs/tracking/reference/flutter#eu-data-residency)

## Querying Mixpanel Data in the EU
Once you've set the server location to EU, please notify Mixpanel so we can set your project's cluster to `mixpanel-prod-eu`.

To do so, reach out to your Relationship Manager, Customer Success Manager, or Account Executive and they can help coordinate this change. Once the setup is complete, you can log into your account at `eu.mixpanel.com` and query data in any Mixpanel report.

## Log in via SSO
If you want the IdP initiated flow to direct to [eu.mixpanel.com](https://eu.mixpanel.com/), prepend "eu." to your postback URL. For example, [mixpanel.com/security/login/1](https://mixpanel.com/security/login/1) would need to be changed to [eu.mixpanel.com/security/login/1](https://eu-mixpanel.com/security/login/1).

## Manage Personal Data
Mixpanel deletion and retrieval APIs are in place to help Mixpanel implementations meet the requirements outlined by the General Data Protection Regulation (GDPR) legislation.


> 📘GDPR Request Rate Limits
> You can batch up to 2000 distinct IDs per deletion request and up to 2000 for a retrieval request. Request rates are limited for GDPR API requests.

### User Opt-Out
While the following API can be used to delete or retrieve personal data as outlined by the GPDR, it is important to also opt users out of subsequent tracking. If tracking using a client-side Mixpanel library, you can opt users out of tracking using Mixpanel's opt-out methods. These are available in the following client-side libraries:
* [JavaScript](/docs/tracking/reference/javascript#opting-users-out-of-tracking)
* [iOS - Objective-C](/docs/tracking/reference/ios#opting-users-out-of-tracking)
* [iOS - Swift](/docs/tracking/reference/swift#opting-users-out-of-tracking)
* [Android](/docs/tracking/reference/android#opting-users-out-of-tracking)

See Mixpanel’s [Managing Personal Information](/docs/tracking/how-tos/privacy-friendly-tracking) guide for more information on best practices when handling personal information in Mixpanel.

### Authentication
Authentication occurs via a user-specific OAuth token with a scope that only includes the following deletion and retrieval APIs. Users can retrieve this token from their [Account Settings](https://mixpanel.com/settings/account#data-privacy) by selecting their initials in the top right of Mixpanel and selecting **Profile & Preferences**, and then the Data & Privacy tab. The OAuth token has a one year expiry. It should be passed in the Authentication header. Users are eligible to generate an OAuth token if they are the [project owner](/docs/admin/organizations-projects/manage-team-members#project-roles), or if they are a project owner or admin of a project that supports [team member roles](/docs/admin/organizations-projects/manage-team-members#project-roles).

<p align="center">
    <img src=https://storage.googleapis.com/cdn-mxpnl-com/static/readme/Personal%20Data%20%26%20Privacy%20Settings.png>
</p>

### GDPR and CCPA API (v3)
The following retrieval and deletion API calls are updated for version 3 and are made for GDPR and CCPA compliance.

#### Create Retrieval
Request Type: **POST**
Description: Creates a data retrieval job.
Endpoint: `https://mixpanel.com/api/app/data-retrievals/v3.0/?token=<your_project_token>`
Parameters:

| Parameter | Parameter Type | Data Type | Description |
|-----------------|-------------------------|----------------|-------------------|
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](/docs/admin/organizations-projects/manage-projects#find-your-project-tokens). |
| distinct_ids | Body. Passed in JSON blob format. | Array of strings | A list of distinct IDs associated with the users whose data you would like to export. You can add up to 2000 distinct IDs. |
| compliance_type | Body. Passed in JSON blob format. | String | Select CCPA or GDPR. Default is GDPR. |
| disclosure_type | Body. Passed in JSON blob format. | String | Only required if compliance_type = CCPA. Can be [Data, Categories, or Sources. Default is Data](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data). |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|-------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data#generate-oauth-token) for GDPR APIs. |

Example Request:
```text
curl "https://mixpanel.com/api/app/data-retrievals/v3.0/?token=591b3354bb2bdd96f72f23bf56911673"
-H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc"
```

##### Rate Limit

We place a rate limit in place to ensure the integrity of our system as well as prevent a single project from monopolizing the avaialble resources for other projects. Getting a 429 response code from our GDPR API means that you have reached our rate-limit. We currently have a rate-limit of 1 request per second for GDPR APIs. We also limit maximum number of outstanding scans for a single project to be approximately 5 years.

GDPR data retrieval process works by dividing the job of extracting the events by the granularity of day, getting the events belonging to each distinct_id in the request for each day going back to the first day for which we have events in Mixpanel. Since user activity can go back several years, this means that even a single data retrieval request might require scans of many hundred days.

In order to maximize the throughput of data retrievals, we recommend sending the maximum number of distinct-ids per request, now at 2000 distinct-ids, then retrying with exponential backoff. Depending on the amount of data that needs to be scanned, retrying for several hours might sometimes be necessary.

Example Return:
`{"status":"ok","results":[{"status":"PENDING", "disclosure_type":"DATA", "date_requested":"2020-03-09T22:28:55.078315", "tracking_id":"1583792934719392965",  "project_id":1978118, "compliance_type":"ccpa", "destination_url":null, "requesting_user":"pat.davis@mixpanel.com", "distinct_id_count":1}]}`

#### Check Status of Retrieval
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
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](/docs/admin/organizations-projects/manage-projects#find-your-project-tokens). |
| Task ID | URL. Passed in request URL. | Query String Parameter | The tracking ID shown in the response. |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data#generate-oauth-token) for GDPR APIs. |

Example Request:
`curl "https://mixpanel.com/api/app/data-retrievals/v3.0/1583958896131033662/?token=591b3354bb2bdd96f72f23bf56911673"
-H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc"`

Example Return:
`{"status": "ok", "results": {"status": "PENDING", "result": "", "distinct_ids": ["1"]}}`

#### Create a Deletion Task
Request Type: POST

Description: Creates a task that specifies a list of users in a particular project to delete. This will schedule a deletion job that will delete all data, including events and user profile data, for the users specified by distinct_ids. This deletion job may be canceled until it reaches the STARTED stage. It may take up to 30 days to complete a deletion task in a customer’s Mixpanel database. Mixpanel may retain records of deletion tasks for legal compliance purposes or for a short time based on our legitimate interest in providing a service continuity.

Endpoint: `https://mixpanel.com/api/app/data-deletions/v3.0/?token=<your_project_token>`

Parameters:

| Parameter | Parameter Type | Type | Description |
|-----------------|-------------------------|---------|------------------|
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](/docs/admin/organizations-projects/manage-projects#find-your-project-tokens). |
| distinct_ids | Body. Passed in JSON blob format. | Array of strings | A list of distinct IDs associated with the users whose data you would like to export. You can add up to 1999 distinct IDs. |
| compliance_type | Body. Passed in JSON blob format. | String | Select CCPA or GDPR. Default is GDPR. |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data#generate-oauth-token) for GDPR APIs. |

Example Request:
`curl "https://mixpanel.com/api/app/data-deletions/v3.0/?token=591b3354bb2bdd96f72f23bf56911673"
-H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc" -d '{"compliance_type":"CCPA", "distinct_ids":["1"]}'`

Example Return:
`{"status":"ok","results":[{"status":"PENDING", "disclosure_type":"DATA", "date_requested":"2020-03-09T22:28:55.078315", "tracking_id":"1583792934719392965",  "project_id":1978118, "compliance_type":"ccpa", "destination_url":null, "requesting_user":"pat.davis@mixpanel.com", "distinct_id_count":1}]}`

#### Check Status of a Deletion Task
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
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](/docs/admin/organizations-projects/manage-projects#find-your-project-tokens). |
| Task ID | URL. Passed in request URL. | Query String Parameter | The tracking ID shown in the response. |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data#generate-oauth-token) for GDPR APIs. |

Example Request:
`curl "https://mixpanel.com/api/app/data-deletions/v3.0/35bd8477-f71f-4088-af55-c88a6fb4ad4b/?token=591b3354bb2bdd96f72f23bf56911674" -H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc"`

Example Return:
`{"status": "ok", "results": {"status": "PENDING", "result": "", "distinct_ids": ["1"]}}`

#### Cancel Deletion
Request Type: **DELETE**

Description: Cancels an existing deletion task. Deletion jobs can be canceled until the STARTED stage initiates.

Endpoint: `https://mixpanel.com/api/app/data-deletions/v3.0/?token=<your_project_token>`

Return Format: `204 NoContent` or `405 MethodNotAllowed`

Return Key:

| Name | Type | Description |
|----------|----------|------------------|
| 204 NoContent | Query String Parameter `required` | Your Mixpanel [project token](/docs/admin/organizations-projects/manage-projects#find-your-project-tokens). |
| 405 MethodNotAllowed | Query String Parameter `required` | Task ID returned from POST. |

Parameters:

| Parameter | Parameter Type | Type | Description |
|-----------------|-------------------------|---------|------------------|
| Token | URL. Passed in request URL. | Query String Parameter | Your Mixpanel [project token](/docs/admin/organizations-projects/manage-projects#find-your-project-tokens). |
| distinct_ids | Body. Passed in JSON blob format. | Array of strings | A list of distinct IDs associated with the users whose data you would like to export. You can add up to 1999 distinct IDs. |

Authorization:

| Authorization Type | Pass As | Description |
|-----------------------------|-------------|------------------|
| Bearer | Body. Passed in JSON blob format. | Your [OAuth token](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data#generate-oauth-token) for GDPR APIs. |

Example Request:
`curl "https://mixpanel.com/api/app/data-deletions/v3.0/?token=591b3354bb2bdd96f72f23bf56911673"
-H "Authorization: Bearer vZcErNw8JCq42BZUJyWoZmDWCKBxXc" -d '{"distinct_ids":["1"]}'`

Example Return:
`{"status": "ok", "results": {"task_id": "35bd8477-f71f-4088-af55-c88a6fb4ad4a"}}`

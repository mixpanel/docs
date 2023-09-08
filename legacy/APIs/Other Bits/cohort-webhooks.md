---
title: "Sync Cohorts to Webhooks"
slug: "cohort-webhooks"
hidden: false
metadata: 
  title: "Cohort Syncs To Webhooks | Mixpanel Developer Docs"
  description: "Mixpanel supports syncing cohorts to a custom webhook URL that you provide via our Integrations UI. Learn the prerequisites, webhook format, and more here."
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---
Mixpanel supports syncing cohorts to a custom webhook URL that you provide via our Integrations UI. When a sync is established, we will sync the full contents of the cohort to the URL and subsequently sync diffs (ie: the users who entered or exited the cohort since the last sync).
[block:api-header]
{
  "title": "Prerequisites"
}
[/block]
* A paid Mixpanel plan
* A Mixpanel project
* A webhook server. You can create a dummy webhook for testing purposes using [webhook.site](https://webhook.site/).
* The webhook server should send back events to Mixpanel to track actions like Message sent etc. (This is optional but customers who need this have to implement it themselves) 
Customers can follow the naming convention mentioned in this [document](https://help.mixpanel.com/hc/en-us/articles/360001465686-Billing-for-Monthly-Tracked-Users#monthly-tracked-users-calculation) to avoid certain events from being considered for MTU tallies.

[block:callout]
{
  "type": "danger",
  "title": "Note",
  "body": "This is a sync at least once system which means the same users can be synced multiple times for a cohort to maintain consistency during failures."
}
[/block]

[block:api-header]
{
  "title": "Setting up the webhook via our UI"
}
[/block]
To create a new Custom Webhook destination, navigate to our Integrations UI and add a new Webhook connection. All you need to provide is a name for the connection and the URL of your webhook server. 

Optional:  Basic Authentication when calling the webhook URL provided

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4524dc5-Screen_Shot_2021-11-01_at_12.52.49_PM.png",
        "Screen Shot 2021-11-01 at 12.52.49 PM.png",
        2306,
        1146,
        "#8d8d93"
      ],
      "caption": "Setting up custom webhook integration."
    }
  ]
}
[/block]
From this point onward, you can sync any cohort to this connection from our cohorts page. 
[block:api-header]
{
  "title": "Webhook Format"
}
[/block]
Our webhook format has the following structure in the body of a `POST` request:
* **action**: The action defines the type of message we are sending. It will be one of:
  * `members`: All members of the cohort, sent the first time the cohort is being synced or to refresh the cohort if there are any intermediate errors. When you get this message, replace the users you have in the cohort with the copy provided by us.
  * `add_members`: A diff consisting of users that have entered the cohort since the last sync.
  * `remove_members`: A diff consisting of users who have exited the cohort since the last sync.
* **parameters**
  * **mixpanel_project_id**: the ID for Mixpanel project that produced this cohort.
  * **mixpanel_cohort_id**: unique identifier of the cohort.
  * **mixpanel_cohort_name**: The cohort name, editable via the Mixpanel UI.
  * **mixpanel_cohort_description**: The cohort description, editable via the Mixpanel UI.
  * **mixpanel_session_id**: An identifier for this export. Mixpanel sends large cohorts over multiple messages; mixpanel_session_id uniquely identifies a set of requests that correspond to the same export.
  * **page_info**: An object containing “total_pages”, i.e. the number of total messages for the given session ID, and “page_count”, the index of which page this message is (e.g. message 6 of 10, in the example below). You may use this value to know if/when you’ve collected the full set of messages for an export.
  * **members**: The list of users being added or removed from the cohort. We include `email`, `mixpanel_distinct_id`, `first_name`, and `last_name` to help identify the user.

You can download the Swagger spec [here](https://mxpnl.notion.site/Cohort-Webhook-Yaml-17d35e8ca78245fdbfa0aa4fcbb56596).
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"action\": \"members\",\n  \"parameters\": {\n    \"mixpanel_project_id\": \"{mixpanel_project_id}\",\n    \"mixpanel_cohort_name\": \"{mixpanel_cohort_name}\",\n    \"mixpanel_cohort_id\": \"{mixpanel_cohort_id}\",\n    \"mixpanel_cohort_description\": \"description\",\n    \"mixpanel_session_id\": \"mixpanel_session_id\",\n    \"page_info\": {\n      \"total_pages\": 10,\n      \"page_count\": 6\n    },\n    \"members\": [\n      {\n        \"email\": \"string\",\n        \"mixpanel_distinct_id\": \"string\",\n        \"first_name\": \"string\",\n        \"last_name\": \"string\",\n        \"phone_number\": \"xxx-xxx-xxxxx\"\n      },\n      {\n        \"email\": \"string\",\n        \"mixpanel_distinct_id\": \"string\",\n        \"first_name\": \"string\",\n        \"last_name\": \"string\",\n        \"phone_number\": \"xxx-xxx-xxxxx\"\n      }\n    ]\n  }\n}\n",
      "language": "json"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Expected Response Format"
}
[/block]
We expect a JSON response of the following shape.
* **action**: Must match the action we sent.
* **status**: Must be either `success` or `failure`
* **error**: Only expected on failure.
   * **message**: details about the error
   * **code**: an HTTP status code
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"action\": \"add_members\",\n  \"status\": \"success\", // or failure\n  \"error\": {\n    \"message\": \"some error message; this will be displayed in our UI\",\n    \"code\": 400  // an HTTP status code\n  }\n}\n",
      "language": "json"
    }
  ]
}
[/block]
## Simple Sync Scenario

Consider A, B, C, D, E, F as users. Sync interval is 30 minutes. T is when the sync is created in our UI.

`add_members(...)` indicates a call to the webhook to add members. `remove_members(...)` indicates a call to remove members.

* **T**: `add_members(A, B, C, D)` | `remove_members()` 
* **T+0.1h**: B, D leave the cohort
* **T+0.2h**: E, F join the cohort
* **T+0.5h**: `add_members(E, F)` | `remove_members(B, D)` 
* <...No cohort changes...>
* **T+1h**: `add_members()` | `remove_members()` calls are made to the customer webhook 

##  FAQ
**What is the frequency of the syncs?**
We sync cohorts once every 30 minutes.

**How many users are in each batch?**
The batch size is set at 1000 users per call to `add_members` or `remove_members`.

**How does diffing work?**
Every time we perform a successful sync to your webhook, we store a snapshot of the cohort as of that time. This snapshot is valid for 3 days. Subsequent syncs use the last successful snapshot of the cohort to compute the number of users added and removed (the diff). We send this diff to your webhook via the `add_members` and `remove_members` calls.

**When is a full sync of all members in the cohort performed?**
Full syncs are only performed when:
* We sync the cohort for the first time.
* We store the snapshot of the cohort state for the last successful sync for 3 days. If your webhook server is down (returns a 429 or 5XX error) for more than 3 days, the snapshot expires and we do a full sync. 
    
**How are diffs computed when a sync fails?**
When a sync fails, we do not update the cohort snapshot. The next sync performed will recompute the diff based on the last successful snapshot (until 3 days have passed, at which point we will attempt to sync the full cohort). This ensures that the state of the cohort will converge to what Mixpanel has.

**When are syncs paused?**
We pause syncs on when your server returns a non-transient error (400, 401, 403, 404). Please use the appropriate HTTP status code to indicate a non-transient error; this helps avoid added load.

We record failed syncs in our UI and display the error message returned in the response from your webhook server (see the `error.message` field in the sample response above).
        
**Do we get notified when the sync is paused?**
Yes, an email is sent to all users who have set up cohort syncs when the syncs pause due to an error.

** Do page_count in the requests start from 0 or 1?**
The page_count starts from 1.

**Do you retry on webhook call failures?**
Yes, we retry 5 times over 60 secs with exponential backoff in response to 5xx and 429 status codes. After this point, we will wait until the next scheduled sync to retry.

**Are users within cohort resynced when webhook calls fail or there is an internal failure?**
Even though we just sync a diff of users for each cohort there can be failures that occur mid sync. In a case like this, we do not have a mechanism to keep track of users that were already synced for a cohort when the failure occurs in between the sync process. So we start the sync from the top again. This can cause issues like users being synced again.

**What can go wrong for custom webhooks when users are synced again after failure scenarios?**
For example, If these users are set up for some action upon arrival, this failure and recovery could trigger a duplicate action for the same user. 

**How to avoid duplicate actions for the same users?**
This can be fixed on the custom webhook server-side by keeping track of users who have been already targeted with the action. This way during failure and recovery scenarios of cohort syncs duplicate actions for the same users can be avoided.

**How are actions tracked in Mixpanel?**
The actions are not automatically tracked in Mixpanel as they occur on the customer-side webhook server. Customers have to explicitly track events back to Mixpanel in order to use them on the Mixpanel platform.
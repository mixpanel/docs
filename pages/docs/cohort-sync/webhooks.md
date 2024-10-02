# Syncing cohorts to a custom webhook

Mixpanel supports syncing cohorts to a custom webhook URL that you provide via our Integrations UI. When a sync is established, we will sync the full contents of the cohort to the URL and subsequently sync diffs (ie: the users who entered or exited the cohort since the last sync).

## Prerequisites
* A paid Mixpanel plan
* A Mixpanel project
* A webhook server. You can create a dummy webhook for testing purposes using [webhook.site](https://webhook.site/).
* The webhook server should send back events to Mixpanel to track actions like Message sent etc. (This is optional but customers who need this have to implement it themselves)
Customers can follow the naming convention mentioned in this [document](/docs/admin/pricing-plans#mtu-calculation) to avoid certain events from being considered for MTU tallies.

## Setting up the webhook via our UI
To create a new Custom Webhook destination, navigate to our Integrations UI and add a new Webhook connection. All you need to provide is a name for the connection and the URL of your webhook server.

Optional:  Basic Authentication when calling the webhook URL provided

![image](/screen_shot_webhook_cohorts.png)

From this point onward, you can sync any cohort to this connection from our cohorts page.

### Exported Properties
Mixpanel will automatically include `email`, `mixpanel_distinct_id`, `first_name`, and `last_name` to identify the user. If you need to add extra properties, feel free to add in `Properties to Export` field where we populate some pre-existing fields for you to choose.

## Webhook Format
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
  * **members**: The list of users being added or removed from the cohort. We include `email`, `mixpanel_distinct_id`, `first_name`, and `last_name` to help identify the user. You may [specify additional properties](/docs/cohort-sync/webhooks#exported-properties) during setup.

You can download the Swagger spec [here](https://mxpnl.notion.site/Cohort-Webhook-Yaml-17d35e8ca78245fdbfa0aa4fcbb56596).

```json
{
  "action": "members",
  "parameters": {
    "mixpanel_project_id": "{mixpanel_project_id}",
    "mixpanel_cohort_name": "{mixpanel_cohort_name}",
    "mixpanel_cohort_id": "{mixpanel_cohort_id}",
    "mixpanel_cohort_description": "description",
    "mixpanel_session_id": "mixpanel_session_id",
    "page_info": {
      "total_pages": 10,
      "page_count": 6
    },
    "members": [
      {
        "email": "string",
        "mixpanel_distinct_id": "string",
        "first_name": "string",
        "last_name": "string",
        "phone_number": "xxx-xxx-xxxxx"
      },
      {
        "email": "string",
        "mixpanel_distinct_id": "string",
        "first_name": "string",
        "last_name": "string",
        "phone_number": "xxx-xxx-xxxxx"
      }
    ]
  }
}
```

## Expected Response Format
We expect a JSON response of the following shape.
* **action**: Must match the action we sent.
* **status**: Must be either `success` or `failure`
* **error**: Only expected on failure.
   * **message**: details about the error
   * **code**: an HTTP status code

```json
{
  "action": "add_members",
  "status": "success", // or failure
  "error": {
    "message": "some error message; this will be displayed in our UI",
    "code": 400  // an HTTP status code
  }
}
```

## Sync
Cohorts are synced once every 30 minutes. The batch size is set to 1000 users per call to `add_members` or `remove_members`.


### Full Sync
Full syncs are only performed when:
* We sync the cohort for the first time.
* We store the snapshot of the cohort state for the last successful sync for 3 days. If your webhook server is down (returns a 429 or 5XX error) for more than 3 days, the snapshot expires and we do a full sync.

Subsequent syncs include only differences in membership since the previous successful sync in order to preserve bandwidth, through a [diffing](/docs/cohort-sync/webhooks#diffing) mechanism.

### Diffing
Every time we perform a successful sync to your webhook, we store a snapshot of the cohort as of that time. This snapshot is valid for 3 days. Subsequent syncs use the last successful snapshot of the cohort to compute the number of users added and removed (the diff). We send this diff to your webhook via the `add_members` and `remove_members` calls.

### Example Webhook Sync Scenario

Consider A, B, C, D, E, and F as users. The sync interval is 30 minutes. T represents the time when the sync is created in our UI.

`add_members(...)` indicates a call to the webhook to add members. `remove_members(...)` indicates a call to remove members.

* **T**: `add_members(A, B, C, D)` | `remove_members()`
* **T+10mins**: B, D leave the cohort
* **T+20mins**: E, F join the cohort
* **T+30mins**: `add_members(E, F)` | `remove_members(B, D)`
* <...No cohort changes...>
* **T+1h**: `add_members()` | `remove_members()` calls are made to the customer webhook

### Failed Syncs
We pause syncs when your server returns a non-transient error (400, 401, 403, 404). Please use the appropriate HTTP status code to indicate a non-transient error; this helps avoid added load. We record failed syncs in our UI and display the error message returned in the response from your webhook server (see the `error.message` field in the sample response above).

A notification email is sent to all users who have set up cohort syncs when the syncs pause due to an error.

We retry syncs 5 times over 60 secs with exponential backoff in response to 5xx and 429 status codes. After this point, we will wait until the next scheduled sync to retry.

#### Diffs After Failed Syncs 
When a sync fails, we do not update the cohort snapshot. The next sync performed will recompute the diff based on the last successful snapshot (until 3 days have passed, at which point we will attempt to sync the full cohort). This ensures that the state of the cohort will converge to what Mixpanel has.

##  FAQ
**Does page_count in the requests start from 0 or 1?**

The page_count starts from 1.

**Are users within cohort resynced when webhook calls fail or there is an internal failure?**

Even though we just sync a diff of users for each cohort there can be failures that occur mid sync. In a case like this, we do not have a mechanism to keep track of users that were already synced for a cohort when the failure occurs in between the sync process. So we start the sync from the top again. This can cause issues like users being synced again.

**What can go wrong for custom webhooks when users are synced again after failure scenarios?**

For example, If these users are set up for some action upon arrival, this failure and recovery could trigger a duplicate action for the same user.

This can be fixed on the custom webhook server-side by keeping track of users who have been already targeted with the action. This way during failure and recovery scenarios of cohort syncs duplicate actions for the same users can be avoided.

**How are actions tracked in Mixpanel?**

The actions are not automatically tracked in Mixpanel as they occur on the customer-side webhook server. Customers have to explicitly track events back to Mixpanel in order to use them on the Mixpanel platform.

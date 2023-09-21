# Distinct ID Limits

In order to maintain fast queries and catch implementation mistakes, we set a limit on the number of events sent to a particular `distinct_id` in a given time window. This threshold has been stablished as **200K events per `distinct_id` per event date in the project**.

## What is a hot shard?
Whenever a project goes above the threshold described above, it generates an imbalance when storing events across distinct_ids, where one distinct_id's events grows larger than the rest, impacting storage and query systems which in-turn results in high query latencies (slower reports) for the end user.

Since we distribute events across shards, this imbalance is called a **hot shard**.

## What happens when we detect a hot shard?
Once a given entry crosses the threshold, all subsequent matching events (same `distinct_id` and event day) will have the following transformations applied to them:
- `event` will be changed to `$hotshard_events` (display name is `Hotshard Events`).  The original event name will be preserved under a property called `mp_original_event_name` (display name is `Hotshard Original Event Name`). Changing the name removes the bad events from being selected for analysis yet remain accessible for debugging.
- `distinct_id` is changed to `""`[^1]. The original value will be preserved under a property called `mp_original_distinct_id` (display name is `Hotshard Original Distinct ID`). Removing the distinct_id allows Mixpanel backend to distribute these events evenly across shards ensuring that performance is not adversely affected while keeping the data accessible for debugging.

Original Event - 
```json
{
  "event": "Signed up",
  "properties": {
    "time": 1618716477000,
    "distinct_id": "hotshard@mixpanel.com",
    "$insert_id": "36a92782-cd7d-41a0-93af-8c23ec6c4191",
  }
}
```

Updated Event - 
```json
{
  "event": "$hotshard_events",
  "properties": {
    "time": 1618716477000,
    "distinct_id": "",
    "mp_original_event_name": "Signed up",
    "mp_original_distinct_id": "hotshard@mixpanel.com",
    "$insert_id": "36a92782-cd7d-41a0-93af-8c23ec6c4191",
  }
}
```

These events can be queried from the dashboard just like any other events. A monthly report is sent to project owners if a new hot shard was detected and remediated in the past month. 

## Recovering from a hot shard
The process can be broken down into 3 main steps:
* Reviewing the hot shard events in your project to identify which events and `distinct_id` values are involved
* Change the implementation to avoid further instances of the hot shard
* (Optionally) Fix historical data via exporting, transforming and re-importing the data

### Reviewing hot shard data in your project
A great starting point for the analysis would be to create a copy of [this board](https://mixpanel.com/project/2195193/view/139237/app/boards/#id=5651541) from our demo project into the affected project. As you open the board linked above, you will see instructions to click on "Use this board" to transfer it over to your project and to edit the default date range.

![Screenshot use this board](/tracking_id_limits_copy_board.png)

The board eases the process of identifying the data marked as coming from a hot shard. Essentially, it helps you create reports to break down that data by the main `distinct_id` values affected as well as the event names. For example, you can see reports pointing to the main `distinct_id` values (by volume) generating the hot shard.

![Sample hot shard report](/tracking_id_limits_sample_report.png)

### Changing your implementation
Once you have identified the cluster of `distinct_id` values related to the issue, it would be time to review your implementation and inspect the reason why a set of these IDs are getting a higher than usual number of events. In general terms, you will often find these main scenarios:

#### Events that are non-attributable to users but marked with a specific ID
In some instances, your project will have events that should not be attributed to a specific user or group, like some automated tests being tracked, or perhaps ad-spend data you're importing; it may be that when implementing, a specific ID was abritrarily chosen for those events, say the string `"0"`, `"spend_data"` or perhaps even the name of the pod/server the data is coming from. This can lead to hundreds of thousands of events with the same ID causing this issue. 

If your use case is similar to this, and the event **should not be attributed to specific users or groups**, you can change your implementation to send those events with an empty string value `""`. Upon ingestion, Mixpanel will randomly store these events in different shards so you will not incur a performance hit if this is your intended use case.

#### ID management issue
Throughout the user journey, a given user might trigger events under multiple `distinct_id` values; the most frequent use case being a user initially being anonymous and then authenticating. When a user authenticates, generally, we advice changing the ID of the user to the authenticated one and for projects with ID merge enabled, and this is done through the `identify` function. Ideally this function should receive the user's authenticated ID to link it to the anonymous activity, but sometimes there can be implementation issues; as an example, the implementation may provide a static string for all users instead of the new user ID, like this:

```javascript
function authenticate_user(user_id){
	mixpanel.identify('user_id');
	mixpanel.track('user_authenticated');
}
```
Although the code above looks almost like it should work, it could be easy to miss a static string is being passed to the function instead of the dynamic value for each user. This would mean that after this function runs, all users would actually send events with the same id value: `user_id`.

You will want to fix the implementation to identify users correctly and avoid new users being impacted. You can find more information on [identifying users in this doc](../how-tos/identifying-users.md).

In case you've identified the problematic set of ID values, but you have not been able to identify the root cause in the implementation. Reach out to our [support team](https://mixpanel.com/get-support) and provide the details you've uncovered so far; providing your copy of the board and any details on the investigation in your code will be of great assistance helping you identify the issue.

### Fix historical data
Before re-importing, verify newly imported events will no longer create hot shards and the original issue has been solved.

Once the implementation has been changed, you can still have a situation in which some of your metrics might be temporarily down since they were tracked with a different event name (`$hotshard_events` instead of the original name) and without a distinct_id (which can make unique counts go down, although this is usually less of an impact).

The great news is that since the events are still in your project, you can export them, transform them and re-import them.

Below you will find an example script leveraging [our python module](https://github.com/mixpanel/mixpanel-utils) to export the `$hotshard_events` by day to a folder, transform them (in this case replace the event name with the original name the events had) and re-import them. This script is meant as a template for you to review and adjust. You will want to pay special attention to the `transform_event` function in which you can remap properties as needed for the final event to be imported. You can find the configuration options towards the start of the script within the `SETTINGS` variable.

```python
import glob
import gzip
import json
from mixpanel_utils import MixpanelUtils

SETTINGS = {
    "PROJECT_ID": "<REPLACE YOUR PROJECT ID>",
    "TOKEN": "<REPLACE PROJECT TOKEN>",
    "SA_USERNAME": "<REPLACE SERVICE ACCOUNT USERNAME>",
    "SA_PASSWORD": "<REPLACE SERVICE ACCOUNT PASSWORD>",
    "EU": False, # set to TRUE if your project is in the EU
    "EXPORT_FOLDER": "exported_files", # make sure to create the folder if it does not exist
    "FROM": "2023-09-01",
    "TO": "2023-09-15",
}
mputils = MixpanelUtils(SETTINGS["SA_PASSWORD"],token=SETTINGS["TOKEN"],service_account_username=SETTINGS["SA_USERNAME"], eu=SETTINGS["EU"], project_id=SETTINGS["PROJECT_ID"])

def flush_events(events):
    global mputils
    if(len(events) == 0):
        return False
    mputils.import_events(events,timezone_offset=0)
    return True

def transform_event(event):
    try:
        data = json.loads(event)
        data["event"] = data["properties"]["mp_original_event_name"]
        del data["properties"]["mp_original_event_name"]
        del data["properties"]["mp_original_distinct_id"]

        # example if you wanted to remap the value from $user_id to distinct_id
        # if("$user_id" in data["properties"]):
        #     data["properties"]["distinct_id"] = data["properties"]["$user_id"]

        return data
    except:
        return False
#export hotshard events
mputils.export_events(f'{SETTINGS["EXPORT_FOLDER"]}/events.json',{
    "from_date": SETTINGS["FROM"],
    "to_date": SETTINGS["TO"],
    "event": '["$hotshard_events"]'
}, add_gzip_header=True, request_per_day=True, raw_stream=True)

exported_files = glob.glob(f'{SETTINGS["EXPORT_FOLDER"]}/*.json.gz')
for file_name in exported_files:
    events = []
    event_queue_max = 50_000 # arbitrary max length before sending in batches
    with gzip.open(file_name,'rt') as file:
        for line in file:
            event = transform_event(line)
            if(event == False):
                continue
            events.append(event)
            if(len(events) >= event_queue_max):
                flush_events(events)
                events = []
        
        #flush remaining events
        if(len(events) > 0):
            flush_events(events)
            events = []
```

## Hot Shard FAQ

#### How does hot shard detection work?
The detection step runs in the ingestion pipeline. A counter of events is maintained for each `distinct_id` and `event_date` combination. The counter is best-effort as a result of the underlying systems used to maintain such a large keyspace.

Once a pre-defined threshold is crossed, the `distinct_id` is marked as contributing to a hot shard and all subsequent events for this `distinct_id` and `event_date` are updated to even the load across shards. Historical events prior to the hotshard detection for the same `distinct_id` are not updated.

#### I received an email about a hot shard but I don't see users with more than 200K events, why?

Since the detection is done at ingestion, duplicates (potentially as a result of client-side tracking retries) are also counted as part of the hotshard threshold (roughly > 200K event volume). This means you might see <200K events in Mixpanel reports as being remediated for certain distinct_id which were only deduplicated post-ingesting these events.

[^1]: Due to a side-effect on how events are serialized, some remediated entries were initially saved with a numeric distinct_id (instead of ""). This value can safely be ignored.  

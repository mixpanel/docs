Mixpanel's UI is built for interactive exploration of event-based metrics. Events are [sharded](https://en.wikipedia.org/wiki/Shard_(database_architecture)) in the internal storage engine based on their `distinct_id`, the propery that identifies the actor who performed the event, and sorted by `time`. Combined with the in-memory query engine, this enables behavioral queries (funnels, flows, retention) to be computed with high parallelism, no shuffling, and no expensive fact-on-fact joins, leading to low query latency.

## What is a hotshard?
There are cases when an incorrect implementation results in a disproportionately high number of events sent to Mixpanel for the same `distinct_id`. This leads to shard imbalance where one shard grows larger than the rest impacting storage and query systems which in-turn results in high query latencies for the end user.

## How does hotshard detection work?
The hotshard detection step runs in the ingestion pipeline. A counter is maintained for each `distinct_id` and `event_date` (derived from `time`) combination and incremented for each event seen with this combination. Once a pre-defined threshold is crossed, the `distinct_id` is marked as a hotshard and all subsequent events for this combination are updated to even the load across shards while keeping all the original event information intact.

The counter is best-effort as a result of the underlying systems used to maintain such a large keyspace.

## How does hotshard remediation work?
Once a given entry crosses the threshold, all subsequent matching events (same `distinct_id` and `event_date`) are updated to a new (hidden) event - `$hotshard_events`. The `distinct_id` is changed to `""` - the system generates its own id resulting in the event ending up in a different (and random) target shard. This prevents one shard from growing disproportionately larger than the others. The original event name and distinct id are stored in the properties object under `mp_original_event_name` and `mp_original_distinct_id`, respectively.

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

These events can be queried from the dashboard just like any other events.

## Recovering from a hotshard
There are multiple ways to recover depending on needs.

### Do nothing
Perhaps the data that contributed to a hotshard is not needed for business purposes but is useful to keep around - in such cases, the data is queryable under the `$hotshard_events` event.

### Delete the hotshard data
The data to be deleted is in two sets - the events belonging to the `distinct_id` that resulted in a hotshard and the updated events after the remediation logic kicked in.
* For events belonging to the `distinct_id` that resulted in a hotshard, the deletion steps are detailed [here](https://docs.mixpanel.com/docs/other-bits/privacy-and-security/export-or-delete-end-user-data).
* For `$hotshard_events` events, please [contact](https://mixpanel.com/get-support) our support team.

### Fix the data and re-import
For cases where there is user-identifying information elsewhere in the event data that can be used to set the right values, the recommendation is to run a multi-step process to export, fix, and re-import the data.
* Export the data using the [export API](https://developer.mixpanel.com/reference/raw-event-export).
* Delete the existing data in the Mixpanel project by following the steps detailed above.
* Fix the data by changing the `distinct_id` field to the expected value, setting `event` to the value in `mp_original_event_name`, and removing the `mp_original_event_name` and `mp_original_distinct_id` fields.
* Import the updated events using the [import API](https://developer.mixpanel.com/reference/import-events).

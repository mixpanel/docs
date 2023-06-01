In order to maintain fast queries and catch implementation mistakes, we set a limit on the number of events sent to a particular `distinct_id` in a given time window. In this document, we explain how this limit works and what to do when you hit it.

## What is a hot shard?
There are cases when an incorrect implementation results in a disproportionately high number of events sent to Mixpanel for the same `distinct_id`. This leads to shard imbalance where one shard grows larger than the rest impacting storage and query systems which in-turn results in high query latencies for the end user.

## How does hot shard detection work?
The hotshard detection step runs in the ingestion pipeline. A counter is maintained for each `distinct_id` and `event_date` (derived from `time`) combination and incremented for each event seen with this combination. Once a pre-defined threshold is crossed, the `distinct_id` is marked as a hotshard and all subsequent events for this combination are updated to even the load across shards while keeping all the original event information intact.

The counter is best-effort as a result of the underlying systems used to maintain such a large keyspace.

## What happens when we detect a hot shard?
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

## Recovering from a hot shard
Recovery is a multi-step process -
* Break down `$hotshard_events` by `mp_original_distinct_id` and `mp_original_event_name` to spot what’s causing the issue.
* Use the above to locate the code that is causing the issue and update it to stop the ongoing issue.
* This should fix it going forward. To fix historical data, the recommendation is to export, transform, and re-import the data.

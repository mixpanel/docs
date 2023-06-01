Mixpanel's UI is built for interactive exploration of event-based metrics. Events are sharded in the internal storage engine based on their `distinct_id`, the propery that identifies the actor who performed the event, and sorted by `time`. Combined with the in-memory query engine, this enables behavioral queries (funnels, flows, retention) to be computed with high parallelism, no shuffling, and no expensive fact-on-fact joins, leading to low query latency.

## What is a hotshard?
There are cases when an incorrect implementation results in a disproportionately high number of events sent to Mixpanel for the same `distinct_id`. This leads to shard imbalance which impacts storage and query systems which in-turn results in high query latencies for the end user.

## How does hotshard detection work?
The hotshard detection step runs in the ingestion pipeline. A counter is maintained for each `distinct_id` and `event_date` combination and incremented for each event seen with this combination. Once a pre-defined threshold is crossed, the `distinct_id` is marked as a hotshard and all subsequent events for this combination are resharded.

The counter is best-effort as a result of the underlying systems used to maintain such a large keyspace. 

## How does hotshard remediation work?
Once a given entry crosses the threshold, all subsequent matching events are updated to a new (hidden) event - `$hotshard_events` and the `distinct_id` changed to blanks to enable the system to generate a random id which spreads the event across a different shard. The original event name and distinct id are stored in the properties object under `mp_original_event_name` and `mp_original_distinct_id`, respectively.

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

Mutated Event - 
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

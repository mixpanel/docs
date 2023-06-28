---
title: "Distinct ID Limits"
---
In order to maintain fast queries and catch implementation mistakes, we set a limit on the number of events sent to a particular `distinct_id` in a given time window. In this document, we explain how this limit works and what to do when you hit it.

## What is a hot shard?
There are cases when an incorrect implementation results in a disproportionately high number of events sent to Mixpanel for the same `distinct_id`. This leads to an imbalance when storing events across distinct_ids, where one distinct_id's events grows larger than the rest, impacting storage and query systems which in-turn results in high query latencies for the end user.

Since we distribute events across shards, this imbalance is called a **hot shard**.

## How does hot shard detection work?
The hot shard detection step runs in the ingestion pipeline. A counter of events is maintained for each `distinct_id` and `event_date` combination. The counter is best-effort as a result of the underlying systems used to maintain such a large keyspace.

Once a pre-defined threshold is crossed(currently set to 100K events), the `distinct_id` is marked as contributing to a hot shard and all subsequent events for this `distinct_id` and `event_date` are updated to even the load across shards. Historical events prior to the hotshard detection for the same `distinct_id` are not updated.

## What happens when we detect a hot shard?
Once a given entry crosses the threshold, all subsequent matching events (same `distinct_id` and `event_date`) will have the following transformations applied to them:
- `event` will be changed to `$hotshard_events`.  The original event name will be preserved under a property called `mp_original_event_name` (display name is `Hotshard Original Event Name`). Changing the name removes the bad events from being selected for analysis yet remain accessible for debugging.
- `distinct_id` is changed to `""`. The original value will be preserved under a property called `mp_original_distinct_id` (display name is `Hotshard Original Distinct ID`). Removing the distinct_id allows Mixpanel backend to distribute these events evenly across shards ensuring that performance is not adversely affected while keeping the data accessible for debugging.

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

These events can be queried from the dashboard just like any other events. A weekly report is sent to project owners if a new hot shard was detected and remediated in the past 7 days. 

## Recovering from a hot shard
Recovery is a multi-step process -
* Break down `$hotshard_events` by `mp_original_distinct_id` and `mp_original_event_name` to spot what’s causing the issue.
* Use the above to locate the code that is the root cause and update it to stop the ongoing issue.
* This should fix it going forward. To fix historical data, the recommendation is to export, transform, and re-import the data.

---
title: "How Mixpanel Works"
slug: "under-the-hood"
hidden: false
metadata: 
  title: "How It's Built | Mixpanel Developer Docs"
  description: "Mixpanel's analysis UI is powered by an in-house database called Arb. This page covers the core design aspects, the pain it eliminates, and how it compares."
createdAt: "2021-09-04T17:16:04.630Z"
updatedAt: "2023-03-26T23:58:01.531Z"
---
Mixpanel's analysis UI is powered by an in-house database called Arb, which is built for ingesting, storing, and querying trillions of events in real-time. This page covers the core aspects of our design, the pain points it eliminates for users, and how it compares to other systems.
[block:api-header]
{
  "title": "Event-Centric"
}
[/block]
Mixpanel is built for ingesting, storing and querying events. Each event has a name, a timestamp, a unique identifier, a distinct_id that identifies the entity that performed the event, and a JSON blob of properties.
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"event\": \"Signed up\",\n  \"properties\": {\n    \"time\": 1618716477000,\n    \"distinct_id\": \"alice@mixpanel.com\",\n    \"$insert_id\": \"29fc2962-6d9c-455d-95ad-95b84f09b9e4\",\n    \"Referred by\": \"Friend\",\n    \"URL\": \"mixpanel.com/signup\",\n  }\n}",
      "language": "json"
    }
  ]
}
[/block]
Events are a simple and powerful way of collecting and storing data for the following reasons:
* Events map cleanly to real-world actions. When something happens at a point in time to a user, you can track it with all the context you know about that event.
* Events are granular. Any question about user engagement, conversion, or retention can be modeled as an aggregation over a user's event stream. The event data model makes no assumption about the queries it might receive, so it serves as a flexible foundation to power arbitrary queries. Events can be summarized by any property (to form a metric) or segmented by any property (to drill down into a metric) completely on-the-fly.
* Events are immutable and append-only. When something happens in the real-world, it never "un-happens". Immutability makes it possible to design an event-native system in a performant and cost-effective way.*
* Events are flexible. They can model actions that go beyond user activity: support tickets, pull requests, Slack messages, payments, CDC from a database, etc.

**What this eliminates**: Precomputation, rollups, or indexing.

**The exception is to comply with privacy laws like GDPR, which we handle specially.* 
[block:api-header]
{
  "title": "Optimized for Interactive User Joins"
}
[/block]
Mixpanel's UI is built for interactive exploration of event-based metrics. We must respond to queries within seconds to make data exploration delightful at scale.

Our query engine employs the usual techniques for CPU performance: columnar storage, dictionary encoding, a query optimizer, and a purpose-built query engine in C/C++. 

We also shard events based on their `distinct_id`, the property that identifies the actor who performed the event and sort by `time`. This combined with our in-memory query engine enables behavioral queries (funnels, flows, retention) to be computed with high parallelism, no shuffling, and no expensive fact-on-fact joins, leading to low query latency.

Finally, we benefit from cloud economics: 1 CPU for 100 seconds costs the same as 100 CPUs for 1 second, but the latter can respond to queries 100x faster. Multitenancy makes this approach possible at scale and enables fast queries over billions of events.

**What this eliminates**: Data sampling, fact-on-fact joins, and manual refreshing of dashboards.
[block:api-header]
{
  "title": "Real-Time"
}
[/block]
Events are available for analysis in Mixpanel within seconds of hitting our ingestion servers. Arb leverages a lambda architecture to collect recent events in a row-oriented format while storing historical events in a time-partitioned columnar format. This enables fast, real-time analysis and efficient historical analysis.

**What this eliminates**: Waiting for periodic ETL jobs or caches to populate.
[block:api-header]
{
  "title": "Schema-On-Read"
}
[/block]
Events contain an arbitrary set of JSON properties. The properties associated with a given event type are typically stable, but they might occasionally change when new features are added to the product being tracked. Systems that enforce a schema at collection-time require some sort of schema upgrade for this to happen, which can be time consuming to rollout, especially when collecting events from client devices. That said, schemas are useful to provide features like property autocomplete to the person performing analysis. 

Mixpanel solves both problems with schema-on-read. Events are ingested and stored with arbitrary JSON and we infer schemas in real-time to power the autocomplete menus in our UI. Our schema inference also accounts for recency so that stale schemas naturally age out.

**What this eliminates**: Schema migrations.
[block:api-header]
{
  "title": "Star Schema"
}
[/block]
Mixpanel's [data model](doc:data-structure-deep-dive) is fundamentally a star-schema: events are facts and user profiles/lookup tables are dimensions. Events are typically streamed in from client devices and server logs, while dimensional data is periodically loaded from a system of record and provides enrichment to the events for analysis.

Arb's query and storage engine can run star-schema joins on the fly. This means events and dimensions can be loaded at any time without any coordination, rather than needing to be joined at ingestion. This query-time approach also enables backfills of events and dimensions to be done retroactively.

**What this eliminates**: Ingestion-time enrichment. Coordination between streaming and batch systems.
[block:api-header]
{
  "title": "Idempotent"
}
[/block]
Mixpanel's ingestion pipeline is idempotent, which means that events that are accidentally sent multiple times will not affect analysis. This simplifies integration of Mixpanel into your own streaming or batch data pipelines as it turns exactly-once ingestion into at-least-once ingestion.  Unlike other systems which deduplicate for a short time window at ingestion, we take a novel query-time approach to deduplication outlined in our [engineering blog](https://engineering.mixpanel.com/petabyte-scale-data-deduplication-mixpanel-engineering-e808c70c99f8). This enables us to detect duplicates even if they arrive months later.

**What this eliminates**: Keeping state about what you have already sent to Mixpanel.
[block:api-header]
{
  "title": "Cloud-Native"
}
[/block]
Mixpanel is a fully managed cloud application, maintained by the Mixpanel team and deployed on Google Cloud. Like other cloud-native databases, it decouples compute from storage, which reduces costs at high-scale.

Being on Google Cloud also lets us utilize cloud primitives to ship features faster, scale seamlessly when load increases, and leverage enterprise-grade security provided by Google.

**What this eliminates**: Server maintenance, upgrades, and capacity provisioning.
[block:api-header]
{
  "title": "Open APIs"
}
[/block]
There are [many ways to integrate](doc:plan-your-implementation) with Mixpanel, but all are based on our JSON-over-HTTP APIs. We believe it should be easy to bring data into or out of Mixpanel with whatever tools you already use, whether it's a CDP, a data pipeline, or a simple cURL.

This approach allows us to plug into the broader data ecosystem, which makes it easy to both stream real-time event streams into Mixpanel and load from source-of-truth systems like data warehouses. Here is a reference, hybrid architecture for bringing data into Mixpanel, enabled by our APIs.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d0e6e1c-doc.png",
        "doc.png",
        1232,
        882,
        "#f8f8fa"
      ]
    }
  ]
}
[/block]
**What this eliminates**: Complex integrations and proprietary data formats.
[block:api-header]
{
  "title": "Comparison to other systems"
}
[/block]
Mixpanel makes a set of tradeoffs to achieve the above design goals. Here, we compare Mixpanel to other popular database systems to put these tradeoffs in context:

* Mixpanel is not an OLTP system like MySQL, Postgres, or DynamoDB. We do not have support for ACID transactions, indexes, point-lookups or arbitrary SQL. That said, Mixpanel can ingest the change-data-capture events from an OLTP database to provide behavioral analytics.

* Mixpanel is not a data warehouse like Snowflake or BigQuery. Data warehouses provide a relational model and SQL semantics to go with it. They are a great choice as a scalable system of record for all business data that you collect and enable all sorts of queries. However, this generality comes by with poorer performance and ergonomics for ingesting real-time events and answering product analytics questions. Mixpanel can ingest from a data warehouse either via our [APIs](ref:import-events) or Reverse ETL tools.

* Mixpanel is similar to OLAP systems like Clickhouse, Druid, or Pinot. All are optimized for fast, self-serve analytics on immutable data and support both real-time or batch ingestion. The latter systems are open-source and support a SQL-like dialect. This means they can be plugged into open-source or off-the-shelf collection or visualization tools. However, they require developer time to maintain, are expensive because they do not decouple compute and storage, and can also be slower as they do not benefit from multi-tenancy. Finally, they are slow for the types of user joins that are needed for behavioral analytics. Mixpanel is fully managed, vertically integrated from the UX to the database, and built for user joins.

* Mixpanel's backend is also similar to modern serverless databases like Rockset. Both are cloud-native, real-time, and provide schema-on-read. Rockset is a lower-level primitive that requires provisioning a compute cluster and writing SQL, which provides isolation and flexibility. It's a great choice when you want programmatic access to your data, either to power data applications or provide analytics to your app's end users. Mixpanel differs because it's vertically integrated from the visualization layer down to the database, is specially optimized for queries like funnels, and is built for human-generated queries rather than direct programmatic access.


Ultimately, Mixpanel specializes in answering questions about user behavior (funnels, flows, retention) on top of large-scale, immutable event streams. We achieve a step function improvement in performance, cost, and ease-of-use by focusing on this use case and provide open APIs to plug into any other tool in the data ecosystem.

For more technical details about how Mixpanel is built, follow along at our [engineering blog](https://engineering.mixpanel.com/)!
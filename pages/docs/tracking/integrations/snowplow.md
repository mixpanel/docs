---
title: "Snowplow"
slug: "snowplow"
hidden: false
---
If you already use Snowplow to collect event data, it's easy to route that data to Mixpanel. The value of connecting Snowplow and Mixpanel is to enable fast, self-serve product analytics on the events you already collect. In this guide, we share the recommended ways to get events flowing from Snowplow → Mixpanel.


## How Snowplow Works
Snowplow is an open-source, self-hosted platform for collecting and storing event data from your application. Teams use Snowplow's SDKs and platform to exercise full control over event data collection in their own cloud. Snowplow's [event-centric approach](https://docs.snowplowanalytics.com/docs/understanding-your-pipeline/canonical-event/) is fully compatible with Mixpanel; [our infrastructure](https://developer.mixpanel.com/docs/under-the-hood) is also purpose-built to ingest, store, and query events.

Below we show the architecture of a Snowplow pipeline from their [documentation](https://docs.snowplowanalytics.com/docs/understanding-your-pipeline).

![image](/230695089-ad29a224-0f8e-425a-88a5-f34be4600628.png)


## Integrating with Mixpanel
Snowplow's main responsibility is to collect and validate events before storing the events in either:

- A streaming system like Amazon Kinesis, Google PubSub, or ElasticSearch.
- A data lake like Amazon S3 or Google Cloud Storage.

Depending on which of the above destinations you've configured in Snowplow, you can follow our guides for ingesting *from* that destination into Mixpanel. We provide guides for [Amazon S3](/docs/tracking/integrations/s3-import), [Google Cloud Storage](/docs/tracking/integrations/gcs-import), and [Google Pub/Sub](/docs/tracking/integrations/google-pubsub). The process for Kinesis is very similar. Similar to Snowplow itself, these guides run fully in your own cloud and give you granular control over what exactly what gets sent to Mixpanel.

If you're using Snowplow to ingest events directly into a data warehouse like Snowflake or BigQuery, we recommend leveraging our Reverse ETL integrations with [Census](https://www.getcensus.com/integrations/mixpanel) and [HighTouch](https://hightouch.io/integrations/destinations/mixpanel). Reverse ETL tools let you model events using a SQL query and push them to all the tools in your stack, including Mixpanel.

Finally, Mixpanel's [Import API](https://developer.mixpanel.com/reference/import-events) is a simple JSON-over-HTTP API. You can always use any other orchestration tools you have in your stack (Airflow, Dagster, Spark, etc.) to read data produced by Snowplow in your cloud and directly hit our import API to ingest them into Mixpanel.

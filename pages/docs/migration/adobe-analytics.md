# Adobe Analytics

If you haven't already, we recommend starting with our [Migration Guides Overview](/docs/migration/overview) as it details the key components of migrating to Mixpanel from other analytics tools. Below we outline specific steps and considerations when migrating from Adobe Analytics.

## Differences in the data models

Mixpanel’s data model is based on events and properties, rather than Adobe which is schema-based with many different configurable data types. While this might be a shift if you come from the schema model where you define your data to be captured upfront before sending any data, we’ve found [schema-on-read](/docs/how-it-works/infrastructure#schema-on-read) to be both more flexible and easier to set up and use.

- [Events](/docs/what-is-mixpanel#events) capture granular user actions, like a Pageview, Signup, or Purchase.
- [Properties](/docs/what-is-mixpanel#properties) capture attributes of those events, like which page was viewed, the UTM Campaign that led to a Signup, or the Item that was purchased.

Events and properties with schema-on-read let you get more granular than an enforced schema so you can spend your time analyzing data versus formatting it. Mixpanel automatically constructs a schema from the events and properties you send, so you can answer the same questions as before faster and with less development headaches.

## Track forward looking real-time data

Choose your current implementation method for Adobe Analytics and follow the below steps for starting to send live data to Mixpanel.

### Client-side SDKs & Server-side SDKs

You’ll have to setup Mixpanel fresh given Mixpanel leverages an event-based model that does not exist in Adobe Analytics. Depending on your current setup and how you’ve enabled data capture in Adobe, these steps will likely be as if you are starting an [entirely new implementation](/docs/getting-started/plan-your-implementation).

The rest of this guide will cover the Mixpanel JavaScript SDK for brevity, but the steps apply for any of our libraries.

We recommend the following steps to get started quickly:

- Configure the [Mixpanel JavaScript SDK](https://developer.mixpanel.com/docs/javascript-full-api-reference) to automatically track page views, where UTM params are tracked by default
    
    ```
    mixpanel.init('YOUR_TOKEN', {track_pageview: true});
    ```
    
- Track a few key [“value moment” events](/docs/getting-started/plan-your-implementation#value-moment-event) of interest
    
    ```
    // Send a "Played song" event to Mixpanel
    // with a property "genre"
    mixpanel.track(
        "Played song",
        {
            "genre": "hip-hop"
        }
    );
    ```
    
- Use the [Mixpanel Marketing KPI Template](https://mixpanel.com/project?show-template-selector=true) to build your initial board

This will allow you to explore Mixpanel’s capabilities with the lowest amount of lift to see value. The reporting around marketing analytics will also showcase reporting that end users are used to coming over from Adobe Analytics. 

### Customer Data Platforms (CDPs)

CDPs like [Segment](https://segment.com/) have always tracked event data and synthesized them into a specific schema format for Adobe Analytics. You can add Mixpanel as a destination to your CDP and immediately start receiving the same data as your other destinations.

Since CDPs already collect all your data via 1 SDK and route to many downstream destinations, enabling Mixpanel is straightforward. Simply go to your CDP settings and add Mixpanel as a destination:

![Segment Connection](https://user-images.githubusercontent.com/129823695/234812593-dffee962-bb34-49b8-9686-96bc0f0565d8.png)

Once you set up the connection to Mixpanel, you can proceed with configuring key settings like:

- Which events and properties to send → only send what matters
- Edit any mappings/editing/filtering that has to be done on the data → ensure high data quality and governance
- Connection settings, or CDP specific settings for data syncs → control over how data is sent

We provide Mixpanel as a destination and setup guides for all of the most popular CDPs:

- [Segment](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/)
- [mParticle](https://docs.mparticle.com/integrations/mixpanel/audience/)
- [Rudderstack](https://www.rudderstack.com/docs/destinations/streaming-destinations/mixpanel/)

### Data Warehouse

If you have your Adobe Analytics instance sitting on top of data that you collect and store in your data warehouse, getting started is simple. Instead of transforming and modeling that data to send to Adobe, you would model the data as [Events](/docs/data-structure/overview) and send it to Mixpanel via a Reverse ETL (RETL) tool or via directly hitting our [Import API](https://developer.mixpanel.com/reference/import-events).

## Loading historical data

For most cases, we recommend starting fresh when migrating from Adobe Analytics. If you must import Adobe data, we strongly encourage loading historical data into a separate project as data structures, identity management, user cohort definitions, etc. are completely different in Adobe than in Mixpanel. In these scenarios, the point of having historical data in Mixpanel is to allow the team to be able to visualise historical data, but because this data would exist in a separate project, it will not be easy to visualize time period trends. In the cases where historical data is essential, we recommend loading a year’s worth (or less) of historical data during your migration.

To backfill data, we recommend:

- If you have a CDP, this should be straightforward
    - Utilize the CDPs backfilling feature, like [Segment Replay](https://segment.com/docs/guides/what-is-replay/), to re-send historical data to Mixpanel
- For any other implementation method
    - First, export your data to the data warehouse so you have a record of Adobe Analytics
    - Once exported, your data warehouse tables can be transformed and modeled into the [event format](/docs/data-structure/events-and-properties) Mixpanel expects
    - Leverage our [Import API](https://developer.mixpanel.com/reference/import-events) to send us the formatted events from your data warehouse

The process of importing old data with a different format has many potential issues - identity management, data discrepancies, etc. - as Mixpanel is fundamentally different than Adobe Analytics. It may be worth considering your use cases for importing old data before proceeding, as matching users and data across the systems can be time consuming.

For Adobe Analytics specifically, due to the complexity of the data format and the fact it is a specific schema for each customer means we are unable to provide advice for all scenarios without speaking to your team directly.

## Not sure where to start or need help?

If you're unsure how you currently track data, or might want to consider tracking data differently as you migrate to Mixpanel, we recommend starting [here](https://mixpanel.com/blog/guide-to-choosing-your-data-architecture/).

Mixpanel Customer Success and Support have been helping thousands of customers migrate from other tools to Mixpanel over the past decade. You can see an overview of the process we run with our Enterprise plan customers migrating from Adobe Analytics [here](https://mxpnl.notion.site/Adobe-Migration-Package-4035f7e2f62f43adb65e34b23ad14d23?pvs=4).

If you need help, just [reach out here](https://mixpanel.com/get-support) and we'll be ready to assist with advice specific to your situation.

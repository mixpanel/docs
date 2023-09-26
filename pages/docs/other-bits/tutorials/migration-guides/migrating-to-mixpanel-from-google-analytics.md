# Migrating To Mixpanel From Google Analytics

If you haven't already, we recommend starting with our [Migration Guides Overview](/docs/other-bits/tutorials/migration-guides) as it details the key components of migrating to Mixpanel from other analytics tools. Below we outline specific steps and considerations when migrating from Google Analytics.

## Differences in the data models

Mixpanel’s data model is based on events and properties, rather than sessions. While this might be a shift if you come from the sessions-based model, we’ve found it to be both more flexible and easier to set up and use.

- [Events](/docs/what-is-mixpanel#events) capture granular user actions, like a Pageview, Signup, or Purchase.
- [Properties](/docs/what-is-mixpanel#properties) capture attributes of those events, like which page was viewed, the UTM Campaign that led to a Signup, or the Item that was purchased.

Events let you get more granular than [sessions](/docs/analysis/advanced/sessions), so that you can deeply understand user behavior. At the same time, Mixpanel automatically constructs sessions from events, so you can answer session-level questions too.

## Currently using Universal Analytics with Google?

### Track forward looking real-time data

Choose your current implementation method for Universal Analytics (UA) and you can follow the below steps for starting to send live data to Mixpanel.

#### Client-side SDKs & Server-side SDKs
You’ll have to setup Mixpanel fresh given Mixpanel leverages an event-based model that does not exist in Universal Analytics. The good news is you can get started within an hour, which is lesser or equivalent work to setting up GA4 from an SDK perspective, since both need a fresh implementation to be setup on an “events” model vs UA’s “sessions” model.
    
We recommend the following steps to get started quickly:

- Configure the [Mixpanel JavaScript SDK](https://developer.mixpanel.com/docs/javascript-full-api-reference) to automatically track page views, where UTM params are tracked by default

    ```jsx
    mixpanel.init('YOUR_TOKEN', {track_pageview: true});
    ```

- Track a few key conversion events of interest

    ```jsx
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
    
#### Google Tag Manager (GTM)
Mixpanel has a [Google Tag Manager (GTM) custom template](/docs/tracking/integrations/google-tag-manager) which can be leveraged to implement events within an hour. The template initializes the Mixpanel JavaScript SDK with similar calls as outlined in the above section.
    
We recommend setting up the following in the custom template to get started quickly: a) Choose to auto-track pages, b) Set your conversion events. Once done, Mixpanel will start receiving page views and key conversion events.
    
#### Customer Data Platforms (CDPs)
CDPs like [Segment](https://segment.com/) have always tracked event data and synthesized them into sessions for Universal Analytics. You can add Mixpanel as a destination to your CDP and immediately start receiving the same data as your other destinations.
    
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

### Loading historical data

For most cases, we recommend starting fresh when migrating from UA. In the cases where historical data is essential, we recommend loading a year’s worth (or less) of historical data during your migration. This will allow your team to review year-over-year trends easily and do historical analysis as needed.

To backfill data, we recommend:
- If you have a CDP, this should be straightforward
    - Utilize the CDPs backfilling feature, like [Segment Replay](https://segment.com/docs/guides/what-is-replay/), to re-send historical data to Mixpanel
- For any other implementation method
    - First, export your data to the data warehouse so you have a record of Universal Analytics
    - Once exported, your data warehouse tables can be transformed and modeled into the [event format](/docs/how-it-works/events-and-properties) Mixpanel expects
    - Leverage our [Import API](https://developer.mixpanel.com/reference/import-events) to send us the formatted events from your data warehouse

The process of importing old data with a different format has many potential issues - identity management, data discrepancies, etc. - as Mixpanel is fundamentally different than UA. It may be worth considering your use cases for importing old data before proceeding, as matching users and data across the systems can be time consuming. [Mixpanel Support](https://mixpanel.com/get-support) is here to help if you need advice how to go about importing the historical data.

## Currently using GA4 and not seeing value?

### Track forward looking real-time data

Choose your current implementation method for Google Analytics (GA4) and you can follow the below steps for starting to send live data to Mixpanel.

#### Client-side SDKs & Server-side SDKs

Mixpanel and GA4’s client-side SDKs have *very similar* developer facing APIs. This makes it fairly easy to “find and replace” embedded GA4 calls and swap them for Mixpanel calls.
    
This section will detail the Javascript SDKs (for the sake of brevity), although both analytics platforms have fairly uniform tracking APIs for other SDKs (mobile, server-side, etc.)

##### Events

GA4 method

```jsx
gtag('event', 'event_name', {
    'param1': 'value1',
    'param2': 'value2'
});
```

Mixpanel method

```jsx
mixpanel.track('event_name', {
    'param1': 'value1',
    'param2': 'value2'
});
```

##### Identity Management

GA4 method

```jsx
gtag('config', 'GA_MEASUREMENT_ID', {
    'user_id': 'USER_ID'
});
```

Mixpanel method

```jsx
mixpanel.identify('USER_ID');
```

##### User Properties

GA4 method

```jsx
gtag('set', 'user_properties', {
    'property1': 'value1',
    'property2': 'value2'
});
```

Mixpanel method

```jsx
mixpanel.people.set({
    'property1': 'value1',
    'property2': 'value2'
});
```

##### Super Properties

GA4 method → GA4 doesn't have a direct equivalent, but you can set global properties on the SDK config we recommend moving to Mixpanel

```jsx
gtag('config', 'GA_MEASUREMENT_ID', {
    'custom_map': {
        'dimension1': 'property1',
        'dimension2': 'property2'
    },
    'property1': 'value1',
    'property2': 'value2'
});
```

Mixpanel method

```jsx
mixpanel.register({
    'property1': 'value1',
    'property2': 'value2'
});
```

Keep in mind that you will need to initialize the [Mixpanel SDK](https://developer.mixpanel.com/docs/javascript-full-api-reference) by adding the Mixpanel snippet to your website before using these tracking calls. Replace the placeholders (e.g., 'event_name', 'USER_ID', 'value1', etc.) with the appropriate values from GA4 in your code as you migrate the code.
    
#### Google Tag Manager (GTM)

Mixpanel has a [Google Tag Manager (GTM) custom template](/docs/tracking/integrations/google-tag-manager) which can be leveraged to implement events within an hour. Simply load the template, and you can send Mixpanel the same events you’ve setup for your GA4 instance.

This method is straightforward since you’ve already setup your SDK to track “events” and are using Google Tag Manager. You can leverage this same setup to implement Mixpanel.
    
#### Customer Data Platforms (CDPs)

CDPs like [Segment](https://segment.com/) will already be tracking events to GA4 that you want to duplicate to Mixpanel. You can add Mixpanel as a destination to your CDP and immediately start receiving the same data as your other destinations.
    
CDPs like [Segment](https://segment.com/) have always tracked event data and synthesized them into sessions for Universal Analytics. You can add Mixpanel as a destination to your CDP and immediately start receiving the same data as your other destinations.
    
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

### Loading historical data

Given GA4 has a similar data format to Mixpanel, it is possible to migrate some of your historical data to see trends. In the cases where historical data is essential, we recommend loading a year’s worth (or less) of historical data during your migration. This will allow your team to review year-over-year trends easily and do historical analysis as needed.

To backfill data, we recommend:
- If you have a CDP, this should be straightforward
    - Utilize the CDPs backfilling feature, like [Segment Replay](https://segment.com/docs/guides/what-is-replay/), to re-send historical data to Mixpanel
- For any other implementation method
    - First, export your data to the data warehouse so you have a record of Universal Analytics
    - Once exported, your data warehouse tables can be transformed and modeled into the [event format](/docs/how-it-works/events-and-properties) Mixpanel expects
    - Leverage our [Import API](https://developer.mixpanel.com/reference/import-events) to send us the formatted events from your data warehouse

## Not sure where to start or need help?

If you're unsure how you currently track data, or might want to consider tracking data differently as you migrate to Mixpanel, we recommend starting [here](https://mixpanel.com/blog/guide-to-choosing-your-data-architecture/).

Mixpanel Customer Success and Support have been helping thousands of customers migrate from other tools to Mixpanel over the past decade. You can see an overview of the process we run with our Enterprise plan customers migrating from Google Analytics [here](https://mxpnl.notion.site/Google-Analytics-Migration-Package-8020a686880a4caab4dd6653b777892e?pvs=4).

If you need help, just [reach out here](https://mixpanel.com/get-support) and we'll be ready to assist with advice specific to your situation.

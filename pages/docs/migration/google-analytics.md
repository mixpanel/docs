# Google Analytics

If you haven't already, we recommend starting with our [Migration Guides Overview](/docs/migration/overview) as it details the key components of migrating to Mixpanel from other analytics tools. Below we outline specific steps and considerations when migrating from Google Analytics.

## Currently using Google Analytics 4 (GA4) and not seeing value?

### Track forward looking real-time data

Choose your current implementation method for GA4 and you can follow the below steps for starting to send live data to Mixpanel.

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

Mixpanel has a [Google Tag Manager (GTM) custom template](/docs/tracking-methods/integrations/google-tag-manager) which can be leveraged to implement events within an hour. Simply load the template, and you can send Mixpanel the same events you’ve setup for your GA4 instance.

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
- If you don't have a CDP, you can leverage our [Warehouse Connector](/docs/tracking-methods/data-warehouse/overview) to import your GA4 data from Google BigQuery into Mixpanel. Below we outline steps for the migration process.

#### Loading historical data via Mixpanel BigQuery Warehouse Connector 

![image](/ga4_overview.png)

At a high-level, the migration consists of 4 steps:
1. Set up a new Mixpanel project which is on [Simplified ID Merge system](/docs/tracking-methods/identifying-users#simplified-vs-original-id-merge). 
2. Set up GA4 BigQuery Export following the instructions [here](https://support.google.com/analytics/answer/9823238?hl=en#zippy=%2Cin-this-article). 
3. Transform GA4 data in BigQuery.   
4. Set up [Mixpanel Warehouse Connector](/docs/tracking-methods/data-warehouse/overview) to initiate data sync from BigQuery to Mixpanel  

##### GA4 event schema

While GA4 event data model is similar to Mixpanel, its schema in BigQuery is not entirely compatible with Mixpanel and needs to be first transformed before ingesting into Mixpanel. For example, event properties are stored in `event_params`(RECORD data type) in BigQuery. Sending them directly to Mixpanel will result in nested data structure which is not ideal for data analysis. 

##### GA4 user schema 

GA4 exports 2 types of user tables to BigQuery, 
1. `pseudonymous_users_YYYYMMDD` - This table contains only anonymous users updated on the specific day.
2. `users_YYYYMMDD` - This table contains only known users updated on the specific day. 

As [Mixpanel doesn't recommend setting user properties for anonymous users](/docs/tracking-methods/identifying-users#avoid-creating-profiles-for-anonymous-users), you would just need to import the `users_YYYYMMDD` table to Mixpanel (and not the `pseudonymous_users_YYYYMMDD` table). Similar to event properties, user properties are stored in `user_properties`(RECORD data type) in BigQuery, which needs to be transformed into a compatible data stucture before sending them to Mixpanel. 

##### Pre-migration data audit
Before migrating your data to Mixpanel, you should conduct a data audit to quickly identify the key events and properties that you want to migrate over. You can learn more about the importance of pre-migration data audit [here](/docs/migration/overview#data-audit).  

The following SQL queries can be used to conduct a data audit in BigQuery. 

SQL query to return events by volume: 

```jsx
SELECT 
    event_name, 
    COUNT(event_name) AS total_rows
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_20210131` 
GROUP BY event_name
ORDER BY total_rows DESC
```

SQL query to return event properties by volume: 

```jsx
SELECT DISTINCT
    event_name,
    ep.key  AS event_properties,
    COUNT(event_name) as total_rows
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_20210131` , UNNEST(event_params) as ep
GROUP BY event_name, ep.key
ORDER BY event_name ASC
```

SQL query to return sample values of the event properties: 

```jsx
SELECT 
  event_name,
  ep.key,
  COALESCE(ep.value.int_value, ep.value.float_value, ep.value.double_value) AS value
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_20210131`, UNNEST(event_params) AS ep
LIMIT 100
```

SQL query to return user properties by volume: 

```jsx
SELECT 
    up.value.user_property_name AS user_properties, 
    COUNT(up.value.user_property_name) AS total_users
FROM `mixpanel-sa.analytics_406874950.users_20231002` , UNNEST(user_properties) AS up
GROUP BY up.value.user_property_name
```

##### Transforming GA4 data in BigQuery 

You can reference the following SQL queries to transform the event and user tables exported by GA4 so that they are aligned with our Mixpanel data model and our Warehouse Connector. Please note that the SQL queries serve as an example and are not exhaustive. Please check the query against your BigQuery schema to ensure that all required data is mapped accordingly. For example, you may need to add extra SQL lines to `UNNEST` your custom event properties or remove unwanted data mappings. 

Example of how to construct your event table in BigQuery:  

```jsx
SELECT
    -- required fields
    event_name as event,
    TIMESTAMP_MILLIS(CAST(event_timestamp / 1000 as INT)) as time,
    
    -- id mgmt
    user_id as user_id, 
    user_pseudo_id as device_id,

    -- $insert_id
    TO_HEX(SHA1(CONCAT(
    CONCAT('[GA4v4] ', event_name),
    COALESCE(user_pseudo_id, ""), 
    "-",
    CAST(TIMESTAMP_MICROS(event_timestamp) as STRING),
    "-",
    COALESCE(CAST(event_bundle_sequence_id as STRING), "")
    ))) AS insert_id,

    -- $insert_time
    TIMESTAMP_MILLIS(CAST(event_timestamp / 1000 as INT)) as insert_time,

    -- Mixpanel reserved properties
    JSON_OBJECT(
      "mp_country_code", IFNULL(geo.country, ""), 
      "$city", IFNULL(geo.city, ""), 
      "$region", IFNULL(geo.region, ""),
      "$browser", IFNULL(device.web_info.browser, ""),
      "$browser_version", IFNULL(device.web_info.browser_version, ""),
      "$device", IFNULL(device.mobile_model_name, ""), 
      "$current_url", IFNULL((SELECT value.string_value FROM UNNEST(event_params) where key = 'page_location'), ""), 
      "$os", IFNULL(device.operating_system, "")) as mixpanel_reserved_properties,       

    -- GA4 top level defaults
    event_date,
    event_value_in_usd,
    event_previous_timestamp
    event_bundle_sequence_id,
    event_server_timestamp_offset,
    stream_id,
    platform,
    app_info.id as app_info_id,
    app_info.version as app_info_version,
    app_info.install_store as app_info_install_store,
    app_info.firebase_app_id as app_info_firebase_app_id,
    app_info.install_source as app_info_install_source,    
    traffic_source.name as traffic_source_name,
    traffic_source.medium as traffic_source_medium,
    traffic_source.source as traffic_source_source,
    user_ltv.revenue as user_ltv_revenue,
    user_ltv.currency as user_ltv_currency,

    -- demographics
    geo.continent as geo_continent,
    geo.sub_continent as geo_sub_continent,
    geo.country as geo_country,
    geo.region as geo_region,
    geo.metro as geo_metro,
    geo.city as geo_city,

    -- device infos
    device.category as device_category,
    device.mobile_brand_name as device_mobile_brand_name,
    device.mobile_model_name as device_mobile_model_name,
    device.mobile_marketing_name as device_mobile_marketing_name,
    device.mobile_os_hardware_model as device_mobile_os_hardware_model,
    device.operating_system as device_operating_system,
    device.operating_system_version as device_operating_system_version,
    device.vendor_id as device_vendor_id,
    device.advertising_id as device_advertising_id,
    device.language as device_language,
    device.time_zone_offset_seconds as device_time_zone_offset_seconds,
    device.is_limited_ad_tracking as device_is_limited_ad_tracking,
    device.web_info.browser as device_web_info_browser,
    device.web_info.browser_version as device_web_info_browser_version,

    -- ecommerce infos 
    ecommerce.total_item_quantity as ecommerce_total_item_quantity,
    ecommerce.purchase_revenue_in_usd as ecommerce_purchase_revenue_in_usd,
    ecommerce.purchase_revenue as ecommerce_purchase_revenue,
    ecommerce.refund_value_in_usd as ecommerce_refund_value_in_usd,
    ecommerce.refund_value as ecommerce_refund_value,
    ecommerce.shipping_value_in_usd as ecommerce_shipping_value_in_usd,
    ecommerce.shipping_value as ecommerce_shipping_value,
    ecommerce.tax_value_in_usd as ecommerce_tax_value_in_usd,
    ecommerce.tax_value as ecommerce_tax_value,
    ecommerce.unique_items as ecommerce_unique_items,
    ecommerce.transaction_id as ecommerce_transaction_id,

    -- ecommerce items 
    items as cart_items,     

    -- GA4 event_param defaults
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'page_location') as page_location,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'page_referrer') as page_referrer,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'page_title') as page_title,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'language') as language,
    (SELECT COALESCE(value.string_value, CAST(value.float_value as STRING), CAST(value.int_value as STRING), CAST(value.double_value as STRING)) FROM UNNEST(event_params) where key = 'screen_resolution') as screen_resolution,
    (SELECT CAST(value.int_value as STRING) FROM UNNEST(event_params) where key = 'ga_session_number') as ga_session_number,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'session_engaged') as session_engaged,
    (SELECT COALESCE(value.string_value, CAST(value.float_value as STRING), CAST(value.int_value as STRING), CAST(value.double_value as STRING)) FROM UNNEST(event_params) where key = 'entrances') as entrances,
    (SELECT COALESCE(value.string_value, CAST(value.float_value as STRING), CAST(value.int_value as STRING), CAST(value.double_value as STRING)) FROM UNNEST(event_params) where key = 'exits') as exits,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'ignore_referrer') as ignore_referrer,
    (SELECT value.int_value FROM UNNEST(event_params) where key = 'engaged_session_event') as engaged_session_event,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'campaign') as utm_campaign,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'source') as utm_source,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'medium') as utm_medium,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'term') as utm_term,
    (SELECT value.int_value FROM UNNEST(event_params) where key = 'ga_session_id') as ga_session_id,
    (SELECT value.int_value FROM UNNEST(event_params) where key = 'engagement_time_msec') as engagement_time_msec,
    (SELECT value.int_value FROM UNNEST(event_params) where key = 'content') as content,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'unique_search_term') as unique_search_term,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'search_term') as search_term,
    (SELECT value.string_value FROM UNNEST(event_params) where key = 'gclid') as gclid      
  FROM `mixpanel-sa.analytics_406874950.events_intraday_*`   
  WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d',DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)) AND FORMAT_DATE('%Y%m%d',CURRENT_DATE());
```

Example of how to construct your user table in BigQuery:  

```jsx
SELECT 
    user_id, 
    occurrence_date, 
    last_updated_date, 

    -- insert_time
    PARSE_TIMESTAMP('%Y%m%d', _TABLE_SUFFIX) as insert_time, 

    -- Mixpanel reserved properties 
    JSON_OBJECT(
      "$country_code", IFNULL(geo.country, ""), 
      "$city", IFNULL(geo.city, ""), 
      "$region", IFNULL(geo.region, ""),      
      "$device", IFNULL(device.mobile_model_name, ""),       
      "$os", IFNULL(device.operating_system, "")) as mixpanel_reserved_properties,

    -- GA4 defaults
    user_info.last_active_timestamp_micros as user_info_last_active_timestamp_micros,
    user_info.user_first_touch_timestamp_micros as user_info_user_first_touch_timestamp_micros,
    user_info.first_purchase_date as  user_info_first_purchase_date,

    -- device info 
    device.operating_system as device_operating_system,
    device.mobile_brand_name as device_mobile_brand_name,
    device.mobile_model_name as device_mobile_model_name,
    device.category as device_category,  
    device.unified_screen_name as device_unified_screen_name,  
    
    -- demographics
    geo.continent as geo_continent,
    geo.country as geo_country,
    geo.region as geo_region,
    geo.city as geo_city,

    -- GA4 user properties     
    (SELECT value.string_value FROM UNNEST(user_properties) where value.user_property_name = 'favorite_composer') as favorite_composer, 
    (SELECT value.string_value FROM UNNEST(user_properties) where value.user_property_name = 'favorite_instrument') as favorite_instrument, 
    (SELECT value.string_value FROM UNNEST(user_properties) where value.user_property_name = 'season_ticketholder') as season_ticketholder
FROM `mixpanel-sa.analytics_406874950.users_*`
WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d',DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)) AND FORMAT_DATE('%Y%m%d',CURRENT_DATE());
```

##### Setting up BigQuery Warehouse Connectors 
Once you've transformed your data in BigQuery, you can set up the [Mixpanel Warehouse Connector](/docs/tracking-methods/data-warehouse/overview) to migrate your historical data from BigQuery into Mixpanel. We'd recommend first sending a month of data into a test project for validation. 

You can learn more about event mappings [here](/docs/tracking-methods/data-warehouse/sending-events). Here's an example of mappings for event table generated from the SQL query provided above: 

![image](/ga4_event_warehouse_connector.png)

You can learn more about user mappings [here](/docs/tracking-methods/data-warehouse/sending-user-profiles). Here's an example of mappings for user table generated from the SQL query provided above: 

![image](/ga4_user_warehouse_connector.png)

##### Post-migration data validation
You can use our [Lexicon](/docs/data-governance/lexicon) or Events page to check that your data has successfully been ingested. However, if your historical events are older than 30 days, they will not show up on Lexicon, Events page or in the event dropdown menu across all reports. In this case, you can leverage our [Insights report](docs/reports/insights) to validate the historical events, by selecting the import time frame and filtering by the following default properties: 

- Warehouse Import ID (tracked as `$warehouse_import_id`)
- Warehouse Import Job ID (`$warehouse_import_job_id`)
- Import = true (`$import`)
- Source = warehouse-import (`$source`)

Please filter by tracked name, $warehouse_import_id instead of the display name, “Warehouse Import ID”. You can find the properties values on the Warehouse Connector’ sync logs:

![image](/ga4_event_validation.png)

## Currently using Universal Analytics with Google?

### Differences in the data models

Mixpanel’s data model is based on events and properties, rather than sessions. While this might be a shift if you come from the sessions-based model, we’ve found it to be both more flexible and easier to set up and use.

- [Events](/docs/what-is-mixpanel#events) capture granular user actions, like a Pageview, Signup, or Purchase.
- [Properties](/docs/what-is-mixpanel#properties) capture attributes of those events, like which page was viewed, the UTM Campaign that led to a Signup, or the Item that was purchased.

Events let you get more granular than [sessions](/docs/features/sessions), so that you can deeply understand user behavior. At the same time, Mixpanel automatically constructs sessions from events, so you can answer session-level questions too.

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
Mixpanel has a [Google Tag Manager (GTM) custom template](/docs/tracking-methods/integrations/google-tag-manager) which can be leveraged to implement events within an hour. The template initializes the Mixpanel JavaScript SDK with similar calls as outlined in the above section.
    
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

Mixpanel's data model is fundamentally different from UA. As such, the process of importing old data with a different format has many potential issues - identity management, data discrepancies, etc. It may be worth considering your use cases for importing old data before proceeding, as matching users and data across the systems can be time consuming. [Mixpanel Support](https://mixpanel.com/get-support) is here to help if you need advice how to go about importing the historical data.

Consequently, for most cases, we recommend starting fresh when migrating from UA. In the cases where historical data is essential, we recommend loading a year’s worth (or less) of historical data during your migration. This will allow your team to review year-over-year trends easily and do historical analysis as needed.

To backfill data, we recommend:
- If you have a CDP, this should be straightforward
    - Utilize the CDP's backfilling feature, like [Segment Replay](https://segment.com/docs/guides/what-is-replay/), to re-send historical data to Mixpanel
- For any other implementation method
    - First, export your data to the data warehouse so you have a record of Universal Analytics
    - Once exported, your data warehouse tables can be transformed and modeled into the [event format](/docs/data-structure/events-and-properties) Mixpanel expects
    - Leverage our [Import API](https://developer.mixpanel.com/reference/import-events) to send us the formatted events from your data warehouse

## Not sure where to start or need help?

If you're unsure how you currently track data, or might want to consider tracking data differently as you migrate to Mixpanel, we recommend starting [here](https://mixpanel.com/blog/guide-to-choosing-your-data-architecture/).

Mixpanel Customer Success and Support have been helping thousands of customers migrate from other tools to Mixpanel over the past decade. You can see an overview of the process we run with our Enterprise plan customers migrating from Google Analytics [here](https://mxpnl.notion.site/Google-Analytics-Migration-Package-8020a686880a4caab4dd6653b777892e?pvs=4).

If you need help, just [reach out here](https://mixpanel.com/get-support) and we'll be ready to assist with advice specific to your situation.

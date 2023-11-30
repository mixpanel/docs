# Google Analytics 4 (GA4) 
## Google Analytics 4 (GA4) Event Schema
Use the following SQL query to transform your GA4 data into individual columns that will be mapped as properties on your events when setting up your warehouse sync: 

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
  FROM `project.dataset.tablename`   
  WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d',DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)) AND FORMAT_DATE('%Y%m%d',CURRENT_DATE());
```

## Google Analytics 4 (GA4) User Schema
Use the following SQL query to transform your GA4 data into individual columns that will be mapped as user properties when setting up your warehouse sync.
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
FROM `project.dataset.tablename`
WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d',DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)) AND FORMAT_DATE('%Y%m%d',CURRENT_DATE());
```

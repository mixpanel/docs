# Property Reference

## Property Types
Properties are attributes that help you define the specifics of an **Event**, a **User**, or a **Group**.
Mixpanel has many Properties defined in its Data Model.

| Property Type | Description |
| ------------- | ----------- |
| [Event Properties](/docs/data-structure/events-and-properties) | Event Properties describes the events that are tracked within your product. |
| [Super Properties](/docs/tracking-methods/sdks/javascript#super-properties) | Super Properties are a logical term for global Event Property that you can initialise to automatically attach to every subsequent Event you’re tracking at client side. |
| [User Profile Properties](/docs/data-structure/user-profiles) | User Profile Properties describe your users (they typically store current demographical information). User profiles are joined to events based on [Distinct ID](/docs/tracking-methods/identifying-users#what-is-distinct-id). |
| [Group Profile Properties](/docs/data-structure/advanced/group-analytics#group-profiles) | Group Profile Properties describe group level information (similar to User Profiles Properties at user level). With Mixpanel’s [Group Analytics](/docs/data-structure/advanced/group-analytics), multiple users can be grouped and behavioural data analysed at a customised group level (such as company, account). Group profiles are joined to events on your chosen [Group Key](/docs/data-structure/advanced/group-analytics#group-keys-tracked-as-event-properties). |
| [Lookup Tables](/docs/data-structure/lookup-tables) | Lookup Tables allow you to dynamically extend additional properties mapped to an existing Event or User Property. For example, if you create a lookup table for "Songs" (with additional properties like `hash_tags`, `top_10`, `all_time_favorite`) and specify the mapped event property as `song_id`; you can use these additional properties when doing filtering or breakdowns for events that has `song_id` as an event property. |
| [Default Properties](/docs/data-structure/property-reference#default-properties) | Default Properties (for Events and User Profiles) are collected and populated with values automatically in Mixpanel. This can happen upon data ingestion or when using certain Mixpanel client-side SDKs. Typically, they have a dollar sign ($) or “mp\_” as prefix to distinguish them from normal properties. |
| Reserved Properties | Mixpanel reserves certain property names (for [Events](/docs/data-structure/events-and-properties#reserved-event-properties) and [User Profiles](/docs/data-structure/user-profiles#reserved-user-properties)) for special use cases, and these may or may not be automatically populated with values. The purpose of such Reserved Properties are for processing (ie event time stamping) or for specific system features (eg: cohort exports). Examples: `time`, `$email`, `$phone`, `$name`, `$created`. |
 
## Default Properties
Mixpanel's Data Ingestion APIs and client-side SDKs ([JavaScript](/docs/tracking-methods/sdks/javascript), [iOS - Objective-C](/docs/tracking-methods/sdks/ios), [iOS - Swift](/docs/tracking-methods/sdks/swift), and [Android](/docs/tracking-methods/sdks/android).) automatically collect certain properties on every event or user profile. This document describes what those properties mean.

### Ingestion APIs
#### Event Properties

| Raw Name | Display Name | Description |
| $city | City | The city of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| mp_country_code | Country | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $mp_api_endpoint | API Endpoint | Mixpanel property to record the API endpoint the data was sent to:
api.mixpanel.com - Mixpanel's default ingestion service
api-eu.mixpanel.com - Mixpanel's EU data ingestion service
api-js.mixpanel.com - Mixpanel's data ingestion for the Javascript SDK |
| $mp_api_timestamp_ms | API Timestamp | UTC timestamp in milliseconds when the event was received by our API. |
| mp_processing_time_ms | Time Processed (UTC) | UTC timestamp in milliseconds when the event was processed by Mixpanel servers. |

#### User Properties

| Raw Name | Display Name | Description |
| $city | City | The city of the user parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the user parsed from the IP property or the Latitude and Longitude properties. |
| $country_code | Country Code | The country of the user parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $geo_source | Geo Source | Set to "reverse_geocoding" if profile location properties (Country, Region, and City) were determined through [Latitude and Longitude](/docs/best-practices/server-side-best-practices#tracking-geolocation-latitude-and-longitude). |
| $timezone | Timezone | Timezone of the user parsed from the IP property or the Latitude and Longitude properties. |
| $last_seen | Updated at | The last time a user profile property was set or updated (this should not be set manually). |


### Web
#### Event Properties

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $city | City | The city of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| mp_country_code | Country | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $browser | Browser | Name of the browser. |
| $browser_version | Browser Version | Version of the browser. |
| $device | Device | Name of the event sender’s device, if they’re on mobile web. |
| $device_id | Device ID | Autogenerated ID that is local to the device. Calling `reset()` resets this. |
| $user_id | User ID | The identified ID of the user. Calling `identify()` sets this. |
| $current_url | Current URL | The URL of the page on which the event was tracked. |
| $initial_referrer | Initial Referrer | Referring URL when the user first arrived on your site. Defaults to "$direct" if the user is not referred. |
| $initial_referring_domain | Initial Referring Domain | Referring domain at first arrival. Defaults to "$direct" if the user is not referred. |
| $os | Operating System | OS of the event sender. |
| mp_lib | Mixpanel Library | The Mixpanel library that sent the event. |
| $referrer | Referrer | Referring URL including your own domain. Might not be present if `document.referrer` does not return a value. As opposed to `$initial_referrer` and `$initial_referring_domain`, this property will be omitted if the user lands directly or the referring website adds the rel="noreferrer" parameter. |
| $referring_domain | Referring Domain | Referring domain including your own domain. Might not be present if `document.referrer` does not return a value. As opposed to `$initial_referrer` and `$initial_referring_domain`, this property will be omitted if the user lands directly or the referring website adds the rel="noreferrer" parameter. |
| $screen_height | Screen Height | The height of the device screen in pixels. |
| $screen_width | Screen Width | The width of the device screen in pixels. |
| $search_engine | Search Engine | The search engine that the customer used when they arrived at your domain. |
| mp_keyword | Search Keyword | Search keywords detected on the referrer from a search engine to your domain. This property is only collected when search keywords are included in a URL. |
| utm_source, utm_medium, etc. | UTM Parameters | UTM tags derived from the URL a customer clicked to arrive at your domain. Each utm will be collected under its own property. |
| mp_processing_time_ms | Processing Time | UTC timestamp of when the event was processed by our servers. |
| $mp_api_timestamp_ms | API Timestamp | Time at which the event was received by our API. |
| $insert_id | Insert ID | A unique identifier for the event, used to deduplicate events that are accidentally sent multiple times. |

#### User Properties

Do note that Mixpanel's default user properties are only updated when you send or update at least one property yourself.
Please, refer to this article to [understand how to send or update profile properties](/docs/how-it-works/concepts#user-profiles).

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $city | City | The city of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $country_code | Country Code | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $geo_source | Geo Source | This defines the method used to establish the location properties on that same entity. Location properties include Country, Region, and City. |
| $timezone | Timezone | Timezone of the event sender, parsed from IP. |
| $browser | Browser | Name of the browser. |
| $browser_version | Browser Version | Version of the browser. |
| $initial_referrer | Initial Referrer | Referring URL when the user first arrived on your site. Defaults to "$direct" if the user is not referred. |
| $initial_referring_domain | Initial Referring Domain | Referring domain at first arrival. Defaults to "$direct" if the user is not referred. |
| $os | Operating System | OS of the event sender. |
| $mp_api_timestamp_ms | API Timestamp | Time at which the event was received by our API. |
| $last_seen | Updated at | The last time a user profile property was set or updated (this should not be set manually). |


### iOS

#### Event Properties

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $city | City | The city of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| mp_country_code | Country | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $device_id | Device ID | Autogenerated ID that is local to the device. Calling `reset()` resets this. |
| $user_id | User ID | The identified ID of the user. Calling `identify()` sets this. |
| mp_lib | Mixpanel Library | The Mixpanel library that sent the event. |
| $app_build_number | App Build Number | General build of the app. |
| $app_version_string | App Version | Current app version. |
| $carrier | Carrier | Wireless carrier of the device owner. |
| $ios_version | iOS Version | Current version of iOS on the device. |
| $lib_version | Lib Version | Mixpanel library version. |
| mp_lib | Mixpanel Library | Mixpanel Library that sent the event. |
| $model | Model | Device model ID, in format "iPad 3,4".  |
| $os | Operating System | OS of the event sender. |
| $radio | Radio | Current https://www.objc.io/issues/5-ios7/iOS7-hidden-gems-and-workarounds/#know-your-radio (3G, 4G, LTE, etc.). |
| $screen_height | Screen Height | Height, in points, of the device screen. |
| $screen_width | Screen Width | Width, in points, of the device screen. |
| $wifi | Wifi | Set to true if the user’s device has an active, available Wifi connection, false if not. |
| mp_processing_time_ms | Processing Time | UTC timestamp of when the event was processed by our servers. |
| $mp_api_timestamp_ms | API Timestamp | Time at which the event was received by our API. |
| $insert_id | Insert ID | A unique identifier for the event, used to deduplicate events that are accidentally sent multiple times. |

#### User Properties

Do note that Mixpanel's default user properties are only updated when you send or update at least one property yourself.
Please, refer to this article to [understand how to send or update profile properties](/docs/how-it-works/concepts#user-profiles).

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $city | City | The city of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $country_code | Country Code | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $geo_source | Geo Source | This defines the method used to establish the location properties on that same entity. Location properties include Country, Region, and City. |
| $timezone | Timezone | Timezone of the event sender, parsed from IP. |
| $os | Operating System | OS of the event sender. |
| $mp_api_timestamp_ms | API Timestamp | Time at which the event was received by our API. |
| $ios_app_release | iOS App Release | General build of this app |
| $ios_app_version | iOS App Version | Full detail of this app build. |
| $ios_device_model | iOS Device Model | Device model ID, in format "iPad 3,4" |
| $last_seen | Updated at | The last time a user profile property was set or updated (this cannot be set manually). |
| Total App Sessions | Total App Sessions | The total number of “App Session” events that the user has sent. |
| Total App Session Length | Total App Session Length | The total number of seconds that a user has spent using the app. This is calculated by adding the "Duration" property attached to the "App Session" event. |
| First App Open Date | First App Open Date | The date the app was first opened on a user’s device. |


### Android

#### Event Properties

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $city | City | The city of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| mp_country_code | Country | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $device_id | Device ID | Autogenerated ID that is local to the device. Calling `reset()` resets this. |
| $user_id | User ID | The identified ID of the user. Calling `identify()` sets this. |
| mp_lib | Mixpanel Library | The Mixpanel library that sent the event. |
| $app_build_number | App Build Number | General build of this app. |
| $app_version_string | App Version | Current app version. |
| $bluetooth_enabled | Bluetooth | True if bluetooth is enabled. |
| $bluetooth_version | Bluetooth Version | "none", "ble", or "classic". |
| $brand | Brand | Device brand. |
| $carrier | Carrier | Wireless carrier of the device owner. |
| $google_play_services | Google Play Services | True if Google Play Services is installed and enabled on the device. |
| $has_nfc | Has NFC | True if device has NFC functionality. |
| $has_telephone | Has Telephone | True if device has telephone functionality. |
| $ios_version | iOS Version | Current version of iOS on the device. |
| $lib_version | Lib Version | Mixpanel library version. |
| mp_lib | Mixpanel Library | Mixpanel Library that sent the event. |
| $manufacturer | Manufacturer | Device manufacturer. |
| $model | Model | Device model ID, in format "iPad 3,4".  |
| $os | Operating System | OS of the event sender. |
| $radio | Radio | Current https://www.objc.io/issues/5-ios7/iOS7-hidden-gems-and-workarounds/#know-your-radio (3G, 4G, LTE, etc.). |
| $screen_dpi | Screen DPI | Pixel density of the screen. |
| $screen_height | Screen Height | Height, in pixels, of the device screen. |
| $screen_width | Screen Width | Width, in pixels, of the device screen. |
| $wifi | Wifi | Set to true if user’s device has an active, available Wifi connection, false if not. |
| mp_processing_time_ms | Processing Time | UTC timestamp of when the event was processed by our servers. |
| $mp_api_timestamp_ms | API Timestamp | Time at which the event was received by our API. |
| $insert_id | Insert ID | A unique identifier for the event, used to deduplicate events that are accidentally sent multiple times. |

#### User Properties

Do note that Mixpanel's default user properties are only updated when you send or update at least one property yourself.
Please, refer to this article to [understand how to send or update profile properties](/docs/how-it-works/concepts#user-profiles).

| Raw Name | Display Name | Description |
| --- | --- | --- |
| $city | City | The city of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $country_code | Country Code | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $geo_source | Geo Source | This defines the method used to establish the location properties on that same entity. Location properties include Country, Region, and City. |
| $timezone | Timezone | Timezone of the event sender, parsed from IP. |
| $android_app_version_code | Android App Version Code | Current app version. |
| $android_app_version | Android App Version | Current app version. |
| $android_lib_version | Android Lib Version | Version of Mixpanel library. |
| $android_os_version | Android OS Version | Current Android version for this device. |
| $android_brand | Android Brand | Device brand. |
| $android_model | Android Model | Device model. |
| $android_manufacturer | Android Manufacturer | Device model. |
| $last_seen | Updated at | The last time a user profile property was set or updated (this cannot be set manually). |

## Supported Data Types

Mixpanel supports five [data types](https://help.mixpanel.com/hc/en-us/articles/115004547063) for properties: String, Numeric, Boolean, Date and List. By choosing the most suitable data type for your properties, you'd be able to apply a set of [operators](https://help.mixpanel.com/hc/en-us/articles/115004547063#data-type-operators) that are most relevant to your properties in Mixpanel reports, and this will give you richer insights about your data.

### String

- Alphanumeric value e.g. Plan Type = "Free", Artist Name = "Bruno Mars"
- String properties have a character limit of 255 bytes.
- Mixpanel will treat any property value that doesn’t match any other data type as a String.

### Numeric

- Numeric (integer or decimal) value e.g. Cost = 15.00, Quantity = 5
- You can apply operators such as sum, median and percentile on numeric properties.

### Boolean

- Mixpanel treats properties as boolean if the value is either the JSON constant `true` or `false` e.g. Favorited = true, Bookmarked = false.
- On Mixpanel, you can typecast any non-boolean property to boolean,
- "false", 0, null, undefined, and empty string will be typecasted to boolean `false`
- "true" and any set value that is not 0 or empty string will be typecasted to boolean `true`

### Date

- An ISO formatted date `YYYY-MM-DDTHH:MM:SS` in UTC e.g. Last Purchase = "2022-10-30T13:30:25", Last Login = "2022-10-29". Note that all timestamps need to be sent in UTC timezone in an ISO format.
- Mixpanel treats unix timestamps as Numeric property, however, you can typecast it to Date data type.

### List

- A list of values as a JSON array e.g Favourite Genres = ["Folk","Alternative"] or Favourite Numbers = [1,5,10.0]
- Limits of a List property: Event Property = 8KB, User Profile Property = 256KB, Each item in the list: 255 bytes
- Mixpanel lists are not ordered (i.e. position of values in a list are not significant in Mixpanel reports) and are useful for grouping or analysing similar values across events. Read more details on [List Property Support](/docs/features/advanced#list-property-support) in reports.

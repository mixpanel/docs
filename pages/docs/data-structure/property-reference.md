# Property Reference

## Property Types
Properties are attributes that help you define the specifics of an **Event**, a **User**, or a **Group**.
Mixpanel has many Properties defined in its Data Model.

| **Property Type** | **Description** |
| ----------------- | --------------- |
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

| **Raw Name** | **Display Name** | **Description** |
| ------------ | ---------------- | --------------- |
| $city | City | The city of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the event sender parsed from the IP property or the Latitude and Longitude properties. |
| mp_country_code | Country | The country of the event sender parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $mp_api_endpoint | API Endpoint | Mixpanel property to record the API endpoint the data was sent to: <br /> **api.mixpanel.com** - default ingestion <br /> **api-eu.mixpanel.com** - EU data ingestion <br /> **api-js.mixpanel.com** - Javascript SDK |
| $mp_api_timestamp_ms | API Timestamp | UTC timestamp in milliseconds when the event was received by our API. |
| mp_processing_time_ms | Time Processed (UTC) | UTC timestamp in milliseconds when the event was processed by Mixpanel servers. |

#### User Properties

Do note that Mixpanel's default user properties are only updated when you send or update at least one property yourself.
Please, refer to this article to [understand how to send or update profile properties](/docs/data-structure/user-profiles).

| **Raw Name** | **Display Name** | **Description** |
| ------------ | ---------------- | --------------- |
| $city | City | The city of the user parsed from the IP property or the Latitude and Longitude properties. |
| $region | Region | The region (state or province) of the user parsed from the IP property or the Latitude and Longitude properties. |
| $country_code | Country Code | The country of the user parsed from the IP property or the Latitude and Longitude properties. The value is stored as a 2-letter country code in the raw data and parsed into the country name in the UI. |
| $geo_source | Geo Source | Set to "reverse_geocoding" if profile location properties (Country, Region, and City) were determined through [Latitude and Longitude](/docs/best-practices/server-side-best-practices#tracking-geolocation-latitude-and-longitude). |
| $timezone | Timezone | Timezone of the user parsed from the IP property or the Latitude and Longitude properties. |
| $last_seen | Updated at | The last time a user profile property was set or updated (this should not be set manually). |


### Client-side SDKs
#### Event Properties

| **Raw Name** | **Display Name** | **Description** | **[JavaScript](/docs/tracking-methods/sdks/javascript)** | **[Android](/docs/tracking-methods/sdks/android)** | **iOS [Objective-C](/docs/tracking-methods/sdks/ios) / [Swift](/docs/tracking-methods/sdks/swift)** | **[Unity](/docs/tracking-methods/sdks/unity)** | 
| -------- | ------------ | ----------- | :-----------: | :-----------: | :-----------: | :-----------: |
| $device_id | Device ID | Autogenerated ID that is local to the device. Calling reset() resets this. More details [here](/docs/tracking-methods/identifying-users). |  ✅ | ✅ | ✅ | ❌ |

#### User Properties

Do note that Mixpanel's default user properties are only updated when you send or update at least one property yourself.
Please, refer to this article to [understand how to send or update profile properties](/docs/data-structure/user-profiles).


## Supported Data Types

Mixpanel supports five data types for properties: String, Numeric, Boolean, Date and List. By choosing the most suitable data type for your properties, you'd be able to apply a set of operators that are most relevant to your properties in Mixpanel reports, and this will give you richer insights about your data.

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

Note: Mixpanel also supports object and [list of objects](https://docs-git-kurbycchua-update-property-reference-mixpanel.vercel.app/docs/features/advanced#list-of-objects-property-support) data types for specific use cases like in e-commerce. It is highly encourage that you use the five primary data types as they are fully supported in the Mixpanel UI.

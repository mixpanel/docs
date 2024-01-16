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
| [Lookup Tables](/docs/data-structure/lookup-tables) | Lookup Tables allow you to dynamically extend additional properties mapped to an existing Event or User Property. For example, if you create a lookup table for "Songs" (that contains additional properties like `hash_tags`, `top_10`, `all_time_favorite`) and map it to an event property `song_id`; you can use these additional properties when doing filtering or breakdowns for events that has `song_id` as an event property. |
| [Default Properties](/docs/data-structure/property-reference#default-properties) | Default Properties (for Events and User Profiles) are collected and populated with values automatically in Mixpanel. This can happen upon data ingestion or when using certain Mixpanel client-side SDKs. Typically, they have a dollar sign ($) or “mp\_” as prefix to distinguish them from normal properties. |
| Reserved Properties | Mixpanel reserves certain property names (for [Events](/docs/data-structure/events-and-properties#reserved-event-properties) and [User Profiles](/docs/data-structure/user-profiles#reserved-user-properties)) for special use cases, and these may or may not be automatically populated with values. The purpose of such Reserved Properties are for processing (ie event time stamping) or for specific system features (eg: cohort exports). Examples: `time`, `$email`, `$phone`, `$name`, `$created`. |
 
## Default Properties
Mixpanel's [Data Ingestion APIs](https://developer.mixpanel.com/reference/ingestion-api) and [Client-Side SDKs](/docs/tracking-methods/choosing-the-right-method#client-side-tracking) automatically collect certain properties on every event or user profile. Do also note that some Customer Data Platforms (CDPs) that integrate with Mixpanel may also map their own properties to Mixpanel default properties. This document describes what those properties mean.

### Ingestion APIs

To disable capturing of geolocation properties (i.e. City, Region, Country) refer to the respective SDKs or API documentation. For a quick reference, refer to examples on [disabling geolocation on client-side SDKs](/docs/privacy/protecting-user-data#disabling-geolocation) and [server-side best practice on tracking geolocation](/docs/best-practices/server-side-best-practices#tracking-geolocation-http-api).

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
| $geo_source | Geo Source | Set to "reverse_geocoding" if profile geolocation properties (Country Code, Region, and City) were determined through [Latitude and Longitude](/docs/best-practices/server-side-best-practices#tracking-geolocation-latitude-and-longitude). |
| $timezone | Timezone | Timezone of the user parsed from the IP property or the Latitude and Longitude properties. |
| $last_seen | Updated at | The last time a user profile property was set or updated **(this should not be set manually)**. Passing `$ignore_time` as `true`, typically for server-side updates, will skip updating the $last_seen property. See example [here](/docs/tracking-methods/sdks/php#setting-profile-properties). |


### Client-side SDKs

Note that the following SDKs wrap around our other SDKs; and as such, would also inherit the appropriate default properties from these wrapped SDKs indicated in the tables below:
- [React Native](/docs/tracking-methods/sdks/react-native) wraps around Android and Swift SDK; `mp_lib` will be set to `react-native` with `$lib_version` set as React Native's library version.
- [Flutter](/docs/tracking-methods/sdks/flutter) wraps around Javscript, Android, and Swift SDK; `mp_lib` will be set to `flutter` with `$lib_version` set as the Flutter's library version.

#### Event Properties

| **Raw Name** | **Display Name** | **Description** | **[Javascript](/docs/tracking-methods/sdks/javascript)** | **[Android](/docs/tracking-methods/sdks/android)** | **iOS [Objective-C](/docs/tracking-methods/sdks/ios) / [Swift](/docs/tracking-methods/sdks/swift)** | **[Unity](/docs/tracking-methods/sdks/unity)** | 
| -------- | ------------ | ----------- | :-----------: | :-----------: | :-----------: | :-----------: |
| $device_id | Device ID | Autogenerated ID that is local to the device. Calling reset() resets this. More details [here](/docs/tracking-methods/identifying-users). | ✅ | ✅ | ✅ | ❌ |
| $user_id | User ID | The identified ID of the user. Calling identify() sets this. More details [here](/docs/tracking-methods/identifying-users). | ✅ | ✅ | ✅ | ❌ |
| $insert_id | Insert ID | A unique identifier for the event, used to deduplicate events that are accidentally sent multiple times. More details [here](https://developer.mixpanel.com/reference/import-events#propertiesinsert_id). | ✅ | ✅ | ✅ | ✅ | 
| mp_lib | Mixpanel Library | The Mixpanel library that sent the event. | `web` | `android` | `iphone` / `swift` | `unity` |
| $lib_version | Library Version | Mixpanel library version. | ✅ | ✅ | ✅ | ✅ | 
| mp_sent_by_lib_version | Sent By Library Version | Mixpanel library version used to send data (not necessarily the same as the version which enqueued the data). | ✅ | ❌ | ❌ | ❌ | 
| $os | Operating System | OS of the event sender. | ✅ | ✅ | ✅ | ✅ |
| $os_version | OS Version | The current version of operating system on the device. | ❌ | ✅ | ✅ | ✅ |
| $browser | Browser | Name of the browser. | ✅ | ❌ | ❌ | ❌ | 
| $browser_version | Browser Version | Version of the browser. | ✅ | ❌ | ❌ | ❌ | 
| $app_build_number | App Build Number | General build of the app. | ❌ | ✅ | ✅ | ❌ |
| $app_version_string | App Version | Current app version. | ❌ | ✅ | ✅ | ✅ |
| $device | Device | Name of the event sender’s device, if they’re on mobile web. | ✅ | ❌ | ❌ | ✅ |
| $screen_height | Screen Height | The height of the device screen in pixels / points (iOS). | ✅ | ✅ | ✅ | ✅ | 
| $screen_width | Screen Width | The width of the device screen in pixels / points (iOS). | ✅ | ✅ | ✅ | ✅ | 
| $screen_dpi | Screen DPI | Pixel density of the device screen. | ❌ | ✅ | ❌ | ✅ | 
| $current_url | Current URL | The URL of the page on which the event was tracked. | ✅ | ❌ | ❌ | ❌ | 
| $initial_referrer | Initial Referrer | Referring URL when the user first arrived on your site. Defaults to "$direct" if the user is not referred. | ✅ | ❌ | ❌ | ❌ | 
| $initial_referring_domain | Initial Referring Domain | Referring domain at first arrival. Defaults to "$direct" if the user is not referred. | ✅ | ❌ | ❌ | ❌ | 
$referrer | Referrer | Referring URL including your own domain. Might not be present if document.referrer does not return a value. As opposed to \$initial_referrer and \$initial_referring_domain, this property will be omitted if the user lands directly or the referring website adds the rel="noreferrer" parameter. | ✅ | ❌ | ❌ | ❌ | 
| $referring_domain | Referring Domain | Referring domain including your own domain. Might not be present if document.referrer does not return a value. As opposed to \$initial_referrer and \$initial_referring_domain, this property will be omitted if the user lands directly or the referring website adds the rel="noreferrer" parameter. | ✅ | ❌ | ❌ | ❌ | 
| $search_engine | Search Engine | The search engine that the customer used when they arrived at your domain. | ✅ | ❌ | ❌ | ❌ |
| mp_keyword | Search Keyword | Search keywords detected on the referrer from a search engine to your domain. This property is only collected when search keywords are included in a URL. | ✅ | ❌ | ❌ | ❌ |
| utm_source, utm_medium, etc. | UTM Parameters | UTM tags derived from the URL a customer clicked to arrive at your domain. Each UTM will be collected under its own property. More details [here](/docs/tracking-methods/sdks/javascript#tracking-utm-parameters). | ✅ | ❌ | ❌ | ❌ |
| $manufacturer | Manufacturer | Device manufacturer. | ❌ | ✅ | ✅ | ✅ |
| $brand | Brand | Device brand. | ❌ | ✅ | ❌ | ❌ |
| $model | Model | The model of the device. | ❌ | ✅ | ✅ | ✅ |
| $carrier | Carrier | Wireless carrier of the device owner. | ❌ | ✅ | ✅ | ❌ | 
| $radio | Radio | Current [cellular network communication standard](https://www.objc.io/issues/5-ios7/iOS7-hidden-gems-and-workarounds/#know-your-radio)(opens in a new tab) (3G, 4G, LTE, etc). | ❌ | ✅ | ✅ | ✅ | 
| $wifi | Wifi | Set to true if the user’s device has an active, available Wifi connection, false if not. | ❌ | ✅ | ✅ | ✅ | 
| $bluetooth_enabled | Bluetooth | Set to true if Bluetooth is enabled, false if not. | ❌ | ✅ | ❌ | ❌ | 
| $bluetooth_version | Bluetooth Version | Set to "none", "ble", or "classic". | ❌ | ✅ | ❌ | ❌ | 
| $has_nfc | Has NFC | Set to true if Near Field Communication is being used, false if not. | ❌ | ✅ | ❌ | ❌ | 
| $has_telephone | Has Telephone | Set to true if this device has telephone functionality, false if not. | ❌ | ✅ | ❌ | ❌ | 
| $google_play_services | Google Play Services | Verifies that Google Play services is installed and enabled on this device, and that the version installed on this device is no older than the one required by this client. | ❌ | ✅ | ❌ | ❌ | 

#### User Properties

Do note that Mixpanel's default user properties are only updated when you send or update at least one property yourself.
Please, refer to this article to [understand how to send or update profile properties](/docs/data-structure/user-profiles).

| **Raw Name** | **Display Name** | **Description** | **[Javascript](/docs/tracking-methods/sdks/javascript)** | **[Android](/docs/tracking-methods/sdks/android)** | **iOS [Objective-C](/docs/tracking-methods/sdks/ios) / [Swift](/docs/tracking-methods/sdks/swift)** | **[Unity](/docs/tracking-methods/sdks/unity)** | 
| -------- | ------------ | ----------- | :-----------: | :-----------: | :-----------: | :-----------: |
| $lib_version | Library Version | Last used Mixpanel library version (also applies to React Native and Flutter wrapper SDKs). | ❌ | ❌ | ❌ | ✅ |
| $android_lib_version | Android Lib Version | Last used Mixpanel Android / Unity library version. | ❌ | ✅ | ❌ | ✅ |
| $ios_lib_version | iOS Lib Version | Last used Mixpanel iOS / Unity library version. | ❌ | ❌ | ✅ | ✅ |
| $swift_lib_version | Swift Lib Version | Last used Mixpanel Swift library version. | ❌ | ❌ | ✅ | ❌ |
| $os | Operating System | Last OS of the event sender. | ✅ | ✅ | ✅ | ✅ |
| $android_os | Android OS | Set when Android operating system was used. | ❌ | ✅ | ❌ | ✅ |
| $android_os_version | Android OS Version | Last version of Android on the device. | ❌ | ✅ | ❌ | ✅ |
| $ios_version | iOS Version | Last version of iOS on the device. | ❌ | ❌ | ✅ | ✅ |
| $browser | Browser | Name of the browser. | ✅ | ❌ | ❌ | ❌ | 
| $browser_version | Browser Version | Version of the browser. | ✅ | ❌ | ❌ | ❌ | 
| $android_app_version | Android App Version | Current Android app version ([versionName](https://developer.android.com/studio/publish/versioning)). | ❌ | ✅ | ❌ | ✅ |
| $android_app_version_code | Android App Version Code | Current Android app version code ([versionCode](https://developer.android.com/studio/publish/versioning)). | ❌ | ✅ | ❌ | ❌ |
| $ios_app_release | iOS App Release | The release or version number of the iOS app ([CFBundleShortVersionString](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleshortversionstring)). | ❌ | ❌ | ✅ | ✅ |
| $ios_app_version | iOS App Version | The version of the build that identifies an iteration of the iOS app ([CFBundleVersion](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleversion)). | ❌ | ❌ | ✅ | ❌ |
| $initial_referrer | Initial Referrer | Referring URL when the user first arrived on your site. Defaults to "$direct" if the user is not referred. | ✅ | ❌ | ❌ | ❌ | 
| $initial_referring_domain | Initial Referring Domain | Referring domain at first arrival. Defaults to "$direct" if the user is not referred. | ✅ | ❌ | ❌ | ❌ | 
| initial_utm_source, initial_utm_medium, etc. | Initial UTM Parameters | UTM tags seen for the first time from the URL a customer clicked to arrive at your domain. Each UTM will be collected under its own property. More details [here](/docs/tracking-methods/sdks/javascript#tracking-utm-parameters). | ✅ | ❌ | ❌ | ❌ |
| $android_manufacturer | Android Manufacturer | Android device manufacturer. | ❌ | ✅ | ❌ | ❌ |
| $android_brand | Android Brand | Android device brand. | ❌ | ✅ | ❌ | ❌ |
| $android_model | Android Model | The model of the Anroid device. | ❌ | ✅ | ❌ | ✅ |
| $ios_device_model | iOS Device Model | The model of the iOS device. | ❌ | ❌ | ✅ | ✅ |

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

## Object and List of Objects Data Types

Mixpanel also supports object and [list of objects](https://docs-git-kurbycchua-update-property-reference-mixpanel.vercel.app/docs/features/advanced#list-of-objects-property-support) data types in a limited capacity. These are typically for very specific use cases such as in e-commerce (eg Cart Items, Search Filters). It is highly encouraged that you use the five primary data types as they are fully supported in the Mixpanel UI.

### Object

- Arbitrarily-nested groups of JSON key-value pairs e.g. Experiments = {"Exp Onboarding":"Quick","Exp Checkout":"Without Coupon"}
- Limits of a Object property: Event Property = 8KB, User Profile Property = 256KB, max 255 keys per nested object with a max nesting depth of 3
- Mainly supported in core reports (i.e. Insights, Funnels, Flows, Retention, Users / Cohorts, Events) as filters and breakdowns. Property Names (ie keys) within an object are not supported in Lexicon.

### List of Objects

- A JSON array of 1 level JSON objects with each object having similar set of key-value pairs e.g. Cart = [{"Brand":"Puma","Category":"Jacket","Price":30}, {"Brand":"Adidas","Category":"Hats","Price":15}]
- Limits of a List of Objects: Event Property = 8KB, User Profile Property = 256KB, max 255 keys and no nesting
- By default, only the first 5 objects within the list will be parsed in Mixpanel UI, more details [here](/docs/features/advanced#limits-1).
- Mainly supported in core reports (i.e. Insights, Funnels, Flows, Retention, Users / Cohorts, Events) as filters and breakdowns. Property Names (ie keys) within an object are not supported in Lexicon.

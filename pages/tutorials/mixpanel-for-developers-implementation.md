## Implement via the Mixpanel SDK
[Implement via the Mixpanel SDK](https://www.loom.com/share/659097217a0c41d189b67f47356d3831)

## Initialise SDK
[Initialise SDK](https://www.loom.com/share/e3df729308114aa4bbf14ee74f37c0f8)

## Super Properties and Track Event
[Super Properties and Track Event](https://www.loom.com/share/d651d02c989542c390ba3df6739de941)

## Setting Profile Properties
[Setting Profile Properties](https://www.loom.com/share/c382d447568d4cca9db2da8fefba1176)

## Other Ingestion methods
[Other Ingestion methods](https://www.loom.com/share/089c6b39964745c9b208fd81336bc0bc)

## FAQs
#### 1. What are the different SDKs available by Mixpanel
- Supported client-side libraries: [JavaScript](https://developer.mixpanel.com/docs/javascript), [iOS - Objective-C](https://developer.mixpanel.com/docs/ios), [iOS - Swift](https://developer.mixpanel.com/docs/swift), [Android](https://developer.mixpanel.com/docs/android), [React Native](https://developer.mixpanel.com/docs/react-native), [Flutter](https://developer.mixpanel.com/docs/flutter), [Unity](https://developer.mixpanel.com/docs/unity)
- Supported server-side libraries: [Python](https://developer.mixpanel.com/docs/python), [Java](https://developer.mixpanel.com/docs/java), [PHP](https://developer.mixpanel.com/docs/php), [Ruby](https://developer.mixpanel.com/docs/ruby), [NodeJS](https://developer.mixpanel.com/docs/nodejs)
- [REST HTTP API](https://developer.mixpanel.com/reference/ingestion-api)


#### 2. Does Mixpanel have auto-track?
Mixpanel does not have autotrack. You can read more about it in [our article](https://help.mixpanel.com/hc/en-us/articles/115004600343).


#### 3. Browser Cookies are unreliable, is there another way?
You can switch from cookie to local storage. You can read more about it [our article](https://help.mixpanel.com/hc/en-us/articles/115004546863#switch-from-cookies-to-localstorage).


#### 4. What’s the difference between $mp_api_timestamp_ms and $time and $mp_processing_time_ms?
`$mp_api_timestamp_ms` - the timestamp when the data is available for querying in reports.
`$mp_processing_time_ms` - when it was actually processed (think of the remap service where we drop the events and props that are dropped via lexicon, where we change the distinct and and so on
`time` - actual time of the event (which could be from days in the past), typically set when mixpanel.track() is called in the SDKs or filled in directly as part of a API payload.


#### 5. How to handle Date of Birth before 1/1/1970?
While the timestamp values are recommended to send in the ISO format, for dates before 1st January 1970, you can send the value like “YYYY-MM-DD”.

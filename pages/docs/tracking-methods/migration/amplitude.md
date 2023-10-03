# Amplitude

If you haven't already, we recommend starting with our [Migration Guides Overview](/docs/tracking-methods/migration/overview) as it details the key components of migrating to Mixpanel from other analytics tools. Below we outline specific steps and considerations when migrating from Amplitude.

## Differences in the data models

Both Mixpanel and Amplitude are product analytics tools which collect event-based behavioral data about your users. [Events](https://developer.mixpanel.com/reference/import-events) are commonly expressed as JSON which represent the name of the user action, the ID of the user, the time at which the action took place, and all associated metadata. Events are immutable, and represent data at the time of which an action takes place.

```json
{
	"event": "Signup",
	"properties":
	{
		"time": 1618716477000,
		"distinct_id": "91304156-cafc-4673-a237-623d1129c801",
		"$insert_id": "29fc2962-6d9c-455d-95ad-95b84f09b9e4",
		"Referred by": "Friend",
		"URL": "mixpanel.com/signup"
	}
}
```

In addition to events, Mixpanel supports an additional type of data that Amplitude does not. This data is known as [user profiles](https://developer.mixpanel.com/reference/profile-set), which represents dimensional data that is always updated to the most recent value for a user. User data allows you to segment your reporting by both historical point-in-time data as well as real-time dimensional data about your users.

```json
{
	"$distinct_id": "13793",
	"$set":
	{
		"name": "Robert"
	}
}
```

We also support additional data for extending your use cases with Mixpanel:

- [Group profiles](https://developer.mixpanel.com/reference/group-set-property): Used with our Group Analytics product add-on to allow you to pivot quickly between users and other entities in your analysis. A common use case is for a B2B company to pivot between analyzing users and analyzing accounts.
- [Lookup tables](https://developer.mixpanel.com/reference/lookup-tables): For event data which was already sent, you can use these to extend the data already sent into Mixpanel. A common use case is taking an identifier like a transaction ID, item ID, etc. and using lookup tables to enrich the data with additional information like the amount, category, etc. from your data warehouse.

## Identifying your implementation method

Mixpanel accepts event data from a variety of different sources. Choose your implementation method first and then you can follow the below steps for sending data to Mixpanel.

We support the following data collection mechanisms:

- [Client-side SDKs & Server-side SDKs](#client-side-sdks--server-side-sdks): Simply replace Amplitude code calls to track events with Mixpanel calls instead
- [Customer Data Platforms (CDPs)](#customer-data-platforms-cdps) like [Segment](https://segment.com/): Go into your CDP settings to add Mixpanel as a destination, and point your data stream to Mixpanel
- [Import API](#import-api): Point your event ingestion pipeline to [Mixpanel’s robust API](https://developer.mixpanel.com/reference/import-events) for data ingestion
- [Reverse ETL](#reverse-etl-retl) (RETL) tools like [Census](https://getcensus.com): Go into your RETL settings to add Mixpanel as a destination, and point your syncs to Mixpanel

### Client-side SDKs & Server-side SDKs
    
Fortunately, Mixpanel and Amplitude’s client side SDKs have *very similar* developer facing APIs. This makes it fairly easy to “find and replace” embedded Amplitude calls and swap them for Mixpanel calls.

This section will detail the Javascript SDKs (for the sake of brevity), although both analytics platforms have fairly uniform tracking APIs for other SDKs (mobile, server-side).

Amplitude JS Docs: [https://amplitude.github.io/Amplitude-JavaScript/](https://amplitude.github.io/Amplitude-JavaScript/)

Mixpanel JS Docs: [https://developer.mixpanel.com/docs/javascript-full-api-reference](https://developer.mixpanel.com/docs/javascript-full-api-reference)

Note: Ensure that your projects have been defaulted or updated to Simplified ID Management before any data is sent to the project. This is the ID management compatible with Amplitude’s.

#### Installing the Mixpanel SDK

Before getting started, initialize the Mixpanel SDK according to the directions [here](https://developer.mixpanel.com/docs/javascript-quickstart#1-initialize-the-library)

#### Initialization

Amplitude’s `init()` method:

```jsx
var amplitudeClient = new AmplitudeClient();
amplitudeClient.init('API_KEY')
```

Mixpanel’s `init()` method:

```jsx
mixpanel.init('new token')
```

[Docs Reference](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelinit)

[Initialization (init) options](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelset_config)

#### Events

Amplitude’s `logEvent()` method:

```jsx
amplitudeClient.logEvent('Clicked Button', {'finished_flow': false });
```

Mixpanel’s `track()` method:

```jsx
mixpanel.track('Clicked Button', {'finished_flow': false })
```

[Docs Reference](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpaneltrack)

#### Identity Management

Amplitude’s `setUserId()` method:

```jsx
amplitudeClient.setUserId('joe@gmail.com');
```

Mixpanel’s `identify()` method:

```jsx
mixpanel.identify('joe@gmail.com')
```

[Docs Reference](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelidentify)

#### User Properties

Amplitude’s `setUserProperties()` method:

```jsx
amplitudeClient.setUserProperties({'gender': 'female', 'sign_up_complete': true})
```

Mixpanel’s `people.set()` method:

```jsx
mixpanel.people.set({'gender': 'female', 'sign_up_complete': true})
```

Note: `identify()` should be called at some point in each user’s session to propagate people methods

[Docs Reference](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelpeople)

#### Group Analytics

Amplitude’s `setGroup()` method:

```jsx
amplitudeClient.setGroup('orgId', 15); 
```

Mixpanel’s `set_group()` method:

```jsx
mixpanel.set_group('orgId', 15)
```

[Docs Reference](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelset_group)

### Customer Data Platforms (CDPs)
    
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

Note depending on your CDP provider, they may also be able to help with migrating historical data as well. Features like [Segment Replay](https://segment.com/docs/guides/what-is-replay/) enable you to quickly backfill historical data during your migration versus needing to do this work with your developer resources.
    
### Import API
    
If you currently send data to Amplitude directly to their API, you can simply swap out the Amplitude API with the Mixpanel API.

#### Sending Events

Amplitude’s `/track` API Endpoint is `https://api2.amplitude.com/2/httpapi` (documented [here](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/)). A sample request from your server for this API would look like:

```bash
curl -X POST https://api2.amplitude.com/2/httpapi \
-H 'Content-Type: application/json' \
-H 'Accept: */*' \
--data '{
    "api_key": "YOUR_API_KEY",
    "events": [{
    "user_id": "203201202",
    "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
    "event_type": "watch_tutorial"
    }]
    }'
```

Mixpanel’s `/track` API endpoint is `https://api.mixpanel.com/import` (documented [here](https://developer.mixpanel.com/reference/import-events)). A sample request from your server for this API would look like:

```bash
curl --request POST \
 --url 'https://api.mixpanel.com/import?strict=1&project_id=%3CYOUR_PROJECT_ID%3E' \
 --header 'Content-Encoding: gzip' \
 --header 'Content-Type: application/json' \
 --header 'accept: application/json' \
 --header 'authorization: Basic cnlhbjpyeWFu' \
 --data '[
    {
        "event": "string",
        "properties": {
            "time": 0,
            "distinct_id": "string",
            "$insert_id": "string"
         }
    }
]'
```

The big difference between the APIs are:

- **Authentication:** Amplitude authenticates in the request payload, whereas Mixpanel uses your project token in the request URL alongside basic auth. Mixpanel authentication can be done via a service account as described [here](https://developer.mixpanel.com/reference/ingestion-api-authentication). Be sure to move the authentication outside the payload.
- **Event JSON Structure:** Amplitude and Mixpanel have slightly different structures (explained [here](/docs/tracking-methods/migration/amplitude#differences-in-the-data-models)). You will want to remap the Amplitude event format to the expected Mixpanel JSON payload as described [here](https://www.notion.so/Migrating-to-Mixpanel-from-Amplitude-723407166fbf4f7ba9365034691502da).

### Reverse ETL (RETL)

If you already send data to Amplitude with your data warehouse as the source of truth using reverse ETL, sending data to Mixpanel requires adding a new destination and syncing the same models you have been syncing to Amplitude. This option is like a hybrid between the CDP and Import API options above - you can use the reverse ETL tool to set Mixpanel up simply as a destination and then the tool will handle all of the remapping at the API level for you.

Simply go to your RETL settings and add Mixpanel as a connection:

![Census Connection](https://user-images.githubusercontent.com/129823695/234812805-ded7dcef-9d47-4375-b52e-a229e4832477.png)

We provide Mixpanel as a destination and setup guides for all of the most popular RETL tools:

- [Census](https://docs.getcensus.com/destinations/mixpanel)
- [Hightouch](https://hightouch.com/docs/destinations/mixpanel)
- [Segment](https://segment.com/docs/connections/reverse-etl/)

## Not sure where to start or need help?

If you're unsure how you currently track data, or might want to consider tracking data differently as you migrate to Mixpanel, we recommend starting [here](https://mixpanel.com/blog/guide-to-choosing-your-data-architecture/).

Mixpanel Customer Success and Support have been helping thousands of customers migrate from other tools to Mixpanel over the past decade. You can see an overview of the process we run with our Enterprise plan customers migrating from Amplitude [here](https://mxpnl.notion.site/Amplitude-Migration-Package-264ed076292e41e9b29a2c4f26851e9b?pvs=4).

We’re always happy to discuss your team’s individual needs, our migration process, the support you’ll receive, or any other question you have — drop us a line at success@mixpanel.com.

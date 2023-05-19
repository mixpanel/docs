# Migrating to Mixpanel from Google Analytics

Mixpanel’s data model is based on events and properties, rather than sessions. While this might be a shift if you come from the sessions-based model, we’ve found it to be both more flexible and easier to set up and use.

- An [event](https://help.mixpanel.com/hc/en-us/articles/360041995352-Mixpanel-Concepts-Events) captures a granular user action, like a Pageview, Signup, or Purchase.
- [Properties](https://help.mixpanel.com/hc/en-us/articles/360041995352-Mixpanel-Concepts-Events#event-properties) capture attributes of those events, like which page was viewed, the UTM Campaign that led to a Signup, or the Item that was purchased.

Events let you get more granular than [sessions](https://help.mixpanel.com/hc/en-us/articles/115004695223), so that you can deeply understand user behavior. At the same time, Mixpanel automatically constructs sessions from events, so you can answer session-level questions too.

Read on to learn how to migrate to Mixpanel’s modern, event-based model.

## Currently using Universal Analytics with Google?

### Part 1: Track forward looking real-time data

Choose your current implementation method for Universal Analytics (UA) and you can follow the below steps for starting to send live data to Mixpanel.
​
- **Client-side SDKs & Server-side SDKs:** You’ll have to setup Mixpanel fresh given Mixpanel leverages an event-based model that does not exist in Universal Analytics. The good news is you can get started within an hour, which is lesser or equivalent work to setting up GA4.
    
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
    
    It’s equal effort to set up GA4 or set up Mixpanel from an SDK perspective, since both need a fresh implementation to be setup on an “events” model vs UA’s “sessions” model.
    
- **Google Tag Manager (GTM):** Mixpanel has a [Google Tag Manager (GTM) custom template](https://help.mixpanel.com/hc/en-us/articles/4870177097748-Implementing-Mixpanel-with-Google-Tag-Manager) which can be leveraged to implement events within an hour. The template initializes the Mixpanel JavaScript SDK with similar calls as outlined in the above section.
    
    We recommend setting up the following in the custom template to get started quickly: a) Choose to auto-track pages, b) Set your conversion events. Once done, Mixpanel will start receiving page views and key conversion events.
    
- **Customer Data Platforms (CDPs) like [Segment](https://segment.com/):** CDPs have always tracked event data and synthesized them into sessions for Universal Analytics. You can add Mixpanel as a destination to your CDP and immediately start receiving the same data as your other destinations.
    
    Since CDPs already collect all your data via 1 SDK and route to many downstream destinations, enabling Mixpanel is straightforward. Simply go to your CDP settings and add Mixpanel as a destination:
    
    ![Untitled](GUIDE%20Moving%20data%20from%20UA%20GA4%20%E2%86%92%20MP%20f0fa78498d564bedaabe640ccad42717/Untitled.png)
    
    Once you set up the connection to Mixpanel, you can proceed with configuring key settings like:
    
    - which events and properties to send → only send what matters
    - edit any mappings/editing/filtering that has to be done on the data → ensure high data quality and governance
    - connection settings, or CDP specific settings for data syncs → control over how data is sent
    
    We provide Mixpanel as a destination and setup guides for all of the most popular CDPs:
    
    - [Segment](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/)
    - [mParticle](https://docs.mparticle.com/integrations/mixpanel/audience/)
    - [Rudderstack](https://www.rudderstack.com/docs/destinations/streaming-destinations/mixpanel/)
​
### Part 2: Loading Historical Data
​
For most cases, we recommend starting fresh. In the cases where historical data is essential, we recommend loading a year’s worth (or less) of historical data during your migration. This will allow your team to review year-over-year trends easily and do historical analysis as needed.
​
To backfill data, we recommend:
​
- If you have a CDP, this should be straightforward
    - Utilize the CDPs backfilling feature, like [Segment Replay](https://segment.com/docs/guides/what-is-replay/), to re-send historical data to Mixpanel
- For any other implementation method
    - First, export your data to the data warehouse so you have a record of Universal Analytics
    - Once exported, your data warehouse tables can be transformed and modeled into the [event format](https://developer.mixpanel.com/reference/import-events#example-of-an-event) Mixpanel expects
    - Leverage our [Import API](https://developer.mixpanel.com/reference/import-events) to send us the formatted events from your data warehouse
​
It is also recommended you load the historical data into a test project with a limited subset (for ex, a single day of data or a sample of the entire dataset) to get started. This will help you identify any errors in the end to end process before you do a full historical data load.
​
The process of importing old data with a different format has many potential issues - identity management, data discrepancies, etc. - as Mixpanel is fundamentally different than UA. It may be worth considering your use cases for importing old data before proceeding, as matching users and data across the systems can be time consuming. [Mixpanel Support](mailto:support@mixpanel.com) is here to help if you need advice how to go about importing the historical data.
​
## Currently using GA4 and not seeing value?
​
### Part 1: Track forward looking real-time data
​
Choose your current implementation method for Google Analytics (GA4) and you can follow the below steps for starting to send live data to Mixpanel.
​
- **Client-side SDKs & Server-side SDKs:** Mixpanel and GA4’s client-side SDKs have *very similar* developer facing APIs. This makes it fairly easy to “find and replace” embedded GA4 calls and swap them for Mixpanel calls.
    
    This section will detail the Javascript SDKs (for the sake of brevity), although both analytics platforms have fairly uniform tracking APIs for other SDKs (mobile, server-side, etc.)
    
    **Events**
    
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
    
    **Identity Management**
    
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
    
    **User Properties**
    
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
    
    **Super Properties**
    
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
    
- **Google Tag Manager (GTM):** Mixpanel has a [Google Tag Manager (GTM) custom template](https://help.mixpanel.com/hc/en-us/articles/4870177097748-Implementing-Mixpanel-with-Google-Tag-Manager) which can be leveraged to implement events within an hour. Simply load the template, and you can send Mixpanel the same events you’ve setup for your GA4 instance.
    
    This method is straightforward since you’ve already setup your SDK to track “events” and are using Google Tag Manager. You can leverage this same setup to implement Mixpanel.
    
- **Customer Data Platforms (CDPs) like [Segment](https://segment.com/):**  CDPs will already be tracking events to GA4 that you want to duplicate to Mixpanel. You can add Mixpanel as a destination to your CDP and immediately start receiving the same data as your other destinations.
    
    Since CDPs already collect all your data via 1 SDK and route to many downstream destinations, enabling Mixpanel is straightforward. Simply go to your CDP settings and add Mixpanel as a destination:
    
    ![Untitled](GUIDE%20Moving%20data%20from%20UA%20GA4%20%E2%86%92%20MP%20f0fa78498d564bedaabe640ccad42717/Untitled.png)
    
    Once you set up the connection to Mixpanel, you can proceed with configuring key settings like:
    
    - which events and properties to send → only send what matters
    - edit any mappings/editing/filtering that has to be done on the data → ensure high data quality and governance
    - connection settings, or CDP specific settings for data syncs → control over how data is sent
    
    We provide Mixpanel as a destination and setup guides for all of the most popular CDPs:
    
    - [Segment](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/)
    - [mParticle](https://docs.mparticle.com/integrations/mixpanel/audience/)
    - [Rudderstack](https://www.rudderstack.com/docs/destinations/streaming-destinations/mixpanel/)
​
### Part 2: Loading Historical Data
​
For most cases, we recommend starting fresh. In the cases where historical data is essential, we recommend loading a year’s worth (or less) of historical data during your migration. This will allow your team to review year-over-year trends easily and do historical analysis as needed.
​
To backfill data, we recommend:
​
- If you have a CDP, this should be straightforward
    - Utilize the CDPs backfilling feature, like [Segment Replay](https://segment.com/docs/guides/what-is-replay/), to re-send historical data to Mixpanel
- For any other implementation method
    - First, export your data to BigQuery (provided for free with GA4) so you have a record of the data
    - Since GA4 data is events (and not sessions), the data exported to BigQuery should already be [formatted for Mixpanel](https://developer.mixpanel.com/reference/import-events#example-of-an-event)
    - Then leverage the [Import API](https://developer.mixpanel.com/reference/import-events) or a [Reverse ETL](https://mixpanel.com/blog/what-is-reverse-etl-product-data/) tool like [Census](https://getcensus.com/) to import to Mixpanel
​
It is also recommended you load the historical data into a test project with a limited subset (for ex, a single day of data or a sample of the entire dataset) to get started. This will help you identify any errors in the end to end process before you do a full historical data load.
​
[Mixpanel Support](mailto:support@mixpanel.com) is here to help if you need advice how to go about importing the historical data.

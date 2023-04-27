# Migrating to Mixpanel from Amplitude

If you’re reading this, congrats on considering making the switch from Amplitude to Mixpanel 🎊  This guide is intended to outline how the migration works, what to expect, and how to mitigate the risks and switching costs of a migration whilst accelerate time to value.

## What a migration will solve ✅

- Cut-over sending live data to Mixpanel and stop sending to Amplitude
- Historical backfill of existing data
- Integrates easily with existing event data collection methods - SDKs, CDPs, DWH, RETL
- Migrates all existing/new data in entirety - full access to all events and properties you had in Amplitude

## What a migration won’t solve ⛔

- Existing issues with data trust/quality or data governance → As part of the migration, we recommend a [data audit](https://www.notion.so/Migrating-to-Mixpanel-from-Amplitude-723407166fbf4f7ba9365034691502da) as the first step to only transfer your valuable data and clean up trust/quality issues
- Reporting, Dashboards, and Saved Entities → As part of the migration, we can review your top used reports and dashboards then [sit down with each team](https://www.notion.so/Migrating-to-Mixpanel-from-Amplitude-723407166fbf4f7ba9365034691502da) to re-build them in Mixpanel

## What level of effort does the migration take? ⚖️

A migration primarily consists of 3 phases:

1. Technical migration of data → Data audit, Live data cutover, Historical data import
2. Change management migration of end users → Champion identification, User interviews, Team by team specific trainings, Ensuring adoption for each team
3. Ongoing success planning → Improving data governance, Optimizing analysis, Building a product analytics practice

From a technical perspective, the migration process is relatively straightforward. If you have an engineer with access to your data and the ability to write code/transforms to send data to new destinations, this can be done in a single sprint (1-2 weeks).

From an end user perspective, Mixpanel is simpler and easier to learn than Amplitude but there of course will be a learning curve. The largest hurdle is copying over key saved reports, dashboards, etc. which the team is familiar with in Amplitude and teaching them how to rebuild these in Mixpanel. We recommend doing this process in detail for each team, showing them how to recreate key analyses side-by-side in Mixpanel. You can then leverage your team champions to force multiply your adoption efforts.

When going through this migration, there is no better time to audit your own data and reports to only migrate what matters. Most data and reporting is stale after some time anyways, prioritize the data and reports your team uses every day for their Top 10 key questions. These can be easily copied over and Mixpanel also provides Customer Success resources during Onboarding to assist with this.

## Getting started: Identify your implementation method 🚦

Mixpanel accepts event data from a variety of different sources. Choose your implementation method first and then you can follow the below steps for sending data to Mixpanel.

We support the following data collection mechanisms:

- Client-side SDKs & Server-side SDKs: Simply replace Amplitude code calls to track events with Mixpanel calls instead
    
    Fortunately, Mixpanel and Amplitude’s client side SDKs have *very similar* developer facing APIs. This makes it fairly easy to “find and replace” embedded Amplitude calls and swap them for Mixpanel calls.
    
    This section will detail the Javascript SDKs (for the sake of brevity), although both analytics platforms have fairly uniform tracking APIs for other SDKs (mobile, server-side). 
    
    Amplitude JS Docs: [https://amplitude.github.io/Amplitude-JavaScript/](https://amplitude.github.io/Amplitude-JavaScript/)
    
    Mixpanel JS Docs: [https://developer.mixpanel.com/docs/javascript-full-api-reference](https://developer.mixpanel.com/docs/javascript-full-api-reference)
    
    ## Installing the Mixpanel SDK:
    
    [https://developer.mixpanel.com/docs/javascript-quickstart#1-initialize-the-library](https://developer.mixpanel.com/docs/javascript-quickstart#1-initialize-the-library)
    
    # Migrating Amplitude ⇒ Mixpanel
    
    ### Initialization
    
    Amplitude’s `init()` method:
    
    ```jsx
    var amplitudeClient = new AmplitudeClient();
    amplitudeClient.init('API_KEY')
    ```
    
    Mixpanel’s `init()` method:
    
    ```jsx
    mixpanel.init('new token')
    ```
    
    docs: [https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelinit](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelinit)
    
    init options: [https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelset_config](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelset_config)
    
    ### Events
    
    Amplitude’s `logEvent()` method:
    
    ```jsx
    amplitudeClient.logEvent('Clicked Button', {'finished_flow': false });
    ```
    
    Mixpanel’s `track()` method:
    
    ```jsx
    mixpanel.track('Clicked Button', {'finished_flow': false })
    ```
    
    docs: [https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpaneltrack](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpaneltrack)
    
    ### Identity Management
    
    Amplitude’s `setUserId()` method:
    
    ```jsx
    amplitudeClient.setUserId('joe@gmail.com');
    ```
    
    Mixpanel’s `identify()` method:
    
    ```jsx
    mixpanel.identify('joe@gmail.com')
    ```
    
    docs: [https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelidentify](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelidentify)
    
    ### User Properties
    
    Amplitude’s `setUserProperties()` method:
    
    ```jsx
    amplitudeClient.setUserProperties({'gender': 'female', 'sign_up_complete': true})
    ```
    
    Mixpanel’s `people.set()` method:
    
    ```jsx
    mixpanel.people.set({'gender': 'female', 'sign_up_complete': true})
    ```
    
    docs: [https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelpeople](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelpeople)
    
    notes: `identify()` should be called at some point in the user’s session to propagate people methods
    
    ### Group Analytics
    
    Amplitude’s `setGroup()` method:
    
    ```jsx
    amplitudeClient.setGroup('orgId', 15); 
    ```
    
    Mixpanel’s `set_group()` method:
    
    ```jsx
    mixpanel.set_group('orgId', 15)
    ```
    
    docs: [https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelset_group](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelset_group)
    
- Customer Data Platforms (CDPs) like [Segment](https://segment.com/): Go into your CDP settings to add Mixpanel as a destination, and point your data stream to Mixpanel
    
    Since CDPs already collect all your data via 1 SDK and route to many downstream destinations, enabling Mixpanel is straightforward. Simply go to your CDP settings and add Mixpanel as a destination:
    
    ![Untitled](Migrating%20to%20Mixpanel%20from%20Amplitude%20723407166fbf4f7ba9365034691502da/Untitled.png)
    
    Once you set up the connection to Mixpanel, you can proceed with configuring key settings like:
    
    - which events and properties to send → only send what matters
    - edit any mappings/editing/filtering that has to be done on the data → ensure high data quality and governance
    - connection settings, or CDP specific settings for data syncs → control over how data is sent
    
    We provide Mixpanel as a destination and setup guides for all of the most popular CDPs:
    
    - [Segment](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/)
    - [mParticle](https://docs.mparticle.com/integrations/mixpanel/audience/)
    - [Rudderstack](https://www.rudderstack.com/docs/destinations/streaming-destinations/mixpanel/)
    
- [Import API](https://developer.mixpanel.com/reference/import-events): Point your event ingestion pipeline to [Mixpanel’s robust API](https://developer.mixpanel.com/reference/import-events) for data ingestion
    
    If you currently send data to Amplitude directly to their API, you can simply swap out the Amplitude API with the Mixpanel API.
    
    ### Sending Events
    
    Amplitude’s `/track` API Endpoint is `[https://api2.amplitude.com/2/httpapi](https://api2.amplitude.com/2/httpapi)` (documented [here](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/)). A sample request from your server for this API would look like:
    
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
    
    Mixpanel’s `/track` API endpoint is [`https://api.mixpanel.com/import`](https://api.mixpanel.com/import) (documented [here](https://developer.mixpanel.com/reference/import-events)). A sample request from your server for this API would look like:
    
    ```bash
    curl --request POST \
         --url 'https://api.mixpanel.com/import?strict=1&project_id=%3CYOUR_PROJECT_ID%3E' \
         --header 'Content-Encoding: gzip' \
         --header 'Content-Type: application/json' \
         --header 'accept: application/json' \
         --header 'authorization: Basic cnlhbjpyeWFu' \
         --data '
    [
      {
        "event": "string",
        "properties": {
          "time": 0,
          "distinct_id": "string",
          "$insert_id": "string"
        }
      }
    ]
    '
    ```
    
    The big difference between the APIs are:
    
    - **Authentication:** Amplitude authenticates in the request payload, whereas Mixpanel uses your project token in the request URL alongside basic auth. Mixpanel authentication can be done via a service account as described [here](https://developer.mixpanel.com/reference/ingestion-api-authentication). Be sure to move the authentication outside the payload.
    - **Event JSON Structure:** Amplitude and Mixpanel have slightly different structures (explained further below). You will want to remap the Amplitude event format to the expected Mixpanel JSON payload as described [here](https://www.notion.so/Migrating-to-Mixpanel-from-Amplitude-723407166fbf4f7ba9365034691502da).
    
- [Reverse ETL](https://mixpanel.com/blog/what-is-reverse-etl-product-data/) (RETL) tools like [Census](https://getcensus.com): Go into your RETL settings to add Mixpanel as a destination, and point your syncs to Mixpanel
    
    If you already send data to Amplitude with your data warehouse as the source of truth using reverse ETL, sending data to Mixpanel requires adding a new destination and syncing the same models you have been syncing to Amplitude. This option is like a hybrid between the CDP and Import API options above - you can use the reverse ETL tool to set Mixpanel up simply as a destination and then the tool will handle all of the remapping at the API level for you.
    
    Simply go to your RETL settings and add Mixpanel as a connection:
    
    ![Untitled](Migrating%20to%20Mixpanel%20from%20Amplitude%20723407166fbf4f7ba9365034691502da/Untitled%201.png)
    
    We provide Mixpanel as a destination and setup guides for all of the most popular RETL tools:
    
    - [Census](https://docs.getcensus.com/destinations/mixpanel)
    - [Hightouch](https://hightouch.com/docs/destinations/mixpanel)
    - [Segment](https://segment.com/docs/connections/reverse-etl/)
    

## Differences in the data models ☯️

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

## Data audit: Cleaning up the mess 🧹

We’ve found from experience that <20% of the data in a product analytics tool is used for 80%+ of the queries. This is especially true the longer you have been using a tool - over time teams add more and more tracking for new events and properties, and without strong data governance practices, you will inevitably have some messy data in Amplitude.

In the spirit of making sense of the mess, it is not recommended that you bring all historical data in from Amplitude. A common practice is to leverage Amplitude’s [Data](http://data.amplitude.com) Product to first understand which events and properties are queried by your users. No queries in the past 30 days? These events and properties have probably gone stale - there is low value and high effort in brining them to Mixpanel, so cut them from your import and do not migrate the existing tracking.

After you’ve gotten rid of the obvious (the events and properties no one uses), you can fine tune this approach by doing user interviews with your top users/champions. These users can help you explicitly define the data they need brought along to Mixpanel (mapped to their key questions and KPIs) so you can focus on what matters. Because these users are the ones building reporting others use, capturing their use cases and making them change agents can be highly beneficial to your migration.

This data audit step is optional, but highly recommended - It is a larger upfront investment to avoid higher maintenance costs in the future.

## Loading historical data 📊

We recommend loading a year’s worth (or less) of historical data during your migration. This will allow your team to review year-over-year trends easily and do historical analysis as needed.

To backfill data, we recommend:

- If you have a data warehouse with Amplitude data: Leverage the Import API or a Reverse ETL tool to import to Mixpanel
- If you have a data warehouse without Amplitude data: Export your data to the data warehouse so you have a record, and then Import API or Reverse ETL
- If you do not have a data warehouse: Since there is no historical record of data, for this method you will need to export your data from Amplitude and move it into Mixpanel - we provide an easy to use helper function for this [here](https://github.com/mixpanel/mixpanel-utils#import-from-amplitude)

It is also recommended you load the data into a test project with a limited subset (for ex, a single day or data or a sample of the entire dataset) to get started. This will help you identify any errors in the end to end process before you do a full historical data load.

## Change management: Moving the users 👥

It is recommended your Mixpanel champion or owner first set up your [Organization settings](https://help.mixpanel.com/hc/en-us/articles/360021085271-Organization-Settings) and [Project settings](https://help.mixpanel.com/hc/en-us/articles/115004490503-Project-Settings). This will ensure the right access level for your team and enable you to prepare the workspace for ingestion. This can be done later but doing it up front will allow for you to set key settings for data ingestion (US vs EU servers, project timezone, etc.).

Once data is live, we shift our focus to change management and migrating the existing users. We mitigate risk here by:

- Going team by team to assess current Amplitude reports, and bringing over only what really matters
- Running targeted trainings where we re-build Amplitude reports side-by-side in Mixpanel to teach users to fish
- Building a product with awesome UI/UX that will make up for the up-front costs in simpler, more powerful analysis down the line

Our goal is to focus on each team individually, and we can process multiple in parallel. A team is the perfect unit to focus on as they have shared context and goals, so their needs as far as metrics and analysis will be similar. We can then help each team to the point they can self-serve answers from Mixpanel to answer their questions.

## Ongoing Success 🎡

After the migration, we often focus on longer term goals like:

- Improving Data Governance → Creating scaleable processes and strategies for managing data at scale
- Optimizing Analysis → Helping end users analyze data for more use cases, faster
- Building a Product Analytics Practice → Cultural change to be a self-serve, data democratized organization

Mixpanel Customer Success will work with you to define your ongoing needs and build a plan specific to the outcomes you need to drive. You can read more about how we do this [here](https://mixpanel.com/blog/establish-a-product-analytics-practice/).

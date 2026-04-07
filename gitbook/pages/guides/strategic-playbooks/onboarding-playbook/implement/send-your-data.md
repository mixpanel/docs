# Overview

If you have already created your tracking plan and know what you want to track, the next step is to start implementing. However, if you have not done so, it's good to catch-up reading on [Plan](../../../tutorials/plan/setup.md) first.

- [x] [Send Your Data](../../../tutorials/implement/send-your-data.md#send-your-data-implement-your-tracking-plan) - walkthrough the different ways you can send data into Mixpanel and guide you on choosing the most suitable approach. 
- [x] [QA and Data Audit](../../../tutorials/implement/qa-data-audit.md) - covers QA *(Quality Assurance testing)* and auditing of your implementation before you send live data into your Mixpanel production project. 
- [x] [Establish Governance](../../../tutorials/implement/establish-governance.md) - guide you in establishing good data governance practices beyond the initial onboarding to you keep your implementation clean, concise and consistent.

# Send Your Data: Implement Your Tracking Plan

Mixpanel provides a variety of methods to send your data. Depending on your existing infrastructure, availability of development team resources, and the type of data you plan to collect, this section will help guide you in selecting the right ingestion method to implement your tracking plan.

## Choosing an Ingestion Method

When it comes to deciding which ingestion approach to use, there are no fixed rules; and each approach comes with its own advantages and limitations.

<p >
  {% embed url="https://www.youtube.com/watch?v=DupNeU23dTg" %}

Here are the key considerations that would guide you along in choosing the right approach as we go through each one:

- **Source of Truth**: Does your company have data that is considered the *"source of truth"* when it comes to business reporting?
- **Data Tools**: Do you use any existing Event Streaming, Customer Data Platform (CDP), or Data Warehouse?
- **Clickstream Data**: Are you already collecting any clickstream data, and if not, do you have the ability to collect them?
- **Development Team**: What available development resources does your company have to implement the ingestion approaches?

It is important to choose an ingestion method that fits your current needs and available resources, at the same time, factoring for some flexibility in scaling your approach as your product evolves. Most of our customers tend to start with the simplest approach of using our SDKs and slowly migrate to more complex architectures like CDPs or Data Warehouses.

This table provides a quick overview of the different approaches:
- Speed: Easiest way to start collecting data
- Scale: Long-term view of being able to scale data collection as product changes
- Quality: Accurate, clean, and completeness of data collected

![image](/tutorials/data-collection-maturity-matrix.png "Data Collection Maturity Matrix")

### SDKs: Client-Side vs Proxy vs Server-Side

Mixpanel supports a wide range of [Client-Side](../../../tracking-methods/choosing-the-right-method.md#client-side-tracking) and [Server-Side](../../../tracking-methods/choosing-the-right-method.md#server-side-tracking) SDKs.

In general, we recommend utilizing Client-Side SDKs if you have limited development resources, no existing data collection infrastructure, or have no reliable method to track clickstream data. Whilst they might be initially the easiest to set up, ad-blockers can impact your ability to track data accurately. Furthermore, it can be difficult to keep metrics consistent when utilizing client-side SDKs across multiple platforms such as across both a website and mobile app.

<p >
  {% embed url="https://www.youtube.com/watch?v=FL7wGgfTVoo" %}

Alternatively, you may want to consider using Server-Side SDKs, which are not susceptible to ad blockers, and provide more consistency when tracking users across platforms. It does require some custom code to track your anonymous (non-logged in) users. Do refer to our documentation for [Server-Side Best Practices](../../../tracking-best-practices/server-side-best-practices.md).

<p >
  {% embed url="https://www.youtube.com/watch?v=tmGWU6R2-g8" %}

As an in-between, consider client-side tracking via a proxy. This will help [reduce the likelihood of ad-blockers impacting your tracking](https://www.youtube.com/watch?v=8Pv6tmRfqr8), while allowing you to automatically capture certain default client-side properties. For more details, please see [this article](../../../tracking-methods/sdks/javascript.md#tracking-via-proxy) on how to set up a proxy.

A full list of Mixpanel SDKs can be found in our [documentation](../../../tracking-methods/choosing-the-right-method.md).

### Customer Data Platforms (CDP)

If you currently utilize a Customer Data Platform (eg mParticle, Rudderstack, Segment), you can also use this to send your data to Mixpanel. If you're switching to Mixpanel from another analytics tool, CDPs will also allow you to easily migrate your historical data into Mixpanel.

<p >
  {% embed url="https://www.youtube.com/watch?v=whd8guBgXnE" %}

Please refer to the documentation by your respective CDP provider for more information on how to connect your data to Mixpanel.

### Data Warehouses

If your data is already stored in a data warehouse, our [Warehouse Connectors](../../../tracking-methods/warehouse-connectors.md) allows you to import different [Table Types](../../../tracking-methods/warehouse-connectors.md#table-types) that map to Events, User Profiles, Group Profiles, and Lookup Tables 
in your Mixpanel project. It also provides various [Sync Modes](../../../tracking-methods/warehouse-connectors.md#sync-modes) such as Mirror, Append, Full, and One-Time syncs to ensure that your data in Mixpanel matches your trusted data source.

<p >
  {% embed url="https://www.youtube.com/watch?v=3miXogffar0" %}

Another option to send data from your data warehouse to Mixpanel would be to utilize a Reverse ETL tool (eg Census, Hightouch). These third-party tools will allow you to make any necessary transformations to the data and set up sync schedules to import data from your warehouse to Mixpanel. Please refer to the respective documentation of whichever reverse ETL tool your team chooses to utilize.

### Event Streaming / Cloud Ingestion

If your company already has an existing event stream pipeline, you could use it to send data into Mixpanel as you receive it. You can refer to our documentation for examples on how to setup a pipeline from [Amazon S3](../../../tracking-methods/integrations/amazon-s3.md), [Google Cloud Storage](../../../tracking-methods/integrations/google-cloud-storage.md), [Google Pubsub](../../../tracking-methods/integrations/google-pubsub.md).

<p >
  {% embed url="https://www.youtube.com/watch?v=S9HJrVr1an0" %}

### Direct API Ingestion

If you would like to send data directly to Mixpanel servers without the need of any sort of intermediary layer, you can utilize our Ingestion API to send in [events](https://developer.mixpanel.com/reference/import-events). and add / update / delete existing [user profiles](https://developer.mixpanel.com/reference/profile-set). 

<p >
  {% embed url="https://www.youtube.com/watch?v=QpDpdN88Lus" %}

## Identity Management Best Practices

> Note: This section explains identity management using the Simplified Identity Management setting. If you are unsure, do refer to the [Setup](../../../tutorials/plan/setup.md#simplified-identity-management) section to check your organization and project settings.

As users navigate through your website or application, it is common for them to move between anonymous (logged out) to identified (logged in) states. Users can also use multiple devices or platforms that you may provide for your product. As such, it is crucial that you ensure correct identity management throughout in order to accurately track your users.

<p >
  {% embed url="https://www.youtube.com/watch?v=thJHTcDhToA" %}

If you're utilizing our Mixpanel SDKs, especially Client-Side, you should carefully manage all the identifiers belonging to a user correctly to ensure that all of their pre-auth and post-auth activity is tracked as one user.

In the following video, we walkthrough how you should manage identifying your users using the Simplified Identity Management method.

<p >
  {% embed url="https://www.youtube.com/watch?v=RySdeuu-eD4" %}

Do note that the mixpanel.identify() call does not create a User Profile in Mixpanel. The people.set() method is the required call to set user properties on a user profile. However, the people.set() call also requires an identify() call at some point in the same session, so that Mixpanel knows which User ID to associate the profile properties to. If there is no identify() call in a user’s session where people.set() is called, we store the user profile properties locally until that user hits an identify() call. 

For more detailed user flows and FAQs refer to our documentation on [Identifying Users](../../../tracking-methods/id-management/identifying-users.md).

## Backfilling Historical Data 

If you've previously collected data in other systems and wish to analyze it in Mixpanel, you have the option to backfill it into Mixpanel. We recommend backfilling a year’s worth (or less) of historical data. 

Given that different systems may adopt different data models, it's essential to understand [Mixpanel Data Model](../../../plan/tracking-strategy.md#the-mixpanel-data-model) and identify any required data transformations before backfilling the data into Mixpanel. For detailed guidance on migrating data from platforms such as Amplitude and Google Analytics, refer to our guide [here](../../../migration/overview.md). 

If your historical data is stored in a data warehouse, you can import it into Mixpanel through [Mixpanel Warehouse Connector](../../../tracking-methods/warehouse-connectors.md). 

Alternatively, if your historical data is stored in a system without Mixpanel native support for migration, you can still import it into Mixpanel via Mixpanel APIs. Learn more about this option [here](../../../implement/send-your-data.md#direct-api-ingestion).

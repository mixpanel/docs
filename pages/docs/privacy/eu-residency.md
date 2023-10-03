# EU Residency


## Overview
Mixpanel believes in respecting and protecting people’s fundamental online privacy and data rights. Which is why we've built Mixpanel's analysis tools in compliance with industry best-practices and global data regulations like the GDPR and the CCPA.

Visit our [Privacy Hub](https://mixpanel.com/legal/privacy-hub/) to see how we comply with various privacy guidelines.

## Storing Your Data in the European Union
By default Mixpanel stores user data on it's US Servers via the Google Cloud Platform. However, Mixpanel also provides you with the option to process and store your customers' personal data in Europe via our [EU Data Residency Program](https://mixpanel.com/legal/eu-data-residency). You can enable this by selecting the "EU Data Residency" option when creating a new project, and using our EU subdomain during all API calls.

| API | Standard Server | EU Residency Server |
|-------|-------------------------|--------------------------------|
| [Ingestion API](https://developer.mixpanel.com/reference/ingestion-api) | `api.mixpanel.com` | `api-eu.mixpanel.com` |
| [Query API](https://developer.mixpanel.com/reference/query-api) | `mixpanel.com/api` | `eu.mixpanel.com/api` |
| [Raw Data Export API](https://developer.mixpanel.com/reference/raw-data-export-api) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Data Pipelines API](https://developer.mixpanel.com/reference/create-warehouse-pipeline) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Lexicon Schemas API](https://developer.mixpanel.com/reference/lexicon-schemas-api) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects` |
| [Connectors API](https://developer.mixpanel.com/reference/connectors-api) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects`|

For existing projects, you can find where your data is currently stored under Project Settings > Data Residency. Additionally, projects stored in the EU will have a url that starts with eu.mixpanel.com whereas projects stored in the US will have a mixpanel.com url. If the wrong Data Residency location was chosen prior to implementation, you will need to create a new project with the applicable data storage option and migrate all your existing data. Mixpanel cannot assist with the migration of an existing project with the wrong residency location. You can find out more about creating a new project here.


## Using Our SDKs
Next you'll need to set the server location to EU when initializing the Mixpanel library. You can find instructions for the required config settings for each SDK below:
- [JavaScript](/docs/tracking-methods/sdks/javascript#eu-data-residency)
- [Objective-C](/docs/tracking-methods/sdks/ios#eu-data-residency)
- [Swift](/docs/tracking-methods/sdks/swift#eu-data-residency)
- [Android](/docs/tracking-methods/sdks/android#eu-data-residency)
- [Python](/docs/tracking-methods/sdks/python#eu-data-residency)
- [Java](/docs/tracking-methods/sdks/java#eu-data-residency)
- [Ruby](/docs/tracking-methods/sdks/ruby#eu-data-residency)
- [Node.js](/docs/tracking-methods/sdks/nodejs#eu-data-residency)
- [React Native](/docs/tracking-methods/sdks/react-native#eu-data-residency)
- [Flutter](/docs/tracking-methods/sdks/flutter#eu-data-residency)

## Querying Mixpanel Data in the EU
Once you've set the server location to EU, please notify Mixpanel so we can set your project's cluster to `mixpanel-prod-eu`.

To do so, reach out to your Relationship Manager, Customer Success Manager, or Account Executive and they can help coordinate this change. Once the setup is complete, you can log into your account at `eu.mixpanel.com` and query data in any Mixpanel report.

## Log in via SSO
If you want the IdP initiated flow to direct to [eu.mixpanel.com](https://eu.mixpanel.com/), prepend "eu." to your postback URL. For example, [mixpanel.com/security/login/1](https://mixpanel.com/security/login/1) would need to be changed to [eu.mixpanel.com/security/login/1](https://eu-mixpanel.com/security/login/1). 

## EU Residency and CDPs

If you are coming to use Mixpanel from a Customer Data Platform (CDP), we cannot guarantee that data ingestion, processing and storage will always stay within the EU region. Please work with your CDP to make sure they are sending your data to the EU endpoint. 

The following diagram shows how Mixpanel's Data Residency works:

![image](/230121513-b3a8bb84-4a64-45d9-ad41-f38b3fe977ea.png)

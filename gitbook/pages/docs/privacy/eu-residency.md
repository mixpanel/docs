# EU Residency


## Overview
Mixpanel believes in respecting and protecting people’s fundamental online privacy and data rights, which is why we've built Mixpanel's analysis tools in compliance with industry best practices and global data regulations like the GDPR and the CCPA.

Visit our [Privacy Hub](https://mixpanel.com/legal/privacy-hub/) to see how we comply with various privacy guidelines.

## Storing Your Data in the European Union
By default, Mixpanel stores user data on its US Servers via the Google Cloud Platform. However, Mixpanel also provides you with the option to process and store your customers' personal data in Europe via our [EU Data Residency Program](https://mixpanel.com/legal/eu-data-residency). 
You can enable this by selecting the "EU Data Residency" option when creating a new project and using our EU subdomain during all API calls.

> ⚠️ Important: For new EU projects created on or after August 18, 2025, no data will be ingested into your new EU data residency project unless your SDK is sending data to the EU endpoint. Ensure you are using the EU endpoint in your SDK configuration.
> For EU Projects created before August 18, 2025, US-to-EU Data Forwarding ends July 2026, please ensure you are using the EU endpoint in your SDK configuration. See [changelog here](https://docs.mixpanel.com/changelogs/2026-02-20-eu-forwarding-deprecation).

For existing EU projects created prior to August 18, 2025, we encourage you to update your SDK configuration to use the dedicated EU endpoint. This is a best practice that ensures your project is correctly aligned with its data residency.

| API | Standard Server | EU Residency Server |
|-------|-------------------------|--------------------------------|
| [Ingestion API](https://developer.mixpanel.com/reference/ingestion-api) | `api.mixpanel.com` | `api-eu.mixpanel.com` |
| [Query API](https://developer.mixpanel.com/reference/query-api) | `mixpanel.com/api` | `eu.mixpanel.com/api` |
| [Raw Data Export API](https://developer.mixpanel.com/reference/raw-data-export-api) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Data Pipelines API](https://developer.mixpanel.com/reference/create-warehouse-pipeline) | `data.mixpanel.com/api/2.0/nessie` | `data-eu.mixpanel.com/api/2.0/nessie` |
| [Lexicon Schemas API](https://developer.mixpanel.com/reference/lexicon-schemas-api) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects` |

You can find where your data is stored under Project Settings > Data Residency for existing projects. Additionally, projects stored in the EU will have a URL that starts with 'eu.mixpanel.com', whereas projects stored in the US will have a 'mixpanel.com' URL. If the wrong Data Residency location was chosen before implementation, you will need to create a new project with the applicable data storage option and migrate all your existing data. Mixpanel cannot assist with migrating an existing project with the wrong residency location. You can find out more about creating a new project [here](../orgs-and-projects/managing-projects.md#creating-projects).


## Using Our SDKs
Next, you'll need to set the server location to EU when initializing the Mixpanel library. You can find instructions for the required config settings for each SDK below:
- [JavaScript](../tracking-methods/sdks/javascript.md#eu-data-residency)
- [Objective-C](../tracking-methods/sdks/ios.md#eu-data-residency)
- [Swift](../tracking-methods/sdks/swift.md#eu-data-residency)
- [Android](../tracking-methods/sdks/android.md#eu-data-residency)
- [Python](../tracking-methods/sdks/python.md#eu-data-residency)
- [Java](../tracking-methods/sdks/java.md#eu-data-residency)
- [Ruby](../tracking-methods/sdks/ruby.md#eu-data-residency)
- [Node.js](../tracking-methods/sdks/nodejs.md#eu-data-residency)
- [React Native](../tracking-methods/sdks/react-native.md#eu-data-residency)
- [Flutter](../tracking-methods/sdks/flutter.md#eu-data-residency)

## Log in via SSO
If you want the IdP-initiated flow to direct to [eu.mixpanel.com](https://eu.mixpanel.com/), prepend "eu." to your postback URL. For example, `mixpanel.com/security/login/1` would need to be changed to `eu.mixpanel.com/security/login/1`.

## EU Residency and CDPs

If you are coming to use Mixpanel from a Customer Data Platform (CDP), we cannot guarantee that data ingestion, processing, and storage will always stay within the EU region. Please work with your CDP to ensure they are sending your data to the EU endpoint. 

The following diagram shows how Mixpanel's Data Residency works:

![image](/230121513-b3a8bb84-4a64-45d9-ad41-f38b3fe977ea.png)

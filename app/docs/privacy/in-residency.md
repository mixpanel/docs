# India Data Residency


## Overview
Mixpanel believes in respecting and protecting people’s fundamental online
privacy and data rights, which is why we've built Mixpanel's analysis tools in
compliance with industry best practices and global data regulations like India's
DPDPA.

Visit our [Privacy Hub](https://mixpanel.com/legal/privacy-hub/) to see how we comply with various privacy guidelines.

If you would like access to the India Data Center, reach out to your Mixpanel account manager or [contact us here](https://mixpanel.com/m/india-mixpanel-analytics-for-fintech/).

## Storing Your Data in India
Mixpanel provides you with the option to process and store your customers'
personal data in India via our India Data Residency Program. You can enable this
by selecting the "India Data Residency" option when creating a new project and
using our India subdomain during all API calls.

**⚠️ Important:** No data will be ingested to your India data residency project unless your SDK is sending data to the India endpoint. Ensure you are using the India endpoint in your SDK configuration.

| API | Standard Server | India Residency Server |
|-------|-------------------------|--------------------------------|
| [Ingestion API](https://developer.mixpanel.com/reference/ingestion-api) | `api.mixpanel.com` | `api-in.mixpanel.com` |
| [Query API](https://developer.mixpanel.com/reference/query-api) | `mixpanel.com/api` | `in.mixpanel.com/api` |
| [Raw Data Export API](https://developer.mixpanel.com/reference/raw-data-export-api) | `data.mixpanel.com/api/2.0/export` | `data-in.mixpanel.com/api/2.0/export` |
| [Data Pipelines API](https://developer.mixpanel.com/reference/create-warehouse-pipeline) | `data.mixpanel.com/api/2.0/nessie` | `data-in.mixpanel.com/api/2.0/nessie` |
| [Lexicon Schemas API](https://developer.mixpanel.com/reference/lexicon-schemas-api) | `mixpanel.com/api/app/projects` | `in.mixpanel.com/api/app/projects` |

You can find where your data is stored under Project Settings > Data Residency for existing projects. Additionally, projects stored in the India will have a URL that starts with 'in.mixpanel.com', whereas projects stored in the US will have a 'mixpanel.com' URL. If the wrong Data Residency location was chosen before implementation, you will need to create a new project with the applicable data storage option and migrate all your existing data. Mixpanel cannot assist with migrating an existing project with the wrong residency location. You can find out more about creating a new project [here](/docs/orgs-and-projects/managing-projects#creating-projects).


## Using Our SDKs

Next, you'll need to set the server location to India when initializing the Mixpanel library.
**This is required for all SDKs.** No data will be ingested to your India data residency project unless your SDK is sending data to the India endpoint.
You can find instructions for the required config settings for each SDK below:

- [JavaScript](/docs/tracking-methods/sdks/javascript#india-data-residency)
- [Objective-C](/docs/tracking-methods/sdks/ios#india-data-residency)
- [Swift](/docs/tracking-methods/sdks/swift#india-data-residency)
- [Android](/docs/tracking-methods/sdks/android#india-data-residency)
- [Python](/docs/tracking-methods/sdks/python#india-data-residency)
- [Java](/docs/tracking-methods/sdks/java#india-data-residency)
- [Ruby](/docs/tracking-methods/sdks/ruby#india-data-residency)
- [Node.js](/docs/tracking-methods/sdks/nodejs#india-data-residency)
- [React Native](/docs/tracking-methods/sdks/react-native#india-data-residency)
- [Flutter](/docs/tracking-methods/sdks/flutter#india-data-residency)

## Log in via SSO
If you want the IdP initiated flow to direct to [in.mixpanel.com](https://in.mixpanel.com/), prepend the "in." subdomain to your postback URL. For example, `mixpanel.com/security/login/1` would need to be changed to `in.mixpanel.com/security/login/1`.

## India Residency and Customer Data Platforms (CDPs)

If you are coming to use Mixpanel from a CDP, please work with your CDP to ensure they are sending your data to the India endpoint. No data will be ingested to your India data residency project unless your CDP is sending data to the India endpoint.

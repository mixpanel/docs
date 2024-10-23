# Privacy Overview
Mixpanel believes in respecting and protecting people’s fundamental online privacy and data rights. This is why we've built Mixpanel's analysis tools in compliance with industry best practices and global data regulations like the GDPR and the CCPA.

Visit our [Privacy Hub](https://mixpanel.com/legal/privacy-hub/) to see how we comply with various privacy guidelines.

## Storing Your Data in the European Union
By default, Mixpanel stores user data on its US Servers via the Google Cloud Platform.
However, Mixpanel also provides you with the option to process and store your customers' personal data in Europe via our [EU Data Residency Program](https://mixpanel.com/topics/data-residency-for-mixpanel/).
You can enable this by selecting the "EU Data Residency" option when creating a new project and using our EU subdomain during all API calls.

| API | Standard Server | EU Residency Server |
|-------|-------------------------|--------------------------------|
| [Ingestion API](https://developer.mixpanel.com/reference/ingestion-api) | `api.mixpanel.com` | `api-eu.mixpanel.com` |
| [Query API](https://developer.mixpanel.com/reference/query-api) | `mixpanel.com/api` | `eu.mixpanel.com/api` |
| [Raw Data Export API](https://developer.mixpanel.com/reference/raw-data-export-api) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Data Pipelines API](https://developer.mixpanel.com/reference/create-warehouse-pipeline) | `data.mixpanel.com/api/2.0/export` | `data-eu.mixpanel.com/api/2.0/export` |
| [Lexicon Schemas API](https://developer.mixpanel.com/reference/lexicon-schemas-api) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects` |
| [Connectors API](https://developer.mixpanel.com/reference/connectors-api) | `mixpanel.com/api/app/projects` | `eu.mixpanel.com/api/app/projects`|

## Using Our SDKs
Next, you'll need to set the server location to EU when initializing the Mixpanel library. You can find instructions for the required config settings for each SDK below:

- [JavaScript](/docs/tracking-methods/sdks/javascript#eu-data-residency)
- [Objective-C](/docs/tracking-methods/sdks/ios#eu-data-residency)
- [Swift](/docs/tracking-methods/sdks/ios#eu-data-residency)
- [Android](/docs/tracking-methods/sdks/android#eu-data-residency)
- [Python](/docs/tracking-methods/sdks/python#eu-data-residency)
- [Java](/docs/tracking-methods/sdks/java#eu-data-residencyy)
- [PHP](/docs/tracking-methods/sdks/php#eu-data-residency)
- [Ruby](/docs/tracking-methods/sdks/ruby#eu-data-residency)
- [Node.js](/docs/tracking-methods/sdks/nodejs#eu-data-residency)
- [React Native](/docs/tracking-methods/sdks/react-native)
- [Flutter](/docs/tracking-methods/sdks/flutter#eu-data-residency)

## Log in via SSO
If you want the IdP initiated flow to direct to [eu.mixpanel.com](https://eu.mixpanel.com/), prepend "eu." to your postback URL. For example, [mixpanel.com/security/login/1](https://mixpanel.com/security/login/1) would need to be changed to [eu.mixpanel.com/security/login/1](https://eu.mixpanel.com/security/login/1).

## Manage Personal Data
[Mixpanel deletion and retrieval APIs](https://developer.mixpanel.com/reference/gdpr-api) are in place to help Mixpanel implementations meet the requirements outlined by the General Data Protection Regulation (GDPR) legislation.


> 📘GDPR Request Rate Limits
> You can batch up to 2000 distinct IDs per deletion request and up to 2000 for a retrieval request. Request rates are limited for GDPR API requests.

### User Opt-Out
While the following API can be used to delete or retrieve personal data as outlined by the GPDR, it is important to also opt users out of subsequent tracking. If tracking using a client-side Mixpanel library, you can opt users out of tracking using Mixpanel's opt-out methods. These are available in the following client-side libraries:
* [JavaScript](/docs/tracking-methods/sdks/javascript#opting-users-out-of-tracking)
* [iOS - Objective-C](/docs/tracking-methods/sdks/ios#opting-users-out-of-tracking)
* [iOS - Swift](/docs/tracking-methods/sdks/swift#opting-users-out-of-tracking)
* [Android](/docs/tracking-methods/sdks/android#opting-users-out-of-tracking)

See Mixpanel’s [Managing Personal Information](/docs/privacy/protecting-user-data) guide for more information on best practices when handling personal information in Mixpanel.

### Authentication
Authentication occurs via a user-specific OAuth token with a scope that only includes the following deletion and retrieval APIs. Users can retrieve this token from their [Account Settings](https://mixpanel.com/settings/account#data-privacy) by selecting their initials in the top right of Mixpanel and selecting **Profile & Preferences**, and then the Data & Privacy tab. The OAuth token has a one-year expiry. It should be passed in the Authentication header. Users are eligible to generate an OAuth token if they are the [project owner](/docs/orgs-and-projects/roles-and-permissions#project-roles), or if they are a project owner or admin of a project that supports [team member roles](/docs/orgs-and-projects/roles-and-permissions#project-roles).

![](/Personal-Data-and-Privacy-Settings.png)

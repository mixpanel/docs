## Setting Up Mixpanel

### Mixpanel Organization
Each Mixpanel customer is assigned an [Organization](https://help.mixpanel.com/hc/en-us/articles/360020461952#organizations-introduction) which serves as the controlling entity for managing all your Mixpanel analytics needs.

- [Pricing / Billing Plan](https://help.mixpanel.com/hc/en-us/categories/115000963103#billing-and-plans) - determines data volume limits and features available across all projects in the organization
- [Mixpanel Project(s)](https://help.mixpanel.com/hc/en-us/categories/115000963103#project-configuration) - container for product's analytics data (events, properties, user profiles, reports, etc.)
- [User Account(s)](https://help.mixpanel.com/hc/en-us/categories/115000963103#account-and-organization) - used to sign into Mixpanel given the appropriate role for organization and project level access
- Other organization settings - [teams](https://help.mixpanel.com/hc/en-us/articles/360020731831-Create-and-Manage-Teams), [service accounts](https://developer.mixpanel.com/reference/service-accounts), [access security (SSO/ 2FA)](https://help.mixpanel.com/hc/en-us/categories/115000963103#access-and-security), [data & privacy](https://help.mixpanel.com/hc/en-us/sections/115001299023-Data-Security-and-Privacy), etc.

### Mixpanel Projects
Each Mixpanel organization contains one or more [Projects](https://help.mixpanel.com/hc/en-us/articles/115004505106-Create-and-Manage-Projects) that house events, properties, user profiles, and other reporting metadata that can be created with EU data residency if applicable.

- [Timezone](https://help.mixpanel.com/hc/en-us/articles/115004547203-Manage-Timezones-for-Projects-in-Mixpanel) - [dates](https://help.mixpanel.com/hc/en-us/articles/115004547063#date) (including timestamps) are ingested in UTC and converted to the project’s configured timezone for reporting. 
- Access Keys
  - [Project Token](https://help.mixpanel.com/hc/en-us/articles/115004502806) - used solely for ingestion to identify (not authenticate) a project when collecting data in front-end implementations (client-side SDKs or Ingestion API)
  - [API/Project Secret](https://help.mixpanel.com/hc/en-us/articles/115004490503#api-secret) - legacy authentication for importing and exporting data, Service Accounts are the preferred and should be used where possible as API SDecret will be deprecated over time
- Other project settings - [group keys](https://help.mixpanel.com/hc/en-us/articles/360025333632#implementation), [data views](https://help.mixpanel.com/hc/en-us/articles/360043782572), [service accounts](https://developer.mixpanel.com/reference/service-accounts), [public dashboard](https://help.mixpanel.com/hc/en-us/articles/4402022733844), [sessions](https://help.mixpanel.com/hc/en-us/articles/115004695223), etc.

#### Create at least 2 Mixpanel Projects (Production/Live and Development/Sandbox)
Mixpanel recommends tracking 1 product with multiple platforms (mobile, web, etc.) into one project, but [separate projects for development and production](https://help.mixpanel.com/hc/en-us/articles/360001354886-Automatically-Separate-Development-Data). There may be [factors](https://help.mixpanel.com/hc/en-us/articles/115004491683-When-To-Use-Multiple-Projects#factors-to-consider) where implementing separate projects is required, please refer to the Mixpanel Help.

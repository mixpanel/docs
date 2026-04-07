# Overview

Mixpanel supports API endpoints that can query, export, and import data as well as manipulate Mixpanel metadata (such as data definitions).

The API endpoints are organized by the function that they support. The API structure is as follows:

### [**Ingestion API**](./ingestion-api/ingestion-api.md)

**Standard Server:** `api.mixpanel.com`
**EU Residency Server:** `api-eu.mixpanel.com`
**India Residency Server:** `api-in.mixpanel.com`
Use the Ingestion API to get your data into Mixpanel. This includes live events, historical imports, and user profile data.

{% hint style="warning" %}
To ensure data ingests into your project, use the correct Ingestion API subdomain for your project's data residency. For more information, you can learn more about: [EU Residency](https://docs.mixpanel.com/docs/privacy/eu-residency) and [IN Residency](https://docs.mixpanel.com/docs/privacy/in-residency).
{% endhint %}

### [**Query API**](./query-api/query-api.md)

**Standard Server:** `mixpanel.com/api`
**EU Residency Server:** `eu.mixpanel.com/api`
**India Residency Server:** `in.mixpanel.com/api`
Use the Query AP to get the same calculated data the powers Mixpanel's web application. This includes Insights, Funnels, Retention, and custom JQL Queries.

### [**Raw Data Export API**](./event-export-api/raw-data-export-api.md)

**Standard Server:** `data.mixpanel.com/api/2.0/export`
**EU Residency Server:** `data-eu.mixpanel.com/api/2.0/export`
**India Residency Server:** `data-in.mixpanel.com/api/2.0/export`
Use the Raw Data Export API endpoint to obtain your event data. This API supports direct download or uploading to a cloud bucket.

### [**Data Pipelines API**](./data-pipelines-api/overview-2.md)

**Standard Server:** `data.mixpanel.com/api/2.0/nessie`
**EU Residency Server:** `data-eu.mixpanel.com/api/2.0/nessie`
**India Residency Server:** `data-in.mixpanel.com/api/2.0/nessie`
Use the Data Pipelines API to export Mixpanel data to your own Data Warehouse. Mixpanel’s Data Pipelines product removes the need to build complex connectors, maintain exporting code, and apply ad-hoc data transformations.

### [**Lexicon Schemas API**](./lexicon-schemas-api/lexicon-schemas-api.md)

**Standard Server:** `mixpanel.com/api/app/projects`
**EU Residency Server:** `eu.mixpanel.com/api/app/projects`
**India Residency Server:** `in.mixpanel.com/api/app/projects`
Use the Schemas API to manage your data definitions in Lexicon and Data Audit

### [**GDPR API**](./gdpr-api/gdpr-api.md)

**Standard Server:** `mixpanel.com/api/app/data-retrievals`
**EU Residency Server:** `eu.mixpanel.com/api/app/data-retrievals`
**India Residency Server:** `in.mixpanel.com/api/app/data-retrievals`
The retrieval and deletion API calls are updated for version 3 and are made for GDPR and CCPA compliance.

### [**Warehouse Connectors API**](./warehouse-connectors-api/warehouse-connectors-api.md)

**Standard Server:** `mixpanel.com/api/app/projects`
**EU Residency Server:** `eu.mixpanel.com/api/app/projects`
**India Residency Server:** `in.mixpanel.com/api/app/projects`
Use the Warehouse Connectors API to manually run a warehouse imports.

### [**Feature Flags API**](./feature-flags-api/feature-flags-api.md)

**Standard Server:** `api.mixpanel.com/flags`
**EU Residency Server:** `api-eu.mixpanel.com/flags`
**India Residency Server:** `api-in.mixpanel.com/flags`
Use the Feature Flags API to assign your users to variants for experiments, rollout, and releases.

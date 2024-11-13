---
title: "Overview"
slug: "overview"
hidden: false
createdAt: "2020-08-13T17:28:39.814Z"
updatedAt: "2024-08-05T19:31:43.295Z"
---

Mixpanel supports API endpoints that can query, export, and import data as well as manipulate Mixpanel metadata (such as data definitions).

The API endpoints are organized by the function that they support. The API structure is as follows:

### [**Ingestion API**](ref:ingestion-api)

**Standard Server:** `api.mixpanel.com`
**EU Residency Server:** `api-eu.mixpanel.com`
**India Residency Server:** `api-in.mixpanel.com`
Use the Ingestion API to get your data into Mixpanel. This includes live events, historical imports, and user profile data.

### [**Query API**](ref:query-api)

**Standard Server:** `mixpanel.com/api`
**EU Residency Server:** `eu.mixpanel.com/api`
**India Residency Server:** `in.mixpanel.com/api`
Use the Query AP to get the same calculated data the powers Mixpanel's web application. This includes Insights, Funnels, Retention, and custom JQL Queries.

### [**Raw Data Export API **](ref:raw-data-export-api)

**Standard Server:** `data.mixpanel.com/api/2.0/export`
**EU Residency Server:** `data-eu.mixpanel.com/api/2.0/export`
**India Residency Server:** `data-in.mixpanel.com/api/2.0/export`
Use the Raw Data Export API endpoint to obtain your event data. This API supports direct download or uploading to a cloud bucket.

### [**Data Pipelines API**](ref:overview-2)

**Standard Server:** `data.mixpanel.com/api/2.0/nessie`
**EU Residency Server:** `data-eu.mixpanel.com/api/2.0/nessie`
**India Residency Server:** `data-in.mixpanel.com/api/2.0/nessie`
Use the Data Pipelines API to export Mixpanel data to your own Data Warehouse. Mixpanel’s Data Pipelines product removes the need to build complex connectors, maintain exporting code, and apply ad-hoc data transformations.

### [**Lexicon Schemas API**](ref:lexicon-schemas-api)

**Standard Server:** `mixpanel.com/api/app/projects`
**EU Residency Server:** `eu.mixpanel.com/api/app/projects`
**India Residency Server:** `in.mixpanel.com/api/app/projects`
Use the Schemas API to manage your data definitions in Lexicon and Data Audit

### [**GDPR API**](ref:gdpr-api)

**Standard Server:** `mixpanel.com/api/app/data-retrievals`
**EU Residency Server:** `eu.mixpanel.com/api/app/data-retrievals`
**India Residency Server:** `in.mixpanel.com/api/app/data-retrievals`
The retrieval and deletion API calls are updated for version 3 and are made for GDPR and CCPA compliance.

### [**Warehouse Connectors API**](ref:warehouse-connectors-api)

**Standard Server:** `mixpanel.com/api/app/projects`
**EU Residency Server:** `eu.mixpanel.com/api/app/projects`
**India Residency Server:** `in.mixpanel.com/api/app/projects`
Use the Warehouse Connectors API to manually run a warehouse imports.

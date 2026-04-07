# Table of contents

* [Overview](README.md)
* [Authentication](authentication/service-accounts.md)
* [Segmentation Expressions](segmentation-expressions.md)
* [Rate Limits](rate-limits.md)
## Ingestion API

* [Overview](ingestion-api/ingestion-api.md)
* [Authentication](ingestion-api/ingestion-api-authentication.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: ingestion
  ```

## Identity API

* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: identity
  ```

## Query API

* [Overview](query-api/query-api.md)
* [Authentication](query-api/query-api-authentication.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: query
  ```

## Event Export API

* [Overview](event-export-api/raw-data-export-api.md)
* [Authentication](event-export-api/raw-data-export-api-authentication.md)
* [Authentication (when workspaces ship)](event-export-api/authentication-1.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: export
  ```

## Lexicon Schemas API

* [Overview](lexicon-schemas-api/lexicon-schemas-api.md)
* [Authentication](lexicon-schemas-api/lexicon-schemas-api-authentication.md)
* [Limits](lexicon-schemas-api/limits.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: lexicon-schemas
  ```

## Data Pipelines API

* [Overview](data-pipelines-api/overview-2.md)
* [Authentication](data-pipelines-api/authentication-2.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: data-pipelines
  ```

## Partner Integrations

* [Partner Cohort Integrations](partner-integrations/partner-cohort-integrations.md)

## Service Accounts API

* [Overview](service-accounts-api/service-accounts-api.md)
* [Authentication](service-accounts-api/service-accounts-api-authentication.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: service-accounts
  ```

## Annotations API

* [Overview](annotations-api/overview-1.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: annotations
  ```

## GDPR API

* [Overview](gdpr-api/gdpr-api.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: gdpr
  ```

## Warehouse Connectors API

* [Overview](warehouse-connectors-api/warehouse-connectors-api.md)
* [Authentication](warehouse-connectors-api/warehouse-connectors-api-authentication.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: warehouse-connectors
  ```

## Feature Flags API

* [Overview](feature-flags-api/feature-flags-api.md)
* ```yaml
  type: builtin:openapi
  props:
    models: false
    downloadLink: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: feature-flags
  ```


---
title: Create Pipeline
category:
  uri: Data Pipelines API
content:
  excerpt: ''
privacy:
  view: public
---
This request creates an export pipeline. The `type` parameter defines the kind of pipeline that is initiated. Note that only 2 recurring and 1 non-recurring events pipelines (**data\_source**: `events`) are allowed per project.

Create API returns the name of the pipeline created. Use the name of the pipeline to check the status of or cancel the pipeline.

> **Important:** For BigQuery pipelines, `gcp_project` and `bq_dataset_name` are **required** fields. Mixpanel-hosted BigQuery is not supported.

> **Important:** For Snowflake pipelines, customer-hosted credentials (`snowflake_account_name`, `snowflake_warehouse`, `snowflake_storage_integration`, `snowflake_user`, `snowflake_password`, `snowflake_role`, `snowflake_database`, `snowflake_schema`) are **required**. Only password-based authentication is supported. Mixpanel-hosted Snowflake is not supported.

---
title: Create Pipeline
category:
  uri: Data Pipelines API
content:
  excerpt: ""
privacy:
  view: public
---

This request creates an export pipeline. The `type` parameter defines the kind of pipeline that is initiated. Note that only 2 recurring and 1 non-recurring events pipelines (**data_source**: `events`) are allowed per project.

Create API returns the name of the pipeline created. Use the name of the pipeline to check the status of or cancel the pipeline.

> **Note:** For BigQuery pipelines, the `gcp_project` and `bq_dataset_name` parameters are required. Mixpanel-hosted BigQuery is not supported.

---
title: "Create Pipeline"
slug: "create-warehouse-pipeline"
excerpt: ""
hidden: false
createdAt: "2022-02-18T20:12:47.076Z"
updatedAt: "2023-09-26T21:06:37.984Z"
---

This request creates an export pipeline. The `type` parameter defines the kind of pipeline that is initiated. Note that only 2 recurring and 1 non-recurring events pipelines (**data_source**: `events`) are allowed per project.

Create API returns the name of the pipeline created. Use the name of the pipeline to check the status of or cancel the pipeline.

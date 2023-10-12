---
title: "Get Pipeline"
slug: "get-warehouse-pipeline-status"
excerpt: ""
hidden: false
createdAt: "2022-02-18T20:12:47.078Z"
updatedAt: "2023-09-26T21:06:38.030Z"
---

Given the name of the pipeline this API returns the status of the pipeline. It returns the summary and status of all the recent run export jobs for the pipeline.

**Example Response:** Status with no Summary and a Filter

```sh
curl https://data.mixpanel.com/api/2.0/nessie/pipeline/status \
  -u API_SECRET: \
  -d name="YOUR_PIPELINE_NAME" \
  -d status="running"
```

**Example Response:** Status with no Summary and a Filter

```json
{
  "canceled": [
    {
      "name": "company-july-2016-backfill-hourly-monoschema",
      "state": "canceled",
      "last_finish": "0000-12-31T16:00:00-08:00",
      "run_at": "2016-07-26T00:00:00-07:00",
      "from_date": "2016-07-26T00:00:00-07:00",
      "to_date": "2016-07-26T00:00:00-07:00"
    },
  ]
}
```

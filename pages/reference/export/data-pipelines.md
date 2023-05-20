TODO: clean this up, have a clear walkthrough in "Create Pipeline" with examples for all cases we expect people to use. Add cURLs to others.

The Data Pipelines API contains a list of endpoints that are supported by Mixpanel that help you create and manage your data pipelines. Read our [Data Pipelines guide](/docs/other-bits/data-pipelines) for a full overview.


## Create Pipeline
This request creates an export pipeline. The `type` parameter defines the kind of pipeline that is initiated.

TODO: put a bunch of examples here.

## Edit Pipeline


## List Pipeline Logs
This endpoint returns the timestamps of all syncs grouped by date.


## List Pipelines
This API endpoint returns a list of all pipelines in a project.

## Get Pipelines
Given the name of the pipeline this API returns the status of the
pipeline. It returns the summary and status of all the recent run export
jobs for the pipeline.


**Example Response:** Status with no Summary and a Filter

```curl
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
}
```

## Resume Pipeline
For a given pipeline name, this request resumes the pipeline if it's paused---

## Pause Pipeline
Pause a currently running pipeline.

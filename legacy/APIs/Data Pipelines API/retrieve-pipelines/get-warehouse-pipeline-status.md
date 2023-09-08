---
title: "Get Pipeline"
slug: "get-warehouse-pipeline-status"
excerpt: "Given the name of the pipeline this API returns the status of the\npipeline. It returns the summary and status of all the recent run export\njobs for the pipeline.\n\n\n**Example Response:** Status with no Summary and a Filter\n\n```curl\ncurl https://data.mixpanel.com/api/2.0/nessie/pipeline/status \\\n  -u API_SECRET: \\\n  -d name=\"YOUR_PIPELINE_NAME\" \\\n  -d status=\"running\"\n```\n\n**Example Response:** Status with no Summary and a Filter\n\n```json\n{\n  \"canceled\": [\n    {\n      \"name\": \"company-july-2016-backfill-hourly-monoschema\",\n      \"state\": \"canceled\",\n      \"last_finish\": \"0000-12-31T16:00:00-08:00\",\n      \"run_at\": \"2016-07-26T00:00:00-07:00\",\n      \"from_date\": \"2016-07-26T00:00:00-07:00\",\n      \"to_date\": \"2016-07-26T00:00:00-07:00\"\n    },\n}\n```"
hidden: false
createdAt: "2022-02-18T20:12:47.078Z"
updatedAt: "2023-09-08T15:38:21.813Z"
---

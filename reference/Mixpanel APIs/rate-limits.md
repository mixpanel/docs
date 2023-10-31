---
title: "Rate Limits"
slug: "rate-limits"
hidden: false
createdAt: "2023-10-31T15:28:39.814Z"
updatedAt: "2023-10-31T15:38:48.152Z"
---
We enforce a rate limit on our API to ensure the integrity of our system as well as prevent a single project from monopolizing the avaialble resources for other projects. Getting a 429 response code from our API means that you have reached our rate-limit.

The rate limits are as follows:

### [**Ingestion API**](ref:ingestion-api) 
2GB of uncompressed JSON/minute or ~30k events per second, measured on a rolling 1 minute basis. Please click [here] (https://developer.mixpanel.com/reference/import-events#rate-limits) for more details.


### [**Query API**](ref:query-api) 
A maximum of 5 concurrent queries and 60 queries per hour.

### [**Raw Data Export API **](ref:raw-data-export-api) 
A maximum of 100 concurrent queries, 60 queries per hour, and 3 queries per second.


### [**Lexicon Schemas API**](ref:lexicon-schemas-api) 
The Lexicon Schemas API imposes an 8mb body size limit and the request cannot take longer than two minutes. If you are running up against these limits, we suggest breaking your request into smaller batches. Usually these limits are only hit if you are attempting to do a bulk create/update.


### You can reduce rate limiting errors using one of the two approaches:

* Spread your queries out over a longer period of time.
* Consolidate multiple queries into a single query (for example, multiple queries filtering on a single property may be combined into a single segmentation query).

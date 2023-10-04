# Rate Limits

## Ingestion Endpoints

See our [developer docs](https://developer.mixpanel.com/reference/import-events#rate-limits) for ingestion rate limits.

## Export & Query API Rate Limits

The Export & Query API endpoint rate limit rules _per project_ are as follows:

[Raw Export API](https://developer.mixpanel.com/reference/raw-event-export) (endpoint: data.mixpanel.com/api/2.0/export): A maximum of 100 concurrent queries, 60 queries per hour, and 3 queries per second.

[Query API](https://developer.mixpanel.com/reference/query-api) (endpoint: mixpanel.com/api/query/): A maximum of 5 concurrent queries and 60 queries per hour.

[JQL API](https://developer.mixpanel.com/reference/query-jql) (endpoint: mixpanel.com/api/query/jql): Queries to the JQL endpoint contribute to Query API rate limit and have their own individual limit as well. There is a maximum of 5 concurrent queries and of 60 queries per hour. There is also a 5 GB limit on data that can be processed in a single query, and a 2 GB limit on the resulting output data.

[Compliance Retrieval API](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data#rate-limit): We currently have a rate-limit of 1 request per second for GDPR APIs. We also limit maximum number of outstanding scans for a single project to be approximately 5 years.

_If you exceed the rate limit, a 429 error will be returned._


### You can reduce rate limiting errors using one of the two approaches:

* Spread your queries out over a longer period of time.
* Consolidate multiple queries into a single query (for example, multiple queries filtering on a single property may be combined into a single segmentation query).

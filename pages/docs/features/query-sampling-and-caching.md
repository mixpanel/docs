# Query Sampling and Caching

## Overview
Mixpanel has built-in features to improve the query performance of your project. This includes query-time sampling to shorten the querying duration and query result caching to pre-render results from a previous query.

## Query Time Sampling

Query-time sampling allows you to query a subset of users and shorten the time it takes for a report to load results. The Insights, Funnels, Retention and Flows reports all support sampling at query time.

This feature is available to enterprise customers with over 5 million [MTUs](/docs/admin/pricing-plans#mtu-calculation) or over 2 billion monthly events.

### Enable or Disable Query Time Sampling

Navigate to the report where you would like to enable or disable sampling at time of query.

### Enable Sampling

From the report in which you would like to use sampling, click the **lightning bolt** in the upper right corner of the query builder.

![/13109650264596](/13109650264596.png)

This will enable sampling on the report, and will be indicated by the lightning bolt symbol turning blue. The percentage of the total that is included in the query calculations will be indicated in the top right corner of the query builder.

### Disable Sampling

To turn off sampling, click the lightning bolt symbol in the upper right corner of the query builder again.

The lightning bolt symbol will turn grey to indicate that sampling is disabled.

### Query Time Sampling Calculation and Presentation

Mixpanel will not sample, or drop, events at ingestion. Instead, Mixpanel will ingest all event data and sample at query time. This prevents the loss of important data, and therefore allows you to toggle sampling on and off depending on need.

For example, if you have a need for iterative querying, then sampling will greatly speed up this process. When you build the proper query, you can turn off sampling and query the entire dataset.

The following occurs when sampling is enabled:

1. Mixpanel selects a uniformly random sample of users on which to run the analysis.
2. The sample size is 10% of the total population.
3. The report is generated using that subset of users.
4. Mixpanel up-samples the data by multiplying by the inverse of the sampling factor. This is done for [functions](/docs/reports/insights) such as totals and uniques. Functions that do not scale with users (average, min, max) will not be up-sampled.
5. The effect is that numbers should closely approximate results seen without sampling enabled. This works better as the number of users increases, particularly for customers with more than 5 million users.
6. Mixpanel adds an annotation to reports.

### Saved Reports with Query Time Sampling

If you save a report that uses query time sampling, then a version of the report *without* sampling is saved. This ensures that Boards and saved reports are computed on the entire dataset for high fidelity.

## Query Result Caching

Mixpanel stores the results from a report query in cache, and presents these results from cache when appropriate. This saves time when running a complicated query multiple times, and allows you to surface previously calculated results near-instantaneously. The date range of the query will adjust how Mixpanel presents results from the cache.

- If the query date range is over 30 days, then the query results are cached for up to 24 hours.
- If the query date range is 30 days or under, then the query results are cached for up to 3 hours.
- If the query date range is 1 day, then the query results are cached for up to 15 minutes.

You can see While this highlights the default cache behavior, you can always refresh a report to include the most current data.

![/Cache_Update.png](/Cache_Update.png)

You can also view when the most recent update was in Boards by hovering over report cards.

![/Dashboard_Cache.png](/Dashboard_Cache.png)

### Refreshing the Query Results Cache

To refresh the query results cache, navigate to an Insights report and click the **Refresh** button at the top of the query builder.

![/Refresh_Cache.png](/Refresh_Cache.png)

To refresh query results cache in a Board, click the three dots in the top of the Board, and then click the **Refresh all cards** button.

![/Dashboard_Refresh.png](/Dashboard_Refresh.png)

If the cached result is less than 1 min old, we always serve from cache without running a new background query.

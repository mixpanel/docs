# Visualizations

## Overview

The Retention report feature multiple visualizations to help you understand how your users are retained over time.


## Retention Curve

<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/c5c83d9dd0c24d5a8ab9596c8d592e95" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

The retention curve chart displays retention data as both a line chart and a table. Data is identical between the two. The line chart provides a visual representation of users becoming inactive over time, while the table provides a heat map to show which groups have the best retention.

![/Screen_Shot_2021-05-27_at_7.49.12_AM.png](/Screen_Shot_2021-05-27_at_7.49.12_AM.png)

###Incomplete Buckets
Boxes with an asterisk (\*) indicate that the data is still in flux and not set yet because the time is still ongoing. Hover over a box to see when the last qualifying date for that bucket will occur.

###Color Mapping
Each box within a row is assigned a shade of purple. The shading gets darker the higher the retention percentage. It's important to note that the scale is relative to each cohort row.

#### User Cohort Buckets

Retention counts users, not event totals. In other words, each of the user cohort buckets will include every unique user that did the "A event" criteria in that time window, starting at 0:00 of the first day of the bucket and ending midnight of the last day. A customer can only be counted once per bucket, but can be included in more than one bucket.

The first column (Date) indicates the day/week/month when the user performed the "A event". The Size column indicates the number of users that performed the "A event" within the time period.

For example, if you are bucketing based on your "Item Purchased" event and creating weekly buckets, a customer who purchased at least one item each week will be in every bucket, not just the bucket of their first purchase.

#### Retention Time Unit Buckets

Retention Time Unit buckets correlate to the time interval defined in your [Retention Criteria](/docs/reports/retention/retention-criteria/). This is dynamically calculated, based on when your users entered the User Cohort Bucket.

For example, if 2 users are in the same April 1st User Cohort Bucket, but user A entered at 2AM and user B entered at 6PM, the < 1 Day retention time unit bucket for user A is between April 1st 2AM to April 2nd 1:59AM, while the < 1 Day retention time unit bucket for user B is April 1st 6PM to April 2nd 5:59PM.

## Line chart

![/Retention Line Chart](/Retention_Trend.png)

Select **Line** from the visualization drop-down list to see how your retention metrics are changing over time. You can see how your retention rate or number of users retained is trending. You can see this trend for any of the retention time unit buckets and change between the different time unit buckets (i.e. < 1 Day, Day 1, Day 2, ...) to see if your retention metrics are improving or declining along your retention curve. Learn how to select your retention group [here](/docs/reports/retention/retention-criteria#retention-groups).

## Metric chart

Select **Metric** from the visualization drop-down list to see the performance of your retention metric aggregated across the entire date range. You can target a specific retention time unit bucket by [selecting a retention group]((/docs/reports/retention/retention-criteria#retention-groups)).

## Find Interesting Segments

Determine which users are either driving retention or behaving as outliers by using the built-in “Find Interesting Segments” feature.

Find Interesting Segments can help you discover:

- Whether certain property segments outperform the overall retention rates.
- Which cohorts perform the best to get ideas on optimizing cohort behavior.
- Which segments are under-performing.
- Changes in the retention rates of segments.

User properties are not yet supported.

View the top and bottom converting segments in your retention report by clicking the **Find interesting segments** button at the bottom of the retention chart. This feature is not currently available for Frequency Retention.

![/10037069627156](/10037069627156.png)

Rather than searching through multiple segment breakdowns to find significant data, this feature automatically identifies that data for you. Mixpanel combs through your event properties and cohorts, and show you which of those segments retain at a higher or lower rate than average.

An email that breaks down the top and bottom retaining segments of your Retention report based on changes on retention rates is automatically sent after you click the button.

### Interpret Email Results

When your analysis email says “no interesting segments”, this means that none of the segments you analyzed were behaving significantly differently from the overall population at a large enough volume. To resolve this issue, try extending the date range of the report or try a different report.

If the analysis request included dates in the past five days, and is sent from mobile SDK, data may be delayed and therefore not included at the time of the analysis. Likewise, the date window selected might still fall under conversion window, and more conversions have yet to come through.

Results are sorted by taking into consideration the property, the number of users in the report, as well as the deviation from overall retention behavior to surface the most meaningful segments to you.

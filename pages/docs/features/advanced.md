# Advanced

## Query Builder Features

### Session Metric Analysis

![/Screen_Shot_2022-07-11_at_3.53.47_PM.png](/Screen_Shot_2022-07-11_at_3.53.47_PM.png)

Analyze session metrics by selecting "Session Start" or "Session End" from the events list. Learn more about using Sessions in Insights, Funnels, and Flows [here](/docs/features/sessions).

### Inline Filtering

Filter this event by clicking the **inline action menu** and selecting **Add filter** from the drop-down. Choose an event property, user profile property, group profile property, or cohort to filter the event by.

![image](https://github.com/mixpanel/docs/assets/2077899/9307d6c1-025c-4bb4-9ab3-12f9ab1c7ce3)

You can select whether you would like your query to match any or all of the filters by clicking on **and/or** beside the filters.

![image](https://github.com/mixpanel/docs/assets/2077899/1b8cdb9d-2479-404c-b10a-f82373d03e34)

### Duplicating Events

To duplicate any events or properties in your query, select the inline action menu and choose **Duplicate**. Delete any events or properties by clicking the **trash** icon.

![image](https://github.com/mixpanel/docs/assets/2077899/f496b609-47a3-4287-95f8-e9e6f2ac915d)

### Advanced Date and Time Selectors

You can also choose how Mixpanel buckets the time range in Insights, Funnel Trends and Retention Trend reports (granularity may vary). To view a range in hours, you can select **Hour** as the view:

![image](https://github.com/mixpanel/docs/assets/2077899/991a0f0f-b297-4b94-8d41-7323fe6666f6)

To zoom in, click on the graph and drag to highlight a specific window of time in your report. Click **Reset zoom** to return to the previous view.

![zoom (1)](https://github.com/mixpanel/docs/assets/2077899/3add64ad-3fea-4d74-a3bf-303fcc1f4d9d)

### Advanced Filter & Breakdown Usage

To filter the results of your report by any property or cohort, click the **Filter** button.

To break down the results of your report by any property or cohort, click the **Breakdown**.

You can break down your results by the "Time" event property and break down by Hour, Day, Week, Month, Quarter, Year, Hour of Day, or Day of Week.

![/breakdown_by_date.gif](/breakdown_by_date.gif)

If you are analyzing any custom events, you can break them down by the property "Event Name".

![image](https://github.com/mixpanel/docs/assets/2077899/dafe97ca-35a3-4dee-8285-41a115f0417d)

The drop-down menus only show events/event properties that were ingested within the last 30 days. To select events/event properties that have not been ingested in the last 30 days, type the name of the event/event property in the Filter or Breakdown search bar. You must know the exact name of the event/event property you want to select because event names are case-sensitive.

![/query_old_event.gif](/query_old_event.gif)

To create a temporary cohort for the current report, click **Create Custom...** in the dropdown menu and select "Cohort. A window will pop up where you can specify the restrictions of your cohort. Learn more about building a cohort [here](/docs/users/cohorts#creating-cohorts).

![/create_cohort_from_report.gif](/create_cohort_from_report.gif)


## View Users

View Users is a streamlined process for exploring the users contributing to a specific metric or point on a chart. By interacting with the chart, you can view a group of users experiencing friction or dig deep into which users are driving feature adoption.

View Users can help you:

- See the users contributing to any metric and view their recent activities & properties.
- Save these users as a cohort.
- Export these users to a CSV file.

### Insights

![/View_Users_Insights_gif.gif](/View_Users_Insights_gif.gif)

- To learn more about your users who recently **Signed Up** at a specific point in time, you can click any point on a chart or line to access View Users. The View Users overlay **displays the list of users contributing to your chosen point on the chart**.
- By clicking on one of these users, you can further **explore their User Properties** like experiment group, purchase count, last event, and many more.
- While viewing a specific user, you can also **discover their recent activities** (\*Like, Comment, Message Sent, Ad Conversion,\* etc) after **Sign Up** through the Activities menu.

### Funnels

![/View_Users_Funnels_gif.gif](/View_Users_Funnels_gif.gif)

- Finding the **exact group of users who dropped off** after **Sign Up** is possible through View Users in Funnels. While in a Funnels report, click on the section of the chart that displays non-converting users and select View Users - this displays the list of those who didn’t convert after signup.
- **Save this group as a cohort** by clicking the Create Cohort button. Now, you can learn more about their product usage or find the root cause of why they didn’t convert after Sign Up.

### Retention

![/View_Users_Retention_gif.gif](/View_Users_Retention_gif.gif)

- View Users in Retention report presents you with two options - view retained users and view dropped-off users. This is helpful to **find the specific group of users who were engaged or dropped off** after **Sign Up** over a period of time.
- **Export your group of choice to a CSV with one click**. This data can guide meaningful actions, like emailing your user group a note that helps them get unstuck and engaged.

## Keyboard Shortcuts

### Undo / Redo Shortcuts

Undo / redo shortcuts allow for fast adjustments to your analysis. `Cmd + Z` to undo; `Cmd + Shift + Z` to redo. Change filters, date ranges, line vs bar chart, and go back in one second to compare before and after, or fix the view.

![/Undo_Redo_gif.gif](/Undo_Redo_gif.gif)

- **Navigate different report versions**: add a new event, filter, or breakdown and undo that change with `Cmd + Z`. This makes iterating between different versions of your report quick and easy.
- **Compare visualizations**: go from a bar chart to a line chart, to a pie chart, and all the way back, while only using the undo / redo keyboard shortcuts.

## Comparison: Time, Baseline and Overall

Once you have visualized a metric you are interested in, you want to compare it against related metrics to gain further insight. Previously, only comparing against past values was supported, but there are now 3 different ways to compare your metrics. The ability to do and show comparisons across segments is also supported in Boards, so any report saved will also reflect in Boards.

### Time Comparisons

![/Screen_Shot_2021-09-22_at_4.38.05_PM.png](/Screen_Shot_2021-09-22_at_4.38.05_PM.png)

The compare-to-past menu has been modified to include the new comparison options, but users can continue to find the same-time comparison options that existed before under the new "Compare" menu.

### Time Comparison - Absolute Values

![/Screen_Shot_2021-09-22_at_4.40.26_PM.png](/Screen_Shot_2021-09-22_at_4.40.26_PM.png)

This is the same default behavior that existed previously. When you compare to a time period users will see a solid line for the present data, and a dashed line for data in the time comparison period.

### Time Comparison - Percentage change over Baseline

This can be activated by selecting the "Percent change over Baseline" option in the controller next to the comparison menu.

![/Screen_Shot_2021-09-22_at_4.40.41_PM.png](/Screen_Shot_2021-09-22_at_4.40.41_PM.png)

When this view is activated, users will see the percentage difference from one time period to another. This is the same value that was shown in the tooltip, but now users are able to show how segments are shrinking and growing over time. This also makes it easier to see relative performance between different segments.

![/Screen_Shot_2021-09-22_at_4.50.52_PM.png](/Screen_Shot_2021-09-22_at_4.50.52_PM.png)

These values are also reflected in the segmentation table below the chart.

### Increase over Baseline

Another comparison type that is now natively supported in Mixpanel is the ability to set a segment as a baseline from which other segments are compared against. This allows users to compare different segments across the same time period.

![/Screen_Shot_2021-09-22_at_4.50.28_PM.png](/Screen_Shot_2021-09-22_at_4.50.28_PM.png)

![/Screen_Shot_2021-09-22_at_4.50.36_PM.png](/Screen_Shot_2021-09-22_at_4.50.36_PM.png)

To enable, choose the "Increase over Baseline" option in the compare menu, then choose the segment that you wish to be the baseline.

![/Screen_Shot_2021-09-22_at_4.53.21_PM.png](/Screen_Shot_2021-09-22_at_4.53.21_PM.png)

Notice that because "Home supplies" is chosen at the baseline, it appears on the chart as a flat 0 line - this is because "Home supplies" always has a 0% difference against itself in the same time period.

Also note that the y-axis can go below 0, because segments can perform better or worse than the selected baseline, like "Entertainment" above.

### Percentage of Overall

This option allows users to see how segments perform as a percentage of the total. Mixpanel will proactively disable this option when this comparison option won't give meaningful results.

![/Screen_Shot_2021-09-22_at_5.10.53_PM.png](/Screen_Shot_2021-09-22_at_5.10.53_PM.png)

To enable, open the Compare menu and select "Percentage of Overall"

![/Screen_Shot_2021-09-22_at_5.17.27_PM.png](/Screen_Shot_2021-09-22_at_5.17.27_PM.png)

### Why do the values in Compare to Overall not add up to 100%?

Depending on the type of metric, the percentages may not add up to 100%. This is because the value is being compared to the unsegmented value. For example, if you were you segment Total "Add Item to Cart" events by "Category", then the values should sum up to 100% since an item might not be a part of different categories.

However, if the metric was "average price", then the average price across all categories might be $10. Within individual categories, the average price might be lower or higher, and that is the comparison being done by "Compare to Overall". In this case, the percentage values would not add up to 100%.

More generally, if the metric is summable, and the groups are mutually exclusive, then the percentages will add up to 100%. if the metric is a non-counting metric like uniques or percentile aggregation, the percentages will not add up to 100%. Another example is if the breakdown is by cohorts, where users can be members of multiple cohorts, the percentages will not sum to 100%.

### Supported Charts

Comparisons are supported across all insights chart types. Depending on the exact configuration chosen, certain comparison operations may be disabled.

| Chart Type | Time Comparison Supported | Percentage change over Baseline Supported | Percentage of Overall Supported |
| --- | --- | --- | --- |
| Insights Line | Yes | Yes | Yes |
| Insights Stacked Line | No | No | Yes |
| Insights Bar | Yes | Yes | Yes |
| Insights Stacked Bar | Yes | No | No |
| Insights Pie | No | No | No |
| Insights Metric | Yes | Yes | Yes |
| Funnels Steps | Yes | Yes | No |
| Funnel Trends | Yes | Yes | No |
| Retention Curve | No | Yes | No |
| Retention Trends | Yes | Yes | No |

## Analyzing First Time Users

Sometimes, you might want to filter an event to only the first time that it's performed by a user. This helps answer the following questions:

* How many users sign up or perform another key event for the first time each week?
* Which referrers do most first-time users come from?
* How quickly do users make a purchase after their first time engaging with the app?
* How well do users retain after performing a key event for the first time?
* What events do users perform before and after making their first purchase?

You can do this by adding a First Time Filter to any event in Mixpanel. This filters the event down to only the first instance of the event performed by a user:

![233894752-93851682-9d83-4c87-937d-8fd90db465c6.png](https://user-images.githubusercontent.com/2077899/233894752-93851682-9d83-4c87-937d-8fd90db465c6.png)

Mixpanel computes this on-the-fly by scanning each user's history to determine if this was the first instance of the event performed by the user, based on timestamp.
Note that when there's a tie in the timestamps of the first event (eg: the user does multiple first-time Purchases in the same second), all of those events will be considered the "first time" and will match the filter. The impact will be that Mixpanel includes multiple events for those users, so if you break down by user ID, you may see that the user did multiple first events.

### Nth Time
You can analyze the Nth time an event was performed by using a First Time Filter in funnels. For example, this shows you the number of users that do Tutorial Complete 3 times:

![233895123-bc2dd00f-5dde-4e43-82fe-081173abf0e4.png](https://user-images.githubusercontent.com/2077899/233895123-bc2dd00f-5dde-4e43-82fe-081173abf0e4.png)

## Behavioral Properties

Behavioral properties allow you to use your user's activity and use it as a property in your other analysis. A behavioral property is a virtual property, meaning it's not a property that you are explicitly tracking, but a property that Mixpanel can compute and allow you to use in analysis.

Behavioral properties can be used anywhere, most typically in filters and breakdowns.

### Frequency per User

After selecting this option, you must select an event to compute the frequency of. You can use this to segment your users by how many times they did an event, or use it to filter out users to only those who did an event a certain number of times.

### Aggregate Property per User

After selecting this option, you must select an event, and then a property on that event. Finally, you can choose an aggregation type for this property. You can use this to segment your users by this property aggregation. For example, you may want to filter only for users who have greater than 100 minutes of video watch time, or you may want to segment users by their watch time.

### Time Range

#### Per Interval

In insights, the time in which this computation is done is on a per-interval basis. For a line chart, that will be for each individual interval plotted on the chart. For bar, table, and pie, this interval is the entire date range selected in the date picker.

#### Between Steps

In funnels, the behavioral property is computed in the time range between 2 steps in your funnel. You can specify which steps in the funnel this applies to. In the case of doing "Frequency per User", the event count does not include the events that make up the funnel itself, and **only** the events between the funnel steps.

#### After Step 1

In retention, the behavioral property is computed in the chosen time range after the entry event, up until the expiration window. For example, there may be a 7-day window in which we're looking for an event. Even if the retaining action happens before the 7 days are up, we continue to count additional events.

## Company health and activation metrics 

### Company Profiles

This page gives you a view into all your company health - including key metrics, and company profile properties (i.e company attributes) 

Company Health Metrics on the page include - understanding company usage (DAU, WAU, MAU, new users), users’ engagement level (activity per user, lifecycle of user), and their retention (Day 1, Week 1, and Month 1) 

You can view the definition of each metric by clicking on the metric card, which will open the underlying Mixpanel report 

NOTE
1. To access this page - click on Users/ Companies → Company Profile
2. This is only available if you have set up a B2B Company Key, an option available in the Group Analytics package.

![image](/B2B_Company_Profiles.webp) 

### Activation Metrics 

SaaS companies often have use cases like the one below, where you’re trying to segment companies based on how many and the quality of users. (Examples - what are the number of trial accounts that have > 2 active users?)  The hypothesis is that these will convert faster. What you want to do here is to be able to break down account activity by the number of active users 

We now have a new computed property (in both breakdown and filter) - **“Number of users who did…”**, available on our group analytics package that enables answering the above type of questions

![image](/B2B_Activation_1.webp)

When using as a breakdown, we show you how many downloads came from different types of account health i.e 605 downloads came from accounts with 0 active users, ~1.5 downloads through the 30 days came from accounts with 2 active users, where “active user” is defined by both the activity (eg. document created) and frequency of activity (eg. ≥1 t times)

In a line chart, we look for activity per interval - i.e in the below daily chart, we’re looking for activity qualification per day (i.e. an active user is one who has created at least one document in that day). 

So below shows on Aug 19th - there were 35 accounts that downloaded the document. Of the 35, 32 accounts had only 1 active user, 2 accounts had 2 active users, and 1 account had 28 active users! But since most downloads came from accounts with just 1 active user, there is no correlation possibly between account document download activity to account health

![image](/B2B_Activation_2.webp)


## Find Interesting Segments

Determine which users are either driving conversion and retention or behaving as outliers by using the built-in “Find Interesting Segments” feature.

Find Interesting Segments can help you discover:

- Whether certain property segments outperform the overall funnel conversion or retention rates.
- Cohorts that perform bests to optimize for those behaviors.
- Segments that are under-performing.
- Changes in the conversion or retention rates of segments.
- Change in population over time in funnels.

User properties are not yet supported.

### Interesting Segments in Funnels

View the top and bottom converting segments in your funnel by clicking the **Find interesting segments** button at the bottom of the segmentation chart.

![/10038188905364](/10038188905364.png)

Rather than searching through multiple property breakdowns to find significant data, this feature automatically identifies this data for you. Mixpanel combs through your event properties and cohorts to show you which of those segments convert higher or lower than average, and are therefore statistically significant.

There are two reports you will receive in your email: segment analysis and time comparison.

### Segment Analysis

An email that breaks down the top and bottom converting segments of your funnel based on statistical significance and other factors is automatically sent after you click the button. If no statistically significant segments are found, then the email shows non-statistically significant segments.

Segment Analysis helps answer questions such as:

- Which groups of users are driving my conversion rate?
- Which groups of users are decreasing my conversion rate?

This is done by examining which segments of users are converting at a high rate and have a large enough population size, or which segments are converting at a low rate and have a large enough population size. In the first scenario, this segment would raise the overall conversion rate, while in the second scenario, this segment would be lowering the overall conversion rate.

### Time Comparison

A time comparison chart is also included in the email. This chart shows a segment's behavior over time (in terms of both conversion rate change and population size change) as it relates to the overall population trend (population and conversion rate change).

Time comparison answers questions such as:

- Which groups of users are trending in a way that is different from the overall behavior?
- Which groups of users are driving the overall behavior?

Mixpanel automatically compares the currently selected date period to the previous one. For example, if you are viewing the current week, the email will compare to the week before.

### Interesting Segments in Retention

View the top and bottom converting segments in your retention report by clicking the **Find interesting segments** button at the bottom of the retention chart. This feature is not currently available for Frequency Retention.

![/10037069627156](/10037069627156.png)

Rather than searching through multiple segment breakdowns to find significant data, this feature automatically identifies that data for you. Mixpanel combs through your event properties and cohorts and shows you which of those segments retain at a higher or lower rate than average.

An email that breaks down the top and bottom retaining segments of your Retention report based on changes in retention rates is automatically sent after you click the button.

### Interpret Email Results

When your analysis email says “no interesting segments”, this means that none of the segments you analyzed were behaving significantly differently from the overall population at a large enough volume. To resolve this issue, try extending the date range of the report or try a different report.

If the analysis request included dates in the past five days and is sent from mobile SDK, data may be delayed and therefore not included at the time of the analysis. Likewise, the date window selected might still fall under the conversion window, and more conversions have yet to come through.

Results are sorted by taking into consideration the property, the number of users in the report, as well as the deviation from overall conversion or retention behavior to surface the most meaningful segments to you.

## Query Time Sampling

Query-time sampling allows you to query a subset of users and shorten the time it takes for a report to load results. The Insights, Funnels, Retention, and Flows reports all support sampling at query time.

This feature is available to enterprise customers with over 5 million [MTUs](/docs/admin/pricing-plans#mtu-calculation) or over 2 billion monthly events.

### Enable or Disable Query Time Sampling

Navigate to the report where you would like to enable or disable sampling at the time of the query.

### Enable Sampling

From the report in which you would like to use sampling, click the **lightning bolt** in the upper right corner of the query builder.

![/13109650264596](/13109650264596.png)

This will enable sampling on the report and will be indicated by the lightning bolt symbol turning blue. The percentage of the total that is included in the query calculations will be indicated in the top right corner of the query builder.

### Disable Sampling

To turn off sampling, click the lightning bolt symbol in the upper right corner of the query builder again.

The lightning bolt symbol will turn grey to indicate that sampling is disabled.

### Query Time Sampling Calculation and Presentation

Mixpanel will not sample, or drop, events at ingestion. Instead, Mixpanel will ingest all event data and sample it at query time. This prevents the loss of important data and, therefore, allows you to toggle sampling on and off depending on need.

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

Mixpanel stores the results from a report query in our server cache and presents these results from there when appropriate. This saves time when running a complicated query multiple times, and allows you to surface previously calculated results near-instantaneously. The date range of the query will adjust how Mixpanel presents results from the server cache.

- If the query date range is 1 year or over, then the query results are cached for up to 14 days.
- If the query date range is under 1 year, then the query results are cached for up to 7 days.
- If the query date range is under 6 months, then the query results are cached for up to 3 days.
- If the query date range is under 2 months, then the query results are cached for up to 2 days.
- If the query date range is under 1 month, then the query results are cached for up to 1 day.
- If the query date range is under 1 week, then the query results are cached for up to 12 hours.
- If the query date range is under 1 day, then the query results are cached for up to 1 hour.

While this highlights the default server cache behavior, you can always refresh a report to include the most current data as described below.

### Refreshing the Query Results Cache

To refresh the query results cache, navigate to the report, click the three dots overflow menu at the top of the report, select **Refresh Data**.

![public/Refresh_Data_Report.png](/Refresh_Data_Report.png)

To refresh the query results' cache in a Board, click the three dots overflow menu at the top of the Board, and select **Refresh Data**.

![public/Refresh_Data_Board.png](/Refresh_Data_Board.png)

To refresh the query results' cache in a Board card, click the three dots overflow menu at the top of the card, and select **Refresh Data**. 

![public/Refresh_Data_Board_Card.png](/Refresh_Data_Board_Card.png)

## Event and Property Limitations

While all reports in Mixpanel utilize your event data and properties to deliver insight into your business, not all reports can use all event types or properties.

Reports use events and properties to target users, segment data, and filter data. This guide will clarify which reports can use which event types and properties.

**Insights:** All event types and properties are available in Insights to break down and filter data.

**Funnels:** Funnels can be calculated by unique or total events. All event types and properties are available to break down and filter data.

**Retention:** Retention only counts total users, not unique. However, all event types and properties are available to filter data.

**Signal:** Signal uses only event properties, not user profile properties. However, all event types are available to filter data.

**Users:** All event types and properties are available in Users.
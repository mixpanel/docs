# Reports

## Overview

A report is the basic unit of performing an analysis in Mixpanel.

Mixpanel has several types of reports: [Insights](/docs/reports/insights), [Funnels](/docs/reports/funnels), [Flows](/docs/reports/flows), [Retention](/docs/reports/retention) and other advanced reports, each with their specialized use.

This article focuses on the common concepts across each report.

## Report

A report is the basic unit of performing an analysis in Mixpanel. A report can be saved to a board, and a board can contain many reports. Each report is made up of at least one **metric** and is displayed using the chosen **visualization**.

## Metrics

A metric is a some sort of **measurement** on a **behavior**. An example of a metric is "Unique Users" doing "Sign up", which is the measurement of unique users, on the behavior of "Sign up".

## Behaviors

A behavior is an event or a sequence of events performed within some criteria. A behavior can be something simple like a single event, or it can be something more complex like doing a multi step funnel.

## Measurements

A measurement is a selection on how to summarize behaviors. Depending on the behavior, certain measurements may be not be possible. For example, for a single event, you cannot measure the conversion rate of it. Some examples of measurements are: total events, unique users, total sessions, conversion rate, retention rate and aggregate property. The measurement is chosen at the bottom left area of the metric.

![measurement](/report-measurement.png)

## Visualizations

In the top right, you can change the type of visualization for your report. The options available will depend on the type of report that you started with. In this case, we switched to a bar view, allowing us to see the total number of "Log In" across the entire time range, allowing us a summarized view that is easily scanned.

![/Screen_Shot_2022-07-11_at_3.07.02_PM.png](/Screen_Shot_2022-07-11_at_3.07.02_PM.png)

## Filters

Filters are used to narrow events or behaviors that qualify for analysis. For example, you may want to only consider "Sign Up" events that came from Android. In this case you would you be filtering the "Sign Up" event to only include the "Sign Up" events where the property "Device" is equal to "Android".

### Global Filters

A global filter applies to the entire report. by properties or cohorts by clicking the **Filter** button. This will filter the results of the entire report to show only data with that property or cohort.

![image](/global-filter.png)

### Inline Filters

An inline filter applies to one particular event in the report.

Add a filter to your query by clicking on the **…** icon beside an event, profile, cohort, or step.

![image](https://github.com/mixpanel/docs/assets/2077899/3e36bd7e-f5b8-462a-890c-bf396ff98f69)

Then, select a property from the drop down list that appears and specify which values to filter.

![image](https://github.com/mixpanel/docs/assets/2077899/c7cce429-3c9c-4759-8ea1-b09345fa0b4e)

In Funnels, filtering a step by a particular property will limit the data you see in the funnel to events with that property value.

You can choose multiple property filters for each item in your query.

You can select whether you would like the query to match any of these filters, or all of the filters by clicking on **and/or** beside the filters.

![image](https://github.com/mixpanel/docs/assets/2077899/9e3bcd31-2b12-48d1-b04f-cdda85dd2584)

### First Time Ever Filter

Sometimes, you might want to filter an event to only the first time that it's performed by a user. This helps answer the following questions:

* How many users sign up or perform another key event for the first time each week?
* Which referrers do most first time users come from?
* How quickly do users make a purchase after their first time engaging with the app?
* How well do users retain after performing a key event for the first time?
* What events do users perform before and after doing their first purchase?

You can do this by adding a First Time Filter to any event in Mixpanel. This filters the event down to only the first instance of the event in a **user's entire history**. (not the first time they tracked the event inside the report date range)

![233894752-93851682-9d83-4c87-937d-8fd90db465c6.png](https://user-images.githubusercontent.com/2077899/233894752-93851682-9d83-4c87-937d-8fd90db465c6.png)

Mixpanel computes this on-the-fly by scanning each user's history to determine if this was the first instance of the event performed by the user, based on timestamp.

## Breakdowns

Breakdown groups the results of your metrics in Insights, Funnels, Flows, or Retention reports by a property or cohort, allowing you to examine which properties or cohorts have a significant impact on your query.

This feature is useful for determining if a group factor, such as browser type, is having an impact on the way users interact with your product. Breakdown will display counts, such as the number of events performed or the conversion rates with that property value.

Select the **Breakdown** button, and select the property or cohort you want to breakdown your results by.

![image](/report-breakdown.png)

For cohorts, you will be shown groups of users both in and not in the cohort in your results.

It is only possible to either group by properties or group by cohorts, but not both.

## View Users

View Users is a streamlined process for exploring the users contributing to a specific metric or point on a chart. By interacting with the chart, you can view a group of users experiencing friction or dig deep into which users are driving feature adoption.

View Users can help you:

- See the users contributing to any metric and view their recent activities & properties.
- Save these users as a cohort.
- Export these users to a CSV file.

![/View_Users_Insights_gif.gif](/View_Users_Insights_gif.gif)


## Query Builder Features

### Events Menu

This is the menu that appears under "Add Metric" or "Select Step".

By default, the event menu shows all events, except for [hidden events](/docs/data-governance/lexicon#hide-events-and-properties).

If you organize your events using [tags](/docs/data-governance/lexicon) in Lexicon, the tags will show up as filtering options in the event menu. When you select a tag, a list of events that share the same tag appears:

![/Untitled__1_.png](/Untitled__1_.png)

#### View Sample Events

You can hover over any event and in the context panel, you now have the ability to "View Sample Events", which redirects you to the Events page with the 100 most recent samples of that hovered event:
You can see a few samples of an event to help you decide whether that's the right event you want for your analysis or which property you should use for filters/breakdowns.

![View Sample Events](/advanced-view-sample-events.gif)

### Properties Menu

This menu appears when adding a filter, an inline filter on an event or breakdown.

By default, the menu shows "all properties". This includes event properties, profile properties, group properties, lookup properties, cohorts.

You can select the following filtering options to show a subset of the properties in the menu:

- Select "event properties" to show only the [Event properties](/docs/data-structure/events-and-properties).
- Select "user properties" to show only the [Profile properties](/docs/data-structure/events-and-properties).
- Select "cohorts" to show only the [Cohorts](/docs/users/cohorts).
- If you set up [Group Analytics](/docs/data-structure/advanced/group-analytics), the Group keys will show up individually under their display names. You can select any Group key to show only the Group properties relevant to the selected Group key:

    ![/Mixpanel__project_3____Mixpanel_2021-11-18_12-00-58.png](/Mixpanel__project_3____Mixpanel_2021-11-18_12-00-58.png)

#### Understanding Prefixes in the Menu

The events and properties in the menu are prefixed to provide additional context about the properties' type. They will be removed when additional context is not needed.

- Event properties are not prefixed (except in [User report's menu](/docs/reports/overview):

    ![/Screen_Shot_2021-11-18_at_12.26.25_PM.png](/Screen_Shot_2021-11-18_at_12.26.25_PM.png)

- User properties are prefixed by "User": "User" prefix is removed in [User report's menu](/docs/reports/overview) or once you filter the menu by "user properties".

    ![/Screen_Shot_2021-11-18_at_12.25.13_PM.png](/Screen_Shot_2021-11-18_at_12.25.13_PM.png)

- Cohorts are prefixed by "In Cohort": "In Cohort" prefix is removed once you filter the menu by "cohorts".

    ![/Mixpanel__project_3____Mixpanel_2021-11-18_12-36-35.png](/Mixpanel__project_3____Mixpanel_2021-11-18_12-36-35.png)

- Group profile properties are prefixed by the Group key display name: Group key prefix is removed once you filter the menu by a specific Group key.

    ![/Screen_Shot_2021-11-18_at_12.37.54_PM.png](/Screen_Shot_2021-11-18_at_12.37.54_PM.png)

- [Lookup properties](/docs/data-structure/lookup-tables) are prefixed by the mapped property. Let's say "Timezone" is mapped to a Lookup Table that contains "UTC Offset" and "UTC Offset (DST)", these lookup properties will be prefixed by "Timezone"

    ![/Screen_Shot_2021-11-18_at_12.29.00_PM.png](/Screen_Shot_2021-11-18_at_12.29.00_PM.png)

- Lookup properties can also be prefixed by both "User" and the mapped property to indicate that they are lookup properties of a user property

    ![/Screen_Shot_2021-11-18_at_12.29.06_PM.png](/Screen_Shot_2021-11-18_at_12.29.06_PM.png)

### Typecasting

Mixpanel allows you to force Properties into another [data type](https://help.mixpanel.com/hc/en-us/articles/115004547063) by using the **"Data Type"** option in the overflow menu for property filters and breakdowns.

![/Kapture_2022-01-04_at_11.38.41.gif](/Kapture_2022-01-04_at_11.38.41.gif)

Typecasting is helpful when one of your properties is a number but is sent to Mixpanel as a string and you want to see histogram data for that property. Or if one of your properties is a unix timestamp and got sent as a number, and you want it to be treated as a date Property instead.

**How do I see the exact numeric values when applying a breakdown to a number data type in Insights?**

Insights will automatically bucket high-cardinality segments of number data types into ranges.

You can either customize the ranges by clicking "[Customize Range](/docs/features/advanced#custom-buckets)".

Or alternatively, if you'd like to see the exact numeric values you can typecast the Number property to a String to remove the range bucketing.

### Duplicating Query Elements

To duplicate any events or properties in your query, select the inline action menu and choose **Duplicate**. Delete any events or properties by clicking the **trash** icon.

![image](https://github.com/mixpanel/docs/assets/2077899/f496b609-47a3-4287-95f8-e9e6f2ac915d)

### Rename an Event within a Report

Click on the "three dots" icon beside an event and click Rename to rename it. This will only affect the current report, and will not change the event's name in other reports.

### Undo and Redo

The undo/redo keyboard shortcuts allow for fast adjustments to your analysis. `Cmd + Z` to undo; `Cmd + Shift + Z` to redo. Change filters, date ranges, line vs bar chart, and go back in one second to compare before and after, or fix the view.

![/Undo_Redo_gif.gif](/Undo_Redo_gif.gif)

- **Navigate different report versions**: add a new event, filter or breakdown and undo that change with `Cmd + Z` . This makes iterating between different versions of your report quick and easy.
- **Compare visualizations**: go from a bar chart, to a line chart, to a pie chart and all the way back while only using the undo / redo keyboard shortcuts.




## Date and Time Selector

Determine the time range of a query by clicking on the date range selector. The date range selector is common across all reports.

All dates and times in Mixpanel reflect the project timezone. The default on most reports is “Last 30 days” (displayed as "30D"), but there are a variety of pre-set options, as well as the option to select a custom date range.

![date rate](/date-range.png)

For these date ranges, the output shows results from the last complete 30 days, plus any results from the current incomplete day.

| Preset | Description |
| --- | --- |
| Today | Includes the current incomplete day up to the current second. |
| Yesterday | Includes the whole of the previous day from midnight to midnight. |
| Last 7 days | Last 7 days and the query count from the current incomplete day up to the current second. |
| Last 30 days | Last 30 days and the query count from the current incomplete day up to the current second. |
| Last 3 months | Last 3 months and the query count from the current incomplete day up to the current second. |
| Last 6 months | Last 6 months and the query count from the current incomplete day up to the current second. |
| Last 12 months | Last 12 months and the query count from the current incomplete day up to the current second. |
| Week to Date | From midnight of the start of the current week up to the current second. |
| Month to Date | From midnight of the start of the current month up to the current second. |
| Quarter to Date | From midnight of the start of the current quarter up to the current second. |
| Year to Date | From midnight of the start of the current year up to the current second. |

### Select a Date Range

Selecting **Custom** on the date range selector opens up some additional options, "Last", "Fixed" and "Since".

#### Last

“In the last” allows you to select a rolling time range similar to the default “last 30 days” but you have the flexibility to choose the time value and scale, either days, weeks, or months.

![/Screen_Shot_2022-07-11_at_3.17.05_PM.png](/Screen_Shot_2022-07-11_at_3.17.05_PM.png)

If you need to, you can click on the **+ Ending** button and shift back the desired time window by a selected amount of days. So for instance in the example below, we are still looking at a 2-week window that is shifted by 7 days back. This is a rolling date range and if this report is saved as a bookmark or added to a dashboard the actual dates will continue to update to show this relative time period vs. Today.

![/Screen_Shot_2022-07-11_at_3.18.03_PM.png](/Screen_Shot_2022-07-11_at_3.18.03_PM.png)

#### Fixed

“Fixed” allows you to select two dates to query between or a select particular day to query by entering the same start & end date. If you save this report as a bookmark or add it to the dashboard, the date range selection will always persist.

![/Screen_Shot_2022-07-11_at_3.21.03_PM.png](/Screen_Shot_2022-07-11_at_3.21.03_PM.png)

#### Since

“Since” allows you to select a specific date to query for all data since that start date.

#### To Date

"To Date" allows you select a date rnge that will update dynamically to fit the current internval. You can choose Week to Date, Month to Date, Quarter to Date and Year to Date. When the boundary of interval is passed, the date range will automatically update to include only the current interval. For example, if "Month to Date" was selected, and the date was February 27, the date range would include Feb 1 - Feb 27. The next week, after the month boundary has passed the date range would include Mar 1 - Mar 4.
To Date respects start of week and start of quarter settings under project settings.

### Line Chart Interval

You can also choose how Mixpanel buckets the time range in Insights, Funnel Trends and Retention Trend reports (granularity may vary). To view a range in hours, you can select **Hour** as the view:

![image](https://github.com/mixpanel/docs/assets/2077899/991a0f0f-b297-4b94-8d41-7323fe6666f6)

### Line Chart Zoom
To zoom in, click on the graph and drag to highlight a specific window of time in your report. Click **Reset zoom** to return to the previous view.

![zoom (1)](https://github.com/mixpanel/docs/assets/2077899/3add64ad-3fea-4d74-a3bf-303fcc1f4d9d)


## Comparisons

Comparisons allow you to compare metrics, or broken down segments of metrics against each other. Depending on the type of comparison type, you are also able see the lift of a segment or metric against another.

### Time Period Comparison

Compare to past allows for comparing a metric against itself on a different time period. You are able to compare against the previous day, week, month, quarter and year. You are also able choose a custom time comparison window.

> Note that if a data point for a previous year falls on a weekend, the data point is automatically moved to the next Monday to give a clearer picture of the data change from one year to the next.

Hover over a segment to see the details on the time-period selected.

![/compare_to_past.png](/compare_to_past.png)

By default, Mixpanel will visualize the values for both time periods. If you wish to see the lift of the current time period against the past time period, you can select the "Percent Change over Baseline" option to see the lift of your metric over time.

![/compare_to_past_lift.png](/compare_to_past_lift.png)

### Value Comparison

**Compare to segment** allows you to set a property value as a baseline and see how every other property compares.

![/compare_to_segment.png](/compare_to_segment.png)

**Compare to overall** allows you compare each segment value and see what proportion it makes of the overall value.

![/compare_to_overall.png](/compare_to_overall.png)

## Downloading Reports

You can download reports in four formats:
- CSV
- PNG
- PDF
- Formatted API

To download Insights, Funnels, and Retention reports, click the "..." icon on the upper right corner of each report.

## Limits and Ordering

### UI
In order to keep the interactive analysis experience snappy for projects of all sizes, we imposed limits on how many segments are returned back to the report (**visible limit**) and how many segments can be selected at a time for visualization (**selection limit**), as well as the number of segments selected by default (**default selection**).

Here's the breakdown per report + visualization type:

| Report Viz | Default Selection | Selection Limit | Visible Limit |
| --- | --- | --- | --- |
| Insights (bar) | 12 | 300 | 3000 |
| Insights (line) | 12 | 50 | 3000 |
| Retention | 6 | 12 | 200 |
| Funnels | 6 | 12 | 200 |

Hover over your table of visible segments to check if your report has reached the segmentation limit.

![image](https://github.com/mixpanel/docs/assets/2077899/3935993c-0410-46e4-a9d6-2d2dfb5313cd)

### Downloaded Reports
**CSV** - CSV export supports up to 50,000 breakdown segments. 
**API** - The Query API supports up to 10,000 breakdown segments.
**PNG and PDF** - PNG and PDF export supports up to 30 segments in the Insights table, Insights bar, Retention table, and Retention line; and up to 12 segments for the Insights line.

### Top Segments logic

The way we pick the top segments differs according to the type of query. We choose the top segments based on the value shown in the second column.

| Query type | How we select top segments |
| --- | --- |
| Total | Total number of occurrences of the chosen event |
| Unique | Number of unique users who performed the chosen event |
| Sum of property values | Sum of the chosen property |
| Min/max of property values | Lowest/highest value of the chosen property |
| Average | Number of events (or users) that contribute to the average |
| Median/Percentile/Distribution | Number of events (or users) that contribute to the distribution |
| Distinct count | Number of distinct values of the chosen property |
| DAU/WAU/MAU | Number of unique users |
| Sessions | Number of sessions that contain the chosen event |
| Funnels | Total number of times the first funnel step was completed |
| Retention | Total number of times the first event was completed |


## Saving to a Board

When you are satisfied with the analysis, and decide that this is something that you are likely to revisit, Mixpanel recommends that you save the report to a [Board](/docs/boards/overview). You can do this by pressing "Save" in the top right and selecting the Board you would like to save to, or creating a new Board. Sharing and permissions are set at the Board level. Learn more about [Sharing and Permissions](/docs/boards/sharing-and-permission).

![/Screen_Shot_2022-07-08_at_5.40.30_PM.png](/Screen_Shot_2022-07-08_at_5.40.30_PM.png)
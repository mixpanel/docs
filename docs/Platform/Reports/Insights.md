---
title: "Insights"
slug: "insights-report"
hidden: false
metadata:
  title: "Insights"
  description: "Learn how to use the Insights report."
---

# Overview

![Insights Overview Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/overview.png)

Insights is a powerful and flexible tool designed to visualize trends and compositions within your data. You can analyze events, cohorts, and user profiles, and display the data in a wide variety of chart types.

Advanced Insights features also allow you to create formulas, compare current data to past data, and generate custom events and properties for deeper analysis.

# Use Cases

Here are some of the sample questions you can answer in Insights:

- Product Analytics
    - How is my WAU changing over time? (unique users)
    - How often are my users getting value (frequency analysis)?
    - What is the distribution of my users across regions / devices etc? (property breakdown)
    - [Lifecycle analysis](https://mixpanel.com/blog/growth-through-segmentation-lifecycle-analysis-to-understand-your-users/)
- B2B (in this case, a messaging application
    - How many messages were sent in the US in the past 30 days? (total events, filtered)
    - How many users had a mobile app session yesterday? (unique events)
    - How many messages are sent per session? (formulas)
    - How much revenue was generated on plans purchased in the past year? (property aggregation)
    - How has the power users cohort grown over the past 6 months? (cohort trends)
- Marketing
    - Which advertising campaigns generate the most checkouts? (property breakdown)

### Frequency analysis

It's important to know what's the natural frequency at which your users use your product / experience the core value proposition of your product - do majority of your users use your product daily? weekly ? monthly? A16Z wrote a great article about the [Power User Curve](https://www.reforge.com/brief/understand-your-most-engaged-users-with-the-power-user-curve#bOb9wjj_l0R3Pqo32pggUQ), and this [video](https://www.loom.com/share/0c05ac17742a4d49a4c6879c0fe9f0de) shows how you can reproduce that within Mixpanel.

# Quick Start

Building a report in Insights takes just a few clicks, and results arrive in seconds. Let's build a simple report together. Continuing the B2B messaging example, imagine you wanted to answer the following question:

> Which cities in the United States have the most users who sent messages via the iOS platform?
>

Feel free to follow along and create your own report right in our demo project, [here](https://mixpanel.com/register/?next=%2Fproject%2F2195193%2Fview%2F139237%2Fapp%2Finsights). To skip ahead and see the final result, click [here](https://mixpanel.com/register/?next=/project/2195193/view/139237/app/insights#BhixoRC626vx).

## Step 1: Choose Events

Events, cohorts, or profiles can be the basic building block of an Insights report. In this case, we want to know about users who sent messages, so within the "Events and Cohorts" section, add the "Send Message" event. At this point, your query should look like this:

![Choose Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/choose-events.png)

## Step 2: Choose Count Type

Next to your selected event, you can choose how to count that event. By default, Insights will count Total events, which, as the name implies, will count every occurrence of the event. In this case, we want to know how many users sent messages, so choose "Unique." Unique counts one event per user. At this point, your query should look like this:

![Choose Count Type](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/choose-count-type.gif)

## Step 3: Choose Filters

Filters exclude unwanted data. In this case, we only care about events performed on the iOS platform. Therefore, add a "Platform" filter, where Platform equals "iOS Native". At this point, your query should look like this:

![Choose Filters](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/choose-filters.gif)

## Step 4: Choose Breakdowns

Breakdowns segment data into groups. In this case, we want to count message sending users in different cities. Therefore, add a "City" breakdown. At this point, your query should look like this:

![Choose Breakdowns](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/choose-breakdowns.gif)

## Step 5: Change Visualization

Choosing a different chart can help you visualize data better. Line charts help you see a trend, but other charts will help you see the aggregate value.

![Change Visualization](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/change-visualization.png)

## Step 6: Analyze Results

You now a full analysis that you can use to put into a board, or use as a starting point to dig in further. This might mean adding more filters or breakdowns, or adding another metric and seeing if there's an interesting comparison to be made. You could also change the counting type or the chart type.

# Basic Features

## Chart Types

Insights features multiple visualizations to help you view the results of your query in the clearest chart type. By default, Insights displays line charts, which help you understand how metrics trend over time. However, another chart type might present the results with more clarity. In Insights, you can either choose to get a metric calculated across the entire time period selected in the date picker, or get a time-segmented view of the metric (e.g. daily breakdown).

- Metric calculated across the entire time period
    - Bar chart
    - Stacked bar chart
    - Pie chart
    - Metric chart
    - Table chart
- Metric time-segmented
    - Line chart
    - Stacked line chart

## Sorting

### Bar chart

When you are viewing a bar chart, you have four different sorting options: A-Z Ascending, Z-A Descending, Value Ascending, or Value Descending. To switch sorting views, select the **Events** icon in the upper left hand of the report and select which view you would like to see.

![Sorting Bar Chart](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/sorting-bar-chart.png)

### Line chart

Line charts in Insights are accompanied with a table of values to give users another way to consume the trends information. This data table can also be sorted by clicking column headers.

Click on a "data column" header to sort by that column. Click the header again to reverse the sort order. The table below is sorted by event counts on August 2nd:

![Sorting Line Chart](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/sorting-line-chart-1.png)

Results that are segmented (from one or more “group by” clauses in your query) have four different sorting options when you click on the "segment column" headers:

- Segment Ascending: sort by segment name in ascending order.
- Segment Descending: sort by segment name in descending order.
- Value Ascending: sort by segment value in ascending order.
- Value Descending. sort by segment value in descending order.

When sorting by segments, the sort is carried out left to right.

![Sorting Line Chart](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/sorting-line-chart-2.gif)

Clicking on the "Average" data column performs a flat sort across all segments:

![Sorting Line Chart](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/sorting-line-chart-3.png)

### Table chart

**Decision 1**: Grouped View vs Ungrouped View
The Ungrouped View removes all hierarchy and makes the table flat. A flat table treats each data point as its own row.
The Grouped View preserves the hierarchy of the breakdowns applied to the report. It shows you segments within a breakdown as displayed below. This view is only applicable when you have 2 or more breakdowns.

**Decision 2**: Sorting Type
In the ungrouped view, you can choose one value to sort on. The two options are:

Sort by a specific metric value OR
Sort by a segment column (alphabetical)
![Sorting Ungrouped Table](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/sorting-table-chart-1.png)

In the grouped view, you can specify the sorting for each breakdown separately. For each breakdown, you can select to sort by a specific metric or alphabetically.
![Sorting Grouped Table](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/sorting-table-chart-2.png)

Sorting is applied within the grouping, respecting the breakdown hierarchy. As an example of breakdown hierarchy, the image above shows “Item Category” within “Country”

## Analysis Settings

The Analysis options will determine the way the chart is calculated and visualized. The options are:

- **Linear:** This is the standard view for the chart.
- **Logarithmic:** A nonlinear scale based on orders of magnitude, rather than a standard linear scale, so the value represented by each equidistant mark on the scale is the value at the previous mark multiplied by a constant.
- **Rolling:** Rolling analysis calculates the rolling average of the data set. A rolling average curve is a series of averages from subsets of data. Use rolling average analysis to remove noise or spikes from data and smooth out trends over time. Mixpanel calculates the rolling average based on the selected time interval (hour, day, week, month or quarter) for each data point in the graph.<br />
For example, if you make a rolling analysis query for the past 30 days, Mixpanel calculates the rolling 7-day average by default. The value reported at each day in the line graph is the average of the values from the 7 days leading to that day. In the case of the first 6 days in your selected time period, the 7-day-average calculation will include days before the selected time period.
- **Cumulative:** Adds up the values of each point on the graph as it goes along, so the height of the line will increase over time.

# Advanced

## Formulas

Use Formulas to make calculations using simple arithmetic operators.

Mixpanel supports the following operators:

- \+ : Add
- \- : Subtract
- \* : Multiply
- / : Divide
- () : Use parentheses to influence the order of operations

Click the **Formula** button. Each event in the query shows a letter next to it, which indicates its variable name. Use these letters in combination with the operators to calculate a more advanced query. For example, you can use the DAU, WAU, and MAU functions in Formulas to calculate the stickiness of your product:

![Formulas 1](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-formulas-1.png)

Enter a name for the formula (optional), and click **Apply Formula** to see the formula output. You can also use numbers as constants in a formula. Multiply a ratio by 100 to display as a percentage, for example. Divide a property value tracked in seconds by 3,600 to display the value in hours.

## Custom Bucketing

Insights will automatically group your high-cardinality segments into buckets. Buckets can be edited by using the "Custom Buckets" option in the overflow menu:
You can choose "Even" to get buckets of uniform size, and you can choose "Varied" to get buckets of different sizes. This helps with organizing outliers, or with drilling deeper into particular ranges.

![Bucketing](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-bucketing.png)

## Time Period Comparisons

Compare the current period of time to previous periods of time in order to track trends and growth in your product’s use. Compare traffic from a specific campaign period or event from one year to the next, or compare the success of that campaignto your normal traffic.

Note that if a data point for a previous year falls on a weekend, the data point is automatically moved to the next Monday to give a more clear picture of the data change from one year to the next.

Click on the **Compare to past** button at the top of your Insights graph and select the time period you wish to compare to. You can also select a custom date range.

![Time Period Comparison](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-time-period-comparison.gif)

## Value Comparisons

When you have multiple metrics, or have broken down a metric by a property, you can compare them against each and the relative value. Click on **Compare** -> **Overall**. This works for all data functions. For a "totals" data function, you can see the percentage that a particular segment makes up. For non summable aggregations, it compares the segment value to the whole, unsegmented value.

![Value Setting](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-value-comparison.png)

## Profile Analysis

Choose to explore either **Events & Cohorts** or **Profiles**. Events & Cohorts allows you to examine user behaviors, while Profiles allows you access profile data and visualize your users with filters and breakdowns based on their profile properties. When exploring Profiles, you are always analyzing all user profiles. Select the [Data Function](https://help.mixpanel.com/hc/en-us/articles/7713028610964-Advanced-Insights-Functionality-#insights-data-functions-operators-and-calculations) you want to use to calculate results by clicking on **Total** and selecting an option from the drop-down. You can calculate based on users or profile property value.

![Explore User Profiles](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-profile-analysis.gif)

## Annotations

In order to clarify the results in your Insights report add detailed annotations directly to the line chart. Annotations are tied to a specific date on the chart, rather than a specific data point on the chart.

Only project admins can create, save, and delete annotations.

To add an annotation, hover your mouse over the point on the chart you want to annotate, and click the blue **+** button that appears. Enter a description for the annotation, such as a holiday that occurred on that day or the end date of your fiscal year, then click **Save**. If you accidentally selected the incorrect date on the chart, you can edit the date and time of the annotation in this window.

![Annotations 1](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-annotations-1.png)

View an existing annotation by clicking on the number found at the bottom of a report. You will be able to see who submitted the annotation.

![Annotations 2](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-annotations-2.png)

Hover the cursor over the annotation to edit or delete it. Click on the **pencil icon** to edit an annotation, or the **trash icon** to delete an annotation. Add additional annotations to the same date by clicking **Add annotation**.

![Annotations 3](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-annotations-3.png)

## Insights Data Functions, Operators and Calculations

Data Functions in Mixpanel reports allow you to perform more complex calculations on your queries - this includes computing aggregate values of your event and property data, including totals, uniques, and averages.

The following data functions are only available in Insights, and are separated into groups based on what is being calculated: Total, Unique, Count users, aggregate property values, aggregate property values per user, and count sessions.

Select the Data Function you want to use to calculate results by clicking on **Total** and selecting an option from the drop-down. You can calculate based on events, users, event property value, event property value per user, and sessions.

![Data Functions 1](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-data-functions-1.png)

The following functions have additional aggregation options which you will be prompted to select:

| Function | Aggregation options |
| --- | --- |
| Events | Total Per User |
| Aggregate Properties | Sum<br />Average<br />Median<br />[Distinct Count](https://www.loom.com/share/7d0e42f847c24b3c8720d5b6a6bedeb4)<br />Percentiles (P25,P75,P90,P99)<br />Minimum<br />Maximum |
| Count Users | Daily Active Users (DAU)<br />Weekly Active Users (WAU)<br />Monthly Active Users (MAU) |
| Event property value per user | Sum<br />Average<br />Distinct value count<br />Minimum<br />Maximum |

These functions provide additional aggregation options following the initial calculation because they are “per user” calculations. “Per user” calculations first calculate the value per user, which is an unhelpful query in its raw form, but becomes useful when you perform an aggregation on that calculation.

Selecting any of these functions gives you the option to choose different ways to aggregate this data. The default aggregation is **Average**, which you can click on to select a different option such as distribution, median, 25/75/90th percentiles, minimum and maximum.

![Data Functions 2](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-data-functions-2.png)

If the data function you select calculates based on property (“Event Property Values” or “Event Property Values Per User”), you will be prompted to select an event property.

![Data Functions 3](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-data-functions-3.gif)

You can find more information about each data function and how they are calculated below:

### Events

| Function Name | Events & Cohorts Calculation | Profiles Calculation |
| --- | --- | --- |
| Total | Total count of [event] performed.<br />Example: How many times did my users watch a video? | N/A |
| Total per user | The number of events performed per user.<br />Example: How many videos were watched per user?<br />Aggregation options: Average, distribution, median, percentiles, minimum, maximum | N/A |

### Users

| Function Name | Events & Cohorts Calculation | Profiles Calculation |
| --- | --- | --- |
| Total | N/A | Total count of user profiles.<br /><br />**Example**: What's my total number of users? |
| Uniques | The number of users who performed [event].<br /><br />**Example**: What's the count of users who watched a video? | N/A |
| Daily Active Users (DAU) | The number of users who performed [event] within the last 24 hours.<br /><br />**Example**: What's the count of users who watched a video in the last day? | N/A |
| Weekly Active Users (WAU) | The number of users who performed [event] within the last 7 days.<br /><br />**Example**: What's the count of users who watched a video in the week? | N/A |
| Monthly Active Users (MAU) | The number of users who performed [event] within the last 30 days.<br /><br />**Example**: What's the count of users who watched a video in the last month? | N/A |

### Aggregate Property Values

| Function Name | Events & Cohorts Calculation | Profiles Calculation |
| --- | --- | --- |
| Sum | The total of a numeric property value across all instances of [event].<br /><br />**Example**: What's the total number of minutes of videos watched? | The total of a numeric property value across all user profiles.<br />Example: What's the total revenue across all users? |
| Average | Average of a numeric property value across all instances of [event].<br /><br />**Example**: What's the average number of minutes per video watched? | Average of a numeric property value across all user profiles.<br />Example: What's the average revenue across all users? |
| Distinct count | Calculates the unique count of property values across all instances of [event].<br /><br />**Example**: How many unique songs were played in the last 30 days? | Calculates the unique count of property values across all profiles.<br />Example: How many unique countries were our video watchers from? |
| Median | Median of a numeric property value across all instances of [event].<br /><br />**Example**: What's the median number of minutes per video watched? | Median of a numeric property value across all user profiles.<br />Example: What's the median revenue across all users? |
| Percentiles (25/75/90/99) | The 25/75/90/99th percentile of a numeric property value across all instances of [event].<br /><br />**Example**: What's the 25th percentile number of minutes of videos watched? | The 25/75/90/99th percentile of a numeric property value across all user profiles.<br />Example: What's the 25th percentile revenue across all users? |
| Minimum | Minimum of a numeric property value across all instances of [event].<br /><br />**Example**: What's the minimum number of minutes per video watched? | Minimum of a numeric property value across all user profiles.<br />Example: What's the minimum revenue across all users? |
| Maximum | Maximum of a numeric property value across all instances of [event].<br /><br />**Example**: What's the maximum number of minutes per video watched? | Maximum of a numeric property value across all user profiles.<br />Example: What's the maximum revenue across all users? |

### Aggregate Property Values per User

| Function Name | Events & Cohorts Calculation | Profiles Calculation |
| --- | --- | --- |
| Sum | The total of a numeric property value across all instances of [event] per user.<br /><br />**Example**: What's the total number of hours of videos watched per user?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |
| Average | Average of a numeric property value across all instances of [event] per user.<br /><br />**Example**: What's the average number of hours of videos watched per user?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |
| Distinct count | The number of distinct property values per user.<br /><br />**Example**: How many different videos did each user watch?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |
| Minimum | Minimum of a numeric property value across all instances of [event] per user.<br /><br />**Example**: What's the minimum number of hours of videos watched per user?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |
| Maximum | Maximum of a numeric property value across all instances of [event] per user.<br /><br />**Example**: What's the maximum number of hours of videos watched per user?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |

### Count Sessions

| Function Name | Events & Cohorts Calculation | Profiles Calculation |
| --- | --- | --- |
| Sessions with event | The number of sessions that contain [event].<br /><br />**Example**: What's the total number of sessions in which users watched a video? | N/A |

### Additional Aggregation Option Examples

| Data Function | Average | Distribution | Median | Percentiles (25/75/90) | Minimum/Maximum |
| --- | --- | --- | --- | --- | --- |
| Total per user | What's the average number of songs played per user? | What is the distribution of my users by the number of songs played? | What's the median number of songs played per user? | How many songs did the 90th percentile user listen to? | How many songs did my least/most active user listen to? |
| Sum of property value count per user | What's the average cumulative watch time per user? | What's the distribution of my users by the cumulative minutes of content watched? | What's the median of the cumulative watch time per user? | How many cumulative minutes has the 90th percentile user watched? | How much has the lowest/highest spender spent? |
| Average of property value count per user | What's the average of the average cart value for each rider? | What's the distribution of my users by the average cart value per user? | What's the median of the average cart value per user? | What's the average cart value for the 90th percentile user? | What's the minimum/maximum average cart value? |
| Distinct property value count per user | What's the average number of unique song titles heard by my users? | What's the distribution of my users by the number of unique song titles listened to? | How many unique songs does the median user listen to? | How many unique songs does the 90th percentile user listen to? | What's the minimum/maximum number of unique songs my users listen to? |
| Minimum property value count per user | What's the average of the minimum ratings provided per user? | What's the distribution of my users by the minimum rating provided? | What's the median of the minimum ratings provided by users? | What's the minimum rating provided by the 90th percentile user? | What's the minimum rating across all ratings?? |
| Maximum property value count per user | What's the average of the maximum gaming session length per user? | What's the distribution of my users by the maximum gaming session length? | What's the median of the maximum gaming session length per user? | What's the maximum gaming session length provided by the 90th percentile user? | How long has the longest gaming session lasted across our users? |

Here's a quick overview on "Distinct count" of property values, and how that differs from "Distinct count" of property values per-user:

Here are some use-cases that are now possible with "Distinct count" of property values:

- How many **unique items** were added to cart yesterday?
- How many **unique songs / videos** were played in the last 30 days?
- How many **unique files** were worked on in the last week?

## Daily, Weekly, and Monthly Active Users

**Daily Active Users (DAU)**: Select DAU to calculate the number of unique users in the previous day (24-hour) period that have performed the selected event.
**Weekly Active Users (WAU)**: Select WAU to calculate the number of unique users in the previous week (7-day) period that have performed the selected event.
**Monthly Active Users (MAU)**: Select MAU to calculate the number of unique users in the previous month (30-day) period that have performed the selected event.

If you select the DAU, WAU, or MAU function for a date range that includes the current day, the query will take the end of the current day as the end of the query’s time segment (even though it’s in the future). For example, today is April 25th, and it’s 4:22 PM. If you make a query to show WAU and you select “current day” as your date range, the query will return the count of unique users between April 19 at 12:00:00 AM and April 25 at 11:59:59.

## View Users

Click a segment in an Insights report to see the list of users that underlie that data point. This helps see a representative sample of users from any analysis, so you can drill into anomalies or simply get to know your users. You can also save this user list as a cohort to either export or use for message targeting.
[block:embed]
{
  "html": "<iframe src=\"//www.loom.com/embed/5568e266532b4804a1c2d36d678eb1a2\" height=\"460\" frameborder=\"0\" allowfullscreen=\"\"></iframe>",
  "url": "https://www.loom.com/embed/5568e266532b4804a1c2d36d678eb1a2",
  "title": "View Users",
  "favicon": null,
  "image": null
}
[/block]

## View Events from Insights

Click on a chart segment in Insights and view the raw events that made up that metric. You will be redirected to the Events page.

![View Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-view-events.gif)

## View Sample Events

You can hover over any event and in the context panel, you now have the ability to "View Sample Events", which redirects you to the Events page with 100 most recent samples of that hovered event:
You can see a few samples of an event to help you decide whether that's the right event you want for your analysis or which property you should use for filters/breakdowns.

![View Sample Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-view-sample-events.gif)

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

# Sample Questions you can Answer in Insights

Imagine your product is a B2B messaging application. You might use Insights to answer these sample questions:

- How many messages were sent in the US in the past 30 days? (total events, filtered)
- How many users had a mobile app session yesterday? (unique events)
- How many messages are sent per session? (formulas)
- Which advertising campaigns generate the most signups? (property breakdown)
- How much revenue was generated on plans purchased in the past year? (property aggregation)
- How has the power users cohort grown over the past 6 months? (cohort trends)

# Building your First Report

Building a report in Insights takes just a few clicks, and results arrive in seconds. Let's build a simple report together. Continuing the B2B messaging example, imagine you wanted to answer the following question:

> Which cities in the United States have the most users who sent messages via the iOS platform?
> 

Feel free to follow along and create your own report right in our demo project, [here](https://mixpanel.com/register/?next=%2Fproject%2F2195193%2Fview%2F139237%2Fapp%2Finsights). To skip ahead and see the final result, click [here](https://mixpanel.com/register/?next=/project/2195193/view/139237/app/insights#~(columnWidths~(bar~())~displayOptions~(chartType~'bar~plotStyle~'standard~analysis~'linear~value~'absolute)~sorting~(bar~(sortBy~'column~colSortAttrs~(~(sortBy~'value~sortOrder~'desc)))~line~(sortBy~'value~sortOrder~'desc~valueField~'averageValue~colSortAttrs~(~))~table~(sortBy~'column~colSortAttrs~(~(sortBy~'label~sortOrder~'asc)))~insights-metric~(sortBy~'value~sortOrder~'desc~valueField~'totalValue~colSortAttrs~(~))~pie~(sortBy~'value~sortOrder~'desc~valueField~'totalValue~colSortAttrs~(~)))~timeComparison~null~querySamplingEnabled~false~title~'~sections~(show~(~(dataset~'!mixpanel~value~(name~'Send*20Message~resourceType~'events)~resourceType~'events~profileType~null~search~'~dataGroupId~null~math~'total~perUserAggregation~null~property~null))~group~(~(dataset~'!mixpanel~value~'!city~resourceType~'events~profileType~null~search~'~dataGroupId~null~propertyType~'string~typeCast~null~unit~null))~filter~(clauses~(~(dataset~'!mixpanel~value~'platform~resourceType~'events~profileType~null~search~'~dataGroupId~null~filterType~'string~defaultType~'string~filterOperator~'equals~filterValue~(~'iOS*20Native)~propertyObjectKey~null))~determiner~'all)~time~(~(value~30~unit~'day)))~legend~())).

## Step 1: Choose Events

Events, cohorts, or profiles can be the basic building block of an Insights report. In this case, we want to know about users who sent messages, so within the "Events and Cohorts" section, add the "Send Message" event. At this point, your query should look like this:

![https://www.notion.so/hc/article_attachments/4413139192084/mceclip4.png](https://www.notion.so/hc/article_attachments/4413139192084/mceclip4.png)

## Step 2: Choose Count Type

Next to your selected event, you can choose how to count that event. By default, Insights will count Total events, which, as the name implies, will count every occurrence of the event. In this case, we want to know how many users sent messages, so choose "Unique." Unique counts one event per user. At this point, your query should look like this:

![https://www.notion.so/hc/article_attachments/4413131169428/mceclip5.gif](https://www.notion.so/hc/article_attachments/4413131169428/mceclip5.gif)

## Step 3: Choose Filters

Filters exclude unwanted data. In this case, we only care about events performed on the iOS platform. Therefore, add a "Platform" filter, where Platform equals "iOS Native". At this point, your query should look like this:

![https://www.notion.so/hc/article_attachments/4413126649492/mceclip6.gif](https://www.notion.so/hc/article_attachments/4413126649492/mceclip6.gif)

## Step 4: Choose Breakdowns

Breakdowns segment data into groups. In this case, we want to count message sending users in different cities. Therefore, add a "City" breakdown. At this point, your query should look like this:

![https://www.notion.so/hc/article_attachments/4413126669588/mceclip7.gif](https://www.notion.so/hc/article_attachments/4413126669588/mceclip7.gif)

Congratulations, you've constructed your first Insights query! Now, it's time to examine the results.

# Visualizing Results

Insights features multiple visualizations to help you view the results of your query in the clearest chart type. By default, Insights displays line charts, which help you understand how metrics trend over time. However, another chart type might present the results with more clarity. In Insights, you can either choose to get a metric calculated across the entire time period selected in the date picker, or get a time-segmented view of the metric (e.g. daily breakdown).

- Metric calculated across the entire time period
    - Bar chart
        
        ![https://www.notion.so/hc/article_attachments/7787500385044/mceclip0.png](https://www.notion.so/hc/article_attachments/7787500385044/mceclip0.png)
        
- Stacked bar chart
    
    ![https://www.notion.so/hc/article_attachments/7787500394900/mceclip1.png](https://www.notion.so/hc/article_attachments/7787500394900/mceclip1.png)
    
- Pie chart
    
    ![https://www.notion.so/hc/article_attachments/7787500560660/mceclip2.png](https://www.notion.so/hc/article_attachments/7787500560660/mceclip2.png)
    
- Metric time-segmented
    - Line chart
        
        ![https://www.notion.so/hc/article_attachments/7787493152276/mceclip4.png](https://www.notion.so/hc/article_attachments/7787493152276/mceclip4.png)
        
- Stacked line chart
    
    ![https://www.notion.so/hc/article_attachments/7787493279252/mceclip5.png](https://www.notion.so/hc/article_attachments/7787493279252/mceclip5.png)
    

You can easily resize the columns in the bar chart in order to see more or remove detail.

![https://www.notion.so/hc/article_attachments/7787500943380/mceclip6.gif](https://www.notion.so/hc/article_attachments/7787500943380/mceclip6.gif)

When breaking down results, click on a bar in the chart to either filter or exclude that property value. Filter zooms in on that property value, filtering the entire report to that property value. Exclude filters out that property value from the results.

![https://www.notion.so/hc/article_attachments/7787493491348/mceclip7.png](https://www.notion.so/hc/article_attachments/7787493491348/mceclip7.png)

# Analysis & Value Settings

You can switch between Absolute and Relative totals by selecting the **#** dropdown in the top right of the chart and selecting either **# Absolute** or  **% Relative**.

[block:callout]
{
  "type": "info",
  "body": "You can only select Absolute or Relative values for the Table, Stacked Line, Stacked Bar, and Bar charts.",
  "title": "Note"
}
[/block]

![https://www.notion.so/hc/article_attachments/7787493636500/mceclip8.png](https://www.notion.so/hc/article_attachments/7787493636500/mceclip8.png)

The Absolute view will show you, in numbers, your totals for different event counts. Relative view will display these counts as a percentage of the whole.

The Analysis options will determine the way the chart is calculated and visualized. The options are:

- **Linear:** This is the standard view for the chart.
- **Rolling:** Rolling analysis calculates the rolling average of the data set. A rolling average curve is a series of averages from subsets of data. Use rolling average analysis to remove noise or spikes from data and smooth out trends over time. Mixpanel calculates the rolling average based on the selected time interval (hour, day, week, month or quarter) for each data point in the graph.
For example, if you make a rolling analysis query for the past 30 days, Mixpanel calculates the rolling 7-day average by default. The value reported at each day in the line graph is the average of the values from the 7 days leading to that day. In the case of the first 6 days in your selected time period, the 7-day-average calculation will include days before the selected time period.
    
    
    | Time Interval | Default Rolling Time Range |
    | --- | --- |
    | Hour | Last 12 hours |
    | Day | Last 7 days |
    | Week | Last 5 weeks |
    | Month | Last 3 months |
    | Quarter | Last 2 quarters |
- **Logarithmic:** A nonlinear scale based on orders of magnitude, rather than a standard linear scale, so the value represented by each equidistant mark on the scale is the value at the previous mark multiplied by a constant.
- **Cumulative:** Adds up the values of each point on the graph as it goes along, so the height of the line will increase over time.

# Sorting

## Bar chart

When you are viewing a bar chart, you have four different sorting options: A-Z Ascending, Z-A Descending, Value Ascending, or Value Descending. To switch sorting views, select the **Events** icon in the upper left hand of the report and select which view you would like to see.

![https://www.notion.so/hc/article_attachments/7787501113876/mceclip9.png](https://www.notion.so/hc/article_attachments/7787501113876/mceclip9.png)

## Line chart

Line charts in Insights are accompanied with a table of values to give users another way to consume the trends information. This data table can also be sorted by clicking column headers.

Click on a "data column" header to sort by that column. Click the header again to reverse the sort order. The table below is sorted by event counts on August 2nd:

![https://www.notion.so/hc/article_attachments/7787495449876/mceclip0.png](https://www.notion.so/hc/article_attachments/7787495449876/mceclip0.png)

Results that are segmented (from one or more “group by” clauses in your query) have four different sorting options when you click on the "segment column" headers:

- Segment Ascending: sort by segment name in ascending order.
- Segment Descending: sort by segment name in descending order.
- Value Ascending: sort by segment value in ascending order.
- Value Descending. sort by segment value in descending order.

When sorting by segments, the sort is carried out left to right.

![https://www.notion.so/hc/article_attachments/7787556680468/Seg_table_sorting.gif](https://www.notion.so/hc/article_attachments/7787556680468/Seg_table_sorting.gif)

Clicking on the "Average" data column performs a flat sort across all segments:

![https://www.notion.so/hc/article_attachments/7787550370324/mceclip1.png](https://www.notion.so/hc/article_attachments/7787550370324/mceclip1.png)

# Use Cases for Insights Reports

Here's a video that shows a set of use-cases with Mixpanel's Insights report:

Here's another common use-case: Jenny is a Marketing Manager for an online shoes marketplace. and she wants to know which utm source is getting the maximum number of purchases to the platform.

In Insights, Jenny looks at purchase activity by selecting the "Complete Purchase" event and analyzing the activity over the last 1 month. Mixpanel returns an aggregate number of the total times the event was performed, but Jenny wants to dig deeper.

She elects to break down the data by the event property "UTM_source", which categorizes the results into the different UTM_source values of the "Complete Purchase" event.

![https://www.notion.so/hc/article_attachments/7787554482580/mceclip0.png](https://www.notion.so/hc/article_attachments/7787554482580/mceclip0.png)

Based on the data from the last 30 days, the Insights report shows that LinkedIn is the highest source of paid conversions.

## Frequency analysis

It's important to know what's the natural frequency at which your users use your product / experience the core value proposition of your product - do majority of your users use your product daily? weekly ? monthly? A16Z wrote a great article about the [Power User Curve](https://www.reforge.com/brief/understand-your-most-engaged-users-with-the-power-user-curve#bOb9wjj_l0R3Pqo32pggUQ), and this video below shows how you can reproduce that within Mixpanel:

<iframe src="//www.loom.com/embed/0c05ac17742a4d49a4c6879c0fe9f0de" width="560" height="315" frameborder="0" allowfullscreen=""></iframe>

Other use-cases:

- [Lifecycle analysis](https://mixpanel.com/blog/growth-through-segmentation-lifecycle-analysis-to-understand-your-users/)

# Advanced

## Profile Analysis

Mixpanel's Insights report allows you to analyze your user data as a current snapshot or as a trend over time. This article covers advanced functionality available in the Insights report that lets you drill in more deeply on your data, or ask a more precise question.

For more of an overview of Insights, click [here](https://www.notion.so/hc/en-us/articles/360001333826).

Choose to explore either **Events & Cohorts** or **Profiles**. Events & Cohorts allows you to examine user behaviors, while Profiles allows you access profile data and visualize your users with filters and breakdowns based on their profile properties. When exploring Profiles, you are always analyzing all user profiles.

![User Analysis](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-users.png)

## Time Period Comparisons

Compare the current period of time to previous periods of time in order to track trends and growth in your product’s use. Compare traffic from a specific campaign period or event from one year to the next, or compare the success of that campaignto your normal traffic.

Note that if a data point for a previous year falls on a weekend, the data point is automatically moved to the next Monday to give a more clear picture of the data change from one year to the next.

Click on the **Compare to past** button at the top of your Insights graph and select the time period you wish to compare to. You can also select a custom date range.

![Time Period Comparison](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-time-period-comparison.gif)

## Bucketing

Insights will automatically group your high-cardinality segments into ranges. Ranges can be edited by using the "Customize Range" option in the overflow menu:

![Bucketing](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-bucketing.gif)

If you want custom buckets that are non-uniform, you can create [custom properties](https://www.notion.so/hc/en-us/articles/360030848432) to manipulate these buckets.

## Annotations

In order to clarify the results in your Insights report add detailed annotations directly to the line chart. Annotations are tied to a specific date on the chart, rather than a specific data point on the chart.

Only project admins can create, save, and delete annotations.

To add an annotation, hover your mouse over the point on the chart you want to annotate, and click the blue **+** button that appears.Enter a description for the annotation, such as a holiday that occurred on that day or the end date of your fiscal year, then click **Save**. If you accidentally selected the incorrect date on the chart, you can edit the date and time of the annotation in this window.

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

### Daily Active Users (DAU)

Select DAU to calculate the number of unique users in the previous day (24-hour) period that have performed the selected event.

### Weekly Active Users (WAU)

Select WAU to calculate the number of unique users in the previous week (7-day) period that have performed the selected event.

### Monthly Active Users (MAU)

Select MAU to calculate the number of unique users in the previous month (30-day) period that have performed the selected event.

### Note on DAU, WAU, and MAU calculations

If you select the DAU, WAU, or MAU function for a date range that includes the current day, the query will take the end of the current day as the end of the query’s time segment (even though it’s in the future). For example, today is April 25th, and it’s 4:22 PM. If you make a query to show WAU and you select “current day” as your date range, the query will return the count of unique users between April 19 at 12:00:00 AM and April 25 at 11:59:59.

## Explore User Profiles

Select the [Data Function](https://help.mixpanel.com/hc/en-us/articles/7713028610964-Advanced-Insights-Functionality-#insights-data-functions-operators-and-calculations) you want to use to calculate results by clicking on **Total** and selecting an option from the drop-down. You can calculate based on users or profile property value.

![https://www.notion.so/hc/article_attachments/7771794359444/mceclip8.gif](https://www.notion.so/hc/article_attachments/7771794359444/mceclip8.gif)

## Formulas

Use Formulas to make calculations using simple arithmetic operators.

Mixpanel supports the following operators:

- \+ : Add
- \- : Subtract
- * : Multiply
- / : Divide
- () : Use parentheses to influence the order of operations

[block:callout]
{
  "type": "info",
  "body": "Dig deeper and break down the formula by a property to see how your calculation compares across different segments. Similarly, apply a filter to a formula to narrow in on a specific segment of your data.",
  "title": "Note"
}
[/block]

Click the **Formula** button. Each event in the query shows a letter next to it, which indicates its variable name. Use these letters in combination with the operators to calculate a more advanced query. For example, you can use the DAU, WAU, and MAU functions in Formulas to calculate the stickiness of your product:

![Formulas 1](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-formulas-1.png)

Enter a name for the formula (optional), and click **Apply Formula** to see the formula output.

For example, you can calculate the ratio of DAU to MAU using a formula. Build an Insights report with event A as "App Session" and select MAU. Select "App Session" with DAU for event B. Apply the formula B/A to show the ratio of DAU to MAU in the report.

![Formulas 2](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-formulas-2.png)

You can also use numbers as constants in a formula. Multiply a ratio by 100 to display as a percentage, for example. Divide a property value tracked in seconds by 3,600 to display the value in hours.

## Customize Ranges

When breaking down/segmenting by a numeric property, Mixpanel decides what intervals the values get grouped into, while you always had the option to customize these ranges/buckets with [Custom Properties](https://www.notion.so/hc/en-us/articles/360030848432), it required a bit of effort to setup, so we've added support to define intervals without any formulas:

![Customize Ranges](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-customize-ranges.gif)

## View Users

You can now click a segment (bar or line) in an Insights report to see the list of users that underlie that data point. This helps see a representative sample of users from any analysis, so you can drill into anomalies or simply get to know your users. You can also save this user list as a cohort to either export or use for message targeting.
jblock:embed]
{
  "html": "<iframe src=\"//www.loom.com/embed/5568e266532b4804a1c2d36d678eb1a2\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen=\"\"></iframe>",
  "url": "https://www.loom.com/embed/5568e266532b4804a1c2d36d678eb1a2",
  "title": "View Users",
  "favicon": null,
  "image": null
}
[/block]

Please note: "View users" are currently unsupported on visualizations other than bar and line.

## View Events from Insights

You can now click on a chart segment (bar, line) in Insights and view the raw events that made up that metric (redirects you to Events page):

![View Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-view-events.gif)

## View Sample Events

If you've ever wanted to see a few samples of an event to help you decide whether that's the right event you want for analysis or which property you should use for filters/breakdowns, this is for you.

You can hover over any event and in the context panel, you now have the ability to "View Sample Events", which redirects you to the Events page with 100 most recent samples of that hovered event:

![View Sample Events](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Insights/advanced-view-sample-events.gif)

# Measurements


## Overview

Measurements in Mixpanel reports allow you to perform more complex calculations on your queries - this includes computing aggregate values of your event and property data, including totals, uniques, and averages.

<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/22d760d014234a1eb566f68dda79c58f" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

## Insights Measurements

The following measurements are only available in Insights, and are separated into groups based on what is being calculated: Total, Unique, Count users, aggregate property values, aggregate property values per user, and count sessions.

Select the measurement you want to use to calculate results by clicking on **Unique Users** and selecting an option from the drop-down. You can calculate based on events, users, event property value, event property value per user, and sessions.

![Measurements 1](/advanced-data-functions-1.png)

### Aggregations

The following measurements have additional aggregation options which you will be prompted to select:

| Function | Aggregation options |
| --- | --- |
| Frequency per User | Distribution<br />Average<br />Median<br />Percentile<br />Minimum<br />Maximum |
| Aggregate Property | Sum<br />Average<br />Median<br />[Distinct Count](https://www.loom.com/share/7d0e42f847c24b3c8720d5b6a6bedeb4)<br />Percentiles (P25,P75,P90,P99)<br />Minimum<br />Maximum |
| Aggregate Property per User | Sum<br />Average<br />Distinct value count<br />Minimum<br />Maximum |

These functions provide additional aggregation options following the initial calculation because they are aggregates on all your users. The Aggregate Property measurement calculates property values across all your users using the selected aggregation method. The “Per user” calculations first calculate the value per user, which is an unhelpful query in its raw form, but becomes useful when you perform an aggregation on that calculation.

Selecting any of these functions gives you the option to choose different ways to aggregate this data. The default aggregation is **Average**, which you can click on to select a different option such as distribution, median, 25/75/90th percentiles, minimum, and maximum.

![Measurements 2](/advanced-data-functions-2.png)

If the measurement you select calculates based on property (“Event Property Values” or “Event Property Values Per User”), you will be prompted to select an event property. You can find more information about each measurement and how they are calculated below.

## Measurements Reference

#### Event Measurement

| Function Name | Events Calculation | Profiles Calculation |
| --- | --- | --- |
| Total Events | Total count of [event] performed.<br />Example: How many times did my users watch a video? | N/A |
| Frequency per User | The number of events performed per user.<br />Example: How many videos were watched per user?<br />Aggregation options: Average, distribution, median, percentiles, minimum, maximum | N/A |

#### Users

This can refer to measuring the total number of user profiles, as well as the number of unique users that performed an event.
DAU, WAU, and MAU are accessed through the advanced settings of unique users. Select the > arrow to choose any XAU options.

If you select the DAU, WAU, or MAU function for a date range that includes the current day, the query will take the end of the current day as the end of the query’s time segment (even though it’s in the future). For example, today is April 25th, and it’s 4:22 PM. If you make a query to show WAU and you select “current day” as your date range, the query will return the count of unique users between April 19 at 12:00:00 AM and April 25 at 11:59:59.

![Measurements 3](/advanced-data-functions-3.png)

| Function Name | Events Calculation | Profiles Calculation |
| --- | --- | --- |
| Total | N/A | Total count of user profiles. <br /><br />**Example**: What's my total number of users? |
| Unique Users | The number of users who performed [event] or are a part of the cohort.<br /><br />**Example**: What's the count of users who watched a video? | N/A |
| Daily Active Users (DAU) | The number of users who performed [event] within the last 24 hours.<br /><br />**Example**: What's the count of users who watched a video on the last day? | N/A |
| Weekly Active Users (WAU) | The number of users who performed [event] within the last 7 days.<br /><br />**Example**: What's the count of users who watched a video in the week? | N/A |
| Monthly Active Users (MAU) | The number of users who performed [event] within the last 30 days.<br /><br />**Example**: What's the count of users who watched a video in the last month? | N/A |

##### Uniques and Breakdowns

When you apply a breakdown to a metric, by default, Mixpanel tells you how many unique users contributed to each segment. For example, in the image below, you can see there were a total of 2441 unique users, while the sum of individual segments is more than 3000. This is correct. That is because one user could have seen both a Home Page and a Shop Page, so they get counted as a user towards both segments.

By default, Mixpanel answers the question: per segment, tell me the number of unique users, DON'T tell me how the 2441 users are distributed across the various pages with a user being counted only towards one segment, which will require assigning a user to one segment even if they contributed towards multiple segments.

![image](/uniques_default.png)

There are some cases though, where you want to know how the 2441 users are distributed, generally either by their first or last action. For example, based on the last page (segment) a user saw, tell me the distribution of users. You can enable this now via the advanced control for Uniques, by choosing which segment to associate a user to: either the first segment or the last segment in the chart date range (7D in the below image)

![image](/uniques_count_once.png)

To note - in a line chart, there are two concepts of time period: chart date range (3M below) and time interval (weekly interval below). When advanced controls are used in a line chart, it assigns a segment based on the first/last segment for each time interval, NOT across all time intervals in the chart range. For eg. user Joey could count towards Contact Page Wk of Feb 27 and Shop Page Wk of March 6. But in the same time interval, they would count only towards one segment.

![image](/uniques_count_once_line.png)

#### Aggregate Property

| Function Name | Events Calculation | Profiles Calculation |
| --- | --- | --- |
| Sum | The total of a numeric property value across all instances of [event].<br /><br />**Example**: What's the total number of minutes of videos watched? | The total of a numeric property value across all user profiles.<br />Example: What's the total revenue across all users? |
| Average | Average of a numeric property value across all instances of [event].<br /><br />**Example**: What's the average number of minutes per video watched? | Average of a numeric property value across all user profiles.<br />Example: What's the average revenue across all users? |
| Distinct count | Calculates the unique count of property values across all instances of [event].<br /><br />**Example**: How many unique songs were played in the last 30 days? | Calculates the unique count of property values across all profiles.<br />Example: How many unique countries were our video watchers from? |
| Median | Median of a numeric property value across all instances of [event].<br /><br />**Example**: What's the median number of minutes per video watched? | Median of a numeric property value across all user profiles.<br />Example: What's the median revenue across all users? |
| Percentiles (25/75/90/99) | The 25/75/90/99th percentile of a numeric property value across all instances of [event].<br /><br />**Example**: What's the 25th percentile number of minutes of videos watched? | The 25/75/90/99th percentile of a numeric property value across all user profiles.<br />Example: What's the 25th percentile revenue across all users? |
| Minimum | Minimum of a numeric property value across all instances of [event].<br /><br />**Example**: What's the minimum number of minutes per video watched? | Minimum of a numeric property value across all user profiles.<br />Example: What's the minimum revenue across all users? |
| Maximum | Maximum of a numeric property value across all instances of [event].<br /><br />**Example**: What's the maximum number of minutes per video watched? | Maximum of a numeric property value across all user profiles.<br />Example: What's the maximum revenue across all users? |

#### Aggregate Property per User

| Function Name | Events Calculation | Profiles Calculation |
| --- | --- | --- |
| Sum | The total of a numeric property value across all instances of [event] per user.<br /><br />**Example**: What's the total number of hours of videos watched per user?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |
| Average | Average of a numeric property value across all instances of [event] per user.<br /><br />**Example**: What's the average number of hours of videos watched per user?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |
| Distinct count | The number of distinct property values per user.<br /><br />**Example**: How many different videos did each user watch?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |
| Minimum | Minimum of a numeric property value across all instances of [event] per user.<br /><br />**Example**: What's the minimum number of hours of videos watched per user?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |
| Maximum | Maximum of a numeric property value across all instances of [event] per user.<br /><br />**Example**: What's the maximum number of hours of videos watched per user?<br />**Aggregation options**: Average, distribution, median, percentiles, minimum, maximum | N/A |

#### Total Sessions

| Function Name | Events Calculation | Profiles Calculation |
| --- | --- | --- |
| Sessions with event | The number of sessions that contain [event].<br /><br />**Example**: What's the total number of sessions in which users watched a video? | N/A |

Learn more about [Sessions](/docs/features/sessions).

##### Additional Aggregation Option Examples

| Measurement | Average | Distribution | Median | Percentiles (25/75/90) | Minimum/Maximum |
| --- | --- | --- | --- | --- | --- |
| Total per user | What's the average number of songs played per user? | What is the distribution of my users by the number of songs played? | What's the median number of songs played per user? | How many songs did the 90th percentile user listen to? | How many songs did my least/most active user listen to? |
| Sum of property value count per user | What's the average cumulative watch time per user? | What's the distribution of my users by the cumulative minutes of content watched? | What's the median of the cumulative watch time per user? | How many cumulative minutes has the 90th percentile user watched? | How much has the lowest/highest spender spent? |
| Average of property value count per user | What's the average of the average cart value for each rider? | What's the distribution of my users by the average cart value per user? | What's the median of the average cart value per user? | What's the average cart value for the 90th percentile user? | What's the minimum/maximum average cart value? |
| Distinct property value count per user | What's the average number of unique song titles heard by my users? | What's the distribution of my users by the number of unique song titles listened to? | How many unique songs does the median user listen to? | How many unique songs does the 90th percentile user listen to? | What's the minimum/maximum number of unique songs my users listen to? |
| Minimum property value count per user | What's the average of the minimum ratings provided per user? | What's the distribution of my users by the minimum rating provided? | What's the median of the minimum ratings provided by users? | What's the minimum rating provided by the 90th percentile user? | What's the minimum rating across all ratings?? |
| Maximum property value count per user | What's the average of the maximum gaming session length per user? | What's the distribution of my users by the maximum gaming session length? | What's the median of the maximum gaming session length per user? | What's the maximum gaming session length provided by the 90th percentile user? | How long has the longest gaming session lasted across our users? |

Here's a quick overview on "Distinct count" of property values, and how that differs from "Distinct count" of property values per user:

Here are some use cases that are now possible with "Distinct count" of property values:

- How many **unique items** were added to cart yesterday?
- How many **unique songs/videos** were played in the last 30 days?
- How many **unique files** were worked on in the last week?

## Analysis Settings

Allows you to change the metric being measured. Access by going into the advanced section of the measurement menu.

![Rolling and Cumulative](/rolling-cumulative.png)

- **Rolling Average:** Rolling analysis calculates the rolling average of the data set. A rolling average curve is a series of averages from subsets of data. Use rolling average analysis to remove noise or spikes from data and smooth out trends over time. Mixpanel calculates the rolling average based on the selected time interval (hour, day, week, month, or quarter) for each data point in the graph.<br />
For example, if you make a rolling analysis query for the past 30 days, Mixpanel calculates the rolling 7-day average by default. The value reported on each day in the line graph is the average of the values from the 7 days leading to that day. In the case of the first 6 days in your selected time period, the 7-day-average calculation will include days before the selected time period.
- **Cumulative:** Adds up the values of each point on the graph as it goes along, so the height of the line will increase over time.

<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/4d49fe9a64e24fb2b6cac44f86839fd2" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

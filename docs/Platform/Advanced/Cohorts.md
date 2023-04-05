---
title: "Cohorts"
slug: "cohorts"
hidden: false
metadata:
  title: "Cohorts"
  description: "Learn how to use cohorts in Mixpanel."
---

# Overview
Cohorts are groups of users that share a certain set of properties or who perform a similar sequence of events. Mixpanel lets you visually define cohorts, view the list of users that comprise them, compare them in your analysis, and share them with the rest of your company.

Here are some examples of cohorts you can create in Mixpanel:
* US Users: Users who are from the US
* New Users: Users who signed up in the past month
* Power Users: Users who used your app on 5 out of the last 7 days
* Dropped-Off Users: Users who signed up, but did not come back the following week

# Creating Cohorts

You can create cohorts via any of our report visualizations or explicitly using the cohort builder. 

## Creating a Cohort from a Report
Click any bar or point in an Insights, Funnels, or Retention report and select "View Users". The side panel will show the list of users that belong to that bar or point you selected. You can save that group of users as a cohort.

## Creating a Cohort via the Cohort Builder
The [Cohort builder](https://mixpanel.com/report/users) lets you define cohorts based on a precise set of conditions. These conditions are either of the form "Users who did `<event>` more/less than `<some threshold>`" or "Users where `<profile property>` is equal to/more/less than `<value>`".
 
Let's walk through some of cohorts you can create with the builder.


Filter by users who watched more than 10 videos in the last 7 days:
![https://help.mixpanel.com/hc/article_attachments/360091745932/Kapture_2021-04-06_at_13.43.06.gif](https://help.mixpanel.com/hc/article_attachments/360091745932/Kapture_2021-04-06_at_13.43.06.gif)

Filter by whether the events were performed by business accounts:
![https://help.mixpanel.com/hc/article_attachments/360091746472/Kapture_2021-04-06_at_13.44.53.gif](https://help.mixpanel.com/hc/article_attachments/360091746472/Kapture_2021-04-06_at_13.44.53.gif)

Filter to only users who watched a video for the very first time in the past 30 days:
![https://help.mixpanel.com/hc/article_attachments/360091746612/Kapture_2021-04-06_at_13.52.43.gif](https://help.mixpanel.com/hc/article_attachments/360091746612/Kapture_2021-04-06_at_13.52.43.gif)

Filter to users that watched more than 300 mins of video in the previous 30 days:
![https://help.mixpanel.com/hc/article_attachments/360091743631/Kapture_2021-04-06_at_13.54.25.gif](https://help.mixpanel.com/hc/article_attachments/360091743631/Kapture_2021-04-06_at_13.54.25.gif)

Filter to users whose average video watch time was over 15 minutes in the previous 30 days:
![https://help.mixpanel.com/hc/article_attachments/360091747052/Kapture_2021-04-06_at_13.57.34.gif](https://help.mixpanel.com/hc/article_attachments/360091747052/Kapture_2021-04-06_at_13.57.34.gif)

Filter to users that purchased items in 3 unique categories in the last 30 days:
![https://help.mixpanel.com/hc/article_attachments/360091747132/Kapture_2021-04-06_at_14.00.02.gif](https://help.mixpanel.com/hc/article_attachments/360091747132/Kapture_2021-04-06_at_14.00.02.gif)

Filter to users that watched a video on at least 3 unique days in the previous 30 days:
![https://help.mixpanel.com/hc/article_attachments/360091744271/Kapture_2021-04-06_at_14.05.11.gif](https://help.mixpanel.com/hc/article_attachments/360091744271/Kapture_2021-04-06_at_14.05.11.gif)

Filter to users that made a purchase on 4 or more unique weeks in the last 3 months:
![https://help.mixpanel.com/hc/article_attachments/360091744711/Kapture_2021-04-06_at_14.09.03.gif](https://help.mixpanel.com/hc/article_attachments/360091744711/Kapture_2021-04-06_at_14.09.03.gif)
  
Filter to users that are above the age of 60:
![https://help.mixpanel.com/hc/article_attachments/360091745051/Kapture_2021-04-06_at_14.13.40.gif](https://help.mixpanel.com/hc/article_attachments/360091745051/Kapture_2021-04-06_at_14.13.40.gif)

You can also chain any of these cohorts together using the AND/OR operators:
![https://help.mixpanel.com/hc/article_attachments/360091749052/Kapture_2021-04-06_at_14.31.41.gif](https://help.mixpanel.com/hc/article_attachments/360091749052/Kapture_2021-04-06_at_14.31.41.gif)


# Using Cohorts in Analysis


Select a cohort from the Insights drop down menu to see how the number of users in the cohort has changed over time.

![https://help.mixpanel.com/hc/article_attachments/360040121212/angela-gif.gif](https://help.mixpanel.com/hc/article_attachments/360040121212/angela-gif.gif)

When you visualize a cohort over time, you can breakdown by another cohort, compare to an event, or compare to another cohort.


# How Cohorts are Computed
# Note on cohorts whose filters contain user profile properties:

Because user profile properties only store the most recent value, cohorts involving user profile properties will use the current value for those properties (even if the value changed over time).

For example, suppose the cohort's filter criteria is: users where user[“City”] == “SF” and “Did Event: Order Ride 3 times in Last 7 days”.

Mixpanel computes the above over the last 30 days and then groups the set of users who have property user[“City”] == “SF” as of right now and intersect that with the daily cohort of users who did Order Ride 3 times in the last 7 days.

# Cohorts are Dynamic

Users qualify for a cohort based on the specified conditions. This doesn’t ensure that that user will always be in the cohort.

For example, assume the condition of the cohort is performing a “Song Play” event in the last 30 days. If a user plays a song once in thirty days, they will enter the cohort. If that user doesn’t listen to another song at the 30 day mark, however, then they will exit the cohort as they no longer meet the qualifying condition of having performed a “Song Play” event in the last 30 days.

# Cohorts are Always Current at the Time you Run a Report

When you run a report that involves a cohort, Mixpanel returns the group of users that meet the criteria for that cohort at the moment.

This is important to consider when running a report with a “From Date” and “To Date” selected. The analyzed cohort will not be the cohort during the “From Date” and “To Date” time period. The analyzed cohort will be users *currently* in the cohort.


# Save a Cohort

When you finish defining the group filters for your cohort, click **Save**. You must give your cohort a name if you did not do so in the group filter screen. You can add a cohort description to give your team more context about the group of users in your cohort. You can choose to just "Save" the cohort and keep that cohort private, or save the cohort and share that cohort with your colleagues in the same flow (as shown below):

![https://help.mixpanel.com/hc/article_attachments/360083842392/Screen_Recording_2021-01-27_at_2.28.01_PM.gif](https://help.mixpanel.com/hc/article_attachments/360083842392/Screen_Recording_2021-01-27_at_2.28.01_PM.gif)

If you already hit "Save" without sharing that cohort with anyone - not to worry, as you can always hit the "Share" button after saving:

![https://help.mixpanel.com/hc/article_attachments/360083913011/Screen_Recording_2021-01-27_at_2.35.20_PM.gif](https://help.mixpanel.com/hc/article_attachments/360083913011/Screen_Recording_2021-01-27_at_2.35.20_PM.gif)

# Update a Cohort

You can update cohorts and any changes you make to your base cohort will reflect in other cohorts that depend on it. For example if a Churn Risk Users cohort (A) is defined as “users who have not done any event in the last 30 days”, you can create a dependent cohort called Churn Risk Users in San Francisco (B), which is “Users in Churn Risk cohort AND have the property ‘City’ = ‘San Francisco’”.

Now, if you make any changes to Cohort A, such as changing the date range to “users who have not done anything in the last 60 days”, then Cohort B will automatically update to use the new definition of Cohort A.

# Create Temporary Inline Cohorts

You have the option to create a temporary cohort in Insights, Funnels, and Dashboards when you choose to add a cohort, or filter and breakdown by a cohort. This cohort will only exist for the current query and does not persist throughout Mixpanel.

In the [Insights](https://help.mixpanel.com/hc/en-us/articles/360001333826) report a temporary cohort can be created in both the query and the results of the query as a filter or breakdown.

In the [Funnels](https://help.mixpanel.com/hc/en-us/articles/360019982652-Funnels-Report-Basics) report a temporary cohort can only be created in the results of your query as a filter or breakdown.

In [Dashboards](https://help.mixpanel.com/hc/en-us/articles/115004565746-Dashboard-Overview-) a temporary cohort can only be created to filter your dashboard.

To add a temporary cohort to your Insights query, click **Add** and select **Cohort**. Then, select **Create cohort**.

![https://help.mixpanel.com/hc/article_attachments/360091942252/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/360091942252/mceclip0.png)

To add a temporary cohort as a filter or breakdown in your report, click either **Filter** or **Breakdown** and select **Create cohort** under the "Cohort" tab.

![https://help.mixpanel.com/hc/article_attachments/360091937971/Kapture_2021-04-08_at_10.08.30.gif](https://help.mixpanel.com/hc/article_attachments/360091937971/Kapture_2021-04-08_at_10.08.30.gif)

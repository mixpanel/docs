---
title: "Cohorts"
slug: "cohorts"
hidden: false
metadata:
  title: "Cohorts"
  description: "Learn how to use cohorts in Mixpanel."
---

Cohorts are groups of users defined by a chosen set of criteria, like a shared property or sequence of events. When you define a cohort, you can use it to group and filter data in the Analysis reports. You can also use cohorts to target groups of users via messaging integrations.

# Use Cohorts in Reports

Cohorts can be created almost anywhere within Mixpanel.

You can [create a new cohort](https://help.mixpanel.com/hc/en-us/articles/115005701343) from the Insights, Flows, Funnels, Retention, and Impact Reports. To do so, click "Create Custom" > "Cohort" from within any Filter or Breakdown menu.

![https://help.mixpanel.com/hc/article_attachments/4410701856660/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/4410701856660/mceclip0.png)

You can also create cohorts directly from the charts in [Retention reports](https://help.mixpanel.com/hc/en-us/articles/360026788932) or [Funnels reports](https://help.mixpanel.com/hc/en-us/articles/360025670271).

You can create and save cohorts in the [Users page](https://help.mixpanel.com/hc/en-us/articles/360000902886) as well.

Finally, cohorts can be created via the Create Cohort button at the top right of the Cohorts management page, found in the Data Management menu.

After you create a cohort, you can use it to analyze your user data in the Analysis Reports.

# Visualize Cohorts Over Time

Select a cohort from the Insights drop down menu to see how the number of users in the cohort has changed over time.

![https://help.mixpanel.com/hc/article_attachments/360040121212/angela-gif.gif](https://help.mixpanel.com/hc/article_attachments/360040121212/angela-gif.gif)

When you visualize a cohort over time, you can breakdown by another cohort, compare to an event, or compare to another cohort.

# Note on cohorts whose filters contain user profile properties:

Because user profile properties only store the most recent value, cohorts involving user profile properties will use the current value for those properties (even if the value changed over time).

For example, suppose the cohort's filter criteria is: users where user[“City”] == “SF” and “Did Event: Order Ride 3 times in Last 7 days”.

Mixpanel computes the above over the last 30 days and then groups the set of users who have property user[“City”] == “SF” as of right now and intersect that with the daily cohort of users who did Order Ride 3 times in the last 7 days.

# Cohorts Characteristics

Cohorts have several characteristics that affect results in Mixpanel reports. While Cohorts are intuitive, the following traits are important to realize when interpreting results.

# Cohorts are Dynamic

Users qualify for a cohort based on the specified conditions. This doesn’t ensure that that user will always be in the cohort.

For example, assume the condition of the cohort is performing a “Song Play” event in the last 30 days. If a user plays a song once in thirty days, they will enter the cohort. If that user doesn’t listen to another song at the 30 day mark, however, then they will exit the cohort as they no longer meet the qualifying condition of having performed a “Song Play” event in the last 30 days.

# Cohorts are Always Current at the Time you Run a Report

When you run a report that involves a cohort, Mixpanel returns the group of users that meet the criteria for that cohort at the moment.

This is important to consider when running a report with a “From Date” and “To Date” selected. The analyzed cohort will not be the cohort during the “From Date” and “To Date” time period. The analyzed cohort will be users *currently* in the cohort.

# Export Cohorts

From Data Management -> Cohorts, click **Export** in the inline action menu to export a cohort list to a webhook or an integration

![https://help.mixpanel.com/hc/article_attachments/360055254011/Untitled.png](https://help.mixpanel.com/hc/article_attachments/360055254011/Untitled.png)

To download a csv, click

**View Users

and then click

**Export CSV

. The CSV file will automatically download.

### **Note:

- The export will only show the user profile properties of users in the cohort that are viewable in the currently displayed table at the time of export. You don't get ALL of a user's profile properties.
- Users who exist in the cohort that don't have a user profile will appear in the CSV as a distinct_id only.

# Delete Cohorts

Click on the **trash icon** or click **Delete** in the inline action menu to delete a cohort.

![https://help.mixpanel.com/hc/article_attachments/360055254611/Untitled2.png](https://help.mixpanel.com/hc/article_attachments/360055254611/Untitled2.png)

If you create cohorts based off of other cohorts, you will not be able to delete the original cohort the new cohort is dependent on.

For example, you can create a new cohort A which combines cohorts B and C, but you will not be able to delete cohorts B or C, until you delete cohort A.

A [cohort](https://help.mixpanel.com/hc/en-us/articles/115005708186) is a group of users who have performed a particular group of events or share a common set of property values. You can use cohorts to analyze a specific group of users in the Analysis reports.

You do not need to create user profiles to create a cohort. Cohorts can also include anonymous users. View a list of all of your project's saved cohorts by clicking into the **Cohorts** page, under the **Data Management** tab.

Create cohorts based on users or groups by clicking on **Users** at the top of the page, or by clicking Create Cohort within any filter or breakdown dropdown.  Once you've specified the filters that define the cohort, click Save As at the bottom right of the query builder to save that cohort for later.

![https://help.mixpanel.com/hc/article_attachments/360094560051/Screen_Shot_2021-05-05_at_3.21.45_PM.png](https://help.mixpanel.com/hc/article_attachments/360094560051/Screen_Shot_2021-05-05_at_3.21.45_PM.png)

We are rolling out an upgraded experience for building cohorts, with this change, you will be able to use property aggregations and 1st time filters to build cohorts and answer questions like:

- Show me users that did Purchases of a cumulative sum of $50 in the last 7 days (as opposed to what’s supported today, which is “show me users that have done A purchase of more than $50 in the last 7 days")
- Show me users that watched more than 2 unique videos in the last 30 days
- Show me users that watched a video in 4 unique weeks in the past 3 months
- Show me the users that did their 1st ever purchase in the last 30 days

As mentioned earlier, a cohort is a *group of users that have performed a particular group of events or share a common set of property values*, so you can build a cohort starting with the "Add Filter' button and filter down by **events**, **event properties**, **user properties**, and even other **cohorts**.

# Filter by events

If you want to build a cohort of users that performed a particular group of events, you can start by hitting the filter button and select the event name, following up with the frequency and the time range:

![https://help.mixpanel.com/hc/article_attachments/360091745932/Kapture_2021-04-06_at_13.43.06.gif](https://help.mixpanel.com/hc/article_attachments/360091745932/Kapture_2021-04-06_at_13.43.06.gif)

You can also add event property filters to this to make your targeting more precise:

![https://help.mixpanel.com/hc/article_attachments/360091746472/Kapture_2021-04-06_at_13.44.53.gif](https://help.mixpanel.com/hc/article_attachments/360091746472/Kapture_2021-04-06_at_13.44.53.gif)

You can also add a [1st time filter](https://help.mixpanel.com/hc/en-us/articles/360001355506-Tracking-First-Time-Users#1st-time-filters) to an event to get a group of users that did that particular event for the very first time ever:

![https://help.mixpanel.com/hc/article_attachments/360091746612/Kapture_2021-04-06_at_13.52.43.gif](https://help.mixpanel.com/hc/article_attachments/360091746612/Kapture_2021-04-06_at_13.52.43.gif)

What this example shows is that there were 16,065 users that had watched their 1st ever video in the last 30 days.

You aren't just limited to building cohorts based on event counts - you can now also build cohorts based on property aggregations. Simply click on "Total" -> "Aggregate properties" to then select what kind of aggregation you'd like to do.

Here's an example of creating a cohort of users that watched a cumulative of over 300 mins of video in the previous 30 days:

![https://help.mixpanel.com/hc/article_attachments/360091743631/Kapture_2021-04-06_at_13.54.25.gif](https://help.mixpanel.com/hc/article_attachments/360091743631/Kapture_2021-04-06_at_13.54.25.gif)

Here's an example of creating a cohort of users that watched videos of an average watch time greater than 15 mins in the previous 30 days:

![https://help.mixpanel.com/hc/article_attachments/360091747052/Kapture_2021-04-06_at_13.57.34.gif](https://help.mixpanel.com/hc/article_attachments/360091747052/Kapture_2021-04-06_at_13.57.34.gif)

Here's an example of creating a cohort of users that purchased items across 3 unique categories in the last 30 days:

![https://help.mixpanel.com/hc/article_attachments/360091747132/Kapture_2021-04-06_at_14.00.02.gif](https://help.mixpanel.com/hc/article_attachments/360091747132/Kapture_2021-04-06_at_14.00.02.gif)

Creating a cohort based on users doing events on "unique days" hasn't gone away - in fact, users now have the ability to create cohorts of users that did events on X "unique hours", "unique weeks", "unique months", "unique quarters", "unique year", "unique hour of day" and "unique day of week" and users can now get to that using the property aggregations.

Here's an example of creating a cohort of users that watched a video on at least 3 unique days in the previous 30 days:

![https://help.mixpanel.com/hc/article_attachments/360091744271/Kapture_2021-04-06_at_14.05.11.gif](https://help.mixpanel.com/hc/article_attachments/360091744271/Kapture_2021-04-06_at_14.05.11.gif)

Here's an example of creating a cohort of users that made a purchase on 4 or more unique weeks in the last 3 months:

![https://help.mixpanel.com/hc/article_attachments/360091744711/Kapture_2021-04-06_at_14.09.03.gif](https://help.mixpanel.com/hc/article_attachments/360091744711/Kapture_2021-04-06_at_14.09.03.gif)

See how easy [Lifecycle analysis](https://mixpanel.com/blog/growth-through-segmentation-lifecycle-analysis-to-understand-your-users/) becomes with this new cohorts builder:

# Filter by properties

You can also filter by user profile properties and [lookup profile properties](https://help.mixpanel.com/hc/en-us/articles/360044139291-Lookup-tables) by hitting the "Add Filter" button, here's an example of filtering "All users" that are above the age (user profile property) of 60:

![https://help.mixpanel.com/hc/article_attachments/360091745051/Kapture_2021-04-06_at_14.13.40.gif](https://help.mixpanel.com/hc/article_attachments/360091745051/Kapture_2021-04-06_at_14.13.40.gif)

Here's an example of filtering "All users" that are from Asia (where Country.Region is a lookup profile property):

![https://help.mixpanel.com/hc/article_attachments/360091748392/Kapture_2021-04-06_at_14.20.59.gif](https://help.mixpanel.com/hc/article_attachments/360091748392/Kapture_2021-04-06_at_14.20.59.gif)

# Filter by cohorts

You can also define a cohort by inheriting the conditions from a cohort that has already been defined (thereby not needing to define the cohort again!) and here's an example of creating a cohort of users that are part of both "Active video watchers" and "New users":

![https://help.mixpanel.com/hc/article_attachments/360091748592/Kapture_2021-04-06_at_14.24.43.gif](https://help.mixpanel.com/hc/article_attachments/360091748592/Kapture_2021-04-06_at_14.24.43.gif)

You can also mix and match event, property and cohort filters to define a single cohort, and here's an example:

![https://help.mixpanel.com/hc/article_attachments/360091749052/Kapture_2021-04-06_at_14.31.41.gif](https://help.mixpanel.com/hc/article_attachments/360091749052/Kapture_2021-04-06_at_14.31.41.gif)

If you want to add multiple conditions onto a single group, you can still do that by hitting filter and adding more conditions, you can then change how the different conditions are applied in that group by selecting "and":

![https://help.mixpanel.com/hc/article_attachments/360091749332/Kapture_2021-04-06_at_14.35.36.gif](https://help.mixpanel.com/hc/article_attachments/360091749332/Kapture_2021-04-06_at_14.35.36.gif)

Here's an example of creating a cohort of users that did at least 1 purchase OR did 2 or more video watches AND created 1+ playlists:

![https://help.mixpanel.com/hc/article_attachments/360083911491/Screen_Recording_2021-01-27_at_2.19.18_PM.gif](https://help.mixpanel.com/hc/article_attachments/360083911491/Screen_Recording_2021-01-27_at_2.19.18_PM.gif)

You can also use "and then" condition that was available earlier by selecting "then did". Here's an example of users that did 1+ purchases and THEN DID 2+ video watches and THEN DID 1+ create playlists in the last 30 days:

![https://help.mixpanel.com/hc/article_attachments/360091746851/Kapture_2021-04-06_at_14.40.46.gif](https://help.mixpanel.com/hc/article_attachments/360091746851/Kapture_2021-04-06_at_14.40.46.gif)

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

# Create a New Cohort From Funnels

# Cohorts from Funnel Chart

Select a piece of the funnel you want to create a cohort from. You can select any step of the funnel, or even the drop-off from the funnel.

![https://help.mixpanel.com/hc/article_attachments/7653343274388/Screen_Shot_2019-03-20_at_3.26.19_PM.png](https://help.mixpanel.com/hc/article_attachments/7653343274388/Screen_Shot_2019-03-20_at_3.26.19_PM.png)

Click the **Create cohort** button. If you have selected drop-off, you will be able to choose to either create a cohort of drop-offs up to that step, or drop-offs only in that step.

![https://help.mixpanel.com/hc/article_attachments/7653343821716/Screen_Shot_2019-03-20_at_3.28.56_PM.png](https://help.mixpanel.com/hc/article_attachments/7653343821716/Screen_Shot_2019-03-20_at_3.28.56_PM.png)

In the window that pops up, a title and description for the cohort is automatically created, which you can choose to edit. You will not be able to edit the title or targeting components of the cohort once it is created, but you will be able to edit the description as normal.

Then, click **Save**.

After you click **Save** a small blue box will pop up at the bottom of the screen, where you can click on **GO TO COHORT LIST** to view your [cohorts](https://help.mixpanel.com/hc/en-us/sections/115001615263-Cohorts), including the one you just created.

# Cohorts from Time to Convert Chart

Select any bar on the Time to Convert chart and click the **Create Cohort** button to create a cohort of users that converted within that time range.

![https://help.mixpanel.com/hc/article_attachments/7653344572052/Screen_Shot_2019-07-19_at_11.46.47_AM.png](https://help.mixpanel.com/hc/article_attachments/7653344572052/Screen_Shot_2019-07-19_at_11.46.47_AM.png)

In the window that pops up, a title and description for the cohort is automatically created, which you can choose to edit. You will not be able to edit the title or targeting components of the cohort once it is created, but you will be able to edit the description as normal.

Then, click **Save**.

After you click **Save** a small blue box will pop up at the bottom of the screen, where you can click on **GO TO COHORT LIST** to view your [cohorts](https://help.mixpanel.com/hc/en-us/sections/115001615263-Cohorts), including the one you just created.

You cannot edit the selection criteria for a cohort that you create from a Funnels report. However, the users that qualify for a cohort will continue to update over time like a regular cohort.

# Create a New Cohort From Retention

The feature is not available for Frequency Retention reports.

Click a segment or bucket of the Retention report to create a cohort from that group of users.

![https://help.mixpanel.com/hc/article_attachments/7653358109972/Screen_Shot_2019-04-03_at_11.38.57_AM.png](https://help.mixpanel.com/hc/article_attachments/7653358109972/Screen_Shot_2019-04-03_at_11.38.57_AM.png)

Click the **Create cohort** button, and then select either **Retained users** or **Dropped users**.

In the window that pops up, a title and description for the cohort is automatically created, which you can choose to edit. You will not be able to edit the targeting components of the cohort once it is saved, as it is a snapshot of the users in that retention bucket. You will not be able to edit the title after the cohort is saved, but you will be able to edit the description.

![https://help.mixpanel.com/hc/article_attachments/7653346154772/Screen_Shot_2019-04-16_at_2.08.38_PM.png](https://help.mixpanel.com/hc/article_attachments/7653346154772/Screen_Shot_2019-04-16_at_2.08.38_PM.png)

After you have made any edits to the title or description of the cohort, click **Save**.

A small blue box will pop up at the bottom of the screen after you click save. From here you can click **GO TO COHORT LIST** to view your [cohorts](https://help.mixpanel.com/hc/en-us/sections/115001615263-Cohorts), including the one that you just created.

# Scenarios in which Cohort Creation is Disabled

There are two situations in which it will not be possible to create a cohort from the Retention report:

1. When there are zero retained or dropped users in the bucket. Cohorts can only be created when there is at least one eligible user.
    ![https://help.mixpanel.com/hc/article_attachments/7653359527828/Screen_Shot_2019-04-16_at_2.09.29_PM.png](https://help.mixpanel.com/hc/article_attachments/7653359527828/Screen_Shot_2019-04-16_at_2.09.29_PM.png)

2. When retention is segmented by a cohort. You must select all users in the query builder to create a cohort.

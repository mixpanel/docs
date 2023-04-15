---
title: "Cohorts"
slug: "cohorts"
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

## Creating a Cohort via a Report
Click any bar or point in an Insights, Funnels, or Retention report and select "View Users". The side panel will show the list of users that belong to that bar or point you selected. You can save that group of users as a cohort.

## Creating a Cohort via the Cohort Builder
The [Cohort Builder](https://mixpanel.com/report/users) lets you define cohorts based on a precise set of conditions. These conditions are either of the form "Users who did `<event>` more/less than `<some threshold>`" or "Users where `<profile property>` is equal to/more/less than `<value>`".
 
Let's walk through some of cohorts you can create with the builder.

### Filter by users who watched more than 10 videos in the last 7 days
![https://help.mixpanel.com/hc/article_attachments/360091745932/Kapture_2021-04-06_at_13.43.06.gif](https://help.mixpanel.com/hc/article_attachments/360091745932/Kapture_2021-04-06_at_13.43.06.gif)

### Filter to only users who watched a video for the very first time in the past 30 days
![https://help.mixpanel.com/hc/article_attachments/360091746612/Kapture_2021-04-06_at_13.52.43.gif](https://help.mixpanel.com/hc/article_attachments/360091746612/Kapture_2021-04-06_at_13.52.43.gif)

### Filter to users that watched more than 300 mins of video in the previous 30 days
![https://help.mixpanel.com/hc/article_attachments/360091743631/Kapture_2021-04-06_at_13.54.25.gif](https://help.mixpanel.com/hc/article_attachments/360091743631/Kapture_2021-04-06_at_13.54.25.gif)

### Filter to users whose average video watch time was over 15 minutes in the previous 30 days
![https://help.mixpanel.com/hc/article_attachments/360091747052/Kapture_2021-04-06_at_13.57.34.gif](https://help.mixpanel.com/hc/article_attachments/360091747052/Kapture_2021-04-06_at_13.57.34.gif)

### Filter to users that purchased items in 3 unique categories in the last 30 days
![https://help.mixpanel.com/hc/article_attachments/360091747132/Kapture_2021-04-06_at_14.00.02.gif](https://help.mixpanel.com/hc/article_attachments/360091747132/Kapture_2021-04-06_at_14.00.02.gif)

### Filter to users that watched a video on at least 3 unique days in the previous 30 days
![https://help.mixpanel.com/hc/article_attachments/360091744271/Kapture_2021-04-06_at_14.05.11.gif](https://help.mixpanel.com/hc/article_attachments/360091744271/Kapture_2021-04-06_at_14.05.11.gif)

### Filter to users that made a purchase on 4 or more unique weeks in the last 3 months
![https://help.mixpanel.com/hc/article_attachments/360091744711/Kapture_2021-04-06_at_14.09.03.gif](https://help.mixpanel.com/hc/article_attachments/360091744711/Kapture_2021-04-06_at_14.09.03.gif)
  
### Filter to users that are above the age of 60
![https://help.mixpanel.com/hc/article_attachments/360091745051/Kapture_2021-04-06_at_14.13.40.gif](https://help.mixpanel.com/hc/article_attachments/360091745051/Kapture_2021-04-06_at_14.13.40.gif)

### Chaining cohorts together using the AND/OR operators
![https://help.mixpanel.com/hc/article_attachments/360091749052/Kapture_2021-04-06_at_14.31.41.gif](https://help.mixpanel.com/hc/article_attachments/360091749052/Kapture_2021-04-06_at_14.31.41.gif)

You can also access the builder directly from the property picker in any of our reports, by clicking Create Custom > Cohort. This will create a temporary cohort that only persists for your analysis session.


# Using Cohorts in Analysis
You can visualize how cohorts size over time, use cohorts to filter your reports, or compare how cohorts perform a metric.

## Visualizing Cohort Size Over Time

In Insights, you can define a metric based on the size of a cohort over time. This is useful to understand how key subsets of your user base (like your Power Users) are trending over time. Select a cohort from the "Events and Cohorts" menu in the Insights report; this will generate a line chart that shows the size of the cohort over time. Each point is the size of the cohort as of the end of that time interval.

## Filtering by a Cohort

You can use cohorts to filter any of your analysis by selecting a cohort from the filter menu. For example, if you're focused on Onboarding, you can filter all your analyses to the New Users cohort, which might be defined as users who signed up in the past 7 days.

## Comparing Cohorts

You can compare the behavior of different cohorts by selecting a cohort from the breakdown menu. For example, you can use this to see how engagement compares for Power Users vs All Users.


# How Cohorts are Computed

Cohorts are computed dynamically at the time that you use them in a query. Suppose you make a funnels report that filters down to the New Users cohort. Under the hood, Mixpanel does the following:
1. Run a query to compute the set of users who are in the cohort as of right now (the time that the query is run).
2. Run a query to compute the set of users who converted in the funnel, filtering down to the list produced in Step 1.

This has a few implications. First, it means every time you run a query that uses the cohort, the cohort is freshly computed vs being a static snapshot of users. Second, it means that the set of users who are in the cohort are users that are in the cohort as of _right now_; it's _not_ a rolling window of users that have ever been in the cohort.

## Cohorts and Time
We don't recommend using Cohorts in analysis when trying to understand cause -> effect relationships between user behavior. For example, suppose you're trying to understand whether watching more comedy videos drives users to subscribe. You might create a Comedy Fans cohort defined as "Users who performed Watched Video where genre=comedy in the last 30 days" and then breakdown your Subscriptions by whether users are in the Comedy Fans cohort. The problem is that the user might have become a Comedy Fan _after_ subscribing, which doesn't tell you whether watching comedy had any impact on subscribing.

Instead, we recommend using Funnels if you want to understand specific sequences of events with a strict ordering between each other. For example, creating a funnel from Signup -> Subscription and comparing that to a funnel from Signup -> Watched Comedy -> Subscription, to understand what % of users convert after watching comedy.


# Saving and Sharing Cohorts

Cohorts that you create are, by default, only visible to you. You can optionally share cohorts with specific other people or with your organization. This makes Cohorts that you create discoverable by others.

We recommend sharing a set of key cohorts with your organization, to ensure that you align on key definitions of user behavior that are important for your business (eg: New Users, Power Users). We also recommend adding descriptions to such cohorts, to share context with your team.


# Exporting Cohorts

You can download the list of users in any Cohort as a CSV via the Cohort Builder. You can also push cohorts to 3rd-party destinations like [Segment](doc:segment-integration), [Braze](doc:braze-integration), or a [Custom Webhook](doc:cohort-webhooks).

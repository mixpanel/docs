---
title: "Insights"
slug: "report-insights"
hidden: false
createdAt: "2023-03-12T01:21:07.881Z"
updatedAt: "2023-03-20T21:16:03.843Z"
---
# Overview

Insights is a powerful and flexible tool designed to visualize trends and compositions within your data. You can analyze events, cohorts, and user profiles, and display the data in a wide variety of chart types.

Advanced Insights features also allow you to create formulas, compare current data to past data, and generate custom events and properties for deeper analysis.

# Sample Questions you can Answer in Insights
Imagine your product is a B2B messaging application. You might use Insights to answer these sample questions:

* How many messages were sent in the US in the past 30 days? (total events, filtered)
* How many users had a mobile app session yesterday? (unique events)
* How many messages are sent per session? (formulas)
* Which advertising campaigns generate the most signups? (property breakdown)
* How much revenue was generated on plans purchased in the past year? (property aggregation)
* How has the power users cohort grown over the past 6 months? (cohort trends)

# Building your First Report
Building a report in Insights takes just a few clicks, and results arrive in seconds. Let's build a simple report together. Continuing the B2B messaging example, imagine you wanted to answer the following question:

*Which cities in the United States have the most users who sent messages via the iOS platform?*

Feel free to follow along and create your own report right in our demo project, here. To skip ahead and see the final result, click here.

## Step 1: Choose Events
Events, cohorts, or profiles can be the basic building block of an Insights report. In this case, we want to know about users who sent messages, so within the "Events and Cohorts" section, add the "Send Message" event. At this point, your query should look like this:

mceclip4.png

## Step 2: Choose Count Type
Next to your selected event, you can choose how to count that event. By default, Insights will count Total events, which, as the name implies, will count every occurrence of the event. In this case, we want to know how many users sent messages, so choose "Unique." Unique counts one event per user. At this point, your query should look like this:

mceclip5.gif

 

## Step 3: Choose Filters
Filters exclude unwanted data. In this case, we only care about events performed on the iOS platform. Therefore, add a "Platform" filter, where Platform equals "iOS Native". At this point, your query should look like this:

mceclip6.gif

## Step 4: Choose Breakdowns
Breakdowns segment data into groups. In this case, we want to count message sending users in different cities. Therefore, add a "City" breakdown. At this point, your query should look like this:

mceclip7.gif

Congratulations, you've constructed your first Insights query! Now, it's time to examine the results.

# Visualizing Results
Insights features multiple visualizations to help you view the results of your query in the clearest chart type. By default, Insights displays line charts, which help you understand how metrics trend over time. However, another chart type might present the results with more clarity.

In Insights, you can either choose to get a metric calculated across the entire time period selected in the date picker, or get a time-segmented view of the metric (e.g. daily breakdown).
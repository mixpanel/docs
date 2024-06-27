# Visualizations

## Overview 

Funnels feature multiple visualizations to help you understand how your users convert from one event to the next.

## Funnel Steps

Funnel Steps is the default visualization for the Funnels Report and lets you see how your users are progressing through the steps of your funnel. Each bar represents a funnel step showing you both the conversion rate percentage and the raw number of funnel entries at each step. Click on each bar to view users who converted/dropped off or use the View as Flow feature to learn more about behaviors between the steps.

### View as Flow

In order to learn more about the behavior users take between funnel steps, use "View as Flow". You can see what user flows and behaviors that can increase the likelihood of conversion or drop-off. This helps to answer questions like:

- What flows do users take between opening an app and making a purchase?
- Why did the successful users purchase?
- What flows do users take that don’t lead to a purchase?
- How do these two paths differ? What actions should I nudge towards or against?
- What did the users that dropped-off do instead?

![image](https://github.com/mixpanel/docs/assets/2077899/b37e48d4-d9c8-42b7-9e79-72e7e71e47eb)

#### Using Conversion and Drop-off Flows

First, go to the Mixpanel Funnels Report, and create any funnel you like by selecting 2 or more events steps.

Next, click on the conversion or drop-off population you wish to examine further and select View As Flow.

![/cr8695o49k.png](/cr8695o49k.png)

In this example, I want to see what events lead to better conversion or more drop-off between Step 1 Browse and Step 2 Add To Cart. This will send me to the Sankey visualization to see these event streams in a Flows report.

I can see that all of the Funnel's criteria is still maintained. In my example, I still am counting a Unique funnel, within 30 days, holding the Item Name property constant, and excluding users that Abandon Cart at any stage. I can also go back to the Funnel to change my criteria at any time.

The Sankey is automatically broken down by users that eventually converted or did not convert to Add to Cart (Users may not convert because of hitting exclusion steps, or failing to complete the funnel within the conversion window).

![/Screen_Shot_2021-05-26_at_7.13.34_AM.png](/Screen_Shot_2021-05-26_at_7.13.34_AM.png)

Hovering over any path I can see the size of the population and the percent converted to this action from the previous one.

![/rjgjxun5bz.png](/rjgjxun5bz.png)

In the example, I can see here that 10.6% converted immediately to Adding to their Cart.

**Lift Actions: What paths are performed more often by users who convert compared those who drop off?**

With the recently added lift actions feature, we have made it possible to quickly tell which actions and paths had a higher or lower conversion rate compared to the funnel as a whole.

![/Screen_Shot_2021-05-26_at_7.38.50_AM.png](/Screen_Shot_2021-05-26_at_7.38.50_AM.png)

In this example, I can see that Users who performed Search Results, had a +24% higher conversion rate compared to overall (51.1% vs. 41.2%). Whereas, users who performed Experiment Started had a -82.4% reduction in conversion rate compared to overall (7.2% vs. 41.2%).By looking at the positive (green) and negative (red) lift actions, you should be able to quickly form hypothesis on which paths and events are likely to result in more or less conversions.

**Filter by Conversion: What are the common paths taken by users who convert?**

If you want to do an isolated analysis of conversions, I can apply a filter so that the report will include only conversions.  This is done by clicking on Filter in the query builder and selecting the Conversion property. Setting it to Converted, will filter only to users who have converted.

![/l387g5uhw1_1_.png](/l387g5uhw1_1_.png)

![/Screen_Shot_2021-05-26_at_7.55.31_AM.png](/Screen_Shot_2021-05-26_at_7.55.31_AM.png)

In this example, we can see that 35.6% of conversions happened in the first step.

**Filter by drop off: What do users do right before dropping off?**

To view what users did before dropping off, change the filter to "Did not Convert", and add more steps before the drop off step

![/Screen_Shot_2021-05-26_at_7.58.29_AM.png](/Screen_Shot_2021-05-26_at_7.58.29_AM.png)

![/Screen_Shot_2021-05-26_at_7.59.51_AM.png](/Screen_Shot_2021-05-26_at_7.59.51_AM.png)

Now, I can see that 33.7% of users who did not convert, did the "Join Loyalty Program" before dropping off. I can use this hypothesis to evaluate the business impact of the loyalty program, and perhaps make some changes to the product.

## Line Chart

The line chart in Funnels allows you to visualize your measurement as a trend over time. You can toggle between evaluating the performance of your [entire funnel across all steps or between specific steps](/docs/reports/funnels/measurements#step-selection). Please note that the line chart is a time-segmented visualization, meaning that your measurement is taking place for each selected interval (daily, weekly, etc.). Each interval represents the time-period when your user enters the funnel.

## Bar Chart

The bar in Funnels allow you to visualize your measurement as an aggregate across the entire date range of the report. You can toggle between evaluating the performance of your [entire funnel across all steps or between specific steps](/docs/reports/funnels/measurements#step-selection). The metric view behaves in the same way as a bar chart, but optimizes the visualization for viewing as a KPI.

## Top Paths

If you have selected **any order** for your funnels steps, you have the option to select **Top paths** from the drop-down list to view a Sankey visualization of how your users are performing the steps in your funnel.

![/Screen_Shot_2022-07-12_at_3.30.32_PM.png](/Screen_Shot_2022-07-12_at_3.30.32_PM.png)

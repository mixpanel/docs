# Visualizations

## Overview

The Flows report provides a User Flows sankey chart and a Top Path chart to help you understand the events flow of your users.

## Sankey Chart

### Selected Events

These are significant moments in a users lifecycle around which you would like to explore user behavior (for example, you may wish to view what users do after a Sign Up event).  Selected events are picked in the query builder and are annotated with an alphabetical label (A, B, C) that is shown in the query builder and the sankey diagram.

![/Screen_Shot_2021-07-20_at_7.20.39_PM.png](/Screen_Shot_2021-07-20_at_7.20.39_PM.png)

In the above example, we picked two anchor events "Exit Tutorial" and "Experiment Started", and are viewing the events that were performed by users between them.

### Intermediate Events

Once an event is selected, Mixpanel calculates the most common events performed by users immediately before or after the selected events. These intermediate events can match either regularly tracked events OR the most used custom events in your project. The icon will let you know at a glance the type of event being displayed.

![/Screen_Shot_2021-07-20_at_7.27.00_PM.png](/Screen_Shot_2021-07-20_at_7.27.00_PM.png)

In the above example, Install or Open is a [custom event](/docs/features/custom-events/), while Experiment Started is a regular event.

### Custom events as intermediate events

Mixpanel automatically considers the most used and common custom events in your project, displaying them in intermediate steps instead of showing the underlying events. When a custom event is shown instead of the underlying event, it is annotated with the custom event icon to indicate that the event displayed is a custom event.

![/Screen_Shot_2021-07-20_at_7.04.29_PM.png](/Screen_Shot_2021-07-20_at_7.04.29_PM.png)

Mixpanel uses the following criteria to decide which custom events are shown in user flows:

1. Custom events that are shared with all users in the projects are the only ones picked to be shown in flows right now
2. Only the 50 most frequently queried custom events in the project are used in flows analysis.
3. If custom events have overlapping definitions (e.g. both custom events operate on the same event), we will choose the more frequently queried custom event to show in the report.

### Other Events

At each step in the flow, Mixpanel by default displays the top 3 intermediate events performed by users ordered by the number of users who performed them at that step. The rest of the events performed are grouped into a single bar called "Other events".

![/Screen_Shot_2021-07-20_at_7.28.39_PM.png](/Screen_Shot_2021-07-20_at_7.28.39_PM.png)

### Drop off

“Drop-off” represents users who did not do any further events in the next step during the time period specified in the report, and therefore dropped out of the flow. Users are considered dropped off at future anchor steps selected in the query builder if they do not perform that particular anchor in the time period.

![/Screen_Shot_2021-07-20_at_7.28.54_PM.png](/Screen_Shot_2021-07-20_at_7.28.54_PM.png)

### View More Events

By default, flows only shows you the top 3 events performed by users ordered by the number of users who performed them. Less common events performed by fewer users are combined into an "Other events" section. ([Click here](/docs/reports/flows). To view more events, simply right click the other events node and `Add a row of events`.

![/Screen_Shot_2021-07-20_at_7.46.45_PM.png](/Screen_Shot_2021-07-20_at_7.46.45_PM.png)

To expand a large number of steps at the same time, you can select the number of rows you want directly in the advanced settings

![/Screen_Shot_2021-07-20_at_7.47.31_PM.png](/Screen_Shot_2021-07-20_at_7.47.31_PM.png)


## Top Paths

Another way to visualize your user flows is by "Top Paths", which condenses the flows down to unique paths on each row. This visualization is great for understanding the most common paths users take, though they may not be similar. In this case, since we want to understand the most common paths, choose Top Paths. Your report should look like this:

In the top bar of the visualization, you will see the option to toggle between User Flows and Top Paths.

![/Screen_Shot_2022-07-12_at_4.31.17_PM.png](/Screen_Shot_2022-07-12_at_4.31.17_PM.png)

Top paths will show the 50 most common event sequences of up to the number of steps you had selected in the User Flow sankey visualization.

![/Screen_Shot_2022-07-12_at_4.32.15_PM.png](/Screen_Shot_2022-07-12_at_4.32.15_PM.png)

The total percentage of users who reached the ultimate destination of a flow is indicated on the top left, while the total users that reached a given step and the percentage of users who converted from the previous step are indicated on the bottom of each step.

![image](https://github.com/mixpanel/docs/assets/2077899/c36fcfb5-edbb-4374-86fc-6e3d3f5aa316)

## View More Steps

By default, flows shows you the first 3 events performed by users after the selected event. If you wish to see what users did further along in the path, you can adjust the number of steps directly in the Sankey visualization as shown below.

Use the "+" on the right of the visualization to add steps after your selected events of interest to see what paths your users took following these key events.

![/Screen_Shot_2021-07-20_at_7.34.41_PM.png](/Screen_Shot_2021-07-20_at_7.34.41_PM.png)

The "+" on the left of the visualization will add steps before the events you've added in the query builder. This will allow you to see what paths your users took that led up to these events of interest.

![/Screen_Shot_2021-07-20_at_7.35.06_PM.png](/Screen_Shot_2021-07-20_at_7.35.06_PM.png)

To add steps in larger quantities, you can adjust the number of steps directly in the query builder section as well.

![/Screen_Shot_2022-07-11_at_3.19.59_PM.png](/Screen_Shot_2022-07-11_at_3.19.59_PM.png)

## Hide Events

You can choose to hide events from the flows report to simplify and clarify the results. This is useful if you have common events that add noise because they are not relevant to the workflow you are examining.

Click the **Hide Events** button at the top of the chart and check any events you want to hide from the query, then click **Apply**.

![/Screen_Shot_2021-07-20_at_5.45.22_PM.png](/Screen_Shot_2021-07-20_at_5.45.22_PM.png)

You can also choose to hide a specific event from the flow by right clicking on it in the Flows chart.

![/Screen_Shot_2021-07-20_at_5.45.58_PM.png](/Screen_Shot_2021-07-20_at_5.45.58_PM.png)

# Flows Breakdown

## Overview
Flows report is an exploratory report where the events that are returned in the flows are often unpredictable. For this reason, standard property breakdown is not used for this report, but there are other ways to segment your flows.

## Breakdown by Cohorts

Beside the **Filter** button, select the **Breakdown** button to select one or more cohorts from the drop-down list. You will be shown both users in and not in the cohort.

![/Screen_Shot_2021-07-20_at_5.42.21_PM.png](/Screen_Shot_2021-07-20_at_5.42.21_PM.png)

If you have selected multiple cohorts, the chart below will be broken down by those cohorts. Cohorts will appear in the chart in different colors, making it easy to follow the paths the cohorts took in your flows.

In the following example, the cohorts “Android Users” and “iPhone Users” are being compared. As shown in the Legend on the left of the chart, “iPhone Users” are indicated in purple, “Android Users” in orange.

![/Screen_Shot_2021-07-20_at_5.42.31_PM.png](/Screen_Shot_2021-07-20_at_5.42.31_PM.png)

To see the percentage breakdowns of these cohorts in more detail, click on a node to highlight the strongest path to that node. The box that pops up shows the percentage of each cohort that followed that path.

In the following example, of the users that reached this Exit Tutorial event, 22.2% of users are iPhone users, 77.8% of users are Android users.

![/Screen_Shot_2021-07-20_at_5.42.41_PM.png](/Screen_Shot_2021-07-20_at_5.42.41_PM.png)

## Breakdown by Conversion

If your flows have multiple anchor events, you can breakdown by Conversion as a computed property to segment your user event flows based on whether they converted or dropped off between the anchor events.

## Expand Event by Property

You can choose to expand the results of your report by a particular property to see how that property may impact user flows. You can select multiple properties. For instance, what if I wanted to understand how the specific Purchase Type changes the most common flow that leads to a Purchase event?

Click the **Expand** button, select an event, and then select a property under that event.

![/psAq6XYr2B.gif](/psAq6XYr2B.gif)

You can also expand on a specific event in the chart below by right clicking on an event and selecting **Expand by property**.

![/6.png](/6.png)

### Expanding custom events

If your report includes [custom events](/docs/features/custom-events/), you may expand custom events by event name to view the underlying events if required.

![/Screen_Shot_2021-07-30_at_1.21.26_PM.png](/Screen_Shot_2021-07-30_at_1.21.26_PM.png)

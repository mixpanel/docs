# Funnel Behavior

## Overview

A funnel is a sequence of events performed within a certain time period and is the basic building block of the Funnels report. Unlike standard metrics such as Events or Users, funnels is a behavioral measurement focused on calculating how users convert (or drop-off) from one event to another.

## Funnel Events

A funnel consists of multiple steps anchored by events. Each funnel requires at least 2 events; an entry event and a conversion event.

**Entry Event**
An entry event lives at the top of the funnel in the first step. Any users who track this event within your date range will be included in your enter your funnel and included in your report. 

Users who did not track the entry event will be excluded from the report even if they tracked other events defined in your funnel.

**Conversion Event**
A conversion event is any event that follows the entry event, defined after the first step of the funnel. A funnel with multiple steps will have multiple conversion events.

## Building a Funnel

### Define an Entry Event
- Start by adding an entry event.
- Visit Website

### Define a Conversion Event
- Add any event as a conversion event.
- Click Purchase

### Multistep Funnel
- Add additional conversion events
- Visit Website, Add Payment Information, Click Purchase to learn about dropoff

### Comparison Events

You can select multiple events at a particular step in a funnel, and Mixpanel will compute a segmented funnel that shows what percent of users reached each of these comparison events.

For example, you may be interested in whether showing one ad banner leads to more purchase than another ad banner. In this case, you can build a funnel using "Visit Website" at the first step, "Advertisement A" at the second step, and "Purchase" at the third step, then add "Advertisement B" as a comparison event in the second step to see whether their is a significant difference in conversion to "Purchase" between the two ad banners.

To do this, click on the "..." at the desired step and select "add event comparison".

![/xvjcq1dbb2_1_.png](/xvjcq1dbb2_1_.png)

### Order of Events
By default, funnels require the users to complete each of the funnel steps in the order laid out to be counted as a conversion from one step to another. It is possible to create flexible ordering by configuring your [Conversion Criteria](/docs/reports/funnels/funnels-conversion-criteria). Learn more about step ordering [here](/docs/reports/funnels/funnels-conversion-criteria#ordering).

## Saved Funnel Behaviors

You can define a funnel behavior and save and share it. Press "Save as New" button to save your funnel behavior definition. You can change the name and add a description.

![save funnel](/save-funnel-1.png)

You can also load existing funnel definitions by clicking the name of funnel.

![save funnel](/save-funnel-2.png)

See more about saved behaviors [here](/docs/features/saved-behaviors).

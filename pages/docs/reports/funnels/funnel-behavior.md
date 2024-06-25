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

### Any Order

In Any Order Funnels, users can complete unanchored funnel steps in any particular sequence and still convert. This type of funnel is most useful in situations where a user must complete all actions to be considered converted, but the exact order is not important.

A good example of this could be a job application flow, where a user must input multiple pieces of information (their name, email address, current job title, credentials, references, cover letter, resume, etc.) in order to complete the form and submit their application, but they can provide all this information in any order they'd like and still proceed towards converting.

To switch to **Any Order**, expand the "Advanced" menu in the Conversion Criteria and toggle on "Any Order".

![/Screen_Shot_2022-07-12_at_3.35.33_PM.png](/Screen_Shot_2022-07-12_at_3.35.33_PM.png)

When you switch to **Any Order,** you have the option to anchor specific steps in your funnel by clicking on the step number.

![/CleanShot_2021-12-15_at_11.03.46.gif](/CleanShot_2021-12-15_at_11.03.46.gif)

A step will either appear with a number beside it, indicating where it must fall in the funnel, or with an asterix (\*), indicating that it can be performed in any order before the next anchored step.

**Example**:

![/Untitled_Diagram.jpg](/Untitled_Diagram.jpg)

In the above example, Steps 1, 4, and 6 must occur as the 1st, 4th, and 6th steps the user performs.Any of the * steps can occur at any time within those boundaries.

## Saved Funnels Behavior
You can save your funnels as a saved behavior, which allows you to reuse the funnels definition in another Funnels report or visualize the funnel in an Insights report along with other metrics. learn more about [Saved Behaviors](docs/features/saved-behaviors).

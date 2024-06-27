# Retention Behavior

## Overview

The retention behavior is the basic building block of a Retention report. Unlike a standard metric such as Event or Users, retention is a behavioral measurement that evaluates whether a user who does an event returns to do another event.

## Define Retention Events

Retention is defined by two events; an **Entry Event** and a **Retention Event**.

**Entry Event**

This event serves as the entry point for your retention analysis. Any users who track this event within your report date range will be included in your retention analysis.

For example, you might use an event like " Ad Campaign" here if you want to evaluate the retention of your users who have seen a particular ad campaign in your product.

** Retention Event**

This event is used to measure your retention and is used to determine whether your users are returning after tracking your entry event.

For example, you may want to use an event like "Browse Catalog" to see if the ad campaign from your entry event is effective at keeping your users interested in shopping with your product.

## Saved Retention Behaviors

You can define a retention behavior and save and share it. Press "Save as New" button to save your retention behavior definition. You can change the name and add a description.

![save retention](/save-retention-1.png)

You can also load existing retention behavior definitions by clicking the name of the retention behavior.

![save retention](/save-retention-2.png)

See more about saved behaviors [here](/docs/features/saved-behaviors).

## Frequency Retention

Frequency is a type of retention that evaluates whether your users who do an event return to do the same event again. Learn more about Frequency retention [here](/docs/reports/retention/frequency/).

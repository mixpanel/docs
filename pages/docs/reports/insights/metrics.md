# Metrics

## Overview
The Insights Report supports 6 different metric types, which you can combine under a single report for your analysis.

## Metric Types

| Metric Type | Description |
| --- | --- |
| Event | A metric based off of a single event. The metric could measure the total number of occurences, unique users, or aggregates a property of this event. |
| Profile | A metric based off of the user or group profiles. You can measure the number of profiles, or an aggregate on properties of the profiles. |
| Formula | A metric that is a function of other metrics. You can select a saved formula, or create a new formula based on the existing metrics in the report. |
| Funnel | A metric based off a funnel behavior. You can select a saved funnel behavior or define a new funnel, then choose a measurement on that funnel to form a funnel metric. By default measures conversion rate on all steps of the funnel. |
| Retention | A metric based off a retention behavior. You can select a saved retention behavior or define a new retention, then choose a measurement to form a retention metric. By default, measures retention rate. |
| Cohort | A metric based off of a defined cohort. Measures the number of users who are part of that cohort. |

If choosing [Formula](/docs/reports/insights/metrics#formulas), Funnel, Retention or Cohort, you will be prompted first to select a saved definition. If you wish to start by defining your own behavior, press "Create" in the top right of the menu.

Learn more about [Saved Behaviors](/docs/features/saved-behaviors) and [Cohorts](/docs/users/cohorts).

### Event

Event metrics allow you to measure a single event. You can aggregate multiple events using a single event metric by using a custom event [custom events](/docs/features/custom-events).

### Profile

Profile metrics allow you to access profile data and visualize your users with filters and breakdowns based on their profile properties. When exploring Profiles, you are always analyzing all user profiles. Select the [Measurement](/docs/reports/insights#measurements) you want to use to calculate results by clicking on **Total** and selecting an option from the drop-down. You can calculate based on users or profile property value.

<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/dc5e909f2d7f427ca962e493e87894ad" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

### Formulas

Use Formulas to make calculations between multiple metrics.

Mixpanel supports the following operators:

- \+ : Add
- \- : Subtract
- \* : Multiply
- / : Divide
- () : Use parentheses to influence the order of operations

You can also use numbers as constants in a formula. Multiply a ratio by 100 to display as a percentage, for example. Divide a property value tracked in seconds by 3,600 to display the value in hours. You can rename a formula by selecting Rename in the overflow menu of the formula.

Click the **Metrics** button, then select Formula.. Each event in the query shows a letter next to it, which indicates its variable name. Use these letters in combination with the operators to calculate a more advanced query. For example, you can use the DAU, WAU, and MAU functions in Formulas to calculate the stickiness of your product:

![Formulas 1](/advanced-formulas-1.png)

To note, you cannot nest a formula metric when constructing another formula.

#### Save formulas for re-use

Use existing events to create calculated formulas, like Bounce Rate & % Active Users, that can be saved and reused by others within the project.

![saveformula.gif](/saveformula.gif)

Some nuances to note:
- Once you save a formula, A,B,C refer to what’s **within** the saved formula modal
- To edit a saved formula, expand the metric and edit inline, and then save
- When a saved metric is updated, it will update across all reports it’s being used in
- A saved formula can’t reference another formula

To access and re-use saved formulas, click on “+Formula”, and then see the list of saved formulas. You can also look at all the saved formulas in the Lexicon tab “Formulas”. Some callouts regarding permissions:
- All roles can create a saved formula, but only some roles can share them with the whole project for re-use
- You can only look at saved formulas created by you or shared with you

![reuseformula.gif](/reuseformula.gif)

### Funnel and Retention Metric

You can use a saved funnel or retention definition as a metric in your report. Learn more about [Funnels](docs/reports/funnels), [Retention](docs/reports/retention), and [Saved Behaviors](/docs/features/saved-behaviors).

## Cohorts

Cohort metrics allow you to measure the size of your cohort and how it changes over time. Learn more about [Cohorts](/docs/users/cohorts).
---
title: "Other Advanced Features"
slug: "other-advanced-features"
hidden: false
metadata:
  title: "Other Advanced Features"
  description: "Learn about Mixpanel advanced features."
---

# Query Builder Features

## Custom Event Creation

Click **Create Custom Event** from the bottom of the events drop-down to create a custom event. Learn more about building custom events [here](https://help.mixpanel.com/hc/en-us/articles/115004562246).

## Session Metric Analysis

![https://help.mixpanel.com/hc/article_attachments/7711554141204/Screen_Shot_2022-07-11_at_3.53.47_PM.png](https://help.mixpanel.com/hc/article_attachments/7711554141204/Screen_Shot_2022-07-11_at_3.53.47_PM.png)

Analyze session metrics by selecting "Session Start" or "Session End" from the events list. Learn more about using Sessions in Insights, Funnels and Flows [here](https://help.mixpanel.com/hc/en-us/articles/115004695223#sessions-in-insights).

## Inline Filtering

Filter this event by clicking the **inline action menu** and selecting **Add filter** from the drop-down. Choose an event property, user profile property, group profile property, or cohort to filter the event by.

![https://help.mixpanel.com/hc/article_attachments/7772246990228/mceclip2.png](https://help.mixpanel.com/hc/article_attachments/7772246990228/mceclip2.png)

You can select whether you would like your query to match any or all of the filters by clicking on **and/or** beside the filters.

![https://help.mixpanel.com/hc/article_attachments/7772185597972/mceclip1.png](https://help.mixpanel.com/hc/article_attachments/7772185597972/mceclip1.png)

## Duplicating Events

To duplicate any events or properties in your query, select the inline action menu and choose **Duplicate**. Delete any events or properties by clicking the **trash** icon.

![https://help.mixpanel.com/hc/article_attachments/7772247062292/mceclip3.png](https://help.mixpanel.com/hc/article_attachments/7772247062292/mceclip3.png)

## Advanced Date and Time Selectors

You can also choose how Mixpanel buckets the time range in Insights, Funnel Trends and Retention Trend reports (granularity may vary). To view a range in hours, you can select **Hour** as the view:

![https://help.mixpanel.com/hc/article_attachments/7711776890132/Screen_Shot_2022-07-11_at_4.01.49_PM.png](https://help.mixpanel.com/hc/article_attachments/7711776890132/Screen_Shot_2022-07-11_at_4.01.49_PM.png)

To zoom in, click on the graph and drag to highlight a specific window of time in your report. Click **Reset zoom** to return to the previous view.

![https://help.mixpanel.com/hc/article_attachments/7712351271572/zoom.gif](https://help.mixpanel.com/hc/article_attachments/7712351271572/zoom.gif)

## Advanced Filter & Breakdown Usage

To filter the results of your Insights query click the **Filter** button and select an event property, user profile property, group profile property, or cohort to filter the event or profile by.

To breakdown your results click the **Breakdown** button and select an event property, user profile property, group profile property, or cohort to filter the event by.

You can breakdown your results by the "Date" event property and breakdown by Hour, Day, Week, Month, Quarter, Year, Hour of Day, or Day of Week.

![https://help.mixpanel.com/hc/article_attachments/7712513119892/breakdown_by_date.gif](https://help.mixpanel.com/hc/article_attachments/7712513119892/breakdown_by_date.gif)

If you are analyzing any custom events, you can breakdown by the property "Event Name".

![https://help.mixpanel.com/hc/article_attachments/7712515487892/Screen_Shot_2022-07-11_at_4.36.07_PM.png](https://help.mixpanel.com/hc/article_attachments/7712515487892/Screen_Shot_2022-07-11_at_4.36.07_PM.png)

The drop-down menus only shows events/event properties that were ingested within the last 30 days. To select events/event properties that have not been ingested in the last 30 days, type the name of the event/event property in the Filter or Breakdown search bar. You must know the exact name of the event/event property you want to select because event names are case sensitive.

![https://help.mixpanel.com/hc/article_attachments/7712553274388/query_old_event.gif](https://help.mixpanel.com/hc/article_attachments/7712553274388/query_old_event.gif)

To create a temporary cohort for the current report, click

**Create Custom...**

in the dropdown menu and select "Cohort. A window will pop up where you can specify the restrictions of your cohort. Learn more about building a cohort

[here](https://help.mixpanel.com/hc/en-us/articles/115005701343)

.

![https://help.mixpanel.com/hc/article_attachments/7712721485460/create_cohort_from_report.gif](https://help.mixpanel.com/hc/article_attachments/7712721485460/create_cohort_from_report.gif)

# Impact Report

Mixpanel’s Impact report measures the effects of product or marketing launches on your key metrics. Impact calculates the user adoption of the launch, the impact of the launch on an important event, and the differences between users that adopt the launch and those that do not.

## Access Report

To access **Impact**, go to the Applications section in the top right of the top navigation, then select **Impact**.

[https://help.mixpanel.com/hc/article_attachments/11036831782164](https://help.mixpanel.com/hc/article_attachments/11036831782164)

## Build a Query

To build an Impact query, first select a launch event. This is the event that you are measuring as the cause of change.

![https://help.mixpanel.com/hc/article_attachments/360052965351/Untitled.png](https://help.mixpanel.com/hc/article_attachments/360052965351/Untitled.png)

Select the start date of this launch event. Add any additional filters to narrow the launch event parameters by clicking the **... dropdown** and selecting the **Add filter**.

![https://help.mixpanel.com/hc/article_attachments/360052965711/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/360052965711/mceclip0.png)

Select a metric event by clicking the **Add** button under **IMPACTED EVENTS**. You are measuring the impact of the launch event on this metric event. Add additional filters to narrow the impacted event parameters.

![https://help.mixpanel.com/hc/article_attachments/360052840692/Untitled2.png](https://help.mixpanel.com/hc/article_attachments/360052840692/Untitled2.png)

Breakdown impacteds event further by clicking the **… icon**, selecting **Add Aggregation**, then selecting an event property, such as “Amount”. This will add up the value of this property for all of the times this event happened in this time range. All aggregate properties are typecast to numeric properties in order to calculate the sum of that property. For example, aggregate the property “Amount” under the event “Process Payment” to analyze revenue.

![https://help.mixpanel.com/hc/article_attachments/360054659272/chrome-capture__5_.gif](https://help.mixpanel.com/hc/article_attachments/360054659272/chrome-capture__5_.gif)

To duplicate or delete any events or properties in your query, select the **… icon** and choose **Duplicate** or **Delete** from the drop-down list.

Under **USER DEFINITION s**elect whether you would like to count users who did **only the impacted event** or **any event**.

![https://help.mixpanel.com/hc/article_attachments/360052967131/mceclip2.png](https://help.mixpanel.com/hc/article_attachments/360052967131/mceclip2.png)

Apply a global filter to the entire report by clicking the **Filter** button under **FILTERS**. This filter will apply to both the launch event and all metric events.

![https://help.mixpanel.com/hc/article_attachments/360052840632/Untitled3.png](https://help.mixpanel.com/hc/article_attachments/360052840632/Untitled3.png)

Select the time range. The time range is a fixed period of time that determines the adopters and non-adopters of the launch event. The default is "15 days before and after", meaning that the 15 days preceding the fixed launch event date and the 15 days following the launch event will be included in the results. This will allow you to see the difference in the metric event before and after the launch event.

The chart will not necessarily change if you change the time range.

![https://help.mixpanel.com/hc/article_attachments/360052967331/mceclip3.png](https://help.mixpanel.com/hc/article_attachments/360052967331/mceclip3.png)

## Report Calculation Details

The report presents the results in plain English, in an Impact table that includes the Impact values, and in a chart that displays the impact of the launch over time.

## Adoption

Adopters are users that have done the launch event. Non-adopters are users that have not done the launch event. Both adopters and non-adopters must perform the metric event to be included in the report.

The Adoption Rate is the number of users that perform the launch event divided by the total user count:

%��������=�������((��������)(��������+�����������))

## Impact Chart

The Impact Chart shows how the rate of metric event occurrence changes over time.  The y-axis of the chart is the average number of the metric event count and the x-axis is time spanning 30 days.

Unlike other Mixpanel charts, the Impact Chart displays time in relative time, not calendar time.  The chart centers around the first day that the launch event is available, or “day zero”. The chart displays the 15 days before and after day zero.

![https://help.mixpanel.com/hc/article_attachments/360052841732/mceclip4.png](https://help.mixpanel.com/hc/article_attachments/360052841732/mceclip4.png)

Every user in the report can have a different day zero.  For users in the adopter group, day zero is the first day that they perform the launch event.  For users in the non-adopter group, day zero is the day the first adopter performed the launch event (which is most likely the launch day of the feature).

Each data point on the chart is calculated as follows:

���������������=(����������������)(��������������)

Each point on the line is the average number of times users in the group did the metric event on that relative day.

For example, if 10 adopters did the launch event for the first time five days ago, and they then did the metric event a total of 30 times today.  The +5 days point on the adopter line would read 3. The math would be as follows:

- 30 = The number of metric events performed by the adopters on day 5
- 10 = The number of users who did the launch event 5 days before the first day
- 3 = 30/10

You can see how frequently users in each group perform the metric event, both before and after the launch.

The chart also contains average lines for non-adopters and adopters both before and after day zero (or launch), and the unobserved counterfactual of the adopters (UCA), formerly called projected adopters, average after day zero.

![https://help.mixpanel.com/hc/article_attachments/360045157051/Screen_Shot_2019-12-09_at_2.05.03_PM_copy.png](https://help.mixpanel.com/hc/article_attachments/360045157051/Screen_Shot_2019-12-09_at_2.05.03_PM_copy.png)

## Impact Table

The Impact Table summarizes the results of the Impact chart.  It displays the average rate at which users in the adopter and non-adopter groups performed the metric event over the course of the 15 days before and after launch.

The table is broken down into three sections: “Pre-Launch”, “Post-Launch”, and “Impact”.

![https://help.mixpanel.com/hc/article_attachments/360045157071/Screen_Shot_2019-12-09_at_2.05.52_PM.png](https://help.mixpanel.com/hc/article_attachments/360045157071/Screen_Shot_2019-12-09_at_2.05.52_PM.png)

The Impact Table compares users that performed the launch event and those that did not. For both groups of users, Mixpanel calculates the average number of times per day that users performed the metric event before the launch, after the launch, and the difference between the two (the delta).

The average number of times that users performed the metric event before the launch is calculated by:

�����������������=�������((���������������������÷��������������)(��������))

The average rate is calculated before the first day of the launch event, after the launch event, and the report also displays the difference between those rates. These values are reported in the three sections of the table.

A relative delta is also present in each section of the table.

## Pre-Launch

The Pre-Launch section contains columns for adopters, non-adopters, and the relative delta between them. Adopters are users that perform the launch event after launch, and non-adopters are users that do not perform the launch event after the selected launch date.

The relative delta is calculated using the equation:

�������������=(��������������−�����������������)(�����������������)

## Post-Launch

The Post-Launch section contains columns for actual adopters, non-adopters, unobserved counterfactual of adopters, and the relative delta between them. Adopters are users that perform the launch event, and non-adopters are users that do not perform the launch event after the selected launch date.

The UCA value is the projected behavior of adopters if the launch event never happened. This calculation controls for any difference between the adopters and non-adopters that is not a result of the launch event. This value is calculated by the following, where NA is non-adopters, pre is pre-launch, and post is post-launch:

���=�������+(�������∗Δ�����������)

The relative delta is calculated using the equation:

�������������=(��������������−�����������������)(�����������������)

## Impact

The Impact section of the table contains the final calculations that indicate if and by how much the launch event affected your impacted metrics. These calculations are the delta, the relative delta, and the confidence score.

The delta is the difference between the UCA and adopters in the post-launch period. The relative delta divides that value by the UCA.

Confidence indicates the statistical significance of report calculations. [See below for details on the calculation of confidence](https://help.mixpanel.com/hc/en-us/articles/360034129112#confidence-calculation).

## Interpret the Results

In general, when the overall delta is positive, and the confidence score is 95% or more, it indicates a successful launch.  The most successful launches will see the rate at which adopters perform the metric event increase post-launch, while the same rate for the non-adopters remains relatively constant.

In the Impact Chart, look at the average gap in usage between the adopters and non-adopters.  Typically, it is preferable for the increase in the gap to be mostly driven by an increase in the rate at which adopters perform the metric event, rather than a decrease in the rate at which non-adopters perform it.

## Confidence Calculation

Impact includes confidence to indicate the statistical significance of report calculations. Interpret the confidence as the probability that the final delta is primarily caused by the launch event, as opposed to existing by chance.

The confidence is calculated as a confidence interval using a cumulative distribution function while assuming a normal distribution.

The confidence variables are as follow:

- **X** = The number of events per day performed by adopters in the pre-launch period.
- **Y** = The number of events per day performed by adopters in the post-launch period.
- **A** = The number of events per day performed by non-adopters in their pre-launch period.
- **B** = The number of events per day performed by non-adopters in their post-launch period.
- **Y - X** = The difference in number of events per day performed by adopters between post-launch and pre-launch periods.
- **B - A** = The difference in number of events per day performed by non-adopters between the post-launch and pre-launch periods.
- The mean of **Y - X** over time is denoted by:

��−�

- The mean of of **B - A** over time is denoted by:

��−�

- The standard deviation of **Y - X** over time is denoted by:

��−�

- The standard deviation of **B - A** over time is denoted by:

��−�

With the variables assigned, the calculations for confidence are as follow:

������=��−�−��−�

������=��−�2��−�−��−�2��−�

������=|������������|

������=1−���(������)

����������=1−������

## Causal Impact

Causal impact uses propensity score methods (a class of causal inference techniques) to refine Impact report results by controlling for self-selection bias.  Self-selection bias refers to the tendency of active users to be likely to use your new feature and to perform the impacted metrics, independent of the launch.

Propensity score methods control for self-selection bias by simulating what would occur in a hypothetical, randomized A/B test.

To learn more about Causal Impact in detail, read this [Mixpanel Whitepaper](https://mixpanel.box.com/v/causal-inference-whitepaper).

Click **View Causal Impact** to use the propensity matching model.

![https://help.mixpanel.com/hc/article_attachments/360047073931/Screen_Shot_2020-01-10_at_11.19.41_AM.png](https://help.mixpanel.com/hc/article_attachments/360047073931/Screen_Shot_2020-01-10_at_11.19.41_AM.png)

Please note that Causal Impact can take up to a few minutes to calculate results.

## Propensity Score Stratification

Propensity score stratification addresses self-selection bias by comparing adopters and non-adopters who are equally as likely to perform the launch event.

Users are broken into 10 subclasses after the propensity matching model runs. Each subclass contains adopters and non-adopters that have a similar likelihood of performing the launch event.  Mixpanel determines the rate at which the adopters and non-adopters performed the impacted metric, and calculates the difference for each subgroup.

Lastly, we average those values across all 10 subclasses to produce the Average Treatment Effect, or ATE.  The ATE indicates, on average across all users, how many more or less times per day the newly launched feature led to users to performing the impacted metric.

## Causal Impact Chart

The Causal Impact chart plots the ATE on each Impacted Metric.  The dark line shows the ATE, and the surrounding box shows the 95% confidence interval bounds of the ATE.

When the confidence interval does not include 0, it indicates that the positive or negative effect of the launch event is statistically significant.

## Causal Impact Table

The Causal Impact Table provides additional detail on the treatment effects on the impacted metrics in each subclass.

For each impacted metric, the table displays the ATE, the ATT (the average treatment effect on the treated), the 95% confidence interval (CI) bounds for those, and the number of adopters and non-adopters in the calculation.

Click the caret to expand the impacted metric row into the 10 subclasses considered.  For each subclass, Mixpanel displays the number of matched adopters in the subclass, number of matched non-adopters in the subclass, and the [rates at which each performed the impacted metric](https://help.mixpanel.com/hc/en-us/articles/360034129112#report-calculation-details).  The Delta column shows the difference between those rates.

Note that these values can differ from those reported in the Adoption and Impact Trends charts because Causal Impact only considers users that can be found to have similar propensity to perform the launch event to other users.

## Interpret the Causal Impact Results

Mixpanel's causal model is confident your new feature successfully changed the rate at which users perform the impacted metric if the ATE on any impacted metric is positive and the 95% confidence interval does not contain zero. This holds true as long as there are no confounding factors outside of your event data.

# Experiments Report

The Experiments report analyzes how A/B test variants impact your metrics.  Experiments does this by calculating the difference between variant groups and the effects of the variants on selected events.

Experiments requires an A/B test, its variant, and a dashboard that contains the metrics you are measuring. An experiment query calculates the variants’ effects on the dashboard metrics by calculating the delta and the lift between the two variants.

![https://help.mixpanel.com/hc/article_attachments/7447521623444/Screen_Shot_2022-06-30_at_2.44.36_PM.png](https://help.mixpanel.com/hc/article_attachments/7447521623444/Screen_Shot_2022-06-30_at_2.44.36_PM.png)

## Access the Report

To access Experiments, click on **Applications** in the top right navigation, then select **Experiments**.

## Build a Query

To use Experiments you must have a dashboard, and you can either use an existing experiment or you must build one in the query builder.

## Select an Experiment

**Custom Experiment** - This option allows you to define the control and variant groups of the experiment. These groups can be defined by cohort, user profile property, or event property filters.

**Tracked Experiments** - This option is available if you have [experiments in your implementation](https://help.mixpanel.com/hc/en-us/articles/360038439952#add-experiments-to-an-implementation). Mixpanel automatically detects any experiments that began in the last 30 days, and the report detects and displays them in the dropdown.

## Choose a Control Group

Select a group of users that are not exposed to the variant as your control group. For example, in onboarding flow testing, users exposed to the original, not new, onboarding flow should be the control.

In a Custom Experiment, the control group can be a cohort or any other users filtered by events and properties.

In Messages or Mobile A/B test experiments, you can choose the control group from the list of variants created as part of the Message or Mobile A/B Test.

It is important to ensure that this group is a true control. Introducing two new variants may abstract the report results.

## Select a Variant Group

Select the group of users exposed to the new experience as your variant group. For example, in onboarding flow testing, users exposed to the new onboarding flow should be the variant.

In a Custom Experiment, the variant group can be a cohort of any other users filtered by events and properties.

In Messages or Mobile A/B test experiments, you’ll be able to choose the variant group from the list of variants you created as part of the Message or Mobile A/B Test.

## Select a Date Range

[Select the date range](https://help.mixpanel.com/hc/en-us/articles/360029393131) of the experiment. In most cases you should choose the date your experiment began as the start date.

All events tracked by users within the date range will be included in the Experiment report, even if those events took place before the experiment started.

## Breakdown metrics by properties or cohorts

You can choose to segment all the metrics right from the Experiment report by selecting "Breakdown" -> "Select a property", and then selecting what you want to breakdown the metrics by.

Please note: Even if a metric is already segmented, this breakdown will override the initial breakdown and show a segmented view on all the metrics by the selected property/cohort. Clicking into a report from the Experiments report will carry forward the segmentation selected into the report.

Here's a [quick overview](https://www.loom.com/share/85469f45f05049b9a728898954cb636b) of the recent change that has made this possible:

## Supported Metrics

Experiments will run calculations on the following supported metrics:

- Insights - line charts with “Total” count, including charts with breakdowns.
- Insights - line charts with “Unique” count, including charts with breakdowns.
- Insights - line chart with "Sum of property values", including charts with breakdowns.
- Funnels - funnels with "Unique" count, including charts with breakdowns and any number of steps.

## Report Calculation Details

The following section describes the equations used in the Experiments report.

### Control and Variant Group Rate

The group rate is calculated for both control and variant groups. It is calculated differently depending on the selected metric type.

If calculating using totals in Insights, then the group rate is calculated as:

���������=(#��������)(#�������)(����)

If calculating using uniques in Insights, then the group rate is calculated as:

���������=(#��������ℎ���������������������)(#��������������)

This value is  a percentage, because the maximum possible value is 1.  We therefor display the percentage of users in the control group who performed the metric event.

If calculating using funnels, then the rate is the [overall conversion rate of the funnel](https://help.mixpanel.com/hc/en-us/articles/360025344831) for users in the group.

### Lift and Lift Trend

Lift is the percentage difference between the control group and variant group rates. Lift is calculated as (variant rate - control rate) / control rate.

����=(����������������−����������������)(����������������)

You can also switch between lift and the delta, which is the absolute difference in rates, variant rate minus control rate.

### Confidence

Confidence is the probability that the lift or delta between your control and variant groups is significant.

For conversions we calculate a standard confidence score for binomial outcomes, and for event counts we calculate a standard confidence score for poisson outcomes.

The trend line in the column displays how confidence has changed over the selected date range.

## Interpret the Results

The Experiments report locates significant differences between the Control and Variant groups.   Metric rows in the table are highlighted when any difference is calculated with 95% or greater confidence.

- Positive differences, where the variant rate is higher than the control rate, are highlighted green.
- Negative differences, where the variant rate is lower than the control rate, are highlighted red.
- Statistically insignificant results remain gray.

![https://help.mixpanel.com/hc/article_attachments/360047213472/Screen_Shot_2020-01-14_at_5.38.54_PM.png](https://help.mixpanel.com/hc/article_attachments/360047213472/Screen_Shot_2020-01-14_at_5.38.54_PM.png)

## Add Experiments to an Implementation

Mixpanel will automatically populate the Experiment, Control, and Variant dropdowns within the report if sent in the proper format.

Mixpanel scans for experiments that began in the date range you’ve selected for the report.  If any are found, then they will appear under the “Tracked Experiments” sub-header. To do this you must send data in the following format:

**Event Name:** “$experiment_started”

**Event Properties:**

- “Experiment name” - the name of the experiment to which the user has been exposed
- “Variant name” - the name of the variant into which the user was bucketed, for that experiment

An example track call would appear like this:

`mixpanel.track('$experiment_started', {'Experiment name': 'Test', 'Variant name': 'v1'})`

## Advanced - Confidence Score

Confidence scores come from the hypothesis testing framework in the field of statistics.  In hypothesis testing, you first choose a null hypothesis. In Mixpanel, the null hypothesis is that two groups of users behave the same on average for a given metric. The groups of users might be variant and control groups in an A/B test, or they might just be two different cohorts of users. The alternative hypothesis is that the two groups of users behave differently for the metric.

When Mixpanel compares a metric for two cohorts of users, we calculate the probability that we would observe a metric difference equal to or greater than the difference between the two cohorts. That probability is called a p-value. Generally speaking, the smaller the p-value, the more likely it is that the null hypothesis is false, and the alternative hypothesis is true.

The confidence score is 1-p-value, expressed as a percentage. So the higher the confidence score, the more likely it is that the alternative hypothesis is true (meaning that the two cohorts really do behave differently for the metric in question). We follow the traditional threshold of 95% for the confidence score, so we highlight results above 95% confidence in green for positive differences and in red for negative differences.

### Confidence Score Calculation

For event counts, we assume under the null hypothesis that each user cohort has a total event count that follows a Poisson distribution, where the parameter θ = cohort size * λ, and where λ is the same for both cohorts. For conversion rates, we assume under the null hypothesis that each user is a Bernoulli trial with the same parameter p. For both event counts and conversion rates, Mixpanel calculates the z-score, and the confidence score in the standard way. See this [article](http://pages.stat.wisc.edu/~wardrop/courses/371chapter9b.pdf) for more information about the formulas Mixpanel uses for z-score calculations, and Poisson and binomial distributions.

### Interpreting a Confidence Score

Generally speaking, higher confidence results mean that it is more likely that two cohorts of users differ significantly on your chosen metric. You can use the confidence score as a metric to quickly interpret large numbers of results. The higher the number of metrics you are analyzing, the higher percentage of those results that may be false positives.

If you are using our color-coded thresholds of 95%, there is a 5% chance that any individual result is a false positive. So if you are looking at 20 metrics at once, it is more likely that a larger number of those metrics could be false positives. If you want more precision in decision making, we recommend that you calculate your sample size prior to running an A/B test, and then only use the results you see in the Experimentation Report once you achieve that sample size. Higher confidence results are less likely to be false positives.

# Signal Report

Signal measures the association between a correlation event and a goal event and quantifies the correlation between the two. This facilitates a deeper understanding of the behaviors that drive customer conversions, and can help guide product decisions.

Note: There are now more features available in Signal that are not highlighted in the video below. Refer [here](https://help.mixpanel.com/hc/en-us/articles/115004567503-Signal-Report#build-a-query-in-signal) to get current information on how to build Signal queries.

![https://embed-ssl.wistia.com/deliveries/e16fc49b56e773a413011bb57142aa9701e481b6.webp?image_crop_resized=960x540](https://embed-ssl.wistia.com/deliveries/e16fc49b56e773a413011bb57142aa9701e481b6.webp?image_crop_resized=960x540)

## Signal Use Case

Using an a music sharing application as an example can highlight the value of quantifying correlations between events.

The music sharing app may want to understand the correlation between top events and users who purchase a song on the app. It is important to understand what the optimal actions that users take before purchasing a song are.

Building this query in Signal would involve selecting the target users, and how the "Song Purchased" goal event is correlated with the top events.

![https://help.mixpanel.com/hc/article_attachments/360054782491/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/360054782491/mceclip0.png)

Values are returned after running the correlation. “Song Played” could have a strong positive correlation with purchasing a song. Most of the users who played a song later purchased a song.

![https://help.mixpanel.com/hc/article_attachments/360054664292/Screen_Shot_2018-07-13_at_9.19.24_AM.png](https://help.mixpanel.com/hc/article_attachments/360054664292/Screen_Shot_2018-07-13_at_9.19.24_AM.png)

This information can be used in future product decisions. By knowing that those who play songs are more likely to purchase songs, it is possible to build tools to encourage song plays. This could lead to a dramatic increase in the amount of users purchasing songs.

## Build a Query in Signal

By default, Mixpanel will build a query to show how your [top 50 events](https://help.mixpanel.com/hc/en-us/articles/360001360643-Top-Events-in-Reports) correlate with 2nd week retention in the last quarter for all users. This translates to, “How do the top events correlate with two week retention in the last quarter for all users?"

![https://help.mixpanel.com/hc/article_attachments/7777682199956/Screen_Shot_2022-07-13_at_10.13.57_PM.png](https://help.mixpanel.com/hc/article_attachments/7777682199956/Screen_Shot_2022-07-13_at_10.13.57_PM.png)

To build a new query with Signal, enter the Signal report in the desired Mixpanel project.

Signal queries require a minimum of 60 days worth of data. Queries with any less data history will return a calculation error.Signal currently supports filtering only by event properties. Custom events with profile property filters will now be shown in the event dropdown.

1. Determine and specify the target users. “All users” is the default.

![https://help.mixpanel.com/hc/article_attachments/7777681516180/Screen_Shot_2022-07-13_at_10.13.57_PM.png](https://help.mixpanel.com/hc/article_attachments/7777681516180/Screen_Shot_2022-07-13_at_10.13.57_PM.png)

2. Select any event performed by the target user by clicking the **+** sign.

![https://help.mixpanel.com/hc/article_attachments/7777750405268/Screen_Shot_2022-07-13_at_10.13.57_PM_copy.png](https://help.mixpanel.com/hc/article_attachments/7777750405268/Screen_Shot_2022-07-13_at_10.13.57_PM_copy.png)

3. Further filter by property by clicking **+ Filter** and selecting any properties as well as the frequency of occurrence.

![https://help.mixpanel.com/hc/article_attachments/7777752285204/Screen_Shot_2022-07-13_at_10.19.21_PM.png](https://help.mixpanel.com/hc/article_attachments/7777752285204/Screen_Shot_2022-07-13_at_10.19.21_PM.png)

4. Determine and select the Goal Event and its properties. The goal event can be a specific event with a frequency (users did Goal Event at least x number of times) or one of the default Signal retention events calculated by Mixpanel.

![https://help.mixpanel.com/hc/article_attachments/7777768697236/Screen_Shot_2022-07-13_at_10.20.49_PM.png](https://help.mixpanel.com/hc/article_attachments/7777768697236/Screen_Shot_2022-07-13_at_10.20.49_PM.png)

The default retention events available in Signal include:

- 2nd week retention: Users doing a specific action or set of actions in your project and then returning to do anything within two weeks.
- 3rd week retention: Users doing a specific action or set of actions in your project and then returning to do anything within three weeks.
- 4th week retention: Users doing a specific action or set of actions in your project and then returning to do anything within four weeks.
- 2nd month retention: Users doing a specific action or set of actions in your project and then returning to do anything within two months.

5. Determine and select the Correlation Event and its properties. It is possible to add up to ten different correlation events by clicking the **+** button at the bottom of the query builder.

- The correlation event can be [broken down by property](https://help.mixpanel.com/hc/en-us/articles/115004582086#breakdown-a-query). To do this, select **+ Breakdown** and select the property to break the data down by.
- The correlation event can be [filtered by property](https://help.mixpanel.com/hc/en-us/articles/115004582086#filter-a-query). To do this, select **+ Filter** and select the property and property value you want to filter by.

![https://help.mixpanel.com/hc/article_attachments/7777773378580/Screen_Shot_2022-07-13_at_10.22.08_PM.png](https://help.mixpanel.com/hc/article_attachments/7777773378580/Screen_Shot_2022-07-13_at_10.22.08_PM.png)

6. Select the time frame for the query and the users who are to be evaluated. It’s important to select a long enough time frame that allows users to complete both the correlation event(s) and the goal event.

![https://help.mixpanel.com/hc/article_attachments/7777794074004/Screen_Shot_2022-07-13_at_10.24.59_PM.png](https://help.mixpanel.com/hc/article_attachments/7777794074004/Screen_Shot_2022-07-13_at_10.24.59_PM.png)

6. Click **Correlate**.

![https://help.mixpanel.com/hc/article_attachments/7777774565268/Screen_Shot_2022-07-13_at_10.22.08_PM.png](https://help.mixpanel.com/hc/article_attachments/7777774565268/Screen_Shot_2022-07-13_at_10.22.08_PM.png)

## Difference Between New Users and All Users

New users are users who have completed their first event in the selected time frame.

All users will look at all users in your Mixpanel project who have completed the event in the selected time frame.

## Breakdown a Query

It is possible to breakdown the correlation event of a Signal query by its properties. Breaking down the query will return results for all of the values tied to the breakdown property.

There are two different requirements that must be met in order to break down a Signal query.

- The target users must be “All users” and not “New users”.
- A query can only be broken down if one correlation event is selected.

![https://help.mixpanel.com/hc/article_attachments/7777796323348/Breakdown1.gif](https://help.mixpanel.com/hc/article_attachments/7777796323348/Breakdown1.gif)

## Filter a Query

It is possible to filter the correlation event of a signal query by a property value. Filtering the query will return results for only the property value that the query is filtered by.

![https://help.mixpanel.com/hc/article_attachments/7777796228500/FilterHigh.gif](https://help.mixpanel.com/hc/article_attachments/7777796228500/FilterHigh.gif)

## Use a Cohort as the Target Users

It is possible to select [a cohort](https://help.mixpanel.com/hc/en-us/articles/115005708186-Cohorts-Overview-) as the target users in a Signal query. This runs Signal calculations, such as correlation and opportunity, with the queried population being all users **currently** in the cohort.

To build a Signal query with a cohort as the target users, enter the Signal report, select the **users** dropdown, and select a cohort from the list. [Learn how to create a cohort.](https://help.mixpanel.com/hc/en-us/articles/115005701343-Create-Cohorts)

![https://help.mixpanel.com/hc/article_attachments/7777798950292/Signalsection1.gif](https://help.mixpanel.com/hc/article_attachments/7777798950292/Signalsection1.gif)

## Use a Cohort as The Goal Event

It is possible to select [a cohort](https://help.mixpanel.com/hc/en-us/articles/115005708186-Cohorts-Overview-) as the goal condition of a Signal query. This runs Signal calculations, such as correlation and opportunity, with the the goal being target users either existing in or not existing in the selected cohort.

To build a Signal query with a cohort as the goal event, select the **Goal Event** dropdown, select the **Cohorts** tab, and select a cohort. [Learn how to create a cohort.](https://help.mixpanel.com/hc/en-us/articles/115005701343-Create-Cohorts)

![https://help.mixpanel.com/hc/article_attachments/7777813994388/Signalsection2.gif](https://help.mixpanel.com/hc/article_attachments/7777813994388/Signalsection2.gif)

**[Cohorts are always calculated at query time.](https://help.mixpanel.com/hc/en-us/articles/115005708186-Cohorts-Overview-#cohorts-characteristics)**

This means that if a “from date” and “to date” are selected so that the query is analyzing a time period in the past, the cohort will NOT be the cohort during that historical time period. The cohort will be current, meaning the users analyzed will be the users **currently** in the cohort.

## Interpreting Results

## Summary View

Each correlation will be represented by one card in the summary view results. The list-view will display the optimal action, correlation with the goal event, and key findings about the event. Results can be sorted by correlation strength or by Mixpanel opportunity score.

![https://help.mixpanel.com/hc/article_attachments/7777816143508/Screen_Shot_2022-07-13_at_10.32.35_PM.png](https://help.mixpanel.com/hc/article_attachments/7777816143508/Screen_Shot_2022-07-13_at_10.32.35_PM.png)

## Scores

By default, the results will be sorted by Opportunity. “Opportunity” is Mixpanel’s proprietary calculation of how important a given correlation might be. The correlation strength is calculated using the phi coefficient. [Reference here](https://help.mixpanel.com/hc/en-us/articles/115004567503-Signal-Report#signal-machine-learning-model) for more detail on how Opportunity and correlation strength is calculated.

## Key Findings

The key findings presented are rarity analysis results and conversion measurements. Rarity defines how common or uncommon it is for users to complete an individual event. The conversion measurements qualifies how likely a given conversion is to be helpful.

**Rarity Analysis** can be broken down into:

- Rare in user group.
- Never performed in user group.
- Uncommon in user group.
- Common in user group.
- Majority of user group performed.

**Conversion Measures** can be broken down into:

- No users converted to goal.
- Unlikely to be useful.
- Associated almost perfectly with not converting.
- Associated almost perfectly with converting.

## Detailed view

To access the detailed view, click on a card in the summary view.

![https://help.mixpanel.com/hc/article_attachments/7777852474516/Screen_Shot_2022-07-13_at_10.33.37_PM.png](https://help.mixpanel.com/hc/article_attachments/7777852474516/Screen_Shot_2022-07-13_at_10.33.37_PM.png)

The detailed view provides the correlation calculations for each event evaluated. This view uses a heat map to show the strength of the correlation with the goal event.

The x-axis represents the velocity, or the number of days it took users to complete the event (up to 15 days) and the y-axis shows the frequency of the event, or the number of times the event was done, up to ten times.

![https://help.mixpanel.com/hc/article_attachments/7777852993556/DetailedView.png](https://help.mixpanel.com/hc/article_attachments/7777852993556/DetailedView.png)

## Optimal Action

The optimal action will be highlighted in green on the heat map.

The optimal action tells you how many times and in how many days your customers should do the event in order to achieve your optimal correlation. Frequency labels are listed below the action and provide precise information, based on the correlation, about when your users should complete the event. For example, if you are a music streaming app and wanted to see how a “Play Song” event correlates with two week retention, you might see something like, “Play song once within ten days” as an optimal action.

## Supporting Statistics

For each combination Mixpanel will provide supporting statistics for further analysis:

- **Precision**: Percent of users who convert to your goal among those who did this event at least x times within y days.
- **False omission rate**: Percent of users who convert to your goal among those who did this event fewer than x times within y days.
- **Recall**: Percent of converted users who did this event at least x times within y days.
- **Fall-out**: Percent of unconverted users who did this event at least x times within y days.
- **Correlation**: Association between performing this event at least x times in y days and converting to your goal.

![https://help.mixpanel.com/hc/article_attachments/7777869737492/Screen_Shot_2022-07-13_at_10.35.27_PM.png](https://help.mixpanel.com/hc/article_attachments/7777869737492/Screen_Shot_2022-07-13_at_10.35.27_PM.png)

To see the calculations of the optimal correlation data, hover of the ƒx in the upper right-hand corner of the chart at the bottom of the heat map.

![https://help.mixpanel.com/hc/article_attachments/7777869737748/Screen_Shot_2022-07-13_at_10.35.35_PM.png](https://help.mixpanel.com/hc/article_attachments/7777869737748/Screen_Shot_2022-07-13_at_10.35.35_PM.png)

## Signal Machine Learning Model

Signal calculates correlation using a well-known statistical algorithm called the phi coefficient. In addition to correlation, Mixpanel calculates what is called an opportunity score, and also presents a list of key findings.

## Correlation

The phi coefficient is a single number between -1 and 1 and it indicates how closely an event moves with your goal event. 1 means that 100% of all users that did the goal event also did the correlation event. -1 means that 0% of users that did the goal event also did the correlation event.

## Opportunity Score

“Opportunity” is Mixpanel’s proprietary calculation of how important a given correlation might be. Opportunity helps pare down results by eliminating false positives and highlighting weak correlations that may be actionable. Based on this assessment, which determines how much an event impacts conversion on your goal, Mixpanel will tell you if there is an opening to make a change in your product or not.

Once we have the correlation, the results on the summary page will display the optimal action, correlation with the goal event, and our key findings about that optimal action.

The optimal action tells you how many times and in how many days your customers should do the event in order to achieve your optimal correlation. Frequency labels are listed below the action and provide precise information, based on the correlation, about when your users should complete the event. For example, if you are a music streaming app and wanted to see how a “Play Song” event correlates with two week retention, you might see something like, “Play song once within ten days” as an optimal action.

**Frequency Labels** -- \*these will be supplemented with temporal labels, i.e. At least 4 times in 10 days.\*

- Many times
- Just once
- At least x times
- Always avoid
- As few times as possible
- No strong correlations found
- Is complex

The correlation with the goal event presents to you the optimal correlation for the event and tells you whether this indicates a strong or weak association with your goal. We calculate the association using a well-known statistical measure called the phi coefficient. The phi coefficient is a single number between -1 and 1 that indicates how closely an event moves with your goal event.

Finally, we will display the key findings. The key findings contain the rarity analyses and the impact to conversion. The rarity analyses define how common or uncommon is it for users in your user group to complete your event and the impact to conversion explains how the event impacts conversion to your Goal event (i.e. retention). These help you interpret the correlations. A certain event may have strong correlation to a goal event but may not have been completed by many users in your group and thus is unlikely to be useful. Below we have listed the different messages you can see as a part of the rarity analysis and the impact to conversion.

**Rarity Analyses**

- Rare in user group
- Never performed in user group
- Uncommon in user group
- Common in user group
- Majority of user group performed

**Conversion Measures**

No users converted to goal.

- Example: None of the users analyzed converted to the goal in question.

Unlikely to be useful.

- Example: There may be no correlation (positive or negative) between the two events.

Associated almost perfectly with not converting. Something might be off here.

- Example: Users who trigger an “uninstall” event are not going to complete your Goal event.

Associated almost perfectly with . Too good to be true?

- Example: Users who trigger a purchase event will always trigger an add to cart event. Add to cart and purchase will always have high correlation.

## Key Findings

Signal also presents two key findings, rarity analysis results and conversion measurements. Rarity defines how common or uncommon it is for users to complete an individual event. The conversion measurements qualifies how likely a given conversion is to be helpful. For example, if all users are converting because the application forces this by design, then the conversion measurement will flag this as "unlikely to be useful".

## Signal CSV Download Glossary

Below are explanations for the summary statistics that you will find in the CSV download of your Signal correlation. To download the results to a CSV, click the **Download CSV** icon in the upper right hand corner of the Summary Results view or the Detailed Results view after you have run your correlation.

![https://help.mixpanel.com/hc/article_attachments/7777872257684/Screen_Shot_2022-07-13_at_10.37.09_PM.png](https://help.mixpanel.com/hc/article_attachments/7777872257684/Screen_Shot_2022-07-13_at_10.37.09_PM.png)

- **Frequency:** Number of times, up to 10, a user should complete the event for the correlation.
- **Intervals:** Number of days, up to 15, when a user should complete the event for the correlation.
- **True positive:** Number of positive correlations that are correctly identified.
- **True negative:** Number of negative correlations that are correctly identified.
- **False positive:** Number of positive correlations that are incorrectly identified.
- **False negative:** Number of negative correlations that are incorrectly identified.
- **Correlation:** The association between your event to your goal event.
- **Precision:** Percent of users who convert to your goal among those who did this event at least x times within y days
- **Fall-out:** Percent of unconverted users who did this event at least x times within y days.
- **Recall:** Percent of converted users who did this event at least x times within y days.
- **False Omission Rate:** Percent of users who convert to your goal among those who did this event fewer than x times within y days.
- **Phi max:** Single number between -1 and 1 that indicates how closely an event moves with your goal event. 1 means that 100% of all users that did your goal event also did the event you are evaluating. -1 means the opposite: 0% of users that did you goal event also did the event you are evaluating.
- **Mixpanel Opportunity Score:** Mixpanel’s proprietary calculation of how important a given correlation might be.

# Slack Integration

Connect Mixpanel to your Slack workspace to help share reports with your colleagues faster. You can (1) set up an alert to send a message to a Slack channel, (2) set up a Board Digest to send a message to a Slack channel, or (3) share previews of any Mixpanel report in Slack.

To send an alert to a Slack Channel, see [Custom Alerts](https://help.mixpanel.com/hc/en-us/articles/360028142571)To send a digest to a Slack Channel, see [Advanced Board Functionality - Digests](https://help.mixpanel.com/hc/en-us/articles/4409850288276#board-digests)

The Mixpanel application for Slack will also automatically unfurl a preview of any Mixpanel link, including chart images for certain reports, making it easy for anyone in your Slack workspace to learn from your Mixpanel analyses.

## Enable the Integration

To enable the integration, log in to both Mixpanel and Slack, then click "Add to Slack" below:

![https://platform.slack-edge.com/img/add_to_slack.png](https://platform.slack-edge.com/img/add_to_slack.png)

Then, click "Allow:"

![https://help.mixpanel.com/hc/article_attachments/360059603032/Screen_Shot_2020-06-15_at_10.41.00_PM.png](https://help.mixpanel.com/hc/article_attachments/360059603032/Screen_Shot_2020-06-15_at_10.41.00_PM.png)

After clicking allow, you'll return to Mixpanel, where you'll see a success banner:

![https://help.mixpanel.com/hc/article_attachments/360059763951/Screen_Shot_2020-06-15_at_10.42.06_PM.png](https://help.mixpanel.com/hc/article_attachments/360059763951/Screen_Shot_2020-06-15_at_10.42.06_PM.png)

At this point, Mixpanel is a part of your Slack workspace, and any Mixpanel links you send in Slack will unfurl with metadata, and if applicable a chart preview.

Once at least one member of your Mixpanel organization has set up the Mixpanel Integration for Slack for their account, any other members of the Slack workspace will see a prompt the next time they paste a Mixpanel link. The prompt will ask them to connect their own Mixpanel account to Slack as well. If they choose to do so, Slack will guide them through the authentication flow. Once they have successfully connected Mixpanel to Slack, any further links they paste in Slack will unfurl.

## Using the Integration

Once you've set up the integration, Mixpanel links pasted in Slack will unfurl. Most links will provide some basic link metadata, and links to Insights, Flows, Funnels, or Retention reports will also include a chart preview, for example:

![https://help.mixpanel.com/hc/article_attachments/360060242931/slack_app_demo.png](https://help.mixpanel.com/hc/article_attachments/360060242931/slack_app_demo.png)

## Permissions

Mixpanel does not restrict who can enable the Mixpanel integration for Slack. However, your Slack workspace may limit who can perform the connection.

After Mixpanel is connected to Slack, any Slack user who posts a Mixpanel link will be prompted to connect their own account, in order to unfurl report previews. By performing this integration at the user level, it ensures that only reports the user has access to will unfurl in Slack.

## Privacy

The Mixpanel app for Slack adheres to Mixpanel's overall privacy policy, available in full here: [https://mixpanel.com/legal/privacy-policy/](https://mixpanel.com/legal/privacy-policy/)

# Custom Events

Create custom combinations of events by making a custom event within Mixpanel.

Custom events allow you to define a group of users based on existing events and properties, and then integrate that group into Mixpanel reports.

Once a custom event is created it is available to all users in the project and can be accessed across all reports.

### **Limits by Plan Type**

Free: 1 Custom Event

Startup: 15 Custom Events

Enterprise: Unlimited Custom Events

MTU Growth: Unlimited Custom Events

Visit our [pricing page](https://mixpanel.com/pricing/) to learn more about differences between plan types

## Overview

A custom event is a virtual event that was created from one or more events, optionally filtered down by a particular set of properties, and given a name.Useful to:

- Merge two events into a single event ("User Signup" + "Account Created" -> "Signup")
- Create an event based on a filter on another event ("Purchase where Country = "US" -> "US Purchases")

Imagine your business has two ways for users to track ads: they can convert from ad, or simply view it. You represent each of these actions with Mixpanel events named "Ad Conversion" and "Ad Impression," respectively. Later, you decide that you want to setup a funnel to track how many users are seeing any ads at all. So what do you do?

You can create a custom event containing "Ad Conversion" and "Ad Impression," and then save it as "Watch Ads.” Now you can use the "Watch Ads" custom event as a funnel step just like a regular event. Then, any time a user performs an "Ad Conversion" or "Ad Impressiong" action, they'll be included in that step. You can also use this new custom event in your other reports, such as Retention.

![https://help.mixpanel.com/hc/article_attachments/8088061393300/mceclip3.png](https://help.mixpanel.com/hc/article_attachments/8088061393300/mceclip3.png)

## Create a Custom Event

1. Expand the Event dropdown in either an Insights, Funnels, Retention, or Formulas report.

    ![https://help.mixpanel.com/hc/article_attachments/7385585102484/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/7385585102484/mceclip0.png)

2. Select **Create Custom**
3. Select the events and properties you’d like to include.
4. Name your custom event, and click **Save**.

![https://help.mixpanel.com/hc/article_attachments/7385632920980/mceclip1.png](https://help.mixpanel.com/hc/article_attachments/7385632920980/mceclip1.png)

When naming your custom event, note that the UI will break when the URL passes 2,083 characters. Each event and selector adds to the URL length (selectors more so than events). The easiest way to break a custom event is with an "equals" operation that selects a lot of values.

## Edit and Delete Custom Events

To view your complete list of custom events to manage, edit, or delete them, you must navigate to the [Lexicon](https://help.mixpanel.com/hc/en-us/articles/360001307806).

![https://help.mixpanel.com/hc/article_attachments/7385157703188/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/7385157703188/mceclip0.png)

In Lexicon, click on the **Custom Events** tab.

![https://help.mixpanel.com/hc/article_attachments/7385173826196/mceclip1.png](https://help.mixpanel.com/hc/article_attachments/7385173826196/mceclip1.png)

Here you can see a list of all the custom events in the project. Click on the **name** of the event to edit its details.

To delete a custom event, check the **box** beside the title of all the custom events you want to delete, then click the **delete** button at the top of the list.

![https://help.mixpanel.com/hc/article_attachments/7385263867924/mceclip2.png](https://help.mixpanel.com/hc/article_attachments/7385263867924/mceclip2.png)

# Custom Buckets

Custom buckets lets you group existing properties into meaningful segments on the fly. This is focused on enabling every person to answer common segmentation questions easily, quickly and in a low friction way.

Example use-cases include:

- Compare how the core markets are performing between US vs UK vs China vs all others
- Compare how many sign-ups are brought in by organic search vs google ads vs social media channels together (facebook, twitter, linkedin)
- Compare # videos watched for users between ages 18-30 vs 30-40 or 40+
- Compare # users based on duration of video watched: < 30, 30-60, 60-90 mins

## Creating Custom Buckets

Add a property in Breakdown, then select the **Customize Buckets** option from the overflow menu

[https://help.mixpanel.com/hc/article_attachments/14342458665748](https://help.mixpanel.com/hc/article_attachments/14342458665748)

Depending on your added property data type - string vs numeric, you will see a different custom buckets modal, designed based on the data-type use-cases **(more detail below)**

Once you define your segment buckets, click **Apply.** Only then will the custom buckets reflect in the visualization. You will also see the custom buckets as an under-item on the property

[https://help.mixpanel.com/hc/article_attachments/14342458667924](https://help.mixpanel.com/hc/article_attachments/14342458667924)

To modify the segment buckets, click on the **under-item** and the custom buckets model will open. Once you’ve made the changes, click **Apply**

To remove all grouping and revert to the default, open the custom buckets modal and click **Reset**

## String property Use Cases

**Use Case:** You want to compare # videos watched between core markets - North America, Europe & China

Current: You have a property “Country”

Goal: You want to group the countries into meaningful segments

- Segment 1: North America: US & Canada
- Segment 2: Europe: UK, Germany, France, Netherlands, Italy
- Segment 3: China
- Segment 4: Rest of the World (everything but those above)

Steps

1. Add a breakdown - Country. Below is the default you’ll see

    [https://help.mixpanel.com/hc/article_attachments/12828869626644](https://help.mixpanel.com/hc/article_attachments/12828869626644)

2. Choose to bucket segments, by opening the custom buckets model and click Apply
    - For each segment, choose the operator “is” and select one or more values
    - “Rest of the World” is auto generated as **remaining values**
    - To note — if two segments have the same value, the first segment will consider the value. Custom buckets are non-overlapping and sum up to 100% by definition

[https://help.mixpanel.com/hc/article_attachments/14342715436052](https://help.mixpanel.com/hc/article_attachments/14342715436052)

[https://help.mixpanel.com/hc/article_attachments/12828860042132](https://help.mixpanel.com/hc/article_attachments/12828860042132)

**You can also re-name these segments to make them meaningful to you**

1. On the same line of the segment, choose to rename it using the pencil icon
2. Click Apply after creating and naming your segments as desired

[https://help.mixpanel.com/hc/article_attachments/14342752741140](https://help.mixpanel.com/hc/article_attachments/14342752741140)

[https://help.mixpanel.com/hc/article_attachments/12828869956628](https://help.mixpanel.com/hc/article_attachments/12828869956628)

## Numeric property Use Cases

**Use Case:** You want to compare #users based on duration of video watched

Current: You have a property “watch time (mins)”

Goal: You want to distribute this in various ways

- Use Case A: Evenly in 10 min groups for the range 50-100 mins
- Use Case B: Specific groups <10, 10-20, 20-50, 50-100, ≥100
- Use Case C: Want to see all the durations as-is (No grouping)

**Deep Dive: Use Case A**: Evenly in 10 min buckets for the range 50-100 mins

1. Add a breakdown - “watch time (mins)”
    - To note — every numeric property is **auto-bucketed into even sized buckets as the default**
    - Here the default seems to be even buckets of 10 mins across the range

        [https://help.mixpanel.com/hc/article_attachments/14342489051028](https://help.mixpanel.com/hc/article_attachments/14342489051028)

        [https://help.mixpanel.com/hc/article_attachments/12828860268692](https://help.mixpanel.com/hc/article_attachments/12828860268692)

2. Go to the overflow and open the custom buckets modal
3. Since looking for even buckets of “30 mins”, choose **Even Bucketing**
4. Modify the min and max values of the desired range, and the bucket size, and click apply
    - To note — both a lower end and upper end bucket will be auto-generated to ensure your breakdown always adds up to a 100%
    - Here these buckets are <50 mins and ≥ 100 mins

        [https://help.mixpanel.com/hc/article_attachments/14342575096724](https://help.mixpanel.com/hc/article_attachments/14342575096724)

        [https://help.mixpanel.com/hc/article_attachments/12828860573204](https://help.mixpanel.com/hc/article_attachments/12828860573204)


**Deep Dive: Use Case B**: Specific groups <10, 10-20, 20-50, 50-100, ≥100

1. Open the custom buckets modal
2. Since looking for specific buckets with varied bucket ranges, choose **Varied Bucketing**
3. Enter the ‘segment’ break point values in each row and click apply. You can preview the bucket as you enter values in the line-item below
    - To note — both a lower end and upper end bucket will be auto-generated to ensure your buckets always adds up to a 100%

[https://help.mixpanel.com/hc/article_attachments/14342546138516](https://help.mixpanel.com/hc/article_attachments/14342546138516)

[https://help.mixpanel.com/hc/article_attachments/12828860758676](https://help.mixpanel.com/hc/article_attachments/12828860758676)

**Deep Dive: Use Case C:** Want to see all the durations as-is (No bucketing)

1. Open the custom buckets modal
2. Since looking for “No bucketing”, choose **None —** This lays out all the numeric property values as-is

[https://help.mixpanel.com/hc/article_attachments/14342547991956](https://help.mixpanel.com/hc/article_attachments/14342547991956)

[https://help.mixpanel.com/hc/article_attachments/12833587659028](https://help.mixpanel.com/hc/article_attachments/12833587659028)

## Typecasting property Use Cases

**Use Case:** You want to identify #users of age 18 and age 60 since these are user ages where they change subscription plans (upgrade and downgrade respectively)

Current: You have a property age (years)

Goal: You want to group this in a meaningful way

- Segment 1: Age 18 (potential to upgrade)
- Segment 2: Age 60 (potential to downgrade)
- Segment 3: Every other age

Steps

1. Add a breakdown age(years). By default this will add as a numeric property
2. Since you are looking for pin-pointed years and not creating number-ranges, this is a question more common to string property data type
3. Change **Data Type** of age(years) to String. Once changed you will see the type-casted property type as an under-item
    - To note - only type-casted data types show as an under-item. If the data-type was the same as ingested, no under-item for data type will be seen

        [https://help.mixpanel.com/hc/article_attachments/14342634016660](https://help.mixpanel.com/hc/article_attachments/14342634016660)

        [https://help.mixpanel.com/hc/article_attachments/12833644608148](https://help.mixpanel.com/hc/article_attachments/12833644608148)

4. Post changing data-type, open the custom buckets modal. This will now open a modal meant for string property data type
5. Follow steps as elaborated for String property use-case above, and achieve the goal

    [https://help.mixpanel.com/hc/article_attachments/14342637801748](https://help.mixpanel.com/hc/article_attachments/14342637801748)

    [https://help.mixpanel.com/hc/article_attachments/14342707763604](https://help.mixpanel.com/hc/article_attachments/14342707763604)

    [https://help.mixpanel.com/hc/article_attachments/12833899595284](https://help.mixpanel.com/hc/article_attachments/12833899595284)


## Frequently Asked Questions

- **Which all reports does Custom Buckets work on?**

    This feature is available in the Insights, Funnels and Retention reports.

- **Which all property types does this support?**

    Custom Buckets work on String, Numeric and List data type

- **Can I save a Custom Bucket**?

    No, you can’t save a custom bucket. If your custom bucket is something you or your team would like to re-use, we encourage you to instead create a [custom property](https://help.mixpanel.com/hc/en-us/articles/360030848432-Custom-Properties#creating-a-custom-property).

- **How is custom buckets different from [custom property](https://help.mixpanel.com/hc/en-us/articles/360030848432)?**

    Custom buckets only supports the most common custom-property use-case of **`if else`** to create meaningful segments in a more simplistic UI, and a low lift way to enable quick ad-hoc exploration. You could get this same answer using custom property too, it would just be more effort and not as intuitive

- **Can I create over-lapping segments like (US & UK) vs (US & Australia)?**

    No, breakdowns are fundamentally designed to sum up to 100%. To ensure your analysis is accurate, please create non-overlapping segments.

    If you really need to answer a question like this, the right way here is to create these as two metrics leveraging [inline filters](https://help.mixpanel.com/hc/en-us/articles/7651639898260#event-inline-filters) and NOT use breakdowns.

    [https://help.mixpanel.com/hc/article_attachments/12834111393684](https://help.mixpanel.com/hc/article_attachments/12834111393684)

- **What happens if I change data-type, can I still use custom buckets?**

    Yes you can as long as the data-type you’ve changed the property to is supported.

- **Understanding the details:**
    - **In Numeric: Can I change the operators on the upper and lower bound?**If you are looking for more control on the operators, please create a [custom property](https://help.mixpanel.com/hc/en-us/articles/360030848432-Custom-Properties#creating-a-custom-property).

        No, the operators have been fixed. The lower bound is always strictly greater than (≥) and the upper bound is just lesser than(<)

    - **In String: Is (not set) included in (remaining values)?**

        No, (not set) is not included in remaining values

        - (remaining values): refers to ‘set’ values that just don’t fall into any of your defined segments
        - (not set) refers to the events where a property value has not been set at tracking/ ingestion. For example a new video (MixFun) is has been added. But during tracking, you forget to send the name of this video. So the count of this video is being tracked, but it’s being associated to a property value (not set) vs (MixFun)

        More details can be found in [this help doc](https://help.mixpanel.com/hc/en-us/articles/115004499403)

    - **In Numeric: What is the difference between (not set) and (non-numeric values)?**
        - (not set) as explained above for string refers to property values that have not been associated to any specific property value
        - (non numeric values) refers to set values that have just been sent in as non-numeric data type. For example, you’re looking to track time spent and have coded that as a numeric property, but for some reason some values are tracked as “a”, or “b” which are not-numeric.
- **Some Common How-do-I(s)**
    - **How do i know is set, (not set)?**

        (not set) is automatically computed and will always show up in the UI. You don’t have to select (not set) as a segment to know how many events fall in there. So only figure how would you like to segment your (set) values.

        [https://help.mixpanel.com/hc/article_attachments/12834113971348](https://help.mixpanel.com/hc/article_attachments/12834113971348)

    - **How do I get not contains or not equal to?**

        These will auto-generate under (remaining values). So just select what should be included

        For example — In the below (remaining values) is not equal to US or India

        [https://help.mixpanel.com/hc/article_attachments/12834082079380](https://help.mixpanel.com/hc/article_attachments/12834082079380)

    - **In number — how do i get a bucket of just 0?**

        If you’re purely looking for just how many people have value “0”, we would encourage you to typecast this to a string property and get that.

        If you’re looking to get the count of 0, in reference to the other numeric buckets, go ahead and create a **Varied Bucketing** custom buckets modal

        - If the numeric values are integers:
            - Choose Varied bucket values 0, 1, 2…
            - This would generate buckets: <0, ≥0 & <1, ≥1 & <2, ≥2.
            - ≥0 & <1 would be equal to bucket 0
        - If the numeric values are decimals:
            - Choose Varied bucket values 0, 0.0001, 1, …
            - This would generate buckets: <0, ≥0 & <0.0001, ≥0.0001 & <1, ≥1.
            - ≥0 & <0.0001 would approximate to bucket 0


# **View Users**

View Users is a streamlined process for exploring the users contributing to a specific metric or point on a chart. By interacting with the chart, you can view a group of users experiencing friction or dig deep into which users are driving feature adoption.

View Users can help you:

- See the users contributing to any metric and view their recent activities & properties.
- Save these users as a cohort.
- Export these users to a CSV file.

## Insights

![https://help.mixpanel.com/hc/article_attachments/7001609634196/View_Users_Insights_gif.gif](https://help.mixpanel.com/hc/article_attachments/7001609634196/View_Users_Insights_gif.gif)

- To learn more about your users who recently **Signed Up** at a specific point in time, you can click any point on a chart or line to access View Users. The View Users overlay **displays the list of users contributing to your chosen point on the chart**.
- By clicking on one of these users, you can further **explore their User Properties** like experiment group, purchase count, last event and many more.
- While viewing a specific user, you can also **discover their recent activities** (\*Like, Comment, Message Sent, Ad Conversion,\* etc) after **Sign Up** through the Activities menu.

## Funnels

![https://help.mixpanel.com/hc/article_attachments/7001620460820/View_Users_Funnels_gif.gif](https://help.mixpanel.com/hc/article_attachments/7001620460820/View_Users_Funnels_gif.gif)

- Finding the **exact group of users who dropped off** after **Sign Up** is possible through View Users in Funnels. While in a Funnels report, click on the section of the chart that displays non-converting users and select View Users - this displays the list of those who didn’t convert after signup.
- **Save this group as a cohort** by clicking the Create Cohort button. Now, you can learn more about their product usage or find the root cause of why they didn’t convert after Sign Up.

## Retention

![https://help.mixpanel.com/hc/article_attachments/7001609866260/View_Users_Retention_gif.gif](https://help.mixpanel.com/hc/article_attachments/7001609866260/View_Users_Retention_gif.gif)

- View Users in Retention report presents you with two options - view retained users and view dropped off users. This is helpful to **find the specific group of users who were engaged or dropped off** after **Sign Up** over a period of time.
- **Export your group of choice to a CSV with one click**. This data can guide meaningful actions, like emailing your user group a note that helps them get unstuck and engaged.

# Keyboard Shortcuts

## Undo / Redo Shortcuts

Undo / redo shortcuts allow for fast adjustments to your analysis. `Cmd + Z` to undo; `Cmd + Shift + Z` to redo. Change filters, date ranges, line vs bar chart, and go back in one second to compare before and after, or fix the view.

![https://help.mixpanel.com/hc/article_attachments/7653362389140/Undo_Redo_gif.gif](https://help.mixpanel.com/hc/article_attachments/7653362389140/Undo_Redo_gif.gif)

- **Navigate different report versions**: add a new event, filter or breakdown and undo that change with `Cmd + Z` . This makes iterating between different versions of your report quick and easy.
- **Compare visualizations**: go from a bar chart, to a line chart, to a pie chart and all the way back while only using the undo / redo keyboard shortcuts.

# Comparison: Time, Baseline and Overall

Once you have visualized a metric you are interested in, you want want to compare it against related metrics to gain further insight. Previously, only comparing against past values was supported, but there are now 3 different ways to compare your metrics. The ability to do and show comparisons across segments is also supported in Boards, so any report saved will also reflect in Boards.

## Time Comparisons

![https://help.mixpanel.com/hc/article_attachments/4489360680852/Screen_Shot_2021-09-22_at_4.38.05_PM.png](https://help.mixpanel.com/hc/article_attachments/4489360680852/Screen_Shot_2021-09-22_at_4.38.05_PM.png)

The compare to past menu has been modified to include the new comparison options, but users can continue to find the same time comparison options that existed before under the new "Compare" menu.

## Time Comparison - Absolute Values

![https://help.mixpanel.com/hc/article_attachments/4489375789076/Screen_Shot_2021-09-22_at_4.40.26_PM.png](https://help.mixpanel.com/hc/article_attachments/4489375789076/Screen_Shot_2021-09-22_at_4.40.26_PM.png)

This is the same default behavior that existed previously. When you compare to a time period users will see a solid line for the present data, and a dashed line for data in the time comparison period.

## Time Comparison - Percentage change over Baseline

This can be activated by selecting the "Percent change over Baseline" option in the controller next to the comparison menu.

![https://help.mixpanel.com/hc/article_attachments/4489375796500/Screen_Shot_2021-09-22_at_4.40.41_PM.png](https://help.mixpanel.com/hc/article_attachments/4489375796500/Screen_Shot_2021-09-22_at_4.40.41_PM.png)

When this view is activated, users will see the percentage difference from the one time period to another. This is the same value that was shown in the tooltip, but now users are able to show how segments are shrinking and growing over time. This also makes it easier to see relative performance between different segments.

![https://help.mixpanel.com/hc/article_attachments/4489317804436/Screen_Shot_2021-09-22_at_4.50.52_PM.png](https://help.mixpanel.com/hc/article_attachments/4489317804436/Screen_Shot_2021-09-22_at_4.50.52_PM.png)

These values are also reflected into the segmentation table below the chart.

## Increase over Baseline

Another comparison type that is now natively supported in Mixpanel is the ability to set a segment as a baseline from which other segments are compared against. This allows users to compare different segments across the same time period.

![https://help.mixpanel.com/hc/article_attachments/4489345790740/Screen_Shot_2021-09-22_at_4.50.28_PM.png](https://help.mixpanel.com/hc/article_attachments/4489345790740/Screen_Shot_2021-09-22_at_4.50.28_PM.png)

![https://help.mixpanel.com/hc/article_attachments/4489363596052/Screen_Shot_2021-09-22_at_4.50.36_PM.png](https://help.mixpanel.com/hc/article_attachments/4489363596052/Screen_Shot_2021-09-22_at_4.50.36_PM.png)

To enable, choose the "Increase over Baseline" option in the compare menu, then choose the segment that you wish to be the baseline.

![https://help.mixpanel.com/hc/article_attachments/4489367171220/Screen_Shot_2021-09-22_at_4.53.21_PM.png](https://help.mixpanel.com/hc/article_attachments/4489367171220/Screen_Shot_2021-09-22_at_4.53.21_PM.png)

Notice that because "Home supplies" is chosen at the baseline, it appears on the chart as a flat 0 line - this is because "Home supplies" always has a 0% difference against itself in the same time period.

Also note that the y axis can go below 0, because segments can perform better or worse than the selected baseline, like "Entertainment" above.

## Percentage of Overall

This option allows users to see how segments perform as a percentage of the total. Mixpanel will proactively disable this option when this comparison option won't give meaningful results.

![https://help.mixpanel.com/hc/article_attachments/4489363568532/Screen_Shot_2021-09-22_at_5.10.53_PM.png](https://help.mixpanel.com/hc/article_attachments/4489363568532/Screen_Shot_2021-09-22_at_5.10.53_PM.png)

To enable, open the Compare menu and select "Percentage of Overall"

![https://help.mixpanel.com/hc/article_attachments/4489317782036/Screen_Shot_2021-09-22_at_5.17.27_PM.png](https://help.mixpanel.com/hc/article_attachments/4489317782036/Screen_Shot_2021-09-22_at_5.17.27_PM.png)

## Why do the values in Compare to Overall not add up to 100%?

Depending on the type of metric, the percentages may not add up to 100%. This is because the value is being compared to the unsegmented value. For example, if you were you segment Total "Add Item to Cart" events by "Category", then the values should sum up to 100%, since an item might not be a part of different categories.

However, if the metric was "average price", then the average price across all categories might be $10. Within individual categories, the average price might be lower or higher, and that is the comparison being done by "Compare to Overall". In this case the percentage values would not add up to 100%.

More generally, if the metric is summable, and the groups are mutually exclusive, then the percentages will add up to 100%. if the metric is a non counting metric like uniques, or percentile aggregation, the percentages will not add up to 100%. Another example is if the breakdown is by cohorts, where users can be members of multiple cohorts, the percentages will not sum to 100%.

## Supported Charts

Comparisons are supported across all insights chart types. Depending on the exact configuration chosen, certain comparison operations may be disabled.

| Chart Type | Time Comparison Supported | Percentage change over Baseline Supported | Percentage of Overall Supported |
| --- | --- | --- | --- |
| Insights Line | Yes | Yes | Yes |
| Insights Stacked Line | No | No | Yes |
| Insights Bar | Yes | Yes | Yes |
| Insights Stacked Bar | Yes | No | No |
| Insights Pie | No | No | Yes |
| Insights Metric | Yes | Yes | Yes |
| Funnels Steps | Yes | Yes | No |
| Funnel Trends | Yes | Yes | No |
| Retention Curve | No | Yes | No |
| Retention Trends | Yes | Yes | No |

# Limits and Ordering

## Summary

In order to keep the interactive analysis experience snappy for projects of all sizes, we've made 2 changes:

- Added maximum limits to how many segments are returned when breaking down a metric by properties
- Changed the logic for the top segments that are returned

## Limits

## UI

We're changing how many segments are returned back to the report (**visible limit**), how many segments can be selected at a time for visualization (**selection limit**) as well as the number of segments selected by default (**default selection**).

Here's the breakdown per report + visualization type:

| Report Viz | Default Selection | Selection Limit | Visible Limit |
| --- | --- | --- | --- |
| Insights (bar) | 12 | 300 | 3000 |
| Insights (line) | 12 | 50 | 3000 |
| Retention | 6 | 12 | 200 |
| Funnels | 6 | 12 | 200 |

## Downloaded CSV and API

When downloading results as CSV or when querying our APIs, the limits remain unchanged.

## Top Segments logic

The way we pick the top segments differs according to the type of query. We choose the top segments based on the value shown in the second column.

| Query type | How we select top segments |
| --- | --- |
| Total | Total number of occurrences of the chosen event |
| Unique | Number of unique users who performed the chosen event |
| Sum of property values | Sum of the chosen property |
| Min/max of property values | Lowest/highest value of the chosen property |
| Average | Number of events (or users) that contribute to the average |
| Median/Percentile/Distribution | Number of events (or users) that contribute to the distribution |
| Distinct count | Number of distinct values of the chosen property |
| DAU/WAU/MAU | Number of unique users |
| Sessions | Number of sessions that contain the chosen event |
| Funnels | Total number of times the first funnel step was completed |
| Retention | Total number of times the first event was completed |

## FAQ

**Why are we adding new limits to breakdowns in reports?**

Interactive analysis is key to finding great insights [Ofrom your data - you ask a question, get an answer, ask another question building on that answer and you finally get an insight which is key, and you trust the answer because you experienced the journey to get there. If results take a long time to return, the interactivity goes away from interactive analysis, which takes away the magic.

**How will I know if my results are being pruned?**

You will see an indication like this:

![https://help.mixpanel.com/hc/article_attachments/4402821361044/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/4402821361044/mceclip0.png)

**Does this mean the downloaded CSV has lower limits?**

No, limits for CSV downloads remain unchanged across Insights, Funnels and Retention.

# List Property Support

## Introduction

This article walks through a few scenarios of how list properties behave within Mixpanel. The examples used here are from the Insights report, but the principles of how filter and breakdowns work with list properties remain the same across reports.

## Data

Let's assume an e-commerce platform has these 3 events:

- Event 1: *PurchaseCompleted*
    - *List of ProductIDs* = ["P1", "P2", "P4"]
- Event 2: *PurchaseCompleted*
    - *List of ProductIDs* = ["P2", "P3", "P4"]
- Event 3: *PurchaseCompleted*
    - *List of ProductIDs* = ["P3", "P4"]

Now let's assume that *"List of ProductIDs"* is mapped to a [lookup table](https://help.mixpanel.com/hc/en-us/articles/360044139291) called *Products* which looks like this:

| ProductID | Category | Price |
| --- | --- | --- |
| P1 | Clothing - pants | 100 |
| P2 | Clothing - shirt | 54 |
| P3 | Shoes | 109 |
| P4 | Electronics - music | 199 |

****

## Use-cases

## Breakdown

- Breakdown a list property
    - **Question:** TOTAL of *PurchaseCompleted* broken down by *"List of ProductIDs"*
    - **Answer:**


        | List of ProductIDs | Total |
        | --- | --- |
        | P1 | 1 |
        | P2 | 2 |
        | P3 | 2 |
        | P4 | 3 |
    - **What's going on here?** When breaking down, each of the list's contents is evaluated as a single item. So for example, P2 is present in Event 1 and Event 2, so the TOTAL (of the *PurchaseCompleted* event) where "P2" is present is 2.
- Breakdown by [lookup profile property](https://help.mixpanel.com/hc/en-us/articles/360044139291) that's joined to a list property
    - **Question:** TOTAL of *PurchaseCompleted* broken down by *"List of ProductIDs"* → *Category*
    - **Answer:**


        | List of ProductIDs | Total |
        | --- | --- |
        | Clothing - pants | 1 |
        | Clothing - shirt | 2 |
        | Shoes | 2 |
        | Electronics - music | 3 |
    - **What's going on here?** When breaking down, each of the list's contents is evaluated as a single item after being mapped to the lookup table. So for example, P2 is present in Event 1 and Event 2, and P2 mapped to the lookup table which gets us *Category* = "Clothing - shirt", so the TOTAL (of *PurchaseCompleted* events) where "Clothing - shirt" is present is 2. The thing to note here is that the results are identical to when *PurchaseCompleted* was broken down by *"List of ProductDs"*, except the *ProductIDs* are replaced by *Category*.
- Breakdown by lookup profile property that's joined to a list property AND by the list property itself
    - **Question:** TOTAL of *PurchaseCompleted* broken down by *"List of ProductIDs"* → *Category* AND *"List of ProductIDs"* (2 breakdowns applied)
    - **Answer:**


        | List of ProductIDs.Category | List of ProductIDs | Total |
        | --- | --- | --- |
        | Clothing - pants | P1 | 1 |
        |  | P2 | 1 |
        |  | P4 | 1 |
        | Clothing - shirt | P1 | 1 |
        |  | P2 | 2 |
        |  | P3 | 1 |
        |  | P4 | 2 |
        | Shoes | P2 | 1 |
        |  | P3 | 2 |
        |  | P4 | 2 |
        | Electronics - music | P1 | 1 |
        |  | P2 | 2 |
        |  | P3 | 2 |
        |  | P4 | 3 |
    - **What's going on here?** For each breakdown value, Mixpanel recomputes the list breakdown. So for example, TOTAL (*PurchaseCompleted*) with "*List of ProductIDs*" → *Category* = "Shoes" should get us Event 2 and Event 3:When these 2 events are broken down by *"List of ProductIDs"*, we get these results for "Shoes"(*ProductID* = "P3"):
        - Event 2: *PurchaseCompleted*
            - *List of ProductIDs* = ["P2", "P3", "P4"]
        - Event 3: PurchaseCompleted
            - *List of ProductIDs* = ["P3", "P4"]
        - P2: 1
        - P3: 2
        - P4: 2

## Filter

- Filter by any element of a list property
    - **Question:** TOTAL of *PurchaseCompleted* filtered by


        | "List of ProductIDs" | Any | = (equals) | "P1" |
        | --- | --- | --- | --- |
    - **Answer:***PurchaseCompleted - TOTAL*: 1
    - **What's going on here?** The "Any" operator filters down events when the filtered value matches ANY item in the list property. So in this example, the only event in which "List of ProductIDs" has "P1" present even once is Event 1, so the total event count for this filter is 1.
- Filter by all elements of a list property
    - **Question**: TOTAL of *PurchaseCompleted* filtered by


        | "List of ProductIDs" | All | = (equals) | "P1" |
        | --- | --- | --- | --- |
    - **Answer:***PurchaseCompleted - TOTAL*: 0
    - **What's going on here?** The "All" operator filters down events when the filtered value matches ALL of the items in the list property. So in this example, there is no event in which "List of ProductIDs" has all the elements equal to "P1", so the total event count for this filter is 0.
- Filter by list property and broken down by list property
    - **Question:** TOTAL of PurchaseCompleted filtered byBroken down by "List of ProductIDs"


        | "List of ProductIDs" | Any | = (equals) | "P1" |
        | --- | --- | --- | --- |
    - **Answer:**


        | List of ProductIDs | Total |
        | --- | --- |
        | P1 | 1 |
        | P2 | 1 |
        | P4 | 1 |
    - **What's going on here?** There is only 1 event that contains "P1" (Event 1, *"List of ProductIDs"* = ["P1", "P2", "P4"]), so when that one event is broken down by *"List of ProductIDs"*, Mixpanel evaluates each list item individually, thereby getting us:
        - P1: 1 (1 event)
        - P2: 1 (1 event)
        - P4: 1 (1 event)
- Filter by lookup profile property that's joined to a list property and then broken down by list property
    - **Question:** TOTAL of *PurchaseCompleted* filtered byBroken down by "List of ProductIDs"


        | "List of ProductIDs" → Category | Any | = (equals) | "Shoes" |
        | --- | --- | --- | --- |
    - **Answer:**


        | List of ProductIDs | Total |
        | --- | --- |
        | P2 | 1 |
        | P3 | 2 |
        | P4 | 2 |
    - **What's going on here?** There are 2 events that contain where the *Category* mapping for at least one of the *ProductIDs* in "*List of ProductIDs*" is equal to "Shoes" (i.e. *ProductID* = P3).When these two events are broken down by *"List of ProductIDs"*, Mixpanel evaluates each list item individually, thereby getting us:
        - Event 2: PurchaseCompleted
            - List of ProductIDs = ["P2", "P3", "P4"]
        - Event 3: PurchaseCompleted
            - List of ProductIDs = ["P3", "P4"]
        - P2: 1 (1 event)
        - P3: 2(2 events)
        - P4: 2 (2 events)
- Filter by lookup profile property that's joined to a list property (with multiple matching values) and then broken down by list property
    - **Question**: TOTAL of *PurchaseCompleted* filtered byBroken down by "List of ProductIDs"


        | "List of ProductIDs" → Category | Any | ∋ (contains) | "Clothing" |
        | --- | --- | --- | --- |
    - **Answer:**


        | List of ProductIDs | Total |
        | --- | --- |
        | P1 | 1 |
        | P2 | 2 |
        | P3 | 1 |
        | P4 | 2 |
    - **What's going on here?** This filter can be read as "for any of the items in *'List of ProductIDs'* , the lookup property *Category* contains the string 'Clothing'". This operation is filtering down to all the events that contain the *Category* mapping for the *ProductID* contains EITHER "Clothing - pants" or "Clothing - shirt", and that gives us 2 events:
        - Event 1: PurchaseCompleted
            - List of ProductIDs ["P1","P2","P4"]
        - Event 2: PurchaseCompleted
            - List of ProductIDs ["P2","P3","P4"]
    - Therefore, when those two events are broken down by "List of ProductIDs", Mixpanel evaluates each item of the list individually and we end up getting:
        - P1: 1
        - P2: 2
        - P3: 1
        - P4: 2
- Filter by lookup profile property that's joined to a list property (numeric filter) and then broken down by list property
    - **Question**: TOTAL of *PurchaseCompleted* filtered byBroken down by *"List of ProductIDs"*


        | "List of ProductIDs" → Price (number) | Any | < (less than) | 100 |
        | --- | --- | --- | --- |
    - **Answer:**


        | List of ProductIDs | Total |
        | --- | --- |
        | P1 | 1 |
        | P2 | 2 |
        | P3 | 1 |
        | P4 | 2 |
    - **What's going on here?** The filter can be read as "for any item in *'List of ProductIDs',* the lookup property *Price* is less than 100" and it only matches 1 product, and that is P2. Therefore, what this operation is doing is filtering down to all the events that contain P2 as ANY of the values in "List of ProductDs", and that gives us 2 events:Therefore, when those two events are broken down by *"List of ProductIDs"*, Mixpanel evaluates each item of the list individually and we end up getting:
        - Event 1: *PurchaseCompleted*
            - *List of ProductIDs* = ["P1", "P2", "P4"]
        - Event 2: PurchaseCompleted
            - *List of ProductIDs* = ["P2", "P3", "P4"]
        - P1: 1
        - P2: 2
        - P3: 1
        - P4: 2

# Top Events

Mixpanel will calculate the top events of a project and display them by default in several reports. Top events are the 12 most frequently tracked events in the last 30 days.

## Definition of Top Events

Top events are defined as the most frequently fired events in a Mixpanel project. Top events will be presented in reports by event volume, displaying the highest volume events before other events. Top events are calculated using event counts from the most recent 30 days.

Mixpanel will display the top 12 events when building queries using “Top Events”.

An Insights report that breaks down the “Top Events”, for example, will display the Top Events in order from most to least volume.

![https://help.mixpanel.com/hc/article_attachments/360002721963/Top_Events.png](https://help.mixpanel.com/hc/article_attachments/360002721963/Top_Events.png)

## Reports with Top Events

Mixpanel will list “Top Events” in the following reports:

- [Insights](https://help.mixpanel.com/hc/en-us/articles/360001333826-Insights-Overview)
- [Signal](https://help.mixpanel.com/hc/en-us/articles/115004567503-Signal-Overview)

Additionally, Mixpanel will automatically define Top Events as “the 12 most frequently tracked events from the last 30 days” in [Lexicon](https://help.mixpanel.com/hc/en-us/articles/115004569503-Lexicon-Overview).

# Find Interesting Segments

Determine which users are either driving conversion and retention or behaving as outliers by using the built in “Find Interesting Segments” feature.

Find Interesting Segments can help you discover:

- Whether certain property segments outperform the overall funnel conversion or retention rates.
- Which cohorts perform the best to get ideas on optimizing cohort behavior.
- Which segments are under-performing.
- Changes in the conversion or retention rates of segments.
- Change in population over time in funnels.

User properties are not yet supported.

## Interesting Segments in Funnels

View the top and bottom converting segments in your funnel by clicking the **Find interesting segments** button at the bottom of the segmentation chart.

[https://help.mixpanel.com/hc/article_attachments/10038188905364](https://help.mixpanel.com/hc/article_attachments/10038188905364)

Rather than searching through multiple property breakdowns to find significant data, this feature automatically identifies this data for you. Mixpanel combs through your event properties and cohorts to show you which of those segments convert higher or lower than average, and are therefore statistically significant.

There are two reports you will receive in your email: segment analysis and time comparison.

## Segment Analysis

An email that breaks down the top and bottom converting segments of your funnel based on statistical significance and other factors is automatically sent after you click the button. If no statistically significant segments are found, then the email shows non-statistically significant segments.

Segment Analysis helps answer questions such as:

- Which groups of users are driving my conversion rate?
- Which are groups of users are decreasing my conversion rate?

This is done by examining which segments of users are converting at a high rate and have a large enough population size, or which segments are converting at a low rate and have a large enough population size. In the first scenario, this segment would raise the overall conversion rate, while in the second scenario this segment would be lowering the overall conversion rate.

## Time Comparison

A time comparison chart is also included in the email. This chart shows a segments behavior over time (in terms of both conversion rate change and population size change) as it relates to the overall population trend (population and conversion rate change).

Time comparison answers questions such as:

- Which groups of users are trending in a way that is different from the overall behavior?
- Which groups of users are driving the overall behavior?

Mixpanel automatically compares the currently selected date period to the previous one. For example, if you are viewing the current week, the email will compare to the week before.

## Interesting Segments in Retention

View the top and bottom converting segments in your retention report by clicking the **Find interesting segments** button at the bottom of the retention chart. This feature is not currently available for Frequency Retention.

[https://help.mixpanel.com/hc/article_attachments/10037069627156](https://help.mixpanel.com/hc/article_attachments/10037069627156)

Rather than searching through multiple segment breakdowns to find significant data, this feature automatically identifies that data for you. Mixpanel combs through your event properties and cohorts, and show you which of those segments retain at a higher or lower rate than average.

An email that breaks down the top and bottom retaining segments of your Retention report based on changes on retention rates is automatically sent after you click the button.

## Interpret Email Results

When your analysis email says “no interesting segments”, this means that none of the segments you analyzed were behaving significantly differently from the overall population at a large enough volume. To resolve this issue, try extending the date range of the report or try a different report.

If the analysis request included dates in the past five days, and is sent from mobile SDK, data may be delayed and therefore not included at the time of the analysis. Likewise, the date window selected might still fall under conversion window, and more conversions have yet to come through.

Results are sorted by taking into consideration the property, the number of users in the report, as well as the deviation from overall conversion or retention behavior to surface the most meaningful segments to you.

# Query Time Sampling

Query-time sampling allows you to query a subset of users and shorten the time it takes for a report to load results. The Insights, Funnels, Retention and Flows reports all support sampling at query time.

This feature is available to enterprise customers with over 5 million [MTUs](https://help.mixpanel.com/hc/en-us/articles/360001465686-Billing-for-Monthly-Tracked-Users) or over 2 billion monthly events.

## Enable or Disable Query Time Sampling

Navigate to the report where you would like to enable or disable sampling at time of query.

## Enable Sampling

From the report in which you would like to use sampling, click the **lightning bolt** in the upper right corner of the query builder.

[https://help.mixpanel.com/hc/article_attachments/13109650264596](https://help.mixpanel.com/hc/article_attachments/13109650264596)

This will enable sampling on the report, and will be indicated by the lightning bolt symbol turning blue. The percentage of the total that is included in the query calculations will be indicated in the top right corner of the query builder.

## Disable Sampling

To turn off sampling, click the lightning bolt symbol in the upper right corner of the query builder again.

The lightning bolt symbol will turn grey to indicate that sampling is disabled.

## Query Time Sampling Calculation and Presentation

Mixpanel will not sample, or drop, events at ingestion. Instead, Mixpanel will ingest all event data and sample at query time. This prevents the loss of important data, and therefore allows you to toggle sampling on and off depending on need.

For example, if you have a need for iterative querying, then sampling will greatly speed up this process. When you build the proper query, you can turn off sampling and query the entire dataset.

The following occurs when sampling is enabled:

1. Mixpanel selects a uniformly random sample of users on which to run the analysis.
2. The sample size is 10% of the total population.
3. The report is generated using that subset of users.
4. Mixpanel up-samples the data by multiplying by the inverse of the sampling factor. This is done for [functions](https://help.mixpanel.com/hc/en-us/articles/360001333826-Insights-Overview#functions) such as totals and uniques. Functions that do not scale with users (average, min, max) will not be up-sampled.
5. The effect is that numbers should closely approximate results seen without sampling enabled. This works better as the number of users increases, particularly for customers with more than 5 million users.
6. Mixpanel adds an annotation to reports.

# Saved Reports with Query Time Sampling

If you save a report that uses query time sampling, then a version of the report *without* sampling is saved. This ensures that Boards and saved reports are computed on the entire dataset for high fidelity.

# Query Result Caching

Mixpanel stores the results from a report query in cache, and presents these results from cache when appropriate. This saves time when running a complicated query multiple times, and allows you to surface previously calculated results near-instantaneously.

Query result caching is currently fully supported in Insights, and for Insights cards, Retention cards, and Funnels cards in Boards.

## Cached Query Results Presentation

Mixpanel presents report results from cache depending on the last time you ran a query. The date range of the query will adjust how Mixpanel presents results from the cache.

- If the query date range is over 30 days, then the query results are cached for up to 24 hours.
- If the query date range is 1 day, then the query results are cached for up to 15 minutes.
- If the query date range is 30 days or under, then the query results are cached for up to 3 hours.

After a query is run, any subsequent execution of the same query presents results from the cache. A subsequent query that pulls results from cache also initiates a background query. The results from this query updates the cache with the most recent results.

While this highlights the default cache behavior, you can always refresh a report to include the most current data.

You can see the last time that the cache was refreshed and a report was updated by viewing the “updated ... ago” field at the top of the query builder in Insights. This will indicate when the most recent results were surfaced in the report.

![https://help.mixpanel.com/hc/article_attachments/360027469711/Cache_Update.png](https://help.mixpanel.com/hc/article_attachments/360027469711/Cache_Update.png)

You can also view when the most recent update was in Boards by hovering over report cards.

![https://help.mixpanel.com/hc/article_attachments/360027372472/Dashboard_Cache.png](https://help.mixpanel.com/hc/article_attachments/360027372472/Dashboard_Cache.png)

## Refreshing the Query Results Cache

To refresh the query results cache, navigate to an Insights report and click the **Refresh** button at the top of the query builder.

![https://help.mixpanel.com/hc/article_attachments/360027474952/Refresh_Cache.png](https://help.mixpanel.com/hc/article_attachments/360027474952/Refresh_Cache.png)

To refresh query results cache in a Board, click the three dots in the top of the Board, and then click the **Refresh all cards** button.

![https://help.mixpanel.com/hc/article_attachments/360027474992/Dashboard_Refresh.png](https://help.mixpanel.com/hc/article_attachments/360027474992/Dashboard_Refresh.png)

If the cached result is less than 1 min old, we always serve from cache without running a new background query.

# Event and Property Limitations

While all reports in Mixpanel utilize your event data and properties to deliver insight into your business, not all reports can use all event types or properties.

Reports use events and properties to target users, segment data, and filter data. This guide will clarify which reports can use which event types and properties.

## Analysis

**Insights:** All event types and properties are available in Insights to breakdown and filter data.

**Funnels:** Funnels can be calculated by unique or total events. All event types and properties are available to breakdown and filter data.

**Retention:** Retention only counts total users, not unique. However, all event types and properties are available to filter data.

**Signal:** Signal uses only event properties, not user profile properties. However, all event types are available to filter data.

## Users

All event types and properties are available in Explore and Cohorts to filter users.

# Downloading Reports from Mixpanel

Users can download reports in three formats:

- CSV
- PNG
- PDF

## Breakdown Limits in Report Downloads

Mixpanel maintains breakdown limits for CSV, PNG, and PDF report downloads.

## CSV

For property values that exceed 10,000, Mixpanel only returns the top 10,000 breakdowns of that property. Here’s an example CSV export of an Insights report. The first column contains the date of when each event was sent. The columns contain the event name and the rows contain the number of each event sent to Mixpanel.

![https://help.mixpanel.com/hc/article_attachments/360002311923/CSV-download.png](https://help.mixpanel.com/hc/article_attachments/360002311923/CSV-download.png)

## PNG and PDF

PNG and PDF downloads display up to 30 segments in the Insights table, Insights bar, Retention table, and Retention line; and up to 12 segments for the Insights line. Here’s an example of a chart in PNG format.

![https://help.mixpanel.com/hc/article_attachments/360002311943/PNG-example.png](https://help.mixpanel.com/hc/article_attachments/360002311943/PNG-example.png)

## Downloading Reports

To download Insights, Funnels, and Retention reports, click the "..." icon on the upper right corner of each report.

### Insights Download Menu

![https://help.mixpanel.com/hc/article_attachments/360049681372/Screen_Shot_2020-02-14_at_10.31.33_AM.png](https://help.mixpanel.com/hc/article_attachments/360049681372/Screen_Shot_2020-02-14_at_10.31.33_AM.png)

### Funnels Download Menu

![https://help.mixpanel.com/hc/article_attachments/360049681352/Screen_Shot_2020-02-14_at_10.32.18_AM.png](https://help.mixpanel.com/hc/article_attachments/360049681352/Screen_Shot_2020-02-14_at_10.32.18_AM.png)

It is possible (only in the Funnels report) to download "CSV Trends", which downloads funnels by date.

### Retention Download Menu

![https://help.mixpanel.com/hc/article_attachments/360049805751/Screen_Shot_2020-02-14_at_10.32.36_AM.png](https://help.mixpanel.com/hc/article_attachments/360049805751/Screen_Shot_2020-02-14_at_10.32.36_AM.png)

# Undefined and Null Properties

There are several reasons why you might see "undefined" in your properties list throughout Mixpanel reports when segmenting:

- ***The specific property you’re segmenting by isn’t always sent along with the event you’re analyzing.*** For example, let’s say you’re segmenting the event “App Open” by the property “Account type” If there are instances where App Open fires without the Account type property getting sent with it, these will be categorized as “undefined” when you segment by Account type. Another common example is UTM parameters - “undefined” represents users who fired an event without any UTM in the URL that brought the user to your site.
- When segmenting an event by a User Profile property, ***you’ll see “undefined” if there are User Profile profiles that don’t contain that property or if the event was triggered by a user without a User Profile at all.*** For example, let’s say you’re segmenting the event “Song Play” by the User Profile property “Favorite Genre.” If there are profiles that have triggered Song Play but don’t have the Favorite Genre property, that value will be “undefined.” Triggers of Song Play by users without a User Profile will also show up under “undefined.”
- ***For geolocation data (City, Region, Country), the user’s IP couldn’t be mapped to a location, or their IP was not included with the request.*** For JavaScript implementations, City, Region, and Country are [default properties](https://help.mixpanel.com/hc/en-us/articles/115004613766-What-properties-do-Mixpanel-s-libraries-store-by-default-). However, if the IP address of the user is not in Mixpanel’s geolocation database and can’t be mapped to a city, region, or country, they will be “undefined” in reports. For server-side implementations, City, Region, and Country can be “undefined” if the IP address is not included with the request. [Read more about how Mixpanel maps IP to location.](https://help.mixpanel.com/hc/en-us/articles/115004494803-How-can-I-disable-default-collection-of-city-region-and-country-or-anonymize-geolocation-data-)

## Remove “undefined” & "null" values from reports

If you don’t want to see “undefined” or "null" values in your report, you can remove them by:

1. Unchecking the “undefined/null” box in the visualization legend.
2. Looking only at instances where the property in question “is set" - this will exclude values where you see "undefined" or "null":

    ![https://help.mixpanel.com/hc/article_attachments/6897764720916/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/6897764720916/mceclip0.png)

3. Directly exclude undefined or null values from an Insights visualization by hitting the exclude action:

    ![https://help.mixpanel.com/hc/article_attachments/6897318430228/mceclip2.png](https://help.mixpanel.com/hc/article_attachments/6897318430228/mceclip2.png)


## Troubleshooting Tips

If you’re getting “undefined” property values but think you should not be, troubleshoot the issue using the events page. Click on "Filter" in the top left to look at events coming in where the property in question “is not set.” You can then use this data to look at your code and figure out why some events are being fired without that property.

![https://help.mixpanel.com/hc/article_attachments/6897521421332/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/6897521421332/mceclip0.png)

# User Side Panel

Clicking on certain user icons shows you contextual information about the user, such as their project role and reports that are relevant to them.

Close the side panel by clicking the X at the top right or anywhere outside of the side panel.

![https://help.mixpanel.com/hc/article_attachments/4402544262164/UserSidePanel.png](https://help.mixpanel.com/hc/article_attachments/4402544262164/UserSidePanel.png)

## User Information

Upload an avatar of yourself and fill out a short bio that other organization users can see.

## Most Viewed

Most Viewed shows some of the user's most viewed reports and Boards that have been shared with you.

### Recently Created

Recently Created shows the reports and Boards created by that user in the last 30 days that have been shared with you.

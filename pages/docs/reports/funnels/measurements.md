# Measurements

## Overview
Funnels report supports a variety of measurements. You can configure your funnel measurement using one of the options in the table below.

| Measurement | Description |
| --- | --- |
| Conversion Rate | The rate at which funnels are completed for the selected steps of the funnel. The conversion rate can be based off of [unique users](/docs/reports/funnels/measurements#uniques-count), [total](/docs/reports/funnels/measurements#totals-count) funnel entries or [sessions](/docs/reports/funnels/measurements#sessions-count). |
| Unique Users | The number of users who completed the selected steps of the funnel; based on their first attempt at entering the funnel within the timeframe of the report using [Uniques](/docs/reports/funnels/measurements#uniques-count) counting method.|
| Total Conversions | The total number of funnels that have reached the selected step of the funnel using the [Totals counting method](/docs/reports/funnels/measurements#totals-count). This measurement allows for users to re-enter the funnel multiple times, if they exit the funnel by either fully converting or dropping out. |
| Total Sessions | The total number of unique users sessions that reached the selected step of the funnel using the [Sessions counting method](/docs/reports/funnels/measurements#sessions-count). |
| Time to Convert | Allows for selection of an aggregation: Average, Median, Percentile, Min and Max. Measures the aggregated time to convert for the selected steps of the funnel. [See more](#time-to-convert-measurement) |
| Property Sum | Sums up a chosen property value for each step of the funnel, and measures the total amount of the property converted for the selected step of the funnel. [See more](#property-sum) |

## Conversion Measurements
You can configure your Funnels report to calculate your conversions as a percentage using **Conversion Rate** measurements or return the number of users/entries using** Total Conversion**/**Unique Users**/**Total Session** measurements.

Regardless of your selection, the conversions are measured using one of these counting methods.

### Counting Methods
#### Uniques count
Uniques conversion includes a single entry per user (determined by distinct_id). Each user enters the funnel only once, and this is on the first time they perform the entry event (step 1) in the date range. Even if a particular user completes the funnel multiple times in the date range, they will only be counted towards conversion once, on the first time they entered in the span of the date range.

This counting method is used for **Conversion Rate > Uniques** (default Funnels setting) and **Unique Users** measurements.

#### Totals count
Totals conversion rate includes multiple entries per user.  Users can re-enter the funnel and every time a user enters the funnel they are counted towards conversion. Users may re-enter a totals funnel only after they have exited their previous attempt through the funnel. Users exit a funnel in 3 ways:

1. They complete the funnel and convert to the last step,
2. They fail to complete the funnel in the conversion window and time out,
3. They are excluded from conversion by an exclusion step.

This counting method is used for **Conversion Rate > Totals** and **Total Conversions** measurements.

#### Sessions count
Sessions conversion includes the number of sessions that contain a conversion. Like totals funnels, users will be allowed to re-enter the funnel in subsequent sessions; however, in sessions funnels users must convert through the funnel within the same session they entered the funnel to be counted as converted. If the session ends before they have converted, the user will time out and drop out of the funnel after the last step they reached. Learn more about [Sessions](/docs/features/sessions).

This countng method is used for **Conversion Rate > Sessions** and **Total Sessions** measurements.


### Conversion Rate Toggle
By default your Funnels is set to measure Conversion Rate using the Uniques counting method. You can switch the counting method to Totals or Sessions by clicking the gear icon when selecting your measurement.

## Time to Convert

![Time to Convert Measurements](/ttc-measurements.png)

You can select a Time to Convert aggregation to see how quickly or slowly your funnel converts. You can see this as a summarized value by selecting "Metric" or "Bar" visualizations, or you can see it as a trend using the "Line" visualization. You can also see the time to convert for a particular chosen step selection.

#### Time to Convert Breakdown and Filter

Use the Time to Convert breakdown to see a distribution of time users took between any two steps in the funnel or all steps. The steps selected in the breakdown are independent of the step of the metric you are measuring, for example you can measure overall conversion rate broken down by Time to Convert between Steps 1 and 2.

![/funnels_ttc_selection.png](/funnels_ttc_selection.png)

![/funnels_ttc_step_selection.png](/funnels_ttc_step_selection.png)

Time to Convert works like any other property in that you can filter to specific range of times or customize the bucketing of the breakdown. You cannot use it as a step filter as it is used to filter funnels which have been measured rather than changing the per step conversion window.

![/funnels_ttc_filter.png](/funnels_ttc_filter.png)

![/funnels_ttc_custom_buckets.png](/funnels_ttc_custom_buckets.png)

You can can use this in combination with measuring total conversion to get a distribution of conversions, based on how long they took to convert. You can also use this to see how other metrics such as conversion rate are affected based on how quickly users convert on a particular step range.

## Property Sum

This measurement type allows you to visualize revenue through a funnel. Instead of seeing how many users move through your flow, you can select an event property that exists on each step of the funnel. Mixpanel will sum up the total value of this property at each stage of the funnel and visualize the total ammount converted, or the dropoff at each step if "Funnel Steps" visualization is selected.

**Note**: For many e-commerce flows, you will want to pair property sum with [hold property constant](/docs/reports/funnels#hold-property-constant) on item ID so you can track each individual item.

To use property sum, select property sum from the measurement menu, and select a numeric property. In this case, we're seeing our 5 step purchase funnel, and we can see that our biggest dropoff is between viewing an item and adding it to cart.

![Revenue Funnel](/funnels_property_sum.png)


## Step Selection

You can select which step of the funnel you would like to measure. By default this is set to All Steps. To change your step selection, press "All Steps" and choose the desired range.

![step selection](/step-selection.png)

When measuring "Unique Users", "Total Conversions" or "Total Sessions", you can select "Entering Funnel" in order to get a top of funnel count. Similarly, if you would like to get the bottom of funnel count, you choose "All Steps" or any other step range to get the bottom of funnel count for that step.

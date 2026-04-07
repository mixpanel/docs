# Funnels Quickstart

{% embed url="https://www.youtube.com/watch?v=oG1JQ-M-32k" %}

A funnel is a sequence of events done within a defined period of time. A converted user is one who triggers the funnel events, in the specified order, within the defined time period.

## Step 1: Define your Funnel Behavior

A Funnel Behavior is the basic building block of the Funnels report. A Funnel Behavior is a sequence of events done within a defined period of time.

For example,  let's say your signup flow contains five steps. Within the funnel definition, you can add one event for each step, in the following order: “Product Viewed” → “Product Added” → “Checkout Started” → “Purchase Completed”. At this point, your query should look like this.

![/funnels_beta_1.png](/funnels_beta_1.png)

You can save the Funnel Behavior you built and reuse them in other reports. Select the "..." button in the top right corner of the metric, then click "Save Behavior". Note that saving a behavior and saving a metric is different; a saved behavior consists of the events/Funnels/Retention, while a saved metrics consists of the saved behavior and the measurements of the behavior.

Learn more about [Saved Metrics and Behaviors](/docs/features/saved-metrics-and-behaviors).

## Step 2: Choose your Measurement

After your Funnel Behavior is defined, you can choose how you want to measure the Funnel. By default, the Funnels report will select the unique conversion rate of the funnel as the measurement.

{% hint style="info" %}
**Advanced** - See [Counting Method and Measurements](/docs/reports/funnels/funnels-advanced#counting-methods-and-measurements) section for more information on the measurements.
{% endhint %}

![/funnels_beta_2.png](/funnels_beta_2.png)

Your Funnel Behavior combined with the measurement forms a Metric. You can save the Funnels Metric you built and reuse them in other reports (such as the Insights report). Select the "..." button in the top right corner of the metric, then click "Save Behavior". Note that saving a behavior and saving a metric is different; a saved behavior consists of the events/Funnels/Retention, while a saved metrics consists of the saved behavior and the measurements of the behavior.

Learn more about [Saved Metrics and Behaviors](/docs/features/saved-metrics-and-behaviors).

## Step 3: Choose Filters

In this case, we only care about events performed on the iOS platform. Therefore, add a “Platform” filter, where Platform equals “iOS Native”. At this point, your query should look like this.

{% hint style="info" %}
**Advanced** - See [Filter](/docs/reports/funnels/funnels-advanced#filters) section for more information on the filters.
{% endhint %}

![/funnels_beta_3.png](/funnels_beta_3.png)

## Step 4: Choose Breakdowns

Breakdowns segment data into groups. In this case, we want to break our funnel down by marketing medium, tracked via UTM tags. Therefore, you can add a “UTM Medium” breakdown.

{% hint style="info" %}
**Advanced** - See [Breakdowns](/docs/reports/funnels/funnels-advanced#breakdowns) section for more information on the breakdowns.
{% endhint %}

![/funnels_beta_4.png](/funnels_beta_4.png)

## Step 5: Choose Visualization

You can visualize your metric in a variety of ways. Mixpanel allows you to choose how you would like to visualize your data. Select “Funnel Steps” in the top right to change your visualization. In Funnels, you can choose:

- Funnel Steps - see how users are progressing through the funnel
- Line - see how your metric is trending over time
- Bar - see a summary view of your metric
- Metric - see a summary view of your metric

![/funnels_beta_5.png](/funnels_beta_5.png)

<br></br>
<br></br>
<br></br>

{/* Next Section */}

<hr></hr>
<br></br>
<div class="bg-base100 rounded-xl">
  <h2 class="text-2xl font-medium mb-2 color:bg-purple200">
    Next: Advanced Funnels Concept
  </h2>
  <p>
    Explore how funnel metrics are measured and the various configuration options below.
  </p>
  <br></br>
  <a href="/docs/reports/funnels/funnels-advanced" class="button primary">Funnels Advanced Concepts</a>

<br></br>
<br></br>

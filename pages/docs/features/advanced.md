# Advanced

## Query Builder Features

### Session Metric Analysis

![/Screen_Shot_2022-07-11_at_3.53.47_PM.png](/Screen_Shot_2022-07-11_at_3.53.47_PM.png)

Analyze session metrics by selecting "Session Start" or "Session End" from the events list. Learn more about using Sessions in Insights, Funnels and Flows [here](/docs/features/sessions).

### Inline Filtering

Filter this event by clicking the **inline action menu** and selecting **Add filter** from the drop-down. Choose an event property, user profile property, group profile property, or cohort to filter the event by.

![image](https://github.com/mixpanel/docs/assets/2077899/9307d6c1-025c-4bb4-9ab3-12f9ab1c7ce3)

You can select whether you would like your query to match any or all of the filters by clicking on **and/or** beside the filters.

![image](https://github.com/mixpanel/docs/assets/2077899/1b8cdb9d-2479-404c-b10a-f82373d03e34)


### Advanced Filter & Breakdown Usage

To filter the results of your report by any property or cohort, click the **Filter** button.

To break down your results of your report by any property or cohort, click the **Breakdown**.

You can break down your results by the "Time" event property and breakdown by Hour, Day, Week, Month, Quarter, Year, Hour of Day, or Day of Week.

![/breakdown_by_date.gif](/breakdown_by_date.gif)

If you are analyzing any custom events, you can breakdown by the property "Event Name".

![image](https://github.com/mixpanel/docs/assets/2077899/dafe97ca-35a3-4dee-8285-41a115f0417d)

The drop-down menus only show events/event properties that were ingested within the last 30 days. To select events/event properties that have not been ingested in the last 30 days, type the name of the event/event property in the Filter or Breakdown search bar. You must know the exact name of the event/event property you want to select because event names are case sensitive.

![/query_old_event.gif](/query_old_event.gif)

To create a temporary cohort for the current report, click **Create Custom...** in the dropdown menu and select "Cohort. A window will pop up where you can specify the restrictions of your cohort. Learn more about building a cohort [here](/docs/users/cohorts#creating-cohorts).

![/create_cohort_from_report.gif](/create_cohort_from_report.gif)

## Slack Integration

Connect Mixpanel to your Slack workspace to help share reports with your colleagues faster. You can (1) set up an alert to send a message to a Slack channel, (2) set up a Board Subscription to send a message to a Slack channel, or (3) share previews of any Mixpanel report in Slack.

To send an alert to a Slack Channel, see [Custom Alerts](/docs/features/alerts). To set up a board subscription to a Slack Channel, see [Advanced Board Functionality - Subscriptions](/docs/boards/advanced#board-subscriptions).

The Mixpanel application for Slack will also automatically unfurl a preview of any Mixpanel link, including chart images for certain reports, making it easy for anyone in your Slack workspace to learn from your Mixpanel analyses.

### Enable the Integration

To enable the integration, log in to both Mixpanel and Slack, then click [here](https://mixpanel.com/slack/oauth?slack_v2=true) to authorize the slack workspace:

![/Screen_Shot_2020-06-15_at_10.41.00_PM.png](/Screen_Shot_2020-06-15_at_10.41.00_PM.png)

After clicking allow, you'll return to Mixpanel, where you'll see a success banner:

![/Screen_Shot_2020-06-15_at_10.42.06_PM.png](/Screen_Shot_2020-06-15_at_10.42.06_PM.png)

At this point, Mixpanel is a part of your Slack workspace, and any Mixpanel links you send in Slack will unfurl with metadata, and if applicable a chart preview.

Once at least one member of your Mixpanel organization has set up the Mixpanel Integration for Slack for their account, any other members of the Slack workspace will see a prompt the next time they paste a Mixpanel link. The prompt will ask them to connect their own Mixpanel account to Slack as well. If they choose to do so, Slack will guide them through the authentication flow. Once they have successfully connected Mixpanel to Slack, any further links they paste in Slack will unfurl.

### Using the Integration

Once you've set up the integration, Mixpanel links pasted in Slack will unfurl. Most links will provide some basic link metadata, and links to Insights, Flows, Funnels, or Retention reports will also include a chart preview, for example:

![/slack_app_demo.png](/slack_app_demo.png)

### Permissions

Mixpanel does not restrict who can enable the Mixpanel integration for Slack. However, your Slack workspace may limit who can perform the connection.

After Mixpanel is connected to Slack, any Slack user who posts a Mixpanel link will be prompted to connect their own account, in order to unfurl report previews. By performing this integration at the user level, it ensures that only reports the user has access to will unfurl in Slack.

### Privacy

The Mixpanel app for Slack adheres to Mixpanel's overall privacy policy, available in full here: [https://mixpanel.com/legal/privacy-policy/](https://mixpanel.com/legal/privacy-policy/).





## Comparison: Time, Baseline and Overall

Once you have visualized a metric you are interested in, you want want to compare it against related metrics to gain further insight. Previously, only comparing against past values was supported, but there are now 3 different ways to compare your metrics. The ability to do and show comparisons across segments is also supported in Boards, so any report saved will also reflect in Boards.

### Time Comparisons

![/Screen_Shot_2021-09-22_at_4.38.05_PM.png](/Screen_Shot_2021-09-22_at_4.38.05_PM.png)

The compare to past menu has been modified to include the new comparison options, but users can continue to find the same time comparison options that existed before under the new "Compare" menu.

### Time Comparison - Absolute Values

![/Screen_Shot_2021-09-22_at_4.40.26_PM.png](/Screen_Shot_2021-09-22_at_4.40.26_PM.png)

This is the same default behavior that existed previously. When you compare to a time period users will see a solid line for the present data, and a dashed line for data in the time comparison period.

### Time Comparison - Percentage change over Baseline

This can be activated by selecting the "Percent change over Baseline" option in the controller next to the comparison menu.

![/Screen_Shot_2021-09-22_at_4.40.41_PM.png](/Screen_Shot_2021-09-22_at_4.40.41_PM.png)

When this view is activated, users will see the percentage difference from the one time period to another. This is the same value that was shown in the tooltip, but now users are able to show how segments are shrinking and growing over time. This also makes it easier to see relative performance between different segments.

![/Screen_Shot_2021-09-22_at_4.50.52_PM.png](/Screen_Shot_2021-09-22_at_4.50.52_PM.png)

These values are also reflected into the segmentation table below the chart.

### Increase over Baseline

Another comparison type that is now natively supported in Mixpanel is the ability to set a segment as a baseline from which other segments are compared against. This allows users to compare different segments across the same time period.

![/Screen_Shot_2021-09-22_at_4.50.28_PM.png](/Screen_Shot_2021-09-22_at_4.50.28_PM.png)

![/Screen_Shot_2021-09-22_at_4.50.36_PM.png](/Screen_Shot_2021-09-22_at_4.50.36_PM.png)

To enable, choose the "Increase over Baseline" option in the compare menu, then choose the segment that you wish to be the baseline.

![/Screen_Shot_2021-09-22_at_4.53.21_PM.png](/Screen_Shot_2021-09-22_at_4.53.21_PM.png)

Notice that because "Home supplies" is chosen at the baseline, it appears on the chart as a flat 0 line - this is because "Home supplies" always has a 0% difference against itself in the same time period.

Also note that the y axis can go below 0, because segments can perform better or worse than the selected baseline, like "Entertainment" above.

### Percentage of Overall

This option allows users to see how segments perform as a percentage of the total. Mixpanel will proactively disable this option when this comparison option won't give meaningful results.

![/Screen_Shot_2021-09-22_at_5.10.53_PM.png](/Screen_Shot_2021-09-22_at_5.10.53_PM.png)

To enable, open the Compare menu and select "Percentage of Overall"

![/Screen_Shot_2021-09-22_at_5.17.27_PM.png](/Screen_Shot_2021-09-22_at_5.17.27_PM.png)

### Why do the values in Compare to Overall not add up to 100%?

Depending on the type of metric, the percentages may not add up to 100%. This is because the value is being compared to the unsegmented value. For example, if you were you segment Total "Add Item to Cart" events by "Category", then the values should sum up to 100%, since an item might not be a part of different categories.

However, if the metric was "average price", then the average price across all categories might be $10. Within individual categories, the average price might be lower or higher, and that is the comparison being done by "Compare to Overall". In this case the percentage values would not add up to 100%.

More generally, if the metric is summable, and the groups are mutually exclusive, then the percentages will add up to 100%. if the metric is a non counting metric like uniques, or percentile aggregation, the percentages will not add up to 100%. Another example is if the breakdown is by cohorts, where users can be members of multiple cohorts, the percentages will not sum to 100%.

### Supported Charts

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



## List Property Support

### Introduction

This article walks through a few scenarios of how list properties behave within Mixpanel. The examples used here are from the Insights report, but the principles of how filter and breakdowns work with list properties remain the same across reports.

### Data

Let's assume an e-commerce platform has these 3 events:

- Event 1: *PurchaseCompleted*
    - *List of ProductIDs* = ["P1", "P2", "P4"]
- Event 2: *PurchaseCompleted*
    - *List of ProductIDs* = ["P2", "P3", "P4"]
- Event 3: *PurchaseCompleted*
    - *List of ProductIDs* = ["P3", "P4"]

Now let's assume that *"List of ProductIDs"* is mapped to a [lookup table](/docs/data-structure/lookup-tables) called *Products* which looks like this:

| ProductID | Category | Price |
| --- | --- | --- |
| P1 | Clothing - pants | 100 |
| P2 | Clothing - shirt | 54 |
| P3 | Shoes | 109 |
| P4 | Electronics - music | 199 |

****

### Use Cases

### Breakdown

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
- Breakdown by [lookup profile property](/docs/data-structure/lookup-tables) that's joined to a list property
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

### Filter

- Filter by any element of a list property
    - **Question:** TOTAL of *PurchaseCompleted* filtered by


        | "List of ProductIDs" | Any | = (equals) | "P1" |
        | --- | --- | --- | --- |
    - **Answer:** *PurchaseCompleted - TOTAL*: 1
    - **What's going on here?** The "Any" operator filters down events when the filtered value matches ANY item in the list property. So in this example, the only event in which "List of ProductIDs" has "P1" present even once is Event 1, so the total event count for this filter is 1.
- Filter by all elements of a list property
    - **Question**: TOTAL of *PurchaseCompleted* filtered by


        | "List of ProductIDs" | All | = (equals) | "P1" |
        | --- | --- | --- | --- |
    - **Answer:** *PurchaseCompleted - TOTAL*: 0
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


## List of Objects Property Support

### Use Cases

List of objects are generally useful when tracking a list of complex things. Some examples:

- items in a cart
- search results
- images in a slideshow

In each case, the object will have multiple properties, such as "price" and "brand" for items in a cart.

```
"event": "Product Added",
"properties": {
    "cart": [
        {
            "brand": "Puma",
            "category": "Jacket",
            "price": 30
        },
        {
            "brand": "Adidas",
            "category": "Hats",
            "price": 15
        }
    ]
}
```

### Usage

List of objects can be used like other properties in Mixpanel. Upon selecting a list of objects property, you will be prompted to select another property, which is is common to the objects in the list. Usage in measurements, filters and breakdowns follows the same behavior as [other list properties](/docs/features/advanced#list-property-support).

### Computed Properties

We provide a few convenient computed properties after a list of objects property is selected. This does a computation on the property, and works similarly to [custom properties](/docs/features/custom-properties).

![list computed properties](/list-computed-properties.png)

#### Size

The size, or length of the list as a numeric property.

#### Sum

Prompts a selection of a numeric property contained within the objects of the list. This will give the total for the whole list for that property.

#### Distinct Count

Prompts a selection of a property contained within the objects of the list. This will give the number of unique values for that property in the list.

### Limits

The list of objects property support will be limited to the first 5 objects within the list property. More details on [Object and List of Objects Data Types](/docs/data-structure/property-reference#object-and-list-of-objects-data-types) support in our docs.

For customer's on a paid plan, you may submit a request for approval to have this limit increased by opening a support ticket within the UI (or by sending an email to [support@mixpanel.com](mailto:support@mixpanel.com)) with the subject line: “Request for List of Objects Limit Increase”. An increase will not be guaranteed, but your project will be reviewed for feasibility of increasing this limit.




## Behavioral Properties

Behavioral properties allow you to use your user's activity and use it as a property in your other analysis. A behavioral property is a virtual property, meaning it's not a property that you are explicitly tracking, but a property that Mixpanel can compute and allow you to use in analysis.

Behavioral properties can be used anywhere, most typically in filters and breakdowns.

### Frequency per User

After selecting this option, you must select an event to compute the frequency of. You can use this to segment your users by how many times they did an event, or use it to filter out users to only those who did an event a certain number of times.

### Aggregate Property per User

After select this option, you must select an event, and then a property on that event. Finally, you can choose an aggregation type for this property. You can use this to segment your users by this property aggregation. For example, you may want to filter only for users who have greater than 100 minutes of video watch time, or you may want to segment users by their watch time.

### Time Range

#### Per Interval

In insights, the time in which this computation is done is on a per interval basis. For a line chart, that will be for each individual interval plotted on the chart. For bar, table and pie, this interval is the entire date range selected in the date picker.

#### Between Steps

In funnels, the behavioral property is computed in the time range between 2 steps in your funnel. You can specify which steps in the funnel this applies to. In the case of doing "Frequency per User", the event count does not include the events that make up the funnel itself, and **only** the events between the funnel steps.

#### After Step 1

In retention, the behavioral property is computed in the chosen time range after the entry event, up until the retaining action. For example, there may be a 7 day window in which we're looking for an event, but if the retaining action happens before the 7 days are up, we no longer count an additional events.


## Find Interesting Segments

Determine which users are either driving conversion and retention or behaving as outliers by using the built in “Find Interesting Segments” feature.

Find Interesting Segments can help you discover:

- Whether certain property segments outperform the overall funnel conversion or retention rates.
- Which cohorts perform the best to get ideas on optimizing cohort behavior.
- Which segments are under-performing.
- Changes in the conversion or retention rates of segments.
- Change in population over time in funnels.

User properties are not yet supported.

### Interesting Segments in Funnels

View the top and bottom converting segments in your funnel by clicking the **Find interesting segments** button at the bottom of the segmentation chart.

![/10038188905364](/10038188905364.png)

Rather than searching through multiple property breakdowns to find significant data, this feature automatically identifies this data for you. Mixpanel combs through your event properties and cohorts to show you which of those segments convert higher or lower than average, and are therefore statistically significant.

There are two reports you will receive in your email: segment analysis and time comparison.

### Segment Analysis

An email that breaks down the top and bottom converting segments of your funnel based on statistical significance and other factors is automatically sent after you click the button. If no statistically significant segments are found, then the email shows non-statistically significant segments.

Segment Analysis helps answer questions such as:

- Which groups of users are driving my conversion rate?
- Which are groups of users are decreasing my conversion rate?

This is done by examining which segments of users are converting at a high rate and have a large enough population size, or which segments are converting at a low rate and have a large enough population size. In the first scenario, this segment would raise the overall conversion rate, while in the second scenario this segment would be lowering the overall conversion rate.

### Time Comparison

A time comparison chart is also included in the email. This chart shows a segments behavior over time (in terms of both conversion rate change and population size change) as it relates to the overall population trend (population and conversion rate change).

Time comparison answers questions such as:

- Which groups of users are trending in a way that is different from the overall behavior?
- Which groups of users are driving the overall behavior?

Mixpanel automatically compares the currently selected date period to the previous one. For example, if you are viewing the current week, the email will compare to the week before.

### Interesting Segments in Retention

View the top and bottom converting segments in your retention report by clicking the **Find interesting segments** button at the bottom of the retention chart. This feature is not currently available for Frequency Retention.

![/10037069627156](/10037069627156.png)

Rather than searching through multiple segment breakdowns to find significant data, this feature automatically identifies that data for you. Mixpanel combs through your event properties and cohorts, and show you which of those segments retain at a higher or lower rate than average.

An email that breaks down the top and bottom retaining segments of your Retention report based on changes on retention rates is automatically sent after you click the button.

### Interpret Email Results

When your analysis email says “no interesting segments”, this means that none of the segments you analyzed were behaving significantly differently from the overall population at a large enough volume. To resolve this issue, try extending the date range of the report or try a different report.

If the analysis request included dates in the past five days, and is sent from mobile SDK, data may be delayed and therefore not included at the time of the analysis. Likewise, the date window selected might still fall under conversion window, and more conversions have yet to come through.

Results are sorted by taking into consideration the property, the number of users in the report, as well as the deviation from overall conversion or retention behavior to surface the most meaningful segments to you.

## Query Time Sampling

Query-time sampling allows you to query a subset of users and shorten the time it takes for a report to load results. The Insights, Funnels, Retention and Flows reports all support sampling at query time.

This feature is available to enterprise customers with over 5 million [MTUs](/docs/admin/pricing-plans#mtu-calculation) or over 2 billion monthly events.

### Enable or Disable Query Time Sampling

Navigate to the report where you would like to enable or disable sampling at time of query.

### Enable Sampling

From the report in which you would like to use sampling, click the **lightning bolt** in the upper right corner of the query builder.

![/13109650264596](/13109650264596.png)

This will enable sampling on the report, and will be indicated by the lightning bolt symbol turning blue. The percentage of the total that is included in the query calculations will be indicated in the top right corner of the query builder.

### Disable Sampling

To turn off sampling, click the lightning bolt symbol in the upper right corner of the query builder again.

The lightning bolt symbol will turn grey to indicate that sampling is disabled.

### Query Time Sampling Calculation and Presentation

Mixpanel will not sample, or drop, events at ingestion. Instead, Mixpanel will ingest all event data and sample at query time. This prevents the loss of important data, and therefore allows you to toggle sampling on and off depending on need.

For example, if you have a need for iterative querying, then sampling will greatly speed up this process. When you build the proper query, you can turn off sampling and query the entire dataset.

The following occurs when sampling is enabled:

1. Mixpanel selects a uniformly random sample of users on which to run the analysis.
2. The sample size is 10% of the total population.
3. The report is generated using that subset of users.
4. Mixpanel up-samples the data by multiplying by the inverse of the sampling factor. This is done for [functions](/docs/reports/insights) such as totals and uniques. Functions that do not scale with users (average, min, max) will not be up-sampled.
5. The effect is that numbers should closely approximate results seen without sampling enabled. This works better as the number of users increases, particularly for customers with more than 5 million users.
6. Mixpanel adds an annotation to reports.

### Saved Reports with Query Time Sampling

If you save a report that uses query time sampling, then a version of the report *without* sampling is saved. This ensures that Boards and saved reports are computed on the entire dataset for high fidelity.

## Query Result Caching

Mixpanel stores the results from a report query in cache, and presents these results from cache when appropriate. This saves time when running a complicated query multiple times, and allows you to surface previously calculated results near-instantaneously. The date range of the query will adjust how Mixpanel presents results from the cache.

- If the query date range is over 30 days, then the query results are cached for up to 24 hours.
- If the query date range is 30 days or under, then the query results are cached for up to 3 hours.
- If the query date range is 1 day, then the query results are cached for up to 15 minutes.

You can see While this highlights the default cache behavior, you can always refresh a report to include the most current data.

![/Cache_Update.png](/Cache_Update.png)

You can also view when the most recent update was in Boards by hovering over report cards.

![/Dashboard_Cache.png](/Dashboard_Cache.png)

### Refreshing the Query Results Cache

To refresh the query results cache, navigate to an Insights report and click the **Refresh** button at the top of the query builder.

![/Refresh_Cache.png](/Refresh_Cache.png)

To refresh query results cache in a Board, click the three dots in the top of the Board, and then click the **Refresh all cards** button.

![/Dashboard_Refresh.png](/Dashboard_Refresh.png)

If the cached result is less than 1 min old, we always serve from cache without running a new background query.

## Event and Property Limitations

While all reports in Mixpanel utilize your event data and properties to deliver insight into your business, not all reports can use all event types or properties.

Reports use events and properties to target users, segment data, and filter data. This guide will clarify which reports can use which event types and properties.

**Insights:** All event types and properties are available in Insights to break down and filter data.

**Funnels:** Funnels can be calculated by unique or total events. All event types and properties are available to break down and filter data.

**Retention:** Retention only counts total users, not unique. However, all event types and properties are available to filter data.

**Signal:** Signal uses only event properties, not user profile properties. However, all event types are available to filter data.

**Users:** All event types and properties are available in Users.



## Undefined and Null Properties

There are several reasons why you might see "undefined" in your properties list throughout Mixpanel reports when segmenting:

- ***The specific property you’re segmenting by isn’t always sent along with the event you’re analyzing.*** For example, let’s say you’re segmenting the event “App Open” by the property “Account type” If there are instances where App Open fires without the Account type property getting sent with it, these will be categorized as “undefined” when you segment by Account type. Another common example is UTM parameters - “undefined” represents users who fired an event without any UTM in the URL that brought the user to your site.
- When segmenting an event by a User Profile property, ***you’ll see “undefined” if there are User Profile profiles that don’t contain that property or if the event was triggered by a user without a User Profile at all.*** For example, let’s say you’re segmenting the event “Song Play” by the User Profile property “Favorite Genre.” If there are profiles that have triggered Song Play but don’t have the Favorite Genre property, that value will be “undefined.” Triggers of Song Play by users without a User Profile will also show up under “undefined.”
- ***For geolocation data (City, Region, Country), the user’s IP couldn’t be mapped to a location, or their IP was not included with the request.*** For JavaScript implementations, City, Region, and Country are [default properties](https://help.mixpanel.com/hc/en-us/articles/115004613766-What-properties-do-Mixpanel-s-libraries-store-by-default-). However, if the IP address of the user is not in Mixpanel’s geolocation database and can’t be mapped to a city, region, or country, they will be “undefined” in reports. For server-side implementations, City, Region, and Country can be “undefined” if the IP address is not included with the request. [Read more about how Mixpanel maps IP to location.](/docs/privacy/protecting-user-data#disabling-geolocation)

### Remove “undefined” & "null" values from reports

If you don’t want to see “undefined” or "null" values in your report, you can remove them by:

1. Unchecking the “undefined/null” box in the visualization legend.
2. Looking only at instances where the property in question “is set" - this will exclude values where you see "undefined" or "null":

![image](https://github.com/mixpanel/docs/assets/2077899/1a2465e1-da8d-4fe4-937a-5753716129b3)

3. Directly exclude undefined or null values from an Insights visualization by hitting the exclude action:

![image](https://github.com/mixpanel/docs/assets/2077899/4d010827-cc4e-4a11-9716-cd3bfbaebadd)


### Troubleshooting Tips

If you’re getting “undefined” property values but think you should not be, troubleshoot the issue using the Events page. Click on "Filter" in the top left to look at events coming in where the property in question “is not set.” You can then use this data to look at your code and figure out why some events are being fired without that property.

![image](https://github.com/mixpanel/docs/assets/2077899/c028c2b1-160d-4c0b-ba9a-87b74aba9c42)

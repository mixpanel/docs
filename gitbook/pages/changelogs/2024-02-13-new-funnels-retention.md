---
title: "New Experience and Features in Funnels and Retention"
slug: "changelog-2024-02-13-new-funnels-retention"
hidden: false
createdAt: "2024-02-13T14:59:02.165Z"
updatedAt: "2024-02-13T14:59:02.165Z"
date: "2024-02-13"
---

Mixpanel's funnels and retention reports are where you can see user behavior through a series of events. With our next set of changes, we are making funnels and retention reports more powerful, while making them easier to use and keeping our controls in a place consistent with insights.

You can try the new funnels and retention experience in our demo projects, [here](https://mixpanel.com/project/3018488/view/3536632/app/funnels).

## Funnels Report Changes

[New Funnels Report Walkthrough](https://www.loom.com/share/7905e588beea48c5bc757ce8c43aae8b)

Here is a quick summary of changes:

- Funnels is getting revamped so that your funnel definition as well as the way you measure your funnel will be displayed in the query builder at all times.
- You can explicitly define which steps of the funnel you are interested in.
- More chart types are available across all different funnel metric measurements.
- [Time to Convert is available as a measurement](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/reports/funnels/funnels-advanced#time-to-convert-measurement), if you are looking to see a trend or summary of your conversion times.
- Time to Convert is available as a breakdown, if you are interested in seeing something like a distribution of conversions, by their conversion time.
- Frequency per User is available as a breakdown.

## Retention Report Changes

[New Retention Report Walkthrough](https://www.loom.com/share/45ddc28851aa494ead99bccafe1f9a37)

Here is a quick summary of changes:

- Retention is getting updated so that your retention behavior definition as well as the way you measure your retention behavior will be displayed in the query builder at all times.
- You can explicitly define which retention group you are interested in.

## New Analysis Capabilities

### Build and Visualize More Metrics, Faster

[Funnels and Retention Reports: Build and Visualize Metrics Faster](https://www.loom.com/share/bee5153decf441c49d141f8b68f161e4)

Insights, Funnels and Retention now all follow the same structure. In the query builder on the left, you can define the behavior you want to measure, as well as the way to measure it. Each query builder now has its own self contained definition of a [metric](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/reports#metrics). We’ll be leveraging this concept more in the future. More chart types are available across funnels and retention, allowing you to visualize funnel and retention metrics in more way than before.

### See Revenue Drop off in Funnels

[Revenue Funnel Drop-off for E-commerce Companies](https://www.loom.com/share/e041e17a02d4429b84304ba0ce1345dc)

For e-commerce companies, the most important thing is their sales funnel. Seeing how many users convert is great, but the real end goal is seeing how many dollars converted. With revenue drop off, you can now see the revenue at each stage in the funnel, and not just the users. This helps identify which steps are seeing the most lost dollars and which segments are performing or not.

### More Time to Convert Options

[New Funnels Time to Convert Analysis Capabilities](https://www.loom.com/share/5150be7a7b194de0ac538ff85c35c3ce)

See how your funnels are performing beyond just average time to convert over time, and median time to convert as a bar chart. We have added the ability to see median, average, P25, P75, P90, P99, min and max time to convert, using any visualization you’d like.

You also have more power in [Time to Convert breakdowns](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/reports/funnels/funnels-advanced#time-to-convert-breakdown). You can choose the step range you would like the breakdown to apply to, while using a different step range for your measurement. This can allow you to see if converting quick on step 1 → 2 leads to higher conversion overall, and draw more insights from time to convert.

### Alerts of Funnel Metrics

[Link to Demo](https://www.loom.com/share/0284fcd216c74397966996fbb558b053)

Alerts are much more powerful in funnels now. Instead of only being able to alert on conversion rate, you can now alert on any funnel metric, such as time to convert, or the number of conversions. You also get the power of anomaly detection, if you’d like us to detect when there’s something strange happening.

### Behavioral Properties in Funnels

[New Funnels Alerts Features](https://www.loom.com/share/e6e9806db88b448bb82044033ac052cf)

You are no longer limited to only seeing the number of times a certain step was performed in a funnel. You can now choose any event, and see how that influences your funnel. This is especially useful if you have a set funnel definition, and you’re interested in how non-core actions might affect your conversion rate. You no longer have to add and remove steps in between your funnel to see how different events affect your funnel.

You can also see how the properties of events done between funnel steps affects funnel conversion. For example, you can see how many different categories of items were viewed in a purchase funnel, which may be more telling than a raw count of items viewed.

[See more about Frequency Per User in Funnels](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/reports/funnels/funnels-advanced#frequency-per-user).

### Behavioral Properties in Retention

[New Funnels Alerts Features](https://www.loom.com/share/dd4042654e6f46039d011a680fe93948)

Have you wondered if doing certain actions affect retention? With the new Frequency per User and Aggregate Property per User options available in breakdowns, you can summarize user activity and see how it affects retention. Mixpanel will summarize activity after the starting event, whether it is a count of events, or a summary of properties on those events. You can answer questions like: how many song plays does it take after sign up before my retention is 50%? Being able to analyze what actions correlate with retention will give you new insight on how to improve your product.

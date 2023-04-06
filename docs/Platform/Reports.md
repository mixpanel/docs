---
title: "Reports"
slug: "reports"
hidden: false
metadata:
  title: "Reports"
  description: "Reports in Mixpanel.."
---

A report is the basic unit of performing an analysis in Mixpanel.

Mixpanel has several types of reports: [Insights](https://help.mixpanel.com/hc/en-us/articles/360001333826), [Funnels](https://help.mixpanel.com/hc/en-us/articles/360019982652), [Flows](https://help.mixpanel.com/hc/en-us/articles/360036438351), [Retention](https://help.mixpanel.com/hc/en-us/articles/115004546883) and other advanced reports, each with their specialized use.

This article focuses on the common concepts across each report.

# Report Concepts

## Events Menu

This is the menu that appears under "Add Metric" or "Select Step".

By default, the event menu shows all events, except for [hidden events](https://help.mixpanel.com/hc/en-us/articles/360001307806#hiding-and-showing-events-and-properties).

If you organize your events using [tags](https://help.mixpanel.com/hc/en-us/articles/360001307806#adding-tags-to-events) in Lexicon, the tags will show up as filtering options in the event menu. When you select a tag, a list of events that share the same tag appears:

![https://help.mixpanel.com/hc/article_attachments/7653439934484/Untitled__1_.png](https://help.mixpanel.com/hc/article_attachments/7653439934484/Untitled__1_.png)

## Properties Menu

This menu appears when adding a filter, an inline filter on an event or breakdown.

By default, the menu shows "all properties". This includes event properties, profile properties, group properties, lookup properties, cohorts.

You can select the following filtering options to show a subset of the properties in the menu:

- Select "event properties" to show only the [Event properties](https://help.mixpanel.com/hc/en-us/articles/360001355266).
- Select "user properties" to show only the [Profile properties](https://help.mixpanel.com/hc/en-us/articles/115004708186).
- Select "cohorts" to show only the [Cohorts](https://help.mixpanel.com/hc/en-us/articles/115005708186).
- If you set up [Group Analytics](https://help.mixpanel.com/hc/en-us/articles/360025333632), the Group keys will show up individually under their display names. You can select any Group key to show only the Group properties relevant to the selected Group key:

    ![https://help.mixpanel.com/hc/article_attachments/7653440863508/Mixpanel__project_3____Mixpanel_2021-11-18_12-00-58.png](https://help.mixpanel.com/hc/article_attachments/7653440863508/Mixpanel__project_3____Mixpanel_2021-11-18_12-00-58.png)

### Understanding Prefixes in the Menu

The events and properties in the menu are prefixed to provide additional context about the properties' type. They will be removed when additional context is not needed.

- Event properties are not prefixed (except in [User report's menu](https://help.mixpanel.com/hc/en-us/articles/7651639898260-Report-Concepts#h_01FNZ33F2GW9P13G0F0R51TJQJ)):

    ![https://help.mixpanel.com/hc/article_attachments/7653420857876/Screen_Shot_2021-11-18_at_12.26.25_PM.png](https://help.mixpanel.com/hc/article_attachments/7653420857876/Screen_Shot_2021-11-18_at_12.26.25_PM.png)

- User properties are prefixed by "User": "User" prefix is removed in [User report's menu](https://help.mixpanel.com/hc/en-us/articles/7651639898260-Report-Concepts#h_01FNZ33F2GW9P13G0F0R51TJQJ) or once you filter the menu by "user properties".

    ![https://help.mixpanel.com/hc/article_attachments/7653441978644/Screen_Shot_2021-11-18_at_12.25.13_PM.png](https://help.mixpanel.com/hc/article_attachments/7653441978644/Screen_Shot_2021-11-18_at_12.25.13_PM.png)

- Cohorts are prefixed by "In Cohort": "In Cohort" prefix is removed once you filter the menu by "cohorts".

    ![https://help.mixpanel.com/hc/article_attachments/7653472349972/Mixpanel__project_3____Mixpanel_2021-11-18_12-36-35.png](https://help.mixpanel.com/hc/article_attachments/7653472349972/Mixpanel__project_3____Mixpanel_2021-11-18_12-36-35.png)

- Group profile properties are prefixed by the Group key display name: Group key prefix is removed once you filter the menu by a specific Group key.

    ![https://help.mixpanel.com/hc/article_attachments/7653443128212/Screen_Shot_2021-11-18_at_12.37.54_PM.png](https://help.mixpanel.com/hc/article_attachments/7653443128212/Screen_Shot_2021-11-18_at_12.37.54_PM.png)

- [Lookup properties](https://help.mixpanel.com/hc/en-us/articles/360044139291) are prefixed by the mapped property. Let's say "Timezone" is mapped to a Lookup Table that contains "UTC Offset" and "UTC Offset (DST)", these lookup properties will be prefixed by "Timezone"

    ![https://help.mixpanel.com/hc/article_attachments/7653444472212/Screen_Shot_2021-11-18_at_12.29.00_PM.png](https://help.mixpanel.com/hc/article_attachments/7653444472212/Screen_Shot_2021-11-18_at_12.29.00_PM.png)

- Lookup properties can also be prefixed by both "User" and the mapped property to indicate that they are lookup properties of a user property

    ![https://help.mixpanel.com/hc/article_attachments/7653444473620/Screen_Shot_2021-11-18_at_12.29.06_PM.png](https://help.mixpanel.com/hc/article_attachments/7653444473620/Screen_Shot_2021-11-18_at_12.29.06_PM.png)


## Date and Time Selector

Determine the time range of a query by clicking on the time selector. The time selector is common across all reports. This article details the options in the time selector.

All dates and times in Mixpanel reflect the project timezone. The default on most reports is “Last 30 days” (displayed as "30D"), but there are a variety of pre-set options, as well as the option to select a custom date range.

<img width="387" alt="image" src="https://user-images.githubusercontent.com/2077899/230281466-11bfdbf7-0820-41c0-a4e8-b802faabaf20.png">

For these date ranges, the output shows results from the last complete 30 days, plus any results from the current incomplete day.

| Current day | Current incomplete day up to the current second. |
| --- | --- |
| Previous day | Last complete 24 hour period and the query count from the current incomplete day up to the current second.
In Insights Previous day only includes the last complete 24 hour period. |
| Last 7 days | Last 7 days and the query count from the current incomplete day up to the current second. |
| Last 30 days | Last 30 days and the query count from the current incomplete day up to the current second. |
| Last 3 months | Last 3 months and the query count from the current incomplete day up to the current second. |
| Last 6 months | Last 6 months and the query count from the current incomplete day up to the current second. |
| Last 12 months | Last 12 months and the query count from the current incomplete day up to the current second. |

## Select a Date Range

The **Select date range** menu opens up some additional options, "Last", "Fixed" and "Since".

### Last

“In the last” allows you to select a rolling time range similar to the default “last 30 days” but you have the flexibility to choose the time value and scale, either days, weeks, or months.

![https://help.mixpanel.com/hc/article_attachments/7710754330644/Screen_Shot_2022-07-11_at_3.17.05_PM.png](https://help.mixpanel.com/hc/article_attachments/7710754330644/Screen_Shot_2022-07-11_at_3.17.05_PM.png)

If you need to, you can click on the **+ Ending** button and shift back the desired time window by a selected amount of days. So for instance in the example below, we are still looking at a 2-week window that is shifted by 7 days back. This is a rolling date range and if this report is saved as a bookmark or added to a dashboard the actual dates will continue to update to show this relative time period vs. Today.

![https://help.mixpanel.com/hc/article_attachments/7710786261396/Screen_Shot_2022-07-11_at_3.18.03_PM.png](https://help.mixpanel.com/hc/article_attachments/7710786261396/Screen_Shot_2022-07-11_at_3.18.03_PM.png)

### Fixed

“Fixed” allows you to select two dates to query between or a select particular day to query by entering the same start & end date. If you save this report as a bookmark or add it to the dashboard, the date range selection will always persist.

![https://help.mixpanel.com/hc/article_attachments/7710854340756/Screen_Shot_2022-07-11_at_3.21.03_PM.png](https://help.mixpanel.com/hc/article_attachments/7710854340756/Screen_Shot_2022-07-11_at_3.21.03_PM.png)

### Since

“Since” allows you to select a specific date to query for all data since that start date.

### Filters

You can choose to filter the entire report by properties or cohorts by clicking the **Filter** button. This will filter the results of the entire report to show only data with that property or cohort.

![https://help.mixpanel.com/hc/article_attachments/7653479408532/mceclip4.png](https://help.mixpanel.com/hc/article_attachments/7653479408532/mceclip4.png)

## Event Inline Filters

You can choose to add a filter to limit the events that are included in the report.

Add a filter to your query by clicking on the **…** icon beside an event, profile, cohort, or step.

![https://help.mixpanel.com/hc/article_attachments/7653404447380/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/7653404447380/mceclip0.png)

Then, select a property from the drop down list that appears and specify which values to filter.

![https://help.mixpanel.com/hc/article_attachments/7653404825236/mceclip2.png](https://help.mixpanel.com/hc/article_attachments/7653404825236/mceclip2.png)

In Funnels, filtering a step by a particular property will limit the data you see in the funnel to events with that property value.

You can choose multiple property filters for each item in your query.

You can select whether you would like the query to match any of these filters, or all of the filters by clicking on **and/or** beside the filters.

![https://help.mixpanel.com/hc/article_attachments/7653405221012/mceclip3.png](https://help.mixpanel.com/hc/article_attachments/7653405221012/mceclip3.png)

## Breakdowns

Breakdown groups the results of your Insights, Funnels, Flows, or Retention report by a property or cohort, allowing you to examine which properties or cohorts have a significant impact on your query.

This feature is useful for determining if a group factor, such as browser type, is having an impact on the way users interact with your product. Breakdown will display counts, such as the number of events performed or the conversion rates with that property value.

Select the **Breakdown** button, and select the property or cohort you want to breakdown your results by.

![https://help.mixpanel.com/hc/article_attachments/7653415734804/mceclip5.png](https://help.mixpanel.com/hc/article_attachments/7653415734804/mceclip5.png)

For cohorts, you will be shown groups of users both in and not in the cohort in your results.

It is only possible to either group by properties or group by cohorts, but not both.

## Changing Visualization

In the top right, you can change the type of visualization and analysis being performed. The options available will depend on the type of report that you started with. In this case, we switched to a bar view, allowing us to see the total number of "Log In" across the entire time range, allowing us a summarized view that is easily scanned.

![https://help.mixpanel.com/hc/article_attachments/7710470354196/Screen_Shot_2022-07-11_at_3.07.02_PM.png](https://help.mixpanel.com/hc/article_attachments/7710470354196/Screen_Shot_2022-07-11_at_3.07.02_PM.png)

## Saving to a Board

When you are satisfied with the analysis, and decide that this is something that you are likely to revisit, Mixpanel recommends that you save the report to a [Board](https://help.mixpanel.com/hc/en-us/articles/115004565746). You can do this by pressing "Save" in the top right and selecting the Board you would like to save to, or creating a new Board.

![https://help.mixpanel.com/hc/article_attachments/7650984128148/Screen_Shot_2022-07-08_at_5.40.30_PM.png](https://help.mixpanel.com/hc/article_attachments/7650984128148/Screen_Shot_2022-07-08_at_5.40.30_PM.png)


## Typecasting

Mixpanel allows you to force Properties into another [data type](https://help.mixpanel.com/hc/en-us/articles/115004547063) by using the **"Data Type"** option in the overflow menu for property filters and breakdowns.

![https://help.mixpanel.com/hc/article_attachments/7653402531604/Kapture_2022-01-04_at_11.38.41.gif](https://help.mixpanel.com/hc/article_attachments/7653402531604/Kapture_2022-01-04_at_11.38.41.gif)

Typecasting is helpful when one of your properties is a number but is sent to Mixpanel as a string and you want to see histogram data for that property. Or if one of your properties is a unix timestamp and got sent as a number, and you want it to be treated as a date Property instead.

**How do I see the exact numeric values when applying a breakdown to a number data type in Insights?**

Insights will automatically bucket high-cardinality segments of number data types into ranges.

You can either customize the ranges by clicking "[Customize Range](https://help.mixpanel.com/hc/en-us/articles/360032529592#bucketing)".

Or alternatively, if you'd like to see the exact numeric values you can typecast the Number property to a String to remove the range bucketing.

## Compare to Past

Compare to past is a shortcut for segmenting a visualization on two time periods (current and past).

![https://help.mixpanel.com/hc/article_attachments/7710959181588/compare_to_past.gif](https://help.mixpanel.com/hc/article_attachments/7710959181588/compare_to_past.gif)

## Sessions

This is a period of continuous user activity. Use Sessions in Mixpanel to track which events users perform within a session, how many sessions contained a key action or how many sessions it takes for a user to convert in a funnel. [Learn more](https://help.mixpanel.com/hc/en-us/articles/115004695223).

![https://help.mixpanel.com/hc/article_attachments/7710991187348/Screen_Shot_2022-07-11_at_3.27.25_PM.png](https://help.mixpanel.com/hc/article_attachments/7710991187348/Screen_Shot_2022-07-11_at_3.27.25_PM.png)

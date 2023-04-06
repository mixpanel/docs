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

The drop-down menus only show events/event properties that were ingested within the last 30 days. To select events/event properties that have not been ingested in the last 30 days, type the name of the event/event property in the Filter or Breakdown search bar. You must know the exact name of the event/event property you want to select because event names are case sensitive.

![https://help.mixpanel.com/hc/article_attachments/7712553274388/query_old_event.gif](https://help.mixpanel.com/hc/article_attachments/7712553274388/query_old_event.gif)

To create a temporary cohort for the current report, click

**Create Custom...**

in the dropdown menu and select "Cohort. A window will pop up where you can specify the restrictions of your cohort. Learn more about building a cohort [here](https://help.mixpanel.com/hc/en-us/articles/115005701343).

![https://help.mixpanel.com/hc/article_attachments/7712721485460/create_cohort_from_report.gif](https://help.mixpanel.com/hc/article_attachments/7712721485460/create_cohort_from_report.gif)

# Slack Integration

Connect Mixpanel to your Slack workspace to help share reports with your colleagues faster. You can (1) set up an alert to send a message to a Slack channel, (2) set up a Board Digest to send a message to a Slack channel, or (3) share previews of any Mixpanel report in Slack.

To send an alert to a Slack Channel, see [Custom Alerts](https://help.mixpanel.com/hc/en-us/articles/360028142571). To send a digest to a Slack Channel, see [Advanced Board Functionality - Digests](https://help.mixpanel.com/hc/en-us/articles/4409850288276#board-digests).

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

The Mixpanel app for Slack adheres to Mixpanel's overall privacy policy, available in full here: [https://mixpanel.com/legal/privacy-policy/](https://mixpanel.com/legal/privacy-policy/).

# Custom Events

Create custom combinations of events by making a custom event within Mixpanel.

Custom events allow you to define a group of users based on existing events and properties, and then integrate that group into Mixpanel reports.

Once a custom event is created it is available to all users in the project and can be accessed across all reports.

### **Limits by Plan Type**

Free: 1 Custom Event

Startup: 15 Custom Events

Enterprise: Unlimited Custom Events

MTU Growth: Unlimited Custom Events

Visit our [pricing page](https://mixpanel.com/pricing/) to learn more about differences between plan types.

## Overview

A custom event is a virtual event that was created from one or more events, optionally filtered down by a particular set of properties, and given a name. Useful to:

- Merge two events into a single event ("User Signup" + "Account Created" -> "Signup")
- Create an event based on a filter on another event ("Purchase" where Country = "US" -> "US Purchases")

Imagine your business has two ways for users to track ads: they can convert from ad, or simply view it. You represent each of these actions with Mixpanel events named "Ad Conversion" and "Ad Impression," respectively. Later, you decide that you want to setup a funnel to track how many users are seeing any ads at all. So what do you do?

You can create a custom event containing "Ad Conversion" and "Ad Impression," and then save it as "Watch Ads.” Now you can use the "Watch Ads" custom event as a funnel step just like a regular event. Then, any time a user performs an "Ad Conversion" or "Ad Impression" action, they'll be included in that step. You can also use this new custom event in your other reports, such as Retention.

![https://help.mixpanel.com/hc/article_attachments/8088061393300/mceclip3.png](https://help.mixpanel.com/hc/article_attachments/8088061393300/mceclip3.png)

## Create a Custom Event

1. Expand the Event dropdown in either an Insights, Funnels, Retention, or Formulas report.

    ![https://help.mixpanel.com/hc/article_attachments/7385585102484/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/7385585102484/mceclip0.png)

2. Select **Create Custom**.
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
- Compare how many sign-ups are brought in by organic search vs Google ads vs social media channels together (Facebook, Twitter, LinkedIn)
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


# View Users

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

Mixpanel stores the results from a report query in cache, and presents these results from cache when appropriate. This saves time when running a complicated query multiple times, and allows you to surface previously calculated results near-instantaneously. The date range of the query will adjust how Mixpanel presents results from the cache.

- If the query date range is over 30 days, then the query results are cached for up to 24 hours.
- If the query date range is 30 days or under, then the query results are cached for up to 3 hours.
- If the query date range is 1 day, then the query results are cached for up to 15 minutes.

You can see While this highlights the default cache behavior, you can always refresh a report to include the most current data.

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

**Insights:** All event types and properties are available in Insights to breakdown and filter data.

**Funnels:** Funnels can be calculated by unique or total events. All event types and properties are available to breakdown and filter data.

**Retention:** Retention only counts total users, not unique. However, all event types and properties are available to filter data.

**Signal:** Signal uses only event properties, not user profile properties. However, all event types are available to filter data.

**Users:** All event types and properties are available in Users.

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

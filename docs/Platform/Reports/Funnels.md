---
title: "Funnels"
slug: "funnels-report"
hidden: false
metadata:
  title: "Funnels"
  description: "Learn how to use the Funnels report."
---

# Overview

![https://help.mixpanel.com/hc/article_attachments/360087969411/funnels_result_header.png](https://help.mixpanel.com/hc/article_attachments/360087969411/funnels_result_header.png)

Mixpanel’s Funnels allows you to examine how end-users perform events in a series. Funnels calculate and display the amount of users who convert from one event to another within a particular time window. This allows you to identify where your users drop off, what segments convert the most, and other important facets of the user journey.

# Use Cases

Imagine your product is a B2B messaging application. You might use Funnels to answer these questions:

- What percent of users converted through my signup funnel within 7 days?
- At what step of the signup funnel did most users drop off?
- How did my A/B test impact conversions in the signup funnel?
- How has the payment funnel conversion rate in the US changed over time?
- How long does it take most users to complete my payment funnel?
- What departments complete the payment funnel most often?
- What flows do users take between opening an app and making a purchase?
- Why did the successful users purchase?
- What flows do users take that don’t lead to a purchase?
- How do these two paths differ? What actions should I nudge towards or against?
- What did the users that dropped-off do instead?

# Quick Start

Building a report in Funnels takes just a few clicks, and results arrive in seconds. Let's build a simple report together. Continuing the B2B messaging example, imagine you wanted to answer the following question:

> What marketing UTM medium drove the most signup conversions for users on iOS?
>

Feel free to follow along and create your own report right in our demo project, [here](https://mixpanel.com/register/?next=%2Fproject%2F2195193%2Fview%2F139237%2Fapp%2Ffunnels%3Fredirect%3Dview%2FchartType%3Achart%2CconversionWindow%3A%28unit%3Aday%2Cvalue%3A30%29%2CcountType%3Aunique%2CdateRange%3A%28type%3A%27in%2520the%2520last%27%2Cwindow%3A%28unit%3Aday%2Cvalue%3A30%29). To skip ahead and see the final result, click [here](https://help.mixpanel.com/hc/en-us/articles/-%20[https://help.mixpanel.com/hc/en-us/articles/360019982652#building-your-first-report](https://help.mixpanel.com/hc/en-us/articles/360019982652#building-your-first-report)%20%20%20%20%20-%20[%20]%20%20first%C2%A0**here**%C2%A0to%C2%A0[https://mixpanel.com/register/?next=%2Fproject%2F2195193%2Fview%2F139237%2Fapp%2Ffunnels%3Fredirect%3Dview%2FchartType%3Achart%2CconversionWindow%3A%28unit%3Aday%2Cvalue%3A30%29%2CcountType%3Aunique%2CdateRange%3A%28type%3A%27in%2520the%2520last%27%2Cwindow%3A%28unit%3Aday%2Cvalue%3A30%29](https://mixpanel.com/register/?next=%2Fproject%2F2195193%2Fview%2F139237%2Fapp%2Ffunnels%3Fredirect%3Dview%2FchartType%3Achart%2CconversionWindow%3A%28unit%3Aday%2Cvalue%3A30%29%2CcountType%3Aunique%2CdateRange%3A%28type%3A%27in%2520the%2520last%27%2Cwindow%3A%28unit%3Aday%2Cvalue%3A30%29)%20%20%20%20%20-%20[%20]%20%20second%C2%A0**here**%C2%A0to%C2%A0[https://mixpanel.com/register/?next=%2Fproject%2F2195193%2Fview%2F139237%2Fapp%2Ffunnels%3Fredirect%3Dview%2F11945087%2Fi-os-sign-up-conversion-by-utm-medium](https://mixpanel.com/register/?next=%2Fproject%2F2195193%2Fview%2F139237%2Fapp%2Ffunnels%3Fredirect%3Dview%2F11945087%2Fi-os-sign-up-conversion-by-utm-medium)).

## Step 1: Choose Events

Events are the basic building block of a Funnels report. In this case, imagine we know the signup flow contains five steps. Within the "Steps" section, add one event for each step, in the following order: "Landing Page," "Download Page," "App Install," "App Open," "Sign Up." At this point, your query should look like this:

![https://help.mixpanel.com/hc/article_attachments/360087969431/funnels_1.png](https://help.mixpanel.com/hc/article_attachments/360087969431/funnels_1.png)

## Step 2: Choose Filters

Filters exclude unwanted data. In this case, we only care about events performed on the iOS platform. Therefore, add a "Platform" filter, where Platform equals "iOS Native". At this point, your query should look like this:

![https://help.mixpanel.com/hc/article_attachments/360087905912/funnels_2.png](https://help.mixpanel.com/hc/article_attachments/360087905912/funnels_2.png)

## Step 3: Choose Breakdown

Breakdowns segment data into groups. In this case, we want to break our funnel down by marketing medium, tracked via UTM tags. Therefore, add a "UTM Medium" breakdown. At this point, your query should look like this:

![https://help.mixpanel.com/hc/article_attachments/360087969391/funnels_3.png](https://help.mixpanel.com/hc/article_attachments/360087969391/funnels_3.png)

Congratulations, you've constructed your first Funnels query! Now, it's time to examine the results.

## Step 4: Change Visualization

Funnels features multiple visualizations to help you view the results of your query in the clearest chart type. By default, Funnels displays the Funnel Steps chart, which displays the percentage of users that converted to each subsequent step of the funnel. In this case, the Funnel Steps chart is the perfect visualization, since it will automatically display the UTM medium with the highest overall conversion rate. Your report should look like this:

![https://help.mixpanel.com/hc/article_attachments/360087969411/funnels_result_header.png](https://help.mixpanel.com/hc/article_attachments/360087969411/funnels_result_header.png)

However, you can also visualize the funnel in any of the following chart types, which can give you additional insight:

- Funnel Trend - view changes in the conversion rate, time to conversion, users entering and exiting your over time
- Time to Convert - view a distribution of the time it takes users to convert through the funnel
- Frequency - view the number of times users complete any step before converting or dropping off

# Advanced

## Conversion Criteria

### Conversion Window

The Conversion Window determines how much time a user has to convert through all steps of the funnel after entering it.

By default, all customers have 30 days to complete a funnel from the timestamp they perform the Step 1 event. To adjust this conversion window, click on the words **30 days** in the conversion criteria. You will be able to adjust both the unit of time and the amount.

![https://help.mixpanel.com/hc/article_attachments/4413120858132/Screen_Shot_2021-12-15_at_11.12.25_AM.png](https://help.mixpanel.com/hc/article_attachments/4413120858132/Screen_Shot_2021-12-15_at_11.12.25_AM.png)

The maximum amount of time you can choose for the conversion window is 366 days, or otherwise equivalent (12 months, 52 weeks, etc).

Keep in mind that the conversion window starts on the first instance of the Step 1 event per funnel entry, and will not be updated by later instances of the same event in the same funnel trial.

For example, let's assume a funnel with the following criteria: A → B → C, conversion window of one hour

If the user does A at 1pm and then A again at 1:30pm, before doing B at 1:45pm and C at 2:15pm, they would count as converting to B, but will not be counted as completing the entire funnel to C. This is because 1pm to 2:15pm is greater than one hour. The conversion window for a given funnel trial starts with the first instance of A and is not reset by later instances of A in the same trial. B and C need to be completed within the conversion window from the first instance of A to be counted as conversions.

### Counting Method

Your selected counting method determines how many times Mixpanel will count a particular user's activity towards your conversion rates. Mixpanel Funnels can be calculated by uniques, totals, or sessions.

By default, Funnel calculations are based on **uniques**. To change to a different counting method, click on the word **Uniques** in the conversion criteria, and select between **totals or sessions** from the drop-down list.

![https://help.mixpanel.com/hc/article_attachments/4413107176724/Screen_Shot_2021-12-15_at_10.16.00_AM.png](https://help.mixpanel.com/hc/article_attachments/4413107176724/Screen_Shot_2021-12-15_at_10.16.00_AM.png)

**Uniques**
Unique funnels count a single entry per user (determined by distinct_id). Each user enters the funnel only once, and this is on the first time they perform the Step 1 event in the date range. Even if a particular user completes the funnel multiple times in the date range, they will only be counted towards conversion once, and on the first time they entered in the span of the funnel.

**Totals**
Totals funnels count multiple entries per user.  Users can re-enter the funnel and every time a user enters the funnel they are counted towards conversion. Users may re-enter a totals funnel only after they have exited their previous attempt through the funnel. Users exit a funnel in 3 ways:

1. They complete the funnel and convert to the last step,
2. They fail to complete the funnel in the conversion window and time out,
3. They are excluded from conversion by an exclusion step.

**Sessions**
Sessions funnels count the number of sessions that contain a conversion. Like totals funnels, users will be allowed to re-enter the funnel in subsequent sessions; however, in sessions funnels users must convert through the funnel within the same session they entered the funnel to be counted as converted. If the session ends before they have converted, the user will time out and drop out of the funnel after the last step they reached. Learn more about Sessions [here](https://help.mixpanel.com/hc/en-us/articles/115004695223).

### Ordering

The order control determines how much flexibility there can be to the sequence of your user's actions to be counted as a conversion.

By default, funnels are **specific order**. To change between order designations, click on the words **specific order** in the conversion criteria, and select between **specific order or any order** from the drop-down list.

![https://help.mixpanel.com/hc/article_attachments/4413107307796/Screen_Shot_2021-12-15_at_10.20.13_AM.png](https://help.mixpanel.com/hc/article_attachments/4413107307796/Screen_Shot_2021-12-15_at_10.20.13_AM.png)

**Specific Order**
Specific Order Funnels require the user to complete each of the funnel steps in the order laid out in the query builder to be counted as a conversion from step to step. In other words, Step 1 must be completed before Step 2, which must be completed before Step 3, and so on. The user can engage in other actions in between funnel steps- including additional occurrences of the actions listed as funnels steps- but they will only be counted as converted as long as they complete all the funnel steps in order.

To illustrate with an example, let's say a specific order funnel has steps: A, B, C, D, E

1. The customer does steps A -> B -> C -> D -> E in exact order. Mixpanel counts this as a conversion.
2. The customer does steps A -> B -> ***F*** -> C -> D -> E. Mixpanel counts this as a conversion. Users can do additional actions in between funnels steps and still convert.
3. The customer does steps A -> B -> ***D*** -> C -> D -> E. Mixpanel counts this as a conversion. Even though the customer did an occurrence of D before the first time doing C, because theyeventually did a D after C they will continue to convert.
4. The customer does steps A -> B -> C -> E. Mixpanel will not count this as a full conversion, and the customer will not appear in the funnel after step C. The customer's completion of step E is excluded from the funnel because step D did not occur.

**Any Order**
In Any Order Funnels, users can complete unanchored funnels steps in any particular sequence and still convert. This type of funnel is most useful in situations where a user must ultimately complete all actions to be considered converted, but the exact order is not important.

A good example of this could be a job application flow, where a user must input multiple pieces of information (their name, email address, current job title, credentials, references, cover letter, resume, etc.) in order to complete the form and convert to submit their application, but they can provide all this information in any order they'd like and still proceed towards converting.

To switch to **any order**, expand the "Advanced" menu in the Conversion Criteria and toggle on "Any Order".

![https://help.mixpanel.com/hc/article_attachments/7740685343764/Screen_Shot_2022-07-12_at_3.35.33_PM.png](https://help.mixpanel.com/hc/article_attachments/7740685343764/Screen_Shot_2022-07-12_at_3.35.33_PM.png)

When you switch to **any order,** you have the option to anchor specific steps in your funnel by clicking on the step number.

![https://help.mixpanel.com/hc/article_attachments/4413113617684/CleanShot_2021-12-15_at_11.03.46.gif](https://help.mixpanel.com/hc/article_attachments/4413113617684/CleanShot_2021-12-15_at_11.03.46.gif)

A step will either appear with a number beside it, indicating where it must fall in the funnel, or with an asterix (\*), indicating that it can be performed in any order before the next anchored step.

**Example**:

![https://help.mixpanel.com/hc/article_attachments/360038842012/Untitled_Diagram.jpg](https://help.mixpanel.com/hc/article_attachments/360038842012/Untitled_Diagram.jpg)

In the above example, Steps 1, 4, and 6 must occur as the 1st, 4th, and 6th steps the user performs.Any of the * steps can occur at any time within those boundaries.

## Hold Property Constant

Holding a property constant in a funnel requires that a user retain the same value for a given event property for each step in order to convert. In other words, a user must not only perform the funnel events in the order you specified, but also perform these events with the same property value.

For example, let's say your product is an e-commerce retail site, and you have a three-step funnel of Browse > Add to Cart > Purchase. If you want to examine the conversion of users through this funnel that Browse, Add to Cart, and Purchase the same item - meaning that they cannot convert if they don't complete each step with the same item- you would hold the Item Name property constant.

The way this is calculated depends on whether you have selected a counting method that does not allow users to re-enter the funnel ("Uniques") or allows re-entry ("Totals" or "Sessions).

- **Uniques:** When you select "Uniques" and hold a property constant, because users of this counting method only enter the funnel once and on the first time they do the Step 1 event, Mixpanel will hold constant the property value from the first Step 1 event.
- **Totals or Sessions:** When you select "Totals" or "Sessions" and hold a property constant, since these counting methods allow users to re-enter the funnel, Mixpanel will hold the property constant that is set with each new re-entry at the Step 1 event.

To add a property constant to your funnel, expand the "Advanced" menu in the Conversion Criteria and click on "Holding property constant"

![https://help.mixpanel.com/hc/article_attachments/4413113697428/Screen_Shot_2021-12-15_at_11.10.42_AM.png](https://help.mixpanel.com/hc/article_attachments/4413113697428/Screen_Shot_2021-12-15_at_11.10.42_AM.png)

Some things to keep in mind are that you are only able to select event properties that apply to all of the events in your funnel. Also, you can select multiple properties, but when you do ALL must be kept constant. A maximum of 3 properties can be held constant at the same time.

## Exclusion Steps (Exclude users who did...)

Exclusion steps operate as a "did not do" filter for funnels. This provides the ability to create a funnel where, for example, you look for users that did event A, then event B, did not do event C, but then continue to do D.

At the "Conversion Criteria" section, click on "Advanced" and then on "Exclude users who did...". A dropdown will appear to exclude a step from your funnel.

![https://help.mixpanel.com/hc/article_attachments/7771567761044/mceclip0__2_.png](https://help.mixpanel.com/hc/article_attachments/7771567761044/mceclip0__2_.png)

Select an event from the list and choose whether you would like the event to be excluded between all steps, or between specific steps.

![https://help.mixpanel.com/hc/article_attachments/7771567760404/mceclip1.png](https://help.mixpanel.com/hc/article_attachments/7771567760404/mceclip1.png)

Click the **filter icon** beside the step and click **Add filter** to filter that event by an event or user profile property.

![https://help.mixpanel.com/hc/article_attachments/7771567887124/mceclip2__1_.png](https://help.mixpanel.com/hc/article_attachments/7771567887124/mceclip2__1_.png)

For example, if your product was an e-commerce retail company and you want to understand if users who browse for additional products between adding something to their cart and checking out are less likely to complete a purchase. To answer this question, you could create a funnel with three steps:

Event 1: Browse product

Event 2: Add to Cart

Event 3: Purchase

You can exclude users who did another “Browse product” event between Event 2 and Event 3 to and see how that affects your funnel's conversion rate.

Further example use cases:

1. Evaluate whether a certain step done alone is beneficial to your flow.
2. Ensure that a conversion was NOT the result of another detour step being taken in between two key steps.

### NOTE:

1. An exclusion step can be placed between any steps in the funnel. It cannot be the first or last step.
2. There may be any number of exclusion events between steps.
3. Exclusion steps have the same [two second grace period](https://help.mixpanel.com/hc/en-us/articles/7716920767124#how-does-mixpanel-handle-simultaneous-events) as other steps in the funnel.

## Rename a Step

Click on the "three dots" icon beside a step and click **Rename** to rename it.

![https://help.mixpanel.com/hc/article_attachments/7771574325140/mceclip3__1_.png](https://help.mixpanel.com/hc/article_attachments/7771574325140/mceclip3__1_.png)

## View as Flow

In order to learn more about the behavior users take between funnel steps, we recommend checking the feature "View as Flow". You can see what user flows and behaviors that can increase the likelihood of conversion or dropodd. This helps to answer questions like:

- What flows do users take between opening an app and making a purchase?
- Why did the successful users purchase?
- What flows do users take that don’t lead to a purchase?
- How do these two paths differ? What actions should I nudge towards or against?
- What did the users that dropped-off do instead?

![https://help.mixpanel.com/hc/article_attachments/7771574327060/mceclip19.png](https://help.mixpanel.com/hc/article_attachments/7771574327060/mceclip19.png)

### Using Conversion and Drop-off Flows

First, go to the Mixpanel Funnels Report, and create any funnel you like by selecting 2 or more events steps.

Next, click on the conversion or drop-off population you wish to examine further and select View As Flow.

![https://help.mixpanel.com/hc/article_attachments/7717455374228/cr8695o49k.png](https://help.mixpanel.com/hc/article_attachments/7717455374228/cr8695o49k.png)

In this example, I want to see what events lead to better conversion or more drop-off between Step 1 Browse and Step 2 Add To Cart. This will send me to the Sankey visualization to see these event streams in a Flows report.

Up top, I can see that all of the Funnel's criteria is still maintained. In my example, I still am counting a Unique funnel, within 30 days, holding the Item Name property constant, and excluding users that Abandon Cart at any stage. I can also go back to the Funnel to change my criteria at any time.

![https://help.mixpanel.com/hc/article_attachments/7771486573716/scm5ojo77y.png](https://help.mixpanel.com/hc/article_attachments/7771486573716/scm5ojo77y.png)

The Sankey is automatically broken down by users that eventually converted or did not convert to Add to Cart (Users may not convert because of hitting exclusion steps, or failing to complete the funnel in the conversion window)

![https://help.mixpanel.com/hc/article_attachments/7717457136020/Screen_Shot_2021-05-26_at_7.13.34_AM.png](https://help.mixpanel.com/hc/article_attachments/7717457136020/Screen_Shot_2021-05-26_at_7.13.34_AM.png)

Hovering over any path I can see the size of the population and the percent converted to this action from the previous one.

![https://help.mixpanel.com/hc/article_attachments/7717458989076/rjgjxun5bz.png](https://help.mixpanel.com/hc/article_attachments/7717458989076/rjgjxun5bz.png)

In the example, I can see here that 10.6% converted immediately to Adding to their Cart.

### Lift Actions: What paths are performed more often by users who convert compared those who drop off?

With the recently added lift actions feature, we have made it possible to quickly tell which actions and paths had a higher or lower conversion rate compared to the funnel as a whole.

![https://help.mixpanel.com/hc/article_attachments/7717489439380/Screen_Shot_2021-05-26_at_7.38.50_AM.png](https://help.mixpanel.com/hc/article_attachments/7717489439380/Screen_Shot_2021-05-26_at_7.38.50_AM.png)

In this example, I can see that Users who performed Search Results, had a +24% higher conversion rate compared to overall (51.1% vs. 41.2%). Whereas, users who performed Experiment Started had a -82.4% reduction in conversion rate compared to overall (7.2% vs. 41.2%).By looking at the positive (green) and negative (red) lift actions, you should be able to quickly form hypothesis on which paths and events are likely to result in more or less conversions.

### Filter by Conversion: What are the common paths taken by users who convert?

If you want to do an isolated analysis of conversions, I can apply a filter so that the report will include only conversions.  This is done by clicking on Filter in the query builder and selecting the Conversion property. Setting it to Converted, will filter only to users who have converted.

![https://help.mixpanel.com/hc/article_attachments/7717478913428/l387g5uhw1_1_.png](https://help.mixpanel.com/hc/article_attachments/7717478913428/l387g5uhw1_1_.png)

![https://help.mixpanel.com/hc/article_attachments/7717491465620/Screen_Shot_2021-05-26_at_7.55.31_AM.png](https://help.mixpanel.com/hc/article_attachments/7717491465620/Screen_Shot_2021-05-26_at_7.55.31_AM.png)

In this example, we can see that 35.6% of conversions happened in the first step.

### Filter by drop off: What do users do right before dropping off?

To view what users did before dropping off, change the filter to "Did not Convert", and add more steps before the drop off step

![https://help.mixpanel.com/hc/article_attachments/7717481037972/Screen_Shot_2021-05-26_at_7.58.29_AM.png](https://help.mixpanel.com/hc/article_attachments/7717481037972/Screen_Shot_2021-05-26_at_7.58.29_AM.png)

![https://help.mixpanel.com/hc/article_attachments/7717493572372/Screen_Shot_2021-05-26_at_7.59.51_AM.png](https://help.mixpanel.com/hc/article_attachments/7717493572372/Screen_Shot_2021-05-26_at_7.59.51_AM.png)

Now, I can see that 33.7% of users who did not convert, did the "Join Loyalty Program" before dropping off. I can use this hypothesis to evaluate the business impact of the loyalty program, and perhaps make some changes to the product.

## Funnel Trends

Select **Funnel trends** from the drop-down list to see the percentage of successful conversions from the first event in the funnel to the last event in the funnel for a day, week, or month.

A user that completes the funnel within the conversion window is counted on the day, week, or month corresponding to when they performed the first event in the funnel.

![https://help.mixpanel.com/hc/article_attachments/7740014694036/mceclip0.png](https://help.mixpanel.com/hc/article_attachments/7740014694036/mceclip0.png)

By default this chart shows the conversion rate. Click on **Conversion** to view the options Time to Convert, Top of Funnel, and Bottom of Funnel.

![https://help.mixpanel.com/hc/article_attachments/7740066798356/Screen_Shot_2022-07-12_at_3.13.13_PM.png](https://help.mixpanel.com/hc/article_attachments/7740066798356/Screen_Shot_2022-07-12_at_3.13.13_PM.png)

### Data Table

Trends charts in Funnels are accompanied with a table of values to give users another way to consume the trends information. This data table can also be sorted by clicking column headers.

Click on a "data column" header to sort by that column. Click the header again to reverse the sort order. The table below is sorted by event counts on August 2nd:

![https://help.mixpanel.com/hc/article_attachments/7771448361492/mceclip0__1_.png](https://help.mixpanel.com/hc/article_attachments/7771448361492/mceclip0__1_.png)

### Time to Convert Trend

**Time to Convert** allows you to see how the amount of time it takes users to convert through your funnel has changed over time.

![https://help.mixpanel.com/hc/article_attachments/7740111023124/Screen_Shot_2022-07-12_at_3.14.29_PM.png](https://help.mixpanel.com/hc/article_attachments/7740111023124/Screen_Shot_2022-07-12_at_3.14.29_PM.png)

Generally speaking, a shorter conversion time is ideal. If your Trends chart shows that your conversion time is increasing, there may be a usability issue on your app making it more difficult for users toconvert.

### Top of Funnel

**Top of Funnel** allows you to see the trend of the count of users who entered the funnel.

Note that if you use the step counter at the top to view only "Step 2 to Step 3" for example, rather than All Steps, then the top of the funnel would be the count of users who entered step 2 over time.

![https://help.mixpanel.com/hc/article_attachments/7740113570580/Screen_Shot_2022-07-12_at_3.15.04_PM.png](https://help.mixpanel.com/hc/article_attachments/7740113570580/Screen_Shot_2022-07-12_at_3.15.04_PM.png)

### Bottom of Funnel

**Bottom of Funnel** allows you to see the trend of the count of users who converted through the funnel.

Note that if you use the step counter at the top to view only "Step 2 to Step 3" for example, rather than All Steps, then the bottom of the funnel would be the count of users who converted to step 3 over time.

![https://help.mixpanel.com/hc/article_attachments/7740236667028/Screen_Shot_2022-07-12_at_3.17.26_PM.png](https://help.mixpanel.com/hc/article_attachments/7740236667028/Screen_Shot_2022-07-12_at_3.17.26_PM.png)

## Time to Convert

Select **Time to convert** from the drop-down list to see how long users take to convert through your funnel

![https://help.mixpanel.com/hc/article_attachments/7740240339092/Screen_Shot_2022-07-12_at_3.18.09_PM.png](https://help.mixpanel.com/hc/article_attachments/7740240339092/Screen_Shot_2022-07-12_at_3.18.09_PM.png)

By default the interval for this chart is 2 days, but you can click on **Interval size** at the top of the chart to edit this.

![https://help.mixpanel.com/hc/article_attachments/7740232592660/Screen_Shot_2022-07-12_at_3.19.06_PM.png](https://help.mixpanel.com/hc/article_attachments/7740232592660/Screen_Shot_2022-07-12_at_3.19.06_PM.png)

You can choose to switch between viewing percentage or whole numbers in the chart by clicking **%** or**#** in the top right of the chart.

The dotted line indicates the median of the chart.

The chart updates if you select a specific step in the funnel above to indicate the conversion rate up to that step, rather than the full funnel.

Click on a segment of the bar chart to view users or zoom in on that segment. After viewing those users, you can also create a cohort of those users. If your users are converting within a small window of time, as seen above, it is useful to zoom into that bar in order to see a more clear breakdown of the range of time users are taking to convert.

![https://help.mixpanel.com/hc/article_attachments/7740332080788/Screen_Shot_2022-07-12_at_3.20.22_PM.png](https://help.mixpanel.com/hc/article_attachments/7740332080788/Screen_Shot_2022-07-12_at_3.20.22_PM.png)

## Frequency

Select **Frequency** from the drop-down list to see the number of times users performed a step before moving to the next step. For example, see the number of times a user listened to a song before purchasing the song.

![https://help.mixpanel.com/hc/article_attachments/7740372727316/Screen_Shot_2022-07-12_at_3.24.24_PM.png](https://help.mixpanel.com/hc/article_attachments/7740372727316/Screen_Shot_2022-07-12_at_3.24.24_PM.png)

By default this chart will show the frequency of steps performed from step 1 to step 2. You can change this by clicking on the drop-down beside the chart selector.

Edit the frequency interval by clicking on **Interval size** above the chart. A drop-down window gives you the option to change the frequency interval in order to bucket the numbers in the chart. For example, enter a frequency interval of 5 to have each line of the chart grouped by intervals of 5.

![https://help.mixpanel.com/hc/article_attachments/7740445911572/Screen_Shot_2022-07-12_at_3.25.59_PM.png](https://help.mixpanel.com/hc/article_attachments/7740445911572/Screen_Shot_2022-07-12_at_3.25.59_PM.png)

You can also enter the minimum and maximum number of frequencies in the interval dropdown. For example, in the image above the maximum is 10, so all frequencies above 10 are grouped at the bottom of the chart.

You can switch between viewing Conversion Counts to viewing Conversion Rates or Dropoff Count by clicking on **Conversion Count** at the top of the chart.

![https://help.mixpanel.com/hc/article_attachments/7740452165908/Screen_Shot_2022-07-12_at_3.27.30_PM.png](https://help.mixpanel.com/hc/article_attachments/7740452165908/Screen_Shot_2022-07-12_at_3.27.30_PM.png)

Conversion Count shows you the number of users that converted who performed the event at a specific frequency. Conversion Rate shows you the percentage of users that converted who performed the event at a specific frequency. Dropoff Count shows you the number of times a user performed a step before dropping off the funnel.

## Top Paths

If you have selected **any order** for your funnels steps, you have the option to select **Top paths** from the drop-down list to view a Sankey visualization of how your users are performing the steps in your funnel.

![https://help.mixpanel.com/hc/article_attachments/7740547040276/Screen_Shot_2022-07-12_at_3.30.32_PM.png](https://help.mixpanel.com/hc/article_attachments/7740547040276/Screen_Shot_2022-07-12_at_3.30.32_PM.png)

## Comparison Events

You can select multiple events at a particular step in a funnel, and Mixpanel will compute a segmented funnel that shows what percent of users reached each of these comparison events.

To do this, click on the "..." and select "add event comparison"

![https://help.mixpanel.com/hc/article_attachments/7771504777236/xvjcq1dbb2_1_.png](https://help.mixpanel.com/hc/article_attachments/7771504777236/xvjcq1dbb2_1_.png)

Check out the video below for more information and an example use case.

## Advanced Breakdown Functionality

### User Count in Breakdown

When grouping or filtering the results of your funnel, user count will be determined by the number of unique users for each property combination.

For example, if you are an e-commerce site grouping by the property “item” to determine what users are searching for and purchasing, users will appear in the table once for each property they use. In a funnel where Event A is “Search”, Event B is “Add to Cart”, and Event C is “Purchase”, a user may complete the funnel twice, once with the property “hat”, and once with the property “shirt”. This user would convert through the funnel, and be counted in the Group By table for both “hat” and “shirt” when grouping by property “item”. They would be counted in the “overall” row as completing the funnel once.

This behavior matches how users are counted when filtering by property: if a user goes through the entire funnel X times with Y distinct event property values, the user will be counted Y times.

### Statistical Significance

Statistical significance in funnels validates an increase or decrease in conversion rate for a property or cohort segment. It attempts to identify random chance with respect to overall conversion. A p-value indicating statistical significance is calculated in the overview table when you choose a property or cohort to group by.

In statistical hypothesis testing, the p-value or probability value is the probability that the variation in a segment’s conversion rate, compared to the overall conversion rate, is not driven by a random chance. This value is shown for every segment by default. To learn more about how this is calculated, click [here](https://help.mixpanel.com/hc/en-us/articles/7716920767124-Funnels-FAQ#how-does-mixpanel-calculate-statistical-significance).

In order to clarify this statistical significance, the segmentation chart shows the confidence level of each segment. Confidence level is defined as 1 - p.

- > 0.95 = statistically significant, indicated in green. This variation in conversion rate is likely **not** driven by random chance.
- < 0.95 = not statistically significant, indicated in red. This variation in conversion rate is likely driven by random chance.

![https://help.mixpanel.com/hc/article_attachments/7717110311188/Screen_Shot_2019-10-28_at_2.28.54_PM.png](https://help.mixpanel.com/hc/article_attachments/7717110311188/Screen_Shot_2019-10-28_at_2.28.54_PM.png)

Scrolling further down the table takes you to the statistically insignificant segments. If a segment has less than 30 samples, p-value is not shown, as the sample size is too low to detect difference from overall population. This is indicated by “Insufficient samples”.

The number of samples is the same as the count of entries into the funnel. If the funnel is looking at the unique count, this is the number of unique users who entered the funnel in that segment. If the funnel is looking at total count, this is the total number of entries into the funnel in that segment.

You can choose to sort by any of the columns of the overall table in descending or ascending order by clicking on the header. If you sort by statistical significance, values with confidence level of > 0.95 are shown first, and then values with confidence level < 0.95. The secondary sorting is determined by the overall conversion rate for the funnel.

Click on the **dot** beside the statistical significance number to make that property value the Control value that the other property values are compared to. To return to the default view, click the **dot** beside “Overall”.

![https://help.mixpanel.com/hc/article_attachments/7717111134228/Oct-28-2019_10-35-23.gif](https://help.mixpanel.com/hc/article_attachments/7717111134228/Oct-28-2019_10-35-23.gif)

## Property Attribution

### First Touch vs Last Touch

Event property values can vary from step to step in your funnel. For example, a user may select a blue shirt in step 1, but put a red shirt in their cart in step 3. If you want to control when the property value is locked in for all steps of your funnel, you can use property attribution.

To access this feature, filter or breakdown by a property in the funnel chart below the query builder. Click on **Last touch** to select either “Last touch”, “First touch”, or a specific step number.

![https://help.mixpanel.com/hc/article_attachments/7740591409684/Screen_Shot_2022-07-12_at_3.33.03_PM.png](https://help.mixpanel.com/hc/article_attachments/7740591409684/Screen_Shot_2022-07-12_at_3.33.03_PM.png)

Your selected choice will determine which step of your funnel determines the property value for the whole funnel.

### First Touch Attribution and Forwardfilling

By default, Mixpanel “forwardfills” [event properties](https://help.mixpanel.com/hc/en-us/articles/115004708186-Event-Properties-Super-Properties-People-Properties) in instances where properties are sent in earlier steps of a Funnel but not sent in subsequent steps of the same funnel. This means that the property that is present in early steps of a funnel is appended to the later steps of the funnel where it was previously absent.

Select **First touch** to attribute the first property value to the whole funnel, regardless of whether the property value changes in subsequent steps. First touch is not the same as the first step of the funnel, rather it is the first time the property is given a non-null defined value.

For example, say that the user is shopping on your website and you want to track a funnel from Log In to Purchase. There are three events in this journey: Log In, Item View, and Purchase. Each event has its own properties, and the “Name” property is only sent with the “Log In” event. This property will be added to the subsequent events, where it was previously absent:

![https://help.mixpanel.com/hc/article_attachments/7771507143060/ForwardfillingDiagram.png](https://help.mixpanel.com/hc/article_attachments/7771507143060/ForwardfillingDiagram.png)

As you can see in the diagram above, the property of “Name” is only a property for the event “Log In”, but that property is forwardfilled to the subsequent events.

### Last Touch Attribution and Backfilling

By default, Mixpanel “backfills” [event properties](https://help.mixpanel.com/hc/en-us/articles/115004708186-Event-Properties-Super-Properties-People-Properties) in instances where properties are sent in later steps of a Funnel but not sent in the earlier steps of the same funnel. This means that the property that is present in later steps of a funnel is appended to the earlier steps of the funnel where it was previously absent.

Select **Last touch** to attribute the last property value to the whole funnel, regardless of the property value in previous steps. Last touch is not the same as the last step of the funnel, rather it is the last time the property is given a non-null defined value.

For example, the user shopping on your website chooses to buy a shirt that costs $5. In this instance, properties of the item that is purchased are not sent until the “Purchase” event, so the property is backfilled and added to the “Item View” and “Log In” events:

[https://help.mixpanel.com/hc/article_attachments/11544922524820](https://help.mixpanel.com/hc/article_attachments/11544922524820)

As you can see, the property of “Item Price” is only a property of the event “Purchase”, but that property backfilled to the previous two steps. Also, the properties sent with the event “Item View” are backfilled to “Log In”.

If an event property is sent with all steps of a funnel but the value of the property changes across steps, then the most recent value is applied to all steps of the Funnel.

For example, the user shopping on your website views a blue shirt and adds it to their cart. However, when they make their purchase, they have changed their mind and decided to get a red shirt instead:

![https://help.mixpanel.com/hc/article_attachments/7771542862868/BackfillingReplaceDiagram.png](https://help.mixpanel.com/hc/article_attachments/7771542862868/BackfillingReplaceDiagram.png)

As you can see, the property of “Item Color” is Blue for Event 2, but changes to Red for Event 3. As a result of backfilling, the property of “Item Color” will be appended to Red in the “Item View” event, and further backfilled to “Log In”  as well.

### Per-Step Attribution

You can choose to attribute a property value from any step to the whole funnel by selecting the step number. Note that with this option you may see an "undefined" null value for the property, as this option is not tied to when the property value was defined.

For example, the user viewing your website encounters an error and sends in a support ticket to your business. On first touch they may have been using Safari as their browser, and used Safari to send in the support ticket at last touch, but they were using Chrome when they triggered an error-state. It is relevant for your business to know that they triggered an error on the Chrome browser and not Safari, in order to assist them in fixing the error.

## Create Cohorts from Funnels

You can create a cohort from a funnel segment in order to examine that group of users more closely. Learn more about this feature [here](https://help.mixpanel.com/hc/en-us/articles/360025670271).

# FAQ

## Can users do other actions during the funnel?

Users can complete the steps you designate in your funnel in loose order. Loose order means that a customer can engage in other actions in between funnel steps, as long as they complete all the funnel steps in order. Let's start with an example where the funnel has steps: A, B, C, D, E and go through a few cases:

1. The customer does steps A -> B -> C -> D -> E in exact order. Mixpanel counts this as a conversion.
2. The customer does steps A -> B -> *F* -> C -> D -> E. Mixpanel counts this as a conversion. This is an example of loose ordering.
3. The customer does steps A -> B -> C -> E. Mixpanel will not count this as a full conversion, and the customer will not appear in the funnel after step C. The customer's completion of step E is excluded from the funnel because step D did not occur.

## Why do I get differing numbers when comparing Funnels and Insights?

Funnels and Insights have different default counting methods. Insights by default counts events using "Totals", whereas Funnels are by default calculated with the Conversion Criteria in "Uniques".

Funnels uses "Uniques" as its default as it is intended to help you gauge your product's effectiveness in urging your users to complete certain flows (e.g. Registration, Purchase). If the numbers were in Totals, a few select power users could skew your data. Each user will only be counted once for a funnel within any given time period you set. The Funnels report with 'Unique' conversion criteria will show only the conversion rates/steps the first time a user enters the funnel, even if they complete or drop out of the funnel multiple times, hence giving a 'Unique' count.You can toggle the conversion criteria to 'Total' or 'Sessions' counting method. Please note that not every Step 1 event will enter a 'Total' conversion funnel. Learn more about counting methods [here](https://help.mixpanel.com/hc/en-us/articles/360029190092-Advanced-Funnels-Functionality).

## Can multiple events count towards the same Funnel step?

Custom events were designed to specifically target this exact issue. With custom events, you can essentially "combine" events into a single event so that you can create Funnels that measure the following:

**Step 1:** Event A OR Event B

**Step 2:** Event C

This allows users to make multiple paths to the same end goal. Learn more about creating custom events [here](https://help.mixpanel.com/hc/en-us/articles/115004562246).

## How does Mixpanel handle simultaneous events?

Mixpanel Funnels include a built-in two second grace period. This means any consecutive steps that have timestamps within two seconds of one another are interchangeable. This window allows for inconsistencies that arise with cross-platform tracking, batch event sending, mobile time tracking, or variations in connection speed.

What does this mean in terms of your funnel? In a funnel with step A -> B, if a user completes event B first and then performs event A within two seconds, Mixpanel counts this as a conversion from A -> B or B -> A.

## What is the difference between Per-Step Filtering and Global Filtering?

You can use both per-step and global filters to decide which users and events to include in a funnel. While per-step filters only apply to a single step and global filters apply to all steps in a funnel, there is more to the distinction than just that.

Next, let's expand on the differences between per-step (pre-query) and global (post-query) filtering and how it can affect your results.

### Per-Step Filtering (Pre-Query)

Per-step filters allow you to apply event or user property filters to each step of your funnel. This adds granularity and specificity to your conversion criteria. In selecting a per-step filter, you are tightening the parameters of events that qualify for conversion.

Per-step filters are performed pre-query. Thus, these filters will impact your funnel’s conversion by removing events that don’t qualify from consideration of being included in a funnel calculation.

Let's illustrate this with some examples.

Consider a four-step funnel where a user must Search > Item Detail Page > Add to Cart > Complete Purchase, all within a one-day conversion window.

As you can see in the below activity feed, this user's first Search event happens more than one day before any Item Detail Pages, and as such, they would not convert in this funnel.

![https://help.mixpanel.com/hc/article_attachments/7717019439124/mceclip12.png](https://help.mixpanel.com/hc/article_attachments/7717019439124/mceclip12.png)

![https://help.mixpanel.com/hc/article_attachments/7717019435924/mceclip11.png](https://help.mixpanel.com/hc/article_attachments/7717019435924/mceclip11.png)

However, if I put a per step filter on the Search event and require a user to use a Brower = Safari, then I will restrict entry into the funnel to only Search events on Safari browsers.

Below we see the same user's activity stream where their first Search event is with the Chrome browser, and thus this user’s first Search event **is not** included in a funnels calculation. However they have a second Search that is using Safari, and this event qualifies them to enter into the funnel. Unlike before when we did not filter, now each of their subsequent steps happens within the conversion window, and this user reaches full conversion to the end of the funnel.

![https://help.mixpanel.com/hc/article_attachments/7717020794900/mceclip14.png](https://help.mixpanel.com/hc/article_attachments/7717020794900/mceclip14.png)

![https://help.mixpanel.com/hc/article_attachments/7717067333012/mceclip13.png](https://help.mixpanel.com/hc/article_attachments/7717067333012/mceclip13.png)

If we were to take it further and place a per-step filter on each and every step in this funnel, so that all steps must be completed with events where Browser = Safari, then this user would only convert to the second step of the Item Detail.

This is because, as we can see below, the first Search/Safari step is followed by two steps that aren’t tracked in the funnel: *Item Detail Page/Chrome* that is filtered out of this funnel because it does not fulfill the Browser= Safari criteria, and *Add to Cart/Safari* that is not considered because it is not preceded by an Item Detail Page/Safari. The next step that is tracked in the funnel (Item Detail Page/Safari) converts the user to Step 2, but then *Add to Cart/Chrome* is filtered out of the funnel. Since there is not another Add to Cart/Safari before the Purchase event or before the 1 day conversion window runs out, this user times out of the funnel after Step 2.

![https://help.mixpanel.com/hc/article_attachments/7717068737556/mceclip15.png](https://help.mixpanel.com/hc/article_attachments/7717068737556/mceclip15.png)

![https://help.mixpanel.com/hc/article_attachments/7717068736788/mceclip16.png](https://help.mixpanel.com/hc/article_attachments/7717068736788/mceclip16.png)

### Global Filtering (Post-Query)

Global filters apply your selected filters to the entire report after the Funnels query has been run. Since Funnels will calculate conversions first and then apply your global filters, entire conversions with any part that does not meet these filter requirements will be excluded from the report's results.

For example, let's use the same four-step funnel where a user must Seach > Item Detail Page > Add to Cart > Complete Purchase, all within a one-day conversion window.

In the below example, the Funnels query will calculate a conversion because the user moves from Search, then Item Detail Page, then Add to Cart and lastly to Purchase within the 1 day conversion window. However, after the query is calculated, the global filter of Browser = Safari is applied. Since there are steps of this calculated funnel that have Browser = Chrome, the entire funnel will be filtered out of the aggregate results.

![https://help.mixpanel.com/hc/article_attachments/7717070280980/mceclip18.png](https://help.mixpanel.com/hc/article_attachments/7717070280980/mceclip18.png)

![https://help.mixpanel.com/hc/article_attachments/7717070277396/mceclip17.png](https://help.mixpanel.com/hc/article_attachments/7717070277396/mceclip17.png)

## How does Mixpanel calculate statistical significance?

**Note**

This section is intended for users who want to understand the mathematics involved in statistical significance in depth.

To determine whether a particular segment’s conversion rate is significantly different from the overall conversion rate, we use a hypergeometric distribution to calculate statistical significance. The hypergeometric distribution is used to model the probability of picking k items of a particular type in n attempts without replacement from a population of size N having K items of the same type.

For example, let’s say we have a sock drawer with 20 socks, 10 blue and 10 red. If we randomly picked 10 socks one at time from the drawer without putting them back between picks, and we wanted to know the probability of 9 of those socks being red and 1 of them being blue, we would use a hypergeometric distribution to calculate that.

This is applied to funnels by considering the total number of users who enter the funnel to be a finite population of size N, out of which a subset of users convert (K). We then estimate the probability of getting k conversions in a particular segment (given that there were n users who entered the funnel in that segment) if users in that particular segment were picked at random from the overall user set. The higher the probability, the higher likelihood that variations we see in conversion rate are due to random chance.

To calculate the actual p-value, we estimate the hypergeometric cumulative distribution function (CDF) for N, K, n.

![https://help.mixpanel.com/hc/article_attachments/7717018175252/Screen_Shot_2019-03-14_at_1.49.33_PM.png](https://help.mixpanel.com/hc/article_attachments/7717018175252/Screen_Shot_2019-03-14_at_1.49.33_PM.png)

In the CDF, the value of any point (X) represents the probability that a random draw would result in fewer conversions P(k < X). 1 - P(k < X) represents the probability that a random draw would result in more conversions P(k >= X).

These two probabilities are used to represent the probability that the selected segment will either outperform (P(k < X)) or underperform (P(k > X)) the overall set of users. Mixpanel takes the higher probability of the two, and calculate the p-value as 1 - max(P(outperform), P(underperform)).

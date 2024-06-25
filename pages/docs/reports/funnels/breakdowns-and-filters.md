# Breakdowns and Filters

## Overview
Funnels measure sequences of events as a behavior, which adds complexity when filters and breakdowns are applied. This article will go over the Funnels property attribution mechanism, as well as the impact of filters and breakdowns on your funnel results. 

## Funnels Property Attribution
A funnel measures multiple events in sequence, and in many cases, event property values can vary from step to step in your funnel. For example, a user may select a blue shirt in step 1, but put a red shirt in their cart in step 3. When you apply an event property filter or breakdown in a Funnels report, we select one of the steps in the funnel entry and use the event property value in that step to represent the entire funnel entry through a property attribution mechanism.

To configure your property attribution model, add an event property filter or breakdown. The option to choose which step to segment and filter your funnels on will appear in the bottom left corner of the Conversion Criteria module below your measurement selection.

<img width="492" alt="Screenshot 2024-06-24 at 10 33 45 PM" src="https://github.com/mixpanel/docs/assets/97630035/68269785-78f2-474a-a92f-8506c34dee9d">

Your selected choice will determine which step of your funnel determines the property value segment for that entire funnel.

## First Step Defined Attribution and Forwardfilling

By default, Mixpanel “forwardfills” [event properties](/docs/data-structure/events-and-properties) in instances where properties are sent in earlier steps of a Funnel but not sent in subsequent steps of the same funnel. This means that the property that is present in early steps of a funnel is appended to the later steps of the funnel where it was previously absent.

Select **First Step Defined** to attribute the first property value to the whole funnel, regardless of whether the property value changes in subsequent steps. First Step Defined is not the same as the first step of the funnel, rather it is the first time the property is given a non-null defined value.

For example, say that the user is shopping on your website and you want to track a funnel from Log In to Purchase. There are three events in this journey: Log In, Item View, and Purchase. Each event has its own properties, and the “Name” property is only sent with the “Log In” event. This property will be added to the subsequent events, where it was previously absent:

![/ForwardfillingDiagram.png](/ForwardfillingDiagram.png)

As you can see in the diagram above, the property of “Name” is only a property for the event “Log In”, but that property is forwardfilled to the subsequent events.

## Last Step Defined Attribution and Backfilling

By default, Mixpanel “backfills” [event properties](/docs/data-structure/events-and-properties) in instances where properties are sent in later steps of a Funnel but not sent in the earlier steps of the same funnel. This means that the property that is present in later steps of a funnel is appended to the earlier steps of the funnel where it was previously absent.

Select **Last Step Defined** to attribute the last property value to the whole funnel, regardless of the property value in previous steps. Last Step Defined is not the same as the last step of the funnel, rather it is the last time the property is given a non-null defined value.

For example, the user shopping on your website chooses to buy a shirt that costs $5. In this instance, properties of the item that is purchased are not sent until the “Purchase” event, so the property is backfilled and added to the “Item View” and “Log In” events:

![/11544922524820.png](/11544922524820.png)

As you can see, the property of “Item Price” is only a property of the event “Purchase”, but that property backfilled to the previous two steps. Also, the properties sent with the event “Item View” are backfilled to “Log In”.

If an event property is sent with all steps of a funnel but the value of the property changes across steps, then the most recent value is applied to all steps of the Funnel.

For example, the user shopping on your website views a blue shirt and adds it to their cart. However, when they make their purchase, they have changed their mind and decided to get a red shirt instead:

![/BackfillingReplaceDiagram.png](/BackfillingReplaceDiagram.png)

As you can see, the property of “Item Color” is Blue for Event 2, but changes to Red for Event 3. As a result of backfilling, the property of “Item Color” will be appended to Red in the “Item View” event, and further backfilled to “Log In”  as well.

## Per-Step Attribution

You can choose to attribute a property value from any step to the whole funnel by selecting the step number. Note that with this option you may see an "undefined" null value for the property, as this option is not tied to when the property value was defined.

For example, the user viewing your website encounters an error and sends in a support ticket to your business. On First Step Defined they may have been using Safari as their browser, and used Safari to send in the support ticket at Last Step Defined, but they were using Chrome when they triggered an error-state. It is relevant for your business to know that they triggered an error on the Chrome browser and not Safari, in order to assist them in fixing the error.

## Filters

You can use both in-line filters and global filters to decide which users and events to include in a funnel. While in-line filters only apply to a single step and global filters apply to all steps in a funnel, property attribution leads to some additional distinctions to highlight.

Let's expand on the differences between in-line (pre-query) and global (post-query) filtering and how it can affect your Funnels result.

### In-line Filtering (Pre-Query)

In-line filters allow you to apply event or user property filters to each step of your funnel. This adds granularity and specificity to your conversion criteria. In selecting an In-line filter, you are tightening the parameters of events that qualify for conversion.

In-line filters are performed pre-query. Thus, these filters will impact your funnel’s conversion by removing events that don’t qualify for consideration of being included in a funnel calculation.

In-line filters are not affected by 

Let's illustrate this with some examples.

Consider a four-step funnel where a user must Search > Item Detail Page > Add to Cart > Complete Purchase, all within a one-day conversion window.

As you can see in the below activity feed, this user's first Search event happens more than one day before any Item Detail Pages, and as such, they would not convert in this funnel.

![image](https://github.com/mixpanel/docs/assets/2077899/5d671e0b-5666-4ec5-971a-cfaf3734929a)

![image](https://github.com/mixpanel/docs/assets/2077899/eb848af7-4cef-4eb5-8a60-36c88a6fd64f)

However, if I put an in-line filter on the Search event and require a user to use a Brower = Safari, then I will restrict entry into the funnel to only Search events on Safari browsers.

Below we see the same user's activity stream where their first Search event is with the Chrome browser, and thus this user’s first Search event **is not** included in a funnels calculation. However they have a second Search that is using Safari, and this event qualifies them to enter into the funnel. Unlike before when we did not filter, now each of their subsequent steps happens within the conversion window, and this user reaches full conversion to the end of the funnel.

![image](https://github.com/mixpanel/docs/assets/2077899/6daf8f38-afaf-48dd-994e-7f7be682cc92)

![image](https://github.com/mixpanel/docs/assets/2077899/a025b018-cecc-4798-9b95-b907ad157b5e)

If we were to take it further and place an in-line filter on each and every step in this funnel, so that all steps must be completed with events where Browser = Safari, then this user would only convert to the second step of the Item Detail.

This is because, as we can see below, the first Search/Safari step is followed by two steps that aren’t tracked in the funnel: *Item Detail Page/Chrome* that is filtered out of this funnel because it does not fulfill the Browser= Safari criteria, and *Add to Cart/Safari* that is not considered because it is not preceded by an Item Detail Page/Safari. The next step that is tracked in the funnel (Item Detail Page/Safari) converts the user to Step 2, but then *Add to Cart/Chrome* is filtered out of the funnel. Since there is not another Add to Cart/Safari before the Purchase event or before the 1 day conversion window runs out, this user times out of the funnel after Step 2.

![image](https://github.com/mixpanel/docs/assets/2077899/d2425bf0-5d61-4bf3-ad2f-861fa65f3563)

![image](https://github.com/mixpanel/docs/assets/2077899/c91178bc-f358-44fd-ada8-ca786d690354)

### Global Filtering (Post-Query)

Global filters apply your selected filters to the entire report after the Funnels query has been run. Since Funnels will calculate conversions first and then apply your global filters, entire conversions with any part that does not meet these filter requirements will be excluded from the report's results.

For example, let's use the same four-step funnel where a user must Seach > Item Detail Page > Add to Cart > Complete Purchase, all within a one-day conversion window.

In the below example, the Funnels query will calculate a conversion because the user moves from Search, then Item Detail Page, then Add to Cart and lastly to Purchase within the 1 day conversion window. However, after the query is calculated, the global filter of Browser = Safari is applied. Since there are steps of this calculated funnel that have Browser = Chrome, the entire funnel will be filtered out of the aggregate results.

![image](https://github.com/mixpanel/docs/assets/2077899/ef83cca5-5108-4d06-a111-5c2b7e93a492)

![image](https://github.com/mixpanel/docs/assets/2077899/2335dc77-4dac-48d8-a56d-66deefadbc11)

## Breakdowns
When grouping or filtering the results of your funnel, the user count will be determined by the number of unique users for each property combination.

For example, if you are an e-commerce site grouping by the property “item” to determine what users are searching for and purchasing, users will appear in the table once for each property they use. In a funnel where Event A is “Search”, Event B is “Add to Cart”, and Event C is “Purchase”, a user may complete the funnel twice, once with the property “hat”, and once with the property “shirt”. This user would convert through the funnel, and be counted in the Group By table for both “hat” and “shirt” when grouping by property “item”. They would be counted in the “overall” row as completing the funnel once.

This behavior matches how users are counted when filtering by property: if a user goes through the entire funnel X times with Y distinct event property values, the user will be counted Y times.

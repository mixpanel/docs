---
title: "Pricing & Plans"
slug: "pricing-plans"
hidden: false
createdAt: "2023-03-27T17:39:02.165Z"
updatedAt: "2023-03-27T17:39:02.165Z"
metadata:
  title: "Pricing & Plans"
  description: "TODO Fill in"
---

Mixpanel supports two pricing models, Events and MTUs. We recommend events as the best fit for most companies. Our [sales and success teams](https://mixpanel.com/contact-us/sales/) are always available to help determine the best plan for your needs.

# Events Pricing

## What is an Event?

Events represent interactions between a user and your product. Think about events that you want to measure and understand. Is it a purchase? Video views? Friend requests? The first step is to send that data to Mixpanel. Our flexible data model lets you bring in events easily by connecting Mixpanel to your CDP, data warehouse, or in-house data pipelines. You can also install a Mixpanel SDK.

Events-based pricing calculates the amount you owe based on the number of events across all projects in each period. For eligible plans, you can choose to purchase monthly or annually.

There are three event-based billing plans to choose from: Free, Growth, and Enterprise. Refer to our [pricing page](https://mixpanel.com/pricing/) for more information on the benefits and features of each plan.

## Monthly Events Calculation

It depends on your number of active users and the number of events (interactions) a typical active user performs in your product every month (or year). These interactions include client-side engagement events (e.g., search, purchase, video view), server-side events (e.g., sign up, account upgrade), and messaging events (e.g., email sent, email opened, etc.). 

We encourage new customers to get started on the free plan and then upgrade once they have an estimate of their volume. An organization is charged based on the total number of events across all projects. 

## Excluded Events

Certain events and API updates are non-qualifying and excluded from the Monthly Events calculation:

- $identify
- $create_alias
- $merge
- $web_event

## Estimate Events Usage

If you haven’t implemented tracking yet, you can estimate your current event usage by multiplying the number of MAUs (Monthly Active Users) you have to engage with your product by the estimated number of interactions (events you plan to track) each user performs every month. For reference, only a few companies track more than 200 events/user on our free plans. We typically see around 50 events/user.

## View Events Usage

If you are currently tracking data, you can see your events consumption in your Organization Settings.

Click on the gear icon in the upper right corner of Mixpanel, and select your organization under ORGANIZATION SETTINGS.

From here, you can quickly view the usage this billing period as well as the current plan under Plan Details & Billing:

![Plan Details and Billing](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/plan-details-and-billing.png)

To view detailed historical data usage or download a CSV of historical usage for each project, click on View Historical Usage in the top right of Plan Details & Billing. This will show you a graph of your usage over time, as well usage for each project in your organization for the last 12 months. This feature is accessible by all users and can be downloaded to a CSV file.

![Events Usage](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/events-usage.png)

# MTU Pricing

## What is an MTU?

Monthly Tracked User (MTU) is a way to calculate your billing based on the number of visitors that perform a qualifying event each month, rather than individual user profiles or events. 

## MTU Calculation

An MTU is a visitor that tracks at least one qualifying event within your projects within the calendar month, independent of whether they have a user profile in Explore. Mixpanel determines unique users using the distinct_id. Users are only counted once per month, even if they perform multiple actions across devices.

An organization is charged based on the total number of MTUs across all projects. This means that if a user performs a qualifying event in multiple projects, they are counted once per project. MTUs are *not* User Profiles – the number of MTUs in your project will not match the number of User Profiles in your project.

## MTU Guardrail

In most cases, the tally of MTUs is equal to the number of distinct_ids who have performed a tracked event this month. The only exception to this rule is if your users average more than 1000 events each, in which case MTUs are equal to:

Total number of events / 1000

This is a rare threshold to exceed, but you can customize an Insights report to confirm your average user triggers fewer than 1000 events per month.

## Excluded Events

Certain events and API updates are non-qualifying and excluded from the MTU calculation:

- $identify
- $create_alias
- $merge
- Message Sent ($campaign_delivery)
- Message Received ($campaign_received)
- Message Bounced ($campaign_bounced)
- Message Marked Spam ($campaign_marked_spam)
- Message Suppressed ($message_suppressed)
- Message Unsubscribed ($unsubscribe)
- Campaign Entered ($journey_entered)
- Updates to user profiles

While Mixpanel events generated by messages do not count toward your total MTU calculation, Message Open events do count towards MTU.

In addition, Mixpanel also excludes a number of inbound events sent by partner products. Refer to a given partner's integration page to see if it has events excluded from MTU calculations.

## Estimate MTU Usage

If you haven't implemented tracking yet, you can estimate your current MTU usage by looking at your Monthly Active User (MAU) count. Your MTU and MAU counts should be similar, provided they account for anonymous visitors identically.

## View MTU Usage

MTU calculations including anonymous visitors. This means users who only visit your homepage can still count towards MTU calculations.

If you are currently tracking data, you can see your MTU consumption in your Organization Settings.

Click on the gear icon in the upper right corner of Mixpanel, and select your organization under ORGANIZATION SETTINGS.

From here, you can quickly view the usage this billing period as well as the current plan under Plan Details & Billing.

To view detailed historical data usage, or download a CSV of historical usage for each project, click on View Historical Usage in the top right of Plan Details & Billing. This will show you a graph of your usage over time, as well usage for each project in your organization for the last 12 months. This feature is accessible by all users and can be downloaded to a CSV file.

![Plan Details and Billing](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/mtu-usage-details.png)

# FAQ

## What are the top events contributing to my bill?

If you are on an Events Plan, view the top events contributing towards your event count by creating a monthly Insights report filtering out excluded events:

![Top Events Contributing to Bill](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/events-contributing-to-billing.png)

If you are on an MTU Plan, view the top events contributing towards your MTU count by creating a monthly Insights report and typing in `$all_mtu_events` which filters out event names excluded from Mixpanel's MTU calculation:

![All MTU Events Contributing to Bill](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/all-mtu-events.png)

## What if I go over my plan allowance?

### Event Plans

Once you’ve finished using your prepaid amount of events, you’ll be charged our regular monthly rate for each additional event tracked that month. Alerts are in place to notify Organization Owners and Billing Admins of potential additional data charges.

We don’t charge punitive overages but we do provide volume discounts – if your volume exceeds your projections you can save money by committing to a larger volume and locking in a lower average cost per event.

### MTU Plans

If you go over your prepaid amount, Mixpanel won't stop collecting your data. Once you've finished using your prepaid amount of MTUs you'll be charged the additional data rate for each additional user tracked that month. Alerts are in place to notify Organization Owners and Billing Admins of potential additional data charges. View the additional data rate for your paid plan in Organization Settings > Plan Details & Billing:

![Additional Data Rate](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/additional-data-rate.png)

### Alerts for Additional Data Charges

### Free Plan

If you send more data points than your free plan allows:

- Mixpanel will continue to collect your data - including data sent while over quota.
- After an account exceeds the free quota, you will retain access to your reports for 5 days. After 5 days, you must [purchase a paid plan](https://mixpanel.com/pricing/) to regain access.
- Data allowances are reset every month. You will also regain access to Mixpanel when the limit resets the following month.

## What are the benefits of events over an MTU plan?

Starting small with just a few events saves money and can lead to greater data trust over time – We’ve found that most healthy implementations start with a couple of key events and add more events and use cases as teams find value. 

You don’t need unlimited events to gain key insights, KPIs, and business metrics. In fact, you can get a tremendous amount of value with just a couple of events — our [KPI Template](https://mixpanel.com/blog/company-kpis-dashboard-template-release-metrics/) requires just two events to get started!

Events plans avoid some pitfalls 

Event plans can be simpler to understand and avoid several “gotchas” that can lead to sudden spikes in MTU usage

1. **Anonymous/Logged out users.** Tracking users who visit marketing landing pages and help docs can blow up your MTU count. These users typically have much lower activity than logged-in users and constitute a trivial increase in event volume.
2. **Messaging events.** Tracking email/push delivery events would also increase your MTU since these messages are often targeting dormant/inactive users. While some would convert, you’d get charged for a large portion of inactive users as additional MTUs (despite getting one event).
3. **Backfills.** Often, customers backfill additional events that they begin tracking later in their implementation. For example, you may choose to backfill sign-ups from server-side logs instead of relying on SDKs. These additional events would create MTUs in previous months that would increase the number of billed MTUs.

## What caused an unexpected spike in my MTU count?

Typically, MTU counts increase when you have an increase in users in your app. Occasionally, large update to your product or a marketing campaign can lead to an increase in tracked users due to an influx of anonymous visitors.

Adding tracking to new parts of your product may increase tracked users if you weren't tracking this specific group of users before. A ramp-up in the number of interactions you have with your users outside your app (emails, help desk, push notifications, etc) is another possible factor.

There are also some scenarios in which MTU numbers may be higher than expected because a new anonymous user or distinct_id may be generated for a single user. This can happen if:

- the user visits the website from a different browser - each browser generates a different anonymousId
mixpanel.reset() was called
- the user visits the page incognito
- the user clears their cookies
- If the user goes from one page to another, and each page has a different domain - in this case, the second page will have a different anonymousId by default

If you suspect there is an implementation error causing your MTU number to rise contact us immediately. We are happy to help you resolve the issue.



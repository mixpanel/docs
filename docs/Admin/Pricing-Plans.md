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

# Mixpanel for Startups

The startup program empowers early startups to easily track and analyze data to find product-market fit. The program is open to early-stage startups that meet the following requirements:

- Incorporated less than five years ago
- Raised no more than $8 million (USD) in total funding
- Hasn't previously redeemed other Mixpanel offers

Eligible startups receive $50,000 in credits that they can use over the course of 12 months. These credits can be used to purchase a Growth or Enterprise* plan as well as add-ons such as Group Analytics and Data Pipelines. Your $50,000 in credits can purchase a plan for up to 150M events per month. All the power of Mixpanel you need to launch, grow, and scale your product.

Participants will be invited to join our exclusive Mixpanel for Startups Community in Slack where you’ll have access to curated content, workshops, resources, and opportunities to learn from other startups as well as the team at Mixpanel.

*Enterprise plans purchased with credits do not include a dedicated CSM or priority response times.

[Apply for the startup program](https://mixpanel.com/startups/)

## Program FAQ

### Will I receive help getting started with Mixpanel?

Yes! We will provide self-serve resources to help with your onboarding, invite you to attend implementation webinars, provide access to our Mixpanel Community where you’ll be able to engage with other users as well as our team, and of course, our Support team is on hand to assist with technical questions.

### What happens after my 12 months in the startup program?

When your year in the startup program is over, our team will work with you to help you get on the best Mixpanel plan based on your usage and plans for growth. We can help you determine whether a Free, Growth, or Enterprise plan will best suit your needs going forward. If your year is almost up and you want to learn more about your options, contact your account manager or our [sales team](https://mixpanel.com/contact-us/sales/) for assistance.

### Why do you give so many credits?

Startups are a part of Mixpanel’s DNA and we are dedicated to having the best startup program on the market and supporting as many founders as we can. The Mixpanel for Startups program provides $50,000 in credits, which is more than most of our startups ever use. However, we wanted to make sure we provide enough credits to startups that experience rapid growth in their first year and need to be on a larger data plan. Startups should focus on building world-class products and not worry about short-term trials, restrictive data plans, and hidden pricing.

## Eligibility FAQ

### What do you consider a startup?

To be eligible for the program and considered a startup, you cannot have raised more than $8 million USD and must have been founded less than 5 years ago. If you have questions about your eligibility status, please reach out to our team at startups@mixpanel.com.

### Do I have to be a new customer to receive a credit?

New and current customers who have not received any other exclusive offer and are not currently on a paid plan are eligible to apply.

### What offers prevent me from qualifying for the startup program?

If you have already redeemed credits through the [Product School](https://mixpanel.com/productschool/) or another partner, you will not be eligible for the startup program.

## Credit Details

### How do I redeem the startup program credits?

Eligible startups can [apply directly](https://mixpanel.com/startups/) for the startup program. Credits will automatically be applied to eligible line items when purchasing or upgrading to a [Growth or Enterprise plan](https://mixpanel.com/pricing/#edit-plan) via our plan builder.

Once you have the credits, you need to click 'Redeem Now' and you will be guided to our plan builder where you can select the number of events you will need, along with adding on premium features like [Data Pipelines](https://mixpanel.com/data-pipeline/) and/or [Group Analytics](https://mixpanel.com/group-analytics/). You can also access the plan builder via the Billing section in your Organization settings.

### How are the credits applied?

Credits are applied to your monthly bill, covering up to $50,000 in total usage per year. Any additional usage costs in excess of $50,000 are not covered by the program and charged to the credit card on file.

### How long are the credits valid?

The credits are activated as soon as you apply and are accepted into the program. They are valid for 12 months from the date you are accepted into the program. If you are not ready for the startup program, you can signup for a [Free plan](https://mixpanel.com/pricing/) and then apply to the startup program when you’re ready to take advantage of the offer. Startups are in Mixpanel’s DNA — so we have the most generous free plan in the market (20M events per month) to help you get started.

### What happens if I use all my credits before my 12 months expire?

If you deplete your credits before the 12 months expire, please reach out to your account manager or our [Sales team](https://mixpanel.com/contact-us/sales/) and they will be able to talk you through your options and help make sure you can continue to use Mixpanel.

### Can credits be applied to an annual renewal?

No, credits cannot be used at expiry to purchase an annual renewal for the following year.

### Where can I view the credits applied to my Mixpanel account?

You can see credits in Organization Settings > Plan Details & Billing.

The Manage Billing & Payment section displays detailed information about the credits. Eligible credits will also appear in the checkout process when purchasing a Growth plan.

### What happens if I exceed the credit available?

If you go over the total credit applied, you will be charged for the additional usage for that month to the credit card on file.

### Do the credits expire?

Startup program credits expire 1 year after the issue. You can see the expiration date in the CREDITS tab under Billing Information in the ORGANIZATION SETTINGS Overview. Once the credits expire, the credit card on file will be charged to cover the subscription and additional data costs.

### What happens if I send in more data than my plan allows?

For startups on an event-based plan, any event above the purchased event limit is billed at the standard base rate. We guarantee a fair price, always. We’re not going to over-charge you for events. We want you to keep your costs predictable and manageable as your business grows.

For startups on a legacy MTU plan, any monthly tracked user (MTU) above the purchased MTU limit would be billed at a metered additional data rate (120% of base rate).

For example, if you were to purchase a 100,000 MTU plan and then ended up tracking exactly 150,000 monthly tracked users (MTU) each month:

- A monthly growth plan at the 100,000 MTU rate would work out to a bill of $1190/month*
- Each additional MTU above the subscription limit of 100,000 per month costs $0.01428
- Since an additional 50,000 MTU (150,000 MTUs consumed on a 100,000 MTU plan) would be consumed each month, additional data charges will be $714/month
- Over a 12-month period, the annual cost would sum to $22,848 and this would all be covered by your credit balance*

- An annual growth plan at the 100,000 MTU has an annual subscription cost of $9999/year*
- The annual price is about 30% less than the monthly, so each additional MTU above 100,000 would be billed at a metered rate of $0.009999 per MTU
- Since an extra 50,000, MTU would be consumed each month, leading to additional data charges of $499.95/month
- Over a 12 month period, the annual cost would sum to $15,998.4* due to the additional 50,000 MTU sent each month and this will all be covered by your initial credit balance

The startup credits allow you to track approximately 430,000 MTUs each month before you run out of credits. Please reach out to our [Sales team](https://mixpanel.com/contact-us/sales/) in case your company has more users and you want to discuss other plan options.

Note: These prices are illustrative only, please visit the [pricing page](https://mixpanel.com/pricing/) to view our latest prices.

### Other questions about Mixpanel for Startups?

Please reach out to the Mixpanel for Startups team at startups@mixpanel.com.

# Billing & Payment

Mixpanel runs on a subscription service in which your card is charged at the beginning of every month or every year (depending on the plan you’ve purchased) to cover reporting services for that period of time.

- For example, if you sign up for the monthly Growth plan, you’ll be charged $24 each month at the beginning of the month.
- If you sign up for the annual Growth plan, you’ll be charged upfront $199 for the entire year.

## Update Billing Information

If you’re an organization members with Billing permission (Billing Admins and Owners), you can update billing information by: 

1. Click on the gear in the upper right corner of Mixpanel, and select your organization under ORGANIZATION SETTINGS.
2. Click on Plan Details & Billing > Manage Billing & Payment.

![Manage Billing & Payment](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/manage-billing-and-payment.png)

## Troubleshoot Payment Issues

If you received a notification that your payment did not go through (via email, within the product or both), don't worry, it's quick and easy to get back up and running.

![Card Declined](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/card-declined.png)

Clicking "Update Payment Method" in both the email and the banner will take you to the Payment & Invoices tab of the Billing & Payment section in your organization settings.

![Update Payment Method](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/update-payment-method.png)

In most cases, the payment method will need to be updated. To do this, select the pencil icon (edit) next to your credit card information and enter updated card information.

![Edit Payment Method](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/edit-payment-method.png)

Once you have updated the card on file, the system will automatically attempt to run your payment again.

![Rerun Payment](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/rerun-payment.png)

If your payment method is up to date and new funds were recently added or you contacted your bank to whitelist Mixpanel, select "Rerun Payment".

If the payment is successful, you will see a success message in the bottom left corner and an error icon should no longer appear next to your payment information. Note: this can take up to a few minutes to process. You may check back later and it will not interrupt processing.

If the payment is unsuccessful you will see an error message at the bottom left corner and the error icon next to your payment information will persist.

If you continue to encounter issues, the next best thing to do is contact your bank.

If you and your bank are unable to resolve the issue, please [reach out our support team](https://mixpanel.com/get-support).

## Invoices & Receipts

Receipts will be emailed to all organization members with Billing permissions (Billing Admins and Owners). The emailed receipts differentiate between your base monthly charge and any additional data rate charges.

To view your recent receipts and upcoming invoices, select the settings cog in the top-right corner and select the Organization name under Organization Settings. In the PLAN DETAILS & BILLING section click Manage Billing & Payment beside Plan Details. Select the Payment & Invoices tab.

Click the PDF icon beside the receipt to download the receipt as a PDF.

If you are an international customer and need VAT information added to your receipts, add your VAT information by editing the RECEIPT INFORMATION field.

## Downgrade your Plan

Only Organization Owners and Billing Admins can submit requests to downgrade a plan for a Mixpanel account.

You must submit a request to downgrade a plan for a Mixpanel account. Mixpanel uses a downgrade request form to:

- Ensure the account is not under contract before finalizing the request.
- Track the reasons for downgrades and pay close attention to customer feedback.

To submit a downgrade request:

1. In ORGANIZATION SETTINGS or the dropdown menu below, you can select Plan Details & Billing. Please note that this option will only be visible for Organization Owners and Billing Admins.
2. In Overview, click "Switch to Free" at the bottom of the Plan Details & Billing section.
![Switch to Free](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/switch-to-free.png)
3. When you click Submit, a request will be sent to Mixpanel's Billing Team for processing.

# FAQ

## What are the top events contributing to my bill?

If you are on an Events Plan, view the top events contributing towards your event count by creating a monthly Insights report filtering out excluded events:

![Top Events Contributing to Bill](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/events-contributing-to-billing.png)

If you are on an MTU Plan, view the top events contributing towards your MTU count by creating a monthly Insights report and typing in `$all_mtu_events` which filters out event names excluded from Mixpanel's MTU calculation:

![All MTU Events Contributing to Bill](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/all-mtu-events.png)

## What if I go over my plan allowance?

If you send more data than your paid monthly or annual plan allows, additional data charges will be charged at the beginning of the following month. So, if you go over your data cap one month, you will be charged your base price at the beginning of the next month plus additional data rate charges from the previous month's excess. 

### Event Plans

Once you’ve finished using your prepaid amount of events, you’ll be charged our regular monthly rate for each additional event tracked that month. Alerts are in place to notify Organization Owners and Billing Admins of potential additional data charges.

We don’t charge punitive overages but we do provide volume discounts – if your volume exceeds your projections you can save money by committing to a larger volume and locking in a lower average cost per event.

### MTU Plans

If you go over your prepaid amount, Mixpanel won't stop collecting your data. Once you've finished using your prepaid amount of MTUs you'll be charged the additional data rate for each additional user tracked that month. Alerts are in place to notify Organization Owners and Billing Admins of potential additional data charges. 

For example, let’s say you are on a $24/month Growth plan, but in the month of January, you went over your 1,000 MTU allotment by 500 MTU. Around January 1, you would have paid your base monthly fee for January of $24. Then around February 1, you will pay your base monthly fee for February of $24 plus the January additional data rate charges you incurred. If you purchase an annual plan in January, you will be charged an additional data rate fee each following month for the data used was in excess of the purchased plan.

To maximize saving and avoid additional data rate charges, we recommend [taking a look at pricing options](https://mixpanel.com/pricing/) and upgrading to a pricing plan that better fits your traffic. View the additional data rate for your paid plan in Organization Settings > Plan Details & Billing:

![Additional Data Rate](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Admin/Pricing-Plans/additional-data-rate.png)

### Alerts for Additional Data Charges

If you go over your prepaid amount, Mixpanel won't stop collecting your data. Any additional data over your current plan will be billed the following month.

Organization owners and billing admins are sent an alert email if their paid account reaches the following percentages of their plan volume: 85%, 100%, 110%, 120%, 200%, 300%, and 400%. It is possible to receive multiple alerts in a month if an account reaches two or more of the thresholds mentioned above. Email addresses that are CC'd on receipts will also be CC'd on additional carte data rate alerts.

If the billing owner logs into Mixpanel, they will see a popup if their account reaches the following percentages of their plan volume: 100%, 110%, and 120%.

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



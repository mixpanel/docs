# Billing


Our default pricing option, events-based pricing, calculates your bill based on the number of tracked events. This transparent and self-serve model is a better option for the majority of our customers. You can [purchase any events-based plan online](https://mixpanel.com/pricing). Mixpanel also offers an MTU-based option, if it aligns best to your budget and business needs. [Our sales team can consult you](https://mixpanel.com/contact-us/sales/) to choose the best option.

### What is an Event?

Events represent interactions between a user and your product. Think about events that you want to measure and understand. Is it a purchase? Video views? Friend requests? The first step is to send that data to Mixpanel. Our flexible data model lets you bring in events easily by connecting Mixpanel to your CDP, data warehouse, or in-house data pipelines. You can also install a Mixpanel SDK.

Events-based pricing calculates the amount you owe based on the number of events across all projects in each period. For eligible plans, you can choose to purchase monthly or annually.

There are three event-based billing plans to choose from: Free, Growth, and Enterprise. Refer to our [pricing page](https://mixpanel.com/pricing/) for more information on the benefits and features of each plan.

### Monthly Events Calculation

It depends on your number of active users and the number of events (interactions) a typical active user performs in your product every month (or year). These interactions include client-side engagement events (e.g., search, purchase, video view), server-side events (e.g., sign up, account upgrade), and messaging events (e.g., email sent, email opened, etc.).

We encourage new customers to get started on the free plan and then upgrade once they have an estimate of their volume. An organization is charged based on the total number of events across all projects. 

### Excluded Events

Certain events and API updates are non-qualifying and excluded from the Monthly Events calculation:

- `$identify`
- `$create_alias`
- `$merge`
- `$web_event`
- User profile creation/updates

### Estimate Events Usage

If you haven’t implemented tracking yet, you can estimate your current event usage by multiplying the number of MAUs (Monthly Active Users) you have to engage with your product by the estimated number of interactions (events you plan to track) each user performs every month. For reference, only a few companies track more than 200 events/user on our free plans. We typically see around 50 events/user.

### View Events Usage

If you are currently tracking data, you can see your events consumption in your Organization Settings.

Click on the gear icon in the upper right corner of Mixpanel, and select your organization under ORGANIZATION SETTINGS.

From here, you can quickly view the usage this billing period as well as the current plan under Plan Details & Billing:

![Plan Details and Billing](/plan-details-and-billing.png)

To view detailed historical data usage or download a CSV of historical usage for each project, click on View Historical Usage in the top right of Plan Details & Billing. This will show you a graph of your usage over time, as well usage for each project in your organization for the last 12 months. This feature is accessible by all users and can be downloaded to a CSV file.

![Events Usage](/events-usage.png)

## Billing & Payment

Mixpanel runs on a subscription service in which your card is charged at the beginning of every month or every year (depending on the plan you’ve purchased) to cover reporting services for that period of time.

- For example, if you sign up for the monthly Growth plan, you’ll be charged $24 each month at the beginning of the month.
- If you sign up for the annual Growth plan, you’ll be charged upfront $199 for the entire year.

### Update Billing Information

If you’re an organization members with Billing permission (Billing Admins and Owners), you can update billing information by: 

1. Click on the gear in the upper right corner of Mixpanel, and select your organization under ORGANIZATION SETTINGS.
2. Click on Plan Details & Billing > Manage Billing & Payment.

![Manage Billing & Payment](/manage-billing-and-payment.png)

### Troubleshoot Payment Issues

If you received a notification that your payment did not go through (via email, within the product or both), don't worry, it's quick and easy to get back up and running.

![Card Declined](/card-declined.png)

Clicking "Update Payment Method" in both the email and the banner will take you to the Payment & Invoices tab of the Billing & Payment section in your organization settings.

![Update Payment Method](/update-payment-method.png)

In most cases, the payment method will need to be updated. To do this, select the pencil icon (edit) next to your credit card information and enter updated card information.

![Edit Payment Method](/edit-payment-method.png)

Once you have updated the card on file, the system will automatically attempt to run your payment again.

![Rerun Payment](/rerun-payment.png)

If your payment method is up to date and new funds were recently added or you contacted your bank to whitelist Mixpanel, select "Rerun Payment".

If the payment is successful, you will see a success message in the bottom left corner and an error icon should no longer appear next to your payment information. Note: this can take up to a few minutes to process. You may check back later and it will not interrupt processing.

If the payment is unsuccessful you will see an error message at the bottom left corner and the error icon next to your payment information will persist.

If you continue to encounter issues, the next best thing to do is contact your bank.

If you and your bank are unable to resolve the issue, please [reach out our support team](https://mixpanel.com/get-support).

### Invoices & Receipts

Receipts will be emailed to all organization members with Billing permissions (Billing Admins and Owners). The emailed receipts differentiate between your base monthly charge and any additional data rate charges.

To view your recent receipts and upcoming invoices, select the settings cog in the top-right corner and select the Organization name under Organization Settings. In the PLAN DETAILS & BILLING section click Manage Billing & Payment beside Plan Details. Select the Payment & Invoices tab.

Click the PDF icon beside the receipt to download the receipt as a PDF.

If you are an international customer and need VAT information added to your receipts, add your VAT information by editing the RECEIPT INFORMATION field.

### Downgrade your Plan

Only Organization Owners and Billing Admins can submit requests to downgrade a plan for a Mixpanel account.

You must submit a request to downgrade a plan for a Mixpanel account. Mixpanel uses a downgrade request form to:

- Ensure the account is not under contract before finalizing the request.
- Track the reasons for downgrades and pay close attention to customer feedback.

To submit a downgrade request:

1. In ORGANIZATION SETTINGS or the dropdown menu below, you can select Plan Details & Billing. Please note that this option will only be visible for Organization Owners and Billing Admins.
2. In Overview, click "Switch to Free" at the bottom of the Plan Details & Billing section.
![Switch to Free](/switch-to-free.png)
3. When you click Submit, a request will be sent to Mixpanel's Billing Team for processing.

## Sales Tax
As a result of the Supreme Court decision South Dakota v. Wayfair, Inc., Mixpanel conducted a review of the taxability of our product state by state for customers in the United States. If you reside in a city or state where Mixpanel has a sales tax obligation, you will see a new sales tax line item on your future Mixpanel invoices starting on Nov 1st, 2018.

Mixpanel collects state taxes from the following states:

* Washington DC
* Pennsylvania
* Texas
* Massachusetts
* Connecticut (effective Dec 1st, 2018)
* Ohio (effective Dec 1st, 2018)
* New York (effective Jan 1st, 2019)
* Arizona (effective Nov 1st, 2020) 
* Maryland (effective Dec 1st, 2021)

Mixpanel collects city taxes from the following cities (not the whole state):

* Chicago (effective Feb 9th, 2023)

### Check & Change Billing Information
Sales tax is determined using the zip code associated with the credit card you have on file for billing for an Organization. You can update your credit card information and corresponding zip code through your [organization settings](https://mixpanel.com/settings/org):

![image](https://user-images.githubusercontent.com/2077899/233918715-aab79c75-5fc8-4c09-ada6-c5d165aaf400.png)

### Non-Profit Liability
If you are a non-profit company, you may not be liable for sales tax regardless of this change. Contact AR@mixpanel.com with any tax-exemption certification documents to confirm and verify your tax-exemption.

## FAQ

### What are the top events contributing to my bill?

If you are on an Events Plan, view the top events contributing towards your event count by creating a monthly Insights report filtering out excluded events:

![Top Events Contributing to Bill](/events-contributing-to-billing.png)

### What if I go over my event plan allowance?

If you send more data than your paid monthly or annual plan allows, additional data charges will be charged at the beginning of the following month. So, if you go over your data cap one month, you will be charged your base price at the beginning of the next month plus additional data rate charges from the previous month's excess. 

Once you’ve finished using your prepaid amount of events, you’ll be charged our regular monthly rate for each additional event tracked that month. Alerts are in place to notify Organization Owners and Billing Admins of potential additional data charges.

We don’t charge punitive overages but we do provide volume discounts – if your volume exceeds your projections you can save money by committing to a larger volume and locking in a lower average cost per event.

#### Alerts for Additional Data Charges

If you go over your prepaid amount, Mixpanel won't stop collecting your data. Any additional data over your current plan will be billed the following month.

Organization owners and billing admins are sent an alert email if their paid account reaches the following percentages of their plan volume: 85%, 100%, 110%, 120%, 200%, 300%, and 400%. It is possible to receive multiple alerts in a month if an account reaches two or more of the thresholds mentioned above. Email addresses that are CC'd on receipts will also be CC'd on additional carte data rate alerts.

If the billing owner logs into Mixpanel, they will see a popup if their account reaches the following percentages of their plan volume: 100%, 110%, and 120%.

#### Free Plan

If you send more data points than your free plan allows:

- Mixpanel will continue to collect your data - including data sent while over quota.
- After an account exceeds the free quota, you will retain access to your reports for 5 days. After 5 days, you must [purchase a paid plan](https://mixpanel.com/pricing/) to regain access.
- Data allowances are reset every month. You will also regain access to Mixpanel when the limit resets the following month.

### What are the benefits of events over an MTU plan?

Starting small with just a few events saves money and can lead to greater data trust over time – We’ve found that most healthy implementations start with a couple of key events and add more events and use cases as teams find value. 

You don’t need unlimited events to gain key insights, KPIs, and business metrics. In fact, you can get a tremendous amount of value with just a couple of events — our [KPI Template](https://mixpanel.com/blog/company-kpis-dashboard-template-release-metrics/) requires just two events to get started!

Event plans can be simpler to understand and avoid several “gotchas” that can lead to sudden spikes in MTU usage

1. **Anonymous/Logged out users.** Tracking users who visit marketing landing pages and help docs can blow up your MTU count. These users typically have much lower activity than logged-in users and constitute a trivial increase in event volume.
2. **Messaging events.** Tracking email/push delivery events would also increase your MTU since these messages are often targeting dormant/inactive users. While some would convert, you’d get charged for a large portion of inactive users as additional MTUs (despite getting one event).
3. **Backfills.** Often, customers backfill additional events that they begin tracking later in their implementation. For example, you may choose to backfill sign-ups from server-side logs instead of relying on SDKs. These additional events would create MTUs in previous months that would increase the number of billed MTUs.


## MTU Pricing Reference

### What is an MTU?

Monthly Tracked User (MTU) is a way to calculate your billing based on the number of visitors that perform a qualifying event each month, rather than individual user profiles or events. 

### MTU Calculation

An MTU is a visitor that tracks at least one qualifying event within your projects within the calendar month, independent of whether they have a user profile in [Users](/docs/users/overview.md#basic-features). Mixpanel determines unique users using the `$distinct_id`. Users are only counted once per month, even if they perform multiple actions across devices.

An organization is charged based on the total number of MTUs across all projects. This means that if a user performs a qualifying event in multiple projects, they are counted once per project. MTUs are *not* User Profiles – the number of MTUs in your project will not match the number of [User Profiles](/docs/data-structure/user-profiles) in your project.

### MTU Guardrail

In most cases, the tally of MTUs is equal to the number of distinct IDs who have performed a tracked event this month. The only exception to this rule is if your users average more than 1,000 events each, in which case MTUs are equal to:

Total number of events / 1,000

This is a rare threshold to exceed, but you can customize an Insights report to confirm your average user triggers fewer than 1,000 events per month.

### Excluded Events

Certain events and API updates are non-qualifying and excluded from the MTU calculation:

- `$identify`
- `$create_alias`
- `$merge`
- Message Sent (`$campaign_delivery`)
- Message Received (`$campaign_received`)
- Message Bounced (`$campaign_bounced`)
- Message Marked Spam (`$campaign_marked_spam`)
- Message Suppressed (`$message_suppressed`)
- Message Unsubscribed (`$unsubscribe`)
- Campaign Entered (`$journey_entered`)
- Mailchimp Campaign - Open
- Mailchimp Campaign - Click
- Mailchimp Campaign - Sent
- Mailchimp Campaign - Unsubscribed
- Mailchimp Campaign - Bounce
- Updates to user profiles

While Mixpanel events generated by messages do not count toward your total MTU calculation, Message Open events do count towards MTU.

> **Note:** Mixpanel has deprecated [Messages & Experiments](https://mixpanel.com/blog/why-were-sunsetting-messaging-and-experiments/) feature since Jan 1, 2022; above documentation is kept for existing customers who may have these events in the past while using such feature.

In addition, Mixpanel also excludes a number of inbound events sent by partner products. Refer to a given partner's [integration page](/docs/cohort-sync/integrations/airship) to see if it has events excluded from MTU calculations.

### Estimate MTU Usage

If you haven't implemented tracking yet, you can estimate your current MTU usage by looking at your Monthly Active User (MAU) count. Your MTU and MAU counts should be similar, provided they account for anonymous visitors identically.

### View MTU Usage

MTU calculations include anonymous visitors. This means users who only visit your homepage can still count towards MTU calculations.

If you are currently tracking data, you can see your MTU consumption in your Organization Settings.

Click on the gear icon in the upper right corner of Mixpanel, and select your organization under ORGANIZATION SETTINGS.

From here, you can quickly view the usage for the billing period as well as the current plan under Plan Details & Billing.

To view detailed historical data usage, or download a CSV of historical usage for each project, click on View Historical Usage in the top right of Plan Details & Billing. This will show you a graph of your usage over time, as well as usage for each project in your organization for the last 12 months. This feature is accessible by all users and can be downloaded to a CSV file.

![Plan Details and Billing](/mtu-usage-details.png)

View the top events contributing towards your MTU count by creating a monthly Insights report and typing in `$all_mtu_events` which filters out event names excluded from Mixpanel's MTU calculation (also refer to section below if you have [unexpected spikes in MTU count](/docs/pricing/billing#what-caused-an-unexpected-spike-in-my-mtu-count)):

![All MTU Events Contributing to Bill](/all-mtu-events.png)

### What if I go over my MTU plan allowance?

If you go over your prepaid amount, Mixpanel won't stop collecting your data. Once you've finished using your prepaid amount of MTUs you'll be charged the additional data rate for each additional user tracked that month. Alerts are in place to notify Organization Owners and Billing Admins of potential additional data charges. 

For example, let’s say you are on a \$24/month Growth plan, but in the month of January, you went over your 1,000 MTU allotment by 500 MTU. Around January 1, you would have paid your base monthly fee for January of \$24. Then around February 1, you will pay your base monthly fee for February of \$24 plus the January additional data rate charges you incurred. If you purchase an annual plan in January, you will be charged an additional data rate fee each following month for the data used was in excess of the purchased plan.

To maximize saving and avoid additional data rate charges, we recommend [taking a look at pricing options](https://mixpanel.com/pricing/) and upgrading to a pricing plan that better fits your traffic. View the additional data rate for your paid plan in Organization Settings > Plan Details & Billing:

![Additional Data Rate](/additional-data-rate.png)

### What caused an unexpected spike in my MTU count?

Typically, MTU counts increase when you have an increase in users in your app. Occasionally, large update to your product or a marketing campaign can lead to an increase in tracked users due to an influx of anonymous visitors.

Adding tracking to new parts of your product may increase tracked users if you weren't tracking this specific group of users before. A ramp-up in the number of interactions you have with your users outside your app (emails, help desk, push notifications, etc) is another possible factor.

There are also some scenarios in which MTU numbers may be higher than expected because a new anonymous user or distinct_id may be generated for a single user. This can happen if:

- the user visits the website from a different browser - each browser generates a different anonymousId or if mixpanel.reset() was called
- the user visits the page incognito
- the user clears their cookies
- If the user goes from one page to another, and each page has a different domain - in this case, the second page will have a different anonymousId by default

To assist in analysing potential sources of MTU spikes, create a copy of [this board](https://mixpanel.com/project/2195193/view/139237/app/boards#id=5762529) from our demo project into the main project contributing to MTU charges (typically your main production project). As you open the board linked above, you will see instructions to click on "Use this board" to transfer it over to your project and to edit the default date range.

If you suspect there is an implementation error causing your MTU number to rise contact us immediately. We are happy to help you resolve the issue.

# Billing: How Mixpanel pricing works

## How Mixpanel Pricing Works

### Events

An event is a data point that represents an interaction between a user and your product. Events can be a wide range of interactions. Here are some examples:

- Social: Post Created, Friend Added
- E-Commerce: Added to Cart, Purchase Completed
- Media: Video Watched, Article Read
- SaaS: Document Created, Call Started

To decide which Mixpanel plan is right for you, first think about [what events you want to track](/docs/quickstart/what-to-track) and the number of active users you have.

### Computed Monthly Across Projects

Event-based pricing calculates the amount you are charged based on the number of events across all projects in your organization. Certain events and API updates are non-qualifying and **excluded from the Monthly Events calculation**:

- Identify (`$identify`)
- Create Alias (`$create_alias`)
- Merge (`$merge`)
- Opt In (`$opt_in`)
- Session Recording Checkpoint (`$mp_session_record`)
- User profile creation/updates

### Plan Differences

There are three event-based billing plans to choose from: Free, Growth, and Enterprise. Growth and Enterprise plans have optional add-ons for Group Analytics (recommended for B2B) and Data Pipelines (exports your events to a data warehouse or cloud storage bucket). Refer to our [pricing page](https://mixpanel.com/pricing/) for more information on the benefits and features of each plan. 

The high-level differences between the three are:

- **Free:** Mixpanel is usage-based and you can use it for free for as long as you want, no trial needed. If you are new to Mixpanel and want to test it out, we encourage you to use our free plan and upgrade once you have an estimate of your project’s volume. Limited to a maximum of 5 saved reports per user account. Features like cohorts, lookup tables, custom properties, or permissions are not included.
- **Growth:** The typical Growth plan customer is a small team using Mixpanel (fewer than 50 employees).
- **Enterprise:** Designed for large teams that require access controls and permissions, data governance features, dedicated onboarding support, and account management. Some exclusive reports for Enterprise are Signal, Experiments, and Impact, with features like Data Views, sensitive data classification, or SSO.

## Choosing the Right Plan

### How do I estimate how much Mixpanel will cost?

If you're already using another tool, you might have the exact numbers you need. However, if you aren’t using another tool, the best way to estimate costs is to [sign up](https://mixpanel.com/register/) and use our generous free plan. After a week, you'll get a good estimate of your projected volume on your Plan Details & Billing page (see below).

### **View Events Usage**

If you are currently tracking data, you can see your events’ consumption in your Organization Settings. Click on the gear icon in the upper right corner of Mixpanel, “Organization Settings”, and then the “Plan Details & Billing” tab.

From here, you can quickly view this billing period’s usage on the right side of the screen as well as the historical one by clicking the “View Historical Usage” link:

![Events Usage](/events-usage.png)

### Group Analytics Add-On

The Group Analytics add-on allows behavioral analysis from a business or group level, as opposed to an individual level. 

Check [here](/docs/data-structure/advanced/group-analytics) for the technical documentation for Group Analytics, keeping in mind that implementing this feature is not trivial and includes sending your events with the key of the [group](/docs/data-structure/group-analytics#group-keys-tracked-as-event-properties) they belong to. Group Analytics **can’t be implemented retroactively** for already ingested events.

This is a recommended feature for all B2B products that want answers to questions such as:

- What companies are engaging the most with a product?
- In instances with more than one user per account, such as a video streaming service, how are events triggered at an account level?
- What groups convert through a funnel to a goal event (as opposed to what individual users convert)?

### Data Pipelines Add-On

The Data Pipelines Add-On exports the events in your Mixpanel project to a cloud storage bucket or data warehouse of your choice. It's useful if you want to analyze Mixpanel events using SQL in your own environment. We offer a 30-day free trial of this feature, see the [FAQ](/docs/data-pipelines#how-does-the-free-trial-work) on how to enable it.

## Reverse Trial (Beta)
When you sign up for Mixpanel, your organization is automatically enrolled in a 30-day free trial of our paid Growth plan, including our [Group Analytics and Data Pipeline add-ons](/docs/pricing#group-analytics-add-on), with unlimited events.

This provides your organization with the opportunity to explore the paid functionality of Mixpanel, while also sending as many events as you need at no charge for 30 days.

During your trial, you will receive emails from Mixpanel highlighting the features you are using and the event volumes you are sending. These emails are meant to inform your event estimation and plan selection at the end of your trial. At the end of your 30 day trial, you will have the option to continue with a paid plan, or move to our Free plan.

At any time during your trial if you have questions, you can reach out at [trial@mixpanel.com](mailto:trial@mixpanel.com).

### When exactly does my trial start?

Your trial starts when your first organization member signs up for Mixpanel, and expires 30 days after.

***What if I’m unable to start using Mixpanel right away? Can I get an extension?***

Unfortunately, we are unable to grant extensions at this time.

### What happens when my trial ends?

At the end of your 30 day trial, you will have the option to continue with a paid plan, or move to our Free plan.

During the 30 day trial, you will receive emails from Mixpanel informing you of paid features you are using, along with how many events you are using. These emails are designed to help you decide the right Mixpanel plan for your organization upon trial expiration.

***Selecting your post-trial plan***

At the end of your trial, you will have 2 options:

- Continue using Mixpanel at no cost on our Free plan, with the corresponding feature and event volume limits
- Select a paid plan — either our Growth or Enterprise plan. You can purchase a Growth plan online at any time during the trial; you will not be billed until the end of your trial period. To upgrade to an Enterprise plan, you can contact sales.

Learn more about our plans on our [pricing page](https://mixpanel.com/pricing/).

***Will I be automatically billed when the trial ends?***

You will not be billed unless you have selected a paid plan to purchase upon trial completion. Otherwise, your organization will be automatically downgraded to our Free plan.

***I selected a paid plan for when my trial ends, but I’d like to cancel it or change it. How do I do this?***

To change this, reach out to [support@mixpanel.com](mailto:support@mixpanel.com).

### Where do I go if I have questions or need help?

At any time, you can reach out to [trial@mixpanel.com](mailto:trial@mixpanel.com).

## Billing & Payment

Mixpanel runs on a subscription service in which your card is charged at the beginning of every month or every year (depending on the plan you’ve purchased) to cover reporting services for that period of time.

### Update billing information

You can only update billing information if you have “Owner” or “Billing Admin” permissions over your Mixpanel organization:

- Click on the gear icon at the upper-right corner of the purple menu at Mixpanel and then select “Organization Settings”.
- Then select at the left-hand menu “Plan Details & Billing” and click on “Manage Billing & Payment” as shown below.

![Manage Billing & Payment](/manage-billing-and-payment.png)

### Troubleshoot payment issues

If you received a notification that your payment did not go through (via email, within the product or both), don't worry, it's quick and easy to get back up and running. 

1. Click on “Update the Payment Method” at the notification:
   
![Update Payment Method](/update-payment-method.png)

2. Edit the credit card used clicking on the “edit-pencil” icon:
   
![Edit Payment Method](/edit-payment-method.png)

3. Click on “Rerun payment”:
   
![Rerun Payment](/rerun-payment.png)

If the payment is successful, you will see a success message in the bottom left corner, and an error icon should no longer appear next to your payment information. Note: this can take up to a few minutes to process. You may check back later and it will not interrupt processing. If you and your bank are unable to resolve the issue, please reach out to our Support team.

### Downgrade your plan to Free

You can only edit or downgrade your plan if you have “Owner” or “Billing Admin” permissions over your Mixpanel organization:

To submit a downgrade request:

1. In “Organization settings” select “Plan Details & Billing”.
2. Click "Switch to Free" at the bottom of the Plan Details & Billing section.
3. When you click Submit, a request will be sent to Mixpanel's Billing Team for processing.
   
![Switch to Free](/switch-to-free.png)

## FAQs

### How do I reduce my Mixpanel bill?

The best way to reduce your bill is to send fewer events to Mixpanel. Check your project’s [Lexicon](/docs/data-governance/lexicon#viewing-query-volumes-for-events-and-properties) for events you are not querying, or for events with few queries and a high volume not providing value.

You can also check the top events contributing towards your event count by creating a monthly Insights report querying “All Events” with a breakdown by “Event Name” ([example](https://mixpanel.com/project/3018488/view/3536632/app/insights#J1ZGYyVkWKpK)).

[Hiding events](/docs/data-governance/lexicon#hide-events-and-properties) in Lexicon won’t stop their ingestion. [Dropping an event](/docs/data-governance/lexicon#dropping-events) in Lexicon will only block its ingestion from the moment it was dropped, not removing it retroactively.

### What if I go over my event plan allowance? Can I set a billing limit?

If you sent more data than your paid plan allows, the **additional cost will be charged at the beginning of the next month based on your additional data rate,** check it in the section "Plan Details & Billing" in your Organization Settings.

It’s not possible to set a billing limit at this moment, but check out [this article](https://github.com/orgs/mixpanel/discussions/526) to learn how to create a report and get warning alerts when you’re close to exceeding your plan limit.

Another option to avoid paying for overages is to downgrade or upgrade before the end of the billing cycle to a plan that covers all your data usage.

#### Alerts for Additional Data Charges

If you go over your prepaid amount, Mixpanel won't stop collecting your data. Any additional data over your current plan will be billed the following month.

Organization owners and billing admins are sent an alert email if their paid account reaches the following percentages of their plan volume: 85%, 100%, 110%, 120%, 200%, 300%, and 400%. It is possible to receive multiple alerts in a month if an account reaches two or more of the thresholds mentioned above. Email addresses that are CC'd on receipts will also be CC'd on additional carte data rate alerts.

If the billing owner logs into Mixpanel, they will see a popup if their account reaches the following percentages of their plan volume: 100%, 110%, and 120%.

### Is Mixpanel’s pricing based on MTUs?

Mixpanel’s default pricing option is based on events because it is a better option for the majority of customers. Mixpanel also offers an MTU-based Enterprise plan, which **starts at $20,000 per year** and isn’t available online. If you are interested in learning more about it, [contact our sales team](https://mixpanel.com/contact-us/sales/).

If you are an existing customer on an MTU plan, refer to our MTU Pricing Guide.

### Is old event data billed when imported to Mixpanel?

We will only apply charges to event data points with timestamps within the current billing cycle. Importing older data will incur no additional cost. For example: if April 1st - April 30th is the current billing cycle, importing data from March will be free of charge.

### I am using the Warehouse add-on for ingesting data. How does this impact billing? 

New events imported through a warehouse connection are treated as any other source (same as importing through our SDKs or API directly). Warehouse data, similar to other sources, is billed in accordance with general Mixpanel pricing policies. 

There is one additional field you will see in the Billing Page on your Data Usage Table called "Updates". Updates (updating an existing event or deleting an event) are generated by Mirror-type syncs and are tracked separately from event volume. Each update is counted as one event towards billing and they are counted and billed for the month they were triggered on, even if the record being updated is for a previous month. You can read more about these updates and how warehouse connectors may affect billing from the warehouse perspective [here](/docs/tracking-methods/data-warehouse#faq)

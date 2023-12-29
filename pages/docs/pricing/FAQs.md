# FAQs

## What are the top events contributing to my bill?

If you are on an Events Plan, view the top events contributing towards your event count by creating a monthly Insights report filtering out excluded events:

![Top Events Contributing to Bill](/events-contributing-to-billing.png)

## What if I go over my event plan allowance?

If you send more data than your paid monthly or annual plan allows, **additional data charges will be charged at the beginning of the following month.** So, if you go over your data cap one month, you will be charged your base price at the beginning of the next month plus additional data rate charges from the previous month's excess. 

Once you’ve finished using your prepaid amount of events, you’ll be charged our regular monthly rate for each additional event tracked that month. Alerts are in place to notify Organization Owners and Billing Admins of potential additional data charges.

We don’t charge punitive overages but we do provide volume discounts – if your volume exceeds your projections you can save money by committing to a larger volume and locking in a lower average cost per event.

### Alerts for Additional Data Charges

If you go over your prepaid amount, **Mixpanel won't stop collecting your data.** Any additional data over your current plan will be billed the following month.

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

Event plans can be simpler to understand and avoid several “gotchas” that can lead to sudden spikes in MTU usage

1. **Anonymous/Logged out users.** Tracking users who visit marketing landing pages and help docs can blow up your MTU count. These users typically have much lower activity than logged-in users and constitute a trivial increase in event volume.
2. **Messaging events.** Tracking email/push delivery events would also increase your MTU since these messages are often targeting dormant/inactive users. While some would convert, you’d get charged for a large portion of inactive users as additional MTUs (despite getting one event).
3. **Backfills.** Often, customers backfill additional events that they begin tracking later in their implementation. For example, you may choose to backfill sign-ups from server-side logs instead of relying on SDKs. These additional events would create MTUs in previous months that would increase the number of billed MTUs.

## I’ve hit the data usage limit of my plan. What can I do now?

Once you’ve hit the limit of your Mixpanel plan the additional usage will be charged as “à la carte”, this is, overages. 

You can check the price of each additional event/MTU in the “Plan Details & Billing” section of your Organization Settings.

![image](/Plan_Details_Billing.png)

So, what options do I have now?
1. **Upgrade your plan before the end of the current billing cycle.** Let’s say your plan includes 100k events but you’ve used 178k. If you upgrade to a plan including 200k events before the next invoice is issued those $178k will be charged against the new plan, avoiding overages.
2. **Downgrade your plan before the end of the current billing cycle.** If you downgrade to our Free plan before the invoice of the current cycle is issued the data usage will be charged against the limits of the Free plan. It’s important to note that if the limit of the Free plan is hit (20M events) we’ll block your access to Mixpanel until the next month.
3. **Do nothing and pay for the overages.** In some cases might make sense to simply pay for that extra data as overages without editing your Mixpanel license for future months. For example, if you had some temporary peak of activity at your website or application.

## What permissions are needed to check/edit my current plan?

In order to access or change the pricing details of your Mixpanel plan, you will need “Owner” or “Billing Admin” permissions over your Mixpanel organization.

Notice that:

- Admins can see how many data points are included in the current plan, but not how much that plan costs.
- The plans are applied over the entire Mixpanel organization, so, being “Owner” at a project level won’t allow a user to see/edit pricing information.

You can read more about our roles and permissions in [this section](https://docs.mixpanel.com/docs/admin/organizations-projects/manage-team-members#permissions) of our Docs.

## How is old data billed when importing it to Mixpanel from another platform?

We will only apply charges to data points with timestamps within the current billing cycle. Importing older data will incur no additional cost:

For instance:

- I have a monthly subscription for my Mixpanel license, and it's currently September.
- I'm importing historical data from January through September.
- Importing data from January to August will not result in any additional charges, but, importing data from September (the current billing month) will be billed as usual.

A side note to this: Mixpanel won’t ingest or keep data points with time marks older than 5 years. Check our Data Retention Policy [here](https://docs.mixpanel.com/docs/other-bits/privacy-and-security/gdpr-compliance#data-retention-policy).

## What permissions are needed to check/edit my current plan?

Users with “owner” or “billing admin” roles can access and edit the information regarding plan, pricing, payments, etc.

Users with “admin” roles can access the same details, but won’t be able to edit them. 

Please check more information about roles and permissions on [this section of our docs](https://docs.mixpanel.com/docs/orgs-and-projects/roles-and-permissions).

## What are the main differences between the Free and the paid plans?

Our Mixpanel Free Plan gives access to all of our 4 core reports which is a great way to trial Mixpanel! However, limitations are 5 saved reports per seat and though you can create cohorts on the Free Plan, you cannot save cohorts. Our Growth Plans give you access to all 4 core reports as well as:

- Unlimited Saved Reports and Boards
- Unlimited Saved Cohorts
    - Cohorts are groups of users that share a certain set of properties or who perform a similar sequence of events. Mixpanel lets you visually define cohorts, view the list of users that comprise them, compare them in your analysis, and share them with the rest of your company.
    - Integrate Mixpanel with [your other tools](https://mixpanel.com/partners/integrations) for targeting marketing, push messaging/notifications, ad-targeting, creation of look-alike audiences, and more for user groups identified in Mixpanel!
- Find Interesting Segments feature in [Funnels](https://docs.mixpanel.com/docs/analysis/advanced/other-advanced-features#interesting-segments-in-funnels) and [Retention](https://docs.mixpanel.com/docs/analysis/advanced/other-advanced-features#interesting-segments-in-retention) Reports
    - Rather than searching through multiple property breakdowns to find significant data, this feature automatically identifies this data for you. Mixpanel combs through your event properties and cohorts to show you which of those segments convert higher or lower than average in funnels and which segments retain at a higher or lower rate than average, and are therefore statistically significant in Retention.
- [Impact Report](https://docs.mixpanel.com/docs/analysis/advanced/impact)
    - Mixpanel’s Impact report measures the effects of product or marketing launches on your key metrics. Impact calculates the user adoption of the launch, the impact of the launch on an important event, and the differences between users that adopt the launch and those that do not.
- Optional Add-Ons:
    - [Group Analytics](https://docs.mixpanel.com/docs/analysis/advanced/group-analytics) (popular for B2B companies)
    - [Data Pipelines](https://docs.mixpanel.com/docs/other-bits/data-pipelines) (continuously export the events in your Mixpanel project to a cloud storage bucket or data warehouse of your choice)
- Formatted API export (Export report results to JSON or CSV)
- Enhanced access controls and permissions

Curious to try the Growth Plan? We offer monthly contracts which is a great way to trial these features before commitment!

## How are Start-Up Credits applied? What happens when they expire?

Mixpanel Startup credits are set to last for 12 months, starting from the activation date, offering $50,000 to spend on any Mixpanel pricing page purchase.

These credits cover the selected Mixpanel license on the Growth Plan and any extra costs incurred within the 12-month window.

Once the credits expire (12 months after activation), the next renewal for the chosen plan will be billed in dollars to the customer's designated payment credit card. For example, if credits run out in January, the invoice issued in February will be in dollars, not credits.

**Startup credits do not apply to annual renewals.** If a startup customer is on a monthly plan, they can switch to an annual plan (starting a new 12-month period) before their credits expire. In such cases, the customer will be invoiced for the annual amount, with the charge prorated based on the start date of the annual plan and the expiration date of the credits.

For instance, if a customer activates their credits on June 1, 2023, expiring on May 31, 2024, and decides to switch to an annual plan on May 1, 2024, one month before the credits expire:

The prorated portion of the annual plan (1 month) will be charged against the Startup credit.
The remaining portion (11 months) will be charged in dollars using the standard payment method.
In summary: Customers can move to an annual plan, but credits will only cover the proportional part of the plan used during the period the credits were active.

## Can I downgrade mid-billing cycle?

Yes, the reimbursement will happen in Mixpanel credits.

As the reimbursement calculation will largely depend on your current plan (yearly, monthly, up to date or legacy plans…) we recommend to reach out directly to our Finance team at ar@mixpanel.com to explore how the reimbursement calculations and method look like.

## Who receives emails regarding our plan?

Users with role **"owner" and "billing admin"** will receive via email billing communications from Mixpanel such as new incoices, accounts exceeding their data limit, etc.

## If I hide events from my Lexicon, will my bill decrease?

No, hiding events at Lexicon will hide those events from the query menus at the UI... But won't prevent those events from being ingested, and consequently billed.

You can read more about hiding events in Lexicon at this section of our docs.

## If I drop events from my Lexicon, will my bill decrease?

Probably, when an event is dropped in Lexicon it gets "blacklisted" so it's not ingested again. Dropping an event would prevent it from being indexed in your Mixpanel project in the future.

Dropping events won't work retroactively: the already ingested events won't get deleted if you drop them, consequently, the events ingested before it was dropped will be charged against the data usage of your Mixpanel plan.


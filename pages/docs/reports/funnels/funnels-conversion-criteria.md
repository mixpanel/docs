# Funnels Conversion Criteria

## Overview

You can toggle the conversion criteria in your Funnels report to customize the definition of conversion in the report.

<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/56c79ac257f343d98bd9eef1f7271299" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

## Conversion Window

The Conversion Window determines how much time a user has to convert through all steps of the funnel after entering it.

By default, all customers have 30 days to complete a funnel from the timestamp they perform the Step 1 event. To adjust this conversion window, click on the words **30 days** in the conversion criteria. You will be able to adjust both the unit of time and the amount.

![/Screen_Shot_2021-12-15_at_11.12.25_AM.png](/Screen_Shot_2021-12-15_at_11.12.25_AM.png)

The maximum amount of time you can choose for the conversion window is 366 days, or otherwise equivalent (12 months, 52 weeks, etc). For session-based conversion windows, the maximum is 1 session.

Keep in mind that the conversion window starts on the first instance of the Step 1 event per funnel entry, and will not be updated by later instances of the same event in the same funnel trial.

For example, let's assume a funnel with the following criteria: A → B → C, conversion window of one hour

If the user does A at 1pm and then A again at 1:30pm, before doing B at 1:45pm and C at 2:15pm, they would count as converting to B, but will not be counted as completing the entire funnel to C. This is because 1pm to 2:15pm is greater than one hour. The conversion window for a given funnel trial starts with the first instance of A and is not reset by later instances of A in the same trial. B and C need to be completed within the conversion window from the first instance of A to be counted as conversions.

## Ordering

The order control determines how much flexibility there can be to the sequence of your user's actions to be counted as a conversion.

By default, funnels are based on a **specific order**. To change order designation, click on the words **Advanced** next to Conversion Criteria, and toggle on **Any Order** from the drop-down list.

![/Screen_Shot_2021-12-15_at_10.20.13_AM.png](/Screen_Shot_2021-12-15_at_10.20.13_AM.png)

### Specific Order

Specific Order Funnels require the user to complete each of the funnel steps in the order laid out to be counted as a conversion from one step to another. In other words, Step 1 must be completed before Step 2, which must be completed before Step 3, and so on. The user can engage in other actions in between funnel steps - including additional occurrences of the actions listed as funnels steps - but they will only be counted as converted if they complete all the funnel steps in order.

To illustrate with an example, let's say a specific order funnel has steps: A, B, C, D, E

1. The customer does steps A -> B -> C -> D -> E in exact order. Mixpanel counts this as a conversion.
2. The customer does steps A -> B -> ***F*** -> C -> D -> E. Mixpanel counts this as a conversion. Users can do additional actions in between funnels steps and still convert.
3. The customer does steps A -> B -> ***D*** -> C -> D -> E. Mixpanel counts this as a conversion. Even though the customer did D before the first time they did C, they will continue to convert because they eventually did a D after C.
4. The customer does steps A -> B -> C -> E. Mixpanel will not count this as a full conversion, and the customer will drop off after step C. The customer's completion of step E is excluded from the funnel because step D did not occur.

### Any Order

In Any Order Funnels, users can complete unanchored funnel steps in any particular sequence and still convert. This type of funnel is most useful in situations where a user must complete all actions to be considered converted, but the exact order is not important.

A good example of this could be a job application flow, where a user must input multiple pieces of information (their name, email address, current job title, credentials, references, cover letter, resume, etc.) in order to complete the form and submit their application, but they can provide all this information in any order they'd like and still proceed towards converting.

To switch to **Any Order**, expand the "Advanced" menu in the Conversion Criteria and toggle on "Any Order".

![/Screen_Shot_2022-07-12_at_3.35.33_PM.png](/Screen_Shot_2022-07-12_at_3.35.33_PM.png)

When you switch to **Any Order,** you have the option to anchor specific steps in your funnel by clicking on the step number.

![/CleanShot_2021-12-15_at_11.03.46.gif](/CleanShot_2021-12-15_at_11.03.46.gif)

A step will either appear with a number beside it, indicating where it must fall in the funnel, or with an asterix (\*), indicating that it can be performed in any order before the next anchored step.

**Example**:

![/Untitled_Diagram.jpg](/Untitled_Diagram.jpg)

In the above example, Steps 1, 4, and 6 must occur as the 1st, 4th, and 6th steps the user performs.Any of the * steps can occur at any time within those boundaries.

## Hold Property Constant

Holding a property constant in a funnel requires that a user retains the same value for a given event property for each step in order to convert. In other words, a user must not only perform the funnel events in the order you specified, but also perform these events with the same property value.

For example, let's say your product is an e-commerce retail site, and you have a three-step funnel of Browse > Add to Cart > Purchase. If you want to examine the conversion of users through this funnel that browse, add to cart, and purchase the same item - meaning that they cannot convert if they don't complete each step with the same item - you would hold the Item Name property constant.

The way this is counted depends on whether you have selected a counting method that does not allow users to re-enter the funnel ("Uniques") or allows re-entry ("Totals" or "Sessions).

- **Uniques:** When you select "Uniques" and hold a property constant, because users of this counting method only enter the funnel once and on the first time they do the Step 1 event, Mixpanel will hold constant the property value from the first Step 1 event.
- **Totals or Sessions:** When you select "Totals" or "Sessions" and hold a property constant, since these counting methods allow users to re-enter the funnel, Mixpanel will hold the property constant that is set with each new re-entry at the Step 1 event.

To add a property constant to your funnel, expand the "Advanced" menu in the Conversion Criteria and click on "Holding property constant".

![/Screen_Shot_2021-12-15_at_11.10.42_AM.png](/Screen_Shot_2021-12-15_at_11.10.42_AM.png)

Some things to keep in mind are that you are only able to select event properties that apply to all of the events in your funnel. Also, you can select multiple properties, but when you do ALL must be kept constant. A maximum of 3 properties can be held constant at the same time.

## Exclusion Steps (Exclude users who did...)

Exclusion steps operate as a "did not do" filter for funnels. This provides the ability to create a funnel where, for example, you look for users that did event A, then event B, did not do event C, but then continue to do D. Note that the users are excluded at that point in the funnel. So in the previous example a user that did event C would still be counted in the funnel as having A and B, but they would not qualify in the funnel for event D, by virtue of having done event C.

At the "Conversion Criteria" section, click on "Advanced" and then on "Exclude users who did...". A dropdown will appear to exclude a step from your funnel.

![image](https://github.com/mixpanel/docs/assets/2077899/fc146839-6feb-4a40-a7b7-c17217bf6c7a)

Select an event from the list and choose whether you would like the event to be excluded between all steps, or between specific steps.

![image](https://github.com/mixpanel/docs/assets/2077899/d1c95913-42ca-45ba-9605-5cce51534e48)

Click the **Filter icon** beside the step to filter that event by an event or user profile property.

![image](https://github.com/mixpanel/docs/assets/2077899/ab63bef8-3d64-4b4b-97ed-392811e185ac)

For example, if your product was an e-commerce retail company and you want to understand if users who browse for additional products between adding something to their cart and checking out are less likely to complete a purchase. To answer this question, you could create a funnel with three steps:

Event 1: Browse product

Event 2: Add to Cart

Event 3: Purchase

You can exclude users who did another “Browse product” event between Event 2 and Event 3 to and see how that affects your funnel's conversion rate.

Further example use cases:

1. Evaluate whether a certain step done alone is beneficial to your flow.
2. Ensure that a conversion was NOT the result of another detour step being taken in between two key steps.

Note:
1. An exclusion step can be placed between any steps in the funnel. It cannot be the first or last step.
2. An exclusion step does not prevent users for qualifying into the funnel up until the exclusion step. If you want users who did a particular event at any point excluded, use a cohort filter.
3. There may be any number of exclusion events between steps.
4. Exclusion steps have the same [two second grace period](/docs/reports/funnels#how-does-mixpanel-handle-simultaneous-events) as other steps in the funnel.

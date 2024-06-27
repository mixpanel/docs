# Retention Criteria

## Overview

The Retention report provides a variety of configurations to fine-tune how your retention is measured.

## Retention Measurement
You can toggle your report to return your retention as a percentage via **Retention Rate** or as a raw number of users via **Unique Users**. Click the "Retention Rate" button beneath the Retention Criteria module to switch between the two options.

<SCREENSHOT_HERE>

## Retention Groups

When using the line chart or metric visualization, you can select which retention group to target for your report. Click the button in the bottom right corner of the Retention Criteria module showing the default retention group time unit to choose another retention group.

<SCREENSHOT_HERE>

## Retention Criteria

You can configure the definition of a retained user using the Retention Criteria module.

<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/565ed521880d4d7e9f68c821645b99cc" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

### Retention Criteria - On time interval

"On" Retention calculates the percentage of users who come back on a specific time bracket (e.g. day, week, month).

After a user completes the “A criteria”, they will belong to a time unit cohort that corresponds with when they did the "A event" and the Retention report will start the clock counting from the time that particular user performed that "A event". When using "On" Retention, that same user must return to fulfill the “came back and did B criteria” on a specific and exact time unit relative to when they did the A criteria to be counted as retained.

For example, day 5 retention is the percentage of users who “came back and did B” exactly on the fifth day after they did the A event.

"On" retention is useful to understand high-level usage patterns.  We also recommend using "on" retention when your product relies on users returning in each and every time unit.

### Retention Criteria - On or After time interval

![/Retention_Criteria](/Retention_Criteria.png)

"On or After" Retention calculates the percentage of users who come back on a specific time unit (e.g. day, week, month) **or any time unit afterward**. A user can fulfill the "came back and did B criteria" on a specific time unit or any time in the future to be counted as retained in "On or After" Retention.

"On or After" Retention gives you a better sense of how long you are holding on to your users in an absolute sense. It will tell you how many users used your app and then ever returned to find more value. In other words, it's the opposite of the overall churn of your user base.

We think "On or After" retention is a better fit for most businesses and it is the default calculation for the Retention report. This is because it’s more common that a product doesn’t require users to come back in each time unit to achieve the product’s value proposition, and more often than not when doing retention analysis we don’t only value the user coming back in a specific time unit as long as they eventually do. However, if this is important to you and your business, please utilize "On" Retention.

#### Custom Retention Brackets

Not all retention analysis can be done with a set, repeated cadence and it is not always important to measure how a user came back relative to each and every particular time unit.

Custom bracket retention gives you the flexibility to split up your retention buckets into customized intervals of multiple days, weeks, or months to create meaningful touchpoints as you see fit.

**Use Cases**

For example, let's answer an important mobile gaming question: How often do my users came back and play a game between 15 and 30 days after sign up to represent mid-term players?

In mobile gaming, industry-standard intervals typically examine retention for users that came back and play a game on Day < 1, Days 1-3, Days 4-7, Days 8-14, and Day 15-30.

Typical "exact day" retention buckets don't quite solve for this use case because users should be able to play a game on any day between day 15 and 30 and be counted in a single bucket to understand how many users were retained in that entire period. Exact day retention will log users in each individual day bucket (15, 16, 17, ..., 30) which, while more granular, doesn't give a retention percentage for the entire interval. Instead, we want to know how many users played a game at all in any of the days 15-30.

**Free trials:** If you want to understand how many users come back to use the product during a 7-day free trial and also who came back and kept using the product in the 30 days after the free trial is up, you could do something like this:

![Retention 7 30](/Retention_7_30.png)

**In between cadences:** Are you somewhere in between a DAU or WAU product? You can group daily buckets to understand how your users retain every 3 days (bi-weekly).

![Retention 3 3](/Retention_3_3.png)

##### Setting Custom Brackets

First, go into the time unit drop-down in the Retention query builder and select **Custom**

![Setting Custom Buckets](/Retention_Setting_Custom.png)

Then, select the size of each bracket for the given time unit. In this example, we are selecting the number of days that are in each custom bracket. Apply.

![Retention 3 3](/Retention_3_3.png)

Each of these intervals is its own retention bucket, and if the user does the "come back and did B" event anytime inside that bucket they are counted as retained. Now I will be able to understand what percent of users come back to play at least one game in any day between day 15 and day 30 from signing up.

### Calendar Retention Mode

You can go into advanced menu under Retention Criteria to switch the retention mode from the default rolling time windows to calendar defined time windows. This aligns the retention calculation so that all users entering within a time bucket get calculated together.

![/13599603833876.png](/13599603833876.png)

This may be useful in scenarios where you want to check engagement on a strict day basis, OR if you want to check retention of your user base for the entire month and when they return, regardless of when in the month they first entered or when in the next month they returned.

![/13599765981076.png](/13599765981076.png)

In the above example, we're looking at retention on a calendar week basis.

- In the < Week 1 bucket, there were 6 users who did "Sign Up" at any point of the week of Dec 23 - Dec 30, and returned to do "Post Content" in that same week of Dec 23 - Dec 30.
- In the Week 1 bucket, there were 10 users who did "Sign Up" in the same Dec 23 - Dec 30 interval, but returned to do "Post Content" only some time between Dec 30 - Jan 6.

##### How is this different than the basic retention mode?

This [loom video](https://www.loom.com/share/5484c7bdd61a4332818ceef20f475176) should provide an overview of what is calendar interval retention and how it works vs the default rolling window retention

![/5484c7bdd61a4332818ceef20f475176-with-play.gif](/5484c7bdd61a4332818ceef20f475176-with-play.gif)

**[Basic] Rolling interval retention** - Considers time intervals based on user’s time of birth; i.e

- Day 1 retention = 24-48 hrs since person’s birth
- Week 1 retention = 7-14 days since person’s birth
- Month 1 retention = 30-60 days since person’s birth

**[Advanced] Calendar interval retention** - Considers time intervals based on ‘calendar’ time; i.e

- Day 1 retention = next ‘calendar’ day since person’s birth. If a person did an activity at 8pm on Monday and then 6am on Tuesday, person is counted under Day 1 retention even though it’s just 10 hrs later
- Week 1 retention = next ‘calendar’ week since person’s birth. If a person did an activity on Friday and then Monday, person is counted under Week 1 retention even though it’s just 3 days, since the ‘calendar’ week changed
- Month 1 retention = next ‘calendar’ month since person’s birth. Similarly, if a person made a purchase on 25th Feb and then again on 3rd March, person will be counted under Month 1 retention metrics

NOTE — All the above cases would NOT qualify under Day 1 or Week 1 or Month 1 rolling interval retention

**When should you the calendar vs rolling interval retention mode?

Both the modes are extremely useful. It totally depends on the use-case you’re trying to answer. Some examples -

| Use-Case | Which mode to use? |
| --- | --- |
| Day 1 retention for apps focused on “daily engagement” like music, meditation or workout apps | Calendar-interval |
| How many users come back after month 1 (30 days)? How many comes back after 3 months (90 days)? | Rolling-interval |
| Understanding the effect of a marketing promotion, how many people came back the week after the promotion ended? | Calendar-interval |
| What’s Mixpanel's quarterly revenue retention? How was gross and net retention in Q4 vs Q3? | Calendar-interval |
| How many users renewed their Netflix subscription? To note, renewals happen 30 days after last payment | Rolling-interval |

Above said, general expectation is product use-cases which focus on user stickiness are likely to use rolling interval mode. Marketing & Revenue teams which focus on calendar dates for their activities, are likely to use calendar interval model

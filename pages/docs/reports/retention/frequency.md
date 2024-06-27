# Frequency Retention

## Overview

Frequency is a specific type of retention that measures whether your users who track an event return to track the same event again and again. Frequency retention is helpful for measuring how engaged your users are with a specific action.

<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/f70e5ef9f6c0439ab558a5181d89bb51" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

## Frequency Report
To generate Frequency reports, click **Reports**, **Retention,** and select the **Frequency** option under the toggle for retention.

![/Screen_Shot_2022-07-05_at_4.41.04_PM.png](/Screen_Shot_2022-07-05_at_4.41.04_PM.png)

Mixpanel groups unique users in time-incremented buckets when they first complete an action, and then groups those same users in subsequent buckets when they return and perform the same or different actions.

The buckets measure the number of unique time buckets a user was active. Depending on the interval chosen, this will be one of:

- unique hours in a day
- unique days in a week
- unique months in a year

This will show how engaged users are with an action. In the example below, you can see how many users did the event "Complete Purchase" on unique days in a week. For users who did "Complete Purchase" on the week of Jan 9, 2020, 13.04% of them did "Complete Purchase" on 4 unique days that week.

![/Screen_Shot_2022-07-05_at_4.49.46_PM.png](/Screen_Shot_2022-07-05_at_4.49.46_PM.png)

#### Frequency Criteria

**Cumulative Frequency**: calculates the number of users who did the event **in at least** X unique intervals. This shows overall engagement up to that up to each frequency interval.

**Non-cumulative Frequency**: calculates the number of users who did the event in **exactly** X unique intervals. This is useful for determining exact engagement and for further investigating specific groups of engaged users.

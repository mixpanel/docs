---
title: "Troubleshooting Cohort Syncs"
slug: "troubleshooting-cohort-syncs"
hidden: false
metadata: 
  title: "Troubleshooting Cohort Syncs"
  description: "Data discrepancies between Mixpanel cohort and integration"
---

Sometimes, you may find that the number of users shown in your cohort in Mixpanel does not reflect the number of users in the integration partner's interface. Please see below what could be causing this and how you can find out which users were successfully exported from Mixpanel.

## Discrepancies in user count

If you see a discrepancy between the count of your users in a Mixpanel cohort and in the integration partner, the first thing to check is if all your users were eligible to be exported. To match users in both systems, we require a partner ID, e.g. `$braze_external_id` for Braze cohort exports. You can easily confirm this by querying for your cohort in the User report, then adding the filter `$braze_external_id` is set. This will show all eligible users that can be exported from Mixpanel to Braze. 

When accessing the "View in Explore" option, you will see the required partner ID added by default for the following integrations:

ABTasty, Airship, Blitzllama, Braze, Clevertap, Flagship, Insider, Iterable, Kameleoon, LaunchDarkly, Leanplum, Moengage, OneSignal, Optimize, Pushwoosh, SalesforceMC, Segment, VWO, Xtremepush

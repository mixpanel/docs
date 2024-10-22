# Cohort Syncs Overview


## Limits
Each project is limited to 60 dynamic (recurring) cohort syncs across all destinations. This limit helps ensure that syncs are fast and reliable. We recommend pruning older unused syncs to stay within the limit. There are no limit on the number of cohorts for static, or 1-time, syncs.

When exporting, each cohort is limited to 10 million users. We do this to keep syncs real-time and to avoid overloading downstream tools. If you exceed the limit, we recommend that you add a filter to the cohort to narrow the criteria, or break up the cohort into multiple cohorts and create multiple syncs.

The exported user data is limited to the following properties:

```
$distinct_id
$first_name
$last_name
$partner_user_id
$email
$phone
```

If these properties are not present in your project, users might not be matched in the systems. If an integration partner doesn't use a property to match, it is dropped before ingestion. Please refer to the individual Cohort Sync Help Center pages for the behaviour for specific partners.

The email address and phone number properties will only show in the manual CSV exports for Google Ads and Facebook integrations.

## Troubleshooting

Sometimes, you may find that the number of users shown in your cohort in Mixpanel does not reflect the number of users in the integration partner's interface. Please see below what could be causing this and how you can find out which users were successfully exported from Mixpanel.

### Discrepancies in user count

If you see a discrepancy between the count of your users in a Mixpanel cohort and in the integration partner, the first thing to check is if all your users were eligible to be exported. To match users in both systems, we require a partner ID, e.g. `$braze_external_id` for Braze cohort exports. You can easily confirm this by querying for your cohort in the User report, then adding the filter `$braze_external_id` is set. This will show all eligible users that can be exported from Mixpanel to Braze. 

When accessing the "View in Explore" option, you will see the required partner ID added by default for the following integrations:

ABTasty, Airship, Blitzllama, Braze, Clevertap, Flagship, Insider, Iterable, Kameleoon, LaunchDarkly, Leanplum, Moengage, OneSignal, Optimize, Pushwoosh, SalesforceMC, Segment, VWO, Xtremepush

It is also added by default to any integration where the join key is not the $distinct_id. The added partner ID filter will show up as a [custom property](/docs/features/custom-properties) called "Defined Properties Required for Cohort Selection" whose properties will appear when hovering over the property:

![image](https://user-images.githubusercontent.com/13734965/233539618-3ac2c97e-d3fd-4c44-8dc3-847ecdfe50bb.png)

### Inspect exported cohorts via CSV download

To find out which and how many users have been exported from your cohort to the integration partner, you can now download a CSV containing all users that have been exported. When accessing the cohort export overview by navigating to the integration in your Integrations tab, then clicking on the cohort, you will be navigated to this overview:

![image](https://user-images.githubusercontent.com/13734965/233539646-5057fdb4-5c15-412a-8390-1bed8d44f136.png)

You will find a summary of the total count of users exported and removed and a CSV download button. In the CSV, you can find the list of distinct_ids of the users in the export and an operation column. This operation column can contain one of three values; add when the user profile was newly added to the cohort, remove when the user was removed from the cohort and no-op when the user remains in the cohort. In the column next to the distinct_id, you will see the partner ID for that user. If the numbers between Mixpanel and the integration partner mismatch, you can confirm if a user has been exported by looking at the CSV file. 

### Export is paused

If you notice your cohorts are not being exported, you can view the reason for the pause in your Integrations tab. When accessing the integration, you will see the status (either Active or Paused). If the status says Paused, you can hover over the Paused text to see the reason for the pause:

![image](https://user-images.githubusercontent.com/13734965/233539691-d36370b1-880a-4aa6-a64c-399175c02388.png)

Some integrations have common pause reasons (e.g. [Facebook's authentication pause](/docs/cohort-sync/integrations/facebook-ads#troubleshooting-errors)). You can usually resolve the paused reason on your side by confirming the authorization for the integration is still valid, and dis- and reconnecting. 

### View sync error

To find more details on Failure errors, you can click in the Cohort within the Integrations page to display errors.

1. Under the integration section, select the cohort:
![image](https://user-images.githubusercontent.com/13734965/233539867-3bd94f9f-b50c-4939-9eb9-5879e0b2e8cf.png)
2. If an error is available you will see the “View Error” button:
![image](https://user-images.githubusercontent.com/13734965/233539900-58b14423-bdfd-4fb7-98ff-17576d54a5d8.png)
3. Click on the “View Error” button to get more details.

Currently the “View Error” button will only display if there is an error available. In the case that you do not see a “View Error” button but the sync did not finish successfully, you can reach out to the Support team to help get more details on the error.

# Exporting Methods

## Overview
- Many ways to export data
- Quick and lightweight options via UI for fast analysis
- APIs for raw event/profile data and formatted data for larger exports
- Integrations to other destinations to do even more with your data
- If you need GDPR compliant export/deletion, see stuff on [End User Data Management](/docs/privacy/end-user-data-management).

## Exporting Events
### Event Export via API
- use API for raw data export
- Link to dev doc
- Event data format
- Timezone callout

### CSV Events Export
- can navigate to Events page to query specific events
- Modify table to control what properties are returned in the CSV
- Only what is visible in the UI is exported

## Exporting Profiles
### User Profile Export via API

- use Engage API for profile data export
- link to dev doc
- Profile data format
- able to control what properties to return
- able to export specific cohort using filter_by_cohort_id
- Profile always returned with canonical distinct_id

#### Group Profile Export via API
- Can include data_group_id to export group profiles
- How to find data_group_id
- Where to include data_group_id in request

### CSV Profile Export

- Can navigate to Users page to query specific Users or Group Profiles
- Modify table column to control what properties are returned in the CSV
- Link to [exporting users to CSV](/docs/users/users-page#exporting-profiles-to-csv)

## Exporting Reports
### Downloading Reports via the UI
You can download any reports as a CSV, PNG, or PDF by clicking the "..." button in the top right corner of the report UI, and then selecting "Export". Learn more about [the limits of UI exports here](/docs/reports#limits-and-ordering).

### Exporting Reports via API
You may use our [Query API](https://developer.mixpanel.com/reference/query-api) to export the formatted results that you see in our web app. Learn more about the [Insights API](https://developer.mixpanel.com/reference/insights-query), [Funnels API](https://developer.mixpanel.com/reference/funnels-query), and [Retention API](https://developer.mixpanel.com/reference/retention-query).


## Export Integrations
- You can export to your data warehouse using Data Pipelines
- You can also export cohorts of users to various destinations using Cohort Sync integrations







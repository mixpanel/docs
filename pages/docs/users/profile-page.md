# Profile Page

## Overview
- profile page lets you learn more about a specific user profile of group profile
- Access it from Users page by clicking into any returned users


## Reserved properties on the profile page
- reference a few reserved properties as it relates to profile page (geolocation, email, name, pictures, updated at)
- Show a screenshot that highlights which UI area corresponds with what reserved props

## Distinct ID cluster
- Canonical distinct_id is shown
- Expand to show all IDs currently in the cluster

## Activity Feed
- see events for this user
- consecutive events are grouped. Click to expand to see grouped events.
- Click individual events to see properties
- Hide events to narrow in on specific events only
- Default to 30 days, can update date range
- Click View in Insights to see your current activity feed as an Insights report, including all current params like date range, hidden events, distinct_id, etc.



## Editing profile properties
- You can edit profile properties directly in this UI to update the user
- Good for quick fixes, but best practice is to do this in implementation/some other source of truth
- Changes here will reflect in your raw data/exports, not just the UI. Updates from implementation/other sources after will overwrite your changes.

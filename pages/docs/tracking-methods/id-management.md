# Identity Management

## Overview
- What is ID management? - Assigning ID and maintaining ID mapping to make sure data gets attributed to users accurately.
- Why is ID Management important? - Reporting, accuracy, funnel conversion, tying users to events, MTU pricing, etc.

## Distinct ID
- What is distinct id?
- If 2 event have 2 IDs, Mixpanel will consider it as 2 users

## ID Management in Action
- show Charlie example; one user, different device
- show scenario without id management (separate users)
- show scenario with identify call (merged accurately
- Summary: ID management is the process of assigning and maintaining ID mapping to make sure data is attributed to users accurately.

## Identity Merge
- There are 2 versions. New orgs default to v3
- How are the 2 versions different?
- How achieve goal of managing ID, just through different means under the hood
 
### Legacy API
- Briefly touch on this, just link to [unlisted doc here](https://github.com/mixpanel/docs/blob/main/legacy/aliases.md)

### Check your ID management version
- something about checking settings, simplified, original, disabled.

## Best Practice
#### Use a unique identifier that is consistent over time
We recommend using an ID that is unique to each user and does not change, for example, a database ID. While using an identifier like email may be more convenient, keep in mind that you cannot merge 2 `$user_id`s or change a `$user_id`, so if the user changes their email, they will count as a separate user.

#### Track the unique identifier as a super property and user property to assist in troubleshooting
You can track the user's unique identifier as a [super property via mixpanel.register](https://developer.mixpanel.com/docs/javascript#super-properties) and [user property via mixpanel.people.set](https://developer.mixpanel.com/docs/javascript#setting-profile-properties) as soon as it is available in the app i.e. on a successful sign-up / login or when an app is re-opened in a logged in state.
In the cases when ID Merge is not implemented properly, you can rely on these properties for troubleshooting purposes.

#### Avoid creating profiles for anonymous users
Avoid creating profiles for anonymous users. If possible, cache user profile properties update in cookie or local storage and only send them to Mixpanel after the user is identified (ie logged-in state).

It is possible to set user profile properties for unidentified users by sending the profile updates to $distinct_id=$device:<device-id>. However, user profile properties are not preserved when $device_ids are linked to $user_ids, so any properties set before the IDs became linked will need to be set again using $distinct_id=<user-id> once the user is identified.

#### QA your ID management implementation during the development phase
Here are a few things to look out for:
- Ensure that cross-platform, pre and post-registration events are linked to the same user on Mixpanel.
- Ensure that no duplicate profiles are created as the users go through the onboarding, registration, login, and cross-platform user journey.
- Ensure that all the user’s identifiers are stored in the same Identity Cluster and that all their events are displayed on a single profile on Mixpanel.

#### Keep a record of your ID management implementation
We encourage you to document your implementation (or create a diagram of the implementation). This will come in handy when you need to re-implement this on a new platform or troubleshoot ID management issue.

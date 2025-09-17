# Airship


## Overview

The Airship integration with Mixpanel allows users to export Mixpanel cohorts into Airship. This updates the Mixpanel Tag Group in Airship, allowing you to target specific Mixpanel cohorts using Airship. Mixpanel cohorts can be exported to the Airship Tag Group once, or the cohort data can sync dynamically and update the Tag Group every 15 minutes.

## Permissions

You must be a Mixpanel project admin to enable the Airship integration.

If the setting below is enabled in Airship, you will see the error "Master secret required to set tags on Tag Group mixpanel" in Mixpanel. Work with Airship to disable this setting so Mixpanel can update the Airship tag group.

![Airship 1 Image](/airship1.png)

## Enable the Integration

In order to integrate Airship with Mixpanel for anonymous mobile audience identification, you will first need to install both the [Airship SDK](https://docs.urbanairship.com/platform/) and Mixpanel SDK in your application. Once you have done so, follow these steps:

1. Go to the Airship Integrations User Interface and enter the [Airship All Access Token and App Key](https://docs.airship.com/guides/messaging/user-guide/project/bearer-tokens/), which allows Mixpanel to send data to the correct Airship project.
2. Create a cohort in Mixpanel.
3. Create a Mixpanel [Tag Group within Airship](https://docs.urbanairship.com/guides/tag-groups-walkthrough/#tg-create-tag-group). **For this Integration, we require that you create a Tag Group Key called "mixpanel". Note that Tag Group Keys are case sensitive.**
4. Export the Cohort from Mixpanel, at which time Mixpanel will wait for a callback to ensure that the request to Airship was received.
    - A **one-time export** will add the new Airship tag to all users in the Mixpanel cohort at the time of the export. The new tag will be visible in Airship. 
    - A **dynamic sync** will add or remove a tag for users in the cohort every 15 minutes until the sync is disconnected. This means that every 15 minutes, the tag in Airship will update to reflect the current status of the Mixpanel cohort.

## How does Mixpanel export data to Airship?

**For one-time exports:** Mixpanel will send a static export of users who currently qualify for the cohort. This is exported to Airship as a Tag Group that allows you to create an audience to target users. You will be able to name the Tag Group that appears in Airship. These names will only be added to the Tag Group with the Group Key called “mixpanel” (Group Keys are case sensitive).

_It is not recommended to use the same tag name for two static exports, as users who qualified at each time of export will be included in the tag within Airship._

**For dynamically syncing exports:** Every 15 minutes, Mixpanel will initiate a sync between the Mixpanel cohort and the Airship tag. At the time of the sync, Mixpanel will add the tag for newly-qualified users, and remove the tag for users who have exited the cohort. Users can move into and out of the cohort depending on if they meet the cohort criteria. Note that these tags only apply to the “mixpanel” Tag Group Key, which must be created within Airship.

## How are users matched between Airship and Mixpanel?
> **Warning:** Projects using the [simplified ID merge system](/docs/tracking-methods/id-management#identity-merge-apis) must have the $user_id in Mixpanel match the user identifier in the partner service. Using any alternative partner properties to match users between tools may result in partner events not being attributed to the correct user in Mixpanel. Any partner properties mentioned in the below section are primarily applicable to projects on the original ID merge system.

Users are matched between Airship and Mixpanel using the [Airship channel id](https://docs.airship.com/guides/airship/user-guide/channels-intro/#channel-ids). This value must be set as a Mixpanel user property named `$ios_urban_airship_channel_id` for iOS users or `$android_urban_airship_channel_id` for Android users. These values must match with the Airship channel id.
    
The recommendation would be to insert code after the user authenticates that sends a `people.set` operation to the `$android_urban_airship_channel_id` and `$ios_urban_airship_channel_id` properties respectively as string values, so they are stored in the Mixpanel profile. This could be when they sign up (or just log in if they already had an account). By setting the property each time the user authenticates you would ensure users who have signed up previous to this code changes also have it.

>**Note:** SDK versions older than Android v5.9.6, Swift: v2.10.4, and Objective-C: v3.9.2 automatically created these properties. This has since been removed in favor of them being set according to your user's flow.

**Additionally**, exports will send all user profiles to match against [Airship's Named User system](https://docs.airship.com/guides/messaging/user-guide/audience/segmentation/named-users/), which handles cross-platform identification. If you would like to specify a value to match a Mixpanel user profile to a Named User, **you must add a user property, `$airship_named_user`**, which will be sent to attempt matching (note you must set this value, the Airship SDK will not automatically declare it).

Users without `$airship_named_user` user properties will instead have their distinct_id sent to Airship's Named User system - this route is intended for implementations where the same identifier value is used for both distinct_id (Mixpanel) and named_user_id (Airship). Note that for customers using identity merge, Mixpanel will send the [canonical distinct ID](https://help.mixpanel.com/hc/en-us/articles/360041039771-Getting-Started-with-Identity-Management#individual-users), which may change over time. To ensure a consistent identifier is sent to Airship's Named User system, add the `$airship_named_user` property to the user's profile.

## Sending Mixpanel Cohorts to Airship

Exporting data to Airship is done from the Mixpanel Cohort Manager. From the Cohort Manager: 

1. Click **Export to... Airship**.

![Airship 2 Image](/airship2.png)

2. Enter the Airship Tag under which the export should be saved. Click **Save**.

![Airship 3 Image](/airship3.png)

3. The tag will now be available for targeting within Airship.

![Airship 4 Image](/airship4.png)

## FAQ

### Why does my Mixpanel Cohort display more users than in Airship?

In order for a user to be exported to Airship, the user must have the necessary property set on the user profile. These properties are `$ios_urban_airship_channel_id`, `$android_urban_channel_id`, or `$airship_named_user`.

### Is there a limitation to the number of profiles that can be exported to Airship?

15 million profiles is the maximum number of profiles that can be exported to Airship.

### Airship Events into Mixpanel & MTU Exemptions

You can export events from your Airship integration to Mixpanel to perform deeper analysis. For detailed instructions on how to do this, please refer to [Airship's integration documentation](https://docs.airship.com/partners/mixpanel/#set-up-a-mixpanel-rtds-integration-in-airship).

Events coming from Airship are marked with the property `$source` to denote the source product.

Mixpanel will exempt certain messaging outreach events from [MTU calculations](https://help.mixpanel.com/hc/en-us/articles/360001465686-Billing-for-Monthly-Tracked-Users#monthly-tracked-users-calculation), meaning you're free to send campaigns to dormant users without them counting towards MTU billing (only once a user engages with a message will they then be counted towards that tally).

The following events are exempt from MTU calculations:

- Airship Email Bounce
- Airship Email Delay
- Airship Email Delivery
- Airship In-App Message Display
- Airship Rich Delivery
- Airship Send
- Airship Send Rejected
- Airship Unsubscribe
- Airship SMS Delivered
- Airship Email Injection






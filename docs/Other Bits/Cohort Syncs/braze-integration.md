---
title: "Braze"
slug: "braze-integration"
hidden: false
metadata: 
  title: "Braze"
  description: "Integrate Braze with Mixpanel"
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-30T05:52:10.102Z"
---

# Overview

The Mixpanel Braze integration exports Mixpanel Cohorts into [Braze](https://www.braze.com/). This allows you to send Braze campaign messages to targeted cohorts that are created in Mixpanel. You can also send your Braze events into Mixpanel to apply deeper analysis. 

## Permissions

You must be a Mixpanel project admin to enable the Braze integration.

### Required Credentials

In order to set up the integration, you must use a Data Import Key and a Braze Instance URL to connect a Mixpanel instance with a Braze instance.

A Braze project stores the Data Import Key and Braze Instance URL. You can find these two values in from within Braze. [Use the Braze documentation to learn how to obtain the Key and URL](https://www.braze.com/docs/partners/insights/behavioral_analytics/mixpanel_for_currents/#integration-details). 

## Set Up the Integration

Enter the Mixpanel project where the integration is to be performed, then:

1. Click **Data Management** at the top of Mixpanel and select **Integrations**.

![Braze 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze1.png)

2. Select the Braze integration tab. Click **Connect**.

![Braze 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze2.png)

If you've set up a Connection already, you have the option of reconnecting the existing Connection.

![Braze 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze3.png)

You also have the option of adding a new Connection by clicking the dropdown on the left hand side of the row, and clicking "**+ Add Connection**".

![Braze 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze4.png)

3. Enter the Data Import Key and select a Braze Instance. Note Braze hosts their application on [multiple clusters throughout the US and EU](https://www.braze.com/docs/partners/isv_partners/cohort_import/).

![Braze 5 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze5.png)

4. Click **Continue** to complete the process.

## Export a Mixpanel Cohort to Braze

To export a Mixpanel cohort, you must create a cohort. To export a Mixpanel cohort to Braze:

1. Click **Data Management** at the top of Mixpanel. Navigate to **Cohorts**.

![Braze 6 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze6.png)

2. Select the cohort to send to Braze. Select **Export to Braze**. If you have multiple Connections, they will be differentiated by the Connection Name in the parentheses after the Integration Name.

![Braze 7 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze7.png)

3. Select a One-time export or a Dynamic sync. Click Begin Sync.

![Braze 8 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze8.png)

## Use the Mixpanel Cohort to Create a Segment in Braze

A new Braze segment can be built using a Mixpanel cohort after exporting a cohort from Mixpanel to Braze.

In order to build a Braze Segment after importing a cohort:

1. Select **Segments** tab under **Engagement**.

![Braze 9 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze9.png)

2. Click **Create Segment**.

![Braze 10 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze10.png)

3. After naming the Segment, click Select Filter from the dropdown.

![Braze 11 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze11.png)

4. Select "Mixpanel Cohorts".

![Braze 12 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze12.png)

5. Select the “includes” value from the dropdown. Click **Search for a value** from the dropdown.

![Braze 13 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze13.png)

6. The exported Mixpanel cohort isvisible in the dropdown. Select the cohort.

![Braze 14 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Braze/braze14.png)

7. Click Save.

## Matching Mixpanel and Braze Users

In order to match Mixpanel users to ones on Braze's end, the user in Mixpanel should have a profile property named $braze_external_id with the value you have assigned in Braze to the same user as [external_user_id](https://www.braze.com/docs/developer_guide/platform_integration_guides/ios/analytics/setting_user_ids/#suggested-user-id-naming-convention).

The recommendation would be to insert code after the user authenticates that sends a `people.set` operation to the `$braze_external_id` property with the string value so it is stored in the Mixpanel profile. This could be when they sign up (or just log in if they already had an account). By setting the property each time the user authenticates you would ensure users who have signed up previous to this code changes also have it.

If you are planning to also enable sending engagement events from Braze to Mixpanel, and the Braze external_user_id differs from the user_id you identify the user with in Mixpanel, you can also alias the Braze external_user_id to the distinct_id you identify users with after they authenticate. Often times, you use the same user ID for both the external_user_id in Braze, and the ID you identify with in Mixpanel, so in that case, aliasing would not be needed.

>Note: SDK versions older than Android v5.9.6, Swift: v2.10.4, and Objective-C: v3.9.2 automatically created both the profile property and the alias mentioned above. This has since been deprecated due to possible ID management issues in some use cases, so on the SDK versions cited (or above), you should set the `$braze_external_id` profile property and alias when applicable.

## Braze Events into Mixpanel & MTU exemptions

You can export events from your Braze integration to Mixpanel to perform deeper analysis. For detailed instructions on how to do this, please refer to [Braze’s Technology Partner’s documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/mixpanel_for_currents/).

Events coming from Braze are marked with the property `$partner_id`.

Mixpanel will exempt certain messaging outreach events from MTU calculations, meaning you're free to send campaigns to dormant users without them counting towards MTU billing (only once a user engages with a message will they then be counted towards that tally).

The following events are exempt from MTU calculations:

- Canvas Entry
- Email Send
- Email Delivery
- Email Bounce
- Email Soft Bounce
- Email Mark As Spam
- Email Unsubscribe
- Push Notification Send
- Push Notification Bounce
- Webhook Send
- SMS Send
- SMS Delivery
- SMS Delivery Failure
- SMS Rejection
- SMS Send to Carrier



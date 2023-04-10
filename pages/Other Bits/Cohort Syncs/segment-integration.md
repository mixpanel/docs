---
title: "Segment"
slug: "segment-integration"
hidden: false
metadata: 
  title: "Segment"
  description: "Integrate Segment with Mixpanel."
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---

# Overview

 This integration allows you to export Cohorts of users from Mixpanel to Segment so that you can better target users across many downstream connections.
 
 ## Permissions
You must be a Mixpanel project admin to enable the Segment integration.

## Enable the Integration

This connection requires set up on both Segment and Mixpanel.

### Segment

The connection requires a Segment Write Key. You can obtain this key via Segment's UI: 

1. Login into your Segment workspace and click **Sources** under **Connections** in the menu bar on the left.

2. Click **Add Source** button the right side above the sources table.

3. Search for **Mixpanel Cohorts**, select and hit next

![Segment 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Segment/segment1.png)

4. Create a Mixpanel Cohorts source.

![Segment 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Segment/segment2.png)

5. Copy the** Write Key** displayed there.

![Segment 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Segment/segment3.png)

### Mixpanel

We will use the Write Key from Segment to enable the connection in Mixpanel.

1. Select **Integrations** under the **Data Management** tab in the top navigation bar.

![Segment 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Segment/segment4.png)

2. Then select Segment, click **Connect**, and paste the** Write Key** that you generated in Segment.

![Segment 5 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Segment/segment5.png)

3. Click **Continue** to complete the process.

## Export a Cohort

To export a Mixpanel cohort into Segment.

1. Navigate to the **Cohorts** page under **Data Management**.

2. Select the overflow menu on cohort that you want to export and click Export to... → Segment.

![Segment 6 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Segment/segment6.png)

3. Select either one-time sync or dynamic sync, Click **Start Sync**.

## Sync Types

There are two types of sync: one-time and dynamic. When you generate a one-time export or dynamic sync, it overwrites the previous export with an updated export that reflects users who qualify for the cohort at the time of export.

### One-Time
In this sync, Mixpanel sends Segment the static set of users who currently qualify for the cohort. The cohort data will not be updated in Segment after a one-time export.

### Dynamic
In dynamic sync, Mixpanel initiates sync between a cohort and Segment every 15 minutes. The exported cohort will be updated every 15 minutes to reflect the most recent list of users in a cohort.

## Verifying in Segment 
Once the export completes, you can open the debugger on the source you created in Segment above and you'll see "identify" calls flowing in for each user that has been added or removed from the cohort.

![Segment 7 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/Segment/segment7.png)

Mixpanel sets a property on the user's profile in Segment indicating whether they are currently part of the cohort.

We send the following identify call to Segment when a user enters the cohort:

```
{
  "type": "identify",
  "traits": {
    "Mixpanel - <Cohort Name in Mixpanel>": true,
  }
  "userId": "user@email.com" // we use the distinct_id property here
}
```
We send the following when a user exits the cohort:

```
{
  "type": "identify",
  "traits": {
    "Mixpanel - <Cohort Name in Mixpanel>": false,
  }
  "userId": "user@email.com" // we use the distinct_id property here
}
```




---
title: "Salesforce Marketing Cloud"
slug: "salesforce-marketing-cloud-integration"
hidden: false
metadata: 
  title: "Salesforce Marketing Cloud"
  description: "Integrate Salesforce Marketing Cloud with Mixpanel."
createdAt: "2021-10-08T22:39:06.529Z"
updatedAt: "2023-03-25T05:52:10.102Z"
---

# Overview

This integration lets you export cohorts from Mixpanel to Salesforce Marketing Cloud (SFMC).

Once the one-time setup process is done, it's easy to sync cohorts on a recurring basis entirely from the Mixpanel UI.

## Permissions

You must be a Mixpanel project admin to enable the SFMC integration.

## Enable the Integration

This process will require setup on both SFMC and Mixpanel.

### SFMC

1. Navigate to **Setup => Apps => Installed packages**. Then create a package with with a Scope that provides **read/write access to DataExtensions**. Keep track of the following information (highlighted above) -- it will be useful to connect Mixpanel to SFMC:

- **Client Id**
- **Client Secret**
- **Subdomain**

![SFMC 1 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc1.png)

2. Navigate to **Audience Builder => Contact Builder => Data Extensions** to Create a New Data Extension.

![SFMC 2 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc2.png)

3. Create a new **Data Extention** with a primary key of the name **SubscriberKey**. The key type for most use-cases will stay as **Text** and size of 250 characters unless you are selecting email or phone number as the id in which you can find corresponding data types. This field will contain ids that map to the unique user property in Mixpanel.

![SFMC 3 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc3.png)

4. Note the **External Key** (underlined below) for setup on Mixpanel.

![SFMC 4 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc4.png)

### Mixpanel

1. Navigate to **Data Management => Integrations** in Mixpanel.

![SFMC 5 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc5.png)

2. Look for Salesforce Marketing Cloud in the Integrations list and click **Connect**. The following details are needed:

- **Data Extension External Key**
- An optional user property (distinct_id will be used by default). This will sync to the SubscriberKey field
- **client_id**, **client_secret**, **subdomain**

![SFMC 6 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc6.png)

3. The SFMC integration will show a **Connected** tag in the UI once the connection succeeds.

## Matching Users between SFMC and Mixpanel


You can select any user property to sync to SFMC as the subscriber key. Once the user ID is set you cannot change it later as this can cause corruption in the Data Extension. If you absolutely need to change this field, you should recreate the Data Extension.

User profiles without the above selected user property will **not** export to SFMC - it is a requirement for user matching. 

## Export a Cohort

To export a cohort from Mixpanel to SFMC:

1. Navigate to Cohorts by clicking in the **Data Management** tab and select **Cohorts**.

![SFMC 7 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc7.png)

2. Select the cohort that you want to export. Click on the three-dot icon on the right side of the cohort.

3. Click Export to > SFMC. Select either one-time sync or dynamic sync. Click **Start Sync**.

![SFMC 8 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc8.png)

## Sync Types
This integration supports two types of exports: one-time export and dynamic sync.

### One-Time Export
In a one-time export, Mixpanel sends SFMC a static export of users who currently qualify for the cohort. The cohort data will not be updated in SFMC after a one-time export.

### Dynamic Sync
In dynamic sync, Mixpanel initiates sync between a cohort and SFMC every 15 minutes. The exported cohort will be updated every 15 minutes to reflect the most recent list of users in a cohort.

## Data Extension in SFMC

The cohort data will be exported to the SFMC Data Extension that was set up above. New cohorts are added as property fields to the data extension.

![SFMC 9 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc9.png)

Each record in the Data Extension is a user and its properties show the membership of this user in different cohorts.

![SFMC 10 Image](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Other%20Bits/Cohort%20Syncs/SFMC/sfmc10.png)








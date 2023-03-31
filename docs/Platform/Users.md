---
title: "Users"
slug: "users-page"
hidden: false
metadata:
  title: "Users"
  description: "Learn about the Users page."
---

# Overview
![https://help.mixpanel.com/hc/article_attachments/7742354046740/Screen_Shot_2022-07-12_at_4.43.34_PM.png](https://help.mixpanel.com/hc/article_attachments/7742354046740/Screen_Shot_2022-07-12_at_4.43.34_PM.png)

Mixpanel's Users page allows you to filter users and gain a deeper understanding of how they interact with your website or application. By filtering your users into groups called cohorts, you can import these cohorts into other reports and perform analyses on those specific users.

## Use Case

Mixpanel’s Users page aggregates and organizes a collection of user profiles. This facilitates a granular view into the behavior of individual users or groups of users. The Users page can be used to:

- Count users based on behavior.
- Explore their unique history.
- Update user profiles.
- Create cohorts of groups of users.

# Basic Features

You can select **User Profiles** or **All Users** in the Users page. If you select **User Profiles**, the page will only show users that have at least one user profile property set. If you select **All Users**, the page will show all users who have completed any event.

![https://help.mixpanel.com/hc/article_attachments/7734130976276/Screen_Shot_2022-07-12_at_11.55.17_AM.png](https://help.mixpanel.com/hc/article_attachments/7734130976276/Screen_Shot_2022-07-12_at_11.55.17_AM.png)

By clicking the name of a user in the User tables, you can explore that user's unique history by examining their user profile. Learn more about the Users Profiles [here](https://help.mixpanel.com/hc/en-us/articles/115004501966).

## Cohorts

A cohort is a group of users who share a certain set of properties or have performed a particular combination or frequency of events. You can create a cohort on the Users page by generating filtering criteria. Once a cohort is created, you can save it and use it to group and filter data in other Mixpanel reports.

Learn more about Cohorts [here](https://help.mixpanel.com/hc/en-us/articles/115005708186).

## Modifying Table Columns

You may wish to change what data is displayed in the Users table. You can do so by clicking on **Edit Columns** and selecting / deselecting the profile properties you wish to display on the User table

![https://help.mixpanel.com/hc/article_attachments/7738768080532/Screen_Shot_2022-07-12_at_2.22.57_PM.png](https://help.mixpanel.com/hc/article_attachments/7738768080532/Screen_Shot_2022-07-12_at_2.22.57_PM.png)

# Advanced

## Users vs Users with Profiles

By default, Mixpanel will display Users with profiles on the Users page. These are users have associated users properties with them. If you wish to see users who have no associated properties, you can switch to "Users" in the selection.

![Users with Profiles](https://raw.githubusercontent.com/ranic/mixpanel-docs/main/media/Platform/Reports/Users/advanced-users-with-profiles.png)

Users with Profiles: Users who have properties associated with them
Users: All Users, including those who may not have properties associated with them, but have associated events.

## Creating or Updating Profiles

Mixpanel allows you to import user and group profiles via the Users page in bulk using CSV, or to individually create or update profiles. After import, events that users or groups trigger will be visible on their profile in the "Activity Feed".

To get started, click on **Add/Edit Profile**.

![https://help.mixpanel.com/hc/article_attachments/4411767063444/Screen_Shot_2021-12-01_at_11.44.03_AM.png](https://help.mixpanel.com/hc/article_attachments/4411767063444/Screen_Shot_2021-12-01_at_11.44.03_AM.png)

### Select a Mode

You can choose to create a profile, or to update a profile. In the create profile case, we'll warn you if you're trying to create a profile that already exists, and in the update profile case, we'll warn you if you're trying to update a profile that does not exist.

### Set an Identifier Column

The most important column in your spreadsheet is the **$distinct_id** column for user profiles or **$group_id**, the group identifier, for group profiles, as these are the canonical identifiers in Mixpanel.

Mixpanel will populate either **$distinct_id** or **$group_id** as a field that must be set, regardless of if you are in Create mode or Update mode.

### Add Additional Properties

After **$distinct_id**, you can add additional properties to the profile by pressing the "Add Property" button. Mixpanel will help autocomplete profile properties that you may want to set.

![https://help.mixpanel.com/hc/article_attachments/4411778356756/Screen_Shot_2021-12-01_at_12.20.27_PM.png](https://help.mixpanel.com/hc/article_attachments/4411778356756/Screen_Shot_2021-12-01_at_12.20.27_PM.png)

Keep in mind that [Mixpanel reserves a handful of user profile properties as special or reserved Properties](https://help.mixpanel.com/hc/en-us/articles/115004602703). These properties will allow you more flexibility and functionality within the Mixpanel web application.

Other special properties include $first_name, $last_name, $username, and $phone. Ensure that if you’re adding any of these values that you enter the column headers with the dollar sign and name so that Mixpanel recognizes them as a special or reserved Property.

Note that a '+' needs to precede phone numbers. This is especially useful for international numbers.

### Importing Profiles From CSV

When editing the CSV that you want to upload as profiles, you should **not** include column headers (e.g., Email, Name, etc.). Instead, you’ll identify column headers during the CSV upload wizard in the Mixpanel UI.

**Note**:
- If you upload a CSV with new information for existing contacts or companies, any existing information will be overwritten by new values you've imported.
- The maximum size for your CSV is 1M rows.

### Upload Your CSV

Go the the Import from CSV mode and select your prepared csv to begin the process.

### Choose an Identifier Column

The most important column in your spreadsheet is the **$distinct_id** column for user profiles or **$group_id**, the group identifier, for group profiles, as these are the canonical identifiers in Mixpanel.

If you do not assign an identifier column, Mixpanel will use your $email column as the $distinct_id value; if you don’t have an $email column either, then the $distinct_id value will be assigned randomly by default as described above.

### Choose Desired CSV Columns

![https://help.mixpanel.com/hc/article_attachments/4411778405524/Screen_Shot_2021-12-01_at_12.24.00_PM.png](https://help.mixpanel.com/hc/article_attachments/4411778405524/Screen_Shot_2021-12-01_at_12.24.00_PM.png)

You'll have the opportunity to look through all columns in the CSV to preview the values. In this step you must uncheck all of the columns you wish to NOT import. You must also choose the associated Mixpanel profile property that each CSV column will be associated with. When you done selecting the columns you wish to import along with their associated properties, press the Import profiles button.

**Notes**
If you import user profiles using $distinct_id values that already exists, those profiles will be updated with the additional user profile properties in your CSV. Mixpanel imports based only on $distinct_id and will not deduplicate user profiles automatically based on other properties, like $email or $last_name.

If you upload user profiles that have the same email address or the same name as existing user profiles, you will be uploading duplicates - they will not be combined. Ensure that the users you’re uploading don’t already have a user profile before you import, and if they do, ensure that the identifier column matches the existing profile’s identifier.

The CSV import wizard treats every property value as a string. This means lists (such as Push Notification tokens) and numbers won't be properly imported.

For more advanced user profile imports, [we recommend sending updates to the /engage endpoint instead of using the CSV import tool](https://mixpanel.com/help/reference/http#people-analytics-updates).

# FAQ

## How do I create a cohort out of a list of user emails I have?

To upload a group of user (or group) profiles and easily sort them into a cohort, add a value to the CSV which sorts the profiles into a cohort as a property. For example, give each profile the unique property of "Cohort = Android Users". Next, go to the [Cohorts](https://help.mixpanel.com/hc/en-us/articles/115005701343) tab to create a cohort as usual, and filter to user profiles with that property and save. This will create a cohort of users with that matching property.

Note that when creating cohorts this way, the cohort will remain static, meaning that it will not update over time like other cohorts as the property is unchanging.

## How do I download User Profiles in Mixpanel?

To download your user profiles from the Users page, simply click the **Export icon.** This will download all the profile data being displayed in the current report - to download more properties, edit your columns to select more properties. You can choose to filter the list or select individual profiles to download instead of downloading the full list.

![https://help.mixpanel.com/hc/article_attachments/7738832818836/Screen_Shot_2022-07-12_at_2.26.45_PM.png](https://help.mixpanel.com/hc/article_attachments/7738832818836/Screen_Shot_2022-07-12_at_2.26.45_PM.png)

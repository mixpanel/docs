---
title: "Users"
slug: "users-page"
hidden: false
metadata:
  title: "Users"
  description: "Learn about the Users page."
---

![https://help.mixpanel.com/hc/article_attachments/7742354046740/Screen_Shot_2022-07-12_at_4.43.34_PM.png](https://help.mixpanel.com/hc/article_attachments/7742354046740/Screen_Shot_2022-07-12_at_4.43.34_PM.png)

Mixpanel's Users page allows you to filter users and gain a deeper understanding of how they interact with your website or application. By filtering your users into groups called cohorts, you can import these cohorts into other reports and perform analyses on those specific users.

### **Prerequisite: [Guide to Mixpanel Basics](https://help.mixpanel.com/hc/en-us/articles/360000857366)**

This guide assumes that you already have a foundational understanding of the Mixpanel data model. If you haven't already done so, please take time to review the [Guide to Mixpanel Basics](https://help.mixpanel.com/hc/en-us/articles/360000857366) before proceeding with this guide.

# **Use Case**

Mixpanel’s Users page aggregates and organizes a collection of user profiles. This facilitates a granular view into the behavior of individual users or groups of users. The Users page can be used to:

- Count users based on behavior.
- Explore their unique history.
- Update user profiles.
- Create cohorts of groups of users.

# **Users Page**

You can select *User Profiles* or *All Users* in the Users page. If you select *User Profiles*, the page will only show users that have at least one user profile property set. If you select *All Users*, the page will show all users who have completed any event.

![https://help.mixpanel.com/hc/article_attachments/7734130976276/Screen_Shot_2022-07-12_at_11.55.17_AM.png](https://help.mixpanel.com/hc/article_attachments/7734130976276/Screen_Shot_2022-07-12_at_11.55.17_AM.png)

![https://embed-ssl.wistia.com/deliveries/c3329a511f9dab414944e0d0c7ee0f29c5bab0d5.webp?image_crop_resized=1920x1080](https://embed-ssl.wistia.com/deliveries/c3329a511f9dab414944e0d0c7ee0f29c5bab0d5.webp?image_crop_resized=1920x1080)

By clicking the name of a user in the User tables, you can explore that user's unique history by examining their user profile. Learn more about the Users Profiles [here](https://help.mixpanel.com/hc/en-us/articles/115004501966).

# **Cohorts**

A cohort is a group of users who share a certain set of properties or have performed a particular combination or frequency of events. You can create a cohort on the Users page by generating filtering criteria. Once a cohort is created, you can save it and use it to group and filter data in other Mixpanel reports.

![https://embed-ssl.wistia.com/deliveries/a78a2e57c99c82cbf2a6b82727e7da5a9a886e45.webp?image_crop_resized=1920x1080](https://embed-ssl.wistia.com/deliveries/a78a2e57c99c82cbf2a6b82727e7da5a9a886e45.webp?image_crop_resized=1920x1080)

Learn more about Cohorts [here](https://help.mixpanel.com/hc/en-us/articles/115005708186).

# **Modifying Table Columns**

You may wish to change what data is displayed in the Users table. You can do so by clicking on **Edit Columns** and selecting / deselecting the profile properties you wish to display on the User table

![https://help.mixpanel.com/hc/article_attachments/7738768080532/Screen_Shot_2022-07-12_at_2.22.57_PM.png](https://help.mixpanel.com/hc/article_attachments/7738768080532/Screen_Shot_2022-07-12_at_2.22.57_PM.png)

# **Total Users vs. Unique Users**

It is important to consider how to aggregate and sum user actions. Mixpanel reports values according to events, but it is important to distinguish the total number of events versus the total number of users that perform an event.

A total count is the total amount of times an event is fired. For example, if one person fires an event 50 times, that will count as 50 when looking at Total.

When looking at unique values, Mixpanel counts how many distinct_ids have fired that event. In other words, this counts the number of users that perform an event.

It is possible to select count type in Insights reports. Funnels and Retention reports always count uniques.

Learn more about the differences in user counts [here.](https://help.mixpanel.com/hc/en-us/articles/115004565046-Report-Counts-Unique-Total-and-Average-)

# Advanced

## **Import Users / Group Profiles**

Mixpanel allows you to import user and group profiles via the Users page in bulk using CSV, or to individually create or update profiles.

After import, events that users or groups trigger will be visible on their profile in the "Activity Feed".

To get started, click on **Add/Edit Profile**.

![https://help.mixpanel.com/hc/article_attachments/4411767063444/Screen_Shot_2021-12-01_at_11.44.03_AM.png](https://help.mixpanel.com/hc/article_attachments/4411767063444/Screen_Shot_2021-12-01_at_11.44.03_AM.png)

## **Change Profile Type**

You can upload user profiles using the **$distinct_id** or group profiles using the group identifier.

To change the type of profile you are importing, select the profile type you are interested in the toggle of the **Select Profile Type** section.

![https://help.mixpanel.com/hc/article_attachments/4411800867348/Group_3058.png](https://help.mixpanel.com/hc/article_attachments/4411800867348/Group_3058.png)

Ensure that your CSV has the right identifier when you import profiles. Use the $distinct_id for users, and the group identifier for groups.

## **Creating or Updating Profiles**

### **Select a Mode**

You can choose to create a profile, or to update a profile. In the create profile case, we'll warn you if you're trying to create a profile that already exists, and in the update profile case, we'll warn you if you're trying to update a profile that does not exist.

### **Set an Identifier Column**

The most important column in your spreadsheet is the **$distinct_id** column for user profiles or **$group_id**, the group identifier, for group profiles, as these are the canonical identifiers in Mixpanel.

For more information on how $distinct_id works in Mixpanel, see:

- [Distinct IDs](https://help.mixpanel.com/hc/en-us/articles/115004509406)
- [Distinct ID Creation](https://help.mixpanel.com/hc/en-us/articles/115004509426-How-do-Mixpanel-s-libraries-assign-unique-identifiers-by-default-)
- [Group Analytics](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics)

Mixpanel will populate either **$distinct_id** or **$group_id** as a field that must be set, regardless of if you are in Create mode or Update mode.

### **Add Additional Properties**

After **$distinct_id**, you can add additional properties to the profile by pressing the "Add Property" button. Mixpanel will help autocomplete profile properties that you may want to set.

![https://help.mixpanel.com/hc/article_attachments/4411778356756/Screen_Shot_2021-12-01_at_12.20.27_PM.png](https://help.mixpanel.com/hc/article_attachments/4411778356756/Screen_Shot_2021-12-01_at_12.20.27_PM.png)

Keep in mind that [Mixpanel reserves a handful of user profile properties as special or reserved Properties](https://help.mixpanel.com/hc/en-us/articles/115004602703). These properties will allow you more flexibility and functionality within the Mixpanel web application.

Other special properties include $first_name, $last_name, $username, and $phone. Ensure that if you’re adding any of these values that you enter the column headers with the dollar sign and name so that Mixpanel recognizes them as a special or reserved Property.

Note that a '+' needs to precede phone numbers. This is especially useful for international numbers.

## **Import Profiles From CSV**

### **Prepare Your CSV for Upload**

When editing the CSV that you want to upload as profiles, you should *not* include column headers (e.g., Email, Name, etc.). Instead, you’ll identify column headers during the CSV upload wizard in the Mixpanel UI.

### **Note:**

If you upload a CSV with new information for existing contacts or companies, any existing information will be overwritten by new values you've imported.

### **Note:**

The maximum size for your CSV is 1M rows.

### **Upload Your CSV**

Go the the Import from CSV mode and select your prepared csv to begin the process.

### **Choose an Identifier Column**

The most important column in your spreadsheet is the **$distinct_id** column for user profiles or **$group_id**, the group identifier, for group profiles, as these are the canonical identifiers in Mixpanel.

For more information on how $distinct_id works in Mixpanel, see:

- [Distinct IDs](https://help.mixpanel.com/hc/en-us/articles/115004509406)
- [Distinct ID Creation](https://help.mixpanel.com/hc/en-us/articles/115004509426-How-do-Mixpanel-s-libraries-assign-unique-identifiers-by-default-)
- [Group Analytics](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics)

To ensure future actions by each user is recorded on the correct user profile, make sure the value you assign for $distinct_id  or group identifier on import is the same value on which you’re identifying users when they log in.

If you do not assign an identifier column, Mixpanel will use your $email column as the $distinct_id value; if you don’t have an $email column either, then the $distinct_id value will be assigned randomly by default as described above.

### **Choose Desired CSV Columns**

![https://help.mixpanel.com/hc/article_attachments/4411778405524/Screen_Shot_2021-12-01_at_12.24.00_PM.png](https://help.mixpanel.com/hc/article_attachments/4411778405524/Screen_Shot_2021-12-01_at_12.24.00_PM.png)

You'll have the opportunity to look through all columns in the CSV to preview the values. In this step you must uncheck all of the columns you wish to NOT import. You must also choose the associated Mixpanel profile property that each CSV column will be associated with. When you done selecting the columns you wish to import along with their associated properties, press the Import profiles button.

## **Duplicate Profiles**

If you import user profiles using $distinct_id values that already exists, those profiles will be updated with the additional user profile properties in your CSV.

Mixpanel imports based only on $distinct_id and will not deduplicate user profiles automatically based on other properties, like $email or $last_name.

If you upload user profiles that have the same email address or the same name as existing user profiles, you will be uploading duplicates - they will not be combined.

Ensure that the users you’re uploading don’t already have a user profile before you import, and if they do, ensure that the identifier column matches the existing profile’s identifier.

Selecting a profile will display the identifier in the URL as the query parameter, such as "?distinct_id".

![https://help.mixpanel.com/hc/article_attachments/4411777376916/Screen_Shot_2021-12-01_at_11.48.00_AM.png](https://help.mixpanel.com/hc/article_attachments/4411777376916/Screen_Shot_2021-12-01_at_11.48.00_AM.png)

## **Advanced User Profile Imports**

The CSV import wizard treats every property value as a string. This means lists (such as Push Notification tokens) and numbers won't be properly imported.

For more advanced user profile imports, [we recommend sending updates to the /engage endpoint instead of using the CSV import tool](https://mixpanel.com/help/reference/http#people-analytics-updates).

## **Import Profiles to Create a Cohort**

To upload a group of user (or group) profiles and easily sort them into a cohort, add a value to the CSV which sorts the profiles into a cohort as a property. For example, give each profile the unique property of "Cohort = Android Users". Next, go to the [Cohorts](https://help.mixpanel.com/hc/en-us/articles/115005701343) tab to create a cohort as usual, and filter to user profiles with that property and save. This will create a cohort of users with that matching property.

Note that when creating cohorts this way, the cohort will remain static, meaning that it will not update over time like other cohorts as the property is unchanging.

# FAQ

****How do I create a cohort out of a list of user emails I have?****The most efficient way to create a cohort from an external list of users would be to add a common property value to these users and use that common property value as a filter when building your cohort. Learn more on how to bulk update profiles [here](https://help.mixpanel.com/hc/en-us/articles/115004695323).

## Can I download User profiles?

User profiles can be downloaded through the Mixpanel UI or alternatively by either a JQL Query or a Python script.

The ability to download to CSV is available on paid plans - [visit the pricing page](https://mixpanel.com/pricing/) for more information or to upgrade.

## How do I download User Profiles in Mixpanel?

To download your user profiles from the Users page, simply click the **Export icon.** This will download all the profile data being displayed in the current report - to download more properties, edit your columns to select more properties. You can choose to filter the list or select individual profiles to download instead of downloading the full list.

![https://help.mixpanel.com/hc/article_attachments/7738832818836/Screen_Shot_2022-07-12_at_2.26.45_PM.png](https://help.mixpanel.com/hc/article_attachments/7738832818836/Screen_Shot_2022-07-12_at_2.26.45_PM.png)

## How do I download User Profiles with JQL?

Note that downloads using JQL are limited to 2GB, so if you run into issues downloading, try the steps below for the Python script instead, which can handle any size download.

In your Mixpanel project, click on **Applications** > **JQL** > **Build your own**, and remove any pre-populated code that appears.

Then, enter the following query > RUN QUERY, then Download to CSV*:

**`function** main() {
  **return** People()
}`

[Learn more about the power of JQL.](https://mixpanel.com/help/reference/jql)

## How do I download User Profiles with a Python Script?

User profiles can be downloaded through the Mixpanel API. One way to request and execute the download is through a simple Python script. Use the [Mixpanel_api](https://github.com/mixpanel/mixpanel_api) repository and reference the [download section](https://github.com/mixpanel/mixpanel_api#export-people) to find the necessary functions. In order to obtain all of the necessary components of the script:

1. Collect your API credentials by clicking on your initials in the top right of Mixpanel and selecting **Profile & Preferences** under **ACCOUNT SETTINGS**.

![https://help.mixpanel.com/hc/article_attachments/360043093191/Screen_Shot_2019-11-14_at_9.23.22_AM.png](https://help.mixpanel.com/hc/article_attachments/360043093191/Screen_Shot_2019-11-14_at_9.23.22_AM.png)

Under the **Projects tab** you can view your API credentials for each project.

2. If you are downloading all of your users, you can ignore cohort parameters. However, if you want to download a subset of users, you'll want grab these two parameters. In order to do this:

- Go to the Users page and select the subset of users you would like to download using user properties and/or events.
- Open Developer Tools and bring focus to the console (On Chrome for Mac: command + option + "J" & on Chrome Windows: control + shift + "J").
- Refresh the page.
- From the console, select the **Network** tab, select **XHR**, find the "engage" request in the "Name" column, and then select Headers.

![https://help.mixpanel.com/hc/article_attachments/360035458651/Screen_Shot_2019-08-07_at_11.48.42_AM.png](https://help.mixpanel.com/hc/article_attachments/360035458651/Screen_Shot_2019-08-07_at_11.48.42_AM.png)

- Find the 'filter_by_cohort' value.
- Copy and paste the 'filter_by_cohort' value into the script to target only users in the Users page.
- Save the document.

The following code sample is from mixpanel_api import Mixpanel:

```
filter_by_cohort = ''
m.export_people(query_params=
{'filter_by_cohort' :filter_by_cohort})
```

3. Execute the script to pull these user profiles into a new JSON file. If you would like this in CSV format, you will want to add the parameter "format = 'CSV'". On a PC, simply open up the script with Python 2.7 to execute it. On a Mac, open up your Terminal and follow the steps below:

![https://help.mixpanel.com/hc/article_attachments/115018141203/2015-04-20_18_51_53.586496-People2CSV_05.png](https://help.mixpanel.com/hc/article_attachments/115018141203/2015-04-20_18_51_53.586496-People2CSV_05.png)

The downloaded file will now be in the same location as the python script, and will include the epoch time stamp for when the download was performed.

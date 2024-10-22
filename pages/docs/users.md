# Users: Explore your user base in Mixpanel

![/Screen_Shot_2022-07-12_at_4.43.34_PM.png](/Screen_Shot_2022-07-12_at_4.43.34_PM.png)

Mixpanel's Users page allows you to filter users and gain a deeper understanding of how they interact with your website or application. By filtering your users into groups called cohorts, you can import these cohorts into other reports and perform analyses on those specific users.

If you want to import User Profiles into Mixpanel, see our [User Profiles guide](/docs/data-structure/user-profiles).

### Use Case

Mixpanel’s Users page aggregates and organizes a collection of user profiles. This facilitates a granular view into the behavior of individual users or groups of users. The Users page can be used to:

- Count users based on behavior.
- Explore their unique history.
- Update user profiles.
- Create cohorts of groups of users.

## Basic Features

You can select **User Profiles** or **All Users** in the Users page. If you select **User Profiles**, the page will only show users that have at least one user profile property set. If you select **All Users**, the page will show all users who have completed any event.

![/Screen_Shot_2022-07-12_at_11.55.17_AM.png](/Screen_Shot_2022-07-12_at_11.55.17_AM.png)

By clicking the name of a user in the User tables, you can explore that user's unique history by examining their user profile. Learn more about the Users Profiles [here](/docs/data-structure/user-profiles).

### Cohorts

A cohort is a group of users who share a certain set of properties or have performed a particular combination or frequency of events. You can create a cohort on the Users page by generating filtering criteria. Once a cohort is created, you can save it and use it to group and filter data in other Mixpanel reports.

Learn more about Cohorts [here](/docs/users/cohorts).

<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/c1f5c6b268f94d06877b6e05083934bb" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

### Modifying Table Columns

You may wish to change what data is displayed in the Users table. You can do so by clicking on **Edit Columns** and selecting / deselecting the profile properties you wish to display on the User table

![/Screen_Shot_2022-07-12_at_2.22.57_PM.png](/Screen_Shot_2022-07-12_at_2.22.57_PM.png)


## FAQ

### How do I create a cohort out of a list of user emails I have?

To upload a group of user (or group) profiles and easily sort them into a cohort, add a value to the CSV which sorts the profiles into a cohort as a property. For example, give each profile the unique property of "Cohort = Android Users". Next, go to the [Cohorts](/docs/users/cohorts#creating-cohorts) tab to create a cohort as usual, and filter to user profiles with that property and save. This will create a cohort of users with that matching property.

Note that when creating cohorts this way, the cohort will remain static, meaning that it will not update over time like other cohorts as the property is unchanging.

### How do I download User Profiles in Mixpanel?

To download your user profiles from the Users page, simply click the **Export icon.** This will download all the profile data being displayed in the current report - to download more properties, edit your columns to select more properties. You can choose to filter the list or select individual profiles to download instead of downloading the full list.

![/Screen_Shot_2022-07-12_at_2.26.45_PM.png](/Screen_Shot_2022-07-12_at_2.26.45_PM.png)

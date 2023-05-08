## Tutorial Overview
Hello and welcome to Mixpanel for Developers Tutorial.

This tutorial is going to consist of a couple of modules designed to help everyone understand events and properties in Mixpanel, help developers understand the Data Type it supports and how to send events to Mixpanel and enrich user data that have been documented in your Tracking Plan.

We will also explore Mixpanel’s ID management Solution for Product Managers and Analysts to identify visitors as they go from an anonymous state to a known state and even when visitors use different devices.

## Mixpanel Data Model
Mixpanel data is stored and isolated within a project. Mixpanel recommends tracking 1 product with multiple platforms (mobile, web, etc.) into one project, but create separate projects for development and production.

There may be other factors where implementing separate projects is required, but do note that querying data across projects is not possible. Mixpanel supports a few different categories of data that can be used for analysis: events, user profiles, group profiles, and lookup tables. In data warehouse terminology, events make up the fact table while user profiles, group profiles, and lookup tables are dimension tables.

[Mixpanel Data Model](https://www.loom.com/share/fc9390690f1e4d84ab926dcf54914118)

## Mixpanel Property Types
Properties are attributes that help you define the specifics of an **Event** or a **User.** 
Mixpanel has many Properties defined in its Data Model.

|||
|------------- |:-------------|
|Event Properties|Event Properties describes the events that are tracked within your product.<br/>[Learn more about Event Properties](https://help.mixpanel.com/hc/en-us/articles/360001355266)|
|Super Properties|Super Properties are a type of Event Property that you can initialise to automatically attach to every subsequent Event you’re tracking at client side.<br/>[Learn more about Super Properties](https://help.mixpanel.com/hc/en-us/articles/360001355266#super-properties-for-events)|
|User Profile Properties|User Profile Properties describe your users (they typically store current demographical information). User profiles are joined to events on `event.distinct_id = user_profile.distinct_id`<br/>[Learn more about User Profile Properties](https://help.mixpanel.com/hc/en-us/articles/115004708186)|
|Group Profile Properties|Group Profile Properties describe group level information (similar to User Profiles Properties at user level). With Mixpanel’s Group Analytics, multiple users can be grouped and behavioural data analysed at a customised group level (such as company, account). Group profiles are joined to events on your chosen group key. For example, if you create a new group key for `company_id` your events will be joined on `event.company_id = group_profile.company_id`<br/>[Learn more about Group Analytics](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics) and [Group Profile Properties](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics#group-profiles)|
|Lookup Tables|Lookup Tables allow you to dynamically extend additional properties mapped to an exiting Event or User Property. For example, if you create a lookup table for "Songs" (with additional properties like `hash_tags`, `top_10`, `all_time_favorite`) and specify the mapped event property as `song_id`; you can use these additional properties when doing filtering or breakdowns for events that has `song_id` as an event property.<br/>[Learn more about Lookup Tables](https://help.mixpanel.com/hc/en-us/articles/360044139291-Lookup-tables)|
|Default Properties|Default Properties (for Events and User Profiles) are collected and populated with values automatically in Mixpanel. This can happen upon data ingestion or when using certain Mixpanel client-side SDKs. Typically, they have a dollar sign ($) or “mp_” as prefix to distinguish them from normal properties.<br/>[Learn more about Default Properties](https://help.mixpanel.com/hc/en-us/articles/115004613766-What-properties-do-Mixpanel-s-libraries-store-by-default-)|
|Reserved Properties|Mixpanel reserves certain property names (for Events and User Profiles) for special use cases, and these may or may not be automatically populated with values. The purpose of these Reserved Properties are for processing (eg time) or specific system features (cohort exports). Examples: time, $email, $phone, $name, $created.<br/>Learn more about reserved properties for [Events](https://help.mixpanel.com/hc/en-us/articles/360001355266#reserved-properties-for-events) and [User Profiles](https://help.mixpanel.com/hc/en-us/articles/115004708186#reserved-properties-for-user-profiles)|

## Properties: Supported Data Types
Mixpanel supports five data types for event and user profile properties: String, Numeric, Boolean, Date and List. By choosing the most suitable data type for your properties, you'd be able to apply a set of functions or operators that are most relevant to your properties in Mixpanel reports, and this will give you richer insights about your data.

**String**
- Alphanumeric value e.g. Plan Type = "Free", Artist Name = "Bruno Mars"
- String properties have a character limit of 255 bytes.
- Mixpanel will treat any property value that doesn’t match any other data type as a String.

**Numeric**
- Numeric (integer or decimal) value e.g. Cost = 15.00, Quantity = 5
- You can apply operators such as sum, median and percentile on numeric properties.

**Boolean**
- Mixpanel treats properties as boolean if the value is either the JSON constant `true` or `false` e.g. Favorited = true, Bookmarked = false.
- On Mixpanel, you can typecast any non-boolean property to boolean,
- "false", 0, null, undefined, and empty string will be typecasted to boolean `false`
- "true" and any set value that is not 0 or empty string will be typecasted to boolean `true`

**Date**
- An ISO formatted date `YYYY-MM-DDTHH:MM:SS` in UTC e.g. Last Purchase = "2022-10-30T13:30:25", Last Login = "2022-10-29". Note that all timestamps need to be sent in UTC timezone in an ISO format.
- Mixpanel treats unix timestamps as Numeric property, however, you can typecast it to Date data type.

**List**
- A list of values as a JSON array e.g Favourite Genres = ["Folk","Alternative"] or Favourite Numbers = [1,5,10.0]
- Here are the size limits of List property,
- List event property: 8KB
- List user profile property: 256KB
- Each item in the list: 255 bytes

## Updating User Profile Properties
Mixpanel user profile properties are mutable and they can be updated in a timely manner to reflect the latest state of the users.

You can update user profile properties via [Mixpanel SDK](https://developer.mixpanel.com/docs/javascript#setting-profile-properties) or [Engage API](https://developer.mixpanel.com/reference/profile-set). The following are the operations supported in Mixpanel.

**Setting profile property**
`$set` - Sets a profile property or update a profile property value.
`$set_once` - Sets a profile property only if they do not yet exist on Mixpanel. This ensures that the previous profile property value is not overwritten.

**Updating numeric profile property**
`$add` - Increments or decrements a numeric profile property.

**Updating list profile property**
`$union` - Merges a given list into a List profile property and it ensures there are no duplicate values in the profile property.
`$append` - Appends a value to the end of a List profile property
`$remove` - Removes a value from a List profile property

**Removing profile properties**
`$unset` - Remove a profile property from the user profile
`$delete` - Remove all profile properties from the user profile.

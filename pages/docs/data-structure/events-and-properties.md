# Events And Properties

## Overview

Events are the core of [Mixpanel's Data Model](/docs/tutorials/plan/tracking-strategy#the-mixpanel-data-model). All events should have an <b>Event Name</b>, a <b>Timestamp</b> of when that event has occured, and a <b>[Distinct ID](/docs/tracking-methods/id-management/identifying-users#what-is-distinct-id)</b> (Mixpanel's identifier for a user) to tie all events belonging to the same user. Events can optionally have a set of properties, which describes the event in more detail.

* If you're familiar with databases, events are like tables and properties are like columns.
* If you're familiar with Google Analytics, events are like hits and properties are like dimensions.

> <b>Note:</b> There are a few use cases, such as tracking [Ad Spend](/docs/data-structure/advanced/ad-spend), in which the event should not be tied to specific users; as such, these events should be sent without a Distinct ID, but this is the exception.

For more information about events refer to the documentation on [The Mixpanel Data Model](/docs/tutorials/plan/tracking-strategy#the-mixpanel-data-model).

## Examples

* A `Page Viewed` event might have a property called `Page URL`, which is set to the URL of the page that was viewed.
* A `Signed Up` event might have a property called `Signup Type`, which indicates whether the signup was `organic` vs `referral`.
* A `Song Played` event might have a property called `Song Name`, which is set to the name of the song that was played.
* A `Order Completed` event might have a property called `Items`, which is a list of objects, each of which contains details about an item, like its name, category, and price.

## Use Cases

You can filter, breakdown, and aggregate your events by their properties to answer more questions:

* Which pages do users look at before they visit the pricing page?
* How many sign-ups did I get that were organic vs referral?
* Which song name is most popular among my users?
* How many orders contain shoes? What is the sum total price that users paid for shoes in the last month?

## Best Practices

### Keep Events as Actions

We recommend striking the right balance when defining your events. Events should neither be too broad nor too specific, and should be defined at the level of how you plan to analyse the user's action or behaviour. Also keeping in mind to use event properties to provide context or details about an event, instead of creating different events to capture similar actions. 

<b>For example:</b>

* If your goal is to analyse at high-level how users traverse through different pages: instead of tracking multiple events `Home Page Viewed` and `Pricing Page Viewed`, track a `Page Viewed` event with a `Page Name` property set to <b>"/home"</b> or <b>"/pricing"</b>. See [Tracking Page Views](/docs/tracking-methods/sdks/javascript#tracking-page-views) in our Javascript SDK documentation on how to instrument this.

* If your goal is to track users adding items to a shopping cart: instead of tracking multiple events `Add Shirt to Cart`, `Add Hoodie to Cart`, and `Add Socks to Cart`, track a `Add to Cart` event with a `Item` property set to <b>"Shirt"</b>, or <b>"Hoodie"</b>, or <b>"Socks"</b>.

* If your goal is to track 1 button on a specific screen: instead of tracking multiple events `Blue Button Clicked` and `Checkout Button Clicked`, track a `Button Clicked` event with a `Color` property set to <b>"Blue"</b> and `Button Name` set to <b>"Checkout"</b>.
  
* If your goal is to track different buttons from different user journeys: instead of tracking 1 event `Button Clicked` with `Button Name` property set to <b>"Play"</b>, or <b>"Profile"</b>, or <b>"X"</b>, track them as different events `Song Played` and `Profile Updated` and `Logout` with specific properties for each event to provide richer context.

### Name Events and Properties Consistently

We recommend having a consistent naming convention for your events and properties:

* Generally, adopting snake_case for your event and property names tend to be more robust, especially if you plan to export your Mixpanel data to downstream processes such as data warehouses. Do also note that Mixpanel is case-sensitive (eg `sign_up_completed` vs `Sign Up Completed` are considered two separate events).

* Use the <b>(Object) (Verb)</b> format for event names. Like `song_played` or `page_viewed`.

* Mixpanel [Lexicon](/docs/data-governance/lexicon) provides a means for you to change an event's or property's display name on the UI (if needed, to make it more user-friendly).

### Avoid Creating Events or Property Names Dynamically

For example, don't create an event name like `Purchase (11-01-2019)`. Instead, create an event called `Purchase` and have some property (eg: `Return Date`) set to the dynamic value <b>"11-01-2019"</b>).

> <b>Tip:</b> Learn more best practices around defining your events and properties under our tutorials for [Creating a Tracking Plan](/docs/tutorials/plan/tracking-strategy#tracking-plan-methodology).

## Reserved Event Properties

Mixpanel reserves certain event property names for special processing or for specific system features. These properties, when populated, will affect the way Mixpanel processes your data.

> <b>Note:</b> Also refer to the list of Mixpanel [Default Properties](/docs/data-structure/property-reference#default-properties) indicated in our documentation.

| **Raw Name** | **Display Name** | **Description** |
| ------------ | ---------------- | --------------- |
| token | - | The project's token when sending data via [/track API](https://developer.mixpanel.com/reference/track-event). Not visible via Mixpanel UI reports. |
| ip | - | The `ip` event property is the value to be used for geo location parsing (i.e. `$city`, `$region`, and `mp_country_code`) if `ip` as param to the [/track endpoint](https://developer.mixpanel.com/reference/track-event) has <b>not been</b> set to 1. Our client-side libraries, by default, will set the `ip` param to 1 so geo location is parsed from the incoming request, but this can be disabled or, if you're implementing from the [server-side](/docs/best-practices/server-side-best-practices#tracking-geolocation-http-api), you can include the `ip` event property so it's parsed from it instead of the IP of the incoming request. The `ip` event property is not stored in Mixpanel. |
| $bucket / bucket | - | A reserved property that is hidden from the Mixpanel interface, and will cause other events to not appear in the interface. Do not name any property bucket or $bucket. |
| $distinct_id / distinct_id | Distinct ID | Mixpanel's internal unique identifier for a user. See [Identifying Users](/docs/tracking-methods/id-management/identifying-users). |
| $device_id | Device ID | In [Simplified ID Merge](/docs/tracking-methods/id-management/identifying-users#example-user-flows): unique identifier used to track a device while the user is in anynymous state. |
| $user_id | User ID | In [Simplified ID Merge](/docs/tracking-methods/id-management/identifying-users#example-user-flows): unique identifier used to track a user across devices when user is in identified state. |
| $event_name | Event Name | Name of the tracked event used in the Mixpanel UI. |
| $time / time | Time or Date | A unix time epoch that is used to determine the time of an event. If no time property is provided, we will use the time when the event arrives at our servers. |
| $insert_id | Insert ID | A unique identifier for the event, used to deduplicate events that are accidentally sent multiple times. More details [here](https://developer.mixpanel.com/reference/import-events#propertiesinsert_id). |
| $identified_id | Identified ID | In [Original ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#on-original-id-merge): Internal Mixpanel property to track the identifier passed into the [`$identify`](https://developer.mixpanel.com/reference/create-identity) event. |
| $anon_id | Anonymous ID | In [Original ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#on-original-id-merge): Internal Mixpanel property to track the anonymous ID passed into the [`$identify`](https://developer.mixpanel.com/reference/create-identity) event. |
| alias | Alias | In [Original ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#on-original-id-merge): Internal Mixpanel property to track the alias passed into the [`$create_alias`](https://developer.mixpanel.com/reference/identity-create-alias) event. |
| $distinct_ids | Distinct Ids | In [Original ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#on-original-id-merge): Internal Mixpanel property to track the distinct IDs passed into the [`$merge`](https://developer.mixpanel.com/reference/identity-merge) event. |
| $distinct_id_before_identity | Distinct ID Before Identity | Internal Mixpanel property to track an event's original $distinct_id before it was updated due to identity merging. Used in [Original ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#on-original-id-merge) and [Simplified ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#understanding-simplified-id-merge). |
| $is_reshuffled | Is Reshuffled | Internal Mixpanel property to denote an event was reshuffled (sets to true if original $distinct_id was updated) due to identity merging. Used in [Original ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#on-original-id-merge) and [Simplified ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#understanding-simplified-id-merge). |
| $failure_description | Failure Description | In [Original ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#on-original-id-merge): Mixpanel property explaining in detail why identity merging was not executed. | 
| $failure_reason | Failure Reason | In [Original ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#on-original-id-merge): Mixpanel property summarizing why identity merging was not executed. | 
| $identity_failure_reason | Identity Failure Reason | In [Simplified ID Merge](/docs/tracking-methods/id-management/migrating-to-simplified-id-merge-system#understanding-simplified-id-merge): Mixpanel property summarizing why identity merging was not executed. |
|mp_original_distinct_id | Hotshard Original Distinct ID | Original $distinct_id for an event that was identified as contributing to a [hot shard](https://docs.mixpanel.com/docs/debugging/distinct-id-limits#what-is-a-hot-shard). |
| mp_original_event_name | Hotshard Original Event Name | Original $event_name for an event that was identified as contributing to [hot shard](https://docs.mixpanel.com/docs/debugging/distinct-id-limits#what-is-a-hot-shard). |
| $source | Source | Hidden property used by certain integration partners to denote events were sent by them. Refer to the respective partners under [Cohort Sync -> Integrations](/docs/cohort-sync/integrations/airship). |
| $partner_id | Partner Id | Hidden property used by certain integration partners to denote events were sent by them. Refer to the respective partners under [Cohort Sync -> Integrations](/docs/cohort-sync/integrations/airship). |
| $warehouse_type | Warehouse Type | The type of the warehouse sync setup to send the event. See [Supported Warehouses](/docs/tracking-methods/data-warehouse/overview#supported-warehouses). |
| $warehouse_import_id | Warehouse Import ID | The ID of the warehouse sync setup to send this event. See [Data Warehouse](/docs/tracking-methods/data-warehouse/overview). |
| $warehouse_import_job_id | Warehouse Import Job ID | The internal Mixpanel Job ID of the warehouse sync setup to send this event. See [Data Warehouse](/docs/tracking-methods/data-warehouse/overview). |
| $warehouse_import_run_id | Warehouse Import Run ID | The internal Mixpanel Run ID of the warehouse sync setup to send this event. See [Data Warehouse](/docs/tracking-methods/data-warehouse/overview). |
| $duration_s | Session Duration (Seconds) | The duration between Session Start and Session End events in seconds. See [How Sessions Work](/docs/features/sessions#how-sessions-work). |
| $event_count | Session Event Count | The number of events during a session (i.e. Session Start and Session End). This does not include [Excluded Events](/docs/features/sessions#excluded-events) and [Hidden Events](/docs/data-governance/lexicon#hide-events-and-properties) in Lexicon. See [How Sessions Work](/docs/features/sessions#how-sessions-work). | 
| $origin_start | Session Start Event Name | The original event name that triggered Session Start event. See [How Sessions Work](/docs/features/sessions#how-sessions-work). | 
| $origin_end | Session End Event Name | The original event name that triggered Session End event. See [How Sessions Work](/docs/features/sessions#how-sessions-work). | 

## FAQ

### What types of data can I send as properties?
Mixpanel accepts arbitrary JSON as properties, including strings, numbers, booleans, lists, and objects. See our [API docs](https://developer.mixpanel.com/reference/import-events) for more details.

### What are the limits of events and properties?
We don't have a limit on the total number of events you can send to Mixpanel, but it will factor into your [pricing](https://mixpanel.com/pricing).

We have a soft limit of 2000 distinct event names in a 30 day window. If you send more event names, we'll still ingest them, but those event names will not be indexed and will not appear in our autocomplete menus.

Each event can have up to 2000 properties. Event property names can be at most 255 characters in length (longer names are truncated). Event property values are limited based on data type, refer to these limits under [Supported Data Types](/docs/data-structure/property-reference#supported-data-types).

<b>Note</b>: while events can have up to 2000 properties and batches of events can have up to 2000 events per ingestion batch, some libraries might default to sending the data through the GET protocol which would have a much lower size limit since the information is appended to the URL. If you are hitting the limits on the size of the request, first verify if the method being used is GET and can be switched to POST.

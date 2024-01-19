# Events And Properties

## Overview

Events are the core of [Mixpanel's Data Model](/docs/tutorials/plan/tracking-strategy#the-mixpanel-data-model). All events should have an <b>Event Name</b>, a <b>Timestamp</b> of when that event has occured, and a <b>[Distinct ID](/docs/tracking-methods/id-management/identifying-users#what-is-distinct-id)</b> (Mixpanel's identifier for a user) to tie all events belonging to the same user. Events can optionally have a set of properties, which describe the event in more detail.

* If you're familiar with databases, events are like tables and properties are like columns.
* If you're familiar with Google Analytics, events are like hits and properties are like dimensions.

## Examples

* A `Page Viewed` event might have a property called `Page URL`, which is set to the URL of the page that was viewed.
* A `Signed Up` event might have a property called `Signup Type`, which indicates whether the signup was `organic` vs `referral`.
* A `Song Played` event might have a property called `Song Name`, which is set to the name of the song that was played.
* A `Order Completed` event might have a property called `Items`, which is a list of objects, each of which contains details about an item, like its name, category, and price.

## Use Cases

You can filter, breakdown, and aggregate your events by their properties to answer more questions:

* Which pages do users look at before they visit the pricing page?
* How many Sign-ups did I get that were organic vs referral?
* Which song name is most popular among my users?
* How many orders contain shoes? What is the sum total price that users paid for shoes in the last month?

## Best Practices

### Keep Events as Actions

We recommend striking the right balance when defining your events. Events should neither be too broad nor too specific, and should be defined at the level of how you plan to analyse the user's behaviour. Also keeping in mind to use event properties to provide context or details about an event, instead of creating different events to capture similar actions. 

For example:

* If your goal is to analyse at high-level how users traverse through different pages: instead of tracking events `Home Page Viewed` and `Pricing Page Viewed`, track a `Page Viewed` event with a `Page Name` property set to `/home` or `/pricing`.

* If your goal is to track users adding items to a shopping cart: instead of tracking events `Add Shirt to Cart`, `Add Hoodie to Cart`, and `Add Socks to Cart`, track a `Add to Cart` event with a `Item` property set to `Shirt` or `Hoodie` or `Socks`.

* If your goal is to track 1 button on a specific screen: instead of tracking events `Blue Button Clicked` and `Checkout Button Clicked`, track a `Button Clicked` event with a `Color` property set to `Blue` and `Button Name` set to `Checkout`.
  
* If your goal is to track different buttons from different user journeys: instead of tracking event `Button Clicked` with `Button Name` property set to `Play` or `Profile` or `X`, track events `Song Played` and `Profile Updated` and `Logout` with specific properties for each event to provide more context.

### Name Events and Properties Consistently

We recommend having a consistent naming convention for your events and properties:

* Generally, adopting snake_case for your event and property names tend to be more robust, especially if you plan to export your Mixpanel data to downstream processes such as data warehouses. Do also note that Mixpanel is case-sensitive (eg `sign_up_completed` vs `Sign Up Completed` are considered two separate events).

* Use the `(Object) (Verb)` format for event names. Like "Song Played" or "Page Viewed".

### Avoid Creating Events or Property Names Dynamically

For example, don't create an event name like `Purchase (11-01-2019)`. Instead, create an event called Purchase and have some property (eg: `Return Date`) set to the dynamic value `11-01-2019`).

> Learn more best practices around defining your events and properties under our tutorials for [Creating a Tracking Plan](/docs/tutorials/plan/tracking-strategy#tracking-plan-methodology).

## Reserved Event Properties

Mixpanel reserves certain event property names for special processing or for specific system features. These properties, when populated, will affect the way Mixpanel processes your data.


| **Raw Name** | **Display Name** | **Description** |
| ------------ | ---------------- | --------------- |
| distinct_id / $distinct_id | Distinct ID | Mixpanel's internal unique identifier for a user.  See [Identifying Users](/docs/tracking-methods/id-management/identifying-users)  
| time | Time or Date | A unix time epoch that is used to determine the time of an event. If no time property is provided, we will use the time the event arrives at our servers. |


| mp_original_event_name     | Hotshard Original Event Name  | The original event name for a hotsharded event. See [Distinct ID Limits](/docs/debugging/distinct-id-limits) |
| mp_original_distinct_id    | Hotshard Original Distinct ID | The original distinct id for a hotsharded event. See [Distinct ID Limits](/docs/debugging/distinct-id-limits)|


## FAQ

### What types of data can I send as properties?
Mixpanel accepts arbitrary JSON as properties, including strings, numbers, booleans, lists, and objects. See our [API docs](https://developer.mixpanel.com/reference/import-events) for more details.

### What are the limits of events and properties?
We don't have a limit on the total number of events you can send to Mixpanel, but it will factor into your [pricing](https://mixpanel.com/pricing).

We have a soft limit of 2000 distinct event names in a 30 day window. If you send more event names, we'll still ingest them, but those event names will not be indexed and will not appear in our autocomplete menus.

Each event can have up to 2000 properties. Event property names can be at most 255 characters in length (longer names are truncated). Event property values are limited based on data type, refer to these limits under [Supported Data Types](/docs/data-structure/property-reference#supported-data-types).

**Note**: while events can have up to 2000 properties and batches of events can have up to 2000 events per ingestion batch, some libraries might default to sending the data through the GET protocol which would have a much lower size limit since the information is appended to the URL. If you are hitting the limits on the size of the request, first verify if the method being used is GET and can be switched to POST.

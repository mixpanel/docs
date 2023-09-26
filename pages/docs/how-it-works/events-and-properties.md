# Events And Properties



## Overview
Events are the core of Mixpanel's Data Model. All events have a name, a timestamp, and a user ID. Events can optionally have a set of properties, which describe the event in more detail.
* If you're familiar with databases, events are like tables and properties are like columns.
* If you're familiar with Google Analytics, events are like hits and properties are like dimensions.

## Examples
* A `Page Viewed` event might have a property called `Page URL`, which is set to the URL of the page that was viewed.
* A `Signed Up` event might have a property called `Signup Type`, which indicates whether the signup was `organic` vs `referral`.
* A `Song Played` event might have a property called `Song Name`, which is set to the name of the song that was played.
* A `Order Completed` event might have a property called `Items`, which is a list of objects, each of which contains details about an item, like its name, category, and price.

## Use cases
You can filter, breakdown, and aggregate your events by their properties to answer more questions:
* Which pages do users look at before they visit the pricing page?
* How many Signups did I get that were organic vs referral?
* Which Song Name is most popular among my users?
* How many Orders contain shoes? What is the sum total price that users paid for shoes in the last month?

## Reserved Event Properties
Mixpanel reserves certain event property names; these properties receive special treatment in our UI or are used for special processing.
| Name                       | Display      | Description                                                                                                                                               |
|----------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| distinct_id / $distinct_id | Distinct ID  | Mixpanel's internal unique identifier for a user.  See [Identifying Users](https://docs.mixpanel.com/docs/implementation/identifying-users)             |
| time                       | Time or Date | A unix time epoch that is used to determine the time of an event. If no time property is provided, we will use the time the event arrives at our servers. |
| $city                      | City         | The city of the event sender, parsed from IP.                                                                                                             |
| $region                    | Region       | The region (state or province) of the event sender, parsed from IP.                                                                                       |
| mp_country_code            | Country      | The country of the event sender, parsed from IP.                                                                                                          |
| mp_original_event_name     | Hotshard Original Event Name  | The original event name for a hotsharded event. See [Distinct ID Limits](https://docs.mixpanel.com/docs/tracking/reference/distinct-id-limits) |
| mp_original_distinct_id    | Hotshard Original Distinct ID | The original distinct id for a hotsharded event. See [Distinct ID Limits](https://docs.mixpanel.com/docs/tracking/reference/distinct-id-limits)|

## Best Practices

### Keep Events Generic
We recommend keeping event names generic and using properties for all context. For example:
* Instead of tracking events called `Home Page Viewed` and `Pricing Page Viewed`, track a `Page Viewed` event with a `Page Name` property set to `/home` or `/pricing`.
* Instead of tracking `Blue Button Clicked` or `Checkout Button Clicked`, track `Button Clicked` with a `Color` property set to `Blue` and `Button Name` set to `Checkout`.

### Name Events and Properties Consistently
We recommend having a consistent naming convention for your events and properties. For example:
* Use camel case for your event names.
* Use the `(Object) (Verb)` format for event names. Like "Song Played" or "Page Viewed".


### Avoid Creating Event or Property Names Dynamically
For example, don't create an event name like `Purchase (11-01-2019)`. Instead, create an event called Purchase and have some property (eg: `Return Date`) set to the dynamic value `11-01-2019`).


## FAQ

### What types of data can I send as properties?
Mixpanel accepts arbitrary JSON as properties, including strings, numbers, booleans, lists, and objects. See our [API docs](https://developer.mixpanel.com/reference/import-events) for more details.

### What are the limits of events and properties?
We don't have a limit on the total number of events you can send to Mixpanel, but it will factor into your [pricing](https://mixpanel.com/pricing).

We have a soft limit of 2000 distinct event names in a 30 day window. If you send more event names, we'll still ingest them, but those event names will not be indexed and will not appear in our autocomplete menus.

Each event can have up to 2000 properties. Properties can be at most 255 characters in length (longer strings are truncated).

**Note**: while events can have up to 2000 properties and batches of events can have up to 50 or 2000 events per batch depending on the ingestion endpoint, some libraries might default to sending the data through the GET protocol which would have a much lower size limit since the information is appended to the URL. If you are hitting the limits on the size of the request, first verify if the method being used is GET and can be switched to POST.

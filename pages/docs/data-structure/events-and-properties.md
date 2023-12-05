# Events And Properties

For a comprehensive overview of events and properties, please find this introduction to the **Mixpanel Data Model [here](https://docs.mixpanel.com/docs/what-is-mixpanel#introduction-to-the-data-model).**

In this section, we will be walking through a more in-depth breakdown of the structure of events and properties as the building block of your product analytics journey. 

This step is about understanding the data structure for your user actions so you can start thinking about how you will design your events and event properties for your business.

## Overview
Events are the core of Mixpanel's Data Model. All events have a name, a timestamp, and a user ID. Events can optionally have a set of properties, which describe the event in more detail.
* If you're familiar with databases, events are like tables and properties are like columns.
* If you're familiar with Google Analytics, events are like hits and properties are like dimensions.

## Examples
Here are some examples of what a Mixpanel event might look like. The event name describes the user action or behavior that triggers this event. The event properties add descriptions and context to the action.

![signupcompleted](https://github.com/mixpanel/docs/assets/38046769/ce0c346a-268b-439d-aa05-c645ac260343)
![songplayed](https://github.com/mixpanel/docs/assets/38046769/da8423db-faf2-4a43-bf53-af895ffc7d69)
![ordercompleted](https://github.com/mixpanel/docs/assets/38046769/64bfff2e-f6b2-4c88-94fc-79998f40402b)
![pageviewed](https://github.com/mixpanel/docs/assets/38046769/067ab6fe-d37f-448d-81ad-a5b781e4e122)


## Use cases
Once you have defined all the events and event properties as it aligns to your [Analytics Strategy Framework](https://discover.mixpanel.com/rs/461-OYV-624/images/Guidetoproductmetrics-Mixpanel.pdf), you can start to measure and answer your important use cases.

You can filter, breakdown, and aggregate your events by their properties to answer more questions:
* Which pages do users look at before they visit the pricing page?
* How many Signups did I get that were organic vs referral?
* Which Song Name is most popular among my users?
* How many Orders contain shoes? What is the sum total price that users paid for shoes in the last month?

## Reserved Event Properties
Mixpanel reserves certain event property names; these properties receive special treatment in our UI or are used for special processing.
| Name                       | Display      | Description                                                                                                                                               |
|----------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| distinct_id / $distinct_id | Distinct ID  | Mixpanel's internal unique identifier for a user.  See [Identifying Users](/docs/tracking-methods/identifying-users)             |
| time                       | Time or Date | A unix time epoch that is used to determine the time of an event. If no time property is provided, we will use the time the event arrives at our servers. |
| $city                      | City         | The city of the event sender, parsed from IP.                                                                                                             |
| $region                    | Region       | The region (state or province) of the event sender, parsed from IP.                                                                                       |
| mp_country_code            | Country      | The country of the event sender, parsed from IP.                                                                                                          |
| mp_original_event_name     | Hotshard Original Event Name  | The original event name for a hotsharded event. See [Distinct ID Limits](/docs/debugging/distinct-id-limits) |
| mp_original_distinct_id    | Hotshard Original Distinct ID | The original distinct id for a hotsharded event. See [Distinct ID Limits](/docs/debugging/distinct-id-limits)|

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

---
title: "Events & Properties"
slug: "events-properties"
hidden: false
createdAt: "2021-02-10T21:50:27.202Z"
updatedAt: "2021-09-09T19:23:12.598Z"
---

In this guide, we cover how to effectively use Events and Properties, which are the most key elements of Mixpanel's [Data Model](doc:data-structure-deep-dive)

## Keep Events Generic
We recommend keeping event names generic and using properties for all context. For example:
* Instead of tracking events called `Home Page Viewed` and `Pricing Page Viewed`, track a `Page Viewed` event with a `Page Name` property set to `/home` or `/pricing`.
* Instead of tracking `Blue Button Clicked` or `Checkout Button Clicked`, track `Button Clicked` with a `Color` property set to `Blue` and `Button Name` set to `Checkout`.

## Use 
We recommend having a consistent naming convention for your events and properties. For example:
* Use camel case for your event names.
* Use the `(Object) (Verb)` format for event names. Like "Song Played" or "Page Viewed".



See [Segment's guidelines](https://segment.com/docs/protocols/tracking-plan/best-practices/) for other useful tips.



## FAQ


### What types of data can I send as properties?
Mixpanel accepts arbitrary JSON as properties, including strings, numbers, booleans, lists, and objects. See our [API docs](reference:import-events) for more details.

### What are the limits of events and properties?
We don't have a limit on the total number of events you can send to Mixpanel, but it will factor into your [pricing](https://mixpanel.com/pricing).

We have a soft limit of 2000 distinct event names in a 30 day window. If you send more event names, we'll still ingest them, but those event names will not be indexed and will not appear in our autocomplete menus.

Each event can have up to 2000 properties. Properties can be at most 255 characters in length (longer strings are truncated).


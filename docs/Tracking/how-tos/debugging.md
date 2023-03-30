---
title: "Debugging"
slug: "debugging"
hidden: false
---

Topics to add:

- Following your own events in Events
- Find your profile to follow your events
- Data discrepancies: https://help.mixpanel.com/hc/en-us/articles/115004499403
- Flush interval on mobile
- Missing event names / property names / prop values after 30 days


# Check for Hidden Events and Properties

## Hidden due to Inactivity

Mixpanel’s report dropdown menus hide events that have not been fired within the last 30 days. The events will still be available in the project's raw data, but will not be visible in the UI (we assume it's no longer relevant and hide it to declutter the dropdown menus and improve their performance). Event properties and property values that have not been sent to your project in the last 28 days will also be hidden from dropdowns.

To have an imported event, event property, or property value that’s older than 30 days show in the dropdowns, you can fire a single instance of that event, property, or property value and the data will refurface it in the UI. If you know the name of the event, you can also search for it by typing the name in the dropdown menu.

## Hidden in Lexicon

All users can hide events, event properties, and user profile properties in your [Mixpanel project through Lexicon](https://developer.mixpanel.com/v3.19/docs/lexicon#hide-events-and-properties).

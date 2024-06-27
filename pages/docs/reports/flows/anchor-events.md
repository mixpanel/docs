# Anchor Events

## Overview
Events are the basic building block of a Flows report. Place an anchor event into your Flows report to learn what actions your users take before/after the event.

## Multiple Anchor Events

You can add multiple anchor events in the query builder.

![/Screen_Shot_2021-07-20_at_7.51.32_PM.png](/Screen_Shot_2021-07-20_at_7.51.32_PM.png)

This allows you to examine flows between targeted events. The "+" on the left of the breakpoint line (marked with ≈) will show you the events that happened directly after the first anchored event.

In the following example, Flows is showing the event that happened right after App Open before the made a Purchase.

![/Screen_Shot_2021-07-20_at_7.52.07_PM.png](/Screen_Shot_2021-07-20_at_7.52.07_PM.png)

Use the "+" on the right of the breakpoint line (marked with ≈) will show you the events that happened right before the later anchored event.

For example, below Flows is showing the event that happened directly before a Purchase, but only after the user did App Open.

![/Screen_Shot_2021-07-20_at_7.53.04_PM.png](/Screen_Shot_2021-07-20_at_7.53.04_PM.png)

## Custom Events in Flows

You may pick [custom events](/docs/features/custom-events) as the starting or ending anchor events directly in the query. For custom events that are composed of multiple events, paths consisting of either event are combined into a single flow.

### Custom events as intermediate events

Mixpanel automatically considers the most used and common custom events in your project, displaying them in intermediate steps instead of showing the underlying events. When a custom event is shown instead of the underlying event, it is annotated with the custom event icon to indicate that the event displayed is a custom event.

![/Screen_Shot_2021-07-20_at_7.04.29_PM.png](/Screen_Shot_2021-07-20_at_7.04.29_PM.png)

Mixpanel uses the following criteria to decide which custom events are shown in user flows:

1. Custom events that are shared with all users in the projects are the only ones picked to be shown in flows right now
2. Only the 50 most frequently queried custom events in the project are used in flows analysis.
3. If custom events have overlapping definitions (e.g. both custom events operate on the same event), we will choose the more frequently queried custom event to show in the report.

### Expanding custom events

You may also expand custom events by event name to view the underlying events if required.

![/Screen_Shot_2021-07-30_at_1.21.26_PM.png](/Screen_Shot_2021-07-30_at_1.21.26_PM.png)

### Disabling custom events

You can disable custom events for flows by toggling the Show Custom Events in the dropdown menu below. Custom events that have been manually chosen as steps in the flow will continue to show up, but no other other custom events will be shown.

![/Screen_Shot_2021-10-29_at_10.48.22_AM__1_.png](/Screen_Shot_2021-10-29_at_10.48.22_AM__1_.png)

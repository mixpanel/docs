## Cleaning up data when it gets messy

Even if you start with strong data governance and best practices about how to structure your data, over time, as your product expands or is updated, and as new data governance owners move come on, data can get messy. 

In this section, we will look at tips and tricks on how to clean up messy data when it gets out of hand.

## Leverage Lexicon for a quick spot check

### Dropping events that are not queried

[Lexicon](/docs/admin/data-governance/lexicon) is our data dictionary in Mixpanel, and is where project owners and admins can add / manage descriptions for all events and properties to organize your data.

- Order by volume descending. Are your users querying events with large volume? If not, you might want to think about dropping these events. Dropping events means that they will no longer be ingested in Mixpanel. This is especially helpful for apps, since you don’t need to release new app versions and wait for users to download the latest versions for the code change to take effect (we still recommend that you clean up the code on the backend though!).
- Sometimes, customers may still want these large volume events because they rely on them downstream (via data pipelines). But if you’re not querying the events in Mixpanel itself, you shouldn’t send it in - if you’re on the [events plan](https://docs.mixpanel.com/docs/admin/pricing-and-plans/pricing#monthly-events-calculation), this increases your utilisation; also, this clutters up the UI for users who don’t need to see it there. You could hide the event in the UI in Lexicon, but our recommended approach is to not send this data into Mixpanel at all.
- If you’re leveraging our SDKs and want to continue doing so for ease of leveraging our ID management and default properties, an alternative is to route events from [Mixpanel’s SDKs via a proxy in your own domain](/docs/tracking/how-tos/tracking-via-proxy). This way, you get to push the events required for backend analyses directly into your warehouse, and send only the events users query in our UI to Mixpanel

### Cleaning up display names and adding descriptions for events

It’s always helpful to add descriptions to your events so users know where they are triggered. If you’re an owner or admin, you can add the descriptions directly on the UI itself. You could also export the data into a CSV, update the description there, then import it back into Lexicon if it’s easier to clean up that way. If you leverage Segment, mParticle, or Avo.app, you can use that to import your event names and descriptions that way too.

If you use Figma to identify your events, some customers add their links to the event descriptions as well.

### Adding tags to events
<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/caa348ddf65a44a7b7c24adfd928cb29" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

## Using custom events to combine or filter events
<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/db542d087d494977963992eead54e43c" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

## Cleaning up user profiles

If you want to clean up old user profile properties that are no longer being used, you can use our [Engage API](https://developer.mixpanel.com/reference/profile-delete-property) to remove these old user properties. We also provide a ‘people_unset’ method in the Mixpanel-utils Library [here](https://github.com/mixpanel/mixpanel-utils#unset-properties).

## Other resources

- [Event Approval](/changelogs/2023-06-01-event-approval)
- [Recovering from a hot shard](/docs/tracking/reference/distinct-id-limits)

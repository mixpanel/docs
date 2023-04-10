---
title: "Segment"
slug: "segment"
hidden: false
metadata: 
  title: "CDP Integrations: Segment | Mixpanel Developer Docs"
  description: "Read our documentation on integrating Mixpanel with the Segment Customer Data Platform (CDP) to learn how to identify users, track user actions, and more."
createdAt: "2021-05-19T17:23:52.334Z"
updatedAt: "2023-03-25T21:20:37.414Z"
---
In the simplest form, the Segment libraries (“Sources”) generate messages about what’s happening in your site or app, and send them to the Segment servers. Segment then translates the content of those messages into different formats for use by other tools (which we call ‘Destinations’), and sends the translated messages to those tools. The Segment servers also archive a copy of the data, and can send data to your storage systems (such as databases, warehouses, or bulk-storage buckets).

For detailed instructions on how to install and initialize the Segment library please refer to the [Segment Getting Started Guide](https://segment.com/docs/getting-started/02-simple-install/).

# 1. Integrate with Segment
Once you've installed and initialized a Segment library in your application, in order to get your data into Mixpanel follow the instructions for setting up the [Mixpanel (Actions) Destination](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/)

# 2. Identify Users
The next thing you need to do is identify your users, so that you can understand what your users are really doing. When you call [Segment's `identify` API](https://segment.com/docs/connections/spec/identify/), Mixpanel will set the specified `userId` as the Mixpanel `distinct_id` along with any additional `traits` that you provide.

# 3. Track User Actions
Lastly, track your users' actions using [Segment's `track` API call](https://segment.com/docs/connections/spec/track/).

# 4. Check for Success
[Open up Events View in Mixpanel](http://mixpanel.com/report/events) to view incoming events.
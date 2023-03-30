---
title: "Client-Side vs Server-Side Tracking"
slug: "client-side-vs-server-side-tracking"
hidden: false
metadata: 
  title: "Client-Side Vs Server-Side Tracking | Mixpanel Developer Docs"
  description: "In Mixpanel, you can choose how to stream user actions. Our documentation will help you decide if Client-Side Tracking or Server-Side Tracking is right for you."
createdAt: "2021-02-12T17:20:59.542Z"
updatedAt: "2023-03-25T21:41:15.567Z"
---
If you use our SDKs, there are two general approaches to track events: client-side and server-side. The approach you choose has implications on the quality and comprehensiveness of your data.
[block:callout]
{
  "type": "info",
  "title": "TL;DR: Server-Side > Client-Side",
  "body": "We recommend tracking everything you possibly can via your servers, and only resorting to client-side tracking if necessary."
}
[/block]
## Client-Side Tracking

In this method, events are generated on the client device and sent to the Mixpanel API. There are two types of client-side tracking: web (Javascript) and mobile.

#### Pros
- Easy to track client-side actions and state
- Easy to track anonymous (non-logged in) user data

#### Cons 
- Unreliable, due to ad-blockers. You may lose events for 30-50% of your users. You can resolve this by sending events through a [proxy](doc:collection-via-a-proxy), but it requires a bit more effort
- Difficult to keep metrics consistent across web, iOS, and Android since each requires its own tracking
- Difficult to fix integration mistakes quickly (particularly on mobile applications)
- Tracking will diverge over time due to old mobile clients

## Server-Side Tracking

In this method, you send events from your servers to Mixpanel. For example, when a user loads a web page, a request is made to your web application server. In the code that handles the request, you can create a "Page Loaded" event and send it to Mixpanel. You can use one of our server SDKs (eg: [Python](doc:python)) or send events to our [HTTP API](ref:events) directly.

#### Pros
- Reliable, not susceptible to ad-blockers
- Data is consistent across platforms
- Easier to fix integration mistakes quickly

#### Cons 
- Harder to track user interactions that only happen on the client
- Requires some custom code to track anonymous (non-logged in) users across requests

## Visual Representation
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2e1b3f9-Screen_Shot_2021-02-12_at_1.53.44_PM.png",
        "Screen Shot 2021-02-12 at 1.53.44 PM.png",
        1800,
        1032,
        "#f8f8f8"
      ],
      "sizing": "full"
    }
  ]
}
[/block]
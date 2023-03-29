---
title: "Effective Web Tracking"
slug: "effective-web-tracking"
hidden: false
---

This document gives tips for implementing scalable, maintainable web tracking. If you're just getting started, check out the [quickstart](doc:javascript-quickstart).


# Prefer Server-Side For Important Events

We recommend tracking important events like Signup or Purchase, from your [servers](doc:server) instead of via our Javascript SDK. The source of truth for what constitutes a Signup or a Purchase is usually something on your backend server. If you track those events from your website, they're likely to diverge from the source of truth, which can hurt data trust.

We recommend using our Javascript SDK for events that you can _only_ get on the client -- things like mouse hovers, clicks, scrolls, etc. Any interaction that goes to your servers should be tracked on the server. You can get client-side context like geolocation in your server tracking: see our [effective server-side guide](doc:effective-server-side-tracking) for more details. 



# Use a Proxy
We recommend using a proxy server to track events from your website to Mixpanel. This makes tracking less susceptible to ad-blockers, which results in much higher accuracy. This means that instead of events going straight from your website -> Mixpanel, they will go from your website -> your proxy -> Mixpanel.

Setting up a proxy can be quick; see [our guide](doc:collection-via-proxy) for more details.

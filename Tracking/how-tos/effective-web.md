---
title: "Effective Web Tracking"
slug: "effective-web-tracking"
hidden: false
---

This document gives tips for implementing scalable, maintainable web tracking. If you're just getting started, check out the [quickstart](doc:javascript-quickstart).


# Prefer Server-Side For Important Events

Prefer using our Javascript SDK for events that you can _only_ get on the client -- things like mouse hovers, clicks, scrolls, etc. Anything interaction that makes a call to your servers should be tracked on the server.

We recommend tracking important events, like Signup or Purchase, from your [servers](doc:server) instead of via our Javascript SDK. The source of truth for what constitutes a Signup or a Purchase is usually something on your backend server. If you track those events from your website, they're likely to diverge from the source of truth, which leads to loss of trust in the data.



# Use a Proxy
We recommend using a proxy server to track events from your website to Mixpanel. This makes tracking less susceptible to ad-blockers, which results in much higher accuracy. This means that instead of events going straight from your website -> Mixpanel, they will go from your website -> your proxy -> Mixpanel.

See [our guide](doc:collection-via-proxy) on how to set up a proxy.


# Prefer Local Storage to Cookies
We recommend configuring our SDK to use localStorage instead of cookies for persistence:

```javascript
mixpanel.set_config({'persistence': 'localStorage'})
```

This prevents getting a "Cookie Too Large" error and in general is a more reliable way to persist state on the browser.

---
title: "Effective Server-Side Tracking"
slug: "effective-server-side-tracking"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---

This document gives tips for implementing scalable, maintainable server-side tracking. It augments the [quickstart](docs:server), which you should start with.

# Tracking Geolocation
If you supply the `$ip` property on an event, Mixpanel will enrich the event with `$city`, `$country`, and `$region` properties. Our Web and Mobile SDKs automatically set `$ip` to the IP address of the device that they're installed on.

If you're tracking from your servers, you need to set the `$ip` property of the events to the _client's_ IP address. Most server frameworks provide this out of the box.
* [Django](https://docs.djangoproject.com/en/4.1/ref/request-response/#django.http.HttpRequest.META) exposes this in the request object with `request.META['REMOTE_ADDR']`.
* [Flask](https://flask.palletsprojects.com/en/2.2.x/api/?highlight=remote_addr#flask.Request.remote_addr) exposes this as `request.remote_addr`.
* [Go](https://pkg.go.dev/net/http#Request) exposes this as the `RemoteAddr` field on the http.Request struct.

If you're tracking from many parts of your server code, we recommend creating a helper function that does this for all tracking calls:
```python

from mixpanel import Mixpanel
mp = mixpanel.init("YOUR_TOKEN")

def track_to_mp(request, event_name, properties):
  properties["$ip"] = request.remote_addr
  mp.track(request.remote_user, "Signed Up", properties)

def handle_signup(request):
  # ... logic to process the signup ...

  track_to_mp(request, "Signed Up", {"Signup Type": request.form["type"]})
  
  return "Signup successful!"
```


# Tracking Anonymous Users
Most of the time

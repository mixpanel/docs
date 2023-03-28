---
title: "Effective Server-Side Tracking"
slug: "effective-server-side-tracking"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---

This document gives tips for implementing scalable, maintainable server-side tracking. It augments the [quickstart](docs:server), which you should start with.

## Tracking Geolocation
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


## Tracking Anonymous Users
Our server libraries require that you specify a `user_id` parameter for each event. If you know who the user is at the time that the event is tracked, simply set this to that user's ID in your internal database (ie: that user's primary key in your "users" table).

If _don't_ know the user's identity at the time the event is tracked, then they're an anonymous user. When using our Web or Mobile SDKs, Mixpanel will automatically generate an ID that's local to that user's device. This ID will persist on all events tracked by that user on that device, until you call `identify()` or `reset()`. More on that in our [identity management guide](docs:identity-management).

If you're tracking from servers, you'll need to generate and manage that ID yourself. It takes 3 steps:

### Step 1: Generate an ID
The key is to have an ID that is unique to each user and persists during that user's session. We recommend setting a cookie and using that cookie as the ID. All server frameworks (eg: [Django](https://django-book.readthedocs.io/en/latest/chapter14.html#cookies)) provide a simple way to set and retrieve cookies per request.

### Step 2: Set `$device_id` to that ID
When tracking events from your server, set the `$device_id` property of that event to the ID for the user performing that event. If you're using our SDKs, set the `user_id` parameter to the empty string to indicate that this is an anonymous event.

### Step 3: Start setting `user_id` once the user logs in
Once the user logs in, you know their true ID. Set `user_id` to that ID. Continue setting `$device_id` to the ID generated in step 1. If Mixpanel receives an event with both `$device_id` and `user_id` set, it will create a link between those two users. This is essential to track pre-login and post-login behavior accurately.



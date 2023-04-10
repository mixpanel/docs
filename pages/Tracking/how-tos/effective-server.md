---
title: "Effective Server-Side Tracking"
slug: "effective-server-side-tracking"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---

This document gives tips for implementing scalable, maintainable server-side tracking. If you're just getting started, check out the [quickstart](doc:server).

# Tracking Browser, Device, and OS
Mixpanel's Web and Mobile SDKs parse `User-Agent` into a set of properties about the user's browser, device, and OS. This doesn't happen automatically with server-side tracking, but it's easy to add these properties yourself.

`User-Agent` is a header sent on all requests to your server. Most server frameworks provide a way to access your headers:
* [Django](https://docs.djangoproject.com/en/4.1/ref/request-response/#django.http.HttpRequest.headers) exposes this as `request.headers["User-Agent"]`.
* [Flask](https://flask.palletsprojects.com/en/2.2.x/api/#flask.Request.headers) exposes this as `request.headers["User-Agent"]`.
* [Go](https://pkg.go.dev/net/http#Request) exposes this in `Headers["User-Agent"]` on the http.Request struct.
* [Nginx](http://nginx.org/en/docs/http/ngx_http_log_module.html) exposes this as `$http_user_agent`.

Parse the user agent using a library for your language and send the browser, device, and OS properties to Mixpanel. Here's an example using Python and [uaparser](https://github.com/ua-parser/uap-python):

```python
from mixpanel import Mixpanel
from ua_parser import user_agent_parser

mp = mixpanel.init("YOUR_TOKEN")

def track_to_mp(request, event_name, properties):
  parsed = user_agent_parser.Parse(request.headers["User-Agent"])
  
  # Set parsed values as properties.
  # You can also parse out the browser/device/os versions.
  properties.update({
    "$browser": parsed["user_agent"]["family"],
    "$device": parsed["device"]["family"],
    "$os": parsed["os"]["family"],
  })

  properties["$ip"] = request.remote_addr
  mp.track(request.user_id, "Signed Up", properties)

def handle_signup(request):
  # ... logic to process the signup ...

  track_to_mp(request, "Signed Up", {"Signup Type": request.form["type"]})
  
  return "Signup successful!"
```

# Tracking Geolocation
If you supply the `$ip` property on an event, Mixpanel will enrich the event with `$city`, `$country`, and `$region` properties. Mixpanel's Web and Mobile SDKs automatically set `$ip` to the IP address of the device that they're installed on.

Note: Mixpanel drops the `$ip` address at ingestion and does not store it at rest, to protect a user's privacy.

If you're tracking from your servers, you need to set the `$ip` property of the events to the _client's_ IP address. Most server frameworks provide this out of the box.
* [Django](https://docs.djangoproject.com/en/4.1/ref/request-response/#django.http.HttpRequest.META) exposes this in the request object with `request.META['REMOTE_ADDR']`.
* [Flask](https://flask.palletsprojects.com/en/2.2.x/api/?highlight=remote_addr#flask.Request.remote_addr) exposes this as `request.remote_addr`.
* [Go](https://pkg.go.dev/net/http#Request) exposes this as the `RemoteAddr` field on the http.Request struct.
* [Nginx](http://nginx.org/en/docs/http/ngx_http_log_module.html) exposes this as `$remote_addr`.

We recommend creating a helper function that does this for all tracking calls:
```python
from mixpanel import Mixpanel
mp = mixpanel.init("YOUR_TOKEN")

def track_to_mp(request, event_name, properties):
  properties["$ip"] = request.remote_addr
  mp.track(request.user_id, "Signed Up", properties)

def handle_signup(request):
  # ... logic to process the signup ...

  track_to_mp(request, "Signed Up", {"Signup Type": request.form["type"]})
  
  return "Signup successful!"
```


# Identifying Users
Our server libraries normally require that you specify a `user_id` parameter for each event. If you know who the user is at the time that the event is tracked, simply set this to that user's ID in your internal database (ie: that user's primary key in your "users" table).

If _don't_ know the user's identity at the time the event is tracked, then they're an anonymous user. When using our Web or Mobile SDKs, Mixpanel will automatically generate an ID that's local to that user's device. This ID will persist on all events tracked by that user on that device, until you call `identify()` or `reset()`. More on that in our [identity management guide](doc:identity-management).

If you're tracking from servers, you'll need to generate and manage that ID yourself. **Note: If you're doing this, make sure you leave the _user_id_ positional argument empty in your track calls. See the Python code sample below.**

### Step 1: Generate an ID
The key is to have an ID that is unique to each user and persists during that user's session. We recommend generating a UUID and storing that value in a cookie. All common server frameworks provide a simple way to set and retrieve cookies per request.

### Step 2: Set `$device_id` to that ID
When tracking events from your server, set the `$device_id` property of that event to the ID for the user performing that event.

### Step 3: Set `$user_id` once the user logs in
Once the user logs in, you know their true ID. Set the `$user_id` property to that ID. Continue setting `$device_id` to the ID generated in step 1. If Mixpanel receives an event with both `$device_id` and `$user_id` set, it will create a link between those two users. This is essential to track pre-login and post-login behavior accurately.


Here's a pseudocode example using Django's [cookies](https://django-book.readthedocs.io/en/latest/chapter14.html#cookies) and [authentication](https://django-book.readthedocs.io/en/latest/chapter14.html#using-users). It assumes the client is setting and sending cookies:
```python
import uuid

def track_to_mp(request, event_name, properties):
  # This assumes you've previously set a cookie called "session_id" that is local to the user's session
  # Set `$device_id` to that cookie's value
  properties["$device_id"] = uuid.uuid4()
  
  # Set $user_id if the user is authenticated (logged in).
  if request.user.is_authenticated():
    properties["$user_id"] = request.user.username
  
  # Note: leave the first argument blank here, since we're passing $device_id and $user_id as properties.
  mp.track("", event_name, properties)
  
def handle_pageview(request):
  response = HTTPResponse("...")
    
  track_to_mp(request, "Pageview", {"page_url": request.page_url})
```

Note: if you're on Original ID Merge, you need to send an explicit `$identify` event to link the two IDs. Learn more in our [ID Merge guide](doc:identity-management).



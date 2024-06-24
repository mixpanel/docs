# Server-Side Best Practices

This document gives tips for implementing scalable, maintainable server-side tracking. If you're just getting started, check out the [quickstart](/docs/quickstart/connect-your-data).

## Tracking Browser, Device, and OS
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

  properties["ip"] = request.remote_addr
  mp.track(request.user_id, event_name, properties)

def handle_signup(request):
  # ... logic to process the signup ...

  track_to_mp(request, "Signed Up", {"Signup Type": request.form["type"]})

  return "Signup successful!"
```

## Tracking UTMs and Referrer
Mixpanel's Web SDK parses UTM parameters from the current URL and obtains referrer information from the browser's `document.referrer` property to enable easy marketing analytics. Since this is not automatic for server-side implementations, these properties will need to be added manually to tracked events. Below is an example in Python:

```python
from urllib.parse import urlparse

from mixpanel import Mixpanel

mp = mixpanel.init("YOUR_TOKEN")

def track_to_mp(request, event_name, properties):

  # ... handle additional event properties such as $browser, $device, and $os ...

  if "Referer" in request.headers:
    properties.update({
      "$referrer": request.headers["Referer"]
      "$referring_domain": urlparse(request.headers["Referer"]).hostname
    })

  # assumes query parameters are available as Flask request.args dict
  utm_keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
  utm_values = {key: request.args[key] for key in utm_keys if request.args.get(key)}
  properties.update(utm_values)

  properties["ip"] = request.remote_addr
  mp.track(request.user_id, event_name, properties)
```

## Tracking Geolocation (Server-side)
If you supply the `ip` property on an event, Mixpanel will enrich the event with `$city`, `$country`, and `$region` properties. Mixpanel's Web and Mobile SDKs automatically set `ip` to the IP address of the device that they're installed on.

Note: Mixpanel drops the `ip` address at ingestion and does not store it at rest, to protect a user's privacy.

If you're tracking from your servers, you need to set the `ip` property of the events to the _client's_ IP address. Most server frameworks provide this out of the box.
* [Django](https://docs.djangoproject.com/en/4.1/ref/request-response/#django.http.HttpRequest.META) exposes this in the request object with `request.META['REMOTE_ADDR']`.
* [Flask](https://flask.palletsprojects.com/en/2.2.x/api/?highlight=remote_addr#flask.Request.remote_addr) exposes this as `request.remote_addr`.
* [Go](https://pkg.go.dev/net/http#Request) exposes this as the `RemoteAddr` field on the http.Request struct.
* [Nginx](http://nginx.org/en/docs/http/ngx_http_log_module.html) exposes this as `$remote_addr`.

We recommend creating a helper function that does this for all tracking calls:
```python
from mixpanel import Mixpanel
mp = mixpanel.init("YOUR_TOKEN")

def track_to_mp(request, event_name, properties):
  properties["ip"] = request.remote_addr
  mp.track(request.user_id, "Signed Up", properties)

def handle_signup(request):
  # ... logic to process the signup ...

  track_to_mp(request, "Signed Up", {"Signup Type": request.form["type"]})

  return "Signup successful!"
```

## Tracking Geolocation (HTTP API)

As all server-side calls originate from the same IP, such as the IP of your server, it can have the unintended effect of setting the location of all of your users to the location of your datacenter.
To prevent Ingestion API `/engage` endpoint from taking the IP of the incoming request for geolocation, you can specify the `ip=0` parameter.
```
api.mixpanel.com/engage?verbose=1&ip=0
```

If you want to pass in your own IP address using our [HTTP API](https://developer.mixpanel.com/reference/profile-set) (`/engage#profile-set` endpoint) similar to the way you can with `track()`, pass in a property called `$ip` to the message payload.
```
{
   "$token": "e3bc4100330c35722740fb8c6f5abddc",
   "$distinct_id": "13793",
   "$ip": "72.229.28.185",
   "$set": {
     "Address": "1313 Mockingbird Lane"
   }
}
```
Notice that you need to set `$ip` outside of the $set dictionary. This action overwrites the geographic data on the profile with `distinct_id = 13793` with New York, NY.

> **Note:** default geolocation tracking is based on IP addresses, which are meant to be approximations and **should not be considered fully accurate**, especially at the Region and City level. For use cases in which a high degree of location accuracy is required, you'll want to review the possibility of leveraging latitude and longitude coordinates as specified below.

## Tracking Geolocation (Latitude and Longitude)

If you have access to Latitude and Longitude information, you can specify `$latitude` and `$longitude` in the payload so that Mixpanel will use these properties (instead of the IP address) to infer the closest city. 

**Events**

On events, the event properties must be named `$latitude` and `$longitude` and the values should be in floating point decimal degrees.
```
{
    "event": "Signed Up",
    "properties": {
        "distinct_id": "13793",
        "token": "mytoken",
          "$latitude": 37.77,
          "$longitude": -122.42
    }
}
```

**User Profiles**

On user profile updates, the data must be named `$latitude` and `$longitude` and the values should be in floating point decimal degrees.

You would also need to set `$latitude` and `$longitude` outside of the `$set` dictionary.

You will see profile property `$geo_source=reverse_geocoding` in the Profile UI if location properties were determined through `$latitude` and `$longitude`.

Do note: Reverse geocoding for user profiles is not supported via client-side SDKs.
```
{
    "$token": "mytoken",
    "$distinct_id": "13793",
    "$latitude": 37.77,
    "$longitude": -122.42,
    "$set": {
        "My_property": "my_value"
    }
}
```

## Tracking Page Views
Page view tracking must be done manually for server-side implementations. Here are some general guidelines for tracking page views.

- Track page views as a single event type by using a constant `event_name`
- Track different pages as an event property and not as different events for better analysis
- Plan ahead for handling page views from anonymous users, identified users, and connecting them to merge a user's journey
  - Get started below with [Identifying Users](#identifying-users)
- Fire page view events only on successful responses to the client
- Parse headers and the request URL for common web analytics properties such as referrer and UTM parameters
  - See above for [parsing user agent](#tracking-browser-device-and-os) and [marketing attribution properties](#tracking-utms-and-referrer)

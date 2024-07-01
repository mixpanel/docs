# Geolocation

## Overview
- Geolocation properties found in events and profiles
- $country, $region, $city are default properties tracked by ingestion API
- Also reserved properties; appears in reserved locations in the UI (profile page, etc.)

## Default Geolocation Tracking
- geolocation properties are automatically set by default
- Event geo props set when events are tracked, using IP of the request at the time of tracking.
- Profile geo props are updated whenever profile properties are update or identify is called.

### IP address Parsing
- IP address is not stored
- We pass IP addresses from request, parse it through Maxmind into geolocation properties, then discard IP address value before ingestion.
- IP address is only an approximation. If precision needed, you can manually configure the location of your payloads. See below
  
## Server-side Geolocation Tracking
- sometimes you want to over-ride default behavior.
- Ex: have that info already in DB, server-side implementations, precision using lat/long, etc.
- 3 ways to customize geolocation in your payloads
  
### Define Geolocation Properties
- can override default behavior by manually defining the $country, $region, $city properties in your payload. Detecting these properties in payload will bypass IP parsing mechanism.

**Events**
- define in properties object

```
{
    "event": "Signed Up",
    "properties": {
        "distinct_id": "13793",
        "token": "mytoken",
          "mp_country_code": "US",
          "$city": "San Francisco",
          "$region":"California"
    }
}
```

**Users**
- define om $set object

```
{
    "$token": "mytoken",
    "$distinct_id": "13793",
    "$set": {
        "My_property": "my_value",
        "$country_code": "US",
        "$region": "California",
        "$city": "San Francisco"
    }
}
```


### Define Latitude and Longitude
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

### Define IP Address
- Can manually define IP address value to have Mixpanel parse your chosen IP address instead
- Mixpanel drops IP address at ingestion. If you want to store it, name the property something else
- Events uses "ip", engage uses "$ip"

If you're tracking from your servers, you need to set the `ip` property of the events to the _client's_ IP address. Most server frameworks provide this out of the box.
* [Django](https://docs.djangoproject.com/en/4.1/ref/request-response/#django.http.HttpRequest.META) exposes this in the request object with `request.META['REMOTE_ADDR']`.
* [Flask](https://flask.palletsprojects.com/en/2.2.x/api/?highlight=remote_addr#flask.Request.remote_addr) exposes this as `request.remote_addr`.
* [Go](https://pkg.go.dev/net/http#Request) exposes this as the `RemoteAddr` field on the http.Request struct.
* [Nginx](http://nginx.org/en/docs/http/ngx_http_log_module.html) exposes this as `$remote_addr`.

**Events**
- Events use "ip" inside properties object
```
{
    "event": "Signed Up",
    "properties": {
        "distinct_id": "13793",
        "token": "mytoken",
          "ip": "136.24.0.114"
    }
}
```

**Users**
- Engage use "$ip" outside $set onject

```
{
    "$token": "mytoken",
    "$distinct_id": "13793",
    "$ip": "136.24.0.114",
    "$set": {
        "My_property": "my_value"
    }
}
```

#### Ignore IP Address

As all server-side requests originate from the same IP, such as the IP of your server, it can have the unintended effect of setting the location of all of your users to the location of your datacenter. To prevent the Engage API from updating your profile geolocation using the IP address of the incoming request, you can set the $ip to 0 in your payload.

```
// $ip set to 0
// Engage API will ignore not parse the IP address
// Geolocation will not be updated
{
    "$token": "mytoken",
    "$distinct_id": "13793",
    "$ip": "0",
    "$set": {
        "My_property": "my_value"
    }
}
```

You can set append `ip=0` to your request URL to set $ip to 0 for all your Engage requests.

```
api.mixpanel.com/engage?verbose=1&ip=0
```

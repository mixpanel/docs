# Server-side ID Management

> Call out to check ID Management version

## Overview

Our server libraries normally require that you specify the distinct_id value for each event. If you _don't_ know the user's identity at the time the event is tracked, then they're an anonymous user. When using our Web or Mobile SDKs, Mixpanel will automatically generate an ID that's local to that user's device. This ID will persist on all events tracked by that user on that device, until you call `identify()` or `reset()`. More on that in our [identity management guide](/docs/tracking-methods/id-management/).

If you're tracking from servers, you'll need to generate and manage that ID yourself. When you have hybrid implementations (events also come from the client-side), you could optionally send the ID generated on the client to the server and keep it as a session variable instead of generating a new one.

## Identifying Users Server-side

### Step 1: Generate an anonymous ID
The key is to have an ID that is unique to each user and persists during that user's session. We recommend generating a UUID and storing that value in a cookie. All common server frameworks provide a simple way to set and retrieve cookies per request.

### Step 2: Leverage this ID for anonymous events

If your project is using [Original ID Merge API](/docs/tracking-methods/id-management/original-id-merge/), track anonymous user events from your server, setting the `distinct_id` event property to the anonymous ID generated.

If your project is using [Simplified ID Merge API](/docs/tracking-methods/id-management/simplified-id-merge/), track anonymous user events from your server, setting the `$device_id` event property to the anonymous ID generated. You do not need to set the `distinct_id` property since it will be assumed to `$device_id` if there is no `$user_id` in the event.

### Step 3: Set the authenticated ID once users log in

Once the user logs in, you know their true ID, you should leverage the new ID for the user.

If your project is using [Original ID Merge API](/docs/tracking-methods/id-management/original-id-merge/), send an `$identify` event, combining the anonymous ID and the authenticated ID. Events after this should use the authenticated ID. Learn more in our [Original ID Merge guide](/docs/tracking-methods/id-management/original-id-merge/).

If your project is using [Simplified ID Merge API](/docs/tracking-methods/id-management/simplified-id-merge/), set the `$user_id` property to the authenticated ID and continue setting `$device_id` to the anonymous ID generated in step 1, including both the `$user_id` and `$device_id` in your events moving forward. If Mixpanel receives an event with both `$device_id` and `$user_id` set, it will merge the two IDs together. This is essential to track pre-login and post-login behavior accurately. The `distinct_id` will be assumed to the `$user_id`. If you choose to manually define the `distinct_id` property, it should be the same value as the `$user_id`.

**Example python code**

Here's a pseudocode example using Django's [cookies](https://django-book.readthedocs.io/en/latest/chapter14.html#cookies) and [authentication](https://django-book.readthedocs.io/en/latest/chapter14.html#using-users). It assumes the client is setting and sending cookies:
```python
import uuid

def track_to_mp(request, event_name, properties):
  # This assumes you've previously set a cookie called "SESSION_ID" that is local to the user's session
  # Set `$device_id` to that cookie's value
  properties["$device_id"] = request.cookies.get('SESSION_ID')

  # Set $user_id if the user is authenticated (logged in).
  if request.user.is_authenticated():
    properties["$user_id"] = request.user.username

  # Note: leave the first argument blank here, since we're passing $device_id and $user_id as properties.
  mp.track("", event_name, properties)

def identify_user(request):
  properties = {
    "$device_id": uuid.uuid4(),
    "$identified_id": request.user.username

  }
  track_to_mp(request, "$identify", properties)
```

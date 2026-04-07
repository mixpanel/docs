# Track Events

## Overview

This step introduces the `track` method, which allows you to see how your users are using your product.

Use the track method to track events on behalf of your users. Add this code snippet to basic events like "Sign Up" and any additional events that may track the core features of your product.

## Code

Replace `Sign Up` with a unique identifier for the event. Passing additional information is possible using the properties object.

{% tabs %}
{% tab title="Javascript" %}
```js Javascript
mixpanel.track('Sign Up', {
  'Signup Type': 'Referral'
})
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](https://mixpanel.com/report/events).

**More resources:**
_ Video: [Debug Common Issues When Installing Mixpanel on Web](https://www.loom.com/share/fbba03274dc441b49b578e8a734b1d99).
_ Docs: [Read the Full Javascript SDK Docs](../../tracking-methods/sdks/javascript.md) \* Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="Python" %}
```python Python
# Note: you must supply the USER_ID
mp.track('USER_ID', 'Sign Up',  {
  'Signup Type': 'Referral'
})
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](https://mixpanel.com/report/events).

**More resources:**
_ Docs: [Read the Python SDK Doc](../../tracking-methods/sdks/python.md)
_ Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="PHP" %}
```shell php
$mp->track("button clicked", array("label" => "sign-up"));
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](https://mixpanel.com/report/events).

**More resources:**
_ Docs: [Read the Python SDK Doc](../../tracking-methods/sdks/php.md)
_ Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="Node.js" %}
```js Node.js
// Note: you must supply the USER_ID
mixpanel.track("Sign Up", {
  distinct_id: "USER_ID",
  "Signup Type": "Referral",
});
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](https://mixpanel.com/report/events).

**More resources:**
_ Docs: [Read the Node.js SDK Doc](../../tracking-methods/sdks/nodejs.md)
_ Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="Go" %}
```go Go
exampleEvent = mp.NewEvent("Sign Up", "USER_ID", map[string]any{
    "Signup Type": "Referral",
})

err := mp.Track(ctx,
[]\*mp.PeopleProperties{
exampleUser,
},
)

````

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](https://mixpanel.com/report/events).

**More resources:**
* Docs: [Read the Go SDK Doc](../../tracking-methods/sdks/go.md)
* Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="Ruby" %}
```ruby Ruby
# Note: you must supply the USER_ID
mp.track('USER_ID', 'Sign Up', {
  'Signup Type' => 'Referral'
})
````

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](https://mixpanel.com/report/events).

**More resources:**
_ Docs: [Read the Ruby SDK Doc](../../tracking-methods/sdks/ruby.md)
_ Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="Java" %}
```java Java
import com.mixpanel.mixpanelapi.ClientDelivery;

// You can send properties along with events
JSONObject props = new JSONObject();
props.put("Signup Type", "Referral");

// Create an event
JSONObject sentEvent = messageBuilder.event(userId, "Sign Up", props);

ClientDelivery delivery = new ClientDelivery();
delivery.addMessage(sentEvent);

// Send the update to mixpanel
MixpanelAPI mixpanel = new MixpanelAPI();
mixpanel.deliver(delivery);

````

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](https://mixpanel.com/report/events).

**More resources:**
* Docs: [Read the Java SDK Doc](../../tracking-methods/sdks/java.md)
* Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="React Native" %}
```javascript
mixpanel.track("Sign Up", {
  "Signup Type": "Referral"
})
````

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page.

**More resources:**
_ Docs: [Read the React Native SDK Doc](../../tracking-methods/sdks/react-native.md)
_ Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="Flutter" %}
```java
mixpanel.track('Sign Up', {
  'Signup Type': 'Referral'
});
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page.

**More resources:**

- Docs: [Read the Flutter SDK Docs](../../tracking-methods/sdks/flutter.md)
- Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="iOS (Objective-C)" %}
```objc
[mixpanel track:@"Signed Up" properties:
    @{ @"Signup Type": @"Referral" }
];
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page.

**More resources:**

- Docs: [Read the iOS (Objective-C) SDK Doc](../../tracking-methods/sdks/ios.md)
- Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="iOS (Swift)" %}
```swift
Mixpanel.mainInstance().track(event:"Sign Up", properties: [
    "Signup Type": "Referral",
])
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page.

**More resources:**
_ Docs: [Read the iOS (Swift) SDK Doc](../../tracking-methods/sdks/swift.md)
_ Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="Android" %}
```java
JSONObject props = new JSONObject();
props.put("Signup Type", "Referral");
mp.track("Signed Up", props);
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page.

**More resources:**
_ Docs: [Read the Android SDK Doc](../../tracking-methods/sdks/android.md)
_ Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="Unity" %}
```csharp
var props = new Value();
props["Signup Type"] =  "Referral";
Mixpanel.Track('Sign up', props);
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page.

**More resources:**
_ Docs: [Read the Unity SDK Doc](../../tracking-methods/sdks/unity.md)
_ Github: [Browse the Open Source SDKs](https://github.com/mixpanel)
{% endtab %}

{% tab title="HTTP API" %}
If you don't see an SDK or an integration in your language, you can send events to our API directly.

Here's a sample script. Replace `YOUR_TOKEN` with your project token. You can find your token [here](https://mixpanel.com/settings/project).

```python test.py
# Fill this out
import json
import time
import requests

events = [
    {"event": "my_test_event", "properties": {"time": int(time.time()), "distinct_id": "test_user_1", "$insert_id": "04ce0cf4-a633-4371-b665-9b45317b4976", "city": "San Francisco"}},
    {"event": "another_event", "properties": {"time": int(time.time()), "distinct_id": "test_user_2", "$insert_id": "3b033b9a-6bc9-4b70-90c3-a53e11f6896e", "city": "Seattle"}}
]
resp = requests.post(
    "https://api.mixpanel.com/import",
    params={"strict": "1"},
    auth=("YOUR_TOKEN", ""),
    headers={"Content-Type": "application/json"},
    data=json.dumps(events)
)

print(resp.json())
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page.

See our [API reference](https://developer.mixpanel.com/reference/events) for more details.

**Best Practices for Scale**

You can use this API at scale, for example to backfill historical data into Mixpanel or as part of a high-throughput streaming pipeline. We provide walkthroughs for [Amazon S3](../../data-pipelines/old-pipelines/integrations/schematized-aws-pipeline.md) and [Google Cloud Storage](../../data-pipelines/old-pipelines/integrations/schematized-gcs-pipeline.md) to provide a more production-grade example of how to use this API at scale.

Here are some other best practices:

- Be explicit about what is tracked to Mixpanel rather than implicitly tracking everything, both for performance and security reasons. Avoid sending user generated content, high-cardinality IDs, or large semi-structured objects.
- Import a more recent time window first (last 7 days or last 30 days) before backfilling historical data. Mixpanel's autocomplete menus populate events and properties based on the last 30 days of data, so this is the best way to test that data looks as expected.
- Leverage batching and compression. Each request to /import can send 2000 events to Mixpanel and can be sent compressed using gzip. The sample code in this guide does both.
- When using Cloud Storage, partition files into ~200MB of JSON (or ~200K records) each. Each file is processed in parallel by Cloud Functions/Lambda and must be ingested by the function within the configured timeout.
- Log any 400 errors returned by the API. These are non-retryable and indicate something malformed with the data. This should be extremely unlikely once the API is up and running. If a batch contains a mix of valid and invalid data, we will ingest the valid data.

**Limits**

Our Import API is built to ingest billions of events per day across our customers. That said, we do rate limit at very high scale to ensure quality of service and real-time ingestion. Please refer to our [Import API docs](https://developer.mixpanel.com/reference/import-events) for details.

All of our sample code transparently retries and backoff from rate limit exceptions. If you require a higher-limit for a 1-time backfill, please reach out to us at apis@mixpanel.com.
{% endtab %}

{% endtabs %}

<hr></hr>
<div class="bg-base100 rounded-xl">
  <h2 class="text-2xl font-medium mb-2 color:bg-purple200">
    You're Ready to Start Using Mixpanel
  </h2>
  <p>
    It's time to create your first [report](../../reports.md) or use one
    of our [many templates](../../boards/templates.md).
  </p>
  <a href="https://mixpanel.com" class="button primary">Open Mixpanel</a>

## FAQ

<div class="faqComponent" >

<details>
<summary>Does Mixpanel automatically track page views?</summary>

Yes, if you pass `track_pageview: true` in the `mixpanel.init()` call,
  Mixpanel will automatically track a "Page View" event every time a new page is
  loaded. Learn more
  [here](../../tracking-methods/sdks/javascript.md#tracking-page-views).
</details>

<details>
<summary>Why aren't my events showing up?</summary>

If tracking from the web, make sure you've disabled ad blockers and your Do Not Track (DNT) 
  browser settings are set to false when testing your JavaScript implementation. If 
  the DNT setting is set to true, then Mixpanel won't collect information from that Mixpanel 
  instance. We also recommend [setting up a proxy server](../../tracking-methods/sdks/javascript.md#tracking-via-proxy) 
  so that you don't lose events due to ad-blockers.

If tracking from a mobile device, events may take 1-2 minutes to appear because Mixpanel's
mobile SDKs buffer events for 1 minute, or when the app transitions to the background, to
conserve battery life and bandwidth. You can call `.flush()` in the mobile SDKs to manually flush events to Mixpanel.
</details>

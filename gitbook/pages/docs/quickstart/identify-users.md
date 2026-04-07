# Identify Users

## Overview

This step introduces the `identify` method, which allows you to see which users triggered each event in Mixpanel.

It also introduces the `people.set` method, which allows you to define the attributes of each user.

## Code

Replace `USER_ID` with a unique identifier, preferably the user ID from your database.

Including the user's email is also suggested, along with any additional **User Properties** such as name, avatar, created date, etc.

{% tabs %}
{% tab title="Javascript" %}
```js Javascript
mixpanel.identify('USER_ID')

mixpanel.people.set({ '$name': 'Jane Doe',
                      '$email': 'jane.doe@example.com',
'plan' : 'Premium'
// Add anything else about the user here
});

````
{% endtab %}

{% tab title="Python" %}
```python
mp.people_set('USER_ID', {'$name'  : 'Jane Doe',
                          '$email' : 'jane.doe@example.com',
                          'plan' : 'Premium'
                          # Add anything else about the user here
})
````

You may want to disable ip geolocation when using a server-side SDK. You can learn more in [Server-Side Best Practices](/docs/tracking-best-practices/server-side-best-practices)
{% endtab %}

{% tab title="PHP" %}
```shell php
// create/update a profile for user id 12345
$mp->people->set('USER_ID', array(
    '$name'             => "John Doe",
    '$email'            => "john.doe@example.com",
    '$phone'            => "5555555555",
    "Favorite Color"    => "red"
));
````

You may want to disable ip geolocation when using a server-side SDK. You can learn more in [Server-Side Best Practices](/docs/tracking-best-practices/server-side-best-practices)
{% endtab %}

{% tab title="Node" %}
```javascript
mixpanel.people.set('USER_ID', {
    $name: 'Jane Doe',
    $email: 'jane.doe@example.com',
    plan: 'premium'
    // Add anything else about the user here
});
```
{% endtab %}

{% tab title="Go" %}
```go
exampleUser := mp.NewPeopleProperties("USER_ID", map[string]any{
  "$name": "Jane Doe",
  "$email": "jane.doe@example.com",
  "plan": "Premium"
  // Add anything else about the user here
})

err := mp.PeopleSet(ctx, []\*mixpanel.PeopleProperties{
exampleUser,
},
)

````

You may want to disable ip geolocation when using a server-side SDK. You can learn more in [Server-Side Best Practices](/docs/tracking-best-practices/server-side-best-practices)
{% endtab %}

{% tab title="Ruby" %}
```ruby
mp.people.set('USER_ID', {
    '$name' => 'Jane Doe',
    '$email' => 'jane.doe@example.com',
    'plan' => 'Premium'
    # Add anything else about the user here
});
````

You may want to disable ip geolocation when using a server-side SDK. You can learn more in [Server-Side Best Practices](/docs/tracking-best-practices/server-side-best-practices)
{% endtab %}

{% tab title="Java" %}
```java
JSONObject props = new JSONObject();
props.put("$name", "Jane Doe");
props.put("$email", "jane.doe@example.com");
props.put("plan", "Premium");
JSONObject update = messageBuilder.set("USER_ID", props);

// Send the update to mixpanel
mixpanel.sendMessage(update);

````
{% endtab %}

{% tab title="Javascript" %}
```javascript Javascript
mixpanel.identify("USER_ID");

// Identify must be called before properties are set
mixpanel.getPeople().set("$name", "Jane Doe");
mixpanel.getPeople().set("$email", "jane.doe@example.com");
mixpanel.getPeople().set("plan", "Premium");
````

You may want to disable ip geolocation when using a server-side SDK. You can learn more in [Server-Side Best Practices](/docs/tracking-best-practices/server-side-best-practices)
{% endtab %}

{% tab title="Flutter" %}
```java
mixpanel.identify("USER_ID");

// Identify must be called before properties are set
mixpanel.getPeople().set("$name", "Jane Doe");
mixpanel.getPeople().set("$email", "jane.doe@example.com");
mixpanel.getPeople().set("plan", "Premium");

````
{% endtab %}

{% tab title="iOS (Objective-C)" %}
```objc Objective-C
[mixpanel identify:@"USER_ID"];

[mixpanel.people set:@{@"$name": @"Jane Doe"}];
[mixpanel.people set:@{@"$email": @"jane.deo@example.com"}];
[mixpanel.people set:@{@"plan": @"Premium"}];
````
{% endtab %}

{% tab title="Swift" %}
```swift Swift
Mixpanel.mainInstance().identify(distinctId: "USER_ID")

Mixpanel.mainInstance().people.set(properties: [ "$name":"Jane Doe",
"$email":"jane.doe@example.com",
"$plan":"Premium"])

````
{% endtab %}

{% tab title="Java" %}
```java Java
// The second param is a flag for allowing profile updates
mp.identify("USER_ID", true);

// Identify must be called before properties are set
mp.getPeople().set("$name", "Jane Doe");
mp.getPeople().set("$email", "jane.doe@example.com");
mp.getPeople().set("plan", "Premium");
````
{% endtab %}

{% tab title="Unity" %}
```csharp
Mixpanel.Identify("USER_ID");

// Identify must be called before properties are set
Mixpanel.People.Set("$name", "Jane Doe");
Mixpanel.People.Set("$email", "jane.doe@example.com");
Mixpanel.People.Set("plan", "Premium");

````
{% endtab %}

{% tab title="HTTP API" %}
If you don't see an SDK or an integration in your language, you can send events to our API directly.

Here's a sample script. Replace `YOUR_TOKEN` with your project token. You can find your token [here](https://mixpanel.com/settings/project).

```python test.py
import requests

url = "https://api.mixpanel.com/engage#profile-set"

payload = [
    {
        "$token": "YOUR_TOKEN",
        "$distinct_id": "USER_ID",
        "$set": {
            "$name": "Jane Doe",
            "$email": "jane.doe@example.com",
            "plan": "Premium"
        }
    }
]
headers = {
    "accept": "text/plain",
    "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
````

**Best Practices for Scale**

You can use this API at scale, for example to backfill historical data into Mixpanel or as part of a high-throughput streaming pipeline. We provide walkthroughs for [Amazon S3](/docs/data-pipelines/old-pipelines/integrations/schematized-aws-pipeline) and [Google Cloud Storage](/docs/data-pipelines/old-pipelines/integrations/schematized-gcs-pipeline) to provide a more production-grade example of how to use this API at scale.

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

🎉 Congratulations, you've tracked your first user! You can see them in Mixpanel via the [Users page](https://mixpanel.com/report/users).

{/* Next Section */}

<hr></hr>

<div class="bg-base100 rounded-xl">
  <h2 class="text-2xl font-medium mb-2 color:bg-purple200">
    Next: Track Events
  </h2>
  <p>
    Once you've implemented `identify`, it's time to track what your users are
    doing in your product.
  </p>
  <a href="/docs/quickstart/track-events/" class="button primary">Track Events in Your Product</a>

## FAQ

<div class="faqComponent" >

<details>
<summary>How do I connect events from logged-out to logged-in users?</summary>

If tracking client-side, just call `.identify(<user_id>)` when a user logs in and `.reset()`
 when they log out. Mixpanel will automatically stitch the user journey across
  logged out and logged in.

If tracking server-side, check out our [server-side best practices guide](/docs/best-practices/server-side-best-practices).
For more information, read our comprehensive guide on [Identifying Users](/docs/tracking-methods/id-management/identifying-users).
</details>

<details>
<summary>What does Mixpanel track automatically?</summary>

Mixpanel's Data Ingestion APIs and Client-Side SDKs automatically collect certain properties on every event 
or user profile update. Examples include: location, operating system, device, etc. Mixpanel calls this auto-generated data "Default Properties".

[Learn More About Default Properties](/docs/data-structure/property-reference#default-properties)
</details>

<details>
<summary>How can I track in a privacy compliant way?</summary>

If a user opts out of tracking, you can call the `.optOutTracking()` method on any of our 
  client-side SDKs; this prevents any subsequent data being tracked from that user's device. 
  Learn more [here](/docs/privacy/protecting-user-data).

For iOS specifically: Mixpanel does not use IDFA, so it does not require user permission
through the AppTrackingTransparency(ATT) framework. For more details, refer to our
[Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details).
</details>

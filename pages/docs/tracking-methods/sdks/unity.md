# Mixpanel SDKs: Unity

### Getting Started

Please refer to our [Quickstart Guide](/docs/quickstart/connect-your-data?sdk=unity).

The [Full API Reference](http://mixpanel.github.io/mixpanel-unity/api-reference/annotated.html), [Library Source Code](https://github.com/mixpanel/mixpanel-unity), and an [Example Application](https://github.com/mixpanel/mixpanel-unity#examples) is documented in our GitHub repo.

## Installing the Library

This library can be installed using the unity package manager system with git. We support Unity 2018.3 and above. For older versions of Unity, you need to have .NET 4.x Equivalent selected as the scripting runtime version in your editor settings.

* In your unity project root open ./Packages/manifest.json
* Add the following line to the dependencies section "com.mixpanel.unity": "https://github.com/mixpanel/mixpanel-unity.git#master",
* Open Unity and the package should download automatically
Alternatively you can go to the [releases page](https://github.com/mixpanel/mixpanel-unity/releases) and download the .unitypackage file and have unity install that.

## Initializing the Library

To start tracking with the Mixpanel Unity library, you must first initialize it with your project token. You can find your token by clicking your name in the upper right hand corner of your Mixpanel project and selecting Settings from the dropdown.

#### Configuring Mixpanel
To initialize the library, first open the unity project settings menu for Mixpanel. (Edit -> Project Settings -> Mixpanel) Then, enter your project token into the Token and Debug Token input fields within the inspector.
![image](/230697675-388145e0-bd47-42b9-8276-3be22d157529.png)


Once you've initialized the library with your project token, you can import Mixpanel into your code using the mixpanel namespace.
```csharp
using mixpanel;

// Then, you can track events with
Mixpanel.Track("Plan Selected");
```

Once you've initialized the library, you can track an event using [`Mixpanel.Track()`](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#a6a0f4b79670d7bbd50c849af2b12a8e1) with the event name and properties.

```csharp
var props = new Value();
props["Gender"] = "Female";
props["Plan"] = "Premium";

Mixpanel.Track("Plan Selected", props);
```

#### Flushing Events
To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers periodically while your application is running. On Unity, you can configure the interval at which data is flushed to Mixpanel. The default time is that data gets flushed every 60 seconds.

## Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using [`Mixpanel.StartTimedEvent`](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#ab1a62f4c9b0e28915dfdc57e7810bc78) This will mark the "start" of your action, which you can then finish with a track call. The time duration is then recorded in the "Duration" property.

```csharp
Mixpanel.StartTimedEvent("Image Upload");

Mixpanel.Track("Image Upload");
```

## Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the **user** rather than about a specific event—for example, the user's age, gender, or source.

To make things easier, you can register these properties as **super properties**. If you do, we will automatically include them with all tracked events. Super properties are saved to device storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](/docs/data-structure/property-reference).

To set super properties, call [`Mixpanel.Register.`](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#acf2fccd7625dfb2a15ef54fcaf8ddfe4)

```csharp
// Send a "User Type: Paid" property will be sent
// with all future track calls.
Mixpanel.Register("User Type", "Paid");
```

Going forward, whenever you track an event, super properties will be included as properties. For instance, if you call

```csharp
var props = new Value();
props["signup_button"] = "test12";

Mixpanel.Track("signup", props);
```

after making the above call to Mixpanel.Register, it is just like adding the properties directly:

```csharp
var props = new Value();
props["signup_button"] = "test12";
props["User Type"] = "Paid";

Mixpanel.Track("signup", props);
```

#### Setting Super Properties Only Once
If you want to store a super property only once (often for things like ad campaign or source), you can use [`Mixpanel.RegisterOnce`](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#a148783e1cfca22df973a6a6b0eba1641). This function behaves like [`Mixpanel.Register`](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#acf2fccd7625dfb2a15ef54fcaf8ddfe4) and has the same interface, but it doesn't override super properties you've already saved.

```csharp
Mixpanel.RegisterOnce("source", "ad-01");
```

This means that it's safe to call `Mixpanel.RegisterOnce` with the same property on every app load, and it will only set it if the super property doesn't exist.

#### Super Properties Live in Local Storage

Mixpanel's server-side libraries do not automatically append "super properties" to their events. You are more than welcome to roll your own system to append whatever properties you'd like to events for a given user. The most important thing to note when dealing with appending properties server side is that you must include a value for the (traditionally super) property "distinct_id" in order to use the events in most Mixpanel reports. The distinct_id property ties an event to a specific user.


## Managing User Identity

You can handle the identity of a user using the `identify` and `alias` methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms.

### Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they visit the site.

Call `identify` when you know the identity of the current user, typically after log-in or sign-up. We recommend against using `identify` for anonymous visitors to your site.
```csharp
// Associate all future events sent from
// the library with the distinct_id 13793
Mixpanel.Identify('13793');
```

### Call Reset at Logout
[Reset](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel.html#af80b55f985b94780ec983dc6c1210d6b) generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identifying Users](/docs/tracking-methods/id-management/identifying-users) article.

## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel's [User Analytics](https://mixpanel.com/people/) product. Profiles are persistent sets of properties that describe a user—things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

#### Setting Profile Properties

You can set properties on a user profile with [`Mixpanel.people.Set`](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel_1_1_people.html#aa8eaa02cc76fc8ad1076b00ca1772dc6).

```csharp
// mixpanel identify: must be called before
// user profile properties can be set
Mixpanel.Identify("13793");

// Sets user 13793's "Plan" attribute to "Premium"
Mixpanel.People.Set("Plan", "Premium");
```

This will set a "Plan" property, with a value "Premium," on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium."

#### Incrementing Numeric Properties

You can use [`Mixpanel.people.Increment`](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel_1_1_people.html#a3f019d6f12504f7b4c565cfc747041fd) to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.

```csharp
// Here we increment the user's point count by 500.
Mixpanel.People.Increment("point count", 500);
```

#### Other Types of Profile Updates

There are a few other types of profile updates. To learn more, please see the [full API reference](http://mixpanel.github.io/mixpanel-unity/api-reference/annotated.html).

## Tracking Revenue

Mixpanel makes it easy to analyze the revenue you earn from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with [`Mixpanel.people.TrackCharge`](http://mixpanel.github.io/mixpanel-unity/api-reference/classmixpanel_1_1_mixpanel_1_1_people.html#ae0f80a6831618f591542f230f821e665). This call will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.

```csharp
// Make sure identify has been called before making revenue
// updates
Mixpanel.Identify("13793");

// Tracks $100 in revenue for user 13793
Mixpanel.People.TrackCharge(100);

// Refund this user 50 dollars
Mixpanel.People.TrackCharge(-50);

// Tracks $25 in revenue for user 13793 on the 2nd of
// January
var props = new Value();
props["time"] = "2012-01-02T00:00:00";

Mixpanel.People.TrackCharge(25, props);
```

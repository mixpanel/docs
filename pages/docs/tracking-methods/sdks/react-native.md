# React Native

## Getting Started

Please refer to our [Quickstart Guide](/docs/quickstart/connect-your-data?sdk=reactnative).

The [Full API Reference](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html), [Library Source Code](https://github.com/mixpanel/mixpanel-react-native), and an [Example Application](https://github.com/mixpanel/mixpanel-react-native/tree/master/Samples) is documented in our GitHub repo.

## Sending Events

We recommend tracking only five to seven events in your application instead of tracking too many things to start. Ideally, you track users going through your initial user experience and one key metric that matters for your application (e.g. YouTube might choose "Watched Video" as a key metric).

Once you've initialized the library, you can track an event using [`track`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#track) with the event name and properties.

```javascript Javascript
//Track an event with a property
mixpanel.track('Plan Selected', {'Plan': 'Premium'});
```
## Timing Events

You can track the time it took for an action to occur, such as an image upload or a comment post, using [`timeEvent`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#timeEvent). This will mark the "start" of your action, which will be timed until you finish with a track call. The time duration is then recorded in the "Duration" property.

```javascript Javascript
// start the timer for the event "Image Upload"
mixpanel.timeEvent("Image Upload");
//...some time later
mixpanel.track("Image Upload");
```

## Super Properties

It's common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event - for example, the user's age, gender, source, or initial referrer.

To make things easier, you can register these properties as super properties. If you tell us just once that these properties are important, we will automatically include them with all events sent. Super properties are saved to local storage, and will persist across invocations of your app. Mixpanel already stores some information as super properties by default; see a full list of Mixpanel default properties [here](/docs/data-structure/property-reference#default-properties).

To set super properties, call [`registerSuperProperties`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#registerSuperProperties)

```javascript Javascript
mixpanel.registerSuperProperties({'Plan': 'Mega', 'Cost': '2000'});
```

The next time you track an event, the super properties you just set will be included as properties.

Super properties are saved to local storage, and will persist between executions of your app.

## Setting Super Properties Once and Only Once

If you want to store a super property only once (for example, a date of first login), you can use [`registerSuperPropertiesOnce`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#registerSuperPropertiesOnce). `registerSuperPropertiesOnce` behaves like `registerSuperProperties` and has the same interface, but it doesn't override super properties you've already saved.

This means it's safe to call `registerSuperPropertiesOnce` with the same property multiple times, and it will only set properties if the super property doesn't exist.

```javascript Javascript
mixpanel.registerSuperPropertiesOnce({'Role': 'Admin'});
```

## More for Super Properties

Remove a previously registered super property. [`unregisterSuperProperty`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#unregisterSuperProperty) is an alternative to clear all properties, unregistering specific super properties prevents them from being recorded on future events. This operation does not affect the value of other super properties. Any property name that is not registered is ignored.

```javascript Javascript
mixpanel.unregisterSuperProperty('propertyName');
```

Get user's super properties. [`getSuperProperties`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#getSuperProperties)

```javascript Javascript
const superProperties = await mixpanel.getSuperProperties();
```

Clear all registered properties of user. [`clearSuperProperties`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#clearSuperProperties)
```javascript Javascript
mixpanel.clearSuperProperties();
```

## Super Properties Live in Local Storage

Our mobile libraries store your super properties in local storage. They will persist so long as the app is installed (between launches and updates). Uninstalling the app will remove that customers super properties.

## Managing User Identity

You can handle the identity of a user using the [identify](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#identify) and [alias](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#alias) methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

### Identify
Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they use the app.

Call [identify](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#identify) when you know the identity of the current user, typically after log-in or sign-up. We recommend against using [identify](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#identify) for anonymous visitors to your site. 
```javascript Javascript
// Ensure all future events sent from
// the device will have the distinct_id 13791
mixpanel.identify("13791");
```


### Call Reset at Logout
[reset](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#reset)  generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identifying Users](/docs/tracking-methods/id-management/identifying-users) article.

```javascript Javascript
mixpanel.reset();
```

## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel's Behavioral Analytics product. Profiles are persistent sets of properties that describe a user - things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did. 


### Setting Profile Properties
You can set properties on a user profile with [`mixpanel.getPeople().set`](https://mixpanel.github.io/mixpanel-react-native/People.html#set).

```javascript Javascript
// identify must be called before
// user profile properties can be set
mixpanel.identify("13793");

// Sets user 13793's "Plan" attribute to "Premium"
mixpanel.getPeople().set("Plan", "Premium");
```

This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".

### Incrementing Numeric Properties
You can use [`mixpanel.getPeople().increment`](https://mixpanel.github.io/mixpanel-react-native/People.html#increment) to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.
```javascript Javascript
// Add 500 to the current value of
// "points earned" in Mixpanel
mixpanel.getPeople().increment("points earned", 500);
let properties = {"dollars spent": 17, "credits remaining", -34};
mixpanel.getPeople().increment(properties);
```

### Appending to List Properties
[`mixpanel.getPeople().append`](https://mixpanel.github.io/mixpanel-react-native/People.html#append) creates an update that adds an item to a list-valued property. The value you send with the append is added to the end of the list. If the property doesn't exist, it will be created with one element list as its value.

```javascript Javascript
//Identify the user profile that is going to be updated
mixpanel.identify("13793");

//Add the color green to the list property "Favorite Colors"
//A new list property is created if it doesn't already exist
mixpanel.getPeople().append("Favorite Colors", "Green");
```

### Other Types of Profile Updates
There are a few other types of profile updates. They can be accessed through the [`People`](https://mixpanel.github.io/mixpanel-react-native/People.html) class, which is accessible via [`mixpanel.getPeople()`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#getPeople).

## Group Analytics
Mixpanel Group Analytics is a paid add-on allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` will allow analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/data-structure/advanced/group-analytics) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “company” is chosen for Group Analytics, “company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

### Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.

### Adding Users to a Group
Adding users to groups causes the `group_key` and `group_id` to send as a property key and value for all events triggered by that user on the device. You can add multiple values for a single user to the `group_key` list property.

Similar to a `distinct_id`, the `group_key` allows Mixpanel to group events by an identifier for analysis. A `group_key`, however, is a group level identifier and not a user level identifier like the `distinct_id`.

You can add users to groups by calling the [`setGroup`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#setGroup) method. 

```javascript Javascript
mixpanel.setGroup("group key", "group id");
```

You can call [`addGroup`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#addGroup) to add any additional groups to an existing list.

```javascript Javascript
mixpanel.addGroup("group key", "group id");
```

You can call [`removeGroup`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#removeGroup) to remove any additional groups from an existing list.

```javascript Javascript
mixpanel.removeGroup("group key", "group id");
```

### Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call [`getGroup().set()`](https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#set) to build a group profile. It is important to the group_key, group_id, and one property so that the profile is not empty.

```javascript Javascript
mixpanel.getGroup("company_id", 12345).set("SET NAME", "SET VALUE");
```

### Setting Group Profile Properties
You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling [`getGroup().set()`](https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#set).

```javascript Javascript
mixpanel.getGroup("group key", "group id").set("SET NAME", "SET VALUE");
```

The getGroup() method can be chained with other commands that edit properties specific to the group.

You can set the property $name to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

#### set
[`getGroup().set()`](https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html#set) updates or adds a property to a group.

```javascript Javascript
mixpanel.getGroup("group key", "group id").set("SET NAME", "SET VALUE");
```

For other Group methods, see our [reference](https://mixpanel.github.io/mixpanel-react-native/MixpanelGroup.html).

## EU Data Residency

Route data to Mixpanel's EU servers by setting the `serverURL` property after initializing the client. 
```javascript Javascript
mixpanel.setServerURL("https://api-eu.mixpanel.com");
```

## Tracking Via Proxy

This guide demonstrates how to route events from Mixpanel's React Native SDK via a proxy in your own domain. This is useful to reduce the likelihood of ad-blockers impacting your tracking.

There are two steps: setting up a proxy server and pointing the SDK at your server.

**Step 1: Set up a proxy server**
The simplest way is to use our [sample nginx config](https://github.com/mixpanel/tracking-proxy). This config redirects any calls made to your proxy server to Mixpanel.

**Step 2: Point React Native SDK at your server**
When initializing, replace `YOUR_PROXY_DOMAIN` with your proxy server's domain for serverURL.
```javascript Javascript
// parameters:  optOutTrackingDefault, superProperties, serverURL
mixpanel.init(false, {}, "https://<YOUR_PROXY_DOMAIN>"); 
```

## Debugging and Logging

Enabling Mixpanel debugging and logging allows you to see the debug output from the Mixpanel library. This may be useful in determining when track calls go out. To enable Mixpanel debugging and logging, you can call [setLoggingEnabled(true)](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#setLoggingEnabled) with `true`, then run your iOS project with Xcode or android project with Android Studio. The logs should be available in the console.

## Flushing Events

To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers every 60 seconds while your application is running, as well as when the application transitions to the background. You can call [`flush`](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#flush) manually if you want to force a flush at a particular moment.
```javascript Javascript
mixpanel.flush();
```

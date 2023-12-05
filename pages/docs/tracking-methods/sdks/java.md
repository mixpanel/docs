# Java

The Mixpanel Java library is useful to track events from Java servers.

## Getting Started

The [Full API Reference](http://mixpanel.github.io/mixpanel-java/), [Library Source Code](https://github.com/mixpanel/mixpanel-java) and an [Example Application](https://github.com/mixpanel/mixpanel-java/blob/master/src/demo/java/com/mixpanel/mixpanelapi/demo/MixpanelAPIDemo.java) is documented in our GitHub repo.

## Installing the Library

You can get the library by including the following in your project's pom.xml:

```xml
<dependency>
    <groupId>com.mixpanel</groupId>
    <artifactId>mixpanel-java</artifactId>
    <version>1.5.2</version>
</dependency>
```

If you're not using Maven to build your project, you can browse and download the library jar directly from [Maven central](http://search.maven.org/#search%7Cga%7C1%7Cmixpanel-java)

## Sending Events

Track events in the mixpanel-java library by creating messages using an instance of [`MessageBuilder`](http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html) using your project token, bundling messages together using an instance of [`ClientDelivery`](http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/ClientDelivery.html), and then pushing the bundle to Mixpanel using an instance of [`MixpanelAPI`](http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MixpanelAPI.html).

The JSONObjects produced by `MessageBuilder` are completely self-contained, and can be sent over a network or enqueued for later processing.

```java
import com.mixpanel.mixpanelapi.ClientDelivery;
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;

// You can find your project token in the
// project settings dialog
// of the Mixpanel web application
MessageBuilder messageBuilder =
    new MessageBuilder(PROJECT_TOKEN);

// Create an event
JSONObject sentEvent =
    messageBuilder.event(distinctId, "Sent Message", null);

// You can send properties along with events
JSONObject props = new JSONObject();
props.put("Gender", "Female");
props.put("Plan", "Premium");

JSONObject planEvent =
    messageBuilder.event(distinctId, "Plan Selected", props);

// Gather together a bunch of messages into a single
// ClientDelivery. This can happen in a separate thread
// or process from the call to MessageBuilder.event()
ClientDelivery delivery = new ClientDelivery();
delivery.addMessage(sentEvent);
delivery.addMessage(planEvent);

// Use an instance of MixpanelAPI to send the messages
// to Mixpanel's servers.
MixpanelAPI mixpanel = new MixpanelAPI();
mixpanel.deliver(delivery);
```

## EU Data Residency

Route data to Mixpanel's EU servers by passing in positional arguments into the `MixpanelAPI`  constructor
public MixpanelAPI(String eventsEndpoint,
                   String peopleEndpoint,
                   String groupsEndpoint)
<meta-data android:name="com.mixpanel.android.MPConfig.EventsEndpoint"
           android:value="https://api-eu.mixpanel.com/track?ip=1" />
<meta-data android:name="com.mixpanel.android.MPConfig.PeopleEndpoint"
           android:value="https://api-eu.mixpanel.com/engage?ip=1" />
<meta-data android:name="com.mixpanel.android.MPConfig.GroupsEndpoint"
           android:value="https://api-eu.mixpanel.com/groups" />
```java
MixpanelAPI mixpanel = new MixpanelAPI( "https://api-eu.mixpanel.com/track",
                                        "https://api-eu.mixpanel.com/engage",
                                        "https://api-eu.mixpanel.com/groups");
```

## Storing User Profiles

In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

### Setting Profile Properties
You can prepare a profile update message with [`MessageBuilder.set`](http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html#set(java.lang.String,%20org.json.JSONObject))

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;

MessageBuilder messageBuilder =
    new MessageBuilder(PROJECT_TOKEN);

// Sets user 13793's "Plan" attribute to "Premium"
// This creates a profile for 13793 if one does not
// already exist.
JSONObject props = new JSONObject();
props.put("Plan", "Premium");
props.put("$ip", "72.229.28.185");
props.put("$ignore_time", "true");
JSONObject update = messageBuilder.set("13793", props);

// Send the update to mixpanel
MixpanelAPI mixpanel = new MixpanelAPI();
mixpanel.sendMessage(update);
```

This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium". The ip property is set to the user's ip address "72.229.28.185". The ignore_time property is set to a value of "true". Learn more about the ip and ignore_time properties in this [article](/docs/best-practices/server-side-best-practices#tracking-geolocation). 

### Incrementing Numeric Properties

You can use [`MessageBuilder.increment`](http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html#increment(java.lang.String,%20java.util.Map)) to create a message that will change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, emails sent, or points earned.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;

MessageBuilder messageBuilder =
    new MessageBuilder(PROJECT_TOKEN);

// Pass a Map to increment multiple properties
Map<String, Long> properties = new HashMap<String, Long>();
properties.put("dollars spent", 17);

// Subtract by passing a negative value
properties.put("credits remaining", -34);
JSONObject update =
    messageBuilder.increment("13793", properties);

// Send the update to mixpanel
MixpanelAPI mixpanel = new MixpanelAPI();
mixpanel.sendMessage(update);
```

### Appending to List Properties
[`MessageBuilder.append`](http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html#append(java.lang.String,%20org.json.JSONObject)) creates an update that adds an item to a list-valued property. The value you send with the append is added to the end of the list. If the property doesn't exist, it will be created with a one element list as its value.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;

MessageBuilder messageBuilder =
    new MessageBuilder(PROJECT_TOKEN);

// Adds "Asheville" to a list-value property
// "Cities Visited" on user "13793"
JSONObject properties = new JSONObject();
properties.put("Cities Visited", "Asheville");
JSONObject update =
    messageBuilder.append("13793", properties);

// Send the update to mixpanel
MixpanelAPI mixpanel = new MixpanelAPI();
mixpanel.sendMessage(update);
```

## Group Analytics

Mixpanel Group Analytics allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` allows analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/data-structure/advanced/group-analytics) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property "Company" is chosen for Group Analytics, "Company" is the `group_key`, and "Mixpanel", "Company A", and "13254" are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

### Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.

### Sending Group Identifiers With Events
To send group identifiers with events, send the `group_key` as a property key and the `group_id` as the property value. The data type of the `group_key` property is a list, therefore you can add multiple values for a single user. It is also possible to pass only one value.

Mixpanel can group events by the `group_id`, similar to how events are grouped with the `distinct_id`. A `group_id`, however, is a group level identifier and not a user level identifier like the `distinct_id`. 

Note that sending in a `group_key` and `group_id` as event properties does not add users to the group profile or assign group membership to the user's profile. Only **events** with your chosen `group_key` property set will be available for behavioral analysis at the group level. See the sections following the code example to learn how to add users to a group profile or add a group to the user's profile.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanelApi = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// You can send properties along with events
JSONObject props = new JSONObject();
props.put("Name", "Pat Davis");
props.put("Plan", "Premium");
props.put("Company", "Mixpanel")
 
JSONObject planEvent =
    messageBuilder.event(distinctId, "Plan Selected", props);
mixpanel.sendMessage(planEvent);
```

### Adding Group Identifiers to Individual Users
To connect group information to a user profile, include the `group_key` and `group_id` by sending the property as part of the [`set()`](http://mixpanel.github.io/mixpanel-java/) call. 

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel= new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
//Create JSON object ‘props'
// Include "Company" property with "Mixpanel" as value
 
JSONObject props = new JSONObject();
props.put("$name", "Pat Davis");
props.put("Plan", "Premium");
props.put("Company", "Mixpanel");
 
// Adds "Company" : "Mixpanel" to user profile with distinct_id=13793
JSONObject update = messageBuilder.set("13793", props);
mixpanel.sendMessage(update);
```

### Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call a property-setting method like [`set()`](http://mixpanel.github.io/mixpanel-java/) (described below) to create a group profile. It is important to include the `group_key`, `group_id`, and at least one property so that the profile is not empty.

### Setting Group Properties
You can add details to Group Profiles by adding properties to them. You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

#### set
[`groupSet()`](http://mixpanel.github.io/mixpanel-java/) updates or adds properties to a group profile. The profile is created if it does not exist.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// Create a group profile with group_key = "company", group_id = "Acme Inc."
// and assign the properties "$name" and "Industry"
JSONObject groupProperties = new JSONObject();
groupProperties.put("$name", "Acme Incorporated");
groupProperties.put("Industry", "Manufacturing");
JSONObject message = messageBuilder.groupSet(
    "company",
    "Acme Inc.",
    groupProperties
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

For all Group methods, see our [reference](http://mixpanel.github.io/mixpanel-java/).

## Tracking Revenue

Mixpanel makes it easy to analyze the revenue you make from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with [`MessageBuilder.trackCharge`](http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html#trackCharge(java.lang.String,%20double,%20org.json.JSONObject)). Sending a message created with `trackCharge` will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.

```javascript
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;

MessageBuilder messageBuilder =
    new MessageBuilder(PROJECT_TOKEN);

// Track a charge of $29.99 for the user identified by 13793
JSONObject update =
    messageBuilder.trackCharge("13793", 29.99, null);

// Send the update to mixpanel
MixpanelAPI mixpanel = new MixpanelAPI();
mixpanel.sendMessage(update);

// Track a refund of $50 for the user identified by 13793
JSONObject update =
    messageBuilder.trackCharge("13793", -50, null);
mixpanel.sendMessage(update);

// Track a charge of 25 dollars on January 2, 2012
JSONObject properties = new JSONObject()
properties.put("$time", "2012-01-02T00:00:00");
JSONObject update =
    messageBuilder.trackCharge("13793", -50, properties);
mixpanel.sendMessage(update);
```

The Java library [appends a time stamp](https://github.com/mixpanel/mixpanel-java/blob/b64086b250107a8559989665051525d90a58b1e7/src/main/java/com/mixpanel/mixpanelapi/MessageBuilder.java#L51) to events by default. You have to manually use the $time property to append a time stamp to user profile properties.

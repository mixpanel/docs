---
title: "Java - Advanced"
slug: "java"
hidden: false
metadata: 
  title: "SDK Integration: Pure Java Library | Mixpanel Developer Docs"
  description: "The Mixpanel pure Java library is designed for generality and is mostly useful in deep back-end and embedded applications. Learn more here."
createdAt: "2018-04-12T18:58:28.930Z"
updatedAt: "2023-03-26T20:07:24.875Z"
---
The Mixpanel Java library is useful to track events from Java servers.

# Installing the Library

You can get the library by including the following in your project's pom.xml:
[block:code]
{
  "codes": [
    {
      "code": "<dependency>\n    <groupId>com.mixpanel</groupId>\n    <artifactId>mixpanel-java</artifactId>\n    <version>1.4.4</version>\n</dependency>",
      "language": "xml"
    }
  ]
}
[/block]
If you're not using Maven to build your project, you can browse and download the library jar directly from [Maven central](http://search.maven.org/#search%7Cga%7C1%7Cmixpanel-java)

# Sending Events

Track events in the mixpanel-java library by creating messages using an instance of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html">MessageBuilder</a> using your project token, bundling messages together using an instance of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/ClientDelivery.html">ClientDelivery</a>, and then pushing the bundle to Mixpanel using an instance of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MixpanelAPI.html">MixpanelAPI</a>.

The JSONObjects produced by <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html">MessageBuilder</a> are completely self-contained, and can be sent over a network or enqueued for later processing.
[block:code]
{
  "codes": [
    {
      "code": "import com.mixpanel.mixpanelapi.ClientDelivery;\nimport com.mixpanel.mixpanelapi.MessageBuilder;\nimport com.mixpanel.mixpanelapi.MixpanelAPI;\n\n// You can find your project token in the\n// project settings dialog\n// of the Mixpanel web application\nMessageBuilder messageBuilder =\n    new MessageBuilder(PROJECT_TOKEN);\n\n// Create an event\nJSONObject sentEvent =\n    messageBuilder.event(distinctId, \"Sent Message\", null);\n\n// You can send properties along with events\nJSONObject props = new JSONObject();\nprops.put(\"Gender\", \"Female\");\nprops.put(\"Plan\", \"Premium\");\n\nJSONObject planEvent =\n    messageBuilder.event(distinctId, \"Plan Selected\", props);\n\n// Gather together a bunch of messages into a single\n// ClientDelivery. This can happen in a separate thread\n// or process from the call to MessageBuilder.event()\nClientDelivery delivery = new ClientDelivery();\ndelivery.addMessage(sentEvent);\ndelivery.addMessage(planEvent);\n\n// Use an instance of MixpanelAPI to send the messages\n// to Mixpanel's servers.\nMixpanelAPI mixpanel = new MixpanelAPI();\nmixpanel.deliver(delivery);",
      "language": "java"
    }
  ]
}
[/block]
# EU Data Residency

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

# Managing User Identity

Mixpanel groups events sent with different distinct_ids, presenting them in reports as different user event streams. You can connect events with different distinct_ids using [alias, identify, or merge](ref:events#track-event), ultimately attributing them to one user.
[block:callout]
{
  "type": "info",
  "title": "ID Merge",
  "body": "If a project has [ID merge enabled](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge), the `$identify` event can connect pre- and post-authentication events. If ID merge is not enabled, identify events will not link identities however alias can be used to connect pre and post registration events."
}
[/block]
# Storing User Profiles

In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

##Setting Profile Properties
You can prepare a profile update message with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html#set(java.lang.String,%20org.json.JSONObject)">MessageBuilder.set</a> 
[block:code]
{
  "codes": [
    {
      "code": "import com.mixpanel.mixpanelapi.MessageBuilder;\nimport com.mixpanel.mixpanelapi.MixpanelAPI;\n\nMessageBuilder messageBuilder =\n    new MessageBuilder(PROJECT_TOKEN);\n\n// Sets user 13793's \"Plan\" attribute to \"Premium\"\n// This creates a profile for 13793 if one does not\n// already exist.\nJSONObject props = new JSONObject();\nprops.put(\"Plan\", \"Premium\");\nprops.put(\"$ip\", \"72.229.28.185\");\nprops.put(\"$ignore_time\", \"true\");\nJSONObject update = messageBuilder.set(\"13793\", props);\n\n// Send the update to mixpanel\nMixpanelAPI mixpanel = new MixpanelAPI();\nmixpanel.sendMessage(update);",
      "language": "java"
    }
  ]
}
[/block]
This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium". The ip property is set to the user’s ip address “72.229.28.185”. The ignore_time property is set to a value of “true”. Learn more about the ip and ignore_time properties in this [article](https://help.mixpanel.com/hc/en-us/articles/115004499343-Tracking-Geolocation-with-Server-Side-Implementation). 
[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Pick your property names wisely. Once you've sent them to Mixpanel, there is no way to change them. Feel free to use capitalization and spaces in between words. \nThere are a few limitations:\n\n* Your property names should not begin with `$` or `mp_`. These properties are reserved for special properties sent by Mixpanel.\n* Your property names cannot begin or end with a space as they will automatically be trimmed.\n* Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.\n\nClick [here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties."
}
[/block]
## Incrementing Numeric Properties

You can use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html#increment(java.lang.String,%20java.util.Map)">MessageBuilder.increment</a> to create a message that will change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, emails sent, or points earned.
[block:code]
{
  "codes": [
    {
      "code": "import com.mixpanel.mixpanelapi.MessageBuilder;\nimport com.mixpanel.mixpanelapi.MixpanelAPI;\n\nMessageBuilder messageBuilder =\n    new MessageBuilder(PROJECT_TOKEN);\n\n// Pass a Map to increment multiple properties\nMap<String, Long> properties = new HashMap<String, Long>();\nproperties.put(\"dollars spent\", 17);\n\n// Subtract by passing a negative value\nproperties.put(\"credits remaining\", -34);\nJSONObject update =\n    messageBuilder.increment(\"13793\", properties);\n\n// Send the update to mixpanel\nMixpanelAPI mixpanel = new MixpanelAPI();\nmixpanel.sendMessage(update);",
      "language": "java"
    }
  ]
}
[/block]
## Appending to List Properties
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html#append(java.lang.String,%20org.json.JSONObject)">MessageBuilder.append</a> creates an update that adds an item to a list-valued property. The value you send with the append is added to the end of the list. If the property doesn't exist, it will be created with a one element list as its value.
[block:code]
{
  "codes": [
    {
      "code": "import com.mixpanel.mixpanelapi.MessageBuilder;\nimport com.mixpanel.mixpanelapi.MixpanelAPI;\n\nMessageBuilder messageBuilder =\n    new MessageBuilder(PROJECT_TOKEN);\n\n// Adds \"Asheville\" to a list-value property\n// \"Cities Visited\" on user \"13793\"\nJSONObject properties = new JSONObject();\nproperties.put(\"Cities Visited\", \"Asheville\");\nJSONObject update =\n    messageBuilder.append(\"13793\", properties);\n\n// Send the update to mixpanel\nMixpanelAPI mixpanel = new MixpanelAPI();\nmixpanel.sendMessage(update);",
      "language": "java"
    }
  ]
}
[/block]
# Group Analytics

Mixpanel Group Analytics allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` allows analysis at a company or group level when using Mixpanel analytics. Read [this article](https://help.mixpanel.com/hc/en-us/articles/360025333632) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “Company” is chosen for Group Analytics, “Company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.
[block:callout]
{
  "type": "info",
  "title": "Add Group Keys",
  "body": "To start tracking groups data, [add group keys in project settings](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics#implementation). If you don't see group keys in your Project Settings, reach out to the [Mixpanel Sales Team](https://mixpanel.com/group-analytics/) to purchase Group Analytics."
}
[/block]
## Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bd167dc-Screen_Shot_2019-12-10_at_11.23.26_AM.png",
        "Screen Shot 2019-12-10 at 11.23.26 AM.png",
        1846,
        322,
        "#f8f9fb"
      ]
    }
  ]
}
[/block]
Enter an event property to attribute the group key to. You can also enter a display name for the group key. Click **Save**.

## Sending Group Identifiers With Events
To send group identifiers with events, send the `group_key` as a property key and the `group_id` as the property value. The data type of the `group_key` property is a list, therefore you can add multiple values for a single user. It is also possible to pass only one value.

Mixpanel can group events by the `group_id`, similar to how events are grouped with the `distinct_id`. A `group_id`, however, is a group level identifier and not a user level identifier like the `distinct_id`. 

Note that sending in a `group_key` and `group_id` as event properties does not add users to the group profile or assign group membership to the user's profile. Only **events** with your chosen `group_key` property set will be available for behavioral analysis at the group level. See the sections following the code example to learn how to add users to a group profile or add a group to the user's profile.
[block:code]
{
  "codes": [
    {
      "code": "import com.mixpanel.mixpanelapi.MessageBuilder;\nimport com.mixpanel.mixpanelapi.MixpanelAPI;\n \nMixpanelAPI mixpanelApi = new MixpanelAPI();\nMessageBuilder messageBuilder = new MessageBuilder(\"[your project token]\");\n \n// You can send properties along with events\nJSONObject props = new JSONObject();\nprops.put(\"Name\", \"Pat Davis\");\nprops.put(\"Plan\", \"Premium\");\nprops.put(\"Company\", \"Mixpanel\")\n \nJSONObject planEvent =\n    messageBuilder.event(distinctId, \"Plan Selected\", props);\nmixpanel.sendMessage(planEvent);",
      "language": "java"
    }
  ]
}
[/block]
## Adding Group Identifiers to Individual Users
To connect group information to a user profile, include the `group_key` and `group_id` by sending the property as part of the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">set()</a> call. 
[block:code]
{
  "codes": [
    {
      "code": "import com.mixpanel.mixpanelapi.MessageBuilder;\nimport com.mixpanel.mixpanelapi.MixpanelAPI;\n \nMixpanelAPI mixpanel= new MixpanelAPI();\nMessageBuilder messageBuilder = new MessageBuilder(\"[your project token]\");\n \n//Create JSON object ‘props’\n// Include “Company” property with “Mixpanel” as value\n \nJSONObject props = new JSONObject();\nprops.put(\"$name\", \"Pat Davis\");\nprops.put(\"Plan\", \"Premium\");\nprops.put(\"Company\", \"Mixpanel\");\n \n// Adds “Company” : “Mixpanel” to user profile with distinct_id=13793\nJSONObject update = messageBuilder.set(\"13793\", props);\nmixpanel.sendMessage(update);",
      "language": "java"
    }
  ]
}
[/block]
## Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call a property-setting method like <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">set()</a> (described below) to create a group profile. It is important to include the `group_key`, `group_id`, and at least one property so that the profile is not empty.

## Setting Group Properties
You can add details to Group Profiles by adding properties to them. You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

### set
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupSet()</a> updates or adds properties to a group profile. The profile is created if it does not exist.

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

### set once
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupSetOnce()</a> adds properties to a group only if the property is not already set. The profile is created if it does not exist.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// Create a group profile with group_key = "company", group_id = "Acme Inc."
// and assign the property "First Purchase" with value "Steel" to the profile
// only if it is not already set
JSONObject groupProperties = new JSONObject();
groupProperties.put("First Purchase", "Steel");
JSONObject message = messageBuilder.groupSetOnce(
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

### unset
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupUnset()</a> unsets properties on the group profile.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");

// Removes the properties named in propertyNames from the group profile identified by groupKey and groupId.
JSONObject message = messageBuilder.groupUnset(
    "company",
    "Acme Inc.",
    List.of("First Purchase")
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

### union
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupUnion()</a> adds the specified values to a list property and ensures that those values only appear once. The profile is created if it does not exist.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// Merges list-valued properties into a group profile.
// The list values given are merged with the existing list on the group profile,
// ignoring duplicate list values. 
JSONArray array=new JSONArray();
array.put("Anvils");
array.put("Explosives");
Map<String, JSONArray> props = Map.of("Products", array);
JSONObject message = messageBuilder.groupUnion(
    "company",
    "Acme Inc.",
    props
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

### remove
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupRemove()</a> removes a specific value in a list property on a group profile.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// Removes "Anvils" from the "Products" list property
JSONObject props = new JSONObject();
props.put("Products", "Anvils");
JSONObject message = messageBuilder.groupRemove("company", "Acme Inc.", props);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

### delete
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupDelete()</a> permanently deletes a group profile.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
JSONObject message = messageBuilder.groupDelete("company", "Acme Inc.");
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

# Lookup tables

You can use [lookup tables](https://help.mixpanel.com/hc/en-us/articles/360044139291#introduction) to enrich existing event and profile properties. While you've had the ability to upload CSV to update the lookup tables, we now support programmatic access to do the same. Updating lookup tables follows the same process as updating group profile properties.

It is possible to create a lookup profile that is similar to a user profile. You must call a property-setting method like `groupSet()` to create a lookup profile (row). It is important to include the group_key, group_id, and at least one property so that the profile is not empty.

To learn more about the concepts behind lookup tables, and to see how each of the IDs map to the lookup table entities, please [read this](https://help.mixpanel.com/hc/en-us/articles/360044139291#concepts).

## How to find the group_key?
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4523074-findinggroupkey.png",
        "findinggroupkey.png",
        1812,
        1126,
        "#fafafb"
      ],
      "sizing": "80"
    }
  ]
}
[/block]
## Updating a lookup table

### set
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupSet()</a> updates or adds properties to a lookup profile (row). The profile is created if it does not exist.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// Create a lookup profile with group_key "d1b6d2e0-1330-4ad6-b520-d948ede3b1a7" 
// (found in lookup table details page) and group_id "Gagnam style" (join key value in 1st column of table).
JSONObject groupProperties = new JSONObject();
groupProperties.put("Genre", "Pop");
JSONObject message = messageBuilder.groupSet(
    "d1b6d2e0-1330-4ad6-b520-d948ede3b1a7",
    "Gangnam style",
    groupProperties
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

### set once
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupSetOnce()</a> adds properties to a lookup profile only if the property is not already set. The profile is created if it does not exist.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// Create a lookup profile with group_key "d1b6d2e0-1330-4ad6-b520-d948ede3b1a7" 
// (found in lookup table details page) and group_id "Gagnam style" (join key value in 1st column of table)
// and assign the property "Genre" with value "Pop" to the profile
// only if it is not already set
JSONObject groupProperties = new JSONObject();
groupProperties.put("Genre", "Pop");
JSONObject message = messageBuilder.groupSetOnce(
    "d1b6d2e0-1330-4ad6-b520-d948ede3b1a7",
    "Gangnam style",
    groupProperties
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

### unset
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupUnset()</a> unsets properties on the lookup profile.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");

// Removes the property "Genre" from the lookup profile identified by groupKey and groupId.
JSONObject message = messageBuilder.groupUnset(
    "d1b6d2e0-1330-4ad6-b520-d948ede3b1a7",
    "Gangnam style",
    List.of("Genre")
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

### union
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupUnion()</a> adds the specified values to a list property and ensures that those values only appear once. The profile is created if it does not exist.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// Merges list-valued properties into a lookup profile.
// The list values given are merged with the existing list on the lookup profile,
// ignoring duplicate list values. 
JSONArray array=new JSONArray();
array.put("spectacular");
array.put("crazy");
Map<String, JSONArray> props = Map.of("hashtags", array);
JSONObject message = messageBuilder.groupUnion(
    "d1b6d2e0-1330-4ad6-b520-d948ede3b1a7",
    "Gangnam style",
    props
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

### remove
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupRemove()</a> removes a specific value in a list property on a lookup profile.

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
// Removes "amazing" from the "hashtags" list property
JSONObject props = new JSONObject();
props.put("hashtags", "amazing");
JSONObject message = messageBuilder.groupRemove(
    "d1b6d2e0-1330-4ad6-b520-d948ede3b1a7",
    "Gangnam style",
    props
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```

### delete
<a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/">groupDelete()</a> permanently deletes a lookup profile (row).

```java
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;
 
MixpanelAPI mixpanel = new MixpanelAPI();
MessageBuilder messageBuilder = new MessageBuilder("[your project token]");
 
JSONObject message = messageBuilder.groupDelete(
    "d1b6d2e0-1330-4ad6-b520-d948ede3b1a7",
    "Gangnam style"
);
try {
    mixpanel.sendMessage(message);
} catch(IOException e) {
    // exception handling logic
}
```



# Tracking Revenue

Mixpanel makes it easy to analyze the revenue you make from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-java/com/mixpanel/mixpanelapi/MessageBuilder.html#trackCharge(java.lang.String,%20double,%20org.json.JSONObject)">MessageBuilder.trackCharge</a>. Sending a message created with `trackCharge` will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.
[block:code]
{
  "codes": [
    {
      "code": "import com.mixpanel.mixpanelapi.MessageBuilder;\nimport com.mixpanel.mixpanelapi.MixpanelAPI;\n\nMessageBuilder messageBuilder =\n    new MessageBuilder(PROJECT_TOKEN);\n\n// Track a charge of $29.99 for the user identified by 13793\nJSONObject update =\n    messageBuilder.trackCharge(\"13793\", 29.99, null);\n\n// Send the update to mixpanel\nMixpanelAPI mixpanel = new MixpanelAPI();\nmixpanel.sendMessage(update);\n\n// Track a refund of $50 for the user identified by 13793\nJSONObject update =\n    messageBuilder.trackCharge(\"13793\", -50, null);\nmixpanel.sendMessage(update);\n\n// Track a charge of 25 dollars on January 2, 2012\nJSONObject properties = new JSONObject()\nproperties.put(\"$time\", \"2012-01-02T00:00:00\");\nJSONObject update =\n    messageBuilder.trackCharge(\"13793\", -50, properties);\nmixpanel.sendMessage(update);",
      "language": "java"
    }
  ]
}
[/block]
The Java library [appends a time stamp](https://github.com/mixpanel/mixpanel-java/blob/b64086b250107a8559989665051525d90a58b1e7/src/main/java/com/mixpanel/mixpanelapi/MessageBuilder.java#L51) to events by default. You have to manually use the $time property to append a time stamp to user profile properties.
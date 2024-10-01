# Mixpanel SDKs: Node.js

The Mixpanel Node.js library will be most useful to you if you need to send data from a Node.js server, or for interacting with Mixpanel APIs in JavaScript outside of the browser (such as importing past events with a script).

The [Library Source Code](https://github.com/mixpanel/mixpanel-node) and an [Example Application](https://github.com/mixpanel/mixpanel-node/blob/master/example.js).

## Installing the Library

Install the Mixpanel Node.js library and create a Mixpanel instance in order to begin Mixpanel tracking.

Use [npm](https://www.npmjs.com/) to install Mixpanel in your project by calling `npm install mixpanel`. The Mixpanel module will be available in the Node project after installing the library.

Next, create a Mixpanel instance and initialize a Mixpanel client to communicate with Mixpanel servers. To do this, grab the Mixpanel factory and create an instance of the Mixpanel client by calling `mixpanel.init(YOUR_PROJECT_TOKEN)`.

The project token is unique to your Mixpanel project. [Instructions for finding your project token can be found here](/docs/orgs-and-projects/managing-projects#find-your-project-tokens).
```javascript Javascript
// grab the Mixpanel factory
const Mixpanel = require('mixpanel');

// create an instance of the mixpanel client
const mixpanel = Mixpanel.init('<YOUR_TOKEN>');
```

## EU Data Residency

Route data to Mixpanel's EU servers by setting the `host` config property.
```javascript
mixpanel.init(
  "YOUR_TOKEN",
  {
    host: "api-eu.mixpanel.com",
  },
);
```

## Sending Events

You can track events with `mixpanel.track()` after initializing a Mixpanel instance.

The `mixpanel.track()` method takes two arguments, an event name and a properties object which must include the [distinct_id](https://help.mixpanel.com/hc/en-us/articles/115004509406-Distinct-IDs-).

You have the option to add additional event properties to the call to add detail to that event. [Read more about events and properties here](/docs/best-practices/server-side-best-practices#tracking-geolocation).
```javascript
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('<YOUR_TOKEN>');

// track an event with optional properties
mixpanel.track('event name', {
    distinct_id: 'unique client id',
    property_1: 'value 1',
    property_2: 'value 2',
    property_3: 'value 3'
});
```

Mixpanel determines default geolocation data (\$city, \$region, mp_country_code) using the IP address on the incoming request. This can have the unintended effect of setting the location of all of your users to the location of your data center in server-side implementations.

It is therefore important to pass IP as a property in server-side implementations. [Read about best practices for geolocation with server-side implementations](/docs/best-practices/server-side-best-practices).

```javascript
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('<YOUR_TOKEN>', { geolocate: false });

// track an event with optional properties
mixpanel.track('event name', {
    distinct_id: 'unique client id',
    ip: '127.0.0.1'
});
```

The geolocate boolean setting needs to be `false` for Mixpanel to infer the location based on the ip property provided in the event payload.

Note that tracking with Node in an async serverless implementation requires you to wait for the Mixpanel request to complete. The easiest way to do this would be to pass in in a callback as a 3rd parameter into `track` and return a promise that is resolved when the request is sent.

## Storing User Profiles

You can send user profile updates to Mixpanel in addition to sending events.

Mixpanel can maintain a [profile of each of your users](/docs/data-structure/user-profiles), storing information you know about them.

A profile update changes the properties of a user profile, essentially changing the details tied to that profile or creating it if it does not exist.

You can use profiles and user profile properties to explore and segment users by who they are, in addition to what they did with event tracking.

### Setting Profile Properties
You can update or create a [user profile](/docs/data-structure/user-profiles)`. The first argument is distinct_id, and the second argument is a JSON list of the properties to add to or update the profile with.

The following example sets a "Plan" property with a value "Premium", a first name, a last name, and a created date on the user's profile that has a distinct id of `13793`.

Mixpanel automatically creates a new profile if there isn't already a profile with a distinct_id of `13793` in the project already.

If the user with a distinct_id of `13793` already has a property named "Plan" in their profile, the new value "Premium" overwrites the old value of "Free".

```javascript
// grab the Mixpanel factory
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('<YOUR_TOKEN>');

// create or update a user in Mixpanel
mixpanel.people.set('13793', {
    $first_name: 'Billy',
    $last_name: 'Bob',
    $created: (new Date('jan 1 2013')).toISOString(),
    plan: 'premium',
});
```

### Incrementing Numeric Properties
You can use `mixpanel.people.increment()` to increment the current value of numeric properties. This is useful when tracking a running count of properties, such as games played, emails sent, or points earned.

```javascript
// increment a numeric property
mixpanel.people.increment('13793', 'games_played');
// increment a numeric property by a different amount
mixpanel.people.increment('13793', 'points', 15);
// increment multiple properties
mixpanel.people.increment('13793', {'points': 10, 'games_played': 1});
```

### Appending to List Properties
Use `mixpanel.people.append()` to add an item to an existing list-valued property.

`mixpanel.people.append()` adds the values passed to it at the end of the list for each named property. Mixpanel creates a list containing one element as its value if the property does not already exist.

```javascript
// append value to a list
mixpanel.people.append('13793', 'awards', 'Great Player');
// append multiple values to a list
mixpanel.people.append('13793', {'awards': 'Great Player', 'levels_finished': 'Level 4'});
```

### Other Types of Profile Updates
There are a few other types of profile updates. You can get more information about them from the "Quick Start" section of [the repository Readme](https://github.com/mixpanel/mixpanel-node) and [examples in the library code](https://github.com/mixpanel/mixpanel-node/blob/master/lib/people.js).

## Group Analytics

Mixpanel Group Analytics allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` allows analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/data-structure/advanced/group-analytics) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “Company” is chosen for Group Analytics, “Company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values.

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

### Creating a Group Key
Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the *GROUP KEYS* section.

### Sending Group Identifiers With Events
To send group identifiers with events, send the `group_key` as a property key and the `group_id` as the property value. The data type of the `group_key` property is a list, therefore you can add multiple values for a single user. It is also possible to pass only one value.

Mixpanel can group events by the `group_id`, similar to how events are grouped with the `distinct_id`. A `group_id`, however, is a group level identifier and not a user level identifier like the `distinct_id`.

Note that sending in a `group_key` and `group_id` as event properties does not add users to the group profile or assign group membership to the user's profile. Only **events** with your chosen `group_key` property set will be available for behavioral analysis at the group level. See the sections following the code example to learn how to add users to a group profile or add a group to the user's profile.

```javascript
// Tracks an event named 'Plan Purchase',
// with group_id = 'Company' and group_key = 'Mixpanel'
mixpanel.track('Plan Purchase', {
    distinct_id: 'unique client id',
    'Plan Type': 'Premium',
    Company: 'Mixpanel',
});
```

### Adding Group Identifiers to Individual Users
To connect group information to a user profile, include the `group_key` and `group_id` by sending the property as part of the [`people.set()`](#setting-profile-properties) call.

```javascript
// Create or update a user profile with group_id = Company,
// group_key = Mixpanel along with name properties.
mixpanel.people.set('13793', {
    $first_name: 'Billy',
    $last_name: 'Bob',
    Company: 'Mixpanel',
});
```


### Creating Group Profiles
You can create a Group profile that is similar to a user profile. You must call `groups.set()`, `groups.set_once()` or `groups.union()` to create a group profile. It is important to include the group_key, group_id, and at least one property so that the profile is not empty.

```js JavaScript
// Create or update a group profile with group_key = Company,
// group_id = Mixpanel
mixpanel.groups.set('Company', 'Mixpanel', {
  $name: 'Mixpanel',
  Type: 'Analytics',
})
```

### Setting Group Properties
You can add details to Group Profiles by adding properties to them. These operations are similar to the corresponding operations for user profile property updates.

You can set the property `$name` to populate the name field at the top of the group profile.

#### set
`groups.set()` updates or adds properties to a group profile. The profile is created if it does not exist.

```js JavaScript
// Create or update a group profile with group_key = Company,
// group_id = Mixpanel
mixpanel.groups.set('Company', 'Mixpanel', {
  $name: 'Mixpanel',
  Type: 'Analytics',
  tags: ['high ROI', ':)'],
})
```

See all Groups methods in our [code](https://github.com/mixpanel/mixpanel-node/blob/master/lib/groups.js).


## Additional Resources

Visit the Mixpanel-Node repository on GitHub for additional information, such as:
* [The project's ReadMe](https://github.com/mixpanel/mixpanel-node/blob/master/readme.md)
* [An example application](https://github.com/mixpanel/mixpanel-node/blob/master/example.js)
* [Additional information about ID management](https://github.com/mixpanel/mixpanel-node/issues/13)

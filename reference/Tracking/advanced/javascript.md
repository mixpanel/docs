---
title: "JavaScript - Advanced"
slug: "javascript"
hidden: false
metadata: 
  title: "SDK Integration: JavaScript Advanced | Mixpanel Developer Docs"
  description: "Read our advanced documentation on Mixpanel's JavaScript SDK integration. You'll dive deeper into additional configurations and use cases."
createdAt: "2018-04-12T18:30:29.933Z"
updatedAt: "2023-04-28T18:47:51.107Z"
---
## Getting Started

Please refer to our [Quickstart Guide](https://developer.mixpanel.com/docs/javascript-quickstart).

## Track Events

### Sending Events

Once you have the snippet in your page, you can track an event by calling <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track">mixpanel.track</a> with the event name and properties.

```javascript JavaScript
// Send a "Played song" event to Mixpanel
// with a property "genre"
mixpanel.track(
    "Played song",
    {"genre": "hip-hop"}
);
```

All events sent from the JavaScript library will send over HTTPS. 

### Tracking Page Views

Page view tracking is turned off by default. Automatically page view events on every page load can be added using the `track_pageview` option to the `mixpanel.init` call, like so:

```javascript JavaScript
mixpanel.init('YOUR_TOKEN', {track_pageview: true});
```

The `track_pageview` option currently does not auto-track page views in single-page applications. For single-page applications or other manual page view tracking, Mixpanel offers the standard page view event through `mixpanel.track_pageview()`. This call can be inserted into any hooks or listeners for your framework of choice.

The standard page view event includes the page title, URL components, and marketing parameters described below. Additional page view event properties can also be added as event properties.

```javascript JavaScript
// Send a default page view event
mixpanel.track_pageview();

// Send a default page view event with additional properties
mixpanel.track_pageview({"page": "Pricing"});
```

### Tracking UTM Parameters

The JavaScript library will automatically add any UTM parameters (`utm_source`, `utm_campaign`, `utm_medium`, `utm_term`, `utm_content`) present on the page to events fired from that page load.

When UTM parameters for an identified user are seen for the first time, these will also be stored on the user profile as `initial_utm_source`, `initial_utm_campaign`, `initial_utm_medium`, `initial_utm_term`, and `initial_utm_content`. 

In addition to UTM parameters, Mixpanel will also add any advertising click IDs to events fired. These include `dclid`, `fbclid`, `gclid`, `ko_click_id`, `li_fat_id`, `msclkid`, `ttclid`, `twclid`, `wbraid`

### Tracking Website Links

When tracking link clicks with <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track">mixpanel.track</a>, the page can change before the event is successfully sent, leading to inaccurate results.

To make this easier, use <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track_links">mixpanel.track_links</a>. This function will allow you to bind an event to a link click with much greater accuracy.

Here's how it works:

```javascript JavaScript
<div id="nav">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/pricing">Pricing</a>
</div>
<script type="text/javascript">
    mixpanel.track_links("#nav a", "click nav link", {
        "referrer": document.referrer
    });
</script>
```



This will send a "click nav link" event (with a 'referrer' property) each time a user clicks on a navigation link. It's important to note that the links matched by the CSS selector must exist on the page at the time the `mixpanel.track_links` call is made, or it will not bind correctly.

### Other Tracking Methods

There are other less common ways to send data to Mixpanel. To learn more, please follow the links to the full API documentation.

<a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track_forms">mixpanel.track_forms</a> - similar to `track_links`, but tracks form submissions.

### Mixpanel Cookie

By default, Mixpanel cookies send over HTTPS requests as part of the headers. However, Mixpanel’s JavaScript library provides a configuration to completely prevent the browser from transmitting your cookies with non-HTTPS requests.

To enable this, use the [`set_config()`](doc:javascript-full-api-reference#mixpanelset_config) method and change the `secure_cookie` flag from false to true. If you configure your instance to send data over HTTP instead of HTTPS but do set `secure_cookie: true`, then your cookie data is not sent to the server. 

### Super Properties

It's very common to have certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event - for example, the user's age, gender, source, or initial referrer.

To make things easier, you can register these properties as [super properties](https://help.mixpanel.com/hc/en-us/articles/115004708186-Event-Properties-Super-Properties-People-Properties#super-properties). If you tell us just once that these properties are important, we will automatically include them with all events sent. Super properties are stored in a browser cookie, and will persist between visits to your site.

To set super properties, call <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.register">mixpanel.register</a>.

```javascript JavaScript
<script type="text/javascript">
    mixpanel.register({
        "age": 28,
        "gender": "male",
        "source": "facebook"
    });
</script>
```



The next time you track an event, the super properties you just set will be included as properties. If you call

```javascript JavaScript
mixpanel.track("Signup");
```



after making the previous call to <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.register">mixpanel.register</a>, it is just like adding the properties directly:

```javascript JavaScript
mixpanel.track("Signup", {
    "age": 28,
    "gender": "male",
    "source": "facebook"
});
```



#### Setting Super Properties Only Once

If you want to store a super property only once (often for things like initial referrer, ad campaign, or source), you can use <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.register_once">mixpanel.register_once</a>. This function behaves like mixpanel.register and has the same interface, but it doesn't override super properties you've already saved.

```javascript JavaScript
<script type="text/javascript">
    mixpanel.register_once({
        "ad_campaign": "fb-01"
    });
</script>
```



This means that it's safe to call <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.register_once">mixpanel.register_once</a> with the same property on every page load, and it will only set it if the super property doesn't exist.

#### Super Properties Live in Local Storage

Our JS library uses a cookie (created in the domain of the page loading the lib) to store super properties. These are stored as JSON in the cookie. They will persist for the life of that cookie, which by default is 365 days. If you wish to change the life of the cookie, you may do so using [set_config](doc:javascript-full-api-reference#mixpanelset_config) to adjust the value for the cookie_expiration(an integer in days). 

## Managing User Identity

You can handle the identity of a user using the `identify` and `alias` methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. 

### Identify

Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile. If you never call this method, unique visitors are tracked using a UUID that generates the first time they visit the site.

| Argument      | Type                                                                                            | Description                                                                                                                                                             |
| :------------ | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **unique_id** | <span style="font-family: courier">String</span></br><span style="color: green">optional</span> | A string that uniquely identifies a user - we recommend a user id. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) is used. |

Call `identify` when you know the identity of the current user, typically after log-in or sign-up. We recommend against using `identify` for anonymous visitors to your site. 

> 📘 ID Merge
> 
> If a project has [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) enabled, the identify method will connect pre- and post-authentication events when appropriate and calling alias is no longer required.
> 
> If a project does not have ID Merge enabled, identify will change the user's local distinct_id to the unique ID you pass. Events tracked prior to authentication will not be connected to the same user identity. If ID Merge is disabled, alias can be used to connect pre and post registration events.

### Alias

The `alias` method creates an alias which Mixpanel will use to remap one id to another. Multiple aliases can point to the same identifier.  

> 📘 ID Merge
> 
> If a project has [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) enabled,  just call identify with your chosen identifier as soon as you know who the user is to merge anonymous and identified distinct_ids. Calling alias is no longer required.

| Argument        | Type                                                                                            | Description                                                              |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| **alias**       | <span style="font-family: courier">String</span></br><span style="color: red">required</span>   | A unique identifier that you want to use as an identifier for this user. |
| **distinct_id** | <span style="font-family: courier">String</span></br><span style="color: green">optional</span> | The current user identifier.                                             |

The following is a valid use of `alias`:

```javascript JavaScript
mixpanel.alias('new_id', 'existing_id');
//You can add multiple id aliases to the existing id
mixpanel.alias('newer_id', 'existing_id');
```



Aliases can also be chained - the following is a valid example:

```javascript JavaScript
mixpanel.alias('new_id', 'existing_id');
// You can chain aliases
mixpanel.alias('newer_id', 'new_id');
```



Aliases **cannot** point to multiple identifiers - the following example will not work:

```javascript JavaScript
mixpanel.alias('new_id', 'existing_id');
//this is invalid as 'new_id' already points to 'existing_id'
mixpanel.alias('new_id', 'newer_id'); 
```



> ❗️ ID Merge
> 
> If a project does not have [ID merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) enabled, the best practice is to call `alias` once when a unique ID is first created for a user (e.g., when a user first registers for an account). Do not use `alias` multiple times for a single user without ID Merge enabled.

### Call Reset at Logout

> 🚧 Reset can fill an identity cluster if used frequently
> 
> Reset should only be used if multiple users share a device.  
> 
> Calling reset frequently can lead to users quickly exceeding the 500 distinct_id per identity cluster limit. Once the 500 limit is reached you will no longer be able to add additional distinct_ids to the users identity cluster.

[Reset](doc:javascript-full-api-reference#section-mixpanel-reset) generates a new random distinct_id and clears super properties. Call reset to clear data attributed to a user when that user logs out. This allows you to handle multiple users on a single device. For more information about maintaining user identity, see the [Identity Management: Best Practices](https://help.mixpanel.com/hc/en-us/articles/115004497803) article.  

## Storing User Profiles

In addition to events, you can store user profiles in Mixpanel. Profiles are persistent sets of properties that describe a user - things like name, email address, and signup date. You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, push, or in-app messages.

> 📘 NOTE
> 
> The Mixpanel library does not automatically create user profiles for any user that performs an event. In order to send profile updates, you _must_ call <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.identify">mixpanel.identify</a> in addition to mixpanel.people.set, which empowers you to create profiles for only the users of your choice.

### Setting Profile Properties

You can set properties on a user profile with <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.people.set">mixpanel.people.set</a>.

```javascript JavaScript
// mixpanel.identify must be called in order to associate the profile properties you set 
// with that user. You only need to call it once per page load for a given user.
mixpanel.identify("13793");

mixpanel.people.set({ "Plan": "Premium" });
```



This will set a "Plan" property, with a value "Premium", on user 13793's profile. If there isn't a profile with distinct_id 13793 in Mixpanel already, a new profile will be created. If user 13793 already has a property named "Plan" in their profile, the old value will be overwritten with "Premium".

#### Other Types Of Profile Updates

There are a few other types of profile updates. To learn more, please follow the links to the full API documentation.

- <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.people.set_once">mixpanel.people.set_once</a> - set properties if they don't exist
- <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.people.append">mixpanel.people.append</a> - append to a list property
- <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.people.union">mixpanel.people.union</a> - append to a list property, excluding duplicates

### Incrementing Numeric Properties

You can use <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.people.increment">mixpanel.people.increment</a> to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.

```javascript JavaScript
// If no number is passed, the default is to increment by 1
mixpanel.people.increment("games played");

// You can also pass a number to increment
// Here we add 500 to the user's point count
mixpanel.people.increment("points earned", 500);

// Pass an object to increment multiple properties
mixpanel.people.increment({
    "dollars spent": 17,
    // Subtract by passing a negative value
    "credits remaining": -34
});
```



## Debug Mode

Debug Mode allows you to see the requests being sent by your implementation to Mixpanel, in real time, from your browser's developer console. This includes events (with their properties), as well as other types of requests such as `identify` and `alias`. It also exposes SDK errors and warnings that occur before data is sent to Mixpanel. Debug mode works with both NPM and HTML snippet implementations, but the setup process differs slightly.

### Start Debugging

**If you implemented using NPM**, you will need to add the `debug` parameter to your `mixpanel.init` call, like so:

```jsx
mixpanel.init('YOUR_TOKEN', {debug: true});
```



Be sure to remove this parameter before going into production; we suggest setting this parameter conditionally, based on the environment your implementation is running in (e.g. `true` for dev and staging; `false` for production).

**If you implemented using the HTML snippet**, you can enable debug mode either in code (as above), or you can enable it directly from your developer tools console, without making any code changes. This is because the `mixpanel` object is globally accessible from the snippet, so you can open your devtools console and simply run `mixpanel.set_config({debug: true})` to enable debug mode.

### Interpreting Debug Output

![](https://files.readme.io/6a7dc74-mp-set-config.png "mp-set-config.png")

Here, we are debugging an HTML snippet implementation, but the logs are the same regardless of how you enabled debug mode. These events are being sent normally — each batch of events can be expanded to see the properties being sent with the event. Logging for other types of Mixpanel requests, such as `identify` and `alias`, works the same way, with all request contents logged.

SDK errors and warnings, such as calling `track` without an event name and `alias`ing an identifier to itself, are also logged to the console in debug mode. These client-side errors do not result in an request to Mixpanel, so they can't be debugged using the network tab — you must use debug mode to surface them.

![](https://files.readme.io/3980f48-mp-debug-error.png "mp-debug-error.png")

## Group Analytics

> 📘 
> 
> Reach out to your Customer Success Manager or the [Mixpanel Sales Team](https://mixpanel.com/pricing/) to enable Group Analytics in your reports.

Mixpanel Group Analytics allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` will allow analysis at a company or group level when using Mixpanel analytics. Read [this article](https://help.mixpanel.com/hc/en-us/articles/360025333632) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.

- `group_key` is the property that connects event data for Group Analytics.
- `group_id` is the identifier for a specific group.

If the property “company” is chosen for Group Analytics, “company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

### Creating a Group Key

Administer group keys through your Project Settings. Group keys are event properties. All events need to have a defined group key on them in order to be attributed to a group. Group keys are project specific, and the group key should be set up before group data is sent. Note that Mixpanel does not backfill historical data before the group key was implemented.

To administer group keys, navigate to your Project Settings. Click **+Add Group Key** under the _GROUP KEYS_ section.

![](https://files.readme.io/e8e477d-Screen_Shot_2019-12-10_at_11.23.26_AM.png "Screen Shot 2019-12-10 at 11.23.26 AM.png")

Enter an event property to attribute the group key to. You can also enter a display name for the group key. Click **Save**.

### Adding Users to a Group

Adding users to groups causes the `group_key` and `group_id` to send as a property key and value for all events triggered by that user on the device. You can add multiple values for a single user to the `group_key` list property.

Similar to a `distinct_id`, the `group_key` allows Mixpanel to group events by an identifier for analysis. A `group_key`, however, is a group level identifier and not a user level identifier like the `distinct_id`.

You can add users to groups by calling the [`mixpanel.set_group()`](doc:javascript-full-api-reference#mixpanelset_group) method.

```javascript JavaScript
//Assign Company A and Company B to a user
mixpanel.set_group(“company”, [“Company A”, “Company B”])
```



You can call  [`mixpanel.add_group()`](doc:javascript-full-api-reference#mixpaneladd_group) to add any additional groups to an existing list.

```javascript JavaScript
//Add “Mixpanel” to the list of existing groups
mixpanel.add_group(“company”, “Mixpanel”)
```



### Creating Group Profiles

It is possible to create a Group profile that is similar to a user profile. You must call [`mixpanel.set_group()`](doc:javascript-full-api-reference#mixpanelset_group) to build a group profile. It is important to the `group_key`, `group_id`, and one property so that the profile is not empty. 

```javascript JavaScript
mixpanel.get_group(group_key, group_id).set({“property_name”: property_value})
```



### Setting Group Profile Properties

You can add details to Groups by adding properties to them.

In order to update Group profile properties, you must specify the group that needs to be updated by calling [`get_group()`](doc:javascript-full-api-reference#mixpanelget_group)

```javascript JavaScript
mixpanel.get_group(“company”, “Mixpanel”)
```



The [`get_group()`](doc:javascript-full-api-reference#mixpanelget_group) method can be chained with other commands that edit properties specific to the group.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

#### set

[`mixpanel.get_group().set`](doc:javascript-full-api-reference#mixpanelgroupset) updates or adds a property to a group.

```javascript JavaScript
mixpanel.get_group(group_key, group_id).set({“property_name”: property_value})
```



#### set once

[`mixpanel.get_group().set_once`](doc:javascript-full-api-reference#mixpanelgroupset_once) adds a property value to a group only if it has not been set before.

```javascript JavaScript
mixpanel.get_group(group_key, group_id).set_once({“property_name”: property_value})
```



#### unset

[`mixpanel.get_group().unset`](doc:javascript-full-api-reference#mixpanelgroupunset)  unsets a specific property in the group.

```javascript JavaScript
mixpanel.get_group(group_key, group_id).unset(“property_name”)
```



#### remove

[`mixpanel.get_group().remove`](doc:javascript-full-api-reference#mixpanelgroupremove)  removes a specific value in a list property.

```javascript JavaScript
mixpanel.get_group(group_key, group_id).remove(“property_name”, “property_value”)
```



#### union

[`mixpanel.get_group().union`](doc:javascript-full-api-reference#mixpanelgroupunion) adds the specified values to a list property and ensures that those values only appear once.

```javascript JavaScript
mixpanel.get_group(group_key, group_id).union(“property_name”, [property_value1, … [property_valueN])
```



## Opting Users Out of Tracking

Client-side tracking of individual user data can be stopped or resumed by controlling a user’s opt-out/opt-in state. Opt-out methods and library configuration settings only affect data sent from a single library instance. Data sent from other sources to Mixpanel’s APIs will still be ingested regardless of whether the user is opted out locally.

The opt-out/opt-in state of a user is controlled by an opt-out flag that is set as a browser cookie or localStorage entry. If the value of the flag is true, then the user is opted-out and will not be tracked. If the opt-out flag is false, then the user is tracked. The flag is not set when the SDK is initialized, so the initial state is neither opted in nor opted out. Without the flag set, the user will be tracked by default.

To opt a user out of tracking locally, use the <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.opt_out_tracking">mixpanel.opt_out_tracking</a> method. To resume tracking for an individual user, use <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.opt_in_tracking">mixpanel.opt_in_tracking</a>. Call <a style="font-family: courier" href="https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.has_opted_out_tracking">mixpanel.has_opted_out_tracking</a> to check user’s opt-out status locally. By default, an "$opt_in" event is sent every time that a user opts in. 

```javascript JavaScript
// Opt a user out of data collection
mixpanel.opt_out_tracking();

// Check a user's opt-out status 
// Returns true if user is opted out of tracking locally
mixpanel.has_opted_out_tracking();
```



### Opting Users Out of Tracking by Default

Mixpanel’s tracking libraries will send user data by default. Explicitly initializing a default opt-out state of true will opt-out all users by default, preventing data from sending unless a user’s opt-out state is set to false. Mixpanel’s Javascript library also respects browser [Do Not Track settings](https://allaboutdnt.com/).

```javascript JavaScript
// Initializing a default opt-out state of true 
// will prevent data from being collected by default
mixpanel.init("YOUR TOKEN", {opt_out_tracking_by_default: true})
```



## Delete Existing Data

Opting users out of tracking will stop any future tracking. This does not automatically delete data that has already been collected. Mixpanel's [deletion API](doc:managing-personal-data) can be used to delete existing data.

## EU Data Residency

Route data to Mixpanel's EU servers by setting the `api_host` config property.

```javascript
mixpanel.init(
  "YOUR_TOKEN",
  {
    api_host: "https://api-eu.mixpanel.com",
  },
);
```



## Release History

[See All Releases](https://github.com/mixpanel/mixpanel-js/releases).
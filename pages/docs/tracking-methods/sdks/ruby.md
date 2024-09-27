# Mixpanel SDKs: Ruby

The Mixpanel Ruby library is designed to be used for scripting, or in circumstances when a user isn't directly interacting with your application on the web or a mobile device.

The [Full API Reference](http://mixpanel.github.io/mixpanel-ruby), [Library Source Code](https://github.com/mixpanel/mixpanel-ruby), and an [Example Script](https://github.com/mixpanel/mixpanel-ruby/tree/master/demo) is documented in our GitHub repo.

## Getting Started
See our [server](/docs/quickstart/connect-your-data?sdk=ruby) quickstart for how to get started with the Ruby SDK.

## EU Data Residency

Route data to Mixpanel's EU servers by using a custom [consumer](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Consumer.html)

```ruby
require 'mixpanel-ruby'

eu_consumer = Mixpanel::Consumer.new(
    'https://api-eu.mixpanel.com/track',
    'https://api-eu.mixpanel.com/engage',
    'https://api-eu.mixpanel.com/groups',
)
tracker = Mixpanel::Tracker.new(YOUR_PROJECT_TOKEN) do |type, message|
    eu_consumer.send!(type, message)
end
```

## Storing User Profiles

In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

Mixpanel determines default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your data center. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

###Setting Profile Properties
Instances of [`Mixpanel::Tracker`](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html) have a property called `people` that is an instance of [`Mixpanel::People`](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html). You can use `people` to send profile updates.

```ruby
// create or update a profile with First Name, Last Name,
// E-Mail Address, Phone Number, and Favorite Color
// without updating geolocation data or $last_seen
tracker.people.set('12345', {
    '$first_name'       => 'John',
    '$last_name'        => 'Doe',
    '$email'            => 'john.doe@example.com',
    '$phone'            => '5555555555',
    'Favorite Color'    => 'red'
}, ip = 0, {'$ignore_time' => 'true'});
```

This call to [`Mixpanel::People#set`](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-set) will change the value of properties on user 12345's profile. If there isn't a profile with distinct_id 12345 in Mixpanel already, a new profile will be created. If user 12345 already has has any of these properties set on their profile, the old values will be overwritten with the new ones.

### Incrementing Numeric Properties
You can change the current value of numeric properties using [`people.increment`](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-increment). This is useful when you want to keep a running tally of things, such as games played, emails sent, or points earned.

```ruby
tracker.people.increment('12345', {
   'Logins used' => 1,
   # use a negative number to subtract
   'Logins remaining' => -1,
})
```

### Appending to List Properties
Use [`people.append`](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-append) to add an item to an existing list-valued property. The values you send with the append will be added to the end of the list for each named property. If the property doesn't exist, it will be created with a one element list as its value.

```ruby
tracker.people.append('12345', {
    'Favorite Fruits' => 'Apples'
})
```

### Other Types of Profile Updates
There are a few other types of profile updates. They're exposed as members of [`Mixpanel::People`](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html).


## Group Analytics

Mixpanel Group Analytics allows behavioral data analysis by selected groups, as opposed to individual users.

Grouping by identifiers other than the `distinct_id` allows analysis at a company or group level when using Mixpanel analytics. Read [this article](/docs/data-structure/advanced/group-analytics) to learn more about Group Analytics.

A group is identified by the `group_key` and `group_id`.
* `group_key` is the property that connects event data for Group Analytics.
* `group_id` is the identifier for a specific group.

If the property “Company” is chosen for Group Analytics, “Company” is the `group_key`, and “Mixpanel”, “Company A”, and “13254” are all potential `group_id` values. 

A user can belong to multiple groups. All updates to a group operate on the `group_key` and `group_id`.

### Creating a Group Key
See the Implementation section in [this article](/docs/data-structure/advanced/group-analytics) for instructions on how to create a group key in your Project Settings.

### Sending Group Identifiers With Events
To send group identifiers with events, send the `group_key` as a property key and the `group_id` as the property value. The data type of the `group_key` property is a list, therefore you can add multiple values for a single user. It is also possible to pass only one value.

```ruby
Tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.track("user_id1", “App Open”, {
  ‘GROUP KEY’ => 1234,
})
 
## event will be attributed to multiple groups with IDs 1000, 1234
tracker.track(“user_id1”, “App Open”, {
  ‘GROUP KEY’ => [1000, 1234],
})
```

Mixpanel can group events by the `group_id`, similar to how events are grouped with the `distinct_id`. A `group_id`, however, is a group level identifier and not a user level identifier like the `distinct_id`. 

Note that sending in a `group_key` and `group_id` as event properties does not add users to the group profile or assign group membership to the user's profile. Only **events** with your chosen `group_key` property set will be available for behavioral analysis at the group level. See the sections following the code example to learn how to add users to a group profile or add a group to the user's profile.

### Adding Group Identifiers to Individual Users
To connect group information to a user profile, include the `group_key` and `group_id` by sending the property as part of the people_set call. 

```ruby
## Create or update a user profile with distinct_id "user_id1", a $name property,
## and group_key = 'Company', group_id = 'Mixpanel'
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.people.set("user_id1", {
  '$name' => 'Steph Curry',
  ‘Company’ => 'Mixpanel',
})
```

### Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call a property-setting method like `Mixpanel::Groups#set` (described below) to create a group profile. It is important to include the `group_key`, `group_id`, and at least one property so that the profile is not empty. 

### Setting Group Properties
You can add details to Group Profiles by adding properties to them.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

#### set
`Mixpanel::Groups#set` updates or adds properties to a group profile. The profile is created if it does not exist.

```ruby
## Sets properties on a group profile. Takes a Hash with string
## keys, and values that are strings, numbers, booleans, or DateTimes
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
## Sets properties on group profile with group_key "Company", group_id "Acme"
tracker.groups.set('Company', 'Acme', {
  '$name' => 'Acme, Inc.',
  'plan' => 'Premium',
  'Sign-Up Date' => DateTime.now
})
```

For all Group methods, see our [reference](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Groups.html).


## Tracking Revenue

Mixpanel makes it easy to analyze the revenue you make from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with the [`track_charge method of Mixpanel::Tracker#people`](http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-track_charge). Sending a message created with `track_charge` will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.

```ruby
## Records a charge of $9.99 from user '12345'
tracker.people.track_charge('12345', 9.99)

## records a charge of $30.50 on the 2nd of January
mixpanel.people.track_charge("12345", 30.50, {
    '$time' => DateTime.parse("Jan 2 2013"),
})
```

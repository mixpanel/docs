---
title: "Ruby - Advanced"
slug: "ruby"
hidden: false
metadata: 
  title: "SDK integration: Ruby Library | Mixpanel Developer Docs"
  description: "The Mixpanel Ruby library is designed to be used for scripting, or in circumstances when a user isn't directly interacting with your application. Learn more here."
createdAt: "2018-04-12T18:58:37.520Z"
updatedAt: "2023-03-26T20:07:16.780Z"
---
The Mixpanel Ruby library is designed to be used for scripting, or in circumstances when a user isn't directly interacting with your application on the web or a mobile device.

# Installing the Library

You can get the library with
[block:code]
{
  "codes": [
    {
      "code": "$ gem install mixpanel-ruby",
      "language": "ruby"
    }
  ]
}
[/block]
Once the mixpanel-ruby gem is installed, you can use the Mixpanel library in your applications with:
[block:code]
{
  "codes": [
    {
      "code": "require 'mixpanel-ruby'",
      "language": "ruby"
    }
  ]
}
[/block]
# Sending Events

Mixpanel events are sent using an instance of the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html">Mixpanel::Tracker</a> class.

You can instantiate an instance of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html">Mixpanel::Tracker</a> with a String containing your Mixpanel project token. You can find your project token in the settings dialog of the Mixpanel web application.

Once you have an instance of the tracker, you can track events with by providing a [distinct id](https://mixpanel.com/help/questions/articles/what-is-distinctid) and a name for your event to the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html#method-i-track">Mixpanel::Tracker#track</a>.
[block:code]
{
  "codes": [
    {
      "code": "require 'mixpanel-ruby'\n\ntracker = Mixpanel::Tracker.new(PROJECT_TOKEN)\n\n# Tracks an event, 'Sent Message',\n# with distinct_id user_id\ntracker.track(user_id, 'Sent Message')\n\n# You can also include properties to describe\n# the circumstances of the event\ntracker.track(user_id, 'Plan Upgraded', {\n    'Old Plan' => 'Business',\n    'New Plan' => 'Premium'\n})",
      "language": "ruby"
    }
  ]
}
[/block]
Mixpanel determines default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).


# EU Data Residency

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

# Managing User Identity

Mixpanel groups events sent with different distinct_ids, presenting them in reports as different user event streams. You can connect events with different distinct_ids using [alias, identify, or merge](ref:events#track-event), ultimately attributing them to one user.
[block:callout]
{
  "type": "info",
  "title": "ID Merge",
  "body": "If a project has [ID merge enabled](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge), the `$identify` event can connect pre- and post-authentication events. If ID merge is not enabled, identify events will not link identities however alias can be used to connect pre and post registration events."
}
[/block]
###Alias
The `alias` method creates an alias which Mixpanel will use to remap one distinct_id to another. Multiple aliases can point to the same identifier.

[block:callout]
{
  "type": "info",
  "title": "ID Merge",
  "body": "If a project has [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) enabled,  just call identify with your chosen identifier as soon as you know who the user is to merge anonymous and identified distinct_ids. Calling alias is no longer required."
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**alias**",
    "0-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: red\">required</span>",
    "0-2": "A unique identifier that you want to use as an identifier for this user.",
    "1-0": "**distinct_id**",
    "1-1": "<span style=\"font-family: courier\">String</span></br><span style=\"color: green\">optional</span>",
    "1-2": "The current user identifier."
  },
  "cols": 3,
  "rows": 2
}
[/block]
The following is a valid use of `alias`:
[block:code]
{
  "codes": [
    {
      "code": "tracker.alias(new_internal_id, original_anonymous_id)\n#Create a second alias\nmp.alias(new_second_id, original_anonymous_id)",
      "language": "ruby"
    }
  ]
}
[/block]
Aliases can also be chained. You **cannot** point to multiple identifiers.
[block:callout]
{
  "type": "danger",
  "body": "If a project does not have [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) enabled, the best practice is to call `alias` once when a unique ID is first created for a user (e.g., when a user first registers for an account).",
  "title": "ID Merge"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Aliases don't take effect until the alias request hits the Mixpanel server. Because of this, unlike most Mixpanel tracking and update methods, alias sends a synchronous HTTP request directly to Mixpanel whenever it is called, regardless of how you've configured your tracker.",
  "title": "NOTE"
}
[/block]
# Storing User Profiles

In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

Mixpanel determines default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

##Setting Profile Properties
Instances of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html">Mixpanel::Tracker</a> have a property called `people` that is an instance of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html">Mixpanel::People</a>. You can use `people` to send profile updates.
[block:code]
{
  "codes": [
    {
      "code": "// create or update a profile with First Name, Last Name,\n// E-Mail Address, Phone Number, and Favorite Color\n// without updating geolocation data or $last_seen\ntracker.people.set('12345', {\n    '$first_name'       => 'John',\n    '$last_name'        => 'Doe',\n    '$email'            => 'john.doe@example.com',\n    '$phone'            => '5555555555',\n    'Favorite Color'    => 'red'\n}, ip = 0, {'$ignore_time' => 'true'});",
      "language": "ruby"
    }
  ]
}
[/block]
This call to <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-set">Mixpanel::People#set</a> will change the value of properties on user 12345's profile. If there isn't a profile with distinct_id 12345 in Mixpanel already, a new profile will be created. If user 12345 already has has any of these properties set on their profile, the old values will be overwritten with the new ones.
[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Pick your property names wisely. Once you've sent them to Mixpanel, there is no way to change them. Feel free to use capitalization and spaces in between words. \nThere are a few limitations:\n\n* Your property names should not begin with `$` or `mp_`. These properties are reserved for special properties sent by Mixpanel.\n* Your property names cannot begin or end with a space as they will automatically be trimmed.\n* Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.\n\nClick [here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties."
}
[/block]
## Incrementing Numeric Properties
You can change the current value of numeric properties using <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-increment">people.increment</a>. This is useful when you want to keep a running tally of things, such as games played, emails sent, or points earned.
[block:code]
{
  "codes": [
    {
      "code": "tracker.people.increment('12345', {\n   'Logins used' => 1,\n   # use a negative number to subtract\n   'Logins remaining' => -1,\n})",
      "language": "ruby"
    }
  ]
}
[/block]
## Appending to List Properties
Use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-append">people.append</a> to add an item to an existing list-valued property. The values you send with the append will be added to the end of the list for each named property. If the property doesn't exist, it will be created with a one element list as its value.
[block:code]
{
  "codes": [
    {
      "code": "tracker.people.append('12345', {\n    'Favorite Fruits' => 'Apples'\n})",
      "language": "ruby"
    }
  ]
}
[/block]
## Other Types of Profile Updates
There are a few other types of profile updates. They're exposed as members of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html">Mixpanel::People</a>.


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
See the Implementation section in [this article](https://help.mixpanel.com/hc/en-us/articles/360025333632#implementation) for instructions on how to create a group key in your Project Settings.

## Sending Group Identifiers With Events
To send group identifiers with events, send the `group_key` as a property key and the `group_id` as the property value. The data type of the `group_key` property is a list, therefore you can add multiple values for a single user. It is also possible to pass only one value.

```ruby
Tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.track("user_id1", “App Open”, {
  ‘GROUP KEY’ => 1234,
})
 
# event will be attributed to multiple groups with IDs 1000, 1234
tracker.track(“user_id1”, “App Open”, {
  ‘GROUP KEY’ => [1000, 1234],
})
```

Mixpanel can group events by the `group_id`, similar to how events are grouped with the `distinct_id`. A `group_id`, however, is a group level identifier and not a user level identifier like the `distinct_id`. 

Note that sending in a `group_key` and `group_id` as event properties does not add users to the group profile or assign group membership to the user's profile. Only **events** with your chosen `group_key` property set will be available for behavioral analysis at the group level. See the sections following the code example to learn how to add users to a group profile or add a group to the user's profile.

## Adding Group Identifiers to Individual Users
To connect group information to a user profile, include the `group_key` and `group_id` by sending the property as part of the people_set call. 

```ruby
# Create or update a user profile with distinct_id "user_id1", a $name property,
# and group_key = 'Company', group_id = 'Mixpanel'
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.people.set("user_id1", {
  '$name' => 'Steph Curry',
  ‘Company’ => 'Mixpanel',
})
```

## Creating Group Profiles
It is possible to create a Group profile that is similar to a user profile. You must call a property-setting method like `Mixpanel::Groups#set` (described below) to create a group profile. It is important to include the `group_key`, `group_id`, and at least one property so that the profile is not empty. 

## Setting Group Properties
You can add details to Group Profiles by adding properties to them.

You can set the property `$name` to populate the name field at the top of the group profile.

These operations are similar to the corresponding operations for user profile property updates.

### set
`Mixpanel::Groups#set` updates or adds properties to a group profile. The profile is created if it does not exist.

```ruby
# Sets properties on a group profile. Takes a Hash with string
# keys, and values that are strings, numbers, booleans, or DateTimes
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
# Sets properties on group profile with group_key "Company", group_id "Acme"
tracker.groups.set('Company', 'Acme', {
  '$name' => 'Acme, Inc.',
  'plan' => 'Premium',
  'Sign-Up Date' => DateTime.now
})
```

### set once
`Mixpanel::Groups#set_once` adds properties to a group profile only if the property is not already set. The profile is created if it does not exist.

```ruby
# set_once works just like #set, but will only change the
# value of properties if they are not already present
# in the group. That means you can call set_once many times
# without changing an original value.
 
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.groups.set_once('Company', 'Acme', {
  'First Login Date': DateTime.now
});
```

### unset
`Mixpanel::Groups#unset` unsets properties on the group profile.

```ruby
# Removes properties and their values from a group profile.
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
# removes a single property and its value from a group profile.
tracker.groups.unset('Company', 'Acme', 'Overdue Since')

# removes multiple properties and their values from a group profile.
tracker.groups.unset('Company', 'Acme', ['Overdue Since', 'Paid Date'])
```

### union
`Mixpanel::Groups#union` adds the specified values to a list property and ensures that those values only appear once. The profile is created if it does not exist.

```ruby
# Set union on list valued properties.
# Associates a list containing all elements of a given list,
# and all elements currently in a list associated with the given
# property. After a union, every element in the list associated
# with a property will be unique.
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.groups.union('Company', 'Acme', {
  'Levels Completed' => ['Suffragette City']
})
```

### remove
`Mixpanel::Groups#remove` removes a specific value in a list property.

```ruby
# Removes a specific value in a list property
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
# removes "socks" from the "Items purchased" list property
# for the specified group
tracker.groups.remove('Company', 'Acme', { 'Items purchased' => 'socks' })
```

### delete
`Mixpanel::Groups#delete` permanently deletes a group profile.

```ruby
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.groups.delete('Company', 'Acme')
```

# Lookup tables

You can use [lookup tables](https://help.mixpanel.com/hc/en-us/articles/360044139291#introduction) to enrich existing event and profile properties. While you've had the ability to upload CSV to update the lookup tables, we now support programmatic access to do the same. Updating lookup tables follows the same process as updating group profile properties.

It is possible to create a lookup profile that is similar to a user profile. You must call a property-setting method like `Mixpanel::Groups#set` to create a lookup profile (row). It is important to include the group_key, group_id, and at least one property so that the profile is not empty.

To learn more about the concepts behind lookup tables, and to see how each of the IDs map to the lookup table entities, please [read this](https://help.mixpanel.com/hc/en-us/articles/360044139291#concepts).

## How to find the group_key?

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bdc9746-findinggroupkey.png",
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
`Mixpanel::Groups#set` updates or adds properties to a lookup profile (row). The profile is created if it does not exist.

```ruby
# Create a lookup table profile (row) with group_key (found in lookup table details page)
# and group_id (join key value in 1st column of table).
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.groups.set('d1b6d2e0-1330-4ad6-b520-d948ede3b1a7', 'Gangnam style', {
  'Genre' => 'Pop',
})
```

### set once
`Mixpanel::Groups#set_once` adds properties to a lookup profile only if the property is not already set. The profile is created if it does not exist.

```ruby
# set_once works just like #set, but will only change the
# value of properties if they are not already present
# in the lookup profile. That means you can call set_once many times
# without changing an original value.
 
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.groups.set_once('d1b6d2e0-1330-4ad6-b520-d948ede3b1a7', 'Gangnam style', {
  'First Played': DateTime.now
});
```

### unset
`Mixpanel::Groups#unset` unsets properties on the lookup profile.

```ruby
# Removes properties and their values from a lookup profile.
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
# removes a single property and its value from a lookup profile
tracker.groups.unset(
  'd1b6d2e0-1330-4ad6-b520-d948ede3b1a7',
  'Gangnam style',
  'Genre'
)

# removes multiple properties and their values from a lookup profile
tracker.groups.unset(
  'd1b6d2e0-1330-4ad6-b520-d948ede3b1a7',
  'Gangnam style',
  ['Genre', 'First Played']
)
```

### union
`Mixpanel::Groups#union` adds the specified values to a list property and ensures that those values only appear once. The profile is created if it does not exist.

```ruby
# Set union on list valued properties.
# Associates a list containing all elements of a given list,
# and all elements currently in a list associated with the given
# property. After a union, every element in the list associated
# with a property will be unique.
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.groups.union('d1b6d2e0-1330-4ad6-b520-d948ede3b1a7', 'Gangnam style', {
  'hashtags' => ['spectacular', 'crazy']
})
```

### remove
`Mixpanel::Groups#remove` removes a specific value in a list property.

```ruby
# Removes a specific value in a list property
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.groups.remove('d1b6d2e0-1330-4ad6-b520-d948ede3b1a7', 'Gangnam style', {
  'hashtags' => 'amazing'
})
```

### delete
`Mixpanel::Groups#delete` permanently deletes a lookup profile (row).

```ruby
tracker = Mixpanel::Tracker.new(YOUR_MIXPANEL_TOKEN)
tracker.groups.delete('d1b6d2e0-1330-4ad6-b520-d948ede3b1a7', 'Gangnam style')
```

# Tracking Revenue

Mixpanel makes it easy to analyze the revenue you make from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-track_charge">track_charge method of Mixpanel::Tracker#people</a>. Sending a message created with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/People.html#method-i-track_charge">track_charge</a> will add transactions to the individual user profile, which will also be reflected in the Mixpanel Revenue report.
[block:code]
{
  "codes": [
    {
      "code": "# Records a charge of $9.99 from user '12345'\ntracker.people.track_charge('12345', 9.99)\n\n# records a charge of $30.50 on the 2nd of January\nmixpanel.people.track_charge(\"12345\", 30.50, {\n    '$time' => DateTime.parse(\"Jan 2 2013\"),\n})",
      "language": "ruby"
    }
  ]
}
[/block]
# Scaling your Server-Side Tracking

By default, Mixpanel::Tracker sends a request to Mixpanel immediately for every tracking message or profile update. This is convenient for getting started quickly, but almost all server-side use of the Mixpanel library will eventually want to do the IO associated with tracking in a separate thread or process from the events being tracked.

The Mixpanel library provides two mechanisms for separating your tracking from your IO; The <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html#method-c-new">Mixpanel::Tracker block constructor</a> and the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Consumer.html">Mixpanel::Consumer class</a>.

## Using Blocks with Mixpanel::Tracker.new
In addition to your token, <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html#method-c-new">Mixpanel::Tracker::new</a> takes an optional block. A block is given, when you call <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html#method-i-track">Mixpanel::Tracker#track</a> or any of the profile update methods on <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html#attribute-i-people">Mixpanel::Tracker#people</a>, the tracker will call your block instead of sending data directly to Mixpanel.

You can use the code in your block to send the data to a separate process, add it to a queue, or write it to a log.
[block:code]
{
  "codes": [
    {
      "code": "tracker_log = open(\"MIXPANEL_LOG.txt\", \"w+\")\n\n# Tracker blocks take two arguments-\n# a type (either :event or :profile_update)\n# and a message (a JSON string containing\n# your Mixpanel message, suitable for\n# sending to Mixpanel)\n\ntracker = Mixpanel::Tracker.new(YOUR_TOKEN) do |type, message|\n    tracker_log.write([ type, message ].to_json + \"\\n\")\nend",
      "language": "ruby"
    }
  ]
}
[/block]
## Using Mixpanel::Consumer
The Mixpanel library also offers classes to send the messages you record. You can use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Consumer.html">Mixpanel::Consumer</a> to send messages to Mixpanel.
[block:code]
{
  "codes": [
    {
      "code": "mixpanel = Mixpanel::Consumer.new\nopen(\"MIXPANEL_LOG.txt\", \"r+\") do |log|\n    log.each_line do |line|\n        type, message = JSON.load(line)\n        # Each call communicates with Mixpanel\n        mixpanel.send!(type, message)\n    end\nend",
      "language": "ruby"
    }
  ]
}
[/block]
The combination of a block passed to <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Tracker.html#method-c-new">Mixpanel::Tracker::new</a> and a <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-ruby/Mixpanel/Consumer.html">Mixpanel::Consumer</a> makes it simple to use the Mixpanel library with a queueing system. For example:
[block:code]
{
  "codes": [
    {
      "code": "# In your time-sensitive process\ntracker = Mixpanel::Tracker.new(YOUR_TOKEN) do |type, message|\n    @queue.set('mixpanel_queue', [ type, message ].to_json)\nend\n\n# Track just like you would in any other situation\ntracker.track(user_id, 'Sent Message')\ntracker.people.increment(user_id, {\n    'Messages Sent' => 1\n})\n\n# In a worker process on another machine\nmixpanel = Mixpanel::Consumer.new\nloop do\n    job = @queue.get('mixpanel_queue')\n    mixpanel.send!(*JSON.load(job))\nend",
      "language": "ruby"
    }
  ]
}
[/block]
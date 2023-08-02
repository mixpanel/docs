# Php

The Mixpanel PHP library is designed to be used for scripting, or in circumstances when a client can't or won't run client side scripts

[Github Repo with the source code](https://github.com/mixpanel/mixpanel-php)

## Installing the Library
You can get the library using [Composer](http://getcomposer.org/) by including the following in your project's composer.json requirements and running composer update:

```json
"require": {
    ...
    "mixpanel/mixpanel-php" : "2.*"
    ...
}
```

If you're not using Composer for your package management, you can browse and download the library [from GitHub](https://github.com/mixpanel/mixpanel-php).

Our library requires PHP 5.0 or greater.

## EU Data Residency
Route data to Mixpanel's EU servers by setting a `host` configuration during initialization.
```php
<?php
// import dependencies (using composer's autoload)
// if not using Composer, you'll want to require the
// lib/Mixpanel.php file here
require "vendor/autoload.php";

// get the Mixpanel class instance with your project token
$mp = Mixpanel::getInstance("YOUR TOKEN", array("host" => "api-eu.mixpanel.com"));
```

## Sending Events
Track events in the mixpanel-php library by using the track method on the Mixpanel class:
```php
<?php
// $mp is the variable with the Mixpanel class instance
$mp->track("button clicked", array(
  "label" => "sign-up",
  "distinct_id" => "KNOWN_USER_ID"
));

//by default, no distinct_id is included on events unless specified in the properties
//you can call identify so it's included in events during that script execution
```

Mixpanel determines default geolocation data (\$city, \$region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

## Managing User Identity

Mixpanel groups events sent with different distinct_ids, presenting them in reports as different user event streams. You can connect events with different distinct_ids, ultimately attributing them to one user. You will want to check which version of ID management you have enabled within Project Settings -> Identity Merge

If you have `Original ID Merge` enabled, you can connect IDs via calling the identify function with both IDs

```php
$mp->identify('KNOWN_USER_ID','ANONYMOUS_ID');
```

If you have `Simplified ID Merge` enabled, you will want to send an event containing both the `$device_id` (containing the anonymous ID) and `$user_id` properties:

```php
//the call to identify is not necessary on the server-side to connect the events
//but it's practical so in all events after, the distinct_id is pre populated
$mp->identify('KNOWN_USER_ID');
$mp->track("sign-up", array(
  '$device_id' => "ANONYMOUS_ID",
  '$user_id' => "KNOWN_USER_ID"
));
```

**Note:** For projects on our legacy ID management model (it will read as *ID Merge is not enabled* within project settings), you can read about [using $create_alias to link IDs here](https://github.com/mixpanel/docs/blob/main/legacy/aliases.md).

You can read more on ID management [in our tracking guide](tracking/how-tos/identifying-users).

## Storing User Profiles
In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

Mixpanel determines default geolocation data (\$city, \$region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

### Setting Profile Properties
The Mixpanel class has a public property called people that exposes an instance of Producers_MixpanelPeople that you can use to make profile updates.

```php
<?php
require "vendor/autoload.php";
$mp = Mixpanel::getInstance("MIXPANEL_PROJECT_TOKEN");

// create or update a profile with First Name, Last Name,
// E-Mail Address, Phone Number, and Favorite Color
// without updating geolocation data or $last_seen
$mp->people->set("KNOWN_USER_ID", array(
    '$first_name'       => "John",
    '$last_name'        => "Doe",
    '$email'            => "john.doe@example.com",
    '$phone'            => "5555555555",
    "Favorite Color"    => "red"
), $ip = 0, $ignore_time = true);
```
The call to `people->set` will set the value of properties on user `KNOWN_USER_ID`'s profile. If there isn't a profile with distinct_id 12345 in Mixpanel already, a new profile will be created. If user 12345 already has has any of these properties set on their profile, the old value will be overwritten with the new ones.


**Note:** Pick your property names wisely. Once you've sent them to Mixpanel, there is no way to change them. Feel free to use capitalization and spaces in between words. There are a few limitations:

* Your property names should not begin with $ or mp_. These properties are reserved for special properties sent by Mixpanel.
* Your property names cannot begin or end with a space as they will automatically be trimmed.
* Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.

[Click here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties.

### Incrementing Numeric Properties
You can change the current value of numeric properties using `people->increment`. This is useful when you want to keep a running tally of things, such as games played, emails sent, or points earned.

```php
<?php
require "vendor/autoload.php";
$mp = Mixpanel::getInstance("MIXPANEL_PROJECT_TOKEN");

// increment user 12345's "login count" by one
$mp->people->increment("KNOWN_USER_ID", "login count", 1);

// Use negative numbers to subtract- reduce
// "credits remaining" by 10
$mp->people->increment("KNOWN_USER_ID", "credits remaining", -10);
```

### Appending to List Properties
Use `people->append` to add an item to an existing list-valued property. The values you send with the append will be added to the end of the list for each named property. If the property doesn't exist, it will be created with a one element list as its value.

```php
<?php
require "vendor/autoload.php";
$mp = Mixpanel::getInstance("MIXPANEL_PROJECT_TOKEN");

// append "Apples" to user 12345's "favorites"
$mp->people->append("KNOWN_USER_ID", "favorites", "Apples");
```

### Other Types of Profile Updates
There are a few other types of profile updates. They're exposed as public methods of [Producers_MixpanelPeople](http://mixpanel.github.io/mixpanel-php/classes/Producers_MixpanelPeople.html).

## Debugging and Logging
You can turn on Mixpanel logging by enabling the "debug" flag in your initialization:

```php
<?php
require "vendor/autoload.php";
$mp = Mixpanel::getInstance("MIXPANEL_PROJECT_TOKEN", array("debug" => true));
```

## Scaling your Server-Side Tracking

The PHP library stores all events and profile updates in an in-memory queue, that is flushed automatically when the instance of [Mixpanel](http://mixpanel.github.io/mixpanel-php/classes/Mixpanel.html) is destroyed, or when the queue reaches a configurable threshold size (by default, 1000 items). You can also force the instance to send on demand by calling [flush](http://mixpanel.github.io/mixpanel-php/classes/Mixpanel.html#method_flush).

At flush time, the messages are processed by an implementation of the [ConsumerStrategies_AbstractConsumer](http://mixpanel.github.io/mixpanel-php/classes/ConsumerStrategies_AbstractConsumer.html) class that determines how the messages will be written. The default settings use [ConsumerStrategies_CurlConsumer](http://mixpanel.github.io/mixpanel-php/classes/ConsumerStrategies_CurlConsumer.html), which uses cURL to write the messages over SSL to Mixpanel.

As your application scales, you may want to separate the IO for communicating with Mixpanel out of the processes that observe your events. You can write your events and updates to a file or a distributed queue by writing your own custom consumer.

To create a [custom consumer](https://github.com/mixpanel/mixpanel-php/blob/master/examples/consumers/ObConsumer.php), you'll want to extend ConsumerStrategies_AbstractConsumer and implement the persist method. Then you'll want to [register it with the Mixpanel class](https://github.com/mixpanel/mixpanel-php/blob/master/examples/custom_consumer.php) and specify it for use.

```php
<?php
// Here's a simple consumer that just writes the events to
// send out to the client.
class MyLoggingConsumer extends ConsumerStrategies_AbstractConsumer {
    public function persist($batch) {
        echo "<pre>";
        echo "Would send batch:\n";
        echo json_encode($batch) . "\n";
        echo "</pre>"
        return true;
    }
}

$mp = new Mixpanel("MIXPANEL_PROJECT_TOKEN", array(
    // Provide the name of your consumer class to the Mixpanel constructor
    "consumers" => array("logger" => "MyLoggingConsumer"),

    // Now tell the Mixpanel instance to use your class
    "consumer" => "logger"
));

// This event will be sent to the client in a <pre> tag
$mp->track("test_event", array("color" => "blue"));
```
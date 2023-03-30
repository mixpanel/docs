---
title: "PHP - Advanced"
slug: "php"
hidden: false
metadata: 
  title: "SDK Integration: PHP Library | Mixpanel Developer Docs"
  description: "The Mixpanel PHP library is designed to be used for scripting, or in circumstances when a client can't or won't run client-side scripts. Learn more here."
createdAt: "2018-04-12T18:58:33.904Z"
updatedAt: "2023-03-26T20:07:32.248Z"
---
The Mixpanel PHP library is designed to be used for scripting, or in circumstances when a client can't or won't run client side scripts

# Installing the Library

You can get the library using [Composer](http://getcomposer.org/) by including the following in your project's composer.json requirements and running composer update:

[block:code]
{
  "codes": [
    {
      "code": "\"require\": {\n    ...\n    \"mixpanel/mixpanel-php\" : \"2.*\"\n    ...\n}",
      "language": "php"
    }
  ]
}
[/block]
If you're not using Composer for your package management, you can browse and download the library from GitHub at https://github.com/mixpanel/mixpanel-php.

Our library requires PHP 5.0 or greater.

# EU Data Residency

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

# Sending Events

Track events in the mixpanel-php library by using the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Mixpanel.html#method_track">track</a> method on the Mixpanel class:
[block:code]
{
  "codes": [
    {
      "code": "<?php\n// import dependencies (using composer's autoload)\n// if not using Composer, you'll want to require the\n// lib/Mixpanel.php file here\nrequire \"vendor/autoload.php\";\n\n// get the Mixpanel class instance, replace with your\n// project token\n$mp = Mixpanel::getInstance(\"MIXPANEL_PROJECT_TOKEN\");\n\n// track an event\n$mp->track(\"button clicked\", array(\"label\" => \"sign-up\"));",
      "language": "php"
    }
  ]
}
[/block]
Mixpanel determines default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

# Managing User Identity

Mixpanel groups events sent with different distinct_ids, presenting them in reports as different user event streams. You can connect events with different distinct_ids using [alias, identify, or merge](ref:events#track-events), ultimately attributing them to one user.
[block:callout]
{
  "type": "info",
  "body": "If a project has [ID merge enabled](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge), the `$identify` event can connect pre- and post-authentication events. If ID merge is not enabled, identify events will not link identities however alias can be used to connect pre and post registration events.",
  "title": "ID Merge"
}
[/block]


# Storing User Profiles

In addition to events, you can send user profile updates to Mixpanel. Mixpanel can maintain a profile of each of your users, storing information you know about them. An update is a message that changes the properties of a user profile.

You can use profiles to explore and segment users by who they are, rather than what they did. You can also use profiles to send messages, such as emails, SMS, or push notifications.

Mixpanel determines default geolocation data ($city, $region, mp_country_code) using the IP address on the incoming request. As all server-side calls will likely originate from the same IP (that is, the IP of your server), this can have the unintended effect of setting the location of all of your users to the location of your datacenter. [Read about best practices for geolocation with server-side implementations](https://mixpanel.com/blog/2014/09/08/everything-about-server-side-updates/).

### Setting Profile Properties
The Mixpanel class has a public property called <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Mixpanel.html#property_people">people</a> that exposes an instance of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Producers_MixpanelPeople.html">Producers_MixpanelPeople</a> that you can use to make profile updates.
[block:code]
{
  "codes": [
    {
      "code": "<?php\nrequire \"vendor/autoload.php\";\n$mp = Mixpanel::getInstance(\"MIXPANEL_PROJECT_TOKEN\");\n\n// create or update a profile with First Name, Last Name,\n// E-Mail Address, Phone Number, and Favorite Color\n// without updating geolocation data or $last_seen\n$mp->people->set(12345, array(\n    '$first_name'       => \"John\",\n    '$last_name'        => \"Doe\",\n    '$email'            => \"john.doe@example.com\",\n    '$phone'            => \"5555555555\",\n    \"Favorite Color\"    => \"red\"\n), $ip = 0, $ignore_time = true);\n",
      "language": "php"
    }
  ]
}
[/block]
The call to <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Producers_MixpanelPeople.html#method_set">people->set</a> will set the value of properties on user 12345's profile. If there isn't a profile with distinct_id 12345 in Mixpanel already, a new profile will be created. If user 12345 already has has any of these properties set on their profile, the old value will be overwritten with the new ones.
[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Pick your property names wisely. Once you've sent them to Mixpanel, there is no way to change them. Feel free to use capitalization and spaces in between words. \nThere are a few limitations:\n\n* Your property names should not begin with `$` or `mp_`. These properties are reserved for special properties sent by Mixpanel.\n* Your property names cannot begin or end with a space as they will automatically be trimmed.\n* Your property names and values cannot be longer than 255 characters. In practice they should be much shorter than that. Property names get cut off by our user interface at about 20 characters.\n\nClick [here](https://help.mixpanel.com/hc/en-us/articles/360001355266) to see a list of Mixpanel's reserved user profile properties."
}
[/block]
### Incrementing Numeric Properties

You can change the current value of numeric properties using <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Producers_MixpanelPeople.html#method_increment">people-&gt;increment</a>. This is useful when you want to keep a running tally of things, such as games played, emails sent, or points earned.
[block:code]
{
  "codes": [
    {
      "code": "<?php\nrequire \"vendor/autoload.php\";\n$mp = Mixpanel::getInstance(\"MIXPANEL_PROJECT_TOKEN\");\n\n// increment user 12345's \"login count\" by one\n$mp->people->increment(12345, \"login count\", 1);\n\n// Use negative numbers to subtract- reduce\n// \"credits remaining\" by 10\n$mp->people->increment(12345, \"credits remaining\", -10);",
      "language": "php"
    }
  ]
}
[/block]
### Appending to List Properties

Use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Producers_MixpanelPeople.html#method_append">people-&gt;append</a> to add an item to an existing list-valued property. The values you send with the append will be added to the end of the list for each named property. If the property doesn't exist, it will be created with a one element list as its value.
[block:code]
{
  "codes": [
    {
      "code": "<?php\nrequire \"vendor/autoload.php\";\n$mp = Mixpanel::getInstance(\"MIXPANEL_PROJECT_TOKEN\");\n\n// append \"Apples\" to user 12345's \"favorites\"\n$mp->people->append(12345, \"favorites\", \"Apples\");",
      "language": "php"
    }
  ]
}
[/block]
### Other Types of Profile Updates
There are a few other types of profile updates. They're exposed as public methods of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Producers_MixpanelPeople.html">Producers_MixpanelPeople.</a>

# Tracking Revenue

Mixpanel makes it easy to analyze the revenue you make from individual customers. By associating charges with user profiles, you can compare revenue across different customer segments and calculate things like lifetime value.

You can track a single transaction with the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Producers_MixpanelPeople.html#method_trackCharge">trackCharge</a> method on the Mixpanel->people object. Sending a message created with <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Producers_MixpanelPeople.html#method_trackCharge">trackCharge</a> will add transactions to the individual user profile, which will be reflected in the Mixpanel Revenue report.

[block:code]
{
  "codes": [
    {
      "code": "<?php\nrequire \"vendor/autoload.php\";\n$mp = Mixpanel::getInstance(\"MIXPANEL_PROJECT_TOKEN\");\n\n// track a purchase or charge of $9.99 for user 12345\n// where the transaction happened just now\n$mp->people->trackCharge(12345, \"9.99\");\n\n// track a purchase or charge of $20 for user 12345\n// where the transaction happened on June 01, 2013 at 5pm EST\n$mp->people->trackCharge(12345, \"20.00\", strtotime(\"01 Jun 2013 5:00:00 PM EST\"));",
      "language": "php"
    }
  ]
}
[/block]


# Debugging and Logging

You can turn on Mixpanel logging by enabling the "debug" flag in your initialization:
[block:code]
{
  "codes": [
    {
      "code": "<?php\nrequire \"vendor/autoload.php\";\n$mp = Mixpanel::getInstance(\"MIXPANEL_PROJECT_TOKEN\", array(\"debug\" => true));",
      "language": "php"
    }
  ]
}
[/block]


# Scaling your Server-Side Tracking

### Message Consumers

The PHP library stores all events and profile updates in an in-memory queue, that is flushed automatically when the instance of <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Mixpanel.html">Mixpanel</a> is destroyed, or when the queue reaches a configurable threshold size (by default, 1000 items). You can also force the instance to send on demand by calling <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/Mixpanel.html#method_flush">flush</a>.

At flush time, the messages are processed by an implementation of the <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/ConsumerStrategies_AbstractConsumer.html">ConsumerStrategies_AbstractConsumer</a> class that determines how the messages will be written. The default settings use <a style="font-family: courier" href="http://mixpanel.github.io/mixpanel-php/classes/ConsumerStrategies_CurlConsumer.html">ConsumerStrategies_CurlConsumer</a>, which uses cURL to write the messages over SSL to Mixpanel.

As your application scales, you may want to separate the IO for communicating with Mixpanel out of the processes that observe your events. You can write your events and updates to a file or a distributed queue by writing your own custom consumer.

To create <a style="font-family: courier" href="https://github.com/mixpanel/mixpanel-php/blob/master/examples/consumers/ObConsumer.php">a custom consumer</a>, you'll want to extend <a style="font-family: courier" href="https://github.com/mixpanel/mixpanel-php/blob/master/lib/ConsumerStrategies/AbstractConsumer.php">ConsumerStrategies_AbstractConsumer</a> and implement the persist method. Then you'll want to [register it with the Mixpanel class and specify it for use](https://github.com/mixpanel/mixpanel-php/blob/master/examples/custom_consumer.php).
[block:code]
{
  "codes": [
    {
      "code": "<?php\n// Here's a simple consumer that just writes the events to\n// send out to the client.\nclass MyLoggingConsumer extends ConsumerStrategies_AbstractConsumer {\n    public function persist($batch) {\n        echo \"<pre>\";\n        echo \"Would send batch:\\n\";\n        echo json_encode($batch) . \"\\n\";\n        echo \"</pre>\"\n        return true;\n    }\n}\n\n$mp = new Mixpanel(\"MIXPANEL_PROJECT_TOKEN\", array(\n    // Provide the name of your consumer class to the Mixpanel constructor\n    \"consumers\" => array(\"logger\" => \"MyLoggingConsumer\"),\n\n    // Now tell the Mixpanel instance to use your class\n    \"consumer\" => \"logger\"\n));\n\n// This event will be sent to the client in a <pre> tag\n$mp->track(\"test_event\", array(\"color\" => \"blue\"));",
      "language": "php"
    }
  ]
}
[/block]
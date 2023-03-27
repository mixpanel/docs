---
title: "JQL"
slug: "jql-overview"
hidden: false
metadata: 
  title: "JQL Overview | Mixpanel Developer Docs"
  description: "What is JQL? Read our documentation to learn what JQL is, the difference between JQL and SQL, and how to use it for custom data analysis with Mixpanel."
createdAt: "2020-08-13T17:26:47.301Z"
updatedAt: "2023-03-26T17:23:09.419Z"
---
[block:callout]
{
  "type": "danger",
  "title": "JQL is in maintenance mode.",
  "body": "Mixpanel is not investing in JQL any further. If you would like to run arbitrary queries on your Mixpanel events, please use our [Data Pipelines](https://developer.mixpanel.com/docs/raw-export-pipeline) add-on to export your events to your data warehouse."
}
[/block]

The JQL JavaScript code must define a `main()` function. This JavaScript will be compiled, and the `main()` function will be executed by the query engine. The return value of `main()` must be a sequence of zero or more transformations applied to a collection of events, user records or joined records.
Events are retrieved by calling the `Events()` function.

For example, the following query counts the number of events that happened on one day in 2016:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-04\",\n    to_date: \"2016-01-04\"\n  }).reduce(mixpanel.reducer.count());\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## Querying Events

The events collection is fetched by calling `Events()` with a single object argument that describes what events should be fetched. Below are supported fields:
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**from_date**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "0-2": "The start of the date range to query events for. \nFormat: \"YYYY-MM-DD\"",
    "1-0": "**to_date**",
    "1-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: red\">required</span>",
    "1-2": "The end of the date range to query events for (inclusive). \nFormat: \"YYYY-MM-DD\"",
    "2-0": "**event_selectors**",
    "2-1": "<span style=\"font-family: courier\">Array</span></br><span style=\"color: green\">optional</span>",
    "2-2": "An optional list of selector objects of the format `[{event: \"your event name\", selector: \"Segmentation expression\", label: \"selected event description\"}, ...]`. This will be used to pre-filter to only the events in this list. Segmentation expressions in event selectors can only access event properties, not user properties. More on Segmentation expressions: [tutorial](https://help.mixpanel.com/hc/en-us/articles/115005061286-How-do-I-build-segmentation-expressions-), [reference](ref:segmentation-expressions). The label allows you to differentiate between similar events with different selectors. \nIt is faster to filter events within the Events query than to use a `filter()` transformation."
  },
  "cols": 3,
  "rows": 3
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  // Get all signups and purchases by users with email addresses\n  // from Yahoo or Gmail between January 1st and January 2nd\n  return Events({\n    from_date: '2016-01-01',\n    to_date: '2016-01-02',\n    event_selectors: [\n        {event: 'signup', label: 'Signup'},\n        {event: 'purchase', selector: '\"yahoo\" in properties[\"$email\"]',\n            label: 'Purchase (Yahoo)'},\n        {event: 'purchase', selector: '\"gmail\" in properties[\"$email\"]',\n            label: 'Purchase (Gmail)'}\n    ]\n  })\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## Event Object Specification

The event objects returned from `Events()` have the following attributes:
[block:parameters]
{
  "data": {
    "h-0": "Attribute",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**name**",
    "0-1": "<span style=\"font-family: courier\">string</span>",
    "0-2": "The name of the event.",
    "1-0": "**distinct_id**",
    "1-1": "<span style=\"font-family: courier\">string</span>",
    "1-2": "The distinct_id of the user associated with this event. If distinct_id was not sent with the event, this will be undefined.",
    "2-0": "**time**",
    "2-1": "<span style=\"font-family: courier\">integer</span>",
    "2-2": "The timestamp of the event, expressed as milliseconds since January 1, 1970 in your project's timezone, not UTC.",
    "3-0": "**sampling_factor**",
    "3-1": "<span style=\"font-family: courier\">float</span>",
    "3-2": "The rate at which this event was sampled (if you are using Mixpanel's sampling feature). 0.05 means the event is being sampled at 5%. This is important for getting accurate counts of sampled events. If you are not using sampling, this will always be 1.0.",
    "4-0": "**properties**",
    "4-1": "<span style=\"font-family: courier\">object</span>",
    "4-2": "An object containing all of the properties of the event."
  },
  "cols": 3,
  "rows": 5
}
[/block]
## Querying Profiles

Profile data is fetched by calling `People()`
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**user_selectors**",
    "0-1": "<span style=\"font-family: courier\">array</span></br><span style=\"color: green\">optional</span>",
    "0-2": "An optional list of {selector: \"Segmentation expression\"} objects that restrict user records retrieved. A record is retrieved if it matches any of the expressions. Segmentation expression in user selectors expressions can only access user properties, not event properties. See also information on Segmentation expressions as [argument to Events()](ref:segmentation-expressions)."
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  // get all users who signed up in 2016\n  return People(\n  ).filter(function(user){\n    return user.properties.signup_date >= new Date(\"2016-01-01\") &&\n           user.properties.signup_date < new Date(\"2017-01-01\");\n  });\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
or, equivalently:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  // get all users who signed up in 2016\n  return People({\n    user_selectors:[{selector:\n        'has_prefix(string(user[\"signup_date\"]), \"2016\")'}]\n  });\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## User Object Specification

The user objects returned from `People()` have the following attributes:
[block:parameters]
{
  "data": {
    "h-0": "Attribute",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**distinct_id**",
    "0-1": "<span style=\"font-family: courier\">string</span>",
    "0-2": "The distinct_id of the user.",
    "1-0": "**time**",
    "1-1": "<span style=\"font-family: courier\">integer</span>",
    "1-2": "The timestamp of the most recent user record update, expressed as milliseconds since January 1, 1970 in your project's timezone, not UTC.",
    "2-0": "**last_seen**",
    "2-1": "<span style=\"font-family: courier\">integer</span>",
    "2-2": "The timestamp of the most recent user record update provided via Set() method, expressed as milliseconds since January 1, 1970, in your project's timezone.",
    "3-0": "**properties**",
    "3-1": "<span style=\"font-family: courier\">object</span>",
    "3-2": "An object containing all of the properties of the user."
  },
  "cols": 3,
  "rows": 4
}
[/block]
## Combining Events and Profiles

You can combine (join) events and profile data using `join(Events(), People())` expression.

Apart from joined collection, join() accepts an optional third argument: an object with join options:
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**type**",
    "0-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "0-2": "Join type: full, left, right or inner. Default is a full join.",
    "1-0": "**selectors**",
    "1-1": "<span style=\"font-family: courier\">string</span></br><span style=\"color: green\">optional</span>",
    "1-2": "An optional list of {event: \"event name\", selector: \"Segmentation expression\"} objects that restrict event/user pairs retrieved. A record is retreieved if it matches any of the selector objects. To learn more about selectors, refer to [Segmentation API](ref:segmentation-expressions) and [Segmentation expression tutorial](https://help.mixpanel.com/hc/en-us/articles/115005061286-How-do-I-build-segmentation-expressions-). Segmentation expressions in join() selectors can access both events and user properties."
  },
  "cols": 3,
  "rows": 2
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return join(\n    Events({\n      from_date: \"2016-01-01\",\n      to_date: \"2016-06-01\",\n    }),\n    People(),\n    // Fetch tuples that satisfy muliple conditions:\n    // * They're both event and user records.\n    // * Event is sent from US.\n    // * User age is above thirty.\n    {\n      type:\"inner\",\n      selectors:[{selector:\n        'properties[\"country\"] == \"US\" and user[\"age\"] > 30'}]\n    }\n  );\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## Joined Object Specification

The objects returned from `join()` have the following attributes:
[block:parameters]
{
  "data": {
    "h-0": "Attribute",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**distinct_id**",
    "0-1": "<span style=\"font-family: courier\">string</span>",
    "0-2": "The distinct_id of both event and matching user.",
    "1-0": "**event**",
    "1-1": "<span style=\"font-family: courier\">object</span>",
    "1-2": "Event object. For users with no events, this property is undefined",
    "2-0": "**user**",
    "2-1": "<span style=\"font-family: courier\">object</span>",
    "2-2": "User object with distinct_id matching the event. For events without distinct id or when there's no matching user record, this property is undefined."
  },
  "cols": 3,
  "rows": 3
}
[/block]
## join() Operation Details

You cannot apply any transformations to the collections inside `join()`. For example, this is not legal: `join(Events(...).map(...)`, `People(...).filter())`

## Passing Parameters to a Query

The query engine creates and populates a `params` object inside the global context. The object is constructed from a JSON blob passed as the params argument to the JQL HTTP endpoint.

Query parameters allow you to write more flexible and reusable queries. We recommend populating Events `from_date/to_date` using params to make the query code reusable across different date ranges.

For example, you could pass these params:
[block:code]
{
  "codes": [
    {
      "code": "params = {\n  start_date: \"2016-01-01\",\n  end_date: \"2016-01-10\",\n  event: \"View Blog\"\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
to this query:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: params.start_date,\n    to_date: params.end_date,\n  }).filter(function(event) { return event.name == params.event })\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
Alternatively, and more efficiently, you can pass multiple events as a list in a `params` object using `_.map`.

For example, you could pass these params:
[block:code]
{
  "codes": [
    {
      "code": "params = {\n  start_date: \"2016-01-01\",\n  end_date: \"2016-01-10\",\n  events: [\"View Blog\", \"View Landing Page\", \"pageview\"]\n};",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
to this query:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: params.start_date,\n    to_date: params.end_date,\n    event_selectors: _.map(params.events, event => ({event: event}))\n  });\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
# Transformations

Transformations are applied to collections, taking one collection as input and producing another. A transformation takes a user-defined function (or a built-in function) that controls how the transformation works.

The JQL API provides the following set of transformations, which can be chained together to do complex analysis.

## <hr><span style="font-family: courier">filter(function(item) {})</span>

Filter the collection by calling the provided function on each of its elements. If the function evaluates to true, keep the element. Otherwise, discard it.
[block:code]
{
  "codes": [
    {
      "code": "// filter for \"login\" events from users who signed up in January.\nfunction main() {\n  return join(\n      Events({\n        from_date: \"2016-01-01\",\n        to_date: \"2016-04-01\"\n      }),\n      People())\n  .filter(function(tuple) {\n    return tuple.event && tuple.user &&\n        tuple.event.name == \"login\" &&\n        tuple.user.properties.signup_date >= new Date(\"2016-01-01\") &&\n        tuple.user.properties.signup_date <= new Date(\"2016-02-01\");\n  });\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">map(function(item) {})</span>

Build a new collection by applying the provided function to each element of the input collection. The output collection contains the return value of the provided function for each element in the input collection, so an input collection of size N will result in an output collection of size N.
[block:code]
{
  "codes": [
    {
      "code": "// Extract the email domain name for further analysis.\n// The resulting collection contains strings.\nfunction main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  .map(function(event) {\n    var pos = event.properties.$email.indexOf(\"@\");\n    return event.properties.$email.slice(pos + 1);\n  });\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">reduce([reducer function(s)])</span>

`reduce()` turns the input collection into just a single value.

It takes one argument - a reducer or list of reducer functions, which must implement the following signature:
[block:code]
{
  "codes": [
    {
      "code": "function(accumulators, items) {\n  // Combine previously-aggregated \"accumulators\"\n  // with new \"items\" and return the result.\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
A reducer function accepts two arguments: an array of its previous results (accumulators), and an array of items to reduce. The first argument - accumulators - is used to break down the initial set of values into many calls of the reducer function. JQL runs the reduction in a hierarchical fashion, where some subsets of inputs are reduced to accumulator values first, and multiple accumulator values are combined subsequently. There are no guarantees on the order of input.

The example below is using a reduce function that counts elements up.
[block:code]
{
  "codes": [
    {
      "code": "// Count events.\n\nfunction main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  .reduce(function(previous_counts, events) {\n    var count = events.length;\n    for (var i = 0; i < previous_counts.length; i++) {\n        count += previous_counts[i];\n    }\n    return count;\n  });\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
Counting is a common use case, so JQL provides a built-in `mixpanel.reducer.count()` that could be used in place of the snippet above.
[block:code]
{
  "codes": [
    {
      "code": "// Count events.\n\nfunction main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  \t.reduce(mixpanel.reducer.count());\n}\n\n\n\n",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
While there are built-in reducer methods to address common use cases, a reducer function is flexible and can be used to aggregate inputs into a single value.  For example, returning the earliest timestamp and latest timestamp could be done using a reducer function.
[block:code]
{
  "codes": [
    {
      "code": "// Return earliest timestamp and latest timestamp of events\nfunction main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  .reduce(function(accumulators, items){\n    var result = {\n      earliest: null,\n      latest: null\n    };\n    for (var i = 0; i < accumulators.length; i++) {\n      result.earliest = minimum(result.earliest, accumulators[i].earliest);\n      result.latest = Math.max(result.latest, accumulators[i].latest);\n    }\n    for (var j = 0; j < items.length; j++) {\n      result.earliest = minimum(result.earliest,items[j].time);\n      result.latest = Math.max(result.latest,items[j].time);\n    }\n    return result;\n  });\n}\n\n// Helper function to return minimum value (ignoring null)\nfunction minimum(x,y) {\n  if (x === null) {\n    return y;\n  }\n  if (y === null) {\n    return x;\n  }\n  return Math.min(x,y);\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">groupBy([keys], [reducer function(s)])</span>

Group the collection according to the provided list of keys, then apply the provided reducer function(s) to each group. The underlying action of `groupBy()` is similar to the one of `reduce()` - aggregating many input values into one. However, the output collection is different: while `reduce()` aggregates everything into a single value, `groupBy()` produces a collection with the following structure:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"key\": <composite group key>,\n  \"value\": <return value of reducer function or list of values if composite reducer supplied>\n}",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
The group key is computed from a key specification - the first argument of the `groupBy()` transformation. This argument is a list containing property names or functions that compute a key from a collection element.

If you use property names as keys, you can use dot notation (i.e., a ".") to access values inside nested objects. For example, if you had a list of objects that looked like

`{"item": "tshirt", "info": {"size": "XL"}}`, you could group by

`["item", "info.size"]`

It is common to use dot notation to group on event properties. For example, in `Events(...).groupBy(['properties.$city', 'properties.$browser'], ...)`, each unique combination of City and Browser becomes a group, so the following groups may be output:

* ["New York", "Firefox"]
* ["San Francisco", "Firefox"]
* ["San Francisco", "Safari"]
* etc.

As with a list of keys, the `groupBy()` can accept a single reducer or a list of reducer functions. Each reducer supplied in this argument is then applied to each group key. When a list of reducer functions is provided, the value for each group key will be a list of the results from each function. Reducer functions can include both built-in and custom reducer functions. The signature of a reduce function provided to a `groupBy()` is:
[block:code]
{
  "codes": [
    {
      "code": "function(accumulators, items) {\n    // Analyze items, return accummulators\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-02-01\",\n    event_selectors: [{event: \"Change Plan\"}],\n  })\n  .groupBy(\n    [\n      \"properties.New Plan\",\n      \"properties.Previous Plan\",\n      // use a function to dynamically calculate a day of the event.\n      function(ev) {\n        return (new Date(ev.time)).toDateString();\n      }\n    ],\n    [\n      mixpanel.reducer.count(),\n      mixpanel.reducer.any()\n    ]\n  );\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
The group key can only include scalars - strings, numbers, booleans, nulls. If a group-by property evaluates to a list of multiple scalars, `groupBy()` can treat in two different ways:

Inline that list into group key (this is the default behavior). The following query computes, for every sequence of notification campaigns each user participated in, the total number of profiles that have that sequence:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return People().groupBy([\"properties.$campaigns\"],\n                          mixpanel.reducer.count());\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
Create a different group key for each list element. The following query computes the number of users that participated in each campaign.
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return People().groupBy(\n        mixpanel.multiple_keys([\"properties.$campaigns\"]),\n        mixpanel.reducer.count())\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
A single query can use both key treatments, even with the same property, like in a query below:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return People().groupBy([\n          mixpanel.multiple_keys([\"properties.$campaigns\"]),\n          \"properties.$campaigns\"],\n        mixpanel.reducer.count());\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">groupByUser([optional additional keys], [reducer function(s)])</span>

Group events by distinct_id and, optionally, additional keys, then apply the provided reducer function(s) to each group.

This transformation is a specialization of `groupBy()` that guarantees that the reduce function(s) will process all events of a single user in temporal order.

This guarantee is reflected in the signature of the reduce function provided to `groupByUser()`:
[block:code]
{
  "codes": [
    {
      "code": "function(state, events) {\n    // Analyze events, aggregate in state. Return the new state.\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
Its first argument is a single accumulator or a list of accumulators, but not an array of accumulators as used in `groupBy()` and `reduce()` cases. The accumulator value is always the value of last call to the reduce function, with an initial value of Undefined.

The difference in signature means that reducer function implementations can not be used interchangeably between `groupByUser()` and `groupBy()/reduce()`. Built-in reducers, however, can be used in both contexts.

The output of `groupByUser()` is a collection of objects with the following structure:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"key\": [<user distinct_id>] + <optional additional keys>,\n  \"value\": <return value of reducer function(s)>\n}",
      "language": "json",
      "name": "Example"
    }
  ]
}
[/block]
`groupByUser()` can only be applied to the source data collection. This means it must be called either on the `Events()`, `People()` or `join()` collections directly, or on the collection returned by `Events({ ... }).filter(...) or People({ ... }).filter(...) or join( ... ).filter(...)`

A very common use-case for `groupByUser()` is to compute some property of each user based on their behavior. For example, the code below computes what events users typically perform after a "login" event.

**Frequencies of Events Following "Login":** 
[block:code]
{
  "codes": [
    {
      "code": "// For each user, find how often they perform each event\n// after signing up.\nfunction main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-02-01\"\n  })\n  .groupByUser(function(state, events) {\n    state = state || { distribution: {} };\n    if (events.length == 0) {\n        return state;\n    }\n    for (var i = 0; i < events.length - 1; ++i) {\n        if (events[i].name == \"login\") {\n            state.distribution[events[i + 1].name] =\n                state.distribution[events[i + 1].name] || 0;\n            ++state.distribution[events[i + 1].name];\n        }\n    }\n    // Previous call for this user may have contained\n    // \"login\" as the last event.\n    if (state.last_event_login) {\n        state.distribution[events[0].name] =\n            state.distribution[events[0].name] || 0;\n        ++state.distribution[events[0].name];\n    }\n    // If last event is \"login\", next call should see that.\n    if (events[events.length - 1].name == \"login\") {\n        state.last_event_login = true;\n    }\n    return state;\n  });\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
It is possible to compute more fine-grained aggregation with `groupByUser()` by providing a list of additional keys in the first argument. User distinct_id always remains the implicit first key.

The following example computes, for each user and each day, when they did their first event on that day.

**Multiple Groups per User:** 
[block:code]
{
  "codes": [
    {
      "code": "// figure out the hour where the most users do something\n// for the first time that day\nfunction main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  // group the events for each user by day, then get\n  // the first hour we saw them in each of those days.\n  .groupByUser([getDay], function(first_hour, events) {\n    if (first_hour === undefined) {\n      first_hour = (new Date(events[0].time)).getHours();\n    }\n    return first_hour;\n  })\n}\n\nfunction getDay(event) {\n  return (new Date(event.time)).toISOString().split('T')[0];\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
`groupByUser()` places the same restriction on group keys as `groupBy()` does: a key can only include scalars, and list keys can be treated in two different ways depending on presence of the `mixpanel.multiple_keys()` decorator.

## <hr><span style="font-family: courier">flatten()</span>

Flatten the collection by inlining array elements of the input collection. The contents of arrays in the input collection are placed into the output collection. Input elements that are not arrays are forwarded into the output collection without modification.
[block:code]
{
  "codes": [
    {
      "code": "// Compute percentiles on counts for number\n// of events each user has done.\nfunction main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  // Compute the number of events for each user.\n  .groupByUser(mixpanel.reducer.count())\n  .reduce(mixpanel.reducer.numeric_percentiles('value',\n      [10, 25, 50, 75, 90]))\n  .flatten();\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">sortAsc(accessor)</span>

Sort the input collection by the provided sort key - either property name or a function. Sort key must be a scalar.
[block:code]
{
  "codes": [
    {
      "code": "// Find the users who have used the product the least.\nfunction main() {\n    return Events({\n      from_date: \"2016-01-01\",\n      to_date: \"2016-01-07\"\n    })\n    .groupBy(['properties.$email'], mixpanel.reducer.count())\n    .sortAsc('value');\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">sortDesc(accessor)</span>

Similar to `sortAsc()`, but sort in descending order.
[block:code]
{
  "codes": [
    {
      "code": "// Find the most popular events.\nfunction main() {\n    return Events({\n      from_date: \"2016-01-01\",\n      to_date: \"2016-01-07\"\n    })\n    .groupBy(['name'], mixpanel.reducer.count())\n    .sortDesc('value');\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
# <hr>Chained Aggregations

Chaining `groupBy()` operations in JQL can be used to compute complex statistics. The simplest case for chained aggregations is the query below that computes the number of unique users that had events from each country:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date:\"2016-01-01\",\n    to_date:\"2016-06-01\",\n  })\n  .groupByUser([\"properties.country\"], mixpanel.reducer.null())\n  .groupBy([mixpanel.slice(\"key\", 1)], mixpanel.reducer.count());\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
The first `.groupByUser()` transformation results in a collection of objects with the following structure: `{key:[distinct_id, country], value: null}`.

The second aggregation instructs JQL to strip off position 0 of the key holding the distinct_id, and aggregate again, counting results up. The result is going to be a number of unique users for each country.

`mixpanel.slice("key", <start>, <optional limit>)` is a built-in function that instructs JQL to strip away key components that don't fall into [start, limit) interval, coalescing some groups and producing a more coarse grouping.

This approach can be extended for computing more complex statistics. For example, here is median over a maximum number of events users had in each country:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date:\"2016-01-01\",\n    to_date:\"2016-06-01\",\n  })\n  .groupByUser([\"properties.country\"], mixpanel.reducer.count())\n  .groupBy([mixpanel.slice(\"key\", 1)], mixpanel.reducer.max(\"value\"))\n  .reduce(mixpanel.reducer.numeric_percentiles(\"value\", 50));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "An important note on data serialization: the query engine is sometimes forced to serialize and transfer collections during transformations using JSON. Complex data types such as functions and dates are not preserved, so you should avoid storing these types in accumulator objects.",
  "title": "NOTE"
}
[/block]
# JQL Builtins
We provide a set of useful helper functions for use with the `groupBy()`,` groupByUser()`, and `reduce()` transformations. These functions are provided by the query engine, so they are available with no extra work to you.

Some of built-in reducers, e.g. `avg()` or `sum()`, compute statistics over numeric collections. Each of the numeric built-in reducers accepts an optional first argument - an accessor - that instructs it how to convert the input object to a numeric value.

An accessor can be a JavaScript function, a string with a dot-separated property path, or a built-in mapper function, like <a style="font-family: courier" href="https://developer.mixpanel.com/docs/write-jql#hrspan-stylefont-family-couriermixpanelnumeric_bucketaccessor-buckets-specspan">mixpanel.numeric_bucket()</a>.

For example, the following query computes the average age of your users:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return People().reduce(mixpanel.reducer.avg(\"properties.age\"));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
This example makes use of the property name accessor to `mixpanel.reducer.avg()` built-in. A custom function could be used too; in the example below, that function computes length of an array property:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return People().reduce(mixpanel.reducer.avg(\n    function(u) { return u.properties.$campaigns.length; }));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.count()</a>

Count the number of elements in the collection (or group, if passed to groupBy()). For example, you could use groupBy() and this reducer to implement Mixpanel's Segmentation report.

**Example:** 
[block:code]
{
  "codes": [
    {
      "code": "// count the number of events between two dates\nfunction main() {\n  return Events({\n    from_date: \"2015-08-01\",\n    to_date: \"2015-08-30\"\n  }).reduce(mixpanel.reducer.count());\n}",
      "language": "javascript"
    }
  ]
}
[/block]
**Result** 
[block:code]
{
  "codes": [
    {
      "code": "// 15834 total events\n[15834]",
      "language": "json"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// count the number of people of each age\nfunction main() {\n  return People().groupBy([\"properties.age\"],\n    mixpanel.reducer.count());\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"key\": [0],\n    \"value\": 109\n  },\n  {\n    \"key\": [1],\n    \"value\": 120\n  },\n  ...\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.sum(accessor)</span>

Sum a collection of numeric values together.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accessor**",
    "0-1": "<span style=\"font-family: courier\">function</span>",
    "0-2": "Optional property accessor to retrieve a numeric property from the item."
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// compute the total number of notification hits\nfunction main() {\n  return People()\n    .reduce(mixpanel.reducer.sum(\n      function(u) { return u.properties.$campaigns.length; }));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[11301]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.numeric_summary(accessor)</span>

Get a numeric summary of a collection. Returns the count, sum, sum of squares, average and standard deviation for a collection of numeric values.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accessor**",
    "0-1": "<span style=\"font-family: courier\">function</span>",
    "0-2": "Optional property accessor to retrieve a numeric property from the item."
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// understand page load times\nfunction main() {\n  return Events({\n    from_date: \"2015-10-01\",\n    to_date: \"2015-10-02\",\n    event_selectors: [{event: \"pageview\"}],\n  })\n  .reduce(mixpanel.reducer.numeric_summary('properties.load_time_ms'));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// count = 221 events\n// sum(load time) == 32624 milliseconds\n// sum squares = 9199564 ms^2\n[{ \"count\": 221, \"sum\": 32624, \"sum_squares\": 9199564, \"avg\": 147.61991, \"stddev\": 140.838023 }]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.avg(accessor)</span>

Compute the average of a numeric collection. `avg()` is a shortcut replacement for the two-step process: aggregate with `numeric_summary()`, and follow-up with a `.map()` step that computes average.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accessor**",
    "0-1": "<span style=\"font-family: courier\">function</span>",
    "0-2": "Optional property accessor to retrieve a numeric property from the item."
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-06-01\",\n    event_selectors: [{event:\"pageview\"}]\n  })\n  .reduce(mixpanel.reducer.avg(\"properties.load_time_ms\"));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[148.9087]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.numeric_percentiles(accessor, percentiles spec)</span>

Compute percentiles of a numeric collection. Note: this built-in samples the numeric stream; it's output will differ from exact percentile value up to a fixed error bound. The result may also fluctuate between runs.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accessor**",
    "0-1": "<span style=\"font-family: courier\">function</span>",
    "0-2": "name of a numeric property or a function that computes number from input.",
    "1-0": "**percentile**",
    "1-1": "<span style=\"font-family: courier\">number</span>",
    "1-2": "A percentile number, in (0, 100) interval (alternative 1).",
    "2-0": "**percentile**",
    "2-1": "<span style=\"font-family: courier\">array</span>",
    "2-2": "Array of percentile numbers (alternative 2)."
  },
  "cols": 3,
  "rows": 3
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Find median page load time\nfunction main() {\n  return Events({\n    from_date: \"2015-06-01\",\n    to_date: \"2016-06-01\",\n    event_selectors: [{event: \"pageview\"}],\n  })\n  .reduce(mixpanel.reducer.numeric_percentiles(\n       \"properties.load_time_ms\", 50));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[118]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Find 90th, 95th, 99th, 99.9th percentiles of page load time.\nfunction main() {\n  return Events({\n    from_date: \"2015-06-01\",\n    to_date: \"2016-06-01\",\n    event_selectors: [{event: \"pageview\"}],\n  })\n  .reduce(mixpanel.reducer.numeric_percentiles(\n       \"properties.load_time_ms\", [90, 95, 99, 99.9]));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n [\n     {\"percentile\":90,\"value\":356},\n     {\"percentile\":95,\"value\":468},\n     {\"percentile\":99,\"value\":732},\n     {\"percentile\":99.9,\"value\":1725}\n ]\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.min(accessor)/max(accessor)<span style="font-family: courier">string</span>

Compute minimum (or maximum) element in a numeric collection.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accessor**",
    "0-1": "<span style=\"font-family: courier\">function</span>",
    "0-2": "Name of a numeric property, or a function that computes a number from input."
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Find minimum page load time.\nfunction main() {\n  return Events({\n    from_date: \"2015-06-01\",\n    to_date: \"2016-06-01\",\n    event_selectors: [{event: \"pageview\"}],\n  })\n  .reduce(mixpanel.reducer.min(\"properties.load_time_ms\"));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[0]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.min_by(accessor)/max_by(accessor)</span>

Find the element in a collection that gives the minimum (or maximum) value of a numeric property.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accessor**",
    "0-1": "<span style=\"font-family: courier\">function</span>",
    "0-2": "Name of a numeric property, or a function that computes a number from input."
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Find the pageview event with lowest load time.\nfunction main() {\n  return Events({\n    from_date: \"2015-06-01\",\n    to_date: \"2016-06-01\",\n    event_selectors: [{event: \"pageview\"}],\n  })\n  .reduce(mixpanel.reducer.min_by(\"properties.load_time_ms\"));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n {\n     \"name\":\"pageview\",\n     \"distinct_id\":\"8bcf7259-5c6c-4b10-9b8a-34148607aa95\",\n     \"time\":1437541412000,\n     \"sampling_factor\":1,\n     \"properties\":{\n         \"$email\":\"Sylvia.Harper@outlookx.com\",\n         \"$import\":true,\n         \"country\":\"MX\",\n         \"load_time_ms\":0\n     }\n }\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.top(limit)</span>

Limit the response to the top N values of a collection. This function expects the input collection to be of the `groupBy()` format: `{ "key": [...], "value": <numeric value> }`. The output of this function is a collection containing a single item, the list of the top N items.

[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**limit**",
    "0-1": "<span style=\"font-family: courier\">integer</span>",
    "0-2": "The number of items to return"
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// get the top 3 countries sending any event\n  function main() {\n  return Events({\n    from_date: \"2015-06-01\",\n    to_date: \"2016-06-01\",\n    event_selectors:[{event: \"pageview\"}]\n  })\n  .groupBy([\"properties.country\"], mixpanel.reducer.count())\n  .reduce(mixpanel.reducer.top(3));\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n  [\n    {\n      \"key\": [\"USA\"],\n      \"value\": 1234\n    },\n    {\n      \"key\": [\"MEX\"],\n      \"value\": 678\n    },\n    {\n      \"key\": [\"CAN\"],\n      \"value\": 345\n    }\n  ]\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.applyGroupLimits(limit spec)/</span>
Limit the response of each group to the top N values of a collection and optionally to the top N values of the entire collection. This function expects the input collection to be of the `groupBy()` format: `{ "key": [...], "value": <numeric value> }`. The output of this function is a collection with the following structure.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**limits**",
    "0-1": "<span style=\"font-family: courier\">array</span>",
    "0-2": "Array of limits per group.",
    "1-0": "**global**",
    "1-1": "<span style=\"font-family: courier\">number</span>",
    "1-2": "limit Maximum number of results to display."
  },
  "cols": 3,
  "rows": 2
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Get the top events by user, by date, limited to the top 12 results\nfunction main() {\n  return Events({ // Collect our events\n    from_date: '2016-01-01',\n    to_date:   '2016-01-31',\n  }) // Group the events by multiple keys\n  .groupBy([\"name\",\"properties.$email\",\"properties.signup_date\"], mixpanel.reducer.count())\n  // Sort the results in the desired order by the desired property\n  .sortDesc('value')\n  // Limit the results of each group displayed\n  .applyGroupLimits([5,5,5], 12)\n}",
      "language": "javascript"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"key\": [\n      \"login\",\n      \"Ralph.Vargas@aolx.com\",\n      \"2015-11-29T05:55:40\"\n    ],\n    \"value\": 30\n  },\n  {\n    \"key\": [\n      \"login\",\n      \"Frances.Mendoza@gmailx.com\",\n      \"2015-12-12T06:50:28\"\n    ],\n    \"value\": 28\n  }, ...\n  {\n    \"key\": [\n      \"View Blog\",\n      \"Henry.Murray@gmailx.com\",\n      \"2015-12-22T20:14:32\"\n    ],\n    \"value\": 8\n  }\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.object_merge()</span>

Merge a collection of JavaScript objects into a single object. Numeric leaf values are summed.
[block:code]
{
  "codes": [
    {
      "code": "// alternate way of calculating the same thing as\n// mixpanel.reducer.numeric_summary()\nfunction main() {\n  return Events({\n    from_date: \"2015-10-01\",\n    to_date: \"2015-10-02\",\n    event_selectors: [{event: \"pageview\"}],\n  })\n  .map(function(event) {\n    var load_time_ms = event.properties.load_time_ms;\n    return {\n      count: 1,\n      sum: load_time_ms,\n      sum_squares: load_time_ms * load_time_ms\n    }\n  })\n  .reduce(mixpanel.reducer.object_merge());\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[{ \"count\": 221, \"sum\": 32624, \"sum_squares\": 9199564}]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.any()</span>
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2015-10-01\",\n    to_date: \"2015-10-02\",\n  })\n  .filter(function(e) { return e.properties.country == \"US\"; })\n  .reduce(mixpanel.reducer.any());\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"name\": \"pageview\",\n    \"distinct_id\": \"75a54352-33c9-4606-9d5f-c5eca9b77b5d\",\n    ...\n  }\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.reducer.null()</span>

Always return null.
[block:code]
{
  "codes": [
    {
      "code": "// Dump distinct ids of users who had events in January 2016.\nfunction main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-31\",\n  })\n  .groupByUser(mixpanel.reducer.null())\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n   {\"key\": \"1f83aed1-63c4-48ec-aa44-91b90fc1917d\", \"value\": null},\n   ...\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.numeric_bucket(accessor, buckets spec)</span>

Bucketize a numeric value by normalizing it to the lower boundary of the bucket it falls into. It is commonly used to reduce the number of distinct keys when aggregating over numeric values.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**spec**",
    "0-1": "<span style=\"font-family: courier\">array</span>",
    "0-2": "List of bucket boundaries (alternative 1).",
    "1-0": "**spec**",
    "1-1": "<span style=\"font-family: courier\">object</span>",
    "1-2": "with bucket_size and offset fields specifying regular bucket intervals (alternative 2)."
  },
  "cols": 3,
  "rows": 2
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Bucketize all users into five age groups.\nfunction main () {\n  return People().groupBy(\n     [mixpanel.numeric_bucket('properties.age', [0, 5, 18, 30, 60])],\n     mixpanel.reducer.count());\n }",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"key\": [0],\n    \"value\": 539\n  },\n  {\n    \"key\": [5],\n    \"value\": 1041\n  },\n  ...\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Bucketize all users into regular buckets by event count.\nfunction main() {\n  return Events({\n    from_date: \"2015-10-01\",\n    to_date: \"2015-10-02\",\n  }).groupByUser(mixpanel.reducer.count())\n    .groupBy(\n      [mixpanel.numeric_bucket('value', {bucket_size: 10, offset:1})],\n      mixpanel.reducer.count());\n}\n",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"key\": [1],\n    \"value\": 422\n  },\n  {\n     \"key\": [11],\n     \"value\": 15\n  }\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.to_number(accessor)/</span>

Convert input into a number. mixpanel.to_number() is commonly used when executing numeric aggregations over a collection of mixed non-numeric data. When unable to interpret input as a number, return undefined.
[block:parameters]
{
  "data": {
    "h-0": "Argument",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accessor**",
    "0-1": "<span style=\"font-family: courier\">function</span>",
    "0-2": "Name of property to convert (or a javascript function)."
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Compute the distribution of signup times\nfunction main() {\n  return People()\n    .reduce(mixpanel.reducer.numeric_summary(\n      mixpanel.to_number('properties.signup_date')\n    ));\n}\n",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"count\": 4411,\n    \"sum\": 6369278974417,\n    \"sum_squares\": 9.1971e+21,\n    \"avg\": 1443953519.477896,\n    \"stddev\": 5988562.937055\n  }\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
## <hr><span style="font-family: courier">mixpanel.numeric_bucket()</span>

`mixpanel.numeric_bucket()` can be used to segment events over calendar period, when applied to time property.
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-30\",\n  }).groupBy([mixpanel.numeric_bucket('time', {bucket_size: 86400 * 1000})],\n             mixpanel.reducer.count());\n}",
      "language": "javascript"
    }
  ]
}
[/block]
JQL defines several constants with bucket specs for widely used time bucket boundaries, when applied to milliseconds since Unix epoch.

* `mixpanel.daily_time_buckets` - buckets for calendar days

* `mixpanel.weekly_time_buckets` - buckets for calendar weeks, starting on Monday

* `mixpanel.monthly_time_buckets` - buckets for calendar months

* `mixpanel.quarterly_time_buckets` - buckets for calendar quarters: Jan - Mar, Apr - Jun, ...

* `mixpanel.annual_time_buckets` - buckets for calendar years

The following is an equivalent of the query above.
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-30\",\n  }).groupBy([\n    mixpanel.numeric_bucket('time', mixpanel.daily_time_buckets)],\n    mixpanel.reducer.count());\n}",
      "language": "javascript",
      "name": "Example"
    }
  ]
}
[/block]
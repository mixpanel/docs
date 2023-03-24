---
title: "Get Started Guide"
slug: "jql-get-started-guide"
hidden: false
metadata: 
  title: "JQL Get Started Guide | Mixpanel Developer Docs"
  description: "Getting started with JQL queries in Mixpanel? In this section, we'll explore the core concepts of JQL by working through a real-world example."
createdAt: "2020-10-20T18:57:50.202Z"
updatedAt: "2021-12-01T17:49:05.721Z"
---
In this section, we'll explore the core concepts of JQL by working through a real world example.

Imagine we're a freemium SaaS business with two paid plans, Basic and Premium, and we want to understand how many of each plan were purchased, and how long it took users to convert from free to paid.

## Running & Saving Queries within Mixpanel

When you're ready to run queries against your own data in Mixpanel, just log in, go to Applications, and click on the application **JQL** to be able to run queries interactively and save them. Saved reports are available to other members of the project. 

The console is the recommended way to use JQL, as it is the most visible method across a team and the editor is built specifically for JQL syntax.

The JQL console has a 5GB limit on data that it can query, and a 2GB limit on the resulting output.

## Running Queries from the Command Line: Mac OS X or Linux

JQL can be executed via an HTTP endpoint, with JQL query provided in a body of a POST request. With the query saved in query.js file, the following command uses the cURL utility to upload our query and return back the results, in JSON format.

The API has a 5GB limit on data that it can query, and a 2GB limit on the resulting output.
[block:code]
{
  "codes": [
    {
      "code": "# sends the JQL code in `query.js` to the api\n# to a project with sample data for this tutorial\ncurl https://mixpanel.com/api/2.0/jql \\\n    -u ce08d087255d5ceec741819a57174ce5: \\\n    --data-urlencode script@query.js | python -m json.tool",
      "language": "shell"
    }
  ]
}
[/block]
In order to authenticate requests the -u flag lets us pass a username and password. To query the JQL API for your project, use its API secret as the username, with a blank password.

To learn more about Query Authentication, look at the [Data Export API](ref:raw-data-export-api) documentation.

If you get an error that says `Missing required parameter: script`, you probably forgot to save your code in the query.js file.
[block:api-header]
{
  "title": "Step 1: Querying Events"
}
[/block]
To get started, let's look at the simplest possible JQL query, which retrieves all of the events between two dates:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n}",
      "language": "javascript"
    }
  ]
}
[/block]
There are two requirements that all JQL queries must fulfill:

1. They must define a main() function. We compile your JavaScript and execute the main() function against your raw data to perform the analysis.

2. The main() function must call the <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/Events">Events()</a> or <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/People">People()</a> function to select a collection to analyze.

As you can see, our simple example fulfills both of these criteria and no more. It uses the events collection. When you run this minimal query, it will return a JSON list of all events sent to your project between Jan 1 and Jan 7, 2016:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"name\": \"login\",\n    \"distinct_id\": 4,\n    \"time\": 1420124166000,\n    \"properties\": {}\n  },\n  {\n    \"name\": \"purchase\",\n    \"time\": 1420120626000,\n    \"properties\": {\n      \"plan\": \"Basic\",\n      \"signup_date\": \"2014-12-03\"\n    }\n  },\n  ... // more events\n]",
      "language": "json"
    }
  ]
}
[/block]
The JQL framework revolves around two concepts: **collections** and **transformations**. A collection is a list of values which can be transformed into other collections to perform analyses and answer complex questions.

One example transformation is <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/filter">filter()</a>, which is used to filter down a collection to the values you care about.
[block:api-header]
{
  "title": "Step 2: Filtering the Dataset"
}
[/block]
We are only interested in "purchase" events, so the next step is to filter the events collection to just those events:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  }).filter(function(event) { return event.name == \"purchase\" });\n}",
      "language": "javascript"
    }
  ]
}
[/block]
When you run this query, the output is still a list of events, but it's been filtered down to just the purchase events:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"name\": \"purchase\",\n    \"time\": 1420120626000,\n    \"properties\": {\n      \"plan\": \"Basic\",\n      \"signup_date\": \"2014-12-03\"\n    }\n  },\n  {\n    \"name\": \"purchase\",\n    \"time\": 1420380728000,\n    \"properties\": {\n      \"plan\": \"Basic\",\n      \"signup_date\": \"2014-11-17\"\n    }\n  },\n  {\n    \"name\": \"purchase\",\n    \"time\": 1420603167000,\n    \"properties\": {\n      \"plan\": \"Premium\",\n      \"signup_date\": \"2014-12-29\"\n    }\n  },\n  ... // more purchase events\n]\n",
      "language": "json"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 3: Counting Purchase Events"
}
[/block]
Now we can answer a real question: how many purchases were there? To do this, we can use another transformation, <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/reduce">reduce()</a>, which is used to reduce a collection to just a single value.
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  .filter(function(event) { return event.name == \"purchase\" })\n  .reduce(function(accumulators, events) {\n    var ret = events.length;\n    // Add previously accumulated reduce function results.\n    for (var i = 0; i < accumulators.length; ++i) {\n        ret += accumulators[i];\n    }\n    return ret;\n  });\n}",
      "language": "javascript"
    }
  ]
}
[/block]
With result being equal to:
[block:code]
{
  "codes": [
    {
      "code": "[359]",
      "language": "text"
    }
  ]
}
[/block]
It's important to note that just calling <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/reduce">reduce()</a> by itself doesn't do anything -- you have to tell it what to do. Like other tranformations, <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/reduce">reduce()</a> has a required function argument - a reducer function. That function implements the following signature:
[block:code]
{
  "codes": [
    {
      "code": "function (accumulators, items) {\n    // Combine previously-aggregated \"accumulators\"\n    // with new items and return the result.\n}",
      "language": "javascript"
    }
  ]
}
[/block]
A reducer function accepts two arguments: an array of its previous results (accumulators), and an array of items to reduce. The first argument - accumulators - is used to break down the initial set of values into many calls of the reducer function. JQL runs the reduction in a hierarchical fashion, where some subsets of inputs are reduced to accumulator values first, and multiple accumulator values are combined subsequently.

Mixpanel provides a number of [built-in reducer functions](https://mixpanel.com/help/reference/jql/api-reference#builtins/count) for frequently used aggregations. To just count the number of inputs, like in the example above, we can pass `mixpanel.reducer.count()` to `.reduce()`:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n   from_date:\"2016-01-01\",\n   to_date:\"2016-01-07\",\n  })\n  .filter(function(event){return event.name == \"purchase\";})\n  .reduce(mixpanel.reducer.count());\n}",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Step 4: Grouping Purchases by Plan"
}
[/block]
So, now we know how many purchases occurred during that week in January. But what did people buy? We have two plans, and we would like to see how many we sold of each.

We can do that using another of our transformations, <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupBy">groupBy()</a>, to group these transactions by "plan" before counting them:
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  .filter(function(event) { return event.name == \"purchase\" })\n  .groupBy([\"properties.plan\"], mixpanel.reducer.count());\n}",
      "language": "javascript"
    }
  ]
}
[/block]
You will notice that we've replaced our <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/reduce">reduce()</a> transformation with <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupBy">groupBy()</a>. <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupBy">groupBy()</a> is used to split a collection into groups. After splitting into groups, the reduce function passed to <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupBy">groupBy()</a> is called on each group individually.

This query is getting complicated, so let's take a step back and reiterate what it's doing:

1. Get all the events in a 7 day period.
2. Filter down to just the purchase event.
3. Group the events by their "plan" property.
4. Count the number of events in each group.

When we execute the query, we get the following output:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"value\": 254,\n    \"key\": [\n      \"Basic\"\n    ]\n  },\n  {\n    \"value\": 105,\n    \"key\": [\n      \"Premium\"\n    ]\n  }\n]",
      "language": "json"
    }
  ]
}
[/block]
Now this is getting interesting. Our analysis shows that we sold 254 Basic plans and 105 Premium plans in that week.
[block:api-header]
{
  "title": "Step 5: Calculating Days Between Signup and Purchase"
}
[/block]
Let's take this one step further and answer a more complicated question: how long did it take users to sign up for these different plans? Does it take more or less time to convert a user to a Premium plan than a Basic plan?

This will require us to calculate a "days to purchase" value for each event, which we can achieve with the "signup_date" property and the timestamp of the purchase event.

We want to calculate the average days to purchase, but we can't go straight there. First, we have to get the components required to get an average: sum of numbers and the total count.
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  .filter(function(event) { return event.name == \"purchase\" })\n  .groupBy(\n    [\"properties.plan\"],\n    function(accumulators, items) {\n        var ret = { sum: 0.0, count: 0.0};\n        for (var i = 0; i < accumulators.length; ++i) {\n            ret.sum += accumulators[i].sum;\n            ret.count += accumulators[i].count;\n        }\n        ret.count += items.length;\n        for (var i = 0; i < items.length; ++i) {\n            ret.sum += getDaysSinceSignup(items[i]);\n        }\n        return ret;\n    }\n  );\n}\n\n// helper function to figure out how many days have\n// passed since the user signed up\nfunction getDaysSinceSignup(event) {\n  var signup_date = new Date(event.properties.signup_date),\n      purchase_date = new Date(event.time),\n      milliseconds_per_day = 60 * 60 * 24 * 1000;\n\n  // date subtraction yields milliseconds, so divide to get days\n  return (purchase_date - signup_date) / milliseconds_per_day;\n}",
      "language": "javascript"
    }
  ]
}
[/block]
When we run this query, we see:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"value\": {\n      \"count\": 254,\n      \"sum\": 14745.350497685187,\n    },\n    \"key\": [\n      \"Basic\"\n    ]\n  },\n  {\n    \"value\": {\n      \"count\": 105,\n      \"sum\": 3492.4220370370363,\n    },\n    \"key\": [\n      \"Premium\"\n    ]\n  }\n]",
      "language": "json"
    }
  ]
}
[/block]
For the final step, we will use the <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/map">map()</a> transformation to get the average from the sum and count. <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/map">map()</a> is used any time we want to do a one-to-one transformation of a collection, by applying the provided function to each element of the collection.
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-07\"\n  })\n  .filter(function(event) { return event.name == \"purchase\" })\n  .groupBy(\n    [\"properties.plan\"],\n    function(accumulators, items) {\n        var ret = { sum: 0.0, count: 0.0};\n        for (var i = 0; i < accumulators.length; ++i) {\n            ret.sum += accumulators[i].sum;\n            ret.count += accumulators[i].count;\n        }\n        ret.count += items.length;\n        for (var i = 0; i < items.length; ++i) {\n            ret.sum += getDaysSinceSignup(items[i]);\n        }\n        return ret;\n    }\n  )\n  .map(function(item) {\n    return {\n      \"plan\": item.key[0],\n      \"avg days to purchase\": item.value.sum / item.value.count\n    }\n  });\n}\n\nfunction getDaysSinceSignup(event) {\n  var signup_date = new Date(event.properties.signup_date),\n      purchase_date = new Date(event.time),\n      milliseconds_per_day = 60 * 60 * 24 * 1000;\n\n  // date subtraction yields milliseconds, so divide to get days\n  return (purchase_date - signup_date) / milliseconds_per_day;\n",
      "language": "javascript"
    }
  ]
}
[/block]
When we run this query, we will get the following output:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"plan\": \"Basic\",\n    \"avg days to purchase\": 58.05256101450859\n  },\n  {\n    \"plan\": \"Premium\",\n    \"avg days to purchase\": 33.261162257495585\n  }\n]",
      "language": "json"
    }
  ]
}
[/block]
And that's the final result: users take about twice as long to buy a Basic plan as they do to purchase a Premium plan. This is a contrived example, but in the real world your next steps might be

* Calculate a distribution and figure out the median instead of the average.
* Dig in further to figure out what else is different between those user groups.
[block:api-header]
{
  "title": "Step 6: Examining Behavior Patterns"
}
[/block]
An analytic task is often centered around people behavior - sequences of actions performed by particular users. We are often interested in what events our users do, when these events happen, and in what order.

JQL provides a <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupByUser">groupByUser()</a> transformation, which allows its argument function to look into the event history of each single user.

The result of this transformation is a collection that contains one object per user. Each object has the structure outlined below:
[block:code]
{
  "codes": [
    {
      "code": "{\n    key: [<user distinct id>]\n    value: <return value of transformation function>\n}",
      "language": "json"
    }
  ]
}
[/block]
In this tutorial step, we use <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupByUser">groupByUser()</a> to find out how often users are making purchase straight after logging in.
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-02-01\"\n  }).groupByUser(function(state, events) {\n    state = state || { last_login: false, count: 0 };\n    if (events.length > 0) {\n        if (state.last_login &&\n            events[0].name == \"purchase\") {\n            ++state.count;\n        }\n        for (var i = 0; i < events.length - 1; ++i) {\n            if (events[i].name == \"login\" &&\n                events[i + 1].name == \"purchase\") {\n                ++state.count;\n            }\n        }\n        if (events[events.length - 1].name == \"login\") {\n            state.last_login = true;\n        }\n    }\n    return state;\n  });\n}",
      "language": "javascript"
    }
  ]
}
[/block]
Note the the transformation function provided to <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupByUser">groupByUser()</a> takes two arguments - the state object and list of events. When the list of events that belong to a single user is long, JQL breaks down that list into multiple calls of the reducer function.

In that case, the state argument is used for communication between calls - it contains the return value of the last call to the reducer function.

In the example above, the output collection will consist of objects that include properties computed by the reducer function, in the value field.
[block:code]
{
  "codes": [
    {
      "code": "  {\n    \"value\": {\n      \"count\": 4,\n      \"last_login\": false\n    },\n    \"key\": [\n      \"3f151e8d-2bf4-4ecd-91e3-dbe8a8666eb0\"\n    ]\n  },\n  {\n    \"value\": {\n      \"count\": 2,\n      \"last_login\": false\n    },\n    \"key\": [\n      \"da1ab57e-8fed-4ae4-9b65-5ea648b0f686\"\n    ]\n  }\n  // More per-user records.",
      "language": "json"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Writing Your Own Query"
}
[/block]
This query walkthrough has introduced you to most of the concepts required to write your own JQL query. We covered:

* The main() function, which is required in every JQL Query.
* Selecting events using the <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/Events">Events()</a> function.
* Transforming data using the <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/map">map()</a>, <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/filter">filter()</a>, <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupBy">groupBy()</a>, and <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/reduce">reduce()</a> transformations.
* Analyzing user behavior with <a style="font-family: courier" href="https://mixpanel.com/help/reference/jql/api-reference#api/transformations/groupByUser">groupByUser()</a>.

For more information about these concepts (and a few we haven't covered yet), please read the [full API reference](doc:write-jql).
---
title: "Examples"
slug: "jql-examples"
hidden: false
metadata: 
  title: "JQL Example Queries | Mixpanel Developer Docs"
  description: "Looking for JQL examples for Mixpanel? Here we'll go through example queries to help understand what you can get from JQL, including segmentation queries."
createdAt: "2020-10-20T18:59:52.336Z"
updatedAt: "2020-10-20T18:59:52.336Z"
---
Here are some example queries to help understand what you can get from JQL. We'll include sample output, but you should try running the queries yourself.
[block:api-header]
{
  "title": "Segmentation Query"
}
[/block]
You may be familiar with Mixpanel's Segmentation report, which allows you to filter and segment your events based on their properties. This is useful for understanding how different user segments behave, and what trends look like over time.

This is one of Mixpanel's core features, and its biggest selling point is its flexibility. We can reimplement most of the segmentation backend with only a few lines of code using JQL.
[block:code]
{
  "codes": [
    {
      "code": "var params = {\n  from_date: '2018-10-18',\n  to_date: '2018-10-19',\n  event_name: 'Complete Chat', //event to analyze\n  segment_property: 'Platform', //property to group by\n  type: 'unique' //type of query -- can be 'unique' or 'total'\n};\n\nvar groupKeys = [function(event) {return (new Date(event.time)).toISOString().split('T')[0];}]; //always segment by day\n\nif (params.segment_property)\n  //add another grouping for the selected property\n  groupKeys.push(function(event) {return event.properties[params.segment_property];}); \n\nfunction main() {\n  //define the collection\n  var collection = Events({\n    from_date: params.from_date,\n    to_date: params.to_date\n  })\n  .filter(function(event) {return event.name == params.event_name});\n\n  // total segmentation is just a groupby\n  if (params.type == 'total')\n    return collection\n    .groupBy(groupKeys, mixpanel.reducer.count());\n\n  // unique segmentation has to be deduped before the groupby\n  else if (params.type == 'unique')\n    return collection\n    .groupByUser(groupKeys, mixpanel.reducer.null()) //change the collection into unique groups of keys/users\n    .groupBy([mixpanel.slice('key', 1)], mixpanel.reducer.count());\n}",
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
      "code": "// \"homepage\" segmented by day and \"referrer\"\n[\n  {\n    \"key\": [\"2015-10-01\", \"google.com\"],\n    \"value\": 3487\n  },\n  {\n    \"key\": [\"2015-10-01\", \"$direct\"],\n    \"value\": 432\n  },\n  {\n    \"key\": [\"2015-10-01\", \"reddit.com\"],\n    \"value\": 876\n  },\n  {\n    \"key\": [\"2015-10-02\", \"google.com\"],\n    \"value\": 4298\n  },\n  ... // more data\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Funnel Analysis"
}
[/block]
Here's a pretty simple implementation of Funnels, another of Mixpanel's core features. Funnels help you understand how users flow through a series of steps that you define.

In this example, we process each user individually to figure out how far they got in the funnel, then we count the number of users that ended at each step. From there, we can get the final funnel: the number of users who completed each step of the funnel.
[block:code]
{
  "codes": [
    {
      "code": "var funnel = params.funnel || [\"homepage\", \"signup\", \"purchase\"];\n\nfunction main() {\n  return Events({\n    from_date: params.from_date,\n    to_date: params.to_date\n  })\n  // get the last step seen for each user\n  .groupByUser(function(current_step, events) {\n    if (current_step === undefined) { current_step = -1 }\n    _.each(events, function(e) {\n      if (e.name == funnel[current_step + 1]) {\n        current_step++;\n      }\n    });\n    return current_step;\n  })\n  // filter out users who did not enter the funnel\n  .filter(function(item) { return item.value > -1 })\n  // count the number of users who ended at each step\n  .groupBy(\n    [function(item) { return item.value }],\n    mixpanel.reducer.count()\n  )\n  // do some math to add the step N users to the previous step(s)\n  // this is converting us from \"users who ended at each step\"\n  // into \"users who were ever present at each step\"\n  .reduce(function(accumulators, steps) {\n    var funnel_steps = Array(funnel.length);\n    for (var i = 0; i < funnel_steps.length; i++) {\n      funnel_steps[i] = 0;\n    }\n    _.each(steps, function(step) {\n      // the group key was the step the user ended on\n      var step_idx = step.key[0];\n      // increment each previous step by the number of\n      // users who ended at this step.\n      while (step_idx > -1) {\n        funnel_steps[step_idx] += step.value;\n        step_idx--;\n      }\n    });\n    // if there are a LOT of steps we might have\n    // processed some of them previously, so we have\n    // to add the previously processed counts together.\n    _.each(accumulators, function(accumulator) {\n      _.each(accumulator, function(step_count, i) {\n        funnel_steps[i] += step_count;\n      });\n    });\n\n    return funnel_steps;\n  });\n}",
      "language": "javascript"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// step counts for a 5 step funnel\n[\n  [\n    2538,\n    437,\n    354,\n    274,\n    214\n  ]\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Grouping By a Dynamic Key"
}
[/block]
The most interesting thing about `groupBy` is that it makes it very easy to group by a dynamically computed key -- instead of just doing a simple "group by these two properties", we can write a function to calculate a key.

In this example, we ask the question "what are the top 10 most common email domains of our users?". We don't have the email domain as a property, but we have the email, so we can compute it.
[block:code]
{
  "codes": [
    {
      "code": "// helper function to pluck out the domain\nfunction getEmailDomain(user) {\n  var email = user.properties[\"$email\"];\n  if (!email) { return undefined; }\n  pos = email.indexOf('@');\n  if (pos < 0) { return undefined; }\n  return email.substr(pos + 1);\n}\n\nfunction main() {\n  return People()\n  .groupBy([getEmailDomain], mixpanel.reducer.count())\n  .reduce(mixpanel.reducer.top(10));\n}",
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
      "code": "[\n  [\n    {\n      \"key\": [\"gmail.com\"],\n      \"value\": 2074\n    },\n    {\n      \"key\": [\"mixpanel.com\"],\n      \"value\": 822\n    },\n    ... // more data\n  ]\n]",
      "language": "json",
      "name": "Result"
    }
  ]
}
[/block]
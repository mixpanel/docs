---
title: "Overview"
slug: "jql-overview"
hidden: false
metadata: 
  title: "JQL Overview | Mixpanel Developer Docs"
  description: "What is JQL? Read our documentation to learn what JQL is, the difference between JQL and SQL, and how to use it for custom data analysis with Mixpanel."
createdAt: "2020-08-13T17:26:47.301Z"
updatedAt: "2020-10-22T22:41:35.562Z"
---
[block:api-header]
{
  "title": "What is JQL?"
}
[/block]
JQL (JavaScript Query Language) allows you to write JavaScript programs that analyze your raw event data.

If you want to answer a question or do a complex analysis that you can't do with our standard reports, JQL is the answer.
[block:api-header]
{
  "title": "What Can You Do With It?"
}
[/block]
JQL is built for power and flexibility, and is capable of quite complex analysis. For example, with JQL you could easily re-implement the logic for any Mixpanel report from scratch. Maybe you want slightly tweaked funnel or retention logic, or you want something entirely new - the sky's the limit!

A few more examples of things you might want to do with JQL:

  * Get the distinct_id for each user who created an account 3 weeks ago, invited at least one friend, and sent 4 messages in the first week
  * Figure out where users go next after dropping out of the signup funnel
  * Determine which users have churned in the last month, and what happened before they churned

[block:api-header]
{
  "title": "Target Audience"
}
[/block]
JQL requires you to write code. The primary users are developers and data scientists, though it is possible to save queries and build reports for others to use.
[block:api-header]
{
  "title": "JQL vs. SQL"
}
[/block]
The industry standard for data analysis is SQL, and many people are familiar with that language. We took a different approach and designed a JavaScript-based query language from the ground up. JQL takes some effort to learn, but we think benefits are worth the effort and encourage you to try it. Below are a few advantages of JQL over SQL.

  * It is much simpler to write complex data extraction and processing workflows in JQL compared to SQL. Typical analytics queries, like funnels and retention, end up being much shorter and easier to understand.
  * JQL is very flexible. Its API is functional, similar to Apache Spark, not declarative, like SQL. This paradigm allows you to express just about any set of transformations on your data you like using a handful of primitive functions. It also allows you to take advantage of the full power and flexibility of a programming language, JavaScript, directly in your queries.
  * JavaScript is the world's most popular programming language. Many people in your company may be more familiar with it than with SQL.
  * JQL is optimized to run efficiently on our cutting-edge events and people database called Arb. It is not compiled down to SQL. 
[block:api-header]
{
  "title": "How it Works"
}
[/block]
There are only two steps required for you to start doing custom data analysis with Mixpanel.

First, you have to write a query. The system is quite flexible, so there's a lot to go over. We'll get to that in the next section.

For now, here's a simple example. Let's say you want to know how many people used your app more than four times in January:

[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  // get events from january\n  return Events({\n    from_date: \"2016-01-01\",\n    to_date: \"2016-01-31\"\n  })\n  // count the number of events sent by each user\n  .groupByUser(function(count, events) {\n    count = count || 0;\n    return count + events.length;\n  })\n  // filter for users who sent more than 4 events\n  .filter(function(user) {\n    return user.value > 4;\n  })\n  // count how many users that is\n  .reduce(mixpanel.reducer.count());\n}",
      "language": "javascript"
    }
  ]
}
[/block]
Second, you need to run the query. There are [a few ways to do that](ref:jql), but at a high level, you just have to send the script to one of our API endpoints. We then take the script and execute it against your raw data, returning the output as JSON.
[block:api-header]
{
  "title": "Behind the Scenes"
}
[/block]
Behind the scenes, this API uses V8, the JavaScript engine that powers the Chrome browser. There's no SQL involved - we actually turn your raw event data into JavaScript objects and execute your code. This gives you the full power of a real programming language, making it much easier to do complex analysis.
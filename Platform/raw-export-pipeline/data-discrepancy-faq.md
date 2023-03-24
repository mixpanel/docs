---
title: "Data Discrepancy FAQ"
slug: "data-discrepancy-faq"
hidden: false
createdAt: "2021-12-02T21:57:45.821Z"
updatedAt: "2021-12-07T19:07:03.168Z"
---
Data discrepancy happens when what you see in Mixpanel is different from what you have in your object storage or data warehouse. Here we try to answer common questions regarding data discrepancies.

### What are different types of data discrepancy?
1. Some of the events you wanted to export are not showing up in the destination
2. Some of the properties are being excluded from the exported data
3. The number of events in Mixpanel doesn't match the number of events in the destination

### Why some of the events are not being exported to the destination ?
This normally happens when you have a huge number of events because of a bad implementation (e.g you are tracking eventName-uuid to Mixpanel) which causes the export process to exceed a limitation in the target destination e.g. number of tables. In these cases, we try to identify the bad patterns and exclude them from the export process. We always try to communicate this to the customers through their Customer Success Managers.

### Why some of the properties are not being exported to the destination?
This normally happens when you have a huge number of properties because of a bad implementation (e.g you are tracking events with properties like new_product_{timestamp} to Mixpanel) which causes the export process to exceed a limitation in the target destination e.g. number of columns in the table.

### Why the number of events in Mixpanel doesn't match the number of exported events to my destination?
This can happen for a couple of reasons:
- [Data Sync](doc:schematized-export-pipeline#data-sync) is not enabled or not supported for your pipeline.
- You are not counting the number of events in Mixpanel correctly
- You are not counting the number of events in your destination correctly

If none of these are true, there is a rare chance that we have a regression in our data export stack that's causing this and we urge you to contact support so we can investigate and resolve the issue as soon as possible.

### How to count the number of events in Mixpanel correctly?
The number of events shown in Mixpanel UI depends on factors like sampling and what is hidden or not in Lexicon etc. In particular, custom or merged events in Lexicon will not be exported. To get the right number of events exported from Mixpanel, you can run the following JQL query
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  return Events({\n    from_date: \"2016-01-04\",\n    to_date: \"2016-01-04\"\n  }).reduce(mixpanel.reducer.count());\n}",
      "language": "javascript"
    }
  ]
}
[/block]
You will need to adjust from and to dates to your specific daterange. 
[block:callout]
{
  "type": "info",
  "body": "from_date and to_date are in your Mixpanel project's timezone. This is important as you will get the number of events in that timezone and should adjust your data warehouse queries to reflect that as well."
}
[/block]
To get the number of events for specific event names you can use the following JQL query
[block:code]
{
  "codes": [
    {
      "code": "function main() {\n  // Get all signups and purchases by users with email addresses\n  // from Yahoo or Gmail between January 1st and January 2nd\n  return Events({\n    from_date: '2016-01-01',\n    to_date: '2016-01-02',\n    event_selectors: [\n        {event: 'signup', label: 'Signup'},\n        {event: 'purchase', selector: '\"yahoo\" in properties[\"$email\"]',\n            label: 'Purchase (Yahoo)'},\n        {event: 'purchase', selector: '\"gmail\" in properties[\"$email\"]',\n            label: 'Purchase (Gmail)'}\n    ]\n  })",
      "language": "javascript"
    }
  ]
}
[/block]
See [Write JQL](doc:jql-language-reference) to get more information about writing JQL queries.

### How to count the number of events in data warehouses correctly?
For each data warehouse, we use different partitioning methods and the right query to get the number of events in your Mixpanel project timezone can be different from what you think. Consult the following links to get the right query.
- [BigQuery](doc:mixpanel-bigquery-export-design#getting-the-number-of-events-in-each-day) 
- [Snowflake](doc:mixpanel-snowflake-export#getting-the-number-of-events-in-each-day)
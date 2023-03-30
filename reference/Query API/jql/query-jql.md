---
title: "Custom JQL Query"
slug: "query-jql"
excerpt: "The HTTP API is the lowest-level way to use JQL. At its core, the API is very simple: you write a script, and you post it to an API endpoint with some authentication parameters.\n\nFor longer scripts, you will likely want to keep the code in a file. If you had your script in a file called my_query.js, you could run it using the following cURL command:\n\n```curl curl https://mixpanel.com/api/2.0/jql \\\n  -u YOUR_API_SECRET: \\\n  --data-urlencode script@my_query.js\n```\n\n**Note**\n* Queries will timeout after 2 minutes of run-time.\n* You cannot make remote network requests (using XMLHttpRequest) from JavaScript."
hidden: false
createdAt: "2020-10-20T00:41:48.213Z"
updatedAt: "2020-10-22T16:37:24.895Z"
---

---
title: "Custom JQL Query"
slug: "query-jql"
excerpt: ""
hidden: false
createdAt: "2020-10-20T00:41:48.213Z"
updatedAt: "2023-09-26T21:06:39.162Z"
---

The HTTP API is the lowest-level way to use JQL. At its core, the API is very simple: you write a script, and you post it to an API endpoint with some authentication parameters.

For longer scripts, you will likely want to keep the code in a file. If you had your script in a file called my_query.js, you could run it using the following cURL command:

```sh
curl https://mixpanel.com/api/query/jql \
     -u YOUR_API_SECRET: \
     --data-urlencode script@my_query.js
```

Example curl with the script directly inside of the curl:
```sh
curl --request POST \
     --url https://mixpanel.com/api/query/jql \
     --header 'accept: application/json' \
     --header 'content-type: application/x-www-form-urlencoded' \
     --data 'script=function main(){
  return Events(params)
    .groupBy(
      ["name"],
      mixpanel.reducer.count()
    )
}
' \
     --data 'params={
  "scriptParam": "paramValue"
}
'
```

Note
- Queries will timeout after 2 minutes of run-time.
- You cannot make remote network requests (using XMLHttpRequest) from JavaScript.

---
title: "Query Profiles"
slug: "engage-query"
hidden: false
createdAt: "2020-10-20T00:41:48.205Z"
updatedAt: "2023-09-26T21:06:39.094Z"
---

Query user profile data and return a list of users that fit specified parameters.

API responses will return at most `page_size` records for each request. To request additional records, callers should repeat their call to the API using the same `where` param, but provide a `session_id` parameter with a value taken from the first response, and include a `page` parameter with a value one greater than the value of page in the response.

A caller trying to retrieve all of the records for a particular query might use an algorithm something like this:

```javascript
// Get the first page of data associated with our selector expression
this_page = query_api(where=YOUR_SELECTOR_EXPRESSION)
do_something_with_response(this_page)

// If we get fewer records than the page_size returned with our results,
// then there are no more records to get. Otherwise, keep querying for additional pages.
while (length of this_page.results) >= this_page.page_size:
    next_page_number = this_page.page + 1
    this_page = query_api(where=YOUR_SELECTOR_EXPRESSION, session_id=this_page.session_id, page=next_page_number)
    do_something_with_response(this_page)
```

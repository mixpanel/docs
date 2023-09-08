---
title: "Query Profiles"
slug: "engage-query"
excerpt: "Query user profile data and return list of users that fit specified parameters.\n\nAPI responses will return at most `page_size` records for each request. To request additional records, callers should repeat their call to the api using the same `where` param, but provide a `session_id` parameter with a value taken from the first response, and include a `page` parameter with a value one greater than the value of page in the response.\n\nA caller trying to retrieve all of the records for a particular query might use an algorithm something like this:\n\n```javascript\n// Get the first page of data associated with our selector expression\nthis_page = query_api(where=YOUR_SELECTOR_EXPRESSION)\ndo_something_with_response(this_page)\n\n// If we get fewer records than the page_sized returned with our results,\n// then there are no more records to get. Otherwise, keep querying for additional pages.\nwhile (length of this_page.results) >= this_page.page_size:\n    next_page_number = this_page.page + 1\n    this_page = query_api(where=YOUR_SELECTOR_EXPRESSION, session_id=this_page.session_id, page=next_page_number)\n    do_something_with_response(this_page)\n```"
hidden: false
createdAt: "2020-10-20T00:41:48.205Z"
updatedAt: "2023-09-08T15:38:21.778Z"
---

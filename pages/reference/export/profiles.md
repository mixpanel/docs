The Engage API lets you export User Profiles based on a set of criteria.



## Usage
TODO: Show both a cURL + adapt below to be a more complete example in Python.

API responses will return at most `page_size` records for each request. To request additional records, callers should repeat their call to the api using the same `where` param, but provide a `session_id` parameter with a value taken from the first response, and include a `page` parameter with a value one greater than the value of page in the response.

A caller trying to retrieve all of the records for a particular query might use an algorithm something like this:

```javascript
// Get the first page of data associated with our selector expression
this_page = query_api(where=YOUR_SELECTOR_EXPRESSION)
do_something_with_response(this_page)

// If we get fewer records than the page_sized returned with our results,
// then there are no more records to get. Otherwise, keep querying for additional pages.
while (length of this_page.results) >= this_page.page_size:
    next_page_number = this_page.page + 1
    this_page = query_api(where=YOUR_SELECTOR_EXPRESSION, session_id=this_page.session_id, page=next_page_number)
    do_something_with_response(this_page)
```

## Filtering
You can filter the set of profiles by either specifying a `$distinct_id` or by specifying the ID of a [cohort](/docs/analysis/advanced/cohort) you've defined in our UI.

curl example filtering down by properties.

curl example filtering down to a cohort.

TODO: should we bother adding the "selector expression" based filtering back to this? Technically you can do that by providing a cohort ID without having to learn our selector language... probably a net better UX.

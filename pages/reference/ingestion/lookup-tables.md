Lookup Tables are mutable tables that describe non-user entities like accounts, a media catalog, or geographies. This API supports replacing the contents of an existing Lookup Table, which can be used to keep Mixpanel in sync with a source-of-truth system.

These APIs use [Service Accounts](ref:service-accounts) for authentication.

## Replace Lookup Table
Lookup Tables must be [created via our UI](/docs/tracking/how-tos/lookup-tables). Once a Lookup Table is created, its contents can be replaced via this API.

Assuming you have a file table.csv:
```csv
id,artist,genre,is_platinum,name,num_listens,release_date,is_top_40
c994bb,Drake,Pop,True,Hotline Bling,1700000000,2015-10-18T22:00:00,true
d8d949,Gipsy Kings,Flamenco,False,Bamboleo,1170000,1987-07-12T05:00:00,false
a43fb8,Daft Punk,House,False,Aerodynamic,41000000,2001-03-12T07:30:00,false
```

You can replace the contents of a Lookup Table with this CSV as follows:
TODO: insert curl request/response here.


### Validation
* The first column of the lookup table is assumed to be the ID of the row. All ID values must be unique.
* The first row of the lookup table is a header row. The values in the header must be unique, as each one uniquely identifies a column of the table. These will appear as properties of the lookup table in Mixpanel's UI.
* The CSV must be valid according to RFC4180.
* If the `Content-Encoding: gzip` header is supplied, the table will be decompressed before parsing.

#### Types
* Integers or floats will be parsed as numbers.
* RFC3339 timestamps (`2021-08-21T05:36:01Z`) will parsed as datetimes.
* `true` or `false` (case-insensitive) will be parsed as boolean.
* Empty fields (two adjacent commas) will be treated as `undefined`
* Comma separated, quoted strings in square brackets (`"[""Free"",""Paid"",""Enterprise""]"`) will be parsed as list of strings.
* All other values will be treated as strings.

#### Errors
Lookup Tables are replaced in their entirety or not replaced at all. When the Lookup Table fails to meet the above validation, we return an error that looks as follows:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"error\": \"some data points in the request failed validation\",\n  \"failed_records\": [\n    {\n      \"index\": 2,\n      \"message\": \"invalid row: row indexes 1 and 2 have the same primary key\"\n    },\n    {\n      \"index\": 3,\n      \"message\": \"invalid row: wrong number of fields\"\n    }\n  ],\n  \"status\": 0\n}",
      "language": "json"
    }
  ]
}
[/block]
We will return at most the first 10 rows that failed validation.

### Limits
This endpoint will return a 429 error if called more than 100 times in a rolling 24 hour window. We recommend updating lookup tables at most hourly to stay within this limit.

This endpoint will return a 413 error if a Lookup Table exceeds 100MB uncompressed. In practice, this translates to 1-2M rows. If you have a lookup table that exceeds the limit, we recommend pruning the number of columns to those that are useful to analysis. Removing long URLs or user-generated content can bring a lookup table within this limit. If you still exceed the limit, please reach out to us at apis@mixpanel.com -- we'd love to hear your use case!

## List Lookup Tables
This API returns the list of Lookup Tables in your project.

TODO: Insert cURL request / response here.

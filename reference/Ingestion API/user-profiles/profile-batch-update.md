---
title: Update Multiple Profiles
excerpt: >-
  Send a batch of profile updates. Instead of sending a single JSON object as
  the data query parameter, send a JSON list of objects as the data parameter of
  an application/json POST or GET request body.


  Refer to the respective user profile update commands ($set, $set_once, $add,
  $union, $append, $remove, $unset, and $delete) on syntax for their parameters.
api:
  file: ingestion-api.json
  operationId: profile-batch-update
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
> 📘
>
> This API will return a 200 OK even if there are data validation issues. To ensure the request actually succeeded, you need to check the response body.
---
title: Set Property
excerpt: >-
  Takes a JSON object containing names and values of profile properties. If the
  profile does not exist, it creates it with these properties. If it does exist,
  it sets the properties to these values, overwriting existing values.
api:
  file: ingestion-api.json
  operationId: profile-set
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
<Callout icon="📘" theme="info">
  This API will return a `200 OK` even if there are data validation issues. To ensure the request actually succeeded, you need to check the response body.
</Callout>

<Callout icon="📘" theme="info">
  This API does not support gzip encoding.
</Callout>
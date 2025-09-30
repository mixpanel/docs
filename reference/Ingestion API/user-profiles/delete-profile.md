---
title: Delete Profile
excerpt: >
  Permanently delete the profile from Mixpanel, along with all of its
  properties. The $delete object value is ignored - the profile is determined by
  the $distinct_id from the request itself.


  If you have duplicate profiles, use property $ignore_alias set to true so that
  you don't delete the original profile when trying to delete the duplicate (as
  they pass in the alias as the distinct_id).
api:
  file: ingestion-api.json
  operationId: delete-profile
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
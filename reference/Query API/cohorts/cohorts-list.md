---
title: List Saved Cohorts
excerpt: >
  The list endpoint returns all of the cohorts in a given project. The JSON
  formatted return contains the cohort name, id, count, description, creation
  date, and visibility for every cohort in the project.


  If you're trying to get a list of users in a cohort, you can use the
  [`/engage` endpoint with the `filter_by_cohort`
  parameter](ref:engage#engage-query).

  The Query API has a rate limit of 60 queries per hour and a maximum of 5
  concurrent queries.
api:
  file: query-api.json
  operationId: cohorts-list
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The list endpoint returns all of the cohorts in a given project. The JSON formatted return contains the cohort name, id, count, description, creation date, and visibility for every cohort in the project.

If you're trying to get a list of users in a cohort, you can use the [`/engage` endpoint with the `filter_by_cohort` parameter](ref:engage#engage-query).
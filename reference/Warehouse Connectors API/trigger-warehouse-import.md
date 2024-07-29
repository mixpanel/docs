---
title: "Trigger import via API"
slug: "trigger-warehouse-import-api"
hidden: false
createdAt: "2024-07-26T19:31:43.295Z"
updatedAt: "2024-07-26T19:31:43.295Z"
---

## Trigger import via API

It is possible to trigger a Warehouse Connector import using API.

1. Create a warehouse import.
2. Set frequency to Advanced > Trigger via API
3. After the import is created, you will get a link in the import view.
4. Use that link to trigger a sync manually using API.

Example:

```text
curl -X PUT https://mixpanel.com/api/app/projects/12345/warehouse-sources/imports/67890/manual-sync \
	--user "<serviceaccount_username>:<serviceaccount_secret>"
```

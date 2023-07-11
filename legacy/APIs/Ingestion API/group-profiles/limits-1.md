---
title: "Limits"
slug: "limits-1"
hidden: false
createdAt: "2022-03-31T20:39:06.399Z"
updatedAt: "2022-03-31T20:42:30.062Z"
---
The Groups Profile API imposes limits on the total number profile updates that can be sent per request to **200** as well as limits each individual update in the request to a maximum of **1 MB**. If you are running up against these limits, we suggest breaking your request into smaller batches. Usually, these limits are only hit if you are attempting to do a bulk create/update.
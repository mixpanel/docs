---
title: "Limits"
slug: "user-profile-limits"
hidden: false
createdAt: "2022-01-14T01:16:51.270Z"
updatedAt: "2022-01-14T01:28:26.579Z"
---
The User Profile API imposes limits on the total number profile updates that can be sent per request to **2000** as well as limit each individual update in the request to a maximum of **1 MB**. If you are running up against these limits, we suggest breaking your request into smaller batches. Usually these limits are only hit if you are attempting to do a bulk create/update.
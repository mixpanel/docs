---
title: "Limits"
slug: "limits"
hidden: false
createdAt: "2021-03-22T20:05:44.327Z"
updatedAt: "2021-03-22T20:06:23.772Z"
---
The Schemas API imposes an **8mb body size** limit and the request cannot take longer than **two minutes**. If you are running up against these limits, we suggest breaking your request into smaller batches. Usually these limits are only hit if you are attempting to do a bulk create/update.
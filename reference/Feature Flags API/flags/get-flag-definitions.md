---
title: "Get Flag Definitions"
slug: "get-flag-definitions"
excerpt: "This endpoint returns the flag definitions for all enabled feature flags within a Mixpanel project."
hidden: false
createdAt: "2025-09-29T19:07:58.032Z"
updatedAt: "2025-09-29T19:14:28.849Z"
---

This endpoint returns a set of the flag definitions that are currently provisioned within a Mixpanel project and are enabled. This is used in local evaluation by Mixpanel service side SDK's such as the Python SDK. Local evaluation polls for flag definitions according to provided configuration and assignment to a variant is implemented directly by the SDK without making a network request.
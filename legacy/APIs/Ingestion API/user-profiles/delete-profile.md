---
title: "Delete Profile"
slug: "delete-profile"
excerpt: "Permanently delete the profile from Mixpanel, along with all of its properties. The $delete object value is ignored - the profile is determined by the $distinct_id from the request itself.\n\nIf you have duplicate profiles, use property $ignore_alias set to true so that you don't delete the original profile when trying to delete the duplicate (as they pass in the alias as the distinct_id)."
hidden: false
createdAt: "2020-10-20T00:41:26.255Z"
updatedAt: "2023-09-08T15:38:21.172Z"
---

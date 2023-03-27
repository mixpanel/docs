---
title: "Identity Management"
slug: "identity-management"
hidden: true
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---
##Overview
Identity Merge is enabled by default for all accounts created after April 2020. You can check if your organization is using Identity Merge (or enable Identity Merge) [here](https://help.mixpanel.com/hc/en-us/articles/360039133851-Moving-to-Identity-Merge).

##Identity events

###$merge
Merge Criteria:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c49e56f-ID_Management_Merge_2.png",
        "ID_Management_Merge_2.png",
        1575,
        938,
        "#f1eee9"
      ]
    }
  ]
}
[/block]
Required [Event Object](https://developer.mixpanel.com/docs/data-structure-deep-dive#anatomy-of-an-event) attributes
[block:parameters]
{
  "data": {
    "h-0": "Event Object property",
    "h-1": "Type",
    "h-2": "Required?",
    "h-3": "Description",
    "0-0": "event",
    "1-0": "properties",
    "2-0": "properties.distinct_id",
    "3-0": "properties.$distinct_ids",
    "0-1": "String",
    "1-1": "Object",
    "2-1": "String",
    "3-1": "List of String",
    "0-2": "Yes",
    "1-2": "Yes",
    "2-2": "Yes",
    "3-2": "Yes",
    "0-3": "value must be: `$merge`",
    "2-3": "A distinct ID that is part of the merge. This can be either of the values in $distinct_ids.",
    "3-3": "A list of two distinct IDs to be merged together."
  },
  "cols": 4,
  "rows": 4
}
[/block]
###$identify
Identify Criteria:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1c1d485-ID_Management_Identify_4.png",
        "ID_Management_Identify_4.png",
        2175,
        2025,
        "#f0ecee"
      ]
    }
  ]
}
[/block]
Required [Event Object](https://developer.mixpanel.com/docs/data-structure-deep-dive#anatomy-of-an-event) attributes
[block:parameters]
{
  "data": {
    "h-0": "Event Object property",
    "h-1": "Type",
    "h-2": "Required?",
    "h-3": "Description",
    "0-0": "event",
    "0-1": "String",
    "0-3": "value must be: `$identify`",
    "0-2": "Yes",
    "1-0": "properties",
    "1-1": "Object",
    "1-2": "Yes",
    "3-0": "properties.$identified_id",
    "3-3": "A distinct_id to merge with the $anon_id.",
    "3-1": "String",
    "3-2": "Yes",
    "4-0": "properties.$anon_id",
    "4-1": "String",
    "4-2": "Yes",
    "4-3": "A distinct_id to merge with the $identified_id. The $anon_id must be [UUID v4](https://en.wikipedia.org/wiki/Universally_unique_identifier) format and not already merged to an $identified_id.",
    "5-0": "properties.token",
    "5-3": "The project token",
    "5-1": "String",
    "5-2": "If using /track",
    "2-0": "properties.distinct_id",
    "2-1": "String",
    "2-2": "No",
    "2-3": "The distinct ID post-identification (same as $identified_id - it will be inferred from $identified_id if not included)"
  },
  "cols": 4,
  "rows": 6
}
[/block]
###$create_alias
Mixpanel supports adding an alias to a distinct id. An alias is a new value that will be interpreted by Mixpanel as an existing value. That means that you can send messages to Mixpanel using the new value, and Mixpanel will continue to use the old value for calculating funnels and retention reports, or applying updates to user profiles.
Alias Criteria:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f1ee667-ID_Management_CreateAlias_4.png",
        "ID_Management_CreateAlias_4.png",
        1967,
        1358,
        "#f1eeed"
      ]
    }
  ]
}
[/block]
Required [Event Object](https://developer.mixpanel.com/docs/data-structure-deep-dive#anatomy-of-an-event) attributes
[block:parameters]
{
  "data": {
    "h-0": "Event Object property",
    "h-1": "Type",
    "h-2": "Required?",
    "h-3": "Description",
    "0-0": "event",
    "0-3": "value must be: `$create_alias`",
    "1-0": "properties",
    "4-0": "properties.token",
    "4-2": "If using /track",
    "4-3": "The project token",
    "4-1": "String",
    "0-1": "String",
    "1-1": "Object",
    "0-2": "Yes",
    "1-2": "Yes",
    "2-0": "properties.distinct_id",
    "2-1": "String",
    "2-2": "Yes",
    "3-2": "Yes",
    "3-1": "String",
    "3-3": "A new distinct_id to be merged with the original distinct_id. Each alias can only map to one distinct_id.",
    "3-0": "properties.alias",
    "2-3": "A distinct ID that is part of the merge. This can be either of the values in $distinct_ids."
  },
  "cols": 4,
  "rows": 5
}
[/block]
##Which event to use

###When should I track $merge?
> 📘
> If you don't maintain a UUID on a device, utilize $merge to link user activity.

$merge has the fewest [guardrails](https://developer.mixpanel.com/docs/identity-management#how-do-i-check-my-implementation), thus it requires the use of the [import API](https://developer.mixpanel.com/reference/events#import-events) instead of the track API. It should typically be used when identities are merged from a secure server side location, [when using the import API is appropriate](https://developer.mixpanel.com/reference/events#when-to-use-track-vs-import).

###When should I track $identify?
$identify should be used in situations when anonymous activity needs to be associated with an internal ID. Typically, this will occur immediately after an event in which the user becomes known (for example, login).

If you're generating the anonymous distinct ID yourself (as is common in server-side implementations), you will need the anonymous distinct IDs to be in the [UUID v4](https://en.wikipedia.org/wiki/Universally_unique_identifier) format to align with our internal paradigm for anonymous users.

###When should I track $create_alias?
$create_alias lifts the restriction on the UUID v4 format of anonymous distinct IDs, so it may be useful in cases where the import API is not appropriate, but Identify is too restrictive.

##Identity merge details

###What happens when two distinct IDs are merged?
When two distinct IDs are merged using any of the above events, one of them will be selected as the Canonical ID. Activity for both distinct IDs will show up under the Canonical distinct ID once Mixpanel finishes processing the merge. While the merged events will show up immediately in users [Activity Feeds](https://help.mixpanel.com/hc/en-us/articles/115004501966-User-Profiles#activity-feed), it can take up to 24 hours for the events to be copied to the canonical user and correctly attributed in reports like Insights, Funnels, and Retention. The Canonical ID is decided by Mixpanel, and it can't be dictated.

If both distinct IDs have profile data, the Canonical ID's profile will be chosen, and the other profile will be hidden. If only one distinct ID has profile data, Mixpanel will maintain that profile data under the merged Canonical ID.

Note: Once two distinct IDs have been merged, the operation cannot be undone.

###How do I check my implementation?
Identity Merge events are hidden by default, but it will show up in Events and user Activity Feeds  (based on the distinct_id field in the payload). Identity Merge events that were unsuccessful will have a $failure_reason and $failure_description property outlining what caused the event to fail when merging the two distinct_ids. Failed identity merges will result in anonymous activity not being updated.
[block:parameters]
{
  "data": {
    "h-0": "$failure_reason",
    "h-1": "$failure_description",
    "h-2": "applicable to",
    "h-3": "Whats wrong?",
    "h-4": "Why these exist",
    "0-0": "errSameIDs",
    "1-0": "errAnonDistinctIdNonGUIDForm",
    "2-0": "errAnonDistinctIdAssignedAlready",
    "3-0": "errManyIDs",
    "4-0": "errAliasAlreadyExists",
    "4-1": "alias already exists with the id",
    "3-1": "too many distinctIDs mapped together, Cluster size: <value> Max limit: 500",
    "2-1": "$anon_distinct_id already identified: <value>",
    "1-1": "$anon_distinct_id didn't match expected GUID pattern: <value>",
    "0-1": "Identified and anon ID are same in the identify request <value>",
    "0-2": "$identify",
    "1-2": "$identify",
    "2-2": "$identify",
    "3-2": "$create_alias, $identify, $merge",
    "4-2": "$create_alias",
    "4-3": "The alias value has already been used as the alias for another distinct_id.",
    "3-3": "Merging the two distinct_ids would create an identity cluster of more than 500 distinct_ids.",
    "2-3": "The $anon_id was already merged to another authenticated user using $identify.",
    "1-3": "The $anon_id value is not UUID v4 format.",
    "0-3": "The two distinct_id to be merged are the same value.",
    "0-4": "N/A",
    "1-4": "A guardrail to ensure multiple users sharing a device are not accidentally merged together. Applicable in cases where the default anonymous distinct id is device specific.  \n\nIf you're creating your own anonymous ids, they must be UUIDV4. $create_alias or $merge can be used to override this guardrail.",
    "2-4": "A guardrail to ensure multiple users sharing a device are not accidentally merged together. $create_alias or $merge can be used to override this guardrail.",
    "3-4": "A guardrail to protect all users being accidentally merged together. If reset is called often, this limit could be hit. \n\nReevaluate how often reset or $create_alias is called if you run into this error frequently.",
    "4-4": "To ensure backwards compatibility, aliases can only link to one distinct_id."
  },
  "cols": 5,
  "rows": 5
}
[/block]
##If Identity Merge is disabled

We recommend enabling Identity Merge to simplify implementation and link pre-authentication activity. More information on the benefits of Identity Merge and how to enable it can be found [here](https://help.mixpanel.com/hc/en-us/articles/360039133851-Moving-to-Identity-Merge).

###When should I track $merge?
The $merge event is not applicable to projects with Identity Merge disabled.

###When should I track $identify?
The $identify event is not applicable to projects with Identity Merge disabled.

###When should I track $create_alias?
When Identity Merge is disabled, Alias will cause all future events tracked to the alias to be remapped to the aliased distinct ID. Historical events will not be impacted if Identity Merge is disabled.

Alias should be used in situations where it's important for future events under an internal ID to be connected to pre-authentication activity. While an Alias can only point to one identifier, they can be chained. This is helpful in scenarios where you need multiple identifiers to resolve to the same user, for example, both user_id and email.
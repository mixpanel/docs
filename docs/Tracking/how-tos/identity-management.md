---
title: "Identity Management"
slug: "identity-management"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---
This guide covers how to track events performed by users that are anonymous vs identified, and how to tie these events together once a user logs in. This system is called ID Merge.

Note: Mixpanel is compatible with Segment. If you use Segment, follow their [their best practices for identifying users](https://segment.com/docs/connections/spec/best-practices-identify/), set up the [Mixpanel (Actions) destination](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/), and you're all set!

# What Problem Does ID Merge Solve?
Mixpanel relies on events being accurately tied to the user who performed them. If the user is logged in, this is simple; just set the `$user_id` property to the User's ID on all the events you send for that user.  If you're using our Web/Mobile SDKs, this happens automatically for all events sent after you call the `.identify()` method.

Sometimes, it's useful to track events about a user before you know their identity, ie: when they are anonymous. This is common if you're tracking events from parts of your product that do not require a login, like your website, blog, or documentation. In this case, the user does not have an ID, so you need to generate one for them, which we call the `$device_id`. This happens automatically in our Web/Mobile SDKs if you don't call `.identify()`. See our [guidance here](doc:effective-server-side-tracking) for how to do this from your servers.

When these anonymous users log in, Mixpanel needs to know that the `$device_id` and the `$user_id` belong to the same user. Under the hood, Mixpanel will join the event streams of both users, which enables you to answer questions like:
* What % of users make it through the Signup funnel?
* What is the conversion rate of reading a particular blog post -> signing up?

# Simplified vs Original ID Merge
https://help.mixpanel.com/hc/en-us/articles/14383975110292-Original-vs-Simplified-ID-Merge-FAQ 

# Simplified ID Merge

## How to use

If using our Web/Mobile SDKs:
* Call `.identify(<user_id>)` when a user logs in.
* Call `.reset()` when a user logs out

If using our Server SDKs or HTTP API:
* Set `$device_id` and don't set `$user_id` for events that are anonymous.
* Once the user logs in, start setting `$user_id` on their events.
* The moment Mixpanel receives an event with both `$device_id` and `$user_id` set, it will link the two IDs.
* See our [Server-Side Guide](doc:effective-server-side-tracking#tracking-anonymous-users) for more details and a code example.

If using a CDP:
* Segment: Follow their [their best practices for identifying users](https://segment.com/docs/connections/spec/best-practices-identify/) and use the [Mixpanel (Actions) destination].
* Rudderstack: Compatibility with Simplified ID Merge coming soon.
* mParticle: Compatibility with Simplified ID Merge coming soon.


## How it works



# Original ID Merge


## How to use

If using our Web/Mobile SDKs:
* Call `.identify(<user_id>)` when a user logs in.
* Call `.reset()` when a user logs out.
  * Note: In Original ID Merge, each user can have at most 500 IDs. If a user logs out and logs in more than 500 times, subsequent $device_ids will not be merged.


If using our Server SDKs or HTTP API:
* Set `$device_id` and don't set `$user_id` for events that are anonymous.
* Once the user logs in, start setting `$user_id` on their events.
* Send an event with name `$identify` and the property `$anon_id` set to the `$device_id` and `$identified_id` set to the `$user_id`.
** Note: In Original ID Merge, the anonymous ID must be in the UUIDv4 format.

## How it works
https://help.mixpanel.com/hc/en-us/articles/360041039771

## Restrictions


# FAQ


## How does this relate to User Profiles?
[User Profiles](doc:user-profiles) are set directly on $distinct_ids, not on $user_ids or $device_ids. We recommend waiting until after a user is identified before setting user profile properties.

It is possible to set user profile properties for un-identified users by sending the profile updates to `$distinct_id=$device:<device-id>`. However, user profile properties are not preserved when `$device_ids` are linked to `$user_ids`, so any properties set before the IDs became linked will need to be set again using $distinct_id=<user-id> once the user is identified.

## What should I do if not using Mixpanel's Web/Mobile SDKs but still want to tie anonymous users to logged in users?
If using the Simplified ID Merge API:
* Set `$device_id` and don't set `$user_id` for events that are anonymous.
* Once the user logs in, start setting `$user_id` on their events.
* The moment Mixpanel receives an event with both `$device_id` and `$user_id` set, it will link the two IDs.
* See our [Server-Side Guide](doc:effective-server-side-tracking#tracking-anonymous-users) for more details and a code example.

 



Identity Merge is enabled by default for all accounts created after April 2020. You can check if your organization is using Identity Merge (or enable Identity Merge) [here](https://help.mixpanel.com/hc/en-us/articles/360039133851-Moving-to-Identity-Merge).
TODO:
* Overview: What problem does ID Management solve?
* Different APIs, which one am I on or how do I pick one?
* Simplified ID Merge API
    * How to use
    * How it works
    * FAQ
* Identity Merge
** How to use
** How it works
** FAQ
* Pre Identity-Merge
Keep this short

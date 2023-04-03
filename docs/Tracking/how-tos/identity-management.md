---
title: "ID Merge"
slug: "identity-management"
hidden: false
createdAt: "2021-10-01T20:21:17.479Z"
updatedAt: "2021-10-02T18:41:55.184Z"
---
This guide covers how to track events performed by users that are anonymous vs identified, and how to tie these events together once a user logs in. This system is called ID Merge.

Note: Mixpanel is compatible with Segment. If you use Segment, follow their [their best practices for identifying users](https://segment.com/docs/connections/spec/best-practices-identify/), set up the [Mixpanel (Actions) destination](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/), and you're all set!

# What Problem Does ID Merge Solve?
Mixpanel relies on events being accurately tied to the user who performed them. If the user is logged in, this is simple; just set the `$distinct_id` property to the User's ID on all the events you send for that user.  If you're using our Web/Mobile SDKs, this happens automatically for all events sent after you call the `.identify()` method.

Sometimes, it's useful to track events about a user before you know their identity, ie: when they are anonymous. This is common if you're tracking events from parts of your product that do not require a login, like your website, blog, or documentation. In this case, the user does not have an ID, so you need to generate one for them, which we call the `$device_id`. This happens automatically in our Web/Mobile SDKs if you don't call `.identify()`. See our [guidance here](doc:effective-server-side-tracking) for how to do this from your servers.

When anonymous users log in, Mixpanel needs to know that the two IDs are the same. This enables Mixpanel to join the event streams of both users, which enables you to answer questions like:
* What % of users make it through the Signup funnel?
* What is the conversion rate of reading a particular blog post -> signing up?

# How To Use ID Merge

If using our Web/Mobile SDKs, there are just 2 steps:
1. Call `.identify(<user_id>)` when a user signs up or logs in.
2. Call `.reset()` when a user logs out.

If using Segment, follow their [their best practices for identifying users](https://segment.com/docs/connections/spec/best-practices-identify/) and use the [Mixpanel (Actions) destination].

If using our Server SDKs, HTTP API, or Reverse ETL: it depends on whether you're on Original ID Merge or Simplified ID Merge. See below for more details.

# Example User Flows




# Simplified vs Original ID Merge
https://help.mixpanel.com/hc/en-us/articles/14383975110292-Original-vs-Simplified-ID-Merge-FAQ 

* What are the differences?
* Which one should I use? TL;DR: If you have been using original, use it. Otherwise, use Simplified.

## How does Simplified ID Merge work?

* Set `$device_id` and don't set `$user_id` for events that are anonymous.
* Once the user logs in, start setting `$user_id` on their events.
* The moment Mixpanel receives an event with both `$device_id` and `$user_id` set, it will link the two IDs.
* See our [Server-Side Guide](doc:effective-server-side-tracking#tracking-anonymous-users) for more details and a code example.


## How does Original ID Merge work?
https://help.mixpanel.com/hc/en-us/articles/360041039771


## How it works



# FAQ

## What does Mixpanel recommend using as the `$user_id`?
We recommend using an ID that is unique to each user and does not change, for example a database ID. While using an identifier like email may be more convenient, keep in mind that you cannot merge 2 `$user_id`s or change a `$user_id`, so if the user changes their email, they will count as a separate user.

## How does this relate to User Profiles?
[User Profiles](doc:user-profiles) are set directly on $distinct_ids, not on $user_ids or $device_ids. We recommend waiting until after a user is identified before setting user profile properties.

It is possible to set user profile properties for un-identified users by sending the profile updates to `$distinct_id=$device:<device-id>`. However, user profile properties are not preserved when `$device_ids` are linked to `$user_ids`, so any properties set before the IDs became linked will need to be set again using `$distinct_id=<user-id>` once the user is identified.

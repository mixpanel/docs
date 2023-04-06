---
title: "Identifying Users"
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

If using Segment, follow their [their best practices for identifying users](https://segment.com/docs/connections/spec/best-practices-identify/) and use the [Mixpanel (Actions) destination](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/).

If using our Server SDKs, HTTP API, or Reverse ETL: it depends on whether you're on Original ID Merge or Simplified ID Merge. See below for more details.

# Example User Flows

Let's walk through a few user flows where ID Merge is useful and show what Mixpanel does under the hood. Note: the specific value of `distinct_id` will be different based on which [version](doc:identity-management#simplified-vs-original-id-merge) of ID Merge you use, but logically both versions work the same way.

## New User Signup

1. A user lands in your product on a new device and interacts with your product before signing up. Our SDK will assign the user a random `$device_id` and persist it. All events tracked at this point will send only a `$device_id`.
    
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | --- | --- | --- | --- | --- |
    | 1 | D1 |  | $device:D1 |  |
    | 2 | D1 |  | $device:D1 |  |
2. The user returns later and signs up for your product. You call `.identify(<user_id>)`. All events sent after this point are tracked with both the original `$device_id` and the new `$user_id`. Mixpanel will retroactively set the `$user_id` on any prior events with the user’s `$device_id` so that both event streams are joined.
    
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | --- | --- | --- | --- | --- |
    | 1 | D1 | U1 | U1 | |
    | 2 | D1 | U1 | U1 | |
    | 3 | D1 | U1 | U1 | Links D1 ⇒ U1 |

## Returning User

1. The user from the previous flow returns, but is on a new device and has not logged in yet.
    
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | --- | --- | --- | --- | --- |
    | 1 | D1 | U1 | U1 |  |
    | 2 | D1 | U1 | U1 |  |
    | 3 | D1 | U1 | U1 |  |
    | 4 | D2 |  | $device:D2 | New device D2. |
    | 5 | D2 |  | $device:D2 |  |
2. The user logs in allowing us to tell that the user on this device is the same `$user_id` we have seen before.
    
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | --- | --- | --- | --- | --- |
    | 1 | D1 | U1 | U1 |  |
    | 2 | D1 | U1 | U1 |  |
    | 3 | D1 | U1 | U1 |  |
    | 4 | D2 | U1 | U1 |  |
    | 5 | D2 | U1 | U1 |  |
    | 5 | D2 | U1 | U1 | Links D2 ⇒ U1. |

## Multiple Users, One Device

1. A first user begins using a new device.
    
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | --- | --- | --- | --- | --- |
    | 1 | D1 |  | $device:D1 |  |
2. The user logs in, linking the `$device_id` to their `$user_id`.
    
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | --- | --- | --- | --- | --- |
    | 1 | D1 | U1 | U1 | Retroactively updated. |
    | 2 | D1 | U1 | U1 | Links D1 ⇒ U1. |
3. The user logs out. At this point, you should call the “reset” function on the Mixpanel SDK, or manually generate a new `$device_id` if you are managing it yourself. A new user shows up and tracks events using this new `$device_id`.
    
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | --- | --- | --- | --- | --- |
    | 1 | D1 | U1 | U1 |  |
    | 2 | D1 | U1 | U1 |  |
    | 3 | D2 |  | $device:D2 | Reset generated new ID: D2. |
    | 4 | D2 |  | $device:D2 |  |
4. This new user now logs in.
    
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | --- | --- | --- | --- | --- |
    | 1 | D1 | U1 | U1 |  |
    | 2 | D1 | U1 | U1 |  |
    | 3 | D2 | U2 | U2 | Retroactively updated. |
    | 4 | D2 | U2 | U2 | Retroactively updated. |
    | 5 | D2 | U2 | U2 | Links D2 ⇒ U2. |



# Simplified vs Original ID Merge

In March 2023, Mixpanel released Simplified ID Merge as a simpler, opt-in alternative to Original ID Merge. 

The simplified API is an easier to implement interface with the same core functionality as the original API; however, because the simplified API is newer there are a few third-party partner integrations that need to be updated to work with it (see below). Once third-party support for the simplified API is on par with the original API it will become the default for new organizations.

Due to the limited changes in functionality beyond a simpler implementation experience we do not recommend that customers who have already implemented using the original API reimplement on the simplified API. Both APIs will remain supported and provide the same features.

## Which API should I use?

1. If you are an existing customer who has historically used the original API and is familiar with it we recommend continuing to use the original API.
2. If you are a new customer and want to use the API that currently has the best third-party integration support we recommending using the original API.
3. If you are a new customer, want an easier integration experience, and are okay with the third-party integration support limitations listed later in this document we recommend using the simplified API.

## How do I enable the Simplified API on a project?

Note that:

- You cannot use both the original API and the simplified API within the same Mixpanel project: enabling the simplified API on a project disables the original API on that project.
- You cannot switch between the original and simplified APIs once a project contains data. You must choose to enable the simplified API before sending the first event to a new project.

To enable the simplified API on a new project with no data in it go to the “Identity Merge” section of the Project Settings Page:

![Untitled](https://github.com/mixpanel/docs/blob/main/media/Tracking/id-merge-project-settings.png?raw=true)

If you would like to make sure any new projects created within your organization default to the correct ID Merge API there is an organization-level option to configure which API you would like as the the default for any new projects.

![Untitled](https://github.com/mixpanel/docs/blob/main/media/Tracking/id-merge-org-settings.png?raw=true)

## Third-Party Integration Support

Most third-party integration integrations send people & event data to Mixpanel using distinct IDs provided by our SDKs and are unaffected by this API change. These integrations are not involved in identity management, they send data to the ID they are given and will continue to work the same way on the simplified API that they do on the original API.

## Customer Data Platforms (CDPs)

Customer data platforms partners have their own identity management solutions. These partners merge user identities and forward the results to Mixpanel using our ID Merge APIs. If you are using one of our CDP partners that has not been updated to support the simplified ID Merge API you will need to use the original API:

| CDP Partner | Supports Original API | Supports Simplified API |
| --- | --- | --- |
| [Segment](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/) | Yes | Yes |
| [Rudderstack](https://www.rudderstack.com/docs/destinations/streaming-destinations/mixpanel/) | Yes | No |
| [mParticle](https://docs.mparticle.com/integrations/mixpanel/event/) | Yes | No |

## Key Changes from the Original API

- **`$user_id`/`$device_id` are linked without separate [$identify](https://developer.mixpanel.com/reference/create-identity), [$merge](https://developer.mixpanel.com/reference/identity-merge), or [$create_alias](https://developer.mixpanel.com/reference/identity-create-alias) events.** For projects on the original API once a user is identified you must send one of these three special event types to link the two identities. In the simplified API the `$identify`, `$merge`, and `$create_alias` events no longer have any special meaning and will be ignored. Instead, in projects on the simplified API, identities are linked using the `$user_id` and `$device_id` properties on regular events as described in the simplified API documentation.
- **`$distinct_id` is predictable and matches `$user_id` for identified users.** In the original API IDs are grouped into identity clusters and any ID within the cluster might become the “canonical” distinct ID, which can be any ID in the cluster. In the simplified API `$user_id` and `$distinct_id` will always match once the user is identified.
- **There is no limit on the number of `$device_id`s that can be merged into a single `$user_id`.** In the original API a maximum of 500 IDs can be merged into a single cluster. In the simplified API there is no similar restriction, although you can only merge `$device_id`s into `$user_id`s. It is not possible to merge `$user_id`s with each other.

# FAQ

## What does Mixpanel recommend using as the `$user_id`?
We recommend using an ID that is unique to each user and does not change, for example a database ID. While using an identifier like email may be more convenient, keep in mind that you cannot merge 2 `$user_id`s or change a `$user_id`, so if the user changes their email, they will count as a separate user.

## How does this relate to User Profiles?
[User Profiles](doc:user-profiles) are set directly on $distinct_ids, not on $user_ids or $device_ids. We recommend waiting until after a user is identified before setting user profile properties.

It is possible to set user profile properties for un-identified users by sending the profile updates to `$distinct_id=$device:<device-id>`. However, user profile properties are not preserved when `$device_ids` are linked to `$user_ids`, so any properties set before the IDs became linked will need to be set again using `$distinct_id=<user-id>` once the user is identified.

## Is it possible to merge two `$user_ids`?
We don't recommend doing this in general, as it adds complexity to your identity resolution strategy. Instead we recommend having a single, unchanging `$user_id` for each user and pointing all other IDs for that user to that single `$user_id`.

If you are on Original ID Merge, we do have a [$merge](https://developer.mixpanel.com/reference/identity-merge) API call that can merge two `$user_id`s.

## What is the status of Mixpanel's legacy `alias` method?
Prior to March 2020, the only way to connect users together was the `.alias()` method. This was very limited and was not retroactive; this meant that if a user used two devices and then logged in, you would lose activity for the user from one of the devices.

If you set up Mixpanel prior to 2020, you may have implemented with the `alias()` method. Alias is still supported in its original state and we have preserved its documentation [here](https://github.com/mixpanel/docs/blob/main/legacy/aliases.md), but if you want to revisit your identity management strategy, we recommend setting up a new Mixpanel project and using the best practices outlined in this guide.

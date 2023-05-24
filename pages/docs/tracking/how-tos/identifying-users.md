Mixpanel supports stitiching user behavior pre-login (eg: traffic from your website, docs, blog) and post-login (once the user has signed up). This helps answer questions like:
* What % of site visitors end up signing up?
* How much of my Purchase revenue can I attribute to a particular campaign?
* What is the conversion rate of reading a particular blog post -> signing up?

This system is called ID Merge. In this guide, we walk through how to use ID Merge and exactly how it works under the hood.

## Usage
If using our Web/Mobile SDKs or a CDP like Segment or Rudderstack, there are only 2 steps:
1. Call `.identify(<user_id>)` when a user signs up or logs in. Pass in the user's known identifier (eg: their ID from your database).
2. Call `.reset()` when a user logs out.

Any events prior to calling `.identify` are considered anonymous events. Mixpanel's SDKs will generate a `$device_id` to associate these events to the same anonymous user. By calling `.identify(<user_id>)` when a user signs up or logs in, you're telling Mixpanel that `$device_id` belongs to a known user with ID `user_id`. Under the hood, Mixpanel will stitch the event streams of those users together. This works even if a user has multiple anonymous sessions (eg: on desktop and mobile). As long as you always call `.identify` when the user logs in, all of that activity will be stitched together.

## Example User Flows

Let's walk through a few user flows where ID Merge is useful. Under the hood, Mixpanel uses the provided values of `$device_id` and `$user_id` to generate a `distinct_id`. Note: the specific value of `distinct_id` will be different based on which [version](/docs/tracking/how-tos/identifying-users#simplified-vs-original-id-merge) of ID Merge you use, but logically both versions work the same way.

### New User Signup

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

### Returning User

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

### Multiple Users, One Device

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



## Simplified vs Original ID Merge

In March 2023, Mixpanel released Simplified ID Merge as a simpler, opt-in alternative to Original ID Merge.

The simplified API is an easier to implement interface with the same core functionality as the original API; however, because the simplified API is newer there are a few third-party partner integrations that need to be updated to work with it (see below). Once third-party support for the simplified API is on par with the original API it will become the default for new organizations.

Due to the limited changes in functionality beyond a simpler implementation experience we do not recommend that customers who have already implemented using the original API reimplement on the simplified API. Both APIs will remain supported and provide the same features.

### Which API should I use?

1. If you are an existing customer who has historically used the original API and is familiar with it we recommend continuing to use the original API.
2. If you are a new customer and want to use the API that currently has the best third-party integration support we recommending using the original API.
3. If you are a new customer, want an easier integration experience, and are okay with the third-party integration support limitations listed later in this document we recommend using the simplified API.

### How do I enable the Simplified API on a project?

Note that:

- You cannot use both the original API and the simplified API within the same Mixpanel project: enabling the simplified API on a project disables the original API on that project.
- You cannot switch between the original and simplified APIs once a project contains data. You must choose to enable the simplified API before sending the first event to a new project.

To enable the simplified API on a new project with no data in it go to the “Identity Merge” section of the Project Settings Page:

![Untitled](https://github.com/mixpanel/docs/blob/main/public/Tracking/id-merge-project-settings.png?raw=true)

If you would like to make sure any new projects created within your organization default to the correct ID Merge API there is an organization-level option to configure which API you would like as the the default for any new projects.

![Untitled](https://github.com/mixpanel/docs/blob/main/public/Tracking/id-merge-org-settings.png?raw=true)

### Third-Party Integration Support

Most third-party integration integrations send people & event data to Mixpanel using distinct IDs provided by our SDKs and are unaffected by this API change. These integrations are not involved in identity management, they send data to the ID they are given and will continue to work the same way on the simplified API that they do on the original API.

### Customer Data Platforms (CDPs)

Customer data platforms partners have their own identity management solutions. These partners merge user identities and forward the results to Mixpanel using our ID Merge APIs. If you are using one of our CDP partners that has not been updated to support the simplified ID Merge API you will need to use the original API:

| CDP Partner | Supports Original API | Supports Simplified API |
| --- | --- | --- |
| [Segment](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/) | Yes | Yes |
| [Rudderstack](https://www.rudderstack.com/docs/destinations/streaming-destinations/mixpanel/) | Yes | Yes |
| [mParticle](https://docs.mparticle.com/integrations/mixpanel/event/) | Yes | No |

### Key Changes from the Original API

- **`$user_id`/`$device_id` are linked without separate `$identify`, `$merge`, or `$create_alias` events.** For projects on the original API once a user is identified you must send one of these three special event types to link the two identities. In the simplified API the `$identify`, `$merge`, and `$create_alias` events no longer have any special meaning and will be ignored. Instead, in projects on the simplified API, identities are linked using the `$user_id` and `$device_id` properties on regular events as described in the simplified API documentation.
- **`$distinct_id` is predictable and matches `$user_id` for identified users.** In the original API IDs are grouped into identity clusters and any ID within the cluster might become the “canonical” distinct ID, which can be any ID in the cluster. In the simplified API, the `$distinct_id` will always be the `$user_id` that you provide, once the user is identified.
- **There is no limit on the number of `$device_id`s that can be merged into a single `$user_id`.** In the original API a maximum of 500 IDs can be merged into a single cluster. In the simplified API there is no similar restriction, although you can only merge `$device_id`s into `$user_id`s. It is not possible to merge `$user_id`s with each other.

## FAQ

### What does Mixpanel recommend using as the `$user_id`?
We recommend using an ID that is unique to each user and does not change, for example a database ID. While using an identifier like email may be more convenient, keep in mind that you cannot merge 2 `$user_id`s or change a `$user_id`, so if the user changes their email, they will count as a separate user.

### How long does it take for the `$device_id` -> `$user_id` mapping to take effect?
For debugging purposes, the Activity Feed view of a single user is updated in real-time (<1 minute delay). You can get to the Activity Feed by navigating to [Users](https://mixpanel.com/report/users) and selecting a given user.

It may take up to 24 hours for this mapping to propogate to all other parts of the system.

### How does this relate to User Profiles?
[User Profiles](/docs/tracking/how-tos/user-profiles) are set directly on `$distinct_ids`, not on `$user_ids` or `$device_ids`. We recommend waiting until after a user is identified before setting user profile properties.

It is possible to set user profile properties for un-identified users by sending the profile updates to `$distinct_id=$device:<device-id>`. However, user profile properties are not preserved when `$device_ids` are linked to `$user_ids`, so any properties set before the IDs became linked will need to be set again using `$distinct_id=<user-id>` once the user is identified.

### Is it possible to merge two `$user_ids`?
We don't recommend doing this in general, as it adds complexity to your identity resolution strategy. Instead we recommend having a single, unchanging `$user_id` for each user and pointing all other IDs for that user to that single `$user_id`.

If you are on Original ID Merge, we do have a [`$merge`](https://developer.mixpanel.com/reference/identity-merge) API call that can merge two `$user_id`s.

### How to link identified IDs from 3rd-party systems?
We recommend linking 3rd-party systems’ identified IDs by sending their value in `$device_id`:<3rd-party’s identified ID> and mapped to your main `$user_id`:<your User’s ID> in an event. Those 3rd-party systems can then send events independently using just `$device_id`:<3rd-party’s identified ID>.

When exporting cohorts to 3rd-party systems (not directly integrated with Mixpanel), Mixpanel exports `distinct_id` as either the `$user_id` (for identified users) or `$device_id` (for anonymous users). It is best to designate a special user property and populate it with the 3rd-party’s identifier. This special user property can then be selected as part of the cohort export.

### What is the status of Mixpanel's legacy `alias` method?
Prior to March 2020, the only way to connect users together was the `.alias()` method. This was very limited and was not retroactive; this meant that if a user used two devices and then logged in, you would lose activity for the user from one of the devices.

If you set up Mixpanel prior to 2020, you may have implemented with the `alias()` method. Alias is still supported in its original state and we have preserved its documentation [here](https://github.com/mixpanel/docs/blob/main/legacy/aliases.md), but if you want to revisit your identity management strategy, we recommend setting up a new Mixpanel project and using the best practices outlined in this guide.

### Why is there a `$identity_failure_reason` and `$distinct_id_before_identity` in my event?
The `$identity_failure_reason` property will be populated with a value `errAnonDistinctIdAssignedAlready` if the `$device_id` passed was already linked to another `$user_id`. The `$device_id` will be ignored and the `$user_id`, in the same event, will be used as the `distinct_id` for the event. 

The `$distinct_id_before_identity` property stores the original `distinct_id` (which was `$device:`<value for $device_id>) when the event was sent to Mixpanel before being mapped to the `$user_id`.

### Why are my users shown as dropped off even though the events are reflected in their Activity Feed/profiles?  
Merging identities may take up to 24 hours to properly reflect in Mixpanel reports (except Activity Feed), hence users may be shown as dropped off even though they've performed the events. 

# Identifying Users

Mixpanel supports stitching user behavior pre-login (eg: traffic from your website, docs, blog) and post-login (once the user has signed up). This helps answer questions like:
* What % of site visitors end up signing up?
* How much of my Purchase revenue can I attribute to a particular campaign?
* What is the conversion rate of reading a particular blog post -> signing up?

This system is called ID Merge. In this guide, we walk through how to use ID Merge and exactly how it works under the hood.

## Usage
If using our Web/Mobile SDKs or a CDP like Segment or Rudderstack, there are only 2 steps:
1. Call `.identify(<user_id>)` when a user signs up or logs in. Pass in the user's known identifier (eg: their ID from your database).
2. Call `.reset()` when a user logs out.

_Any_ events prior to calling `.identify` are considered anonymous events. Mixpanel's SDKs will generate a `$device_id` to associate these events to the same anonymous user. By calling `.identify(<user_id>)` when a user signs up or logs in, you're telling Mixpanel that `$device_id` belongs to a known user with ID `user_id`. Under the hood, Mixpanel will stitch the event streams of those users together. This works even if a user has multiple anonymous sessions (eg: on desktop and mobile). As long as you always call `.identify` when the user logs in, all of that activity will be stitched together.

## Example User Flows

Let's wlk through a few user flows where ID Merge is useful, and when to call `.identify()` and `.reset()` to use ID Merge properly.

Note: these flows walk through how `distinct_id` is set in Simplified ID Merge; in Original ID Merge, the value of `distinct_id` is not deterministic. See the [FAQ](#what-is-distinct-id) for more details on how `distinct_id` is set.

### New User Signup

1. A user lands in your product on a new device and interacts with your product before signing up. Our SDK will assign the user a random `$device_id` and persist it. All events tracked at this point will send only a `$device_id`.
        
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | ----- | ---------- | -------- | ----------------------------- | ----- |
    | 1     | D1         |          | $device:D1                    |       |
    | 2     | D1         |          | $device:D1                    |       |

2. The user returns later and signs up for your product. You call `.identify(<user_id>)`. All events sent after this point are tracked with both the original `$device_id` and the new `$user_id`. Mixpanel will retroactively set the `$user_id` on any prior events with the user’s `$device_id` so that both event streams are joined.
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes                 |
    | ----- | ---------- | -------- | ----------------------------- | --------------------- |
    | 1     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     | Retroactively updated |
    | 2     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     | Retroactively updated |
    | 3     | D1         | U1       | U1                            | Links D1 ⇒ U1         |

### Returning User

1. The user from the previous flow returns, but is on a new device and has not logged in yet.
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes         |
    | ----- | ---------- | -------- | ----------------------------- | ------------- |
    | 1     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     |               |
    | 2     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     |               |
    | 3     | D1         | U1       | U1                            | Links D1 ⇒ U1 |
    | 4     | D2         |          | $device:D2                    | New device D2 |
    | 5     | D2         |          | $device:D2                    |               |
   
2. The user logs in. Call `.identify(U1)` to tell us that the user on this device is the same `$user_id` we have seen before.
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes                 |
    | ----- | ---------- | -------- | ----------------------------- | --------------------- |
    | 1     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     |                       |
    | 2     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     |                       |
    | 3     | D1         | U1       | U1                            | Links D1 ⇒ U1         |
    | 4     | D2         |          | ~~*$device:D2*~~ ⇒ **U1**     | Retroactively updated |
    | 5     | D2         |          | ~~*$device:D2*~~ ⇒ **U1**     | Retroactively updated |
    | 6     | D2         | U1       | U1                            | Links D2 ⇒ U1         |

### Multiple Users, One Device

1. A first user begins using a new device.
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes |
    | ----- | ---------- | -------- | ----------------------------- | ----- |
    | 1     | D1         |          | $device:D1                    |       |

2. The user logs in. Call `.identify(U1)`, which links the `$device_id` to their `$user_id`.
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes                 |
    | ----- | ---------- | -------- | ----------------------------- | --------------------- |    
    | 1     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     | Retroactively updated |
    | 2     | D1         | U1       | U1                            | Links D1 ⇒ U1         |
   
3. The user logs out. At this point, you should call `.reset()`, or manually generate a new `$device_id` if you are managing it yourself. A new user shows up and tracks events using this new `$device_id`.
    
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes                      |
    | ----- | ---------- | -------- | ----------------------------- | -------------------------- |    
    | 1     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     |                            |
    | 2     | D1         | U1       | U1                            | Links D1 ⇒ U1              |    
    | 3     | D2         |          | $device:D2                    | Reset generated new ID: D2 |
    | 4     | D2         |          | $device:D2                    |                            |
   
4. This new user (U2) now logs in. Call `.identify(U2)`.
       
    | Event | $device_id | $user_id | distinct_id (set by Mixpanel) | Notes                      |
    | ----- | ---------- | -------- | ----------------------------- | -------------------------- |        
    | 1     | D1         |          | ~~*$device:D1*~~ ⇒ **U1**     |                            |
    | 2     | D1         | U1       | U1                            | Links D1 ⇒ U1              |    
    | 3     | D2         |          | ~~*$device:D2*~~ ⇒ **U2**     | Retroactively updated      |
    | 4     | D2         |          | ~~*$device:D2*~~ ⇒ **U2**     | Retroactively updated      |
    | 5     | D2         | U2       | U2                            | Links D2 ⇒ U2              |

## Simplified vs Original ID Merge

In March 2023, Mixpanel released Simplified ID Merge (documented above) as a simpler, opt-in alternative to Original ID Merge. In June 2023, Mixpanel made the Simplified API the default for new organizations.

Due to the limited changes in functionality beyond a simpler implementation experience, we do not recommend that customers who have already implemented using the original API reimplement on the simplified API. Both APIs will remain supported and provide the same features.

### How do I switch between the Simplified and Original API?

Note that you cannot switch between the two APIs if your project already contains data in it.

If you would like to make sure any new projects created within your organization default to Simplified ID Merge, there is an organization setting to do so:

![Untitled](/Tracking/id-merge-org-settings.png)

If you have an existing project with no data in it, you can also switch to using Simplified ID Merge via the “Identity Merge” section of the Project Settings Page:

![Untitled](/Tracking/id-merge-project-settings.png)


### Third-Party Integration Support

Customer Data Platform (CDP) integrations may require some configuration to work the Simplified API:
- Segment works out of the box with both the simplified and original APIs with no special configurations.
- Rudderstack has a [connection setting](https://www.rudderstack.com/docs/destinations/streaming-destinations/mixpanel/#connection-settings) that should match the API version configured on your Mixpanel project.
- mParticle works out of the box with the original API, but requires the following change to work with the simplified API: supply `$device_id` and `$user_id` explicitly as properties on your events.

Most other integrations are unaffected by this API change. These integrations are not involved in identity management, they send data to the ID they are given and will work the same way on the simplified API that they do on the original API.

### How does the Simplified API differ from the Original API?

- **`$user_id`/`$device_id` are linked without separate `$identify`, `$merge`, or `$create_alias` events.** The Original API required sending one of these three special event types to link two identities. In the Simplified API, the `$identify`, `$merge`, and `$create_alias` events no longer have any special meaning and will be ignored. Instead, identities are linked using the `$user_id` and `$device_id` properties on regular events as described above.
- **`$distinct_id` is predictable and matches `$user_id` for identified users.** In the Original API, IDs are grouped into identity clusters and any ID within the cluster might become the “canonical” distinct ID. In the simplified API, the `$distinct_id` is deterministic: it will always be the `$user_id` that you provide.
- **There is no limit on the number of `$device_id`s that can be merged into a single `$user_id`.** In the Original API a maximum of 500 IDs can be merged into a single cluster. In the Simplified API, there is no similar restriction; you can merge an unlimited number of `$device_id`s into `$user_id`s. This is useful in apps where users log out and log in often.

## Best Practices
#### Call mixpanel.identify upon a successful sign-up / login or when an app is re-opened in a logged-in state
By calling mixpanel.identify at these specific points in user journeys, you would be able to link the pre and post-login events to the same user on Mixpanel. Besides, calling mixpanel.identify when the users re-open the app in a logged-in state ensures that all events in the session are tracked with the user's identifier such as user id.

#### Track the unique identifier as a super property and user property to assist in troubleshooting
You can track the user's unique identifier as a [super property via mixpanel.register](https://developer.mixpanel.com/docs/javascript#super-properties) and [user property via mixpanel.people.set](https://developer.mixpanel.com/docs/javascript#setting-profile-properties) as soon as it is available in the app i.e. on a successful sign-up / login or when an app is re-opened in a logged in state.
In the cases when ID Merge is not implemented properly, you can rely on these properties for troubleshooting purposes.

#### Avoid creating profiles for anonymous users
Avoid creating profiles for anonymous users. If possible, cache user profile properties update in cookie or local storage and only send them to Mixpanel after the user is identified (ie logged-in state).

#### QA your ID management implementation during the development phase
Here are a few things to look out for:
- Ensure that cross-platform, pre and post-registration events are linked to the same user on Mixpanel.
- Ensure that no duplicate profiles are created as the users go through the onboarding, registration, login, and cross-platform user journey.
- Ensure that all the user’s identifiers are stored in the same Identity Cluster and that all their events are displayed on a single profile on Mixpanel.

#### Keep a record of your ID management implementation
We encourage you to document your implementation (or create a diagram of the implementation). This will come in handy when you need to re-implement this on a new platform or troubleshoot ID management issue.


## FAQ

### What is Distinct ID?
`distinct_id` is an identifier set by Mixpanel based on the combination of `$device_id` and `$user_id`. The purpose of `distinct_id` is to provide a single, unified identifier for a user across devices and sessions. This helps Mixpanel compute metrics like Daily Active Users accurately: when two events have the same value of `distinct_id`, they are considered as being performed by 1 unique user. By joining on the `distinct_id`, Mixpanel is also able to accurately count funnels or retention metrics that span a user's logged-out behavior and logged-in behavior.

Note: You cannot set the value of `distinct_id` yourself, it will be set by Mixpanel. How it's set depends on the [version of ID Merge](/docs/tracking-methods/identifying-users#simplified-vs-original-id-merge) that your project uses:
* **Simplified ID Merge (default):** `distinct_id` will be the `$user_id` if present, otherwise will be `$device:<$device_id>`.
* **Original ID Merge:** `distinct_id` will be either the `$user_id` or `$device_id`, but is non-deterministic and chosen to optimize backend performance. If you want control over a particular identifier for the user, we recommend setting a [user profile property](/docs/data-structure/user-profiles), such as 'User ID', that has your identified ID. This allows you to have a property that represents the identified user ID.

### What does Mixpanel recommend using as the `$user_id`?
We recommend using an ID that is unique to each user and does not change, for example, a database ID. While using an identifier like email may be more convenient, keep in mind that you cannot merge 2 `$user_id`s or change a `$user_id`, so if the user changes their email, they will count as a separate user.

If you are on Original ID Merge, we do have a [`$merge`](https://developer.mixpanel.com/reference/identity-merge) API call that can merge two `$user_id`s. Note: this can add significant complexity to your implementation, and has been removed in Simplified ID Merge.

### How long does it take for the `$device_id` -> `$user_id` mapping to take effect?
For debugging purposes, the Activity Feed view of a single user is updated in real-time (<1-minute delay). You can get to the Activity Feed by navigating to [Users](https://mixpanel.com/report/users) and selecting a given user.

It may take up to 24 hours for this mapping to propagate to all other parts of the system. This means that, in some cases, when analyzing a funnel that spans pre-login and post-login behavior in real-time, some may be shown as dropped-off, even though they've performed the conversion event.

### How does this relate to User Profiles?
[User Profiles](/docs/data-structure/user-profiles) are set directly on `$distinct_ids`, not on `$user_ids` or `$device_ids`. We recommend waiting until after a user is identified before setting user profile properties.

It is possible to set user profile properties for unidentified users by sending the profile updates to `$distinct_id=$device:<device-id>`. However, user profile properties are not preserved when `$device_ids` are linked to `$user_ids`, so any properties set before the IDs became linked will need to be set again using `$distinct_id=<user-id>` once the user is identified.

### Is it possible to merge two `$user_ids`?
We don't recommend doing this in general, as it adds complexity to your identity resolution strategy. Instead, we recommend having a single, unchanging `$user_id` for each user and pointing all other IDs for that user to that single `$user_id`.

### How should I link identified IDs from 3rd-party systems?
Attribution providers (like Appsflyer, Adjust, and Branch) use Mixpanel's SDK properly to set `$device_id` to whichever ID they use for attribution. 

For cohort syncs out to 3rd-party systems, we recommend designating a user property with the identifier of the user in that third-party system. More details are in our integrations docs; for example, see our [doc on exporting cohorts to Braze](/docs/cohort-sync/integrations/braze#matching-mixpanel-and-braze-users). If those integrations are bidirectional (eg: they send events _back_ to Mixpanel), it's best to ensure that the user ID in both Mixpanel and the 3rd-party system is the same so that those events are sent to the correct user.

### What is the status of Mixpanel's legacy `alias` method?
Prior to March 2020, the only way to connect users together was the `.alias()` method. This was very limited and was not retroactive; this meant that if a user used two devices and then logged in, you would lose activity for the user from one of the devices.

If you set up Mixpanel prior to 2020, you may have implemented using the `alias()` method. Alias is still supported in its original state and we have preserved its documentation [here](https://github.com/mixpanel/docs/blob/main/legacy/aliases.md), but if you want to revisit your identity management strategy, we recommend setting up a new Mixpanel project and using the best practices outlined in this guide.

### Why is there a `$identity_failure_reason` and `$distinct_id_before_identity` in my event?
The `$identity_failure_reason` property will be populated with a value `errAnonDistinctIdAssignedAlready` if the `$device_id` passed was already linked to another `$user_id`. The `$device_id` will be ignored and the `$user_id`, in the same event, will be used as the `distinct_id` for the event. 

The `$distinct_id_before_identity` property stores the original `distinct_id` (which was `$device:<value for $device_id>`) when the event was sent to Mixpanel before being mapped to the `$user_id`.



# Original ID Merge

> Call out to check ID management version in settings and link to Simplified doc

## Overview
- System use 3 events to manipulate distinct_id

## Usage
If using our Web/Mobile SDKs or a CDP like Segment or Rudderstack, there are only 2 steps:
1. Call `.identify(<user_id>)` when a user signs up or logs in. Pass in the user's known identifier (eg: their ID from your database).
2. Call `.reset()` when a user logs out.

Any events prior to calling `.identify` are considered anonymous events. Mixpanel's SDKs will generate a `$device_id` to associate these events to the same anonymous user. By calling `.identify(<user_id>)` when a user signs up or logs in, you're telling Mixpanel that `$device_id` belongs to a known user with ID `user_id`. Under the hood, Mixpanel will stitch the event streams of those users together. This works even if a user has multiple anonymous sessions (eg: on desktop and mobile). As long as you always call `.identify` when the user logs in, all of that activity will be stitched together.

## Mechanism
- talk about the 3 events in detail
- link to Identity API Dev Doc
- 
### $identify
- example payload
- this is the event payload underneath identify SDK function (function is basically this event)
- logic tree
- failure reason, other identify reserved props

### $merge
- example payload
- API only event
- No logic tree
- merge any clusters together under 500 IDs
- Good for fixing mistakes

### $create_alias
- example payload
- this is the event payload underneath alias SDK function (function is basically sending an event)]
- Not necessary in this version; preserved to make easier for leagacy users to transition

## Example User Flows
- Charlie example.

> Mimic below but update to Original ID Merge

Let's walk through a few user flows where ID Merge is useful, and when to call `.identify()` and `.reset()` to use ID Merge properly.

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

## Limitations
- canonical distinct_id not configurable
- 500 ID limit
- $merge profile direction not predictable

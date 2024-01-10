# Overview
Mixpanel has three versions of ID Management versions to date. Prior to March 2020, customers were on Legacy ID Management. 

In March 2020, we released Original ID Merge which supports retroactive ID Merge. This feature allows the merging of events triggered both before and after authentication across multiple devices and platforms.

In March 2023, we released the current Simplified ID Merge. It requires a simpler implementation and doesn’t have the limitation of 500 IDs per ID cluster found in the Original ID Merge. 

To determine your current ID Management version, navigate to `Organisation/Project Settings > Identity Merge`. `Organisation Settings` indicate the default version for every new project (Legacy ID Management is marked as "Disabled"). You can toggle the ID Management version for a specific project via `Project Settings` if no data has been ingested into that project yet.

# Deciding When Migrating Makes Sense
It is not possible to convert an existing project using Legacy/Original ID Merge to Simplified ID Merge. **To adopt Simplified ID, you need to set up a new project from scratch**. This guide aims to help you in evaluating whether the migration will benefit your project based on your current ID management requirements and future plans. It outlines the pros and cons of each ID Management system and guides you through key considerations to make an informed decision. It also provides details on the tasks and resources required on your end should you decide to proceed with the migration. 

## Customers on Legacy ID Management
The main limitation of the Legacy ID Management system was that users could become orphaned. This could happen if they were initially tracked on one platform or device, creating a user on Mixpanel, and later moved on to another platform or device, triggering various anonymous events before logging in. The anonymous events on the second platform would be orphaned, resulting in the creation of a duplicate user on Mixpanel. Only upon the user's login would their events with the user ID be properly linked back to the main user. Here’s the flow chart illustrating how an orphaned user can be created throughout the user journey, 
![image](/Tracking/legacy-id-management.png)

The lack of a retroactive ID merge feature in this system means that orphaned users are created whenever new anonymous IDs are introduced during user interactions across multiple sessions, devices, and platforms. This prevents you from getting a holistic view of the user journeys, as events from the same user are split among multiple users on Mixpanel.

>When it’s ok to keep Legacy ID management: 
If you are solely tracking authenticated users (you do not track anonymous events and do not need the retroactive ID Merge feature in Simplified ID Merge for users merging), you are not running into any limitation in this system and should not consider the migration. We have preserved the documentation on the Legacy ID Management [here](https://github.com/mixpanel/docs/blob/main/legacy/aliases.md). 

## Customers on Original ID Merge
While retroactive ID Merge is supported in Original ID Merge, the main limitation of this system is that each user can have a ID cluster limited to a maximum of 500 IDs. Upon reaching this limit, any new Distinct ID cannot be merged into the same ID cluster. They become orphaned (duplicate users on Mixpanel), preventing you from getting a holistic view of the user journeys, as events from the same user are split among multiple users on Mixpanel.

Hitting the 500 IDs per ID cluster limit is possible when the process of generating new anonymous IDs through `.reset()` call on logout and adding them to the ID cluster repeats 500 times. The `.reset()` call is commonly implemented in product with multiple users sharing the same device. This ensures that anonymous events upon logout are linked to the next users who login, rather than the last users who logout. Examples where customers may mandate logging their users out:
- Payments / Fintech for security reasons
- Platforms where multiple users can share a single device - for example OTT

If some of your users are approaching this cluster limit, you should revisit your implementation and consider removing the `.reset()` call, unless there is a compelling use case where the benefits outweigh the implications of reaching the ID cluster limit. 

Also, if you are considering Simplified ID Merge, it's important to note that it does not support multiple identified IDs (e.g. User IDs) per ID cluster. This is supported on Original ID Merge via special events such as `$merge` and `$create_alias` but they have been removed from Simplified ID Merge for simplicity.

>When it’s ok to keep Original ID Merge: 
>- If you don’t generally support multiple users sharing the same device, and don’t have a compelling use case requiring `.reset()` call on logout (or if you are implementing via server-side and do not generate new anonymous IDs for the same user), you are unlikely to run into the limit of 500 IDs per ID cluster, and should not consider the migration.  
>- You have ID management requirements which are not supported in Simplified ID Merge e.g. need the support of multiple identified IDs (User IDs) per user.

# Understanding Simplified ID Merge implementation
Unlike Legacy ID Management, which requires an explicit alias call to connect multiple identifiers, or Original ID Merge, which requires special events such as $identify, $merge, and $create_alias to initiate ID Merge, Simplified ID Merge simply requires including reserved properties, `$device_id` and `$user_id` on the events for ID Merge to take place. You can learn more about Simplified ID Merge [here](https://docs.mixpanel.com/docs/tracking-methods/identifying-users). Here’s a quick example to illustrate the difference: 

1. When the users are anonymous, the events should include a `$device_id` property that stores the anonymous ID.     
    ```
    {
      "event": "View Anonymous Page",
      "properties": {
        "token": "{{token}}",
        "$device_id": "anonymous111", 		
      }
    }
    ```    
2. As soon as the users are identified, the events should include both `$device_id` and `$user_id` properties. A single instance of such event is adequate to trigger ID Merge which merges “anonymous111” and “charlie”, but sending more instances of such events won't result in any ID Merge errors. Make sure that all authenticated events thereafter include at least the `$user_id` property.     
    ```
    {
      "event": "Sign Up",
      "properties": {
        "token": "{{token}}",
        "$device_id": "anonymous111", 
        "$user_id": "charlie"
      }
    }
    ```    
3. Upon user logout, re-generate a new anonymous ID. This allows for storing the events under a new anonymous ID, and later merge them with the next user who logs in, whether it's the same user, or different users sharing the same device. Unlike Original ID, Simplified ID Merge does not have limit on the number of identifiers allowed in an ID cluster.    
    ```
    //after user logout 
    {
      "event": "View Anonymous Page",
      "properties": {
        "token": "{{token}}",
    	"$device_id": "anonymous222"		
      }
    }
    ```    
4. Upon user (re)identification, send events containing both the `$device_id` and `$user_id` properties to trigger ID Merge.    
    ```
    //same user 
    {
      "event": "Sign In",
      "properties": {
        "token": "{{token}}",
    	"$device_id": "anonymous222", 
        "$user_id": "charlie"
      }
    }
    
    //different user sharing the same device 
    {
      "event": "Sign In",
      "properties": {
        "token": "{{token}}",
    	"$device_id": "anonymous222", 
        "$user_id": "taylor"
      }
    }
    ```    
Simplified ID Merge can retroactively merge an unlimited number of anonymous IDs (`$device_id`) to a user (`$user_id`). This ensures that anonymous events across multiple platforms and sessions can always be merged to the respective user. The sample implementation above results in a group of IDs being linked to Charlie on Mixpanel as shown below,
![image](/Tracking/charlie_id_cluster.png)

- Any ID provided as `$device_id` will be prefixed with `$device:` in Mixpanel.
- You can merge unlimited number of `$device_id` into `$user_id`

`distinct_id` is optional on event because Mixpanel automatically updates or overrides it whenever `$user_id` or `$device_id` is present on the events. It takes the value of `$user_id` if present; otherwise, it takes `$device_id` and prefixes it with `$device:` 

Example 1: 
```
//Triggered event 
{
  "event": "Sign Up",
  "properties": {
    "token": "{{token}}",
    "$device_id": "anonymous111", 
    "$user_id": "charlie"
  }
}
```
```
//distinct_id set by Mixpanel 
{
  "event": "Sign Up",
  "properties": {
    "token": "{{token}}",
    "$device_id": "anonymous111", 
    "$user_id": "charlie"
    "distinct_id": "charlie"
  }
}
```

Example 2: 
```
//Triggered event 
{
  "event": "View Anonymous Page",
  "properties": {
    "token": "{{token}}",
    "$device_id": "anonymous111" 		
  }
}
```
```
//distinct_id set by Mixpanel 
{
  "event": "View Anonymous Page",
  "properties": {
    "token": "{{token}}",
    "$device_id": "anonymous111", 		
    "distinct_id": "$device_id:anonymous111"
  }
}
```

## Gotchas in migrating from Legacy/Original to Simplified ID Merge
Take note of the following details when planning for the migration from Legacy/Original ID Merge to Simplified ID Merge:  

1. Simplified ID Merge only supports one user ID (`$user_id`) per user to maintain simplicity in the implementation. If you need an ID management solution that supports multiple user IDs per user, such as both a email address and a phone number, it’s recommended to remain on Original ID Merge which provides features such as `$create_alias` and `$merge` to merge multiple user IDs.
       - For example, here’s an unsuccessful attempt to merge `+6512345678` (additional user ID) with `charlie` on Simplified ID Merge:        
        ```
        {
          "event": "Add phone number as user ID",
          "properties": {
            "token": "{{token}}",
            "$device_id": "+6512345678", 
            "$user_id": "charlie"
          }
        }
        ```        
        Results of Simplified ID Merge:
        ![image](/Tracking/charlie_two_user_ids.png)
2. If you are sending events via third-party integrations, ensure that they are compatible with Simplified ID Merge by including reserved properties, `$device_id` and `$user_id` on the events. In terms of backward compatibility, Simplified ID still supports events with only the `distinct_id` property.  
    - In the cases when events only contain the `distinct_id` property, the value of distinct_id will be included as `$user_id` in the event; if distinct_id is prefixed with `$device:`, it will be added as `$device_id` to the event. Ensure that the distinct_id of anonymous events are prefixed with `$device:`.         
        Example 1:         
        ```
        //Triggered event 
        {
            "event": "Message Sent",
            "properties": {
                "token": "{{token}}",
                "distinct_id": "charlie"
            }
        }
        
        ```
        ```
        //$user_id is set by Mixpanel 
        {
            "event": "Message Sent",
            "properties": {
                "token": "{{token}}",
                "distinct_id": "charlie", 
        		"$user_id": "charlie"
            }
        }
        ```
        Example 2:         
        ```
        //Triggered event 
        {
            "event": "App Install",
            "properties": {
                "token": "{{token}}",
                "distinct_id": "$device:anoymous111"
            }
        }        
        ```        
        ```
        //$device_id is set by Mixpanel 
        {
            "event": "App Install",
            "properties": {
                "token": "{{token}}",
                "distinct_id": "$device:anoymous111",
                "$device_id": "anonymous111"
            }
        }
        ```  

3. If you are implementing Mixpanel in your mobile apps, you’ll need to ship a new version of the mobile app with the updated ID management implementation and new project’s token as part of the migration process. Without a force update, it may take awhile for all users to upgrade to the latest app version. During this period, some events may still be sent to the old project. Be prepared for data backfilling if you want these events, as well as the historical data to be included in the new project.
4. With the introduction of the retroactive ID Merge feature in Original and Simplified ID Merge, it may take up to 24 hours for the ID Merge (merging 2 unique users into 1 unique user) to be fully reflected in all Mixpanel reports.


   

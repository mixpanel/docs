## Overview
Mixpanel has released three versions of ID management to date. Prior to March 2020, we have Legacy ID Management system.<br> 
In March 2020, we released Original ID Merge system which supports retroactive ID Merge. This allows the merging of events triggered both before and after authentication across multiple devices and platforms.<br>
In March 2023, we released the current Simplified ID Merge system. It has a simpler implementation and doesn’t have the limitation of 500 IDs per ID cluster found in the Original ID Merge.<br> 

To determine your current ID Management version, navigate to Organisation/Project Settings > Identity Merge. Organisation Settings indicate the default version for every new project (Legacy ID Management is marked as "Disabled" there). **You can switch the ID Management version for a specific project via Project Settings provided no data has been ingested into the project.**

![image](/Tracking/org-setting.png)

![image](/Tracking/project-setting.png)

## Deciding When Migrating Makes Sense
It is not possible to convert an existing project using Legacy/Original ID Merge to Simplified ID Merge. **To adopt Simplified ID Merge, you need to set up a new project from scratch**. This guide helps you in evaluating whether the migration will benefit your project based on your current ID management requirements and future plans. It outlines the pros and cons of each ID Management version and guides you through key considerations to make an informed decision. It also provides details on the resources required on your end should you decide to proceed with the migration. 

### On Legacy ID Management
The main limitation of Legacy ID Management was that users could become orphaned. This could happen if they were initially tracked on one platform or device, creating a user on Mixpanel, and later moved on to another platform or device, triggering various anonymous events before logging in. The anonymous events on the second platform would be orphaned, resulting in duplicate users on Mixpanel. Only upon the user's login would their events with the user ID be properly linked back to the main user. Here’s the flow chart illustrating how an orphaned user can be created throughout the user journey, 

![image](/Tracking/legacy-id-management.png)

The lack of a retroactive ID merge feature here means that orphaned users are created whenever new anonymous IDs are introduced during user interactions across multiple sessions, devices, and platforms. This prevents you from getting a holistic view of the user journeys. 

>When it’s ok to keep Legacy ID management: 
If you are only tracking authenticated users (you do not track anonymous events), you don't need the retroactive ID Merge feature in Simplified ID Merge and should not consider the migration. We have preserved the documentation on the Legacy ID Management [here](https://github.com/mixpanel/docs/blob/main/legacy/aliases.md). 

### On Original ID Merge
While retroactive ID Merge is supported in Original ID Merge, the main limitation is that each user can have a ID cluster limited to a maximum of 500 IDs. Upon reaching this limit, any new Distinct ID can no longer be merged into the same ID cluster. They will become orphaned (duplicate users on Mixpanel), preventing you from getting a holistic view of the user journeys. 

Hitting the 500 IDs per ID cluster limit is possible when the process of generating new anonymous IDs through `.reset()` call on logout and adding them to the ID cluster repeats 500 times. The `.reset()` call is commonly implemented in product with multiple users sharing the same device. This ensures that anonymous events upon logout are linked to the next users who login, rather than the last users who logout. If some of your users are approaching this cluster limit, you should revisit your implementation and consider removing the `.reset()` call, unless there is a compelling use case where the benefits outweigh the implications of reaching the ID cluster limit. 

Also, if you are considering Simplified ID Merge, it's important to note that it does not support multiple identified IDs (e.g. User IDs) per ID cluster. This is supported on Original ID Merge via special events such as \$merge and \$create_alias but they have been removed from Simplified ID Merge for simplicity.

>When it’s ok to keep Original ID Merge: 
>- If you don’t generally support multiple users sharing the same device, and don’t have a compelling use case requiring `.reset()` call on logout (or if you are implementing via server-side and do not generate new anonymous IDs for the same user), you are unlikely to run into the limit of 500 IDs per ID cluster, and should not consider the migration.  
>- You have ID management requirements which are not supported in Simplified ID Merge e.g. need the support of multiple identified IDs (User IDs) per user.

## Understanding Simplified ID Merge
Unlike Legacy ID Management, which requires an explicit alias call to connect multiple identifiers, or Original ID Merge, which requires special events such as \$identify, \$merge, and \$create_alias to initiate ID Merge, **Simplified ID Merge simply requires including reserved properties, `$device_id` and `$user_id` on the events for ID Merge to take place**. You can learn more about Simplified ID Merge [here](https://docs.mixpanel.com/docs/tracking-methods/identifying-users). Here’s a quick example to illustrate the difference: 

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
3. Upon user logout, re-generate a new anonymous ID to store the anonymous events, and later merge them with the next user who logs in (could be the same user, or different users sharing the same device). Unlike Original ID, Simplified ID Merge does not have a limit on the number of identifiers allowed in an ID cluster.    
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
Simplified ID Merge can retroactively merge an unlimited number of anonymous IDs (`$device_id`) to a user (`$user_id`). This ensures that anonymous events across multiple platforms and sessions can always be merged to the respective user. The implementation above results in the following ID cluster, 

![image](/Tracking/charlie_id_cluster.png)

- Any ID provided as `$device_id` will be prefixed with `$device:` in Mixpanel.
- You can merge unlimited number of `$device_id` into `$user_id`

`distinct_id` is optional on event because Mixpanel automatically updates or overrides it whenever `$user_id` or `$device_id` is present on the events. It takes the value of `$user_id` if present; otherwise, it takes `$device_id` and prefixes it with `$device:` <br> 
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

### Gotchas in Migrating from Legacy/Original to Simplified ID Merge
Take note of the following details when planning for the migration from Legacy/Original ID Merge to Simplified ID Merge:  

1. Simplified ID Merge only supports one user ID (`$user_id`) per user to maintain simplicity in the implementation. If you need an ID management solution that supports multiple user IDs per user, such as both a email address and a phone number, it’s recommended to remain on Legacy or Original ID Merge which provide features such as \$create_alias and \$merge to merge multiple user IDs.
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
   - Results of Simplified ID Merge:
     
     ![image](/Tracking/charlie_two_user_ids.png)
     <br>     
2. If you are sending events via third-party integrations, ensure that they are compatible with Simplified ID Merge by having reserved properties, `$device_id` and `$user_id` on the events. For backward compatibility, Simplified ID still supports events with only the `distinct_id` property.  
    - If events only contain the `distinct_id` property, the value of distinct_id will be added as `$user_id` to the event; if distinct_id is prefixed with `$device:`, it will be added as `$device_id` to the event (ensure that the distinct_id of anonymous events are prefixed with `$device:`).
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
4. If you are implementing Mixpanel in your mobile apps, you’ll need to ship a new version of the app with the updated ID management implementation and new project’s token as part of the migration process. Without a force update, it may take awhile for all users to upgrade to the latest app version. During this period, some events may still be sent to the old project. Be prepared for data backfilling if you want these events, as well as the historical data to be included in the new project.
5. With the introduction of the retroactive ID Merge feature in Original and Simplified ID Merge, it may take up to 24 hours for the ID Merge (merging 2 unique users into 1 unique user) to be fully reflected in all Mixpanel reports.

## Migration to Simplified ID Merge
The following guide outlines the steps required to set up the new Simplified project from scratch and populate it with data compatible with Simplified ID. This will help you estimate the time and resources required on your end to complete the migration. 

### Set Up a New Simplified ID Project 
>You need to set up the new Simplified project from scratch as none of the configurations from the existing project can be carried over.
1. Create a new project in your existing organization via Organization Settings. 
2. Enable Simplified ID Merge in the project via Project Settings > Identity Merge. Please note that new project follows the organisation’s default (Legacy or Original ID Merge). You have to switch the project to Simplified ID Merge *before* sending any data to the project. Make sure to override the default selection in every newly created project. 
![image](/Tracking/simplified_project_settings.png)
3. Set up the new project by following the guide [here](https://docs.mixpanel.com/docs/best-practices/project-setup). Configure the project settings by referring to your existing project’s settings. Some of the setup tasks include inviting users to the project, adding group keys, creating data views and service accounts, configuring session settings etc. Note that the new project comes with newly generated project tokens, service accounts credentials etc. Replace the tokens in your implementations with the new ones to start sending data to this new project.

### Populating Data in Simplified ID Project
This process typically involves populating both the live data and historical data in the new project. Coming from Legacy or Original ID Merge system, you will find that the implementation for Simplified ID is different but generally simpler and more robust. It’s important to review and modify your ID Management implementation as needed to get expected outcome in terms of user merging. 

#### Sending Live Data
Update your tech stack with the new project’s token and service accounts credentials to redirect data to the new project. 

1. For Mixpanel SDK integration:
- Upgrade to the latest SDK version supporting Simplified ID and initialise the SDK with new project’s token:
    - [Javascript SDK ≥ v2.46.0](https://github.com/mixpanel/mixpanel-js/releases/tag/v2.46.0)
    - [Swift SDK ≥ v4.0.5](https://github.com/mixpanel/mixpanel-swift/releases/tag/v4.0.5)
    - [Android SDK ≥ v7.3.0](https://github.com/mixpanel/mixpanel-android/releases/tag/v7.3.0)
- Find the implementation guide [here](https://docs.mixpanel.com/docs/tracking-methods/identifying-users#usage). You only need to call `.identify` and `.reset` methods at specific points in the user journeys as the SDK will automatically add the reserved properties, `$device_id` and `$user_id` to the events before sending them to Mixpanel.
- You should not call `.alias`, as this method will not trigger ID Merge in Simplified ID project. It is only provided as a backward-compatible solution for users who are on Legacy/Original ID Merge.
2. For Mixpanel API integration:
    - If you are sending data from server via Mixpanel Import API, update the API token to point to the new project.
    - You should not send \$identify, \$merge, and \$create_alias events as part of ID management since they will be ignored in Simplified projects and will not trigger ID Merge.
    - Update your Import API payload to include  `$device_id` and `$user_id` properties in the events. A single instance of such event is adequate to trigger ID Merge. You can learn more about Simplified ID's requirements [here](#understanding-simplified-id-merge).
        - If it's not feasible to include both `$device_id` and `$user_id` in a single user event, you can still trigger ID Merge by sending a dummy event that includes both `$device_id` and `$user_id`.
        - Choose any name for the dummy event (e.g. login) except for \$identify, \$merge, and \$create_alias.
4. For CDP integration:
    - Ensure that your CDP is updated with new Mixpanel project token.
    - Check out the CDP support for Simplified ID Merge [here](https://docs.mixpanel.com/docs/tracking-methods/identifying-users#third-party-integration-support).
5. For other 3rd-party integrations: 
    - If you are sending a subset of events through 3rd-party platforms i.e. attribution and messaging tools, make sure to update the Mixpanel project token there and [ensure that the platforms send events that are compatible with Simplified ID to Mixpanel](#understanding-simplified-id-merge).
6. For data warehouse integration: 
    - Consider using our [Mixpanel Warehouse Connector](https://docs.mixpanel.com/docs/tracking-methods/data-warehouse/overview) which supports Simplified ID implementation. Make sure that events in data warehouse contains the reserved properties (`$device_id` and `$user_id`) as shown in the example above before setting up the connector in Mixpanel.

For mobile apps, the adoption of latest app version may take some time. This means that users who have upgraded to the latest app version will start sending data to the new project, whereas users on the older apps continue sending data to the old project. To capture the full data, consider migrating the residual data in the old project to the new one, and repeat the process until latest app adoption reaches a satisfactory level. You can find additional information about backfilling and key considerations in [this section](#backfilling-historical-data).

#### Backfilling Historical Data
> This is an optional step. If your existing project did not have that much data and you don’t mind starting from scratch, you can skip backfilling.

Before starting the backfilling process, it’s important to have a discussion internally to determine the volume of data that needs to be migrated. It’s advisable to migrate only what you need i.e. recent data actively queried by the team, as this is more manageable and resource-efficient. 

Mixpanel accepts data up to 5 days old, so it is advisable to initiate the backfill process only after the data for a given day has stabilized to avoid the need for multiple backfills. If waiting is not feasible, consider using `mp_processing_time_ms` property (UTC timestamp of when the event was processed by our servers) to identify late-arriving events and selectively backfill them into the new project. To prevent data duplication caused by backfilling, ensure that each imported event includes a `$insert_id` which provides a unique identifier for the event and is used for deduplication. [Events with identical values for event, time, distinct_id and $insert_id are considered duplicates](https://developer.mixpanel.com/reference/import-events#propertiesinsert_id) and only one of them will be surfaced in Mixpanel queries. 

There are different ways to backfill historical data into the new project, depending on where your data resides: 
1. Mixpanel APIs - If Mixpanel is your single source of truth, export data from existing project via [Raw Export API](https://developer.mixpanel.com/reference/raw-event-export) and then import it into the new project via [Import API](https://developer.mixpanel.com/reference/import-events). Ensure that the data is in compliance with Simplified ID before importing it to Mixpanel. 
    - You can use Engage API to migrate user data (APIs for both [user export](https://developer.mixpanel.com/reference/engage-query) and [user import](https://developer.mixpanel.com/reference/profile-set) are available).
    - Consider incorporating the export and import functions from [Mixpanel-utils open source library](https://github.com/mixpanel/mixpanel-utils) in your migration script.
2. Mixpanel Warehouse Connector - If you’ve been storing your data in a data warehouse, you can import them into Mixpanel via [Warehouse Connector](https://docs.mixpanel.com/docs/tracking-methods/data-warehouse/overview) which supports both events and user data. 
3. Customer Data Platform (CDP) - Replay the historical data from CDP to Mixpanel.  

Please make sure that the historical data is properly formatted and adheres to Simplified ID Merge’s requirements before backfilling it to a new project via any of the methods mentioned above. Familiarize yourself with the Simplified ID implementation [here](#understanding-simplified-id-merge-implementation) to plan out the required data transformation tasks for your historical data. 

If your historical data doesn't have any event with both `$device_id` and `$user_id` that are required in Simplified ID for ID Merge, check if you can retrieve these IDs mappings from your system - if so, you can still trigger ID Merge by sending a dummy event that includes both `$device_id` and `$user_id` based on your IDs mappings. You can choose any name for the dummy event except for `$identify`, `$merge`, and `$create_alias`.

##### Migrating from Legacy ID Management

If you are implementing via Mixpanel SDK and have been making an alias call to link anonymous ID to user ID, the SDK should have already populated `$device_id` and `$user_id` on your events (please verify this in your Mixpanel project events). These historical events can be directly imported into Simplified ID project as they include reserved properties required for ID Merge to take place in Simplified ID. 

However, in the case of a custom implementation without the reserved properties `$device_id` and `$user_id` on the events (e.g. server implementation), it’s necessary to transform the events before backfilling it to new project. For example, you can derive the reserved properties from other relevant properties on the events. 

##### Migrating from Original ID Merge

If you are implementing via Mixpanel SDK and have been calling identify to merge pre and post-registration events, the SDK should have already populated `$device_id` and `$user_id` on your events (please verify this in your Mixpanel project events). These historical events can be directly imported into Simplified ID project as they include reserved properties required for ID Merge in Simplified ID. 

If you are also calling alias or merge (using special events, `$create_alias` and `$merge`) to merge multiple user IDs per user, it's important to note that this functionality is not supported in Simplified ID. Additional details can be found [here](#understanding-simplified-id-merge-implementation).

#### Data Migration Flow

Discuss internally to decide the ideal data migration flow with minimal interruption to the analysis activities on Mixpanel. 

1. Test both live and historical data migration thoroughly in staging environment before deploying to production. For historical data, you only need a subset of them in the new project for testing and verification.
2. Prepare for the official transition to the new project as soon as live data is re-directed there. Make sure that your project is well-setup by then. If data delays or incomplete data are expected in the new project, clearly communicate this to your end users as their analysis will be impacted. For example, having a data backfilling plan in place and sharing details such as “X months of data will be available in new project within Y hours”. This proactive approach will help manage expectations with your end users and ensure a seamless transition. Please check the cost implication of having overlapping data across multiple projects. If you have any questions, do not hesitate to contact support@mixpanel.com for assistance.
3. In cases of a more intricate migration involving a larger data volume coming from different sources, or having bigger impact to your end users, consider conducting data backfilling before updating the live implementation. This approach allows for ample time to configure your new project, replicate reports and non-data entities in the new project against the backfilled data. While this may require multiple backfills, you have the option to deploy the live data implementation when you are ready. 

### Migrating Reports and Non-data Entities

When creating net new projects, you might have a lot of boards, reports, custom events, properties etc that you may want recreated in the new projects as well. Below, we list some suggested ways to do this work:

1. Cohorts, Custom Events & Custom Properties
    - Manual Recreation: This involves manually copying and pasting the logic from the old project into the new project's cohorts, custom events & custom property definitions. For example with custom properties, follow steps to [create a new custom property](https://docs.mixpanel.com/docs/features/custom-properties#:~:text=works%20with%20objects.-,Creating%20a%20Custom%20Property,-Click%20Create%20Custom) and copy over the definition from the old project instead of starting from scratch. \   
2. Lookup Tables
    - Manual Recreation: If your old project is heavily reliant on Lookup tables for reports, manually [re-upload](https://docs.mixpanel.com/docs/data-structure/lookup-tables#how-do-i-upload-a-lookup-table:~:text=components%2C%20and%20channels.-,How%20do%20I%20upload%20a%20Lookup%20Table%3F,-Lookup%20Tables%20are) the lookup tables to the new project via Lexicon.
3. Lexicon 
    - Lexicon Schema API or CSV Export/Import: To migrate the definitions of your events, properties, and custom properties from the old project to the new one. Make sure that the events, properties, and custom properties that you're migrating are still relevant to your new project. You may want to take this opportunity to clean up your schema and remove any unused or deprecated elements.
4. Boards & Reports
    - Native Move Feature : Since December 2023, Mixpanel offers a native "Move" feature allowing you to directly [transfer boards between projects](https://docs.mixpanel.com/changelogs/2023-07-27-move). This option preserves everything within the board, including reports, filters, and text annotations.

## Validating Data and Boards
- Distinct ID Matching Verify that Simplified ID Merge correctly identifies and merges users across devices and sessions based on $user_id and $device_id. Compare historical data with expected outcomes under Simplified ID Merge logic.
- Missing Data: Check for instances where $user_id and $device_id are missing or incorrectly mapped during the merge process.

  


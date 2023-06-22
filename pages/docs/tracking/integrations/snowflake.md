# Snowflake


> ❗Note: This connector is currently in a closed beta. If you’d like access, please sign up via [this form](https://forms.gle/PctmA2fZvwdpCRGY6).

This document will walk you through step-by-step instructions to get your snowflake connector up and running.

### IP Allowed List

---

If you are using [Snowflake Network policy](https://docs.snowflake.com/en/user-guide/network-policies) to restrict access to your instance, you might need to add the following IP addresses to the Allowed list.

```jsx
34.31.112.201
34.147.68.192
35.184.21.33
35.225.176.74
35.204.164.122
35.204.177.251
```

### Connect to your Warehouse

---

To connect to your warehouse, complete the following steps.

1. Navigate to **Project Settings**, then select **Warehouse Sources**.
2. Click on `+ Add Connection` and select **Snowflake**.
3. You should see a new page to create your snowflake connector. In the first view, fill out the following fields before clicking  `Next`: 
    - Snowflake Account Name / URL
    - Username
    - Role
    - Authentication Type (we support authentication via Password & Key Pair) 
    Ensure that the corresponding commands have been successfully completed in your Snowflake instance.
        - For Password authentication:
            - Fill out the password field.
            - Copy the commands and run them within your Snowflake instance.
            - Be sure to fill out the password field in your command.
        - For Key Pair authentication:
            - Mixpanel will generate a secure key pair for your source per the Snowflake requirements.
            - The private key will be encrypted and stored securely, and used only when we need to communicate with your Snowflake instance.
            - Public key can be found in the suggested SQL to create your user.

1. In the second view, you can click `Create Source` after completing the following:
    - Warehouse
        - Enter the name of your warehouse (default value: **MIXPANEL_IMPORT_WAREHOUSE**).
        - It is best practice to create a separate warehouse for Mixpanel and ensure that the roles have access to the warehouse.
        - Run the commands below in Snowflake.
            
            ```jsx
            CREATE WAREHOUSE MIXPANEL_IMPORT_WAREHOUSE WITH WAREHOUSE_SIZE = XSMALL AUTO_SUSPEND = 60 AUTO_RESUME = TRUE INITIALLY_SUSPENDED = FALSE;
            GRANT USAGE ON WAREHOUSE MIXPANEL_IMPORT_WAREHOUSE TO ROLE MIXPANEL_IMPORT_ROLE;
            GRANT OPERATE ON WAREHOUSE MIXPANEL_IMPORT_WAREHOUSE TO ROLE MIXPANEL_IMPORT_ROLE;
            GRANT MONITOR ON WAREHOUSE MIXPANEL_IMPORT_WAREHOUSE TO ROLE MIXPANEL_IMPORT_ROLE; 
            ```
            
    - Storage Integration
        - This is required because Mixpanel will export the query results into a GCS bucket.
        - default value: **MIXPANEL_IMPORT_STORAGE_INTEGRATION**
        
        ```jsx
        CREATE STORAGE INTEGRATION MIXPANEL_IMPORT_STORAGE_INTEGRATION
          TYPE = EXTERNAL_STAGE
          STORAGE_PROVIDER = 'GCS'
          ENABLED = TRUE
          STORAGE_ALLOWED_LOCATIONS = ("gcs://mixpanel-2946576-ca470bce1e1ed2ec");
        GRANT USAGE ON INTEGRATION MIXPANEL_IMPORT_STORAGE_INTEGRATION TO MIXPANEL_IMPORT_ROLE; 
        ```
        
    - Database
        - This is an optional step.
        - Enter the name of the database you want to grant permission to.
        - by default we request read only access
        - Mixpanel does not store the access information. However, you can choose to provide more granular access if desired.
        
        ```jsx
        GRANT USAGE ON DATABASE "<your_data_base>" TO ROLE MIXPANEL_IMPORT_ROLE;
        GRANT USAGE ON ALL SCHEMAS IN DATABASE "<your_data_base>" TO ROLE MIXPANEL_IMPORT_ROLE;
        GRANT SELECT ON ALL TABLES IN DATABASE "<your_data_base>" TO ROLE MIXPANEL_IMPORT_ROLE;
        GRANT SELECT ON ALL VIEWS IN DATABASE "<your_data_base>" TO ROLE MIXPANEL_IMPORT_ROLE;
        ```
        

## Data format guidelines


To import data from a warehouse directly, make sure the tables are formatted properly.

Each column in the table will be mapped as property on the event. 

Read more about best practices for tracking Events and Properties in Mixpanel [here](https://docs.mixpanel.com/docs/tracking/how-tos/events-and-properties). 

**The following columns are required:** 

- Event Time
- Distinct ID
- Insert ID
    - This is an optional field, but we recommend it as a best practice.
- Insert Time
    - We expect this to be a monotonically increasing TIMESTAMP_NTZ. We use this as a water mark to figure out which events are new and ingest them.
- Event Name
    - You can specify the column which has this value.
    - Alternatively, you can specify a static value during creation.

## **Ingest Events**


Once you have created a warehouse source, follow the below steps to send events into Mixpanel.

1. Go to Project Settings > Warehouse Data.
2. Click on + Add Warehouse Event.
3. Select the source from the dropdown (e.g. Snowflake, BigQuery).
4. Select the database and schema.
5. Select the table.
6. Specify the Event Name:
    - You can specify the column which has the event name.
    - **OR** You can specify the event name for all the events.
7. Specify the Event Time:
    - This is the time the event occurred.
8. Select the columns which have the following identifiers:
    - Distinct ID.
    - Insert ID.
9. Check the preview to ensure that everything looks correct, and then create the event.

Note: Properties with (null) in a column will not be tracked with Events.

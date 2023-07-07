# BigQuery

> ❗Note: This connector is currently in a closed beta. If you’d like access, please sign up via [this form](https://forms.gle/PctmA2fZvwdpCRGY6).

This document will walk you through step-by-step instructions to get your BigQuery connector up and running.

## Connect to your Warehouse

To connect to your warehouse, complete the following steps.

1. Navigate to **Project Settings**, then select **Warehouse Sources**.
2. Click on `+ Add Connection` and select BigQuery.
3. You should see a new page to create your bigquery connector. In the first view, fill out the required field **GCP Project ID** 
    - Run the commands below in Cloud shell & click  `Create Source`
    
    ```jsx
    gcloud projects add-iam-policy-binding <your_gcp_project_id> \
    --member serviceAccount:project-2946576@mixpanel-warehouse-1.iam.gserviceaccount.com \
    --role roles/bigquery.dataViewer
    gcloud projects add-iam-policy-binding <your_gcp_project_id> \
    --member serviceAccount:project-2946576@mixpanel-warehouse-1.iam.gserviceaccount.com \
    --role roles/bigquery.jobUser
    ```
    
4. In the second view, you should see that the credentials are validated and a source is added 


## Data format guidelines


To import data from a warehouse directly, make sure the tables are formatted properly.

Each column in the table will be mapped as property on the event. 

ℹ️ For a full list of event properties, please refer to [Events & Properties](https://docs.mixpanel.com/docs/tracking/reference/default-properties#event-properties)

**The following columns are required:** 

- Event Name
    - You can specify the column which has this value.
    - Alternatively, you can specify a static value during creation if every row is a unique instance of the same event.
- Event Time
    - the time the event occurred
- Distinct ID
    - unique identifier of the entity performing the event. usually a userID
- Insert Time
    - We expect this to be a monotonically increasing number, and usually is the timestamp of when the row was added to the table. We use this as a water mark to figure out which events are new and ingest them.
- Insert ID
    - This is an optional field, but we recommend it as a best practice. It’s used to deduplicate events that are accidentally sent multiple times.

## Ingest Events

Once you have created a warehouse source, follow the below steps to send events into Mixpanel.

1. Go to Project Settings > Warehouse Data.
2. Click on + Add Warehouse Event.
3. Select the **BigQuery** as source from the dropdown.
4. Select the Dataset.
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

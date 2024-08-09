# Google Cloud Storage

Mixpanel supports exporting events and people data directly to Google Cloud Storage (GCS) via [Json Pipelines](/docs/json-pipelines/overview).

## Setting GCS Permissions

To facilitate data export to Google Cloud Storage, proper permissions need to be configured to allow Mixpanel access to your GCS bucket.

1. Assign Roles to Service Account on Bucket

    You must grant the `Storage Object Admin` role to the service account `export-upload@mixpanel-prod-1.iam.gserviceaccount.com` for the bucket you are creating or intend to reuse. This role allows Mixpanel to manage storage objects on your behalf.

    To assign this role:

    - Navigate to the **Cloud Storage** in your Google Cloud Console and select the GCS bucket you have created or plan to reuse
    - Click on the **PERMISSIONS** tab and select **GRANT ACCESS**
    - In the new principals field, add `export-upload@mixpanel-prod-1.iam.gserviceaccount.com` and then select `Storage Object Admin` from the role dropdown menu
    - Confirm the assignment by clicking the **SAVE** button.

    This process ensures that the specified service account has the necessary permissions to efficiently manage and handle the data exported to your GCS bucket.

2. Provide Mixpanel with GCS Details

    When setting up your json pipeline in Mixpanel, you will need to provide the following details to ensure Mixpanel can accurately direct the data exports to your GCS:

    - Bucket: The GCS bucket to export Mixpanel data to
    - Region: The GCS region for the bucket

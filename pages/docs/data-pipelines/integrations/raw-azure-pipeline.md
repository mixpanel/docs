# Raw Azure Pipeline

To set up a raw export pipeline to Azure Blob Storage from Mixpanel, you must first give Mixpanel permission to write to Azure. Next you can [create a pipeline](https://developer.mixpanel.com/reference/create-warehouse-pipeline) to export the data. Mixpanel then uploads the data to Azure Blob Storage on a recurring basis.

The following document summarizes the steps to configure Azure permissions so that it accepts the Mixpanel export, and provides an example request to create the pipeline.

## Edit Mixpanel Permission

Since the Azure authentication mechanisms do not allow for cross-account access, you must provide  Azure credentials to use with their Blob storage container. 

To achieve this, Mixpanel uses Service Principals created in your Azure Active Directory deployment. To create a Service Principal,  use the Azure command line tool and run the following command (with redacted output):

```shell
$ az ad sp create-for-rbac --sdk-auth          
{
  "clientId": "redacted",
  "clientSecret": "redacted",
  "subscriptionId": "redacted",
  "tenantId": "redacted",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```



If the above step is successful, go to the Azure. Navigate to a blob storage container of your choice and assign the “Storage Blob Data Contributor” to the Service Principal from above.

Mixpanel needs the clientId, clientSecret, and tenantId to access the blob container as the Service Principal. You must provide the blob account name, container name, and (optional) path prefix you want to choose for the export.

You can share the Service Principal’s credentials over the TLS encrypted API at the time that you create your Mixpanel to Azure pipeline.

## Use the Data Pipelines API

After permissions have been granted, use the [Data Pipelines API](https://developer.mixpanel.com/reference/create-warehouse-pipeline) to create the pipeline. Here is an example request:

```curl cURL
curl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \
-u API-SECRET: \
--data type="azure-raw" \
--data from_date="2021-02-02" \
--data storage_account="test-storage-account" \
--data container_name="test-container-name" \
--data client_id="test-client-id" \
--data client_secret="test-secret" \
--data tenant_id="test-tenant-id"
```

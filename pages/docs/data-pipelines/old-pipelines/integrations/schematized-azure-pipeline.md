# Schematized Azure Pipeline

Mixpanel’s Azure Blob Export is one type of [Schematized Export Pipeline](/docs/data-pipelines/old-pipelines/schematized-export-pipeline) that exports Mixpanel events and people data and imports them into an Azure Blob storage instance. 

Azure Export enables the use of SQL to query your event data, either for expressing new types of queries or for joining against other data already present in your data environment.

## Integration Set Up

In order to export data to Azure Blob Storage, you must first give Mixpanel permission to write to Azure. Next you can [create a pipeline](https://developer.mixpanel.com/reference/create-warehouse-pipeline) to export the data. Mixpanel then uploads the data to Azure Blob Storage on a recurring basis. The data is a slightly transformed version of the raw data stored in Mixpanel. Please see [transformation rules](/docs/data-pipelines/old-pipelines/schematized-export-pipeline#transformation-rules) to understand how the data is transformed.

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

Mixpanel needs the `clientId`, `clientSecret`, and `tenantId` to access the blob container as the Service Principal. You must provide the blob account name, container name, and (optional) path prefix you want to choose for the export.

You can share the Service Principal’s credentials over the TLS encrypted API at the time that you create your Mixpanel to Azure pipeline.

---
title: "Schematized: Azure Blob Storage"
slug: "azure-blob-storage"
hidden: false
createdAt: "2019-11-04T17:57:57.887Z"
updatedAt: "2023-03-26T19:17:00.979Z"
---
Mixpanel’s Azure Blob Export is one type of [Schematized Export Pipeline](doc:schematized-export-pipeline) that exports Mixpanel events and people data and imports them into an Azure Blob storage instance. 

Azure Export enables the use of SQL to query your event data, either for expressing new types of queries or for joining against other data already present in your data environment.

### Integration Set Up
In order to export data to Azure Blob Storage, you must first give Mixpanel permission to write to Azure. Next you can [create a pipeline](ref:create-warehouse-pipeline) to export the data. Mixpanel then uploads the data to Azure Blob Storage on a recurring basis. The data is a slightly transformed version of the raw data stored in Mixpanel. Please see [transformation rules](doc:schematized-export-pipeline#transformation-rules) to understand how the data is transformed.
[block:api-header]
{
  "title": "Edit Mixpanel Permission"
}
[/block]
Since the Azure authentication mechanisms do not allow for cross-account access, you must provide  Azure credentials to use with their Blob storage container. 

To achieve this, Mixpanel uses Service Principals created in your Azure Active Directory deployment. To create a Service Principal,  use the Azure command line tool and run the following command (with redacted output):
[block:code]
{
  "codes": [
    {
      "code": "$ az ad sp create-for-rbac --sdk-auth          \n{\n  \"clientId\": \"redacted\",\n  \"clientSecret\": \"redacted\",\n  \"subscriptionId\": \"redacted\",\n  \"tenantId\": \"redacted\",\n  \"activeDirectoryEndpointUrl\": \"https://login.microsoftonline.com\",\n  \"resourceManagerEndpointUrl\": \"https://management.azure.com/\",\n  \"activeDirectoryGraphResourceId\": \"https://graph.windows.net/\",\n  \"sqlManagementEndpointUrl\": \"https://management.core.windows.net:8443/\",\n  \"galleryEndpointUrl\": \"https://gallery.azure.com/\",\n  \"managementEndpointUrl\": \"https://management.core.windows.net/\"\n}\n",
      "language": "shell"
    }
  ]
}
[/block]
If the above step is successful, go to the Azure. Navigate to a blob storage container of your choice and assign the “Storage Blob Data Contributor” to the Service Principal from above.

Mixpanel needs the `clientId`, `clientSecret`, and `tenantId` to access the blob container as the Service Principal. You must provide the blob account name, container name, and (optional) path prefix you want to choose for the export.

You can share the Service Principal’s credentials over the TLS encrypted API at the time that you create your Mixpanel to Azure pipeline.
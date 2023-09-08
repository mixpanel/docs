---
title: "Raw: Azure Blob Storage"
slug: "azure-raw-pipeline"
hidden: false
createdAt: "2021-11-10T00:28:01.198Z"
updatedAt: "2023-03-26T19:17:41.742Z"
---
To set up a raw export pipeline to Azure Blob Storage from Mixpanel, you must first give Mixpanel permission to write to Azure. Next you can [create a pipeline](ref:create-warehouse-pipeline) to export the data. Mixpanel then uploads the data to Azure Blob Storage on a recurring basis.

The following document summarizes the steps to configure Azure permissions so that it accepts the Mixpanel export, and provides an example request to create the pipeline.
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
      "code": "$ az ad sp create-for-rbac --sdk-auth          \n{\n  \"clientId\": \"redacted\",\n  \"clientSecret\": \"redacted\",\n  \"subscriptionId\": \"redacted\",\n  \"tenantId\": \"redacted\",\n  \"activeDirectoryEndpointUrl\": \"https://login.microsoftonline.com\",\n  \"resourceManagerEndpointUrl\": \"https://management.azure.com/\",\n  \"activeDirectoryGraphResourceId\": \"https://graph.windows.net/\",\n  \"sqlManagementEndpointUrl\": \"https://management.core.windows.net:8443/\",\n  \"galleryEndpointUrl\": \"https://gallery.azure.com/\",\n  \"managementEndpointUrl\": \"https://management.core.windows.net/\"\n}",
      "language": "shell",
      "name": null
    }
  ]
}
[/block]
If the above step is successful, go to the Azure. Navigate to a blob storage container of your choice and assign the “Storage Blob Data Contributor” to the Service Principal from above.

Mixpanel needs the clientId, clientSecret, and tenantId to access the blob container as the Service Principal. You must provide the blob account name, container name, and (optional) path prefix you want to choose for the export.

You can share the Service Principal’s credentials over the TLS encrypted API at the time that you create your Mixpanel to Azure pipeline.
[block:api-header]
{
  "title": "Use the Data Pipelines API"
}
[/block]
After permissions have been granted, use the [Data Pipelines API](ref:create-warehouse-pipeline) to create the pipeline. Here is an example request:
[block:code]
{
  "codes": [
    {
      "code": "curl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \\\n-u API-SECRET: \\\n--data type=\"azure-raw\" \\\n--data from_date=\"2021-02-02\" \\\n--data storage_account=\"test-storage-account\" \\\n--data container_name=\"test-container-name\" \\\n--data client_id=\"test-client-id\" \\\n--data client_secret=\"test-secret\" \\\n--data tenant_id=\"test-tenant-id\"",
      "language": "curl",
      "name": "cURL"
    }
  ]
}
[/block]
# Azure Blob Storage

Mixpanel allows you to export events and people data directly into an Azure Blob Storage instance through [Json Pipelines](/docs/data-pipelines).

## Setting Blob Storage Permissions

To enable Mixpanel to write data to your Azure Blob Storage, specific permissions need to be set up because Azure authentication mechanisms do not support cross-account access. You will need to provide Mixpanel with Azure credentials linked to your Blob Storage container.

### Step 1: Create a Service Principal

Start by creating a **_Service Principal_** in your Azure Active Directory. This can be done using the Azure CLI with the following command (with `"redacted"` output). This command generates credentials in JSON format. Ensure you securely handle the output as it contains sensitive information.

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

### Step 2: Assign Role to Service Principal

Next, navigate to the Blob Storage container you wish to use, and assign the `"Storage Blob Data Contributor"` role to the newly created Service Principal.

### Step 3: Provide Mixpanel with Access Details

Refer to [Step 2: Creating the Pipeline](/docs/data-pipelines/#step-2-creating-the-pipeline) to create data pipeline via UI. You need to provide specific details to enable authentication and data export to Azure Blob Storage. For authentication, supply the `Client Id`, `Client Secret`, and `Tenant Id`. These credentials are crucial for Mixpanel to operate as the Service Principal and ensure secure authentication without exposing broader Azure resources.

Additionally, to define the export destination, you must provide the `Storage Account` and `Container Name`. These details identify the exact location within Azure where your data will be exported.

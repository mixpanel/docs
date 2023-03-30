---
title: "Raw: Amazon S3"
slug: "aws-raw-pipeline"
hidden: false
metadata: 
  title: "Raw Export Pipeline: Amazon S3 | Mixpanel Developer Docs"
  description: "Learn to set up a raw export pipeline to an S3 bucket from Mixpanel by configuring S3 to receive the exported data then create a pipeline to export the data."
createdAt: "2019-08-13T16:33:47.964Z"
updatedAt: "2023-03-26T19:17:33.098Z"
---
To set up a raw export pipeline to an S3 bucket from Mixpanel, you must configure S3 to receive the exported data, then [create a pipeline](ref:create-warehouse-pipeline) to export the data.

The following document summarizes the steps to edit S3 bucket permissions so that it accepts the Mixpanel export. Consult [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html) for any AWS specific tasks, such as creating an [S3 bucket](http://google.com) and editing [permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html).

To prepare S3 for the incoming data you must:
1. Create an S3 bucket.
2. Give Mixpanel the required permissions to write to the bucket. 
[block:api-header]
{
  "title": "S3 Bucket Permissions"
}
[/block]
Mixpanel supports a wide range of configurations to secure and manage your data on S3. To access resources, the pipeline uses AWS cross-account roles.

This section highlights the permissions you must give Mixpanel depending on the configuration of the target S3 bucket.  

##Data Modification Policy
All exports from Mixpanel to AWS require that you create a new data modification policy, or add the following permissions to an existing data modification policy.

Replacing ```<BUCKET_NAME>``` and ```<SID>``` with your bucket name and chosen sid before inserting this JSON:
[block:code]
{
  "codes": [
    {
      "code": "{\n    \"Version\": \"VERSION\",\n    \"Statement\": [\n        {\n            \"Sid\": \"<SID>\",\n            \"Effect\": \"Allow\",\n            \"Action\": [\n                \"s3:PutObject\",\n                \"s3:GetObject\",\n                \"s3:ListBucket\",\n                \"s3:DeleteObject\"\n            ],\n            \"Resource\": [\n                \"arn:aws:s3:::<BUCKET-NAME>\",\n                \"arn:aws:s3:::<BUCKET-NAME>/*\"\n            ]\n        }\n    ]\n}",
      "language": "json",
      "name": "JSON Example with Variables"
    }
  ]
}
[/block]
##Server-Side Encryption
Mixpanel always sends data to your S3 bucket on a TLS encrypted connection. To secure your data at rest on S3, you can enable [Server-Side Encryption (SSE)](https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html).  

There are two options when using SSE: Encryption with Amazon S3-Managed Keys (SSE-S3) and Encryption with AWS KMS-Managed Keys (SSE-KMS)

###Encryption with Amazon S3-Managed Keys (SSE-S3)
This setting on your bucket encrypts data at rest using the AES-256 algorithm that uses keys managed by S3.

If you are using this type of SSE, you only need to configure your pipeline by passing the ```s3_encryption=aes``` parameter when calling the Mixpanel Data Warehouse Export API. See [AWS S3 and Glue Parameters](ref:create-pipelines).

###Encryption with AWS KMS-Managed Keys (SSE-KMS)

For S3 buckets, you can pick a default key named ```aws/s3```. If you opt to use the default key you need to configure your pipeline by passing ```s3_encryption=kms```  and ```s3_kms_key_id=<aws managed default CMK>```  when calling the Mixpanel Data Warehouse Export API or you can choose to use your own custom keys for encrypting the contents of your bucket

In either case you will need to allow Mixpanel to use the key to encrypt the data properly as it is written to your bucket.

To achieve this, create an IAM policy that gives permission to Mixpanel to use the KMS key. Use the following JSON snippet and replace ``<KEY_ARN>`` and ``<SID>`` with your custom key's (or aws managed default CMK's) ARN and chosen sid: 
[block:code]
{
  "codes": [
    {
      "code": "{\n    \"Version\": \"VALUE\",\n    \"Statement\": [\n        {\n            \"Sid\": \"<SID>\",\n            \"Effect\": \"Allow\",\n            \"Action\": [\n                \"kms:Decrypt\",\n                \"kms:Encrypt\",\n                \"kms:GenerateDataKey\",\n                \"kms:ReEncryptTo\",\n                \"kms:GenerateDataKeyWithoutPlaintext\",\n                \"kms:DescribeKey\",\n                \"kms:ReEncryptFrom\"\n            ],\n            \"Resource\": \"<KEY-ARN>\"\n        }\n    ]\n}",
      "language": "json",
      "name": "JSON Example with Variables"
    }
  ]
}
[/block]
You must configure your pipeline by passing ```s3_encryption=kms``` and ```s3_kms_key_id=<KEY_ARN>``` when calling the Mixpanel Data Warehouse Export API. 

##S3 Access Role
After creating the policies in the sections above, you must create a cross account IAM Role to assign the policies to the role.
  *   Go to the *AWS IAM *service on the console.
  *   Click **Roles** in the sidebar.
  *   Click **Create Role**.
  *   Select **Other AWS Accounts **on the trust policy page and enter "485438090326" for the account ID.
  *   In the *Permissions* page, find and select the policies you created above.
  *   In the *Review *page, enter a name and description for the role and click **Save**.

Next, limit the trust relationship to the Mixpanel export user to ensure only Mixpanel has the ability to assume this specific role.
  *   Navigate to the *AWS IAM* service in the console.
  *   Click **Roles** in the sidebar.
  *   Find and click the role you just created.
  *   Navigate to the *Trust Relationships* tab.
  *   Click **Edit trust relationship**.
  *   Replace the contents with the following JSON: 
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Principal\": {\n        \"AWS\": \"arn:aws:iam::485438090326:user/mixpanel-export\"\n      },\n      \"Action\": \"sts:AssumeRole\",\n      \"Condition\": {}\n    }\n  ]\n}",
      "language": "json"
    }
  ]
}
[/block]
## Using AWS External ID 
Amazon introduced the use of external id for cross-account access because of [the confused deputy problem](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html). As Mixpanel uses cross account access to export data, you can make use of this feature to make the data transfer more secure. 

Mixpanel uses your project token as external ID when talking to AWS. In order to enable this, you simply need to edit the trust relationship you created as part of the previous step and add a condition to check the passed external id is in fact your Mixpanel project token. So, the final JSON for your trust relationship would be:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Principal\": {\n        \"AWS\": \"arn:aws:iam::485438090326:user/mixpanel-export\"\n      },\n      \"Action\": \"sts:AssumeRole\",\n      \"Condition\": {\n        \"StringEquals\": {\n          \"sts:ExternalId\": \"<MIXPANEL_PROJECT_TOKEN>\"\n        }\n      }\n    }\n  ]\n}",
      "language": "json"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Use The Data Pipelines API"
}
[/block]
After permissions have been granted, use the [Data Pipelines API](ref:create-warehouse-pipeline) to create the pipeline. Here is an example request:
[block:code]
{
  "codes": [
    {
      "code": "curl https://data.mixpanel.com/api/2.0/nessie/pipeline/create \\\n-u API_SECRET: \\\n-d type=\"s3-raw\" \\\n-d from_date=\"2019-08-10\" \\\n-d s3_bucket=\"example-s3-export\" \\\n-d s3_region=\"us-west-2\" \\\n-d s3_prefix=\"test\" \\\n-d s3_role=\"arn:aws:iam::<account-id>:role/example-s3-role\" \\\n-d s3_encryption=\"aes\" \\",
      "language": "curl",
      "name": "cURL Example with Values"
    }
  ]
}
[/block]
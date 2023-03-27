---
title: "Schematized: Amazon Web Services"
slug: "mixpanel-amazon-s3-export"
hidden: false
metadata: 
  title: "Schematized Export Pipeline: AWS | Mixpanel Developer Docs"
  description: "AWS S3 is a Schematized Export Pipeline that exports Mixpanel data directly into an S3 bucket. Learn how to configure AWS and Mixpanel here."
createdAt: "2019-01-25T17:27:54.264Z"
updatedAt: "2023-03-26T19:16:30.791Z"
---
Mixpanel's [Schematized Export Pipeline](doc:schematized-export-pipeline) lets you export your Mixpanel data directly into an S3 bucket, allowing the use of Glue to query it. To set up the Mixpanel AWS pipeline, you must configure AWS to receive the exported data, then [create a pipeline](ref:create-warehouse-pipeline) to export the data.
[block:api-header]
{
  "title": "Design"
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ab7c226-latest-AWS-process.png",
        "latest-AWS-process.png",
        900,
        266,
        "#f5f5f5"
      ]
    }
  ]
}
[/block]
Mixpanel applies [transformation rules](doc:schematized-export-pipeline#transformation-rules) to make the data compatible with data warehouses and then transfers the transformed data to your S3 bucket. You can then choose to use a glue crawler to create the schema out of the transformed data or let Mixpanel to directly create the schema in your glue database. Having the data and the glue schema in place, you can use SQL with multiple AWS products, including [Amazon Athena](https://aws.amazon.com/athena/) and [Redshift Spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html), to query the imported data. 

We recommend the use of [Spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html) and [Glue](https://aws.amazon.com/glue/) to query the imported data. 
[block:api-header]
{
  "title": "Exporting Mixpanel Data to Redshift Spectrum"
}
[/block]
The following summarizes the steps to export Mixpanel data to an S3 bucket. Consult [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html) for AWS specific tasks, such as creating an [S3 bucket](http://google.com) and [permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html).

To prepare S3 for the incoming data:
1. Create a S3 bucket.
2. Give Mixpanel the required permissions to write to the bucket. 
3. Configure Glue as shown below.

### S3 Bucket Permissions

Mixpanel supports a wide range of configurations to secure and manage your data on S3. To access resources, the pipeline uses AWS cross-account roles.

This section highlights the permissions you must give Mixpanel depending on the configuration of the target S3 bucket.  

### Data Modification Policy
All exports from Mixpanel to AWS require that you create a new data modification policy, or add the following permissions to an existing data modification policy.

Replacing ```<BUCKET_NAME>``` with your bucket name before inserting this JSON:
[block:code]
{
  "codes": [
    {
      "code": "{\n    \"Version\": \"2012-10-17\",\n    \"Statement\": [\n        {\n            \"Sid\": \"SomeSidYouChoose\",\n            \"Effect\": \"Allow\",\n            \"Action\": [\n                \"s3:PutObject\",\n                \"s3:GetObject\",\n                \"s3:ListBucket\",\n                \"s3:DeleteObject\"\n            ],\n            \"Resource\": [\n                \"arn:aws:s3:::<BUCKET_NAME>\",\n                \"arn:aws:s3:::<BUCKET_NAME>/*\"\n            ]\n        }\n    ]\n}\n",
      "language": "json"
    }
  ]
}
[/block]
### Server-Side Encryption
Mixpanel always sends data to your S3 bucket on a TLS encrypted connection. To secure your data at rest on S3, you can enable [Server-Side Encryption (SSE)](https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html).  

There are two options when using SSE: Encryption with Amazon S3-Managed Keys (SSE-S3) and Encryption with AWS KMS-Managed Keys (SSE-KMS)

#### Encryption with Amazon S3-Managed Keys (SSE-S3)
This setting on your bucket encrypts data at rest using the AES-256 algorithm that uses keys managed by S3.

If you are using this type of SSE, you only need to configure your pipeline by passing the ```s3_encryption=aes```  parameter  when calling the Mixpanel Data Pipelines API. See [AWS S3 and Glue Parameters](ref:create-pipelines).

#### Encryption with AWS KMS-Managed Keys (SSE-KMS)
You have a choice of keys if you use the Key Management Service (KMS).

For S3 buckets, you can pick a default key named ```aws/s3```. If you opt to use the default key you don’t need any further configuration on AWS, and only need to configure your pipeline by passing ```s3_encryption=kms``` when calling the Mixpanel Data Pipelines API.

If you choose to use your own custom keys for encrypting the contents of your bucket, you will need to allow Mixpanel to use the key to encrypt the data properly as it is written to your bucket.

To achieve this, create an IAM policy that gives permission to Mixpanel to use the KMS key. Use the following JSON snippet and replace ``<KEY_ARN>`` with your custom key’s ARN: 
[block:code]
{
  "codes": [
    {
      "code": "{\n    \"Version\": \"2012-10-17\",\n    \"Statement\": [\n        {\n            \"Sid\": \"SomeSidYouChooseAgain\",\n            \"Effect\": \"Allow\",\n            \"Action\": [\n                \"kms:Decrypt\",\n                \"kms:Encrypt\",\n                \"kms:GenerateDataKey\",\n                \"kms:ReEncryptTo\",\n                \"kms:GenerateDataKeyWithoutPlaintext\",\n                \"kms:DescribeKey\",\n                \"kms:ReEncryptFrom\"\n            ],\n            \"Resource\": \"<KEY_ARN>\"\n        }\n    ]\n}\n",
      "language": "json"
    }
  ]
}
[/block]
You must configure your pipeline by passing ```s3_encryption=kms``` and ```s3_kms_key_id=<KEY_ARN>``` when calling the Mixpanel Data Pipelines API. 

### S3 Access Role
After creating the policies in the sections above, you must create a cross account IAM Role to assign the policies to the role.
  *   Go to the *AWS IAM *service on the console.
  *   Click **Roles** in the sidebar.
  *   Click **Create Role**.
  *   Select **Other AWS Accounts **on the trust policy page and enter "485438090326" for the account ID.
  *   In the *Permissions* page, find and select the policies you created above.
  *   In the *Review *page, enter a name and description for the role and click **Create Role**.

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
      "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Principal\": {\n        \"AWS\": \"arn:aws:iam::485438090326:user/mixpanel-export\"\n      },\n      \"Action\": \"sts:AssumeRole\",\n      \"Condition\": {}\n    }\n  ]\n}\n",
      "language": "json"
    }
  ]
}
[/block]
### Using AWS External ID 
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
### Glue Configurations

[Glue](https://aws.amazon.com/glue/) offers a data catalog service that will facilitate access to the S3 data from other services on your AWS account.

This section describes how to connect Glue to the exported data in S3. You can select either of the  following options:
  * Configure Glue for Mixpanel direct export (recommended)
  * Configure Glue to use crawlers.
[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "If you use Athena with Glue and want to enable partitioning, you must choose **parquet** as the data_format for your pipeline."
}
[/block]
#### Configuring Glue for Mixpanel Direct Export 

Mixpanel can write and update a schema in your Glue instance as soon as new data is available. To get more information about the table schemas, please see [Schema](doc:schematized-export-pipeline#schema). To set this up:

1. Create a Glue database. 
  * In the AWS console, go to "Glue". (Make sure you are in the same region as your S3 exported data).
  * Click **Databases** in the sidebar.
  * Click **Add Database**.
  * Enter a database name and click **Create**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/da30142-add-database-S3.png",
        "add-database-S3.png",
        1600,
        498,
        "#9fa1a2"
      ]
    }
  ]
}
[/block]
2. Create an IAM policy.
  * Go to the "AWS IAM" service on the console.
  * Click **Policies** in the sidebar.
  * Click **Create Policy** on the top of the screen.
  * In the new screen, click the **JSON ** tab.
  * Paste the following policy:
[block:code]
{
  "codes": [
    {
      "code": "{\n    \"Version\": \"2012-10-17\",\n    \"Statement\": [\n        {\n            \"Sid\": \"MixpanelGlueAccessStatement\",\n            \"Effect\": \"Allow\",\n            \"Action\": [\n                \"glue:GetDatabase\",\n                \"glue:CreateTable\",\n                \"glue:GetTables\",\n                \"glue:GetTableVersions\",\n                \"glue:UpdateTable\",\n                \"glue:DeleteTable\",\n                \"glue:GetTable\"\n            ],\n            \"Resource\": \"*\"\n        }\n    ]\n}",
      "language": "json"
    }
  ]
}
[/block]
* Click **Review Policy** and give the policy a name in the next screen.
* Click **Create Policy **to save.
[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "AWS does not support granular resources when granting Glue access. So you will have to use ***** (asterisk) in the Resources field until AWS can support more granular resources."
}
[/block]
3. Create an IAM Role and assign the Policy you created in Step 2.
  * Go to the "AWS IAM" service on the console.
  * Click **Roles** in the sidebar.
  * Click **Create Role**.
  * Select **Other AWS Accounts** on the trust policy page and enter "485438090326" for the account ID.
  * In the "Permissions" page, find and select the policy you created in Step 2.
  * In the Review page, enter a name and description for the role and click **Create Role**.

4. Limit the trust relationship to the Mixpanel export user.
  * Navigate to the "AWS IAM" service in the console.
  * Click **Roles** in the sidebar.
  * Find and click the role you created in Step 3.
  * Navigate to the "Trust Relationships" tab.
  * Click **Edit trust relationship**.
  * Replace the contents with the following JSON:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Principal\": {\n        \"AWS\": \"arn:aws:iam::485438090326:user/mixpanel-export\"\n      },\n      \"Action\": \"sts:AssumeRole\",\n      \"Condition\": {}\n    }\n  ]\n}\n",
      "language": "json"
    }
  ]
}
[/block]
  * Save the contents. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b82a800-ARN.png",
        "ARN.png",
        512,
        154,
        "#f8f8f8"
      ]
    }
  ]
}
[/block]
#### Configuring Table Partitions in Glue
Mixpanel partitions the Glue table by default if it has the proper AWS permissions. The partition key type and name are `string` and `mp_date` respectively and the partition values are dates in the project timezone e.g. `2021-02-03`. To enable partitioning in Glue, the Glue Data Modification Policy must include the following actions:
[block:code]
{
  "codes": [
    {
      "code": "\"glue:GetPartition\",\n\"glue:CreatePartition\",\n\"glue:DeletePartition\",\n\"glue:UpdatePartition\",\n\"glue:BatchCreatePartition\",\n\"glue:GetPartitions\",\n\"glue:BatchDeletePartition\",\n\"glue:BatchGetPartition\"",
      "language": "json"
    }
  ]
}
[/block]
#### Configuring Glue to Use Crawlers

You can configure Glue to crawl the S3 bucket with Mixpanel data. Glue crawlers are convenient because they automatically extract the schema from the data files and update the Glue schema. 

This convenience, however, can also pose issues, such as:
* The run time of the crawlers could be out of sync with Mixpanel’s export schedule. As a result, it can prevent you from using your data as soon as new properties are available. 
* The time column is interpreted as an integer. As a result, it is more difficult to perform timestamp operations. 
* When using the one table per event schema option, Glue crawlers can merge data from multiple events in one table based on similarity.

To avoid these issues, Mixpanel can write and update a schema in your Glue instance as soon as new data is available. Follow [these instructions](doc:mixpanel-amazon-s3-export#section-configuring-glue-for-mixpanel-direct-export) to enable Mixpanel to write your data catalog to AWS Glue.

To use crawlers, you must point the crawler to the top level folder with your Mixpanel project ID. 

For more details to configure Glue to use crawlers, see [Cataloging Tables with a Crawler](https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html).

### Setting up Redshift

When the data catalog and table definitions are available in Glue through either of the aforementioned means, you can connect your Redshift cluster to the catalog and query it from Redshift. [AWS documentation](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html) walks through the process in detail. 

The following is an overview of the process. To properly configure Redshift:
1. Create an IAM role with read access to Glue and the S3 bucket containing your Mixpanel data.
2. Assign that role to your Redshift cluster.
3. After you insert your role and the database name in the following SQL query, run it as cluster admin:
[block:code]
{
  "codes": [
    {
      "code": "CREATE EXTERNAL SCHEMA mixpanel FROM DATA CATALOG \nDATABASE '<YOUR_GLUE_DATABASE_NAME>' -- defined when you configured Glue\nIAM_ROLE '<YOUR_ROLE_ARN>' -- this is the ARN for the role with access to Glue+S3\nCREATE EXTERNAL DATABASE IF NOT EXISTS;",
      "language": "sql"
    }
  ]
}
[/block]
You only need to connect Redshift to Glue once. As the Mixpanel pipeline exports more data to your bucket and Glue catalog, you will automatically have access to all the new data and schema changes. 

You can also join data stored in Redshift with Mixpanel data available in S3 through the external schema.
[block:api-header]
{
  "title": "Queries"
}
[/block]
You can query data with a single table schema or with a multiple table schema in Redshift Spectrum. To get more information about the table schemas, please see [Schema](doc:schematized-export-pipeline#schema).

To query a single table schema, use this snippet.
[block:code]
{
  "codes": [
    {
      "code": "SELECT count(*)\nFROM mixpanel.mp_master_event\nWHERE mp_event_name = “<CLEANED_EVENT_NAME>”",
      "language": "sql"
    }
  ]
}
[/block]
To query a multiple table schema, use this snippet.
[block:code]
{
  "codes": [
    {
      "code": "SELECT count(*)\nFROM mixpanel.<CLEANED_EVENT_NAME>;",
      "language": "sql"
    }
  ]
}
[/block]
`CLEANED_EVENT_NAME` is the transformed event name based on [transformation rules](doc:schematized-export-pipeline#transformation-rules).

### Nested and Repeated Fields

[Redshift Spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html) does not support nested and repeated fields. 

Mixpanel exports array and object properties as a string. You can use built in functions to convert the string to JSON at query time.
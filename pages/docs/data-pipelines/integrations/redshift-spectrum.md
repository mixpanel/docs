# AWS Redshift Spectrum

Mixpanel's JSON pipelines enable direct export of your Mixpanel data into an S3 bucket, facilitating the use of Redshift Spectrum for querying.

## Design

![image](/dad7fe54-caf6-4952-bedc-90da7a4650da.png)

Mixpanel exports data to your S3 bucket and simultaneously updates the necessary schema in the AWS Glue Data Catalog. This allows seamless integration with [Redshift Spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html) for querying your data.

## Setting S3 Permissions

See [Setting S3 Permissions](/docs/data-pipelines/integrations/aws-s3#setting-s3-permissions)

## Setting Glue Permissions

[AWS Glue](https://aws.amazon.com/glue/) provides a robust data catalog service that facilitates seamless access to S3 data across various AWS services.

Mixpanel writes and updates schemas in your Glue instance, ensuring that new data becomes quickly available. This section details configuring Glue permissions to manage the exported data in S3.

### Step 1: Create Glue Database

- Navigate to the **AWS Glue** service on the AWS console. Make sure you are in the same region as your S3 exported data.
- Click **Databases** in the sidebar, then **Add database**.
- Name your database and click **Create database**.

![image](/230698403-de71ee8f-03c2-4528-abd7-94be5a5d1e30.png)

### Step 2: Create Data Modification Policy

Mixpanel partitions the Glue table by default if it has the proper AWS permissions. The partition key type and name are `string` and `mp_date` respectively and the partition values are dates in the **UTC timezone** e.g. `2024-05-01`. To enable partitioning in Glue, the policy must include partition-related permissions.

To enable Mixpanel to manage partitions (e.g., `mp_date`) and schemas in Glue, you need to grant specific AWS permissions:

- Go to the **IAM** service on the AWS console.
- Click **Policies** in the sidebar and then **Create policy**.
- Under the **JSON** tab, input the following policy to manage tables and partitions:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "MixpanelGlueAccessStatement",
        "Effect": "Allow",
        "Action": [
          "glue:GetDatabase",
          "glue:CreateTable",
          "glue:GetTable",
          "glue:GetTables",
          "glue:GetTableVersions",
          "glue:UpdateTable",
          "glue:DeleteTable",
          "glue:GetPartition",
          "glue:CreatePartition",
          "glue:DeletePartition",
          "glue:UpdatePartition",
          "glue:BatchCreatePartition",
          "glue:GetPartitions",
          "glue:BatchDeletePartition",
          "glue:BatchGetPartition"
        ],
        "Resource": "*"
      }
    ]
  }
  ```
- Click **Next** and name the policy and **Create policy**.

Note that AWS does not support granular resources when granting Glue access. So you will have to use \* (asterisk) in the Resources field until AWS can support more granular resources.

### Step 3: Create Access Role

- Go to the **IAM** service on the AWS console.
- Select **Roles** in the sidebar and click **Create role**.
- On the trusted entity page, choose **AWS Account**, then click **Another AWS account**, and enter `485438090326` for the **Account ID**.
- On the permissions page, locate and attach the policies you created in Step 2.
- On the review page, provide a name and description for this role and click **Create role**.

To ensure secure operations, limit the trust relationship to the Mixpanel export user:

- Return to the **IAM** service, select **Roles**, and locate the role you just created.
- In the **Trust relationships** tab, click **Edit trust policy**.
- Update the trust relationship with the following JSON and click **Update policy**.

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::485438090326:user/mixpanel-export"
        },
        "Action": "sts:AssumeRole",
        "Condition": {}
      }
    ]
  }
  ```

## Setting Redshift Spectrum Permissions

This section outlines the necessary steps for configuring permissions to allow Mixpanel to create external schemas in Redshift Spectrum.

### Step 1: Creat Policy

Create a policy in IAM with the necessary permissions to enable Mixpanel to interact with Redshift Spectrum, Glue Data Catalog, and S3. Replace `<BUCKET_NAME>` with your actual S3 bucket name:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "MixpanelRedshiftAccessStatement",
      "Effect": "Allow",
      "Action": [
        "redshift-data:GetStatementResult",
        "redshift-data:DescribeStatement",
        "redshift-data:BatchExecuteStatement",
        "redshift-data:ExecuteStatement",
        "redshift-serverless:GetCredentials",
        "redshift-serverless:GetWorkgroup",
        "redshift:GetClusterCredentialsWithIAM",
        "redshift:GetClusterCredentials"
      ],
      "Resource": "*"
    },
    {
      "Sid": "MixpanelGlueAccessStatement",
      "Effect": "Allow",
      "Action": [
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetPartition",
        "glue:GetPartitions"
      ],
      "Resource": "*"
    },
    {
      "Sid": "MixpanelS3AccessStatement",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::<BUCKET_NAME>", "arn:aws:s3:::<BUCKET_NAME>/*"]
    }
  ]
}
```

### Step 2: Create Access Role

- Go to the **IAM** service on the AWS console.
- Select **Roles** in the sidebar and click **Create role**.
- On the trusted entity page, choose **AWS Account**, then click **Another AWS account**, and enter `485438090326` for the **Account ID**.
- On the permissions page, locate and attach the policies you created in Step 1.
- On the review page, provide a name and description for this role and click **Create role**.

To ensure secure operations, limit the trust relationship to the Mixpanel export user:

- Return to the **IAM** service, select **Roles**, and locate the role you just created.
- In the **Trust relationships** tab, click **Edit trust policy**.
- Update the trust relationship with the following JSON and click **Update policy**.

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::485438090326:user/mixpanel-export",
          "Service": "redshift.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
  ```

### Step 3: Associate Access Role to Redshift

Once you've established the IAM role that enables Mixpanel to access both the external Data Catalog and Amazon S3, it's essential to link this role with your Amazon Redshift Serverless instance.

Use the steps below, and refer to [IAM in Redshift Serverless](https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-iam.html) for additional details:

- Go to **Amazon Redshift** service on the AWS console
- Select Redshift Serverless and access the Namespace configuration for an existing workgroup
- Under **Security and encryption** tab, click **Manage IAM roles**
- Use the **Manage IAM roles** dropdown to select **Associate IAM roles** and then attach the role you created in Step 2.

### Step 4: Create Redshift Database

Create a new Redshift database or utilize an existing one. Here is how to create a new Redshift database:

![image](/48198342-27dc-43b1-bab8-434b31f97e34.png)
![image](/0867f1d8-3649-4f9e-b0d2-9a3b73cfbe97.png)

### Step 5: Grant Privilege to Database User

To enable Mixpanel's external schema creation for pipeline operations, grant the `CREATE` privilege to the federated database user associated with the IAM role. AWS recommends using [federated identity](https://docs.aws.amazon.com/redshift/latest/mgmt/authorization-fas-spectrum.html) for Redshift resource management, leveraging your organization's identity system (e.g., AWS IAM) for authentication and authorization.

> **Important:** Do not manually create `IAMR:xxx` users via SQL commands. Redshift automatically generates a corresponding database user with the `IAMR:` prefix upon the first connection using the IAM role.

Follow these steps to grant the `CREATE` privilege:

- Go to the **CloudShell** service on the AWS console and assume the IAM role. Replace `<role-arn>` with the full ARN of the role you created in Step 2.
  ```bash
  aws sts assume-role --role-arn <role-arn> --role-session-name MixpanelSession
  ```
- If you get an **"AccessDenied"** error, your current AWS CLI role can't assume the Mixpanel role. To fix this, edit the Mixpanel role's trust policy to allow your current role to assume it. If you're using SSO, add this to the trust policy, replacing `<your account id>` with your AWS account ID:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::485438090326:user/mixpanel-export",
          "Service": "redshift.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      },
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::<your account id>:root"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
  ```

- Configure AWS CLI with the temporary credentials.
  ```bash
  aws configure set aws_access_key_id "<YOUR_ACCESS_KEY_ID>"
  aws configure set aws_secret_access_key "<YOUR_SECRET_ACCESS_KEY>"
  aws configure set aws_session_token "<YOUR_SESSION_TOKEN>"
  ```
- Run this command in your terminal, replacing the placeholders with your actual values, and trigger the db user `IAMR:<mixpanel-role-name>` creation in Redshift.
  ```bash
  aws redshift-data execute-statement \
  --workgroup-name <your-workgroup-arn> \
  --database <your-database-name> \
  --sql "SELECT 1;"
  ```
- Grant `CREATE` privilege. Click **Query data** in the Amazon Redshift console to open **Query Editor v2**. Connect using appropriate credentials and run the following SQL commands, replacing <your-database-name> and <mixpanel-role-name> with your actual values:

  ```sql
  -- Check if the IAMR user has been created
  SELECT * FROM pg_user WHERE usename LIKE 'IAMR:<mixpanel-role-name>';

  -- If you see your IAMR user in the results, proceed with the following commands
  GRANT CREATE ON DATABASE "<your-database-name>" TO "IAMR:<mixpanel-role-name>";

  -- Should return true if the privilege was successfully granted
  SELECT HAS_DATABASE_PRIVILEGE('IAMR:<mixpanel-role-name>', '<your-database-name>', 'CREATE');
  ```

## Provide Necessary Details for Pipeline Creation

Refer to [Step 2: Creating the Pipeline](/docs/data-pipelines/#step-2-creating-the-pipeline)
to create data pipeline via UI. It is essential to provide specific details to Mixpanel:

**S3**

- **Bucket**: S3 bucket where Mixpanel data should be exported.
- **Region**: AWS region where your S3 bucket is located.
- **Role**: AWS Role ARN that Mixpanel should assume when writing to your S3, e.g., `arn:aws:iam:::role/example-s3-role`.
- **Encryption (optional)**: Specify the type of at-rest encryption used by the S3 bucket.
- **KMS Key ID (optional)**: If using KMS encryption, you can provide the custom key ID that you wish to use.

**Glue**

- **Database**: Glue database to which the schema needs to be exported.
- **Region**: AWS region where your Glue Database is created.
- **Role**: AWS Role ARN that needs to be assumed for updating glue, e.g., `arn:aws:iam:::role/example-glue-role`.

**Redshift**

- **Workgroup Arn**: Workgroup ARN for Redshift Serverless.
- **Database**: Redshift database where the external schema is created.
- **Region**: AWS region where your Redshift is located.
- **Role**: AWS Role ARN that Mixpanel should assume when creating schema to your database, e.g., `arn:aws:iam:::role/example-redshift-role`.

## Queries

To query data in external schema created by Mixpanel, you need to ask admin to grant schema **USAGE** privilege to the federated database user.

```sql
GRANT USAGE ON SCHEMA "mp_json_export" TO "IAM:<your user name>";
```

Once the pipelines are successfully executed and you have necessary privilege, you can begin querying nested JSON data within the `properties` column in Redshift through the **Query Editor**. Here's an enhanced example query that retrieves the `distinct_id` of users from San Francisco:

```sql
SET json_serialization_enable TO true;
SELECT
    distinct_id
FROM
    "your-database"."mp_json_export"."mp_master_event"
WHERE
    json_extract_path_text(properties, '$city') = 'San Francisco'
LIMIT 10;
```

For more detailed guidance on querying nested JSON data and using JSON functions in Redshift, you can review the official documentation on [querying nested data](https://docs.aws.amazon.com/redshift/latest/dg/serializing-complex-JSON.html) and [JSON functions](https://docs.aws.amazon.com/redshift/latest/dg/JSON_EXTRACT_PATH_TEXT.html).

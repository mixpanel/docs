# AWS S3

Mixpanel allows you to export events and poeple data into AWS S3 through [Json Pipelines](/docs/json-pipelines/overview)

## Setting S3 Permissions

Mixpanel supports various configurations to securely manage your data on AWS S3. For resource access, Mixpanel utilizes AWS cross-account roles.

This section details the necessary permissions Mixpanel requires based on your S3 bucket configuration.

### Step 1: Create Data Modification Policy

To export data from Mixpanel to AWS S3, assign the following data modification permissions. Use the following policy, replacing `<BUCKET_NAME>` with the name of your bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "MixpanelS3AccessStatement",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::<BUCKET_NAME>", "arn:aws:s3:::<BUCKET_NAME>/*"]
    }
  ]
}
```

### Step 2: Server-Side Encryption (optional)

Mixpanel ensures data transfer to your S3 bucket over a TLS encrypted connection. To secure your data at rest in S3, you can enable [Server-Side Encryption (SSE)](https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html), which offers two options: **Encryption with Amazon S3-Managed Keys (SSE-S3)** and **Encryption with AWS KMS-Managed Keys (SSE-KMS)**

#### Encryption with Amazon S3-Managed Keys (SSE-S3)

This option encrypts your data at rest using the AES-256 algorithm, with keys managed by S3. To enable this, select `AES` from the **Encryption** dropdown menu when creating pipelines.

#### Encryption with AWS KMS-Managed Keys (SSE-KMS)

For encryption with AWS KMS, you have the option to use either the default `aws/s3` key or your own custom keys.

- Using the Default Key

  Simply select `KMS` from the **Encryption** dropdown menu and leave the `KMS Key ID` field empty when creating your pipeline.

- Using Custom Key

  1. Select `KMS` from the **Encryption** dropdown menu and enter your custom key's ARN in the `KMS Key ID` field.

  2. Create an IAM policy allowing Mixpanel to use your KMS key, as shown in the JSON snippet below. Replace `<KEY_ARN>` with your key's ARN:

     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Sid": "MixpanelKmsStatement",
           "Effect": "Allow",
           "Action": [
             "kms:Decrypt",
             "kms:Encrypt",
             "kms:GenerateDataKey",
             "kms:ReEncryptTo",
             "kms:GenerateDataKeyWithoutPlaintext",
             "kms:DescribeKey",
             "kms:ReEncryptFrom"
           ],
           "Resource": "<KEY_ARN>"
         }
       ]
     }
     ```

### Step 3: Create Access Role

After establishing the necessary policies, create a cross-account IAM Role to attach policies you've created:

- Go to the **IAM** service on the AWS console.
- Select **Roles** in the sidebar and click **Create role**.
- On the trusted entity page, choose **AWS Account**, then click **Another AWS account**, and enter `485438090326` for the **Account ID**.
- On the permissions page, locate and attach the policies you created in previous steps (data modification and, if appliable, KMS).
- On the review page, provide a name and description for this role and click **Create role**.

To ensure secure operations, limit the trust relationship to the Mixpanel export user:

- Return to the **IAM** service, select **Roles**, and locate the role you just created.
- In the **Trust relationships** tab, click **Edit trust policy**.
- Update the trust relationship with the following JSON, replacing `<MIXPANEL_PROJECT_TOKEN>` with your Mixpanel project token.

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
        "Condition": {
          "StringEquals": {
            "sts:ExternalId": "<MIXPANEL_PROJECT_TOKEN>"
          }
        }
      }
    ]
  }
  ```

- Click **Update policy** and save.

This setup utilizes an external ID to prevent [the confused deputy problem](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html), enhancing the security of cross-account access as Mixpanel interacts with AWS using your project token.

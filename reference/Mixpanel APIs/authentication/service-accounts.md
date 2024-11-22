---
title: "Service Accounts"
slug: "service-accounts"
hidden: false
createdAt: "2020-06-17T00:38:51.169Z"
updatedAt: "2021-10-07T14:36:29.747Z"
---
[block:callout]
{
  "type": "success",
  "title": "Recommended Authentication",
  "body": ""
}
[/block]
A service account is a special type of Mixpanel user intended to represent a non-human entity such as a script or back end service. Similar to a normal user it can be granted access to any number of projects and workspaces within an organization. Permissions are set by defining the role of the service account for each project or workspace. A service account can only belong to one organization. 
[block:api-header]
{
  "title": "Authenticating with a Service Account"
}
[/block]
Service Account authentication is performed via [HTTP Basic Auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme). While the Basic access standard calls for a base64 encoding of the colon-joined credentials our authentication accepts both base64 encoding and plain-text. 

Provide a service account's username and secret as the basic authentication credentials.
[block:code]
{
  "codes": [
    {
      "code": "curl https://mixpanel.com/api/app/me \\\n\t--user \"<serviceaccount_username>:<serviceaccount_secret>\"",
      "language": "curl",
      "name": "cURL Basic Auth"
    },
    {
      "code": "curl https://mixpanel.com/api/app/me \\\n\t--header 'authorization: Basic <serviceaccount_username>:<serviceaccount_secret>'",
      "language": "shell",
      "name": "cURL Header"
    },
    {
      "code": "import requests\nrequests.get(\n  'https://mixpanel.com/api/app/me', \n  auth=('<serviceaccount_username>', '<serviceaccount_secret>'),\n)",
      "language": "python",
      "name": "Python Requests"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Managing Service Accounts"
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Owner or Admin Permissions Required",
  "body": "You must have Owner or Admin permissions to manage a project's Service Accounts. Learn more in our [permissions help doc](https://mixpanelsupport.zendesk.com/hc/en-us/articles/360024613412)."
}
[/block]

[block:html]
{
  "html": "<div class=\"mixpanel-custom-two-column\">\n\t<div>\n    <p>\n      You can view and create service accounts in your organization in the Service Accounts tab in your <a href=\"https://mixpanel.com/settings/org#serviceaccounts\">Organization settings</a>\n    </p>\n    <p>\n      You will be asked to select the role and granted projects of the when creating a service account from the organization's settings page. Deleting a service account from the organization will immediately revoke access to all projects in the organization.\n    </p>\n  </div>\n  <div class=\"image-container\">\n  \t<img src=\"https://files.readme.io/a77f1df-org_settings.png\"/>    \n  </div>\n</div>\n<div class=\"mixpanel-custom-two-column\">\n  <div class=\"image-container\">\n  \t<img src=\"https://files.readme.io/37798c5-25f47be-Screen_Shot_2020-07-14_at_4.30.49_PM.png\"/>\n  </div>\n  <div>\n    <p>\n      You can also manage service accounts in your <a href=\"https://mixpanel.com/settings/project#serviceaccounts\">project settings</a>.\n    </p>\n  </div>\n</div>\n\n<style>\n\t.mixpanel-custom-two-column {\n    display: flex;\n    margin: 18px 0;\n\t}\n  \n  .mixpanel-custom-two-column div {\n  \twidth: 100%;\n    margin: 15px 0;\n  }\n  \n  .mixpanel-custom-two-column .image-container {\n  \tdisplay: flex;\n  }\n  \n  .mixpanel-custom-two-column .image-container img {\n  \theight: 300px;\n  }\n</style>"
}
[/block]
Any service account you create from the project settings page will be automatically be assigned an admin role. Deleting a service account will revoke access only from that project.
[block:html]
{
  "html": "<div class=\"create-service-account\">\n  <img src=\"https://files.readme.io/bcc971b-4f76ee5-Screen_Shot_2020-07-29_at_1.57.16_PM.png\"/>\n</div>\n  \n<style>\n\t.create-service-account {\n  \tdisplay: flex;\n    margin: 18px 0;\n  }\n  \n  .create-service-account img {\n    width: 80%;\n  }\n  \n  @media (max-width: 1400px) {\n  \t.create-service-account img {\n      width: 100%;\n    }\n  }\n</style>"
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "It's very important you save your service account secret somewhere secure as you won't be able to access it again after creation.",
  "title": "Immediately store your credentials in a safe place"
}
[/block]

[block:api-header]
{
  "title": "Service Account Expiration"
}
[/block]
By default, service accounts have no expiration. However, when you create a service account you can optionally specify how long you want it to be valid for. This may provide increased security and force a credential rotation policy. After the credentials expire, API requests using the service account will not be authorized. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3668062-image_12.png",
        "image (12).png",
        1484,
        559,
        "#eeeef0"
      ],
      "sizing": "80"
    }
  ]
}
[/block]
# Service Accounts

<Callout icon="👍" theme="okay">
  Recommended Authentication
</Callout>

A service account is a special type of Mixpanel user intended to represent a non-human entity such as a script or back end service. Similar to a normal user it can be granted access to any number of projects and workspaces within an organization. Permissions are set by defining the role of the service account for each project or workspace. A service account can only belong to one organization.

## Authenticating with a Service Account

Service Account authentication is performed via [HTTP Basic Auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme). While the Basic access standard calls for a base64 encoding of the colon-joined credentials our authentication accepts both base64 encoding and plain-text.

Provide a service account's username and secret as the basic authentication credentials.

```curl cURL Basic Auth
curl https://mixpanel.com/api/app/me \
	--user "<serviceaccount_username>:<serviceaccount_secret>"
```
```shell cURL Header
curl https://mixpanel.com/api/app/me \
	--header 'authorization: Basic <serviceaccount_username>:<serviceaccount_secret>'
```
```python Python Requests
import requests
requests.get(
  'https://mixpanel.com/api/app/me', 
  auth=('<serviceaccount_username>', '<serviceaccount_secret>'),
)
```

## Managing Service Accounts

> 🚧 Owner or Admin Permissions Required
>
> You must have Owner or Admin permissions to manage a project's Service Accounts. Learn more in our [permissions help doc](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/orgs-and-projects/roles-and-permissions#permissions).

<HTMLBlock>{`
<div class="mixpanel-custom-two-column">
	<div>
    <p>
      You can view and create service accounts in your organization in the Service Accounts tab in your <a href="https://mixpanel.com/settings/org#serviceaccounts">Organization settings</a>
    </p>
    <p>
      You will be asked to select the role and granted projects of the when creating a service account from the organization's settings page. Deleting a service account from the organization will immediately revoke access to all projects in the organization.
    </p>
  </div>
  <div class="image-container">
  	<img src="https://files.readme.io/2eb540d5d067b44feb76d057cd628dd9a0648c6310607f6d7332dff433fa22b4-org_SA.png"/>    
  </div>
</div>
<div class="mixpanel-custom-two-column">
  <div class="image-container">
  	<img src="https://files.readme.io/0e83a19d5f7b55a0e3369e706a69515f14e7f4fd6fda17b0a83da0eb790e76cf-project_SA.png"/>
  </div>
  <div>
    <p>
      You can also manage service accounts in your <a href="https://mixpanel.com/settings/project#serviceaccounts">project settings</a>.
    </p>
  </div>
</div>

<style>
	.mixpanel-custom-two-column {
    display: flex;
    margin: 18px 0;
	}
  
  .mixpanel-custom-two-column div {
  	width: 100%;
    margin: 15px 0;
  }
  
  .mixpanel-custom-two-column .image-container {
  	display: flex;
  }
  
  .mixpanel-custom-two-column .image-container img {
  	height: 300px;
  }
</style>
`}</HTMLBlock>

Any service account you create from the project settings page will be automatically be assigned an organization member role. Deleting a service account will revoke access only from that project.

<HTMLBlock>{`
<div class="create-service-account">
  <img src="https://files.readme.io/650ddf66560638c3dcae7341b6ef006899fd35069dd99319ef7462e4c3611e74-created_SA.png"/>
</div>
  
<style>
	.create-service-account {
  	display: flex;
    margin: 18px 0;
  }
  
  .create-service-account img {
    width: 80%;
  }
  
  @media (max-width: 1400px) {
  	.create-service-account img {
      width: 100%;
    }
  }
</style>
`}</HTMLBlock>

> 🚧 Immediately store your credentials in a safe place
>
> It's very important you save your service account secret somewhere secure as you won't be able to access it again after creation.

## Service Account Expiration

By default, service accounts have no expiration. However, when you create a service account you can optionally specify how long you want it to be valid for. This may provide increased security and force a credential rotation policy. After the credentials expire, API requests using the service account will not be authorized.

<Image align="center" border={false} width="80%" src="https://files.readme.io/3668062-image_12.png" />

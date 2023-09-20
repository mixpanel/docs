# API Credentials


## Project Token
You need your Project Token to track events to Mixpanel. Mixpanel uses Project Token to ensure that events that you send are routed to your project.

You can find it in the [Project Settings](https://mixpanel.com/settings/project) page under "Access Keys"

![image](/229924656-95f4e4e5-441f-49d7-95ea-32b0979a11f8.png)

You can then use your token to track events to Mixpanel. See our guides for [Javascript](/docs/tracking/javascript-quickstart), [Server](/docs/tracking/server), and [Mobile](doc:mobile).

Note: Project Token does not let you _read_ any data from your Mixpanel project. It only lets you track. This is intentional because your Project Token is public and shipped to client devices as part of your website's Javascript code. or shared with 3rd parties, like CDPs.


## API Secret
The API Secret is used to export data out of your project via our Export APIs. You can find it in the [Project Settings](https://mixpanel.com/settings/project) page under "Access Keys", right below Project Token. 

You should not share your API Secret, since it can be used to export data from your Mixpanel project.

### How to rotate your API Secret

To rotate a project API Secret, the [Project Owner](https://docs.mixpanel.com/docs/admin/organizations-projects/manage-team-members#owner-1) should go to ⚙️ > Personal Settings > Projects > Find the project whose API Secret you want to rotate and click the Reset button.
Also, do not forget to update any scripts or integrations that use the API Secret for authentication.

![image](https://github.com/mixpanel/docs/assets/17679378/351c98cf-3c17-487a-af9f-257e14bbf299)

## Service Accounts
[Service Accounts](https://developer.mixpanel.com/reference/service-accounts) are a more advanced form of authentication that is used to grant temporary access to a subset of Mixpanel projects within your organization for certain APIs.

Service Accounts are not necessary to send data to Mixpanel or export data out of Mixpanel.

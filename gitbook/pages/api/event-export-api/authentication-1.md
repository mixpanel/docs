# Authentication (when workspaces ship)

## Service Account

[Service Account Authentication Details](../authentication/service-accounts.md#service-account)

> 👍 This is the preferred authentication method for Raw Data Export API.

* Requests parameters must include a `project_id`.

**Projects with[Data Views](https://help.mixpanel.com/hc/en-us/articles/360043782572-Data-Views)**

* You can only export data through the global workspace.
* The Service Account must have permission to the global workspace.
* In addition to `project_id`, you should include the global data view's `workspace_id` as a request parameter.

**Projects with[Classified Data](https://help.mixpanel.com/hc/en-us/articles/360044295131-Data-Classification)**

* The Service Account must have permission to access classified data.
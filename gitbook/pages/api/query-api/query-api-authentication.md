# Authentication

## Service Account

[Service Account Authentication Details](../mixpanel-apis/authentication/service-accounts.md)

{% hint style="info" %}
This is the preferred authentication method for Query API.
{% endhint %}

* Requests parameters must include a `project_id`.

**Projects with[Data Views](https://help.mixpanel.com/hc/en-us/articles/360043782572-Data-Views)**

* In addition to `project_id`, you should include the global data view's `workspace_id` as a request parameter.

**Projects with[Classified Data](https://help.mixpanel.com/hc/en-us/articles/360044295131-Data-Classification)**

* Your results may be filtered based on the Service Account's sensitivity settings.

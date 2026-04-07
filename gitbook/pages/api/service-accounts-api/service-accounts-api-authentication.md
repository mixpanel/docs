# Authentication

## Service Account

{% hint style="info" %}
Roles & Permissions

  To modify (create, delete) a service account, the service account used for authentication must have the role of admin or owner.
{% endhint %}

[Service Account Authentication Details](../mixpanel-apis/authentication/service-accounts.md#service-accounts)

```sh
curl --request GET \
     --url https://mixpanel.com/api/app/organizations/12345/service-accounts \
     --header 'Accept: application/json' \
     --header 'Authorization: Basic dGVzdDp0ZXN0'
```

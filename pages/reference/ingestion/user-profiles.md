User Profiles let you describe user with properties like $name, $email, etc. The API is used to create, update, or delete User Profiles. We recommend reading our User Profiles [guide](/docs/tracking/how-tos/user-profiles) before using this API.

## Request Format
This will create a profile with `$distinct_id` of `123` and `$name` as `Alice`.

TODO: curl/Python example

You batch up to 200 mutations of user profiles into one API call.

TODO: curl/Python example

Details of each operator are provided below.

### Set
Set properties on a User Profile. In database terminology, this API has upsert semantics.
* If a Profile with the provided `$distinct_id` doesn't exist, it will be created.
* If the Profile does not contain the properties provided in this API call, those properties will be created.
* If the Profile does contain those properties, those property values will be overriden. Any other properties will remain untouched.

TODO: cURL & Python example.


### Set Once
Set properties on a User Profile, if they're not already set. This is identical to Set, except it will not overwrite existing properties.

TODO: cURL example.

### Delete
Delete the User Profile.

TODO: cURL example.


## Group Profiles
Group Profiles operate similarly to User Profiles, with two differences:
* The endpoint is `/groups` instead of `/engage`.
* Each API call contains an extra field to indicate the Group you want to update.

For example, suppose you are a B2B company that has 1 Group called "Accounts". That Group has ID "12345". You would then send:

TODO: Show what this looks like.

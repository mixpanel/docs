# GDPR Compliance


## Supporting Data Subject Rights

As controllers of personal data, Mixpanel and its customers must uphold certain rights stated by the GDPR, including:

## Right to Access and Data Portability

Mixpanel supports individuals’ right to access and right to portability of their personal data through individual export requests. Any Mixpanel account holder will be able to request an export of one’s own personal data, as well as the personal data of their own end-users. [The form for submitting end user personal data export requests](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data) and for submitting account holder data export requests is available through Personal Settings > Data & Privacy. 
 
## Right to Erasure

We support individuals’ right to erasure through a permanent deletion of personal data upon request. [Deletion API](https://developer.mixpanel.com/docs/privacy-security#manage-personal-data) is available to all users.

## Right to Object

Our customers control what data is sent to Mixpanel, and may decide to halt the sending of personal data at any time. To assist with supporting individuals’ right to object to the collection of one’s personal data, Mixpanel also has built dedicated methods for our client-side SDKs that can be used to [opt end users out of tracking](/docs/tracking/how-tos/privacy-friendly-tracking).

Mixpanel collects information about how customers use the product, and uses this data to identify product gaps and improve existing products. While this information is useful, Mixpanel recognizes the importance of an individual's right to object.  Mixpanel has therefore streamlined opt-out systems for its customers, who can opt out of tracking through simple controls, located under Personal Settings > Data & Privacy.

## Data Retention Policy

As processors of its customers’ data and to protect the privacy of information it stores, Mixpanel holds data no longer than is needed to provide its services. To further support this, Mixpanel has implemented the following data retention policy:

- Events received over 5 years ago are automatically deleted on an ongoing basis from all projects.
- User data is retained indefinitely. Customers are given the ability to delete profiles using the [Engage API](https://developer.mixpanel.com/reference/delete-profile).

This policy includes projects that were deleted or reset through the Project Settings - deleting a project through the Project Settings triggers a soft deletion. The data in the deleted or reset project will remain stored in Mixpanel for 60-90 days, after which it will be hard deleted and unrecoverable.

Custom data retention windows can be set for user data by sending regular deletion requests to the Engage API. For more questions about setting custom data retention windows, [contact our support team](https://mixpanel.com/get-support).

## Rate Limit

We place a [rate limit](/docs/other-bits/privacy-and-security/export-or-delete-end-user-data#rate-limit) in place to ensure the integrity of our system as well as prevent a single project from monopolizing the available resources for other projects

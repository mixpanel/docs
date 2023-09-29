---
title: "Building a 3rd-Party Integration"
slug: "partner-integration-id"
hidden: false
metadata: 
  title: "Build A Partner Integration | Mixpanel Developer Docs"
  description: "Interested in building an integration with Mixpanel to provide value to your customers that also use Mixpanel? Learn about the process here."
createdAt: "2020-10-15T23:17:34.007Z"
updatedAt: "2023-03-27T17:15:37.834Z"
---
Building an integration with Mixpanel is a powerful way to provide value to your customers that also use Mixpanel. If your company is interested in becoming a Certified Technology Partner, building an integration is also the first step. 
[block:api-header]
{
  "title": "Setting up a Sandbox"
}
[/block]
Sign up for a [free Mixpanel account](https://mixpanel.com/pricing), which you can use as a sandbox when building and testing your integration.
[block:api-header]
{
  "title": "Create an Integration ID"
}
[/block]
In order to properly understand API usage and provide you with resources as part of our Technology Partner Program, you must first define your **Integration ID** and pass it along when sending event data or calling Mixpanel’s APIs. 

Your Integration ID should be a string representing your company’s or solution’s name. If Mixpanel were a developer, our Integration ID would be “mixpanel”. 
[block:callout]
{
  "type": "info",
  "body": "This will help customers better understand the source of their event data in Mixpanel. It will allow our team to allocate resources more effectively.",
  "title": "Always include your Integration ID"
}
[/block]
#### Event Tracking
For event data, you will include your Integration ID as the `$source` property value.

This can be added to the [Event Object](doc:data-model-deep-dive#anatomy-of-an-event)  when using the [Ingestion API](ref:ingestion-api):
[block:code]
{
  "codes": [
    {
      "code": "{\n\t“event”: “Sign up”,\n\t“properties”: {\n\t\t“distinct_id”: “123”,\n\t\t“time”: 1321499371,\n\t\t“$source”: “your_integration_id”,\n\t\t“token”: “<YOUR_PROJECT_TOKEN>”\n\t}\n}\n",
      "language": "json",
      "name": "JSON Event Object"
    }
  ]
}
[/block]
It can also be included in any Mixpanel SDK:
[block:code]
{
  "codes": [
    {
      "code": "mixpanel.track(“song played”, {“genre”, “pop”, “$source”: “your_integration_id”});",
      "language": "javascript",
      "name": "JavaScript SDK"
    }
  ]
}
[/block]

##### API Usage

If you choose to leverage our APIs for your integration, you must pass along your Integration ID with every API as the **X-Mixpanel-Integration-ID** header value. 
[block:code]
{
  "codes": [
    {
      "code": "curl --request GET \\\n  --url https://mixpanel.com/api/app/projects/12345/schemas/event/my_event/1-0-0 \\\n  --header ‘accept: application/json’ \\\n  --header ‘X-Mixpanel-Integration-ID: your_integration_id’",
      "language": "curl",
      "name": "API cURL"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Integration Opportunities"
}
[/block]
#### Connect to Mixpanel's EU Servers
Give your customers the option to send data to [our EU servers](https://developer.mixpanel.com/reference/overview) when they activate your Mixpanel integration.

####  Receive Cohort Syncs from Mixpanel
Use this [webhook spec](doc:cohort-webhooks) to process inbound cohorts Mixpanel syncs to your product, allowing your customers to engage more effectively with the right users at the right time.
**Note**: This spec is intended for partner SaaS companies looking to build integrations with Mixpanel. If you are yourself a Mixpanel customer looking to query on Cohorts, refer to the [cohorts query API](https://developer.mixpanel.com/reference/cohorts).

#### Auto-populate Experiments
If you are offering experiments or A/B tests to your customers, add support for [auto-populating our Experiments report](https://help.mixpanel.com/hc/en-us/articles/360038439952-Experiments) to your integration in order to reduce time-to-value for our mutual customers.

#### Sync your Schemas
Sync your internal data dictionary or tracking plan with Mixpanel using the [Lexicon Schemas API](ref:lexicon-schemas-api). Schemas that you upload will be used to populate Lexicon and provide additional context for your data across the query UI. 

[block:api-header]
{
  "title": "Make your Integration Successful"
}
[/block]
#### QA your Code
For integrations sending events to Mixpanel, our[ Live View](https://help.mixpanel.com/hc/en-us/articles/360000865566#h_be11c3bd-752b-418f-b8fa-3fe911b4f792) report can be a great way to test if everything is working as expected.

#### Document Your Integration
Customer-facing documentation that explains, which use cases your integration helps to solve and how to set it up, will increase the utilization of your integration.

#### Get Listed on mixpanel.com
Finally, submit your integration to [create a listing](https://mixpanel.com/partners/integrations/get-listed/form) on our Integrations Directory and to let our customers discover your solution and the integration.
---
title: "Partner Cohort Integrations"
slug: "partner-cohort-integrations"
hidden: true
createdAt: "2021-07-02T19:53:53.788Z"
updatedAt: "2021-07-02T21:28:03.579Z"
---
This page documents Mixpanel’s specifications for matching computed sets of users (“Cohorts”) to [technology partner products](https://mixpanel.com/partners/becomeapartner-technology/) via a webhooks-based approach.

This spec is intended for technology partners building cohort sync integrations alongside the Mixpanel team. Please confirm with the Mixpanel Partnerships team if you wish to leverage this connection.

If you are instead a Mixpanel customer looking to pull cohorts for use, please refer to the [Cohorts API](https://developer.mixpanel.com/reference/cohorts).
[block:api-header]
{
  "title": "Partner Onboarding and Requirements"
}
[/block]
The channel for routing cohorts from Mixpanel to your product will be a *single webhook endpoint* established by your team. Mixpanel’s team will work with you to incorporate this endpoint into the Mixpanel product to create a UX in line with our existing integration set.

Please provide the following elements as part of your integration build process:
Webhook URL, for delivering cohort groups & actions
Links to your help center articles on the integration (only applicable if passing data back to Mixpanel e.g. user events)
Authorization format you intend to use (see below section on Authorization)
How you would like to perform user ID resolution (see section below. If opting for a special joining key, please specify the value. If instead requiring mutual customers implement the same ID system in both tools, please specify)
Company logo SVG, to include in the Mixpanel UI
Return values for errors, to allow Mixpanel to display integration status in our UI

[block:api-header]
{
  "title": "End User Workflow"
}
[/block]
Users will be able to initialize the integration through Mixpanel’s integrations tab, where they will be prompted to enter an API key / token / etc., pulled from their account on your platform:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8ed6edc-Screen_Shot_2021-07-02_at_1.50.23_PM.png",
        "Screen Shot 2021-07-02 at 1.50.23 PM.png",
        936,
        534,
        "#aebad2"
      ],
      "sizing": "original"
    }
  ]
}
[/block]
As users define a cohort through Mixpanel’s UI (e.g. “users who made a playlist in the last week”), they’ll have the option to export that set of users through Mixpanel’s cohort manager to your platform (seen below with Airship as an example):

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b655ee0-Screen_Shot_2021-07-02_at_1.53.16_PM.png",
        "Screen Shot 2021-07-02 at 1.53.16 PM.png",
        2716,
        1008,
        "#f8f8f8"
      ],
      "sizing": "80"
    }
  ]
}
[/block]
Users may then select from two types of exports - One time and Dynamic
One time exports will send the full set of users computed at the time of export
Dynamic exports will recompute the group at 2-hour intervals and send updates

Later iterations will allow users to create these exports programmatically. For each run of a sync, the cohort will be sent to the webhook URL, whose format is described below.
[block:api-header]
{
  "title": "Webhook Requests + Responses"
}
[/block]
All webhook requests contain a few core components:
A header of the format “x-api-key”: <your_customers_api_key>”
This is the key the user entered in the modal during integration initialization. Use this to reference the user’s account / workspace / etc. to attribute the cohort to
An action describing what action to take based on the message. There are two actions:
members
remove_members
A few parameters for the given action

Reach out to the Mixpanel partnerships team to request the full Swagger spec

[INTERNAL NOTE]
Have someone from Eng upload the Swagger doc to readme (they have to do an update to the /analytics repo, so it has to be someone on eng) - that'll get the nice auto-populated 
[/INTERNAL NOTE]
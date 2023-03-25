---
title: "Forwarding Events to Mixpanel"
slug: "forwarding-events-to-mixpanel"
hidden: false
createdAt: "2021-02-05T18:07:06.506Z"
updatedAt: "2021-02-11T18:32:07.707Z"
---
Next, let’s create an event for this page view in Freshpaint and forward it to Mixpanel.

Freshpaint’s event editor makes it easy for you. First, define your name for the event along with any extra properties or filters you wish to add and save it. Then, toggle the status to “on” for Mixpanel as the event destination:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9f9d75c-image24.gif",
        "image24.gif",
        929,
        754,
        "#fafbfb"
      ]
    }
  ]
}
[/block]
Pro tip: Time Machine! If Freshpaint was implemented prior to when you forwarded events to Mixpanel, press the backfill button to use Freshpaint’s Time Machine and send all historical data to Mixpanel. 

If we did this properly, in **Mixpanel** we can observe our new codeless page view event streaming into live view:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/830c513-image9.png",
        "image9.png",
        1198,
        314,
        "#f2f2f3"
      ]
    }
  ]
}
[/block]
Pro tip: Refresh your page a couple of times in a few different browsers to feel confident that the tracking is set up properly.
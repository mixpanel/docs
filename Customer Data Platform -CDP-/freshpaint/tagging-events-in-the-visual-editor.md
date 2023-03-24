---
title: "Tagging Events in the Visual Editor"
slug: "tagging-events-in-the-visual-editor"
hidden: false
metadata: 
  title: "Freshpaint Autotrack: Tagging Events | Mixpanel Developer Docs"
  description: "The real value of autotrack shines when we're able to define new events that are related to our app’s UI. Learn how to tag events in Freshpaint's Visual Editor."
createdAt: "2021-02-05T18:13:04.908Z"
updatedAt: "2021-02-11T18:34:23.485Z"
---
Page view events are helpful, but the real value of autotrack shines when we’re able to define new events that are related to our app’s UI. 
https://dash.readme.com/project/mixpaneldevdocs/v2.27/docs/tagging-events-in-the-visual-editor
For example, we may wish to track when our users click our primary “Watch a Video” button in our app:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0be1ad7-image11.png",
        "image11.png",
        720,
        703,
        "#15507a"
      ]
    }
  ]
}
[/block]
In **Freshpaint**, head over to the [Visual Editor](https://app.freshpaint.io/events/editor?utm_medium=blog&utm_source=mixpanel) (under Events) and launch a new tab that points at the website you deployed the snippet on:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/04b4272-image8.png",
        "image8.png",
        1037,
        577,
        "#f3f5f7"
      ]
    }
  ]
}
[/block]

The [Visual Editor is described in-depth here](https://gitbook.freshpaint.io/data-management/visual-editor?utm_medium=blog&utm_source=mixpanel), but generally speaking there are two modes **Normal Mode** and **Label Mode** 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/82e5e71-Picture12.png",
        "Picture12.png",
        429,
        70,
        "#6381a5"
      ]
    }
  ]
}
[/block]

In **label mode** each element within your web application can be selected and tagged to create a new event:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/25fdb5b-image13.gif",
        "image13.gif",
        1525,
        823,
        "#48728d"
      ]
    }
  ]
}
[/block]
In **normal mode** you can navigate the web application normally - no tagging is enabled.

We’ll use **label mode** to implement a “watch video” event by clicking the button and defining the event’s name:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3b43796-image12.png",
        "image12.png",
        693,
        620,
        "#436478"
      ]
    }
  ]
}
[/block]
Once we’ve defined our event in **Freshpaint**, we can head over to [Schema](https://app.freshpaint.io/events/schema?utm_medium=blog&utm_source=mixpanel) (under events), find the event we just defined (“watch video”) and flip the switch to send the event to Mixpanel (just as we did before!):
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0b7df30-image20.gif",
        "image20.gif",
        1417,
        832,
        "#eff1f7"
      ]
    }
  ]
}
[/block]
Once this toggle is set, you should start seeing the click events register in **Mixpanel**’s live view:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3e963d5-image4.png",
        "image4.png",
        1197,
        356,
        "#f2f2f2"
      ]
    }
  ]
}
[/block]
As with before, pressing the backfill button on that new metric will send all historical data that Freshpaint has observed for that metric to Mixpanel:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b4e6896-image5.png",
        "image5.png",
        866,
        113,
        "#f7f8fa"
      ]
    }
  ]
}
[/block]
This ensures you can still get data into Mixpanel, even if you forgot to track events when your new feature launched!
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/26e8d81-image25.png",
        "image25.png",
        1221,
        728,
        "#fcfcfd"
      ]
    }
  ]
}
[/block]
That’s the basic gist. Now you can create new events in Mixpanel without writing code!
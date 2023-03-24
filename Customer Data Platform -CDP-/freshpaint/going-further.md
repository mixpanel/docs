---
title: "Going further"
slug: "going-further"
hidden: false
metadata: 
  title: "Freshpaint Autotrack: Deep Dive | Mixpanel Developer Docs"
  description: "Modern visual event taggers like Freshpaint enable you to send metadata along with click events. Learn how to use Dynamic Properties in Mixpanel."
createdAt: "2021-02-08T18:35:47.736Z"
updatedAt: "2021-02-11T18:35:55.198Z"
---
[block:api-header]
{
  "title": "Dynamic Properties"
}
[/block]
Modern visual event taggers like Freshpaint enable you to send metadata along with click events. In our example application, there’s a form that has a dropdown selector and a submit button:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6a268dd-image22.png",
        "image22.png",
        437,
        427,
        "#eceff2"
      ]
    }
  ]
}
[/block]
The Freshpaint event editor lets you add [dynamic properties ](https://www.freshpaint.io/getting-started/building-out-your-account/setting-up-properties#dynamic-properties?utm_medium=blog&utm_source=mixpanel) to your data; in this particular case, a “get a demo” event would be much more useful if we also sent the industry the user had selected when they pressed the button.

Freshpaint uses CSS selectors which allow you to target any element on your page to be included with the event data. Because our `<select>` element has an ID of industry:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/42acd37-image17.png",
        "image17.png",
        501,
        154,
        "#2c2a2a"
      ],
      "caption": ""
    }
  ]
}
[/block]
We might implement the *industry* property like this:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bb589b8-image1.png",
        "image1.png",
        879,
        229,
        "#fcfcfd"
      ]
    }
  ]
}
[/block]
And then we’ll get the user-selected industry in our event data:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/13790d6-image19.png",
        "image19.png",
        365,
        102,
        "#f3f3f5"
      ]
    }
  ]
}
[/block]
If you have trouble with CSS selectors, your browser’s dev tools might be able to help! For example in Chrome, if you “inspect element” on the dropdown, you can “copy selector” which will put the CSS selector for any element on your page onto your clipboard.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/83e5f16-image21.png",
        "image21.png",
        1350,
        747,
        "#b6c9d6"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Identity Management"
}
[/block]
One of the things the visual tagger can’t do is identify a logged in user in your application. While a full implementation of identity management is beyond the scope of this article, there are generally two places where a developer should instrument an analytics tag to identify the current user:

●	when a user signs up
●	when a user signs in

The code to announce a user’s identity is simple:

[block:code]
{
  "codes": [
    {
      "code": "freshpaint.identify('1337@mixpanel.com')",
      "language": "text"
    }
  ]
}
[/block]
More information on Freshpaint’s [identity management can be found here](https://www.freshpaint.io/getting-started/building-out-your-account/setting-up-identify#attaching-unique-identifiers?utm_medium=blog&utm_source=mixpanel).

When you implement identity management in Freshpaint, you get Mixpanel [user profiles](https://help.mixpanel.com/hc/en-us/articles/115004501966-User-Profiles) for free!

Proper identity management is critical. When you add this code to your website, you’ll want to triple-check that each user has their own unique event stream that persists across sessions. You can also do this from **Freshpaint’s** Live View.

[block:api-header]
{
  "title": "Freshpaint wraps Mixpanel"
}
[/block]
For those with some experience writing code, it’s important to remember that the Freshpaint SDK bundles the Mixpanel JS SDK. 

This means that when you add Freshpaint to your application, and add Mixpanel as a destination, the **mixpanel** object in the browser is also available as a global:


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/13a5784-image10.png",
        "image10.png",
        736,
        121,
        "#f6f6f7"
      ]
    }
  ]
}
[/block]
Ultimately, this means that you won’t lose any new functionality that we (Mixpanel) may add to our SDK in the future.
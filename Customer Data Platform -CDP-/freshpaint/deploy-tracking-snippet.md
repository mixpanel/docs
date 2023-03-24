---
title: "Deploy Tracking Snippet"
slug: "deploy-tracking-snippet"
hidden: false
createdAt: "2021-02-05T18:00:13.931Z"
updatedAt: "2021-05-12T00:34:21.953Z"
---
Next we’ll need to implement the Freshpaint code snippet on your website or mobile application. [Freshpaint’s official directions are here](https://www.freshpaint.io/data-management/sources/javascript?utm_medium=blog&utm_source=mixpanel), but here’s the general idea:

Under **collect → sources**, find the ‘Autotrack’ for javascript (web) or Android/iOS, click configure, and copy the code snippet:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/78bb5a3-image18.gif",
        "image18.gif",
        1290,
        605,
        "#f9f9fa"
      ]
    }
  ]
}
[/block]
For a web application, we’ll want to drop this code snippet on our `index.html` or root (/) page generally before the closing `</head>` tag: 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e535943-image3.png",
        "image3.png",
        342,
        332,
        "#2d2f2e"
      ],
      "sizing": "smart"
    }
  ]
}
[/block]
In **Freshpaint**, we can verify that the snippet is correctly implemented by loading [Live View](https://app.freshpaint.io/events/liveview?utm_medium=blog&utm_source=mixpanel) and *then* refreshing the page that we deployed the snippet on. We should see a “Viewed” event in the table:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e11e96b-image2.png",
        "image2.png",
        1868,
        441,
        "#f6f7f9"
      ]
    }
  ]
}
[/block]
If you click around on your site, you can see all the raw data Freshpaint is collecting automatically.
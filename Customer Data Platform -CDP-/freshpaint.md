---
title: "Freshpaint"
slug: "freshpaint"
hidden: false
metadata: 
  title: "Freshpaint Autotrack: Overview | Mixpanel Developer Docs"
  description: "Read our docs on integrating Mixpanel with the Freshpaint Customer Data Platform (CDP) to learn how to set up codeless tracking and standardize customer data from your app to your tools."
createdAt: "2021-02-05T17:25:57.355Z"
updatedAt: "2021-04-29T19:30:42.562Z"
---
[block:api-header]
{
  "title": "Set up codeless tracking with Freshpaint"
}
[/block]
Mixpanel was built to get answers about your product's usage with best-in-class funnel, retention, and cohort analysis tools. But first, you need to get data into your project. This is most commonly [done through a code-based implementation using our hosted SDKs](https://developer.mixpanel.com/docs/implement-mixpanel).

Generally speaking, getting started with Mixpanel (or any other product analytics tooling) usually requires some type of developer assistance. For companies that struggle to get started with Mixpanel due to lack of developer resource availability or concerns over ongoing maintenance, Freshpaint offers a solution.

[block:api-header]
{
  "title": "Freshpaint and hybrid data collection"
}
[/block]
Freshpaint is a data platform that helps unify and standardize customer data from your site or app across your analytics tools. It enables tracking both codeless and code-based data collection at once. While [we discourage relying solely on autotracked events and codeless implementation](https://mixpanel.com/blog/codeless-analytics-problems/), Freshpaint does a great job of helping teams faced by implementation challenges free up developer bandwidth through a hybrid approach to data collection. 
[block:api-header]
{
  "title": "Getting started with Mixpanel + Freshpaint"
}
[/block]
We’ll need three things to get started:

* [Create a (free) Mixpanel account](https://mixpanel.com/register/?utm_medium=blog&utm_source=the-signal&utm_campaign=freshpaint)
* [Create a (free) Freshpaint account](https://www.freshpaint.io/contact/?utm_medium=blog&utm_source=mixpanel)
* A web or mobile application on which we wish to deploy tracking!

We’ll carry out the following tasks:

* [Connect Mixpanel → Freshpaint](https://developer.mixpanel.com/docs/connecting-mixpanel-freshpaint)
* [Deploy Freshpaint’s tracking snippet](https://developer.mixpanel.com/docs/deploy-tracking-snippet) on our web or mobile application. This will automatically instrument your site.
* [Forward events to Mixpanel](https://developer.mixpanel.com/docs/forwarding-events-to-mixpanel)
* [Tag events in Freshpaint](https://developer.mixpanel.com/docs/tagging-events-in-the-visual-editor), using the UI editor

This should take about 10-30 minutes. If you get stuck,[ ask us for help](https://community.mixpanel.com/?utm_medium=blog&utm_source=the-signal&utm_campaign=freshpaint)!
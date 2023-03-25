---
title: "JavaScript"
slug: "javascript-quickstart"
excerpt: "Quickstart Guide"
hidden: false
createdAt: "2021-04-08T17:03:45.051Z"
updatedAt: "2022-09-12T23:43:36.314Z"
---
#Overview
You can install the Mixpanel JavaScript library as an NPM package or as an HTML script snippet. Looking for server-side? Check out the [Node.js documentation](https://developer.mixpanel.com/docs/nodejs).

Check out our [Advanced JavaScript Guide](doc:javascript) for additional advanced configurations and use cases, like setting up your project with European Union data storage.

[Skip to a complete code example](#complete-code-example).

# 1. Initialize the Library 
You will need your project token for initializing your library. You can get your project token from [project settings](https://mixpanel.com/settings/project).

## Installation Option 1: NPM/Yarn
This library is available as a package on NPM (named `mixpanel-browser` to distinguish it from Mixpanel's server-side Node.js library, available on NPM as `mixpanel`). Use the following to install into a project using NPM/Yarn with a front-end bundler such as Webpack or Browserify.
```shell NPM
npm install --save mixpanel-browser
```
```shell Yarn
yarn add mixpanel-browser
```
You can then require the lib like a standard Node.js module and initialize with your project token.

```javascript
import mixpanel from 'mixpanel-browser';
// or with require() syntax:
// const mixpanel = require('mixpanel-browser');

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production
mixpanel.init('YOUR_TOKEN', {debug: true}); 
mixpanel.track('Sign up');
```

[See all configuration options](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelset_config) 

## Installation Option 2: HTML
Paste the HTML script tag snippet within the `<head>` tag of your page and initialize with your project token.

```html
<script type="text/javascript">
(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production
mixpanel.init('YOUR_TOKEN', {debug: true}); 
mixpanel.track('Sign up');
</script>
```

Once the initial code snippet has run, the `mixpanel` object is available globally.

[See all configuration options](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelset_config) 

# 2. Send Data
Let's get started by sending event data. You can send an event from anywhere in your application. Better understand user behavior by storing details that are specific to the event (properties). Mixpanel automatically tracks some properties by default; [learn more](https://help.mixpanel.com/hc/en-us/articles/115004613766-Default-Properties-Collected-by-Mixpanel ).

```javascript
mixpanel.track('Sign Up', {
  'source': "Pat's affiliate site",
  'Opted out of email': true,
});
```
In addition to event data, you can also send [user profile data](https://developer.mixpanel.com/docs/javascript#storing-user-profiles). We recommend this after completing the quickstart guide.

# 3. Check for Success
[Open up Events in Mixpanel](http://mixpanel.com/report/events) to view incoming events. 

Once data hits our API, it generally takes ~60 seconds for it to be processed, stored, and queryable in your project.

> 📘Do Not Track Browser Settings
> Make sure your Do Not Track browser settings are set to false when testing your JavaScript implementation. Mixpanel toggles tracking according to "Do Not Track" (DNT) settings in web browsers. If the DNT setting is set, then Mixpanel won't collect information from that Mixpanel instance. For more information see [this article](https://developer.mixpanel.com/docs/javascript#opting-users-out-of-tracking).

# Complete Code Example
Here's a runnable code example that covers everything in this quickstart guide.
```javascript NPM
import mixpanel from 'mixpanel-browser';
// or with require() syntax:
// const mixpanel = require('mixpanel-browser');

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production
mixpanel.init('YOUR_TOKEN', {debug: true}); 
mixpanel.track('Sign Up', {
  'source': "Pat's affiliate site",
  'Opted out of email': true,
});
```
```html HTML
<script type="text/javascript">
(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production
mixpanel.init('YOUR_TOKEN', {debug: true}); 
mixpanel.track('Sign Up', {
  'source': "Pat's affiliate site",
  'Opted out of email': true,
});

</script>
```

# FAQ
**I want to stop tracking an event/event property in Mixpanel. Is that possible?**
Yes, in Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any new data for the event or property you select to drop. [See this article for more information](https://help.mixpanel.com/hc/en-us/articles/360001307806#dropping-events-and-properties).

**I have a test user I would like to opt out of tracking. How do I do that?**
Mixpanel’s client-side tracking library contains the [opt_out_tracking()](https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelopt_out_tracking) method, which will set the user’s local opt-out state to “true” and will prevent data from being sent from a user’s device. More detailed instructions can be found in the section, [Opting users out of tracking](https://developer.mixpanel.com/docs/javascript#opting-users-out-of-tracking).

**Why aren't my events showing up?**
There are a number of reasons why the events you're attempting to send aren't showing up in your Mixpanel project. Below you'll find a recording that walks through a few common scenarios, how to debug them, and how to fix them. The recording features an example implementation using NPM/Yarn but the troubleshooting steps apply to an HTML implementation as well.
[block:embed]
{
  "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2Ffbba03274dc441b49b578e8a734b1d99&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2Ffbba03274dc441b49b578e8a734b1d99&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2Ffbba03274dc441b49b578e8a734b1d99-00001.gif&key=02466f963b9b4bb8845a05b53d3235d7&type=text%2Fhtml&schema=loom\" width=\"1152\" height=\"864\" scrolling=\"no\" title=\"Loom embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
  "url": "https://www.loom.com/share/fbba03274dc441b49b578e8a734b1d99",
  "title": "Debugging common issues when installing Mixpanel on your web application",
  "favicon": null,
  "image": "https://cdn.loom.com/sessions/thumbnails/fbba03274dc441b49b578e8a734b1d99-00001.gif"
}
[/block]


Related content referenced in the video:
- [Mixpanel JavaScript Library NPM Page](https://www.npmjs.com/package/mixpanel-browser)
- [Project Settings For Getting Your Project Token](https://mixpanel.com/settings/project)
- [Live View](http://mixpanel.com/report/live)
- [Setting Up A Proxy Server](https://developer.mixpanel.com/docs/collection-via-a-proxy#how-to-set-up-a-proxy)

**Does Mixpanel use third-party cookies?**
No, our Mixpanel JavasScript SDK does not set or use any third-party cookies. If you wish to disable cookies entirely, you can set the disable_persistence option to true when initializing your Mixpanel JS instance. Note that disabling persistence will disable the use of super properties and anonymous -> known user tracking.
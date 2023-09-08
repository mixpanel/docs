---
title: "JavaScript"
slug: "javascript-quickstart"
hidden: false
createdAt: "2021-04-08T17:03:45.051Z"
updatedAt: "2023-03-29T23:24:39.402Z"
---
You can use Mixpanel's JavaScript SDK to track events from your website or web application.

### Step 1: Install the SDK

```html Snippet
<!-- Paste this right before your closing </head> tag -->
<script type="text/javascript">
(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
</script>
```
```text NPM
npm install --save mixpanel-browser
```
```text Yarn
yarn add mixpanel-browser
```



### Step 2: Track your first event

You'll need your Project Token for this, which you can get [here](https://mixpanel.com/settings/project).

```javascript Javascript
import mixpanel from 'mixpanel-browser';

// Replace YOUR_TOKEN with your Project Token
mixpanel.init('YOUR_TOKEN', {debug: true}); 

// Set this to a unique identifier for the user performing the event.
// eg: their ID in your database or their email address.
mixpanel.identify(/* "<USER_ID"> */)

// Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
// Include a property about the signup, like the Signup Type
mixpanel.track('Signed Up', {
  'Signup Type': 'Referral',
});
```



🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](mixpanel.com/report/events). For more options, see our [JavaScript reference](doc:javascript).

### FAQ

**Does Mixpanel use third-party cookies?**  
No, our Mixpanel JavaScript SDK does not set or use any third-party cookies. If you wish to disable cookies entirely, you can set the disable_persistence option to true when initializing your Mixpanel JS instance. Note that disabling persistence will disable the use of super properties and anonymous -> known user tracking.

**Why don't I see my events in Mixpanel?**  
Make sure your Do Not Track browser settings are set to false when testing your JavaScript implementation. Mixpanel toggles tracking according to "Do Not Track" (DNT) settings in web browsers. If the DNT setting is set, then Mixpanel won't collect information from that Mixpanel instance. For more information see [this article](https://developer.mixpanel.com/docs/javascript#opting-users-out-of-tracking).

### Walkthrough


[block:embed]
{
  "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2Ffbba03274dc441b49b578e8a734b1d99&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fembed%2Ffbba03274dc441b49b578e8a734b1d99&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2Ffbba03274dc441b49b578e8a734b1d99-00001.gif&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=loom\" width=\"1152\" height=\"864\" scrolling=\"no\" title=\"Loom embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
  "url": "https://www.loom.com/embed/fbba03274dc441b49b578e8a734b1d99",
  "title": "Debugging common issues when installing Mixpanel on your web application",
  "favicon": null,
  "image": "https://cdn.loom.com/sessions/thumbnails/fbba03274dc441b49b578e8a734b1d99-00001.gif",
  "provider": "loom.com",
  "href": "https://www.loom.com/embed/fbba03274dc441b49b578e8a734b1d99"
}
[/block]




Content referenced in the video:

- [Mixpanel JavaScript Library NPM Page](https://www.npmjs.com/package/mixpanel-browser)
- [Project Settings For Getting Your Project Token](https://mixpanel.com/settings/project)
- [See Events in Mixpanel](http://mixpanel.com/report/events)
- [Setting up a Proxy Server](doc:collection-via-a-proxy#how-to-set-up-a-proxy)
---
title: "JavaScript"
slug: "javascript-quickstart"
hidden: false
createdAt: "2021-04-08T17:03:45.051Z"
updatedAt: "2023-03-26T23:48:49.309Z"
---
You can use Mixpanel's JavaScript SDK to track events from your website or web application.


### Step 1: Install the SDK
[block:code]
{
  "codes": [
    {
      "code": "<!-- Paste this right before your closing </head> tag -->\n<script type=\"text/javascript\">\n(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(\".\");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;\"undefined\"!==typeof c?a=b[c]=[]:c=\"mixpanel\";a.people=a.people||[];a.toString=function(a){var d=\"mixpanel\";\"mixpanel\"!==c&&(d+=\".\"+c);a||(d+=\" (stub)\");return d};a.people.toString=function(){return a.toString(1)+\".people (stub)\"};i=\"disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove\".split(\" \");\nfor(h=0;h<i.length;h++)g(a,i[h]);var j=\"set set_once union unset remove delete\".split(\" \");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=[\"get_group\"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement(\"script\");e.type=\"text/javascript\";e.async=!0;e.src=\"undefined\"!==typeof MIXPANEL_CUSTOM_LIB_URL?\nMIXPANEL_CUSTOM_LIB_URL:\"file:\"===f.location.protocol&&\"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\".match(/^\\/\\//)?\"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\":\"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\";g=f.getElementsByTagName(\"script\")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);\n</script>",
      "language": "html",
      "name": "Snippet"
    },
    {
      "code": "npm install --save mixpanel-browser",
      "language": "text",
      "name": "NPM"
    },
    {
      "code": "yarn add mixpanel-browser",
      "language": "text",
      "name": "Yarn"
    }
  ]
}
[/block]
### Step 2: Track your first event

You'll need your Project Token for this, which you can get [here](https://mixpanel.com/settings/project).
[block:code]
{
  "codes": [
    {
      "code": "// Uncomment if you used npm or yarn in Step 1 \n//import mixpanel from 'mixpanel-browser';\n\n// Replace YOUR_TOKEN with your Project Token\nmixpanel.init('YOUR_TOKEN', {debug: true}); \n\n// Set this to a unique identifier for the user performing the event.\n// eg: their ID in your database or their email address.\nmixpanel.identify(/* \"<USER_ID\"> */)\n\n// Track an event. It can be anything, but in this example, we're tracking a Signed Up event.\n// Include a property about the signup, like the Signup Type\nmixpanel.track('Signed Up', {\n  'Signup Type': 'Referral',\n});",
      "language": "javascript",
      "name": "Javascript"
    }
  ]
}
[/block]
🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](mixpanel.com/report/events). For more options, see our [JavaScript reference](doc:javascript).
        
        
You can also follow our video walkthrough [here](https://www.loom.com/embed/fbba03274dc441b49b578e8a734b1d99).





### FAQ
**Why don't I see my events in Mixpanel?**
Make sure you've disabled ad blockers and your Do Not Track (DNT) browser settings are set to false when testing your JavaScript implementation. If the DNT setting is set to true, then Mixpanel won't collect information from that Mixpanel instance.

We recommend [setting up a proxy server](doc:collection-via-a-proxy#how-to-set-up-a-proxy) so that you don't lose events due to ad-blockers.
        
**Does Mixpanel use third-party cookies?**
No, our Mixpanel JavaScript SDK does not set or use any third-party cookies. If you wish to disable cookies entirely, you can set the disable_persistence option to true when initializing your Mixpanel JS instance. Note that disabling persistence will disable the use of super properties and anonymous -> known user tracking.

**What are the recommended configuration options?**
We recommend using localStorage instead of cookies for persistence:

```javascript
mixpanel.set_config({'persistence': 'localStorage'})
```

This prevents getting a "Cookie Too Large" error and in general is a more reliable way to persist state on the browser.

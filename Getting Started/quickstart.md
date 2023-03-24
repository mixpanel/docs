---
title: "Quickstart"
slug: "quickstart"
hidden: false
createdAt: "2023-03-20T21:42:29.615Z"
updatedAt: "2023-03-20T22:00:17.210Z"
---
It takes 5 minutes to get started with Mixpanel. You'll need a developer to add a few lines of tracking code, and from there you can start using the full breadth of Mixpanel's platform. In this guide, we'll show you how to get started.

Note: we're using Javascript for these examples, but we support all major languages & platforms -- see our Installation section for more details.


# Step 1: Install the snippet
[block:code]
{
  "codes": [
    {
      "code": "<!-- Paste this right before your closing </head> tag -->\n<script type=\"text/javascript\">\n(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(\".\");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;\"undefined\"!==typeof c?a=b[c]=[]:c=\"mixpanel\";a.people=a.people||[];a.toString=function(a){var d=\"mixpanel\";\"mixpanel\"!==c&&(d+=\".\"+c);a||(d+=\" (stub)\");return d};a.people.toString=function(){return a.toString(1)+\".people (stub)\"};i=\"disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove\".split(\" \");\nfor(h=0;h<i.length;h++)g(a,i[h]);var j=\"set set_once union unset remove delete\".split(\" \");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=[\"get_group\"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement(\"script\");e.type=\"text/javascript\";e.async=!0;e.src=\"undefined\"!==typeof MIXPANEL_CUSTOM_LIB_URL?\nMIXPANEL_CUSTOM_LIB_URL:\"file:\"===f.location.protocol&&\"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\".match(/^\\/\\//)?\"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\":\"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\";g=f.getElementsByTagName(\"script\")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);",
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
# Step 2: Track your Signup event
You'll need your Project Token for this, which you can get [here](mixpanel.com/settings/project).
[block:code]
{
  "codes": [
    {
      "code": "import mixpanel from 'mixpanel-browser';\n\n// Replace YOUR_TOKEN with your Project Token\nmixpanel.init('YOUR_TOKEN', {debug: true}); \n\n// Set this to a unique identifier for the user performing the event.\n// eg: their ID in your database or their email address.\nmixpanel.identify(/* \"<USER_ID\"> */)\n\n// Track an event. It can be anything, but in this example, we're tracking a Signed Up event.\n// Include a property about the signup, like the Signup Type\nmixpanel.track('Signed Up', {\n  'Signup Type': 'Referral',\n});",
      "language": "javascript",
      "name": "Javascript"
    }
  ]
}
[/block]
🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events page](mixpanel.com/report/events). For more options, see our [Javascript reference](docs/javascript-full-api-reference).


# Step 3: Track your Value Moment event

A Value Moment is some event that indicates that a user is getting value in your product. This differs from product to product, so we've included some examples below to help you determine your value moment. Usually it's the action that users most closely associate with your product.
[block:parameters]
{
  "data": {
    "h-0": "Industry",
    "h-1": "Value Moment Examples",
    "0-0": "SaaS",
    "0-1": "Zoom: Start Video Call\nSlack: Send Message\nNotion: Create Page\nGithub: Create Pull Request",
    "1-0": "Media",
    "1-1": "Netflix: Watch Video\nSpotify: Play Song\nAudible: Open Audiobook",
    "2-0": "E-Commerce",
    "2-1": "Amazon: Complete Purchase\nStitchFix: Start Subscription"
  },
  "cols": 2,
  "rows": 3
}
[/block]
# Step 4: Make your first Board

Mixpanel's KPI Template provides an out of the box Board with the two events you just tracked. Follow this link to create it in your Mixpanel project:

<link to our template>


# Step 5: Open a report and start exploring!

This Board is just a starting point. All of the reports within it are interactive, which means you can open them up and start asking more follow-up questions:

<show how to add a breakdown & filter + drill down into users>


🎉 Congrats, you're up and running with Mixpanel!
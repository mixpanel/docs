---
title: "Project Token"
slug: "project-token"
hidden: false
createdAt: "2020-08-13T18:08:34.151Z"
updatedAt: "2020-11-05T21:50:00.708Z"
---
Every Mixpanel project has a unique alphanumerical token for collecting data. A project's token is not a secret value. In front-end implementation, such as our javascript library, this token will be available to anyone visiting your page.

With that in mind, it is important to note that a project's token is not a form of authorization. It is an identification sent along with each piece of data you send to your project.

Project token is solely used in our Ingestion APIs. For any events with a timestamp of more than five days, we require you to provide authentication via Project Secret along with the token.
[block:api-header]
{
  "title": "Sending data with a Project Token"
}
[/block]

Tokens are provided as values inside of the data sent to mixpanel. Where this value is stored is dependent on the API endpoint used. Information on the specific location can be found in the Ingestion API's specification [link].
[block:code]
{
  "codes": [
    {
      "code": "{\n    \"event\": \"Signup\",\n    \"properties\": {\n      \t\"$distinct_id\": \"1234\",\n        \"token\": \"projecttoken\",\n    }\n}",
      "language": "json",
      "name": "Event Data"
    },
    {
      "code": "{\n    \"$token\": \"projecttoken\",\n    \"$distinct_id\": \"1234\",\n    \"$set\": {\n        \"Favourite Show\": \"The Office\"\n    }\n}",
      "language": "json",
      "name": "Profile Data"
    }
  ]
}
[/block]
 If you are are using our SDKs you will notice that that the project token is required when initializing the library. This token will automatically be included in the data sent out from that instance.

[block:code]
{
  "codes": [
    {
      "code": "<!-- start Mixpanel --><script type=\"text/javascript\">(function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+\"=([^&]*)\")))?m[1]:null};f&&d(f,\"state\")&&(j=JSON.parse(decodeURIComponent(d(f,\"state\"))),\"mpeditor\"===j.action&&(b.sessionStorage.setItem(\"_mpcehash\",f),history.replaceState(j.desiredHash||\"\",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(\".\");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,0)))}}var e=a;\"undefined\"!==typeof g?e=a[g]=[]:g=\"mixpanel\";e.people=e.people||[];e.toString=function(b){var a=\"mixpanel\";\"mixpanel\"!==g&&(a+=\".\"+g);b||(a+=\" (stub)\");return a};e.people.toString=function(){return e.toString(1)+\".people (stub)\"};l=\"disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove\".split(\" \");for(h=0;h<l.length;h++)c(e,l[h]);var f=\"set set_once union unset remove delete\".split(\" \");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=[\"get_group\"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement(\"script\");b.type=\"text/javascript\";b.async=!0;b.src=\"undefined\"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:\"file:\"===c.location.protocol&&\"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\".match(/^\\/\\//)?\"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\":\"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\";d=c.getElementsByTagName(\"script\")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);\nmixpanel.init(\"projecttoken\");\n</script>",
      "language": "javascript"
    },
    {
      "code": "[Mixpanel sharedInstanceWithToken:@\"projectoken\"];",
      "language": "objectivec",
      "name": "[iOS] Objective-C"
    },
    {
      "code": "Mixpanel.initialize(token: \"projectoken\")",
      "language": "swift",
      "name": "[iOS] Swift"
    },
    {
      "code": "public static final String MIXPANEL_TOKEN = \"projectoken\";\nMixpanelAPI mixpanel = MixpanelAPI.getInstance(context, MIXPANEL_TOKEN);",
      "language": "java",
      "name": "[Android] Java"
    },
    {
      "code": "from mixpanel import Mixpanel\nmp = Mixpanel(\"projectoken\")",
      "language": "python",
      "name": null
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Managing a Project's Token"
}
[/block]
A project's token can be found in the Access Keys section of a project's settings overview page: https://mixpanel.com/settings/project/.

 To learn more, view our [project settings guide](https://help.mixpanel.com/hc/en-us/articles/115004490503-Project-Settings).
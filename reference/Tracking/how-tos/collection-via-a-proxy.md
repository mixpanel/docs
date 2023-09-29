---
title: "Collection via Proxy"
slug: "collection-via-a-proxy"
hidden: false
createdAt: "2021-02-10T21:50:27.202Z"
updatedAt: "2023-03-28T23:26:55.905Z"
---
This guide demonstrates how to leverage Mixpanel's free, open-source SDKs for event collection, but route the events through your servers before sending them to Mixpanel. This approach is useful to:

- Use your own domain to collect data
- Have fine-grained control over filtering, auditing, and/or cleaning data before sending it to Mixpanel
- Turn event collection on or off across all platforms quickly
- Route Mixpanel events to other downstreams that you own, like data warehouses or real-time applications in a streaming fashion

It's easy to do this with Mixpanel by "proxying" our [Ingestion API](ref:ingestion-api). 

![](https://files.readme.io/f1aea64-Group_14.svg "Group 14.svg")



[block:html]
{
  "html": "<script src=\"https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fmixpanel%2Ftracking-proxy%2Fblob%2F126203cda52abd1564b8d82ab5dd88f67e7c27a5%2Fnginx.conf&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on\"></script>"
}
[/block]




[block:embed]
{
  "url": "",
  "typeOfEmbed": "github",
  "provider": "embed"
}
[/block]


## How to set up a proxy

### Option 1: Proxy at the web server level

The simplest way is to use our [sample nginx config](https://github.com/mixpanel/tracking-proxy). This makes it extremely easy to spin up a proxy server which will allow you to use your own domain to send tracking data. This can be beneficial if your data is being blocked by ad blockers that filter third-party tracking requests.

### Option 2: Proxy at the application level

If you need more fine-grained control over the data you can use the application server of your choice to implement the endpoints available in our [Ingestion API](ref:ingestion-api). We've put together a [sample Flask application](https://github.com/mixpanel/flask-tracking-proxy) that offers similar behavior as the nginx approach but at the application level.

## How to use the proxy with our SDKs

Once you have deployed your proxy server and it's publicly accessible, you can configure our SDKs to use that server instead of `https://api.mixpanel.com`.

### JavaScript SDK

#### 1. Load the Mixpanel JS library from the proxy domain

   _Note: This is only required if you are NOT bundling the Mixpanel JS library into your source code (via our npm module or otherwise)._

   Add the following variable in your code right before the Mixpanel JS snippet:

```js
// Set this variable
const MIXPANEL_CUSTOM_LIB_URL = "https://<YOUR_PROXY_DOMAIN>/lib.min.js";

// Before this snippet
(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
```



#### 2. Configure the Mixpanel JS client to make requests to your proxy domain

   Take the domain that exposes your proxy server and specify it as the value of the `api_host` config option when you initialize the Mixpanel JS SDK.

```js
mixpanel.init("<YOUR_PROJECT_TOKEN>", {api_host: "https://<YOUR_PROXY_DOMAIN>"})
```



#### Full Example

```html
<html>
    <head>
        <title>Mixpanel Tracking Proxy Demo</title>
        <script type="text/javascript">
            /**
             * Configuration Variables - CHANGE THESE!
             */
            const MIXPANEL_PROJECT_TOKEN = YOUR_MIXPANEL_PROJECT_TOKEN; // e.g. "67e8bfdec29d84ab2d36ae18c57b8535"
            const MIXPANEL_PROXY_DOMAIN = YOUR_PROXY_DOMAIN; // e.g. "https://proxy-eoca2pin3q-uc.a.run.app"
            
            /**
             * Set the MIXPANEL_CUSTOM_LIB_URL - No need to change this
             */
            const MIXPANEL_CUSTOM_LIB_URL = MIXPANEL_PROXY_DOMAIN + "/lib.min.js";
            
            /**
             * Load the Mixpanel JS library asyncronously via the js snippet
             */
            (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
            
            /**
             * Initialize a Mixpanel instance using your project token and proxy domain
             */
            mixpanel.init(MIXPANEL_PROJECT_TOKEN, {debug: true, api_host: MIXPANEL_PROXY_DOMAIN});
            
            /**
             * Track an event when the page is loaded
             */
            mixpanel.track("[Proxy Demo] Page loaded");
        </script>
    </head>
    <body>
        <button onclick="mixpanel.track('[Proxy Demo] Button clicked')">Track event</button>
    </body>
</html>
```



### Android SDK

Add the following `meta-data` entries to your AndroidManifest.xml inside the <application> tag and replace `<YOUR_PROXY_DOMAIN>` with your actual proxy domain.

```java
...
<application>
    <meta-data
      android:name="com.mixpanel.android.MPConfig.EventsEndpoint"
      android:value="<YOUR_PROXY_DOMAIN>/track" />
    <meta-data
      android:name="com.mixpanel.android.MPConfig.PeopleEndpoint"
      android:value="<YOUR_PROXY_DOMAIN>/engage" />
    <meta-data
      android:name="com.mixpanel.android.MPConfig.GroupsEndpoint"
      android:value="<YOUR_PROXY_DOMAIN>/groups" />
    ...
</application>
...
```



### iOS Objective-C SDK

Immediately after you initialize the Mixpanel instance, set the proxy url: 

```objectivec
self.mixpanel = [Mixpanel sharedInstanceWithToken:@"YOUR_PROJECT_TOKEN" launchOptions:launchOptions];
self.mixpanel.serverURL = YOUR_PROXY_DOMAIN; // e.g. @"https://proxy-eoca2pin3q-uc.a.run.app"
```



### iOS Swift SDK

Immediately after you initialize the Mixpanel instance, set the proxy url: 

```swift
mixpanel = Mixpanel.initialize(token: "YOUR_PROJECT_TOKEN")
mixpanel.serverURL = YOUR_PROXY_DOMAIN // e.g. "https://proxy-eoca2pin3q-uc.a.run.app"
```
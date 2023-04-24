---
title: "UTM"
---

When setting up your Mixpanel implementation, one issue of particular interest is tracking users by their original source of traffic. By default, Mixpanel does some of this tracking for you on the web in the form of several default properties.

## Web Attribution

### Initial Referrer and Initial Referring Domain Properties
Mixpanel's Javascript library will track Initial Referrer and Initial Referring Domain and append them as a property to any event that a user completes. These properties are stored in the Mixpanel cookie the first time a user comes to your site and will not change on future site visits as long as the cookie is not cleared.

If a user comes to your site from www.google.com for the first time, for example, then the initial referring domain is equal to www.google.com and the initial referrer is the URL that they first came from. This information will be stored in the Mixpanel cookie and sent with all future events.

Having this information allows you to build reports to see how users from different initial referrers convert through an application.

### $direct
An initial referrer is equal to $direct when a user first lands on a site without being referred by another website. The user may have typed the website address directly, clicked a bookmark, clicked a link from an email, or might have security settings in their browser that prevent referrer data from being passed.

### UTM Properties
Mixpanel's Javascript library will also track first touch UTM tags by default. This allows you to segment key actions by relevant campaign information so that you can quantify the effectiveness of specific campaigns.

First touch attribution informs on how a user originally found your site, even for events that occur after the first visit. If a user makes a purchase or completes some other important event, it is important to know want to know what acquisition channel brought them to your site originally.

Last touch attribution allows you to see how a user found your site most recently. If you customize your tracking code you can utilize last touch UTM properties to measure the effectiveness of various marketing campaigns through Mixpanel's Insights report. You could also leverage Mixpanel's Funnel report to determine if specific campaigns impact conversions. If a user eventually ends up making a purchase or completing an event, you can use last touch UTM tags to determine what acquisition channel brought them to the site most recently.

### Custom Source Tracking
Sometimes the above tracking sources do not suit a customer's needs, or you wish to customize the way you track users from different sources. In this way, you can control how you measure and evaluate the traffic coming from all of your crucial sources.

What you can do is set up some code to track this information when users first come to your site. You can set up custom handling for different domains of special interest in order to track these sources directly.

```javascript
function source(){
  if (document.referrer.search('https?://(.*)google.([^/?]*)') === 0) {
    return 'Google';
  } else if (document.referrer.search('https?://(.*)bing.([^/?]*)') === 0) {
    return 'Bing';
  } else if (document.referrer.search('https?://(.*)yahoo.([^/?]*)') === 0) {
    return 'Yahoo';
  } else if (document.referrer.search('https?://(.*)facebook.([^/?]*)') === 0) {
    return 'Facebook';
  } else if (document.referrer.search('https?://(.*)twitter.([^/?]*)') === 0) {
    return 'Twitter';
  } else {
    return 'Other';
  }
}
```

Using the above code you can track some specific sources directly -- you can add to this list or subtract from it to focus on the most interesting sources of traffic.

### Tracking Last Touch
This code automatically parses and registers last touch UTM tags as properties that get attached to every subsequently tracked event.

Paste the code below the Mixpanel JavaScript snippet that you add to your site to track events.

```javascript
function getQueryParam(url, param) {
// Expects a raw URL
param = param.replace(/[[]/, "\[").replace(/[]]/, "\]");
var regexS = "[\?&]" + param + "=([^&#]*)",
    regex = new RegExp( regexS ),
    results = regex.exec(url);
if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
  return '';
  } else {
  return decodeURIComponent(results[1]).replace(/\W/gi, ' ');
  }
};

function campaignParams() {
var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' ')
    , kw = ''
    , params = {}
    , first_params = {};
var index;
for (index = 0; index < campaign_keywords.length; ++index) {
  kw = getQueryParam(document.URL, campaign_keywords[index]);
  if (kw.length) {
    params[campaign_keywords[index] + ' [last touch]'] = kw;
  }
}
for (index = 0; index < campaign_keywords.length; ++index) {
  kw = getQueryParam(document.URL, campaign_keywords[index]);
  if (kw.length) {
    first_params[campaign_keywords[index] + ' [first touch]'] = kw;
  }
}

mixpanel.register(params);
}
campaignParams();
```

## Mobile Attribution
Mobile attribution, or tracking campaign source for app installs on iOS/Android, can be more complex than the web due to the way mobile devices store attribution information.

For Android, Google provides a referrer property so you know where your installations came from. You can then send that data to Mixpanel (with the exception of data from Facebook and Twitter). To set up automatic referrer tracking on Android, see the Android library.

For iOS, users enter the Apple App Store carrying data about where they came from, but the App Store strips that data once the user arrives in the store. Therefore, users who download your application don’t come with any data showing where they were before arriving at the App Store.

In order to track channel attribution on iOS, you'll need to use a mobile attribution tool. You can see a list of the partners we integrate with on our tech partners page.


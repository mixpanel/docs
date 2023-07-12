# Exclude Bot Activity from Web/JavaScript

By default, the following bots are filtered out by the Mixpanel JavaScript library:
- [Yahoo! Slurp](http://help.yahoo.com/help/us/ysearch/slurp)
- [bingbot/2.0](http://www.bing.com/bingbot.htm)
- [Googlebot/2.1](http://www.google.com/bot.html)
- [Baiduspider/2.0](http://www.baidu.com/search/spider.html)
- [YandexBot/3.0](http://yandex.com/bots)

You can find the exact list on our [GitHub](https://github.com/mixpanel/mixpanel-js/blob/8ac526e5cb8563d11e2206046ab986c6491ac6d7/src/utils.js#L900C1-L925C3)

Any other bot hitting your site will affect your Mixpanel data. That being said, it’s possible to set up some code to filter out these users:

1. Find the user agent information of the individual accessing the site.
2. Look for the word “bot” anywhere in the user agent information.
3. If you find “bot,” set the $ignore property to true.

If you can, identify a common pattern in the bots to block them all in one shot by filtering out any interaction with your site that comes from a web framework that is not a consumer-facing browser. As an example, for GTM bots, this code would look like this:

```
var userAgentBotTest = navigator.userAgent;
mixpanel.register({"User Agent": userAgentBotTest});
if (/(Mozilla\/4.0)/i.test(userAgentBotTest)) {
     mixpanel.register({"$ignore": true});
}
```

If you implement this code, you will block all userAgents with "Mozilla/4.0" in the userAgent. This does include some older browsers, but modern browsers such as Chrome, Safari, and Firefox will never include this in their userAgent strings. See a [common list of bot userAgents](https://www.useragentstring.com/pages/useragentstring.php?typ=Crawler) and [common bot browsers](https://www.useragentstring.com/pages/useragentstring.php?typ=Browser).

If this does not work, you can start tracking this userAgent going forward so you can find the common pattern among all of the bots crawling your site.

### **Note**

$ignore must have a string or at least be set to true, or else the event will fire. For example, if I have '$ignore': '', the event will still fire since it's an empty string. '$ignore': false will also fire the event.

## How do I remove bot data from my project?

Mixpanel data is write once, read forever, which means once a datapoint is written to a project, there isn't a way to selectively remove it.

However, there are a few other options:

- [Hide the Events in question from the UI.](https://docs.mixpanel.com/docs/admin/data-governance/lexicon#hide-events-and-properties)
- If the bot activity has a distinguishing Property value, [create a custom Event](https://docs.mixpanel.com/docs/analysis/advanced/custom-events) that excludes all activity with that value.

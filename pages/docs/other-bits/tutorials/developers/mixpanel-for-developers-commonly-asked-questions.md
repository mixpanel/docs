Here are some commonly asked questions that customers have on implementing Mixpanel.

## Implement Mixpanel on Wordpress, Shopify & PrestaShop

Free hosts like Wordpress, Shopify, PrestaShop, and Google Sites make it easy to get a site up and running. However, in return for simplicity and ease, these free hosts can lack customization which can make it challenging to implement analytics solutions like Mixpanel. Below are some tips for integrating Mixpanel on Wordpress, Google Sites, PrestaShop, and Shopify.

### Wordpress
Though Mixpanel does not have an official plugin to support WordPress, there are plenty of options for getting Mixpanel set up on your WordPress site.

There are a variety of third-party options available that will automatically send data from your WordPress blog to your Mixpanel implementation. Some popular options include [third-party plugins](https://wordpress.org/plugins/tags/mixpanel/). Most of these third-party plugins essentially just track page loads, which means you would be tracking some data, but not really fully utilizing the potential of Mixpanel. Though none are officially supported by Mixpanel, they might be worth checking out if you’re looking for a quick and simple solution.

However, to really exercise the power of Mixpanel, you can do a custom implementation, integrating Mixpanel the same way as any other platform by following the [JavaScript API integration steps](/docs/tracking/reference/javascript).

[One option is to build a child theme in WordPress](https://codex.wordpress.org/Child_Themes) to be able to track events beyond page views. For example, if you have a plugin for a contact form in the page, you could modify the plugin to add the JavaScript specific to the Event within the form.

### Shopify
Even though the integration process is largely the same as the regular [JavaScript API Integration](/docs/tracking/reference/javascript), there are a few things specific to Shopify that you’ll want to account for.

To start, add the Mixpanel JavaScript snippet into the tag of your theme.liquid page. Then, once the library has been successfully loaded, implement mixpanel.track() calls wherever you see fit.

Mixpanel users who have successfully implemented on a Shopify site [have some great recommendations and tips on key locations to place mixpanel.track() calls](https://stackoverflow.com/questions/28160415/shopify-mixpanel-integration/34442476#34442476).

In order to view accurate data on conversions from shopping to checkout (a key Funnel for most ecommerce businesses), you’ll need to take a few additional steps since your shop domain is different than the Shopify checkout domain. However, as a shop, you don’t have control over the Shopify checkout page. So instead, you’ll want to pass the distinct_id to the URL on click, then on the Shopify page, parse and execute the Mixpanel methods.

Another consideration with Shopify sites and Mixpanel is that because the checkout page is a separate domain with its own cookie, Initial Referring Domain Properties sent from the checkout page will come through with a referrer of your own Shopify site. You can use the same method described above of passing the $initial_referring_domain Property to the URL, parse and then execute.

Though Mixpanel does not have an official plugin to support Shopify, there is a [Mixpanel app by Five Thrive](https://apps.shopify.com/mixpanel) available in the Shopify app store that will automatically send data from your Shopify store to your Mixpanel implementation. While this integration app is not officially supported by Mixpanel, it might be worth checking out if you're looking for a quick and simple solution.

### PrestaShop
To get up and running with Mixpanel on a PrestaShop site, paste the [Mixpanel JavaScript snippet](/docs/tracking/reference/javascript) in the header.tpl file between {literal} {/literal} tags. Once you’ve successfully initialized the Mixpanel library, add mixpanel.track calls per the standard JavaScript integration documentation.

## Exclude Bot Activity from Web/JavaScript

By default, the following bots are filtered out by the Mixpanel JavaScript library:
- Yahoo! Slurp
- bingbot/2.0
- Googlebot/2.1
- Baiduspider/2.0
- YandexBot/3.0

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

**Note**
`$ignore` must have a string or at least be set to true, or else the event will fire. For example, if I have `'$ignore': ''`, the event will still fire since it's an empty string. `'$ignore': false` will also fire the event.

### How do I remove bot data from my project?

Mixpanel data is write once, read forever, which means once a datapoint is written to a project, there isn't a way to selectively remove it.

However, there are a few other options:

- [Hide the Events in question from the UI.](https://docs.mixpanel.com/docs/admin/data-governance/lexicon#hide-events-and-properties)
- If the bot activity has a distinguishing Property value, [create a custom Event](https://docs.mixpanel.com/docs/analysis/advanced/custom-events) that excludes all activity with that value.

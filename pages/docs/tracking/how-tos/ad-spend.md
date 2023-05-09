# GUIDES - Tracking Ad Performance

Mixpanel’s event-based-data model enables you to represent and analyze any type of data, including ad campaign performance. This guide shows you how to track this data to Mixpanel. The end result is a report that looks like this.

In this doc, we give step-by-step guidance on how to bring your advertising network data into Mixpanel to look at metrics such as ROAS (Return on Ad Spend), CPC (Cost per click) in the context of in-product conversions. We also provide detailed guides for Google and Facebook Ads. The end result should look like this:

<img width="991" alt="Untitled" src="https://github.com/mixpanel/docs/assets/2077899/84e1c6a1-0130-4529-9be3-5574a73dffac">

<aside>
💡 If you are a Marketer reading this, we encourage you to share this with your dev team to get this one-time setup done. This should not take more than a couple of hours.
</aside>

## Understanding the Data Model

Events are are the core of Mixpanel's data model. Fundamentally, an event is a row of data with a name, a timestamp, and a set of properties. This is how we can represent Ad Data as events.
```jsx
{
	event: 'Ad Data',
	properties: {
		time: 1680307200000,
		source: 'Google',
		campaign_id: 12345,
		campaign_name: 'Launch Commercial US',
 
		// Cost of this campaign in USD for this day
		cost: 37.19,
		// The total clicks of this ad campaign for this day
		clicks: 11,
		// The total impressions of this ad campaign for this day
		impressions: 482
	}
}
```

The crux of this How To guide is turning the data exported by Ad Networks into events that look like the above.

### Best Practices

- **Only include base metrics** cost, clicks, and impressions. We don’t need to send derived metrics like Cost-per-click, because Mixpanel’s [Custom Properties](/docs/analysis/advanced/custom-properties) and Formulas allow us to calculate and alter derived metrics on the fly.
- **No** **Distinct ID:** You’ll notice that our event has no Distinct ID. This is because ad performance data isn’t tied to any particular user. **This is the key difference from behavioral events.** By omitting it, we are ensuring that these events do not get erroneously included in reporting that intend to analyze user behavior such as Funnels, Retentions, Flows, unique user counts, “did not do” cohorts, etc.
    
- **Event properties are aggregated:** You’ll notice the Ad-Data event in this example is scheduled to trigger only once a day. Properties are aggregated counts of all clicks through the day, all impressions through the day, all ad-spend through the day. Reason for this is ad-networks only export data at an aggregate level (without user details) and at fixed intervals (lowest granularity is generally a day)
- **Include an Insert ID:** It’s recommended to include the Insert ID property for these kinds of events. This allows you to send the campaign data to Mixpanel more than once for a particular segment without duplicating the data in reports.
    
    The Insert ID should be made up of unique attributes in the event that separate it from other performance data. 
    
    Using our above event example, the uniquely identifiable properties are:
    
    - The ad network name
    - The date of the performance data
    - The campaign ID
    
    If we were to send this data more than once to Mixpanel, we know that these 3 properties will always be constant. We can build an Insert ID from that information:
    
    ```jsx
    // "G" = Google Ads
    // "2023-04-01" = The date of our data
    // "12345" = The specific campaign ID
    
    $insert_id = `G-2023-04-01-12345`;
    ```
    
    <aside>
    💡 Keep in mind the [Insert ID length limitations](https://developer.mixpanel.com/reference/import-events#propertiesinsert_id). If your ad network has long campaign IDs or other unique properties to use, you should use MD5 or another hashing algorithm to shorten your Insert ID.
    
    </aside>
    

## Gathering Data from Ad Networks

Different ad networks provide different ways to access their raw data. Some allow you to manually download a CSV export that can be transformed into the above format and sent to Mixpanel. Most networks also have APIs that allow you to automate exporting the metrics that you’re interested in.

<aside>
💡 Note: Some of these APIs require registration and permissions with the underlying platform, please read their docs to set this up.
</aside>

- **Google Ads** provides a Reporting API that can be used to extract performance data: [https://developers.google.com/google-ads/api/docs/reporting/overview](https://developers.google.com/google-ads/api/docs/reporting/overview)
- Facebook provides a Marketing Insights API for ad performance metrics: [https://developers.facebook.com/docs/marketing-api/insights](https://developers.facebook.com/docs/marketing-api/insights)
- LinkedIn provides a Marketing Reporting API for ad performance data: [https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/getting-started](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/getting-started)
- Twitter provides an Ads Analytics API that can be used to extract performance data: [https://developer.twitter.com/en/docs/twitter-ads-api/analytics/overview](https://developer.twitter.com/en/docs/twitter-ads-api/analytics/overview)

### **Detailed Guides**

Below are detailed guides for Google and Facebook Ad Networks. The same general process described in these two guides can be followed for any other ad network as well by using their export APIs and pushing the data to Mixpanel.


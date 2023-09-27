# Segment

Segment is a CDP (Customer Data Platform) which lets you track event data and route it to various downstream destinations. Mixpanel integrates seamlessly with Segment -- if you use Segment, it takes just a few clicks to set up Mixpanel.

## Startup Credit Program
Mixpanel offers \$50K in credits to [eligible startups](https://mixpanel.com/startups). Because of our Segment partnership, we're also able to offer startups \$50k in Segment credits. This gives startups the runway to use both tools for free.

Once you create your Segment and Mixpanel accounts, you can fill out [this form](https://airtable.com/shrLP3GSZnxt1WT2v?prefill_Partner%20Code=Mixpanel) and Segment will get back to you within 48 hours to confirm your credits are applied.

Startup eligibility requirements:
* Founded less than 2 years ago
* Raised no more than $8MM USD in total funding

## How the Integration Works
In the simplest form, the Segment libraries (“Sources”) generate messages about what’s happening in your site or app, and send them to the Segment servers. Segment then translates the content of those messages into different formats for use by other tools (which we call ‘Destinations’), and sends the translated messages to those tools. The Segment servers also archive a copy of the data, and can send data to your storage systems (such as databases, warehouses, or bulk-storage buckets).

For detailed instructions on how to install and initialize the Segment library please refer to the [Segment Getting Started Guide](https://segment.com/docs/getting-started/02-simple-install/).

### 1. Integrate with Segment
Once you've installed and initialized a Segment library in your application, get your data into Mixpanel by following the instructions for setting up the [Mixpanel (Actions) Destination](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/)

### 2. Identify Users
The next thing you need to do is identify your users, so that you can understand what your users are really doing. When you call [Segment's `identify` API](https://segment.com/docs/connections/spec/identify/), Mixpanel will set the specified `userId` as the Mixpanel `distinct_id` along with any additional `traits` that you provide.

### 3. Track User Actions
Lastly, track your users' actions using [Segment's `track` API call](https://segment.com/docs/connections/spec/track/).

### 4. Check for Success
[Open up Events View in Mixpanel](http://mixpanel.com/report/events) to view incoming events.

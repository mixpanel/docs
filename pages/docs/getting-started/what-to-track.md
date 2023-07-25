It takes less than 5 minutes to track events to Mixpanel. In this guide, we provide some guidance on what to track and how to track it.

## What to Track
We recommend starting with just two events, which can provide a lot of value with little effort.

### Step 1: Track a Sign Up event
Track a Sign Up event when a user creates an account.
```javascript
mixpanel.track('Sign Up')
```

Tracking Sign Up is a quick way to understand your product's growth; by counting the number of Sign Ups, you can answer "How many new users am I acquiring every day, week, and month?"

### Step 2: Track a Value Moment event
Track a Value Moment event when a user reaches value in your product. Here are some examples:
* Social: Post Created, Friend Added
* E-Commerce: Purchase Completed
* Media: Video Watched, Article Read
* SaaS: Document Created, Call Started

You can track a value moment with the following code snippet:
```javascript
// Replace the name with something that makes sense for your product
mixpanel.track('Video Watched')
```

Tracking a value moment can help answer questions like:
* How many users experience value in my product each day/week/month?
* How many users come back (retain) and experience the value moment again?
* What % of users that Sign Up make it to the Value Moment within their first day?

#### Optional: Include Properties
Properties provide added context to the event. Learn more [here](/docs/tracking/how-tos/events-and-properties).

Extending the above example, you might add the following properties:
```javascript
mixpanel.track('Video Watched', {
    'Genre': 'Comedy',
    'Watch Time (seconds)': 200,
    'Paid': true,
});
```

Properties let you answer questions like:
* What is the most popular genre that users watch?
* How many users watched more than 10 minutes in their first session?
* Which of my paid content gets the most views?

### Step 3: Use the events in our Company KPIs Template
Once you've tracked these two events, you can use our [Company KPIs Template](https://mixpanel.com/project?show-event-translator=true) to generate nine unique reports in a few clicks!

🎉 Congrats on building your first Mixpanel Board!

## How to Track
There are two methods of tracking:
* **Server-Side (Recommended):** In this method, you send events from your servers to Mixpanel. This approach is the most reliable and easy to maintain, since it lives in an environment that you control. It also means that you can add tracking in one place (your servers) rather than in 3 places (web, iOS, Android), which keeps tracking unified and clean. See our [quickstart](/docs/tracking/server) and [best practices](/docs/tracking/how-tos/effective-server) for more details on effective server-side tracking.

* **Client-Side:** In this method, events are generated on the client device and sent to the Mixpanel API. There are two types of client-side tracking: web (Javascript) and mobile. This is less reliable than server-side due to ad-blockers. It's also harder to update tracking, since it might involve redeploying your app to web and mobile clients. You can improve reliability of client-side tracking using a [proxy](/docs/tracking/how-tos/tracking-via-proxy), but this takes more effort.

We recommend tracking everything you possibly can via your servers, and only supplementing that with client-side tracking when necessary.

Note: If you already track events via a CDP or Tag Manager, you can route those events to Mixpanel with our native integrations. See the [Segment](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/), [Rudderstack](https://rudderstack.com/integration/mixpanel/), or [GTM](https://github.com/mixpanel/mixpanel-gtm-template#readme) docs for a walkthrough. We also connect to data warehouses like [Snowflake](/docs/tracking/integrations/snowflake) and have an [HTTP API](/docs/tracking/http-api).

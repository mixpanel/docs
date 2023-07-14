It takes less than 5 minutes to track events to Mixpanel. In this guide, we provide some quick guidance on what to track and how to track it.

## What to Track
If you're just getting started, it can seem overwhelming to track everything in your product. We recommend starting with just 2 key events, which can provide a lot of value right of the gate:

### Step 1: Track a Sign Up event
Track a Sign Up event when a user creates an account.

You can track Sign Up with the following code snippet:
```javascript
mixpanel.track('Sign Up')
```

Tracking Sign Up is a quick way to understand your product's growth; by counting the number of Sign Ups, you can answer "How many new users am I acquiring every day, week, and month?"

### Step 2: Track a Value Moment event
A value moment is some user action that correlates to value in your product. Here are some examples of potential value moments:
* Social: Post Created, Friend Added
* E-Commerce: Order Completed
* Media: Video Watched, Article Read
* SaaS: Document Created, Call Started

You can track a value moment with the following code snippet (replace the event name with something that makes sense for your product):
```javascript
mixpanel.track('Video Watched')
```

Tracking a value moment can help answer questions like:
* How many users experience value in my product each day/week/month?
* How many users come back (retain) and experience the value moment again?
* What % of users that Sign Up make it to the Value Moment within their first day?

#### Optional: Add Properties
Mixpanel lets you track properties, along with events. Properties provide more context about the who/what/where/when of the event. Learn more about events and properties [here](/docs/tracking/how-tos/events-and-properties).

Extending the above example, you might want to include properties about what kind of video the user watched:
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
Once you've tracked these two events, you can use our [Company KPIs Template](https://mixpanel.com/project?show-event-translator=true) to generate nine unique reports! That's all it takes to get started with Mixpanel.


## How to Track
Note: This guide assumes you don't have any tracking set up yet. If you already track events via a CDP or Tag Manager, you can route those events to Mixpanel with our native integrations. See the [Segment](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/), [Rudderstack](https://rudderstack.com/integration/mixpanel/), or [GTM](https://github.com/mixpanel/mixpanel-gtm-template#readme) docs for a quick walkthrough.

There are two methods of tracking:
* **Server-Side (Recommended):** In this method, you send events from your servers to Mixpanel. This approach is the most reliable and easy to maintain, since it lives in an environment that you control. It also means that you can add tracking in one place (your servers) rather than in 3 places (web, iOS, Android), which keeps tracking unified and clean. See our [quickstart](/docs/tracking/server) and [best practices](/docs/tracking/how-tos/effective-server) for more details on effective server-side tracking.

* **Client-Side:** In this method, events are generated on the client device and sent to the Mixpanel API. There are two types of client-side tracking: web (Javascript) and mobile. This is less reliable than server-side due to ad-blockers. It's also harder to update tracking, since it might involve redeploying your app to web and mobile clients. You can improve reliability of client-side tracking using a [proxy](/docs/tracking/how-tos/tracking-via-proxy), but this takes more effort.

We recommend tracking everything you possibly can via your servers, and only supplementing that with client-side tracking when necessary.

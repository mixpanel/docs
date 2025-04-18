# Session Replay (Web): Watch playbacks of user digital experiences

## Overview

Mixpanel Session Replay is the fastest way to understand the whole picture about your customers and make better product decisions, by combining quantitative and qualitative user insights. 

When digging into customer journeys in Mixpanel’s analytics, you can understand “**where** do customers drop-off?” And now, Mixpanel Session Replay enables you to quickly follow-up with, “**why** do customers drop off?”

## Availability

Session Replay is available on the Free, Growth, and Enterprise plans!

- Customers on the Free plan have access to 10k free replays per month.
- Customers on the Growth and Enterprise plans have access to 20k free replays per month.
- Additional custom volumes of Session Replay are available as an add-on purchase for [Enterprise plans](https://mixpanel.com/pricing/).

To access free replays, customers will need to ensure they’re on the latest Mixpanel plans:

- For customers on an existing **Free** plan:
    - Switch your plan to the latest Free plan, which includes 1M monthly events and 10k session replays. You can make this switch directly from the [pricing page](https://mixpanel.com/pricing/).
- For customers on an existing **Growth** plan:
    - You're on the latest plan if you purchased or edited your plan after April 2024. If you’re not sure if you’re on the latest plan, you confirm on the pricing page - if you see ‘Make the Switch’ on the Growth plan, then you are on an older version.
    - You can make the switch to our latest plan directly from the [pricing page](https://mixpanel.com/pricing/).
- Enterprise customers should contact their account manager to determine their plan status.

Customers who purchase the Session Replay add-on will be charged overages for any replays ingested beyond their purchased limit. To avoid disruptions, please monitor your usage regularly. For customers with complimentary Session Replays (whether through a sales discount, an included plan benefit, or our Startup Program), any replays exceeding the monthly or annual limit will first be hidden behind a paywall, and eventually be dropped. Replay usage is aggregated across all projects within your billing account.

## Using Session Replay

Session Replay can be accessed in three places:

1. From User Profile page
2. From Mixpanel reports
3. On the Home page for your project

### From User Profile page

In any user’s profile page, click the ‘View Replays’ button to watch replays from that user. From here, you will be taken to our Replay Player.

![replayProfileEntry](/replayProfileEntryPoint.png)

### From Mixpanel reports

Click any point on a chart for Event, Funnel, and User Profile, and select ‘View Replays’ to view replays that show that event being fired. From here, you will be taken to our Replay Player. 

![replayReportEntry](/replayReportEntryPoint.png)

*Note: reports entry point is currently supported for Event, Funnel, and User Profile metrics only.*

### From the Home page

Find the Latest Replays card and click on individual replays to view them or click on ‘View All Replays‘ to see up to 100 of your latest replays.

![replayHomeEntry](/replayHomeEntryPoint.png)

### Replay Player

![replayHeroImageWithPrivacy](/replayHeroImageWithPrivacy.png)

The Replay Player allows you to watch replays, as well as:

- Expand the player to full-screen
- Copy a URL with or without a timestamp to share with your teammates
- Change the playback speed
- Automatically skip periods of the replay where user is inactive
- See events in the replay timeline
- Jump to different parts of the replay by clicking in the timeline

The Replay Feed on the left of the player also allows you to:

- Sort replays by recency, activity, or duration
- Search for replays by user's name / email, replay date, user ID, or the name of an event in the replay
- See a feed of events that occurred during each replay

## Implementation
Session Replay is not enabled by default; enabling the feature requires instrumentation beyond the standard Mixpanel instrumentation. However, in most cases, implementation is extremely simple, only requiring a single line of code to be changed. 

- Our documentation on how to implement Session Replay with our Javascript SDK can be found [here](/docs/tracking-methods/sdks/javascript#session-replay)
- Our documentation on how to implement Session Replay with CDPs (like Segment and mParticle) can be found [here](/docs/session-replay/session-replay-web#can-i-use-session-replay-with-a-cdp).

Replays sent via your implementation will only be viewable in the project they were ingested in and will not be available to other projects in your org.

Before you enable Session Replay for a large audience, we recommend testing in a demo project, and starting in production with smaller sets of users or accounts, so that you can monitor performance and ensure your privacy rules align with company policies.

## FAQ

### Is Session Replay available for mobile?

As of today, Session Replay is available for web-based applications (including mobile web) on the Enterprise Plan and closed Alpha testing for native iOS apps. Android Alpha testing is expected in early 2025.

For any questions about early mobile access, please reach out to your Account Manager.

### How long are replays stored?

30 days.
 
### Can I prevent Session Replay from recording sensitive content?

By default, all on-screen text elements are masked in replays. Additionally, you can customize how you initialize our SDK to fully control (1) where to record and (2) whom to record. For more details, please see our [implementation docs](/docs/tracking-methods/sdks/javascript#session-replay).

### How can I estimate how many replays I'll have?
If you already use Mixpanel, Session Start events are a way to estimate the rough amount of replays you might expect.  This is especially true if you use timeout-based query sessions. However, because our sessions are defined at query time, we cannot guarantee these metrics will be directly correlated.

When you enable Session Replay, use the above proxy metric (or something similar) to determine a starting sampling percentage, which will determine how many replays will be sent. You can always adjust this as you go to calibrate to the right level. 

### Am I able to sample our session replay collection rate?

Yes, you can configure the percentage of total replays that our SDK will capture with [one line of code in your SDK implementation](/docs/tracking-methods/sdks/javascript#sampling-method). 

This out-of-the-box sampling method is random sampling: your SDK will decide randomly whether the currently SDK instance load falls into the sample or not. We recommend starting at 1% and increasing from there. If you expect low traffic, you can increase the starting sampling percentage. 

If you're still unsure about what sampling percentage to use, you can use our automatically generated [Session Start events](/docs/features/sessions#how-sessions-work) to estimate how many recordings you'll be ingesting, and base the sampling off that.

If instead of random sampling, you want to use conditional logic to control which sessions to record, then your application code can derive its own yes/no decision, and then force a session recording to start after SDK initialization by calling `mixpanel.start_session_recording()`.

If you want to only record certain parts of a single-page application with no new mixpanel.init calls, you can also use our [Start / Stop methods](/docs/tracking-methods/sdks/javascript#session-replay-methods). 

### How does Session Replay affect my website's performance?

Mixpanel leverages the open-source library, [rrweb](https://github.com/rrweb-io/rrweb), to power Session Replay. Both rrweb and Mixpanel are designed with the highest standards of performance in mind.

How the SDK works on your site – the gist:
* Initial Snapshot: When recording starts, rrweb takes a snapshot of the entire webpage's structure (the DOM), assigning unique IDs to each element for change tracking.
* Change Detection: Asynchronously monitors any changes that occur to the DOM using MutationObserver, minimizing work so that we don't need to keep taking full snapshots.
* User Interactions: Listens for actions like clicks and mouse movements and throttles any high frequency events.
* Collection & Delivery: Mixpanel collects the recording data and sends it to our servers in batches every 10 seconds.
* Optimized Compression: Before sending, Mixpanel will compress the payload using the asynchronous CompressionStream API. This will optimize bandwidth while not blocking the UI thread.

We've tested the SDK extensively and it generally has minimal impact on how your website performs. The initial snapshot takes a bit of work, and naturally, more complex and interactive pages generate more data for rrweb and Mixpanel to handle. So, it's always a good practice to do some performance testing after you've implemented Session Replay, just to be sure everything's running smoothly.

### Why can't I view Replays from my Insights or Funnels chart?

Mixpanel looks for the `$mp_replay_id` property on your events in order to determine which replay it belongs to. If you have instrumented both Replays and Events using the Mixpanel JavaScript SDK, the `$mp_replay_id` will automatically be added to events sent by the SDK.

For CDP implementations, look below for instructions on how to configure the SDKs together. To get the relevant Session Replay properties from the SDK, use `mixpanel.get_session_recording_properties()`. [See documentation](/docs/tracking-methods/sdks/javascript#get-replay-properties).

### Why does it say the player failed to load?

In order to maintain a high standard of security, Mixpanel runs your session replays in an isolated domain through an iframe. Sometimes, this domain may be blocked by an ad blocker or certain browser settings. Please try disabling any ad blockers. 

For extensions like uBlock, you can navigate to "My Filters" in the extension settings and paste the following custom filter:

```
@@||mxpnl.com^$domain=mxpnl.com
```

### Why don't I see the ‘View Replays’ button?

You won't see the 'View Replays' button if your Organization is on an older plan. You will need to update to the [latest plan](/docs/session-replay/session-replay-web#availability) to view session replays. 

### Can I use Session Replay with a CDP?

Yes. You can use Session Replay with CDPs like Segment and mParticle.

In order to use Session Replay, your app must include the Mixpanel SDK. [Consult the quickstart](/docs/quickstart/install-mixpanel) to ensure you have the Mixpanel SDK installed, and the [setup guide](/docs/tracking-methods/sdks/javascript#session-replay) to make sure you have Session Replay enabled.

Once you have included the Mixpanel SDK in your app add the following code snippets in order to connect your CDP's data stream with Mixpanel's Session Replay.

##### Segment: Analytics.js

By [adding middleware to Segment's SDK](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/middleware/) we can ensure that all event calls include the session replay properties. We can also ensure that any identify calls are also passed to Mixpanel.

```javascript
// Middleware to add Mixpanel's session recording properties to Segment events
analytics.addSourceMiddleware(({ payload, next, integrations }) => {
	if (payload.obj.type === 'track' || payload.obj.type === 'page') {
		if (window.mixpanel) {
			const segmentDeviceId = payload.obj.anonymousId;
			// -------------------------------------------
			// Comment out one of the below mixpanel.register methods depending on your ID Management Version
			// Original ID Merge
			mixpanel.register({ $device_id: segmentDeviceId, distinct_id : segmentDeviceId });
			// Simplified ID Merge
			mixpanel.register({ $device_id: segmentDeviceId, distinct_id : "$device:"+segmentDeviceId }); 
			// -------------------------------------------	
			const sessionReplayProperties = mixpanel.get_session_recording_properties();
			payload.obj.properties = {
				...payload.obj.properties,
				...sessionReplayProperties
			};
		}
	}
	if (payload.obj.type === 'identify') {
		if (window.mixpanel) {
			const userId = payload.obj.userId;
			mixpanel.identify(userId);
		}
	}
	next(payload);
});
```



##### mParticle: Web SDK

mParticle's Web SDK has a `.getDeviceId()` method which can be used to [retrieve the device_id](https://docs.mparticle.com/developers/sdk/web/initialization/#device-id-device-application-stamp). In the following example, we use this method to bind mParticle's device_id to Mixpanel's device_id, as wall as [patching `logEvent` and `logPageView`](https://docs.mparticle.com/developers/sdk/web/core-apidocs/classes/mParticle%20&%20mParticleInstance.html#index) to include session replay properties on all mParticle events. This configuration assumes you are [forwarding web requests server side](https://docs.mparticle.com/integrations/mixpanel/event/#:~:text=Forward%20Web%20Requests,bool) in the connection settings.

```javascript
mixpanel.init('MIXPANEL-PROJECT-TOKEN', {
	record_sessions_percent: 10,
	loaded: function (mixpanel) {
		window.mParticle.ready(function() {
			const mParticle_device_id = mParticle.getDeviceId();
			if (mParticle_device_id) {
				mixpanel.register({ $device_id: mParticle_device_id, distinct_id : "$device:"+mParticle_device_id });
			}

			// Patch logEvent and logPageView to include sessionReplayProperties
			const originalLogEvent = mParticle.logEvent;
			mParticle.logEvent = function (eventName, eventType, eventAttributes, flags, opts) {
				const sessionReplayProperties = mixpanel.get_session_recording_properties();
				eventAttributes = {
					...eventAttributes,
					...sessionReplayProperties,
				};
				originalLogEvent(eventName, eventType, eventAttributes, flags, opts);
			};
			const originalLogPageView = mParticle.logPageView;
			mParticle.logPageView = function (eventName, eventAttributes, flags, opts) {
				const sessionReplayProperties = mixpanel.get_session_recording_properties();
				eventAttributes = {
					...eventAttributes,
					...sessionReplayProperties,
				};
				originalLogPageView(eventName, eventAttributes, flags, opts);
			};
		});
	}
});
```

##### Rudderstack: Cloud Mode

Rudderstack's Javascript SDK has a `.getAnonymousId()` method which can be used to [retrieve the device_id](https://www.rudderstack.com/docs/sources/event-streams/sdks/rudderstack-javascript-sdk/supported-api/#retrieving-anonymous-id). In the following example, we use this method to bind Rudderstack's anonymousId to Mixpanel's device_id, as well as [patching `track` and `page`](https://www.rudderstack.com/docs/sources/event-streams/sdks/rudderstack-javascript-sdk/supported-api/#page) event methods to include session replay properties on every Rudderstack event.

```javascript
mixpanel.init('MIXPANEL-PROJECT-TOKEN', {
  record_sessions_percent: 10,
  loaded: function (mixpanel) {
    window.rudderanalytics.ready(function() {
      const rudderAnonymousId = rudderanalytics.getAnonymousId();
      if (rudderAnonymousId) {
	mixpanel.register({ $device_id: rudderAnonymousId, distinct_id : "$device:"+rudderAnonymousId });
      }

      // Patch track method to include sessionReplayProperties
      const originalTrack = rudderanalytics.track;
      rudderanalytics.track = function (eventName, eventProperties, options, callback) {
        const sessionReplayProperties = mixpanel.get_session_recording_properties();
        eventProperties = {
          ...eventProperties,
          ...sessionReplayProperties,
        };
        originalTrack(eventName, eventProperties, options, callback);
      };

      // Patch page method to include sessionReplayProperties
      const originalPage = rudderanalytics.page;
      rudderanalytics.page = function (category, name, properties, options, callback) {
        const sessionReplayProperties = mixpanel.get_session_recording_properties();
        properties = {
          ...properties,
          ...sessionReplayProperties,
        };
        originalPage(category, name, properties, options, callback);
      };
    });
  }
});
```

##### Google Tag Manager (GTM)

You can use session replay with Google Tag Manager. First, make sure you have the [Mixpanel GTM Template](/docs/tracking-methods/integrations/google-tag-manager) installed in your workspace.

Once that is added, you can add a new Mixpanel tag to your workspace which turns on Session Replay by following these instructions:

- Add a new tag, and choose the Mixpanel tag type.
- For `Project Token` fill in your Mixpanel project's token
- For `Tag Type` choose `init` from the dropdown
- For `Initialization` choose `Set Options Manually`
- In the `Option key` / `Option value` dropdown, ensure you choose `record_sessions_percent` and the value should be a number between 1 and 100.
- This is also where you can configure other [Session Replay options](/docs/tracking-methods/sdks/javascript#init-options) like `record_block_class` etc...
- For the `Triggering` section, you'll want to choose something [early in the GTM lifecycle](https://support.google.com/tagmanager/answer/7679319?hl=en); typically this is `Initialization - All Pages` or `Consent Initialization - All Pages` to ensure that Session Replay starts recording as soon as the GTM container is initialized.
- Save + Deploy this template to your website and you should be up and going with session replay

Here's a screenshot of a working session replay tag for a visual comparison:

<img src="https://github.com/user-attachments/assets/0905abdf-7f7a-4c3d-9759-6ca0605a66cb" width="400"/>

# Session Replay (Beta)

## Overview

Mixpanel Session Replay is the fastest way to understand the whole picture about your customers and make better product decisions, by combining quantitative and qualitative user insights. 

When digging into customer journeys in Mixpanel’s analytics, you can understand “**where** do customers drop-off?” And now, Mixpanel Session Replay enables you to quickly follow-up with, “**why** do customers drop off?”

## Availability

Currently, Session Replay is currently in invite-only beta access for customers on our [Enterprise plan](https://mixpanel.com/pricing/).

You can join the waitlist for beta access [here](https://mixpanel.com/m/session-replay-beta/).

For any questions about Session Replay or beta access, please reach out to your Account Manager.

## Using Session Replay

Session Replay can be accessed in two places:

1. From User Profile page
2. From Mixpanel reports

### From User Profile page

In any user’s profile page, Click the ‘View Replays’ button to watch replays from that user. From here, you will be taken to our Replay Player.

![replayProfileEntry](/replayProfileEntryPoint.png)

### From Mixpanel reports

Click any point on a chart for Event and Funnel metrics, and select ‘View Replays’ to view replays that show that event being fired. From here, you will be taken to our Replay Player. 

![replayReportEntry](/replayReportEntryPoint.png)

*Note: reports entry point is currently supported for Event and Funnel metrics only.*

### Replay Player

![replayHeroImageWithPrivacy](/replayHeroImageWithPrivacy.png)

The Replay Player allows you to watch replays, as well as:

- Expand the player to full-screen
- Copy a URL to share with your teammates
- Change the playback speed
- Automatically skip periods of the replay where user is inactive

The Replay Feed on the left of the player also allows you to:

- sort replays by recency
- search for replays by user's name / email, replay date, or user ID

## Implementation
Session Replay is not enabled by default; enabling the feature requires instrumentation beyond the standard Mixpanel instrumentation. 

However, in most cases, implementation is extremely simple, only requiring a single line of code to be changed. 

Our documentation on how to implement Session Replay can be found [here](/docs/tracking-methods/sdks/javascript#session-replay-beta).

## Legal (Beta Terms)

Our Session Replay Beta Service Addendum can be found [here](https://mixpanel.com/legal/session-replay-beta-service-addendum/).

## FAQ

### Is Session Replay available for mobile?

As of today, Session Replay is in closed Beta testing for web-based applications (including mobile web) and closed Alpha testing for native iOS apps. Android Alpha testing is expected later this year.

For any questions about mobile beta access, please reach out to your Account Manager.
 

### Can I prevent Session Replay from recording sensitive content?

By default, all on-screen text elements are masked in replays. Additionally, you can customize how you initialize our SDK to fully control (1) where to record and (2) whom to record. For more details, please see our [implementation docs](/docs/tracking-methods/sdks/javascript#session-replay-beta).

### How long are replays stored?

30 days.

### How can I estimate how many sessions I'll have?
If you already use Mixpanel, the simplest way to estimate sessions is to count Total Session Start events in the Insights report. This will tell you how many total Sessions you have each month. If you enable Session Replay, it will collect all of these Sessions by default.

### Am I able to sample our session replay collection rate?

Yes, you can configure the percentage of total replays that our SDK will capture with [one line of code in your SDK implementation](/docs/tracking-methods/sdks/javascript#sampling-method). 

This out-of-the-box sampling method is random sampling: your SDK will decide randomly whether the currently SDK instance load falls into the sample or not. We recommend starting at 1% and increasing from there. If you expect low traffic, you can increase the starting sampling percentage. 

If you're still unsure about what sampling percentage to use, you can use our automatically generated [Session Start events](/docs/features/sessions#how-sessions-work) to estimate how many recordings you'll be ingesting, and base the sampling off that.

If instead of random sampling, you want to use conditional logic to control which sessions to record, then your application code can derive its own yes/no decision, and then force a session recording to start after SDK initialization by calling `mixpanel.start_session_recording()`.

If you want to only record certain parts of a single-page application with no new mixpanel.init calls, you can also use our [Start / Stop recorder methods](/docs/tracking-methods/sdks/javascript#recorder-methods). 

### How soon are Replays available for viewing after a session begins?

There is about a ~1 minute delay between when recordings are captured and when they appear in Mixpanel.  

### Why can't I view Replays from my Insights or Funnels chart?

Mixpanel looks for the `$mp_replay_id` property on your events in order to determine which replay it belongs to. If you have instrumented both Replays and Events using the Mixpanel JavaScript SDK, the `$mp_replay_id` will automatically be added to events sent by the SDK.

For CDP implementations, look below for instructions on how to configure the SDKs together. To get the relevant Session Replay properties from the SDK, use `mixpanel.get_session_recording_properties()`. [See documentation](/docs/tracking-methods/sdks/javascript#get-replay-properties).

### Can I use Session Replay with a CDP?

Yes. You can use Session Replay with CDPs like Segment and mParticle.

In order to use Session Replay, your app must include the Mixpanel SDK. [Consult the quickstart](/docs/quickstart/install-mixpanel) to ensure you have the Mixpanel SDK installed, and the [setup guide](/docs/tracking-methods/sdks/javascript#session-replay-beta) to make sure you have Session Replay enabled.

Once you have included the Mixpanel SDK in your app add the following code snippets in order to connect your CDP's data stream with Mixpanel's Session Replay.

##### Segment: Analytics.js

By [adding middleware to Segment's SDK](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/middleware/) we can ensure that all event calls include the session replay properties. We can also ensure that any identify calls are also passed to Mixpanel.

```javascript
// Middleware to add Mixpanel's session recording properties to Segment events
analytics.addSourceMiddleware(({ payload, next, integrations }) => {
	if (payload.type === 'track' || payload.type === 'page') {
		if (window.mixpanel) {
			const segmentDeviceId = payload.obj.anonymousId;
			//original id
			mixpanel.register({ $device_id: segmentDeviceId, distinct_id : segmentDeviceId })
			//simplified id 
			mixpanel.register({ $device_id: segmentDeviceId, distinct_id : "$device:"+segmentDeviceId });			
			const sessionReplayProperties = mixpanel.get_session_recording_properties();
			payload.obj.properties = {
				...payload.obj.properties,
				...sessionReplayProperties
			};
		}
	}
	if (payload.type === 'identify') {
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

## Appendix: Session Replay Privacy Controls
**Last updated July 30th, 2024**

### Introduction to Session Replay

Mixpanel offers a privacy-first approach to Session Replay, including features such as data masking. Mixpanel’s Session Replay privacy controls were designed to assist customers in protecting end user privacy.

Data privacy regulations are rapidly evolving and vary considerably across states and countries. A consistent requirement across many data privacy regulations for website operators is disclosing to end users that their personal information is being collected, often in a privacy notice. Before implementing Session Replay on your website, a best practice is to review your privacy notice with legal counsel to ensure it remains accurate and compliant with data privacy laws. 

### How does Session Replay work?

Session Replay captures the Document Object Model (DOM) structure and changes to it. Mixpanel then reconstructs the web page, applying recorded events at the time an end user completed them. Within Mixpanel’s platform, you can view a reconstruction of your end user’s screen as they navigate your website. However, Session Replay is not a video recording of your end user’s screen and end user actions are not literally video-recorded.

### How does masking and blocking work? What are the high-level technical details?

Masking and blocking are slightly different.

Masked data is suppressed client-side, meaning it is not collected in its original form by Mixpanel’s SDK, and the data is not stored on Mixpanel servers. Masked elements have their text replaced with asterisks of the same length [****]. 

Blocked data is similarly suppressed client-side, meaning it is not collected in its original form by Mixpanel’s SDK, and the data is not stored on Mixpanel servers. However, blocked elements will be rendered with a placeholder element (e.g., an empty box of similar size). 

Note: interactions (such as mouse-clicks) with blocked and masked elements are still captured by Session Replay.

### Configuring Privacy Controls

By default, Mixpanel masks and/or blocks the most common elements that contain content like input text, non-input text, images, and videos. However, Mixpanel also offers its customers a range of privacy controls to choose to unmask / unblock elements as needed, which are detailed further on this page. 

| Element Type | Default State | Customizable |
| --- | --- | --- |
| Inputs | Mixpanel attempts to mask all user input text.  When a user enters text into an input field, Session Replay captures [****] in place of text. | No. You cannot disable this privacy feature. |
| Text | By default, Mixpanel attempts to mask all non-input text on your webpage. This masked content on your webpage is replaced with [****]. | Yes. Mixpanel empowers its customers to decide to record all non-input text as-is. First, change record_mask_text_selector’s default value from “*” to “” to make all text elements no longer masked. Then, you can individually mask each text element detailed in the next section. |
| Videos and Images | By default, Mixpanel blocks videos and images.  These elements will be rendered with a placeholder element (i.e., an empty box of similar size). Note: interactions with blocked elements will still be captured (e.g., mouse-clicks). | Yes. Mixpanel empowers its customers to decide to record images and videos as-is. 

Other elements not listed in this table are captured by default, and can be blocked at your discretion. You can specify a CSS selector under the config option `record_block_selector` to block all elements which match the selector.

### How to mask and block elements
- To mask text, add the class name “.mp-mask.” Masked content is replaced with [****]
- To block elements containing text entirely, add the class name “.mp-block.” Blocked content will be rendered with a placeholder element
- Specify a CSS selector `record_mask_text_selector` to mask all text in elements that match the selector

Example code below for masking text:
```
mixpanel.init(YOUR_PROJECT_TOKEN, {record_mask_text_selector: ''})
```
```
<div class="text mp-mask">This text is masked!</div>
```
Example code below for blocking elements:
```
mixpanel.init(YOUR_PROJECT_TOKEN, {record_block_selector: '.sensitive-data'})
```
```
<img src="https://image.com" class="mp-block"/>
```

### Disabling Replay Collection 

Once enabled, Session Replay runs on your site until either:
- The user leaves your site
- You call mixpanel.stop_session_recording()

Call mixpanel.stop_session_recording() before a user navigates to a restricted area of your site to disable replay collection while the user is in that area. To restart replay collection, call `mixpanel.start_session_recording()` to re-add the plugin.


### Additional Considerations
WebComponents that utilize HTML attributes may be ingested and stored by Session Replay, regardless of whether they are displayed in an individual recording as text. Customers should utilize the block functionality outlined above to the extent specific areas of a webpage should not be ingested.

### User Opt-Out

Mixpanel’s Session Replay follows Mixpanel’s [standard SDK opt-out setting](/docs/privacy/end-user-data-management#opt-out-users).

### Data Deletion

Deletion requests for Session Replay use Mixpanel’s standard end user management process for events documented [here](/docs/privacy/end-user-data-management).

### Data Retention

Mixpanel retains Session Replays for 30 days from the date the Session Replay is ingested and becomes available for viewing within Mixpanel.

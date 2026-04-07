# Tips and Tricks

You can use Mixpanel's SDKs to track events from your website, web application, or backend servers. We [recommend](../tracking-methods/choosing-the-right-method.md) server-side tracking, since it is more reliable and easier to maintain than web/mobile tracking.

Note: You'll need your Project Token to authenticate, which you can get [here](https://mixpanel.com/settings/project).

## Step 1: Install the SDK

## FAQ

<details>
<summary>Does Mixpanel automatically track page views?</summary>

Yes, if you pass `track_pageview: true` in the `mixpanel.init()` call,
   Mixpanel will automatically track a "Page View" event every time a new 
   page is loaded. 
   Learn more [here](../tracking-methods/sdks/javascript.md#tracking-page-views).
</details>

<details>
<summary>Why aren't my events showing up?</summary>

If tracking from web, make sure you've disabled ad blockers and your Do Not Track (DNT) 
  browser settings are set to false when testing your JavaScript implementation. If 
  the DNT setting is set to true, then Mixpanel won't collect information from that Mixpanel 
  instance. We also recommend [setting up a proxy server](../tracking-methods/sdks/javascript.md#tracking-via-proxy) 
  so that you don't lose events due to ad-blockers.

  If tracking from a mobile device, events may take 1-2 minutes to appear because Mixpanel's 
  mobile SDKs buffer events for 1 minute, or when the app transitions to the background, to 
  conserve battery life and bandwidth. You can call `.flush()` in the mobile SDKs to manually flush events to Mixpanel.
</details>

<details>
<summary>How can I track in a privacy compliant way?</summary>

If a user opts out of tracking, you can call the `.optOutTracking()` method on any of our 
  client-side SDKs; this prevents any subsequent data being tracked from that user's device. 
  Learn more [here](../privacy/protecting-user-data.md).

  For iOS specifically: Mixpanel does not use IDFA, so it does not require user permission 
  through the AppTrackingTransparency(ATT) framework. For more details, refer to our 
  [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details).
</details>

<details>
<summary>Does Mixpanel use third-party cookies?</summary>

No, our Mixpanel JavaScript SDK does not set or use any third-party cookies. If you wish 
  to disable cookies entirely, you can set the disable_persistence option to true when initializing 
  your Mixpanel JS instance. Note that disabling persistence will disable the use of super properties 
  and anonymous -> identified user tracking.
</details>

<details>
<summary>What are the recommended configuration options?</summary>

When tracking on web, we recommend using localStorage, as this is more reliable:

```javascript
mixpanel.set_config({ persistence: "localStorage" });
```
</details>

<details>
<summary>How do I connect events from logged out vs logged in users?</summary>

If tracking client-side, just call `.identify(<user_id>)` when a user logs in and `.reset()`
 when they log out. Mixpanel will automatically stitch the user journey across
  logged out and logged in.

  If tracking server-side, check out our [server-side best practices guide](../best-practices/server-side-best-practices.md). 
  For more information, read our comprehensive guide on [Identifying Users](../tracking-methods/id-management/identifying-users.md).
</details>

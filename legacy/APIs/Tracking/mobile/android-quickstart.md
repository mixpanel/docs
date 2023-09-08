---
title: "Android"
slug: "android-quickstart"
hidden: false
metadata: 
  title: "SDK Integration: Android Quickstart | Mixpanel Developer Docs"
  description: "Learn how to install the Mixpanel Android library using Gradle. Our documentation will ensure you're successful from installing Mixpanel to sending data."
createdAt: "2021-05-05T22:14:07.697Z"
updatedAt: "2023-03-26T23:50:27.223Z"
---
### Step 1: Install the SDK

Add `implementation 'com.mixpanel.android:mixpanel-android:7.+'` as a dependency to your `build.gradle` file.

Once you've updated `build.gradle`, you can force Android Studio to sync with your new configuration by clicking the Sync Project with Gradle Files icon at the top of the window:
![Sync Android With Gradle](https://storage.googleapis.com/cdn-mxpnl-com/static/readme/android-sync-gradle.png)

If it cannot find the dependency, you should make sure you've specified `mavenCentral()` as a repository in `build.gradle`.

Next, add the following permissions in your AndroidManifest.xml:

```java
<!--Required to allow the application to send events to Mixpanel.-->
<uses-permission android:name="android.permission.INTERNET" />

<!--Optional, but recommended so we can send data intelligently based on network conditions -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Optional, but recommended so events will contain information about bluetooth state-->
<uses-permission android:name="android.permission.BLUETOOTH" />
```


### 2. Track your first event
You'll need your Project Token for this, which you can get [here](https://mixpanel.com/settings/project). 
[block:code]
{
  "codes": [
    {
      "code": "import com.mixpanel.android.mpmetrics.MixpanelAPI;\n\npublic class MainActivity extends ActionBarActivity {\n  private MixpanelAPI mp;\n  \n  @Override\n  protected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n    \n    // Replace with your Project Token\n    mp = MixpanelAPI.getInstance(this, \"YOUR_TOKEN\");\n  }\n\n  private void sendToMixpanel() throws JSONException {\n    JSONObject props = new JSONObject();\n    props.put(\"Signup Type\", \"Referral\");\n    mp.track(\"Signed Up\", props);\n  }\n}",
      "language": "java"
    }
  ]
}
[/block]
🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page. For more options, see our [Android reference](doc:android).


### FAQ
**I want to stop tracking an event/event property in Mixpanel. Is that possible?**
Yes, in Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any new data for the event or property you select to drop. [See this article for more information](https://help.mixpanel.com/hc/en-us/articles/360001307806#dropping-events-and-properties).

**I have a test user I would like to opt out of tracking. How do I do that?**
Mixpanel’s client-side tracking library contains the [optOutTracking()](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#optOutTracking--) method, which will set the user’s local opt-out state to “true” and will prevent data from being sent from a user’s device. More detailed instructions can be found in the section, [Opting users out of tracking](android#opting-users-out-of-tracking).

**Why aren't my events showing up?**
First please check your testing device/emulator has access to the internet. To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers every 60 seconds while your application is running, as well as when the application transitions to the background. You can call [flush()](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#flush--) manually if you want to force a flush at a particular moment for example before your application is completely shutdown.

If your events are still not showing up after 60 seconds, check if you have opted out of tracking. You can also enable Mixpanel debugging and logging, it allows you to see the debug output from the Mixpanel Android library. To enable it, you will want to add the following permission within your AndroidManifest.xml inside the `<application>` tag:

```java
...
<application>
    <meta-data
      android:name="com.mixpanel.android.MPConfig.EnableDebugLogging"
      android:value="true" />
    ...
</application>
...
```
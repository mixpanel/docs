---
title: "Android"
slug: "android-quickstart"
excerpt: "Quickstart Guide"
hidden: false
metadata: 
  title: "SDK Integration: Android Quickstart | Mixpanel Developer Docs"
  description: "Learn how to install the Mixpanel Android library using Gradle. Our documentation will ensure you're successful from installing Mixpanel to sending data."
createdAt: "2021-05-05T22:14:07.697Z"
updatedAt: "2022-11-19T18:26:43.486Z"
---
#Overview
We'll show you how to install the Mixpanel Android library using Gradle.

Check out our [Advanced Android Guide](doc:android) for additional configurations and use cases, like setting up your project with European Union data storage.

[Skip to a complete code example](#complete-code-example).

# 1. Install Mixpanel
You will need your project token for initializing your library. You can get your project token from [project settings](https://mixpanel.com/settings/project).

**Step 1 - Add the mixpanel-android library as a gradle dependency:**

We publish builds of our library to the Maven central repository as an .aar file. This file contains all of the classes, resources, and configurations that you'll need to use the library. To install the library inside Android Studio, you can simply declare it as dependency in your build.gradle file.

```java
dependencies {
    implementation 'com.mixpanel.android:mixpanel-android:7.+'
}
```

Once you've updated your build.gradle file, you can force Android Studio to sync with your new configuration by clicking the Sync Project with Gradle Files icon at the top of the window.

![Sync Android With Gradle](https://storage.googleapis.com/cdn-mxpnl-com/static/readme/android-sync-gradle.png)

This should download the .aar dependency at which point you'll have access to the Mixpanel library API calls. If it cannot find the dependency, you should make sure you've specified `mavenCentral()` as a repository in your `build.gradle`.

**Step 2 - Add permissions to your AndroidManifest.xml:**

In order for the library to work you'll need to ensure that you're requesting the following permissions in your AndroidManifest.xml:

```java
<!--
This permission is required to allow the application to send
events and properties to Mixpanel.
-->
<uses-permission
  android:name="android.permission.INTERNET" />

<!--
  This permission is optional but recommended so we can be smart
  about when to send data.
 -->
<uses-permission
  android:name="android.permission.ACCESS_NETWORK_STATE" />

<!--
  This permission is optional but recommended so events will
  contain information about bluetooth state
-->
<uses-permission
  android:name="android.permission.BLUETOOTH" />
```
At this point, you're ready to use the Mixpanel Android library inside Android Studio.

# 2. Initialize Mixpanel
Once you've set up your build system or IDE to use the Mixpanel library, you can initialize it in your code by calling MixpanelAPI.getInstance with your application context, your Mixpanel project token and automatic events setting. You can find your token in [project settings](https://mixpanel.com/settings/project).

```java
import com.mixpanel.android.mpmetrics.MixpanelAPI;


public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        trackAutomaticEvents = true;
        MixpanelAPI mixpanel = MixpanelAPI.getInstance(this, "YOUR_TOKEN", trackAutomaticEvents);
    }
}
```

[See all configuration options](http://mixpanel.github.io/mixpanel-android/index.html)

# 3. Send Data
Let's get started by sending event data. You can send an event from anywhere in your application. Better understand user behavior by storing details that are specific to the event (properties). After initializing the library, Mixpanel will [automatically collect common mobile events](https://mixpanel.com/help/questions/articles/which-common-mobile-events-can-mixpanel-collect-on-my-behalf-automatically). You can enable/disable automatic collection through your [project settings](https://help.mixpanel.com/hc/en-us/articles/115004596186#enable-or-disable-common-mobile-events). Also, Mixpanel automatically tracks some properties by default. [learn more](https://help.mixpanel.com/hc/en-us/articles/115004613766-Default-Properties-Collected-by-Mixpanel)

```java
JSONObject props = new JSONObject();
props.put("source", "Pat's affiliate site");
props.put("Opted out of email", true);

mixpanel.track("Sign Up", props);
```
In addition to event data, you can also send [user profile data](https://developer.mixpanel.com/docs/android#storing-user-profiles). We recommend this after completing the quickstart guide.

# 4. Check for Success
[Open up Events in Mixpanel](http://mixpanel.com/report/events) to view incoming events. 

Once data hits our API, it generally takes ~60 seconds for it to be processed, stored, and queryable in your project.

 👋  👋     Tell us about the Mixpanel developer experience! [https://www.mixpanel.com/devnps](https://www.mixpanel.com/devnps) 👍  👎

# Complete Code Example
Here's a runnable code example that covers everything in this quickstart guide.

```java
import com.mixpanel.android.mpmetrics.MixpanelAPI;


public class MainActivity extends ActionBarActivity {

		private MixpanelAPI mMixpanel;

    @Override
	   protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mMixpanel = MixpanelAPI.getInstance(this, "YOUR_TOKEN");
	   }

...
		
		private void sendToMixpanel() throws JSONException {
			JSONObject props = new JSONObject();
			props.put("source", "Pat's affiliate site");
			props.put("Opted out of email", true);
			mixpanel.track("Sign Up", props);
	  }

...
}
```

# FAQ
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
Please note if you route your data to Mixpanel's EU servers, you will need to look at EU servers( https://eu.mixpanel.com) instead.
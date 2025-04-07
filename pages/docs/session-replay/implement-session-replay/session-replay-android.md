# Session Replay (Android): Watch playbacks of user digital experiences

## Overview

Mixpanel Session Replay is the fastest way to understand the whole picture about your customers and make better product decisions, by combining quantitative and qualitative user insights.

When digging into customer journeys in Mixpanel’s analytics, you can understand “**where** do customers drop-off?” And now, Mixpanel Session Replay enables you to quickly follow-up with, “**why** do customers drop off?”

## Availability

Currently, Android Session Replay is in invite-only Alpha access for customers on our Enterprise plan.

For any questions about Session Replay or Android Alpha access, please reach out to your Account Manager. Note: as our Alpha program is early access, our functionality, including data masking features, may have bugs and cause crashes. Be sure to test thoroughly before enabling in production.

For more information on our Web replay functionality, read [here](/docs/session-replay/session-replay-web)

Before publishing an App with Session Replay enabled, make sure to test it thoroughly to ensure that no sensitive data is exposed. Customizing masking rules in particular should be reviewed carefully. Like all Mixpanel product features, Mixpanel's customers are responsible for their configuration of Session Replay and ensuring sensitive data is not exposed.

# Quick Start Guide

## Prerequisite

You are already a Mixpanel customer and have the latest version of the Mixpanel Android SDK installed (minimum supported version is `v8.0.2`). If not, please follow this [doc](/docs/quickstart) to get started.

## Install

You can integrate the Mixpanel Android Session Replay SDK into your Android project by embedding the Android Archive (AAR) file below.

### Open Your Android Studio Project

Open your existing Android Studio project where you want to integrate the Mixpanel Android Session Replay SDK.

### Add Mixpanel Session Replay Library

Download and Unzip the below zip file to your local drive

[mixpanel-android-session-replay.aar.zip](https://mxpnl.notion.site/Mixpanel-Android-Session-Replay-SDK-Alpha-1bbe0ba92562800dacdbec9cb597d397)

1. Copy the AAR file to the `app/libs` folder in your Android project.

2. Configure your project's Gradle settings:

   **For Kotlin DSL (settings.gradle.kts):**
   Add to the repositories section under `dependencyResolutionManagement`:

   ```kotlin
   flatDir {
       dirs("libs")
   }
   ```

   **For Groovy DSL (build.gradle):**
   Add to the repositories section under `buildScripts`:

   ```groovy
   flatDir {
       dirs("libs")
   }
   ```

3. Add the following dependencies to your module's `build.gradle` or `build.gradle.kts`:

   ```gradle
   implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:+")
   implementation("com.squareup.curtains:curtains:+")
   implementation(files("libs/mixpanel-android-session-replay.aar"))
   ```

4. Sync your project with Gradle files.

## Initialize

You should have the main Mixpanel SDK installed (minimum version `v8.0.2`), if not, please refer to [Prerequisite](/docs/tracking-methods/sdks/android) Add the initialization code at the start of your app's lifecycle.

Initialize the Session Replay SDK by following these steps:

1. In your Application class, initialize the MPSessionReplay SDK:

   ```kotlin
   private fun initializeMixpanel() {
       val token = "MY_PROJECT_TOKEN"
       val trackAutomaticEvents = true

       val mixpanel = MixpanelAPI.getInstance(this, token, trackAutomaticEvents)
       mixpanel.identify("DISTINCT_ID")


       val config = MPSessionReplayConfig(
           wifiOnly = false,
           recordSessionsPercent = 100.0
       )

       MPSessionReplay.initialize(this, token, mixpanel.distinctId, config)
   }
   ```

2. Start recording when appropriate:

   ```kotlin
   MPSessionReplay.getInstance()?.startRecording()
   ```

Note: Replace `YOUR_PROJECT_TOKEN` with your actual Mixpanel project token and use appropriate value for `DISTINCT_ID`.

## Configuration Options

### Session Replay Config

Upon initialization you can provide a MPSessionReplayConfig object to specify the configuration. Currently, there are only three config options:

`wifiOnly` - when set to `true` replay events will only be flushed to the server when the device has a WiFi connection, if there is no WiFi, flushes are skipped and the events remain in the in-memory queue until WiFi is restored (or until the queue reaches its limit and the oldest events are evicted to make room for newer events). When set to `false` replay events will be flushed with any network connection, including cellular. - Default: `true`

`recordSessionsPercent` - this is a value between 0.0 and 100.0 that controls the sampling rate for recording session replays, at 0.0 no sessions will be recorded, at 100.0 all sessions will be recorded. - Default: 0.0

`autoMaskedViews` - This is a `Set` of enum options for the types of views that should be masked by the SDK automatically. By default it includes all available options: `ImageView`, `TextView` and `WebView` .

- Config to auto mask Images only

```kotlin
MPSessionReplayConfig(
            recordSessionsPercent = 100.0,
            autoMaskedViews = mutableSetOf(AutoMaskedView.ImageView)
        )
```

- Config to completely disable auto masking

```kotlin
MPSessionReplayConfig(
            recordSessionsPercent = 100.0,
            autoMaskedViews = emptySet()
        )
```

- Config with default setting which is to auto mask image, text and WebViews

```kotlin
MPSessionReplayConfig(recordSessionsPercent = 100.0)
```

## Enable Session Replay

**Start Recording**
If you want to record the entire activity since the app’s launch, we recommend starting the recording at the beginning of your app’s lifecycle. If you want to record only for specific flows or features, start the recording at the entry point of the flow or feature.

The recording automatically stops when the app goes to the background. Therefore, if you want to continuously record the replays, you’ll need to restart the replay once the app becomes active.

```kotlin
MPSessionReplay.getInstance()?.startRecording()
```

**Stop Recording**

The SDK automatically stops recording when the app goes to the background. However, if you’re recording replays for specific flows or features, you need to manually call `stopRecording` at the end of each flow or feature.

```kotlin
MPSessionReplay.getInstance()?.stopRecording()
```

## Privacy Settings

By default, Mixpanel will always mask all input text fields to exclude more sensitive views with user inputs from recording. To protect end-user privacy, input text fields cannot be unmasked .

By default, Mixpanel will mask all text. You can unmask text like `TextView` at your discretion.

By default, Mixpanel will mask all images. Images can be unmasked at your discretion.

By default, Mixpanel will mask all WebViews. WebViews can be unmasked at your discretion.

[See `autoMaskedViews` in config section above.](#session-replay-config)

To mark any view as sensitive:

```kotlin
// Compose
Image(
    painter = painterResource(id = R.drawable.family_photo),
    contentDescription = "Family Photo",
    modifier = Modifier.mpReplaySensitive(true)
)

// XML
val creditCardView: ImageView = findViewById(R.id.creditCardView)
MPSessionReplay.getInstance()?.addSensitiveView(creditCardView)
```

To mark a Compose view as safe:

```kotlin
Image(
    painter = painterResource(id = R.drawable.background_image),
    contentDescription = "Background Image",
    modifier = Modifier.mpReplaySensitive(false)
)
```

## Using Session Replay

Please refer to [Using Session Replay](/docs/session-replay/session-replay-web#using-session-replay)

## Legal (Beta Terms)

Our Session Replay Beta Service Addendum can be found [here](https://mixpanel.com/legal/session-replay-beta-service-addendum/).

The alpha and beta of Mixpanel’s mobile session replay SDK will track certain events and send them to Mixpanel so that Mixpanel can understand and improve the alpha and beta mobile session replay feature experience. These events include starting and stopping a session, adding and removing sensitive classes, adding sensitive views and adding safe views. Nothing about your application will be included in this tracking; only your usage of the Mixpanel Session Replay SDK.

## FAQ

### How does Session Replay work in Android?

Session Replay observes user interactions within your app, capturing UI hierarchy changes and storing them as images, which are then sent to Mixpanel. Mixpanel reconstructs these images, applying recorded events as an end-user completes them. Within Mixpanel’s platform, you can view a reconstruction of your end-user’s screen as they navigate your app. However, Session Replay is not a literal video recording of your end-user’s screen; end-user actions are not video-recorded.

### What is the bandwidth impact and will it cause users to incur additional data charges?

The bandwidth impact of Session Replay depends on the setting of the `wifiOnly` parameter.

When `wifiOnly` is set to `true` (default setting), replay events are only flushed to the server when the device has a WiFi connection. If there is no WiFi, flushes are skipped, and the events remain in the in-memory queue until WiFi is restored. This ensures no additional cellular data is used, preventing users from incurring additional data charges.

When `wifiOnly` is set to `false`, replay events are flushed with any available network connection, including cellular. In this case, the amount of cellular data consumed depends on the intensity of user interactions and the typical session length of your app. Users may incur additional data charges if large amounts of data are transmitted over cellular connections.

### How does Session Replay for mobile work if my app is offline?

Session Replay for mobile currently doesn’t work in offline mode.

### Am I able to sample our session replay collection rate?

Yes, you can configure the percentage of total replays that our SDK will capture as below.

```kotlin
val config = MPSessionReplayConfig(
    wifiOnly = false,
    recordSessionsPercent = 50.0
)

MPSessionReplay.initialize(this, token, mixpanel.distinctId, config)

```

This out-of-the-box sampling method is random sampling: your SDK will decide randomly whether the currently SDK instance load falls into the sample or not. We recommend starting at 1% and increasing from there. Please note: if you expect low traffic, you can increase the starting sampling percentage. It is a good idea to control this with your own API, so you can change it on the fly without redeploying your app. While you're testing, we recommend that you set it to 100 and this ensure every user session will be sent to Mixpanel. Once testing is done, we recommend lowering this value in production.

### Does it work in XML/Jetpack Compose apps?

Yes, standard XML-based apps are fully supported while Jetpack Compose apps have limited support for automatic masking of sensitive views. If your app is using Jetpack Compose it is recommended that you manually mark your views as sensitive.

### Does it support Java based app?

Yes, Java and Kotlin are fully interoperable.

### Can I prevent Session Replay from recording sensitive content?

All `EditText` and `TextView` components are masked by default. `EditText` cannot be unmasked, while `TextView can be unmasked` You can also mask any view manually by calling:

```kotlin
// Compose
Image(
    painter = painterResource(id = R.drawable.family_photo),
    contentDescription = "Family Photo",
    modifier = Modifier.mpReplaySensitive(true)
)

// XML
val creditCardView: ImageView = findViewById(R.id.creditCardView)
MPSessionReplay.getInstance()?.addSensitiveView(creditCardView)
```

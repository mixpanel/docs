# Session Replay (iOS): Watch playbacks of user digital experiences

## Overview

Mixpanel Session Replay is the fastest way to understand the whole picture about your customers and make better product decisions, by combining quantitative and qualitative user insights.

When digging into customer journeys in Mixpanel’s analytics, you can understand “**where** do customers drop-off?” And now, Mixpanel Session Replay enables you to quickly follow-up with, “**why** do customers drop off?”

## Availability

Currently, iOS Session Replay is in invite-only Beta access for customers on our Enterprise plan.

For any questions about Session Replay or iOS Beta access, please reach out to your Account Manager. Note: as our Beta program is early access, our functionality, including data masking features, may have bugs and cause crashes. Be sure to test thoroughly before enabling in production.

For more information on our Web replay functionality, read [here](/docs/session-replay/session-replay-web)

Before publishing an App with Session Replay enabled, make sure to test it thoroughly to ensure that no sensitive data is exposed. Customizing masking rules in particular should be reviewed carefully. Like all Mixpanel product features, Mixpanel's customers are responsible for their configuration of Session Replay and ensuring sensitive data is not exposed.

# Quick Start Guide

## Prerequisite

You are already a Mixpanel customer and have the latest version of the Mixpanel Swift SDK installed (minimum supported version is `v4.3.1`). If not, please follow this [doc](/docs/quickstart) to get started.

## Install

You can integrate the Mixpanel iOS Session Replay SDK into your iOS project by embedding the XCFramework below.

### Open Your Xcode Project

Open your existing Xcode project where you want to integrate the Mixpanel iOS Session Replay SDK.

### Add Mixpanel Session Replay Package

Download and Unzip the below zip file to your local drive

[MixpanelSessionReplay.xcframework.zip](https://www.notion.so/Mixpanel-iOS-Session-Replay-SDK-Beta-10ae0ba9256280cdb6e0f39d594cb344?pvs=21)

- In Xcode, navigate to your Target's General settings and add the .xcframework file you just unzipped to the "Frameworks, Libraries, and Embedded Content" section
- Make sure that the Embed setting is set to “Embed & Sign”

![Embed Framework](/ios_sr_embed_framework.png)

## Initialize

You should have the main Mixpanel SDK installed (minimum version `v4.3.1`), if not, please refer to [Prerequisite](/docs/tracking-methods/sdks/swift) Add the initialization code at the start of your app's lifecycle.

SwiftUI

```swift
import Mixpanel
import MixpanelSessionReplay

struct SessionReplayDemoApp: App {
    @State private var isActive = true
    @Environment(\\.scenePhase) private var scenePhase

    var body: some Scene {
        WindowGroup {
            ...
        }
        .onChange(of: scenePhase) {
            if scenePhase == .active {
                let config = MPSessionReplayConfig(wifiOnly: false, recordSessionsPercent: 100.0)
                let sessionReplayInstance = MPSessionReplay.initialize(token: Mixpanel.mainInstance().apiToken, distinctId: Mixpanel.mainInstance().distinctId, config: config)

                sessionReplayInstance.loggingEnabled = true
                sessionReplayInstance.startRecording()
            }
        }
}

```

UIKit

```swift
import Foundation
import UIKit

import Mixpanel
import MixpanelSessionReplay

class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        Mixpanel.initialize(token: token, trackAutomaticEvents: true)

        let config = MPSessionReplayConfig(
            wifiOnly: false,
            recordSessionsPercent: 100.0
        )
        let sesionReplayInstance = MPSessionReplay.initialize(
            token: Mixpanel.mainInstance().apiToken,
            distinctId: Mixpanel.mainInstance().distinctId,
            config: config
        )
        #if DEBUG
        Mixpanel.mainInstance().loggingEnabled = true
        MPSessionReplay.getInstance()?.loggingEnabled = true
				#endif
        return true
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        MPSessionReplay.getInstance()?.startRecording()
    }

}

```

## Configuration Options

### Session Replay Config

Upon initialization you can provide a SessionReplayConfig object to specify the configuration. Currently, there are only three config options:

`wifiOnly` - when set to `true` replay events will only be flushed to the server when the device has a WiFi connection, if there is no WiFi, flushes are skipped and the events remain in the in-memory queue until WiFi is restored (or until the queue reaches its limit and the oldest events are evicted to make room for newer events). When set to `false` replay events will be flushed with any network connection, including cellular. - Default: `true`

`recordSessionsPercent` - this is a value between 0.0 and 100.0 that controls the sampling rate for recording session replays, at 0.0 no sessions will be recorded, at 100.0 all sessions will be recorded. - Default: 0.0

`autoMaskedViews` - This is a `Set` of enum options for the types of views that should be masked by the SDK automatically. By default it includes all available options: `Image`, `Text` and `Web` .

- Config to auto mask Images only

```swift
MPSessionReplayConfig(recordSessionsPercent: 100.0, autoMaskedViews: [.Image])
```

- Config to completely disable auto masking

```swift
MPSessionReplayConfig(recordSessionsPercent: 100.0, autoMaskedViews: [])
```

- Config with default setting which is to auto mask image, text and WebViews

```swift
MPSessionReplayConfig(recordSessionsPercent: 100.0)
```

`autoCapture` - This an enum to selectively disable the runtime method replacement functionality (aka "swizzling) in the event that it conflicts with another SDK ([like New Relic](https://docs.newrelic.com/docs/mobile-monitoring/new-relic-mobile-ios/get-started/new-relic-ios-compatibility-requirements/#method))

- Config to auto capture on both view controller lifecycle methods and touch events (Default)

```swift
MPSessionReplayConfig(recordSessionsPerecent: 100.0, autoCapture: .enabled)
```

- Config to auto capture only on view controller lifecycle events -- use this if you want to keep the touch based functionality in the conflicting SDK, but not their view controller functionality.

```swift
MPSessionReplayConfig(recordSessionsPerecent: 100.0, autoCapture: .viewControllerLifecycle)
```

- Config to auto capture only on touch events -- use this if you want to keep the view controller lifecycle functionality in the conflicting SDK, but not their touch functionality.

```swift
MPSessionReplayConfig(recordSessionsPerecent: 100.0, autoCapture: .touch)
```

- Config to completely disable auto capture -- use this if you want to keep all functionality in the conflicting SDK

```swift
MPSessionReplayConfig(recordSessionsPerecent: 100.0, autoCapture: .disabled)
```

### Manual Screenshot Capture

If you have partially or completely disabled automatic screen capture via the `autoCapture` config setting you can manually capture screenshots by calling `captureScreenshot()`:

```swift
MPSessionReplay.getInstance()?.captureScreenshot()
```

Or if the manual capture was triggered by a touch event:

```swift
MPSessionReplay.getInstance()?.captureScreenshot(withTouchEvent: touchEvent)
```

NOTE: If you choose to disable auto capture and do manual screen capturing instead, it will be up to you to determine when, where and how you call the `captureScreenshot()` method in your application. The most naïve approach would be to call it on a `Timer`, for example:

```swift
let screenshotTimer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
    MPSessionReplay.getInstance()?.captureScreenshot()
}
```

Keeping in mind that this is relatively inefficient and will result in capturing unnecessary/unchanged screenshots, it's also possible to miss important moments in between the timed screenshots. Taking screenshots on demand at critical moments will always be preferable.

### Logging

Developers can enable or disable logging with the `loggingEnabled` property of the `MPSessionReplay` object.

### Example

```swift
let token = Mixpanel.mainInstance().apiToken
let distinctId = Mixpanel.mainInstance().distinctId
let config = MPSessionReplayConfig(wifiOnly: false, recordSessionsPercent: 50.0)
let sessionReplayInstance = MPSessionReplay.initialize(token: token, distinctId: distinctId, config: config)
sessionReplayInstance.loggingEnabled = true

```

## Enable Session Replay

**Start Recording**
If you want to record the entire activity since the app’s launch, we recommend starting the recording at the beginning of your app’s lifecycle. If you want to record only for specific flows or features, start the recording at the entry point of the flow or feature.

The recording automatically stops when the app goes to the background. Therefore, if you want to continuously record the replays, you’ll need to restart the replay once the app becomes active.

```swift
MPSessionReplay.getInstance()?.startRecording()
```

**Stop Recording**

The SDK automatically stops recording when the app goes to the background. However, if you’re recording replays for specific flows or features, you need to manually call `stopRecording` at the end of each flow or feature.

```swift
MPSessionReplay.getInstance()?.stopRecording()
```

## Privacy Settings

By default, Mixpanel will always mask all input text fields to exclude more sensitive views with user inputs from recording. To protect end-user privacy, input text fields cannot be unmasked .

By default, Mixpanel will mask all text. You can unmask text like `UILabels` at your discretion.

By default, Mixpanel will mask all images. Images can be unmasked at your discretion.

By default, Mixpanel will mask all WebViews. WebViews can be unmasked at your discretion.

[See `autoMaskedViews` in config section above.](#session-replay-config)

To mark any view as sensitive:

```swift
// SwiftUI
Image("family photo")
	.mpReplaySensitive(true)

// UIKit
let ccView = CreditCardUIView()
ccView.mpReplaySensitive = true
```

To mark any view as safe:

```swift
// SwiftUI
BackgroundImage()
    .mpReplaySensitive(false)

//UIKit
let bgImage = BackgroundImage()
bgImage.mpReplaySensitive = false
```

## Using Session Replay

Please refer to [Using Session Replay](/docs/session-replay/session-replay-web#using-session-replay)

## Legal (Beta Terms)

Our Session Replay Beta Service Addendum can be found [here](https://mixpanel.com/legal/session-replay-beta-service-addendum/).

The alpha and beta of Mixpanel’s mobile session replay SDK will track certain events and send them to Mixpanel so that Mixpanel can understand and improve the alpha and beta mobile session replay feature experience. These events include starting and stopping a session, adding and removing sensitive classes, adding sensitive views and adding safe views. Nothing about your application will be included in this tracking; only your usage of the Mixpanel Session Replay SDK.

## FAQ

### How does Session Replay work in iOS?

Session Replay observes user interactions within your app, capturing UI hierarchy changes and storing them as images, which are then sent to Mixpanel. Mixpanel reconstructs these images, applying recorded events as an end-user completes them. Within Mixpanel’s platform, you can view a reconstruction of your end-user’s screen as they navigate your app. However, Session Replay is not a literal video recording of your end-user’s screen; end-user actions are not video-recorded.

### What is the expected impact on my app performance?

There is no impact on your app’s performance when there are no user interactions or nothing changes on the screen. When there are user interactions, expect approximately 1% to 3% more CPU usage and around 1MB more memory consumption. There is no impact on disk I/O because Session Replay does not write anything to your disk. In our own testing, the overhead is unnoticeable, however this testing was not exhaustive and you may discover the recording overhead may negatively impact your mobile application performance depending on your application specifications. If you experience any performance degradations after installing Session Replay, please reach out to us.

### What is the bandwidth impact and will it cause users to incur additional data charges?

The bandwidth impact of Session Replay depends on the setting of the `wifiOnly` parameter.

When `wifiOnly` is set to `true` (default setting), replay events are only flushed to the server when the device has a WiFi connection. If there is no WiFi, flushes are skipped, and the events remain in the in-memory queue until WiFi is restored. This ensures no additional cellular data is used, preventing users from incurring additional data charges.

When `wifiOnly` is set to `false`, replay events are flushed with any available network connection, including cellular. In this case, the amount of cellular data consumed depends on the intensity of user interactions and the typical session length of your app. Users may incur additional data charges if large amounts of data are transmitted over cellular connections.

### How does Session Replay for mobile work if my app is offline?

Session Replay for mobile currently doesn’t work in offline mode.

### Am I able to sample our session replay collection rate?

Yes, you can configure the percentage of total replays that our SDK will capture as below.

```swift
let config = MPSessionReplayConfig(wifiOnly: false, recordSessionsPercent: 50.0)
let sessionReplayInstance = MPSessionReplay.initialize(token: token, distinctId: distinctId, config: config)

```

This out-of-the-box sampling method is random sampling: your SDK will decide randomly whether the currently SDK instance load falls into the sample or not. We recommend starting at 1% and increasing from there. Please note: if you expect low traffic, you can increase the starting sampling percentage. It is a good idea to control this with your own API, so you can change it on the fly without redeploying your app. While you're testing, we recommend that you set it to 100 and this ensure every user session will be sent to Mixpanel. Once testing is done, we recommend lowering this value in production.

### Does it work in SwiftUI/UIKit apps?

Yes, please refer to this [section](#initialize)

### Does it support Obj-C based app?

Yes, Objective-C and Swift are fully interoperable.

### Can I prevent Session Replay from recording sensitive content?

If your app is SwiftUI-based or UIKit-based, all `UITextField` and `UILabel` components are masked by default. `UITextField` cannot be unmasked, while `UILabels can be unmasked` You can also mask any view manually by calling:

```swift
// SwiftUI
Image("family photo")
	.mpReplaySensitive(true)

// UIKit
let ccView = CreditCardUIView()
ccView.mpReplaySensitive = true
```

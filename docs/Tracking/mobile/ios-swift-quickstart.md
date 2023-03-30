---
title: "iOS - Swift"
slug: "ios-swift-quickstart"
hidden: false
createdAt: "2021-04-21T20:28:33.873Z"
updatedAt: "2023-03-26T23:49:09.160Z"
---
### Step 1: Install the SDK
**Swift Package Manager (requires Xcode 12+)**
1. In Xcode, select File > Swift Packages > Add Package Dependency.
2. Paste the URL `https://github.com/mixpanel/mixpanel-swift` and a minimum semantic version of v2.8.0.

**CocoaPods**
1. Create a Podfile in your Xcode project directory by running `pod init` in your terminal, edit the Podfile generated, and add the following line: `pod 'Mixpanel-swift'`.
2. Run `pod install` in your Xcode project directory. CocoaPods should download and install the Mixpanel library, and create a new Xcode workspace. Open up this workspace in Xcode or typing `open *.xcworkspace` in your terminal.

**Carthage**
Add `github "mixpanel/mixpanel-swift"` to your Cartfile.


### Step 2: Track your first event
You'll need your Project Token for this, which you can get [here](https://mixpanel.com/settings/project). 

Import Mixpanel into AppDelegate.swift, and initialize Mixpanel within application:didFinishLaunchingWithOptions:
```swift
import Mixpanel

func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    ...
    // Replace with your Project Token
    Mixpanel.initialize(token: "Your Token")
    Mixpanel.mainInstance().track(event: "Signed Up", properties: [
        "Signup Type": "Referral", 
    ])
    ...
}
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page. For more options, see our [iOS - Swift Reference](doc:swift).

### FAQ

**Why aren't my events showing up?**
To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers every 60 seconds while your application is running, as well as when the application transitions to the background. You can call [flush()](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC5flush10completionyyycSg_tF) manually if you want to force a flush at a particular moment.
```swift
Mixpanel.mainInstance().flush()
```
If your events are still not showing up after 60 seconds, check if you have opted out of tracking. You can also enable Mixpanel debugging and logging, it allows you to see the debug output from the Mixpanel library. To enable it, set [loggingEnabled](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC14loggingEnabledSbvp) to true.
```swift
Mixpanel.mainInstance().loggingEnabled = true
```
**I have a test user I would like to opt out of tracking. How do I do that?**
Call the [optOutTracking()](https://mixpanel.github.io/mixpanel-swift/Classes/MixpanelInstance.html#/s:8Mixpanel0A8InstanceC14optOutTrackingyyF) method, which will prevent data from being sent from a user’s device.

**Starting with iOS 14.5, do I need to request the user’s permission through the AppTrackingTransparency framework to use Mixpanel?**
No, Mixpanel does not use IDFA so it does not require user permission through the AppTrackingTransparency(ATT) framework.

**If I use Mixpanel, how do I answer app privacy questions for the App Store?**
Please refer to our [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details/)

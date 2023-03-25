---
title: "iOS - Objective-C"
slug: "ios-objective-c-quickstart"
excerpt: "Quickstart Guide"
hidden: false
createdAt: "2021-04-21T21:07:46.860Z"
updatedAt: "2022-10-11T21:15:40.154Z"
---
# Overview
You can install the Mixpanel iOS - Objective-C library by using CocoaPods or Carthage.

Check out our [Advanced iOS - Objective-C Guide](ios) for additional advanced configurations and use cases, like setting up your project with European Union data storage.

[Skip to a complete code example](#complete-code-example).

# 1. Install Mixpanel
You will need your project token for initializing your library. You can get your project token from [project settings](https://mixpanel.com/settings/project).

## Installation Option 1: CocoaPods
1. If this is your first time using CocoaPods, Install CocoaPods using `gem install cocoapods`. Otherwise, continue to Step 3.
2. Run `pod setup` to create a local CocoaPods spec mirror.
3. Create a Podfile in your Xcode project directory by running `pod init` in your terminal, edit the Podfile generated, and add the following line: `pod 'Mixpanel'`.
4. Run `pod install` in your Xcode project directory. CocoaPods should download and install the Mixpanel library, and create a new Xcode workspace. Open up this workspace in Xcode or typing `open *.xcworkspace` in your terminal.

## Installation Option 2: Carthage
Mixpanel supports Carthage to package your dependencies as a framework. Include the following dependency in your Cartfile:
```objc
github "mixpanel/mixpanel-iphone"
```
Check out the [Carthage docs](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos) for more info.

## Installation Option 3: Swift Package Manager
1.  In Xcode, select File > Swift Packages > Add Package Dependency.
2.  Follow the prompts using the URL for this repository and must select a version greater than or equal to v4.0.0

# 2. Initialize Mixpanel
To initialize the library, add `#Import "Mixpanel/Mixpanel.h" into "AppDelegate.m" and call [sharedInstanceWithToken:trackAutomaticEvents:](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/sharedInstanceWithToken:trackAutomaticEvents:) with your project token and automatic events setting as its arguments in [application:didFinishLaunchingWithOptions:](https://developer.apple.com/documentation/uikit/uiapplicationdelegate#//apple_ref/occ/intfm/UIApplicationDelegate/application:willFinishLaunchingWithOptions:).
```objc
#import "Mixpanel/Mixpanel.h"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
...
  [Mixpanel sharedInstanceWithToken:@"YOUR_API_TOKEN" trackAutomaticEvents:YES];
...
}
```
[See all configuration options](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html)

# 3. Send Data
Let's get started by sending event data. You can send an event from anywhere in your application. Better understand user behavior by storing details that are specific to the event (properties). After initializing the library, Mixpanel will [automatically collect common mobile events](https://mixpanel.com/help/questions/articles/which-common-mobile-events-can-mixpanel-collect-on-my-behalf-automatically). You can enable/disable automatic collection through your [project settings](https://help.mixpanel.com/hc/en-us/articles/115004596186#enable-or-disable-common-mobile-events). Also, Mixpanel automatically tracks some properties by default. [learn more](https://help.mixpanel.com/hc/en-us/articles/115004613766-Default-Properties-Collected-by-Mixpanel#iOS)

```objc
Mixpanel *mixpanel = [Mixpanel sharedInstance];
[mixpanel track:@"Sign Up" properties:@{
	@"source": @"Pat's affiliate site",
	@"Opted out of email": @YES
}];
```

# 4. Check for Success
[Open up Events in Mixpanel](http://mixpanel.com/report/events) to view incoming events. 

Once data hits our API, it generally takes ~60 seconds for it to be processed, stored, and queryable in your project.

# Complete Code Example
Here's a runnable code example that covers everything in this quickstart guide.
```objc
#import "Mixpanel/Mixpanel.h"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
...
	Mixpanel *mixpanel = [Mixpanel sharedInstanceWithToken:@"YOUR_API_TOKEN" trackAutomaticEvents: YES];
	[mixpanel track:@"Sign Up" properties:@{
		@"source": @"Pat's affiliate site",
		@"Opted out of email": @YES
	}];
...
}
```

# FAQ
**I want to stop tracking an event/event property in Mixpanel. Is that possible?**
Yes, in Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any new data for the event or property you select to drop. [See this article for more information](https://help.mixpanel.com/hc/en-us/articles/360001307806#dropping-events-and-properties).

**I have a test user I would like to opt out of tracking. How do I do that?**
Mixpanel’s client-side tracking library contains the [optOutTracking()](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/optOutTracking) method, which will set the user’s local opt-out state to “true” and will prevent data from being sent from a user’s device. More detailed instructions can be found in the section, [Opting users out of tracking](ios#opting-users-out-of-tracking).

**Why aren't my events showing up?**
To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers every 60 seconds while your application is running, as well as when the application transitions to the background. You can call [flush()](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/flush) manually if you want to force a flush at a particular moment.

```objc
[mixpanel flush];
```
If your events are still not showing up after 60 seconds, check if you have opted out of tracking. You can also enable Mixpanel debugging and logging, it allows you to see the debug output from the Mixpanel library. To enable it, set [enableLogging](https://mixpanel.github.io/mixpanel-iphone/Classes/Mixpanel.html#//api/name/enableLogging) to true.

```objc
mixpanel.enableLogging = YES;
```
Please note if you route your data to Mixpanel's EU servers, you will need to look at EU servers( https://eu.mixpanel.com) instead.

**Starting with iOS 14.5, do I need to request the user’s permission through the AppTrackingTransparency framework to use Mixpanel?**
No, Mixpanel does not use IDFA so it does not require user permission through the AppTrackingTransparency(ATT) framework.

**If I use Mixpanel, how do I answer app privacy questions for the App Store?**
Please refer to our [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details/)
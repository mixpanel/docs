---
title: "Flutter"
slug: "flutter-quickstart"
excerpt: "Quickstart Guide"
hidden: false
metadata: 
  title: "SDK Integration: Flutter Quickstart | Mixpanel Developer Docs"
  description: "Learn how to install the Flutter SDK open-source project. Our documentation will ensure you're successful from installing Mixpanel to sending data."
createdAt: "2021-06-29T00:01:48.830Z"
updatedAt: "2022-10-11T21:02:51.294Z"
---
# Overview
Welcome to the official Mixpanel Flutter SDK. The Mixpanel Flutter SDK is an open-source project, and we'd love to see your contributions!

Check out our [Advanced Flutter Guide](https://developer.mixpanel.com/docs/flutter) for additional advanced configurations and use cases, like setting up your project with European Union data storage.

# Quick Start Guide
## 1. Install Mixpanel
### Prerequisites
- [Setup development environment for Flutter](https://flutter.dev/docs/get-started/install)
### Steps
1. Depend on it  \
Add this to your package's pubspec.yaml file:
```
   dependencies:
      mixpanel_flutter: ^1.0.0 # set this to your desired version
```
2. Install it \
You can install packages from the command line:
```
   $ flutter pub get
```
3. Import it \
Now in your Dart code, you can use:
```
import 'package:mixpanel_flutter/mixpanel_flutter.dart';
```
## 2. Initialize Mixpanel
To start tracking with the SDK you must first initialize with your project token. To initialize the SDK, first add `import 'package:mixpanel_flutter/mixpanel_flutter.dart';` and call `Mixpanel.init(token, trackAutomaticEvents);` with your project token and automatic events setting as its arguments. You can find your token in [project settings](https://mixpanel.com/settings/project).
```dart
import 'package:mixpanel_flutter/mixpanel_flutter.dart';
...
class _YourClassState extends State<YourClass> {
  Mixpanel mixpanel;

  @override
  void initState() {
    super.initState();
    initMixpanel();
  }

  Future<void> initMixpanel() async {
    mixpanel = await Mixpanel.init("Your Mixpanel Token", trackAutomaticEvents: true);
  }
...
```
Once you've called this method once, you can access `mixpanel` throughout the rest of your application.

## 3. Send Data
Once you've initialized the SDK, Mixpanel will <a href="https://mixpanel.com/help/questions/articles/which-common-mobile-events-can-mixpanel-collect-on-my-behalf-automatically" target="_blank">automatically collect common mobile events</a>. You can enable/disable automatic collection through your project settings.
With the `mixpanel` object created in [the last step](#2-initialize-mixpanel) a call to `track` is all you need to send additional events to Mixpanel.
```dart
// Track with event-name
mixpanel.track('Sent Message');
// Track with event-name and property
mixpanel.track('Plan Selected', properties: {'Plan': 'Premium'});
```
You're done! You've successfully integrated the Mixpanel Flutter SDK into your app. To stay up to speed on important SDK releases and updates, star or watch our repository on [Github](https://github.com/mixpanel/mixpanel-flutter).
## 4. Check for Success
[Open up Events in Mixpanel](http://mixpanel.com/report/events)  to view incoming events.
Once data hits our API, it generally takes ~60 seconds for it to be processed, stored, and queryable in your project.
 👋  👋     Tell us about the Mixpanel developer experience! [https://www.mixpanel.com/devnps](https://www.mixpanel.com/devnps) 👍  👎

# FAQ

**I want to stop tracking an event/event property in Mixpanel. Is that possible?**
Yes, in Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any new data for the event or property you select to drop.  [See this article for more information](https://help.mixpanel.com/hc/en-us/articles/360001307806#dropping-events-and-properties).

**I have a test user I would like to opt out of tracking. How do I do that?**
Mixpanel’s client-side tracking library contains the  [optOutTracking()](https://mixpanel.github.io/mixpanel-flutter/mixpanel_flutter/Mixpanel/optOutTracking.html)  method, which will set the user’s local opt-out state to “true” and will prevent data from being sent from a user’s device. More detailed instructions can be found in the section,  [Opting users out of tracking](https://developer.mixpanel.com/docs/flutter#opting-users-out-of-tracking).

**Why aren't my events showing up?**
To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers every 60 seconds while your application is running, as well as when the application transitions to the background. You can call  [flush()](https://mixpanel.github.io/mixpanel-flutter/mixpanel_flutter/Mixpanel/flush.html)  manually if you want to force a flush at a particular moment.

```
mixpanel.flush();
```
If your events are still not showing up after 60 seconds, check if you have opted out of tracking. You can also enable Mixpanel debugging and logging, it allows you to see the debug output from the Mixpanel library. To enable it, call  [setLoggingEnabled](https://mixpanel.github.io/mixpanel-flutter/mixpanel_flutter/Mixpanel/setLoggingEnabled.html)  to true, then run your iOS project with Xcode or android project with Android Studio. The logs should be available in the console.

```
mixpanel.setLoggingEnabled(true);
```
Please note if you route your data to Mixpanel's EU servers, you will need to look at EU servers( https://eu.mixpanel.com) instead.

**Starting with iOS 14.5, do I need to request the user’s permission through the AppTrackingTransparency framework to use Mixpanel?**
No, Mixpanel does not use IDFA so it does not require user permission through the AppTrackingTransparency(ATT) framework.

**If I use Mixpanel, how do I answer app privacy questions for the App Store?**
Please refer to our  [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details/)

# I want to know more!
No worries, here are some links that you will find useful:
* **[Sample app](https://github.com/mixpanel/mixpanel-flutter/tree/main/example)**
* **[Full API Reference](https://developer.mixpanel.com/docs/flutter)**

Have any questions? Reach out to Mixpanel [Support](https://help.mixpanel.com/hc/en-us/requests/new) to speak to someone smart, quickly.
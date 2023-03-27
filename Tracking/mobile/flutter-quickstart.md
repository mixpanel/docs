---
title: "Flutter"
slug: "flutter-quickstart"
hidden: false
metadata: 
  title: "SDK Integration: Flutter Quickstart | Mixpanel Developer Docs"
  description: "Learn how to install the Flutter SDK open-source project. Our documentation will ensure you're successful from installing Mixpanel to sending data."
createdAt: "2021-06-29T00:01:48.830Z"
updatedAt: "2023-03-26T23:06:45.221Z"
---
### Step 1: Install the SDK
Add `mixpanel_flutter: ^1.0.0` to your package's pubspec.yaml file and run:
```
flutter pub get
```

### Step 2: Track your first event
You'll need your Project Token for this, which you can get [here](https://mixpanel.com/settings/project). 
```dart
import 'package:mixpanel_flutter/mixpanel_flutter.dart';
class _YourClassState extends State<YourClass> {
  Mixpanel mixpanel;

  @override
  void initState() {
    super.initState();
    initMixpanel();
  }

  Future<void> initMixpanel() async {
    // Replace with your Project Token
    // Once you've called this method once, you can access `mixpanel` throughout the rest of your application.
    mixpanel = await Mixpanel.init("Your Token", trackAutomaticEvents: true);
  }
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page. For more options, see our [Flutter reference](doc:flutter).


### FAQ

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

**Starting with iOS 14.5, do I need to request the user’s permission through the AppTrackingTransparency framework to use Mixpanel?**
No, Mixpanel does not use IDFA so it does not require user permission through the AppTrackingTransparency(ATT) framework.

**If I use Mixpanel, how do I answer app privacy questions for the App Store?**
Please refer to our  [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details/)

### Resources
* **[Sample app](https://github.com/mixpanel/mixpanel-flutter/tree/main/example)**
* **[Full API Reference](https://developer.mixpanel.com/docs/flutter)**
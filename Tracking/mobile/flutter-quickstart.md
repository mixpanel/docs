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

**Why don't I see events in Mixpanel?**
To preserve battery, Mixpanel's SDKs flush events every 60 seconds while your application is running, as well as when the application transitions to the background. You can call  [flush()](https://mixpanel.github.io/mixpanel-flutter/mixpanel_flutter/Mixpanel/flush.html) manually if you want to force a flush at a particular moment.

```
mixpanel.flush();
```

If your events are still not showing up after 60 seconds, check if you have opted out of tracking. You can also enable Mixpanel debugging and logging, it allows you to see the debug output from the Mixpanel library. To enable it, call  [setLoggingEnabled](https://mixpanel.github.io/mixpanel-flutter/mixpanel_flutter/Mixpanel/setLoggingEnabled.html)  to true, then run your iOS project with Xcode or android project with Android Studio. The logs should be available in the console.

```
mixpanel.setLoggingEnabled(true);
```

**How do I opt a user out of tracking?**
Call the [optOutTracking()](https://mixpanel.github.io/mixpanel-flutter/mixpanel_flutter/Mixpanel/optOutTracking.html) method, which will prevent data from being sent from a user’s device.

**Starting with iOS 14.5, do I need to request the user’s permission through the AppTrackingTransparency framework to use Mixpanel?**
No, Mixpanel does not use IDFA so it does not require user permission through the AppTrackingTransparency(ATT) framework.

**If I use Mixpanel, how do I answer app privacy questions for the App Store?**
Please refer to our [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details/)

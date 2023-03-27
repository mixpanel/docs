---
title: "React Native"
slug: "react-native-quickstart"
hidden: false
createdAt: "2021-06-24T22:23:44.226Z"
updatedAt: "2023-03-26T23:50:45.880Z"
---
### Step 1: Install the SDK
Under your app's root directory, run:

```
npm install mixpanel-react-native
```

Under your application's iOS folder, run:

```
pod install
```

Note: For XCode 12.5+, there is a known compile issue, please refer to this [workaround](https://github.com/mixpanel/mixpanel-react-native/issues/43#issuecomment-829599732).

### Step 2: Track your first event

You'll need your Project Token for this, which you can get [here](https://mixpanel.com/settings/project). 

```javascript

import React from 'react';
import { Button, SafeAreaView } from "react-native";
import { Mixpanel } from 'mixpanel-react-native';

const trackAutomaticEvents = true;
const mixpanel = new Mixpanel("Your Token", trackAutomaticEvents);
mixpanel.init();

const SampleApp = () => {
  return (
    <SafeAreaView>
      <Button
        title="Select Premium Plan"
        onPress={() => mixpanel.track("Signed Up", {"Signup Type": "Referral"})}
      />
    </SafeAreaView>
  );
}

export default SampleApp;
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page. For more options, see our [React Native reference](doc:react-native).


### FAQ

**I want to stop tracking an event/event property in Mixpanel. Is that possible?**
Yes, in Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any new data for the event or property you select to drop.  [See this article for more information](https://help.mixpanel.com/hc/en-us/articles/360001307806#dropping-events-and-properties).

**I have a test user I would like to opt out of tracking. How do I do that?**
Mixpanel’s client-side tracking library contains the  [optOutTracking()](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#optOutTracking)  method, which will set the user’s local opt-out state to “true” and will prevent data from being sent from a user’s device. More detailed instructions can be found in the section,  [Opting users out of tracking](https://developer.mixpanel.com/docs/react-native#opting-users-out-of-tracking).

**Why aren't my events showing up?**
To preserve battery life and customer bandwidth, the Mixpanel library doesn't send the events you record immediately. Instead, it sends batches to the Mixpanel servers every 60 seconds while your application is running, as well as when the application transitions to the background. You can call  [flush()](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#flush)  manually if you want to force a flush at a particular moment.

```javascript
mixpanel.flush();
```

If your events are still not showing up after 60 seconds, check if you have opted out of tracking. You can also enable Mixpanel debugging and logging, it allows you to see the debug output from the Mixpanel library. To enable it, call  [setLoggingEnabled](https://mixpanel.github.io/mixpanel-react-native/Mixpanel.html#setLoggingEnabled)  to true, then run your iOS project with Xcode or android project with Android Studio. The logs should be available in the console.

```javascript
mixpanel.setLoggingEnabled(true);
```
Please note if you route your data to Mixpanel's EU servers, you will need to look at EU servers( https://eu.mixpanel.com) instead.

**Starting with iOS 14.5, do I need to request the user’s permission through the AppTrackingTransparency framework to use Mixpanel?**
No, Mixpanel does not use IDFA so it does not require user permission through the AppTrackingTransparency(ATT) framework.

**If I use Mixpanel, how do I answer app privacy questions for the App Store?**
Please refer to our  [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details/)
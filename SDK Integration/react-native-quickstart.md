---
title: "React Native"
slug: "react-native-quickstart"
excerpt: "Quickstart Guide"
hidden: false
createdAt: "2021-06-24T22:23:44.226Z"
updatedAt: "2022-10-11T21:19:38.163Z"
---
## Overview

Mixpanel's React Native SDK is a wrapper around Mixpanel’s native iOS and Android SDKs and it supports offline tracking. You can install Mixpanel React Native SDK by using npm. 

Check out our [Advanced React Native Guide](https://developer.mixpanel.com/docs/react-native) for additional advanced configurations and use cases, like setting up your project with European Union data storage.

###1. Install Mixpanel

### Prerequisites

- React Native v0.6+
- [Setup development environment for React Native](https://reactnative.dev/docs/environment-setup)

### Steps

1. Under your app's root directory, install Mixpanel React Native SDK.

```
npm install mixpanel-react-native
```

1. Under your application's ios folder, run

```
pod install
```

Please note: You do not need to update your Podfile to add Mixpanel.
3. For Xcode 12.5+, there is a known compile issue, please refer to this **[workaround](https://github.com/mixpanel/mixpanel-react-native/issues/43#issuecomment-829599732)**.

###2. Initialize Mixpanel

To start tracking with the library you must first initialize with your project token and automatic events setting. You can get your project token from [project settings](https://mixpanel.com/settings/project).

```javascript
import { Mixpanel } from 'mixpanel-react-native';

const trackAutomaticEvents = true;
const mixpanel = new Mixpanel("Your Project Token", trackAutomaticEvents);
mixpanel.init();
```

Once you've called this method once, you can access `mixpanel` throughout the rest of your application.

###3. Send Data

Let's get started by sending event data. You can send an event from anywhere in your application. Better understand user behavior by storing details that are specific to the event (properties). After initializing the library, Mixpanel will [automatically collect default properties](https://help.mixpanel.com/hc/en-us/articles/115004613766-Default-Properties-Collected-by-Mixpanel)

```javascript
// Track with event-name
mixpanel.track('Sent Message');
// Track with event-name and property
mixpanel.track('Plan Selected', {'Plan': 'Premium'});
```

In addition to event data, you can also send [user profile data](https://developer.mixpanel.com/docs/react-native#storing-user-profiles). We recommend this after completing the quickstart guide.

###4. Check for Success

[Open up Events in Mixpanel](http://mixpanel.com/report/events)  to view incoming events.
Once data hits our API, it generally takes ~60 seconds for it to be processed, stored, and queryable in your project.

 👋  👋     Tell us about the Mixpanel developer experience! [https://www.mixpanel.com/devnps](https://www.mixpanel.com/devnps) 👍  👎

### Complete Code Example
```javascript

import React from 'react';
import { Button, SafeAreaView } from "react-native";
import { Mixpanel } from 'mixpanel-react-native';

const trackAutomaticEvents = true;
const mixpanel = new Mixpanel("Your Project Token", trackAutomaticEvents);
mixpanel.init();

const SampleApp = () => {
  return (
    <SafeAreaView>
      <Button
        title="Select Premium Plan"
        onPress={() => mixpanel.track("Plan Selected", {"Plan": "Premium"})}
      />
    </SafeAreaView>
  );
}

export default SampleApp;

```


## FAQ

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
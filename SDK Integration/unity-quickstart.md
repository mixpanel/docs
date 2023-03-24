---
title: "Unity"
slug: "unity-quickstart"
excerpt: "Quickstart Guide"
hidden: false
metadata: 
  title: "SDK Integration: Unity Quickstart | Mixpanel Developer Docs"
  description: "Learn how to install the Unity SDK open-source project. Our documentation will insure you're successful from installing Mixpanel to sending data."
createdAt: "2021-06-30T18:03:57.829Z"
updatedAt: "2022-09-02T18:49:36.115Z"
---
# Overview
Welcome to the official Mixpanel Unity SDK. The Mixpanel Unity SDK is an open-source project, and we'd love to see your contributions!

Check out our [Advanced Unity Guide](doc:unity) for additional configurations and use cases.

# Quick Start Guide
Supported Unity Version >= 2018.3. For older versions, you need to have `.NET 4.x Equivalent` selected as the scripting runtime version in your editor settings.
## 1. Install Mixpanel
This library can be installed using the unity package manager system with git. We support Unity 2018.3 and above. For older versions of Unity, you need to have .NET 4.x Equivalent selected as the scripting runtime version in your editor settings.

* In your unity project root open ./Packages/manifest.json
* Add the following line to the dependencies section "com.mixpanel.unity": "https://github.com/mixpanel/mixpanel-unity.git#master",
* Open Unity and the package should download automatically
Alternatively you can go to the [releases page](https://github.com/mixpanel/mixpanel-unity/releases) and download the .unitypackage file and have unity install that.
## 2. Initialize Mixpanel
You will need your project token for initializing your library. You can get your project token from [project settings](https://mixpanel.com/settings/project).
To initialize the library, first open the unity project settings menu for Mixpanel. (Edit -> Project Settings -> Mixpanel) Then, enter your project token into the Token and Debug Token input fields within the inspector. Please note if you prefer to initialize Mixpanel manually, you can select the `Manual Initialization` in the settings and call `Mixpanel.Init()` to initialize.

![unity_screenshots](https://user-images.githubusercontent.com/36679208/152408022-62440f50-04c7-4ff3-b331-02d3d3122c9e.jpg)

## 3. Send Data
Let's get started by sending event data. You can send an event from anywhere in your application. Better understand user behavior by storing details that are specific to the event (properties). 
```csharp
using  mixpanel;
// Track with event-name
Mixpanel.Track('Sent Message');
// Track with event-name and property
var  props  =  new  Value();  
props["Plan"] =  "Premium";
Mixpanel.Track('Plan Selected', props);
```

## 4. Check for Success
[Open up Events in Mixpanel](http://mixpanel.com/report/events)  to view incoming events.
Once data hits our API, it generally takes ~60 seconds for it to be processed, stored, and queryable in your project.
 👋  👋     Tell us about the Mixpanel developer experience! [https://www.mixpanel.com/devnps](https://www.mixpanel.com/devnps) 👍  👎

# FAQ
**I want to stop tracking an event/event property in Mixpanel. Is that possible?**
Yes, in Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any new data for the event or property you select to drop.  [See this article for more information](https://help.mixpanel.com/hc/en-us/articles/360001307806#dropping-events-and-properties).

**I have a test user I would like to opt out of tracking. How do I do that?**
Mixpanel’s client-side tracking library contains the  OptOutTracking() method, which will set the user’s local opt-out state to “true” and will prevent data from being sent from a user’s device. More detailed instructions can be found in the section.

**Starting with iOS 14.5, do I need to request the user’s permission through the AppTrackingTransparency framework to use Mixpanel?**
No, Mixpanel does not use IDFA so it does not require user permission through the AppTrackingTransparency(ATT) framework.

**If I use Mixpanel, how do I answer app privacy questions for the App Store?**
Please refer to our  [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details/)
---
title: "Unity"
slug: "unity-quickstart"
hidden: false
metadata: 
  title: "SDK Integration: Unity Quickstart | Mixpanel Developer Docs"
  description: "Learn how to install the Unity SDK open-source project. Our documentation will insure you're successful from installing Mixpanel to sending data."
createdAt: "2021-06-30T18:03:57.829Z"
updatedAt: "2023-03-26T23:50:23.016Z"
---
### Step 1: Install the SDK
Add `https://github.com/mixpanel/mixpanel-unity.git#master` to the dependencies section of `com.mixpanel.unity`.

Alternatively, you can download and install the .unitypackage file from our [releases page](https://github.com/mixpanel/mixpanel-unity/releases).


### Step 2: Track your first event
You'll need your Project Token for this, which you can get [here](https://mixpanel.com/settings/project). 

To initialize the library, first open the unity project settings menu for Mixpanel. (Edit -> Project Settings -> Mixpanel) Then, enter your project token into the Token and Debug Token input fields within the inspector. If you prefer to initialize Mixpanel manually, you can select the `Manual Initialization` in the settings and call `Mixpanel.Init()` to initialize.

![unity_screenshots](https://user-images.githubusercontent.com/36679208/152408022-62440f50-04c7-4ff3-b331-02d3d3122c9e.jpg)

Add the following sample code to a part of your application:
```csharp
using  mixpanel;
var  props  =  new  Value();  
props["Signup Type"] =  "Referral";
Mixpanel.Track('Signup', props);
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](https://mixpanel.com/report/events) page. For more options, see our [Unity Reference](doc:unity) .




### FAQ
**I want to stop tracking an event/event property in Mixpanel. Is that possible?**
Yes, in Lexicon, you can intercept and drop incoming events or properties. Mixpanel won’t store any new data for the event or property you select to drop.  [See this article for more information](https://help.mixpanel.com/hc/en-us/articles/360001307806#dropping-events-and-properties).

**I have a test user I would like to opt out of tracking. How do I do that?**
Mixpanel’s client-side tracking library contains the  OptOutTracking() method, which will set the user’s local opt-out state to “true” and will prevent data from being sent from a user’s device. More detailed instructions can be found in the section.

**Starting with iOS 14.5, do I need to request the user’s permission through the AppTrackingTransparency framework to use Mixpanel?**
No, Mixpanel does not use IDFA so it does not require user permission through the AppTrackingTransparency(ATT) framework.

**If I use Mixpanel, how do I answer app privacy questions for the App Store?**
Please refer to our  [Apple App Developer Privacy Guidance](https://mixpanel.com/legal/app-store-privacy-details/)
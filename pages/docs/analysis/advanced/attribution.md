# Attribution

## Overview
Attribution helps teams attribute conversion credit to the touch-points in a user-journey, whether it be just to the first or last touch which are single-touch attribution models or to multiple touchpoints using a multi-touch attribution model like U-shape or Linear.  

Let’s take an example user journey:

1. A user sees an ad for a product on Facebook  
2. The user clicks on the ad and is taken to the product page on the company's website
3. The user adds the product to their cart and begins the checkout process
4. The user abandons the checkout process
5. The user receives a retargeting ad for the product on Instagram
6. The user clicks on the ad and completes the purchase

In this example, there are two touchpoints that contribute to the successful conversion: the Facebook ad and the Instagram ad. Using an attribution model, we can assign different weights to these touchpoints to determine their relative importance in the conversion.

- Using a linear attribution model, we could assign a weight of 0.5 to each touchpoint, meaning that both the Facebook ad and the Instagram ad contributed equally to the conversion
- Using a J shaped attribution model, we could assign a weight of 0.75 to Facebook ad, and 0.25 to the Instagram ad
- Using last touch model, the complete conversion can be attributed to the Instagram ad
- Using first touch model, the complete conversion can be attributed to the Facebook ad

## Usage 

![image](/attribution.mp4)

Step 1 - Add your conversion metric

Step 2 - Attribution makes sense only when distributing the conversion metric across segments. So head to the breakdown section and choose the Mixpanel computed property - `Attributed by..`

Step 3 - In the second layer that opens up, choose the property you want to break-down by (eg. utm_medium). You can also choose a custom-property to  breakdown here, for example marketing channel which generally is a combination of utm medium, utm source and referrer.    

Step 4 - You have a working attribution model.  By default, Mixpanel will assign the metric the Last touch model with a 30 day lookback window. To change the model, head to the metric section

Step 5 - If you want to inlcude only certain channels or touchpoints in your attribution analysis, you can filter touchpoints as well from the breakdown overflow menu. Some common use-cases for this include excluding organic touchpoints from attribution analysis. 

👉🏽 NOTE: if you are running attribution predominantly on utm_medium, utm_source, utm_campaign, make sure you’re tracking utm parameters as event properties on every user touchpoint. 
If you use a Mixpanel js-sdk, we’ve updated our sdk to track utm parameters more effectively to support multi-touch attribution models. 

## Attribution Models

- First Touch -  Gives 100% credit to the first touchpoint within the attribution lookback window
- Last Touch - Gives 100% credit to the last touchpoint within the attribution lookback window
- Linear - Gives equal credit to every touchpoint seen leading up to a conversion within the attribution lookback window
- Participation - Gives 100% credit to every unique touchpoint seen within attribution window. The total number of conversions is inflated compared to other attribution models. For example with 5 property values, each would receive 100% credit showing 5 conversions.
- Time-Decay - The weight of each channel depends on the amount of time that passed between the touch point initiation and the eventual conversion. This model follows an exponential decay with a 7 day half-life parameter. 
- U-shaped - Gives 40% credit to the first touchpoint, 40% credit to the last touchpoint, and divides the remaining 20% to any touch points in between. With 2 touchpoints, the credit is normalized (50%, 50%). With 6 touch points the middle 4 touch points would share the 20% (40%, 5%, 5%, 5%, 5%, 40%).
- J-shaped - Gives 20% credit to the first touchpoint, 60% credit to the last touchpoint, and divides the remaining 20% to any touch points in between. With 2 touchpoints, the credit is normalized (25%, 75%). With 6 touch points the middle 4 touch points would share the 20% (20%, 5%, 5%, 5%, 5%, 60%).
- Inverse J-shaped - Gives 60% credit to the first touchpoint, 20% credit to the last touchpoint, and divides the remaining 20% to any touch points in between. With 2 touchpoints, the credit is normalized (75%, 25%). With 6 touch points the middle 4 touch points would share the 20% (60%, 5%, 5%, 5%, 5%, 20%).
- Custom - Customize the weightage to be given to the first and last touchpoint, and all other touchpoints in between based on your use-case.

## Glossary

- **User journey:** Consists of touchpoints and the conversion event. It is possible for a conversion event to have no corresponding touchpoints (eg. utm parameters). In this case we consider it a ‘direct’ conversion
- **Conversion**: The primary event you’re interested in analyzing with multi-touch attribution models. Typically some final value generating interaction such as “Signup” or “Upgrade” or “Payment”.
- **Touchpoint**: These are actions (events) a user’s taken or exposed to along the journey before doing the conversion event.  [Eg. does event A → B → C → D (conversion event) in a 7 day period; For a lookback window of 7 days, A, B, C are all considered touchpoints]
- **Attributed by property:** This is the property on a touchpoint event that we use for the attribution model. The canonical example is utm_source
- **Lookback window:** The time window where a user's events with this attribution property are counted towards the calculation. The window ends when the conversion metric happens.

Note: This feature is in beta. To access this feature please reach out to your account team or join the [waitlist](https://experiences.mixpanel.com/mixpanel-attribution-beta-waitlist/).

## Overview
Multi-Touch attribution helps teams attribute conversion credit to the multiple touch-points in a user-journey, beyond just first or last touch which are single-touch attribution models. 

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

Step 1 - Add your conversion metric

Step 2 - Attribution makes sense only when distributing the conversion metric across segments. So head to the breakdown section and choose the Mixpanel computed property - `Attributed by..`
<img width="595" alt="Untitled" src="https://github.com/mixpanel/docs/assets/2077899/fdfba852-853d-45f7-b79f-716376836eb2">

Step 3 - In the second layer that opens up, choose the property you want to break-down by (eg. utm_medium)  

Step 4 - You have a working attribution model.  By default, Mixpanel will assign the metric and Last touch model with a 30 day lookback window. To change the model, head to the metric section

<img width="556" alt="Untitled 1" src="https://github.com/mixpanel/docs/assets/2077899/ccece38b-1a94-4516-9f4a-a6f1f2be1857">

👉🏽 NOTE: if you are running attribution predominantly on utm_medium, utm_source, utm_campaign, make sure you’re tracking utm parameters as event properties on every user touchpoint. 
If you use a Mixpanel js-sdk, we’ve updated our sdk to track utm parameters more effectively to support multi-touch attribution models. **Please go [update your js-sdk](https://developer.mixpanel.com/docs/javascript#tracking-utm-parameters) today.**

## Attribution Models

- First Touch -  Gives 100% credit to the first touchpoint within the attribution lookback window
- Last Touch - Gives 100% credit to the last touchpoint within the attribution lookback window
- Linear - Gives equal credit to every touchpoint seen leading up to a conversion within the attribution lookback window
- U-shaped - Gives 40% credit to the first touchpoint, 40% credit to the last touchpoint, and divides the remaining 20% to any touch points in between. With 2 touchpoints, the credit is normalized (50%, 50%). With 6 touch points the middle 4 touch points would share the 20% (40%, 5%, 5%, 5%, 5%, 40%).
- J-shaped - Gives 20% credit to the first touchpoint, 60% credit to the last touchpoint, and divides the remaining 20% to any touch points in between. With 2 touchpoints, the credit is normalized (25%, 75%). With 6 touch points the middle 4 touch points would share the 20% (20%, 5%, 5%, 5%, 5%, 60%).
- Inverse J-shaped - Gives 60% credit to the first touchpoint, 20% credit to the last touchpoint, and divides the remaining 20% to any touch points in between. With 2 touchpoints, the credit is normalized (75%, 25%). With 6 touch points the middle 4 touch points would share the 20% (60%, 5%, 5%, 5%, 5%, 20%).
- Custom - Customize the weightage to be given to the first and last touchpoint, and all other touchpoints in between based on your use-case.

## Glossary

- **User journey:** Consists of touchpoints and the conversion event. It is possible for a conversion event to have no corresponding touchpoints (eg. utm parameters). In this case we consider it a ‘direct’ conversion
- **Conversion**: The primary event you’re interested in analyzing with multi-touch attribution models. Typically some final value generating interaction such as “Signup” or “Upgrade” or “Payment”.
- **Touchpoint**: These are actions (events) a user’s taken or exposed to along the journey before doing the conversion event.  [Eg. does event A → B → C → D (conversion event) in a 7 day period; For a lookback window of 7 days, A, B, C are all considered touchpoints]
- **Attributed by property:** This is the property on a touchpoint ****event that we use for the attribution model. The canonical example is utm_source
- **Lookback window:** The time window where a user's events with this attribution property are counted towards the calculation. The window ends when the conversion metric happens.

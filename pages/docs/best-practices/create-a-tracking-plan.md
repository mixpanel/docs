# Create A Tracking Plan

By going through this guide, you should be able to understand the necessary concepts and steps to build out a tracking plan that aligns to your business goals.

## Overview
Mixpanel recommends creating a tracking plan based on the key business goals identified from your analytics strategy. It should:

- Be a centralized document that should serve as the source of truth on your Mixpanel implementation
- Define your business goals / KPIs and analytics strategy metrics. For a deeper dive into how you can map your KPIs to your specific user flows, you may want to explore our [Analytics Strategy Measurement Framework guide](https://docs.mixpanel.com/docs/best-practices/analytics-strategy/overview).
- Outline the events, event properties, and user profile properties aligned to your metrics. To dive deeper into understanding your events and properties, take a look at our [Events and Properties](https://docs.mixpanel.com/docs/data-structure/events-and-properties).
- Be treated as a living and shared document that is continuously updated with any implementation changes
- Include notes that are referenced across teams (product, marketing, data science, tech / dev teams, etc.)

The tracking plan will be important for both team members who are involved in defining use cases to be implemented in Mixpanel and the technical teams involved in the actual implementation of the code.

### Importance of Data Governance
Building your Mixpanel Tracking Plan should be part of your larger effort in establishing practical and sustainable Data Management and Governance procedures. 

If you do not have this established for your organization or want to review your current data governance procedures, it is worth having internal discussions on how to define how Data Governance and how to integrate this as part of your data journey. To help you start, you can take a look at our [Mixpanel Data Governance Guide](https://mixpanel.com/blog/data-governance-an-8-step-program/).

## Prioritize for Your Onboarding
In the context of your Mixpanel onboarding, our goal is to get you and your team to value and start answering your most critical business questions as quickly as possible. For an overview of the Onboarding Overview, please visit the Onboarding Tutorial section. *link to the Onboarding Overview section*

## Tracking Plan Methodology
Prioritize and be intentional with your data based on your business goals and key use cases. You can create a comprehensive tracking plan, but make sure to identify the key objectives, the KPIs, and the events and properties for your onboarding. Having a clear alignment on priorities will allow you to move quickly in a phased approach to your implementation. 

A successful onboarding typically focuses on one or two key use cases. Some examples can be: 

- the registration or sign up process
- a required activation or account set up journey
- the purchase funnel
- an important engagement journey (watching content, creating a playlist, planning a route, importing files to your platform, setting up an integration)

### Define and prioritize KPIs
Define the top KPIs and metrics that will help measure success and inform decisions about your product.

Please find the link to our [Analytics Strategy Framework](https://discover.mixpanel.com/rs/461-OYV-624/images/Guidetoproductmetrics-Mixpanel.pdf) that can guide you in measuring what success looks like for you.

### Map KPIs to User Flows
Map each of your metrics to the steps or specific actions that users take to influence each metric. For example, sign up flow will be important when measuring KPIs related to new user acquisition. Consider all the different user paths users can take and what specific measures will allow you to track, measure, and improve the expected desired user outcomes across activation, engagement, and/or retention.

### Identity Management
As you are building out your tracking plan, make sure to consider where you will need to manage user identity. In summary, when a user goes from being anonymous to when that user completes registration and/or logs in, you will need to properly identify this user with a distinct ID.  For a full understanding of this critical concept, please review our [Identity Management guide here](https://docs.mixpanel.com/docs/tracking-methods/identifying-users)

### Translate Flows into Events / Properties
Breakdown your user flows into events (actions) and properties (context of these actions) in your tracking plan. This will ensure that you have scoped out the data you need to achieve your KPIs / metrics in Mixpanel.

### Define a Naming Convention
Defining a naming convention will help maintain data quality and trust over time. Having an intuitive and easy to understand naming convention helps end users more easily make sense of the data. Also, remember that Mixpanel is case sensitive (e.g., sign up completed vs. Sign Up Completed will show up as two separate events). 

It can be helpful to document the naming convention guidelines so everyone can be aware and adhere to these. 

Here are a few simple guidelines to help you think through how to structure your naming convention:
- Consistent: make sure the name is standard across your different event names and properties as well as across your platforms. 
- Concise: keep things short and simple but informative.  
- Clean: the data should be easily understood that is case-sensitive. 

You may want to avoid abbreviations or specific jargon that may not be immediately or easily understandable.

You can find more information on events and properties naming convention [best practices](https://docs.mixpanel.com/docs/data-structure/events-and-properties#best-practices).

### Designing Event Depth 
When designing your data schema, you will also want to determine the proper level of event depth. As you determine what user actions to track, you'll want to strike the right balance to make sure events are not too specific or too broad. 

![image](https://github.com/mixpanel/docs/assets/38046769/1d0375d1-5426-48bd-a740-98394b13e189)

### Tracking Plan Templates 
Mixpanel provides the following templates for vertical-specific tracking plans:

- [Retail and E-commerce](https://docs.google.com/spreadsheets/d/1Kyys37m_GEL79_1BKKEnU5KxK91NF04kY-L_bFfcfqE/edit#gid=1484002407)
- [Media and Entertainment](https://docs.google.com/spreadsheets/d/1K9t53kJJjaBG36kCIbZn_qKjXR9Iy306zYZAqDrv_AM/edit?usp=sharing)
- [SaaS](https://docs.google.com/spreadsheets/d/1A5wm5MKzRfSOZfUfCAg8YpePiz8Jn3Ar_u8KBo5lD6g/edit?usp=sharing)
- [Financial Services](https://docs.google.com/spreadsheets/d/1oGv6vbIFiYbima9IX4ItpBJvuChs-zzh83MRt_dSPgg/edit?usp=sharing)

You can also access a copy of a [blank Tracking Plan from here](https://docs.google.com/spreadsheets/d/1ZdOZ6TMtRPxy7qRxiLsvH9HWcHJM6nZydWKoThRxFKc/edit#gid=1641519238). Save a copy to your device to get started on your tracking plan.

### Build out Visual User Flows
Along with the tracking plan templates in your traditional spreadsheet format, you can also build out a visual user journey flow version of a tracking plan using tools like FigJam, Miro, or other similar products.

This can be a helpful exercise because you can visually understand the specific screens or page views, the exact steps in the user journey, and which actions trigger the user behavior to be tracked as an event. 

Here is an example of a **[Figma User Journey](https://www.figma.com/file/tYEeeRE0Xz6IampBhGLotw/Media-and-Entertainment-Tracking-Plan?type=whiteboard&node-id=0%3A1&t=ShUKEHAG2PlL9wNa-1).**


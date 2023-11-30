# The Self-Serve Guide: Create A Tracking Plan

By going through this guide, you should be able to understand the necessary concepts and steps to effectively build out a tracking plan that aligns to your business goals.

## Overview
Mixpanel recommends creating a tracking plan based on the key business goals identified from your analytics strategy. It should:

- Be a centralized document that should serve as the source of truth on your Mixpanel implementation
- Define your business goals / KPIs and analytics strategy metrics. For a deeper dive into how you can map your KPIs to your specific user flows, you may want to explore our [Analytics Strategy Measurement Framework guide](https://docs.mixpanel.com/docs/best-practices/analytics-strategy/overview).
- Outline the events, event properties, and user profile properties aligned to your metrics. To dive deeper into understanding your events and properties, take a look at our [Events and Properties](https://docs.mixpanel.com/docs/data-structure/events-and-properties).
- Be treated as a living and shared document that is continuously updated with any implementation changes
- Include notes that are referenced across teams (product, marketing, data science, tech / dev teams, etc.)

This will be important for team members who are involved in defining use cases to be implemented in Mixpanel as well as, tech teams involved in the actual implementation of the codes.

### Importance of Data Governance

Building your Mixpanel Tracking Plan should be part of your larger effort in establishing practical and sustainable Data Management and Governance procedures. 

Making sure you have a clearly defined framework, roles and ownership, quality assurance and review procedures, and overall best practices will lead to better decisions that foster trust and accuracy in your data. 

If you already have an established process, we suggest incorporating existing tools and processes into how you document and track your product analytics data for long-term success. 

If you do not have this established for your organization, it is worth starting with internal discussions on how to define how Data Governance and how it can be integrated as part of your data journey. To help you with this, you can take a look at our [Mixpanel Data Governance Guide](https://mixpanel.com/blog/data-governance-an-8-step-program/).

*can condense or directly link to data governance section*

Of course, every organization will be different in terms of maturity, size, and business needs so you will need to figure out what solution will work best for your team.

## Prioritize for Your Onboarding

In the context of your Mixpanel onboarding, our goal is to get you and your team to value and start answering your most critical business questions as quickly as possible. 

For an overview of the Onboarding Overview, please visit the Onboarding Tutorial section. *link to the Onboarding Overview section*

## Tracking Plan Methodology

### Design from a Business Perspective Rather than an Application Perspective. 
Be intentional with your data. Prioritize your data based on your business goals and focus on prioritizing key use cases. You can create a comprehensive tracking plan, but make sure to identify the key objectives, the KPIs, and the events and properties for your onboarding.

Successful onboarding generally focus on one or two key use cases such as:

- the registration or sign up process
- a required activation or account set up journey
- the purchase funnel
- an important engagement journey (watching content, creating a playlist, planning a route, importing files to your platform, setting up an integration)

### Define and prioritize KPIs
Define the top KPIs and metrics that will help measure success and inform decisions about your product. 

Please find the link to our Analytics Strategy documents that can help guide you in measuring what success looks like for you. *add link to RAE Framework*. 

### Map KPIs to User Flows
Map each KPI / metric to the steps or actions that users take to influence each KPI / metric. For example, sign up flow will be important when measuring KPIs related to new user acquisition. Consider also the different paths that users can take to achieve the same outcomes.

### Identity Management
As you are building out your tracking plan, make sure to consider where you will need to manage user identity. In summary, when a user goes from being anonymous to when that user completes registration and/or logs in, you will need to properly identify this user with a distinct ID.  For a full understanding of this critical concept, please review our [Identity Management guide here](https://docs.mixpanel.com/docs/tracking-methods/identifying-users)

### Translate Flows into Events / Properties
Breakdown your user flows into events (actions) and properties (context of these actions) in your tracking plan. This will ensure that you have scoped out the data you need to achieve your KPIs / metrics in Mixpanel.

### Naming Convention

Mixpanel provides the following templates for vertical-specific tracking plans:

- [Retail and E-commerce](https://docs.google.com/spreadsheets/d/1Kyys37m_GEL79_1BKKEnU5KxK91NF04kY-L_bFfcfqE/edit#gid=1484002407)
- [Media and Entertainment](https://docs.google.com/spreadsheets/d/1K9t53kJJjaBG36kCIbZn_qKjXR9Iy306zYZAqDrv_AM/edit?usp=sharing)
- [SaaS](https://docs.google.com/spreadsheets/d/1A5wm5MKzRfSOZfUfCAg8YpePiz8Jn3Ar_u8KBo5lD6g/edit?usp=sharing)
- [Financial Services](https://docs.google.com/spreadsheets/d/1oGv6vbIFiYbima9IX4ItpBJvuChs-zzh83MRt_dSPgg/edit?usp=sharing)

You can also access a copy of a [blank Tracking Plan from here](https://docs.google.com/spreadsheets/d/1ZdOZ6TMtRPxy7qRxiLsvH9HWcHJM6nZydWKoThRxFKc/edit#gid=1641519238). Save a copy to your device to get started on your tracking plan.

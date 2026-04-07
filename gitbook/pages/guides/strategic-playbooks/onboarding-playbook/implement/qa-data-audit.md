# Check Your Implementation

As a best practice, we recommend that you minimally setup two Mixpanel projects, one for **Development** data and another for **Production** data. If you have not done so, refer to the [Development and Production Project Setup](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tutorials/plan/setup#development-and-production-project-setup) section.

You should implement and test all your tracking using the development project; and before pushing live data to your production project, you should conduct Quality Assurance (QA) tests to ensure correctness, consistency, and accuracy.

## Quality Assurance

There are generally two levels of Quality Assurance tests that your teams should focus on:

- **Code Level** - involves developers checking on individual event, user / group profile, and property names, as well as, their values for correctness and consistency, by triggering calls and monitoring the results for any errors in the data or errors thrown by the Mixpanel SDKs or APIs.

- **User Flows** - consists of product and data teams navigating through your website / app focusing on testing the key journeys being tracked, and checking on events, user / group profiles, and their properties for accuracy in relation to the entire journey. Identity management is also a key focus here to ensure users are being correctly identified across devices and platforms.

<p >
  {% embed url="https://www.youtube.com/watch?v=uYDEYHIUW4E" %}

Mixpanel provides the following tools that enable you to conduct QA:

1. Debug Mode - Mixpanel Client-Side SDKs can be configured to [Enable Debug Mode](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/debugging/overview#enable-debug-mode) which logs any Mixpanel client-side calls to the browser console or development platforms (eg Xcode, Android Studio). 

   Outside of the Client-Side SDKs, development teams should consider including code to handle error responses thrown by our Server-Side SDKs, APIs, or by the other tools you use to send data to Mixpanel (eg CDP, Reverse ETL or Cloud Ingestion scripts).

2. Events - the **Events** report enables reviewing of events and their properties as they flow into your Mixpanel project. There is also a *JSON mode* feature which can come in handy if you are checking for data type inconsistencies.

   ![image](/tutorials/events-report.png "Events Report")

3. Users -> Profile Activity Feed - the **User Profile Activity Feed** report contains all the information about a specific user that you are tracking. Using this report you can:

   - Examine the Identity Cluster to see all the Distinct IDs linked to a user
   - Search and validate all User Profile Properties and their values
   - Use the Activity Feed section to search through all events with the most recent one listed on top
   - For customers using [Group Analytics](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-structure/advanced/group-analytics), this same report can also be used to view group profile properties and events underneath a Group ID

   ![image](/tutorials/profile-activity-feed.png "Profile Activity Feed")

   Note: The User Profile Activity Feed report is the only report with query-time identity management merging. All other reports in Mixpanel may still show separate Distinct IDs while merging is still being processed. Refer to this [FAQ](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tracking-methods/id-management/identifying-users-simplified#faq) for more details.

4. Lexicon - Mixpanel's **Lexicon** contains all the metadata about your events and properties. It also contains other metadata about [Custom Events](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/features/custom-events), [Custom Properties](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/features/custom-properties), [Lookup Tables](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-structure/lookup-tables), and [Formulas](/changelogs/2023-11-09-saved-formulas) that you would eventually create in the Mixpanel UI.

   Lexicon can be used to check naming consistencies across your events and properties and also ensure that you are not sending any event or property that you should not be tracking. We will cover Lexicon in greater detail under [Establish Governance](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/tutorials/implement/establish-governance#lexicon-overview-and-data-clean-up) section; should you need more information refer to our documentation on [Lexicon](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-governance/lexicon).

   ![image](/tutorials/lexicon-events-properties.png "Lexicon Events and Properties")

For help when you are troubleshooting, refer to our documentation on [Debugging](https://docs.mixpanel.com/docs/debugging/overview) for more guidance.

## Mixpanel Monitoring Dashboard

Besides conducting Quality Assurance tests, it's good to keep track of your overall implementation progress by monitoring all the data that is coming into Mixpanel in a dashboard. This is to help provide a higher level data audit that serves as another layer of quality check.

![image](/tutorials/mixpanel-monitoring-dashboard.png "Mixpanel Monitoring Dashboard")

Our Customer Success Team has created a [Mixpanel Monitoring Dashboard](https://mixpanel.com/project/3018488/view/3536632/app/boards/#id=6350211) that you can copy into your own project to help you track key high-level statistics around your events, properties, and identity management.

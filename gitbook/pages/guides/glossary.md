# Glossary

Use this glossary to get familiar with the concepts that power Mixpanel—from data tracking and privacy to growth metrics and product strategy.

Browse by category, or jump directly to the [A–Z list](glossary.md#az-glossary).

***

## Browse by Category

<details>

<summary><em>Expand to view categories</em></summary>



</details>

***

## A–Z Glossary

### Active User

A user who interacts with your product within a defined period, [measured via event-based tracking](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/data-structure/events-and-properties) as Daily Active Users (DAU), Weekly Active Users (WAU), or Monthly Active Users (MAU).

### Annotation

Contextual notes added to reports to [mark key events](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/analysis/features/annotations)—such as releases, campaigns, or anomalies—directly on the timeline.

### Autocapture

A low-code feature that [automatically collects](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/autocapture) standard user interactions—such as page views, clicks, form submissions, and scrolls—without the need for manual instrumentation.

### Business Associate Agreement (BAA)

A legal contract that [defines how vendors handle Protected Health Information (PHI)](https://mixpanel.com/legal/mixpanel-hipaa/) in compliance with HIPAA regulations.

### Business to Business (B2B)

A commercial model where products or services are sold to other companies rather than individual consumers.

### Business to Consumer (B2C)

A commercial model where products or services are sold directly to individual consumers rather than companies.

### Board

A collaborative workspace that [centralizes saved reports and metrics](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/boards) into a single view for real-time monitoring.

### Bounce Rate

A metric tracking the percentage of [sessions with only a single page view](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/analysis/features/sessions#what-are-the-average-number-of-pages-visited-per-session), often used to indicate low engagement or friction in the onboarding experience.

### Daily Active Users (DAU)

A metric tracking the number of distinct users who engage with your product in a single day, used to [measure daily engagement and growth](https://mixpanel.com/blog/daily-active-users/).

### Data Lake

A centralized repository that stores raw, unstructured data at scale, offering flexibility but requiring transformation before it can be utilized for analysis.

### Data Warehouse

A system optimized for storing structured data, which can be [ingested directly into Mixpanel](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/warehouse-connectors) for fast analysis and reporting.

### Dormant User

A user who engaged in a previous period but has not performed a key action in the current one, often [identified via cohort analysis](https://mixpanel.com/blog/cohort-analysis/) as targets for reactivation campaigns.

### Feature Flag

A configuration tool that [toggles feature availability](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/featureflags) for specific segments, enabling targeted rollouts and A/B testing without code deployment.

### First-party Cookies

A data file stored directly by the website the user is visiting, essential for maintaining persistent user identity and session continuity without relying on external trackers.

### Formula

A custom expression that [modifies or combines data series](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/analysis/reports/insights#formulas)—such as dividing total revenue by user count—to calculate derived metrics and ratios.

### General Data Protection Regulation (GDPR)

A comprehensive European Union regulation governing personal data privacy, supported in Mixpanel via [dedicated compliance tools](https://mixpanel.com/legal/mixpanel-gdpr/) for processing and deletion.

### Groups

A data structure that [aggregates user activity by entity](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/data-structure/group-analytics)—such as companies, teams, or devices—to analyze performance at the group level rather than the individual user level.

### Health Insurance Portability and Accountability Act (HIPAA)

A United States federal law mandating the security and privacy of Protected Health Information (PHI), accommodated via [HIPAA-compliant plans](https://mixpanel.com/legal/mixpanel-hipaa/) for customers handling medical data.

### Identity Management

The process of associating events with specific users by [resolving unique identifiers](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/id-management), typically using the `identify()` method to merge anonymous activity into a unified profile across devices.

### Ingestion

The transmission of event data into the analytics platform, accepted via [client-side SDKs](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/sdks), the [Ingestion API](https://developer.mixpanel.com/reference/ingestion-api), or [partner integrations](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/integrations).

### Marketing Qualified Lead (MQL)

A prospect who has demonstrated sufficient engagement or fit to be [handed off to sales](https://mixpanel.com/blog/marketing-qualified-leads/) for further qualification.

### Minimum Viable Product (MVP)

The most basic version of a product released to validate core assumptions and test concepts with real users before full-scale development.

### Monthly Active Users (MAU)

A metric tracking the number of distinct users who engage with a product within a 30-day window, used to [assess long-term growth trends](https://mixpanel.com/blog/mau/).

### Month-over-Month (MoM)

A comparative metric that measures the percentage change in performance between the current month and the previous one to identify growth momentum or seasonality.

### Multivariate Test

An experimentation method that [evaluates multiple variable combinations simultaneously](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/experiments)—rather than just two versions—to determine how different elements interact to influence user behavior.

### Net Promoter Score (NPS)

A standard loyalty metric that gauges customer satisfaction by asking users to rate their likelihood of recommending the product on a typical scale of 0 to 10.

### New User

A user who is recorded for the first time within a specific time window—such as a signup week or first session—tracked to measure acquisition success and onboarding efficacy.

### Protected Health Information (PHI)

Health-related data linked to a specific individual, which is [protected under HIPAA](https://mixpanel.com/legal/mixpanel-hipaa/) and requires a Business Associate Agreement (BAA) for processing by vendors.

### Personally Identifying Information (PII)

Any data that can directly or indirectly distinguish a specific individual—such as names, emails, or IPs—often requiring [specific privacy configurations](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/admin/privacy/protecting-user-data) to ensure data security.

### Quarter-over-Quarter (QoQ)

A comparative metric that measures the percentage change in performance between one fiscal quarter and the previous one to gauge short-term business momentum.

### Sales Qualified Lead (SQL)

A prospect who has been vetted by the sales team as ready for direct engagement, typically having graduated from the Marketing Qualified Lead (MQL) stage based on strong intent or fit.

### Session

A set of continuous user interactions, [grouped into a single visit](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/analysis/features/sessions) based on a time-out window or specific start and end events.

### Software Development Kit (SDK)

A package of code libraries that simplifies the process of [sending event data](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/data-in/tracking-methods/sdks) from client-side or server-side applications to the analytics platform.

### Stickiness

A measurement of engagement frequency that [calculates how often users return](https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/analysis/reports/retention) to perform key actions within a specific interval, used to assess habit formation and product utility.

### Third-party Cookies

Data files set by external domains for advertising or cross-site tracking, which are [distinct from the first-party approach](https://mixpanel.com/blog/cookies-consent-and-the-gdpr-the-role-of-privacy-in-a-product-analytics-strategy/) prioritized by modern analytics to ensure privacy and reliability.

### Weekly Active Users (WAU)

A metric tracking the number of distinct users who engage with a product within a seven-day window, often monitored to [measure weekly engagement habits](https://mixpanel.com/blog/mau/).

### Year-over-Year (YoY)

A comparative metric that measures performance against the same period in the previous year to identify long-term trends while controlling for seasonality.

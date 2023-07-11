Welcome to Mixpanel's API Reference! Here you'll find the specs of our core APIs for ingestion, export, and more.

Even if you plan to set up Mixpanel via our SDKs, we recommend browsing this documentation (particularly our Ingestion API) to better understand the Mixpanel data model.

## Authentication
* You will need your Project Token to send events or user profile data to Mixpanel.
* You will need your Project Secret to import historical events or export events.
* You will need a Service Account for all other endpoints.

TODO: Figure out where to put the Service Account documentation! And unify this with the "Find your API Credentials" page.


## Limits
We provide a summary of important limits here, but more details are in the reference of each API:
* We have a limit of 30K events ingested per second on all of our Ingestion APIs. This translates to ~2.5 billion events/day.
* We have a limit of 60 requeests per hour to our Export APIs (/export, /engage/query) or to our Report APIs (/segmentation, /funnel, etc.).


### Why these limits?
Mixpanel is a multi-tenant system, so limits help ensure a real-time, reliable, and fair experience for all customers.

Our Ingestion API limit is to protect a single customer from affecting real-time ingestion for all customers. That said, we're able to support higher limits on a one-off basis if you give us advance notice. Please reach out to support or your CSM to request a higher limit.

Our Export/Report API limits are to protect a single customer from affecting real-time querying for all other customers. This is a hard limit. Here's what we recommend if you hit the limit:
* If your use case is to continuously export events for archival purposes, we recommend using our Data Pipelines add-on. It will continuously export your events to a cloud storage bucket or a data warehouse in a managed way.
* If your use case is to embed a Mixpanel report in another platform, you can do so natively. All Mixpanel reports support the oEmbed standard, so you can paste a Mixpanel report link in any other platform that supports embed, authenticate, and the report will embed.
* If your use case is to offer a "whitelabeled" solution on top of Mixpanel's APIs to provide analytics to your own end-users, this is not something we currently support. We recommend using Pipelines to export the raw data to your data warehouse and using a dedicated solution for "whitelabeled analytics" on top of the data warehouse.

If you're hitting the limit and have another use case not listed here, please reach out to our Support team!

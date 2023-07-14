This guide outlines best practices for leveraging Mixpanel to establish a product analytics practice within your team. The examples and practical advice come from the experience of helping 1,000+ companies over the past 10+ years of implementing and adopting Mixpanel. Using these tips and tricks will help you get the most value out of Mixpanel.

## Start Small, Iterate

Scaling Mixpanel to hundreds of use cases starts with getting one use case right. Focus on your highest impact use case and limit your scope to the key data to measure that use case. We recommend starting with your [sign up and value moments](/docs/getting-started/what-to-track) first - for example, for an e-commerce company, this would be the signup/login actions alongside completed purchases. Getting your most important user flow right will allow you to learn and set standards before proceeding with scaling to additional use cases. The first event and use case will be hard; every subsequent one will be easier.

This approach also allows you to cut down on the time needed to make product analytics successful. Instead of a 6 month long waterfall implementation you can iteratively add value over each development sprint in an agile fashion to accelerate time to value.

## One (or a few) events can get you started

One of the myths of analytics is that you need tons of data to generate meaningful insights. We find that starting with 1-3 events that are truly meaningful to the business are sufficient to generate more insights than you could imagine. The biggest thing to consider is adding more properties to your events - this is the context about an event which will allow you to self-serve analysis about your key actions in ways you were unable to quickly or easily before without an analyst or advanced knowledge of SQL.

If you can work backwards from a key question to the events you need to track, this will minimize the need to overly track events across the user’s journey. We highly recommend all events be tied into some core KPI or question for your team, as otherwise the data will just be noise. This will also allow you to get a feel for how implementation works to drive data that answers a question, which will teach your team the workflow for product analytics and influence your future tracking efforts.

### Rollout Team by Team

We’ve seen all sorts of rollout strategies from pilot teams to big bang approaches to hundreds of employees at once. It’s best to define our units of scale to understand at which level and unit we can best establish a product analytics practice:

- **User:** Single person, 1 Mixpanel account, Individual needs and goals
- **Team:** Collection of people focused around a common goal, 1 Mixpanel Workspace, Team metrics and goals
- **Organization:** Collection of teams focused around common goals, 1+ Mixpanel Workspaces, Many needs and goals

In our experience, the best approach to succeed with product analytics is via each Team:

- Users are too small. Their needs vary. Level of success will be limited to span of influence of individual users. Influential users should dedicate their focus towards their immediate team(s).
- Organizations are too big. Every team will have different goals, data needs, and analysis needs. Trying to do too many things all at once versus having focus.

Utilizing the team by team approach allows you to:

- Accelerate time-to-value for all teams
- Quickly test and iterate on the right practices for your organization in a controlled environment
- Show success and set the example for other teams to follow
- Develop the first set of experts who can help scale product analytics adoption across your organization

## Get the right resources involved (and excited)

We’ve learned that a focused investment from a Product Manager and Software or Data Engineer early on is critical to setting the team up for success with product analytics in the long term. Here’s what we recommend on each team that is adopting product analytics:

- A PM and Engineer from the team
- Key metrics and questions that the team is eager to answer
- Someone with access to the data and code necessary to iterate on implementation
- 1-2 weeks of bandwidth to get the implementation up and running
- Excitement to establish the foundation for self-serve product analytics

## Good data is the foundation to successful adoption

Analytics is only as good as the data that feeds it. A great analytics setup is:

- **Trustworthy**: You can trust and understand the data.
- **Comprehensive:** You can load Mixpanel with all the data you need for analysis.
- **Maintainable:** You can set up, maintain, evolve, and scale the system with minimal effort.
- **Usable:** The event structure allows you to answer the questions you need.

Over the years, we’ve made several observations that have shaped our perspective:

| **Observation**                                                                                                                                                                           | **Our Perspective**                                                                                                                                          |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event data is used for more than just analytics (eg: personalization, marketing automation).  Teams want to use the best tool for each of the above jobs, without vendor lock-in.         | Decouple event  collection from the tools in which those events are used.                                                                                    |
| Transactional systems (eg: MySQL) are the most trustworthy source of data. The data warehouse (DWH) is the most scalable and effective way to transform transactional data into events.   | When possible, use the DWH to model and push events to all your tools. This is especially true for enrichment of data done post ingestion.                   |
| Web tracking is lossy due to ad-blockers. Mobile tracking is hard to maintain, since iOS and Android tracking code will diverge and old app versions will remain out in the wild forever. | Prefer server-side tracking to client-side SDKs, whenever possible. CDPs can also help with data collection here depending on your team’s data maturity.     |
| Business questions often neglected or separated from product analytics data.                                                                                                              | Enrich with as much data you can. On both event level and user level. LTV, CPA, Salesforce, Hubspot, Zendesk etc. Those can help paint a better picture.     |
| Issues with pre auth and post authentication and not able to track the user throughout the whole funnel                                                                                   | Make sure to implement identity management within best practices                                                                                             |
| Multiple projects create issues with data governance, noise and lack of ability to cross query.                                                                                           | Suggest a single project with properties to filter out or create data views per project or team. This also reduces the load on data governance.              |
| High costs on data that is no longer relevant or data that is not being used                                                                                                              | Utilize the data governance tools in Lexicon to drop, merge and track what events are being used across the org and remove those that aren’t giving you ROI. |

## If you already have trusted data, democratize it

We commonly talk to customers about having “source of truth” data, or data which your company already uses to make key decisions and report on to investors. In cases where this data already exists (likely in a data warehouse), you should not leverage Mixpanel to duplicate or replace this data. Instead, you should make sure that data is properly modeled as event behavioral data - with a user ID, timestamp, and properties - and send it to Mixpanel.

Appropriate methods for ingestion include:

- Leveraging our cloud ingestion API via event queue like Kafka or PubSub to send data from an already existing ingestion pipeline
- Using a reverse ETL platform like Census or Hightouch to send modeled and enriched data from your data warehouse back into Mixpanel
- Pointing your CDP like Segment at Mixpanel with the same data you are trusting and sending to other systems

Note that you may only have *some* of the data you need for Mixpanel in a trustworthy state. We often refer to these types of data separately:

- Transactional data: Data used to power your application, must be stored in the data warehouse or application database - for example, a signup
- Clickstream data: Data from the user’s journey to analyze behavior, like viewing the homepage and clicking the signup button

## If you need to create trusted data, track it server-side

If you don’t have trustworthy data, or perhaps have an incomplete set of data (for example, you may have trustworthy data for key transactional events like signups; but be missing data for clickstream events in the user journey), you should strongly consider adding new data server-side.

Using server-side tracking allows you to:

- Maintain data tracking changes over time (as otherwise older app versions or deploys will continue to send old data to Mixpanel)
- Avoid data accuracy issues with tools like Ad Blockers and privacy extensions (which will block some or all data sent to Mixpanel based on user preferences)
- Increase adoption (accurate data means higher adoption; if users are constantly questioning their analyses in Mixpanel they will revert to whatever habit they formed before for analysis)

## Naming conventions should go with the grain

How you name your events, properties, boards, project, etc. should be based on the standards already adopted by your internal teams. Provided the naming has sufficient context to explain what an event means, it is preferred to go with commonly adopted and well known conventions from your team/organization.

If you don’t know where to begin, we’d recommend snake case as a best practice - i.e. converting all spaces to `_` and all capital letters to lower case. The reason behind this is that in most databases, spaces and capitals are converted to snake case anyways. So when you later export your Mixpanel data or want to use it in other data applications, snake case is typically the accepted practice and what will be easiest to maintain. You can always add display names and definitions for events and properties later on within Mixpanel’s Lexicon feature.

## Fewer Events, More Properties

Tracking as many actions as possible is not the route to long-term success. Instead, you should be thinking about adding context to these actions via properties. Adding more properties not only has the added benefit of not increasing your Mixpanel bill, but it adds more dimensions by which you can segment key actions to make insights.

There are two extremes we steer customers away from: Events that are too broad and events that are too narrow. Where events are too broad, you’d end up having to create filters for every single disparate action you want to measure. Conversely, where events are too narrow, you need to do a lot of work every time to compare the actions against one another.

In general, we advise customers to group together the same actions that users take across your site / platform, and group them to the level of the most commonly asked questions. You can find relevant examples for this [here](/docs/other-bits/tutorials/analytics-strategy#best-practices).

## Centralize standards in ways your org understands

We’ve found that every company works differently in how they store and share knowledge internally. Despite these differences, we highly recommend that you centralize your data governance and analysis standards somewhere for your team to access. We use Notion, but for smaller companies we’ve seen Slack Bookmarks and for larger companies entire Wikis in internal sites. These can be an important place to document key standards, best practices, and key contacts in case of questions.

In the following link, we've consolidated a set of similar reference materials that you can leverage to similarly help your teams onboard and self-serve with Mixpanel. Contained in this guide are support, training, project-specific resources, metrics, and objective stores and resources to request additional data.  

[Mixpanel Reference Guide](https://mxpnl.notion.site/mxpnl/Mixpanel-Example-Reference-Guide-275a8a8e412e46dbbf021528ffd52f01)

## Create a safe space for questions

No matter your best efforts as the champion of Mixpanel, there will always be questions from end users - What is this event? What should I use for signups? Do we have a Board of our KPIs? It’s important to create a space and cadence for asking and answering these questions amongst your team. We recommend a simple Slack channel dedicated towards all things Mixpanel, but of course a Teams chat or ongoing cadence in something like a live Zoom for office hours would work.

If you are working with Mixpanel on an Enterprise plan, we’re also happy to create a Slack channel between your power users and your Mixpanel account team to facilitate quicker responses and a shared library of context around our partnership. If you aren’t on an Enterprise plan, you can join our [Slack Community](https://community.mixpanel.com/) and ask questions amongst other Mixpanel users - head on in and join the #questions channel!

## Make Mixpanel part of your habits and rituals

Adopting Mixpanel only works if it becomes part of your routines. In the most ideal state, Mixpanel would be a part your performance review process, leveraging insights from. Mixpanel to judge the success of product releases, experiments, and more. We definitely recommend measuring all PRDs via Mixpanel once you can. At a smaller scale, getting started by using Mixpanel live in team meetings and standups can server to start building the habit of self-serve analytics and teach your EPD team how powerful Mixpanel can be in asking a question and getting a live answer quickly to move forward with a decision.

## Sampling will limit your value

Sampling your data seems like a logical outcome as prices increase for tools and insights are still needed by your users. Unfortunately, all of the customers we’ve ever worked with on product analytics who sample end up with limited value over time. Trying to reduce event volumes by sampling creates trust issues and more importantly will deny you the pros of using a product analytics tool. You’re better off tracking less events for full journeys than sampling many events for all your users.

Key benefits of product analytics lost when sampling include:

- Inability to view specific user journeys (those outside of the sample will be non-existent)
- Incorrect conclusions on statistical significance and the effect of experiments (sampling requires complex and error prone calculations)
- Irreversible (sampling drops data permanently and cannot be recovered later)

Sampling admittedly can be useful when getting started to try out different events as you iterate on your tracking and confirm what is valuable versus what is not. But longer term it will only cause your team headaches.

## Need help or inspiration?

Mixpanel Customer Success has also been publishing our best practices on our blog, The Signal. Head over to read more about these topics:

- [Establishing a Product Analytics Practice](https://mixpanel.com/blog/establish-a-product-analytics-practice/): By embracing product analytics as a practice, teams can make self-serve data the cornerstone of their decision-making and turn the sea of unknowns into knowns.
- [Choosing the right analytics data architecture tech: A step-by-step guide](https://mixpanel.com/blog/guide-to-choosing-your-data-architecture/): Your analytics data architecture tech choices rely on everything from desired use cases to organizational norms and who might use the tools in the future.
- [5 questions to ask yourself before planning your data architecture](https://mixpanel.com/blog/5-questions-for-planning-your-data-architecture/): Choosing how to design, organize, and manage your data architecture involves the data and systems, yes, but it also hinges on people, processes, and use cases.

We're also happy to help advise your team with specific guidance based on your situation - drop us an email at [success@mixpanel.com](mailto:success@mixpanel.com) and we'll be in touch with an expert to help.

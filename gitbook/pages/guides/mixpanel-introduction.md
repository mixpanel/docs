# Mixpanel Introduction

Mixpanel is a **digital analytics platform** that helps teams continuously improve their products by turning data into action. At its core, Mixpanel supports a **continuous innovation loop**—helping you observe what users do, analyze why it happens, decide what to do next, and act on those insights.

{% hint style="info" %}
**Why it matters:** Teams use Mixpanel to learn faster, align decisions across functions, and measure the impact of every product change.
{% endhint %}

---

## See Mixpanel in Action

{% columns %}
{% column width="58.33%" %}
{% embed url="https://www.youtube.com/watch?v=sRQCfmvh3vg" %}
{% endcolumn %}

{% column width="41.67%" %}
### Mixpanel Overview
      

        In this 5-minute overview, learn how Mixpanel powers the continuous innovation loop––from observation to impact.
      

      [Open in YouTube →](https://youtu.be/sRQCfmvh3vg)
{% endcolumn %}
{% endcolumns %}

---

## Mixpanel Features That Power Continuous Innovation

{% columns %}
{% column width="58.33%" %}
Mixpanel is built around a simple but powerful framework for continuous improvement: **Observe → Analyze → Decide → Act (OADA)**.

Each stage in the OADA framework connects directly to Mixpanel’s tools, helping you move from data to observation to action–—all in one platform.
{% endcolumn %}

{% column width="41.67%" %}
![OADA Loop diagram](/oada-loop-simple-wide-fcf9fa.png)

*The cycle of continuous innovation.*
{% endcolumn %}
{% endcolumns %}

| 👀 **Observe** | 📊 **Analyze** | 💡 **Decide** | 🚀 **Act** |
|---|---|---|---|
| See what’s happening in your product with [Session Replay](./session-replay.md), [Heatmaps](./session-replay/heatmaps.md), [Autocapture](./tracking-methods/autocapture.md), and [Alerts](./features/alerts.md). | Explore [Insights](./reports/insights.md), [Funnels](./reports/funnels.md), [Flows](./reports/flows.md), [Retention](./reports/retention.md), and [Cohorts](./users/cohorts.md) to find what moves your metrics. | Align on what to change next with [Metric Trees](./metric_tree.md), [Boards](./boards.md), [Annotations](./features/annotations.md), and shared insights. | Measure impact with [Experiments](./experiments.md) and ship improvements with [Feature Flags](./featureflags.md). |

All of this is powered by Mixpanel’s modern data foundation—–bringing together AI-assisted analysis through features like [MCP Server](./features/mcp.md), robust [data governance](./data-governance.md) for accuracy and trust, and built-in collaboration tools that help teams move from insight to action faster.

**Learn more:** [Go deeper on the OADA Loop →](./guides-by-topic/continuous-innovation.md)

---

## Mixpanel Data Model

Everything in Mixpanel starts with **events**––the building blocks of your data model.
   
An event represents something a **user** does (like *Signed Up*, *Viewed a Product*, or *Completed Purchase*). Each event can include **event properties** that add context, such as the user’s plan type, location, or device. 

Alongside events, Mixpanel also tracks **user profiles**––records that represent individual people. These profiles store demographic attributes known as **user properties** (like name, email, or signup date), which help you understand who your users are and analyze behavior at the individual level.

Optionally, you can analyze data at the group level using [Group Analytics](./data-structure/group-analytics.md).

![Data Model](/Data_Model_with_Group_Analytics.png)

Together, these events and properties form a flexible data model that mirrors how people actually use your product. Once instrumented, you can analyze this data instantly—–without writing SQL or waiting on an analyst.

**Learn more:** [Dive deeper into how Mixpanel structures data →](./data-structure/concepts.md)

---

## Keep Learning

Keep building your Mixpanel expertise with these resources designed to help you learn, connect, and put insights into action.

| Resource | Purpose | Link |
|-----------|--------------|------|
| **Community** | Connect with other Mixpanel users, share ideas, and learn how peers are tackling similar challenges. | [Open →](https://community.mixpanel.com/) |
| **Developer Docs** | Build and extend Mixpanel with SDKs, APIs, and advanced implementation guides. | [Open →](https://developer.mixpanel.com/reference/overview) |
| **Docs** | Explore product capabilities, setup guides, and detailed feature references. | [Open →](https://docs.mixpanel.com/) |
| **Events** | Join live sessions and webinars to explore new features, use cases, and expert-led best practices. | [Open →](https://mixpanel.com/events) |
| **Guides** | Apply Mixpanel best practices to real-world workflows and use cases. | 📍 You are here |

Wherever you are in your Mixpanel journey, these resources will help you keep learning, stay connected, and keep improving.

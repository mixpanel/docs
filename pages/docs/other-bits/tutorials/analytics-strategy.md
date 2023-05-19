## Workshop Overview

Hello and welcome to Mixpanel’s Product Analytics Strategy workshop. 

Product analytics provides valuable insights into how users interact with your product, what features they use the most, and where they drop off. It helps you understand your users' behaviors, preferences, and pain points, and provides data to drive decision-making. 

In this workshop, we will be guiding you through the steps to build out a solid Analytics Strategy framework to define your top key performance indicators that will help guide data architecture and instrumentation of Mixpanel. 

So let's dive in and learn how to build an effective Product Analytics Strategy for your product!

## Importance of Analytics Strategy 

https://www.loom.com/share/7d23f655e0fa4781b48434f3f719bab8

Having a solid Analytics Strategy in place will enable your business with :  

1. **Data-driven Decision Making**: It helps you understand how your product is performing, identify areas for improvement, and uncover opportunities for growth. With a data-driven approach, you can optimize your product, prioritize resources, and align your efforts with your product goals.

2. **Evidence-based Communication**: An analytics strategy provides you with concrete data and evidence to communicate the performance of your product to stakeholders, team members, and other relevant parties. It helps you present facts, trends, and insights to support your product decisions and gain buy-in from stakeholders. 

3. **Collaboration and Alignment**: An analytics strategy provides a common framework and language for different teams within the organization, such as product, marketing, sales, and customer support, to collaborate and align their efforts. Data-driven insights from the analytics strategy can facilitate discussions, align expectations, and foster collaboration among teams, leading to better coordination and synergy.

## How Does Your Current Product Analytics Strategy Stack Up? 

In order to improve their products, companies must know what questions to ask. By assessing your product analytics maturity, you’ll see the possibility (and benefit) of moving product data from the periphery to the center of product decisions.

This guide helps you determine:

- Your current product analytics maturity
- Where you want to land on the maturity scale
- What you need to do to get there
- Why it all matters to product and company growth

**Where do you stand?**

Take this short quiz to understand how does your current product analytics strategy stack up and we'll give you a rating and share tips to advance : **[Take Quiz](https://mixpanel.com/content/product-analytics-strategy/quiz/)**

Now based on your quiz results, use this matrix as a guide to understand the characteristics of your product analytics strategy at each stage, and what’s needed to progress : 

<img width="1000" alt="maturity matrix" src="https://github.com/mixpanel/docs/assets/133952937/e38648a0-877d-4b6d-ae47-df489b8ccab2">

## Adopting A Measurement Framework

**What to Not to Track?**

Too often, we see customers peer through every single interaction on their platform and say, “what if we need to know this metric down the road? It could be important. Let’s just track it just in case”.

The two main issues with “just-in-cases” are:

1. It drastically increases the implementation time for your development team. We’ve seen implementations stretch out over multiple sprints because the developers don’t have time to implement every thing and end up pushing back to ask for prioritisation by sprints. If we’re going to end up doing that anyway, why not just prioritise from the beginning?

2. It leads to event bloat. When there are too many events, end users find it more difficult to learn which are the important events they need to measure. Too often, one of the reasons customers cite low engagement on the tool when their users are overwhelmed by the number of events. Too many events - and event properties - also slow down the platform. Imagine pulling a drop down to look for an event, but the there are over 1,000 events to load. (Note that our UI allows a dropdown of up to 1,500 events; you can still explicitly query the exact event if you know the name even if you can’t find the event in the dropdown though).

**So, what should one track?**

There is no single set of metrics that works for everyone. Businesses and products are all unique and have different goals; even departments in the same company may have different ideas of success from one another. With those differences in mind, we’ve crafted a framework to help you find the right metrics for your product 

Mixpanel’s measurement framework is composed of a Focus metric, which typically is the metric that is slightly more important than the rest; as well as, Level 1 metrics that either directly contribute or act as a checks to the focus metric. More specific metrics can also be further added to drive the Level 1 and Focus metrics.

![measurementframework](https://github.com/mixpanel/docs/assets/133952937/0ec6067f-c266-43b3-a0e2-3e5b7e065057)

Now let’s dive into each of these metrics a little further and go through an example of a measurement framework together. For this exercise, we’ll be using a video streaming product as an example : 

https://www.loom.com/share/e6568ba2034f431d97c19cd874fbc0d8

**Do-It Yourself Template**

Setting up your framework is a crucial first step. Below is a blank template for you to apply the framework to your product. Fill out the blanks and either work your way down or define the L2 metrics to help determine your focus metric! 

**[Measurement Framework Template](https://www.figma.com/file/wotkywtYHhcdNJlBLGJTzC/Mixpanel-Measurement-Framework-(Test)?type=design&node-id=0%3A1&t=kh6YYPwfwFwD5R9w-1)**

## Best Practices

Now that you have an idea of what events that you’d want to track, the next question is how you’d structure these events. It’s important to consider the proper level of event depth when designing your event naming conventions. For instance, these are two extremes we steer customers away from: Events that are too broad and events that are too narrow.

<img width="529" alt="bestpractices1" src="https://github.com/mixpanel/docs/assets/133952937/0180ba2c-cc07-48b0-93d3-bfee7ef88aa9">

Where events are too broad, you’d end up having to create filters for every single disparate action you want to measure. Conversely, where events are too narrow, you need to do a lot of work every time to compare the actions against one another.

**In general, we advise customers to group together the same *******actions******* that users take across your site / platform, and group them to the level of the most commonly asked questions.**

Consider the event `Start Signup`. Top questions we might want to answer with this:

- Which page / screen did users most commonly click start signup from?
- Which signup platform was the most popular?

Here’s an [example](https://mixpanel.com/s/35Jpng) of an implementation we *don’t* recommend.

<img width="1166" alt="bestpractices2" src="https://github.com/mixpanel/docs/assets/133952937/1e4f90c6-c914-45f4-ad03-583ac26a56ff">

Here, the question you’d want to answer most is: Which signup platform drives the most sign ups? If our events are too narrow, e.g. homepage/start_signup/apple, we’d have to manually add every single event where the signup occurs in order to do a comparison. It’s much easier to capture it as the event Start Signup and use event properties to describe the different originating pages / screens and signup platforms:

<img width="1167" alt="bestpractices3" src="https://github.com/mixpanel/docs/assets/133952937/f09e96c8-8fa3-47c7-8a81-704e9fad3592">


To get all signup starts via the ideal state structure, the user only needs to query the single signup event and apply the flow and platform breakdowns. Once that's complete, the user can easily see that the homepage flow drives the most traffic with Apple out-performing other platforms across the board.

Here’s another [example](https://mixpanel.com/blog/data-democratization-product-analytics/) where we walk through in-depth how to optimise a customer’s event structure.

## What's Next?  

We hope this Product Analytics Strategy workshop has provided valuable insights and practical tools to guide your business in effectively measuring the performance of your product. We encourage you to put your knowledge into practice and try out the Mixpanel Measurement Framework to unlock new insights and elevate your product's performance. Start measuring and shaping success today!

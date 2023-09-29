---
title: "What Is Mixpanel?"
slug: "what-is-mixpanel"
hidden: false
metadata: 
  title: "What is Mixpanel? | Mixpanel Documentation"
  description: "Explore Mixpanel's documentation to learn about product analytics, implementation, data structure, cohorts, SDK integrations, and more."
createdAt: "2021-04-16T19:30:56.811Z"
updatedAt: "2023-05-01T19:50:26.370Z"
---
Mixpanel is an analytics tool that enables you to capture data on how users interact with your digital product. Mixpanel then lets you analyze data with simple, interactive reports that let you query and visualize the data with just a few clicks.

Our self-serve interface empowers your team to answer questions, no matter their data expertise.

<p align="center">
    <img src=https://storage.googleapis.com/cdn-mxpnl-com/static/readme/Dashboard.svg>
</p>

## Introduction to the Data Model

Mixpanel's Data Model is built on three key concepts: **Events**, **Users**, and **Properties**.

### Events

An event is a data point that represents an interaction between a user and your product. Events can be a wide range of interactions. For example, every time a customer purchases a coffee from your café app, there are details that describe the purchase the moment it happens. Actions like purchasing a coffee can be tracked as an event in Mixpanel.

<p align="center">
    <img src=https://storage.googleapis.com/cdn-mxpnl-com/static/readme/Event.svg>
</p>

### Users

On the other side of an event is a user — the specific individual that completed an interaction with your product.

Because each user is unique, Mixpanel tracks which users completed what events and marries the two distinct data points by joining them. `event.distinct_id = user_profile.distinct_id`

<p align="center">
    <img src=https://storage.googleapis.com/cdn-mxpnl-com/static/readme/Users.svg>
</p>

### Properties

Properties are attributes that help you define the specifics of an **Event** or a **User**.

An **Event Property** describes an event. For a coffee purchase, the event would be Purchase and the event property could be _Item Type_ (in this case a Coffee) or _Item Price_ (in this case $2.50)

<p align="center">
    <img src=https://storage.googleapis.com/cdn-mxpnl-com/static/readme/Event_Property.svg>
</p>

A **User Property** describes a User. This could be their name, email, or age.

<p align="center">
    <img src=https://storage.googleapis.com/cdn-mxpnl-com/static/readme/User_Property.svg>
</p>

[Mixpanel's different reports](https://mixpanel.com/behavioral-analytics/) allow you to view data about various users or events and slice and dice that data by any property.
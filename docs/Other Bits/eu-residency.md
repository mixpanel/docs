---
title: "EU Residency"
slug: "eu-residency"
hidden: false
---

# Data Residency in EU

Data Residency refers to the physical/geographical storage location of an organization's data or information. For existing projects, you can find where your data is currently stored under Project Settings > Data Residency. Additionally, projects stored in the EU will have a url that starts with eu.mixpanel.com whereas projects stored in the US will have a mixpanel.com url. The location of existing projects cannot be changed. 

As a Mixpanel customer in the EU, you have the option to send your data to Mixpanel's EU data center, and have your data stored exclusively in the EU when creating a new project. You do not automatically get Data Residency and are not automatically set up in the EU data center. 

Mixpanel is at feature parity between the product experience we offer to our EMEA and North American customers. You do not lose any product capability because you choose to store your data in the EU.

# Enabling EU Residency

When you first sign up for Mixpanel or create a new project, the following modal prompts you to name your project, select your data storage location (US or EU residency) and select your timezone.

To opt in to EU residency, select the European Union option under Select Where To Store Your Data:

![image](https://user-images.githubusercontent.com/13734965/230121452-425d4ec0-4bb5-44e1-9422-3fae427d9fcb.png)

If your project has EU Residency enabled, you can confirm that in your Project Settings (i.e. Data Residency: EU)

If the wrong Data Residency location was chosen prior to implementation, you will need to create a new project with the applicable data storage option and migrate all your existing data. Mixpanel cannot assist with the migration of an existing project with the wrong residency location. You can find out more about creating a new project here.

# EU Residency and CDPs

If you are coming to use it from a Customer Data Platform (CDP), Mixpanel cannot guarantee that data ingestion, processing and storage will always stay within the EU region. Please work with your CDP to make sure they are sending your data to the EU endpoint. 

The following diagram shows how Mixpanel's Data Residency works:

![image](https://user-images.githubusercontent.com/13734965/230121513-b3a8bb84-4a64-45d9-ad41-f38b3fe977ea.png)

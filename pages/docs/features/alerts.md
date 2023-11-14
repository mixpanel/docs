# Alerts

## Overview

Mixpanel provides the ability to create alerts for your Insights and Funnels reports, allowing you to monitor custom report conditions, or automatically detect anomalies and receive email notifications when those conditions are met. Additionally, Mixpanel offers a Root Cause Analysis feature that helps you investigate and understand the underlying data behind alerts, enabling you to identify the user segments affected and address any issues quickly.

## The Basics
### How to create an alert
Create an alert for your Insights and Funnels reports and be notified when report conditions reach certain thresholds. Alerts are sent as an email or Slack message and can be sent to multiple users.
**To create an alert follow these steps:**

1. **Save your report**, click the 3 dots icon, go to Alerts, and select Create Alert.
Note: You won't be able to create alerts if the report has unsaved changes. Save your report before setting up the alert.

![](/246672717-c15123a9-d73e-4c7f-84b9-3891731fc708.png)

3. **Enter a name** for your alert.
4. If your report has more than one event, select an event to track. If your report has a breakdown applied, either select a segment to alert on, or select any segment to be alerted when any segment matches the alert criteria.
5. **Set your alert criteria.** Depending on the report you’re working from, choose between anomaly detection or custom alert types. More details on each criteria type can be found below.
6. **Set your notification frequency.** Depending on your alert criteria, you can choose a notification frequency spanning from an hour to at most a month. This frequency informs how often *at most* you’ll receive an alert.
     <br> *Note:*
    - *for time-series reports, alert query frequency (how often we check if your data matches your alert condition) is determined by the time bucket of your report visualization. For instance, if you’re chart is hourly, the alert will be checked for at an hourly interval.*
    - *if you have an hourly chart, but set the alert frequency to daily, we’ll check your report for an alert condition match every hour. If we find a match, we’ll send you the alert message and will stop checking your report for a match until the next day.*
7. **Set your notification delivery preferences.** When alert conditions are met, we can send notification via email or Slack.
    - For email, enter the recipient emails that you would like to receive this alert. You can enter any email here, not just internal users.
    - For Slack, select any Slack channels you want to send this alert to. *Note: private Slack channels are not available at this time.*

    **IMPORTANT:** In order to send alerts to Slack, you may need to configure the Mixpanel Slack app if you haven’t before. Click "Add Mixpanel to Slack" and follow the prompts on the following screens. You will be brought back to this page when you have added Mixpanel to Slack.

![](/255713687-91a2bb99-3a79-43d4-9d97-3b397aab0305.png)


## View & Manage Custom Alerts

You can view and manage all alerts under your personal settings.

1. Click on **the gear icon** in the top right of Mixpanel and under "Organization Settings" **select "Personal Settings".
2. Within your personal settings, select the **Alerts** tab to view your custom alerts and automatic insights.

    **to delete:** If you hover over an alert you have created, you can see a **trash icon** which you can click to delete the alert.
    **to modify:** Click on the title of the alert to edit details.

![image](https://github.com/mixpanel/docs/assets/130006730/be35a381-b090-4fd4-86e0-7281dd291d64)

You can view the details of another user’s alert, but you are not able to edit or delete it unless you're a project owner.

***IMPORTANT: If you need to modify alerts you didn't create, contact the project owner.***

## Alert Criteria Types

### Anomaly Detection

Anomaly Detection alerts automatically monitor your metrics and notify you when significant anomalies occur. With advanced forecasting algorithms, Mixpanel calculates thresholds based on the expected range of your metrics. If a data point falls outside of the calculated confidence interval, you'll receive an alert, allowing you to address the issue promptly. No manual threshold configuration is required, making it an effortless way to stay informed about potential problems.

**Before you begin, there are some important details to note about Anomaly Detection Alerts:**

- While custom alerts are available on any insights or funnel report, at the moment, anomaly detection alerts are only available on insights reports using a time series visualization.
- Anomaly detection is only supported on line charts without comparisons, rolling ranges, cumulative types, or cohorts over time. To access all alerting options, change the report chart type to a line chart and remove unsupported options.
- Currently, anomaly detection alerts with hourly notification settings may result in more false positives due to a reduction in forecast accuracy.

**To set up anomaly detection alerts in a report, follow these steps:**

1. Click the **3 dots icon**, go to **Alerts** and select **Create Alert**
2. In the alert creation modal, select **Anomaly Detection** as the alert type.
    *Note: If Anomaly Detection is not available, it means it is not supported for your report or chart type. Please refer to the "Before you begin" section of this help doc for more information.*

3. Optionally, adjust the settings to tune the sensitivity of your alert. Higher confidence intervals typically result in a wider expected range and thus fewer alerts triggered. Use the alert preview to fine-tune the settings based on the context and confidence required.
4. Configure the alert delivery settings and save.

### Additional information

**Forecasting Tool**

The Anomaly Detection feature in Mixpanel utilizes a powerful and proven open-source forecasting tool called [Prophet](https://facebook.github.io/prophet/). Prophet is designed to forecast time series data and is able to effectively identify missing data points, trend shifts, and large outliers.

**Confidence Interval**

The confidence interval reflects our level of confidence that the anomalous data point represents an unexpected change. Generally, higher confidence levels result in fewer anomalies detected.

**Anomaly Detection Limit**

Currently, each organization has a limit of 50 active Anomaly Detection Alerts. If you reach the limit, delete old alerts to create space for new ones.

By setting up Anomaly Detection Alerts in Mixpanel, you can gain valuable insights into unusual patterns in your metrics and take proactive actions based on detected anomalies. Stay ahead of potential issues and leverage data-driven decision-making with Anomaly Detection Alerts.

## Custom Alerts

### Setting a custom alert for insights reports

Custom Alerts in Insights alert you when a specified event is performed above or below a specified number.

**To set up Custom Alerts in a report, follow these steps:**

1. Click the **3 dots icon**, go to **Alerts** and select **Create Alert**
2. In the alert creation modal, select **Custom Threshold** as the alert type and configure the conditions.
    - **Above:** The alert will check if the current value is above a set threshold value and if it is, you will be sent an alert.
    - **Below:** The alert will check if the current value is below a set threshold value and if it is, you will be sent an alert.

![](/255714383-649e70d8-eb8b-492d-b5c5-9ca2461615a6.png)


In line chart reports, you can select relative thresholds.

- **Increases by more than:** The alert will compare the current value with the previous value (frequency set by report time-series setting). If the new value has increased by the custom amount or percentage over the previous value, you will be sent an alert.
- **Decreases by more than:** This alert will compare the current value with the previous value (frequency set by report time-series setting). If the new value has decreased by the custom amount or percentage below the previous value, you will be sent an alert.

![](/255714489-2a4921bb-0fd7-44f9-a6ba-5a88ee14358a.png)

3. Choose the frequency that you would like to receive these alerts, either hourly, daily, or weekly.
4. Configure the alert delivery settings and save.

### Setting a custom alert for Funnel reports

Custom Alerts in Funnels track the overall conversion rate.

1. In the alert creation modal, select **Custom Threshold** as the alert type select whether you would like to track when the conversion rate is **above** or **below** a percentage you set.

    *Note: at the moment, anomaly detection alerts are not supported in Funnels*

2. Choose the frequency that you would like to receive these alerts, either hourly, daily, or weekly.
3. Configure the alert delivery settings and save.

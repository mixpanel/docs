---
title: "Alerts"
slug: "alerts"
hidden: false
metadata:
  title: "Alerts"
  description: "Learn how to use alerts in Mixpanel."
---

## Overview

Create a Custom Alert for your [Insights](/analysis/reports/insights) and [Funnels](/analysis/reports/funnels) reports to decide which report conditions result in an alert. Alerts are sent as an email and can be sent to multiple users.

To create a custom alert in an Insights or Funnels report, **save your report**, click the **3 dots icon**, go to Alerts and select **Create Alert**.

***Important: You won't be able to create alerts if the report hasn't been saved previously.***

![/mceclip0.png](/mceclip0.png)

## Custom Alerts in Insights

Custom alerts in Insights alert you when a specified event is performed above or below a specified number.

Enter a name for your alert and select an event to track. Select **above** or **below** and the value you want as the threshold.

- **Above:** The alert will check yesterday’s full day of data compared to today’s data, checking every hour. For example, at 5 pm the alert will check 12 am - 5 pm, and if the current value is above the previous value, an alert will be sent and the data won’t be checked again for another 24 hours.
- **Below:** The alert will compare the previous day’s value with the day before. If the new value is below the previous value, you will be sent an alert and the data won't be checked again for another 24 hours. If the value is above the previous value, you won't receive an alert.

Choose the frequency that you would like to receive these alerts, either hourly, daily, or weekly.

Enter the recipient emails that you would like to receive this alert. You can enter any email here, not just internal users. Select any Slack channels you want to send this alert to. Private Slack Channels are not available at this time.

![/14210649496084](/14210649496084.png)

Click **Create alert** to save the custom alert.

**IMPORTANT:** You may need to add Mixpanel to Slack, if you have not done this before. Click "Add Mixpanel to Slack" and follow the prompts on the following screens. You will be brought back to this page when you have added Mixpanel to Slack.

![/14251383457684](/14251383457684.png)

### Line Charts

In line chart reports, you can select relative thresholds.

You can choose a **specific threshold** (this is the same as other chart types) or a **relative threshold as compared to the previous time period**. Then, enter the value or percentage.

![/14210683576980](/14210683576980.png)

## Custom Alerts in Funnels

Custom alerts in Funnels track the overall conversion rate.

Enter a name for your alert and select whether you would like to track when the conversion rate is **above** or **below** a percentage you set.

Choose the frequency that you would like to receive these alerts, either hourly, daily, or weekly.

Enter the recipient emails that you would like to receive this alert. You can enter any email here, not just internal users. Select any Slack channels you want to send this alert to. Private Slack Channels are not available at this time.

![/14210810107924](/14210810107924.png)

Click **Create alert** to save the custom alert.

**IMPORTANT:** You may need to add Mixpanel to Slack, if you have not done this before. Click "Add Mixpanel to Slack" and follow the prompts on the following screens. You will be brought back to this page when you have added Mixpanel to Slack.

![/14251559987092](/14251559987092.png)

## View & Manage Custom Alerts

Custom alerts do not appear under the alert bell on your reports like automated alerts do. You can view and manage all alerts under your personal settings.

Click on **the gear icon** in the top right of Mixpanel and under "Organization Settings" **select "Personal Settings".

![/mceclip5.png](/mceclip5.png)

Within your personal settings, select the **Alerts** tab to view your custom alerts and automatic insights.

![/mceclip6.png](/mceclip6.png)

If you hover over an alert you have created, you can see a **trash icon** which you can click to delete the alert. Click on the **title** of the alert to edit details.

![/mceclip7.png](/mceclip7.png)

You can view the details of another user’s alert, but you are not able to edit or delete it unless you're a project owner.

***IMPORTANT: If you need to modify alerts you didn't create, contact the project owner.***

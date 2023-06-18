## Overview

You can create Custom Alerts to keep yourself and your team up to date on dips and spikes in a metric, via Slack or email.

To create a custom alert, **save your report**, click the **3 dots icon**, go to Alerts and select **Create Alert**. Note: You won't be able to create alerts for unsaved reports.

![image](https://github.com/mixpanel/docs/assets/2077899/c15123a9-d73e-4c7f-84b9-3891731fc708)

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

![image](https://github.com/mixpanel/docs/assets/2077899/b24719be-13ba-4a58-9e8a-0c447519d2c2)

Within your personal settings, select the **Alerts** tab to view your custom alerts and automatic insights.

![image](https://github.com/mixpanel/docs/assets/2077899/a32763df-dd9e-46e4-a845-9bf7105a31cd)

If you hover over an alert you have created, you can see a **trash icon** which you can click to delete the alert. Click on the **title** of the alert to edit details.

![image](https://github.com/mixpanel/docs/assets/2077899/a41766d8-19b9-4511-83c0-06ced06b1a52)

You can view the details of another user’s alert, but you are not able to edit or delete it unless you're a project owner.

***IMPORTANT: If you need to modify alerts you didn't create, contact the project owner.***

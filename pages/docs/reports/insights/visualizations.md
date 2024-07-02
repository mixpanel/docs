# Visualizations

## Overview

Insights feature multiple visualizations to help you view the query results in the clearest chart type.

## Chart Types

By default, Insights displays the results on the line chart, which visualize how metrics trend over time. However, another chart type might present the results with more clarity. In Insights, you can choose visualizations that aggregate your metric across an entire date range or per time interval (e.g. hour, day, week, etc.).

These visualizations aggregate your metric across the entire date range:
    - Bar chart
    - Stacked Bar chart
    - Pie chart
    - Metric chart
    - Table chart

These visualizations aggregate your metric per each selected time interval:
    - Line chart
    - Stacked line chart
    - Column chart
    - Stacked Column chart

## Sorting

### Bar chart

When you view a bar chart, you have four different sorting options: A-Z Ascending, Z-A Descending, Value Ascending, or Value Descending. To switch the sorting view, select the **Events** or **property name** column header in the upper left hand of the results and then select which sorting order you would like to see.

![Sorting Bar Chart](/sorting-bar-chart.png)

### Line chart

Line charts in Insights are accompanied by a table of values that gives users another way to consume the trends information. This data table can also be sorted by clicking the column headers.

Click on a column header to sort by that column. Click the header again to reverse the sorting order. For example, the table below is sorted by event counts on August 2nd:

![Sorting Line Chart](/sorting-line-chart-1.png)

Results that are segmented (from one or more "group by" clauses in your query) have four different sorting options when you click on the "segment column" headers:

- Segment A-Z Ascending: sort by segment name in ascending order
- Segment Z-A Descending: sort by segment name in descending order
- Value Ascending: sort by segment value in ascending order
- Value Descending. sort by segment value in descending order

When sorting by segments, the sort is carried out from left to right.

![Sorting Line Chart](/sorting-line-chart-2.gif)

Clicking on the "Average" data column performs a flat sort across all segments:

![Sorting Line Chart](/sorting-line-chart-3.png)

### Table chart
Tables are useful to see the precise values of your data and to quickly scan multiple metrics per segment. In general, tables work similarly to the rest of Insights, with a few extra features.

#### Sort Order
You can configure how you want rows in the table to be sorted, with our global sorting control.
![Sorting.gif](https://github.com/mixpanel/docs/assets/2077899/a61948a6-3e4a-4e5d-9b75-3f4b14cb1450)

##### Grouped View vs Ungrouped View
The Ungrouped View removes all hierarchy and makes the table flat. Each combination of segment values is treated as a row, independently of the other rows.

![image](https://github.com/mixpanel/docs/assets/2077899/e57400a1-a86c-4d46-9ffb-379306586d8d)

The Grouped View preserves the hierarchy of breakdowns. It shows you segments within a breakdown as displayed below. This view is only applicable when you have 2 or more breakdowns

![image](https://github.com/mixpanel/docs/assets/2077899/2a72e93c-c332-4418-83e1-91bb24e2d271)

##### Alphabetical vs Value-Based Sorting
You can sort segments alphabetically or by the value of a particular metric. In the grouped view, sorting is configured on a per-breakdown level and respects the breakdown hierarchy.

In the below image, we sort Country *within* Item Category, which respects the hierarchy.
![image](https://github.com/mixpanel/docs/assets/2077899/4697ce00-d394-46ce-b538-66ec91ccd6e7)

Hierarchy is defined by the breakdown order in the query panel:
![image](https://github.com/mixpanel/docs/assets/2077899/ff2f72b3-89bc-459e-b8b7-e81655d04bb7)

##### View “N” segments

The View “N” control lets you decide how many rows to display per breakdown in your table.
![View_N_gif](https://github.com/mixpanel/docs/assets/2077899/4fb0fd18-2ef7-416b-adaa-c7299da0f7b3)

In the ungrouped view, choose the number of rows to display:
![image](https://github.com/mixpanel/docs/assets/2077899/b1b25b19-51be-4934-bbfd-7562e0f98d4a)

In the grouped view, you can choose the number of rows you want to display for each breakdown:
![image](https://github.com/mixpanel/docs/assets/2077899/f9f8c83c-34ed-44bd-b4e7-f60b70255a6f)

![image](https://github.com/mixpanel/docs/assets/2077899/b09c1ad1-1392-4ec0-9358-361f677c600d)

**Notes**
- View N only controls how many segments to display. To decide which segments to display i.e if it’s the top segments by value or bottom segments by value or alphabetical, please change the “Sort Order”.
- View N will show the minimum of N and how many segments are in your report. For example, if you set N=10 but you only have 7 segments, we will only show 7 rows.
- When selecting “Show All”, the maximum number of segments displayed in the UI will be 3000 given cardinality limits. If your breakdown has more than 3000 segments, you'll only see the top 3000, dictated by the sort order.

##### Overall and Segment Sub-Totals

**Overall:** This refers to the value considering all the segments, independent of whether displayed or not based on your View N control; i.e changes to View N will not affect Overall numbers
![image](https://github.com/mixpanel/docs/assets/2077899/3d6556a4-9468-4d1f-8979-4fdb512f2aaa)

**Sub-Totals:** In the grouped view, in addition to the Overall, segment sub-totals are also displayed. Similar to “Overall”, these values are independent of the View N control

![image](https://github.com/mixpanel/docs/assets/2077899/ee7d8c9b-f738-4a5b-8967-300cf8322f76)

### Visualization Settings (Chart Visualization content would go here)

The visualization options allow you to choose how the data is visualized. The options are:

- **Linear:** This is the standard view for the chart.
- **Logarithmic:** A nonlinear scale based on orders of magnitude, rather than a standard linear scale, so the value represented by each equidistant mark on the scale is the value at the previous mark multiplied by a constant.

### Annotations

To clarify the results in your Insights report, add detailed annotations directly to the line chart. Annotations are tied to a specific date on the chart, rather than a specific data point on the chart.

To add an annotation, hover your mouse over the point on the chart you want to annotate, and click the blue **+** button that appears. Enter a description for the annotation, such as a holiday that occurred on that day or the end date of your fiscal year, then click **Save**. If you accidentally selected the incorrect date on the chart, you can edit the date and time of the annotation in this window.

![Annotations 1](/advanced-annotations-1.png)

View an existing annotation by clicking on the number found at the bottom of a report. You will be able to see who submitted the annotation.

![Annotations 2](/advanced-annotations-2.png)

Hover the cursor over the annotation to edit or delete it. Click on the **pencil icon** to edit an annotation, or the **trash icon** to delete an annotation. Add additional annotations to the same date by clicking **Add annotation**.

![Annotations 3](/advanced-annotations-3.png)

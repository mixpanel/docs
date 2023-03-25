---
title: "Insights"
slug: "insights"
hidden: false
metadata: 
  title: "Insights"
  description: "Learn how to use the Insights report."
---

# Insights

<h2>Overview</h2>
<p>
  <img src="/hc/article_attachments/4413126687252/mceclip8.png" alt="mceclip8.png">
</p>
<p>
  Insights is a powerful and flexible tool designed to visualize trends and compositions
  within your data. You can analyze events, cohorts, and user profiles, and display
  the data in a wide variety of chart types.
</p>
<p>
  Advanced Insights features also allow you to create formulas, compare current
  data to past data, and generate custom events and properties for deeper analysis.
</p>
<h2>Sample Questions you can Answer in Insights</h2>
<p>
  Imagine your product is a B2B messaging application. You might use Insights to
  answer these sample questions:
</p>
<ul>
  <li>
    How many messages were sent in the US in the past 30 days? (total events,
    filtered)
  </li>
  <li>
    How many users had a mobile app session yesterday? (unique events)
  </li>
  <li>How many messages are sent per session? (formulas)</li>
  <li>
    Which advertising campaigns generate the most signups? (property breakdown)
  </li>
  <li>
    How much revenue was generated on plans purchased in the past year? (property
    aggregation)
  </li>
  <li>
    How has the power users cohort grown over the past 6 months? (cohort trends)
  </li>
</ul>
<h2>Building your First Report</h2>
<p>
  Building a report in Insights takes just a few clicks, and results arrive in
  seconds. Let's build a simple report together. Continuing the B2B messaging example,
  imagine you wanted to answer the following question:
</p>
<blockquote>
  <p>
    Which cities in the United States have the most users who sent messages via
    the iOS platform?
  </p>
</blockquote>
<p>
  Feel free to follow along and create your own report right in our demo project,
  <a href="https://mixpanel.com/register/?next=%2Fproject%2F2195193%2Fview%2F139237%2Fapp%2Finsights" target="_self" rel="undefined">here</a>.
  To skip ahead and see the final result, click
  <a href="https://mixpanel.com/register/?next=/project/2195193/view/139237/app/insights#~(columnWidths~(bar~())~displayOptions~(chartType~'bar~plotStyle~'standard~analysis~'linear~value~'absolute)~sorting~(bar~(sortBy~'column~colSortAttrs~(~(sortBy~'value~sortOrder~'desc)))~line~(sortBy~'value~sortOrder~'desc~valueField~'averageValue~colSortAttrs~(~))~table~(sortBy~'column~colSortAttrs~(~(sortBy~'label~sortOrder~'asc)))~insights-metric~(sortBy~'value~sortOrder~'desc~valueField~'totalValue~colSortAttrs~(~))~pie~(sortBy~'value~sortOrder~'desc~valueField~'totalValue~colSortAttrs~(~)))~timeComparison~null~querySamplingEnabled~false~title~'~sections~(show~(~(dataset~'!mixpanel~value~(name~'Send*20Message~resourceType~'events)~resourceType~'events~profileType~null~search~'~dataGroupId~null~math~'total~perUserAggregation~null~property~null))~group~(~(dataset~'!mixpanel~value~'!city~resourceType~'events~profileType~null~search~'~dataGroupId~null~propertyType~'string~typeCast~null~unit~null))~filter~(clauses~(~(dataset~'!mixpanel~value~'platform~resourceType~'events~profileType~null~search~'~dataGroupId~null~filterType~'string~defaultType~'string~filterOperator~'equals~filterValue~(~'iOS*20Native)~propertyObjectKey~null))~determiner~'all)~time~(~(value~30~unit~'day)))~legend~())" target="_self" rel="undefined">here</a>.
</p>
<h3>Step 1: Choose Events</h3>
<p>
  Events, cohorts, or profiles can be the basic building block of an Insights report.
  In this case, we want to know about users who sent messages, so within the "Events
  and Cohorts" section, add the "Send Message" event. At this point, your query
  should look like this:
</p>
<p>
  <img src="/hc/article_attachments/4413139192084/mceclip4.png" alt="mceclip4.png">
</p>
<h3>Step 2: Choose Count Type</h3>
<p>
  Next to your selected event, you can choose how to count that event. By default,
  Insights will count Total events, which, as the name implies, will count every
  occurrence of the event. In this case, we want to know how many users sent messages,
  so choose "Unique." Unique counts one event per user. At this point, your query
  should look like this:
</p>
<p>
  <img src="/hc/article_attachments/4413131169428/mceclip5.gif" alt="mceclip5.gif">
</p>
<p>&nbsp;</p>
<h3>Step 3: Choose Filters</h3>
<p>
  Filters exclude unwanted data. In this case, we only care about events performed
  on the iOS platform. Therefore, add a "Platform" filter, where Platform equals
  "iOS Native". At this point, your query should look like this:
</p>
<p>
  <img src="/hc/article_attachments/4413126649492/mceclip6.gif" alt="mceclip6.gif">
</p>
<h3>Step 4: Choose Breakdowns</h3>
<p>
  Breakdowns segment data into groups. In this case, we want to count message sending
  users in different cities. Therefore, add a "City" breakdown. At this point,
  your query should look like this:
</p>
<p>
  <img src="/hc/article_attachments/4413126669588/mceclip7.gif" alt="mceclip7.gif">
</p>
<p>
  Congratulations, you've constructed your first Insights query! Now, it's time
  to examine the results.
</p>
<h2>Visualizing Results</h2>
<p>
  Insights features multiple visualizations to help you view the results of your
  query in the clearest chart type. By default, Insights displays line charts,
  which help you understand how metrics trend over time. However, another chart
  type might present the results with more clarity.<br>
  <br>
  <span style="font-weight: 400;">In Insights, you can either choose to get a metric calculated across the entire time period selected in the date picker, or get a time-segmented view of the metric (e.g. daily breakdown).&nbsp;</span>
</p>
<ul>
  <li>
    <span style="font-weight: 400;">Metric calculated across the entire time period</span>
    <ul>
      <li>
        <span style="font-weight: 400;">Bar chart<img src="/hc/article_attachments/7787500385044/mceclip0.png" alt="mceclip0.png"></span>
      </li>
    </ul>
  </li>
</ul>
<ul>
  <li style="list-style-type: none;">
    <ul>
      <li>
        <span style="font-weight: 400;">Stacked bar chart<img src="/hc/article_attachments/7787500394900/mceclip1.png" alt="mceclip1.png"></span><span style="font-weight: 400;"></span>
      </li>
    </ul>
  </li>
</ul>
<ul>
  <li style="list-style-type: none;">
    <ul>
      <li>
        <span style="font-weight: 400;">Pie chart<img src="/hc/article_attachments/7787500560660/mceclip2.png" alt="mceclip2.png"></span>
      </li>
    </ul>
  </li>
</ul>
<ul>
  <li>
    <span style="font-weight: 400;">Metric time-segmented</span>
    <ul>
      <li>
        <span style="font-weight: 400;">Line chart<img src="/hc/article_attachments/7787493152276/mceclip4.png" alt="mceclip4.png"></span>
      </li>
    </ul>
  </li>
</ul>
<ul>
  <li style="list-style-type: none;">
    <ul>
      <li>
        <span style="font-weight: 400;">Stacked line chart<img src="/hc/article_attachments/7787493279252/mceclip5.png" alt="mceclip5.png"></span>
      </li>
    </ul>
  </li>
</ul>
<p>
  <span style="font-weight: 400;">You can easily resize the columns in the bar chart in order to see more or remove detail.</span>
</p>
<p>
  <img src="/hc/article_attachments/7787500943380/mceclip6.gif" alt="mceclip6.gif">
</p>
<p>
  <span style="font-weight: 400;">When breaking down results, click on a bar in the chart to either filter or exclude that property value. Filter zooms in on that property value, filtering the entire report to that property value. Exclude filters out that property value from the results.</span>
</p>
<p>
  <img src="/hc/article_attachments/7787493491348/mceclip7.png" alt="mceclip7.png">
</p>
<h2>
  <span style="font-weight: 400;">Analysis &amp; Value Settings</span>
</h2>
<p>
  <span style="font-weight: 400;">You can switch between Absolute and Relative totals by selecting the <strong>#</strong> dropdown in the top right of the chart and selecting either <strong># Absolute</strong> or&nbsp; <strong>% Relative</strong>.</span>
</p>
<div class="callout callout--info">
  <h4 class="callout__title">Note</h4>
  <p>
    You can only select Absolute or Relative values for the&nbsp;Table, Stacked
    Line, Stacked Bar, and Bar charts.
  </p>
</div>
<p>
  <img src="/hc/article_attachments/7787493636500/mceclip8.png" alt="mceclip8.png">
</p>
<p>
  <span style="font-weight: 400;">The Absolute view will show you, in numbers, your totals for different event counts. Relative view will display these counts as a percentage of the whole.</span><span style="font-weight: 400;"></span>
</p>
<p>
  <span style="font-weight: 400;">The Analysis options will determine the way the chart is calculated and visualized. The options are:</span>
</p>
<ul>
  <li>
    <strong>Linear:</strong><span style="font-weight: 400;"> This is the standard view for the chart.</span>
  </li>
  <li>
    <strong style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">Rolling: </strong><span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">Rolling analysis calculates the rolling average of the data set. A rolling average curve is a series of averages from subsets of data. Use rolling average analysis to remove noise or spikes from data and smooth out trends over time. Mixpanel calculates the rolling average based on the selected time interval (hour, day, week, month or quarter) for each data point in the graph.<br></span>
    <table style="height: 187px;" width="602">
      <tbody>
        <tr>
          <td style="width: 295px;">
            <p>
              <strong>Time Interval</strong>
            </p>
          </td>
          <td style="width: 300px;">
            <p>
              <strong>Default Rolling Time Range</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td class="wysiwyg-text-align-left" style="width: 295px;">Hour</td>
          <td class="wysiwyg-text-align-left" style="width: 300px;">Last 12 hours</td>
        </tr>
        <tr>
          <td class="wysiwyg-text-align-left" style="width: 295px;">Day</td>
          <td class="wysiwyg-text-align-left" style="width: 300px;">Last 7 days</td>
        </tr>
        <tr>
          <td class="wysiwyg-text-align-left" style="width: 295px;">Week</td>
          <td class="wysiwyg-text-align-left" style="width: 300px;">Last 5 weeks</td>
        </tr>
        <tr>
          <td class="wysiwyg-text-align-left" style="width: 295px;">Month</td>
          <td class="wysiwyg-text-align-left" style="width: 300px;">Last 3 months</td>
        </tr>
        <tr>
          <td class="wysiwyg-text-align-left" style="width: 295px;">Quarter</td>
          <td class="wysiwyg-text-align-left" style="width: 300px;">Last 2 quarters</td>
        </tr>
      </tbody>
    </table>
    For example, if you make a rolling analysis query for the past 30 days, Mixpanel
    calculates the rolling 7-day average by default. The value reported at each
    day in the line graph is the average of the values from the 7 days leading
    to that day. In the case of the first 6 days in your selected time period,
    the 7-day-average calculation will include days before the selected time
    period.
  </li>
  <li>
    <strong>Logarithmic:</strong><span style="font-weight: 400;"> A nonlinear scale based on orders of magnitude, rather than a standard linear scale, so the value represented by each equidistant mark on the scale is the value at the previous mark multiplied by a constant.</span>
  </li>
  <li>
    <span style="font-weight: 400;"><strong>Cumulative:</strong> Adds up the values of each point on the graph as it goes along, so the height of the line will increase over time.</span>
  </li>
</ul>
<h2>
  <span style="font-weight: 400;">Sorting</span>
</h2>
<h4>
  <span style="font-weight: 400;">Bar chart</span>
</h4>
<p>
  <span style="font-weight: 400;">When you are viewing a bar chart, you have four different sorting options: A-Z Ascending, Z-A Descending, Value Ascending, or Value Descending. To switch sorting views, select the <strong>Events</strong> icon in the upper left hand of the report and select which view you would like to see.</span>
</p>
<p>
  <img src="/hc/article_attachments/7787501113876/mceclip9.png" alt="mceclip9.png">
</p>
<h4>Line chart</h4>
<p>
  Line charts in Insights are accompanied with a table of values to give users
  another way to consume the trends information. This data table can also be sorted
  by clicking column headers.
</p>
<p>
  Click on a "data column" header to sort by that column. Click the header again
  to reverse the sort order. The table below is sorted by event counts on August
  2nd:
</p>
<p>
  <img src="/hc/article_attachments/7787495449876/mceclip0.png" alt="mceclip0.png">
</p>
<p>
  Results that are segmented (from one or more “group by” clauses in your query)
  have four different sorting options when you click on the "segment column" headers:
</p>
<ul>
  <li>
    Segment Ascending: sort by segment name in ascending order.&nbsp;
  </li>
  <li>
    Segment Descending: sort by segment name in descending order.&nbsp;
  </li>
  <li>
    Value Ascending: sort by segment value in ascending order.&nbsp;
  </li>
  <li>
    Value Descending. sort by segment value in descending order.
  </li>
</ul>
<p>
  When sorting by segments, the sort is carried out left to right.
</p>
<p>
  <img src="/hc/article_attachments/7787556680468/Seg_table_sorting.gif" alt="Seg_table_sorting.gif">
</p>
<p>
  Clicking on the "Average" data column performs a flat sort across all segments:
</p>
<p>
  <img src="/hc/article_attachments/7787550370324/mceclip1.png" alt="mceclip1.png">
</p>
<h2>Use Cases for Insights Reports</h2>
<p>
  Here's a video that shows a set of use-cases with Mixpanel's Insights report:
</p>
<p>
  <iframe src="//www.loom.com/embed/82a392661df84192b67aac0eae9d4215" width="560" height="315" frameborder="0" allowfullscreen=""></iframe>
</p>
<p>
  <span style="font-weight: 400;">Here's another common use-case: Jenny is a Marketing Manager for an online shoes marketplace. and she wants to know which utm source is getting the maximum number of purchases to the platform.&nbsp;</span>
</p>
<p>
  <span style="font-weight: 400;">In Insights, Jenny looks at purchase activity by selecting the "Complete Purchase" event and analyzing the activity over the last 1 month. Mixpanel returns an aggregate number of the total times the event was performed, but Jenny wants to dig deeper. </span>
</p>
<p>
  <span style="font-weight: 400;">She elects to break down the data by the event property "UTM_source", which categorizes the results into the different UTM_source values of the "Complete Purchase" event.&nbsp;</span>
</p>
<p>
  <img src="/hc/article_attachments/7787554482580/mceclip0.png" alt="mceclip0.png">
</p>
<p>
  <span style="font-weight: 400;">Based on the data from the last 30 days, the Insights report shows that LinkedIn is the highest source of paid conversions.</span><span style="font-weight: 400;"></span>
</p>
<h2>
  <span style="font-weight: 400;">Frequency analysis</span>
</h2>
<p>
  <span style="font-weight: 400;">It's important to know what's the natural frequency at which your users use your product / experience the core value proposition of your product - do majority of your users use your product daily? weekly ? monthly? A16Z wrote a great article about the <a href="https://www.reforge.com/brief/understand-your-most-engaged-users-with-the-power-user-curve#bOb9wjj_l0R3Pqo32pggUQ" target="_self">Power User Curve</a>, and this video below shows how you can reproduce that within Mixpanel:</span>
</p>
<p>
  <span style="font-weight: 400;">
    <iframe src="//www.loom.com/embed/0c05ac17742a4d49a4c6879c0fe9f0de" width="560" height="315" frameborder="0" allowfullscreen=""></iframe>
  </span>
  <span style="font-weight: 400;"></span>
</p>
<p>
  <span>Other use-cases:</span>
</p>
<ul>
  <li>
    <a href="https://mixpanel.com/blog/growth-through-segmentation-lifecycle-analysis-to-understand-your-users/" target="_self"><span>Lifecycle analysis</span></a>
  </li>
</ul>
<h2>Further Learning</h2>
<p>
  While this article covers the basics of the Insights report, you can learn more
  about its capabilities in the following additional articles:
</p>
<ul>
  <li>
    <a href="/hc/en-us/articles/7713028610964" target="_self" rel="undefined">Advanced Insights Functionality</a>
    - learn about the report's more advanced capabilities and modes
  </li>
</ul>

<p>
  <span style="font-weight: 400;">Mixpanel's Insights report allows you to analyze your user data as a current snapshot or as a trend over time. This article covers advanced functionality available in the Insights report that lets you drill <span>in more deeply on your data, or ask a more precise question.</span></span>
</p>
<p>
  <span style="font-weight: 400;">For more of an overview of Insights, click <a href="/hc/en-us/articles/360001333826" target="_self">here</a>.</span><span style="font-weight: 400;"></span>
</p>
<p>
  <span style="font-weight: 400;">Choose to explore either <strong>Events &amp; Cohorts</strong> or <strong>Profiles</strong>. Events &amp; Cohorts allows you to examine user behaviors, while Profiles allows you access profile data and visualize your users with filters and breakdowns based on their profile properties. </span><span style="font-weight: 400;">When exploring Profiles, you are always analyzing all user profiles.&nbsp;</span>
</p>
<p>
  <img src="/hc/article_attachments/7771259735700/mceclip0.png" alt="mceclip0.png">
</p>
<h2>
  <span style="font-weight: 400;">Time Period Comparisons</span>
</h2>
<p>
  <span style="font-weight: 400;">Compare the current period of time to previous periods of time in order to track trends and growth in your product’s use. Compare traffic from a specific campaign period or event from one year to the next, or compare the success of that campaignto your normal traffic.</span>
</p>
<p>
  <span style="font-weight: 400;">Note that i</span>f a data point for a previous
  year falls on a weekend, the data point is automatically moved to the next Monday
  to give a more clear picture of the data change from one year to the next.
</p>
<p>
  <span style="font-weight: 400;">Click on the <strong>Compare to past</strong> button at the top of your Insights graph and select the time period you wish to compare to. You can also select a custom date range.</span>
</p>
<p>
  <img src="/hc/article_attachments/7771414189972/mceclip10.gif" alt="mceclip10.gif">
</p>
<h2>
  <span style="font-weight: 400;">Bucketing</span>
</h2>
<p>
  <span style="font-weight: 400;">Insights will automatically group your high-cardinality segments into ranges. Ranges can be edited by using the "Customize Range" option in the overflow menu:</span>
</p>
<p>
  <img src="/hc/article_attachments/7771414076948/mceclip11.gif" alt="mceclip11.gif">
</p>
<p>
  <span style="font-weight: 400;">If you want custom buckets that are non-uniform, you can create <a href="/hc/en-us/articles/360030848432" target="_self">custom properties</a> to manipulate these buckets.</span>
</p>
<h2>
  <span style="font-weight: 400;">Annotations</span>
</h2>
<p>
  <span style="font-weight: 400;">In order to clarify the results in your Insights report add detailed annotations directly to the line chart. Annotations are tied to a specific date on the chart, rather than a specific data point on the chart.</span><span style="font-weight: 400;"></span>
</p>
<p>
  <span style="font-weight: 400;">Only project admins can create, save, and delete annotations.</span><span style="font-weight: 400;"></span>
</p>
<p>
  <span style="font-weight: 400;">To add an annotation, hover your mouse over the point on the chart you want to annotate, and click the blue </span><strong>+</strong><span style="font-weight: 400;"> button that appears.</span><span style="font-weight: 400;">Enter a description for the annotation, such as a holiday that occurred on that day or the end date of your fiscal year, then click <strong>Save</strong>. If you accidentally selected the incorrect date on the chart, you can edit the date and time of the annotation in this window.</span>
</p>
<p>
  <img src="/hc/article_attachments/7771423819668/mceclip6.png" alt="mceclip6.png">
</p>
<p>
  <span style="font-weight: 400;">View an existing annotation by clicking on the number&nbsp;found at the bottom of a report. You will be able to see who submitted the annotation.</span>
</p>
<p>
  <img src="/hc/article_attachments/7771423819924/mceclip7.png" alt="mceclip7.png">
</p>
<p>
  <span style="font-weight: 400;">Hover the cursor over the annotation to edit or delete it. Click on the <strong>pencil icon</strong> to edit an annotation, or the<strong> trash icon</strong> to delete an annotation. Add additional annotations to the same date by clicking <strong>Add annotation</strong>.</span>
</p>
<p>
  <img src="/hc/article_attachments/7771423896084/mceclip8.png" alt="mceclip8.png">
</p>
<h2>Insights Data Functions, Operators and Calculations</h2>
<p>
  <span style="font-weight: 400;">Data Functions in Mixpanel reports allow you to perform more complex calculations on your queries - this includes computing aggregate values of your event and property data, including totals, uniques, and averages.</span>
</p>
<p>
  <span style="font-weight: 400;">
    <span>
      <iframe src="//www.loom.com/embed/82a392661df84192b67aac0eae9d4215" width="560" height="315" frameborder="0" allowfullscreen=""></iframe>
    </span>
    <br>
    <br>
    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">The following data functions are only available in Insights, and are separated into groups based on what is being calculated: Total, Unique, Count users, aggregate property values, aggregate property values per user, and count sessions.</span><br>
    <br>
  </span>
</p>
<div class="callout callout--info">
  <p>
    <span style="font-weight: 400;"> Select the Data Function you want to use to calculate results by clicking on </span><strong style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">Total</strong><span style="font-weight: 400;"> and selecting an option from the drop-down. You can calculate based on events, users, event property value, event property value per user, and sessions.<br></span>
  </p>
  <p>
    <img src="/hc/article_attachments/7771317490452/mceclip4.png" alt="mceclip4.png">
  </p>
</div>
<p>
  <span style="font-weight: 400;">The following functions have additional aggregation options which you will be prompted to select:</span>
</p>
<table style="border-collapse: collapse; width: 100%;" border="1">
  <tbody>
    <tr>
      <td style="width: 50%;">
        <strong>Function</strong>
      </td>
      <td style="width: 50%;">
        <strong>Aggregation options</strong>
      </td>
    </tr>
    <tr>
      <td style="width: 50%;">Events</td>
      <td style="width: 50%;">Total Per User</td>
    </tr>
    <tr>
      <td style="width: 50%;">Aggregate Properties</td>
      <td style="width: 50%;">
        <p>Sum</p>
        <p>Average</p>
        <p>Median</p>
        <p>
          <a href="https://www.loom.com/share/7d0e42f847c24b3c8720d5b6a6bedeb4" target="_self">Distinct Count</a>
        </p>
        <p>
          Percentiles <span style="font-weight: 400;">(P25,P75,P90,P99)</span>
        </p>
        <p>Minimum</p>
        <p>Maximum</p>
      </td>
    </tr>
    <tr>
      <td style="width: 50%;">Count Users</td>
      <td style="width: 50%;">
        <p>Daily Active Users (DAU)</p>
        <p>Weekly Active Users (WAU)</p>
        <p>Monthly Active Users (MAU)</p>
      </td>
    </tr>
    <tr>
      <td style="width: 50%;">Event property value per user</td>
      <td style="width: 50%;">
        <p>Sum</p>
        <p>Average</p>
        <p>Distinct value count</p>
        <p>Minimum</p>
        <p>Maximum</p>
      </td>
    </tr>
  </tbody>
</table>
<p>
  <span style="font-weight: 400;">These functions provide additional aggregation options following the initial calculation because they are “per user” calculations. “Per user” calculations first calculate the value per user, which is an unhelpful query in its raw form, but becomes useful when you perform an aggregation on that calculation.</span><span><br></span>
</p>
<p>
  <span style="font-weight: 400;">Selecting any of these functions gives you the option to choose different ways to aggregate this data. The default aggregation is <strong>Average</strong>, which you can click on to select a different option such as distribution, median, 25/75/90th percentiles, minimum and maximum.</span><span style="font-weight: 400;"></span>
</p>
<p>
  <img src="/hc/article_attachments/7771766371732/mceclip5.png" alt="mceclip5.png">
</p>
<p>
  <span style="font-weight: 400;">If the data function you select calculates based on property (“Event Property Values” or “Event Property Values Per User”), you will be prompted to select an event property.</span>
</p>
<p>
  <img src="/hc/article_attachments/7771793956372/mceclip6.gif" alt="mceclip6.gif">
</p>
<p>
  <span>You can find more information about each data function and how they are calculated below:</span>
</p>
<h3>Events</h3>
<table style="width: 700px;">
  <tbody>
    <tr>
      <td class="wysiwyg-text-align-center" style="width: 95.6px;">
        <strong>&nbsp;Function Name</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 244.4px;">
        <p>
          <strong>Events &amp; Cohorts Calculation</strong>
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>
          <strong>Profiles Calculation</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.6px;">
        <p>
          <strong>Total</strong>
        </p>
      </td>
      <td style="width: 244.4px;">
        <p>
          <span>Total count of [event] performed.</span>
        </p>
        <p style="font-size: small;">
          <span><strong>Example:</strong>&nbsp;How many times did my users watch a video?</span>
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">N/A</td>
    </tr>
    <tr>
      <td style="width: 95.6px;">
        <p>
          <strong>Total per user</strong>
        </p>
      </td>
      <td style="width: 244.4px;">
        <p>
          <span><span style="font-weight: 400;">The number of events performed per user.</span></span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> How many videos were watched per user?
        </p>
        <p style="font-size: small;">
          <strong>Aggregation options:</strong> Average, distribution,
          median, percentiles, minimum, maximum
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>N/A</p>
      </td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p>
<h3>Users</h3>
<table style="width: 700px;">
  <tbody>
    <tr>
      <td class="wysiwyg-text-align-center" style="width: 95.4px;">
        <strong>&nbsp;Function Name</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 244.6px;">
        <p>
          <strong>Events &amp; Cohorts Calculation</strong>
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>
          <strong>Profiles Calculation</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.4px;">
        <p>
          <strong>Total</strong>
        </p>
      </td>
      <td style="width: 244.6px;">
        <p class="wysiwyg-text-align-center">N/A</p>
      </td>
      <td style="width: 194px;">
        <p>
          <span>Total count of user profiles.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's my total number of users?
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.4px;">
        <p>
          <strong>Unique</strong>
        </p>
      </td>
      <td style="width: 244.6px;">
        <p>
          <span style="font-weight: 400;">The number of users who performed [event].</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the count of users who watched
          a video?
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>N/A</p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.4px;">
        <strong>Daily Active Users (DAU)</strong>
      </td>
      <td style="width: 244.6px;">
        <p>
          <span style="font-weight: 400;">The number of users who performed [event] within the last 24 hours.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the count of users who watched
          a video in the last day?
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>N/A</p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.4px;">
        <strong>Weekly Active Users (WAU)</strong>
      </td>
      <td class="wysiwyg-text-align-left" style="width: 244.6px;">
        <p>
          <span style="font-weight: 400;">The number of users who performed [event] within the last 7 days.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the count of users who watched
          a video in the week?
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">N/A</td>
    </tr>
    <tr>
      <td style="width: 95.4px;">
        <strong>Monthly Active Users (MAU)</strong>
      </td>
      <td class="wysiwyg-text-align-left" style="width: 244.6px;">
        <p>
          <span style="font-weight: 400;">The number of users who performed [event] within the last 30 days.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the count of users who watched
          a video in the last month?
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">N/A</td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p>
<h3>
  <span>Aggregate Property values</span>
</h3>
<table style="width: 716.639px;">
  <tbody>
    <tr>
      <td class="wysiwyg-text-align-center" style="width: 95px;">
        <strong>&nbsp;Function Name</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 244px;">
        <p>
          <strong>Events &amp; Cohorts Calculation</strong>
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 210.639px;">
        <p>
          <strong>Profiles Calculation</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95px;">
        <p>
          <strong>Sum</strong>
        </p>
      </td>
      <td style="width: 244px;">
        <p>
          <span style="font-weight: 400;">The total of a numeric property value across all instances of [event].</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the total number of minutes
          of videos watched?
        </p>
      </td>
      <td style="width: 210.639px;">
        <p>
          <span style="font-weight: 400;">The total of a numeric property value across all </span><span style="font-weight: 400;">user</span><span style="font-weight: 400;"> profiles.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the total revenue across all
          users?
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95px;">
        <p>
          <strong>Average</strong>
        </p>
      </td>
      <td style="width: 244px;">
        <p>
          <span style="font-weight: 400;">Average of a numeric property value across all instances of [event].</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the average number of minutes
          per video watched?
        </p>
      </td>
      <td style="width: 210.639px;">
        <p>
          <span style="font-weight: 400;">Average of a numeric property value across all </span><span style="font-weight: 400;">user</span><span style="font-weight: 400;"> profiles.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the average revenue across all
          users?
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95px;">
        <p>
          <strong>Distinct count</strong>
        </p>
      </td>
      <td style="width: 244px;">
        <p>
          <span style="font-weight: 400;">Calculates the unique count of property values across all instances of [event].</span>
        </p>
        <p>
          <span style="font-weight: 400;"><strong>Example:</strong> How many unique songs were played in the last 30 days?</span>
        </p>
      </td>
      <td style="width: 210.639px;">
        <p>
          <span style="font-weight: 400;">Calculates the unique count of property values across all profiles.</span>
        </p>
        <p>
          <span style="font-weight: 400;"><strong>Example:</strong> How many unique countries were our video watchers from?</span>
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95px;">
        <p>
          <strong>Median</strong>
        </p>
      </td>
      <td style="width: 244px;">
        <p>
          <span style="font-weight: 400;">Median of a numeric property value&nbsp;</span><span style="font-weight: 400;">across all instances of [event].</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the median number of minutes
          per video watched?
        </p>
      </td>
      <td style="width: 210.639px;">
        <p>
          <span style="font-weight: 400;">Median of a numeric property value&nbsp;</span><span>across all </span><span>user</span><span> profiles.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the median revenue across all
          users?
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95px;">
        <p>
          <strong>Percentiles</strong>
        </p>
        <p>
          <strong>(25/75/90/99)</strong>
        </p>
      </td>
      <td style="width: 244px;">
        <p>
          <span style="font-weight: 400;">The 25/75/90/99th percentile of a numeric property value across all instances of [event].</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the 25th percentile number of
          minutes of videos watched?
        </p>
      </td>
      <td style="width: 210.639px;">
        <p>
          <span style="font-weight: 400;">The 25/75/90/99th percentile of a numeric property value across all user profiles.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the 25th percentile revenue
          across all users?
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95px;">
        <strong>Minimum</strong>
      </td>
      <td class="wysiwyg-text-align-left" style="width: 244px;">
        <p>
          <span style="font-weight: 400;">Minimum of a numeric property&nbsp;</span><span style="font-weight: 400;">value across all instances of [event].</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the minimum number of minutes
          per video watched?
        </p>
      </td>
      <td style="width: 210.639px;">
        <p>
          <span style="font-weight: 400;">Minimum of a numeric property value across all user profiles.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the minimum revenue across all
          users?
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95px;">
        <p>
          <strong>Maximum</strong>
        </p>
      </td>
      <td style="width: 244px;">
        <p>
          <span style="font-weight: 400;">Maximum of a numeric property&nbsp;</span><span style="font-weight: 400;">value across all instances of [event].</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the maximum number of minutes
          per video watched?
        </p>
      </td>
      <td class="wysiwyg-text-align-left" style="width: 210.639px;">
        <p>
          <span style="font-weight: 400;">Maximum of a numeric property value across all user profiles.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the maximum revenue across all
          users?
        </p>
      </td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p>
<h3>
  <span>Aggregate property values per user</span>
</h3>
<table style="width: 700px;">
  <tbody>
    <tr>
      <td class="wysiwyg-text-align-center" style="width: 95.6px;">
        <strong>&nbsp;Function Name</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 244.4px;">
        <p>
          <strong>Events &amp; Cohorts Calculation</strong>
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>
          <strong>Profiles Calculation</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.6px;">
        <p>
          <strong>Sum</strong>
        </p>
      </td>
      <td style="width: 244.4px;">
        <p>
          <span style="font-weight: 400;">The total of a numeric property value across all instances of [event] per user.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the total number of hours of
          videos watched per user?
        </p>
        <p style="font-size: small;">
          <strong>Aggregation options:</strong> Average, distribution,
          median, percentiles, minimum, maximum
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">N/A</td>
    </tr>
    <tr>
      <td style="width: 95.6px;">
        <p>
          <strong>Average</strong>
        </p>
      </td>
      <td style="width: 244.4px;">
        <p>
          <span style="font-weight: 400;">Average of a numeric property value across all instances of [event] per user.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the average number of hours
          of videos watched per user?
        </p>
        <p style="font-size: small;">
          <strong>Aggregation options:</strong> Average, distribution,
          median, percentiles, minimum, maximum
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">N/A</td>
    </tr>
    <tr>
      <td style="width: 95.6px;">
        <p>
          <strong>Distinct count</strong>
        </p>
      </td>
      <td style="width: 244.4px;">
        <p>
          <span style="font-weight: 400;">The number of distinct property values per user</span><span style="font-weight: 400;">.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong>&nbsp;How many different videos did
          each user watch?
        </p>
        <p style="font-size: small;">
          <strong>Aggregation options:</strong> Average, distribution,
          median, percentiles, minimum, maximum
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>N/A</p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.6px;">
        <p>
          <strong>Minimum</strong>
        </p>
      </td>
      <td style="width: 244.4px;">
        <p>
          <span style="font-weight: 400;">Minimum of a numeric property&nbsp;value across all instances of [event] per user.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the minimum number of hours
          of videos watched per user?
        </p>
        <p style="font-size: small;">
          <strong>Aggregation options:</strong> Average, distribution,
          median, percentiles, minimum, maximum
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>N/A</p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.6px;">
        <p>
          <strong>Maximum</strong>
        </p>
      </td>
      <td style="width: 244.4px;">
        <p>
          <span style="font-weight: 400;">Maximum of a numeric property&nbsp;value across all instances of [event] per user.</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the maximum number of hours
          of videos watched per user?
        </p>
        <p style="font-size: small;">
          <strong>Aggregation options:</strong> Average, distribution,
          median, percentiles, minimum, maximum
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>N/A</p>
      </td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p>
<h3>
  <span>Count Sessions</span>
</h3>
<table style="width: 700px;">
  <tbody>
    <tr>
      <td class="wysiwyg-text-align-center" style="width: 95.6px;">
        <strong>&nbsp;Function Name</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 244.4px;">
        <p>
          <strong>Events &amp; Cohorts Calculation</strong>
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">
        <p>
          <strong>Profiles Calculation</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 95.6px;">
        <p>
          <strong>Sessions with event</strong>
        </p>
      </td>
      <td style="width: 244.4px;">
        <p>
          <span style="font-weight: 400;">The number of sessions that contain [event].</span>
        </p>
        <p style="font-size: small;">
          <strong>Example:</strong> What's the total number of sessions
          in which users watched a video?
        </p>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 194px;">N/A</td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p>
<h3>Additional Aggregation Option Examples</h3>
<table style="width: 742px;">
  <tbody style="font-size: small;">
    <tr>
      <td class="wysiwyg-text-align-center" style="width: 110px;">
        <strong>Data Function</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 118px;">
        <strong>Average</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 123px;">
        <strong>Distribution</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 133px;">
        <strong>Median</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 118px;">
        <strong>Percentiles (25/75/90)</strong>
      </td>
      <td class="wysiwyg-text-align-center" style="width: 132px;">
        <strong>Minimum/<br>Maximum</strong>
      </td>
    </tr>
    <tr>
      <td style="width: 110px;">
        <strong>Total per user&nbsp;</strong>
      </td>
      <td style="width: 118px;">What's the average number of songs played per user?</td>
      <td style="width: 123px;">
        What is the distribution of my users by the number of songs played?
      </td>
      <td style="width: 133px;">What's the median number of songs played per user?</td>
      <td style="width: 118px;">How many songs did the 90th percentile user listen to?</td>
      <td style="width: 132px;">How many songs did my least/most active user listen to?</td>
    </tr>
    <tr>
      <td style="width: 110px;">
        <strong>Sum of property value count per user</strong>
      </td>
      <td style="width: 118px;">What's the average cumulative watch time per user?</td>
      <td style="width: 123px;">
        What's the distribution of my users by the cumulative minutes of
        content watched?
      </td>
      <td style="width: 133px;">What's the median of the cumulative watch time per user?</td>
      <td style="width: 118px;">
        How many cumulative minutes has the 90th percentile user watched?
      </td>
      <td style="width: 132px;">How much has the lowest/highest spender spent?</td>
    </tr>
    <tr>
      <td style="width: 110px;">
        <strong>Average of property value count per user</strong>
      </td>
      <td style="width: 118px;">
        What's the average of the average cart value for each rider?
      </td>
      <td style="width: 123px;">
        What's the distribution of my users by the average cart value per
        user?
      </td>
      <td style="width: 133px;">What's the median of the average cart value per user?</td>
      <td style="width: 118px;">What's the average cart value for the 90th percentile user?</td>
      <td style="width: 132px;">What's the minimum/maximum average cart value?</td>
    </tr>
    <tr>
      <td style="width: 110px;">
        <strong>Distinct property value count per user</strong>
      </td>
      <td style="width: 118px;">
        What's the average number of unique song titles heard by my users?
      </td>
      <td style="width: 123px;">
        What's the distribution of my users by the number of unique song
        titles listened to?
      </td>
      <td style="width: 133px;">How many unique songs does the median user listen to?</td>
      <td style="width: 118px;">
        How many unique songs does the 90th percentile user listen to?
      </td>
      <td style="width: 132px;">
        <p>
          What's the minimum/maximum number of unique songs my users&nbsp;listen
          to?
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 110px;">
        <strong>Minimum property value count per user</strong>
      </td>
      <td style="width: 118px;">
        What's the average of the minimum ratings provided per user?
      </td>
      <td style="width: 123px;">
        What's the distribution of my users by the minimum rating provided?
      </td>
      <td style="width: 133px;">What's the median of the minimum ratings provided by users?</td>
      <td style="width: 118px;">
        What's the minimum rating provided by the 90th percentile user?
      </td>
      <td style="width: 132px;">What's the minimum rating across all ratings??</td>
    </tr>
    <tr>
      <td style="width: 110px;">
        <strong>Maximum property value count per user</strong>
      </td>
      <td style="width: 118px;">
        What's the average of the maximum gaming session length per user?
      </td>
      <td style="width: 123px;">
        What's the distribution of my users by the maximum gaming session
        length?
      </td>
      <td style="width: 133px;">
        What's the median of the maximum gaming session length per user?
      </td>
      <td style="width: 118px;">
        What's the maximum gaming session length provided by the 90th percentile
        user?
      </td>
      <td style="width: 132px;">
        How long has the longest gaming session lasted across our users?
      </td>
    </tr>
  </tbody>
</table>
<p>
  &nbsp;Here's a quick overview on "Distinct count" of property values, and how
  that differs from "Distinct count" of property values per-user:
</p>
<p>
  <iframe src="//www.loom.com/embed/7d0e42f847c24b3c8720d5b6a6bedeb4" width="560" height="315" frameborder="0" allowfullscreen=""></iframe>
</p>
<p>
  Here are some use-cases that are now possible with "Distinct count" of property
  values:
</p>
<ul>
  <li>
    How many <strong>unique items</strong> were added to cart yesterday?
  </li>
  <li>
    How many <strong>unique songs / videos</strong> were played in the last 30
    days?
  </li>
  <li>
    How many <strong>unique files</strong> were worked on in the last week?
  </li>
</ul>
<h2>
  <span style="font-weight: 400;">Daily, Weekly, and Monthly Active Users</span>
</h2>
<h3>Daily Active Users (DAU)</h3>
<p>
  <span style="font-weight: 400;">Select DAU to calculate the number of unique users in the previous day (24-hour) period that have performed the selected event.</span>
</p>
<h3>Weekly Active Users (WAU)</h3>
<p>
  <span style="font-weight: 400;">Select WAU to calculate the number of unique users in the previous week (7-day) period that have performed the selected event.</span>
</p>
<h3>Monthly Active Users (MAU)</h3>
<p>
  <span style="font-weight: 400;">Select MAU to calculate the number of unique users in the previous month (30-day) period that have performed the selected event.</span>
</p>
<p>&nbsp;</p>
<div class="callout callout--info">
  <h4 class="callout__title">Note on DAU, WAU, and MAU calculations</h4>
  <p>
    If you select the DAU, WAU, or MAU function for a date range that includes
    the current day, the query will take the end of the current day as the end
    of the query’s time segment (even though it’s in the future). For example,
    today is April 25th, and it’s 4:22 PM. If you make a query to show WAU and
    you select “current day” as your date range, the query will return the count
    of unique users between April 19 at 12:00:00 AM and April 25 at 11:59:59.
  </p>
</div>
<h2>
  <span style="font-weight: 400;">Explore User Profiles</span><span style="font-weight: 400;"></span>
</h2>
<p>
  <span style="font-weight: 400;">Select the <a href="https://help.mixpanel.com/hc/en-us/articles/7713028610964-Advanced-Insights-Functionality-#insights-data-functions-operators-and-calculations" target="_self" rel="undefined">Data Function</a> you want to use to calculate results by clicking on <strong>Total</strong> and selecting an option from the drop-down. You can calculate based on users or profile property value.</span>
</p>
<p>
  <img src="/hc/article_attachments/7771794359444/mceclip8.gif" alt="mceclip8.gif">
</p>
<p>&nbsp;</p>
<h2>
  <span style="font-weight: 400;">Formulas</span>
</h2>
<p>
  <span style="font-weight: 400;">Use Formulas to make calculations using simple arithmetic operators.</span>
</p>
<p>
  <span style="font-weight: 400;">Mixpanel supports the following operators:</span>
</p>
<ul>
  <li style="font-weight: 400;">
    <span style="font-weight: 400;">+ : Add</span>
  </li>
  <li style="font-weight: 400;">
    <span style="font-weight: 400;">- : Subtract</span>
  </li>
  <li style="font-weight: 400;">
    <span style="font-weight: 400;">* : Multiply</span>
  </li>
  <li style="font-weight: 400;">
    <span style="font-weight: 400;">/ : Divide</span>
  </li>
  <li style="font-weight: 400;">
    <span style="font-weight: 400;">() : Use parentheses to influence the order of operations</span>
  </li>
</ul>
<div class="callout callout--info">
  <h4 class="callout__title">Note</h4>
  <p>
    Dig deeper and break down the formula by a property to see how your calculation
    compares across different segments. Similarly, apply a filter to a formula
    to narrow in on a specific segment of your data.
  </p>
</div>
<p>
  <span style="font-weight: 400;">Click the <strong>Formula</strong> button. Each event in the query shows a letter next to it, which indicates its variable name. Use these letters in combination with the operators to calculate a more advanced query. For example, you can use the DAU, WAU, and MAU functions in Formulas to calculate the stickiness of your product:<br><img src="/hc/article_attachments/7771766840724/mceclip10.png" alt="mceclip10.png"><br><br></span><span style="font-weight: 400;"></span><span style="font-weight: 400;"></span>
</p>
<p>
  <span style="font-weight: 400;">Enter a name for the formula (optional), and click</span><strong> Apply Formula</strong><span style="font-weight: 400;"> to see the formula output.</span>
</p>
<p>
  <span style="font-weight: 400;">For example, you can calculate the ratio of&nbsp;<span>DAU to MAU using a formula. Build an Insights report with event A as "App Session" and select MAU. Select "App Session" with DAU for event B. Apply the formula B/A to show the ratio of&nbsp;DAU to MAU in the report.&nbsp;</span></span>
</p>
<p>
  <img src="/hc/article_attachments/7771766962324/mceclip11.png" alt="mceclip11.png">
</p>
<p>
  <span style="font-weight: 400;">You can also use numbers as constants in a formula. Multiply a ratio by 100 to display as a percentage, for example. Divide a property value tracked in seconds by 3,600 to display the value in hours.</span>
</p>
<h2>Customize ranges</h2>
<p>
  When breaking down/segmenting by a numeric property, Mixpanel decides what intervals
  the values get grouped into, while you always had the option to customize these
  ranges/buckets with
  <a href="/hc/en-us/articles/360030848432" target="_blank" rel="noopener">Custom Properties</a>,
  it required a bit of effort to setup, so we've added support to define intervals
  without any formulas:
</p>
<p>
  <img src="/hc/article_attachments/7771794759060/mceclip12.gif" alt="mceclip12.gif">
</p>
<h2>
  <span style="font-weight: 400;">View Users</span>
</h2>
<p>
  <span data-reactroot="">You can now click a segment (bar or line) in an Insights report to see the list of users that underlie that data point. This helps see a representative sample of users from any analysis, so you can drill into anomalies or simply get to know your users. You can also save this user list as a cohort to either export or use for message targeting.</span>
</p>
<p>
  <span data-reactroot="">

    <iframe src="//www.loom.com/embed/5568e266532b4804a1c2d36d678eb1a2" width="560" height="315" frameborder="0" allowfullscreen=""></iframe>

  </span>
</p>
<p>
  <span style="font-weight: 400;"><span class="wysiwyg-underline">Please note:</span> "View users" are currently unsupported on visualizations other than bar and line.&nbsp;</span>
</p>
<h2>View Events from Insights</h2>
<p>
  You can now click on a chart segment (bar, line) in Insights and view the raw
  events that made up that metric (redirects you to Events page):
</p>
<p>
  <img src="/hc/article_attachments/7771767547156/Screen_Recording_2021-09-09_at_8.13.50_AM.gif" alt="Screen_Recording_2021-09-09_at_8.13.50_AM.gif">
</p>
<p>&nbsp;</p>
<h2>View Sample Events</h2>
<p>
  If you've ever wanted to see a few samples of an event to help you decide whether
  that's the right event you want for analysis or which property you should use
  for filters/breakdowns, this is for you.
</p>
<p>
  You can hover over any event and in the context panel, you now have the ability
  to "View Sample Events", which redirects you to the Events page with 100 most
  recent samples of that hovered event:
</p>
<p>
  <img src="/hc/article_attachments/7771767865876/View_sample_events.gif" alt="View_sample_events.gif">
</p>

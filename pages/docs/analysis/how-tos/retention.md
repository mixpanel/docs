---
title: "Retention"
---

While there has been some debate as to which metric is the best indicator of product-market fit, retention is often cited as the single most important factor. This Primer will discuss what retention is all about, how to measure retention, and what good retention looks like.


## Defining retention
Retention is the metric that shows whether your product has staying power. Retention measures how many people are coming back because they realize value in your product. Trying to grow without strong user retention is like trying to fill a leaking bucket.

A common mistake made when defining a retention metric is tying it to revenue (i.e., a paying customer is a retained customer). Why? Revenue is a lagging indicator, it’s really hard to predict churn and get in front of it. Just because somebody is paying for a product right now doesn’t mean they will next month or even next year.

A retention metric tied to product usage, however, is a more accurate predictor of churn, and a more useful KPI for teams to act on. It’s important to track an event or action that represents that your users are repeatedly getting value from your product. This event or action is something meaningful that your users do after they log in, such as “Send a message” in a messaging app, or “Watch a video” in a media streaming app. The depth and frequency of engagement will depend on the product usage interval. For example, you’ll expect users to come back more frequently to a social media app (daily), compared to a travel booking app (quarterly, or twice a year).

Of course, some products can deliver a ton, if not all, of their value in one single value moment. Say you want to buy a couch, so you download a virtual measuring app, use it once, and then delete it for good. Or maybe you open a dating app, fall in love with the first person you swipe on, and never look back. But for most digital products, the only way to bring a lot of value to users is to keep them coming back regularly to engage with your product.

We like to focus on the users that are getting the most value—they’re likely the best fit for your product. A common misstep is to instead focus on the users that churned and obsess over how to win them back. Instead, obsess over the users that are getting value right now.

Measure your retention in just four easy clicks with Mixpanel’s Company KPIs template. Try it for free here.

### How do I…know how many of my engaged users come back?
When measuring retention, you need to understand what your product’s ideal frequency is. Let’s take a look at some examples of what that might look like for different types of products across industries:

![image](https://user-images.githubusercontent.com/2077899/233905305-a668c096-132e-4a48-ad2c-0d9cbbdd78c1.png)

We generally recommend having 7-day retention as a leading indicator for 30- or 90-day retention. If your product's natural frequency is longer than quarterly (e.g., a tax filing software, whose frequency would likely be annual), you might use 90-day retention as a leading indicator for an 1-year period. You can customize your interval easily in Mixpanel’s Retention report.

![image](https://user-images.githubusercontent.com/2077899/233905319-4cb2064b-35ce-48d2-acc1-c3df7f54775a.png)

This Insights report visualizes the number of unique signups in your product over time—in this case, a 3-month period. “Sign up” is the event where a user makes themselves known to your product by “creating an account.” It may look slightly different for different products but the concept is largely the same across the board.

Importantly, this report uses the “first time ever” filter to ensure that only net new signups are accounted for. We also use “compare to previous year” in our analysis to better understand how signups are trending over time. If you’re an early-stage startup, you may not b

 

### How do I…identify my dormant users?
While it may not be as fruitful to focus on churned users, it’s good to keep an eye on your dormant ones. You can use cohorts to find not only your most engaged users but also your most “at-risk” users.

![image](https://user-images.githubusercontent.com/2077899/233905339-68e40986-3331-48e0-9c9e-67ddac1b8419.png)

In the previous chart, we defined our engaged users as users who reached a value moment twice in a set timeframe. Here, we define our dormant, or “driftaway” users as users who reached a value moment once, but did not reach it again within 30 days.


If you notice that you have a lot of dormant users, you can think about re-engagement strategies to bring them back. In Mixpanel, you can even click into your driftaway cohort with the “View Users” feature to see who those users are, so you can reach out for an interview or with an offer. The goal is, of course, to decrease your dormant users, but if you’re not seeing a boost in engaged users alongside it, those users may be completely inactive or have churned altogether.

The best way to move metrics is to measure them. Keep track of your engaged and dormant users with the Company KPI Template.


## What does “good” retention look like?
While there are no hard and fast rules, we like [Lenny Rachitsky’s take](https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29), which looks at both good and great user retention by industry:

GOOD and GREAT User Retention
* Consumer Social: ~25% is GOOD, ~45% is GREAT
* Consumer Transactional: ~30% is GOOD, ~50% is GREAT
* Consumer SaaS: ~40% is GOOD, ~70% is GREAT
* SMB / Mid-Market SaaS: ~60% is GOOD, ~80% is GREAT
* Enterprise SaaS: ~70% is GOOD, ~90% is GREAT
 

## Tying it all together
So now you know why retention matters and how to get started on measuring it. But there’s still one missing piece of the puzzle: qualitative data. Look at the full breadth of behavior for your best, most retained users. Use analytics to see what features they use the most, but also interview them: send them an email, or offer a gift card for 15 minutes of their time.

Similarly, you can do this with dormant users to understand why they’ve drifted away. Combining the qualitative data with your quantitative analysis is crucial for getting the whole picture; keep in mind, sometimes what a user says they’re doing in your product doesn’t match up to what they’re actually doing. The pain point or value they’re describing is valid on its own, but without the context, it’s hard to make informed decisions.

All in all, building the best, most valuable product for your customers is the most straightforward, effective way to boost retention and prevent churn.

 
## Where can I learn more?
* Read our Primers on [Engagement](/docs/analysis/how-tos/engagement) and [Growth](/docs/analysis/how-tos/growth) to learn why those metrics matter, what they mean, and how to measure them.
* Take our [Company KPI Dashboard Template](https://mixpanel.com/project?show-event-translator=true) for a spin to start measuring and optimizing your product’s retention with only two events and four easy clicks. Read more about how to use a template here.

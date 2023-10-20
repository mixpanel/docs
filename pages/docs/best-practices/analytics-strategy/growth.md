# Growth


Growth is a measure of how many people find value in your product over time. Many companies obsess over growth because they’re trying to build the best product in an increasingly crowded market. When potential customers can compare products from different companies in seconds, businesses must continuously improve their products if they want to stay competitive. If companies don’t focus on growth, they risk becoming obsolete as other companies leapfrog them with more innovative products.

Every new customer validates a company’s growth strategy. But every time a customer leaves, that sends them scrambling back to the drawing board to see where they can do better. And the faster a company can achieve product-market fit, the more likely they are to build a profitable business that customers will value for years to come.

One of the first places companies look to measure their growth is the number of new people signing up for their product. This question is easy to answer in Mixpanel, and even easier with the [Company KPIs Board Template](https://mixpanel.com/project?show-event-translator=true).

## How do I… analyze new signup numbers and trends in Mixpanel?
![image](https://user-images.githubusercontent.com/2077899/233905671-0db903e8-b599-43c3-a985-f428eb4cc780.png)

This Insights report visualizes the number of unique signups in your product over time—in this case, a 3-month period. “Sign up” is the event where a user makes themselves known to your product by “creating an account.” It may look slightly different for different products but the concept is largely the same across the board.

Importantly, this report uses the “first time ever” filter to ensure that only net new signups are accounted for. We also use “compare to previous year” in our analysis to better understand how signups are trending over time. If you’re an early-stage startup, you may not be able to go back a full year. But you can still use Mixpanel to compare new signups to any previous timeframe you’d like (i.e., day, month, quarter, or even a custom date range).

As you can see, looking at the absolute numbers, percentage changes, and averages together will give you a much clearer sense of how signups are trending overall. But measuring growth is far more than just tracking new signups.

## Growth is more than just new signups...
More users signing up is an essential part of the growth equation. But new signups trending upwards isn’t enough on its own.

If you really want to measure and manage your growth, you need to keep track of a different group of metrics. Beyond signups, common indicators of growth include daily, weekly, or monthly active usage (DAU, WAU, and MAU, respectively), signup rates, and more.

Once you understand what an “active user” looks like in your product, it’s a straightforward process to calculate these metrics with product analytics. But first, you need to understand:

* How to define and measure DAU/WAU/MAU
* When to use DAU/WAU/MAU (and when not to)
* The pitfalls of measuring active usage
 

## How do I… find my product’s DAU & WAU?
Many companies consider an active user to be someone who simply accesses their website or app. This approach is simple but flawed, because it creates a distorted perspective of user engagement. Obviously, not every user who logs into your app engages with it in a meaningful way. A better way to calculate active usage is to look only at users who find value in your product (daily, weekly, or monthly). Here at Mixpanel, we consider our users to be “active” when they create a report in our product analytics platform to analyze user behavior.

![image](https://user-images.githubusercontent.com/2077899/233905737-45d6258b-6918-41d7-a8c6-91f99427c6be.png)

In the case of this example, a media streaming platform, our value moment is “watch video.” This chart plots DAU and WAU counts for the “watch video” event against each other over a 30-day period so you can understand how these trends look side by side and how they evolve over time.

With just two event in Mixpanel—your product’s value moment and a signup event—and a couple of clicks, you can easily find your product’s DAU & WAU. Try it [here](https://mixpanel.com/project/2138137/view/290551/app/boards#id=4201292&edited-bookmark=CXgj2SavNQ13).

 

## When should I measure DAU/WAU/MAU?
Because active usage is such a popular KPI, it often becomes the default metric for all types of product analyses, including industry benchmarking, product growth, marketing campaign performance, and beyond. Let’s look at some of the ways DAU/WAU/MAU are used, so you can assess when these metrics serve you well and when they don’t.

### Assess overall business health
Alongside other metrics like LTV (lifetime value), churn, and ARR (annual recurring revenue), DAU/WAU/MAU can be useful for reporting. Venture capitalists will often see these metrics in startup pitch decks, and established companies add them to their quarterly investor earnings reports.

If you clearly define what “active” means for your business, DAU/WAU/MAU can be helpful for assessing overall business health. But if you don’t define the “active” part of the picture, it becomes a vanity metric. Our advice: DAU/MAU/WAU is a great opening statement, but it’s never the full story.

### Track seasonal changes for your business
DAU/WAU/MAU can be useful for internal benchmarking. Some businesses see seasonal spikes in active usage, and forecasting these spikes can help companies optimize their inventory or distribute network traffic, for example.

### Measure marketing funnel effectiveness
Measuring the number of active users coming from different user acquisition campaigns can help optimize ad spend for better performance.

For example, your TikTok mobile app install campaign might create a cascade of thousands of installs at a low cost that yield a low number of active users. At the same time, your Apple Search Ads bids might result in expensive installs that convert into highly active users. Because of higher intent (or better targeting, or for other reasons), these users find more value in your product and show higher engagement. Cheap doesn’t necessarily mean effective, and looking at how active your new users are by each acquisition channel can help you better measure and improve marketing ROI.

### Monetizable active usage
Even though “active usage” should ideally be tied to “value moments” in your product, they are not the same metrics. And the definition of “active users” depends on the unique context of your business. That means “active usage” is occasionally based on “[value exchange moments](https://mixpanel.com/content/guide-to-product-analytics/chapter_1/#monetize-product)” instead of “value moments.”

An example of a value exchange moment is mDAU, which stands for monetizable daily active usage. For example, Twitter’s monetizable active users are users who accessed any Twitter application that is able to show ads. Yet, this metric doesn’t reflect the product’s value moments for Twitter users (e.g., retweets or mentions). That’s why DAU shouldn’t be top of mind when building a value-first product; though it’s an important KPI for tracking the value of Twitter for advertisers.

### One more thing about active usage
Defining “active behavior” is an essential first step, but it’s not enough. Next, you need to find which user actions correlate with those behaviors so you can make better product decisions. This is how you can encourage more users to perform those actions earlier in their experience with your product. The earlier they recognize the value of your solution, the more likely they’ll come back to it over and over again.

 
## Where are my most valuable users coming from?
With Mixpanel, you can segment users based on their source and find or confirm whether you are targeting the right group. In the Funnels report, you can compare conversion rates and see where your engaged users are coming from. Organic traffic? Google Ads? LinkedIn? Best case: you find that your targeting criteria on Twitter ads are spot on and you double down. Worst case: you find that users from paid ads churn faster than the organic users or users from other sources, so you modify the targeting criteria for your ad audience.

 

### How do I…identify which channels generate the most signups?
![image](https://user-images.githubusercontent.com/2077899/233905892-b74c549a-7790-4bd8-be0f-3152a784ba93.png)

This Insights report takes the “signup” event and uses a breakdown by campaign source to show how these signups are being driven across channels. You can see here that Google Adwords is driving the most signups, so you may want to invest more heavily there. Meanwhile, Facebook is consistently driving the least signups, which means you could either scale back your investment here or try to optimize this channel to see if it performs better.

## How should your growth strategy change as your company matures?
The goal of growth is to identify all the people out there who can benefit from the value that your product brings. At an early startup stage, it will likely be a very small, niche audience. When you reframe growth in this way, demand generation becomes less about convincing an uninformed crowd to buy your product, and more about showing people that your product can bring value to them or alleviate some friction in their lives.

When you find your product-market fit, measuring growth and value becomes even more important. Given the costs of ads and the fracture of channels and media, a core challenge will be to scale your reach beyond the niche market you’ve already captured. At this point, you’ve hopefully collected enough data that will guide your acquisition in terms of who those users are, where to find them, and how to educate them about your product’s value. Product analytics will help you stay the course and spend your budget wisely.

## Where can I learn more?
* Read our Primers on [Engagement](/docs/best-practices/analytics-strategy/engagement) and [Retention](/docs/best-practices/analytics-strategy/retention) to learn why those metrics matter, what they mean, and how to measure them.
* Take our [Company KPI Board Template](https://mixpanel.com/project?show-event-translator=true) for a spin to start measuring and optimizing your product’s growth with only two events and four easy clicks.



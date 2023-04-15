This article reflects a legacy version of identity management in Mixpanel, for projects that were created prior to 2020. In 2020, we released hourly merge. If you have ID Merge enabled, you will see it in your Mixpanel [project settings](https://mixpanel.com/settings/project):

![image](/230244606-e12422cd-d937-4328-ac58-8cc60f919df7.png)

If you're using ID Merge, see our latest recommendations [here](https://developer.mixpanel.com/docs/identity-management).

# Manage Identity with Alias and Identify Methods
An ideal integration enables you to track the actions of your users across your application, website or other platform when using Mixpanel.

An example of a user journey follows when a user first engages your site anonymously, signs up for an account, and logs in later.

Mixpanel provides two methods to let you track those actions, and be able to connect the user journey. In short, to implement identity management:

When a new user signs up, call mixpanel.alias("YOUR_USER_ID") once.
When a user logs in, call mixpanel.identify("YOUR_USER_ID").
When alias is called, Mixpanel will create a mapping between the Mixpanel generated distinct_id, and your unique identifier.

Subsequently, when identify is called, you pass your identifier and Mixpanel will connect it with the original distinct_id. 

# Example User Identification Flow
Here’s an example of how alias and identify work together to manage user identity:

* Sally comes to your website for the first time. Mixpanel assigns Sally a randomly generated ID, which is known as a Mixpanel distinct_id.
* Mixpanel assigns Sally the distinct_id “12345”. Now all her actions are connected to that distinct_id.
* After navigating through several pages and performing several events, she successfully signs up for an account.
* The signup confirmation page calls the `mixpanel.alias()` method and passes Sally’s email address as an argument. For example, `mixpanel.alias(“sally@gmail.com")`.
The `mixpanel.alias(“sally@gmail.com”)` method doesn't change her Mixpanel distinct_id.  It adds the ID `"sally@gmail.com"` to a Mixpanel lookup table, and maps it to the original Mixpanel distinct_id `“12345”`.
Now Mixpanel calls the `mixpanel.identify("sally@gmail.com")` method and passes the ID (`"sally@gmail.com"`) to all subsequent pages and logins whenever Mixpanel sees data for `"sally@gmail.com”`.
Mixpanel remaps her original distinct_id of `“12345”`. So all actions Sally takes–whether on your site, in your app, or anonymously before she signed up for her account–maps to her.

The image below illustrates the identity management process.
 
![image](/230244224-17b9c00c-a41a-4061-a22b-4b47d7ecfe84.png)
 

# Only Call Alias Once
An alias can only point to one Mixpanel distinct_id.

If you’re implementing Mixpanel on a site with users who have already signed up, you do not need call alias on those users.

The primary purpose of calling mixpanel.alias() is to connect a user’s anonymous events from **before** a signup (or other identification) event with the post-signup activity on your site or in your app.

You can simply identify existing users with the Mixpanel identify method.

# Multiple Users on Single Devices: Identify on Login, Reset on Logout
Mixpanel’s SDK contains methods to manage multiple users on single devices for both anonymous and authenticated users.

When a user logs out, the distinct_id does not change. The distinct_id lives in the local storage (mobile) or cookie (browser) of the device to persist for future sessions, so it will only change if the identify method is explicitly called with a new value.

In order to handle multiple identities on the same device, you'll want to call `mixpanel.reset()` on log out. This resets the distinct_id and removes existing super properties. Mixpanel will treat subsequent events on the same device as performed by a new user. 

When you call reset, all events for logged out users will appear anonymous until you call identify. This means the unique user counts for these events may not be correct. 

In addition, because you remove super properties, you will need to again register these for each user on login. The tradeoff for the above drawbacks is that each profile is one unique user within your implementation.

# Existing User Identification Example
If you’ve already mapped your identifier (such as “sally@gmail.com”) to a Mixpanel distinct_id (such as “12345”), any attempt to map your identifier to a different Mixpanel distinct_id fails.

In the previous example, Sally came to your website, not your mobile application. Suppose she decides to download your app on her phone and logs in.

The `mixpanel.alias()` method does not work the second time. Even though Sally has not used your app on this device before, she is not a new user.

If Mixpanel calls the `mixpanel.alias()` method, it would attempt to map the email to the random Mixpanel distinct_id from the phone.

To remedy this scenario, use the `mixpanel.identify()` method to associate the original Mixpanel distinct_id "12345", where all Sally's actions are already stored by calling `mixpanel.identify("12345")`. This will associate her events moving forward with distinct_id 12345. Events she performed anonymously on her phone will be orphaned.

# Server-Side Aliasing
If an identify or track call arrives to Mixpanel with a new distinct_id too quickly after an alias call, a race condition occurs between the event and the alias call.

Usually there are no issues when your identify and track calls arrive ~1 second after the alias. When the alias queue is backed up, Mixpanel queues events as well, alleviating the race condition.

Split or duplicate profiles can result when events are processed before their corresponding alias.

To mitigate split or duplicate profiles, Mixpanel’s client-side Javascript library continues to send track calls to the original Mixpanel distinct_id while the records update.

## ID Management Overview
<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/01dcff45ee91473a9e6ddb1670fd6cba" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

## Basic concepts in ID Merge
<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/f8f0ee64496a402d83246b111cdd051c" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

## ID Merge implementation Overview
<p style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe src="https://www.loom.com/embed/9941b613dd044536ba1962ddb6a32ccd" frameborder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} allowfullscreen></iframe>
</p>

## Understanding Original ID Merge
Learn more about how [Original ID Merge](https://help.mixpanel.com/hc/en-us/articles/360041039771) works.

## Understanding Simplified ID Merge
Learn more about how [Simplified ID Merge](https://help.mixpanel.com/hc/en-us/articles/14377628688788) works.


## ID Merge Implementation Best Practices
#### Call mixpanel.identify upon a successful sign-up / login or when an app is re-opened in a logged in state
By calling mixpanel.identify at these specific points in user journeys, you would be able to link the pre and post-login events to the same user on Mixpanel. Besides, calling mixpanel.identify when the users re-open the app in a logged in state ensures that all events in the session are tracked with the user's identifier such as user id.


#### Identify your users consistently on Mixpanel
Once the users are assigned a unique identifier such as user id upon successful registration, you should call mixpanel.identify with the same user id going forward.
That being said, you can call mixpanel.identify with a different identifier if your users are identified differently on another platforms. However, you would need to merge multiple identifiers belong to the same user into one Identity Cluster. This ensures that events with different identifiers are linked to the same user on Mixpanel.


#### Track the unique identifier as a super property and user property to assist troubleshooting
You can track the user's unique identifier as a [super property via mixpanel.register](https://developer.mixpanel.com/docs/javascript#super-properties) and [user property via mixpanel.people.set](https://developer.mixpanel.com/docs/javascript#setting-profile-properties) as soon as it is available in the app i.e. on a successful sign-up / login or when an app is re-opened in a logged in state.
In the cases when ID Merge is not implemented properly, you can rely on these properties for troubleshooting purpose.


#### Avoid creating profiles for anonymous users
Avoid creating profiles for anonymous users via [mixpanel.people.set()](https://developer.mixpanel.com/docs/javascript#setting-profile-properties) followed by [identify(anonymous_id)](https://developer.mixpanel.com/docs/javascript#identify).
If possible, cache user profile properties updates in cookie or local storage and only send them to Mixpanel after the users identify themselves via mixpanel.identify(user_id).


#### QA your ID management implementation during development phase
Here are a few things to look out for during QA:
- Ensure that cross-platform, pre and post-registration events are linked to the same user on Mixpanel.
- Ensure that no duplicate profiles are created as the users go through the onboarding, registration, login and cross-platform user journey.
- Ensure that all the user’s identifiers are stored in the same Identity Cluster and all their events are displayed on a single profile on Mixpanel.


#### Keep a record of your ID management implementation
We encourage you to document your implementation (or create a diagram of the implementation). This will come in handy when you need to re-implement this on a new platform or troubleshoot ID management issue.

Read more about [ID Merge Implementation Best Practices](https://help.mixpanel.com/hc/en-us/articles/9648680824852)

---

## FAQs
#### 1. How does Original ID Merge work under the hood?
ID Merge is essentially the process of merging two users into one user on Mixpanel via Identify, Alias or Merge methods. You can also think of ID Merge as the process of merging two Distinct IDs (or two Identity Clusters) into one Identity Cluster pointing to an individual user on Mixpanel.
Under the hood, out of the two profiles that are chosen for merging, only one will become the “winning” profile and be retained on Mixpanel whereas the other one will be hidden away. The events on the hidden profile will be migrated over to the winning profile to give you the complete user journey view in the merged profile (take note that the profile properties on hidden profiles will remain hidden).
The Canonical Distinct ID on the winning profile will become the new Canonical Distinct ID of the merged profile.


#### 2. Can I set my User ID as the Canonical Distinct ID? I have already called mixpanel.identify("User ID") but I don't see User ID shows up as the (main) Canonical ID on Mixpanel profiles.
No, you have no control of the **[Canonical Distinct ID](https://help.mixpanel.com/hc/en-us/articles/360041039771#:~:text=Canonical%20Distinct%20ID)** when on Original ID Merge. It is decided by Mixpanel system. In Original ID Merge, the Canonical Distinct ID is re-decided whenever there are new ID merges to an existing Identity Cluster via **[Identify, Alias or Merge methods](https://help.mixpanel.com/hc/en-us/articles/360041039771#:~:text=and%20data%20exports.-,User%20Identification,-While%20Mixpanel%20ultimately)**, so the user’s Canonical Distinct ID may change over time.
That being said, as long as the User ID had been added to the Identity Cluster, you can send events and profile properties to Mixpanel via User ID. Upon receiving these data, Mixpanel will resolve the User ID to the Canonical Distinct ID within the same Identity Cluster to link the data to the correct user. This is solved in Simplified ID Merge.


#### 3. Is ID Merge retroactive? I’m planning to merge 2 separate users on Mixpanel via ID Merge and I want to visualise their events in a single activity feed.
Yes, ID Merge is retroactive. During an ID Merge, Mixpanel merges the historical events of both users into a single user profile. New events will also be added to the merged profile going forward.


#### 4. There is a limit of 500 Distinct IDs per Identity Cluster. What happens when the limit is hit?
In Original ID Merge, once the Identity Cluster accumulates up to 500 Distinct IDs, you will no longer be able to merge new ID into the Identity Cluster via Identify, Alias or Merge methods. The new ID will end up as a separate user profile on Mixpanel.

Read more FAQs on [Originial vs Simplified ID Merge](https://help.mixpanel.com/hc/en-us/articles/14383975110292)

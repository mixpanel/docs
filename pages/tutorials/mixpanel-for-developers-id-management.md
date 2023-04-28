## ID Management Overview
[ID Management Overview](https://www.loom.com/share/01dcff45ee91473a9e6ddb1670fd6cba)

## Basic concepts in ID Merge
[Basic concepts in ID Merge](https://www.loom.com/share/f8f0ee64496a402d83246b111cdd051c)

## ID Merge implementation Overview
[ID Merge implementation Overview](https://www.loom.com/share/9941b613dd044536ba1962ddb6a32ccd)

---

# FAQs
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

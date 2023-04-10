---
title: "Server"
slug: "server"
hidden: false
createdAt: "2023-03-25T20:18:09.345Z"
updatedAt: "2023-03-26T23:48:54.396Z"
---
You can use Mixpanel's Server SDKs to send events from your backend servers to Mixpanel. We [recommend](doc:plan-your-implementation#need-to-start-tracking-product-data) server-side tracking, since it is more reliable and easier to maintain than web/mobile tracking.

### Step 1: Install the SDK
```shell Python
pip install mixpanel
```
```shell Node.js
npm install mixpanel
```
```shell Ruby
gem install mixpanel-ruby
```
```xml Java
<!--Include the following in your project's pom.xml-->
  <dependency>
    <groupId>com.mixpanel</groupId>
    <artifactId>mixpanel-java</artifactId>
    <version>1.4.4</version>
  </dependency>
```

### Step 2: Track your first event

You'll need your Project Token for this, which you can get [here](mixpanel.com/settings/project).
```python Python
from mixpanel import Mixpanel

mp = Mixpanel("YOUR_TOKEN")

# Note: you must supply the user_id who performed the event as the first parameter.
mp.track(user_id, 'Signed Up',  {
  'Signup Type': 'Referral'
})
```
```javascript Node.js
var Mixpanel = require('mixpanel');

var mixpanel = Mixpanel.init('<YOUR_TOKEN>');

// Note: you must supply the user_id who performed the event in the `distinct_id` field
mixpanel.track('Signed Up', {
  'distinct_id': user_id,
  'Signup Type': 'Referral'
})
```
```ruby Ruby
require 'mixpanel-ruby'
mp = Mixpanel::Tracker.new(PROJECT_TOKEN)

# Note: you must supply the user_id who performed the event as the first parameter
mp.track(user_id, 'Signed Up', {
  'Signup Type' => 'Referral'
})
```
```java Java
import com.mixpanel.mixpanelapi.ClientDelivery;
import com.mixpanel.mixpanelapi.MessageBuilder;
import com.mixpanel.mixpanelapi.MixpanelAPI;

MessageBuilder messageBuilder = new MessageBuilder(PROJECT_TOKEN);

// You can send properties along with events
JSONObject props = new JSONObject();
props.put("Signup Type", "Referral");

// Create an event
JSONObject sentEvent = messageBuilder.event(userId, "Signup", props);

ClientDelivery delivery = new ClientDelivery();
delivery.addMessage(sentEvent);

// Use an instance of MixpanelAPI to send the messages to Mixpanel's servers.
MixpanelAPI mixpanel = new MixpanelAPI();
mixpanel.deliver(delivery);",
```

🎉 Congratulations, you've tracked your first event! You can see it in Mixpanel via the [Events](mixpanel.com/report/events) page. 

Don't see your language here? See all our libraries in [Github](https://www.github.com/mixpanel) and our references for [Python](doc:python), [Node](doc:nodejs), [Ruby](doc:ruby), and [Java](doc:java). We also have a simple [HTTP API](doc:cloud-ingestion) for any languages we don't support.

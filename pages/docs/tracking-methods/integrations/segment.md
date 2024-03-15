# Segment

Segment is a CDP (Customer Data Platform) which lets you track event data and route it to various downstream destinations. Mixpanel integrates seamlessly with Segment -- if you use Segment, it takes just a few clicks to set up Mixpanel.

## Startup Credit Program
Mixpanel offers \$50K in credits to [eligible startups](https://mixpanel.com/startups). Because of our Segment partnership, we're also able to offer startups \$50k in Segment credits. This gives startups the runway to use both tools for free.

Once you create your Segment and Mixpanel accounts, you can fill out [this form](https://airtable.com/shrLP3GSZnxt1WT2v?prefill_Partner%20Code=Mixpanel) and Segment will get back to you within 48 hours to confirm your credits are applied.

Startup eligibility requirements:
* Founded less than 2 years ago
* Raised no more than $8MM USD in total funding

## How the Integration Works
In the simplest form, the Segment libraries (“Sources”) generate messages about what’s happening in your site or app, and send them to the Segment servers. Segment then translates the content of those messages into different formats for use by other tools (which we call ‘Destinations’), and sends the translated messages to those tools. The Segment servers also archive a copy of the data, and can send data to your storage systems (such as databases, warehouses, or bulk-storage buckets).

For detailed instructions on how to install and initialize the Segment library please refer to the [Segment Getting Started Guide](https://segment.com/docs/getting-started/02-simple-install/).

### 1. Integrate with Segment
Once you've installed and initialized a Segment library in your application, get your data into Mixpanel by following the instructions for setting up the [Mixpanel (Actions) Destination](https://segment.com/docs/connections/destinations/catalog/actions-mixpanel/)

### 2. Identify Users
The next thing you need to do is identify your users, so that you can understand what your users are really doing. When you call [Segment's `identify` API](https://segment.com/docs/connections/spec/identify/), Mixpanel will set the specified `userId` as the Mixpanel `distinct_id` along with any additional `traits` that you provide.

### 3. Track User Actions
Lastly, track your users' actions using [Segment's `track` API call](https://segment.com/docs/connections/spec/track/).

### 4. Check for Success
[Open up Events View in Mixpanel](http://mixpanel.com/report/events) to view incoming events.

## Integrating Group Analytics using Segment
There are 4 parts to Implementing Group Analytics via Segment.

### 1. Define the Group Key in Mixpanel and Segment
Create the Group Key in Mixpanel Project Settings.
![1groupkey_projectsettings](https://github.com/mixpanel/docs/assets/97630035/835de9fa-eea2-47b0-9965-4a922ebd39ab)

Create the Group Identifier Trait in [Segment’s Mixpanel Destination Settings](https://segment.com/docs/connections/destinations/catalog/mixpanel/#group).
![2segment_groupkey](https://github.com/mixpanel/docs/assets/97630035/e747d204-edb6-495f-afba-0e7b0b9435f9)

Make sure the value placed in Segment’s “Group Identifier Trait” row matches Mixpanel’s “Group Key”.

### 2. Create Group Profiles
[analytics.group()](https://segment.com/docs/connections/spec/group/) will create Group Profile/Group Profile Properties in Mixpanel. Mixpanel uses the key specified in the second argument of the group method.
![3groupcall (5)](https://github.com/mixpanel/docs/assets/97630035/704ef559-65ec-4958-bc72-b997e0dbcf31)

Example Group Profile/Group Profile Properties created from the group method:
![4groupprofile](https://github.com/mixpanel/docs/assets/97630035/b8b7ab18-4c65-4dff-965a-d532ae49cffc)

### 3. Add Group Key as a User Profile Property
In order to use Group Profile Properties when analyzing User Profiles, the user profile must have the Group Key/Group ID Value as a profile property.

Declare the Group Key in the identify method as a profile property (trait):
![5identify](https://github.com/mixpanel/docs/assets/97630035/41cc54c4-2e52-4e77-833d-cc178d1fb107)

### 4. Add Group Key as an Event Property to Events
In order to connect events to a Group, the event must have the Group Key/Group ID Value as an event property.

If you are using [Segment Device Mode](https://segment.com/docs/connections/destinations/catalog/mixpanel/#group-using-device-mode):

* Declare the Group Key as a [Super Property](https://segment.com/docs/connections/destinations/catalog/mixpanel/#register-super-properties) so that the Group Key is sent in as an Event Property to client-side events.
* By default, all traits specified in the identify call will be registered as super properties. This means if you have the [“Automatically set all Traits as Super Properties and People Properties”](https://segment.com/docs/connections/destinations/catalog/mixpanel/#settings) setting turned on, all traits specified in the identify call will be added as both a super property and profile property for the user.

If you are using [Segment Cloud Mode](https://segment.com/docs/connections/destinations/catalog/mixpanel/#group-using-cloud-mode):

* The Group Key must be explicitly declared as an event property on every event track call in order for the event to be compatible with Group Analytics.
![6trackcall](https://github.com/mixpanel/docs/assets/97630035/9609917d-f00b-4450-a9d5-7d77bd338f9d)

## Debugging
For debugging purposes, it can be useful to see exactly what Segment is sending to Mixpanel. You can validate this data through the [Segment Source Debugger](https://segment.com/docs/connections/sources/debugger/). In the Segment Source Debugger, you can select the event you are looking to validate:
<img width="1080" alt="yGK1yH7zGy_cv5hLBEHgdU9oMyALishD6S0kObRRJANGxbjIEL" src="https://github.com/mixpanel/docs/assets/97630035/6ee0bbcd-8bf2-4f86-83a7-b0a3c39108e4">

Click the “Validate” button in the top right corner and choose “Mixpanel” as the destination. After the event has been sent, you can click to view the request from Segment to grab the data payload:
![pasted image 0 (1)](https://github.com/mixpanel/docs/assets/97630035/0344decc-dc96-4569-ac3d-cc530c63bdb3)

You can then copy the data payload and decode it in a [base64 decoder](https://www.base64decode.org/) to see the JSON event that was sent to Mixpanel.

## FAQ
### I can’t see my Segment data in Mixpanel
This could be due to several reasons:
* Storing data in the EU: A common issue is that the data in Segment is enabled to be sent to an EU endpoint but the Mixpanel data is still being stored outside of the EU. Both endpoints for Segment and Mixpanel need to point to the EU as described [here](https://segment.com/docs/connections/destinations/catalog/mixpanel/#enable-european-union-endpoint). If you have an existing Mixpanel project, you might need to have your data migrated to the EU. Please find further information [here](https://docs.mixpanel.com/docs/privacy/eu-residency#existing-customers).

* [Cloud implementation vs. device implementation](https://segment.com/docs/connections/destinations/#connection-modes): Segment can be implemented via a cloud-based implementation or as an SDK on the device directly. Device implementation will send the data to Mixpanel directly while the cloud implementation will send it to Segment first. You can confirm your implementation by querying for the Mixpanel library property of the events in your project:

Cloud Mode will show as Mixpanel Library: Segment: analytics.js
Device Mode will show as Mixpanel Library: Segment: web

* No user profile data in Mixpanel: [Segment doesn’t track Mixpanel People by default;](https://segment.com/docs/connections/destinations/catalog/mixpanel/#people) this is a setting you need to enable in your Segment settings. To enable Mixpanel People, change the “Use Mixpanel People” setting in your Segment Settings UI.

### I see events counted multiple times in Mixpanel
Mixpanel SDKs assign an [$insert_id](https://developer.mixpanel.com/reference/import-events#propertiesinsert_id) to each tracked event.

This allows Mixpanel to ensure no event is tracked more than once and events will be deduplicated based on the insert_id. Segment does not assign an insert_id to events. If the ingestion of an event is not confirmed by Mixpanel’s servers fast enough, Segment will retry to send the event.

This can lead to duplicate events in Mixpanel, they will likely have different insert_ids as Mixpanel assigns each event without an insert_id a unique new one. This behavior can be caused by sending huge batches of data at the same time and can be avoided by reducing the batch size and frequency of event sending from Segment to Mixpanel.

### Register super properties with Mixpanel
Super properties can only be set when you are running in device mode. The super properties are automatically set with every property you pass into the analytics.identify() method. To have more control over the super properties you set, you can explicitly set super properties in your [Segment settings](https://segment.com/docs/connections/destinations/catalog/mixpanel/#explicitly-set-people-properties-and-super-properties).

### Page tracks from Segment to Mixpanel
Page calls are automatically tracked via Segment. These can be tracked from Segment to Mixpanel as Loaded a Page or Loaded a Screen. To turn them off, you need to [configure this in your Segment settings](https://segment.com/docs/connections/destinations/catalog/mixpanel/#page).

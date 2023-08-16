# Lookup Tables


This guide covers Lookup Tables and how to use them effectively. Lookup Tables are optional; if you're new to Mixpanel, we recommend starting with our guide on [Events and Properties](/docs/tracking/how-tos/events-and-properties).

## Overview

Lookup Tables let you enrich your Mixpanel events with attributes about other entities.
* If you have a database background, lookup tables are like dimension tables or join tables.
* If you have an Excel background, Lookup Tables are like VLOOKUP. 

Let's say you're building a media product, and you track a `Song Played` event, which contains a `song_id` property. 

| event_name  | time                | user_id  | song_id |
|-------------|---------------------|----------|---------|
| Song Played | 2023-05-18T09:00:00 | user123  | c994bb  |
| Song Played | 2023-05-18T10:15:00 | user456  | d8d949  |
| Song Played | 2023-05-18T11:30:00 | user789  | a43fb8  |


You want to filter and breakdown this event by other attributes of the song, like `artist` and `genre`, which are not tracked as properties. Lookup Tables let you upload a CSV of data about songs like this and map it to the `song_id` property:

| song_id| artist      | genre   | is_platinum | name          | release_date         
|--------|-------------|---------|-------------|---------------|----------------------
| c994bb | Drake       | Pop     | True        | Hotline Bling | 2015-10-18T22:00:00  
| d8d949 | Gipsy Kings | Flamenco| False       | Bamboleo      | 1987-07-12T05:00:00  
| a43fb8 | Daft Punk   | House   | False       | Aerodynamic   | 2001-03-12T07:30:00  


Then, whenever you use an event with the `song_id` property, you'll have access to all these other properties of the song as well. Under the hood, Mixpanel joins the two tables like so:

| event_name | time                 | user_id  | song_id | Artist      | Genre   | is_platinum | Name         | Release_date          |
|------------|----------------------|----------|--------|-------------|---------|-------------|---------------|-----------------------|
| Song Played | 2023-05-18T09:00:00 | user123  | c994bb | Drake       | Pop     | True        | Hotline Bling | 2015-10-18T22:00:00   |
| Song Played | 2023-05-18T10:15:00 | user456  | d8d949 | Gipsy Kings | Flamenco| False       | Bamboleo      | 1987-07-12T05:00:00   |
| Song Played | 2023-05-18T11:30:00 | user789  | a43fb8 | Daft Punk   | House   | False       | Aerodynamic   | 2001-03-12T07:30:00   |

The benefit is that you don't need to change your event tracking code at all. You can upload this Lookup Table after the fact and it automatically joins onto all prior events.

We also provide an [API](https://developer.mixpanel.com/reference/replace-lookup-table) to keep Lookup Tables synced on a recurring basis.

DISCLAIMER: Only Project Owners and Admins can create permanent lookup tables mappings. Analysts and Consumers can only create temporary mappings.

## Use Cases

### Media
One good use case for Lookup Tables is to load metadata about your content (songs, podcasts, articles) into Mixpanel. If you track some content identifier (eg: song_id, podcast_id, article_id) as a property on your events, you can then upload a Lookup Table with other properties of that content, like name, category, author, or creation date. You can then use any of those properties on any events that have the ID properties.

### E-Commerce
If you sell products online, can load your product catalog into Mixpanel as a Lookup Table. As long as you track a product_id or sku_id property on your events, you'll be able to enrich those events with other properties about those products, like their name, category, and price.

### B2B
If you have a B2B product, you likely have some key entities that are specific to your product. For example, Github has repositories, Figma has design components, Slack has channels. If they track repository_id, component_id, or channel_id as properties on their events, they can use Lookup Tables to enrich those events with information about those repositories, components, and channels.

## How do I upload a Lookup Table?
Lookup Tables are accessible via Lexicon. Go to Lexicon > Import > Lookup Table, and upload a CSV in the format of the example above, and map it to an event property which is the ID that the Lookup Table should join with. Mixpanel will assume the first column of the CSV is the ID and will join it with that ID.

Lookup Tables can be replaced with a fresh copy, either via our UI or via our API.


## FAQ

### How should my Lookup Table CSV be formatted?
The CSV must be valid according to RFC4180. See our [API reference](https://developer.mixpanel.com/reference/replace-lookup-table) for more specific details about how we parse CSVs.

### When _shouldn't_ I use Lookup Tables?
Lookup Tables have a limit of 100MB CSV or roughly 1M rows. We don't recommend using Lookup Tables for anything very high cardinality.
* Don't use Lookup Tables when the ID is a User ID. Instead use [User Profiles](/docs/tracking/how-tos/user-profiles). Mixpanel is more optimized for User Profiles, so they don't have any scale limits and support more opinionated workflows in our product (like clicking into a report and seeing the list of User Profiles).
* Don't use Lookup Tables as a way to mutate events. For example, it might be tempting to have an Orders lookup table, with 1 row per Order that a customer makes. Then, you can update the Orders table whenever an order is mutated (eg: when you issue a refund). This approach will quickly run into the 100MB scale limit and will make it difficult to do the analysis you need. Instead, we recommend modeling state changes as events, which doesn't have scale limits and preserves the history of state changes. Track an `Order Completed` event and an `Order Refunded` or `Order Modified` event. You can then use our funnels report to answer questions like: "what % of orders were refunded?"

### Who has access? 

All users will be able to upload and map a lookup table to an existing property temporarily from within a report, but only users with "Admin" or "Owner" roles will be able to make the mapping persistent in Lexicon for other users in the project to use.

Customers on the Free plan will be able to temporarily map a property to a lookup table, but not have the option of persisting the mapping.

Project Owners can delete any table in a project, and Admins can only delete their own.
 
Consumers and Analysts cannot delete lookup tables even if they own them.

### Can each Mixpanel property (join key) only be mapped to one lookup table?

Yes. One Mixpanel property can only map to ONE lookup table.

### Can multiple properties map to the same lookup table?

Yes. For example, first_trip_city_id and last_trip_city_id can both map to the City lookup table, but one Mixpanel property cannot map to multiple lookup tables (if first_trip_city_id is mapped to "City" lookup table, it can't also map to "Region" lookup table, before unmapping from the "City" lookup table.)




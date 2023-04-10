---
title: "Lookup Tables"
slug: "doc-lookup-tables"
hidden: false
---

This guide covers Lookup Tables and how to use them effectively. Lookup Tables are optional; if you're new to Mixpanel, we recommend starting with our guide on [Events and Properties](doc:events-properties).

# Overview

Lookup Tables let you enrich your Mixpanel events with attributes about other entities.
* If you have a database background, lookup tables are like dimension tables or join tables.
* If you have an Excel background, Lookup Tables are like VLOOKUP. 

Let's say you're building a media product, and you track a `Song Played` event, which contains a `song_id` property. You want to filter and breakdown this event by other attributes of the song, like `artist` and `genre`, which are not tracked as properties.

Lookup Tables let you upload a CSV of data about songs like this and map it to the `song_id` property:
```csv
id,artist,genre,is_platinum,name,num_listens,release_date,is_top_40,countries
c994bb,Drake,Pop,True,Hotline Bling,1700000000,2015-10-18T22:00:00,true,[]
d8d949,Gipsy Kings,Flamenco,False,Bamboleo,1170000,1987-07-12T05:00:00,false,"[""US"",""CA""]"
a43fb8,Daft Punk,House,False,Aerodynamic,41000000,2001-03-12T07:30:00,false,"[""IN""]"
```

Then, whenever you use an event with the `song_id` property, you'll have access to all these other properties of the song as well. We also provide an [API](ref:replace-lookup-table) to keep Lookup Tables updated.

# Use Cases

### Media
One good use case for Lookup Tables is to load metadata about your content (songs, podcasts, articles) into Mixpanel. If you track some content identifier (eg: song_id, podcast_id, article_id) as a property on your events, you can then upload a Lookup Table with other properties of that content, like name, category, author, or creation date. You can then use any of those properties on any events that have the ID properties.

### E-Commerce
If you sell products online, can load your product catalog into Mixpanel as a Lookup Table. As long as you track a product_id or sku_id property on your events, you'll be able to enrich those events with other properties about those products, like their name, category, and price.

### B2B
If you have a B2B product, you likely have some key entities that are specific to your product. For example, Github has repositories, Figma has design components, Slack has channels. If they track repository_id, component_id, or channel_id as properties on their events, they can use Lookup Tables to enrich those events with information about those repositories, components, and channels.

# How do I upload a Lookup Table?
Lookup Tables are accessible via Lexicon. Go to Lexicon > Import > Lookup Table, and upload a CSV in the format of the example above, and map it to an event property which is the ID that the Lookup Table should join with. Mixpanel will assume the first column of the CSV is the ID and will join it with that ID.

Lookup Tables can be replaced with a fresh copy, either via our UI or via our API.


# FAQ

### How should my Lookup Table CSV be formatted?
The CSV must be valid according to RFC4180. See our [API reference](ref:replace-lookup-table) for more specific details about how we parse CSVs.

### When _shouldn't_ I use Lookup Tables?
Lookup Tables have a limit of 100MB CSV or roughly 1M rows. We don't recommend using Lookup Tables for anything very high cardinality.
* Don't use Lookup Tables when the ID is a User ID. Instead use [User Profiles](doc:users-groups). Mixpanel is more optimized for User Profiles, so they don't have any scale limits and support more opinionated workflows in our product (like clicking into a report and seeing the list of User Profiles).
* Don't use Lookup Tables as a way to mutate events. For example, it might be tempting to have an Orders lookup table, with 1 row per Order that a customer makes. Then, you can update the Orders table whenever an order is mutated (eg: when you issue a refund). This approach will quickly run into the 100MB scale limit and will make it difficult to do the analysis you need. Instead, we recommend modeling state changes as events, which doesn't have scale limits and preserves the history of state changes. Track an `Order Completed` event and an `Order Refunded` or `Order Modified` event. You can then use our funnels report to answer questions like: "what % of orders were refunded?"

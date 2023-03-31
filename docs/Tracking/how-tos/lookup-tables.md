---
title: "Lookup Tables"
slug: "doc-lookup-tables"
hidden: false
metadata:
  title: "Lookup Tables"
  description: "Learn about Lookup Tables."
---

In this guide, we walk through what Lookup Tables are and when/how to use them effectively. Lookup Tables are optional; if you're new to Mixpanel, we recommend starting with our guide on [Events and Properties](doc:events-properties).

# Overview

Lookup Tables let you enrich your Mixpanel events with attributes about other entities.
* If you're coming from databases, lookup tables are like dimension tables or join tables.
* If you're coming from Excel, Lookup Tables are like VLOOKUP.

Let's say you're a media company, and you track a `Song Played` event, which contains the `song_id` property. You want to filter and breakdown this event by other attributes of the song, like `artist` and `genre`, which are not tracked as properties.

Lookup Tables let you upload a CSV like this and map it to the `song_id` property:
```csv
id,artist,genre,is_platinum,name,num_listens,release_date,is_top_40,countries
c994bb,Drake,Pop,True,Hotline Bling,1700000000,2015-10-18T22:00:00,true,[]
d8d949,Gipsy Kings,Flamenco,False,Bamboleo,1170000,1987-07-12T05:00:00,false,"[""US"",""CA""]"
a43fb8,Daft Punk,House,False,Aerodynamic,41000000,2001-03-12T07:30:00,false,"[""IN""]"
```

Now, whenever you use an event with the song_id property, you'll have access to all the other properties of the song as well. We also provide an [API](ref:replace-lookup-table) so that you can keep this Lookup Table in sync from your source of truth.

# Use Cases

### Media
One good use case for Lookup Tables is to load metadata about your content (songs, podcasts, articles) into Mixpanel. If you track some sort of content identifier (eg: song_id, podcast_id, article_id) as a property on your events, you can then upload a Lookup Table with other properties of that content, like the name, category, author, or creation date. You can then use any of those properties on any events that have the ID properties.

### E-Commerce
You can also leverage Lookup Tables if you sell products online. You can load your product catalog into as a Lookup Table. If you track a product_id as a property on your events, you can then enrich that event with other properties about those products, like their name, category, and price.

### B2B
If you run a B2B business, you usually have some set of entities relevant to your service. For example, Github has repositories, Figma has design components, Slack has channels. They might have repository_id, or component_id, or channel_id as properties on your events and use Lookup Tables to enrich those events with information about those repositories, components, and channels.

# How do I upload a Lookup Table?
Lookup Tables are accessible via Lexicon. Go to Lexicon > Import > Lookup Table, paste in a CSV in the format of the example above, and map it to an event property which is the ID that the Lookup Table should join with. Mixpanel will join assume the first column of the CSV is the ID and will join it with that ID.

Lookup Tables can be updated -- simply reupload an exisitng Lookup Table from the UI. Lookup Tables, once they're created in the UI, can also be updated via our API.


# FAQ

### How should my Lookup Table CSV be formatted?
The CSV must be valid according to RFC4180. See our [API reference](ref:replace-lookup-table) for more specific details about how we parse CSVs.

### When _shouldn't_ I use Lookup Tables?
Lookup Tables have a limit of 100MB CSV or roughly 1M rows. We don't recommend using Lookup Tables for anything very high cardinality.
* Don't use Lookup Tables when the ID is a User ID. Instead use [User Profiles](doc:users-groups). Mixpanel is more optimized for User Profiles, so they don't have any scale limits and support more opinionated workflows in our product (like clicking into a report and seeing the list of User Profiles).
* Don't use Lookup Tables as a way to mutate events. For example, using it to update an "Order Completed" event in case the order is refunded. A better solution for that use case is to track two events ("Order Completed" and "Order Refunded"). This doesn't have limits on scale and is lossless (you don't lose information about the original order completion).

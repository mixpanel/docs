# Lookup Tables: enrich ingested data using a CSV


This guide covers Lookup Tables and how to use them effectively. Lookup Tables are optional; if you're new to Mixpanel, we recommend starting with our guide on [Events and Properties](/docs/data-structure/events-and-properties).

## Overview

Lookup Tables let you enrich your Mixpanel properties ([event properties](/docs/data-structure/events-and-properties) or [user profile properties](/docs/data-structure/user-profiles)) with additional attributes or metadata about these properties.
* If you have a database background, lookup tables are like dimension tables or join tables.
* If you have an Excel / Google Sheets background, Lookup Tables are like VLOOKUP. 

Let's say you're building a media product, and you track a `Song Played` event, which contains a `song_id` property. 

| event_name  | time                | user_id  | song_id |
|-------------|---------------------|----------|---------|
| Song Played | 2023-05-18T09:00:00 | user123  | c994bb  |
| Song Played | 2023-05-18T10:15:00 | user456  | d8d949  |
| Song Played | 2023-05-18T11:30:00 | user789  | a43fb8  |


You want to filter and breakdown this event by other attributes of the song, like `artist` and `genre`, which are not tracked as properties. Lookup Tables let you upload a CSV of data about songs like the table below and map it to the `song_id` property:

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

The benefit is that you don't need to change your tracking code at all. You can upload this Lookup Table after the fact and it automatically joins onto all prior events or user profiles with the mapped property.

We also provide an [API](https://developer.mixpanel.com/reference/replace-lookup-table) and [Warehouse Connectors](/docs/tracking-methods/data-warehouse#lookup-tables) to keep Lookup Tables synced on a recurring basis.

## Use Cases

### Media
One possible use case for Lookup Tables is to load metadata about your content (songs, podcasts, articles) into Mixpanel. If you track some content identifier (eg: song_id, podcast_id, article_id) as a property on your events, you can then upload a Lookup Table with other properties of that content, like name, category, author, or creation date. You can then use any of those properties on any events that have the ID properties.

### E-Commerce
If you sell products online, you can load your product catalog into Mixpanel as a Lookup Table. As long as you track a product_id or sku_id property on your events, you'll be able to enrich those events with other properties about those products, like their name, category, and price.

### B2B
If you have a B2B product, you likely have some key entities that are specific to your product. For example, Github has repositories, Figma has design components, Slack has channels. If they track repository_id, component_id, or channel_id as properties on their events, they can use Lookup Tables to enrich those events with information about those repositories, components, and channels.

In general, it is still best to have metadata that don't change over time, and you analyse often, to be tracked as event or user properties. Do refer to the FAQ section on [When shouldn't I use Lookup Tables?](/docs/data-structure/lookup-tables#when-shouldnt-i-use-lookup-tables)

## How do I upload a Lookup Table?

> Note: Only Project Owners and Admins can create global lookup tables mappings. Analysts and Consumers can only create local mappings within reports.

### Globally using Lexicon
Lookup Tables are accessible via Lexicon. Go to **Lexicon > Import > Lookup Table** to upload a CSV file or manage existing lookup tables.

![image](/lexicon-lookup-table.png "Lexicon Lookup Tables")

Here's an example of what a CSV file should look like
- The first row is the header and will serve as names for the lookup table properties for each column. Header names must be unique. The first columnn's header is unimportant and can be any text.
- The first column's value will be use to join to the property you map to (i.e. song_id). Values in this column must be unique.
```
song_id,artist,genre,is_platinum,name,release_date
c994bb,Drake,Pop,True,Hotline Bling,2015-10-18T22:00:00Z
d8d949,Gipsy Kings,Flamenco,False,Bamboleo,1987-07-12T05:00:00Z
a43fb8,Daft Punk,House,False,Aerodynamic,2001-03-12T07:30:00Z
```

Once you have uploaded the CSV file for the lookup table, map it to an event or user profile property, which is the ID (e.g. song_id) that the lookup table should join with. Mixpanel will assume the first column of the CSV is the ID and will join it with that property.

![image](/lexicon-import-lookup-table.png "Lexicon Import Lookup Table Modal")

### Locally within a Report
You can also upload Lookup Tables straight from your reports. Lookup tables uploaded directly in reports create a local mapping that can only be used while you are in the report. This mapping is not global, and can't be used in other reports. 

![image](/map-ephemeral-lookup-table.png "Ephemeral Lookup Tables")

![image](/create-ephemeral-lookup-table-modal.png "Ephemeral Lookup Table Modal")

This feature can be useful if you need to have the lookup table mapping only for a specific report or if you wish to override an existing globally mapped lookup table for a property within a report.

Lookup Tables can be replaced with a fresh copy, either via our UI, [API](https://developer.mixpanel.com/reference/replace-lookup-table), or [Warehouse Connectors](/docs/tracking-methods/data-warehouse#lookup-tables).

## How do I use a Lookup Table?

Once a lookup table is mapped, you can access if by simply clicking on the mapped property and it will expand the columns from the lookup table as if they are nested properties. Lookup table property names are derive from the header (1st row) in the CSV file; these labels cannot be renamed (i.e. using a Lexicon Display Name) within the Mixpanel UI.

![image](/lookup-table-properties.png "Lookup Tables Properties")

These nested properties can be used like any normal property in reports as filters or breakdowns or even in [custom properties](/docs/features/custom-properties).

![image](/lookup-table-insights.png "Lookup Table in Insights")

## FAQ

### How should my Lookup Table CSV be formatted?
The CSV must be valid according to [RFC4180](https://datatracker.ietf.org/doc/html/rfc4180). See our [API reference](https://developer.mixpanel.com/reference/replace-lookup-table) for more specific details about how we parse CSVs. Lookup tables do not support [Objects and List of Objects](https://docs-git-kurbycchua-lookup-table-updates-mixpanel.vercel.app/docs/data-structure/property-reference#object-and-list-of-objects-data-types) data types.

### When shouldn't I use Lookup Tables?
Lookup Tables have a limit of **100MB** per CSV file or roughly 1M rows. You can use multiple lookup tables in your projects, but the total count of rows has to be less than **5 million rows** across all uploaded CSVs. We don't recommend using Lookup Tables for anything with very high cardinality IDs. For properties with high cardinal IDs, we recommend that you track the metadata as event properties.

* Don't use Lookup Tables when the ID is a User ID. Instead use [User Profiles](/docs/data-structure/user-profiles). Mixpanel is more optimized for User Profiles, so they don't have any scale limits and support more opinionated workflows in our product (like clicking into a report and seeing the list of User Profiles).
* Don't use Lookup Tables as a way to mutate events. For example, it might be tempting to have an Orders lookup table, with 1 row per Order that a customer makes. Then, you can update the Orders table whenever an order is mutated (eg: when you issue a refund). This approach will quickly run into the 100MB scale limit and will make it difficult to do the analysis you need. Instead, we recommend modeling state changes as events, which doesn't have scale limits and preserves the history of state changes. Track an `Order Completed` event and an `Order Refunded` or `Order Modified` event. You can then use our funnels report to answer questions like: "what % of orders were refunded?"

A good use case for Lookup Tables are for mapping metadata that changes over time, since lookup tables can be replaced via the Mixpanel UI or programatically via [API](https://developer.mixpanel.com/reference/replace-lookup-table) or [Warehouse Connectors](/docs/tracking-methods/data-warehouse#lookup-tables), and changes are retroactive. A currency exchange rate table mapped to `Order Currency` property which can be used to convert `Order Amount`; or a region territory grouping table mapped to `Country` are good examples.

### Who has access? 

All users will be able to upload and map a lookup table to an existing property locally from within a report. Only users with "Admin" or "Owner" roles will be able to make the mapping persistent in Lexicon for other users in the project to use.

Project Owners can delete any lookup table in a project while Admins can only delete their own. Consumers and Analysts cannot delete lookup tables even if they own them.

Customers on the Free plan will be able to locally map a property to a lookup table, but not have the option of persisting the mapping.

### Can each Mixpanel property (join key) only be mapped to one lookup table?

Yes. A Mixpanel property can only be mapped to one lookup table in Lexicon. However, should you need to map different lookup tables for the same property, you can opt for either one of these approach:

1. Locally map your lookup table to the property within the report. This option allows you to have multiple local lookup tables across different reports, where their context and usage are only relevant to these reports.
2. Create multiple custom properties that contain the property you want to map to. Then map the different lookup tables to each custom property in Lexicon. This option allows you to map different groups of values of the same property (using some custom property logic) to different lookup tables. Since this would be a global mapping, other Mixpanel users in your project can also re-use these lookup tables via the custom properties.

Do note that the [limits](/docs/data-structure/lookup-tables#when-shouldnt--i-use-lookup-tables) of **100MB** per CSV and **5 million rows** still applies for both approach.

### Can multiple properties map to the same lookup table?

Yes. For example, first_trip_city_id and last_trip_city_id can both map to the "City" lookup table, but one Mixpanel property cannot map to multiple lookup tables (e.g. if first_trip_city_id is already mapped to "City" lookup table, it cannot be map to "Region" lookup table, before unmapping it from the "City" lookup table).

### Where can I find the "id" of the lookup table for API's Path Params?

When replacing a lookup table using the [API](https://developer.mixpanel.com/reference/replace-lookup-table), you would need to pass the lookup table's ID as part of the URL in the API call. This `id` can be found in Lexicon under the Lookup Table's Details. See below screenshot as example:

![image](/lookup-table-id.png "Lookup Table ID")

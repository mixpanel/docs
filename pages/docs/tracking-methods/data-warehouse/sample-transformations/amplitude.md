## Amplitude
Use the following SQL query to transform your Amplitude data into individual columns that will be mapped as properties on your events when setting up your warehouse sync: 
```jsx
SELECT
-- required fields
event_type,          -- to map Event Name
event_time,          -- to map Event Time

-- to map Insert ID
TO_HEX(SHA1(CONCAT(
      CONCAT('[amp] ', event_type),
      COALESCE(user_id, ""), 
      "-",
      CAST(event_time as STRING),
      "-",
      COALESCE(CAST(amplitude_id as STRING), "")
))) AS insert_id,

-- ID management
user_id,         -- to map User ID
amplitude_id,    -- to map Distinct ID
device_id,       -- to map Device ID

-- event properties
JSON_EXTRACT_SCALAR(event_properties, "$['artist']") AS artist,
JSON_EXTRACT_SCALAR(event_properties, "$['genre']") AS genre,
JSON_EXTRACT_SCALAR(event_properties, "$['song_title']") AS song_title,
JSON_EXTRACT_SCALAR(event_properties, "$['song_name']") AS song_name,
JSON_EXTRACT_SCALAR(event_properties, "$['page_name']") AS page_name,

-- user properties as event properties
JSON_EXTRACT_SCALAR(user_properties, "$['$email']") AS email,
JSON_EXTRACT_SCALAR(user_properties, "$['$name']") AS name,
JSON_EXTRACT_SCALAR(user_properties, "$['last_genre']") AS last_genre,
JSON_EXTRACT_SCALAR(user_properties, "$['lifetime_purchase']") AS lifetime_purchase

FROM `project.dataset.tablename`
```

#!/bin/bash

# Find new image links added to markdown files
image_links=$(git diff-tree --no-commit-id --name-only -r HEAD -- '*.md*' | xargs grep -Eo '(!\[.*\]\(([^)]+)\)|<img[^>]*src="([^"]+)")' | grep 'http' | sed -n -E 's/.*\(([^)]+)\)|.*src="([^"]+)".*/\1\2/p')

# Download images to public directory and replace links
for link in $image_links; do
  # Extract the image file name
  image_name=$(basename "$link")

  # Download the image to the public directory
  wget -q -O "public/$image_name" "$link"

  # Replace the image link with the relative link in markdown files
  sed -i '' -E "s|$link|/$image_name|g" $(git grep -l "$link" -- '*.md*')
done

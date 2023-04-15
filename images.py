import os
import re
import requests
import sys

markdown_file = sys.argv[1]

# Create the public directory if it doesn't exist
os.makedirs('public', exist_ok=True)

# Extract all image URLs using regex
with open(markdown_file, 'r') as file:
    content = file.read()
    image_urls = re.findall(r'!\[.*?\]\((.*?)\)', content)

# Download and save each image in the public folder
for url in image_urls:
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Extract the image filename from the URL
        filename = os.path.basename(url)

        # Save the image in the public folder
        with open(f'public/{filename}', 'wb') as img_file:
            img_file.write(response.content)

        content = content.replace(url, f'/{filename}')

    else:
        print(f'Error downloading image {url}: {response.status_code}')

with open(markdown_file, 'w') as updated_file:
    updated_file.write(content)

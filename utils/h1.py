import os
from pathlib import Path
import re
from markdown import markdown

# Function to add an H1 heading to a markdown file
def add_heading_to_md(file_path, heading):
    with open(file_path, 'r+') as file:
        content = file.read()
        file.seek(0, 0)
        file.write('# ' + heading + '\n\n' + content)

# Function to remove all comments at the top of a markdown file
def remove_comments_from_md(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    with open(file_path, 'w') as file:
        in_comment = False
        for line in lines:
            if line.strip() == '---':
                in_comment = not in_comment
                continue

            if not in_comment:
                file.write(line)

# Recursively traverse the directory
def traverse_dir(directory):
    for item in Path(directory).iterdir():
        if item.is_dir():
            traverse_dir(item)
        else:
            # Only work with markdown files
            if item.suffix in ['.md', '.mdx']:
                # Remove heading from file
                remove_comments_from_md(item)

                # Convert filename to Title Case (removing the .md suffix)
                title = item.stem.replace('-', ' ').replace('_', ' ').title()

                # Add the title as a H1 heading to the markdown file
                add_heading_to_md(item, title)

# Start the script in the current directory
traverse_dir('./pages/docs/')

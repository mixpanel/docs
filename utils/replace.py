import sys
import re

# Read the content of the markdown file
with open(sys.argv[1], 'r') as file:
    content = file.read()

updated_content = re.sub(r'\(/(\d+)\)', r'(/\1.png)', content)

with open(sys.argv[1], 'w') as updated_file:
    updated_file.write(updated_content)

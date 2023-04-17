import os
import re
import yaml

def extract_title_and_remove_frontmatter(content):
    yaml_pattern = re.compile(r'^---\s*\n(.*?)^---\s*\n', re.DOTALL | re.MULTILINE)
    yaml_match = yaml_pattern.search(content)

    if yaml_match:
        frontmatter_str = yaml_match.group(1)
        try:
            frontmatter = yaml.safe_load(frontmatter_str)
            title = frontmatter.get('title', 'Untitled')
        except yaml.YAMLError:
            title = 'Untitled'

        content_no_frontmatter = yaml_pattern.sub('', content)
    else:
        title = 'Untitled'
        content_no_frontmatter = content

    return title, content_no_frontmatter

def main():
    directory = '.'
    output_file = 'changelogs.mdx'

    # Ensure the output file does not already exist
    if os.path.isfile(output_file):
        os.remove(output_file)

    # Walk through the directory and find markdown files
    md_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md') or file.endswith('.markdown'):
                md_files.append(os.path.join(root, file))

    # Sort markdown files in lexicographic descending order
    md_files.sort(reverse=True)

    # Concatenate markdown files into a single output file
    with open(output_file, 'a') as output:
        for md_file in md_files:
            with open(md_file, 'r') as file:
                content = file.read()
                title, content_no_frontmatter = extract_title_and_remove_frontmatter(content)
                heading = f'## {title}\n\n'
                output.write(heading + content_no_frontmatter + '\n\n')

if __name__ == '__main__':
    main()


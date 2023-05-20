import os
import re
import yaml

def extract_yaml_frontmatter(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Regular expression to extract YAML frontmatter
    pattern = re.compile(r'^---\n(.*?)\n---', re.DOTALL)
    matches = pattern.findall(content)
    return matches[0] if matches else None

def add_excerpt_to_markdown(filename, excerpt):
    with open(filename, 'a') as f:
        f.write(f"{excerpt}")

def main():
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                frontmatter = extract_yaml_frontmatter(file_path)
                if frontmatter:
                    parsed_yaml = yaml.safe_load(frontmatter)
                    excerpt = parsed_yaml.get('excerpt')
                    if excerpt:
                        add_excerpt_to_markdown(file_path, excerpt)

if __name__ == "__main__":
    main()

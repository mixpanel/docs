import argparse
import os
import re

def replace_in_file(file_path, search_str, replace_str):
    with open(file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()

    replaced_content = file_content.replace(search_str, replace_str)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(replaced_content)

def process_files_in_dir(directory, search_str, replace_str):
    for root, dirs, files in os.walk(directory):
        for file_name in files:
            if file_name.endswith('.md'):
                file_path = os.path.join(root, file_name)
                replace_in_file(file_path, search_str, replace_str)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Replace string in Markdown files.')
    parser.add_argument('search_str', help='The string to search for.')
    parser.add_argument('replace_str', help='The string to replace the search string with.')

    args = parser.parse_args()
    search_str = args.search_str
    replace_str = args.replace_str

    process_files_in_dir('./pages/docs', search_str, replace_str)

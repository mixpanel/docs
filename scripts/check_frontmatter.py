#!/usr/bin/env python3
"""
CI gate: every MDX page must have a 'title' field in its YAML front-matter.

Directories that are intentionally excluded from the check:
  - snippets/   (reusable MDX components, not standalone pages)
  - links/      (external-link stubs that use 'url' instead of a body)
  - openapi/    (OpenAPI spec files, not MDX pages)
"""

import re
import sys
import glob
import os

EXCLUDED_DIRS = {"snippets", "links", "openapi"}

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---", re.DOTALL)


def check_file(path: str) -> list[str]:
    errors = []
    with open(path, encoding="utf-8") as fh:
        content = fh.read()

    m = FRONTMATTER_RE.match(content)
    if not m:
        errors.append(f"{path}: missing front-matter block")
        return errors

    fm = m.group(1)
    title_match = re.search(r"^\s*title\s*:\s*(.*)$", fm, re.MULTILINE)
    if not title_match:
        errors.append(f"{path}: front-matter is missing required 'title' field")
    elif not title_match.group(1).strip().strip("\"'"):
        errors.append(f"{path}: front-matter 'title' is empty")

    return errors


def is_excluded(path: str) -> bool:
    parts = path.replace(os.sep, "/").split("/")
    return any(part in EXCLUDED_DIRS for part in parts)


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    mdx_files = glob.glob(os.path.join(root, "**", "*.mdx"), recursive=True)

    checked = 0
    all_errors: list[str] = []
    for path in sorted(mdx_files):
        rel = os.path.relpath(path, root)
        if is_excluded(rel):
            continue
        all_errors.extend(check_file(path))
        checked += 1

    if all_errors:
        print("Frontmatter check FAILED:")
        for err in all_errors:
            print(f"  {err}")
        return 1

    print(f"Frontmatter check PASSED ({checked} files checked).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

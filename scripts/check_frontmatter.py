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


def check_file(path: str, display: str) -> tuple[list[str], str | None]:
    """Return (errors, title). Title is None when absent or empty."""
    errors = []
    with open(path, encoding="utf-8") as fh:
        content = fh.read()

    m = FRONTMATTER_RE.match(content)
    if not m:
        errors.append(f"{display}: missing front-matter block")
        return errors, None

    fm = m.group(1)
    title = None
    title_match = re.search(r"^\s*title\s*:\s*(.*)$", fm, re.MULTILINE)
    if not title_match:
        errors.append(f"{display}: front-matter is missing required 'title' field")
    else:
        title = title_match.group(1).strip().strip("\"'")
        if not title:
            errors.append(f"{display}: front-matter 'title' is empty")
            title = None

    # A description is what search results and llms.txt entries render, so a
    # page without one is invisible to both.
    desc_match = re.search(r"^\s*description\s*:\s*(.*)$", fm, re.MULTILINE)
    if not desc_match:
        errors.append(f"{display}: front-matter is missing required 'description' field")
    elif not desc_match.group(1).strip().strip("\"'"):
        errors.append(f"{display}: front-matter 'description' is empty")

    return errors, title


def is_excluded(path: str) -> bool:
    parts = path.replace(os.sep, "/").split("/")
    return any(part in EXCLUDED_DIRS for part in parts)


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    mdx_files = glob.glob(os.path.join(root, "**", "*.mdx"), recursive=True)

    checked = 0
    all_errors: list[str] = []
    titles: dict[str, list[str]] = {}
    for path in sorted(mdx_files):
        rel = os.path.relpath(path, root)
        if is_excluded(rel):
            continue
        errors, title = check_file(path, rel)
        all_errors.extend(errors)
        if title:
            titles.setdefault(title, []).append(rel)
        checked += 1

    # Two pages sharing a rendered title are indistinguishable in search
    # results and to answer engines.
    for title, pages in sorted(titles.items()):
        if len(pages) > 1:
            joined = ", ".join(sorted(pages))
            all_errors.append(f'duplicate title "{title}" on {len(pages)} pages: {joined}')

    if all_errors:
        print("Frontmatter check FAILED:")
        for err in all_errors:
            print(f"  {err}")
        return 1

    print(f"Frontmatter check PASSED ({checked} files checked).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

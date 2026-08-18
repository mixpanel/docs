#!/usr/bin/env python3
"""
CI gate: every fenced code block in MDX files must declare a language.

A fenced block opening looks like:
    ```python
    ```javascript
    ```bash

A block with no language identifier:
    ```

will cause this check to fail.

Excluded directories (same as other checks):
  - snippets/
  - openapi/
"""

import sys
import glob
import os
import re

EXCLUDED_DIRS = {"snippets", "openapi"}

# Matches the opening fence of a code block; captures the language (may be empty).
# The fence may be indented (e.g. inside a <Tab>).
FENCE_OPEN_RE = re.compile(r"^[ \t]*`{3,}([^\n`]*)$", re.MULTILINE)


def check_file(path: str) -> list[str]:
    errors = []
    with open(path, encoding="utf-8") as fh:
        content = fh.read()

    in_block = False
    for lineno, line in enumerate(content.splitlines(), 1):
        stripped = line.strip()
        if stripped.startswith("```"):
            if in_block:
                # Closing fence
                in_block = False
            else:
                # Opening fence — extract language token
                rest = stripped[3:].strip()
                lang = rest.split()[0] if rest else ""
                if not lang:
                    errors.append(
                        f"{path}:{lineno}: code block is missing a language identifier"
                    )
                in_block = True

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
        print("Code-sample check FAILED:")
        for err in all_errors:
            print(f"  {err}")
        return 1

    print(f"Code-sample check PASSED ({checked} files checked).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

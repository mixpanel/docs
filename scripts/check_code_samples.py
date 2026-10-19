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

def check_file(path: str, display: str) -> list[str]:
    errors = []
    with open(path, encoding="utf-8") as fh:
        content = fh.read()

    fence_len = 0  # 0 = outside a block; otherwise the opening fence's length
    for lineno, line in enumerate(content.splitlines(), 1):
        stripped = line.strip()
        if not stripped.startswith("```"):
            continue
        ticks = len(stripped) - len(stripped.lstrip("`"))
        rest = stripped[ticks:].strip()
        if fence_len:
            # Only a bare fence at least as long as the opener closes the block,
            # so a ```python block nested inside ````mdx does not end it early.
            if ticks >= fence_len and not rest:
                fence_len = 0
            continue
        if not rest:
            errors.append(
                f"{display}:{lineno}: code block is missing a language identifier"
            )
        fence_len = ticks

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
        all_errors.extend(check_file(path, rel))
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

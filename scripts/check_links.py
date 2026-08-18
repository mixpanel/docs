#!/usr/bin/env python3
"""
CI gate: internal links in MDX files must resolve to an existing page.

Rules:
  - Only links whose path starts with '/' are checked (relative links are
    ignored because they are rare and context-dependent).
  - External URLs (http/https), anchor-only links (#…), and mailto links
    are skipped.
  - Query-string parameters and fragment anchors are stripped before
    looking up the target file.
  - A link target is considered valid when one of the following is true:
      1. <root>/<target>.mdx  exists
      2. <root>/<target>/index.mdx  exists  (index pages)
      3. <target> is the source of a redirect declared in docs.json
         (redirect sources are valid inbound paths even without a backing file)

Source locations checked:
  - href="…"  attributes (JSX / HTML in MDX)
  - [text](…) Markdown links

Excluded directories:
  - snippets/
  - openapi/
"""

import json
import os
import re
import sys
import glob
from urllib.parse import urlparse, unquote

EXCLUDED_DIRS = {"snippets", "openapi"}

# Path prefixes that point to static assets, not pages — skip these.
NON_PAGE_PREFIXES = ("/images/", "/icons/", "/logo/", "/favicon")

# href="..." or href='...'
HREF_RE = re.compile(r"""href=["']([^"']+)["']""")
# [label](url) – skip image links starting with !
MD_LINK_RE = re.compile(r"(?<!!)\[(?:[^\]]*)\]\(([^)]+)\)")


INLINE_CODE_RE = re.compile(r"`[^`\n]*`")


def strip_code(content: str) -> str:
    """Blank out fenced code blocks and inline code spans so that example
    links inside them are not treated as real links. Line count is preserved
    so reported line numbers stay accurate."""
    out: list[str] = []
    fence_len = 0
    for line in content.splitlines():
        stripped = line.strip()
        if stripped.startswith("```"):
            ticks = len(stripped) - len(stripped.lstrip("`"))
            if fence_len:
                if ticks >= fence_len and not stripped[ticks:].strip():
                    fence_len = 0
            else:
                fence_len = ticks
            out.append("")
            continue
        out.append("" if fence_len else INLINE_CODE_RE.sub("", line))
    return "\n".join(out)


def extract_links(content: str) -> list[str]:
    links: list[str] = []
    for m in HREF_RE.finditer(content):
        links.append(m.group(1))
    for m in MD_LINK_RE.finditer(content):
        links.append(m.group(1))
    return links


def is_internal(link: str) -> bool:
    if link.startswith(("http://", "https://", "mailto:", "#")):
        return False
    if not link.startswith("/"):
        return False
    if link.startswith(NON_PAGE_PREFIXES):
        return False
    return True


def normalise(link: str) -> str:
    """Strip fragment and query-string, then decode percent-encoding."""
    parsed = urlparse(link)
    path = parsed.path
    return unquote(path).rstrip("/")


def build_valid_paths(root: str) -> tuple[set[str], list[str]]:
    """Return (exact_paths, wildcard_prefixes) for valid root-relative paths.

    exact_paths      – full paths that must match exactly (O(1) lookup via set).
    wildcard_prefixes – path prefixes derived from wildcard redirect sources
                        (e.g. '/changelogs' from '/changelogs/*').  A link
                        target is valid if it starts with one of these prefixes
                        followed by '/'.
    """
    exact: set[str] = set()
    prefixes: list[str] = []

    # Every .mdx file contributes its path (without extension) and with extension
    for mdx in glob.glob(os.path.join(root, "**", "*.mdx"), recursive=True):
        rel = os.path.relpath(mdx, root).replace(os.sep, "/")
        # e.g. "docs/what-is-mixpanel.mdx"
        exact.add("/" + rel)                      # with .mdx
        exact.add("/" + rel[:-4])                  # without .mdx
        # index pages: "docs/foo/index.mdx" → "/docs/foo"
        if rel.endswith("/index.mdx"):
            exact.add("/" + rel[: -len("/index.mdx")])

    # Redirect sources are also valid inbound paths
    docs_json = os.path.join(root, "docs.json")
    if os.path.exists(docs_json):
        with open(docs_json, encoding="utf-8") as fh:
            data = json.load(fh)
        for redir in data.get("redirects", []):
            src = redir.get("source", "")
            if src.endswith("/*"):
                # Wildcard source: store the prefix for prefix matching
                prefix = src[:-2]  # e.g. "/changelogs"
                exact.add(prefix)
                prefixes.append(prefix)
            else:
                exact.add(src)

    return exact, prefixes


def is_excluded(path: str) -> bool:
    parts = path.replace(os.sep, "/").split("/")
    return any(part in EXCLUDED_DIRS for part in parts)


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    valid_paths, wildcard_prefixes = build_valid_paths(root)

    mdx_files = glob.glob(os.path.join(root, "**", "*.mdx"), recursive=True)

    checked = 0
    all_errors: list[str] = []

    for path in sorted(mdx_files):
        rel = os.path.relpath(path, root)
        if is_excluded(rel):
            continue
        checked += 1

        with open(path, encoding="utf-8") as fh:
            content = strip_code(fh.read())

        for raw_link in extract_links(content):
            if not is_internal(raw_link):
                continue
            target = normalise(raw_link)
            if not target:
                continue

            # Direct match (O(1))
            if target in valid_paths:
                continue

            # Wildcard-redirect prefix match: check only the small list of
            # known wildcard prefixes rather than iterating all valid_paths.
            if any(target.startswith(p + "/") for p in wildcard_prefixes):
                continue

            all_errors.append(
                f"{rel}: broken internal link '{raw_link}' → '{target}'"
            )

    if all_errors:
        print("Links check FAILED:")
        for err in all_errors:
            print(f"  {err}")
        return 1

    print(f"Links check PASSED ({checked} files, {len(valid_paths)} valid paths indexed).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

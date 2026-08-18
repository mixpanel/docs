#!/usr/bin/env python3
"""
CI gate: validate the 'redirects' section of docs.json.

Checks performed:
  1. No duplicate redirect source paths.
  2. Every redirect destination resolves to an existing page OR is itself
     the source of another redirect (chained redirects are allowed).
     Wildcard destinations (containing '*') are skipped because their
     validity is structural rather than path-based.
"""

import json
import os
import sys
import glob


def build_file_paths(root: str) -> set[str]:
    """Return all root-relative page paths derived from .mdx files."""
    paths: set[str] = set()
    for mdx in glob.glob(os.path.join(root, "**", "*.mdx"), recursive=True):
        rel = os.path.relpath(mdx, root).replace(os.sep, "/")
        paths.add("/" + rel)           # with extension
        paths.add("/" + rel[:-4])      # without extension
        if rel.endswith("/index.mdx"):
            paths.add("/" + rel[: -len("/index.mdx")])
    return paths


def normalise(path: str) -> str:
    """Strip trailing slash and query string."""
    return path.split("?")[0].rstrip("/") or "/"


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    docs_json_path = os.path.join(root, "docs.json")

    if not os.path.exists(docs_json_path):
        print("Redirects check SKIPPED (docs.json not found).")
        return 0

    with open(docs_json_path, encoding="utf-8") as fh:
        data = json.load(fh)

    redirects = data.get("redirects", [])
    all_errors: list[str] = []

    # ── 1. Duplicate sources ────────────────────────────────────────────────
    sources: list[str] = [r.get("source", "") for r in redirects]
    seen: set[str] = set()
    duplicates: set[str] = set()
    for src in sources:
        if src in seen:
            duplicates.add(src)
        seen.add(src)

    for dup in sorted(duplicates):
        all_errors.append(f"docs.json: duplicate redirect source '{dup}'")

    # ── 2. Destinations resolve to a known page or another redirect source ──
    file_paths = build_file_paths(root)
    source_set = set(sources)  # redirect sources are also valid destinations

    for redir in redirects:
        dest = redir.get("destination", "")
        if not dest:
            all_errors.append(
                f"docs.json: redirect from '{redir.get('source')}' has an empty destination"
            )
            continue

        # Skip wildcards / external URLs – structural validity only
        if "*" in dest or dest.startswith("http"):
            continue

        # Strip anchors and query strings from destination
        dest_path = normalise(dest.split("#")[0])

        if dest_path not in file_paths and dest_path not in source_set:
            all_errors.append(
                f"docs.json: redirect destination '{dest}' does not resolve "
                f"to a known page (source: '{redir.get('source')}')"
            )

    if all_errors:
        print("Redirects check FAILED:")
        for err in all_errors:
            print(f"  {err}")
        return 1

    print(
        f"Redirects check PASSED ({len(redirects)} redirects validated, "
        f"{len(file_paths)} pages indexed)."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

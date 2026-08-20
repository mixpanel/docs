#!/usr/bin/env python3
"""
CI gate: validate the 'redirects' section of docs.json.

Checks performed:
  1. No duplicate redirect source paths.
  2. No redirect loops (a self-redirect or a cycle).
  3. Every redirect destination resolves to an existing page OR is itself
     the source of another redirect, including a wildcard one (chained
     redirects are allowed).
     Wildcard destinations (containing '*') are skipped because their
     validity is structural rather than path-based.
"""

import fnmatch
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

    # ── 2. Redirect loops (self-redirects and cycles) ───────────────────────
    dest_by_source = {r.get("source", ""): r.get("destination", "") for r in redirects}
    reported_loops: set[str] = set()
    for start in dest_by_source:
        hops = {start}
        node = dest_by_source[start]
        while node in dest_by_source:
            if node in hops:
                if node not in reported_loops:
                    reported_loops.add(node)
                    all_errors.append(
                        f"docs.json: redirect loop starting at '{start}' revisits '{node}'"
                    )
                break
            hops.add(node)
            node = dest_by_source[node]

    # ── 3. Destinations resolve to a known page or another redirect source ──
    file_paths = build_file_paths(root)
    exact_sources = {s for s in sources if "*" not in s}
    wildcard_sources = [s for s in sources if "*" in s]

    def resolves(path: str) -> bool:
        """A destination is valid if it is a real page, an exact redirect
        source, or matched by a wildcard redirect source. The last case is a
        chained redirect, which the CDN follows to a final landing page."""
        if path in file_paths or path in exact_sources:
            return True
        return any(fnmatch.fnmatch(path, pat) for pat in wildcard_sources)

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

        if not resolves(dest_path):
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

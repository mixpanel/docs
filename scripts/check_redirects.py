#!/usr/bin/env python3
"""
CI gate: validate the 'redirects' section of docs.json.

Checks performed:
  1. No duplicate redirect source paths.
  2. No redirect loops (a self-redirect or a cycle).
  3. No redirect chains: a destination must not itself be the source of
     another redirect (exact or wildcard). Each hop costs crawlers and answer
     engines a round trip, and chains decay into loops. Point the redirect at
     the final page instead.
  4. Every destination resolves to an existing page. A wildcard destination
     (e.g. '/guides/mcp/*') can't be checked child by child, since the
     incoming URLs are unknown, so it must at least match one existing page:
     removing or renaming the whole target section fails the check.

Known violations on main are listed in docs-ci-baseline.json (see
ci_baseline.py); only new violations fail the check.
"""

import fnmatch
import json
import os
import sys
import glob

from ci_baseline import report


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
    reported_cycles: set[frozenset[str]] = set()
    reported_loop_sources: set[str] = set()
    for start in dest_by_source:
        path = [start]
        node = dest_by_source[start]
        while node in dest_by_source:
            if node in path:
                reported_loop_sources.add(start)
                cycle = path[path.index(node):]
                if frozenset(cycle) not in reported_cycles:
                    reported_cycles.add(frozenset(cycle))
                    # Rotate to the smallest member so the message is stable.
                    pivot = cycle.index(min(cycle))
                    ordered = cycle[pivot:] + cycle[:pivot]
                    hops = " -> ".join(ordered + [ordered[0]])
                    all_errors.append(f"docs.json: redirect loop {hops}")
                break
            path.append(node)
            node = dest_by_source[node]

    # ── 3 + 4. Destinations are final pages, not further redirects ─────────
    file_paths = build_file_paths(root)
    exact_sources = {s for s in sources if "*" not in s}
    wildcard_sources = [s for s in sources if "*" in s]

    def is_redirected(path: str) -> bool:
        """True when the CDN would redirect `path` again (a chain)."""
        if path in exact_sources:
            return True
        return any(fnmatch.fnmatch(path, pat) for pat in wildcard_sources)

    for redir in redirects:
        src = redir.get("source", "")
        dest = redir.get("destination", "")
        if not dest:
            all_errors.append(f"docs.json: redirect from '{src}' has an empty destination")
            continue

        if dest.startswith("http"):
            continue

        # Strip anchors and query strings from destination
        dest_path = normalise(dest.split("#")[0])

        # Loops were reported above; don't double-report them as chains.
        if src in reported_loop_sources:
            continue

        if "*" in dest:
            # A wildcard destination chains only if it is itself a source.
            if dest_path in sources:
                all_errors.append(f"docs.json: redirect chain '{src}' -> '{dest}' (destination is redirected again)")
            elif not any(fnmatch.fnmatch(page, dest_path) for page in file_paths):
                all_errors.append(
                    f"docs.json: wildcard redirect destination '{dest}' matches no existing page "
                    f"(source: '{src}')"
                )
            continue

        if is_redirected(dest_path):
            all_errors.append(f"docs.json: redirect chain '{src}' -> '{dest}' (destination is redirected again)")
        elif dest_path not in file_paths:
            all_errors.append(
                f"docs.json: redirect destination '{dest}' does not resolve "
                f"to a known page (source: '{src}')"
            )

    return report(
        "redirects",
        "Redirects check",
        all_errors,
        f"{len(redirects)} redirects validated, {len(file_paths)} pages indexed",
    )

if __name__ == "__main__":
    sys.exit(main())

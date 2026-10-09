"""
Shared baseline handling for the docs CI gates.

A new gate should not block every unrelated PR on day one because of
violations that already exist on main. Each check can therefore list its
known, pre-existing violations in scripts/docs-ci-baseline.json. The check
fails only on violations that are NOT in the baseline, so new content is held
to the full standard while old content is cleaned up separately.

Baseline entries that no longer occur are reported but never fail the build,
so a cleanup PR (for example TOF-439 descriptions or TOF-441 redirect chains)
can land without touching the baseline. Prune them with --update-baseline.

To regenerate one check's entries from the current tree:
    python scripts/check_frontmatter.py --update-baseline
"""

import json
import os
import sys

BASELINE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "docs-ci-baseline.json")


def _load() -> dict[str, list[str]]:
    if not os.path.exists(BASELINE_PATH):
        return {}
    with open(BASELINE_PATH, encoding="utf-8") as fh:
        return json.load(fh)


def _save(baseline: dict[str, list[str]]) -> None:
    with open(BASELINE_PATH, "w", encoding="utf-8") as fh:
        json.dump(baseline, fh, indent=2, sort_keys=True)
        fh.write("\n")


def report(check: str, label: str, errors: list[str], passed_summary: str) -> int:
    """Print results for one check and return its exit code.

    `errors` must be stable strings (no line numbers) so they can be matched
    against the baseline across unrelated edits.
    """
    if "--update-baseline" in sys.argv:
        baseline = _load()
        if errors:
            baseline[check] = sorted(set(errors))
        else:
            baseline.pop(check, None)
        _save(baseline)
        print(f"{label} baseline updated: {len(set(errors))} known violation(s) recorded.")
        return 0

    known = set(_load().get(check, []))
    new_errors = [err for err in errors if err not in known]
    fixed = sorted(known - set(errors))
    baselined = len(errors) - len(new_errors)

    if fixed:
        script = os.path.relpath(os.path.abspath(sys.argv[0]), os.path.dirname(os.path.dirname(BASELINE_PATH)))
        print(
            f"{label}: {len(fixed)} baseline entry(ies) no longer occur (fixed). "
            f"Run `python {script} --update-baseline` to prune them."
        )

    if new_errors:
        print(f"{label} FAILED ({len(new_errors)} new violation(s); {baselined} known and baselined):")
        for err in new_errors:
            print(f"  {err}")
        return 1

    suffix = f"; {baselined} known violation(s) baselined" if baselined else ""
    print(f"{label} PASSED ({passed_summary}{suffix}).")
    return 0

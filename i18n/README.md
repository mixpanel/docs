# Docs localization (Mintlify i18n)

Working directory for [Docs Localization (Mintlify i18n)](https://linear.app/mixpanel/project/docs-localization-mintlify-i18n-25fabd3b5c76) — shipping `docs.mixpanel.com` in Korean, then scaling to more languages.

**Nothing here is live.** `docs.json` is untouched, no workflow is installed, and no `ko/` content tree
exists at the repo root. Everything is staged so the switch-on is a deliberate, reviewable step.

---

## Read this first

Two findings change the shape of the project:

**1. Mintlify sells the pipeline we were about to build.** Native AI translations (Pro/Enterprise) already
bulk-translates docs and opens a PR per change, on a continuous schedule, never publishing without a human
merge — which is M2's bulk translation plus all of M3. Every observable signal says Mixpanel is on
Enterprise. **Before DF-828 starts, someone should open the Mintlify dashboard → Settings → Translations.**
→ [`01-plan-and-entitlements.md`](01-plan-and-entitlements.md)

**2. 710 internal links will break silently on translation.** Every heading anchor in this repo derives from
its English text; translate the heading and the anchor changes, and 710 deep links land at the top of the
page instead of the right section. No error, nothing in the diff. The fix is mechanical — pin
`## 제목 [#english-anchor]` — but the engine has to do it, and not every engine can.
→ [`02-scope-and-preservation-spec.md`](02-scope-and-preservation-spec.md#heading-anchors--the-failure-nobody-sees-in-review)

---

## Contents

| | Covers | Linear |
| --- | --- | --- |
| [`01-plan-and-entitlements.md`](01-plan-and-entitlements.md) | Is localization on our plan; what Mintlify's own translation feature does; the decision gate it opens | DF-823 |
| [`02-scope-and-preservation-spec.md`](02-scope-and-preservation-spec.md) | What gets translated, what must survive byte-for-byte, and how that is enforced | DF-826 |
| [`03-tooling-evaluation.md`](03-tooling-evaluation.md) | Mintlify-native vs General Translation vs Lingo.dev, and a 12-page bake-off to settle it | DF-827 |
| [`04-rollout-playbook.md`](04-rollout-playbook.md) | Which language is next, the per-language checklist, and the reviewer's checklist | DF-833, DF-834 |
| [`glossary/ko.md`](glossary/ko.md) | 121 Korean terms, 60 do-not-translate, and the pitfalls that need a human | DF-826 |
| [`nav/`](nav/README.md) | Korean navigation tree + the exact `docs.json` edit, ready to apply | DF-824 |
| [`config/`](config/README.md) | Staged `gt.config.json` and translation workflow | DF-830, DF-831 |
| [`pilot/`](pilot/) | Three hand-translated pages — the quality bar engines get scored against | DF-828 |
| [`scripts/`](scripts/) | The tooling below | |

## Tooling

Zero dependencies — plain Node, no `package.json` needed.

```bash
# Verify a translation preserves structure. The M3 CI gate, and the bake-off scoring function.
node i18n/scripts/validate-mdx-parity.mjs --source docs --target ko/docs \
  --locale ko --link-prefix --require-anchors --allow-code-comments

# Rebuild the Korean navigation from docs.json (--check fails if labels drift)
node i18n/scripts/build-locale-nav.mjs ko

# Rebuild machine-readable glossary artifacts from the human glossary
node i18n/scripts/build-glossary.mjs ko

# Show the docs.json change that enables i18n — without making it
node i18n/scripts/preview-docsjson-patch.mjs ko --write
```

`validate-mdx-parity.mjs` catches what review cannot: renamed JSX components, translated code identifiers,
localized image paths, dropped imports, unprefixed links, drifted heading anchors, mangled `{…}`
expressions. It is quiet on a correct translation and specific on a broken one. All three pilot pages pass
it on the strictest settings.

## Where the project stands

| Milestone | State |
| --- | --- |
| **M1 · Mintlify config** | Plan question answered on the evidence; one dashboard check left. Korean nav built and verified. `docs.json` edit staged, not applied. |
| **M2 · Korean translation** | Scope, preservation spec, and glossary done. Engine recommended, pending a 12-page bake-off. Three pages hand-translated and passing. Bulk translation blocked on the engine decision. |
| **M3 · CI on merge** | Config and workflow written and staged. Redundant if Mintlify-native wins — which is the point of deciding first. |
| **M4 · Other languages** | Prioritization and playbook done. Blocked on M2/M3, as intended. |

## Open decisions

1. **Which engine?** Mintlify-native vs General Translation. Run the
   [bake-off](03-tooling-evaluation.md#the-bake-off) — 12 pages, scored by the validator, one afternoon.
   *Blocks DF-828, DF-830, DF-831.*
2. **Does the API reference get translated?** It is two artifacts (137 MDX files + 14 OpenAPI specs, ~20k
   words) and translating one without the other is worse than translating neither. Recommended: defer, then
   let docs traffic decide. *Affects DF-824's Korean nav shape.*
3. **Who reviews Korean, and how much of their time is available?** The only step in the whole pipeline that
   does not compress. ~3–5 days per language.

# M2 · Translation engine: evaluation and recommendation

**Linear:** [DF-827](https://linear.app/mixpanel/issue/DF-827) · **Decides:** DF-828, DF-830, DF-831

---

## Recommendation

**Start with Mintlify's built-in AI translations (option A). Keep General Translation (option B) as the
documented fallback. Do not adopt Lingo.dev.**

The reasoning is short: if Mixpanel is on Enterprise — and [the evidence says it
is](01-plan-and-entitlements.md#3-what-plan-is-mixpanel-on) — option A costs nothing extra, adds no repo
surface, and already implements M3 as a product feature. Option B is unambiguously the best *external*
tool, but it is a second vendor, a second bill, and a second CI system to own. Buying it before proving A
inadequate is buying the fallback first.

**The gate:** run the [bake-off](#the-bake-off) below on 12 pages before committing to bulk translation.
The parity validator makes that a one-afternoon exercise with a numeric answer rather than a taste test.

---

## What the engine actually has to survive

This is not a generic Markdown corpus. From the measured repo:

| Feature of the corpus | Count | What a naive translator does to it |
| --- | ---: | --- |
| `<Frame>` / `<Note>` / `<Tab>` / `<Card>` JSX components | 914 / 377 / 284 / 232 | Renames or drops the tag → page fails to render |
| Files with `import` statements (`/snippets/*.jsx`) | 117 | Drops or "translates" the import path |
| Fenced code blocks with real SDK calls | thousands | Translates `mixpanel.track("Sign Up")` → broken snippet |
| Pages with `openapi:` frontmatter | 105 | Translates the spec path → 404 in the API playground |
| Internal links | 2,721 | Leaves them unprefixed → Korean readers bounce to English |
| **Internal links carrying a `#fragment`** | **710** (370 distinct) | **Silently breaks — see below** |
| Headings | 3,723, **none with an explicit anchor** | Anchor changes with the heading text |
| Raw HTML tables with inline `style={{…}}` | many, in `reference/` | Mangles the JSX expression |

**The 710 fragment links are the sharpest edge.** Every heading in this repo derives its anchor from its
English text. Translate the heading, the anchor changes, and 710 deep links land at the top of the page
instead of the right section. Nothing errors. Nothing shows up in a diff review. It just quietly gets
worse. The fix — pinning `## 제목 [#english-anchor]` — is mechanical, but the engine has to do it, and
**this is the single capability I would disqualify a tool over.**

---

## Option A — Mintlify's native AI translations

**What it is.** Dashboard → Settings → Translations. Add a locale, Mintlify translates the docs and opens a
PR in this repo. Continuous translation re-translates on change. It never publishes without a human merge.
Pro ($450/mo) and Enterprise; not on Starter.

| | |
| --- | --- |
| ✅ | Almost certainly already paid for ([evidence](01-plan-and-entitlements.md#3-what-plan-is-mixpanel-on)) |
| ✅ | **Implements M3 outright** — delta translation on change, PR-per-update, human gate. DF-830 and DF-831 become configuration, not engineering |
| ✅ | Zero repo surface: no config file, no lockfile, no workflow, no third-party secret |
| ✅ | First-party — it cannot drift from Mintlify's own MDX/JSX semantics, because it *is* Mintlify |
| ✅ | Nobody at Mixpanel has to operate a translation pipeline |
| ❓ | **No published glossary or do-not-translate control.** For a 121-term product vocabulary across 295 pages this is the material unknown |
| ❓ | No published statement on heading anchors, `/snippets` imports, or `openapi:` handling |
| ❓ | No published statement on localizing `openapi/*.yaml` — likely blocks [wave 2](02-scope-and-preservation-spec.md#waves) |
| ❌ | Opaque: no way to pin a model, diff a prompt, or reproduce a run |

The two ❓ rows are exactly what the bake-off measures.

## Option B — General Translation (`gtx-cli` / Locadex)

**The strongest evidence available: Mintlify's own documentation repo runs on it.** `mintlify/docs` at
HEAD contains `gt.config.json`, `gt-lock.json`, `es/` `fr/` `zh/` content trees, and `es.json` `fr.json`
`zh.json` navigation files `$ref`'d from `docs.json`. The people who wrote the MDX renderer chose this tool
to localize their own docs.

Their config solves, in configuration, every hard problem listed above:

| Their setting | The problem it solves |
| --- | --- |
| `files.mdx.transform: {match:"^(snippets/)?(.*)$", replace:"$1{locale}/$2"}` | Mirrors the tree into `{locale}/`, snippets included |
| `options.jsonSchema["./docs.json"].composite["$.navigation.languages"]` | Translates `group`/`tab`/`item`/`anchor`/`dropdown` labels **and** prefixes every `pages[*]` and `root` path — i.e. all of DF-824, automatically |
| `docsUrlPattern: "/[locale]"` + `experimentalLocalizeStaticUrls` | Rewrites internal links to `/ko/...` |
| `docsImportPattern: "/snippets/[locale]"` + `experimentalLocalizeStaticImports` | Rewrites `/snippets/*.jsx` imports per locale |
| **`experimentalAddHeaderAnchorIds: "mintlify"`** | **Pins English heading anchors — the 710-link problem, solved** |
| `jsonSchema[...].preset: "openapi"` + `transform → {locale}/openapi.json` | Localizes OpenAPI specs alongside the MDX — makes wave 2 possible |
| `generateRedirects: "./docs.json"` | Keeps the 881 existing redirects working per locale |
| `experimentalHideDefaultLocale` | Keeps English at the repo root, unmoved |
| `gt-lock.json` | Delta translation — only changed content is re-translated |

| | |
| --- | --- |
| ✅ | Proven on this exact stack, at this exact scale, by Mintlify themselves |
| ✅ | Handles heading anchors and OpenAPI — the two things option A may not |
| ✅ | `gtx-cli` runs in any CI with `GT_API_KEY` + `GT_PROJECT_ID`; not locked to the GitHub App (which is Pro/Enterprise-only) |
| ✅ | Everything is in-repo and diffable |
| ⚠️ | Second vendor, second contract, second security review |
| ⚠️ | Several load-bearing settings are `experimental*` |
| ⚠️ | Config is genuinely intricate — that `gt.config.json` is not a five-minute file |

## Option C — Lingo.dev

Open-source CLI, `i18n.json` + lockfile, incremental translation, a marketplace GitHub Action, and a
documented Mintlify framework preset. Roughly $99/mo plus usage; free sandbox tier.

| | |
| --- | --- |
| ✅ | Cheapest paid option; open source; BYO-LLM |
| ✅ | Good general MDX handling |
| ❌ | **No published equivalent of `experimentalAddHeaderAnchorIds`** — the 710-fragment problem is left to us |
| ❌ | No published mechanism for localizing `docs.json` navigation — DF-824 stays manual |
| ❌ | No OpenAPI-spec localization → wave 2 unreachable |
| ❌ | Documentation is thinner than GT's on exactly the composite/transform features we need |

Cheapest per word, most expensive per problem. **Not recommended.**

---

## Side by side

| | A · Mintlify native | B · General Translation | C · Lingo.dev |
| --- | --- | --- | --- |
| Incremental cost | **$0 (if Enterprise)** | 2nd vendor | ~$99/mo + usage |
| Proven on a Mintlify repo of this size | first-party | **`mintlify/docs` itself** | preset exists |
| Pins heading anchors (710 links) | unknown | **yes** | no |
| Localizes `docs.json` nav (DF-824) | yes (product) | **yes (config)** | no |
| Localizes `openapi/*.yaml` (wave 2) | unknown | **yes** | no |
| Glossary / do-not-translate | unknown | custom instructions | glossary support |
| Delta translation (DF-830) | yes | `gt-lock.json` | `i18n.lock` |
| PR-per-change with human gate (DF-831) | **built in** | CI we write | CI we write |
| Repo surface added | **none** | config + lock + workflow | config + lock + workflow |
| Reproducible / auditable | no | **yes** | **yes** |

---

## The bake-off

Twelve pages, chosen to cover every structural pattern in the corpus. Run each candidate over them and
score with the validator — the answer comes out as a number, not an opinion.

```
docs/quickstart/install-mixpanel.mdx              Tabs × 20, Cards × 22, Accordions, ExtendedButton import
docs/quickstart/identify-users.mdx                Steps, code fences, internal links
docs/what-is-mixpanel.mdx                         Frames, images, prose-heavy
docs/data-structure/concepts.mdx                  the anchor targets other pages link into
docs/tracking-methods/sdks/javascript.mdx         code-dominated SDK reference
docs/reports/insights.mdx                         product prose + glossary-dense
docs/cohort-sync/index.mdx                        repeated headings across 27 sibling pages
docs/features/*.mdx  (pick one)                   Frames + tables
guides/mcp/*.mdx     (pick one)                   newest content, mixed components
reference/create-identity.mdx                     openapi: frontmatter + inline style={{…}} table
reference/identity-create-alias.mdx               raw HTML <table> with JSX expressions
docs/privacy/*.mdx   (pick one)                   "retention" ambiguity trap
```

Score each engine:

```bash
node i18n/scripts/validate-mdx-parity.mjs \
  --source docs --target <engine-output>/docs \
  --locale ko --link-prefix --require-anchors --json > bakeoff-<engine>.json
```

Then, by hand on those 12 pages only:

1. **Glossary adherence** — do the 20 highest-frequency terms in [`glossary/ko.csv`](glossary/ko.csv) come
   out consistently? Grep for 코호트 / 이벤트 / 속성 / 보드 and count variants.
2. **The `retention` trap** — did 리텐션 (report) and 데이터 보관 (policy) stay distinct?
   ([pitfalls](glossary/ko.md#pitfalls))
3. **Particles after Latin words** — `Mixpanel을` not `Mixpanel를`. High-frequency, high-visibility.
4. **Register** — `-합니다 / -하세요` throughout, no 해요체 drift.

**Decision rule:** ship with option A if it clears the validator with zero errors and its glossary
adherence is fixable by a reviewer in reasonable time. Fall back to B if it drifts on terminology with no
control to correct it, or fails on anchors. The 12-page cost of finding out is trivial against the 295-page
cost of guessing.

---

## What is already built, and is engine-independent

Nothing below changes based on which option wins:

| Artifact | Purpose |
| --- | --- |
| [`scripts/validate-mdx-parity.mjs`](scripts/validate-mdx-parity.mjs) | The scoring function for this bake-off, and the M3 CI gate |
| [`02-scope-and-preservation-spec.md`](02-scope-and-preservation-spec.md) | The contract every engine is measured against |
| [`glossary/ko.md`](glossary/ko.md) + `ko.csv` + `ko.dnt.txt` | 121 terms + 60 do-not-translate, in a form every engine can consume |
| [`nav/ko.json`](nav/ko.json) | Korean navigation, ready whichever engine lands (option B would regenerate it; A and C need it hand-made) |
| [`scripts/build-locale-nav.mjs`](scripts/build-locale-nav.mjs) | Regenerates that tree deterministically as English nav changes |
| [`pilot/ko/`](pilot/) | Hand-translated reference pages — the quality bar the engines are scored against |

# M2 · Korean scope, preservation spec, and terminology

**Linear:** [DF-826](https://linear.app/mixpanel/issue/DF-826) · **Applies to:** every translation engine, ours or Mintlify's.

This is the contract a translated page must satisfy. It is written to be machine-checkable:
[`scripts/validate-mdx-parity.mjs`](scripts/validate-mdx-parity.mjs) enforces §2 mechanically, so review can
spend its attention on §3 (is the Korean any good) rather than on hunting broken JSX.

---

## 1. Scope

### The corpus, measured

Prose word counts exclude frontmatter, fenced code, JSX tags, and inline code — i.e. what actually gets
translated and billed.

| Surface | Files | Prose words | Share |
| --- | ---: | ---: | ---: |
| `docs/` | 243 | 293,894 | 81% |
| `guides/` | 52 | 58,606 | 16% |
| `reference/` (MDX) | 137 | 10,076 | 3% |
| `openapi/*.yaml` (`description` + `summary`) | 14 specs | ~9,774 | — |
| **Total MDX** | **432** | **362,576** | |

Concentration matters for sequencing — the top five sections are half the work:

| Section | Files | Words |
| --- | ---: | ---: |
| `docs/tracking-methods` | 68 | 91,529 |
| `docs/reports` | 12 | 25,389 |
| `guides/strategic-playbooks` | 17 | 22,097 |
| `docs/cohort-sync` | 27 | 19,445 |
| `docs/features` | 13 | 17,400 |

### Waves

**Wave 1 — launch tier: `docs/` + `guides/`.** 295 files, 352,500 words. This is what `/ko` launches with.

Inside wave 1, translate in this order so something useful is reviewable early:

1. `docs/quickstart` + `docs/what-is-mixpanel` + `docs/what-to-track` (~6k words) — the pages a new
   Korean-speaking reader hits first, and the pages that set terminology for everything after.
2. `docs/data-structure`, `docs/reports`, `docs/boards`, `docs/users` — the conceptual core.
3. `docs/tracking-methods` (91.5k words, 68 files) — biggest block, but the *cheapest* per word: the same
   headings recur across every SDK (`Installing the Library`, `Sending Events`, `Storing User Profiles`,
   `Managing User Identity` each appear 13–14×), so translation memory and the glossary do most of the work.
   Review it as one batch with one reviewer for consistency.
4. Everything else in `docs/` and `guides/`.

**Wave 2 — API reference, or not at all.** `reference/*.mdx` (137 files, 10k words) **plus**
`openapi/*.yaml` (~9.8k words) — about 20k words, ~5% of the corpus. Cheap. Deferred anyway, for a reason
that is not cost:

> **The API reference is two artifacts, and translating one without the other produces a worse page than
> translating neither.** 105 of the 137 `reference/` pages are thin MDX shells whose real content —
> endpoint summaries, parameter tables, response schemas — is rendered by Mintlify from
> `openapi/*.yaml` via the `openapi:` frontmatter key. Translate only the MDX and a Korean reader gets
> Korean prose wrapped around an English parameter table.

If wave 2 goes ahead, both artifacts move together. This is a solved problem — Mintlify's own docs localize
their OpenAPI JSON alongside their MDX using a `{locale}/` transform and an `openapi` preset (see
[`03-tooling-evaluation.md`](03-tooling-evaluation.md)).

**Recommendation:** ship wave 1, then let data decide wave 2. `docs.json` already reports into a Mixpanel
project (`integrations.mixpanel.projectToken`) — after `/ko` has been live a month, segment docs pageviews
by locale and look at whether Korean readers reach `/reference` at all. Our own product should answer this,
not a guess.

### Never in scope

- `changelogs.mdx` (229 KB, dated release notes — stale the moment it is translated)
- `snippets/**` — `.jsx` components, not content. `snippets/utils/constants.mdx` (imported by 4 pages) was
  the one candidate; it was checked and every exported string is a proper noun already on the
  do-not-translate list (SDK names, warehouse names, Kapa event names). **No snippet localization is needed
  for wave 1** — imports stay `/snippets/...` verbatim. Re-check if a snippet ever gains prose.
- `images/**` — screenshots stay English. Mixpanel's product UI is English-only (see §3), so an English
  screenshot is *correct*: it matches what the reader sees on their screen.

### On DF-825: do not seed English fallbacks

[DF-825](https://linear.app/mixpanel/issue/DF-825) proposes scaffolding `ko/` and *"seeding with English
fallback so no route 404s pre-translation."* **Drop that step.** Mintlify's guide is explicit: *"Do not use
the same page path in more than one language. Duplicating paths across languages results in undefined
behavior."* Beyond that it is unnecessary — a `ko` page only becomes reachable once it is listed in the
`ko` navigation tree, so an unlisted page cannot 404 at a route nobody links to. Every credible engine
generates the locale tree itself.

The rest of DF-825 stands: `ko/` mirrors `docs/` and `guides/` exactly, one file per source file, same
relative paths. `ko` is the correct ISO 639-1 code and is on Mintlify's supported list.

---

## 2. Preservation spec (machine-enforced)

### Translate

| Thing | Note |
| --- | --- |
| Body prose, list items, table **cell text** | |
| Headings | Text only — the `#` level must not change |
| Frontmatter `title`, `description`, `sidebarTitle` | |
| Reader-facing JSX attributes: `title`, `alt`, `label`, `description`, `caption`, `placeholder`, `tooltip`, `header` | Except when the value is a brand or product name — see §3 |
| Prose *inside* JSX children (`<Note>…</Note>`, `<Card>…</Card>`) | |

### Preserve byte-for-byte

| Thing | Why |
| --- | --- |
| Fenced code blocks — **content and info string** | `mixpanel.track("Sign Up")` is API surface, not prose. A translated identifier is a broken snippet. One narrow exception: see "Code comments" below |
| Inline code spans (`` `distinct_id` ``) | Same reason |
| `import` / `export` lines | `import { ExtendedButton } from "/snippets/…"` — 117 files have them |
| JSX component **names** | `<Frame>` (914×), `<Note>` (377×), `<Tab>` (284×), `<Card>` (232×) |
| JSX structural attributes | `className`, `src`, `href`, `id`, `style`, `icon`, `type`, `name`, `width`, `height`, `defaultValue`, `language` |
| Any `{…}` JSX expression, and any `on*` handler | |
| `/images/**` paths | |
| Frontmatter `openapi`, `slug`, `icon`, `mode`, `hidden`, `og:*`, `url`, `api`, `createdAt`, `updatedAt` | `openapi` is a machine key pointing into a spec file |
| Anchor fragments (`#anatomy-of-an-event`) | See "Heading anchors" below — this one is subtle and breaks silently |
| Mixpanel reserved names: `$identify`, `$distinct_id`, `$anon_id`, `$create_alias`, `mp_` prefixes | Wire-format identifiers |

### Code comments — the one exception to "code is verbatim"

Some pages carry real explanation inside code comments rather than around them.
`docs/data-structure/concepts.mdx` is the extreme case: its 44-line JSON example is 27 lines of English
commentary explaining `$insert_id`, `distinct_id`, and `time`. Preserving it verbatim leaves the single most
important explanation on the page in English.

**Rule:** comment lines inside a fence *may* be translated; every executable line, and the fence's line
count, must be byte-identical. That is checkable, and it is checked:

```bash
node i18n/scripts/validate-mdx-parity.mjs ... --allow-code-comments
```

Without the flag any fence change is an error. With it, a change to a non-comment line is still an error.
Run the tree with the flag only if the chosen engine can respect the distinction — otherwise run without it
and let a reviewer translate comments by hand on the handful of pages where it matters.

### Heading anchors — the failure nobody sees in review

Mintlify derives a heading's anchor from its text. Translate `## Anatomy of an Event` to
`## 이벤트의 구조` and the anchor silently changes from `#anatomy-of-an-event` to something
Korean-derived. Every deep link into that heading — from other Korean pages, from the product, from
support macros, from Google — breaks. Nothing errors; the page just lands at the top.

**Rule:** a translated heading must carry the English anchor explicitly, using Mintlify's syntax:

```mdx
## 이벤트의 구조 [#anatomy-of-an-event]
```

Then `/ko/docs/data-structure/concepts#anatomy-of-an-event` resolves in both languages, and cross-locale
links are portable. Any engine we adopt must do this; General Translation exposes it as
`experimentalAddHeaderAnchorIds: "mintlify"`. If the chosen engine cannot, it is a post-processing step,
not something to leave to reviewers.

### Rewrite

| Thing | Rule |
| --- | --- |
| Internal doc links | `/docs/x` → `/ko/docs/x`. Without this, every internal link drops a Korean reader back into English. Validate with `--link-prefix`. |
| Snippet imports, **if** localized snippets exist | `/snippets/Foo.jsx` → `/snippets/ko/Foo.jsx`. Only if wave 1 finds reader-facing strings in snippets. |
| External links (`https://mixpanel.com/...`) | Leave alone. `mixpanel.com` advertises a `ko-KR` alternate but currently serves English; revisit if that changes. |

### Enforcement

```bash
# whole tree, production settings
node i18n/scripts/validate-mdx-parity.mjs --source docs --target ko/docs --locale ko --link-prefix

# one file
node i18n/scripts/validate-mdx-parity.mjs \
  --source docs/quickstart/install-mixpanel.mdx \
  --target ko/docs/quickstart/install-mixpanel.mdx --locale ko --link-prefix
```

Exit code 1 on any ERROR. Warnings (unchanged prose attributes, no Korean characters on the page) do not
fail the build but are the reviewer's first read. **This must gate the translation PR in M3** — see
[`config/translate.yml`](config/translate.yml).

---

## 3. Terminology policy

Full term table: [`glossary/ko.md`](glossary/ko.md). Machine-readable: [`glossary/ko.csv`](glossary/ko.csv).

The policy exists because of one fact: **Mixpanel's product UI is English-only.** A Korean reader following
a doc is looking at an English screen. Terminology that reads beautifully in Korean but cannot be matched to
a button label actively harms them.

So:

- **Feature and report names → established Korean transliteration.** 인사이트, 퍼널, 리텐션, 플로우, 코호트, 보드,
  세션 리플레이. These are what the Korean product-analytics market already says, and they stay
  phonetically recognisable against the English UI.
- **First use on each page → Korean followed by English in parentheses:** `코호트(Cohort)`. Once per page,
  not once per paragraph.
- **Generic nouns → real Korean.** event 이벤트, property 속성, user 사용자, project 프로젝트, report 리포트.
- **Never translate:** SDK and platform names, API endpoint names, `Lexicon`, reserved properties, code
  identifiers, and brand names in `<Card title="…">` (Segment, Google Tag Manager, Snowplow, Stripe…).
  The validator's proper-noun heuristic already stays quiet about these.
- **Register:** 해요체 is too casual and 합쇼체 too stiff for docs. Use **-합니다 / -하세요** — the standard
  Korean technical-documentation register. Imperatives in procedures: **-하세요**.

---

## 4. Acceptance for M2

- [ ] Wave 1 (295 files) has a `ko/` counterpart
- [ ] `validate-mdx-parity.mjs --link-prefix` exits 0 across the tree
- [ ] Glossary terms render consistently — spot-check the 20 highest-frequency terms across sections
- [ ] A Korean-speaking reviewer has read wave-1 tier 1 and 2 in full, and sampled tier 3 and 4
- [ ] Rendered-page QA on `mintlify dev`: components render, no layout breakage from longer/shorter strings,
      language switcher round-trips, internal links stay inside `/ko`

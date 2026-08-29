# M4 · Language prioritization and rollout playbook

**Linear:** [DF-833](https://linear.app/mixpanel/issue/DF-833), [DF-834](https://linear.app/mixpanel/issue/DF-834)

---

## Which language is next

### The signal Mixpanel already has

`mixpanel.com` publishes `hreflang` alternates for exactly four locales:

```
en-US   ko-KR   ja-JP   id-ID
```

Marketing has already decided which non-English markets are worth translating for, and paid for it. Docs
should follow that list rather than invent a new one — same markets, same sales motion, same customers.

(Note for whoever picks this up: `mixpanel.com/ko/` currently returns 200 but serves English. The alternate
is declared, the content is not there yet. Worth flagging to whoever owns the marketing site — and worth
knowing that a Korean docs launch may land before a Korean marketing site.)

### Recommended order

| # | Locale | Why | Confidence |
| --- | --- | --- | --- |
| 1 | `ko` | In flight. Marketing-declared market. | — |
| 2 | `ja` | Marketing-declared; large enterprise analytics market; Mintlify supports `ja` and `ja-JP` | high |
| 3 | `id` | Marketing-declared. Verify with docs traffic first — a declared alternate is weaker evidence than pageviews | medium |
| 4 | `es` / `pt-BR` | Large developer populations, no marketing signal yet. Only on traffic evidence | low |
| 5 | `de` / `fr` | Strong English proficiency among the developer audience; usually the lowest-yield locales for developer docs | low |

### Confirm with data before locale 3

Do not extend past `ja` on inference. `docs.json` already reports into a Mixpanel project
(`integrations.mixpanel.projectToken: "metrics-1"`), so the answer is a report away:

- Docs pageviews broken down by `$country_code` / browser language, over 90 days
- Trend of `/ko` pageviews after Korean launch — the actual measured lift from localizing, which is the
  only honest input to "is the next language worth it"
- Whether non-English-locale readers reach `/reference` at all → settles
  [wave 2](02-scope-and-preservation-spec.md#waves) for every language at once

One report answers the prioritization question for the rest of the project. We sell this product; we should
use it.

---

## Per-language rollout playbook

Once Korean is live and CI is running, a new language should be a checklist, not a project. Budget **~1 week**,
most of it native review.

### 1 · Configure — ~1 hour

```bash
# translate the 128 nav labels for the new locale
cp i18n/nav/labels.ko.json i18n/nav/labels.<locale>.json
#   ...translate the values...

node i18n/scripts/build-locale-nav.mjs <locale>          # → i18n/nav/<locale>.json
node i18n/scripts/build-locale-nav.mjs <locale> --check  # must exit 0
```

Then add the locale to `docs.json` (`{ "$ref": "./<locale>.json" }`) and to the engine's target list
(`gt.config.json` → `locales`, or the Mintlify dashboard).

Confirm the code is on [Mintlify's supported list](https://www.mintlify.com/docs/guides/internationalization)
first. `ko`, `ja`/`ja-JP`, `id`, `es`, `pt-BR`, `de`, `fr`, `zh-Hans`, `zh-Hant` all are.

### 2 · Extend the glossary — ~half a day

```bash
cp i18n/glossary/ko.md i18n/glossary/<locale>.md
#   ...translate the term column; keep the section structure and the Never-translate list...
node i18n/scripts/build-glossary.mjs <locale>
```

**The do-not-translate list and the pitfalls carry over unchanged** — "retention" is ambiguous in every
language, and brand names are brand names everywhere. What changes is the target column and the
language-specific note at the end of `glossary/ko.md` (Korean particles; for Japanese, katakana vs kanji for
feature names; for German, compound-noun length in the sidebar).

**Do this before bulk translation, not after.** Fixing terminology across 295 already-translated pages costs
far more than deciding it once.

### 3 · Translate — hours, unattended

```bash
npx gtx-cli translate --config gt.config.json     # or: Mintlify dashboard → add locale
```

352,500 words in the wave-1 tier. Half of it is in five sections, and `docs/tracking-methods` (91.5k words,
68 files) repeats the same headings across every SDK — so translation memory makes the big block the cheap
block.

### 4 · Validate — minutes

```bash
node i18n/scripts/validate-mdx-parity.mjs \
  --source docs --target <locale>/docs \
  --locale <locale> --link-prefix --require-anchors --allow-code-comments
```

Must exit 0. Non-negotiable, and it is not a matter of judgement — if it fails, the engine is misconfigured,
not the translation.

### 5 · Native review — the real cost, ~3–5 days

This is the only step that does not compress. Sequence it so terminology is fixed before volume:

1. Quickstart + intro pages (~6k words) — sets the vocabulary for everything after
2. Conceptual core: data model, reports, boards, users
3. `docs/tracking-methods` as **one batch with one reviewer** — 68 files of near-identical headings; split
   it across reviewers and the inconsistency will be visible on adjacent pages
4. The rest

### 6 · Ship and watch

Merge, confirm in `mintlify dev`, then check the language switcher round-trips and internal links stay
inside the locale. Two weeks later, pull pageviews for the new prefix — that number is the input to whether
locale N+1 happens.

---

## Reviewing a translation PR

For reviewers landing on an automated PR from [`config/translate.yml`](config/translate.yml). Structure is
already machine-verified — **your job is only whether the language is right.**

1. **Terminology** — spot-check against [`glossary/ko.csv`](glossary/ko.csv). Grep the PR for the five
   highest-frequency terms and confirm one rendering each: 이벤트 / 속성 / 코호트 / 보드 / 사용자.
2. **The `retention` trap** — 리텐션 (the report) and 데이터 보관 (the policy) are different words. Machines
   collapse them. Highest-yield single check in the review.
3. **Particles after Latin words** — `Mixpanel을` not `Mixpanel를`, `SDK를` not `SDK을`. Chosen by how the
   Latin word is *read aloud* in Korean. Frequent, visible, and consistently gotten wrong by machines.
4. **Register** — `-합니다 / -하세요`. Flag any drift into 해요체.
5. **Untranslated leftovers** — search the diff for runs of English prose outside code and brand names.
6. **Render it** — `mintlify dev` on two or three changed pages. Korean is denser than English; check that
   sidebar labels, `<Card>` grids, and table cells still lay out.

What you do **not** need to check, because CI already did: JSX components, code fences, imports, image
paths, link targets, heading anchors, frontmatter keys.

---

## Exit criteria for M4

- [ ] Locale 2 (`ja`, most likely) live and maintained by the same CI as `ko`, with no new pipeline
- [ ] Adding it required only the steps above — any deviation gets folded back into this playbook
- [ ] Docs traffic by locale is a report someone can pull on demand, and it drives locale 3

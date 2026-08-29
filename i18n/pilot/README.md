# Pilot Korean translations

**Linear:** [DF-828](https://linear.app/mixpanel/issue/DF-828) (partial) · Three pages, hand-translated.

Not a sample of bulk output — the **quality bar and the proof the spec is achievable.** Three pages chosen
to exercise the patterns that break machine translation, each passing the validator on its strictest
settings.

| Page | Exercises |
| --- | --- |
| `ko/docs/what-is-mixpanel.mdx` | Unused `/snippets/*.jsx` import, `<Frame>` + raw `<iframe>` with 5 boolean JSX attrs, same-page `#fragment` links, `/images/*.svg`, escaped `\$2.50`, `_italics_` |
| `ko/docs/data-structure/concepts.mdx` | 44-line JSON fence with 27 comment lines, 4-column and 2-column tables with `<br />` and inline code in cells, 8 internal links, `song\_id` escaping, emoji cells |
| `ko/docs/quickstart/capture-events/autocapture.mdx` | `/snippets/utils/constants.mdx` import, two code fences with trailing whitespace preserved |

## Verify

```bash
node i18n/scripts/validate-mdx-parity.mjs \
  --source docs/what-is-mixpanel.mdx \
  --target i18n/pilot/ko/docs/what-is-mixpanel.mdx \
  --locale ko --link-prefix --require-anchors

node i18n/scripts/validate-mdx-parity.mjs \
  --source docs/data-structure/concepts.mdx \
  --target i18n/pilot/ko/docs/data-structure/concepts.mdx \
  --locale ko --link-prefix --require-anchors --allow-code-comments

node i18n/scripts/validate-mdx-parity.mjs \
  --source docs/quickstart/capture-events/autocapture.mdx \
  --target i18n/pilot/ko/docs/quickstart/capture-events/autocapture.mdx \
  --locale ko --link-prefix --require-anchors
```

All three: clean, zero warnings.

## What these pages settled

**Heading anchors are solvable by convention.** `## 이벤트의 구조 [#anatomy-of-an-event]` keeps
`/ko/docs/data-structure/concepts#anatomy-of-an-event` resolving, so cross-locale deep links stay portable.
Applied to every heading in all three pages.

**Code comments needed a rule, and now have one.** `concepts.mdx` is the extreme case — the JSON example is
61% English commentary explaining `$insert_id`, `distinct_id`, and `time`. Preserving it verbatim would
leave the most important explanation on the page in English. So: comments may be translated, executable
lines and line count may not, and `--allow-code-comments` enforces exactly that.
([spec](../02-scope-and-preservation-spec.md#code-comments--the-one-exception-to-code-is-verbatim))

**Snippet localization is not needed.** `snippets/utils/constants.mdx` exports only proper nouns already on
the do-not-translate list, so imports stay `/snippets/...` verbatim.

## Using these in the bake-off

These are two of the twelve [bake-off](../03-tooling-evaluation.md#the-bake-off) pages. Run each candidate
engine over the same sources and diff its output against these: the validator scores structure, and the
Korean here is the reference for terminology, register, and particle handling. A gap that a reviewer can
close in minutes is fine; a gap that needs a rewrite is a failed engine.

## Promoting to real content

These live under `i18n/pilot/` so they are inert — no route, no build impact. When Korean ships:

```bash
mkdir -p ko && cp -r i18n/pilot/ko/docs ko/
```

Only after `docs.json` carries the `languages` array ([`../nav/README.md`](../nav/README.md)); until then
`ko/` pages are unreachable. If the chosen engine regenerates the whole tree
(`experimentalClearLocaleDirs`), let it overwrite these and keep them here as the reference.

# Korean navigation tree — ready to apply

**Linear:** [DF-824](https://linear.app/mixpanel/issue/DF-824) · **Status:** built and verified, **deliberately not applied.**

`docs.json` is Mintlify configuration and this work leaves it untouched. Everything needed for DF-824
exists here; enabling it is one file move and one edit, done by a human when the
[plan question](../01-plan-and-entitlements.md) is settled.

## What's here

| File | What it is |
| --- | --- |
| `labels.ko.json` | EN → KO for all 128 navigation labels, hand-translated per the [glossary policy](../glossary/ko.md) |
| `ko.json` | The generated Korean nav tree — 5 tabs, **390 page paths** prefixed `ko/` |
| `docs.json.preview` | (after `--write`) the full patched `docs.json`, for diffing. Not read by Mintlify. |

Regenerate any time the English nav changes:

```bash
node i18n/scripts/build-locale-nav.mjs ko          # rebuild ko.json
node i18n/scripts/build-locale-nav.mjs ko --check  # CI gate: fails if labels drift out of sync
```

`--check` fails when `docs.json` gains a label with no Korean, or `labels.ko.json` keeps one that no longer
exists. It runs in [`config/translate.yml`](../config/translate.yml) so the nav cannot silently rot.

## To enable (the human step)

```bash
# 1. see exactly what changes
node i18n/scripts/preview-docsjson-patch.mjs ko --write
git diff --no-index docs.json i18n/nav/docs.json.preview

# 2. put the Korean tree where docs.json's $ref expects it
cp i18n/nav/ko.json ./ko.json

# 3. apply the navigation change to docs.json (by hand, or copy the preview over it)

# 4. verify
mintlify dev
#    → language switcher renders
#    → English routes unchanged
#    → /ko routes resolve
```

The change is reversible: revert `docs.json` and the site is exactly as before.

## Three decisions to make while applying

**1. English stays at the root.** Mintlify keeps the default locale unprefixed, so no English file moves and
no English URL changes. Enabling i18n is a genuine no-op for English readers — which is what makes this
mergeable ahead of any Korean content.

**2. Global anchors cannot be localized.** `navigation.global.anchors` (About Us, Community, Blog) is shared
across every language by design, so Korean readers see those three in English. Korean strings are staged
under `_global_anchors` in `labels.ko.json` if you'd rather move the anchors into each language entry
instead — that localizes them, at the cost of repeating them per locale. **Recommendation: leave them
global.** Three English words in the top bar is a smaller problem than a nav that drifts per locale.

**3. Does the API Docs tab belong in the Korean nav?** `ko.json` currently includes all five tabs, so the
Korean nav mirrors English exactly. But [wave 2 defers the API
reference](../02-scope-and-preservation-spec.md#waves) — those 137 pages render from `openapi/*.yaml`, and
translating the MDX without the specs produces Korean prose around English parameter tables. If wave 2 is
deferred, generate without that tab:

```bash
node i18n/scripts/build-locale-nav.mjs ko --drop-tab="API Docs"
```

Korean readers then reach the API reference through the English tab — correct, since its content is English
either way.

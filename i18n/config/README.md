# Staged pipeline config

**Nothing here is active.** Both files sit outside the paths that would make them run.

| File | Moves to | When |
| --- | --- | --- |
| `gt.config.json` | repo root | If General Translation is chosen **and** `docs.json` has a `languages` array |
| `translate.yml` | `.github/workflows/` | Same, **and** `GT_API_KEY` / `GT_PROJECT_ID` exist as repo secrets |

Move either one early and it fails on every merge to `main`: the workflow has no secrets to authenticate
with, and `gt.config.json` targets a `$.navigation.languages` path that does not exist yet.

## If Mintlify-native translations win

**Delete both files.** Mintlify opens the translation PR itself — no config, no workflow, no third-party
secret. See [`../03-tooling-evaluation.md`](../03-tooling-evaluation.md).

Keep the three validation steps from `translate.yml` either way, as a small `verify-i18n.yml`:

```yaml
- run: node i18n/scripts/validate-mdx-parity.mjs --source docs --target ko/docs \
         --locale ko --link-prefix --require-anchors --allow-code-comments
- run: node i18n/scripts/build-locale-nav.mjs ko --check
- run: node i18n/scripts/build-glossary.mjs ko --check
```

Whatever produces the translation, something has to prove it did not break 914 `<Frame>` tags, 2,721 links,
and 3,723 heading anchors. Mintlify's PR needs that gate exactly as much as ours would.

## About `gt.config.json`

Adapted from [`mintlify/docs`](https://github.com/mintlify/docs)' own config — Mintlify localize their
documentation with this tool, on this stack. Differences from theirs:

- **`reference/` and `changelogs.mdx` excluded.** Wave 2 and never, respectively
  ([scope](../02-scope-and-preservation-spec.md#waves)).
- **No OpenAPI localization.** They localize `*.openapi.json` with a JSON preset; Mixpanel's specs are
  `openapi/*.yaml`. Deferred with wave 2 — needs verification that the YAML bucket handles it.
- **`snippets/` excluded.** Checked: every exported string is a proper noun already on the do-not-translate
  list, so there is nothing to localize.
- **`locales: ["en", "ko"]`** rather than their four.

Retained deliberately — these are the settings that solve the hard problems:

| Setting | Solves |
| --- | --- |
| `experimentalAddHeaderAnchorIds: "mintlify"` | The 710 fragment links |
| `experimentalLocalizeStaticUrls` + `docsUrlPattern` | 2,721 internal links → `/ko/...` |
| `jsonSchema.composite["$.navigation.languages"]` | All of DF-824, automatically |
| `generateRedirects` | Keeps the 881 existing redirects working per locale |
| `experimentalHideDefaultLocale` | English stays at the root, unmoved |

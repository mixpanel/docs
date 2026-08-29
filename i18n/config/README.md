# Staged pipeline config

**Nothing here is active.** `gt.config.json` sits here rather than at the repo root, where it would be live.

| File | Moves to | When |
| --- | --- | --- |
| `gt.config.json` | repo root | If General Translation is chosen **and** `docs.json` has a `languages` array |

Move it early and it fails immediately: it targets a `$.navigation.languages` path that does not exist yet.

The CI workflow that consumes it lands separately (DF-831).

## If Mintlify-native translations win

**Delete this file.** Mintlify opens the translation PR itself — no config, no workflow, no third-party
secret. See [`../03-tooling-evaluation.md`](../03-tooling-evaluation.md).

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

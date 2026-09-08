# M1 · Does Mixpanel's Mintlify plan support localization?

**Linear:** [DF-823](https://linear.app/mixpanel/issue/DF-823) · **Status:** answered on the public evidence; one dashboard check left for a human.

---

## TL;DR

1. **Mintlify's `languages` navigation config is not documented as tier-gated.** It is plain `docs.json` +
   locale folders, described in the public docs with no plan note.
2. **Mintlify sells a separate, productised "AI translations" feature — Pro ($450/mo) and Enterprise only.**
   That feature already does most of M2 *and* all of M3: it bulk-translates the docs and opens a PR per
   update, on a continuous schedule, never publishing without a human merge.
3. **Every observable signal says Mixpanel is on a paid tier, most likely Enterprise.** So the honest answer
   to "is localization available" is almost certainly *yes* — and the more consequential question is
   **which** localization we buy into.
4. **This reframes the project.** M2 and M3 as scoped assume we build a translation pipeline. If Mintlify's
   own translations are turned on, most of that pipeline is a feature toggle. See the decision gate below.

---

## 1. The `languages` config itself

Mintlify localizes the *framework* through `navigation.languages[]` in `docs.json` plus locale-prefixed
content folders. The public documentation ([Site structure][ms], [Navigation][mn], [multi-language
guide][mg]) describes it as ordinary configuration and **attaches no plan requirement**.

Supported locale codes include `ko`, and also `ja`/`ja-JP`, `id`, `es`, `de`, `fr`, `pt-BR`, `zh-Hans`,
`zh-Hant` — so **Korean is supported**, and so is every language on the M4 shortlist.

Two rules from the docs that constrain our design:

- The default language stays at the repo root; only non-default locales get a prefix folder. So English
  content does **not** move, and enabling i18n is genuinely a no-op for English readers.
- *"Do not use the same page path in more than one language. Duplicating paths across languages results in
  undefined behavior."* — this is why DF-825's "seed `ko/` with English fallback" step should be dropped;
  see [`02-scope-and-preservation-spec.md`](02-scope-and-preservation-spec.md#on-df-825-do-not-seed-english-fallbacks).

## 2. The paid feature: Mintlify AI translations

Separately from the config, Mintlify sells automated translation. Per [Mintlify's pricing page][mp], the
feature table lists **"AI translations" under Pro and Enterprise, not Starter.** Plans are Starter $0,
Pro $450/mo, Enterprise custom.

How it works, per Mintlify's own material: in the dashboard under **Settings → Translations** you add a
locale, and Mintlify translates the docs and **opens a pull request in the docs repo** with the translated
content. It never publishes to production on its own — someone must review and merge. Continuous
translation can be enabled so updates re-translate automatically.

Read that against our milestones:

| Our milestone | What Mintlify's feature already does |
| --- | --- |
| M2 · bulk-translate Docs + Guides to Korean | Yes — full initial translation from the dashboard |
| M3 · delta-translate on merge, open a PR for review | Yes — that is exactly "continuous translations" |
| M3 · human gate before publish | Yes — PR-based by design, never auto-publishes |

What it does **not** obviously give us, and what we would still own either way:

- A **glossary / terminology lock** so "Cohort" and "Board" render consistently across 295 pages.
  (Not documented as configurable. This is the single biggest quality risk and the main argument for
  keeping our own glossary + review gate regardless of engine.)
- **Structure guarantees.** Nothing published says what it does with `<Frame>`, `/snippets/*.jsx` imports,
  or `openapi:` frontmatter. We should not assume; we should measure — which is what
  [`scripts/validate-mdx-parity.mjs`](scripts/validate-mdx-parity.mjs) exists to do.
- **Localizing `openapi/*.yaml`.** The API reference renders from 14 spec files, not from the MDX. See the
  scope note.

## 3. What plan is Mixpanel on?

I cannot read the Mintlify dashboard, so this is inference — but it is not close. Evidence from this repo
and the live site:

| Signal | Where | Implies |
| --- | --- | --- |
| Custom domain `docs.mixpanel.com` | `docs.json` → `seo.metatags.canonical` | paid |
| Custom CSS | `style.css` | paid |
| Custom JS injection | `scripts/sentry.js`, `scripts/trustarc.js` | paid |
| Self-hosted brand fonts (Garnett, from `cdn.mxpnl.com`) | `docs.json` → `fonts` | paid |
| Custom theme (`sequoia`) + brand palette | `docs.json` → `theme`, `colors` | paid |
| **Mintlify web editor behind Okta SSO** | `README.md` → *"edit the docs through a web editor using the Mintlify app… request access via Okta"* | **SAML/SSO — Enterprise** |
| 881 configured redirects, GTM + Mixpanel analytics integrations, contextual AI menu | `docs.json` | mature paid deployment |

The Okta line is the decisive one: dashboard SSO is an Enterprise-tier capability. **Working assumption:
Mixpanel is on Mintlify Enterprise, and localization — both the config and the AI translations feature —
is available at no incremental license cost.**

### The one check a human still has to do

Log into the Mintlify dashboard and open **Settings → Translations**.

- **Page exists, lets you add a locale** → confirmed. DF-823 closes, and the decision gate below opens.
- **Page is absent or upsells** → we are on a plan without it; get the tier/price from the Mintlify AM and
  route it for approval. The fallback is the external-pipeline path, which is fully specced in
  [`03-tooling-evaluation.md`](03-tooling-evaluation.md) and costs roughly $99/mo + usage.

While in the dashboard, also capture: current plan name, whether continuous translation is available, and
whether the translation feature exposes any glossary or "do not translate" configuration. That last answer
decides how much of our own pipeline we keep.

## 4. Decision gate this opens

> **Do we use Mintlify's built-in AI translations, or build the external pipeline M2/M3 assume?**

This is a real fork and it should be decided before DF-828 (bulk translation) starts, because the two paths
produce different repos. Recommendation and the full comparison — including the third, hybrid option — are
in [`03-tooling-evaluation.md`](03-tooling-evaluation.md).

Everything already built in this directory is **deliberately engine-independent**: the scope decision, the
preservation spec, the Korean glossary, the nav tree, and the parity validator are all needed no matter
which engine wins. Nothing here is wasted by either answer.

---

## Sources

- [Mintlify · Site structure][ms] · [Navigation][mn] · [Multi-language guide][mg] · [Pricing][mp]
- Mixpanel repo: `docs.json`, `style.css`, `scripts/`, `README.md`

[ms]: https://www.mintlify.com/docs/organize/settings-structure
[mn]: https://www.mintlify.com/docs/organize/navigation
[mg]: https://www.mintlify.com/docs/guides/internationalization
[mp]: https://mintlify.com/pricing

# Copilot Instructions for Mixpanel Documentation Repository

## Repository Overview

This is **Mixpanel's Official Documentation** repository (https://docs.mixpanel.com), built with Next.js 14 and Nextra 3. The repository is approximately **4GB** in size and contains comprehensive product documentation, API references, guides, and changelogs.

**Technology Stack:**
- **Framework:** Next.js 14.2.32 (React 18.3.1)
- **Documentation Engine:** Nextra 3.3.1 with nextra-theme-docs
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.4.14, PostCSS, Sass
- **Build Tool:** npm (Node.js 20.x required)
- **Deployment:** Vercel
- **Node Version Required:** >=20.0.0 <21.0.0
- **npm Version Required:** >=10.0.0 <12.0.0

**Environment Setup:**
- `.github/workflows/copilot-setup-steps.yml` - Automated environment setup for Copilot agents
  - Pre-installs dependencies with `npm ci`
  - Pre-builds OpenAPI specifications
  - Ensures consistent environment across all coding sessions

## Critical Build & Validation Commands

**ALWAYS run these commands in this exact order to validate changes:**

### 1. Install Dependencies
```bash
npm ci
```
- **ALWAYS use `npm ci` not `npm install`** - CI uses `npm ci` for reproducible builds
- Takes approximately 30-60 seconds
- Required before any other commands

### 2. Run Content Tests
```bash
npm test
```
- Runs `./utils/test.sh` which checks for disallowed content patterns
- Validates that deprecated URLs (`/project/3/`, `/report/3/`) are not referenced
- **Must pass** - Failure indicates broken/deprecated links in documentation
- Takes <5 seconds

### 3. Run Spelling Checks
```bash
npm run spelling
```
- Uses CSpell to check all `**/*.md*` files
- Dictionary: `cspell.json` (363+ custom words for Mixpanel domain terms)
- Custom dictionary additions: `.cspell/custom-dictionary.txt`
- **ALWAYS add new technical terms to cspell.json words array** to avoid failures
- Takes approximately 10-30 seconds for full repo scan
- CI runs this as a required check via `.github/workflows/cspell.yaml`

### 4. Run API Tests
```bash
npm run api:test
```
- Runs `./openapi/test.sh` which:
  - Lints OpenAPI specs: `npm run api:lint`
  - Builds OpenAPI specs: `npm run api:build`
  - Validates bundled specs with `rdme openapi:validate`
- Validates 3 main API specs: query-api, service-accounts-api, warehouse-connectors-api
- Output directory: `openapi/out/*.json` (git-ignored)
- Takes approximately 30-60 seconds

### 5. Build the Site
```bash
npm run build
```
- Builds Next.js production bundle
- Runs `next build` followed by `next-sitemap` (postbuild hook)
- **Takes 2-4 minutes** - be patient, do not interrupt
- Generates static pages for 300+ documentation pages
- Creates sitemap in `public/sitemap.xml`
- Output: `.next/` directory (git-ignored)
- **CI will fail if this fails** - test locally first

### Development Server
```bash
npm run dev
```
- Starts development server at http://localhost:3000
- Hot-reloads on file changes
- Use for testing changes locally before committing

## Project Structure

### Root Files
- `package.json` - Dependencies and npm scripts
- `next.config.mjs` - Next.js configuration with custom redirects
- `theme.config.tsx` - Nextra theme configuration (logo, footer, search, etc.)
- `tsconfig.json` - TypeScript compiler configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `cspell.json` - Spell checker configuration with custom dictionary
- `middleware.ts` - Next.js middleware for security headers (CSP, X-Frame-Options, etc.)
- `.gitignore` - Excludes: `node_modules`, `.next`, `.vercel`, `*.env*.local`, `openapi/out`

### Key Directories

**`pages/`** - All documentation content (MDX/MD files)
- `pages/docs/` - Main product documentation
- `pages/guides/` - User guides organized by topic, use case, and workflow
- `pages/changelogs/` - Product changelog posts (MUST include `video:` or `thumbnail:`)
- `pages/troubleshooting/` - FAQ and troubleshooting content
- `_meta.ts` or `_meta.json` - Nextra 3 sidebar/navigation configuration (JS/TS format, not JSON)

**`components/`** - React components
- Custom Next.js/Nextra components for documentation UI
- `Search/` - Custom Algolia DocSearch integration
- `ChangelogPostHeader/` - Changelog post header component
- `VideoButtonWithModal/` - Video modal component for embeds

**`openapi/`** - OpenAPI specification files
- `openapi/src/*.openapi.yaml` - Source OpenAPI specs (12 APIs)
- `openapi/openapi.config.yaml` - Redocly bundler configuration
- `openapi/out/*.json` - Built/bundled specs (git-ignored, generated)
- `openapi/test.sh` - API validation script
- `openapi/publish.js` - Publishing script

**`reference/`** - API reference documentation pages
- Auto-generated from OpenAPI specs
- 15 subdirectories for different APIs

**`public/`** - Static assets (images, videos, etc.)
- Upload images here, reference without `/public` prefix
- Example: `public/example.png` → `![alt](/example.png)`
- Organize in subdirectories: `/public/tutorials/`, `/public/changelog/`, etc.

**`utils/`** - Utility scripts
- `utils/test.sh` - Content validation tests
- `utils/replace_images.sh` - Image replacement helper

**`redirects/`** - Redirect configuration files
- Read by `next.config.mjs` to generate Next.js redirects
- Format: `source destination` (one per line)

**`hooks/`** - React hooks
**`legacy/`** - Legacy documentation files
**`types.d.ts`** - TypeScript type definitions

## GitHub Actions CI/CD Pipelines

All PRs and pushes to `main` trigger these workflows:

### Required Checks (Must Pass)
1. **`.github/workflows/tests.yml`** - Runs on all PRs/pushes to main
   - Node.js 20.x
   - `npm ci` → `npm test` → `npm run api:test`
   
2. **`.github/workflows/cspell.yaml`** - Spelling check on all PRs/pushes
   - Uses `streetsidesoftware/cspell-action@v8`
   - Checks all `**/*.md*` files
   - `strict: true` - fails on any spelling errors
   - Config: `cspell.json`

### Deployment Workflows
3. **`.github/workflows/vercel-preview.yaml`** - Deploys preview for non-main branches
   - Builds with Vercel CLI
   - Requires secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `SPRIG_ENVIRONMENT_ID`

4. **`.github/workflows/rdme-*.yml`** - ReadMe.io syncing (docs/staging/OpenAPI)
5. **`.github/workflows/stale.yaml`** - Marks stale issues

## Common Patterns and Conventions

### Documentation Files
- Use **MDX** for documentation pages with React components
- Use **MD** for simple markdown-only content
- All changelog posts MUST include either `video: <loom-link>` or `thumbnail: <image>` metadata

### Nextra 3 Differences from Nextra 2
- **Navigation:** Use `_meta.ts` or `_meta.tsx` (not `_meta.json`)
  - Can render with React components
  - Export default object or function
- **Components:** Import from `nextra/components`:
  - `import { Tabs } from 'nextra/components'` → Use `<Tabs.Tab>`
  - `import { Cards } from 'nextra/components'` → Use `<Cards.Card>`

### Image Guidelines
- No spaces in filenames (use hyphens or underscores)
- Add diagrams to [Figjam](https://www.figma.com/file/m4XseN6oAiu2yGN18qfamD/Docs-Toolkit) for future editing
- Use images judiciously (hard to keep up-to-date)

### Code Style
- TypeScript with `strict: false` in tsconfig.json
- React functional components
- Tailwind CSS for styling

## Common Pitfalls and Workarounds

### Spelling Errors in CI
**Problem:** CI fails with spelling errors for valid technical terms
**Solution:** Add words to `cspell.json` in the `words` array (alphabetically sorted)

### Build Timeouts
**Problem:** `npm run build` takes too long or times out
**Solution:** Build requires 2-4 minutes. In CI, ensure adequate timeout (default is sufficient)

### Deprecated Content Errors
**Problem:** `npm test` fails with "Disallowed content found"
**Solution:** Remove references to `/project/3/` and `/report/3/` - these are old deprecated URL patterns

### Missing OpenAPI Output
**Problem:** `openapi/out/*.json` files missing
**Solution:** Run `npm run api:build` - these files are git-ignored and must be generated locally

### Import Errors with Nextra Components
**Problem:** `Tab` or `Card` components not found
**Solution:** Use Nextra 3 imports: `import { Tabs, Cards } from 'nextra/components'` and use `<Tabs.Tab>`, `<Cards.Card>`

### Node Version Mismatch
**Problem:** Build fails with Node version errors
**Solution:** Use Node.js 20.x (check `engines` in package.json). Run `node --version` to verify.

## Validation Checklist

Before submitting any PR, ALWAYS run this complete validation sequence:

```bash
# 1. Clean install
npm ci

# 2. Run all checks (in order)
npm test                  # Content validation
npm run spelling          # Spell check
npm run api:test         # API validation
npm run build            # Full build (takes 2-4 min)

# 3. Verify no unintended files were created
git status
# If node_modules, .next, or openapi/out show as untracked, check .gitignore
```

**Expected Output:**
- All commands exit with code 0 (success)
- No spelling errors
- No disallowed content
- Build completes with sitemap generation
- Only your intended changes appear in `git status`

## Tips for Efficient Work

1. **Trust these instructions** - they are validated and comprehensive. Only search for additional information if something is missing or incorrect.

2. **Use `npm ci`** not `npm install` - ensures reproducible builds matching CI

3. **Add new terms to cspell.json immediately** when introducing technical terms to avoid CI failures

4. **Test locally before pushing** - Run the full validation checklist above

5. **Be patient with builds** - `npm run build` takes 2-4 minutes, this is normal

6. **Check .gitignore** - Don't commit: `node_modules/`, `.next/`, `.vercel/`, `openapi/out/`, `*.env*.local`

7. **For documentation changes only** - You can skip `npm run build` during iteration, but MUST run before final PR

8. **Preview changes** - Use `npm run dev` for live reload during development, or wait for Vercel preview link on PR

9. **Changelog posts** - MUST include `video:` or `thumbnail:` frontmatter. See `pages/changelogs/2024-04-18-ai-chatbot-search-in-docs.mdx` as example.

10. **Security headers** - All CSP and security headers are configured in `middleware.ts` - modify carefully

---

**Last Updated:** 2024-12-09
**Maintainers:** See README.md for current maintainer list

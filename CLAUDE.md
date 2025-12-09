# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Mixpanel's Official Documentation (https://docs.mixpanel.com) - a Next.js 14 + Nextra 3 documentation site with ~300+ pages, API references, guides, and changelogs.

## Critical Build Commands

**ALWAYS run validation in this order before submitting PRs:**

```bash
npm ci                # Install dependencies (use ci, not install)
npm test             # Content validation (<5 seconds)
npm run spelling     # Spell check (10-30 seconds)
npm run api:test     # API validation (30-60 seconds)
npm run build        # Full build (2-4 minutes - be patient)
```

**Development:**
```bash
npm run dev          # Start dev server at http://localhost:3000
```

**Single test commands:**
```bash
npm run api:lint     # Lint OpenAPI specs only
npm run api:build    # Build OpenAPI specs only
npx cspell "path/to/file.md"  # Check specific file spelling
```

## High-Level Architecture

### Documentation Framework
- **Nextra 3** (not v2) - Documentation framework on Next.js 14
- Navigation configured via `_meta.ts` files (TypeScript, not JSON)
- MDX files for interactive docs with React components
- Component imports: `import { Tabs, Cards } from 'nextra/components'` → use `<Tabs.Tab>`, `<Cards.Card>`

### Content Organization
```
pages/
├── docs/           # Main product documentation
├── guides/         # User guides by topic/workflow
├── changelogs/     # Product updates (MUST have video: or thumbnail:)
├── troubleshooting/# FAQs
└── _meta.ts        # Navigation configuration for each directory
```

### API Documentation Pipeline
```
openapi/src/*.yaml → Redocly bundler → openapi/out/*.json → reference/ pages
```
- 12 API specifications bundled and validated
- Output files (openapi/out/) are git-ignored - must be generated locally

### Security & Middleware
- All CSP headers configured in `middleware.ts`
- Strict security policies for external resources
- Custom headers for frame options, content types

## Key Conventions

### Changelog Posts
Every changelog post MUST include either:
- `video: <loom-link>` OR
- `thumbnail: <image-path>`

Example: [pages/changelogs/2024-04-18-ai-chatbot-search-in-docs.mdx](pages/changelogs/2024-04-18-ai-chatbot-search-in-docs.mdx)

### Images & Assets
- Upload to `public/` directory
- Reference without `/public` prefix: `![alt](/example.png)`
- No spaces in filenames (use hyphens/underscores)
- Organize in subdirectories: `/public/tutorials/`, `/public/changelog/`

### Spelling Dictionary
- Technical terms go in `cspell.json` words array (alphabetically sorted)
- Custom dictionary: `.cspell/custom-dictionary.txt`
- CI enforces spelling checks on all MDX/MD files

### Content Validation
The repository validates against deprecated URL patterns:
- `/project/3/` and `/report/3/` are disallowed
- Checked by `npm test` via `utils/test.sh`

### Redirects
- Configure in `redirects/` directory files
- Format: `source destination` (one per line)
- Parsed by `next.config.mjs` at build time

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Spelling errors in CI | Add to `cspell.json` words array |
| Build takes too long | Normal - 2-4 minutes for 300+ pages |
| Missing openapi/out/*.json | Run `npm run api:build` |
| Import errors with Nextra | Use Nextra 3 syntax: `import { Tabs } from 'nextra/components'` |
| Node version errors | Use Node.js 20.x (required: >=20.0.0 <21.0.0) |
| Disallowed content error | Remove `/project/3/` or `/report/3/` references |

## CI/CD Workflows

**Required checks (must pass):**
- `.github/workflows/tests.yml` - Content and API validation
- `.github/workflows/cspell.yaml` - Spelling check
- Vercel preview deployment for all PRs

**Environment setup:**
- `.github/workflows/copilot-setup-steps.yml` - Pre-installs dependencies and builds OpenAPI for Copilot agents

## Development Tips

1. **Always use `npm ci`** instead of `npm install` for reproducible builds
2. **Preview changes** get auto-deployed to Vercel on PR creation
3. **Test locally first** - Run full validation checklist before pushing
4. **Edit existing files** when possible rather than creating new ones
5. **Check git status** - Don't commit: node_modules/, .next/, openapi/out/
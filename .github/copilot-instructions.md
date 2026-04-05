# Copilot Instructions for mixpanel/docs

## Project Overview
This is Mixpanel's official documentation site, built with Nextra 3 (Next.js). Documentation pages are MDX files located in the `pages/` directory. The site uses Tailwind CSS for styling and is deployed via Vercel.

## Repository Structure
- `pages/` — All documentation content as `.mdx` files
- `components/` — React components used within docs
- `public/` — Static assets (images, GIFs)
- `openapi/` — OpenAPI spec files for API reference docs
- `redirects/` — URL redirect configuration

## Writing Style Review
When reviewing pull requests that modify `.mdx` or `.md` files:
- Flag any sentences written in passive voice and suggest an active voice alternative.
- Passive voice examples to catch: "was configured", "is sent by", "can be viewed", "will be created by".
- Prefer direct, imperative constructions: "Configure X" instead of "X is configured", "Mixpanel sends Y" instead of "Y is sent by Mixpanel".
- Do not flag passive voice in code snippets, API response descriptions, or inline code blocks.
- When suggesting a rewrite, preserve the original technical meaning exactly.

## Build and Validation
- Install dependencies: `npm ci`
- Run locally: `npm run dev` (serves at http://localhost:3000)
- Check spelling: `npm run spelling`
- The project uses CSpell for spell checking; custom words are in `cspell.json`

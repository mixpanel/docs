# Copilot Instructions for mixpanel/docs

## Project Overview
This is Mixpanel's official documentation site, built with Nextra 3 (Next.js). Documentation pages are MDX files located in the `pages/` directory. The site uses Tailwind CSS for styling and is deployed via Vercel.

## Repository Structure
- `pages/docs/` — All documentation content as `.mdx` or `.md` files. This documentation covers all Mixpanel product features and serves as the primary reference for understanding how they work.
- `pages/guides/` — All guides content as `.mdx` or `.md` files. These guides walk through real-world use cases for Mixpanel and show users how to combine Mixpanel features to solve them.
- `pages/changelogs/` — All changelog content as `.mdx` or `.md` files. Release note for any change that materially affects the customer experience. Small improvements in load time, moving a button, etc. don't get a dedicated changelog
- `components/` — React components used within docs
- `public/` — Static assets (images, GIFs, etc.)
- `openapi/` — OpenAPI spec files for API reference docs. These files describe Mixpanel's public APIs.
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

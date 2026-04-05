---
applyTo: "pages/docs/**/*.mdx"
---


## Writing Style Review

When reviewing pull requests that modify `.mdx` or `.md` files in `pages/docs/`:

### Scope
- Apply writing style review to all prose content in `.mdx` and `.md` files.
- Do NOT flag passive voice in:
  - Code snippets, inline code blocks, or code comments
  - API response descriptions and OpenAPI spec files
  - JSX component props and attributes
  - Frontmatter fields (e.g., `title:`, `description:`, `tags:`)
  - Headings and subheadings
  - Industry-standard technical phrases where rewriting would reduce clarity (e.g., "the error is thrown", "the request is rate-limited", "the field is required")

### Passive Voice Detection
Flag sentences written in passive voice and leave a non-blocking suggestion comment with an active voice alternative. Do NOT block or request changes to a PR solely on the basis of passive voice.

Common passive voice patterns to flag:
- "was configured" → "you configured" or "configure"
- "is sent by" → "Mixpanel sends"
- "can be viewed" → "you can view"
- "will be created by" → "Mixpanel creates"
- "is used to" → "use X to"
- "are returned by" → "Mixpanel returns"
- "should be set to" → "set X to"
- "is not supported" → "Mixpanel does not support"

### Rewrite Guidelines
- Prefer direct, imperative constructions for instructions: "Configure X" instead of "X should be configured".
- Use "Mixpanel" or "you" as the subject where appropriate: "Mixpanel sends Y" instead of "Y is sent by Mixpanel", "You can filter by Z" instead of "Z can be filtered".
- Always preserve the original technical meaning exactly when suggesting a rewrite.
- If a sentence cannot be rewritten in active voice without losing technical accuracy or clarity, do not flag it.

### Examples
| Passive (flag this) | Active (suggest this) |
|---|---|
| "Events are tracked when a user completes an action." | "Mixpanel tracks events when a user completes an action." |
| "The report can be saved by clicking the save button." | "Save the report by clicking the save button." |
| "A cohort will be created based on the filter criteria." | "Mixpanel creates a cohort based on the filter criteria." |
| "Properties can be used to segment your data." | "Use properties to segment your data." |
| "This setting is used to configure the retention window." | "Use this setting to configure the retention window." |

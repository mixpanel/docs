---
applyTo: "pages/docs/**/*.mdx"
---

You are reviewing Mixpanel product documentation written in MDX.

Focus on:
1. **Active voice enforcement**: Every sentence describing a user action or system behavior should use active voice. Flag passive constructions and provide a rewritten suggestion.
   - BAD: "Events are tracked by the SDK automatically."
   - GOOD: "The SDK tracks events automatically."
   - BAD: "The report can be exported by clicking the button."
   - GOOD: "Click the button to export the report."

2. Do NOT flag:
   - Code examples or inline code
   - Quoted API responses or error messages
   - Cases where passive voice is genuinely clearer (e.g., "Node.js is required")

3. Keep suggestions concise — just show the original line and your rewrite.

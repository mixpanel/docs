# Transforming Raw OpenAPI Specs for ReadMe

This guide walks through converting a raw auto-generated OpenAPI spec into the format used by this repo, so it builds cleanly with Redocly and renders correctly on ReadMe.

Use `openapi/src/feature-flags.openapi.yaml` as a reference implementation — it was transformed from a raw spec using these exact steps.

## Prerequisites

- The raw spec (typically OpenAPI 3.0.x, auto-generated from a backend framework)
- Knowledge of which server the API is hosted on (check `openapi/src/common/` for existing server definitions)
- Knowledge of the auth scheme (check `openapi/src/common/securitySchemes.yaml` for existing options: `ServiceAccount`, `ProjectSecret`, `OAuthToken`)

## Step-by-step

### 1. Set up the file header

Replace the raw `info` block with the repo's standard format. Upgrade the OpenAPI version to `3.1.0` if the raw spec is `3.0.x`.

```yaml
openapi: 3.1.0
x-readme-deploy-id: your-api-name   # must match the output filename stem in openapi.config.yaml
info:
  title: Your API Name
  description: >-
    One-line public-facing description of the API.
  contact:
    url: 'https://mixpanel.com/get-support'
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
  version: 1.0.0
```

### 2. Add servers

Reference an existing server definition from `openapi/src/common/`, or create a new one if the API has a unique base URL.

```yaml
servers:
  - $ref: ./common/app-api.yaml#/server          # for app APIs (mixpanel.com/api/app)
  # - $ref: ./common/feature-flags-api.yaml#/server  # for feature-flags API
  # - $ref: ./common/ingestion-api.yaml#/server       # for ingestion API
```

If you need a new server, create `openapi/src/common/your-api.yaml` following the pattern in existing files.

### 3. Add tags

Group operations into logical categories. Each tag becomes a section in the ReadMe sidebar.

```yaml
tags:
  - name: Tag Name
    description: Short description of this group of operations
```

### 4. Add security schemes reference

```yaml
components:
  securitySchemes:
    $ref: ./common/securitySchemes.yaml
```

### 5. Transform paths

The raw spec will have minimal path definitions. Each needs several additions:

**Before (raw):**
```yaml
/projects/{project_id}/your-resource:
  get:
    responses:
      '200':
        description: Success
```

**After (transformed):**
```yaml
/projects/{project_id}/your-resource:
  servers:
    - $ref: ./common/app-api.yaml#/server       # if different from top-level server
  parameters:
    - $ref: '#/components/parameters/ProjectId'  # path params at the path level
  get:
    operationId: list-your-resource              # kebab-case, becomes the ReadMe page slug
    tags:
      - Your Tag Name
    summary: List Your Resource                  # title on the ReadMe page
    security:
      - ServiceAccount: []                       # or ProjectSecret, OAuthToken
    responses:
      '200':
        description: Success
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/YourResponseSchema'
      '401':
        $ref: ./common/responses.yaml#/401Unauthorized
      '403':
        $ref: ./common/responses.yaml#/403Forbidden
```

**Checklist for every operation:**
- [ ] `operationId` — kebab-case, unique, becomes the page slug on ReadMe
- [ ] `tags` — at least one, matching a tag defined at the top level
- [ ] `summary` — short human-readable title
- [ ] `security` — auth scheme
- [ ] `responses` — include `401` and `403` refs from common responses
- [ ] Response `content` with `$ref` to a schema (not inline)

**Path-level checklist:**
- [ ] `servers` — if the path uses a different server than the spec default
- [ ] `parameters` — path params (`project_id`, `flag_id`, etc.) defined via `$ref`

### 6. Define reusable path parameters

Add these under `components/parameters`:

```yaml
components:
  parameters:
    ProjectId:
      name: project_id
      in: path
      schema:
        type: integer
      required: true
    # Add more as needed for your resource IDs
```

### 7. Remove workspace-scoped duplicate paths

Raw specs from the backend often include both `/projects/{project_id}/...` and `/projects/{project_id}/workspaces/{workspace_id}/...` variants. **Remove all workspace-scoped paths.** Only the project-scoped paths are published.

### 8. Flatten `$defs` into `components/schemas`

This is the most involved step. Raw specs from Python/FastAPI frameworks use JSON Schema `$defs` nested inside each response schema, leading to massive duplication.

**Before (raw):** Each response has its own copy of shared types inline:
```yaml
SingleFeatureFlagResponse:
  $defs:
    Variant:
      properties: ...
    Rollout:
      properties: ...
    FeatureFlagApiResponse:
      properties:
        ruleset:
          $ref: '#/$defs/RuleSet'
      ...
```

**After (transformed):** Hoist everything to `components/schemas` with standard `$ref`:
```yaml
components:
  schemas:
    Variant:
      properties: ...
    Rollout:
      properties: ...
    FeatureFlagApiResponse:
      properties:
        ruleset:
          $ref: '#/components/schemas/RuleSet'
      ...
```

**Key rules:**
- Move every `$defs` entry to `components/schemas`
- Rewrite all `$ref: '#/$defs/Foo'` to `$ref: '#/components/schemas/Foo'`
- Deduplicate — if `Variant` appears identically in 5 response `$defs`, keep one copy
- Remove the now-empty `$defs` wrappers from response schemas

### 9. Resolve schema name collisions

If the spec is being added to a file that already has schemas with the same names (e.g., both evaluation and management endpoints define `Variant`, `Rollout`, `RuleSet`), prefix the new schemas to avoid collisions.

Convention: prefix with the domain name (e.g., `Management`):
- `Variant` → `ManagementVariant`
- `Rollout` → `ManagementRollout`
- `RuleSet` → `ManagementRuleSet`
- `VariantOverride` → `ManagementVariantOverride`
- `TestUsers` → `ManagementTestUsers`
- `ApiErrorResponse` → `ManagementApiErrorResponse`

Update all `$ref` pointers to use the new names.

### 10. Create wrapper response schemas

ReadMe renders response schemas well when there's a clear success/error union. Create wrapper schemas using `anyOf`:

```yaml
SingleFeatureFlagResponse:
  anyOf:
    - $ref: '#/components/schemas/SingleFeatureFlagApiResponse'
    - $ref: '#/components/schemas/ManagementApiErrorResponse'
```

Operations should reference these wrapper schemas, not the inner success/error types directly.

### 11. Update `nullable` syntax for OpenAPI 3.1

If upgrading from 3.0.x to 3.1.0, replace `nullable: true` with type arrays:

```yaml
# Before (3.0.x)
type: string
nullable: true

# After (3.1.0)
type:
  - string
  - 'null'
```

### 12. Register the spec in the build config

Add an entry to `openapi/openapi.config.yaml`:

```yaml
apis:
  your-api-key:
    root: ./src/your-api.openapi.yaml
    output: ./out/your-api-name.json
```

The output filename is what `publish.js` uses to match against ReadMe's remote specs.

### 13. Validate and build

```bash
npm run api:build    # bundles all specs into openapi/out/
npm run api:lint     # checks for spec errors
```

Fix any validation errors before committing.

## What NOT to do

- **Don't create manual reference pages** in `reference/` for endpoints defined in the OpenAPI spec. ReadMe auto-generates reference pages from uploaded specs. Manual pages will create slug collisions (pages get `-1` suffixes).
- **Don't inline schemas** in path responses. Always use `$ref` to `components/schemas`.
- **Don't keep workspace-scoped duplicate paths.** Remove them.
- **Don't leave `$defs`** in the spec. Redocly bundling + ReadMe rendering handle `components/schemas` refs, not JSON Schema `$defs`.

## Verification

1. `npm run api:build` succeeds without errors
2. Push to a PR branch — the `rdme-staging` workflow uploads the spec to a staging version
3. Check the staging workflow logs: confirm the spec shows `"Updating Your API (your-api-name.json)"` (not `"!!! No spec found"`)
4. Visit `https://developer.mixpanel.com/v3.27-pr-{NUMBER}/reference/{operationId}` and confirm the API spec renders with method, path, parameters, and "Try It!" button

## Reference files

| File | Purpose |
|------|---------|
| `openapi/src/feature-flags.openapi.yaml` | Reference implementation (transformed from raw spec) |
| `openapi/src/service-accounts.openapi.yaml` | Another good example of a complete spec |
| `openapi/src/common/securitySchemes.yaml` | Available auth schemes |
| `openapi/src/common/responses.yaml` | Shared error responses (401, 403, etc.) |
| `openapi/src/common/app-api.yaml` | App API server definition |
| `openapi/openapi.config.yaml` | Build config mapping source → output |
| `openapi/publish.js` | Publishes bundled specs to ReadMe |

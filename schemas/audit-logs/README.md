# Audit Log JSON Schemas

JSON Schemas for Mixpanel [Audit Log](https://docs.mixpanel.com/docs/access-security/audit-log) entries. Use them to validate entries or generate types.

See the [Audit Log Reference](https://docs.mixpanel.com/docs/access-security/audit-log-reference) for the event type catalog.

## Contents

| Path                                   | What it is                                                                |
| -------------------------------------- | ------------------------------------------------------------------------- |
| `audit_log.json`                       | The envelope every entry shares, with `entity` left as a generic object.  |
| `entities/<entity_type>.<action>.json` | One schema per event type, describing the `entity` payload for that type. |

To validate a full entry, use `audit_log.json` and the `entities/` schema matching its type. For example, `project.transferred` uses `entities/project.transferred.json`.

Each entity schema carries an `x-release-date` giving when Mixpanel began recording that type.

## Stability

Payloads can gain fields. Consumers should ignore unrecognized fields. Fields are not removed or retyped without a versioning plan.

The files use [JSON Schema 2020-12](https://json-schema.org/draft/2020-12).

## Feedback

These files are generated; edits are overwritten. Report issues through [Mixpanel support](https://mixpanel.com/get-support).

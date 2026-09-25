#!/usr/bin/env python3
"""
CI gate: validate every OpenAPI specification under openapi/.

Checks performed:
  1. The file parses as YAML or JSON.
  2. Required top-level structure is present (openapi/swagger version, info
     with title and version, and paths).
  3. Every local $ref ("#/...") resolves to a node that exists in the document.
  4. If openapi-spec-validator is installed, the full spec is validated against
     the OpenAPI schema, and every example is validated against the schema it
     illustrates (media-type and parameter `example`/`examples`, plus
     schema-level `example`). Without it, checks 1-3 still run.
"""

import glob
import json
import os
import sys

import yaml


def load(path: str):
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    if path.endswith(".json"):
        return json.loads(text)
    return yaml.safe_load(text)


def iter_refs(node, trail="#"):
    """Yield every ($ref value, location) pair in the document."""
    if isinstance(node, dict):
        for key, value in node.items():
            if key == "$ref" and isinstance(value, str):
                yield value, trail
            else:
                yield from iter_refs(value, f"{trail}/{key}")
    elif isinstance(node, list):
        for index, value in enumerate(node):
            yield from iter_refs(value, f"{trail}/{index}")


def resolves(doc, ref: str) -> bool:
    """Walk a local JSON pointer ("#/components/schemas/Foo") through the doc."""
    node = doc
    for part in ref.lstrip("#/").split("/"):
        # JSON pointer escapes, per RFC 6901.
        part = part.replace("~1", "/").replace("~0", "~")
        if isinstance(node, list):
            if not part.isdigit() or int(part) >= len(node):
                return False
            node = node[int(part)]
        elif isinstance(node, dict):
            if part not in node:
                return False
            node = node[part]
        else:
            return False
    return True

# Keywords that mark a mapping as a Schema Object, so a schema-level `example`
# can be told apart from an arbitrary mapping that happens to have that key.
SCHEMA_KEYWORDS = {"type", "properties", "items", "allOf", "oneOf", "anyOf", "enum", "format", "$ref"}


def escape_pointer(key) -> str:
    return str(key).replace("~", "~0").replace("/", "~1")


def deref(doc, node):
    """Follow local $refs (e.g. to components/examples) to the target node."""
    for _ in range(20):
        if not (isinstance(node, dict) and str(node.get("$ref", "")).startswith("#")):
            return node
        if not resolves(doc, node["$ref"]):
            return None
        target = doc
        for part in node["$ref"][2:].split("/"):
            part = part.replace("~1", "/").replace("~0", "~")
            target = target[int(part)] if isinstance(target, list) else target[part]
        node = target
    return node


def iter_examples(doc, node, pointer=""):
    """Yield (schema pointer, example location, example value) triples.

    Example Objects from an `examples` map are unwrapped to their `value`
    (following $refs); ones using externalValue are skipped.
    """
    if isinstance(node, list):
        for index, value in enumerate(node):
            yield from iter_examples(doc, value, f"{pointer}/{index}")
        return
    if not isinstance(node, dict):
        return

    if isinstance(node.get("schema"), dict):
        # Media Type or Parameter Object: examples illustrate node["schema"].
        if "example" in node:
            yield f"{pointer}/schema", f"{pointer}/example", node["example"]
        for name, example in (node.get("examples") or {}).items():
            example = deref(doc, example)
            if isinstance(example, dict) and "value" in example:
                yield f"{pointer}/schema", f"{pointer}/examples/{escape_pointer(name)}", example["value"]
    elif "example" in node and SCHEMA_KEYWORDS & node.keys():
        yield pointer, f"{pointer}/example", node["example"]

    for key, value in node.items():
        # Example payloads are data, not schema; don't mistake their keys for
        # keywords.
        if key in ("example", "examples"):
            continue
        child = f"{pointer}/{escape_pointer(key)}"
        if key == "properties" and isinstance(value, dict):
            # Keys here are property names, so a property literally called
            # "example" or "type" must not make the map look like a schema.
            for name, prop in value.items():
                yield from iter_examples(doc, prop, f"{child}/{escape_pointer(name)}")
            continue
        yield from iter_examples(doc, value, child)


def check_examples(doc, display: str) -> list[str]:
    """Validate every example against its schema, resolving $refs in the doc."""
    from openapi_schema_validator import OAS30Validator, OAS31Validator
    from referencing import Registry, Resource
    from referencing.jsonschema import DRAFT4, DRAFT202012

    is_31 = str(doc.get("openapi", "")).startswith("3.1")
    validator_cls = OAS31Validator if is_31 else OAS30Validator
    resource = Resource.from_contents(doc, default_specification=DRAFT202012 if is_31 else DRAFT4)
    registry = Registry().with_resource("urn:spec", resource)

    errors = []
    for schema_pointer, where, example in iter_examples(doc, doc):
        validator = validator_cls({"$ref": f"urn:spec#{schema_pointer}"}, registry=registry)
        first = next(iter(validator.iter_errors(example)), None)
        if first is not None:
            errors.append(f"{display}: example at {where} does not match its schema: {first.message}")
    return errors


def check_file(path: str, display: str) -> list[str]:
    errors = []
    try:
        doc = load(path)
    except Exception as exc:  # noqa: BLE001 - report any parse failure verbatim
        return [f"{display}: does not parse ({type(exc).__name__}: {exc})"]

    if not isinstance(doc, dict):
        return [f"{display}: top level is not a mapping"]

    if not (doc.get("openapi") or doc.get("swagger")):
        errors.append(f"{display}: missing 'openapi' (or 'swagger') version field")

    info = doc.get("info")
    if not isinstance(info, dict):
        errors.append(f"{display}: missing 'info' object")
    else:
        for field in ("title", "version"):
            if not info.get(field):
                errors.append(f"{display}: 'info.{field}' is missing or empty")

    if "paths" not in doc and "webhooks" not in doc:
        errors.append(f"{display}: missing 'paths'")

    for ref, where in iter_refs(doc):
        if ref.startswith("#"):
            if not resolves(doc, ref):
                errors.append(f"{display}: unresolved local $ref '{ref}' at {where}")
        elif not ref.startswith(("http://", "https://")):
            target = os.path.join(os.path.dirname(path), ref.split("#")[0])
            if not os.path.exists(target):
                errors.append(f"{display}: $ref points at a missing file '{ref}'")

    return errors


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    spec_dir = os.path.join(root, "openapi")
    if not os.path.isdir(spec_dir):
        print("OpenAPI check SKIPPED (no openapi/ directory).")
        return 0

    specs = sorted(
        glob.glob(os.path.join(spec_dir, "**", "*.yaml"), recursive=True)
        + glob.glob(os.path.join(spec_dir, "**", "*.yml"), recursive=True)
        + glob.glob(os.path.join(spec_dir, "**", "*.json"), recursive=True)
    )

    try:
        from openapi_spec_validator import validate as spec_validate

        deep = True
    except ImportError:
        spec_validate = None
        deep = False

    all_errors: list[str] = []
    for path in specs:
        rel = os.path.relpath(path, root)
        errors = check_file(path, rel)
        if not errors and spec_validate is not None:
            try:
                spec_validate(load(path))
            except Exception as exc:  # noqa: BLE001 - surface the validator's message
                first = str(exc).split("\n")[0]
                errors.append(f"{rel}: failed OpenAPI schema validation: {first}")
            else:
                errors.extend(check_examples(load(path), rel))
        all_errors.extend(errors)

    if all_errors:
        print("OpenAPI check FAILED:")
        for err in all_errors:
            print(f"  {err}")
        return 1

    depth = "structure + schema + examples" if deep else "structure only (validator not installed)"
    print(f"OpenAPI check PASSED ({len(specs)} specs validated, {depth}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

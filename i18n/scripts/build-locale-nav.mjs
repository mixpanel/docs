#!/usr/bin/env node
/**
 * build-locale-nav.mjs — generate a Mintlify locale navigation tree from the English one.
 *
 * Mintlify localizes navigation via `navigation.languages[]`. Each entry repeats the whole
 * nav tree with (a) translated labels and (b) every page path prefixed with the locale.
 * Mintlify's own docs keep each non-default locale in its own file and `$ref` it from
 * docs.json, which keeps docs.json readable — we do the same.
 *
 * Usage:
 *   node i18n/scripts/build-locale-nav.mjs ko                      # writes i18n/nav/ko.json
 *   node i18n/scripts/build-locale-nav.mjs ko --check              # report label gaps, write nothing
 *   node i18n/scripts/build-locale-nav.mjs ko --drop-tab="API Docs"  # omit a tab from this locale
 *
 * Input : docs.json (navigation.tabs = the English tree) + i18n/nav/labels.<locale>.json
 * Output: i18n/nav/<locale>.json  ->  { "language": "<locale>", "tabs": [...] }
 *
 * Untranslated labels are left in English and reported, so the file is always usable
 * and the gap is always visible.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const LABEL_KEYS = ["tab", "group", "anchor", "dropdown", "item"];
// Keys whose string values are page paths and must be locale-prefixed.
const PATH_KEYS = ["root"];

const [locale, ...flags] = process.argv.slice(2);
if (!locale) {
  console.error("usage: build-locale-nav.mjs <locale> [--check]");
  process.exit(2);
}
const checkOnly = flags.includes("--check");
// Tabs to omit from this locale — for scope decisions like deferring the OpenAPI-backed
// API reference, whose rendered content comes from openapi/*.yaml rather than the MDX.
const dropTabs = flags
  .filter((f) => f.startsWith("--drop-tab="))
  .map((f) => f.slice("--drop-tab=".length).replace(/^["']|["']$/g, ""));

const docs = JSON.parse(readFileSync(resolve(ROOT, "docs.json"), "utf8"));
const labels = JSON.parse(
  readFileSync(resolve(ROOT, `i18n/nav/labels.${locale}.json`), "utf8"),
);

const missing = new Set();
const unused = new Set(Object.keys(labels).filter((k) => !k.startsWith("_")));

const translate = (label) => {
  if (Object.prototype.hasOwnProperty.call(labels, label)) {
    unused.delete(label);
    return labels[label];
  }
  missing.add(label);
  return label;
};

/** Prefix a page path with the locale: "docs/foo" -> "ko/docs/foo". */
const localizePath = (p) => {
  if (typeof p !== "string") return p;
  if (/^https?:\/\//.test(p) || p.startsWith(`${locale}/`)) return p;
  return `${locale}/${p.replace(/^\//, "")}`;
};

const walk = (node) => {
  if (Array.isArray(node)) return node.map(walk);
  if (node === null || typeof node !== "object") return node;

  const out = {};
  for (const [key, value] of Object.entries(node)) {
    if (LABEL_KEYS.includes(key) && typeof value === "string") {
      out[key] = translate(value);
    } else if (PATH_KEYS.includes(key) && typeof value === "string") {
      out[key] = localizePath(value);
    } else if (key === "pages" && Array.isArray(value)) {
      // `pages` mixes page-path strings with nested group objects.
      out[key] = value.map((p) => (typeof p === "string" ? localizePath(p) : walk(p)));
    } else {
      out[key] = walk(value);
    }
  }
  return out;
};

const sourceTabs = docs.navigation.tabs.filter((t) => {
  if (!dropTabs.includes(t.tab)) return true;
  console.warn(`• dropping tab "${t.tab}" from the ${locale} tree`);
  return false;
});
const tree = { language: locale, tabs: walk(sourceTabs) };

if (missing.size) {
  console.warn(`⚠ ${missing.size} label(s) with no ${locale} translation (left in English):`);
  for (const m of [...missing].sort()) console.warn(`    ${m}`);
}
if (unused.size) {
  console.warn(`⚠ ${unused.size} entr(ies) in labels.${locale}.json match nothing in docs.json:`);
  for (const u of [...unused].sort()) console.warn(`    ${u}`);
}

if (checkOnly) {
  console.log(missing.size || unused.size ? "check: FAIL" : "check: OK");
  process.exit(missing.size || unused.size ? 1 : 0);
}

const outPath = resolve(ROOT, `i18n/nav/${locale}.json`);
writeFileSync(outPath, `${JSON.stringify(tree, null, 2)}\n`);

let pages = 0;
JSON.stringify(tree, (k, v) => (k === "pages" && Array.isArray(v) ? (pages += v.filter((x) => typeof x === "string").length, v) : v));
console.log(`✓ wrote i18n/nav/${locale}.json — ${pages} page paths prefixed with "${locale}/"`);

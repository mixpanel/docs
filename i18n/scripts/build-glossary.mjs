#!/usr/bin/env node
/**
 * build-glossary.mjs — derive the machine-readable glossary from the human one.
 *
 * i18n/glossary/<locale>.md is the single source of truth: reviewers edit prose, not CSV.
 * This flattens its term tables into <locale>.csv for engine config (Lingo.dev glossary,
 * GT custom instructions, or a `--glossary` prompt preamble), and into <locale>.dnt.txt
 * for the do-not-translate list.
 *
 * Usage: node i18n/scripts/build-glossary.mjs ko [--check]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const locale = process.argv[2] || "ko";
const checkOnly = process.argv.includes("--check");

const md = readFileSync(resolve(ROOT, `i18n/glossary/${locale}.md`), "utf8");

const rows = [];
let section = "";
for (const line of md.split(/\r?\n/)) {
  const h = /^##\s+(.*)$/.exec(line);
  if (h) { section = h[1].trim(); continue; }
  if (!line.startsWith("|")) continue;
  const cells = line.split("|").slice(1, -1).map((c) => c.trim());
  if (cells.length < 2) continue;
  if (/^-+:?$|^:?-+/.test(cells[0])) continue;         // separator row
  if (/^English$/i.test(cells[0])) continue;            // header row
  const strip = (s) => s.replace(/\*\*/g, "").trim();
  const en = strip(cells[0]);
  const ko = strip(cells[1]);
  if (!en || !ko || ko === "—") continue;
  const note = strip(cells[cells.length - 1]);
  rows.push({ en, ko, section, note: /^\d+$/.test(note) || note === ko ? "" : note });
}

// Do-not-translate terms: the bullet list under "Never translate".
const dntBlock = md.split(/^## Never translate$/m)[1]?.split(/^## /m)[0] ?? "";
const dnt = [...dntBlock.matchAll(/`([^`]+)`|\b([A-Z][\w.\/$-]*(?:\s[A-Z][\w.\/-]*)*)\b/g)]
  .map((m) => m[1] ?? m[2])
  .filter((t) => t && t.length > 1 && !/^(Latin|Product|SDK|Integration|Reserved|API|Anything|Never)$/.test(t));

const csv =
  "english,korean,section,note\n" +
  rows.map((r) => [r.en, r.ko, r.section, r.note].map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n") +
  "\n";
const dntTxt = `${[...new Set(dnt)].sort().join("\n")}\n`;

const csvPath = resolve(ROOT, `i18n/glossary/${locale}.csv`);
const dntPath = resolve(ROOT, `i18n/glossary/${locale}.dnt.txt`);

if (checkOnly) {
  const stale = [[csvPath, csv], [dntPath, dntTxt]].filter(([p, want]) => {
    try { return readFileSync(p, "utf8") !== want; } catch { return true; }
  });
  if (stale.length) {
    console.error(`✗ stale: ${stale.map(([p]) => p.replace(`${ROOT}/`, "")).join(", ")} — run build-glossary.mjs`);
    process.exit(1);
  }
  console.log("✓ generated glossary files are up to date");
  process.exit(0);
}

writeFileSync(csvPath, csv);
writeFileSync(dntPath, dntTxt);
console.log(`✓ ${rows.length} terms → i18n/glossary/${locale}.csv`);
console.log(`✓ ${new Set(dnt).size} do-not-translate terms → i18n/glossary/${locale}.dnt.txt`);

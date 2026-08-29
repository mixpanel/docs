#!/usr/bin/env node
/**
 * validate-mdx-parity.mjs — assert a translated MDX file preserves everything the
 * preservation spec says must survive translation (i18n/01-scope-and-preservation-spec.md).
 *
 * Machine translation of MDX fails in specific, repeatable ways: it renames JSX components,
 * "translates" identifiers inside code fences, localizes image paths, drops import lines,
 * or mangles `{...}` expressions. Every one of those is a broken page, and none of them are
 * visible in a text diff review. This script catches them mechanically so human review can
 * spend its time on whether the Korean is any good.
 *
 * Zero dependencies — this repo has no package.json and none is wanted.
 *
 * Usage:
 *   node i18n/scripts/validate-mdx-parity.mjs --source docs --target ko/docs --locale ko
 *   node i18n/scripts/validate-mdx-parity.mjs --source docs/quickstart/install-mixpanel.mdx \
 *        --target i18n/pilot/ko/docs/quickstart/install-mixpanel.mdx --locale ko
 *
 * Flags:
 *   --locale <code>       target locale; enables the "did anything actually get translated"
 *                         script check (currently ko / ja / zh*)
 *   --link-prefix         expect internal links rewritten to /<locale>/... instead of identical
 *   --require-anchors     promote heading-anchor drift from warning to error
 *   --allow-code-comments allow comment lines inside code fences to be translated
 *   --json                emit machine-readable results
 *   --quiet               only print failures
 *
 * Exit code 0 = all files pass, 1 = at least one ERROR, 0 with warnings printed otherwise.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";

/* ------------------------------------------------------------------ args */
const argv = process.argv.slice(2);
const arg = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`);
  if (i !== -1 && argv[i + 1] && !argv[i + 1].startsWith("--")) return argv[i + 1];
  const inline = argv.find((a) => a.startsWith(`--${name}=`));
  return inline ? inline.slice(name.length + 3) : fallback;
};
const has = (name) => argv.includes(`--${name}`);

const SOURCE = arg("source");
const TARGET = arg("target");
const LOCALE = arg("locale");
const LINK_PREFIX = has("link-prefix");
// Heading-anchor drift is a warning by default and an error under --require-anchors,
// so the rule can be turned on as a hard gate once the engine emits explicit anchors.
const requireAnchors = has("require-anchors");
// Code fences are verbatim by default. Some pages carry substantial reader-facing explanation
// in code comments; --allow-code-comments permits comment lines to differ while still requiring
// every executable line, and the line count, to match exactly.
const allowCodeComments = has("allow-code-comments");
const AS_JSON = has("json");
const QUIET = has("quiet");

if (!SOURCE || !TARGET) {
  console.error("usage: validate-mdx-parity.mjs --source <file|dir> --target <file|dir> [--locale ko]");
  process.exit(2);
}

/* -------------------------------------------------------------- extraction */

/** Split frontmatter from body. Returns { fm: Map|null, body }. */
function splitFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { fm: null, body: text };
  const fm = new Map();
  let key = null;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (kv) {
      key = kv[1];
      fm.set(key, kv[2].trim());
    } else if (key && /^\s+\S/.test(line)) {
      // nested block (e.g. `og:` children) — fold into the parent for comparison
      fm.set(key, `${fm.get(key)}\n${line.trim()}`);
    }
  }
  return { fm, body: text.slice(m[0].length) };
}

/**
 * Walk the body once, pulling out fenced code blocks so nothing downstream
 * mistakes code for prose. Returns { fences, stripped } where `stripped`
 * has each fence replaced by a blank line of the same count.
 */
function extractFences(body) {
  const lines = body.split(/\r?\n/);
  const fences = [];
  const out = [];
  let open = null;
  let buf = [];
  for (const line of lines) {
    const f = /^(\s*)(`{3,}|~{3,})(.*)$/.exec(line);
    if (open) {
      if (f && f[2][0] === open.char && f[2].length >= open.len && f[3].trim() === "") {
        fences.push({ info: open.info, code: buf.join("\n") });
        out.push("");
        open = null;
        buf = [];
      } else {
        buf.push(line);
        out.push("");
      }
      continue;
    }
    if (f) {
      open = { char: f[2][0], len: f[2].length, info: f[3].trim() };
      out.push("");
      continue;
    }
    out.push(line);
  }
  if (open) fences.push({ info: open.info, code: buf.join("\n"), unterminated: true });
  return { fences, stripped: out.join("\n") };
}

const ATTR_RE = /([A-Za-z_:][-\w:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|\{([\s\S]*?)\}))?/g;

/** JSX-ish tags: <Foo ...>, </Foo>, <Foo /> for capitalised component names. */
function extractTags(stripped) {
  const tags = [];
  const re = /<(\/?)([A-Z][\w.]*)((?:[^>"'{}]|"[^"]*"|'[^']*'|\{[^{}]*\})*)(\/?)>/g;
  let m;
  while ((m = re.exec(stripped)) !== null) {
    const [, closing, name, rawAttrs] = m;
    const attrs = new Map();
    if (!closing && rawAttrs.trim()) {
      ATTR_RE.lastIndex = 0;
      let a;
      while ((a = ATTR_RE.exec(rawAttrs)) !== null) {
        if (!a[1]) continue;
        attrs.set(a[1], a[2] ?? a[3] ?? (a[4] !== undefined ? `{${a[4].trim()}}` : ""));
      }
    }
    tags.push({ name, closing: Boolean(closing), attrs });
  }
  return tags;
}

const collect = (re, s, group = 1) => {
  const out = [];
  let m;
  const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
  while ((m = r.exec(s)) !== null) out.push(m[group]);
  return out;
};

function parse(text) {
  const { fm, body } = splitFrontmatter(text);
  const { fences, stripped } = extractFences(body);
  return {
    fm,
    body,
    fences,
    stripped,
    tags: extractTags(stripped),
    imports: body.split(/\r?\n/).filter((l) => /^\s*(import|export)\s/.test(l)).map((l) => l.trim()),
    images: collect(/!\[[^\]]*\]\(([^)\s]+)/, stripped),
    srcAttrs: collect(/\b(?:src|href)\s*=\s*"([^"]*)"/, stripped),
    mdLinks: collect(/\]\(([^)\s]+)/, stripped),
    inlineCode: collect(/`([^`\n]+)`/, stripped),
    headings: stripped
      .split(/\r?\n/)
      .filter((l) => /^#{1,6}\s/.test(l))
      .map((l) => {
        const level = l.match(/^#+/)[0].length;
        const rest = l.replace(/^#+\s*/, "").trim();
        const explicit = /\[#([^\]]+)\]\s*$/.exec(rest);
        return { level, text: explicit ? rest.slice(0, explicit.index).trim() : rest, anchor: explicit ? explicit[1] : null };
      }),
  };
}

/* ---------------------------------------------------------------- compare */

const bag = (arr) => {
  const m = new Map();
  for (const v of arr) m.set(v, (m.get(v) || 0) + 1);
  return m;
};
/** Multiset difference, as readable "x (n)" strings. */
function bagDiff(a, b) {
  const A = bag(a);
  const B = bag(b);
  const only = (x, y) =>
    [...x].filter(([k, n]) => (y.get(k) || 0) !== n).map(([k, n]) => `${k} ×${n}(→${y.get(k) || 0})`);
  return { missing: only(A, B), added: [...B].filter(([k]) => !A.has(k)).map(([k, n]) => `${k} ×${n}`) };
}

// Frontmatter keys whose values are machine-meaningful and must survive byte-identical.
const FM_VERBATIM = new Set(["openapi", "slug", "url", "icon", "mode", "hidden", "api", "version", "createdAt", "updatedAt", "og"]);
// Frontmatter keys that are reader-facing prose and SHOULD change under translation.
const FM_TRANSLATED = new Set(["title", "description", "sidebarTitle"]);
// JSX attributes that are machine-meaningful, never prose.
const ATTR_VERBATIM = new Set([
  "className", "class", "src", "href", "id", "style", "icon", "type", "name", "target",
  "rel", "width", "height", "value", "defaultValue", "language", "cta", "horizontal",
  "img", "color", "iconType", "to", "key", "ref",
]);
// JSX attributes that carry reader-facing prose.
const ATTR_PROSE = new Set(["title", "alt", "label", "placeholder", "description", "caption", "header", "tooltip"]);

/**
 * Brand and product names legitimately survive translation ("Segment", "Google Tag Manager",
 * "Next.js"). Treat Title Case / dotted / camelCase strings as proper nouns and stay quiet.
 */
const looksLikeProperNoun = (v) =>
  /[.@]/.test(v) ||
  v.split(/\s+/).every((w) => /^[^a-z]*$|^[A-Z0-9]/.test(w));

/** Mintlify derives a heading anchor from its text; mirror that to know what we are protecting. */
const slugify = (t) =>
  t.toLowerCase().replace(/`/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");

/** Comment-only lines, across the languages that appear in this corpus. */
const isCommentLine = (l) => /^\s*(\/\/|#|\*|\/\*|--|<!--|;|"""|''')/.test(l) || /^\s*$/.test(l);

const SCRIPT_RE = { ko: /[가-힯]/, ja: /[぀-ヿ一-鿿]/, zh: /[一-鿿]/ };

function comparePair(relPath, srcText, tgtText) {
  const s = parse(srcText);
  const t = parse(tgtText);
  const errors = [];
  const warnings = [];
  const unchangedProse = [];
  const E = (m) => errors.push(m);
  const W = (m) => warnings.push(m);

  /* frontmatter */
  if (Boolean(s.fm) !== Boolean(t.fm)) {
    E(`frontmatter present in ${s.fm ? "source" : "target"} only`);
  } else if (s.fm) {
    for (const k of s.fm.keys()) if (!t.fm.has(k)) E(`frontmatter key dropped: ${k}`);
    for (const k of t.fm.keys()) if (!s.fm.has(k)) E(`frontmatter key invented: ${k}`);
    for (const k of s.fm.keys()) {
      if (!t.fm.has(k)) continue;
      const a = s.fm.get(k);
      const b = t.fm.get(k);
      if (FM_VERBATIM.has(k) && a !== b) E(`frontmatter "${k}" must be verbatim: ${JSON.stringify(a)} → ${JSON.stringify(b)}`);
      if (FM_TRANSLATED.has(k) && a && a === b) W(`frontmatter "${k}" unchanged (untranslated?): ${JSON.stringify(a)}`);
      if (FM_TRANSLATED.has(k) && a && !b) E(`frontmatter "${k}" emptied`);
    }
  }

  /* code fences — count, info string, and body must all be identical */
  if (s.fences.length !== t.fences.length) {
    E(`code fence count ${s.fences.length} → ${t.fences.length}`);
  } else {
    s.fences.forEach((f, i) => {
      const g = t.fences[i];
      if (f.info !== g.info) E(`code fence #${i + 1} info string "${f.info}" → "${g.info}"`);
      if (f.code !== g.code) {
        if (!allowCodeComments) {
          E(`code fence #${i + 1} (${f.info || "no lang"}) content was modified — code must never be translated`);
        } else {
          const a = f.code.split("\n");
          const b = g.code.split("\n");
          if (a.length !== b.length) {
            E(`code fence #${i + 1} line count ${a.length} → ${b.length} — structure must be preserved even when comments are translated`);
          } else {
            const bad = a
              .map((line, n) => (line !== b[n] && !(isCommentLine(line) && isCommentLine(b[n])) ? n + 1 : 0))
              .filter(Boolean);
            if (bad.length) {
              E(`code fence #${i + 1} (${f.info || "no lang"}) — executable line(s) changed at ${bad.slice(0, 5).join(", ")}` +
                (bad.length > 5 ? ` (+${bad.length - 5} more)` : "") + "; only comments may be translated");
            }
          }
        }
      }
      if (g.unterminated) E(`code fence #${i + 1} is unterminated in target`);
    });
  }

  /* imports / exports */
  const impDiff = bagDiff(s.imports, t.imports);
  if (impDiff.missing.length) E(`import/export line(s) changed or dropped: ${impDiff.missing.join(", ")}`);
  if (impDiff.added.length) E(`import/export line(s) invented: ${impDiff.added.join(", ")}`);

  /* JSX components */
  const nameOf = (x) => `${x.closing ? "/" : ""}${x.name}`;
  const tagDiff = bagDiff(s.tags.map(nameOf), t.tags.map(nameOf));
  if (tagDiff.missing.length) E(`JSX tag(s) missing/renamed: ${tagDiff.missing.join(", ")}`);
  if (tagDiff.added.length) E(`JSX tag(s) invented: ${tagDiff.added.join(", ")}`);

  /* JSX attributes, positionally, when the tag stream lines up */
  if (s.tags.length === t.tags.length) {
    s.tags.forEach((st, i) => {
      const tt = t.tags[i];
      if (st.name !== tt.name) return; // already reported above
      for (const [k, v] of st.attrs) {
        if (!tt.attrs.has(k)) { E(`<${st.name}> lost attribute "${k}"`); continue; }
        const w = tt.attrs.get(k);
        if (ATTR_VERBATIM.has(k) && v !== w) E(`<${st.name} ${k}> must be verbatim: ${JSON.stringify(v)} → ${JSON.stringify(w)}`);
        if (k.startsWith("on") || (v.startsWith("{") && !ATTR_PROSE.has(k))) {
          if (v !== w) E(`<${st.name} ${k}> is an expression and must be verbatim: ${JSON.stringify(v)} → ${JSON.stringify(w)}`);
        }
        if (ATTR_PROSE.has(k) && v && v === w && /[A-Za-z]{4}/.test(v) && !looksLikeProperNoun(v)) {
          unchangedProse.push(`<${st.name} ${k}="${v}">`);
        }
      }
      for (const k of tt.attrs.keys()) if (!st.attrs.has(k)) E(`<${st.name}> gained attribute "${k}"`);
    });
  }

  /* assets and links */
  const imgDiff = bagDiff(s.images, t.images);
  if (imgDiff.missing.length || imgDiff.added.length)
    E(`image path(s) changed: ${[...imgDiff.missing, ...imgDiff.added.map((x) => `+${x}`)].join(", ")}`);

  const srcDiff = bagDiff(s.srcAttrs, t.srcAttrs);
  if (srcDiff.missing.length || srcDiff.added.length)
    E(`src/href attribute(s) changed: ${[...srcDiff.missing, ...srcDiff.added.map((x) => `+${x}`)].join(", ")}`);

  const expected = LINK_PREFIX && LOCALE
    ? s.mdLinks.map((l) => (l.startsWith("/") && !l.startsWith(`/${LOCALE}/`) && !l.startsWith("/images/") ? `/${LOCALE}${l}` : l))
    : s.mdLinks;
  const linkDiff = bagDiff(expected, t.mdLinks);
  if (linkDiff.missing.length || linkDiff.added.length)
    E(`link target(s) changed: ${[...linkDiff.missing, ...linkDiff.added.map((x) => `+${x}`)].join(", ")}`);

  /* headings — count, level, and anchor stability */
  if (s.headings.length !== t.headings.length) {
    E(`heading count ${s.headings.length} → ${t.headings.length}`);
  } else {
    const sl = s.headings.map((h) => h.level).join("/");
    const tl = t.headings.map((h) => h.level).join("/");
    if (sl !== tl) E(`heading levels changed: ${sl} → ${tl}`);

    // Translating a heading changes its derived anchor, silently breaking every deep link
    // into it. The spec requires the English anchor be pinned explicitly: `## 제목 [#english-anchor]`.
    const drifted = [];
    s.headings.forEach((sh, i) => {
      const th = t.headings[i];
      if (!th || sh.level !== th.level) return;
      const want = sh.anchor ?? slugify(sh.text);
      const got = th.anchor ?? slugify(th.text);
      if (want !== got) drifted.push(`"${sh.text}" #${want} → #${got}`);
    });
    if (drifted.length) {
      const msg = `${drifted.length} heading anchor(s) drifted — deep links break: ${drifted.slice(0, 3).join("; ")}` +
        (drifted.length > 3 ? `; +${drifted.length - 3} more` : "");
      requireAnchors ? E(msg) : W(msg);
    }
  }

  /* inline code */
  if (s.inlineCode.length !== t.inlineCode.length)
    W(`inline code span count ${s.inlineCode.length} → ${t.inlineCode.length}`);

  /* balanced MDX expression braces outside code */
  const braces = (x) => [...x].reduce((n, c) => n + (c === "{" ? 1 : c === "}" ? -1 : 0), 0);
  if (braces(s.stripped) !== braces(t.stripped))
    E(`unbalanced MDX braces: source ${braces(s.stripped)}, target ${braces(t.stripped)}`);

  if (unchangedProse.length) {
    const sample = unchangedProse.slice(0, 5).join(", ");
    W(`${unchangedProse.length} prose attribute(s) unchanged (untranslated?): ${sample}` +
      (unchangedProse.length > 5 ? `, +${unchangedProse.length - 5} more` : ""));
  }

  /* did anything actually get translated? */
  const scriptRe = LOCALE && (SCRIPT_RE[LOCALE] || SCRIPT_RE[LOCALE.slice(0, 2)]);
  if (scriptRe && t.stripped.trim() && !scriptRe.test(t.stripped))
    W(`no ${LOCALE} script characters found — page may be untranslated`);

  return { file: relPath, errors, warnings };
}

/* ------------------------------------------------------------------- run */

const listMdx = (dir) => {
  const out = [];
  const walkDir = (d) => {
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      const st = statSync(p);
      if (st.isDirectory()) walkDir(p);
      else if (extname(p) === ".mdx") out.push(p);
    }
  };
  walkDir(dir);
  return out;
};

const pairs = [];
if (statSync(SOURCE).isDirectory()) {
  for (const src of listMdx(SOURCE)) {
    const rel = relative(SOURCE, src);
    const tgt = join(TARGET, rel);
    if (existsSync(tgt)) pairs.push([rel, src, tgt]);
    else pairs.push([rel, src, null]);
  }
} else {
  pairs.push([SOURCE, SOURCE, TARGET]);
}

const results = [];
let missingFiles = 0;
for (const [rel, src, tgt] of pairs) {
  if (!tgt || !existsSync(tgt)) {
    missingFiles++;
    results.push({ file: rel, errors: ["no translated counterpart"], warnings: [] });
    continue;
  }
  results.push(comparePair(rel, readFileSync(src, "utf8"), readFileSync(tgt, "utf8")));
}

const failed = results.filter((r) => r.errors.length);
const warned = results.filter((r) => !r.errors.length && r.warnings.length);

if (AS_JSON) {
  console.log(JSON.stringify({ checked: results.length, failed: failed.length, results }, null, 2));
} else {
  for (const r of results) {
    if (QUIET && !r.errors.length) continue;
    if (!r.errors.length && !r.warnings.length) { console.log(`✓ ${r.file}`); continue; }
    console.log(`${r.errors.length ? "✗" : "!"} ${r.file}`);
    for (const e of r.errors) console.log(`    ERROR   ${e}`);
    for (const w of r.warnings) console.log(`    warn    ${w}`);
  }
  console.log(
    `\n${results.length} file(s) checked — ${results.length - failed.length - warned.length} clean, ` +
    `${warned.length} with warnings, ${failed.length} failed` +
    (missingFiles ? ` (${missingFiles} untranslated)` : ""),
  );
}

process.exit(failed.length ? 1 : 0);

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

/**
 * Purpose: Convert this repo's Nextra-flavored MDX in `/pages/docs/**`
 * into GitBook-flavored Markdown in `/gitbook/pages/docs/**`.
 *
 * This is intentionally a narrow converter. It targets the MDX constructs
 * used in this codebase (Callout, Tabs, Steps, ExtendedTabs, ExtendedAccordion).
 */

const ROOT = path.resolve(process.cwd());

function parseArgs(argv) {
  const args = {
    inDir: 'pages/docs',
    outDir: 'gitbook/pages/docs',
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--in' && argv[i + 1]) args.inDir = argv[++i];
    else if (a === '--out' && argv[i + 1]) args.outDir = argv[++i];
  }
  return args;
}

async function readConstantsMaps() {
  // Keep it simple: parse the few exported maps we use for ExtendedTabs titles.
  const file = path.join(ROOT, 'utils/constants.ts');
  let src = '';
  try {
    src = await fs.readFile(file, 'utf8');
  } catch {
    return {};
  }

  const maps = {};
  const exportConstRe = /export\s+const\s+(\w+)\s*=\s*\{([\s\S]*?)\}\s*/g;
  let m;
  while ((m = exportConstRe.exec(src))) {
    const name = m[1];
    const body = m[2];
    const entries = [];
    const entryRe = /['"`]([^'"`]+)['"`]\s*:\s*['"`]([\s\S]*?)['"`]\s*,?/g;
    let e;
    while ((e = entryRe.exec(body))) {
      entries.push({ key: e[1], value: e[2] });
    }
    maps[name] = entries.map((x) => x.value);
  }
  return maps;
}

const metaCache = new Map();

async function readMetaMapForDir(absDir) {
  if (metaCache.has(absDir)) return metaCache.get(absDir);

  const candidates = [path.join(absDir, '_meta.ts'), path.join(absDir, '_meta.tsx')];
  let src = null;
  for (const c of candidates) {
    try {
      src = await fs.readFile(c, 'utf8');
      break;
    } catch {
      // continue
    }
  }
  if (!src) {
    metaCache.set(absDir, new Map());
    return metaCache.get(absDir);
  }

  const map = new Map();

  // Match `"slug": "Title"`
  const simpleRe = /["']([^"']+)["']\s*:\s*["']([^"']+)["']\s*,?/g;
  let m;
  while ((m = simpleRe.exec(src))) {
    map.set(m[1], m[2]);
  }

  // Match `"slug": { title: "Title", ... }`
  const objRe = /["']([^"']+)["']\s*:\s*\{([\s\S]*?)\}\s*,?/g;
  while ((m = objRe.exec(src))) {
    const slug = m[1];
    const body = m[2];
    const titleMatch = body.match(/title\s*:\s*["']([^"']+)["']/);
    if (titleMatch) map.set(slug, titleMatch[1]);
  }

  metaCache.set(absDir, map);
  return map;
}

function toPosixPath(p) {
  return p.split(path.sep).join('/');
}

function rewriteDocsHrefToRelative(href, absOutFile, absOutRoot) {
  const raw = String(href || '').trim();
  if (!raw) return raw;

  // Only rewrite internal docs routes.
  // Supported:
  // - /docs/foo/bar
  // - https://mixpanel.com/docs/foo/bar
  let u = raw;
  if (u.startsWith('https://mixpanel.com/docs/')) u = u.replace('https://mixpanel.com', '');
  if (!u.startsWith('/docs/')) return raw;

  // Split off hash fragment.
  const [pathPart, hash = ''] = u.split('#');
  let relPath = pathPart.replace(/^\/docs\//, '').replace(/\/$/, '');
  if (!relPath) return raw;

  // Map to file path under output root.
  // Most pages are written as <slug>.md at the same relative location.
  if (!relPath.endsWith('.md')) relPath = `${relPath}.md`;

  // Output path overrides (when GitBook IA differs from source tree).
  // Keep this small and explicit.
  if (relPath === 'quickstart/install-with-ai.md') {
    relPath = 'intro/quickstart/install-with-ai.md';
  }

  const absTarget = path.join(absOutRoot, relPath);

  // Compute relative from current output file.
  const fromDir = path.dirname(absOutFile);
  let relative = path.relative(fromDir, absTarget);
  relative = toPosixPath(relative);
  if (!relative.startsWith('.')) relative = `./${relative}`;

  return hash ? `${relative}#${hash}` : relative;
}

function rewriteInternalDocsLinks(src, absOutFile, absOutRoot) {
  let out = String(src);

  // Markdown links: [text](/docs/foo/bar#anchor)
  out = out.replace(/\]\((\/docs\/[^)\s]+)\)/g, (all, href) => {
    const rewritten = rewriteDocsHrefToRelative(href, absOutFile, absOutRoot);
    return `](${rewritten})`;
  });

  // Markdown links to mixpanel.com/docs
  out = out.replace(/\]\((https:\/\/mixpanel\.com\/docs\/[^)\s]+)\)/g, (all, href) => {
    const rewritten = rewriteDocsHrefToRelative(href, absOutFile, absOutRoot);
    return `](${rewritten})`;
  });

  // HTML links: rewrite href attr regardless of other attributes.
  out = out.replace(/<a\b([^>]*?)\shref="([^"]+)"([^>]*)>/g, (all, pre, href, post) => {
    let rewritten = rewriteDocsHrefToRelative(href, absOutFile, absOutRoot);

    // Also rewrite known moved targets even if they are already relative.
    // Example: ./quickstart/install-with-ai.md -> ./intro/quickstart/install-with-ai.md
    const cleaned = href.replace(/^\.\//, '').replace(/^\//, '');
    if (cleaned === 'quickstart/install-with-ai.md' || cleaned === 'quickstart/install-with-ai') {
      const absTarget = path.join(absOutRoot, 'intro/quickstart/install-with-ai.md');
      const fromDir = path.dirname(absOutFile);
      let rel = toPosixPath(path.relative(fromDir, absTarget));
      if (!rel.startsWith('.')) rel = `./${rel}`;
      rewritten = rel;
    }
    return `<a${pre} href="${escapeHtml(rewritten)}"${post}>`;
  });

  // In cards we currently echo the href as visible text; rewrite that too.
  out = out.replace(/>(\/docs\/[^<]+)<\/a>/g, (all, text) => {
    const rewritten = rewriteDocsHrefToRelative(text, absOutFile, absOutRoot);
    return `>${escapeHtml(rewritten)}</a>`;
  });

  // Plaintext patterns like "...( /docs/foo/bar )" or "report(/docs/foo)" (not markdown links).
  out = out.replace(/\((\/docs\/[^)\s]+)\)/g, (all, href) => {
    const rewritten = rewriteDocsHrefToRelative(href, absOutFile, absOutRoot);
    return `(${rewritten})`;
  });

  return out;
}

async function listFilesRecursive(dir) {
  const out = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      out.push(...(await listFilesRecursive(full)));
    } else if (it.isFile() && (full.endsWith('.mdx') || full.endsWith('.md'))) {
      out.push(full);
    }
  }
  return out;
}

function mapCalloutTypeToHintStyle(type) {
  const t = String(type || '').toLowerCase().trim();
  if (t === 'warning') return 'warning';
  if (t === 'danger' || t === 'error') return 'danger';
  if (t === 'success') return 'success';
  // Nextra commonly uses info/note/default; GitBook supports "info".
  return 'info';
}

function parseItemsArray(itemsExpr) {
  // Handles: ['A','B'] or ["A", "B"]
  const m = itemsExpr.match(/\[\s*([\s\S]*?)\s*\]/);
  if (!m) return [];
  const inner = m[1];
  const titles = [];
  const strRe = /(['"])(.*?)\1/g;
  let s;
  while ((s = strRe.exec(inner))) titles.push(s[2]);
  return titles;
}

function convertCallouts(src) {
  // Block form
  src = src.replace(
    /<Callout\s+type=(?:"([^"]+)"|'([^']+)')\s*>\s*([\s\S]*?)\s*<\/Callout>/g,
    (_all, t1, t2, body) => {
      const style = mapCalloutTypeToHintStyle(t1 || t2);
      return `{% hint style="${style}" %}\n${body.trim()}\n{% endhint %}`;
    },
  );

  // Inline/self-closing-ish single-line Callout blocks sometimes appear without newlines.
  src = src.replace(
    /<Callout\s+type=(?:"([^"]+)"|'([^']+)')\s*>([\s\S]*?)<\/Callout>/g,
    (_all, t1, t2, body) => {
      const style = mapCalloutTypeToHintStyle(t1 || t2);
      return `{% hint style="${style}" %}\n${body.trim()}\n{% endhint %}`;
    },
  );

  // No explicit type: default to info.
  src = src.replace(/<Callout>\s*([\s\S]*?)\s*<\/Callout>/g, (_all, body) => {
    return `{% hint style="info" %}\n${String(body).trim()}\n{% endhint %}`;
  });
  return src;
}

function convertExtendedAccordions(src) {
  return src.replace(
    /<ExtendedAccordion\s+title=(?:"([^"]+)"|'([^']+)')\s*>\s*([\s\S]*?)\s*<\/ExtendedAccordion>/g,
    (_all, t1, t2, body) => {
      const title = (t1 || t2 || '').trim();
      return `<details>\n<summary>${title}</summary>\n\n${body.trim()}\n</details>`;
    },
  );
}

function parseJsxAttribute(attrs, name) {
  const re = new RegExp(`${name}=(?:"([^"]+)"|'([^']+)')`);
  const m = attrs.match(re);
  return (m?.[1] || m?.[2] || '').trim();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsxHtmlToHtml(src) {
  // GitBook sanitization is closer to HTML than React/JSX.
  // Convert common JSX attrs to HTML attrs so blocks like iframes-in-divs survive.
  return src
    .replace(/\bclassName=/g, 'class=')
    .replace(/\ballowFullScreen\b/g, 'allowfullscreen')
    .replace(/\bframeBorder=/g, 'frameborder=')
    .replace(/\breferrerPolicy=/g, 'referrerpolicy=');
}

function stripJsxStyleObjectsAndAttributeBraces(src) {
  // Remove JSX-only constructs that GitBook doesn't parse (e.g. style={{...}}, width={"100%"}).
  const lines = src.split('\n');
  const out = [];
  let inFence = false;
  let inStyleObject = false;

  for (let line of lines) {
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    if (inStyleObject) {
      // End when we see a closing "}}" (possibly with trailing comma/space)
      if (line.includes('}}')) {
        inStyleObject = false;
        // Drop everything up to and including the first "}}" on this line.
        line = line.replace(/^[\s\S]*?\}\}\s*,?\s*/, '');
        if (!line.trim()) continue;
      } else {
        continue;
      }
    }

    // Start of style object can be on the same line or its own line.
    if (/style=\{\{/.test(line)) {
      // Remove inline style={{ ... }} if it ends on same line.
      const inline = line.replace(/style=\{\{[\s\S]*?\}\}\s*/g, '');
      if (inline !== line) {
        line = inline;
      } else {
        // Otherwise begin skipping subsequent lines until "}}"
        line = line.replace(/style=\{\{[\s\S]*$/g, '');
        inStyleObject = true;
      }
    }

    // Convert attr={"value"} to attr="value"
    line = line.replace(/(\s[\w:-]+)=\{(".*?"|'.*?')\}/g, '$1=$2');
    // Convert boolean JSX attrs like allowfullscreen={true} to allowfullscreen
    line = line.replace(/(\s[\w:-]+)=\{true\}/g, '$1');
    // Drop {false} boolean attrs entirely
    line = line.replace(/(\s[\w:-]+)=\{false\}/g, '');

    out.push(line);
  }

  return out.join('\n');
}

function stripJsxComments(src) {
  // Remove JSX comments like `{/* ... */}` that can leak into markdown.
  // Only do this outside code fences.
  const lines = String(src).split('\n');
  const out = [];
  let inFence = false;
  let inJsxCommentBlock = false;
  for (let line of lines) {
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    if (inJsxCommentBlock) {
      if (line.includes('*/}')) {
        inJsxCommentBlock = false;
        // Drop everything up to and including the end marker on this line.
        const rest = line.split('*/}').slice(1).join('*/}');
        if (rest.trim()) out.push(rest);
      }
      continue;
    }

    // Start of a multiline JSX comment block.
    if (line.includes('{/*') && !line.includes('*/}')) {
      inJsxCommentBlock = true;
      const before = line.split('{/*')[0];
      if (before.trim()) out.push(before);
      continue;
    }

    // Drop whole-line JSX comments (single line).
    if (/^\s*\{\/\*[\s\S]*\*\/\}\s*$/.test(line)) continue;

    // Remove inline JSX comments.
    line = line.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    out.push(line);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function normalizeEmbedUrl(url) {
  const u = String(url || '').trim();
  if (!u) return '';

  // YouTube embed -> watch URL (GitBook embed prefers normal URLs).
  // Examples:
  // - https://www.youtube-nocookie.com/embed/<id>
  // - https://www.youtube.com/embed/<id>
  const yt = u.match(/https?:\/\/(?:www\.)?(?:youtube-nocookie\.com|youtube\.com)\/embed\/([^?/#]+)(?:[?#].*)?$/i);
  if (yt) return `https://www.youtube.com/watch?v=${yt[1]}`;

  return u;
}

function convertIframesToEmbeds(src) {
  // Convert iframes into GitBook embeds:
  // <iframe src="..."></iframe> => {% embed url="..." %}
  //
  // Do this before we strip wrapper divs in other conversions; then we can clean up leftover empty tags.
  return src.replace(/<iframe\b([\s\S]*?)>([\s\S]*?)<\/iframe>/gi, (_all, attrs) => {
    const raw = parseJsxAttribute(attrs, 'src');
    const url = normalizeEmbedUrl(raw);
    if (!url) return '';
    return `{% embed url="${escapeHtml(url)}" %}`;
  });
}

function convertExtendedButton(src) {
  // Convert the custom MDX button component into a GitBook button.
  // Example:
  // <ExtendedButton title="Get Started with AI" link="/docs/quickstart/install-with-ai"></ExtendedButton>
  // Also used as a self-closing tag in some places.
  src = src.replace(
    /<ExtendedButton\b([\s\S]*?)>([\s\S]*?)<\/ExtendedButton>/g,
    (_all, attrs) => {
      const title = parseJsxAttribute(attrs, 'title') || 'Learn more';
      const link = parseJsxAttribute(attrs, 'link') || parseJsxAttribute(attrs, 'href');
      if (!link) return title;
      return `<a href="${escapeHtml(link)}" class="button primary">${escapeHtml(title)}</a>`;
    },
  );
  src = src.replace(/<ExtendedButton\b([\s\S]*?)\/>/g, (_all, attrs) => {
    const title = parseJsxAttribute(attrs, 'title') || 'Learn more';
    const link = parseJsxAttribute(attrs, 'link') || parseJsxAttribute(attrs, 'href');
    if (!link) return title;
    return `<a href="${escapeHtml(link)}" class="button primary">${escapeHtml(title)}</a>`;
  });

  // Remove the known wrapper divs/brs around ExtendedButton used in this repo.
  src = src.replace(/<div\s+class(Name)?="extendedButtonComponent"[^>]*>\s*/g, '');
  src = src.replace(/(<a [^>]*class="button (?:primary|secondary)"[^>]*>[\s\S]*?<\/a>)\s*<\/div>/g, '$1');
  src = src.replace(/^\s*<\/div>\s*$/gm, '');
  src = src.replace(/^\s*<br\s*\/?>\s*$/gm, '');
  return src;
}

function fixAccidentalIndentCodeBlocks(src) {
  // Some converted files have 4-space indentation before list items, which Markdown treats as code blocks.
  // We only fix *top-level* list lines (and their immediate wrapped continuations) while outside code fences.
  const lines = src.split('\n');
  const out = [];
  let inFence = false;
  let prevWasList = false;

  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      out.push(line);
      prevWasList = false;
      continue;
    }
    if (inFence) {
      out.push(line);
      prevWasList = false;
      continue;
    }

    // De-indent accidental top-level blocks (lists, GitBook blocks) caused by JSX formatting.
    const bulletFixed = line
      .replace(/^\s{4}([-*]\s+)/, '$1')
      .replace(/^\s{4}(\d+\.\s+)/, '$1')
      .replace(/^\s{4}(\{%\s*(?:embed|hint|tabs|tab|stepper|step|updates|update|openapi)\b)/, '$1');
    if (bulletFixed !== line) {
      out.push(bulletFixed);
      prevWasList = true;
      continue;
    }

    // If we just fixed a list item, also de-indent a single wrapped continuation line.
    if (prevWasList && /^\s{6,}\S/.test(line)) {
      out.push(line.replace(/^\s{4}/, ''));
      prevWasList = true;
      continue;
    }

    prevWasList = /^([-*]\s+|\d+\.\s+)/.test(t);
    out.push(line);
  }

  return out.join('\n');
}

function collapseEmptyMultilineDivOpenTags(src) {
  // After stripping JSX-only attributes, we can end up with:
  // <div
  //   
  // >
  // Collapse that to a single <div>.
  const lines = src.split('\n');
  const out = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    if (t === '<div') {
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;
      if (j < lines.length && lines[j].trim() === '>') {
        out.push('<div>');
        i = j;
        continue;
      }
    }

    out.push(line);
  }

  return out.join('\n');
}

function dropNowEmptyIframeWrappers(src) {
  // After iframe->embed, some pages have leftover <div><p> wrappers that were
  // only used for styling. Prefer clean markdown around the embed.
  const lines = src.split('\n');
  const out = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    if (t === '<div>' || t === '<p>' || t === '</p>' || t === '</div>') {
      // Only drop these if they're adjacent to an embed block nearby.
      const window = lines.slice(Math.max(0, i - 2), Math.min(lines.length, i + 3)).join('\n');
      if (/\{%\s*embed\s+url=/.test(window)) continue;
    }

    out.push(line);
  }

  return out.join('\n');
}

function stripBrTags(src) {
  // GitBook has good default spacing; remove manual <br> tags.
  // Only do this outside code fences.
  const lines = src.split('\n');
  const out = [];
  let inFence = false;

  for (let line of lines) {
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    // Drop lines that are only <br> variants.
    if (/^<br\s*\/?>\s*(?:<\/br>)?\s*$/.test(t) || /^<br><\/br>$/.test(t) || /^<br\s*><\/br\s*>$/.test(t)) {
      continue;
    }

    // Remove inline <br> variants.
    line = line.replace(/<br\s*\/?>\s*(?:<\/br>)?/gi, '');
    out.push(line);
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function stripExternalLinkIcons(src) {
  // GitBook adds its own external link indicator; remove "↗" from link text.
  // Only adjust markdown links where destination is http(s).
  return String(src).replace(
    /\[([^\]]*?)\s*↗\s*\]\((https?:\/\/[^)]+)\)/g,
    (_all, text, url) => `[${text.trim()}](${url})`,
  );
}

function promoteMetadataDescriptionToDescription(src) {
  // Some pages include `metadata: { description: ... }` style frontmatter (from other systems).
  // GitBook expects a top-level `description:` field. If missing, promote it.
  const t = String(src);
  if (!t.startsWith('---\n')) return t;
  const end = t.indexOf('\n---\n', 4);
  if (end === -1) return t;

  const fm = t.slice(0, end + '\n---\n'.length);
  const rest = t.slice(end + '\n---\n'.length);

  if (/^description:\s*/m.test(fm)) return t;

  // Look for a YAML-ish `metadata:` block with an indented `description: ...`
  const m = fm.match(/^[ \t]*metadata:\s*\n([\s\S]*?)\n---\n/m);
  if (!m) return t;

  const metaBlock = m[1];
  const descMatch = metaBlock.match(/^[ \t]+description:\s*["']?(.+?)["']?\s*$/m);
  if (!descMatch) return t;
  const desc = descMatch[1].trim();
  if (!desc) return t;

  const fmWithoutTrailing = fm.replace(/\n---\n$/, '\n');
  return `${fmWithoutTrailing}description: "${desc.replace(/"/g, '\\"')}"\n---\n${rest}`;
}

function blankCardsOnlyCollectionPages(src) {
  // If a page is just a title (+ optional short intro text) plus cards (with internal links),
  // strip the cards so GitBook shows the auto-generated subpage collection.
  const t = String(src);

  // Split frontmatter from body.
  let frontmatter = '';
  let body = t;
  if (body.startsWith('---\n')) {
    const end = body.indexOf('\n---\n', 4);
    if (end !== -1) {
      frontmatter = body.slice(0, end + '\n---\n'.length);
      body = body.slice(end + '\n---\n'.length);
    }
  }

  const lines = body.split('\n');
  const trimmedAll = body.trim();
  if (!trimmedAll) return t;

  // Find first H1.
  const firstHeadingIdx = lines.findIndex((l) => l.startsWith('# '));
  if (firstHeadingIdx === -1) return t;
  // Only treat it as a collection page if the H1 is the first non-empty line.
  if (lines.slice(0, firstHeadingIdx).some((l) => l.trim() !== '')) return t;

  // Find the cards table start (first non-empty line after H1/intro).
  const afterHeading = lines.slice(firstHeadingIdx + 1);
  const tableStartRel = afterHeading.findIndex((l) => l.trim().startsWith('<table data-view="cards">'));
  if (tableStartRel === -1) return t;
  const tableStartIdx = firstHeadingIdx + 1 + tableStartRel;

  // Everything after table must be table-only (no additional non-empty content).
  const afterTable = lines.slice(tableStartIdx).join('\n').trim();
  if (!afterTable.startsWith('<table data-view="cards">')) return t;
  if (!afterTable.endsWith('</table>')) return t;

  // Ensure all links are internal.
  const hrefs = [];
  const hrefRe = /<a\s+href="([^"]+)"/g;
  let m;
  while ((m = hrefRe.exec(afterTable))) hrefs.push(m[1]);
  if (hrefs.length === 0) return t;
  const allInternal = hrefs.every((h) => !/^https?:\/\//i.test(h));
  if (!allInternal) return t;

  // Decide whether we can safely promote the "intro" to frontmatter description.
  // GitBook description must be plaintext (no markdown, no GitBook blocks).
  const betweenLines = lines.slice(firstHeadingIdx + 1, tableStartIdx);
  const betweenRaw = betweenLines.join('\n').trim();

  const hasDescriptionAlready = frontmatter && /^description:\s*/m.test(frontmatter);
  let fmOut = frontmatter;

  // Case 1: Pure collection page (no intro content). Keep only H1.
  if (!betweenRaw) {
    const keptBody = `${lines[firstHeadingIdx]}\n`;
    return (fmOut ? `${fmOut}\n${keptBody}` : keptBody).replace(/\n{3,}/g, '\n\n');
  }

  const isPlaintextIntro =
    betweenRaw &&
    // No headings/lists/blocks
    !/(^|\n)\s*#{2,}\s+/.test(betweenRaw) &&
    !/(^|\n)\s*[-*]\s+/.test(betweenRaw) &&
    !/(^|\n)\s*\d+\.\s+/.test(betweenRaw) &&
    // No GitBook blocks / HTML / MD links / inline formatting
    !/\{%\s*\w+/.test(betweenRaw) &&
    !/<[a-z][\s\S]*?>/i.test(betweenRaw) &&
    !/\[[^\]]+\]\([^)]+\)/.test(betweenRaw) &&
    !/[*_`]/.test(betweenRaw);

  if (isPlaintextIntro && !hasDescriptionAlready) {
    const desc = betweenRaw.replace(/\s+/g, ' ').trim();
    if (desc && desc.length <= 240) {
      if (fmOut) {
        fmOut = fmOut.replace(/\n---\n$/, `\ndescription: "${desc.replace(/"/g, '\\"')}"\n---\n`);
      } else {
        fmOut = `---\ndescription: "${desc.replace(/"/g, '\\"')}"\n---\n`;
      }
    }
    // Keep only the H1 in the body.
    const keptBody = `${lines[firstHeadingIdx]}\n`;
    return (fmOut ? `${fmOut}\n${keptBody}` : keptBody).replace(/\n{3,}/g, '\n\n');
  }

  // Otherwise, this page has meaningful non-plaintext content (hints/links/headings/etc.).
  // Keep it as a normal page and keep the cards table too (no auto-collection behavior).
  return t;
}

function ensureFrontmatterWithTags(src, tags) {
  const t = String(src);
  if (!tags || tags.length === 0) return t;

  const fmStart = t.startsWith('---\n');
  if (!fmStart) {
    const tagLines = tags
      .map((tag) => (typeof tag === 'string' ? `  - ${tag}` : `  - tag: ${tag.tag}\n    primary: ${tag.primary ? 'true' : 'false'}`))
      .join('\n');
    return `---\ntags:\n${tagLines}\n---\n\n${t}`;
  }

  const endIdx = t.indexOf('\n---\n', 4);
  if (endIdx === -1) return t;

  const fmBlock = t.slice(0, endIdx + '\n---\n'.length);
  const rest = t.slice(endIdx + '\n---\n'.length);

  // If tags already exist, leave as-is.
  if (/^tags:\s*$/m.test(fmBlock) || /^tags:\s*\[/m.test(fmBlock)) return t;

  const insertion = (() => {
    const tagLines = tags
      .map((tag) => (typeof tag === 'string' ? `  - ${tag}` : `  - tag: ${tag.tag}\n    primary: ${tag.primary ? 'true' : 'false'}`))
      .join('\n');
    return `tags:\n${tagLines}\n`;
  })();

  const fmWithoutTrailing = fmBlock.replace(/\n---\n$/, '\n');
  return `${fmWithoutTrailing}${insertion}---\n${rest}`;
}

function convertBetaMarkersToTags(src) {
  // Convert visible "beta" markers in the H1 into GitBook frontmatter tags.
  // Examples:
  // - "# Install with AI [BETA]" => tag beta (primary), title becomes "# Install with AI"
  // - "# Foo (Beta)" => tag beta (primary), title becomes "# Foo"
  const lines = String(src).split('\n');
  const firstHeadingIdx = lines.findIndex((l) => l.startsWith('# '));
  if (firstHeadingIdx === -1) return src;

  const h = lines[firstHeadingIdx];
  const m = h.match(/^#\s+(.+?)\s*(\[(?:BETA|beta)\]|\((?:BETA|Beta|beta)\))\s*$/);
  if (!m) return src;

  const cleanTitle = m[1].trim();
  lines[firstHeadingIdx] = `# ${cleanTitle}`;
  const updated = lines.join('\n');
  return ensureFrontmatterWithTags(updated, [{ tag: 'beta', primary: true }]);
}

async function tagBetaByMeta(out, absInputFile, absInDir) {
  // Use the sidebar/TOC label from the nearest _meta.ts/_meta.tsx as the source of truth.
  const rel = path.relative(absInDir, absInputFile);
  const dirRel = path.dirname(rel);
  const slug = path.basename(rel).replace(/\.(mdx|md)$/i, '');
  const metaDir = path.join(absInDir, dirRel);
  const meta = await readMetaMapForDir(metaDir);
  const tocTitle = meta.get(slug) || '';
  if (!tocTitle) return out;

  if (/\b(beta)\b/i.test(tocTitle) || /\[beta\]/i.test(tocTitle)) {
    return ensureFrontmatterWithTags(out, [{ tag: 'beta', primary: true }]);
  }
  return out;
}

function convertCards(src) {
  // Convert Nextra Cards:
  // <Cards>
  //   <Cards.Card title="Foo" href="/bar" />
  // </Cards>
  // into GitBook cards table.
  return src.replace(/<Cards>\s*([\s\S]*?)\s*<\/Cards>/g, (_all, inner) => {
    const cardRe = /<Cards\.Card\b([\s\S]*?)\/>/g;
    const rows = [];
    let m;
    while ((m = cardRe.exec(inner))) {
      const attrs = m[1] || '';
      const titleRaw = parseJsxAttribute(attrs, 'title');
      const href = parseJsxAttribute(attrs, 'href');
      if (!titleRaw || !href) continue;
      const title = titleRaw.replace(/\s*↗\s*/g, '').trim();
      rows.push({ title, href });
    }

    if (rows.length === 0) return '';

    const out = [];
    out.push('<table data-view="cards">');
    out.push('  <thead>');
    out.push('    <tr>');
    out.push('      <th></th>');
    out.push('      <th data-hidden data-card-target data-type="content-ref"></th>');
    out.push('      <th data-hidden data-card-cover data-type="files"></th>');
    out.push('    </tr>');
    out.push('  </thead>');
    out.push('  <tbody>');
    for (const r of rows) {
      out.push('    <tr>');
      out.push(`      <td><strong>${escapeHtml(r.title)}</strong></td>`);
      out.push(`      <td><a href="${escapeHtml(r.href)}">${escapeHtml(r.href)}</a></td>`);
      out.push('      <td></td>');
      out.push('    </tr>');
    }
    out.push('  </tbody>');
    out.push('</table>');
    return out.join('\n');
  });
}

function splitTopLevelTabsTabBlocks(inner) {
  // Extract direct <Tabs.Tab> ... </Tabs.Tab> blocks, while allowing nested Tabs
  // inside a tab body without being treated as siblings.
  const parts = [];
  const OPEN = '<Tabs.Tab>';
  const CLOSE = '</Tabs.Tab>';

  let i = 0;
  while (i < inner.length) {
    const openIdx = inner.indexOf(OPEN, i);
    if (openIdx === -1) break;
    let cursor = openIdx + OPEN.length;
    let depth = 1;

    while (cursor < inner.length) {
      const nextOpen = inner.indexOf(OPEN, cursor);
      const nextClose = inner.indexOf(CLOSE, cursor);
      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1;
        cursor = nextOpen + OPEN.length;
        continue;
      }

      depth -= 1;
      if (depth === 0) {
        const body = inner.slice(openIdx + OPEN.length, nextClose).trim();
        if (body) parts.push(body);
        i = nextClose + CLOSE.length;
        break;
      }
      cursor = nextClose + CLOSE.length;
    }

    // Malformed input fallback: avoid infinite loops.
    if (cursor >= inner.length) break;
  }

  return parts;
}

function convertTabsBlocks(src) {
  // Convert <Tabs items={['A','B']}> ... </Tabs> into GitBook {% tabs %}.
  return src.replace(
    /<Tabs\s+items=\{([\s\S]*?)\}\s*>\s*([\s\S]*?)\s*<\/Tabs>/g,
    (_all, itemsExpr, inner) => {
      const titles = parseItemsArray(itemsExpr);
      const tabBodies = splitTopLevelTabsTabBlocks(inner);
      const count = Math.max(titles.length, tabBodies.length);
      const out = [];
      out.push('{% tabs %}');
      for (let i = 0; i < count; i++) {
        const title = titles[i] || `Tab ${i + 1}`;
        const body = (tabBodies[i] || '').trim();
        out.push(`{% tab title="${title}" %}`);
        out.push(body);
        out.push('{% endtab %}');
        out.push('');
      }
      out.push('{% endtabs %}');
      return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    },
  );
}

function convertSteps(src) {
  // Convert:
  // <Steps> {<h3>Title</h3>} ... {<h3>Next</h3>} ... </Steps>
  return src.replace(/<Steps>\s*([\s\S]*?)\s*<\/Steps>/g, (_all, inner) => {
    const stepTitleRe = /\{\s*<h3>\s*([\s\S]*?)\s*<\/h3>\s*\}\s*/g;
    const indices = [];
    let m;
    while ((m = stepTitleRe.exec(inner))) {
      indices.push({ idx: m.index, len: m[0].length, title: m[1].trim() });
    }
    if (indices.length === 0) {
      return `{% stepper %}\n{% step %}\n${inner.trim()}\n{% endstep %}\n{% endstepper %}`;
    }

    const steps = [];
    for (let i = 0; i < indices.length; i++) {
      const cur = indices[i];
      const next = indices[i + 1];
      const contentStart = cur.idx + cur.len;
      const contentEnd = next ? next.idx : inner.length;
      const content = inner.slice(contentStart, contentEnd).trim();
      steps.push({ title: cur.title, content });
    }

    const out = [];
    out.push('{% stepper %}');
    for (const s of steps) {
      out.push('{% step %}');
      out.push(`## ${s.title}`);
      out.push('');
      out.push(s.content);
      out.push('{% endstep %}');
      out.push('');
    }
    out.push('{% endstepper %}');
    return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  });
}

function convertExtendedTabs(src, maps) {
  // Convert <ExtendedTabs ... urlToItemsMap={dataItems}> ... </ExtendedTabs>
  // into GitBook tabs. Titles come from the selected map in `utils/constants.ts`.
  function inferTitleFromBody(body) {
    // Heuristic: many of these tabs start with fenced code blocks like:
    // ```shell Python
    // ```js Javascript
    // ```xml Java
    const m = body.match(/^\s*```([^\n]*)/m);
    if (!m) return null;
    const info = (m[1] || '').trim();
    if (!info) return null;
    const tokens = info.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return null;
    // Prefer last token since patterns are often "shell Python" or "js Javascript".
    const last = tokens[tokens.length - 1];
    if (!last) return null;
    // Strip trailing punctuation that sometimes appears in headers.
    const candidate = last.replace(/[)\]]+$/g, '').trim();
    if (!candidate) return null;

    // Only accept titles that look like product/platform names (not generic code fence languages).
    const allowed = new Set([
      'Javascript',
      'JavaScript',
      'TypeScript',
      'Python',
      'PHP',
      'Node',
      'Node.js',
      'Go',
      'Ruby',
      'Java',
      'React',
      'ReactNative',
      'ReactNative',
      'Flutter',
      'iOS',
      'Swift',
      'Android',
      'Unity',
      'HTTP',
      'API',
    ]);

    // Special-cases for multi-token titles we can infer from the body elsewhere.
    if (candidate === 'Native' && /react-native/i.test(body)) return 'React Native';
    if (candidate === 'API' && /https:\/\/api\.mixpanel\.com|\/import\b|\/track\b/.test(body)) return 'HTTP API';

    if (allowed.has(candidate)) return candidate;
    return null;
  }

  return src.replace(
    /<ExtendedTabs\b[^>]*urlToItemsMap=\{(\w+)\}[^>]*>\s*([\s\S]*?)\s*<\/ExtendedTabs>/g,
    (_all, mapName, inner) => {
      const titlesFromMap = maps[mapName] || [];
      const tabBodies = splitTopLevelTabsTabBlocks(inner);
      const count = tabBodies.length;
      const out = [];
      out.push('{% tabs %}');
      for (let i = 0; i < count; i++) {
        const inferred = inferTitleFromBody(tabBodies[i]);
        const title = inferred || titlesFromMap[i] || `Tab ${i + 1}`;
        out.push(`{% tab title="${title}" %}`);
        out.push(tabBodies[i].trim());
        out.push('{% endtab %}');
        out.push('');
      }
      out.push('{% endtabs %}');
      return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    },
  );
}

function stripMdxExportsAndImports(src) {
  // Remove MDX/TS import/export lines at top-level (but keep code fences intact).
  const lines = src.split('\n');
  const kept = [];
  let inFence = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      kept.push(line);
      continue;
    }
    if (!inFence) {
      if (t.startsWith('import ')) continue;
      if (t.startsWith('export ')) continue;
    }
    kept.push(line);
  }
  return kept.join('\n').replace(/^\s*\n+/, '');
}

function cleanupDanglingJsx(src) {
  // Remove empty JSX lines left behind after conversions.
  src = src.replace(
    /^\s*<\/?(Callout|Tabs(\.Tab)?|Steps|ExtendedTabs|ExtendedAccordion|Cards(\.Card)?)\b[^>]*>\s*$/gm,
    '',
  );
  // Remove stray braces around raw JSX headings if they survive (rare after Steps conversion).
  src = src.replace(/^\s*\{\s*<h3>[\s\S]*?<\/h3>\s*\}\s*$/gm, '');
  return src.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function convertOne(src, maps) {
  let out = src;
  out = promoteMetadataDescriptionToDescription(out);
  out = stripMdxExportsAndImports(out);
  out = jsxHtmlToHtml(out);
  out = stripJsxStyleObjectsAndAttributeBraces(out);
  out = stripJsxComments(out);
  out = convertIframesToEmbeds(out);
  out = convertExtendedButton(out);
  out = convertCards(out);
  out = convertCallouts(out);
  out = convertExtendedAccordions(out);
  out = convertSteps(out);
  out = convertTabsBlocks(out);
  out = convertExtendedTabs(out, maps);
  out = fixAccidentalIndentCodeBlocks(out);
  out = collapseEmptyMultilineDivOpenTags(out);
  out = dropNowEmptyIframeWrappers(out);
  out = stripBrTags(out);
  out = convertBetaMarkersToTags(out);
  out = stripExternalLinkIcons(out);
  out = blankCardsOnlyCollectionPages(out);
  out = cleanupDanglingJsx(out);
  return out;
}

async function main() {
  const args = parseArgs(process.argv);
  const inDir = path.resolve(ROOT, args.inDir);
  const outDir = path.resolve(ROOT, args.outDir);

  const maps = await readConstantsMaps();
  const files = await listFilesRecursive(inDir);
  await fs.mkdir(outDir, { recursive: true });

  for (const file of files) {
    const rel = path.relative(inDir, file);
    const outPath = path.join(outDir, rel.replace(/\.mdx$/i, '.md'));
    await fs.mkdir(path.dirname(outPath), { recursive: true });

    const src = await fs.readFile(file, 'utf8');
    let converted = file.toLowerCase().endsWith('.mdx') ? convertOne(src, maps) : src;
    converted = rewriteInternalDocsLinks(converted, outPath, outDir);
    converted = await tagBetaByMeta(converted, file, inDir);
    await fs.writeFile(outPath, converted, 'utf8');
  }

  process.stdout.write(`Converted ${files.length} files from ${args.inDir} -> ${args.outDir}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


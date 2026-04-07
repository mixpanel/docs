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

// GitBook Space bases for cross-space linking (Git Sync).
// These are intentionally hard-coded for this repo.
const GITBOOK_SPACE_BASE = {
  docs: 'https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/',
  guides: 'https://app.gitbook.com/s/T5M6sZZR1LgkJeivZBt6/',
  troubleshooting: 'https://app.gitbook.com/s/j2N0ULQkDlAGcEm3cnYO/',
};

function parseArgs(argv) {
  const args = {
    inDir: 'pages/docs',
    outDir: 'gitbook/pages/docs',
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if ((a === '--in' || a === '--src') && argv[i + 1]) args.inDir = argv[++i];
    else if (a === '--out' && argv[i + 1]) args.outDir = argv[++i];
  }
  return args;
}

async function cleanupExtraneousConvertedMarkdown({ outDirAbs, expectedRelMdPaths }) {
  // When a previous run wrote the wrong section into this outDir, we want a safe cleanup.
  // We only delete markdown pages (.md) that are NOT part of the expected conversion output,
  // excluding any GitBook-managed files under .gitbook/.
  const outFiles = await listFilesRecursive(outDirAbs);
  for (const f of outFiles) {
    if (!f.toLowerCase().endsWith('.md')) continue;
    const rel = toPosixPath(path.relative(outDirAbs, f));
    if (!rel) continue;
    if (rel.startsWith('.gitbook/')) continue;
    if (rel === 'SUMMARY.md' || rel === 'README.md') continue;
    if (!expectedRelMdPaths.has(rel)) {
      await fs.unlink(f);
    }
  }
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

function rewriteGuidesHrefToRelative(href, absOutFile, absOutRoot) {
  const raw = String(href || '').trim();
  if (!raw) return raw;

  // Rewrite internal guides routes:
  // - /guides/foo/bar
  // - https://mixpanel.com/guides/foo/bar
  let u = raw;
  if (u.startsWith('https://mixpanel.com/guides/')) u = u.replace('https://mixpanel.com', '');
  if (!u.startsWith('/guides/')) return raw;

  const [pathPart, hash = ''] = u.split('#');
  let relPath = pathPart.replace(/^\/guides\//, '').replace(/\/$/, '');
  if (!relPath) return raw;
  if (!relPath.endsWith('.md')) relPath = `${relPath}.md`;

  const absTarget = path.join(absOutRoot, relPath);
  const fromDir = path.dirname(absOutFile);
  let relative = toPosixPath(path.relative(fromDir, absTarget));
  if (!relative.startsWith('.')) relative = `./${relative}`;
  return hash ? `${relative}#${hash}` : relative;
}

function rewriteCrossSpaceHref(href, { fromSection }) {
  const raw = String(href || '').trim();
  if (!raw) return raw;

  let u = raw;
  if (u.startsWith('https://mixpanel.com/docs/')) u = u.replace('https://mixpanel.com', '');
  if (u.startsWith('https://mixpanel.com/guides/')) u = u.replace('https://mixpanel.com', '');

  const [pathPart, hash = ''] = u.split('#');

  if (pathPart.startsWith('/docs/')) {
    let rel = pathPart.replace(/^\/docs\//, '').replace(/\/$/, '');
    if (!rel) return raw;
    rel = rel.replace(/\.md$/i, '');
    const base = GITBOOK_SPACE_BASE.docs;
    return `${base}${rel}${hash ? `#${hash}` : ''}`;
  }
  if (pathPart.startsWith('/guides/')) {
    let rel = pathPart.replace(/^\/guides\//, '').replace(/\/$/, '');
    if (!rel) return raw;
    rel = rel.replace(/\.md$/i, '');
    const base = GITBOOK_SPACE_BASE.guides;
    return `${base}${rel}${hash ? `#${hash}` : ''}`;
  }
  if (pathPart.startsWith('/troubleshooting/')) {
    let rel = pathPart.replace(/^\/troubleshooting\//, '').replace(/\/$/, '');
    if (!rel) return raw;
    rel = rel.replace(/\.md$/i, '');
    const base = GITBOOK_SPACE_BASE.troubleshooting;
    return `${base}${rel}${hash ? `#${hash}` : ''}`;
  }

  return raw;
}

function rewriteInternalDocsLinks(src, absOutFile, absOutRoot) {
  let out = String(src);
  const rootBase = path.basename(absOutRoot);
  const docsOutRoot = rootBase === 'docs' ? absOutRoot : path.join(path.dirname(absOutRoot), 'docs');
  const guidesOutRoot = rootBase === 'guides' ? absOutRoot : path.join(path.dirname(absOutRoot), 'guides');
  const fromSection = rootBase;

  // Markdown links: [text](/docs/foo/bar#anchor)
  out = out.replace(/\]\((\/docs\/[^)\s]+)\)/g, (all, href) => {
    if (fromSection !== 'docs') return `](${rewriteCrossSpaceHref(href, { fromSection })})`;
    const rewritten = rewriteDocsHrefToRelative(href, absOutFile, docsOutRoot);
    return `](${rewritten})`;
  });

  // Markdown links: [text](/guides/foo/bar#anchor)
  out = out.replace(/\]\((\/guides\/[^)\s]+)\)/g, (all, href) => {
    if (fromSection !== 'guides') return `](${rewriteCrossSpaceHref(href, { fromSection })})`;
    const rewritten = rewriteGuidesHrefToRelative(href, absOutFile, guidesOutRoot);
    return `](${rewritten})`;
  });

  // Markdown links to mixpanel.com/docs
  out = out.replace(/\]\((https:\/\/mixpanel\.com\/docs\/[^)\s]+)\)/g, (all, href) => {
    if (fromSection !== 'docs') return `](${rewriteCrossSpaceHref(href, { fromSection })})`;
    const rewritten = rewriteDocsHrefToRelative(href, absOutFile, docsOutRoot);
    return `](${rewritten})`;
  });

  // Markdown links to mixpanel.com/guides
  out = out.replace(/\]\((https:\/\/mixpanel\.com\/guides\/[^)\s]+)\)/g, (all, href) => {
    if (fromSection !== 'guides') return `](${rewriteCrossSpaceHref(href, { fromSection })})`;
    const rewritten = rewriteGuidesHrefToRelative(href, absOutFile, guidesOutRoot);
    return `](${rewritten})`;
  });

  // HTML links: rewrite href attr regardless of other attributes.
  out = out.replace(/<a\b([^>]*?)\shref="([^"]+)"([^>]*)>/g, (all, pre, href, post) => {
    if (fromSection !== 'docs' && (href.startsWith('/docs/') || href.startsWith('https://mixpanel.com/docs/')))
      return `<a${pre} href="${escapeHtml(rewriteCrossSpaceHref(href, { fromSection }))}"${post}>`;
    if (
      fromSection !== 'guides' &&
      (href.startsWith('/guides/') || href.startsWith('https://mixpanel.com/guides/'))
    )
      return `<a${pre} href="${escapeHtml(rewriteCrossSpaceHref(href, { fromSection }))}"${post}>`;
    if (
      fromSection !== 'troubleshooting' &&
      (href.startsWith('/troubleshooting/') || href.startsWith('https://mixpanel.com/troubleshooting/'))
    )
      return `<a${pre} href="${escapeHtml(rewriteCrossSpaceHref(href, { fromSection }))}"${post}>`;

    let rewritten = rewriteDocsHrefToRelative(href, absOutFile, docsOutRoot);
    if (rewritten === href) {
      rewritten = rewriteGuidesHrefToRelative(href, absOutFile, guidesOutRoot);
    }

    // Also rewrite known moved targets even if they are already relative.
    // Example: ./quickstart/install-with-ai.md -> ./intro/quickstart/install-with-ai.md
    const cleaned = href.replace(/^\.\//, '').replace(/^\//, '');
    if (cleaned === 'quickstart/install-with-ai.md' || cleaned === 'quickstart/install-with-ai') {
      const absTarget = path.join(docsOutRoot, 'intro/quickstart/install-with-ai.md');
      const fromDir = path.dirname(absOutFile);
      let rel = toPosixPath(path.relative(fromDir, absTarget));
      if (!rel.startsWith('.')) rel = `./${rel}`;
      rewritten = rel;
    }
    return `<a${pre} href="${escapeHtml(rewritten)}"${post}>`;
  });

  // In cards we currently echo the href as visible text; rewrite that too.
  out = out.replace(/>(\/docs\/[^<]+)<\/a>/g, (all, text) => {
    if (fromSection !== 'docs') return `>${escapeHtml(rewriteCrossSpaceHref(text, { fromSection }))}</a>`;
    const rewritten = rewriteDocsHrefToRelative(text, absOutFile, docsOutRoot);
    return `>${escapeHtml(rewritten)}</a>`;
  });

  // Plaintext patterns like "...( /docs/foo/bar )" or "report(/docs/foo)" (not markdown links).
  out = out.replace(/\((\/docs\/[^)\s]+)\)/g, (all, href) => {
    if (fromSection !== 'docs') return `(${rewriteCrossSpaceHref(href, { fromSection })})`;
    const rewritten = rewriteDocsHrefToRelative(href, absOutFile, docsOutRoot);
    return `(${rewritten})`;
  });

  out = out.replace(/\((\/guides\/[^)\s]+)\)/g, (all, href) => {
    if (fromSection !== 'guides') return `(${rewriteCrossSpaceHref(href, { fromSection })})`;
    const rewritten = rewriteGuidesHrefToRelative(href, absOutFile, guidesOutRoot);
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
  return src.replace(/<ExtendedAccordion\b([\s\S]*?)>\s*([\s\S]*?)\s*<\/ExtendedAccordion>/g, (_all, attrs, body) => {
    const titleRaw = parseJsxAttribute(attrs, 'title') || '';
    const title = String(titleRaw).trim();
    if (!title) return body;
    return `<details>\n<summary>${escapeHtml(title)}</summary>\n\n${String(body).trim()}\n</details>`;
  });
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
    // Drop JSX expression attrs that GitBook can't interpret (keep converter-critical ones elsewhere).
    // This is intentionally narrow to avoid breaking MDX constructs we convert later.
    line = line.replace(/\sclass=\{[^}]+\}/g, '');
    line = line.replace(/\sid=\{[^}]+\}/g, '');

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

function humanizeComponentName(name) {
  return String(name)
    .replace(/Logo$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
}

function kebabFromComponentName(comp) {
  // AviraLogo -> avira-logo
  return String(comp)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_+/g, '-')
    .toLowerCase();
}

function convertLogoComponentsToGitbookImages(src, { outPath, assetsDirAbs }) {
  // Replace JSX logo components like <AviraLogo /> with markdown images pointing to .gitbook/assets.
  // Only do this outside code fences.
  const lines = String(src).split('\n');
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

    line = line.replace(/<([A-Za-z0-9]+Logo)\s*\/>/g, (_all, comp) => {
      const filename = `${kebabFromComponentName(comp)}.svg`;
      const rel = toPosixPath(path.relative(path.dirname(outPath), path.join(assetsDirAbs, filename)));
      const href = rel.startsWith('.') ? rel : `./${rel}`;
      return `![${humanizeComponentName(comp)}](${href})`;
    });
    out.push(line);
  }
  return out.join('\n');
}

function stripUselessDivs(src) {
  // After JSX attribute stripping, we often end up with bare <div> wrappers that
  // cause GitBook editor whitespace/weird block nesting. Remove them.
  const lines = String(src).split('\n');
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

    // Drop lines that are only a div wrapper.
    if (t === '<div>' || t === '</div>') continue;

    // Remove inline div tags but keep their content.
    line = line.replace(/<\/?div>/g, '');
    out.push(line);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function convertLogoSpeakerToMarkdown(src) {
  // Convert <div className={style.logoSpeaker}>**Name**</div> into a clean attribution line.
  // Do this outside code fences.
  const lines = String(src).split('\n');
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

    line = line.replace(
      /<div\b[^>]*\bclass(?:Name)?=\{?style\.logoSpeaker\}?\b[^>]*>\s*([\s\S]*?)\s*<\/div>/g,
      (_all, inner) => `\n\n${String(inner).trim()}\n\n`,
    );
    line = line.replace(
      /<div\b[^>]*\bclass(?:Name)?="[^"]*\blogoSpeaker\b[^"]*"\b[^>]*>\s*([\s\S]*?)\s*<\/div>/g,
      (_all, inner) => `\n\n${String(inner).trim()}\n\n`,
    );

    out.push(line);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function splitSpeakerTitleToNewLine(src) {
  // Convert: **Name** *Title* -> **Name**\n*Title*
  // Only do this outside code fences.
  const lines = String(src).split('\n');
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

    line = line.replace(/\*\*([^*\n]+)\*\*\s+\*([^*\n]+)\*/g, (_all, name, title) => {
      return `**${name.trim()}**\n*${title.trim()}*`;
    });
    out.push(line);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function ensureBlankLineAfterStandaloneImages(src) {
  // GitBook can be picky if an image line is immediately followed by text without a blank line.
  // Ensure a blank line after any standalone markdown image line.
  const lines = String(src).split('\n');
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

    out.push(line);
    const isStandaloneImage = /^!\[[^\]]*\]\([^)]+\)\s*$/.test(t);
    if (!isStandaloneImage) continue;

    const next = lines[i + 1];
    if (typeof next === 'string' && next.trim() !== '') {
      out.push('');
    }
  }
  return out.join('\n');
}

function convertLogoTablesToColumns(src, { outPath, assetsDirAbs }) {
  // Convert:
  // <div className={style.logoTable}>
  //   <AviraLogo />
  //   <div className={style.logoText}>...</div>
  // </div>
  // into GitBook columns with an exported SVG asset on the left.
  const lines = String(src).split('\n');
  const out = [];
  let inFence = false;
  let i = 0;

  const isLogoTableOpen = (t) =>
    /^<div\b[^>]*\bclass(Name)?=\{?style\.logoTable\}?\b[^>]*>\s*$/.test(t) ||
    /^<div\b[^>]*\bclass(Name)?="[^"]*\blogoTable\b[^"]*"\b[^>]*>\s*$/.test(t);

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      out.push(line);
      i++;
      continue;
    }
    if (inFence) {
      out.push(line);
      i++;
      continue;
    }

    if (!isLogoTableOpen(t)) {
      out.push(line);
      i++;
      continue;
    }

    // Collect the whole logoTable div block using a simple div depth counter.
    let block = line + '\n';
    let depth = 0;
    const countDivs = (s) => {
      const opens = (s.match(/<div\b/g) || []).length;
      const closes = (s.match(/<\/div>/g) || []).length;
      return { opens, closes };
    };
    // Initialize depth from the opening line.
    depth += 1;
    i++;
    while (i < lines.length && depth > 0) {
      const l = lines[i];
      const c = countDivs(l);
      depth += c.opens;
      depth -= c.closes;
      block += l + '\n';
      i++;
    }

    const logoMatch = block.match(/<([A-Za-z0-9]+Logo)\s*\/>/);
    if (!logoMatch) {
      out.push(block.trimEnd());
      continue;
    }

    const comp = logoMatch[1];
    const filename = `${kebabFromComponentName(comp)}.svg`;
    const rel = toPosixPath(path.relative(path.dirname(outPath), path.join(assetsDirAbs, filename)));
    const href = rel.startsWith('.') ? rel : `./${rel}`;

    // Extract logoText inner HTML-ish content.
    let textInner = '';
    const textStart = block.search(/<div\b[^>]*\bclass(Name)?=\{?style\.logoText\}?\b[^>]*>/);
    if (textStart !== -1) {
      const afterStart = block.slice(textStart);
      const openIdx = afterStart.indexOf('>') + 1;
      const rest = afterStart.slice(openIdx);
      // Find matching </div> for logoText with depth counting within this substring.
      let d = 1;
      let k = 0;
      while (k < rest.length && d > 0) {
        const open = rest.indexOf('<div', k);
        const close = rest.indexOf('</div>', k);
        if (close === -1) break;
        if (open !== -1 && open < close) {
          d++;
          k = open + 4;
        } else {
          d--;
          k = close + 6;
        }
      }
      const content = rest.slice(0, Math.max(0, k - 6));
      // Basic cleanup: drop logoSpeaker div wrappers but keep their content.
      textInner = content.replace(/<div\b[^>]*\bstyle\.logoSpeaker\b[^>]*>/g, '').replace(/<\/div>/g, '');
      textInner = stripJsxComments(textInner);
      textInner = stripJsxStyleObjectsAndAttributeBraces(textInner);
      textInner = jsxHtmlToHtml(textInner);
      textInner = textInner.replace(/<\/?div\b[^>]*>/g, '');
      textInner = textInner.replace(/\n{3,}/g, '\n\n').trim();
      // Ensure the speaker line isn't glued to the quote.
      textInner = textInner.replace(/"\s*\*\*/g, '"\n\n**');
      // If attribution includes a title, put it on the next line (no blank line).
      textInner = textInner.replace(/\*\*([^*\n]+)\*\*\s+\*([^*\n]+)\*/g, (_all, name, title) => {
        return `**${String(name).trim()}**\n*${String(title).trim()}*`;
      });
    }

    out.push('{% columns %}');
    out.push('{% column width="2/12" %}');
    out.push('');
    out.push(`![${humanizeComponentName(comp)}](${href})`);
    out.push('');
    out.push('{% endcolumn %}');
    out.push('{% column width="10/12" %}');
    out.push('');
    if (textInner) out.push(textInner);
    out.push('');
    out.push('{% endcolumn %}');
    out.push('{% endcolumns %}');
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function convertChangelogPostHeader(src) {
  // Convert <ChangelogPostHeader ... /> to standard markdown (GitBook compatible).
  // Expected attrs: title, image, date.
  const lines = String(src).split('\n');
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

    if (t.startsWith('<ChangelogPostHeader')) {
      // Collect until '/>' (may be multi-line).
      let block = line + '\n';
      while (i + 1 < lines.length && !/\/>\s*$/.test(lines[i])) {
        i++;
        block += lines[i] + '\n';
      }

      const title = parseJsxAttribute(block, 'title').trim();
      const date = parseJsxAttribute(block, 'date').trim();
      const image = parseJsxAttribute(block, 'image').trim();

      if (title) out.push(`# ${title}`);
      if (date) out.push(`_${date}_`);
      if (image) out.push(`![](${image})`);
      out.push('');
      continue;
    }

    out.push(line);
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function extractStringProp(objText, key) {
  const re = new RegExp(String.raw`\b${key}\s*:\s*(["'])([\s\S]*?)\1`, 'm');
  const m = re.exec(objText);
  return m ? m[2] : '';
}

function convertSelfGuidedTours(src) {
  // Convert <SelfGuidedTours cards={[ ... ]} /> into a GitBook cards table.
  // This intentionally ignores the interactive overlay behavior and links directly to Navattic capture URLs.
  const lines = String(src).split('\n');
  const out = [];
  let i = 0;
  let inFence = false;

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      out.push(line);
      i++;
      continue;
    }
    if (inFence) {
      out.push(line);
      i++;
      continue;
    }

    if (/^<SelfGuidedTours\b/.test(t)) {
      // Collect until a closing "/>".
      let block = line + '\n';
      i++;
      while (i < lines.length && !/\/>\s*$/.test(lines[i])) {
        block += lines[i] + '\n';
        i++;
      }
      if (i < lines.length) {
        block += lines[i] + '\n';
        i++;
      }

      const cardsStart = block.indexOf('cards={[');
      if (cardsStart === -1) {
        out.push(block.trimEnd());
        continue;
      }
      const arrText = block.slice(cardsStart);
      const open = arrText.indexOf('[');
      const close = arrText.lastIndexOf(']');
      if (open === -1 || close === -1 || close <= open) {
        out.push(block.trimEnd());
        continue;
      }
      const inner = arrText.slice(open + 1, close);

      const objs = [];
      let depth = 0;
      let cur = '';
      for (let j = 0; j < inner.length; j++) {
        const ch = inner[j];
        if (ch === '{') {
          if (depth === 0) cur = '';
          depth++;
        }
        if (depth > 0) cur += ch;
        if (ch === '}') {
          depth--;
          if (depth === 0) objs.push(cur);
        }
      }

      const rows = objs
        .map((obj) => {
          const title = extractStringProp(obj, 'title').trim();
          const blurb = extractStringProp(obj, 'blurb').trim();
          const img = extractStringProp(obj, 'img').trim();
          const href = extractStringProp(obj, 'href').trim();
          const navatticOpen = extractStringProp(obj, 'navatticOpen').trim();

          const url = href
            ? href
            : navatticOpen
              ? navatticOpen.startsWith('http')
                ? navatticOpen
                : `https://capture.navattic.com/${navatticOpen}`
              : '';

          if (!title) return null;
          const titleCell = url ? `[${title}](${url})` : title;
          const cell = blurb ? `${titleCell}\n\n${blurb}` : titleCell;
          return { cell, url, img };
        })
        .filter(Boolean);

      if (!rows.length) continue;

      out.push('<table data-view="cards">');
      out.push('<thead><tr><th></th><th class="hidden"></th><th class="hidden"></th></tr></thead>');
      out.push('<tbody>');
      for (const r of rows) {
        out.push('<tr>');
        out.push(`<td>\n\n${escapeHtml(r.cell)}\n\n</td>`);
        out.push(`<td class="hidden">${escapeHtml(r.url || '')}</td>`);
        out.push(`<td class="hidden">${escapeHtml(r.img || '')}</td>`);
        out.push('</tr>');
      }
      out.push('</tbody>');
      out.push('</table>');
      continue;
    }

    out.push(line);
    i++;
  }

  return out.join('\n');
}

function convertNextImageToMarkdown(src) {
  // Convert simple <Image src="..." /> uses to markdown images.
  const lines = String(src).split('\n');
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
    line = line.replace(/<Image\b[^>]*\bsrc=(["'])([^"']+)\1[^>]*\/>/g, (_all, _q, srcVal) => `![](${srcVal})`);
    out.push(line);
  }
  return out.join('\n');
}

function extractSvgMapFromLogoTsx(logoTsx) {
  const map = new Map();
  const re =
    /export function\s+([A-Za-z0-9_]+Logo)\s*\(\)\s*\{\s*return\s*\(\s*(<svg[\s\S]*?<\/svg>)\s*\);\s*\}/g;
  let m;
  while ((m = re.exec(String(logoTsx)))) {
    const name = m[1];
    let svg = m[2];
    // Normalize a few JSX-isms to plain SVG/HTML.
    svg = svg.replace(/\bclassName=/g, 'class=');
    svg = svg.replace(/\bclipPath=/g, 'clip-path=');
    svg = svg.replace(/\bfillRule=/g, 'fill-rule=');
    svg = svg.replace(/\bclipRule=/g, 'clip-rule=');
    svg = svg.replace(/\bstrokeWidth=/g, 'stroke-width=');
    svg = svg.replace(/\bstrokeLinecap=/g, 'stroke-linecap=');
    svg = svg.replace(/\bstrokeLinejoin=/g, 'stroke-linejoin=');
    map.set(name, svg.trim() + '\n');
  }
  return map;
}

async function ensureGitbookLogoAssets({ inDirAbs, outDirAbs }) {
  const files = await listFilesRecursive(inDirAbs);
  const used = new Set();
  for (const f of files) {
    if (!f.toLowerCase().endsWith('.mdx')) continue;
    const src = await fs.readFile(f, 'utf8');
    const re = /<([A-Za-z0-9]+Logo)\s*\/>/g;
    let m;
    while ((m = re.exec(src))) used.add(m[1]);
  }
  if (!used.size) return { assetsDirAbs: path.join(outDirAbs, '.gitbook', 'assets', 'logos'), used };

  const logoFile = path.join(ROOT, 'components', 'svg', 'Logo.tsx');
  let logoTsx = '';
  try {
    logoTsx = await fs.readFile(logoFile, 'utf8');
  } catch {
    return { assetsDirAbs: path.join(outDirAbs, '.gitbook', 'assets', 'logos'), used };
  }

  const svgMap = extractSvgMapFromLogoTsx(logoTsx);
  const assetsDirAbs = path.join(outDirAbs, '.gitbook', 'assets', 'logos');
  await fs.mkdir(assetsDirAbs, { recursive: true });

  for (const comp of used) {
    const svg = svgMap.get(comp);
    if (!svg) continue;
    const filename = `${kebabFromComponentName(comp)}.svg`;
    const outPath = path.join(assetsDirAbs, filename);
    await fs.writeFile(outPath, svg, 'utf8');
  }

  return { assetsDirAbs, used };
}

async function fileExists(absPath) {
  try {
    await fs.stat(absPath);
    return true;
  } catch {
    return false;
  }
}

function collectRootImageHrefsFromText(src) {
  const s = String(src);
  const out = new Set();
  // Markdown images: ![alt](/path/to.png)
  for (const m of s.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)) out.add(m[1]);
  // HTML images: <img src="/path/to.png" ...>
  for (const m of s.matchAll(/<img\b[^>]*\bsrc=(["'])(\/[^"']+)\1[^>]*>/gi)) out.add(m[2]);
  // Common JSX/MDX props: src="/...", image="/..."
  for (const m of s.matchAll(/\b(?:src|image)\s*=\s*(["'])(\/[^"']+\.(?:png|jpe?g|gif|svg|webp))\1/gi)) out.add(m[2]);
  // Frontmatter-style thumbnails: thumbnail: "/..."
  for (const m of s.matchAll(/^\s*thumbnail\s*:\s*(["'])(\/[^"']+\.(?:png|jpe?g|gif|svg|webp))\1\s*$/gim)) out.add(m[2]);
  return out;
}

async function ensureGitbookStaticImageAssets({ inDirAbs, outDirAbs }) {
  // Copy any root-relative image refs (e.g. /foo.png) from /public into this space's .gitbook/assets.
  const files = await listFilesRecursive(inDirAbs);
  const rootHrefs = new Set();
  for (const f of files) {
    const lower = f.toLowerCase();
    if (!(lower.endsWith('.mdx') || lower.endsWith('.md'))) continue;
    const src = await fs.readFile(f, 'utf8');
    for (const href of collectRootImageHrefsFromText(src)) rootHrefs.add(href);
  }

  const assetsDirAbs = path.join(outDirAbs, '.gitbook', 'assets');
  await fs.mkdir(assetsDirAbs, { recursive: true });

  const copied = new Set();
  for (const href of rootHrefs) {
    const relFromRoot = href.replace(/^\/+/, '');
    const srcAbs = path.join(ROOT, 'public', relFromRoot);
    if (!(await fileExists(srcAbs))) continue;
    const dstAbs = path.join(assetsDirAbs, relFromRoot);
    await fs.mkdir(path.dirname(dstAbs), { recursive: true });
    const buf = await fs.readFile(srcAbs);
    await fs.writeFile(dstAbs, buf);
    copied.add(href);
  }

  return { assetsDirAbs, copiedRootHrefs: copied };
}

function rewriteRootImagesToGitbookAssets(src, { outPath, assetsDirAbs, copiedRootHrefs }) {
  // Rewrite ![](/foo.png) -> ![](../.gitbook/assets/foo.png) only when the asset was copied.
  const s = String(src);
  return s.replace(/!\[([^\]]*)\]\((\/[^)\s]+)\)/g, (_all, alt, href) => {
    if (copiedRootHrefs && !copiedRootHrefs.has(href)) return `![${alt}](${href})`;
    const relFromRoot = href.replace(/^\/+/, '');
    const assetAbs = path.join(assetsDirAbs, relFromRoot);
    const rel = toPosixPath(path.relative(path.dirname(outPath), assetAbs));
    return `![${alt}](${rel.startsWith('.') ? rel : `./${rel}`})`;
  });
}

function stripStyleTags(src) {
  // Drop <style ...> ... </style> blocks (unsupported in GitBook markdown rendering).
  const lines = String(src).split('\n');
  const out = [];
  let inFence = false;
  let skipping = false;
  for (const line of lines) {
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
    if (skipping) {
      if (t.includes('</style>')) skipping = false;
      continue;
    }
    if (/^<style\b/i.test(t)) {
      if (!t.includes('</style>')) skipping = true;
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

function stripFaqComponentWrappers(src) {
  // Drop <div class="faqComponent"> wrappers used for styling in Nextra.
  const lines = String(src).split('\n');
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
    if (/^<div\b[^>]*\bclass="[^"]*\bfaqComponent\b[^"]*"[^>]*>\s*$/.test(t)) continue;
    if (/^<div\b[^>]*\bclassName="[^"]*\bfaqComponent\b[^"]*"[^>]*>\s*$/.test(t)) continue;
    if (t === '</div>') continue;
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
  let out = src.replace(/<iframe\b([\s\S]*?)>([\s\S]*?)<\/iframe>/gi, (_all, attrs) => {
    const raw = parseJsxAttribute(attrs, 'src');
    const url = normalizeEmbedUrl(raw);
    if (!url) return '';
    return `{% embed url="${escapeHtml(url)}" %}`;
  });

  // Self-closing JSX iframes: <iframe ... />
  out = out.replace(/<iframe\b([\s\S]*?)\/>/gi, (_all, attrs) => {
    const raw = parseJsxAttribute(attrs, 'src');
    const url = normalizeEmbedUrl(raw);
    if (!url) return '';
    return `{% embed url="${escapeHtml(url)}" %}`;
  });

  return out;
}

function basicHtmlToMarkdown(src) {
  let out = String(src);

  // Links
  out = out.replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_all, href, text) => {
    const t = String(text).replace(/<[^>]+>/g, '').trim();
    return `[${t || href}](${href})`;
  });

  // Headings (common in guides asides)
  out = out.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (_all, inner) => {
    const t = String(inner).replace(/<[^>]+>/g, '').replace(/\*\*/g, '').trim();
    return `### ${t}`;
  });
  out = out.replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, (_all, inner) => {
    const t = String(inner).replace(/<[^>]+>/g, '').replace(/\*\*/g, '').trim();
    return `### ${t}`;
  });

  // Paragraph-like wrappers
  out = out.replace(/<\/?p\b[^>]*>/gi, '\n');
  out = out.replace(/<\/?aside\b[^>]*>/gi, '\n');

  // Strip div/section wrappers (structure handled by caller)
  out = out.replace(/<\/?div\b[^>]*>/gi, '\n');

  // Any remaining tags: drop
  out = out.replace(/<[^>]+>/g, '');

  // Normalize whitespace
  out = out.replace(/\n{3,}/g, '\n\n').trim();
  return out;
}

function spanToPercent(span) {
  const s = Math.max(1, Math.min(12, Number(span) || 0));
  const pct = (s / 12) * 100;
  // Keep stable-ish formatting; GitBook accepts strings like "58.33%".
  return `${pct.toFixed(2).replace(/\.00$/, '')}%`;
}

function pickSpanPairFromPx(leftPx, rightPx) {
  const l = Number(leftPx);
  const r = Number(rightPx);
  if (!Number.isFinite(l) || !Number.isFinite(r) || l <= 0 || r <= 0) {
    return { leftSpan: 6, rightSpan: 6 };
  }
  const total = l + r;
  const left = Math.round((l / total) * 12);
  const leftSpan = Math.max(1, Math.min(11, left));
  const rightSpan = 12 - leftSpan;
  return { leftSpan, rightSpan };
}

function extractFirstPxFromStyleDivOpenTag(openTag) {
  // Extract first px value from common style bits like flex: '1 1 420px', minWidth: '280px'
  const m = openTag.match(/(\d+(?:\.\d+)?)px/i);
  return m ? Number(m[1]) : null;
}

function convertSectionAsideToColumns(src) {
  // Convert a section that pairs an embed (left) with an aside (right) into GitBook columns.
  // This matches patterns used in Guides like:
  // <section ...>
  //   ... {% embed url="..." %} ...
  //   <aside>...</aside>
  // </section>
  return String(src).replace(/<section\b[\s\S]*?>[\s\S]*?<\/section>/gi, (sectionBlock) => {
    const embedMatch = sectionBlock.match(/\{%\s*embed\s+url="[^"]+"\s*%\}/i);
    const asideMatch = sectionBlock.match(/<aside\b[\s\S]*?>[\s\S]*?<\/aside>/i);
    if (!embedMatch || !asideMatch) return sectionBlock;

    const embed = embedMatch[0].trim();
    const asideMd = basicHtmlToMarkdown(asideMatch[0]);

    // Default: 7/12 + 5/12 split for media + text.
    const leftWidth = spanToPercent(7);
    const rightWidth = spanToPercent(5);

    return [
      '{% columns %}',
      `{% column width="${leftWidth}" %}`,
      '',
      embed,
      '',
      '{% endcolumn %}',
      '',
      `{% column width="${rightWidth}" %}`,
      '',
      asideMd,
      '',
      '{% endcolumn %}',
      '{% endcolumns %}',
    ]
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  });
}

function findMatchingClosingDivIndex(s, openIdx) {
  // openIdx points at '<div'
  const OPEN = '<div';
  const CLOSE = '</div>';
  let idx = openIdx;
  let depth = 0;
  while (idx < s.length) {
    const nextOpen = s.indexOf(OPEN, idx);
    const nextClose = s.indexOf(CLOSE, idx);
    if (nextClose === -1) return -1;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      idx = nextOpen + OPEN.length;
      continue;
    }
    depth -= 1;
    idx = nextClose + CLOSE.length;
    if (depth === 0) return idx;
  }
  return -1;
}

function extractFirstTwoStyledChildDivs(inner) {
  const OPEN = '<div';
  const res = [];
  let i = 0;
  while (i < inner.length && res.length < 2) {
    const openIdx = inner.indexOf(OPEN, i);
    if (openIdx === -1) break;
    const tagEnd = inner.indexOf('>', openIdx);
    if (tagEnd === -1) break;
    const openTag = inner.slice(openIdx, tagEnd + 1);
    if (!/style=\{\{/.test(openTag)) {
      i = tagEnd + 1;
      continue;
    }
    const closeIdx = findMatchingClosingDivIndex(inner, openIdx);
    if (closeIdx === -1) break;
    const whole = inner.slice(openIdx, closeIdx);
    // Extract body between first '>' and last '</div>'
    const bodyStart = whole.indexOf('>') + 1;
    const bodyEnd = whole.lastIndexOf('</div>');
    const body = bodyEnd > bodyStart ? whole.slice(bodyStart, bodyEnd) : '';
    res.push({ body: body.trim(), openTag });
    i = closeIdx;
  }
  return res.length === 2 ? res : null;
}

function convertFlexDivsToColumns(src) {
  // Convert common Guides pattern:
  // <div style={{ display: 'flex', ... }}>
  //   <div style={{ flex: ... }}>...</div>
  //   <div style={{ flex: ... }}>...</div>
  // </div>
  //
  // into GitBook columns with the two child div bodies.
  const s = String(src);
  let out = '';
  let i = 0;
  while (i < s.length) {
    const openIdx = s.indexOf('<div', i);
    if (openIdx === -1) {
      out += s.slice(i);
      break;
    }
    const tagEnd = s.indexOf('>', openIdx);
    if (tagEnd === -1) {
      out += s.slice(i);
      break;
    }
    const openTag = s.slice(openIdx, tagEnd + 1);
    const isFlex =
      /style=\{\{[\s\S]*?display\s*:\s*['"]flex['"][\s\S]*?\}\}/.test(openTag) ||
      /style=\{\{[\s\S]*?display\s*:\s*"flex"[\s\S]*?\}\}/.test(openTag);
    if (!isFlex) {
      out += s.slice(i, tagEnd + 1);
      i = tagEnd + 1;
      continue;
    }

    const closeIdx = findMatchingClosingDivIndex(s, openIdx);
    if (closeIdx === -1) {
      out += s.slice(i, tagEnd + 1);
      i = tagEnd + 1;
      continue;
    }
    const whole = s.slice(openIdx, closeIdx);
    const bodyStart = whole.indexOf('>') + 1;
    const bodyEnd = whole.lastIndexOf('</div>');
    const inner = bodyEnd > bodyStart ? whole.slice(bodyStart, bodyEnd) : '';
    const children = extractFirstTwoStyledChildDivs(inner);
    if (!children) {
      out += s.slice(i, closeIdx);
      i = closeIdx;
      continue;
    }

    const leftPx = extractFirstPxFromStyleDivOpenTag(children[0].openTag) ?? 420;
    const rightPx = extractFirstPxFromStyleDivOpenTag(children[1].openTag) ?? 300;
    const { leftSpan, rightSpan } = pickSpanPairFromPx(leftPx, rightPx);
    const leftWidth = spanToPercent(leftSpan);
    const rightWidth = spanToPercent(rightSpan);

    // Keep child content mostly as-is; downstream converters will clean styles/links/etc.
    const columns = [
      '{% columns %}',
      `{% column width="${leftWidth}" %}`,
      '',
      children[0].body,
      '',
      '{% endcolumn %}',
      '',
      `{% column width="${rightWidth}" %}`,
      '',
      children[1].body,
      '',
      '{% endcolumn %}',
      '{% endcolumns %}',
    ]
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    out += s.slice(i, openIdx) + columns;
    i = closeIdx;
  }
  return out;
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

    // De-indent accidental prose indentation (common after HTML->markdown conversions).
    // Avoid touching lists / blockquotes / tables / code fences.
    if (/^\s{4,}\S/.test(line)) {
      const trimmed = line.trimStart();
      const isSpecial =
        /^([-*]\s+|\d+\.\s+|>|\|)/.test(trimmed) ||
        trimmed.startsWith('```') ||
        trimmed.startsWith('{%');
      if (!isSpecial) {
        out.push(trimmed);
        prevWasList = false;
        continue;
      }
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
  // Remove MDX/TS import/export blocks at top-level (but keep code fences intact).
  // Handles multiline imports like:
  // import {
  //   A,
  // } from 'x';
  const lines = src.split('\n');
  const kept = [];
  let inFence = false;
  let skippingImport = false;
  let skippingExport = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('```')) {
      inFence = !inFence;
      kept.push(line);
      continue;
    }
    if (!inFence) {
      if (skippingImport) {
        // End when we hit a semicolon OR a from-clause line (semicolon optional).
        if (t.includes(';') || /\bfrom\s+['"][^'"]+['"]\s*;?\s*$/.test(t) || t === '};') skippingImport = false;
        continue;
      }
      if (skippingExport) {
        if (t.endsWith(';') || t === '};' || t === '}' || t === '});') skippingExport = false;
        continue;
      }
      if (t.startsWith('import ')) {
        // Drop single-line imports even when semicolons are omitted.
        if (/\bfrom\s+['"][^'"]+['"]\s*;?\s*$/.test(t)) continue;
        // Otherwise start skipping until terminator.
        if (!t.endsWith(';')) skippingImport = true;
        continue;
      }
      if (t.startsWith('export ')) {
        if (!t.endsWith(';')) skippingExport = true;
        continue;
      }
      // Also drop trailing "from 'x';" lines that can remain if the leading `import {` was removed.
      if ((t.startsWith('} from ') || t.startsWith('}from ')) && t.endsWith(';')) continue;
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

function convertOne(src, maps, ctx) {
  let out = src;
  out = promoteMetadataDescriptionToDescription(out);
  out = stripMdxExportsAndImports(out);
  out = convertChangelogPostHeader(out);
  out = convertLogoTablesToColumns(out, ctx);
  out = jsxHtmlToHtml(out);
  out = convertFlexDivsToColumns(out);
  out = stripJsxStyleObjectsAndAttributeBraces(out);
  out = convertSelfGuidedTours(out);
  out = convertNextImageToMarkdown(out);
  out = convertLogoComponentsToGitbookImages(out, ctx);
  out = ensureBlankLineAfterStandaloneImages(out);
  out = convertLogoSpeakerToMarkdown(out);
  out = stripUselessDivs(out);
  out = stripJsxComments(out);
  out = stripStyleTags(out);
  out = stripFaqComponentWrappers(out);
  out = convertIframesToEmbeds(out);
  out = convertSectionAsideToColumns(out);
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
  const { assetsDirAbs: staticAssetsDirAbs, copiedRootHrefs } = await ensureGitbookStaticImageAssets({
    inDirAbs: inDir,
    outDirAbs: outDir,
  });
  const { assetsDirAbs } = await ensureGitbookLogoAssets({ inDirAbs: inDir, outDirAbs: outDir });
  const files = await listFilesRecursive(inDir);
  await fs.mkdir(outDir, { recursive: true });

  const expectedRelMdPaths = new Set(
    files
      .filter((f) => {
        const lower = f.toLowerCase();
        return lower.endsWith('.mdx') || lower.endsWith('.md');
      })
      .map((f) => {
        const rel = toPosixPath(path.relative(inDir, f));
        const lowerRel = rel.toLowerCase();
        // For troubleshooting, treat faqs as the space README (single-page space).
        if (toPosixPath(args.inDir).endsWith('pages/troubleshooting') && lowerRel === 'faqs.mdx') {
          return 'README.md';
        }
        return rel.replace(/\.mdx$/i, '.md');
      }),
  );

  for (const file of files) {
    const rel = path.relative(inDir, file);
    let outRel = toPosixPath(rel).replace(/\.mdx$/i, '.md');
    if (toPosixPath(args.inDir).endsWith('pages/troubleshooting') && toPosixPath(rel).toLowerCase() === 'faqs.mdx') {
      outRel = 'README.md';
    }
    const outPath = path.join(outDir, outRel);
    await fs.mkdir(path.dirname(outPath), { recursive: true });

    const src = await fs.readFile(file, 'utf8');
    let converted = file.toLowerCase().endsWith('.mdx')
      ? convertOne(src, maps, { outPath, assetsDirAbs })
      : src;
    converted = rewriteRootImagesToGitbookAssets(converted, {
      outPath,
      assetsDirAbs: staticAssetsDirAbs,
      copiedRootHrefs,
    });
    converted = rewriteInternalDocsLinks(converted, outPath, outDir);
    converted = await tagBetaByMeta(converted, file, inDir);
    await fs.writeFile(outPath, converted, 'utf8');
  }

  await cleanupExtraneousConvertedMarkdown({ outDirAbs: outDir, expectedRelMdPaths });

  process.stdout.write(`Converted ${files.length} files from ${args.inDir} -> ${args.outDir}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


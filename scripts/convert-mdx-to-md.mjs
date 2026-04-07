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

async function listFilesRecursive(dir) {
  const out = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      out.push(...(await listFilesRecursive(full)));
    } else if (it.isFile() && full.endsWith('.mdx')) {
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
      const title = parseJsxAttribute(attrs, 'title');
      const href = parseJsxAttribute(attrs, 'href');
      if (!title || !href) continue;
      rows.push({ title, href });
    }

    if (rows.length === 0) return '';

    const out = [];
    out.push('<table data-view="cards">');
    out.push('  <thead>');
    out.push('    <tr>');
    out.push('      <th>Title</th>');
    out.push('      <th data-card-target data-type="content-ref">Target</th>');
    out.push('    </tr>');
    out.push('  </thead>');
    out.push('  <tbody>');
    for (const r of rows) {
      out.push('    <tr>');
      out.push(`      <td>${escapeHtml(r.title)}</td>`);
      out.push(`      <td><a href="${escapeHtml(r.href)}">${escapeHtml(r.title)}</a></td>`);
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
  out = stripMdxExportsAndImports(out);
  out = convertCards(out);
  out = convertCallouts(out);
  out = convertExtendedAccordions(out);
  out = convertSteps(out);
  out = convertTabsBlocks(out);
  out = convertExtendedTabs(out, maps);
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
    const converted = convertOne(src, maps);
    await fs.writeFile(outPath, converted, 'utf8');
  }

  process.stdout.write(`Converted ${files.length} files from ${args.inDir} -> ${args.outDir}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


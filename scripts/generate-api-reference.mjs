import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function slugifySegment(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

async function listFilesRecursive(dir) {
  const out = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const it of items) {
    const abs = path.join(dir, it.name);
    if (it.isDirectory()) out.push(...(await listFilesRecursive(abs)));
    else out.push(abs);
  }
  return out;
}

async function readOrderYaml(absPath) {
  let src = '';
  try {
    src = await fs.readFile(absPath, 'utf8');
  } catch {
    return [];
  }
  return src
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2).trim())
    .filter(Boolean);
}

function parseFrontmatter(md) {
  const s = String(md);
  if (!s.startsWith('---\n')) return { fm: {}, body: s };
  const end = s.indexOf('\n---\n', 4);
  if (end === -1) return { fm: {}, body: s };
  const raw = s.slice(4, end).trim();
  const body = s.slice(end + '\n---\n'.length);
  const fm = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_:-]+)\s*:\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    fm[key] = val;
  }
  return { fm, body };
}

function ensureH1(body, title) {
  const b = String(body).replace(/^\s+/, '');
  if (/^#\s+/m.test(b)) return body;
  const t = String(title || '').trim();
  if (!t) return body;
  return `# ${t}\n\n${body}`;
}

function humanizeSlug(slug) {
  return String(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\bapi\b/gi, 'API')
    .replace(/\b(\w)/g, (m) => m.toUpperCase())
    .trim();
}

function buildSlugIndex(refRootAbs) {
  // Index slugs to output-relative paths, based on basenames and dir names.
  // Used for rewriting (ref:slug) links.
  const index = new Map();

  const add = (slug, relPath) => {
    if (!slug) return;
    if (!index.has(slug)) index.set(slug, relPath);
  };

  const walkDir = async (absDir, outRelDir) => {
    const order = await readOrderYaml(path.join(absDir, '_order.yaml'));
    for (const item of order) {
      const fileAbs = path.join(absDir, `${item}.md`);
      const dirAbs = path.join(absDir, item);
      try {
        const st = await fs.stat(fileAbs);
        if (st.isFile()) {
          add(item, toPosix(path.join(outRelDir, `${item}.md`)));
          continue;
        }
      } catch {}
      try {
        const st = await fs.stat(dirAbs);
        if (st.isDirectory()) {
          const seg = slugifySegment(item);
          // Map directory slug to its first page if possible.
          const childOrder = await readOrderYaml(path.join(dirAbs, '_order.yaml'));
          if (childOrder.length) {
            add(item, toPosix(path.join(outRelDir, seg, `${childOrder[0]}.md`)));
          } else {
            add(item, toPosix(path.join(outRelDir, seg)));
          }
          await walkDir(dirAbs, path.join(outRelDir, seg));
        }
      } catch {}
    }
  };

  return walkDir(refRootAbs, '').then(() => index);
}

function rewriteRefLinks(md, { absOutFile, outRootAbs, slugIndex, localDirAbs }) {
  const s = String(md);
  return s.replace(/\]\(\s*ref:([^)#\s]+)(#[^)]+)?\s*\)/g, (_all, slug, hash = '') => {
    // Prefer local (same directory) mapping: slug.md or slug/first-child.md
    const localFile = path.join(localDirAbs, `${slug}.md`);
    const localDir = path.join(localDirAbs, slug);
    let targetRel = '';
    if (slugIndex.has(slug)) targetRel = slugIndex.get(slug);
    // If index didn't find it, keep as-is.
    if (!targetRel) return `](ref:${slug}${hash || ''})`;
    const absTarget = path.join(outRootAbs, targetRel);
    const fromDir = path.dirname(absOutFile);
    let rel = toPosix(path.relative(fromDir, absTarget));
    if (!rel.startsWith('.')) rel = `./${rel}`;
    return `](${rel}${hash || ''})`;
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rewriteCrossSpaceLinks(md, { fromSection }) {
  // Keep in sync with convert-mdx-to-md.mjs space bases.
  const BASE = {
    docs: 'https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/',
    guides: 'https://app.gitbook.com/s/T5M6sZZR1LgkJeivZBt6/',
    troubleshooting: 'https://app.gitbook.com/s/j2N0ULQkDlAGcEm3cnYO/',
  };

  const rewriteOne = (href) => {
    const raw = String(href || '').trim();
    if (!raw) return raw;
    let u = raw;
    if (u.startsWith('https://mixpanel.com/docs/')) u = u.replace('https://mixpanel.com', '');
    if (u.startsWith('https://mixpanel.com/guides/')) u = u.replace('https://mixpanel.com', '');
    const [pathPart, hash = ''] = u.split('#');
    if (pathPart.startsWith('/docs/')) {
      const rel = pathPart.replace(/^\/docs\//, '').replace(/\/$/, '').replace(/\.md$/i, '');
      return `${BASE.docs}${rel}${hash ? `#${hash}` : ''}`;
    }
    if (pathPart.startsWith('/guides/')) {
      const rel = pathPart.replace(/^\/guides\//, '').replace(/\/$/, '').replace(/\.md$/i, '');
      return `${BASE.guides}${rel}${hash ? `#${hash}` : ''}`;
    }
    if (pathPart.startsWith('/troubleshooting/')) {
      const rel = pathPart.replace(/^\/troubleshooting\//, '').replace(/\/$/, '').replace(/\.md$/i, '');
      return `${BASE.troubleshooting}${rel}${hash ? `#${hash}` : ''}`;
    }
    return raw;
  };

  // markdown links
  let out = String(md);
  out = out.replace(/\]\((\/docs\/[^)\s]+)\)/g, (_all, href) => `](${rewriteOne(href)})`);
  out = out.replace(/\]\((\/guides\/[^)\s]+)\)/g, (_all, href) => `](${rewriteOne(href)})`);
  out = out.replace(/\]\((https:\/\/mixpanel\.com\/docs\/[^)\s]+)\)/g, (_all, href) => `](${rewriteOne(href)})`);
  out = out.replace(/\]\((https:\/\/mixpanel\.com\/guides\/[^)\s]+)\)/g, (_all, href) => `](${rewriteOne(href)})`);
  // html links
  out = out.replace(/<a\b([^>]*?)\shref="([^"]+)"([^>]*)>/g, (_all, pre, href, post) => {
    const rewritten = rewriteOne(href);
    return `<a${pre} href="${escapeHtml(rewritten)}"${post}>`;
  });
  return out;
}

async function copyOpenapiSpecs() {
  const srcDir = path.join(ROOT, 'openapi', 'src');
  const outDir = path.join(ROOT, 'gitbook', 'openapi');
  await fs.mkdir(outDir, { recursive: true });
  const files = await fs.readdir(srcDir);
  for (const f of files) {
    if (!f.endsWith('.openapi.yaml')) continue;
    const inAbs = path.join(srcDir, f);
    const outName = f.replace(/\.openapi\.yaml$/i, '.yaml');
    const outAbs = path.join(outDir, outName);
    const buf = await fs.readFile(inAbs);
    await fs.writeFile(outAbs, buf);
  }
}

async function main() {
  const refRoot = path.join(ROOT, 'reference');
  const outRoot = path.join(ROOT, 'gitbook', 'pages', 'api');
  await fs.mkdir(outRoot, { recursive: true });

  await copyOpenapiSpecs();

  const topOrder = await readOrderYaml(path.join(refRoot, '_order.yaml'));
  const slugIndex = await buildSlugIndex(refRoot);

  // Build pages + SUMMARY
  let summary = '# Table of contents\n\n* [API Reference](README.md)\n\n';

  for (const top of topOrder) {
    const topDir = path.join(refRoot, top);
    let st = null;
    try {
      st = await fs.stat(topDir);
    } catch {
      continue;
    }
    if (!st.isDirectory()) continue;

    summary += `## ${top}\n\n`;
    const topSeg = slugifySegment(top);

    const topDirOrder = await readOrderYaml(path.join(topDir, '_order.yaml'));
    for (const item of topDirOrder) {
      const fileAbs = path.join(topDir, `${item}.md`);
      const dirAbs = path.join(topDir, item);

      const copyOne = async (absIn, outRel) => {
        const outAbs = path.join(outRoot, outRel);
        await fs.mkdir(path.dirname(outAbs), { recursive: true });
        const src = await fs.readFile(absIn, 'utf8');
        const { fm, body } = parseFrontmatter(src);
        let out = ensureH1(body, fm.title);
        out = rewriteRefLinks(out, {
          absOutFile: outAbs,
          outRootAbs: outRoot,
          slugIndex,
          localDirAbs: path.join(outRoot, path.dirname(outRel)),
        });
        out = rewriteCrossSpaceLinks(out, { fromSection: 'api' });
        await fs.writeFile(outAbs, out, 'utf8');
        return fm;
      };

      // direct page
      try {
        const stFile = await fs.stat(fileAbs);
        if (stFile.isFile()) {
          const outRel = toPosix(path.join(topSeg, `${item}.md`));
          const fm = await copyOne(fileAbs, outRel);
          const label = (fm?.title || '').trim() || humanizeSlug(item);
          summary += `* [${label}](${outRel})\n`;
          continue;
        }
      } catch {}

      // directory subgroup
      try {
        const stDir = await fs.stat(dirAbs);
        if (stDir.isDirectory()) {
          // Copy all md in subtree in deterministic order via its _order.yaml
          const subOrder = await readOrderYaml(path.join(dirAbs, '_order.yaml'));
          for (const sub of subOrder) {
            const subFile = path.join(dirAbs, `${sub}.md`);
            try {
              const stSub = await fs.stat(subFile);
              if (!stSub.isFile()) continue;
            } catch {
              continue;
            }
            const outRel = toPosix(path.join(topSeg, item, `${sub}.md`));
            await copyOne(subFile, outRel);
          }
          // Add group entry: link to first page
          if (subOrder.length) {
            const groupLink = toPosix(path.join(topSeg, item, `${subOrder[0]}.md`));
            summary += `* [${humanizeSlug(item)}](${groupLink})\n`;
          } else {
            summary += `* ${humanizeSlug(item)}\n`;
          }
        }
      } catch {}
    }

    summary += '\n';
  }

  await fs.writeFile(path.join(outRoot, 'SUMMARY.md'), summary, 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


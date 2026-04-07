import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const ROOT = path.resolve(process.cwd());

/** OpenAPI path item operation keys only (exclude parameters, servers, $ref, etc.). */
const OPENAPI_OPERATION_METHODS = new Set([
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
]);

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

function convertAdjacentCaptionedCodeFencesToTabs(md) {
  // Convert sequences of fenced code blocks like:
  // ```json JSON
  // ...
  // ```
  // ```json ndJSON
  // ...
  // ```
  // into GitBook tabs, with tab titles from the caption ("JSON", "ndJSON").
  const lines = String(md).split('\n');
  const out = [];
  let i = 0;

  const parseFenceInfo = (info) => {
    const t = String(info || '').trim();
    if (!t) return { lang: '', title: '' };
    const parts = t.split(/\s+/);
    const lang = parts[0] || '';
    const title = parts.slice(1).join(' ').trim();
    return { lang, title };
  };

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    if (!t.startsWith('```')) {
      out.push(line);
      i++;
      continue;
    }

    const info = t.slice(3);
    const first = parseFenceInfo(info);
    if (!first.title) {
      // Not captioned; pass through fence verbatim.
      out.push(line);
      i++;
      while (i < lines.length && !String(lines[i]).trim().startsWith('```')) {
        out.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        out.push(lines[i]);
        i++;
      }
      continue;
    }

    // Collect a run of captioned fences separated only by blank lines.
    const blocks = [];
    while (i < lines.length) {
      const open = String(lines[i]).trim();
      if (!open.startsWith('```')) break;
      const meta = parseFenceInfo(open.slice(3));
      if (!meta.title) break;

      i++; // move past opening fence
      const body = [];
      while (i < lines.length && !String(lines[i]).trim().startsWith('```')) {
        body.push(lines[i]);
        i++;
      }
      const close = i < lines.length ? lines[i] : '```';
      if (i < lines.length) i++; // consume closing fence
      blocks.push({ lang: meta.lang, title: meta.title, body: body.join('\n') });

      // Eat blank lines between blocks
      let j = i;
      while (j < lines.length && String(lines[j]).trim() === '') j++;
      // Stop if next non-empty isn't a captioned fence
      if (j >= lines.length) {
        i = j;
        break;
      }
      const next = String(lines[j]).trim();
      if (!next.startsWith('```')) {
        i = j;
        break;
      }
      const nextMeta = parseFenceInfo(next.slice(3));
      if (!nextMeta.title) {
        i = j;
        break;
      }
      // keep blanks as a single blank line inside tabs, but we can just skip them.
      i = j;
    }

    if (blocks.length <= 1) {
      // Single captioned fence: drop caption, keep language.
      const b = blocks[0];
      out.push(`\`\`\`${b.lang}`);
      if (b.body) out.push(...b.body.split('\n'));
      out.push('```');
      continue;
    }

    out.push('{% tabs %}');
    for (const b of blocks) {
      out.push(`{% tab title="${b.title.replace(/"/g, '\\"')}" %}`);
      out.push(`\`\`\`${b.lang}`);
      if (b.body) out.push(...b.body.split('\n'));
      out.push('```');
      out.push('{% endtab %}');
      out.push('');
    }
    if (out[out.length - 1] === '') out.pop();
    out.push('{% endtabs %}');
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function rewriteCrossSpaceLinks(md, { fromSection }) {
  // Keep in sync with convert-mdx-to-md.mjs space bases.
  const BASE = {
    docs: 'https://app.gitbook.com/s/qGpd1uH02qXOCsOiKqLX/',
    guides: 'https://app.gitbook.com/s/T5M6sZZR1LgkJeivZBt6/',
    troubleshooting: 'https://app.gitbook.com/s/j2N0ULQkDlAGcEm3cnYO/',
    api: 'https://app.gitbook.com/s/PTXfV1v47AbDFk5bjzT2/',
  };

  const rewriteOne = (href) => {
    const raw = String(href || '').trim();
    if (!raw) return raw;
    let u = raw;
    // Developer docs site (docs.mixpanel.com) -> GitBook docs space
    if (u.startsWith('https://docs.mixpanel.com/docs/')) {
      const rest = u.slice('https://docs.mixpanel.com/docs/'.length);
      const [pathPart, hash = ''] = rest.split('#');
      const rel = pathPart.replace(/\/$/, '').replace(/\.md$/i, '');
      return `${BASE.docs}${rel}${hash ? `#${hash}` : ''}`;
    }
    if (u.startsWith('https://docs.mixpanel.com/guides/')) {
      const rest = u.slice('https://docs.mixpanel.com/guides/'.length);
      const [pathPart, hash = ''] = rest.split('#');
      const rel = pathPart.replace(/\/$/, '').replace(/\.md$/i, '');
      return `${BASE.guides}${rel}${hash ? `#${hash}` : ''}`;
    }
    // Developer site reference links -> API space
    if (u.startsWith('https://developer.mixpanel.com/reference/')) {
      const rel = u.replace('https://developer.mixpanel.com/reference/', '').replace(/\/$/, '');
      return `${BASE.api}${rel}`;
    }
    if (u.startsWith('https://developer.mixpanel.com/reference')) {
      return BASE.api;
    }
    if (u.startsWith('/reference/')) {
      const rel = u.replace(/^\/reference\//, '').replace(/\/$/, '');
      return `${BASE.api}${rel}`;
    }
    if (u === '/reference') return BASE.api;
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
  out = out.replace(/\]\((https:\/\/docs\.mixpanel\.com\/docs\/[^)\s]+)\)/g, (_all, href) => `](${rewriteOne(href)})`);
  out = out.replace(/\]\((https:\/\/docs\.mixpanel\.com\/guides\/[^)\s]+)\)/g, (_all, href) => `](${rewriteOne(href)})`);
  out = out.replace(/\]\((https:\/\/developer\.mixpanel\.com\/reference\/[^)\s]+)\)/g, (_all, href) =>
    `](${rewriteOne(href)})`,
  );
  out = out.replace(/\]\((\/reference\/[^)\s]+)\)/g, (_all, href) => `](${rewriteOne(href)})`);
  // html links
  out = out.replace(/<a\b([^>]*?)\shref="([^"]+)"([^>]*)>/g, (_all, pre, href, post) => {
    const rewritten = rewriteOne(href);
    return `<a${pre} href="${escapeHtml(rewritten)}"${post}>`;
  });
  return out;
}

/** Rewrite docs/guides URLs inside any string (descriptions, examples, etc.). */
function rewriteCrossSpaceLinksDeepInPlace(node) {
  if (typeof node === 'string') {
    return rewriteCrossSpaceLinks(node, { fromSection: 'api' });
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      node[i] = rewriteCrossSpaceLinksDeepInPlace(node[i]);
    }
    return node;
  }
  if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) {
      node[k] = rewriteCrossSpaceLinksDeepInPlace(node[k]);
    }
    return node;
  }
  return node;
}

async function copyOpenapiSpecs() {
  const srcDir = path.join(ROOT, 'openapi', 'src');
  const outDir = path.join(ROOT, 'gitbook', 'openapi');
  await fs.mkdir(outDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const e of entries) {
    const inAbs = path.join(srcDir, e.name);
    if (e.isFile() && e.name.endsWith('.openapi.yaml')) {
      const outName = e.name.replace(/\.openapi\.yaml$/i, '.yaml');
      const outAbs = path.join(outDir, outName);
      const buf = await fs.readFile(inAbs);
      await fs.writeFile(outAbs, buf);
    }
  }
}

function deepClone(obj) {
  return obj == null ? obj : JSON.parse(JSON.stringify(obj));
}

/**
 * Match bullet lines like `* \`api\` - The default (US)...` from OpenAPI variable descriptions.
 */
function labelFromVariableDescription(varDef, value) {
  const desc = String(varDef?.description || '');
  const val = String(value).trim();
  for (const line of desc.split('\n')) {
    const t = line.trim();
    const m = t.match(/^\*\s*`([^`]+)`\s*[-–]\s*(.+)$/);
    if (m && String(m[1]).trim() === val) return m[2].trim();
  }
  return val;
}

/**
 * Replace `servers` entries that use URL templates + `variables` with multiple explicit
 * server objects (GitBook request runner prefers a server list over templated URLs).
 */
function expandOneServerEntry(entry) {
  if (!entry || typeof entry !== 'object') return [entry];
  if (!entry.variables || typeof entry.url !== 'string') return [entry];
  const url = entry.url;
  const placeholders = [...url.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
  if (!placeholders.length) return [entry];
  if (placeholders.length > 1) return [entry];

  const name = placeholders[0];
  const varDef = entry.variables[name];
  if (!varDef || typeof varDef !== 'object') return [entry];
  const vals =
    Array.isArray(varDef.enum) && varDef.enum.length
      ? varDef.enum
      : varDef.default != null
        ? [varDef.default]
        : [];
  if (!vals.length) return [entry];

  const out = [];
  for (const val of vals) {
    const label = labelFromVariableDescription(varDef, val);
    const resolvedUrl = url.replace(new RegExp(`\\{${name}\\}`, 'g'), String(val));
    // Per-region line only (matches bullets under `variables.*.description`); no base summary prefix.
    out.push({
      url: resolvedUrl,
      description: label,
    });
  }
  return out;
}

function expandParameterizedServersToMultipleEntries(root) {
  if (!root || typeof root !== 'object') return;

  if (Array.isArray(root.servers)) {
    const next = [];
    for (const s of root.servers) next.push(...expandOneServerEntry(s));
    root.servers = next;
  }

  for (const pathItem of Object.values(root.paths || {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    if (Array.isArray(pathItem.servers)) {
      const next = [];
      for (const s of pathItem.servers) next.push(...expandOneServerEntry(s));
      pathItem.servers = next;
    }
    for (const m of OPENAPI_OPERATION_METHODS) {
      const op = pathItem[m];
      if (!op || typeof op !== 'object') continue;
      if (!Array.isArray(op.servers)) continue;
      const next = [];
      for (const s of op.servers) next.push(...expandOneServerEntry(s));
      op.servers = next;
    }
  }
}

function resolveInternalRef(root, ref) {
  const r = String(ref || '').trim();
  if (!r.startsWith('#/')) return null;
  return jsonPointerGet(root, r);
}

/** Stable key for de-duplicating path vs operation parameters. */
function parameterIdentity(p) {
  if (!p || typeof p !== 'object') return '';
  if (typeof p.$ref === 'string') return p.$ref;
  const inn = p.in ?? '';
  const name = p.name ?? '';
  return `${inn}:${name}`;
}

function mergeParamsWithOverride(pathParams, opParams) {
  const map = new Map();
  for (const p of pathParams || []) map.set(parameterIdentity(p), deepClone(p));
  for (const p of opParams || []) map.set(parameterIdentity(p), deepClone(p));
  return [...map.values()];
}

function dereferenceParameterArray(root, arr) {
  if (!Array.isArray(arr)) return;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!item || typeof item !== 'object') continue;
    const ref = item.$ref;
    if (typeof ref !== 'string' || !ref.startsWith('#/')) continue;
    const resolved = resolveInternalRef(root, ref);
    if (resolved != null && typeof resolved === 'object') arr[i] = deepClone(resolved);
  }
}

/**
 * Inline #/components/parameters/... at each use site. Some OpenAPI UIs (including GitBook)
 * do not resolve component parameter refs for the request runner.
 */
function dereferenceInternalParameterRefs(root) {
  for (const pathItem of Object.values(root.paths || {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    dereferenceParameterArray(root, pathItem.parameters);
    for (const m of OPENAPI_OPERATION_METHODS) {
      const op = pathItem[m];
      if (op?.parameters) dereferenceParameterArray(root, op.parameters);
    }
  }
}

/**
 * GitBook's runner does not always merge path-level parameters into operations; merge explicitly.
 */
function mergePathParametersIntoOperations(root) {
  for (const pathItem of Object.values(root.paths || {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    const pathParams = pathItem.parameters;
    if (!Array.isArray(pathParams) || !pathParams.length) continue;
    for (const m of OPENAPI_OPERATION_METHODS) {
      const op = pathItem[m];
      if (!op || typeof op !== 'object') continue;
      op.parameters = mergeParamsWithOverride(pathParams, op.parameters || []);
    }
    pathItem.parameters = undefined;
  }
}

/**
 * OpenAPI allows `description` under `schema`; GitBook's parameter table often only shows
 * top-level `description`. Copy from schema when the parameter has none.
 */
function hoistParameterSchemaDescription(root) {
  const visitParam = (p) => {
    if (!p || typeof p !== 'object') return;
    const schema = p.schema;
    if (!schema || typeof schema !== 'object') return;
    if (schema.description && !p.description) {
      p.description = schema.description;
    }
    if (p.description && schema.description !== undefined) {
      if (String(p.description).trim() === String(schema.description ?? '').trim()) {
        schema.description = undefined;
      }
    }
  };

  for (const pathItem of Object.values(root.paths || {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    if (Array.isArray(pathItem.parameters)) pathItem.parameters.forEach(visitParam);
    for (const m of OPENAPI_OPERATION_METHODS) {
      const op = pathItem[m];
      if (op?.parameters) op.parameters.forEach(visitParam);
    }
  }
}

/** Prefer `description` before `schema` so OpenAPI UIs list human-readable text first. */
function reorderParameterObjectKeys(p) {
  if (!p || typeof p !== 'object') return p;
  const order = [
    'name',
    'in',
    'description',
    'required',
    'deprecated',
    'allowEmptyValue',
    'style',
    'explode',
    'allowReserved',
    'schema',
    'example',
    'examples',
    'content',
  ];
  const out = {};
  for (const k of order) {
    if (Object.prototype.hasOwnProperty.call(p, k)) out[k] = p[k];
  }
  for (const k of Object.keys(p)) {
    if (!Object.prototype.hasOwnProperty.call(out, k)) out[k] = p[k];
  }
  return out;
}

function reorderAllParameterKeys(root) {
  const mapArr = (arr) => {
    if (!Array.isArray(arr)) return;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = reorderParameterObjectKeys(arr[i]);
    }
  };
  for (const pathItem of Object.values(root.paths || {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    mapArr(pathItem.parameters);
    for (const m of OPENAPI_OPERATION_METHODS) {
      const op = pathItem[m];
      if (op?.parameters) mapArr(op.parameters);
    }
  }
}

/**
 * Put structural fields before long markdown descriptions so tools that scan keys in order
 * still see parameters, request bodies, and security.
 */
function reorderOperationForGitbook(op) {
  if (!op || typeof op !== 'object') return op;
  const priority = [
    'tags',
    'operationId',
    'summary',
    'deprecated',
    'security',
    'parameters',
    'requestBody',
    'responses',
    'callbacks',
    'servers',
    'description',
  ];
  const out = {};
  for (const k of priority) {
    if (Object.prototype.hasOwnProperty.call(op, k)) out[k] = op[k];
  }
  for (const k of Object.keys(op)) {
    if (!Object.prototype.hasOwnProperty.call(out, k)) out[k] = op[k];
  }
  return out;
}

function reorderPathOperationsForGitbook(root) {
  for (const pathItem of Object.values(root.paths || {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    for (const m of OPENAPI_OPERATION_METHODS) {
      if (pathItem[m]) pathItem[m] = reorderOperationForGitbook(pathItem[m]);
    }
  }
}

/**
 * Ensure servers exist for the request runner; keep variables from source specs when present.
 */
function ensureServersArray(root) {
  if (Array.isArray(root.servers) && root.servers.length) return;
  root.servers = [
    {
      url: 'https://mixpanel.com',
      description: 'Mixpanel API (configure a more specific base URL in the source OpenAPI if needed).',
    },
  ];
}

function jsonPointerGet(root, pointer) {
  // pointer like "/A/B/0" (leading slash optional in our usage)
  const p = String(pointer || '');
  const parts = p.replace(/^#?\/?/, '').split('/').filter(Boolean);
  let cur = root;
  for (const rawPart of parts) {
    const part = rawPart.replace(/~1/g, '/').replace(/~0/g, '~');
    if (cur && typeof cur === 'object' && part in cur) cur = cur[part];
    else return undefined;
  }
  return cur;
}

async function inlineExternalRefsInSpec(root, { specDirAbs, fallbackDirAbs }) {
  // Inline $ref: ./common/foo.yaml#/Pointer into the document.
  // Keeps internal "#/..." refs untouched.
  const fileCache = new Map(); // absPath -> parsed yaml object
  const loadFile = async (absPath) => {
    if (fileCache.has(absPath)) return fileCache.get(absPath);
    const raw = await fs.readFile(absPath, 'utf8');
    const parsed = YAML.parse(raw) || {};
    fileCache.set(absPath, parsed);
    return parsed;
  };

  const resolveRefValue = async (refVal) => {
    const ref = String(refVal || '').trim();
    if (!ref || ref.startsWith('#/')) return null;
    if (!ref.startsWith('./') && !ref.startsWith('../')) return null;
    const [filePart, frag = ''] = ref.split('#');
    let absFile = path.resolve(specDirAbs, filePart);
    try {
      await fs.stat(absFile);
    } catch {
      if (fallbackDirAbs) {
        // Try relative to fallback root (openapi/src)
        absFile = path.resolve(fallbackDirAbs, filePart);
        try {
          await fs.stat(absFile);
        } catch {
          // Common pattern: refs like "./schemas.yaml" actually live in "./common/schemas.yaml"
          const cleaned = filePart.replace(/^\.?\//, '');
          absFile = path.resolve(fallbackDirAbs, 'common', cleaned);
        }
      }
    }
    const doc = await loadFile(absFile);
    if (!frag) return deepClone(doc);
    const node = jsonPointerGet(doc, `#${frag.startsWith('/') ? frag : `/${frag}`}`);
    return deepClone(node);
  };

  const visit = async (node) => {
    if (!node || typeof node !== 'object') return node;

    if (typeof node.$ref === 'string') {
      const resolved = await resolveRefValue(node.$ref);
      if (resolved != null) {
        const { $ref: _ref, ...siblings } = node;
        if (Object.keys(siblings).length === 0) {
          return deepClone(resolved);
        }
        if (typeof resolved === 'object' && resolved !== null && !Array.isArray(resolved)) {
          return { ...deepClone(resolved), ...deepClone(siblings) };
        }
        return deepClone(resolved);
      }
    }

    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        node[i] = await visit(node[i]);
      }
      return node;
    }

    for (const k of Object.keys(node)) {
      node[k] = await visit(node[k]);
    }
    return node;
  };

  // Iterate a few times to resolve nested external refs that appear after replacement.
  let cur = root;
  for (let iter = 0; iter < 5; iter++) {
    const before = JSON.stringify(cur).includes('"$ref":"./') || JSON.stringify(cur).includes('"$ref":"../');
    cur = await visit(cur);
    const after = JSON.stringify(cur).includes('"$ref":"./') || JSON.stringify(cur).includes('"$ref":"../');
    if (before && !after) break;
    if (!before) break;
  }

  return cur;
}

async function augmentGitbookOpenapiFromReference() {
  // For each operationId in gitbook/openapi/*.yaml, inject the corresponding
  // /reference/**/<operationId>.md content into operation.description.
  const refRoot = path.join(ROOT, 'reference');
  const specDir = path.join(ROOT, 'gitbook', 'openapi');

  // Index reference pages by basename (slug.md).
  const refFiles = (await listFilesRecursive(refRoot)).filter((f) => f.toLowerCase().endsWith('.md'));
  const byBase = new Map();
  for (const f of refFiles) {
    const base = path.basename(f).toLowerCase();
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(f);
  }

  const specFiles = (await fs.readdir(specDir)).filter((f) => f.endsWith('.yaml'));
  for (const specFile of specFiles) {
    const abs = path.join(specDir, specFile);
    const raw = await fs.readFile(abs, 'utf8');
    const root = YAML.parse(raw) || {};
    const inlined = await inlineExternalRefsInSpec(root, {
      specDirAbs: specDir,
      fallbackDirAbs: path.join(ROOT, 'openapi', 'src'),
    });

    expandParameterizedServersToMultipleEntries(inlined);

    dereferenceInternalParameterRefs(inlined);
    mergePathParametersIntoOperations(inlined);
    hoistParameterSchemaDescription(inlined);
    reorderAllParameterKeys(inlined);

    const paths = inlined.paths || {};
    for (const [p, methods] of Object.entries(paths)) {
      if (!methods || typeof methods !== 'object') continue;
      for (const [method, op] of Object.entries(methods)) {
        if (!OPENAPI_OPERATION_METHODS.has(String(method).toLowerCase())) continue;
        if (!op || typeof op !== 'object') continue;
        const operationId = op.operationId;
        if (!operationId) continue;

        const hits = byBase.get(`${String(operationId).toLowerCase()}.md`) || [];
        if (!hits.length) continue;
        // Prefer the shortest path match (best-effort disambiguation).
        hits.sort((a, b) => a.length - b.length);
        const refAbs = hits[0];
        const src = await fs.readFile(refAbs, 'utf8');
        const { fm, body } = parseFrontmatter(src);

        // Use page content as description (GitBook renders markdown from spec).
        let desc = String(body).trim();
        desc = convertAdjacentCaptionedCodeFencesToTabs(desc);
        desc = rewriteCrossSpaceLinks(desc, { fromSection: 'api' });

        if (desc) op.description = desc;
        if (!op.summary && fm?.title) op.summary = String(fm.title).trim();
      }
    }

    ensureServersArray(inlined);
    reorderPathOperationsForGitbook(inlined);

    rewriteCrossSpaceLinksDeepInPlace(inlined);

    await fs.writeFile(abs, YAML.stringify(inlined, { lineWidth: 0 }), 'utf8');
  }
}

async function main() {
  const refRoot = path.join(ROOT, 'reference');
  const outRoot = path.join(ROOT, 'gitbook', 'pages', 'api');
  await fs.mkdir(outRoot, { recursive: true });

  await copyOpenapiSpecs();
  await augmentGitbookOpenapiFromReference();

  const topOrder = await readOrderYaml(path.join(refRoot, '_order.yaml'));
  const slugIndex = await buildSlugIndex(refRoot);

  // Build pages + SUMMARY
  let summary = '# Table of contents\n\n';
  const ROOT_TOP = 'Mixpanel APIs';

  const openapiByTopTitle = new Map([
    ['Ingestion API', 'ingestion'],
    ['Identity API', 'identity'],
    ['Query API', 'query'],
    ['Event Export API', 'export'],
    ['Lexicon Schemas API', 'lexicon-schemas'],
    ['Data Pipelines API', 'data-pipelines'],
    ['Service Accounts API', 'service-accounts'],
    ['Annotations API', 'annotations'],
    ['GDPR API', 'gdpr'],
    ['Warehouse Connectors API', 'warehouse-connectors'],
    ['Feature Flags API', 'feature-flags'],
  ]);

  for (const top of topOrder) {
    const topDir = path.join(refRoot, top);
    let st = null;
    try {
      st = await fs.stat(topDir);
    } catch {
      continue;
    }
    if (!st.isDirectory()) continue;

    const isRoot = top === ROOT_TOP;
    if (!isRoot) summary += `## ${top}\n\n`;
    const topSeg = isRoot ? '' : slugifySegment(top);
    const specName = openapiByTopTitle.get(top) || '';

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
          let outRel = toPosix(path.join(topSeg, `${item}.md`));
          if (isRoot && item === 'overview') outRel = 'README.md';
          const fm = await copyOne(fileAbs, outRel);
          const label = (fm?.title || '').trim() || humanizeSlug(item);
          // Root space wants "Overview" at the top-level.
          if (isRoot && item === 'overview') summary += `* [${label}](${outRel})\n`;
          else if (isRoot) summary += `* [${label}](${outRel})\n`;
          else summary += `* [${label}](${outRel})\n`;
          continue;
        }
      } catch {}

      // directory subgroup
      try {
        const stDir = await fs.stat(dirAbs);
        if (stDir.isDirectory()) {
          // For OpenAPI-driven groups, don't emit per-endpoint pages in the TOC.
          // GitBook will auto-generate tag pages from the spec.
          if (specName) continue;

          // Copy all md in subtree in deterministic order via its _order.yaml
          const subOrder = await readOrderYaml(path.join(dirAbs, '_order.yaml'));
          const copied = [];
          for (const sub of subOrder) {
            const subFile = path.join(dirAbs, `${sub}.md`);
            try {
              const stSub = await fs.stat(subFile);
              if (!stSub.isFile()) continue;
            } catch {
              continue;
            }
            const outRel = toPosix(path.join(topSeg, slugifySegment(item), `${sub}.md`));
            const fm = await copyOne(subFile, outRel);
            copied.push({ outRel, fm, sub });
          }

          if (isRoot && copied.length) {
            // Root space (e.g. Mixpanel APIs): list every subpage in SUMMARY so GitBook export includes them.
            const groupLabel = humanizeSlug(item);
            const firstLink = copied[0].outRel;
            summary += `* [${groupLabel}](${firstLink})\n`;
            for (const { outRel, fm, sub } of copied) {
              const label = (fm?.title || '').trim() || humanizeSlug(sub);
              summary += `  * [${label}](${outRel})\n`;
            }
          } else if (copied.length) {
            const groupLink = copied[0].outRel;
            summary += `* [${humanizeSlug(item)}](${groupLink})\n`;
          } else {
            summary += `* ${humanizeSlug(item)}\n`;
          }
        }
      } catch {}
    }

    if (specName) {
      summary += '* ```yaml\n';
      summary += '  type: builtin:openapi\n';
      summary += '  props:\n';
      summary += '    models: false\n';
      summary += '    downloadLink: false\n';
      summary += '  dependencies:\n';
      summary += '    spec:\n';
      summary += '      ref:\n';
      summary += '        kind: openapi\n';
      summary += `        spec: ${specName}\n`;
      summary += '  ```\n';
    }

    if (!isRoot) summary += '\n';
  }

  await fs.writeFile(path.join(outRoot, 'SUMMARY.md'), summary, 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


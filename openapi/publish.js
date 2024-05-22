const fs = require("fs");
const path = require("path");
const process = require("node:process");
const util = require("node:util");
const YAML = require("yaml");

const exec = util.promisify(require("node:child_process").exec);

const README_API_KEY = process.env.README_API_KEY;
if (!README_API_KEY) {
  console.error(`README_API_KEY not set`);
  process.exit(1);
}
const README_VERSION = process.env.README_VERSION;
if (!README_VERSION) {
  console.error(`README_VERSION not set`);
  process.exit(1);
}

async function execAndLog(cmd) {
  try {
    const { stdout, stderr } = await exec(cmd);
    console.error(stderr);
    console.log(stdout);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function updateSpecs() {
  // fetch IDs of openapi specs via readme API
  const res = await fetch(
    `https://dash.readme.com/api/v1/api-specification?perPage=10&page=1`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(README_API_KEY).toString(
          "base64"
        )}`,
        "x-readme-version": README_VERSION,
      },
    }
  );
  const remoteSpecMetas = await res.json();

  // get all openapi specs from out/ folder
  const outBase = path.resolve(__dirname, `out`);
  const filenames = fs
    .readdirSync(outBase)
    .filter((fn) => fn.endsWith(`.openapi.yaml`));

  for (specFile of filenames) {
    // get ID of each spec by matching title between filename and metadata
    const fullPath = path.join(outBase, specFile);
    const yamlStr = fs.readFileSync(fullPath, "utf8");
    const spec = YAML.parse(yamlStr);
    const specMeta = remoteSpecMetas.find((m) => m.title === spec.info.title);
    if (!specMeta) {
      console.log(`!!! No spec found for "${spec.info.title}"`);
      continue;
    }
    const specId = specMeta.id;

    // validate and publish spec
    console.log(`Updating ${spec.info.title} (${specFile}, ID ${specId})`);
    await execAndLog(`npx rdme openapi:validate ${fullPath}`);
    await execAndLog(
      `npx rdme openapi ${fullPath} --id=${specId} --key=${README_API_KEY}`
    );
  }
}

updateSpecs();

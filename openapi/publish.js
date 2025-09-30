const fs = require("fs");
const path = require("path");
const process = require("node:process");
const util = require("node:util");
const YAML = require("yaml");

const env = { ...process.env, DEBUG: "rdme*" };
const execFile = util.promisify(require("node:child_process").execFile);

const README_API_KEY = process.env.README_API_KEY;
const README_VERSION = process.env.README_VERSION;
if (!README_API_KEY) {
  console.error(`README_API_KEY not set`);
  process.exit(1);
}
if (!README_VERSION) {
  console.error(`README_VERSION not set`);
  process.exit(1);
}

async function execAndLog(cmd, args) {
  try {
    const { stdout, stderr } = await execFile(cmd, args);
    console.error(stderr);
    console.log(stdout);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function getSlugFromJson(file) {
  const splitFile = file.split(`.json`);
  return splitFile[0];
}

function getSlugFromYaml(file) {
  const splitFile = file.split(`.yaml`);
  return splitFile[0];
}

function convertSlugToJson(file) {
  const slug = getSlugFromYaml(file);
  return `${slug}.json`;
}

async function updateSpecs() {
  // fetch IDs of openapi specs via readme API
  const res = await fetch(
    `https://api.readme.com/v2/branches/${README_VERSION}/apis`,
    {
      headers: {
        Authorization: `Bearer ${README_API_KEY}`,
      },
    }
  );
  const remoteSpecMetas = await res.json();

  // get all openapi specs from out/ folder
  const outBase = path.resolve(__dirname, `out`);
  const filenames = fs
    .readdirSync(outBase)
    .filter((fn) => fn.endsWith(`.yaml`));

  if (!remoteSpecMetas) {
    console.error(`!!! No remote specs found, please double check the API`);
    process.exit(1);
  }

  for (specFile of filenames) {
    // get ID of each spec by matching title between filename and metadata
    const fullPath = path.join(outBase, specFile);
    const yamlStr = fs.readFileSync(fullPath, "utf8");
    const spec = YAML.parse(yamlStr);
    const specMeta = remoteSpecMetas.data.find((m) => getSlugFromJson(m.filename) === getSlugFromYaml(specFile));
    if (!specMeta) {
      console.log(`!!! No spec found for "${spec.info.title}". Please upload it as found in the developer.mixpanel.com runbook.`);
      continue;
    }

    // validate and publish spec
    console.log(`Updating ${spec.info.title} (${specFile}`);
    await execAndLog('npx', ['rdme@10.5.1', 'openapi:validate', fullPath]);
    // this converts the file to json, since it does this step directly in readme anyway
    await execAndLog(
      'npx', ['rdme@10.5.1', 'openapi', 'convert', fullPath, `--out=${convertSlugToJson(fullPath)}`], {env}
    );
    // publish the json version
    await execAndLog(
      'npx', [
        'rdme@10.5.1',
        'openapi',
        'upload',
        `${convertSlugToJson(fullPath)}`,
        `--key=${README_API_KEY}`,
        `--slug=${convertSlugToJson(specFile)}`,
        `--confirm-overwrite`
      ], {env}
    );
  }
}

updateSpecs();

const process = require("node:process");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const README_API_KEY = process.env.README_API_KEY;

// map OAS files to readme.com API Definition IDs
const API_DEFS = {
  annotations: `6494a86ab6a2c4001dd7e9a3`,
  connectors: `6494a86ab6a2c4001dd7e99e`,
  "data-pipelines": `6494a86ab6a2c4001dd7e99b`,
  export: `6494a86ab6a2c4001dd7e9a0`,
  identity: `6494a86ab6a2c4001dd7e9a1`,
  ingestion: `6494a86ab6a2c4001dd7e99d`,
  "lexicon-schemas": `6494a86ab6a2c4001dd7e99c`,
  query: `6494a86ab6a2c4001dd7e99f`,
  "service-accounts": `6494a86ab6a2c4001dd7e9a2`,
};

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

async function validateAndPublish(fn, id) {
  await execAndLog(`npx rdme openapi:validate ${fn}`);
  await execAndLog(`npx rdme openapi ${fn} --id=${id} --key=${README_API_KEY}`);
}

for (const [def, id] of Object.entries(API_DEFS)) {
  validateAndPublish(`openapi/out/${def}.openapi.yaml`, id);
}

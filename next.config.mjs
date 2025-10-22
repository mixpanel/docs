import fs from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import nextra from "nextra";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
  latex: true,
  defaultShowCopyCode: true,
});

function parseRedirectPartsFromFile(filecontent) {
  const rawRedirects = filecontent
    .split(`\n`)
    .filter((line) => line.trim() !== ``) // Ignore empty lines
    .filter((line) => !line.startsWith(`#`)); // Ignore comments

  return rawRedirects.map((line, idx) => {
    const parts = line.split(` `);
    if (parts.length !== 2) {
      throw Error(
        `invalid line at index ${idx}: "${line}"\nLine must be in the format: "source destination"`
      );
    }
    const [source, destination] = parts;
    return { source, destination };
  });
}

function formatForNextRedirect({ source, destination }) {
  const matches = source.match("https://(?<host>.+\\.mixpanel.com)(?<path>/.*)$");
  if (matches) { 
    const { host, path } = matches.groups;
    if (destination.startsWith(`/`)) {
      destination = `https://docs.mixpanel.com${destination}`;
    }
    return {
      source: path,
      destination,
      permanent: true,
      has: [
        {
          type: "host",
          value: host,
        },
      ],
    };
  }

  return { source, destination, permanent: true };
}

export default withNextra({
  redirects: () => {
    return fs.readdirSync(join(__dirname, "redirects")).flatMap((filename) => {
      const pathToFile = join(__dirname, "redirects", filename);
      const filecontent = fs.readFileSync(pathToFile, "utf8");
      return parseRedirectPartsFromFile(filecontent).map(formatForNextRedirect);
    });
  },  
});

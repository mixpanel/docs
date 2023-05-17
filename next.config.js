const helpRedirectJson = require("./redirects/help-mixpanel-com.json");

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
  latex: true,
  defaultShowCopyCode: true,
});

module.exports = withNextra({
  redirects: () => {
    const localRedirects = [
      {
        source: "/docs",
        destination: "/docs/getting-started/what-is-mixpanel",
        permanent: true,
      },
      {
        source: "/tutorials",
        destination: "/tutorials/chapter-1",
        permanent: true,
      },
      {
        source: "/",
        destination: "/docs/getting-started/what-is-mixpanel",
        permanent: true,
      },
    ];

    const invalidHelpRedirects = helpRedirectJson.flatMap(
      ({ source, destination }, idx) => {
        const isValidDestination =
          destination.startsWith("https://") || destination.startsWith("/");
        return [
          !source.startsWith("https://help.mixpanel.com") &&
            `invalid source at index ${idx}: "${source}". Value must start with https://help.mixpanel.com`,
          !isValidDestination &&
            `invalid destination at index ${idx}: "${destination}". Value must be absolute or relative`,
        ].filter(Boolean);
      }
    );

    if (invalidHelpRedirects.length) {
      throw Error(
        `Invalid redirects in redirects/help-mixpanel-com.json:\n${invalidHelpRedirects.join(
          `\n`
        )}`
      );
    }

    const helpDomainRedirects = helpRedirectJson.map(
      ({ source, destination }) => {
        return {
          source: source.replace("https://help.mixpanel.com", ""),
          destination: `https://docs.mixpanel.com${destination}`,
          permanent: true,
          has: [
            {
              type: "host",
              value: "help.mixpanel.com",
            },
          ],
        };
      }
    );

    console.log(helpDomainRedirects);

    return [...localRedirects, ...helpDomainRedirects];
  },
});

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

    const helpDomainRedirects = [
      // Need to confirm this will work in production
      // It will be removed after testing
      {
        source: "/redirect/test",
        destination:
          "https://docs.mixpanel.com/docs/tracking/javascript-quickstart",
        permanent: true,
        has: [
          {
            type: "host",
            value: "docs-eight-henna.vercel.app",
          },
        ],
      },
      {
        source: "/redirect/test-wildcard",
        destination: "https://docs.mixpanel.com/docs/tracking/how-tos/ad-spend",
        permanent: true,
        has: [
          {
            type: "host",
            value: "*.vercel.app",
          },
        ],
      },
    ];

    return [...localRedirects, ...helpDomainRedirects];
  },
});

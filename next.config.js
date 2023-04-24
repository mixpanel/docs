const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  latex: true,
  defaultShowCopyCode: true,
})

module.exports = withNextra({
  redirects: () => {
    return [
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
    ]
  }
})

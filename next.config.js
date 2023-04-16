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
        source: "/",
        destination: "/getting-started/what-is-mixpanel",
        permanent: true,
      },
    ]
  }
})

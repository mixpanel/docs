const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  latex: true,
  defaultShowCopyCode: true,
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/getting-started/what-is-mixpanel",
        statusCode: 301,
      },
    ]
  }
})

module.exports = withNextra()

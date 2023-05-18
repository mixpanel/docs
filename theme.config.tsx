import {FC, ReactNode} from "react";
import {DocsThemeConfig} from "nextra-theme-docs";
import MixpanelLogoWordmark from "./components/svg/MixpanelLogoWordmark";

function renderComponent<T>(ComponentOrNode: FC<T> | ReactNode, props?: T) {
  if (!ComponentOrNode) return null;
  if (typeof ComponentOrNode !== "function") return ComponentOrNode;
  return <ComponentOrNode {...props} />;
}

const config: DocsThemeConfig = {
  darkMode: false,
  docsRepositoryBase: "https://github.com/mixpanel/docs/tree/main",
  head: (
    <>
      <link
        rel="icon"
        sizes="16x16"
        href="https://cdn.mxpnl.com/marketing-site/static/favicons/favicon-16x16.png"
        type="image/png"
      />
      <link
        rel="icon"
        sizes="32x32"
        href="https://cdn.mxpnl.com/marketing-site/static/favicons/favicon-32x32.png"
        type="image/png"
      />
    </>
  ),
  feedback: {
    content: "Question? Contact our Support Team",
    useLink: () => "https://mixpanel.com/get-support"
  },
  footer: {
    text: "© Mixpanel 2023",
  },
  logo: <MixpanelLogoWordmark width={125} />,
  logoLink: "https://mixpanel.com/home",
  useNextSeoProps: () => ({
    titleTemplate: '%s - Mixpanel Docs'
  }),
  project: {
    link: "https://github.com/mixpanel/docs",
  },
  primaryHue: { dark: 256, light: 259 },
  sidebar: {
    toggleButton: true,
  },
};

export default config;

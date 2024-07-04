import { FC, ReactNode } from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Search from "./components/Search/Search";
import MixpanelLogoWordmark from "./components/svg/MixpanelLogoWordmark";
import {
  AdminIcon,
  AnalysisIcon,
  DataInIcon,
  DataOutIcon,
  IntroIcon,
  SupportIcon,
} from "./components/svg/NavIcon";
import MainContent from "./components/MainContent/MainContent";

function renderComponent<T>(ComponentOrNode: FC<T> | ReactNode, props?: T) {
  if (!ComponentOrNode) return null;
  if (typeof ComponentOrNode !== "function") return ComponentOrNode;
  return <ComponentOrNode {...props} />;
}

const config: DocsThemeConfig = {
  darkMode: true,
  nextThemes: {
    defaultTheme: `system`,
  },
  docsRepositoryBase: "https://github.com/mixpanel/docs/tree/main",
  // toc: {}
  head: (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`https://cdn.mxpnl.com/marketing-site/static/favicons/apple-touch-icon.png`}
      />
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
      <link
        rel="mask-icon"
        href={`https://cdn.mxpnl.com/marketing-site/static/favicons/safari-pinned-tab.svg`}
        color="#7856ff"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </>
  ),
  feedback: {
    content: "Question? Contact our Support Team",
    useLink: () => "https://mixpanel.com/get-support",
  },
  footer: {
    text: "© Mixpanel 2024",
  },
  logo: <MixpanelLogoWordmark width={125} />,
  logoLink: "https://docs.mixpanel.com",
  main: MainContent,
  useNextSeoProps: () => ({
    titleTemplate: "%s - Mixpanel Docs",
  }),
  search: {
    component: Search,
  },
  project: {
    link: "https://github.com/mixpanel/docs",
  },
  primaryHue: { dark: 258, light: 258 },
  primarySaturation: { dark: 30, light: 70 },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    titleComponent: ({ title, type }) => {
      if (type === `separator`) {
        let icon;
        switch (title) {
          case `INTRO`:
            icon = <IntroIcon />;
            break;
          case `DATA IN`:
            icon = <DataInIcon />;
            break;
          case `ANALYSIS`:
            icon = <AnalysisIcon />;
            break;
          case `ADMIN`:
            icon = <AdminIcon />;
            break;
          case `DATA OUT`:
            icon = <DataOutIcon />;
            break;
          case `SUPPORT`:
            icon = <SupportIcon />;
            break;
          case `ENTERPRISE`:
            icon = <IntroIcon />;
            break;
        }
        return (
          <>
            {icon} {title}
          </>
        );
      } else {
        return <>{title}</>;
      }
    },
  },
};

export default config;

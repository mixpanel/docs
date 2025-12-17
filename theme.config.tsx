import { useRouter } from "next/router";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";

import Search from "./components/Search/Search";
import MixpanelLogoWordmark from "./components/svg/MixpanelLogoWordmark";
import MainContent from "./components/MainContent/MainContent";
import SignUpButton from "./components/SignUpButton/SignUpButton";
import ChangelogPostHeader from "./components/ChangelogPostHeader/ChangelogPostHeader";
import { VideoButtonWithModal } from "./components/VideoButtonWithModal";

const config: DocsThemeConfig = {
  darkMode: true,
  nextThemes: {
    defaultTheme: `system`,
  },
  docsRepositoryBase: "https://github.com/mixpanel/docs/tree/main",
  head() {
    const { pathname } = useRouter();
    const { title } = useConfig();
    const url = `https://docs.mixpanel.com${pathname}`;

    return (
      <>
        <title>{`${title} - Mixpanel Docs`}</title>
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${title} - Mixpanel Docs`} />
        <meta
          property="og:description"
          content={`Read more about Mixpanel documentation`}
        />
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
    );
  },
  feedback: {
    content: "Question? Contact our Support Team",
    useLink: () => "https://mixpanel.com/contact-us/support",
  },
  footer: {
    content: (
      <div>
        <div suppressHydrationWarning>© Mixpanel {new Date().getFullYear()}</div>
        <div id="teconsent"></div>
      </div>
    ),
  },
  logo: <MixpanelLogoWordmark width={125} />,
  logoLink: "https://mixpanel.com/home/",
  main: MainContent,
  components: {
    ChangelogPostHeader: ChangelogPostHeader,
    VideoButtonWithModal: VideoButtonWithModal,
  },
  search: {
    component: Search,
  },
  project: {
    link: "https://github.com/mixpanel/docs",
  },
  navbar: {
    extraContent: SignUpButton,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
};

export default config;

import cn from "clsx";
import { FC, ReactNode } from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import MixpanelLogoWordmark from "./components/svg/MixpanelLogoWordmark";

function renderComponent<T>(ComponentOrNode: FC<T> | ReactNode, props?: T) {
  if (!ComponentOrNode) return null;
  if (typeof ComponentOrNode !== "function") return ComponentOrNode;
  return <ComponentOrNode {...props} />;
}

const config: DocsThemeConfig = {
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
  footer: {
    text: "© Mixpanel 2023",
  },
  logo: <MixpanelLogoWordmark width={125} />,
  logoLink: "https://mixpanel.com/home",
  project: {
    link: "https://github.com/mixpanel/docs",
  },
  primaryHue: { dark: 256, light: 259 },
  sidebar: {
    toggleButton: true,

    // Some magic to make top-level pages look like Separators
    // We should probably redesign this at some point
    titleComponent({ title, type, route }) {
      if (
        type !== "separator" &&
        route.match(/\//g) &&
        route.match(/\//g).length == 1
      ) {
        return (
          <li
            className={cn(
              "[word-break:break-word]",
              title
                ? "nx-mt-5 nx-mb-2 nx-px-2 nx-py-1.5 nx-text-sm nx-font-semibold nx-text-gray-900 first:nx-mt-0 dark:nx-text-gray-100"
                : "nx-my-4"
            )}
          >
            {title}
          </li>
        );
      }
      return <>{title}</>;
    },
  },
};

export default config;

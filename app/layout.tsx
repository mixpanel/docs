import { Footer, Layout, Navbar, useConfig } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { useRouter } from "next/router";
import { getPageMap } from 'nextra/page-map';

// Required for theme styles, previously was imported under the hood
import 'nextra-theme-docs/style.css';

import MainContent from "../components/MainContent/MainContent";
import MixpanelLogoWordmark from "../components/svg/MixpanelLogoWordmark";
import Search from "../components/Search/Search";
import SignUpButton from "../components/SignUpButton/SignUpButton";

export default async function RootLayout({ children, params }) {
  const { pathname } = useRouter();
  const { title } = useConfig();
  const url = `https://docs.mixpanel.com${pathname}`;

  return (
    <html>
      <Head>
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
      </Head>
      <body>
        <Layout
          darkMode
          docsRepositoryBase="https://github.com/mixpanel/docs/tree/main"
          editLink="https://github.com/mixpanel/docs/tree/main/pages/docs/what-is-mixpanel.mdx"
          feedback={{
            content: "Question? Contact our Support Team",
          }}
          footer={
            <Footer>{`© Mixpanel ${new Date().getFullYear()}`}</Footer>
          }
          navbar={
            <Navbar
              logo={<MixpanelLogoWordmark width={125} />}
              logoLink="https://mixpanel.com/home/"
              projectLink="https://github.com/mixpanel/docs"
            >
              <SignUpButton />
            </Navbar>
          }
          nextThemes={{
            defaultTheme: `system`,
          }}
          pageMap={await getPageMap()}
          search={
            <Search />
          }
          sidebar={{
            defaultMenuCollapseLevel: 1,
            toggleButton: true,
          }}
        >
          <MainContent>
            {children}
          </MainContent>
        </Layout>
      </body>
    </html>
  )
}

import "./globals.css";
import "./overrides.scss";
import type { AppProps } from "next/app";
import React from "react";
import { useEffect } from "react";

import { insertGTMScriptTags } from "../components/GTMScripts";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    insertGTMScriptTags();
    // TODO: Based on their doc: https://docs.kapa.ai/integrations/website-widget/javascript-api/events
    // we should be able to use `Kapa` as a function like below, but it seems like the global object interface has changed
    // which is throwing Kapa is not a function error. I will follow up w/ Kapa team to see what's up.
    // Object.values(KapaEventNames).forEach((eventName) => {
    //   // @ts-ignore
    //   Kapa(eventName, function (args) {
    //     // prefix kapa's property names to distinguish them from mixpanel's
    //     const properties = {};
    //     if (args) {
    //       Object.keys(args).forEach((keyName) => {
    //         properties[`${DocsAIPrefix} ${keyName}`] = args[keyName];
    //       });
    //     }
    //     track(`${DocsAIPrefix} ${eventName}`, properties);
    //   });
    // });
  }, []);

  return (
    // <>
    // div here is a workaround for setting background color for light/dark mode toggle
    <div className="nx-bg-lightbg dark:nx-bg-darkbg">
      <Component {...pageProps} />
    </div>
    // </>
  );
}

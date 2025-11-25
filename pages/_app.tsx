import "./globals.css";
import "./overrides.scss";
import type { AppProps } from "next/app";
import React from "react";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";

import { insertGTMScriptTags } from "../components/GTMScripts";
import { SENTRY_VARS } from "../utils/error-reporting";
import { useSprig } from "../hooks/useSprig";

// added
import Script from "next/script";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Initialize Sprig surveys
  useSprig();

  const router = useRouter();

  // Navattic: (re)bind after script load and on every route change
  const rebindNavattic = useCallback(() => {
    const w = window as any;
    try {
      if (w?.Navattic?.Embeds?.init) w.Navattic.Embeds.init();
      if (w?.Navattic?.init) w.Navattic.init();
      if (w?.navattic?.embeds?.init) w.navattic.embeds.init();
      // ensure late-rendered cards get picked up
      window.dispatchEvent(new Event("navattic:refresh"));
    } catch (e) {
      console.warn("[Navattic] rebind failed", e);
    }
  }, []);

  useEffect(() => {
    insertGTMScriptTags();
    window.sentry = Sentry.init(SENTRY_VARS);

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

    // run once on app mount
    rebindNavattic();

    // run after every client-side route change (Pages Router)
    const onDone = () => requestAnimationFrame(() => rebindNavattic());
    router.events.on("routeChangeComplete", onDone);
    return () => router.events.off("routeChangeComplete", onDone);
  }, [router.events, rebindNavattic]);

  return (
    // <>
    // div here is a workaround for setting background color for light/dark mode toggle
    <div className="nx-bg-lightbg dark:nx-bg-darkbg">
      {/* ⬇️ Load Navattic once, globally */}
      <Script
        id="navattic-embeds"
        src="https://js.navattic.com/embeds.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.info("[Navattic] script loaded (global)");
          rebindNavattic();
        }}
      />
      <Component {...pageProps} />
    </div>
    // </>
  );
}

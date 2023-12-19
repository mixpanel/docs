import "./globals.css";
import "./overrides.scss";
import React from "react";
import { useEffect } from "react";
import { insertGTMScriptTags } from "../components/GTMScripts";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export type URLSearchGet = string | null;

type AttributableParams = {
    gclid?: URLSearchGet;
    landingPageUrl?: URLSearchGet;
    utmSource?: URLSearchGet;
    utmTerm?: URLSearchGet;
    utmCampaign?: URLSearchGet;
    utmContent?: URLSearchGet;
    utmMedium?: URLSearchGet;
    originalReferrer?: URLSearchGet;
    partnerKey?: URLSearchGet;
};

// Given an object with keys that are assigned `undefined`, `null`,
// `0`, ``, or anything else falsey, remove the key and return
// a new cleaned object.
function cloneWithoutFalseyProperties(object: any) {
  const cleaned = { ...object };
  for (const key in cleaned) {
      if (!cleaned[key]) {
          delete cleaned[key];
      }
  }
  return cleaned;
}

function extractParamsFromBrowser() {
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get(`gclid`);
  const utmSource = params.get(`utm_source`);
  const utmTerm = params.get(`utm_term`);
  const utmCampaign = params.get(`utm_campaign`);
  const utmContent = params.get(`utm_content`);
  const utmMedium = params.get(`utm_medium`);
  const partnerKey = params.get(`ps_partner_key`);
  const obtainedParams: AttributableParams = {
      gclid,
      utmSource,
      utmTerm,
      utmCampaign,
      utmContent,
      utmMedium,
      partnerKey,
  };

  // Filter for any null values
  const cleanedParams = cloneWithoutFalseyProperties(obtainedParams);
  return cleanedParams;
}


function trackPageview() {
  const pageviewAttribution = extractParamsFromBrowser();
  const namespacedAttribution = cloneWithoutFalseyProperties({
      [`page.gclid`]: pageviewAttribution.gclid,
      [`page.utm_source`]: pageviewAttribution.utmSource,
      [`page.utm_term`]: pageviewAttribution.utmTerm,
      [`page.utm_campaign`]: pageviewAttribution.utmCampaign,
      [`page.utm_content`]: pageviewAttribution.utmContent,
      [`page.utm_medium`]: pageviewAttribution.utmMedium,
      [`page.partner_key`]: pageviewAttribution.partnerKey,
  });
  mixpanel.track_pageview(namespacedAttribution);
}


export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    insertGTMScriptTags();
    trackPageview();
    // @ts-ignore
  }, []);

  useEffect(() => {
    router.events.on(`routeChangeComplete`, trackPageview);
    return () => {
        router.events.off(`routeChangeComplete`, trackPageview);
    };
}, [router]);


  return (
      <Component {...pageProps} />
  );
}

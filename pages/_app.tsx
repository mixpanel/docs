import "./globals.css";
import "./overrides.scss";
import React from "react";
import { useEffect } from "react";
import { insertGTMScriptTags } from "../components/GTMScripts";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    insertGTMScriptTags();
    // @ts-ignore
  }, []);

  return <Component {...pageProps} />;
}

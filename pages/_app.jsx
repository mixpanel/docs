import "./globals.css"
import React from 'react';
import {useEffect} from 'react';
import { insertGTMScriptTags } from '../components/GTMScripts';


export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
        insertGTMScriptTags();
    }, []);

  return <Component {...pageProps} />
}

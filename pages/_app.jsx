import "./globals.css"
import React from 'react';
import {useEffect} from 'react';
import { insertGTMScriptTags } from '../components/GTMScripts';


export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
        insertGTMScriptTags();
        if (typeof Sprig !== `undefined`) {
          // if Sprig loaded in browser
          Sprig('track', 'helpDocViewed')
        }
    }, []);
   
  return <Component {...pageProps} />
}

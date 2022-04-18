import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import Head from "next/head";
import ThemeProvider from "../components/ThemeProvider";
import Script from 'next/script'

const MyApp = ({Component, pageProps}: AppProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [isDarkMode]);


  return (
    <ThemeProvider>
      <Script crossOrigin={'anonymous'} async defer data-website-id="857d96c3-4c73-43ae-9fef-3c348885790a"
              src="https://tight-math-8745.findarmy.workers.dev/findarmy.js"/>
      <Head>
        <link rel="icon" href={`${isDarkMode ? '/favicon/favicon_dark.ico' : '/favicon/favicon_light.ico'}`}/>
        <title key="title">Find.Army - The Better AKO</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta
          name="description"
          content="The Army Knowledge Online (AKO) alternative. Easily find links and DA-Forms to all the Army sites you need."
          key="description"
        />
      </Head>
      <main className="flex-1">
        <Component {...pageProps}/>
      </main>
    </ThemeProvider>
  );
};

export default MyApp

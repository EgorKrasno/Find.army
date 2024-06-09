import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import Head from "next/head";
import ThemeProvider from "../components/ThemeProvider";

const MyApp = ({Component, pageProps}: AppProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [isDarkMode]);


  return (
    <ThemeProvider>
      <Head>
        <link rel="icon" href={`${isDarkMode ? '/favicon/favicon_dark.ico' : '/favicon/favicon_light.ico'}`}/>
        <title key="title">Find.Army - The Better AKO</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta
          name="description"
          content="The Army Knowledge Online (AKO) alternative. Easily find DA-Forms and links to all the Army sites you need."
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

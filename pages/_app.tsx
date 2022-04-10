import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import Head from "next/head";
import ThemeProvider from "../components/ThemeProvider";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const MyApp = ({Component, pageProps}: AppProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [isDarkMode]);

  return (
    <ThemeProvider>
      <Head>
        <link rel="icon" href={`${isDarkMode ? '/favicon/favicon-light.ico' : '/favicon/favicon-dark.ico'}`}/>
        <title key="title">{process.env.APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta
          name="description"
          content="DEV. Articles, posts, and lessons on modern development practices and libraries."
          key="description"
        />
      </Head>
      <div
        className="flex flex-col dark:background-dark background-light min-h-screen antialiased font-purista transition ease-in-out">
        <Nav/>
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer/>
      </div>
    </ThemeProvider>
  );
};

export default MyApp

import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import Head from "next/head";
import ThemeProvider from "../components/ThemeProvider";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import FeedbackModal from "../components/FeedbackModal";
import Script from 'next/script'

const MyApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [isDarkMode]);

  const openModal = () => setIsFeedbackModalOpen(true);

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
      <div
        className="relative flex flex-col dark:background-dark background-light min-h-screen antialiased font-purista transition ease-in-out">
        <div className="h-[350px] w-[550px] absolute glow-yellow-right absolute top-20 right-6"/>
        <Nav openModal={openModal}/>
        <main className="flex-1">
          <Component
            {...pageProps}
            key={router.asPath}
            openModal={openModal}
          />
        </main>
        <Footer/>
      </div>
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        closeModal={() => setIsFeedbackModalOpen(false)}/>
    </ThemeProvider>
  );
};

export default MyApp

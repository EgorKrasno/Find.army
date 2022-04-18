import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import Head from "next/head";
import ThemeProvider from "../components/ThemeProvider";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FeedbackModal from "../components/FeedbackModal";
import Script from 'next/script'
import Image from 'next/image'

const MyApp = ({Component, pageProps}: AppProps) => {
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
        <div className="absolute pointer-events-none top-0 right-0 w-[1260px] h-[1000px] wide:w-[1700px] wide:h-[1200px]">
          <Image alt='background glow' src={"/glow.png"} layout='fill'/>
        </div>
        <Nav openModal={openModal}/>
        <main className="flex-1">
          <Component
            {...pageProps}
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

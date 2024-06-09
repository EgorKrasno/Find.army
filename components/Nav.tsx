import React, {useEffect, useState} from 'react';
import DarkModeToggle from './DarkModeToggle';
import {GiMagnifyingGlass} from "react-icons/gi";
import FeedbackButton from "./FeedbackButton";
import {FaGithub} from "react-icons/fa6";

interface Props {
  openModal: () => void;
}

const Nav = ({openModal}: Props) => {
  const [isDarkModeActive, setIsDarkModeActive] = useState(true);

  useEffect(() => {
    if (localStorage.mainTheme && localStorage.mainTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);


  const setDarkMode = (val: boolean) => {
    const bodyElement = document.body;
    const htmlElement = document.documentElement;
    setIsDarkModeActive(val);
    if (val) {
      bodyElement.classList.add('dark');
      localStorage.setItem('mainTheme', 'dark');
      htmlElement.style.setProperty('background-color', '#18181b');
      htmlElement.style.setProperty('color-scheme', 'dark');
    } else {
      bodyElement.classList.remove('dark');
      htmlElement.style.setProperty('background-color', '#e4e4e7');
      localStorage.setItem('mainTheme', 'light');
      htmlElement.style.setProperty('color-scheme', 'light');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(localStorage.getItem('mainTheme') !== 'dark');
  };


  return (
    <>
      <header className="relative py-9 lg:py-12 select-none">
        <nav
          className="text-primary xl:mx-auto px-4 sm:px-8 xl:px-0 max-w-screen-xl flex max-w-8xl items-center
                space-x-4 sm:space-x-8 w-full box-border flex flex-row justify-between md:justify-start">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 sm:space-x-5">
                <GiMagnifyingGlass
                  className="text-sky-700 dark:text-yellow-400 w-[42px] h-[42px] sm:w-[52px] sm:h-[52px]"/>
                <div>
                  <h1
                    className="dark:text-zinc-50 text-zinc-900 text-2xl sm:text-4xl font-bold tracking-wide">Find.Army</h1>
                  <h2 className="text-xs sm:text-sm dark:text-zinc-200 text-zinc-900 font-semibold">The Better AKO</h2>
                </div>
              </div>

            </div>
            <div className="flex items-center space-x-2 sm:space-x-6 ">
              <FeedbackButton text="Feedback" openModal={openModal}/>
              <DarkModeToggle
                className="rounded-sm p-2 ease-in-out cursor-pointer border border-zinc-400 dark:border-zinc-700 shadow dark:shadow-none"
                onClick={toggleDarkMode}
                size={1.4}
                darkMode={isDarkModeActive}/>
              <a
                href='https://github.com/EgorKrasno/Find.army'
                target="_blank">
                <div className='relative'>
                  <div className='absolute flex items-center -top-10 left-1/2 -translate-x-1/2 dark:bg-zinc-850 bg-zinc-200 py-1 px-1.5 border border-1 dark:border-zinc-700 border-zinc-400 rounded-full space-x-1.5'>
                    <div className='bg-rose-600 py-0.5 px-1.5 text-xs dark:text-zinc-900 text-zinc-50 rounded-full'>New</div>
                    <span className='text-sm whitespace-nowrap dark:text-zinc-300 text-zinc-700'>Open Source</span>
                  </div>
                  <button
                    className='rounded-sm p-2 ease-in-out cursor-pointer border border-zinc-400 dark:border-zinc-700 shadow dark:shadow-none'>
                    <FaGithub size={24}/>
                  </button>
                </div>
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;

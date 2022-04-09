import Link from 'next/link';
import {useEffect, useState} from 'react';
import DarkModeToggle from './DarkModeToggle';
import {GiMagnifyingGlass} from "react-icons/gi";

const Nav = () => {
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
    <header className="relative py-9 lg:py-12 select-none">
      <nav
        className="text-primary xl:mx-auto px-4 sm:px-8 xl:px-0 max-w-screen-xl flex max-w-8xl items-center
                space-x-4 sm:space-x-8 w-full box-border flex flex-row justify-between md:justify-start">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="flex space-x-3">
                <GiMagnifyingGlass className="text-blue-500 dark:text-yellow-400" size="48"/>
                <h1 className="dark:text-zinc-50 text-zinc-900 text-4xl font-bold tracking-wide">Find.Army</h1>
              </div>
            </Link>


          </div>
          <div className="flex items-center">
            <DarkModeToggle
              className="rounded p-2 ease-in-out cursor-pointer border border-zinc-400 dark:border-zinc-700 shadow dark:shadow-none"
              onClick={toggleDarkMode}
              size={1.4}
              darkMode={isDarkModeActive}/>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;

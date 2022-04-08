import Link from 'next/link';
import {IoArrowForwardSharp, IoChevronDownOutline} from 'react-icons/io5';
import {useEffect, useState} from 'react';
import {CgMenuRight} from 'react-icons/cg';
import {useRouter} from 'next/router';
import {FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter} from "react-icons/fa";
import DarkModeToggle from './DarkModeToggle';

const Nav = () => {
  const router = useRouter();
  const [isLearnOpen, setLearnOpen] = useState(false);
  const [isDarkModeActive, setIsDarkModeActive] = useState(true);

  useEffect(() => {
    if (localStorage.mainTheme && localStorage.mainTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // race condition between link and onClick. Need to close the menu this way.
  useEffect(() => {
    if (router.pathname === '/learn') setLearnOpen(false);

    const mobileNav = document.querySelector('[data-mobile-nav]');
    mobileNav!.classList.add('scale-y-0');
    mobileNav!.classList.add('opacity-0');
  }, [router]);

  useEffect(() => {
    if (isLearnOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEsc)
      };
    }
  }, [isLearnOpen]);

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

  const toggleNav = () => {
    const mobileNav = document.querySelector('[data-mobile-nav]');
    mobileNav!.classList.toggle('scale-y-0');
    mobileNav!.classList.toggle('opacity-0');
  };

  const toggleDropdown = (e: any) => {
    setLearnOpen(true);
  };

  const handleClickOutside = (e: any) => {
    if ((e.target as HTMLElement).closest('[data-learn-dropdown]')) return;
    setLearnOpen(false);
  };

  const handleEsc = (e: any) => {
    if (e.key === 'Escape') setLearnOpen(false)
  };


  const learnDropdown = (
    <div
      className={`absolute animate-fade-in-slide-down
        top-full mt-3 box-border left-0 w-[400px] bg-zinc-200 dark:bg-zinc-800
        cursor-default rounded overflow-hidden drop-shadow-lg z-40 transition-all duration-300 ease-in-out`}
      data-learn-dropdown>
      <Link href="/learn" passHref>
        <div
          className="flex flex-col box-border w-full h-[80px]
                text-lg px-7 py-5 cursor-pointer bg-zinc-900 dark:bg-yellow-400
                overflow-hidden group bg-right bg-[url('/pattern.png')]
                bg-md bg-no-repeat">
          <span className="font-thick text-zinc-50 dark:text-zinc-900 text-base flex items-center">
            View All{' '}
            <IoArrowForwardSharp className="transition-all duration-100 ml-2 group-hover:ml-4"/>
          </span>
          <span className="text-zinc-200 dark:text-zinc-900/80 text-xs uppercase">
            Development courses
          </span>
        </div>
      </Link>
      <div className={`px-7 py-7 flex flex-col animate-fade-in delay-150`}>
        <span
          className="block relative w-max rounded-sm bg-zinc-400 dark:bg-zinc-700
                px-3 py-1 mb-3 mt-0 uppercase text-xs after:absolute text-zinc-800
                after:top-1/2 after:left-full after:translate-y-[-50%] dark:text-zinc-400
                after:w-[400px] after:h-[0.5px] after:bg-zinc-400/50 after:dark:bg-zinc-700/50">
          Lessons
        </span>
        <div className="grid grid-rows-2 grid-cols-2 mb-10">
          <span
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 duration-200 cursor-pointer">
            React
          </span>
          <span
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 duration-200 cursor-pointer">
            TypeScript
          </span>
          <span
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 duration-200 cursor-pointer">
            SQL / JPA
          </span>
          <span
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 duration-200 cursor-pointer">
            Spring
          </span>
        </div>
        <span
          className="block relative w-max rounded-sm bg-zinc-400 dark:bg-zinc-700
                px-3 py-1 mb-3 mt-0 uppercase text-xs after:absolute text-zinc-800
                after:top-1/2 after:left-full after:translate-y-[-50%] dark:text-zinc-400
                after:w-[400px] after:h-[0.5px] after:bg-zinc-400/50 after:dark:bg-zinc-700/50">
          Articles
        </span>
        <div className="grid grid-rows-2 grid-cols-2 mb-3">
          <span
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 duration-200 cursor-pointer">
            CSS
          </span>
          <span
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 duration-200 cursor-pointer">
            JavaScript
          </span>
          <span
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 duration-200 cursor-pointer">
            React
          </span>
          <span
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 duration-200 cursor-pointer">
            NodeJS
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <header className="relative py-9 lg:py-12 select-none">
      <nav
        className="text-primary xl:mx-auto px-4 sm:px-8 xl:px-0 max-w-screen-xl flex max-w-8xl items-center
                space-x-4 sm:space-x-8 w-full box-border flex flex-row justify-between md:justify-start">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="cursor-pointer flex items-center mr-4 sm:mr-12 lg:mr-20 xl:mr-36">
                <div
                  className="w-[68px] h-[68px] bg-contain bg-center bg-no-repeat bg-[url('/logo/sf-logo-dark.svg')] dark:bg-[url('/logo/sf-logo-light.svg')] transition-all duration-300 ease-in-out"/>
                <div className="flex flex-col font-marsek space-y-0.5">
                  <h2
                    className="cursor-pointer text-lg font-bold text-zinc-900 dark:text-yellow-400 leading-4 uppercase transition duration-300 ease-in-out">
                    Software <br/>
                    Factory
                  </h2>
                  <p className="text-xxs  transition duration-300 ease-in-out">By Soldiers. For Soldiers.</p>
                </div>
              </div>
            </Link>

            <Link href="/explore" passHref>
              <div
                className="mr-10 hidden relative lg:flex cursor-pointer text-lg
                    text-zinc-800 dark:text-zinc-300
                    hover:text-zinc-900 hover:dark:text-zinc-50
                    font-semibold transition ease-in-out duration-300">
                Explore
              </div>
            </Link>
            <Link href="/leadership" passHref>
              <div
                className="mr-10 hidden relative lg:flex cursor-pointer text-lg
                    text-zinc-800 dark:text-zinc-300
                    hover:text-zinc-900 hover:dark:text-zinc-50
                    font-semibold transition ease-in-out duration-300">
                Leadership
              </div>
            </Link>
            <Link href="/join" passHref>
              <div
                className="mr-10 hidden relative lg:flex cursor-pointer text-lg
                    text-zinc-800 dark:text-zinc-300
                    hover:text-zinc-900 hover:dark:text-zinc-50
                    font-semibold transition ease-in-out duration-300">
                Join
              </div>
            </Link>
            <div
              onClick={toggleDropdown}
              className="hidden relative lg:flex justify-center
                    items-center cursor-pointer text-lg
                    text-zinc-800 dark:text-zinc-300
                    hover:text-zinc-900 hover:dark:text-zinc-50
                    font-semibold transition ease-in-out duration-300">
              Learn <IoChevronDownOutline className="text-sm ml-2"/>
              {isLearnOpen && learnDropdown}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex space-x-4 mr-14">
              <Link href="https://www.facebook.com/ArmySoftwareFactory" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <FaFacebook
                    className="text-zinc-800 dark:text-zinc-300 hover:zinc-900 dark:hover:text-zinc-50 transition duration-300 ease-in-out cursor-pointer"
                    size={24}/>
                </a>
              </Link>
              <Link href="https://twitter.com/armyswf" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <FaTwitter
                    className="text-zinc-800 dark:text-zinc-300 hover:zinc-900 dark:hover:text-zinc-50 transition duration-300 ease-in-out cursor-pointer"
                    size={24}/>
                </a>
              </Link>
              <Link href="https://www.instagram.com/armysoftwarefactory/" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <FaInstagram
                    className="text-zinc-800 dark:text-zinc-300 hover:zinc-900 dark:hover:text-zinc-50 transition duration-300 ease-in-out cursor-pointer"
                    size={24}/>
                </a>
              </Link>
              <Link href="https://www.linkedin.com/company/army-software-factory/" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn
                    className="text-zinc-800 dark:text-zinc-300 hover:zinc-900 dark:hover:text-zinc-50 transition duration-300 ease-in-out cursor-pointer"
                    size={24}/>
                </a>
              </Link>
            </div>
            <DarkModeToggle
              className="rounded p-2 ease-in-out cursor-pointer border border-zinc-400 dark:border-zinc-700 shadow dark:shadow-none"
              onClick={toggleDarkMode}
              size={1.4}
              darkMode={isDarkModeActive}/>
          </div>
        </div>
        <CgMenuRight
          onClick={toggleNav}
          name="search"
          className="cursor-pointer text-4xl block lg:hidden text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-50 font-semibold transition duration-200"
        />
      </nav>

      {/* Mobile Menu */}
      <div
        data-mobile-nav
        className="grid w-full bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md absolute left-0 top-full z-40 overflow-hidden lg:hidden animated opacity-0 duration-200 transition-all origin-top scale-y-0">
        <div className="flex-column w-full">
          <Link href="/explore" passHref>
            <p
              className="cursor-pointer bg-black/10 h-16 text-center text-lg text-zinc-500 dark:text-zinc-300 flex flex-row justify-center items-center hover:text-zinc-900 hover:dark:text-zinc-50 font-semibold transition duration-200">
              Explore
            </p>
          </Link>
          <Link href="/leadership" passHref>
            <p
              className="cursor-pointer bg-black/10 h-16 text-center text-lg text-zinc-500 dark:text-zinc-300 flex flex-row justify-center items-center hover:text-zinc-900 hover:dark:text-zinc-50 font-semibold transition duration-200">
              Leadership
            </p>
          </Link>
          <Link href="/join" passHref>
            <p
              className="cursor-pointer bg-black/10 h-16 text-center text-lg text-zinc-500 dark:text-zinc-300 flex flex-row justify-center items-center hover:text-zinc-900 hover:dark:text-zinc-50 font-semibold transition duration-200">
              Join
            </p>
          </Link>
          <Link href="/learn" passHref>
            <p
              className="cursor-pointer bg-black/10 h-16 text-center text-lg text-zinc-500 dark:text-zinc-300 flex flex-row justify-center items-center hover:text-zinc-900 hover:dark:text-zinc-50 font-semibold transition duration-200">
              Learn
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;

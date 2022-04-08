import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="px-5vw py-9 lg:py-12 dark:bg-zinc-900 flex justify-between items-center py-8">
      <div className="flex">
        <Link href="https://www.army.mil/" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <div className="h-14 w-14 bg-no-repeat bg-[url('/logo/army-logo.svg')] cursor-pointer"/>
          </a>
        </Link>
        <Link href="https://armyfuturescommand.com/" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <div className="h-14 w-14 bg-contain bg-center bg-no-repeat bg-[url('/logo/futures-logo.svg')] cursor-pointer"/>
          </a>
        </Link>
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-400">
        © {new Date().getFullYear()} Army Software Factory
      </p>
    </footer>
  );
}

export default Footer;
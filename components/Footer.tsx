import React from "react";

const Footer = () => {
  return (
    <footer className="px-12 py-9 lg:py-12 dark:bg-zinc-900 flex justify-between items-center py-8">
      <div className="flex">
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-400">
        © {new Date().getFullYear()} Find.Army
      </p>
    </footer>
  );
}

export default Footer;
import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center flex-row-reverse my-12">
      <p className="text-sm text-zinc-700 dark:text-zinc-400">
        © {new Date().getFullYear()} Find.Army
      </p>
    </footer>
  );
}

export default Footer;
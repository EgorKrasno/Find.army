import {Html, Head, NextScript, Main} from "next/document";

const themeInitializerScript =`
       (function () {
         const htmlElement = document.documentElement;
         if(window.localStorage.getItem("mainTheme")){
           if(window.localStorage.getItem("mainTheme") === "dark"){
             document.body.classList.add("dark");
             htmlElement.style.setProperty('color-scheme', 'dark');
           }
           else{
             document.body.classList.remove("dark");
             htmlElement.style.setProperty('color-scheme', 'light');
           }
         } else {
           document.body.classList.add("dark");
           window.localStorage.setItem("mainTheme", "dark");
           htmlElement.style.setProperty('color-scheme', 'dark');
         }
       })();
   `;

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body>
      <script
        dangerouslySetInnerHTML={{__html: themeInitializerScript}}
      />
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}
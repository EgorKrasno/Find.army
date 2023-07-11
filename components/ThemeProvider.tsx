import {createContext, useEffect, useState} from "react";

export type ThemeContextType = {
  theme: string;
  changeTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'default', changeTheme: () => {
  }
});

const ThemeProvider = ({children}: any) => {
  const [theme, setTheme] = useState<string>('default');

  const changeTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
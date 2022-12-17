import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const values = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

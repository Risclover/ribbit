import { useDarkMode } from "hooks";
import React, { createContext, useContext, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const { theme } = useDarkMode();
  const [isDarkMode, setIsDarkMode] = useState(theme);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const getDarkMode = () => useContext(DarkModeContext);

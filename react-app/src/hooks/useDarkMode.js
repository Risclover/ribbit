// src/hooks/useDarkMode.js
import { useState, useEffect } from "react";

export function useDarkMode() {
  // Initialize theme state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });
  const [checked, setChecked] = useState(theme === "light" ? false : true);

  useEffect(() => {
    // Update the HTML element's data-theme attribute
    document.documentElement.setAttribute("data-theme", theme);
    // Persist in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setChecked((prev) => (prev === true ? false : true));
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme, checked };
}

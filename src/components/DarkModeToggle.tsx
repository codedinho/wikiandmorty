"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const darkModeStored = localStorage.getItem("darkMode");
    const isDarkMode =
      darkModeStored === "true" || document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains("dark")) {
      htmlEl.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("darkMode", "false");
    } else {
      htmlEl.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("darkMode", "true");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-full px-4 py-2 z-50"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
} 
// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import SearchView from "./components/SearchView";
import DetailView from "./components/DetailView";

function App() {
  const [colorMode, setColorMode] = useLocalStorage("color-mode", "light");

  useEffect(() => {
    document.documentElement.classList.add(colorMode);
    return () => {
      document.documentElement.classList.remove(colorMode);
    };
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <div>
      <p className="text-white dark:text-blue-600"> Dark/Light</p>
      <div className="text-right">
        <button
          onClick={toggleColorMode}
          className=" self-end text-white rounded-full p-4 mx-2 my-1 hover:bg-gray-700 focus:outline-none"
        >
          {colorMode === "light" ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/detail/:id" element={<DetailView />} />
          <Route path="/" element={<SearchView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchView from "./components/SearchView";
import DetailView from "./components/DetailView";

function App() {
  return (
    <div>
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

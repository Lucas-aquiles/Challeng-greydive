import { Forms } from "./components/Forms";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import PageAux from "./page/PageAux";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Forms />} />
      <Route path="/Information" element={<PageAux />} />
    </Routes>
  );
}

export default App;

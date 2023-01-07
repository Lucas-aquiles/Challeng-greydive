import { Forms } from "./components/Forms";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const PageAux = lazy(() => import("./page/PageAux"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/Information" element={<PageAux />} />
      </Routes>
    </Suspense>
  );
}

export default App;

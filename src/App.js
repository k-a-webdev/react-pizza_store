import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

export default function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <Header {...{ searchValue, setSearchValue }} />
      <div className="content">
        <Routes>
          <Route index element={<Home {...{ searchValue }} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

// TODO:
// - change language to English
// - change fonts to em/rem
// - add more responsive styles

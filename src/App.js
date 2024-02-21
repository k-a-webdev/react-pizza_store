import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { createContext, useState } from "react";

export const AppContext = createContext("");

export default function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <AppContext.Provider
        value={{
          searchValue,
          setSearchValue,
        }}
      >
        <Header />
        <div className="content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

// TODO:
// - change language to English
// - change fonts to em/rem
// - add more responsive styles

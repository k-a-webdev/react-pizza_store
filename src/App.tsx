import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import FullPizza from "./pages/FullPizza";

import "./scss/app.scss";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

// TODO:
// - change language to English
// - change fonts to em/rem
// - add more responsive styles

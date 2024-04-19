import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

import "./scss/app.scss";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback="Loading....">
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback="Loading....">
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback="Loading....">
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

// TODO:
// - change language to English
// - change fonts to em/rem
// - add more responsive styles
// - add loading page

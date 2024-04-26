// Main imports
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

// Styles
import "./scss/app.scss";
import { useAppDispatch } from "./redux/store";

// Redux imports
import { fetchUSD } from "./redux/cart/asyncActions";
import Preloader from "./pages/Preloader";

// Lazy loading
const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);

// Main block
export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUSD());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Preloader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<Preloader />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Preloader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

// Main imports
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Pages
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

// Styles
import "./scss/app.scss";
import { useAppDispatch } from "./redux/store";
import { setLang } from "./redux/pizzas/slice";

// Redux imports
import { fetchUSD } from "./redux/cart/asyncActions";

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
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.resolvedLanguage && dispatch(setLang(i18n.resolvedLanguage));

    dispatch(fetchUSD());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={t("loadPageText")}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={t("loadPageText")}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={t("loadPageText")}>
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

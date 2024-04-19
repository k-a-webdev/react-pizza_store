import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filterReducer from "./filter/slice";
import cartReducer from "./cart/slice";
import pizzasReducer from "./pizzas/slice";

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

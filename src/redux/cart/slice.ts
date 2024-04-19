import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getCartFromLS } from "../../utils/getCartFromLS";
import { ICartItem, ICartState } from "./types";

const cartData = getCartFromLS();

const initialState: ICartState = {
  products: cartData.products,
  totalPrice: cartData.totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ICartItem>) {
      const newProduct = action.payload;

      const findProduct = state.products.find(
        (el) =>
          el.id === newProduct.id &&
          el.size === newProduct.size &&
          el.type === newProduct.type
      );

      if (findProduct) {
        findProduct.count++;
      } else
        state.products.push({
          ...newProduct,
          count: 1,
        });

      state.totalPrice += newProduct.price;
    },
    removeProduct(state, action: PayloadAction<ICartItem>) {
      const oldProduct = action.payload;

      const findIndex = state.products.findIndex(
        (el) =>
          el.id === oldProduct.id &&
          el.size === oldProduct.size &&
          el.type === oldProduct.type
      );

      if (findIndex || findIndex === 0) {
        const findProduct = state.products[findIndex];
        findProduct.count--;
      }

      state.totalPrice -= action.payload.price;
    },
    clearProducts(state, action: PayloadAction<ICartItem>) {
      const oldProduct = action.payload;

      const findIndex = state.products.findIndex(
        (el) =>
          el.id === oldProduct.id &&
          el.size === oldProduct.size &&
          el.type === oldProduct.type
      );

      state.totalPrice -=
        state.products[findIndex].price * state.products[findIndex].count;

      state.products.splice(findIndex, 1);
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, clearProducts, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// TO DO
// Add totalCount

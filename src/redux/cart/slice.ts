import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchUSD } from "./asyncActions";
import { ICartItem, ICartState } from "./types";

import { getCartFromLS } from "../../utils/getCartFromLS";

const cartData = getCartFromLS();

const initialState: ICartState = {
  products: cartData.products,
  totalPrice: cartData.totalPrice,
  totalPrice_en: 0,
  totalCount: cartData.totalCount,
  priceUSD: 0,
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
      state.totalPrice_en += Math.ceil(newProduct.price / state.priceUSD);
      state.totalCount += 1;
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
      state.totalPrice_en -= Math.ceil(action.payload.price / state.priceUSD);

      state.totalCount -= 1;
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

      state.totalPrice_en -= Math.ceil(
        (state.products[findIndex].price * state.products[findIndex].count) /
          state.priceUSD
      );

      state.products.splice(findIndex, 1);
      state.totalCount -= state.products[findIndex].count;
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
      state.totalPrice_en = 0;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUSD.pending, (state) => {
      //
    });
    builder.addCase(fetchUSD.fulfilled, (state, { payload }) => {
      if (payload.length > 0) state.priceUSD = payload[0]["rate"];
    });
    builder.addCase(fetchUSD.rejected, (state) => {
      //
    });
  },
});

export const { addProduct, removeProduct, clearProducts, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, { payload }) {
      const newProduct = payload;

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
    removeProduct(state, { payload }) {
      const oldProduct = payload;

      const findIndex = state.products.findIndex(
        (el) =>
          el.id === oldProduct.id &&
          el.size === oldProduct.size &&
          el.type === oldProduct.type
      );

      if (findIndex || findIndex === 0) {
        const findProduct = state.products[findIndex];

        if (findProduct.count > 1) {
          findProduct.count--;
        } else {
          state.products.splice(findIndex, 1);
        }
      }

      state.totalPrice -= payload.price;
    },
    clearProducts(state, { payload }) {
      const oldProduct = payload;

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

export const selectCart = (state) => state.cartReducer;

export const { addProduct, removeProduct, clearProducts, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// TO DO
// Add func which clear all pizzas in row

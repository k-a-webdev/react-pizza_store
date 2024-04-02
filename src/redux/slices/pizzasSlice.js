import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  items: [],
  isLoading: "loading", // loading || succes || error
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async (mainURL) => {
    const { data } = await axios.get(mainURL);
    return data;
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.isLoading = "loading";
    });
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.isLoading = "error";
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

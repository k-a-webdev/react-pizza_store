import { createSlice } from "@reduxjs/toolkit";

import { fetchPizzas, fetchAllPizzas } from "./asyncActions";
import { IPizzaState, Status } from "./types";

const initialState: IPizzaState = {
  items: [],
  isLoading: Status.LOADING, // loading || success || error
  itemsCount: 0,
  pagesCount: 1,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPizzass
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.isLoading = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.isLoading = Status.ERROR;
    });

    // fetchAllPizzas
    builder.addCase(fetchAllPizzas.pending, (state) => {
      state.itemsCount = 0;
    });
    builder.addCase(fetchAllPizzas.fulfilled, (state, { payload }) => {
      state.itemsCount = payload.length;

      if (payload.length > 8) state.pagesCount = 2;
      else state.pagesCount = 1;
    });
    builder.addCase(fetchAllPizzas.rejected, (state) => {
      state.itemsCount = 0;
    });
  },
});

export default pizzasSlice.reducer;

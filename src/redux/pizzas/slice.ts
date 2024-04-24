import { createSlice } from "@reduxjs/toolkit";

import { fetchPizzas } from "./asyncActions";
import { IPizzaState, Status } from "./types";

const initialState: IPizzaState = {
  items: [],
  isLoading: Status.LOADING, // loading || success || error
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default pizzasSlice.reducer;

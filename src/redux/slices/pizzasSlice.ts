import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export interface PizzaItem {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IPizzaState {
  items: PizzaItem[];
  isLoading: Status;
}

const initialState: IPizzaState = {
  items: [],
  isLoading: Status.LOADING, // loading || success || error
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], string>(
  "pizzas/fetchPizzas",
  async (mainURL) => {
    const { data } = await axios.get<PizzaItem[]>(mainURL);
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

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { PizzaItem } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], string>(
  "pizzas/fetchPizzas",
  async (mainURL) => {
    const { data } = await axios.get<PizzaItem[]>(mainURL);
    return data;
  }
);

export const fetchAllPizzas = createAsyncThunk<PizzaItem[], string>(
  "pizzas/fetchAllPizzas",
  async (mainURL) => {
    const { data } = await axios.get<PizzaItem[]>(mainURL);
    return data;
  }
);

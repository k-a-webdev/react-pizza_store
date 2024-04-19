import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFilterState, Sort } from "./types";

const initialState: IFilterState = {
  activeCategory: 0,
  activeSort: 0,
  activePage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action: PayloadAction<number>) {
      state.activeSort = action.payload;
    },
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
    setFilters(state, action: PayloadAction<Sort>) {
      state.activeSort = action.payload.activeSort;
      state.activePage = action.payload.activePage;
      state.activeCategory = action.payload.activeCategory;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setActiveCategory,
  setActiveSort,
  setActivePage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;

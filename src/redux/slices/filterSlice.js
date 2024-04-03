import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  activeSort: 0,
  activePage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, { payload }) {
      state.activeCategory = payload;
    },
    setActiveSort(state, { payload }) {
      state.activeSort = payload;
    },
    setActivePage(state, { payload }) {
      state.activePage = payload;
    },
    setFilters(state, { payload }) {
      state.activeSort = Number(payload.sort);
      state.activePage = Number(payload.page);
      state.activeCategory = Number(payload.category);
    },
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
  },
});

export const selectFilter = (state) => state.filterReducer;

export const {
  setActiveCategory,
  setActiveSort,
  setActivePage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;

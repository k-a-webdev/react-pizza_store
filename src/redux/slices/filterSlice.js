import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  activeSort: 0,
  activePage: 1,
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
  },
});

export const { setActiveCategory, setActiveSort, setActivePage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;

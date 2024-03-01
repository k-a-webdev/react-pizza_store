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
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    setFilters(state, action) {
      state.activeSort = Number(action.payload.sort);
      state.activePage = Number(action.payload.page);
      state.activeCategory = Number(action.payload.category);
    },
  },
});

export const { setActiveCategory, setActiveSort, setActivePage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;

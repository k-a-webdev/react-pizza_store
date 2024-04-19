export interface Sort {
  activeCategory: number;
  activeSort: number;
  activePage: number;
}
export interface IFilterState extends Sort {
  searchValue: string;
}

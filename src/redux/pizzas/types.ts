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

export interface IPizzaState {
  items: PizzaItem[];
  isLoading: Status;
}
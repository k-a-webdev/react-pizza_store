export interface ICartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface ICartState {
  products: ICartItem[];
  totalPrice: number;
}

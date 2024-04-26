export interface ICartItem {
  id: number;
  title: string;
  title_en: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
}

export interface ICartState {
  products: ICartItem[];
  totalPrice: number;
  totalPrice_en: number;
  totalCount: number;
  priceUSD: number;
}

export interface IFetchUSD {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

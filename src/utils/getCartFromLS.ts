import { ICartItem } from "../redux/slices/cartSlice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");

  const products: ICartItem[] = data ? JSON.parse(data) : [];
  const totalPrice = products.reduce(
    (sum, el) => (sum += el.price * el.count),
    0
  );

  return { products, totalPrice };
};

import { Link } from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart.png";

export default function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>
        Ваш кошик пустий <icon>😕</icon>
      </h2>
      <p>
        Скоріше за все, ви ще не замовили що хотіли.
        <br />
        Для замовлення перейдіть на головну сторінку.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" class="button button--black">
        <span>Повернутись на головну</span>
      </Link>
    </div>
  );
}

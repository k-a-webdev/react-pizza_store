import { FC } from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart.png";

export const CartEmpty: FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Ваш кошик пустий <span>😕</span>
      </h2>
      <p>
        Скоріше за все, ви ще не замовили що хотіли.
        <br />
        Для замовлення перейдіть на головну сторінку.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Повернутись на головну</span>
      </Link>
    </div>
  );
};

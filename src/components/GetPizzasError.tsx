import { FC } from "react";

export const GetPizzasError: FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        При завантаженні даних виникла помилка <span>😕</span>
      </h2>
      <p>
        Скоріше за все, сервіс скоро відновиться.
        <br />
        Просимо зачекати!
      </p>
    </div>
  );
};

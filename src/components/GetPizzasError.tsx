import { FC } from "react";

export const GetPizzasError: FC = () => {
  return (
    <div className="my-16 mx-auto text-center flex flex-col items-center">
      <h2 className="text-4xl mb-4 font-bold">
        При завантаженні даних виникла помилка <span className="relative top-0.5">😕</span>
      </h2>
      <p className="text-2xl tracking-wide text-myGray-3">
        Скоріше за все, сервіс скоро відновиться.
        <br />
        Просимо зачекати!
      </p>
    </div>
  );
};

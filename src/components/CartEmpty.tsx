import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ButtonHome } from "./index";

import cartEmptyImg from "../assets/img/empty-cart.png";

export const CartEmpty: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-3 px-4 md:py-10 md:px-16">
      <div className="mx-auto max-w-205 text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl">
          {t("cart.emptyLabel")} <span>😕</span>
        </h2>
  
        <p className="text-xl sm:text-2xl md:text-3xl mb-4">
          {t("cart.emptySubLabel")}
          <br />
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
  
        <ButtonHome />
      </div>
    </div>
  );
};

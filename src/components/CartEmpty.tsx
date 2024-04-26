import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ButtonHome } from "./index";

import cartEmptyImg from "../assets/img/empty-cart.png";

export const CartEmpty: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="cart cart--empty">
      <h2>
        {t("cart.emptyLabel")} <span>😕</span>
      </h2>

      <p>
        {t("cart.emptySubLabel")}
        <br />
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />

      <ButtonHome />
    </div>
  );
};

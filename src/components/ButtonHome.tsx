import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ButtonHome: FC = () => {
  const { t } = useTranslation();

  return (
    <Link
      to={process.env.REACT_APP_DOMAIN ? process.env.REACT_APP_DOMAIN : "/"}
      className="btn-primary flex p-4 gap-5 w-max relative bg-white border border-myOrange text-myOrange hover:bg-myOrange hover:text-white"
    >
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        <path
          d="M7 13L1 6.93015L6.86175 1"
          stroke="#D3D3D3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="text-xl md:text-2xl">{t("button.backHome")}</span>
    </Link>
  );
};

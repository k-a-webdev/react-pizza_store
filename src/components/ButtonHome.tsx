import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const ButtonHome: FC = () => {
  const { t } = useTranslation();

  return (
    <Link to="/" className="button button--outline button__go-home ">
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13L1 6.93015L6.86175 1"
          stroke="#D3D3D3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span>{t("button.backHome")}</span>
    </Link>
  );
};

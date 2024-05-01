import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ButtonHome } from "../index";

export const NotFoundBlock: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-[6.25rem] sm:p-[6.25rem] w-full text-center flex flex-col items-center">
      <h1>
        <span className="text-4xl sm:text-5xl md:text-6xl">😕</span>
        <br />
        {t("notFound.title")}
      </h1>
      <p className="text-2xl sm:text-3xl md:text-4xl">{t("notFound.subTitle")}</p>
      <br />

      <ButtonHome />
    </div>
  );
};

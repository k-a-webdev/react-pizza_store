import { FC } from "react";
import styles from "./NotFoundBlock.module.scss";
import { ButtonHome } from "../index";
import { useTranslation } from "react-i18next";

export const NotFoundBlock: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        {t("notFound.title")}
      </h1>
      <p className={styles.description}>{t("notFound.subTitle")}</p>
      <br />

      <ButtonHome />
    </div>
  );
};

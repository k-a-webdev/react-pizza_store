import { FC } from "react";
import styles from "./NotFoundBlock.module.scss";
import { ButtonHome } from "../index";

export const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not found any page on this url
      </h1>
      <p className={styles.description}>Oops....</p>
      <br />

      <ButtonHome />
    </div>
  );
};

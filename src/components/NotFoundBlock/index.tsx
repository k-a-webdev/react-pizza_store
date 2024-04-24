import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not found any page on this url
      </h1>
      <p className={styles.description}>Oops....</p>

      <Link to="/" className="button button--outline button--add go-back-btn">
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

        <span>Повернутись на головну</span>
      </Link>
    </div>
  );
};

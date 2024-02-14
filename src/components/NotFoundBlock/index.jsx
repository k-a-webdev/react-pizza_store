import React from "react";

import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not found any page on this url
      </h1>
      <p className={styles.description}>Oops....</p>
    </div>
  );
}

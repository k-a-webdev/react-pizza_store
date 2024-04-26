import styles from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={styles.root}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Preloader;

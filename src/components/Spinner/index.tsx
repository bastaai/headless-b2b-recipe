import React from "react";
import styles from "./Spinner.module.css";

export const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading_spinner}></div>
    </div>
  );
};

export default LoadingSpinner;

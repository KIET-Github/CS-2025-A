import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

const ButtonLoader = ({ isDark }) => {
  return (
    <div
      className={classNames(styles["lds-dual-ring"], {
        [styles.isDark]: isDark,
      })}
    ></div>
  );
};

export default ButtonLoader;

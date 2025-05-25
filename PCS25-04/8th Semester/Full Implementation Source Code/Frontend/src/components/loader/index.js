import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";
const Loader = ({ className }) => {
  return (
    <div className={classNames(styles.ids, className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;

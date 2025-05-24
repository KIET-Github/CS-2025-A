import classNames from "classnames";
import React from "react";
import ButtonLoader from "../buttonLoader";
// import Loader from "../loader";
import styles from "./index.module.scss";

const Button = ({
  label,
  onClick,
  restProps = {},
  className,
  isLoading,
  isIconButton,
  type,
}) => {
  return (
    <button
      onClick={() => {
        if (!isLoading) onClick?.();
      }}
      {...restProps}
      className={classNames(styles.button, className, {
        [styles.iconButton]: isIconButton,
      })}
      {...(type && { type })}
    >
      {isLoading ? <ButtonLoader /> : label}
    </button>
  );
};

export default Button;

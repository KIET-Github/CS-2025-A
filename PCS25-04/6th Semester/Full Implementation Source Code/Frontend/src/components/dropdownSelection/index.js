import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";

const DropdownSelect = ({
  value,
  onChange,
  children,
  label,
  className,
  disabled,
}) => {
  return (
    <div
      className={classNames(className, styles.root)}
      onClick={(e) => {
        e?.preventDefault();
        e?.stopPropagation();
      }}
    >
      {label && <h4 className={styles.heading}>{label}</h4>}
      <div
        className={classNames(styles.select, {
          [styles.low]: value == -1 || value == "",
          [styles.disabled]: disabled,
        })}
      >
        <select
          placeholder="Please"
          name="dropdownSelect"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default DropdownSelect;

import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getElementError } from "../getElementError";

const Input = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  restProps = {},
  subScript,
  className,
  readOnly,
  textArea,
  isPassword,
  ref,
  rows,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleEyeClick = (e) => {
    e.stopPropagation();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={classNames(styles.inputBox, className)}>
      {label && <label>{label}</label>}
      <div
        className={classNames({
          [styles.inputDiv]: isPassword,
        })}
      >
        {textArea ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder ?? label}
            className={classNames(styles.input, styles.textarea)}
            {...restProps}
            onWheel={(e) => e?.target?.blur()}
            cols={30}
            rows={rows || 5}
            ref={ref}
          />
        ) : (
          <input
            {...(restProps?.type === "number"
              ? {
                  value: value > 0 ? (value + "")?.replace(/^0+/, "") : value,
                }
              : { value })}
            className={classNames(styles.input, {
              [styles.disabled]: readOnly,
            })}
            onChange={onChange}
            placeholder={placeholder ?? label}
            {...restProps}
            onWheel={(e) => e?.target?.blur()}
            {...(readOnly && { readOnly: true })}
            {...(isPassword && { type: showPassword ? "text" : "password" })}
            onClick={(e) => {
              e?.stopPropagation();
            }}
            ref={ref}
            onBlur={onBlur}
          />
        )}
        {subScript && <sub>{subScript}</sub>}
        {isPassword && (
          <div onClick={handleEyeClick}>
            {showPassword ? (
              <AiFillEye
                className={classNames(
                  showPassword ? "ri-eye-off-line" : "ri-eye-line",
                  styles.eye
                )}
              />
            ) : (
              <AiOutlineEyeInvisible
                className={classNames(
                  showPassword ? "ri-eye-off-line" : "ri-eye-line",
                  styles.eye
                )}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

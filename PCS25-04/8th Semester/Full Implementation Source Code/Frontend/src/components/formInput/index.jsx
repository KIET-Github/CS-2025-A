import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { getElementError } from "../getElementError";

/**
 * The FormInput component is a reusable component that renders an input field for forms.
 *
 * @param {string} label (string): The label for the input field.
 * @param {string} placeholder (string): The placeholder text for the input field.
 * @param {string} name (string): The name of the input field.
 * @param {string} type (string): The type of the input field (e.g., "text", "email", "password", etc.).
 * @param {Object} restProps (object): Additional props to be spread onto the input element.
 * @param {Function} register (function): The register function from react-hook-form to register the field.
 * @param {Object} errors (object): The errors object from react-hook-form containing validation errors.
 * @param {string} className (string): Additional CSS class name(s) for styling purposes.
 * @param {boolean} multiline : To convert input to boolean
 */

const FormInput = ({
  label,
  placeholder,
  name,
  type,
  restProps,
  register,
  errors,
  className,
  multiline,
  disabled,
}) => {
  const error = getElementError({ name, errors });
  const inputElement = multiline ? (
    <textarea
      {...(register ? register(name) : {})}
      {...restProps}
      placeholder={placeholder}
      onWheel={(e) => e?.target?.blur()}
      cols={30}
      rows={4}
    />
  ) : (
    <input
      {...(register ? register(name) : {})}
      {...restProps}
      placeholder={placeholder}
      {...(type && { type })}
      onWheel={(e) => e?.target?.blur()}
      {...(type === "number" && { step: "any" })}
      disabled={disabled}
    />
  );

  return (
    <div
      className={classNames(styles.formInput, className, {
        [styles.error]: !!error,
      })}
    >
      {label && <label>{label ?? placeholder}</label>}
      {inputElement}
      {!!error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default FormInput;

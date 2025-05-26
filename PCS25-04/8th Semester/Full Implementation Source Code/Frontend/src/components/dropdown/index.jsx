import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { getElementError } from "../getElementError";

/**
 * The FormDropdown component is a reusable component that renders a dropdown/select input field for forms.
 *
 * @param {string} key : The unique identifier for the Field.
 * @param {string} label : The label for the dropdown field.
 * @param {string} placeholder : The placeholder text for the dropdown field.
 * @param {Array} options : An array of options for the dropdown field.
 * @param {string} name : The name of the dropdown field.
 * @param {Object} restProps : Additional props to be spread onto the select element.
 * @param {Function} renderOptions : A custom render function for the options. It receives each value
 * from the options array and should return the JSX for the option element.
 * @param {Function} register : The register function from react-hook-form to register the field.
 * @param {Object} errors : The errors object from react-hook-form containing validation errors.
 * @param {string} className : Additional CSS class name(s) for styling purposes.
 */

const FormDropdown = ({
  key,
  label,
  placeholder,
  options,
  name,
  restProps,
  renderOptions,
  register,
  errors,
  className,
  disabled,
}) => {
  const error = getElementError({ name, errors });

  return (
    <div
      className={classNames(styles.formDropdown, className, {
        [styles.error]: !!error,
      })}
      key={key}
    >
      {label && <label>{label}</label>}
      <select {...register(name)} {...restProps} disabled={disabled}>
        <option value={""}>{placeholder}</option>
        {options?.map((value) => {
          return renderOptions ? (
            renderOptions(value)
          ) : (
            <option value={value} key={value}>
              {value}
            </option>
          );
        })}
      </select>
      {!!error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default FormDropdown;

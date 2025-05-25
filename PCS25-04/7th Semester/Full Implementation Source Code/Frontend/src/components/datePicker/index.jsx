import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getElementError } from "../getElementError";
import styles from "./index.module.scss";
import classNames from "classnames";

const DateInput = ({
  name,
  label,
  value,
  onDateChange,
  rest,
  errors,
  placeholder,
  className,
}) => {
  return (
    <div
      className={classNames(styles.formDatePicker, className, {
        [styles.error]: !!errors,
      })}
    >
      {label && <label>{label}</label>}
      <DatePicker
        {...rest}
        selected={value}
        showTimeSelect
        onChange={(date) => {
          onDateChange(name, date);
        }}
        name={name}
        dateFormat="dd-MM-yy"
        timeFormat="HH:mm"
        timeCaption="Time"
        placeholderText={placeholder || "Select Date and Time"}
        className={classNames(styles.datePickerInput, className, {
          [styles.disabled]: rest?.disabled,
        })}
      />
      {!!errors && <p className={styles.errorMessage}>{errors}</p>}
    </div>
  );
};
export default DateInput;

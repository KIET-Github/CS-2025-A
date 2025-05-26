import React from "react";
import DateInput from ".";
import { useFormContext } from "react-hook-form";
import { getElementError } from "../getElementError";

const FormDatePicker = ({ label, name, minValue, ...rest }) => {
  const methods = useFormContext();
  const { setValue, setError, formState, watch } = methods;
  const errors = formState.errors;
  const error = getElementError({ name, errors });

  const handleDateChange = (name, date) => {
    setValue(name, date);
    setError(name, { message: "" });
  };

  return (
    <>
      <DateInput
        name={name}
        label={label}
        value={watch(name)}
        onDateChange={handleDateChange}
        errors={error}
        minValue={minValue}
        {...rest}
      />
    </>
  );
};

export default FormDatePicker;

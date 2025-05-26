import React from "react";
import FormInput from ".";
import { useFormContext } from "react-hook-form";

/**
 *
 * The FormProviderInput component is a wrapper component that provides
 * access to the form context for the FormInput component.
 *
 * The FormProviderInput component accepts the following props:
 * @param {string} label : The label for the input field.
 * @param {string} placeholder : The placeholder text for the input field.
 * @param {string} name : The name of the input field.
 * @param {string} type : The type of the input field (e.g., "text", "email", "password", etc.).
 * @param {object} restProps : Additional props to be spread onto the input element.
 * @param {string} className : Additional CSS class name(s) for styling purposes.
 * @param {boolean} overrideError : Flag to override the error message display.
 *
 */

const FormProviderInput = ({
  label,
  placeholder,
  name,
  type,
  restProps,
  className,
  multiline,
  disabled,
}) => {
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormInput
      {...{
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
      }}
      {...methods}
    />
  );
};

export default FormProviderInput;

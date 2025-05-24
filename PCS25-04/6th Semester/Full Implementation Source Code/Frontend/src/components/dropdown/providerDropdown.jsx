import React from "react";
import FormDropdown from ".";
import { useFormContext } from "react-hook-form";

/**
 * The FormProviderDropdown component is a wrapper component that provides access
 * to the form context for the FormDropdown component.
 *
 * @param {string} label : The label for the dropdown field.
 * @param {string} placeholder : The placeholder text for the dropdown field.
 * @param {Array} options : An array of options for the dropdown field.
 * @param {string} name : The name of the dropdown field.
 * @param {Object} restProps : Additional props to be spread onto the select element.
 * @param {Function} renderOptions : A custom render function for the options.
 * It receives each value from the options array and should return the JSX for the option element.
 * @param {string} className : Additional CSS class name(s) for styling purposes.
 */

const FormProviderDropdown = ({
  label,
  placeholder,
  options,
  name,
  restProps,
  disabled,
  renderOptions,
  className,
}) => {
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormDropdown
      {...{
        label,
        placeholder,
        name,
        options,
        restProps,
        renderOptions,
        register,
        errors,
        className,
        disabled,
      }}
      {...methods}
    />
  );
};

export default FormProviderDropdown;

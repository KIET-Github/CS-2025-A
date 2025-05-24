import React from "react";
import FormArrayFieldsWrapper from ".";
import { useFormContext } from "react-hook-form";

/**
 * The FormArrayFieldsProviderWrapper component is a wrapper component
 * that provides the useFormContext and control object to the FormArrayFieldsWrapper component.
 * It allows you to use the FormArrayFieldsWrapper component within the context of an existing form.
 *
 * @param {string} name : The name of the array field.
 * @param {Object} [rules] : The validation rules for the array field.
 * @param {Function} renderFields : A function that renders the array fields and receives the fields, append,
 * and remove functions as arguments.
 */

const FormArrayFieldsProviderWrapper = ({ name, rules, renderFields }) => {
  const methods = useFormContext();
  const { control } = methods;
  return (
    <FormArrayFieldsWrapper
      {...{ name, rules, renderFields, control }}
      {...methods}
    />
  );
};

export default FormArrayFieldsProviderWrapper;

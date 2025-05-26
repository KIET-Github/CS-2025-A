import React from "react";
import { useFieldArray } from "react-hook-form";

/**
 * The FormArrayFieldsWrapper component is a wrapper component that handles
 * dynamic array fields using the useFieldArray hook from react-hook-form.
 * It provides the necessary functions and data for rendering and managing the array fields.
 *
 * PS. Even I dont know how this is working!
 *
 * @param {string} name : The name of the array field.
 * @param {Object} control : The control object from react-hook-form to control the form.
 * @param {Object} [rules] : The validation rules for the array field.
 * @param {Function} renderFields : A function that renders the array fields and receives the fields,
 *  append, and remove functions as arguments.
 *
 */
const FormArrayFieldsWrapper = ({
  name,
  control,
  rules = {},
  renderFields,
}) => {
  const { fields, append, remove, insert } = useFieldArray({
    name,
    control,
    rules,
  });
  if (!renderFields)
    return console.error("Render Fields function is not defined.");
  if (!name) return console.error("Name is not available");
  if (!control) return console.error("Control is not provided");

  return <>{renderFields({ fields, append, remove, insert })}</>;
};

export default FormArrayFieldsWrapper;

import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

/**
 * The FormProviderWrapper component is a wrapper component that provides form
 * functionality using the react-hook-form library.
 * It wraps the form elements with the FormProvider component from react-hook-form and
 * handles form submission, validation, and form state management.
 *
 * @param {React.ReactNode} children : The child components rendered inside the form.
 * @param {Object} [schemaValidation] : The Yup schema object used for form validation.
 * @param {Function} onSubmit: The function to be executed when the form is submitted.
 * @param {Object} [defaultValues] : The default values to populate the form fields.
 * @param {Object} [values] : The values to populate the form fields.
 * @param {boolean} [resetStateOnSubmit] : Determines whether to reset the form state after submission. (Optional, default: false)
 * @param {String} [formId] : The unique value for the Form
 */

const FormProviderWrapper = ({
  children,
  schemaValidation,
  onSubmit,
  defaultValues = {},
  values = {},
  resetStateOnSubmit,
  formId,
}) => {
  const methods = useForm({
    reValidateMode: "onChange",
    shouldFocusError: true,
    ...(schemaValidation && { resolver: yupResolver(schemaValidation) }),
    defaultValues,
    values,
  });

  const onSubmitForm = (data) => {
    onSubmit(data, { ...methods });
    resetStateOnSubmit && methods?.reset();
  };

  return (
    <FormProvider {...methods} context={{ onSubmitForm }}>
      <form
        {...(formId ? { id: formId } : {})}
        onSubmit={methods?.handleSubmit(onSubmitForm)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormProviderWrapper;

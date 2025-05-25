/**
 * The getElementError function is a utility function that extracts the error message
 * associated with a form field from the errors object. It is used in form
 * validation scenarios with the react-hook-form library.
 *
 * @param
 * [errors : (object)]: The errors object provided by the react-hook-form library,
 * containing validation errors for form fields. name (string): The name of the form
 * field for which you want to retrieve the error message.
 *
 * @returns
 * [ string | undefined ]The function returns a string representing the error message
 * associated with the specified form field. If no error message is found, undefined
 * is returned.
 */
export function getElementError({ errors, name }) {
  const nameArray = name?.split(".");
  if (nameArray?.length === 1) {
    return errors?.[nameArray?.[0]]?.message;
  }
  const errorObject = nameArray?.reduce(
    (prevValue, currentValue, currentIdx, array) => {
      return prevValue?.[currentValue];
    },
    errors
  );
  return errorObject?.message;
}

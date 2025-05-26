import React from "react";
import { useWatch } from "react-hook-form";

const FieldValueProvider = ({ name, renderChild }) => {
  const value = useWatch({ name });
  return <>{renderChild(value)}</>;
};

export default FieldValueProvider;

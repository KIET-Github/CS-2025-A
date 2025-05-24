import * as yup from "yup";
export const invoiceSchema = yup.object().shape({
  paymentMethod: yup.string().required("Please select payment mode"),
  amountRecieved: yup
    .number()
    .typeError("Amount Recieved is required")
    .required("Amount Recieved is required"),
  items: yup.array().of(
    yup.object().shape({
      salePrice: yup
        .number()
        .typeError("Sale Price is required")
        .required("Sale Price is required"),
      quantity: yup
        .number()
        .required("Quantity is required")
        .positive("Quantity should be a positive number")
        .typeError("Quantity must be number"),
    })
  ),
});

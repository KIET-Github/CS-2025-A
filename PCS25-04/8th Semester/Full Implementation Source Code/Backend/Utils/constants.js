const { sign } = require("jsonwebtoken");

const errorMessages = {
  internalServerError: "Internal Server Error",
};

const productMessages = {
  created: "Product Created Sucessfully",
  noProductForId: "There is no product for this ID",
  productIdRequired: "Product Id is required",
  updated: "Product information updated successfully.",
  noChange: "Product not found or no changes made.",
  deleted: "Product Deleted successfully.",
};

const clientMessages = {
  created: "Client Created Sucessfully",
  noClientForId: "There is no client for this ID",
  clientIdRequired: "Client Id is required",
  updated: "Client information updated successfully.",
  noChange: "Client not found or no changes made.",
  deleted: "Client Deleted successfully.",
};
const userMessages = {
  created: "User Created Sucessfully",
  noChange: "User not found or no changes made.",
  updated: "User information updated successfully.",
};

const invoiceMessages = {
  notGenerated: "Invoice was not generated successfully.",
  created: "Invoice created successfully",
  noInvoiceForId: "There is no invoice for this ID",
  invoiceIdRequired: "Invoice Id is required",
  deleted: "Invoice Deleted successfully.",
  paymentSuccesful: "Payment Successful",
};
const authMessages = {
  signedUp: "Signed Up User",
  userNotFound: "User not found",
  userAlreadyRegistered: "User with this phone number is already registered",
  emailAlreadyRegistered: "User with this email is already registered",
};

module.exports = {
  errorMessages,
  productMessages,
  clientMessages,
  userMessages,
  invoiceMessages,
  authMessages,
};

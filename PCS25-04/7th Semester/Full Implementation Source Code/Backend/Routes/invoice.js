const express = require("express");
const { userAuthMiddleware } = require("../Middlewares/user.js");
const {
  InvoiceInputValidation,
  PayRemainingAmountInputValidation,
} = require("../Middlewares/invoice.js");
const {
  CreateInvoice,
  GetInvoiceById,
  DeleteInvoiceById,
  PayRemainingAmount,
} = require("../Controllers/invoice.js");

const invoiceRouter = express.Router();

invoiceRouter.post(
  "/",
  userAuthMiddleware,
  InvoiceInputValidation,
  CreateInvoice
);

invoiceRouter.get("/:salePurchaseId", userAuthMiddleware, GetInvoiceById);
invoiceRouter.delete("/:salePurchaseId", userAuthMiddleware, DeleteInvoiceById);
invoiceRouter.patch(
  "/pay-remaining-amount",
  userAuthMiddleware,
  PayRemainingAmountInputValidation,
  PayRemainingAmount
);
module.exports = invoiceRouter;

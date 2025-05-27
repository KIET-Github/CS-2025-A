const { SignUpController, SignInController } = require("./auth.js");
const {
  CreateClient,
  GetAllClients,
  GetClientByID,
  UpdateClientByID,
  DeleteClientByID,
  GetAllClientsList,
} = require("./client.js");
const {
  CreateInvoice,
  GetInvoiceById,
  DeleteInvoiceById,
  PayRemainingAmount,
} = require("./invoice.js");
const {
  CreateProduct,
  GetAllProducts,
  GetProductByID,
  UpdateProductById,
  DeleteProductById,
  GetLowStockProducts,
  UpdateProductStock,
  GetAllProductsList,
} = require("./product.js");
const {
  GetAllTransactionsByClientId,
  GetUnpaidDueTransactions,
  GetTransactionSummary,
  GetMonthlyTransactionSummary,
} = require("./transactions.js");
const { GetUserInfo, UpdateUserInfo } = require("./user.js");

module.exports = {
  SignUpController,
  SignInController,
  GetUserInfo,
  UpdateUserInfo,
  CreateProduct,
  GetAllProducts,
  GetAllProductsList,
  GetProductByID,
  UpdateProductById,
  DeleteProductById,
  GetLowStockProducts,
  UpdateProductStock,
  CreateClient,
  GetAllClients,
  GetClientByID,
  UpdateClientByID,
  DeleteClientByID,
  GetAllClientsList,
  CreateInvoice,
  GetInvoiceById,
  DeleteInvoiceById,
  PayRemainingAmount,
  GetAllTransactionsByClientId,
  GetUnpaidDueTransactions,
  GetTransactionSummary,
  GetMonthlyTransactionSummary,
};

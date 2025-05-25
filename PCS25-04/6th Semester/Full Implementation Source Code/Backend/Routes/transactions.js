const express = require("express");
const {
  GetAllTransactionsByClientId,
  GetUnpaidDueTransactions,
  GetTransactionSummary,
  GetMonthlyTransactionSummary,
} = require("../Controllers");
const { userAuthMiddleware } = require("../Middlewares/user");

const transactionsRouter = express.Router();

transactionsRouter.get("/due", userAuthMiddleware, GetUnpaidDueTransactions);
transactionsRouter.get("/summary", userAuthMiddleware, GetTransactionSummary);
transactionsRouter.get(
  "/monthly-summary",
  userAuthMiddleware,
  GetMonthlyTransactionSummary
);
transactionsRouter.get(
  "/:clientId",
  userAuthMiddleware,
  GetAllTransactionsByClientId
);

module.exports = transactionsRouter;

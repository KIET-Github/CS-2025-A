const express = require("express");
const authRouter = require("./auth.js");
const userRouter = require("./user.js");
const productRouter = require("./product.js");
const clientRouter = require("./client.js");
const invoiceRouter = require("./invoice.js");
const transactionsRouter = require("./transactions.js");

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/client", clientRouter);
mainRouter.use("/invoice", invoiceRouter);
mainRouter.use("/transactions", transactionsRouter);

mainRouter.use((req, res) => {
  res.status(404).json({ statusCode: 404, msg: "Route not found" });
});
module.exports = mainRouter;

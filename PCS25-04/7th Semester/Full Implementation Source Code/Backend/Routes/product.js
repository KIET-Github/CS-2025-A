const express = require("express");
const {
  CreateProduct,
  GetAllProducts,
  GetProductByID,
  UpdateProductById,
  DeleteProductById,
  GetLowStockProducts,
  GetAllProductsList,
} = require("../Controllers/index.js");
const { userAuthMiddleware } = require("../Middlewares/user.js");
const {
  ProductInputValidation,
  StockInputValidation,
} = require("../Middlewares/product.js");
const { UpdateProductStock } = require("../Controllers/product.js");

const productRouter = express.Router();

productRouter.post(
  "/",
  userAuthMiddleware,
  ProductInputValidation,
  CreateProduct
);

productRouter.get("/", userAuthMiddleware, GetAllProducts);
productRouter.get("/low-stock", userAuthMiddleware, GetLowStockProducts);
productRouter.get("/list", userAuthMiddleware, GetAllProductsList);
productRouter.get("/:productId", userAuthMiddleware, GetProductByID);
productRouter.put(
  "/",
  userAuthMiddleware,
  ProductInputValidation,
  UpdateProductById
);
productRouter.patch(
  "/:productId/stock",
  userAuthMiddleware,
  StockInputValidation,
  UpdateProductStock
);

productRouter.delete("/:productId", userAuthMiddleware, DeleteProductById);

module.exports = productRouter;

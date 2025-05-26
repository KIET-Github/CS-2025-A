const zod = require("zod");

const productSchema = zod
  .object({
    hsn: zod.string().max(15, "HSN must be at most 15 characters long"),
    name: zod.string().max(45, "Name must be at most 45 characters long"),
    sale_price: zod.number().positive("Sale price must be a positive number"),
    cost_price: zod.number().positive("Cost price must be a positive number"),
    tax: zod.number().nonnegative("Tax must be a non-negative number"),
    quantity: zod
      .number()
      .nonnegative("Quantity must be a non-negative integer"),
    min_qty: zod
      .number()
      .nonnegative("Min quantity must be a non-negative integer"),
  })
  .refine((data) => data.sale_price >= data.cost_price, {
    message: "Sale price must be greater than or equal to cost price",
    path: ["sale_price"],
  });

const stockSchema = zod.object({
  quantityToAdd: zod
    .number()
    .nonnegative("Quantity must be a non-negative integer"),
});

function ProductInputValidation(req, res, next) {
  const result = productSchema.safeParse({
    hsn: req.body.hsn,
    name: req.body.name,
    sale_price: req.body.sale_price,
    cost_price: req.body.cost_price,
    tax: req.body.tax,
    quantity: req.body.quantity,
    min_qty: req.body.min_qty,
  });
  if (result.success) {
    next();
  } else {
    res.status(400).json({
      statusCode: 400,
      msg: result.error.errors,
    });
  }
}
function StockInputValidation(req, res, next) {
  const result = stockSchema.safeParse({
    quantityToAdd: req.body.quantityToAdd,
  });
  if (result.success) {
    next();
  } else {
    res.status(400).json({
      statusCode: 400,
      msg: result.error.errors,
    });
  }
}

module.exports = {
  ProductInputValidation,
  StockInputValidation,
};

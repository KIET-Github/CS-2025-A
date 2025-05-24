const z = require("zod");

const transactionItemSchema = z.object({
  productId: z.number().int(),
  quantity: z.number().int().positive(),
  salePrice: z.number().positive(),
});

const invoiceSchema = z.object({
  clientId: z.number().int(),
  saleAndPurchaseType: z.enum(["SALE", "PURCHASE"]),
  paymentMethod: z.enum(["CASH", "ONLINE"]),
  transactionItems: z.array(transactionItemSchema),
  totalAmount: z.number().positive(),
  discountAmount: z.number().nonnegative(),
  amountReceived: z.number().nonnegative(),
  shippingAddress: z.string(),
});

const payRemainingAmountSchema = z.object({
  salePurchaseId: z.number("Sale purchase ID is required").int().positive(),
  amountPaid: z
    .number("Amount paid is required")
    .positive("Amount paid must be a positive number"),
});
function InvoiceInputValidation(req, res, next) {
  const result = invoiceSchema.safeParse({
    clientId: req.body.clientId,
    saleAndPurchaseType: req.body.saleAndPurchaseType,
    paymentMethod: req.body.paymentMethod,
    transactionItems: req.body.transactionItems,
    totalAmount: req.body.totalAmount,
    discountAmount: req.body.discountAmount,
    amountReceived: req.body.amountReceived,
    shippingAddress: req.body.shippingAddress,
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

function PayRemainingAmountInputValidation(req, res, next) {
  const result = payRemainingAmountSchema.safeParse({
    salePurchaseId: req.body.salePurchaseId,
    amountPaid: req.body.amountPaid,
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
  InvoiceInputValidation,
  PayRemainingAmountInputValidation,
};

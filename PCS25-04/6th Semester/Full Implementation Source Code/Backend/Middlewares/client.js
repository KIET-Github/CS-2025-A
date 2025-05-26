const zod = require("zod");

const clientSchema = zod.object({
  name: zod.string().max(45, "Name must be at most 45 characters long."),
  gstIn: zod.string()
    .nullable()
    .refine(val => val === null || val === "" || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val), {
      message: "Invalid GST format. Example: 29ABCDE1234F1Z5"
    }),
  phoneNumber: zod
    .string()
    .max(15, "Phone number must be at most 15 characters long."),
  email: zod.string().email("Invalid email format.").nullable(),
  address: zod
    .string()
    .max(450, "Address must be at most 450 characters long."),
  toGet: zod.number(),
  toPay: zod.number(),
  noticePeriod: zod
    .number()
    .int()
    .min(0, "Notice period must be a non-negative integer."),
});

function clientInputValidation(req, res, next) {
  const result = clientSchema.safeParse({
    name: req.body.name,
    gstIn: req.body.gstIn,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    toGet: req.body.toGet,
    toPay: req.body.toPay,
    noticePeriod: req.body.noticePeriod,
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
  clientInputValidation,
};

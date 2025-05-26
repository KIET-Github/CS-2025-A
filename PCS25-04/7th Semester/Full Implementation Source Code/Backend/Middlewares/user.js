const zod = require("zod");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config.js");

const userInfoUpdateSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  gstIn: zod.string()
    .nullable()
    .refine(val => val === null || val === "" || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val), {
      message: "Invalid GST format. Example: 29ABCDE1234F1Z5"
    }),
  phoneNumber: zod
    .string()
    .regex(/^\d{10}$/, "Phone Number must be a 10 digit number"),
  companyName: zod.string().min(1, "Company Name is required"),
  email: zod.string().email("Email is required"),
  address: zod.string().min(1, "Address is required"),
});

function userInfoUpdateInputValidation(req, res, next) {
  const result = userInfoUpdateSchema.safeParse({
    name: req.body.name,
    gstIn: req.body.gstIn,
    phoneNumber: req.body.phoneNumber,
    companyName: req.body.companyName,
    email: req.body.email,
    address: req.body.address,
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

function userAuthMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized: No token provided.",
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({
      statusCode: 403,
      message: "Unauthorized: Invalid token.",
    });
  }
}
module.exports = {
  userInfoUpdateInputValidation,
  userAuthMiddleware,
};

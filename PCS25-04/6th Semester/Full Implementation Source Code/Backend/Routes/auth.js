const express = require("express");
const {
  SignUpController,
  SignInController,
} = require("../Controllers/index.js");
const {
  signUpInputValidation,
  signInInputValidation,
} = require("../Middlewares/auth.js");
const authRouter = express.Router();

authRouter.post("/signup", signUpInputValidation, SignUpController);
authRouter.post("/signin", signInInputValidation, SignInController);

module.exports = authRouter;
